import { GameObjects, Scene } from "phaser";
import {
    CollectibleItemData,
    MissionLocation,
    MissionMetadata,
} from "../config/mapData";
import { EventBus } from "../EventBus";
import { GameStateManager } from "../../utils/GameStateManager";
import CollisionService from "../../services/CollisionService";
import NpcService from "../../services/NpcService";
import { NpcPosition } from "../../types/npcPositions";

/**
 * Base class for the five open-world map scenes.
 * Holds the shared state/properties so each level scene doesn't repeat them.
 */
export abstract class OpenWorldMapScene extends Scene {
    // Assigned during create() in every subclass.
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    npcs!: Phaser.Physics.Arcade.Group;
    ui!: GameObjects.Container;
    interactionPrompt!: GameObjects.Text;

    // Optional/nullable state.
    wasd: any = null;
    nearbyNPC: any = null;
    virtualJoystick: any = null;
    touchControls: any = null;
    backgroundImage: any = null;
    collisionBodies: Phaser.Physics.Arcade.StaticGroup | null = null;

    // 🚧 COLLISION AUTHORING WALL — Only blocked spots the player draws in
    // the Collision Editor (saved to localStorage under "civika-collision-<map>") are
    // applied. Stale "{map}-collisions.json" files in public/ are intentionally
    // IGNORED so old barrier shapes don't block the new generated background.
    // Flip to true to also load a JSON file placed in public/ (e.g. the one the
    // editor lets you download). localStorage still wins when both exist.
    protected readonly ENABLE_FILE_COLLISIONS: boolean = false;

    protected readonly DEBUG_SHOW_COLLISIONS: boolean = false;

    locationDisplay: GameObjects.Text | null = null;

    // 💬 DIALOGUE CUTSCENE — typewriter conversation box shared by every map.
    // Lives in the base class so all 5 levels get the same experience from
    // their own mission metadata + flavor text.
    protected dialogueActive: boolean = false;
    protected dialogueBox: GameObjects.Container | null = null;
    protected dialogueBgRect: GameObjects.Rectangle | null = null;
    protected dialogueNamePlate: GameObjects.Rectangle | null = null;
    protected dialogueSpeakerText: GameObjects.Text | null = null;
    protected dialogueBodyText: GameObjects.Text | null = null;
    protected dialogueContinueIcon: GameObjects.Text | null = null;
    protected dialogueLines: string[] = [];
    protected dialogueLineIndex: number = 0;
    protected dialogueTypewriterEvent: Phaser.Time.TimerEvent | null = null;
    protected dialogueAfterClose: (() => void) | null = null;
    protected dialogueCameraPanComplete: boolean = false;
    protected currentDialogueSpeakers: string[] = [];
    protected dialogueOverlay: GameObjects.Rectangle | null = null;
    protected dialogueNpcBob: Phaser.Tweens.Tween | null = null;
    protected dialogueAudioCtx: AudioContext | null = null;
    protected dialogueBlipLastTime: number = 0;
    protected dialogueOriginalZoom: number = 1;

    collectibles: Phaser.Physics.Arcade.Group | null = null;
    minimap: GameObjects.Container | null = null;
    minimapBackground: GameObjects.Graphics | null = null;
    minimapPlayerDot: GameObjects.Arc | null = null;

    // Level-specific data (assigned in subclasses).
    abstract missionLocations: MissionLocation[];
    abstract collectibleItemsData: CollectibleItemData[];

    // Initialized with defaults.
    tileSize: number = 32;
    mapWidth: number = 1000;
    mapHeight: number = 1000;
    lastDirection: string = "front";
    isMobile: boolean = false;
    missionIndicators: Map<number, any> = new Map();
    npcGlowEffects: Map<number, any> = new Map();
    collectibleItems: Map<string, any> = new Map();
    minimapNPCDots: GameObjects.Arc[] = [];
    minimapCollectibleDots: GameObjects.Arc[] = [];

    // 🧍 NPC POSITION OVERRIDES — NPCs spawn at `override ?? default` percents
    // (the override map is loaded from the NPC Position Editor's localStorage
    // data). NPCs carry their own `missionData` COPY so the shared mapData
    // arrays are never mutated.
    protected npcPositionOverrides: Map<number, NpcPosition> | null = null;
    protected npcEditorListenerRegistered: boolean = false;
    protected globalListenersRegistered: boolean = false;
    npcNameLabels: Map<number, any> = new Map();
    missionNumberLabels: Map<number, any> = new Map();
    protected DEBUG_BYPASS_PREREQUISITES: boolean = false;

    protected abstract getLocationDisplayColor(): string;

    createLocationDisplay() {
        // Create location display above player head
        this.locationDisplay = this.add
            .text(
                this.player.x,
                this.player.y - 60, // Position above player head
                "Location: (0, 0)",
                {
                    fontFamily: "Arial Black",
                    fontSize: this.isMobile ? 12 : 14,
                    color: "#FFFFFF",
                    stroke: "#000000",
                    strokeThickness: 2,
                    align: "center",
                    backgroundColor: this.getLocationDisplayColor(),
                    padding: { x: 8, y: 4 },
                    shadow: {
                        offsetX: 1,
                        offsetY: 1,
                        color: "#000000",
                        blur: 2,
                        fill: true,
                    },
                },
            )
            .setOrigin(0.5)
            .setDepth(500) // Above player but below UI elements
            .setScrollFactor(1) // Follow camera (moves with world)
            .setVisible(true);

        console.log(
            `${this.scene.key} location display created above player head`,
        );
    }

    protected abstract getInteractionPromptColor(): string;
    protected abstract getInteractionPromptStroke(): string;

    createUI() {
        // Reset dialogue cutscene state on every (re)create. Revisiting a map
        // reuses the same scene instance, so a stale dialogue box (whose canvas
        // texture was destroyed on scene stop) must not survive the restart.
        this.dialogueActive = false;
        this.dialogueAfterClose = null;
        this.dialogueCameraPanComplete = false;
        this.currentDialogueSpeakers = [];
        // If React still thinks a dialogue is open (restart mid-talk), tell it
        // the conversation is over so the mobile controls come back.
        EventBus.emit("dialogue-ended");
        if (this.dialogueNpcBob) {
            this.dialogueNpcBob.stop();
            this.dialogueNpcBob = null;
        }
        if (this.dialogueOverlay) {
            this.dialogueOverlay.destroy(true);
            this.dialogueOverlay = null;
        }
        this.stopTypewriter();
        if (this.dialogueBox) {
            this.dialogueBox.destroy(true);
            this.dialogueBox = null;
        }
        this.dialogueNamePlate = null;
        if (this.dialogueAudioCtx) {
            this.dialogueAudioCtx.close().catch(() => {});
            this.dialogueAudioCtx = null;
        }

        // Create interaction prompt positioned relative to player
        this.interactionPrompt = this.add
            .text(
                this.player.x + 80, // Right side of player
                this.player.y,
                this.isMobile ? "Tap to interact" : "Tap to interact",
                {
                    fontFamily: "Arial Black",
                    fontSize: 14,
                    color: this.getInteractionPromptColor(),
                    stroke: this.getInteractionPromptStroke(),
                    strokeThickness: 3,
                    align: "center",
                    backgroundColor: "#2F4F4F", // Dark slate gray
                    padding: { x: 8, y: 4 },
                },
            )
            .setOrigin(0.5)
            .setDepth(1000)
            .setScrollFactor(1) // Follow camera with world
            .setVisible(false);
    }

    protected abstract getMinimapTitle(): string;
    protected abstract getMinimapTitleFontSize(): string;
    protected abstract getMinimapTitleColor(): string;
    protected abstract getMinimapBorderColor(): number;
    protected abstract getMinimapBorderWidth(): number;

    createMinimap() {
        const minimapSize = this.isMobile ? 100 : 150;
        const minimapX = this.isMobile ? 70 : 90;
        // On mobile keep the minimap above the React virtual joystick (bottom-left).
        const minimapY =
            this.cameras.main.height - (this.isMobile ? 210 : 170);

        this.minimap = this.add.container(minimapX, minimapY);
        this.minimap!.setScrollFactor(0);
        this.minimap!.setDepth(1500);

        const minimapBg = this.add.graphics();
        minimapBg.fillStyle(0x000000, 0.6);
        minimapBg.fillRoundedRect(0, 0, minimapSize, minimapSize, 8);
        minimapBg.lineStyle(
            this.getMinimapBorderWidth(),
            this.getMinimapBorderColor(),
            1,
        );
        minimapBg.strokeRoundedRect(0, 0, minimapSize, minimapSize, 8);
        this.minimap!.add(minimapBg);

        const minimapTitle = this.add.text(
            minimapSize / 2,
            -15,
            this.getMinimapTitle(),
            {
                fontFamily: "Arial Black",
                fontSize: this.getMinimapTitleFontSize(),
                color: this.getMinimapTitleColor(),
                stroke: "#000000",
                strokeThickness: 2,
            },
        );
        minimapTitle.setOrigin(0.5);
        this.minimap!.add(minimapTitle);

        this.minimapPlayerDot = this.add.circle(
            minimapSize / 2,
            minimapSize / 2,
            4,
            0x00ff00,
            1,
        );
        this.minimap!.add(this.minimapPlayerDot);

        this.missionLocations.forEach((location) => {
            const npcOverride =
                this.npcPositionOverrides?.get(location.missionId) ?? null;
            const npcX =
                ((npcOverride?.percentX ?? location.percentX) / 100) *
                minimapSize;
            const npcY =
                ((npcOverride?.percentY ?? location.percentY) / 100) *
                minimapSize;

            const npcDot = this.add.circle(npcX, npcY, 2, 0x4169e1, 0.8);
            npcDot.setData("missionId", location.missionId);
            this.minimap!.add(npcDot);
            this.minimapNPCDots.push(npcDot);
        });

        this.collectibleItemsData.forEach((item) => {
            const itemX = (item.percentX / 100) * minimapSize;
            const itemY = (item.percentY / 100) * minimapSize;

            const dotColor =
                item.rarity === "legendary"
                    ? 0xffd700
                    : item.rarity === "rare"
                      ? 0xff00ff
                      : item.rarity === "uncommon"
                        ? 0x00ffff
                        : 0xffff00;

            const collectibleDot = this.add.circle(
                itemX,
                itemY,
                2,
                dotColor,
                1,
            );
            collectibleDot.setData("itemId", item.id);
            this.minimap!.add(collectibleDot);
            this.minimapCollectibleDots.push(collectibleDot);

            this.tweens.add({
                targets: collectibleDot,
                alpha: { from: 0.5, to: 1 },
                scale: { from: 0.8, to: 1.2 },
                duration: 800,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
            });
        });

        console.log(
            `${this.scene.key} minimap created with collectible locations`,
        );
    }

    interactWithNPC(location: any) {
        // Ignore re-entry while a dialogue cutscene is already playing.
        if (this.dialogueActive) return;

        const gameStateManager = GameStateManager.getInstance();
        const flavor = this.getMissionFlavor();

        // Pick the dialogue line for this mission state (reusing existing text
        // — no new authoring), then run the original mission logic only after
        // the cutscene finishes.
        let dialogueLine: string;
        if (gameStateManager.isMissionCompleted(location.missionId)) {
            dialogueLine = flavor.completedMessage(location.npc);
        } else if (
            !this.DEBUG_BYPASS_PREREQUISITES &&
            !gameStateManager.canAccessMission(location.missionId)
        ) {
            const availableMissions = gameStateManager.getAvailableMissions();
            const availableList =
                availableMissions.length > 0
                    ? availableMissions.join(", ")
                    : flavor.prereqFallbackList;
            dialogueLine = flavor.prereqMessage(location.npc, availableList);
        } else {
            dialogueLine = this.getMissionData(location.missionId).description;
        }

        // Speakers array runs parallel to the lines array — currently every
        // line is voiced by the NPC; add a "PLAYER" entry to make the player
        // speak a line (the nameplate and highlight switch accordingly).
        this.startDialogue([location.npc], [dialogueLine], () =>
            this.continueInteractionWithNPC(location),
        );
    }

    continueInteractionWithNPC(location: any) {
        const gameStateManager = GameStateManager.getInstance();
        const flavor = this.getMissionFlavor();

        // Check if mission is already completed
        if (gameStateManager.isMissionCompleted(location.missionId)) {
            EventBus.emit("show-notification", {
                type: "success",
                title: flavor.completedTitle,
                message: flavor.completedMessage(location.npc),
                icon: flavor.completedIcon,
                actions: [
                    {
                        label: flavor.completedActionLabel,
                        action: () => {},
                        style: "primary",
                    },
                ],
            });
            return;
        }

        // Check if mission is accessible
        if (
            !this.DEBUG_BYPASS_PREREQUISITES &&
            !gameStateManager.canAccessMission(location.missionId)
        ) {
            const availableMissions = gameStateManager.getAvailableMissions();
            const availableList =
                availableMissions.length > 0
                    ? availableMissions.join(", ")
                    : flavor.prereqFallbackList;

            EventBus.emit("show-notification", {
                type: "info",
                title: flavor.prereqTitle,
                message: flavor.prereqMessage(location.npc, availableList),
                icon: flavor.prereqIcon,
                actions: [
                    {
                        label: flavor.prereqActionLabel,
                        action: () => {
                            // Emit event to open Quest Log
                            EventBus.emit("open-quest-log");
                        },
                        style: "secondary",
                    },
                ],
            });
            return;
        }

        // Emit event to React to show MissionSystem
        EventBus.emit("show-mission", {
            missionId: location.missionId,
            npcName: location.npc,
            missionName: location.name,
            mission: this.getMissionData(location.missionId),
        });
    }

    getMissionData(missionId: number) {
        const missions = this.getMissionMetadata();

        return missions[missionId] || this.getMissionFallback(missionId);
    }

    protected abstract getMissionMetadata(): Record<number, MissionMetadata>;
    protected abstract getMissionFallback(missionId: number): MissionMetadata;
    protected abstract getMissionFlavor(): {
        completedTitle: string;
        completedIcon: string;
        completedMessage: (npc: string) => string;
        completedActionLabel: string;
        prereqTitle: string;
        prereqIcon: string;
        prereqActionLabel: string;
        prereqFallbackList: string;
        prereqMessage: (npc: string, availableList: string) => string;
    };

    interactWithNearbyNPC() {
        if (this.nearbyNPC) {
            const missionData = this.nearbyNPC.getData("missionData");
            this.interactWithNPC(missionData);
        }
    }
    protected abstract getCameraLogName(): string;

    optimizeCameraForOpenWorld() {
        if (this.player) {
            this.cameras.main.setBounds(
                -Infinity,
                -Infinity,
                Infinity,
                Infinity,
            );
            this.cameras.main.setLerp(0.08, 0.08);
            this.cameras.main.setDeadzone(25, 25);
            console.log(
                `${this.getCameraLogName()} camera optimized for open world`,
            );
        }
    }

    setupInputAndMobile() {
        // Mobile device detection
        this.isMobile =
            this.sys.game.device.input.touch ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent,
            ) ||
            window.innerWidth <= 768;
        console.log(
            `Mobile device detected in ${this.scene.key}:`,
            this.isMobile,
        );

        // Set up input
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,S,A,D");

        // Set up interaction key
        this.input.keyboard!.on("keydown-SPACE", () => {
            if (this.dialogueActive) {
                this.advanceDialogue();
            } else {
                this.interactWithNearbyNPC();
            }
        });

        // Space / Enter / E all advance the dialogue box.
        this.input.keyboard!.on("keydown-ENTER", () => {
            if (this.dialogueActive) {
                this.advanceDialogue();
            }
        });
        this.input.keyboard!.on("keydown-E", () => {
            if (this.dialogueActive) {
                this.advanceDialogue();
            }
        });

        // Tap/click anywhere advances the dialogue — the main touch UX on
        // mobile once the DOM "TAP" button hides during a conversation.
        this.input.on("pointerdown", () => {
            if (this.dialogueActive) {
                this.advanceDialogue();
            }
        });
    }

    create() {
        const theme = this.getNPCTheme();
        console.log(
            `=== CREATING ${theme.noun.toUpperCase()} MAP (LEVEL ${theme.level}) ===`,
        );

        // Create background
        this.createBackground();

        // Create player with collision
        this.createPlayer();

        // Create NPCs
        this.createNPCs();

        // Create UI
        this.createUI();

        this.setupCameraAndDelayedUI();
    }

    setupCameraAndDelayedUI() {
        // Set unlimited camera bounds for open world
        this.cameras.main.setBounds(-Infinity, -Infinity, Infinity, Infinity);

        // Ensure camera follows player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);

        // Force camera to center on player initially
        this.cameras.main.centerOn(this.player.x, this.player.y);

        // Optimize for open world camera
        this.time.delayedCall(100, () => {
            this.cameras.main.startFollow(this.player);
            this.optimizeCameraForOpenWorld();
            console.log(`${this.getCameraLogName()} camera setup complete`);
        });

        // Set up mobile detection and input
        this.setupInputAndMobile();

        // Create location display after player is created (with delay to ensure player exists)
        this.time.delayedCall(200, () => {
            if (this.player && !this.locationDisplay) {
                this.createLocationDisplay();
            }
        });

        // Create minimap after everything is loaded
        this.time.delayedCall(400, () => {
            this.createMinimap();
        });

        // 🧍 NPC Position Editor — React emits this after a Save / Reset so the
        // active scene repositions its NPCs live (no scene restart needed).
        if (!this.npcEditorListenerRegistered) {
            this.game.events.on(
                "civika-npcs-saved",
                this.handleNPCEditorSaved,
                this,
            );
            this.npcEditorListenerRegistered = true;
        }

        // Global (game/scale) listeners outlive this scene's input plugin, so
        // guard against duplicate registration across same-scene restarts.
        if (!this.globalListenersRegistered) {
            // Listen for mobile interaction events from React
            this.game.events.on("mobile-interact", () => {
                if (this.dialogueActive) {
                    this.advanceDialogue();
                } else {
                    this.interactWithNearbyNPC();
                }
            });

            // Reposition UI on resize / rotation
            this.scale.on("resize", this.handleResize, this);
            this.scale.on("orientationchange", this.handleResize, this);

            this.globalListenersRegistered = true;
        }

        EventBus.emit("current-scene-ready", this);
    }

    getDistanceToNearestNPC(x?: number, y?: number): number {
        const playerX = x !== undefined ? x : this.player.x;
        const playerY = y !== undefined ? y : this.player.y;

        let nearestDistance = Infinity;

        for (let npc of this.npcs.children
            .entries as Phaser.Physics.Arcade.Sprite[]) {
            const distance = Phaser.Math.Distance.Between(
                playerX,
                playerY,
                npc.x,
                npc.y,
            );
            if (distance < nearestDistance) {
                nearestDistance = distance;
            }
        }

        return nearestDistance;
    }

    isPlayerMovingAwayFromNPCs(newX: number, newY: number): boolean {
        const currentDistance = this.getDistanceToNearestNPC();
        const newDistance = this.getDistanceToNearestNPC(newX, newY);
        return newDistance > currentDistance;
    }

    canPlayerMoveTo(x: number, y: number): boolean {
        const playerWidth = this.player.width * this.player.scaleX;
        const playerHeight = this.player.height * this.player.scaleY;

        for (let npc of this.npcs.children
            .entries as Phaser.Physics.Arcade.Sprite[]) {
            const npcWidth = npc.width * npc.scaleX;
            const npcHeight = npc.height * npc.scaleY;

            const playerLeft = x - playerWidth / 2;
            const playerRight = x + playerWidth / 2;
            const playerTop = y - playerHeight / 2;
            const playerBottom = y + playerHeight / 2;

            const npcLeft = npc.x - npcWidth / 2;
            const npcRight = npc.x + npcWidth / 2;
            const npcTop = npc.y - npcHeight / 2;
            const npcBottom = npc.y + npcHeight / 2;

            const padding = 0.5;
            if (
                playerLeft < npcRight + padding &&
                playerRight > npcLeft - padding &&
                playerTop < npcBottom + padding &&
                playerBottom > npcTop - padding
            ) {
                return false;
            }
        }
        return true;
    }

    checkForNearbyNPCs() {
        let nearestNPC: Phaser.Physics.Arcade.Sprite | null = null;
        let nearestDistance = 100;

        this.npcs.children.entries.forEach((npc: any) => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                npc.x,
                npc.y,
            );

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestNPC = npc;
            }
        });

        if (nearestNPC && nearestDistance < 80) {
            this.nearbyNPC = nearestNPC;
            this.interactionPrompt.setPosition(
                this.player.x + 80,
                this.player.y,
            );
            this.interactionPrompt.setVisible(true);
        } else {
            this.nearbyNPC = null;
            this.interactionPrompt.setVisible(false);
        }
    }

    enforceNPCPositions() {
        this.npcs.children.entries.forEach((npc: any) => {
            (npc as any).body.setVelocity(0, 0);
            (npc as any).body.setAngularVelocity(0);
            (npc as any).body.setImmovable(true);

            const originalPosition = (npc as any).getData("originalPosition");
            if (originalPosition) {
                const distance = Phaser.Math.Distance.Between(
                    npc.x,
                    npc.y,
                    originalPosition.x,
                    originalPosition.y,
                );
                if (distance > 5) {
                    npc.setPosition(originalPosition.x, originalPosition.y);
                }
            }
        });
    }

    updateMinimap() {
        if (
            !this.minimap ||
            !this.minimapPlayerDot ||
            !this.player ||
            !this.backgroundImage
        )
            return;

        const minimapSize = this.isMobile ? 100 : 150;
        const bgWidth = this.backgroundImage.displayWidth;
        const bgHeight = this.backgroundImage.displayHeight;
        const bgX = this.backgroundImage.x;
        const bgY = this.backgroundImage.y;

        const playerRelativeX = this.player.x - (bgX - bgWidth / 2);
        const playerRelativeY = this.player.y - (bgY - bgHeight / 2);

        const percentX = Math.max(
            0,
            Math.min(100, (playerRelativeX / bgWidth) * 100),
        );
        const percentY = Math.max(
            0,
            Math.min(100, (playerRelativeY / bgHeight) * 100),
        );

        this.minimapPlayerDot.setPosition(
            (percentX / 100) * minimapSize,
            (percentY / 100) * minimapSize,
        );

        // 🧍 NPC dots follow their live NPC every frame — covers editor drags,
        // reset-to-default, and scene re-spawns with no extra event bookkeeping.
        const npcEntries = (this.npcs?.children.entries ?? []) as any[];
        this.minimapNPCDots.forEach((dot) => {
            if (!dot.active) return; // stale refs survive scene restarts
            const missionId = dot.getData("missionId");
            const npc = npcEntries.find(
                (n) => n.getData?.("missionData")?.missionId === missionId,
            );
            if (!npc) return;
            const relX = npc.x - (bgX - bgWidth / 2);
            const relY = npc.y - (bgY - bgHeight / 2);
            const npcPctX = Math.max(0, Math.min(100, (relX / bgWidth) * 100));
            const npcPctY = Math.max(0, Math.min(100, (relY / bgHeight) * 100));
            dot.setPosition(
                (npcPctX / 100) * minimapSize,
                (npcPctY / 100) * minimapSize,
            );
        });

        const gameStateManager = GameStateManager.getInstance();
        this.minimapCollectibleDots.forEach((dot) => {
            const itemId = dot.getData("itemId");
            if (itemId && gameStateManager.isItemCollected(itemId)) {
                dot.setVisible(false);
            }
        });
    }

    update() {
        if (!this.player) return;

        // Dialogue cutscene: freeze the player and skip world updates while
        // the conversation box is up.
        if (this.dialogueActive) {
            this.player.setVelocity(0, 0);
            this.player.setAngularVelocity(0);
            const idleSpriteKey = this.getPlayerTextureKey(this.lastDirection);
            if (this.textures.exists(idleSpriteKey)) {
                this.player.setTexture(idleSpriteKey);
            }
            if (this.anims && this.anims.exists) {
                const idleAnimKey = this.getIdleAnimKey(this.lastDirection);
                if (this.anims.exists(idleAnimKey)) {
                    this.player.play(idleAnimKey, true);
                }
            }
            return;
        }

        const speed = 120;
        let isMoving = false;
        let currentDirection = "";
        let velocityX = 0;
        let velocityY = 0;

        if (!this.isMobile) {
            if (this.cursors.left.isDown || this.wasd.A.isDown) {
                velocityX = -speed;
                isMoving = true;
                currentDirection = "left";
                this.lastDirection = "left";
            } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
                velocityX = speed;
                isMoving = true;
                currentDirection = "right";
                this.lastDirection = "right";
            }

            if (this.cursors.up.isDown || this.wasd.W.isDown) {
                velocityY = -speed;
                isMoving = true;
                currentDirection = "back";
                this.lastDirection = "back";
            } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
                velocityY = speed;
                isMoving = true;
                currentDirection = "front";
                this.lastDirection = "front";
            }
        } else {
            const joystickDirection = this.registry.get(
                "joystickDirection",
            ) || { x: 0, y: 0 };

            if (joystickDirection.x !== 0 || joystickDirection.y !== 0) {
                velocityX = joystickDirection.x * speed;
                velocityY = joystickDirection.y * speed;
                isMoving = true;

                if (Math.abs(velocityX) > Math.abs(velocityY)) {
                    currentDirection = velocityX > 0 ? "right" : "left";
                } else {
                    currentDirection = velocityY > 0 ? "front" : "back";
                }
                this.lastDirection = currentDirection;
            }
        }

        if (isMoving) {
            const newX = this.player.x + velocityX * 0.016;
            const newY = this.player.y + velocityY * 0.016;

            const isMovingAway = this.isPlayerMovingAwayFromNPCs(newX, newY);

            if (isMovingAway || this.canPlayerMoveTo(newX, newY)) {
                this.player.setVelocity(velocityX, velocityY);
            } else {
                this.player.setVelocity(0, 0);
            }
        } else {
            this.player.setVelocity(0, 0);
        }

        if (isMoving) {
            const spriteKey = this.getPlayerTextureKey(currentDirection);
            if (this.textures.exists(spriteKey)) {
                this.player.setTexture(spriteKey);
            }

            if (this.anims && this.anims.exists) {
                const walkAnimKey = this.getWalkAnimKey(currentDirection);
                if (this.anims.exists(walkAnimKey)) {
                    this.player.play(walkAnimKey, true);
                }
            }
        } else {
            this.player.setVelocity(0, 0);
            const idleSpriteKey = this.getPlayerTextureKey(this.lastDirection);
            if (this.textures.exists(idleSpriteKey)) {
                this.player.setTexture(idleSpriteKey);
            }

            if (this.anims && this.anims.exists) {
                const idleAnimKey = this.getIdleAnimKey(this.lastDirection);
                if (this.anims.exists(idleAnimKey)) {
                    this.player.play(idleAnimKey, true);
                }
            }
        }

        this.checkForNearbyNPCs();
        this.updateLocationDisplay();
        this.updateMinimap();
        this.enforceNPCPositions();
    }

    // ----- Player appearance helpers (boy walk-cycle vs girl single-frame) -----

    protected isGirlPlayer(): boolean {
        return this.registry.get("playerGender") === "girl";
    }

    /** Texture key for the standing sprite in a given direction. */
    protected getPlayerTextureKey(dir: string): string {
        return this.isGirlPlayer() ? `student-girl-${dir}` : `student-${dir}-1`;
    }

    /** Animation key for walking in a given direction. */
    protected getWalkAnimKey(dir: string): string {
        return this.isGirlPlayer()
            ? `student-girl-${dir}-walk`
            : `student-${dir}-walk`;
    }

    /** Animation key for idling in a given direction. */
    protected getIdleAnimKey(dir: string): string {
        return this.isGirlPlayer()
            ? `student-girl-${dir}-idle`
            : `student-${dir}-idle`;
    }

    /** Scale applied to the player sprite (girl images are higher-res). */
    protected getPlayerScale(): number {
        // Girl renders ~12% taller than boy: boy front is 393px @ 0.2 (78.6px);
        // girl is 629px, so 0.14 ≈ 88/629.
        return this.isGirlPlayer() ? 0.18 : 0.2;
    }

    createPlayerAnimations() {
        // Check if animations already exist (from Level 1) — both boy and girl sets.
        if (
            this.anims.exists("student-front-walk") &&
            this.anims.exists("student-girl-front-walk")
        ) {
            console.log("Player animations already exist, skipping creation");
            return;
        }

        console.log(`Creating player animations for ${this.scene.key}...`);

        // Create the same animations as Level 1
        const requiredTextures = [
            "student-front-1",
            "student-front-2",
            "student-front-3",
            "student-front-4",
            "student-back-1",
            "student-back-2",
            "student-back-3",
            "student-back-4",
            "student-left-1",
            "student-left-2",
            "student-left-3",
            "student-left-4",
            "student-right-1",
            "student-right-2",
            "student-right-3",
            "student-right-4",
        ];

        for (const texture of requiredTextures) {
            if (!this.textures.exists(texture)) {
                console.error(
                    `Required texture ${texture} not found in City Map!`,
                );
                return;
            }
        }

        // Create walking animations
        this.anims.create({
            key: "student-front-walk",
            frames: [
                { key: "student-front-1" },
                { key: "student-front-2" },
                { key: "student-front-3" },
                { key: "student-front-4" },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "student-back-walk",
            frames: [
                { key: "student-back-1" },
                { key: "student-back-2" },
                { key: "student-back-3" },
                { key: "student-back-4" },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "student-left-walk",
            frames: [
                { key: "student-left-1" },
                { key: "student-left-2" },
                { key: "student-left-3" },
                { key: "student-left-4" },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "student-right-walk",
            frames: [
                { key: "student-right-1" },
                { key: "student-right-2" },
                { key: "student-right-3" },
                { key: "student-right-4" },
            ],
            frameRate: 8,
            repeat: -1,
        });

        // Create idle animations
        this.anims.create({
            key: "student-front-idle",
            frames: [{ key: "student-front-1" }],
            frameRate: 1,
        });

        this.anims.create({
            key: "student-back-idle",
            frames: [{ key: "student-back-1" }],
            frameRate: 1,
        });

        this.anims.create({
            key: "student-left-idle",
            frames: [{ key: "student-left-1" }],
            frameRate: 1,
        });

        this.anims.create({
            key: "student-right-idle",
            frames: [{ key: "student-right-1" }],
            frameRate: 1,
        });

        // Create girl student animations (single-frame glide per direction)
        const girlRequiredTextures = [
            "student-girl-front",
            "student-girl-back",
            "student-girl-left",
            "student-girl-right",
        ];

        // Skip girl anims if her textures aren't loaded (defensive; they are preloaded)
        const girlsReady = girlRequiredTextures.every((texture) =>
            this.textures.exists(texture),
        );

        if (girlsReady) {
            // Walking animations (single frame repeated — girl has no walk cycle frames)
            this.anims.create({
                key: "student-girl-front-walk",
                frames: [{ key: "student-girl-front" }],
                frameRate: 8,
                repeat: -1,
            });

            this.anims.create({
                key: "student-girl-back-walk",
                frames: [{ key: "student-girl-back" }],
                frameRate: 8,
                repeat: -1,
            });

            this.anims.create({
                key: "student-girl-left-walk",
                frames: [{ key: "student-girl-left" }],
                frameRate: 8,
                repeat: -1,
            });

            this.anims.create({
                key: "student-girl-right-walk",
                frames: [{ key: "student-girl-right" }],
                frameRate: 8,
                repeat: -1,
            });

            // Idle animations
            this.anims.create({
                key: "student-girl-front-idle",
                frames: [{ key: "student-girl-front" }],
                frameRate: 1,
            });

            this.anims.create({
                key: "student-girl-back-idle",
                frames: [{ key: "student-girl-back" }],
                frameRate: 1,
            });

            this.anims.create({
                key: "student-girl-left-idle",
                frames: [{ key: "student-girl-left" }],
                frameRate: 1,
            });

            this.anims.create({
                key: "student-girl-right-idle",
                frames: [{ key: "student-girl-right" }],
                frameRate: 1,
            });
        }

        console.log("Player animations created successfully!");
    }

    protected abstract getDefaultAreaName(): string;
    protected abstract getAreaName(
        relativeX: number,
        relativeY: number,
    ): string;
    protected abstract getWorldBackgroundConfig(): {
        label: string;
        textureKey: string;
        imagePath: string;
        fallbackThemeName: string;
        fallbackColor: number;
        fallbackGridColor: number;
        fallbackGridSpacing: number;
    };

    createBackground() {
        const cfg = this.getWorldBackgroundConfig();
        const label = cfg.label;
        const title = label.charAt(0).toUpperCase() + label.slice(1);
        console.log(`Creating ${label} background...`);
        console.log(
            `${title} background texture exists:`,
            this.textures.exists(cfg.textureKey),
        );

        // If textures don't exist, load them directly
        if (!this.textures.exists(cfg.textureKey)) {
            console.log(`${title} textures not loaded, loading them now...`);
            this.load.image(cfg.textureKey, cfg.imagePath);
            this.load.start();

            this.load.once("complete", () => {
                console.log(`${title} textures loaded, creating background...`);
                this.createBackgroundImage();
            });
        } else {
            // Wait a bit for textures to be fully loaded
            this.time.delayedCall(100, () => {
                this.createBackgroundImage();
            });
        }
    }

    createBackgroundImage() {
        const cfg = this.getWorldBackgroundConfig();
        const label = cfg.label;
        const title = label.charAt(0).toUpperCase() + label.slice(1);
        console.log(`Creating ${label} background image after delay...`);
        console.log(
            `${title} background root texture exists now:`,
            this.textures.exists(cfg.textureKey),
        );

        // Create background image as the main visual element
        if (this.textures.exists(cfg.textureKey)) {
            console.log(`Using ${label} background image...`);
            console.log("Texture details:", this.textures.get(cfg.textureKey));

            try {
                // Get Phaser game canvas dimensions for perfect coverage
                const gameWidth = this.scale.width;
                const gameHeight = this.scale.height;
                const gameCenterX = gameWidth / 2;
                const gameCenterY = gameHeight / 2;

                const bgImage = this.add.image(
                    gameCenterX,
                    gameCenterY,
                    cfg.textureKey,
                );
                bgImage.setOrigin(0.5, 0.5);
                bgImage.setDepth(-2000); // Much further behind everything

                // Scale background to cover the entire Phaser game canvas
                const scaleToCoverWidth = gameWidth / bgImage.width;
                const scaleToCoverHeight = gameHeight / bgImage.height;

                // Use the larger scale to ensure the image covers the entire game canvas
                const scaleX = Math.max(scaleToCoverWidth, scaleToCoverHeight);
                const scaleY = scaleX; // Keep aspect ratio

                // Ensure minimum scale for very small screens
                const minScale = 0.1;
                const finalScaleX = Math.max(scaleX, minScale);
                const finalScaleY = Math.max(scaleY, minScale);

                console.log(
                    `${title} background scaling to cover entire Phaser game canvas:`,
                );
                console.log(
                    "Game canvas dimensions:",
                    gameWidth,
                    "x",
                    gameHeight,
                );
                console.log(
                    "Image dimensions:",
                    bgImage.width,
                    "x",
                    bgImage.height,
                );
                console.log(
                    "Scale factors:",
                    scaleToCoverWidth,
                    scaleToCoverHeight,
                );
                console.log("Final scale:", finalScaleX, finalScaleY);

                bgImage.setScale(finalScaleX, finalScaleY);

                // Position background to cover the entire Phaser game canvas
                bgImage.setPosition(gameWidth / 2, gameHeight / 2);

                // Store the background reference for future updates
                this.backgroundImage = bgImage;

                bgImage.setAlpha(1); // Fully visible
                bgImage.setVisible(true); // Explicitly set visible
                console.log(`${title} background image created successfully`);

                // Reposition player relative to background if player already exists
                if (this.player) {
                    this.repositionPlayerRelativeToBackground();
                }

                // Reposition NPCs relative to background if they already exist
                this.repositionNPCsRelativeToBackground();

                // Load collision data after background is ready
                this.time.delayedCall(200, () => {
                    this.loadCollisions();
                });

                // Create collectibles after background is ready
                this.time.delayedCall(300, () => {
                    this.createCollectibles();
                });
            } catch (error) {
                console.error(
                    `Error creating ${label} background image:`,
                    error,
                );
                // Fallback to theme-colored background if image fails
                this.createFallbackBackground();
            }
        } else {
            console.log(
                `${title} background texture not found, using fallback`,
            );
            this.createFallbackBackground();
        }
    }

    createFallbackBackground() {
        const cfg = this.getWorldBackgroundConfig();
        const label = cfg.label;
        // Create fallback themed background
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        const bg = this.add.rectangle(
            gameWidth / 2,
            gameHeight / 2,
            gameWidth * 2,
            gameHeight * 2,
            cfg.fallbackColor, // Theme color for this level
            1,
        );
        bg.setDepth(-2000);

        // Add some state-like grid patterns
        const grid = this.add.graphics();
        grid.lineStyle(1, cfg.fallbackGridColor, 0.3);

        // Draw a grid pattern to simulate map blocks
        for (let x = 0; x < gameWidth * 2; x += cfg.fallbackGridSpacing) {
            grid.lineBetween(x, 0, x, gameHeight * 2);
        }
        for (let y = 0; y < gameHeight * 2; y += cfg.fallbackGridSpacing) {
            grid.lineBetween(0, y, gameWidth * 2, y);
        }
        grid.setDepth(-1000);

        console.log(`Fallback ${label} background created successfully`);
    }

    repositionPlayerRelativeToBackground() {
        if (this.player && this.backgroundImage) {
            const cfg = this.getWorldBackgroundConfig();
            const title =
                cfg.label.charAt(0).toUpperCase() + cfg.label.slice(1);
            // Position player at 30%, 50% of background image
            const coords = this.percentageToWorldCoordinates(30, 50);
            this.player.setPosition(coords.x, coords.y);

            console.log(
                `${title} player repositioned to (30%, 50%):`,
                coords.x,
                coords.y,
            );
            console.log(
                `${title} background dimensions:`,
                this.backgroundImage.displayWidth,
                this.backgroundImage.displayHeight,
            );
        }
    }

    repositionNPCsRelativeToBackground() {
        if (!this.npcs || !this.backgroundImage) return;

        this.npcs.children.entries.forEach((npc: any, index: number) => {
            const missionData = (npc as any).getData("missionData");
            if (
                missionData &&
                missionData.percentX !== undefined &&
                missionData.percentY !== undefined
            ) {
                // Reposition NPC using percentage coordinates
                const coords = this.percentageToWorldCoordinates(
                    missionData.percentX,
                    missionData.percentY,
                );
                npc.setPosition(coords.x, coords.y);

                // Update original position data
                npc.setData("originalPosition", { x: coords.x, y: coords.y });

                console.log(
                    `Repositioned NPC ${missionData.npc} to (${missionData.percentX}%, ${missionData.percentY}%) = (${coords.x}, ${coords.y})`,
                );
            }
        });
    }

    // 🧍 NPC POSITION OVERRIDES — editor-authored moves applied live.

    /** (Re)read the NPC Position Editor's overrides from the shared NpcService. */
    protected reloadNPCPositionOverrides() {
        this.npcPositionOverrides = NpcService.getInstance().getNpcPositions(
            this.scene.key,
        );
    }

    /** Live-apply overrides (or defaults after Reset) to every spawned NPC + overlay. */
    protected applyNPCPositionOverrides() {
        this.reloadNPCPositionOverrides();
        const positions = this.npcPositionOverrides ?? new Map();
        const defaultById = new Map(
            this.missionLocations.map((l) => [l.missionId, l]),
        );

        (this.npcs?.children.entries ?? []).forEach((npc: any) => {
            const missionData = npc.getData?.("missionData");
            if (!missionData) return;
            const missionId = missionData.missionId;
            if (missionId === undefined) return;

            const override = positions.get(missionId);
            const fallback = defaultById.get(missionId);
            const pX = override?.percentX ?? fallback?.percentX;
            const pY = override?.percentY ?? fallback?.percentY;
            if (pX === undefined || pY === undefined) return;

            const coords = this.percentageToWorldCoordinates(pX, pY);
            const worldX = coords.x;
            const worldY = coords.y;

            npc.setPosition(worldX, worldY);
            npc.setData("originalPosition", { x: worldX, y: worldY });
            // Mutate the per-NPC COPY, never the shared mapData array.
            missionData.percentX = pX;
            missionData.percentY = pY;

            const indicator = this.missionIndicators.get(missionId);
            if (indicator) indicator.setPosition(worldX + 25, worldY - 25);
            const nameLabel = this.npcNameLabels.get(missionId);
            if (nameLabel) nameLabel.setPosition(worldX, worldY - 50);
            const numberLabel = this.missionNumberLabels.get(missionId);
            if (numberLabel) numberLabel.setPosition(worldX - 35, worldY - 35);
            const glowData = this.npcGlowEffects.get(missionId);
            if (glowData) {
                if (glowData.baseGlow) {
                    glowData.baseGlow.setPosition(worldX, worldY);
                }
                if (glowData.interactiveGlow) {
                    glowData.interactiveGlow.setPosition(worldX, worldY);
                }
            }
        });

        // Minimap dots self-heal every frame in updateMinimap().
    }

    /** React → Phaser: called after the NPC editor persists a save/reset. */
    private handleNPCEditorSaved = (payload: { mapName: string }) => {
        if (!this.scene.isActive()) return; // editor on a non-active map → next spawn
        if (payload?.mapName !== this.scene.key) return;
        this.applyNPCPositionOverrides();
    };

    updateNPCIndicators() {
        const gameStateManager = GameStateManager.getInstance();

        this.missionLocations.forEach((location) => {
            const indicator = this.missionIndicators.get(location.missionId);

            if (indicator) {
                let indicatorText = `Mission #${location.missionId}`;
                let indicatorColor = "#FFD700"; // Gold for available

                if (gameStateManager.isMissionCompleted(location.missionId)) {
                    indicatorText = "✓";
                    indicatorColor = "#32CD32"; // Lime green for completed
                } else if (
                    !gameStateManager.canAccessMission(location.missionId)
                ) {
                    indicatorText = "🔒";
                    indicatorColor = "#DC143C"; // Crimson red for locked
                }

                indicator.setText(indicatorText);
                indicator.setColor(indicatorColor);
            }
        });

        const cfg = this.getWorldBackgroundConfig();
        const title = cfg.label.charAt(0).toUpperCase() + cfg.label.slice(1);
        console.log(`${title} NPC indicators updated in real-time`);
    }

    async loadCollisions() {
        const collisionService = CollisionService.getInstance();
        const dataKey = this.getCollisionDataKey();

        // Safety check: ensure physics system is ready
        if (!this.physics || !this.physics.add) {
            console.log("Physics system not ready, retrying collision load...");
            this.time.delayedCall(100, () => {
                this.loadCollisions();
            });
            return;
        }

        // Try localStorage first — editor-authored blocked spots only.
        // (The old public/{map}-collisions.json files are NOT loaded until
        // ENABLE_FILE_COLLISIONS above is flipped to true.)
        let collisionData = collisionService.loadCollisionData(dataKey);

        if (!collisionData && this.ENABLE_FILE_COLLISIONS) {
            // Optional: load "{map}-collisions.json" from public/ when
            // authoring a shipped collision file for this map.
            collisionData =
                await collisionService.loadCollisionDataFromFile(dataKey);
        }

        if (collisionData && this.backgroundImage) {
            console.log(`✅ Loading collision data for ${dataKey}...`);
            console.log(
                `Found ${collisionData.shapes.length} collision shapes`,
            );

            this.collisionBodies = collisionService.createCollisions(
                this,
                collisionData,
                this.backgroundImage,
            );

            // 🎨 VISUAL DEBUG: Draw colored outlines to see collision boundaries (only in debug mode)
            if (this.DEBUG_SHOW_COLLISIONS) {
                collisionData.shapes.forEach((shape) => {
                    if (shape.type === "rectangle") {
                        const box = shape as any;
                        const coords = this.percentageToWorldCoordinates(
                            box.percentX + box.percentWidth / 2,
                            box.percentY + box.percentHeight / 2,
                        );
                        const width =
                            (box.percentWidth / 100) *
                            this.backgroundImage.displayWidth;
                        const height =
                            (box.percentHeight / 100) *
                            this.backgroundImage.displayHeight;

                        const debugRect = this.add.rectangle(
                            coords.x,
                            coords.y,
                            width,
                            height,
                            0xff0000,
                            0, // Transparent fill
                        );
                        debugRect.setStrokeStyle(3, 0xff0000); // Red outline
                        debugRect.setDepth(1000);

                        console.log(
                            `🎨 Visualized collision "${
                                box.name
                            }" at (${box.percentX.toFixed(
                                1,
                            )}%, ${box.percentY.toFixed(1)}%)`,
                        );
                    } else if (shape.type === "polygon") {
                        const poly = shape as any;
                        const graphics = this.add.graphics();
                        graphics.lineStyle(3, 0x0000ff); // Blue outline
                        graphics.setDepth(1000);

                        const firstPoint = poly.points[0];
                        const firstCoords = this.percentageToWorldCoordinates(
                            firstPoint.percentX,
                            firstPoint.percentY,
                        );
                        graphics.beginPath();
                        graphics.moveTo(firstCoords.x, firstCoords.y);

                        for (let i = 1; i < poly.points.length; i++) {
                            const point = poly.points[i];
                            const coords = this.percentageToWorldCoordinates(
                                point.percentX,
                                point.percentY,
                            );
                            graphics.lineTo(coords.x, coords.y);
                        }

                        graphics.closePath();
                        graphics.strokePath();

                        console.log(
                            `🎨 Visualized polygon "${poly.name}" with ${poly.points.length} points`,
                        );
                    } else if (shape.type === "circle") {
                        const circle = shape as any;
                        const coords = this.percentageToWorldCoordinates(
                            circle.percentX,
                            circle.percentY,
                        );
                        const radius =
                            (circle.percentRadius / 100) *
                            Math.min(
                                this.backgroundImage.displayWidth,
                                this.backgroundImage.displayHeight,
                            );

                        const graphics = this.add.graphics();
                        graphics.lineStyle(3, 0x00ff00); // Green outline
                        graphics.setDepth(1000);
                        graphics.strokeCircle(coords.x, coords.y, radius);

                        console.log(
                            `🎨 Visualized circle "${
                                circle.name
                            }" at (${circle.percentX.toFixed(
                                1,
                            )}%, ${circle.percentY.toFixed(1)}%)`,
                        );
                    }
                });
            } else {
                console.log(
                    "🚫 Visual debug disabled - collision boundaries are invisible",
                );
            }

            // Add collision between player and collision bodies
            if (this.collisionBodies && this.player) {
                this.physics.add.collider(this.player, this.collisionBodies);
                console.log(
                    `✅ Player collision enabled with ${collisionData.shapes.length} collision shapes`,
                );
            }
        } else {
            console.log(`⚠️ No collision data found for ${dataKey}`);
        }
    }

    createCollectibles() {
        const cfg = this.getWorldBackgroundConfig();
        const label = cfg.label;
        console.log(
            `=== CREATING ${label.toUpperCase()} COLLECTIBLE ITEMS ===`,
        );
        console.log(`Background ready: ${!!this.backgroundImage}`);
        console.log(`Player exists: ${!!this.player}`);
        console.log(
            `Total items to create: ${this.collectibleItemsData.length}`,
        );

        this.collectibles = this.physics.add.group();
        const gameStateManager = GameStateManager.getInstance();

        this.collectibleItemsData.forEach((item) => {
            if (gameStateManager.isItemCollected(item.id)) {
                console.log(`Item ${item.id} already collected, skipping`);
                return;
            }

            const coords = this.percentageToWorldCoordinates(
                item.percentX,
                item.percentY,
            );

            const collectible = this.add
                .text(coords.x, coords.y, item.icon, {
                    fontSize: "30px",
                    fontFamily: "Arial",
                })
                .setOrigin(0.5)
                .setScrollFactor(1);

            this.physics.add.existing(collectible);
            (collectible.body as Phaser.Physics.Arcade.Body).setSize(48, 48);
            (collectible.body as Phaser.Physics.Arcade.Body).setAllowGravity(
                false,
            );

            collectible.setDepth(200);
            collectible.setVisible(true);
            collectible.setData("itemData", item);

            this.collectibles!.add(collectible);
            this.collectibleItems.set(item.id, collectible);

            this.tweens.add({
                targets: collectible,
                y: coords.y - 15,
                duration: 1200,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
            });

            const glowColor =
                item.rarity === "legendary"
                    ? 0xffd700
                    : item.rarity === "rare"
                      ? 0xff00ff
                      : item.rarity === "uncommon"
                        ? 0x00ffff
                        : 0xffffff;

            const glow = this.add.circle(
                coords.x,
                coords.y,
                30,
                glowColor,
                0.4,
            );
            glow.setDepth(199);
            glow.setScrollFactor(1);

            this.tweens.add({
                targets: glow,
                alpha: { from: 0.3, to: 0.6 },
                scaleX: { from: 1, to: 1.3 },
                scaleY: { from: 1, to: 1.3 },
                duration: 1200,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
            });

            console.log(
                `✓ Created ${label} collectible ${item.id} at (${item.percentX}%, ${item.percentY}%)`,
            );
        });

        if (this.collectibles && this.player) {
            this.physics.add.overlap(
                this.player,
                this.collectibles,
                this.collectItem,
                undefined,
                this,
            );
        }

        console.log(
            `=== ${label.toUpperCase()} COLLECTIBLES CREATION COMPLETE ===`,
        );
        console.log(`Items created: ${this.collectibleItems.size}`);
    }

    collectItem(player: any, collectible: any) {
        const itemData = collectible.getData("itemData");
        if (!itemData) return;

        const gameStateManager = GameStateManager.getInstance();
        const collected = gameStateManager.collectItem(
            itemData.id,
            itemData.value,
            itemData.points,
        );

        if (collected) {
            this.createCollectionParticles(
                collectible.x,
                collectible.y,
                itemData.rarity,
            );
            this.playCollectionSound(itemData.rarity);

            this.tweens.add({
                targets: collectible,
                y: collectible.y - 80,
                alpha: 0,
                scaleX: 2,
                scaleY: 2,
                duration: 600,
                ease: "Back.easeOut",
                onComplete: () => {
                    collectible.destroy();
                    this.collectibleItems.delete(itemData.id);
                },
            });

            this.showFloatingText(
                collectible.x,
                collectible.y,
                `+${itemData.value} 💰 +${itemData.points} ⭐`,
            );

            this.checkCollectionAchievement();

            EventBus.emit("show-notification", {
                type: "success",
                title: `${itemData.name} Collected! ✨`,
                message: `You found a ${itemData.name}! +${itemData.value} coins, +${itemData.points} points`,
                icon: itemData.icon,
                actions: [
                    {
                        label: "Continue Exploring",
                        action: () => {},
                        style: "primary",
                    },
                ],
            });
        }
    }
    createCollectionParticles(x: number, y: number, rarity: string) {
        const particleColor =
            rarity === "legendary"
                ? 0xffd700
                : rarity === "rare"
                  ? 0xff00ff
                  : rarity === "uncommon"
                    ? 0x00ffff
                    : 0xffff00;

        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 30 + Math.random() * 20;
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;

            const particle = this.add.circle(x, y, 3, particleColor, 1);
            particle.setDepth(300);

            this.tweens.add({
                targets: particle,
                x: targetX,
                y: targetY,
                alpha: 0,
                scale: 0,
                duration: 500 + Math.random() * 300,
                ease: "Power2",
                onComplete: () => particle.destroy(),
            });
        }

        for (let i = 0; i < 5; i++) {
            const star = this.add.text(x, y, "⭐", { fontSize: "24px" });
            star.setOrigin(0.5);
            star.setDepth(300);

            const angle = (Math.PI * 2 * i) / 5;
            const targetX = x + Math.cos(angle) * 40;
            const targetY = y + Math.sin(angle) * 40;

            this.tweens.add({
                targets: star,
                x: targetX,
                y: targetY,
                alpha: 0,
                rotation: Math.PI * 2,
                scale: { from: 1, to: 0.5 },
                duration: 600,
                ease: "Power2",
                onComplete: () => star.destroy(),
            });
        }
    }

    playCollectionSound(rarity: string) {
        const soundFrequency =
            rarity === "legendary"
                ? [440, 554, 659, 880]
                : rarity === "rare"
                  ? [392, 494, 587]
                  : rarity === "uncommon"
                    ? [349, 440, 523]
                    : [330, 392, 440];

        if (
            typeof AudioContext !== "undefined" ||
            typeof (window as any).webkitAudioContext !== "undefined"
        ) {
            try {
                const AudioContextClass =
                    AudioContext || (window as any).webkitAudioContext;
                const audioContext = new AudioContextClass();

                soundFrequency.forEach((freq, index) => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);

                    oscillator.frequency.value = freq;
                    oscillator.type = "sine";

                    const startTime = audioContext.currentTime + index * 0.1;
                    const duration = 0.15;

                    gainNode.gain.setValueAtTime(0.3, startTime);
                    gainNode.gain.exponentialRampToValueAtTime(
                        0.01,
                        startTime + duration,
                    );

                    oscillator.start(startTime);
                    oscillator.stop(startTime + duration);
                });
            } catch (error) {
                console.log("Audio playback not available:", error);
            }
        }
    }

    showFloatingText(x: number, y: number, text: string) {
        const floatingText = this.add.text(x, y, text, {
            fontFamily: "Arial Black",
            fontSize: "24px",
            color: "#FFD700",
            stroke: "#000000",
            strokeThickness: 4,
        });
        floatingText.setOrigin(0.5);
        floatingText.setDepth(300);

        this.tweens.add({
            targets: floatingText,
            y: y - 60,
            alpha: 0,
            duration: 1000,
            ease: "Power2",
            onComplete: () => floatingText.destroy(),
        });
    }

    // ----- 💬 Dialogue cutscene (shared by every map) -----

    protected stopTypewriter() {
        if (this.dialogueTypewriterEvent) {
            this.dialogueTypewriterEvent.remove();
            this.dialogueTypewriterEvent = null;
        }
    }

    /** Tiny soft "blip" as each letter appears (throttled so long lines don't machine-gun). */
    protected playDialogueBlip() {
        const now = Date.now();
        if (now - this.dialogueBlipLastTime < 45) return;
        this.dialogueBlipLastTime = now;

        this.ensureDialogueAudio();
        const ctx = this.dialogueAudioCtx;
        if (!ctx) return;

        try {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.type = "sine";
            oscillator.frequency.value = 640 + Math.random() * 140;
            const startTime = ctx.currentTime;
            const duration = 0.05;
            gainNode.gain.setValueAtTime(0.05, startTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                startTime + duration,
            );
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        } catch (error) {
            console.log("Dialogue blip not available:", error);
        }
    }

    /** Pre-create + resume the blip AudioContext. Must happen inside a user
     *  gesture on iOS/Android or the browser leaves it suspended (silent). */
    protected ensureDialogueAudio() {
        if (this.dialogueAudioCtx) {
            if (this.dialogueAudioCtx.state === "suspended") {
                this.dialogueAudioCtx.resume().catch(() => {});
            }
            return;
        }
        const AudioContextClass: typeof AudioContext | undefined =
            typeof AudioContext !== "undefined"
                ? AudioContext
                : (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        try {
            this.dialogueAudioCtx = new AudioContextClass();
            if (this.dialogueAudioCtx.state === "suspended") {
                this.dialogueAudioCtx.resume().catch(() => {});
            }
        } catch (error) {
            console.log("Dialogue blip unavailable:", error);
        }
    }

    // Bob the NPC up/down while they speak. This is safe on the physics NPC:
    // an idle Arcade body copies gameobject->body but only ever writes back
    // the gameobject position when the body itself moves (velocity/gravity),
    // so the tween is not overridden each frame.

    protected startDialogueNpcBob() {
        const npc = this.nearbyNPC as Phaser.Physics.Arcade.Sprite | null;
        if (!npc) return;
        this.stopDialogueNpcBob();
        const bobY = npc.y;
        npc.setData("dialogueBobY", bobY);
        this.dialogueNpcBob = this.tweens.add({
            targets: npc,
            y: bobY - 2,
            duration: 550,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
        });
    }

    protected stopDialogueNpcBob() {
        if (this.dialogueNpcBob) {
            this.dialogueNpcBob.stop();
            this.dialogueNpcBob = null;
        }
        const npc = this.nearbyNPC as Phaser.Physics.Arcade.Sprite | null;
        const bobY = npc?.getData("dialogueBobY");
        if (npc && typeof bobY === "number") {
            npc.setData("dialogueBobY", undefined);
            npc.y = bobY;
        }
    }

    /**
     * Switch the active speaker: swap the nameplate to their color and give
     * the speaker a subtle highlight — the NPC bobs while talking, while the
     * player's line keeps the sprite at full focus.
     */
    protected applyDialogueSpeaker(speaker: string) {
        if (!this.dialogueSpeakerText || !this.dialogueNamePlate) return;

        const playerName =
            (this.registry.get("playerName") as string) || "PLAYER";
        const isPlayerSpeaker = speaker === playerName;
        const theme = this.getNPCTheme();
        const fill = isPlayerSpeaker ? "#FFD700" : theme.nameFill;
        const stroke = isPlayerSpeaker ? "#000000" : theme.nameStroke;
        const plateFill = isPlayerSpeaker ? 0x4a3b00 : 0x2f4f4f;

        this.dialogueSpeakerText.setColor(fill);
        this.dialogueSpeakerText.setStroke(stroke, 2);
        this.dialogueSpeakerText.setText(speaker);

        this.dialogueNamePlate.setFillStyle(plateFill, 1);

        // Size and position the nameplate to fit the current speaker name.
        const textW = this.dialogueSpeakerText.width;
        const plateW = Math.max(textW + 24, 60);
        const cam = this.cameras.main;
        const boxWidth = Math.min(cam.width * 0.85, 700);
        const boxHeight = Math.max(cam.height * 0.28, 110);
        this.dialogueNamePlate.setSize(plateW, 26);
        this.dialogueNamePlate.setPosition(
            -boxWidth / 2 + 16 - 10,
            -boxHeight / 2 + 16 + 2,
        );
        this.dialogueNamePlate.setVisible(true);

        // Speaking highlight: the talker leads the scene.
        if (isPlayerSpeaker) {
            this.stopDialogueNpcBob();
            if (this.player) this.player.setAlpha(1);
        } else {
            if (this.player) this.player.setAlpha(0.92);
            this.startDialogueNpcBob();
        }
    }

    protected startTypewriter(text: string) {
        this.stopTypewriter();
        if (!this.dialogueBodyText) return;

        let i = 0;
        this.dialogueBodyText.setText("");
        this.dialogueTypewriterEvent = this.time.addEvent({
            delay: 18,
            repeat: Math.max(0, text.length - 1),
            callback: () => {
                i++;
                this.dialogueBodyText!.setText(text.substring(0, i));
                this.playDialogueBlip();
                if (i >= text.length) {
                    this.stopTypewriter();
                    this.showDialogueContinueIcon();
                }
            },
        });
    }

    protected showDialogueContinueIcon() {
        if (!this.dialogueContinueIcon) return;
        this.tweens.killTweensOf(this.dialogueContinueIcon);
        this.dialogueContinueIcon.setAlpha(1);
        this.dialogueContinueIcon.setVisible(true);
        this.tweens.add({
            targets: this.dialogueContinueIcon,
            alpha: 0.2,
            duration: 450,
            yoyo: true,
            repeat: -1,
        });
    }

    protected hideDialogueContinueIcon() {
        if (!this.dialogueContinueIcon) return;
        this.tweens.killTweensOf(this.dialogueContinueIcon);
        this.dialogueContinueIcon.setAlpha(1);
        this.dialogueContinueIcon.setVisible(false);
    }

    protected createDialogueBox() {
        // Rebuild safely across same-scene restarts (children die on restart).
        if (this.dialogueBox) {
            this.dialogueBox.destroy(true);
            this.dialogueBox = null;
        }

        const cam = this.cameras.main;
        const boxWidth = Math.min(cam.width * 0.85, 700);
        // Mobile landscape has little vertical room; give the text block a
        // taller floor (capped) so lines aren't clipped.
        const boxHeight = this.isMobile
            ? Math.min(Math.max(cam.height * 0.4, 150), 240)
            : Math.max(cam.height * 0.28, 110);
        const pad = 16;
        // On mobile, lift the box above the home-indicator/safe area.
        const bottomPad = this.isMobile ? 34 : 12;

        this.dialogueBox = this.add.container(
            cam.width / 2,
            cam.height - boxHeight / 2 - bottomPad,
        );
        this.dialogueBox.setDepth(2000);
        this.dialogueBox.setScrollFactor(0);

        const bg = this.add.rectangle(
            0,
            0,
            boxWidth,
            boxHeight,
            0x101418,
            0.92,
        );
        bg.setStrokeStyle(3, 0x2f4f4f, 1);
        this.dialogueBox.add(bg);
        this.dialogueBgRect = bg;

        // Speaker nameplate — a small colored plate behind the character name.
        this.dialogueNamePlate = this.add.rectangle(0, 0, 80, 26, 0x2f4f4f, 1);
        this.dialogueNamePlate.setOrigin(0, 1);
        this.dialogueNamePlate.setStrokeStyle(2, 0x101418, 1);
        this.dialogueNamePlate.setVisible(false);
        this.dialogueBox.add(this.dialogueNamePlate);

        const theme = this.getNPCTheme();
        this.dialogueSpeakerText = this.add.text(
            -boxWidth / 2 + pad,
            -boxHeight / 2 + pad - 8,
            "",
            {
                fontFamily: "Arial Black",
                fontSize: this.isMobile ? 11 : 14,
                color: theme.nameFill,
                stroke: theme.nameStroke,
                strokeThickness: 2,
            },
        );
        this.dialogueSpeakerText.setOrigin(0, 1);
        this.dialogueBox.add(this.dialogueSpeakerText);

        this.dialogueBodyText = this.add.text(
            -boxWidth / 2 + pad,
            -boxHeight / 2 + pad + 6,
            "",
            {
                fontFamily: "Arial Black",
                fontSize: this.isMobile ? 12 : 15,
                color: "#FFFFFF",
                stroke: "#000000",
                strokeThickness: 2,
                wordWrap: { width: boxWidth - pad * 2 },
            },
        );
        this.dialogueBodyText.setOrigin(0, 0);
        this.dialogueBodyText.setLineSpacing(4);
        this.dialogueBox.add(this.dialogueBodyText);

        this.dialogueContinueIcon = this.add.text(
            boxWidth / 2 - pad - 8,
            boxHeight / 2 - pad - 4,
            "▼",
            {
                fontFamily: "Arial Black",
                fontSize: this.isMobile ? 14 : 18,
                color: "#FFD700",
            },
        );
        this.dialogueContinueIcon.setOrigin(1, 1);
        this.dialogueContinueIcon.setVisible(false);
        this.dialogueBox.add(this.dialogueContinueIcon);

        this.dialogueBox.setVisible(false);
    }

    protected showDialogueBox(speakers: string[], lines: string[]) {
        if (!this.dialogueBox) return;

        this.currentDialogueSpeakers = speakers.slice();
        this.dialogueLines = lines.slice();
        this.dialogueLineIndex = 0;
        this.dialogueBox.setVisible(true);
        this.hideDialogueContinueIcon();
        this.applyDialogueSpeaker(speakers[0] || "");
        this.startTypewriter(lines[0]);
    }

    protected hideDialogueBox() {
        this.stopTypewriter();
        this.hideDialogueContinueIcon();
        this.stopDialogueNpcBob();
        if (this.player) this.player.setAlpha(1);
        if (this.dialogueNamePlate) this.dialogueNamePlate.setVisible(false);
        if (this.dialogueBox) this.dialogueBox.setVisible(false);
    }

    protected startDialogue(
        speakers: string[],
        lines: string[],
        afterClose?: () => void,
    ) {
        if (this.dialogueActive) return;
        if (!lines || lines.length === 0) {
            if (afterClose) afterClose();
            return;
        }
        this.dialogueActive = true;
        this.dialogueAfterClose = afterClose || null;
        this.dialogueCameraPanComplete = false;
        this.currentDialogueSpeakers = [];
        this.interactionPrompt.setVisible(false);
        EventBus.emit("dialogue-started");
        // Create/resume the blip AudioContext inside the user gesture so
        // mobile browsers (iOS especially) let the letters make sound.
        this.ensureDialogueAudio();

        // Turn both characters to face each other.
        const nearbyNpc = this.nearbyNPC as Phaser.Physics.Arcade.Sprite | null;
        if (nearbyNpc) {
            this.facePlayerToward(nearbyNpc.x, nearbyNpc.y);
            this.faceNpcTowardPlayer(nearbyNpc);
        }

        // Conversation mode: darken the world and ease the camera in.
        this.showDialogueOverlay();
        this.startDialogueFocus();

        this.createDialogueBox();
        this.showDialogueBox(speakers, lines);
    }

    protected advanceDialogue() {
        if (!this.dialogueActive || !this.dialogueBodyText) return;

        const currentLine = this.dialogueLines[this.dialogueLineIndex];
        const fullyTyped =
            this.dialogueTypewriterEvent === null &&
            this.dialogueBodyText.text.length >= currentLine.length;

        if (!fullyTyped) {
            // Reveal the rest of the current line instantly.
            this.stopTypewriter();
            this.dialogueBodyText.setText(currentLine);
            this.showDialogueContinueIcon();
            return;
        }

        if (this.dialogueLineIndex < this.dialogueLines.length - 1) {
            this.dialogueLineIndex++;
            this.hideDialogueContinueIcon();
            this.applyDialogueSpeaker(
                this.currentDialogueSpeakers[this.dialogueLineIndex] || "",
            );
            this.startTypewriter(this.dialogueLines[this.dialogueLineIndex]);
        } else {
            this.endDialogue();
        }
    }

    protected endDialogue() {
        if (!this.dialogueActive) return;
        this.dialogueActive = false;
        EventBus.emit("dialogue-ended");
        // If the mobile joystick was hidden mid-drag, clear any stale
        // direction so the player doesn't keep walking after the talk.
        this.registry.set("joystickDirection", { x: 0, y: 0 });
        this.hideDialogueBox();
        this.hideDialogueOverlay();

        // Restore the NPC's original flip state if we mirrored it.
        const npc = this.nearbyNPC as Phaser.Physics.Arcade.Sprite | null;
        if (npc && npc.getData("dialogueOrigFlipX") !== undefined) {
            npc.setFlipX(npc.getData("dialogueOrigFlipX"));
            npc.setData("dialogueOrigFlipX", undefined);
        }

        const afterClose = this.dialogueAfterClose;
        this.dialogueAfterClose = null;

        this.endDialogueFocus();
        if (afterClose) afterClose();
    }

    /** Dim the world behind the conversation (below the dialogue box depth). */
    protected showDialogueOverlay() {
        const cam = this.cameras.main;
        if (!this.dialogueOverlay) {
            this.dialogueOverlay = this.add.rectangle(
                0,
                0,
                cam.width,
                cam.height,
                0x000000,
                0.35,
            );
            this.dialogueOverlay.setOrigin(0, 0);
            this.dialogueOverlay.setScrollFactor(0);
            this.dialogueOverlay.setDepth(1990);
        }
        this.dialogueOverlay.setSize(cam.width, cam.height);
        this.dialogueOverlay.setVisible(true);
        this.tweens.killTweensOf(this.dialogueOverlay);
        this.dialogueOverlay.setAlpha(0);
        this.tweens.add({
            targets: this.dialogueOverlay,
            alpha: 0.45,
            duration: 280,
            ease: "Sine.easeOut",
        });
    }

    protected hideDialogueOverlay() {
        if (!this.dialogueOverlay) return;
        this.tweens.killTweensOf(this.dialogueOverlay);
        this.tweens.add({
            targets: this.dialogueOverlay,
            alpha: 0,
            duration: 260,
            ease: "Sine.easeIn",
            onComplete: () => {
                if (this.dialogueOverlay) {
                    this.dialogueOverlay.setVisible(false);
                }
            },
        });
    }

    // Camera: gentle zoom + fade into conversation mode, then ease back out.

    protected startDialogueFocus() {
        const cam = this.cameras.main;
        const npc = this.nearbyNPC as Phaser.Physics.Arcade.Sprite | null;
        if (!npc || !this.player) return;

        const focusX = (this.player.x + npc.x) / 2;
        const focusY = (this.player.y + npc.y) / 2;

        this.dialogueOriginalZoom = cam.zoom;
        this.tweens.killTweensOf(cam);
        cam.stopFollow();
        this.dialogueCameraPanComplete = false;
        this.tweens.add({
            targets: cam,
            scrollX: focusX - cam.width / 2,
            scrollY: focusY - cam.height / 2,
            zoom: Math.min(this.dialogueOriginalZoom + 0.08, 1.2),
            duration: 600,
            ease: "Sine.easeInOut",
            onComplete: () => {
                this.dialogueCameraPanComplete = true;
            },
        });
        cam.fadeIn(300, 0, 0, 0);
    }

    protected endDialogueFocus() {
        const cam = this.cameras.main;
        if (!this.player) return;

        this.tweens.killTweensOf(cam);
        cam.stopFollow();
        this.tweens.add({
            targets: cam,
            scrollX: this.player.x - cam.width / 2,
            scrollY: this.player.y - cam.height / 2,
            zoom: this.dialogueOriginalZoom,
            duration: 450,
            ease: "Sine.easeInOut",
            onComplete: () => {
                this.dialogueCameraPanComplete = false;
                this.cameras.main.startFollow(this.player);
                this.optimizeCameraForOpenWorld();
            },
        });
        // Dip to black briefly, then reveal the gameplay view again.
        cam.fadeOut(250, 0, 0, 0);
        cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            cam.fadeIn(250, 0, 0, 0);
        });
    }

    // Make the player face toward a world position (e.g. an NPC).

    protected facePlayerToward(x: number, y: number) {
        if (!this.player) return;
        const dx = x - this.player.x;
        const dy = y - this.player.y;
        const direction =
            Math.abs(dx) > Math.abs(dy)
                ? dx > 0
                    ? "right"
                    : "left"
                : dy > 0
                  ? "front"
                  : "back";
        this.lastDirection = direction;
        const spriteKey = this.getPlayerTextureKey(direction);
        if (this.textures.exists(spriteKey)) {
            this.player.setTexture(spriteKey);
        }
        if (this.anims && this.anims.exists) {
            const idleAnimKey = this.getIdleAnimKey(direction);
            if (this.anims.exists(idleAnimKey)) {
                this.player.play(idleAnimKey, true);
            }
        }
    }

    // Flip the NPC sprite to face horizontally toward the player.

    protected faceNpcTowardPlayer(npc: Phaser.Physics.Arcade.Sprite) {
        if (!this.player) return;
        const dx = this.player.x - npc.x;
        const dy = this.player.y - npc.y;
        // Only flip for horizontal positioning (skip vertical-only offsets).
        if (Math.abs(dx) > Math.abs(dy)) {
            if (npc.getData("dialogueOrigFlipX") === undefined) {
                npc.setData("dialogueOrigFlipX", npc.flipX);
            }
            npc.setFlipX(dx < 0);
        }
    }

    // Reposition the dialogue box after resize/rotation so it stays pinned.
    protected repositionDialogueBox() {
        if (!this.dialogueBox || !this.dialogueBgRect) return;
        const cam = this.cameras.main;
        const boxWidth = Math.min(cam.width * 0.85, 700);
        const boxHeight = this.isMobile
            ? Math.min(Math.max(cam.height * 0.4, 150), 240)
            : Math.max(cam.height * 0.28, 110);
        const pad = 16;

        this.dialogueBox.setPosition(
            cam.width / 2,
            cam.height - boxHeight / 2 - (this.isMobile ? 34 : 12),
        );
        this.dialogueBgRect.setSize(boxWidth, boxHeight);
        this.dialogueSpeakerText?.setPosition(
            -boxWidth / 2 + pad,
            -boxHeight / 2 + pad - 8,
        );
        this.dialogueNamePlate?.setPosition(
            -boxWidth / 2 + pad - 10,
            -boxHeight / 2 + pad - 3,
        );
        this.dialogueNamePlate?.setSize(
            Math.max((this.dialogueSpeakerText?.width ?? 0) + 24, 60),
            26,
        );
        this.dialogueBodyText?.setPosition(
            -boxWidth / 2 + pad,
            -boxHeight / 2 + pad + 6,
        );
        this.dialogueBodyText?.setStyle({
            wordWrap: { width: boxWidth - pad * 2 },
        });
        this.dialogueContinueIcon?.setPosition(
            boxWidth / 2 - pad - 8,
            boxHeight / 2 - pad - 4,
        );
    }

    checkCollectionAchievement() {
        const gameStateManager = GameStateManager.getInstance();
        const totalItems = this.collectibleItemsData.length;
        const cfg = this.getWorldBackgroundConfig();
        const title = cfg.label.charAt(0).toUpperCase() + cfg.label.slice(1);

        const allItemsCollected = this.collectibleItemsData.every((item) =>
            gameStateManager.isItemCollected(item.id),
        );

        if (allItemsCollected) {
            EventBus.emit("show-notification", {
                type: "success",
                title: "🏆 ${title} Master Collector! 🏆",
                message: `Incredible! You've collected all ${totalItems} items in the ${title}! You've earned the "${this.getTreasureHunterBadge()} Treasure Hunter" badge and a bonus of 100 coins + 200 points!`,
                icon: "🎖️",
                actions: [
                    {
                        label: "Amazing!",
                        action: () => {},
                        style: "primary",
                    },
                ],
            });

            gameStateManager.addCoins(
                100,
                "${title} Master Collector Achievement",
            );
            const progress = gameStateManager.getProgress();
            if (progress) {
                progress.totalScore += 200;
                gameStateManager.updatePlaytime(0);
            }

            console.log("🏆 ${title} Master Collector Achievement unlocked!");
        }
    }

    protected abstract getTreasureHunterBadge(): string;

    createNPCs() {
        const theme = this.getNPCTheme();
        this.npcs = this.physics.add.group();
        this.reloadNPCPositionOverrides();

        console.log(`Creating ${theme.noun} NPCs for Level ${theme.level}...`);

        // Debug: List all available textures
        console.log(
            `Available textures in ${theme.className}:`,
            Object.keys(this.textures.list),
        );

        // Map official NPC names to their dedicated level image keys
        const npcImageMap = theme.imageMap;

        // Check if official NPC images are loaded, if not load them directly
        const levelImages = Object.values(npcImageMap);
        const missingImages = levelImages.filter(
            (img) => !this.textures.exists(img),
        );

        if (missingImages.length > 0) {
            console.log(
                `Missing Level ${theme.level} ${theme.noun.toLowerCase()} official images, loading them directly:`,
                missingImages,
            );
            missingImages.forEach((img) => {
                // Map the image key back to the file name
                const imageFileMap = theme.imageFileMap;
                this.load.image(
                    img,
                    `assets/LEVEL${theme.level}/${(imageFileMap as Record<string, string>)[img]}`,
                );
            });
            this.load.start();

            this.load.once("complete", () => {
                console.log(
                    `Level ${theme.level} ${theme.noun.toLowerCase()} official images loaded, creating NPCs...`,
                );
                this.createNPCsAfterLoad(npcImageMap);
            });
            return;
        }

        this.createNPCsAfterLoad(npcImageMap);
    }

    createNPCsAfterLoad(npcImageMap: any) {
        const theme = this.getNPCTheme();
        this.missionLocations.forEach((location, index) => {
            // Use percentage coordinates if available, otherwise fallback to tile coordinates
            let worldX, worldY;

            // NPC Position Editor override wins over the authored default.
            const npcOverride =
                this.npcPositionOverrides?.get(location.missionId) ?? null;
            const npcPercentX = npcOverride
                ? npcOverride.percentX
                : location.percentX;
            const npcPercentY = npcOverride
                ? npcOverride.percentY
                : location.percentY;

            if (npcPercentX !== undefined && npcPercentY !== undefined) {
                // Use background-relative percentage coordinates
                const coords = this.percentageToWorldCoordinates(
                    npcPercentX,
                    npcPercentY,
                );
                worldX = coords.x;
                worldY = coords.y;
                console.log(
                    `${theme.noun} NPC ${location.npc} positioned at (${npcPercentX}%, ${npcPercentY}%) = (${worldX}, ${worldY})`,
                );
            } else {
                // Fallback to tile-based coordinates
                worldX = location.x * this.tileSize + this.tileSize / 2;
                worldY = location.y * this.tileSize + this.tileSize / 2;
                console.log(
                    `${theme.noun} NPC ${location.npc} positioned at tile (${location.x}, ${location.y}) = (${worldX}, ${worldY})`,
                );
            }

            // Get the specific NPC image for this official
            const npcImageKey = npcImageMap[location.npc] || "student-front-1";

            console.log(
                `Creating ${theme.noun} NPC: ${location.npc} with image: ${npcImageKey}`,
            );
            console.log(
                `Level ${theme.level} texture exists for ${npcImageKey}:`,
                this.textures.exists(npcImageKey),
            );

            // Use fallback if texture doesn't exist
            const finalImageKey = this.textures.exists(npcImageKey)
                ? npcImageKey
                : "student-front-1";

            const npc = this.physics.add.sprite(worldX, worldY, finalImageKey);
            // Size by target height, not a fixed scale: renders every NPC at a
            // fixed on-screen height (a bit bigger than the player), whatever the
            // source image's pixel resolution (exports vary 408-2000px+). A hard
            // floor guarantees the NPC is always visible even if the player's
            // displayHeight reads anomalously low. Matches the Barangay map.
            const npcTargetHeight =
                Math.max(this.player?.displayHeight || 0, 80) * 1.1;
            npc.setScale(npcTargetHeight / npc.height);
            npc.setInteractive();

            // Set up collision body for NPC — size from frame pixels so the hitbox
            // tracks the on-screen sprite (Phaser multiplies source size by scale;
            // sizing from the scaled display size shrinks/misplaces the box).
            const npcFrame = npc.frame;
            (npc as any).body.setSize(
                npcFrame.realWidth * 0.55,
                npcFrame.realHeight * 0.7,
                false,
            );
            (npc as any).body.setOffset(
                npcFrame.realWidth * 0.225,
                npcFrame.realHeight * 0.15,
            );
            (npc as any).body.setImmovable(true);
            (npc as any).body.setGravity(0, 0);
            (npc as any).body.setVelocity(0, 0);
            (npc as any).body.setAngularVelocity(0);

            // Add NPC name text via the themed config
            const npcName = this.add
                .text(worldX, worldY - 50, location.npc, {
                    fontFamily: "Arial Black",
                    fontSize: 11,
                    color: theme.nameFill,
                    stroke: theme.nameStroke,
                    strokeThickness: 2,
                    align: "center",
                    shadow: {
                        offsetX: 1,
                        offsetY: 1,
                        color: theme.nameShadowColor,
                        blur: 2,
                        fill: true,
                    },
                })
                .setOrigin(0.5)
                .setDepth(100);

            // Add mission indicator with validation-based styling
            const gameStateManager = GameStateManager.getInstance();
            let indicatorText = `Mission #${location.missionId}`;
            let indicatorColor = "#FFD700"; // Gold for available

            if (gameStateManager.isMissionCompleted(location.missionId)) {
                indicatorText = "✓";
                indicatorColor = "#32CD32"; // Lime green for completed
            } else if (!gameStateManager.canAccessMission(location.missionId)) {
                indicatorText = "🔒";
                indicatorColor = "#DC143C"; // Crimson red for locked
            }

            const missionIndicator = this.add
                .text(worldX + 25, worldY - 25, indicatorText, {
                    fontFamily: "Arial Black",
                    fontSize: 18,
                    color: indicatorColor,
                    stroke: "#000000",
                    strokeThickness: 3,
                    align: "center",
                    shadow: {
                        offsetX: 1,
                        offsetY: 1,
                        color: "#000000",
                        blur: 2,
                        fill: true,
                    },
                })
                .setOrigin(0.5)
                .setDepth(100);

            // Store name/text label refs for live repositioning (NPC Position Editor)
            this.npcNameLabels.set(location.missionId, npcName);

            // Store reference for real-time updates
            this.missionIndicators.set(location.missionId, missionIndicator);

            // Add mission number beside NPC name
            const missionNumber = this.add
                .text(worldX - 35, worldY - 35, `#${location.missionId}`, {
                    fontFamily: "Arial Black",
                    fontSize: 12,
                    color: theme.addressFill,
                    stroke: theme.nameStroke,
                    strokeThickness: 2,
                    align: "center",
                    backgroundColor: "#2F4F4F", // Dark slate gray
                    padding: { x: 4, y: 2 },
                })
                .setOrigin(0.5)
                .setDepth(100);
            this.missionNumberLabels.set(location.missionId, missionNumber);

            // Add a themed glow effect around NPCs
            const glow = this.add.circle(
                worldX,
                worldY,
                25,
                theme.glowColor,
                0.15,
            );
            glow.setDepth(-1);
            this.npcGlowEffects.set(location.missionId, { baseGlow: glow });

            // Store mission data and original position on NPC. missionData is a
            // per-NPC COPY so the shared mapData arrays are never mutated — it
            // carries the resolved (override) percents so reposition helpers
            // honor the editor's placements.
            npc.setData("missionData", {
                ...location,
                percentX: npcPercentX,
                percentY: npcPercentY,
            });
            npc.setData("originalPosition", { x: worldX, y: worldY });

            this.npcs.add(npc);
        });

        console.log(
            `Created ${this.missionLocations.length} ${theme.noun} NPCs for Level ${theme.level} with dedicated ${theme.noun.toLowerCase()} official sprites from LEVEL${theme.level} folder`,
        );

        // Update indicators after all NPCs are created
        this.updateNPCIndicators();

        // Add collision between player and NPCs
        this.physics.add.collider(this.player, this.npcs, (player, npc) => {
            (npc as any).body.setVelocity(0, 0);
            (npc as any).body.setAngularVelocity(0);
            (npc as any).body.setImmovable(true);
            (player as any).body.setVelocity(0, 0);
            (player as any).body.setAngularVelocity(0);
        });

        console.log(`${theme.noun} NPC collision detection enabled`);
    }

    protected abstract getNPCTheme(): {
        noun: string;
        officialAdjective: string;
        level: number;
        className: string;
        nameFill: string;
        nameStroke: string;
        nameShadowColor: string;
        addressFill: string;
        glowColor: number;
        imageMap: Record<string, string>;
        imageFileMap: Record<string, string>;
    };

    protected abstract getCollisionDataKey(): string;

    protected onLocationCalculated(relativeX: number, relativeY: number): void {
        // Hook for subclasses (e.g., secret location checks)
    }

    updateLocationDisplay() {
        if (!this.player) {
            return;
        }

        // Rebuild the location label if it survived a scene restart in a dead
        // state. Revisiting a map reuses the same scene instance, but the
        // label is only recreated when null, so the old (destroyed) Text stays
        // referenced. Text.destroy() also destroys its canvas texture, and
        // calling setText() on it crashes inside Frame.updateUVs (drawImage on
        // a null source image).
        if (this.locationDisplay) {
            const texture = this.locationDisplay.texture;
            const source = texture ? texture.source : null;
            const textureDead =
                !texture ||
                !source ||
                source.length === 0 ||
                !source[0] ||
                source[0].image === null;
            if (textureDead) {
                if (this.locationDisplay.active) {
                    this.locationDisplay.destroy();
                }
                this.locationDisplay = null;
            }
        }
        if (!this.locationDisplay) {
            this.createLocationDisplay();
        }
        if (this.locationDisplay && this.player) {
            let relativeX = 0,
                relativeY = 0;
            let areaName = this.getDefaultAreaName();

            if (this.backgroundImage) {
                const bgWidth = this.backgroundImage.displayWidth;
                const bgHeight = this.backgroundImage.displayHeight;
                const bgX = this.backgroundImage.x;
                const bgY = this.backgroundImage.y;

                const playerRelativeX = this.player.x - (bgX - bgWidth / 2);
                const playerRelativeY = this.player.y - (bgY - bgHeight / 2);

                relativeX = Math.max(
                    0,
                    Math.min(
                        100,
                        Math.round((playerRelativeX / bgWidth) * 100),
                    ),
                );
                relativeY = Math.max(
                    0,
                    Math.min(
                        100,
                        Math.round((playerRelativeY / bgHeight) * 100),
                    ),
                );

                this.onLocationCalculated(relativeX, relativeY);
                areaName = this.getAreaName(relativeX, relativeY);

                console.log(
                    `${this.getCameraLogName()} player position: ${relativeX}%, ${relativeY}% - Area: ${areaName}`,
                );
            } else {
                const mapX = Math.round(this.player.x / this.tileSize);
                const mapY = Math.round(this.player.y / this.tileSize);
                relativeX = mapX;
                relativeY = mapY;
            }

            const displayText = `${areaName}\n(${relativeX}%, ${relativeY}%)`;
            this.locationDisplay.setText(displayText);
            this.locationDisplay.setPosition(this.player.x, this.player.y - 60);
            this.locationDisplay.setStyle({
                fontSize: this.isMobile ? 10 : 12,
            });
        }
    }

    updateBackgroundForOrientation() {
        const cfg = this.getWorldBackgroundConfig();
        const title = cfg.label.charAt(0).toUpperCase() + cfg.label.slice(1);

        // Find the background image and update its scale
        const children = this.children.list;
        for (let child of children as Phaser.GameObjects.Image[]) {
            if (child.texture && child.texture.key === cfg.textureKey) {
                const gameWidth = this.scale.width;
                const gameHeight = this.scale.height;

                // Scale background to cover the entire Phaser game canvas
                const scaleToCoverWidth = gameWidth / child.width;
                const scaleToCoverHeight = gameHeight / child.height;

                // Use the larger scale to ensure the image covers the entire game canvas
                const scaleX = Math.max(scaleToCoverWidth, scaleToCoverHeight);
                const scaleY = scaleX; // Keep aspect ratio

                child.setScale(scaleX, scaleY);
                child.setPosition(gameWidth / 2, gameHeight / 2);

                console.log(
                    `${title} background rescaled to cover entire Phaser game canvas:`,
                );
                console.log(
                    "Game canvas dimensions:",
                    gameWidth,
                    "x",
                    gameHeight,
                );
                console.log(
                    "Image dimensions:",
                    child.width,
                    "x",
                    child.height,
                );
                console.log(
                    "Scale factors:",
                    scaleToCoverWidth,
                    scaleToCoverHeight,
                );
                console.log("Final scale:", scaleX, scaleY);
                break;
            }
        }
    }

    handleResize() {
        if (!this.cameras || !this.cameras.main) {
            console.log("Camera not yet initialized, skipping resize");
            return;
        }

        console.log(
            `${this.getCameraLogName()} screen resized, updating camera and background...`,
        );
        this.optimizeCameraForOpenWorld();
        this.updateBackgroundForOrientation();

        this.isMobile =
            this.sys.game.device.input.touch ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent,
            ) ||
            window.innerWidth <= 768;

        console.log(
            `${this.getCameraLogName()} mobile device detected after resize:`,
            this.isMobile,
        );

        // Keep the dialogue box pinned to the viewport bottom.
        this.repositionDialogueBox();

        // Keep the minimap pinned clear of the mobile joystick after rotates/resizes.
        if (this.minimap) {
            const size = this.isMobile ? 100 : 150;
            const x = this.isMobile ? 70 : 90;
            const y =
                this.cameras.main.height - (this.isMobile ? 210 : 170);
            this.minimap.setPosition(x, y);
        }
    }

    createPlayer() {
        // Use the player sprite for the chosen gender (boy walk-cycle or girl)
        const frontKey = this.getPlayerTextureKey("front");
        const playerTexture = this.textures.exists(frontKey)
            ? frontKey
            : this.isGirlPlayer() && this.textures.exists("student-front-1")
              ? "student-front-1"
              : "player";

        let playerX, playerY;

        if (this.backgroundImage) {
            // Spawn at 30%, 50% of the background image
            const coords = this.percentageToWorldCoordinates(30, 50);
            playerX = coords.x;
            playerY = coords.y;
        } else {
            // Fallback to tile-based position if background not ready
            playerX = 16 * this.tileSize;
            playerY = 12 * this.tileSize;
        }

        this.player = this.physics.add.sprite(playerX, playerY, playerTexture);

        // Remove world bounds collision for unlimited movement
        this.player.setCollideWorldBounds(false);
        this.player.setScale(this.getPlayerScale());

        // Create player animations if not already created
        this.createPlayerAnimations();
    }

    percentageToWorldCoordinates(percentX: number, percentY: number) {
        if (!this.backgroundImage) {
            // Fallback to tile-based coordinates
            return {
                x: (percentX / 100) * (this.mapWidth * this.tileSize),
                y: (percentY / 100) * (this.mapHeight * this.tileSize),
            };
        }

        const bgWidth = this.backgroundImage.displayWidth;
        const bgHeight = this.backgroundImage.displayHeight;
        const bgX = this.backgroundImage.x;
        const bgY = this.backgroundImage.y;

        // Calculate world coordinates from percentage
        const worldX = bgX + (percentX - 50) * (bgWidth / 100);
        const worldY = bgY + (percentY - 50) * (bgHeight / 100);

        return { x: worldX, y: worldY };
    }
}

