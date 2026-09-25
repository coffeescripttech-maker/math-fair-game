import { GameObjects, Scene } from "phaser";
import { OpenWorldMapScene } from "./OpenWorldMapScene";
import { EventBus } from "../EventBus";
import { GameStateManager } from "../../utils/GameStateManager";
import SecretQuestService from "../../services/SecretQuestService";
import CollisionService from "../../services/CollisionService";
import { barangayMissionLocations, barangayCollectibleItems, barangayMissionMetadata } from "../config/mapData";

/**
 * BarangayMap - Level 1 (Missions 1-10)
 * 
 * 🎯 AUTO-PROGRESSION: When all 10 Barangay missions are completed,
 * the game automatically transitions to CityMap (Level 2) after showing
 * a level-up notification. No manual action required from the player.
 * 
 * Progression logic is handled in App.tsx when mission completion
 * triggers a level-up event.
 */
export class BarangayMap extends OpenWorldMapScene {
    // 🎨 DEBUG MODE: Set to false to hide collision boundaries in production

    map: Phaser.Tilemaps.Tilemap;
    tileset: Phaser.Tilemaps.Tileset;
    groundLayer: Phaser.Tilemaps.TilemapLayer;
    buildingsLayer: Phaser.Tilemaps.TilemapLayer;
    collisionLayer: Phaser.Tilemaps.TilemapLayer;
    questLog: GameObjects.Text;
    coinsText: GameObjects.Text;
    badgesText: GameObjects.Text;
    mapButton: GameObjects.Text;
    isUIVisible: boolean = false;
    // Unlimited open world - no tile restrictions
    tileSize: number = 32; // Keep for reference but not used for boundaries
    mapWidth: number = 1000; // Large world width (unlimited)
    mapHeight: number = 1000; // Large world height (unlimited)
    lastDirection: string = "front"; // Track last direction for idle sprites

    collectibleItems: Map<string, any> = new Map(); // Store collectible sprites by ID
    masterCollectorAwarded: boolean = false; // Once-a-level full-collection bonus

    // Collision system

    // Mission locations with tile coordinates
    missionLocations = barangayMissionLocations;

    // Collectible items for Barangay (Level 1)
    collectibleItemsData = barangayCollectibleItems;

    getLocationDisplayColor(): string {
        return "rgba(0, 0, 0, 0.85)";
    }

    getInteractionPromptColor(): string {
        return "#FFFFFF";
    }

    getInteractionPromptStroke(): string {
        return "#000000";
    }

    getMinimapTitle(): string {
        return "MAP";
    }

    getMinimapTitleFontSize(): string {
        return "12px";
    }

    getMinimapTitleColor(): string {
        return "#FFFFFF";
    }

    getMinimapBorderColor(): number {
        return 0x000000;
    }

    getMinimapBorderWidth(): number {
        return 3;
    }

    getCameraLogName(): string {
        return "Barangay Map";
    }

    getDefaultAreaName(): string {
        return "Barangay";
    }

    getAreaName(relativeX: number, relativeY: number): string {
        if (relativeX < 25 && relativeY < 25) {
        return "Northwest District";
        } else if (relativeX >= 75 && relativeY < 25) {
        return "Northeast District";
        } else if (relativeX < 25 && relativeY >= 75) {
        return "Southwest District";
        } else if (relativeX >= 75 && relativeY >= 75) {
        return "Southeast District";
        } else if (
        relativeX >= 37.5 &&
        relativeX < 62.5 &&
        relativeY >= 37.5 &&
        relativeY < 62.5
        ) {
        return "Central District";
        } else if (
        relativeX >= 25 &&
        relativeX < 75 &&
        relativeY < 25
        ) {
        return "North District";
        } else if (
        relativeX >= 25 &&
        relativeX < 75 &&
        relativeY >= 75
        ) {
        return "South District";
        } else if (
        relativeX < 25 &&
        relativeY >= 25 &&
        relativeY < 75
        ) {
        return "West District";
        } else if (
        relativeX >= 75 &&
        relativeY >= 25 &&
        relativeY < 75
        ) {
        return "East District";
        } else {
        return "Barangay";
        }
    }

    onLocationCalculated(relativeX: number, relativeY: number): void {
        this.checkSecretLocation(relativeX, relativeY);
    }

    constructor() {
        super("BarangayMap");
    }

    create() {
        // Create background image
        this.createBackground();

        // Note: Tile textures and tile map are disabled since we're using background image

        // Create player with collision (will be positioned relative to background)
        this.createPlayer();

        // Create NPCs
        this.createNPCs();

        // Create UI
        this.createUI();

        this.setupCameraAndDelayedUI();
    }

    // Method to update NPC indicators in real-time
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

        console.log("NPC indicators updated in real-time");
    }

    // Method to activate/deactivate NPC glow effect
    activateNPCGlow(missionId: number, activate: boolean) {
        const glowData = this.npcGlowEffects.get(missionId);
        if (!glowData) return;

        const { interactiveGlow, npc } = glowData;

        if (activate && !glowData.isAnimating) {
            // Start glowing animation
            interactiveGlow.setVisible(true);
            glowData.isAnimating = true;

            // Create pulsing glow animation
            glowData.animationTween = this.tweens.add({
                targets: interactiveGlow,
                alpha: { from: 0.3, to: 0.8 },
                scaleX: { from: 1, to: 1.2 },
                scaleY: { from: 1, to: 1.2 },
                duration: 800,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
                onStart: () => {
                    console.log(`Activated glow for NPC Mission #${missionId}`);
                },
            });

            // Add slight NPC highlight effect
            this.tweens.add({
                targets: npc,
                alpha: { from: 1, to: 0.9 },
                duration: 400,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
            });
        } else if (!activate && glowData.isAnimating) {
            // Stop glowing animation
            interactiveGlow.setVisible(false);
            glowData.isAnimating = false;

            // Stop and cleanup animations
            if (glowData.animationTween) {
                glowData.animationTween.destroy();
                glowData.animationTween = null;
            }

            // Stop NPC highlight effect
            this.tweens.killTweensOf(npc);
            npc.setAlpha(1); // Reset NPC alpha

            console.log(`Deactivated glow for NPC Mission #${missionId}`);
        }
    }


    // Open world camera scrolling optimization
    // Handle background scaling for orientation changes


    createBackground() {
        console.log("Creating background...");
        console.log(
            "Barangay background texture exists:",
            this.textures.exists("barangay-bg")
        );
        console.log(
            "Barangay background root texture exists:",
            this.textures.exists("barangay-bg-root")
        );

        // If textures don't exist, load them directly
        if (!this.textures.exists("barangay-bg-root")) {
            console.log("Textures not loaded, loading them now...");
            this.load.image("barangay-bg-root", "assets/barangay-background.png");
            this.load.start();

            this.load.once("complete", () => {
                console.log("Textures loaded, creating background...");
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
        console.log("Creating background image after delay...");
        console.log(
            "Barangay background root texture exists now:",
            this.textures.exists("barangay-bg-root")
        );

        // Create background image as the main visual element
        if (this.textures.exists("barangay-bg-root")) {
            console.log("Using root barangay background image...");
            console.log(
                "Texture details:",
                this.textures.get("barangay-bg-root")
            );
            console.log(
                "barangay-bg-root texture source:",
                this.textures.get("barangay-bg-root").source
            );
            console.log(
                "barangay-bg-root texture width/height:",
                this.textures.get("barangay-bg-root").getSourceImage().width,
                this.textures.get("barangay-bg-root").getSourceImage().height
            );

            try {
                // Get Phaser game canvas dimensions for perfect coverage
                const gameWidth = this.scale.width;
                const gameHeight = this.scale.height;
                const gameCenterX = gameWidth / 2;
                const gameCenterY = gameHeight / 2;
                const isLandscape = gameWidth > gameHeight;

                const bgImage = this.add.image(
                    gameCenterX,
                    gameCenterY,
                    "barangay-bg-root"
                );
                bgImage.setOrigin(0.5, 0.5);
                bgImage.setDepth(-2000); // Much further behind everything

                // Scale background to cover the entire Phaser game canvas
                // This ensures the image fills the game canvas completely
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
                    "Background scaling to cover entire Phaser game canvas:"
                );
                console.log(
                    "Game canvas dimensions:",
                    gameWidth,
                    "x",
                    gameHeight
                );
                // console.log(
                //     "Massive world dimensions:",
                //     worldWidth,
                //     "x",
                //     worldHeight
                // );
                console.log(
                    "Image dimensions:",
                    bgImage.width,
                    "x",
                    bgImage.height
                );
                console.log(
                    "Scale factors:",
                    scaleToCoverWidth,
                    scaleToCoverHeight
                );
                console.log("Calculated scale:", scaleX, scaleY);
                console.log("Final scale:", finalScaleX, finalScaleY);

                bgImage.setScale(finalScaleX, finalScaleY);

                // Position background to cover the entire Phaser game canvas
                bgImage.setPosition(gameWidth / 2, gameHeight / 2);

                // Store the background reference for future updates
                this.backgroundImage = bgImage;

                bgImage.setAlpha(1); // Fully visible
                bgImage.setVisible(true); // Explicitly set visible
                console.log("Root background image created successfully");

                // Reposition player relative to background if player already exists
                if (this.player) {
                    this.repositionPlayerRelativeToBackground();
                }

                // Reposition NPCs relative to background if they already exist
                this.repositionNPCsRelativeToBackground();

                // Create collectibles after background is ready
                this.time.delayedCall(300, () => {
                    this.createCollectibles();
                });

                // Load collisions after background is ready
                this.time.delayedCall(400, () => {
                    this.loadCollisions();
                });
                console.log(
                    "Game canvas dimensions:",
                    gameWidth,
                    "x",
                    gameHeight
                );
                console.log(
                    "Orientation:",
                    isLandscape ? "Landscape" : "Portrait"
                );
                console.log(
                    "Game canvas dimensions:",
                    gameWidth,
                    "x",
                    gameHeight
                );
                console.log("Game canvas center:", gameCenterX, gameCenterY);
                console.log("Background position:", bgImage.x, bgImage.y);
                console.log("Background scale:", scaleX, scaleY);
                console.log("Background visible:", bgImage.visible);
            } catch (error) {
                console.error("Error creating root background image:", error);
                // Fallback to teal background if image fails
                const mapWidth = this.mapWidth * this.tileSize;
                const mapHeight = this.mapHeight * this.tileSize;
                const mapCenterX = mapWidth / 2;
                const mapCenterY = mapHeight / 2;

                const bg = this.add.rectangle(
                    mapCenterX,
                    mapCenterY,
                    mapWidth,
                    mapHeight,
                    0x20b2aa
                );
                bg.setDepth(-2000);
                console.log("Using fallback teal background for entire map");
            }
        } else {
            console.log(
                "Barangay background texture not found, using fallback"
            );
            // Create a teal background as fallback for entire map
            const mapWidth = this.mapWidth * this.tileSize;
            const mapHeight = this.mapHeight * this.tileSize;
            const mapCenterX = mapWidth / 2;
            const mapCenterY = mapHeight / 2;

            const bg = this.add.rectangle(
                mapCenterX,
                mapCenterY,
                mapWidth,
                mapHeight,
                0x20b2aa
            );
            bg.setDepth(-2000);
        }
    }


    createPlayer() {
        // Check if student sprite texture exists, otherwise use a fallback
        const frontKey = this.getPlayerTextureKey("front");
        const playerTexture = this.textures.exists(frontKey)
            ? frontKey
            : this.isGirlPlayer() && this.textures.exists("student-front-1")
              ? "student-front-1"
              : "player";

        console.log("Creating player with texture:", playerTexture);
        console.log(
            "Student texture exists:",
            this.textures.exists(frontKey)
        );

        // Calculate player position relative to background image
        let playerX, playerY;

        if (this.backgroundImage) {
            // Position relative to background image center
            // Use percentage-based positioning (e.g., 50% of background width/height)
            const bgWidth = this.backgroundImage.displayWidth;
            const bgHeight = this.backgroundImage.displayHeight;
            const bgX = this.backgroundImage.x;
            const bgY = this.backgroundImage.y;

            // Spawn player at center of background image
            playerX = bgX;
            playerY = bgY;

            console.log(
                "Player spawning at background center:",
                playerX,
                playerY
            );
            console.log("Background dimensions:", bgWidth, bgHeight);
            console.log("Background position:", bgX, bgY);
        } else {
            // Fallback to original position if background not ready
            playerX = 16 * this.tileSize;
            playerY = 12 * this.tileSize;
            console.log("Using fallback player position:", playerX, playerY);
        }

        this.player = this.physics.add.sprite(playerX, playerY, playerTexture);
        // Remove world bounds collision for unlimited movement
        this.player.setCollideWorldBounds(false);
        this.player.setScale(this.getPlayerScale()); // Match on-screen size for both genders

        console.log(
            "Player created with UNLIMITED movement - no world bounds collision"
        );

        // Temporarily disable color tinting for student sprites
        // const playerColor = this.registry.get("playerColor") || 0x00ff00;
        // this.player.setTint(playerColor);

        // Add collision with buildings and trees
        this.physics.add.collider(this.player, this.physics.world.staticBodies as any);

        // Check if student sprite textures are loaded before creating animations
        if (this.textures.exists(frontKey)) {
            console.log("Student sprites loaded, creating animations...");
            this.createPlayerAnimations();

            // Set initial idle animation after a short delay to ensure animations are ready
            const idleAnimKey = this.getIdleAnimKey("front");
            this.time.delayedCall(100, () => {
                console.log("Attempting to set initial idle animation...");
                console.log(
                    "Animation exists:",
                    this.anims.exists(idleAnimKey)
                );
                if (this.anims.exists(idleAnimKey)) {
                    this.player.play(idleAnimKey, true);
                    console.log("Initial idle animation set successfully!");
                } else {
                    console.log(
                        "Animation not found, skipping initial animation"
                    );
                }
            });
        } else {
            console.log(
                "Student sprites not loaded yet, skipping animation creation"
            );
            // Retry after a short delay
            this.time.delayedCall(500, () => {
                if (this.textures.exists(frontKey)) {
                    console.log(
                        "Student sprites now loaded, creating animations..."
                    );
                    this.createPlayerAnimations();
                }
            });
        }
    }

    createNPCs() {
        this.npcs = this.physics.add.group();
        this.reloadNPCPositionOverrides();

        // Debug: List all available textures
        console.log(
            "Available textures in BarangayMap:",
            Object.keys(this.textures.list)
        );

        // Map mission NPC names (from barangayMissionLocations) to their image keys.
        const npcImageMap = {
            "Miguel": "coach-miguel",
            "Aling Maria": "store-owner-aling-maria",
            "Ben": "high-school-student",
            "Ana": "student-leader-ana",
            "Lola Rosa": "parent-rosa",
            "Mang Pedro": "vendor-mang-pedro",
            "Kuya Noel": "gardener-noel",
            "Teacher Cruz": "math-teacher-mrs-cruz",
            "Danny": "shop-owner-danny",
            // Temporary stand-in until a dedicated "daughter" asset is generated.
            "Barangay Captain's Daughter": "barangay-captain",
        };

        // Check if NPC images are loaded, if not load them directly
        const npcImages = Object.values(npcImageMap);
        const missingImages = npcImages.filter(
            (img) => !this.textures.exists(img)
        );

        if (missingImages.length > 0) {
            console.log(
                "Missing NPC images, loading them directly:",
                missingImages
            );
            missingImages.forEach((img) => {
                this.load.image(img, `assets/LEVEL1/${img}.png`);
            });
            this.load.start();

            this.load.once("complete", () => {
                console.log("NPC images loaded, creating NPCs...");
                this.createNPCsAfterLoad(npcImageMap);
            });
            return;
        }

        this.createNPCsAfterLoad(npcImageMap);
    }

    createNPCsAfterLoad(npcImageMap: any) {
        this.missionLocations.forEach((location, index) => {
            // Use percentage coordinates if available, otherwise fallback to tile coordinates
            let worldX, worldY;

            // NPC Position Editor override wins over the authored default.
            const npcOverride = this.npcPositionOverrides?.get(
                location.missionId
            ) ?? null;
            const npcPercentX = npcOverride
                ? npcOverride.percentX
                : location.percentX;
            const npcPercentY = npcOverride
                ? npcOverride.percentY
                : location.percentY;

            if (
                npcPercentX !== undefined &&
                npcPercentY !== undefined
            ) {
                // Use background-relative percentage coordinates
                const coords = this.percentageToWorldCoordinates(
                    npcPercentX,
                    npcPercentY
                );
                worldX = coords.x;
                worldY = coords.y;
                console.log(
                    `NPC ${location.npc} positioned at (${npcPercentX}%, ${npcPercentY}%) = (${worldX}, ${worldY})`
                );
            } else {
                // Fallback to tile-based coordinates
                worldX = location.x * this.tileSize + this.tileSize / 2;
                worldY = location.y * this.tileSize + this.tileSize / 2;
                console.log(
                    `NPC ${location.npc} positioned at tile (${location.x}, ${location.y}) = (${worldX}, ${worldY})`
                );
            }

            // Get the specific NPC image for this character
            const npcImageKey = npcImageMap[location.npc] || "student-front-1";

            console.log(
                `Creating NPC: ${location.npc} with image: ${npcImageKey}`
            );
            console.log(
                `Texture exists for ${npcImageKey}:`,
                this.textures.exists(npcImageKey)
            );

            // Use fallback if texture doesn't exist
            const finalImageKey = this.textures.exists(npcImageKey)
                ? npcImageKey
                : "student-front-1";

            console.log(`Using image: ${finalImageKey} for ${location.npc}`);

            const npc = this.physics.add.sprite(worldX, worldY, finalImageKey);
            // Size by target height, not a fixed scale: renders every NPC at a
            // fixed on-screen height (a bit bigger than the player), whatever the
            // source image's pixel resolution (exports vary 408-2000px+). A hard
            // floor guarantees the NPC is always visible even if the player's
            // displayHeight reads anomalously low.
            const npcTargetHeight = Math.max(
                this.player?.displayHeight || 0,
                80
            ) * 1.35;
            npc.setScale(npcTargetHeight / npc.height);
            npc.setInteractive();

            console.log(`Size check ${location.npc}:`, {
                playerDisplayHeight: this.player?.displayHeight,
                npcFrameHeight: npc.height,
                targetHeight: npcTargetHeight,
                scale: npcTargetHeight / npc.height,
                finalDisplayHeight:
                    npc.height * (npcTargetHeight / npc.height),
            });

            // Set up collision body for NPC - make it static from the start.
            // Phaser arcade bodies = source pixels × sprite scale, so size the box
            // from the frame size (not the scaled display size) and center it with a
            // source-pixel offset. Sizing from the display size makes the box shrink
            // by the sprite scale (~8px at 0.099x) and drift off-center, letting the
            // player walk through the NPC.
            const npcFrame = npc.frame;
            (npc as any).body.setSize(
                npcFrame.realWidth * 0.55,
                npcFrame.realHeight * 0.7,
                false
            );
            (npc as any).body.setOffset(
                npcFrame.realWidth * 0.225,
                npcFrame.realHeight * 0.15
            ); // Center the collision box
            (npc as any).body.setImmovable(true); // Make NPCs static so they don't move when player collides
            (npc as any).body.setGravity(0, 0); // Remove gravity
            (npc as any).body.setVelocity(0, 0); // Stop any movement
            (npc as any).body.setAngularVelocity(0); // Stop any rotation

            console.log(`NPC ${location.npc} collision body set up:`, {
                width: (npc as any).body.width,
                height: (npc as any).body.height,
                offsetX: (npc as any).body.offset.x,
                offsetY: (npc as any).body.offset.y,
                immovable: (npc as any).body.immovable,
            });

            // Add NPC name with better styling - adjusted offset for larger NPC
            const npcName = this.add
                .text(worldX, worldY - 50, location.npc, {
                    fontFamily: "Arial Black",
                    fontSize: 11,
                    color: "#FFFFFF",
                    stroke: "#000000",
                    strokeThickness: 2,
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

            // Store name label ref for live repositioning (NPC Position Editor)
            this.npcNameLabels.set(location.missionId, npcName);

            // Add mission indicator with validation-based styling
            const gameStateManager = GameStateManager.getInstance();
            let indicatorText = "!";
            let indicatorColor = "#FFD700"; // Gold for available

            if (gameStateManager.isMissionCompleted(location.missionId)) {
                indicatorText = "✓";
                indicatorColor = "#32CD32"; // Lime green for completed
            } else if (!gameStateManager.canAccessMission(location.missionId)) {
                indicatorText = "🔒";
                indicatorColor = "#DC143C"; // Crimson red for locked
            }

            // Store reference to indicator for real-time updates
            const indicatorKey = `mission-indicator-${location.missionId}`;

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

            // Store reference for real-time updates
            this.missionIndicators.set(location.missionId, missionIndicator);

            // Add mission number beside NPC name
            // const missionNumber = this.add
            //     .text(worldX - 35, worldY - 35, `#${location.missionId}`, {
            //         fontFamily: "Arial Black",
            //         fontSize: 12,
            //         color: "#FFD700",
            //         stroke: "#000000",
            //         strokeThickness: 2,
            //         align: "center",
            //         backgroundColor: "#8B4513",
            //         padding: { x: 4, y: 2 },
            //     })
            //     .setOrigin(0.5)
            //     .setDepth(100);

            // Add a subtle base glow effect around NPCs
            const baseGlow = this.add.circle(worldX, worldY, 25, 0x4169e1, 0.1);
            baseGlow.setDepth(-1);

            // Create interactive glow effect (initially invisible)
            const interactiveGlow = this.add.circle(
                worldX,
                worldY,
                35,
                0xffd700,
                0
            );
            interactiveGlow.setDepth(-1);
            interactiveGlow.setVisible(false);

            // Store reference for real-time interaction feedback
            this.npcGlowEffects.set(location.missionId, {
                baseGlow,
                interactiveGlow,
                npc,
                isAnimating: false,
                animationTween: null,
            });

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
            `Created ${this.missionLocations.length} NPCs with specific LEVEL1 images`
        );

        // Update indicators after all NPCs are created
        this.updateNPCIndicators();

        // Add collision between player and NPCs with custom callback to prevent movement
        this.physics.add.collider(this.player, this.npcs, (player, npc) => {
            // Ensure NPC doesn't move when collided
            (npc as any).body.setVelocity(0, 0);
            (npc as any).body.setAngularVelocity(0);
            (npc as any).body.setImmovable(true); // Force immovable again

            // Also stop the player's movement when colliding with NPC
            (player as any).body.setVelocity(0, 0);
            (player as any).body.setAngularVelocity(0);

            console.log(
                `Collision detected with ${
                    (npc as any).getData("missionData")?.npc || "NPC"
                }, both player and NPC stopped`
            );
        });
        console.log(
            "Player-NPC collision detection enabled with movement prevention"
        );
    }

    createCollectibles() {
        console.log("=== CREATING COLLECTIBLE ITEMS ===");
        console.log(`Background ready: ${!!this.backgroundImage}`);
        console.log(`Player exists: ${!!this.player}`);
        console.log(
            `Total items to create: ${this.collectibleItemsData.length}`
        );

        // Create physics group for collectibles
        this.collectibles = this.physics.add.group();

        const gameStateManager = GameStateManager.getInstance();

        this.collectibleItemsData.forEach((item) => {
            // Check if item has already been collected
            if (gameStateManager.isItemCollected(item.id)) {
                console.log(`Item ${item.id} already collected, skipping`);
                return;
            }

            // Calculate world position from percentage
            const coords = this.percentageToWorldCoordinates(
                item.percentX,
                item.percentY
            );

            // Create collectible sprite using emoji/icon
            const collectible = this.add
                .text(coords.x, coords.y, item.icon, {
                    fontSize: "30px", // Larger size for better visibility
                    fontFamily: "Arial",
                })
                .setOrigin(0.5)
                .setScrollFactor(1); // Follow camera

            // Add physics body
            this.physics.add.existing(collectible);
            (collectible.body as Phaser.Physics.Arcade.Body).setSize(48, 48);
            (collectible.body as Phaser.Physics.Arcade.Body).setAllowGravity(
                false
            );

            // Set depth - above NPCs and below UI
            collectible.setDepth(200);
            collectible.setVisible(true);

            // Store item data on sprite
            collectible.setData("itemData", item);

            // Add to collectibles group
            this.collectibles!.add(collectible);

            // Store reference
            this.collectibleItems.set(item.id, collectible);

            // Add floating animation
            this.tweens.add({
                targets: collectible,
                y: coords.y - 10,
                duration: 1000,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
            });

            // Add glow effect based on rarity
            const glowColor =
                item.rarity === "legendary"
                    ? 0xffd700 // Gold
                    : item.rarity === "rare"
                    ? 0xff00ff // Purple
                    : item.rarity === "uncommon"
                    ? 0x00ffff // Cyan
                    : 0xffffff; // White

            const glow = this.add.circle(
                coords.x,
                coords.y,
                30,
                glowColor,
                0.4
            );
            glow.setDepth(199); // Just below collectible
            glow.setScrollFactor(1); // Follow camera
            // Stash the glow on the collectible so it can be cleaned up
            // when the player picks the item up.
            collectible.setData("glow", glow);

            // Pulsing glow animation
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
                `✓ Created collectible ${item.id} (${item.type}) at (${
                    item.percentX
                }%, ${item.percentY}%) = world(${coords.x.toFixed(
                    1
                )}, ${coords.y.toFixed(1)})`
            );
        });

        // Add overlap detection between player and collectibles
        if (this.collectibles && this.player) {
            this.physics.add.overlap(
                this.player,
                this.collectibles,
                this.collectItem,
                undefined,
                this
            );
            console.log("✓ Collision detection enabled");
        }

        console.log("=== COLLECTIBLES CREATION COMPLETE ===");
        console.log(`Items created: ${this.collectibleItems.size}`);
        console.log(
            `Collectibles group size: ${this.collectibles?.children?.size || 0}`
        );
        console.log("=====================================");
    }

    collectItem(player: any, collectible: any) {
        const itemData = collectible.getData("itemData");
        if (!itemData) return;

        const gameStateManager = GameStateManager.getInstance();

        // Attempt to collect the item
        const collected = gameStateManager.collectItem(
            itemData.id,
            itemData.value,
            itemData.points
        );

        if (collected) {
            // Kill the ambient bob/glow tweens and destroy the pulsing glow
            // so nothing is left orphaned at the pickup spot.
            this.tweens.killTweensOf(collectible);
            const glow = collectible.getData("glow");
            if (glow) {
                this.tweens.killTweensOf(glow);
                glow.destroy();
            }

            // Create particle effect (sparkles) at collection point
            this.createCollectionParticles(
                collectible.x,
                collectible.y,
                itemData.rarity
            );

            // Play collection sound based on item rarity
            this.playCollectionSound(itemData.rarity);

            // Play collection animation
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

            // Show floating text animation
            this.showFloatingText(
                collectible.x,
                collectible.y,
                `+${itemData.value} 💰 +${itemData.points} ⭐`
            );

            // Check if all items collected for achievement
            this.checkCollectionAchievement();

            // Update daily challenge progress for collectibles
            EventBus.emit("update-daily-challenge", {
                type: "collect",
                amount: 1,
            });

            // Show notification
            EventBus.emit("show-notification", {
                type: "success",
                title: `${itemData.name} Collected! ✨`,
                message: `+${itemData.value} coins · +${itemData.points} points`,
                icon: itemData.icon,
                presentation: "toast",
            });

            console.log(
                `Collected item ${itemData.id}: +${itemData.value} coins, +${itemData.points} points`
            );
        }
    }







    checkCollectionAchievement() {
        const gameStateManager = GameStateManager.getInstance();
        const totalItems = this.collectibleItemsData.length;
        const collectedCount = gameStateManager.getTotalCollectedItems();

        // Check if all barangay items collected
        const allBarangayItemsCollected = this.collectibleItemsData.every(
            (item) => gameStateManager.isItemCollected(item.id)
        );

        if (
            allBarangayItemsCollected &&
            collectedCount > 0 &&
            !this.masterCollectorAwarded
        ) {
            this.masterCollectorAwarded = true;
            // Award special achievement badge
            EventBus.emit("show-notification", {
                type: "success",
                title: "🏆 Master Collector Achievement! 🏆",
                message: `Congratulations! You've collected all ${totalItems} items in the Barangay! You've earned the "Treasure Hunter" badge and a bonus of 100 coins + 200 points!`,
                icon: "🎖️",
                actions: [
                    {
                        label: "Awesome!",
                        action: () => {},
                        style: "primary",
                    },
                ],
            });

            // Award bonus coins and points for completing collection
            gameStateManager.addCoins(100, "Master Collector Achievement");
            const progress = gameStateManager.getProgress();
            if (progress) {
                progress.totalScore += 200;
                gameStateManager.updatePlaytime(0); // Trigger save
            }

            console.log("🏆 Master Collector Achievement unlocked!");
        }
    }




    repositionPlayerRelativeToBackground() {
        if (this.player && this.backgroundImage) {
            // Position player at center of background image
            const bgX = this.backgroundImage.x;
            const bgY = this.backgroundImage.y;

            this.player.setPosition(bgX, bgY);

            console.log("Player repositioned to background center:", bgX, bgY);
            console.log(
                "Background dimensions:",
                this.backgroundImage.displayWidth,
                this.backgroundImage.displayHeight
            );
        }
    }

    // Convert percentage coordinates to world coordinates relative to background image


    checkSecretLocation(percentX: number, percentY: number) {
        const secretQuestService = SecretQuestService.getInstance();
        const secretLocation = secretQuestService.checkLocation(
            percentX,
            percentY
        );

        if (secretLocation) {
            // Show notification for discovered secret location
            EventBus.emit("show-notification", {
                type: "success",
                title: "🗺️ Secret Location Discovered!",
                message: `You found: ${secretLocation.name}!\n${
                    secretLocation.hint || "A mysterious place..."
                }`,
                icon: "🔐",
                actions: [
                    {
                        label: "Amazing!",
                        action: () => {},
                        style: "primary",
                    },
                ],
            });

            // Check for secret quest completions
            secretQuestService.checkSecretQuestConditions();
        }
    }

    checkForNearbyNPCs() {
        let nearestNPC: Phaser.Physics.Arcade.Sprite | null = null;
        let nearestDistance = 100; // Interaction range
        let nearestMissionId = null;

        this.npcs.children.entries.forEach((npc: any) => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                npc.x,
                npc.y
            );

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestNPC = npc;
                nearestMissionId = (npc as any).getData("missionData")?.missionId;
            }
        });

        // Check if we have a new nearby NPC
        const currentNearbyMissionId =
            this.nearbyNPC?.getData("missionData")?.missionId;

        // Increased interaction range to make it easier to trigger
        if (nearestNPC && nearestDistance < 80) {
            // New NPC detected - activate glow
            if (currentNearbyMissionId !== nearestMissionId) {
                // Deactivate previous NPC glow if exists
                if (currentNearbyMissionId) {
                    this.activateNPCGlow(currentNearbyMissionId, false);
                }

                // Activate new NPC glow
                if (nearestMissionId) {
                    this.activateNPCGlow(nearestMissionId, true);
                }
            }

            this.nearbyNPC = nearestNPC;

            // Update interaction prompt position to right side of player
            this.interactionPrompt.setPosition(
                this.player.x + 80, // Right side of player
                this.player.y
            );
            this.interactionPrompt.setVisible(true);

            console.log(
                `Interaction prompt shown for ${
                    (nearestNPC as any).getData("missionData")?.npc || "NPC"
                } at distance ${nearestDistance.toFixed(1)} - Glow activated`
            );
        } else {
            // No nearby NPC - deactivate glow and hide prompt
            if (currentNearbyMissionId) {
                this.activateNPCGlow(currentNearbyMissionId, false);
            }

            this.nearbyNPC = null;
            this.interactionPrompt.setVisible(false);
        }
    }



    getMissionMetadata() {
        return barangayMissionMetadata;
    }

    getMissionFallback(missionId: number) {
        return {
            id: missionId.toString(),
            title: "Unknown Mission",
            description: "A mission to help the community.",
            quizOverview:
                "Complete this quiz to test your algebra skills and help the community.",
            realLifeTrivia: [
                "Math is used in everyday life from shopping to budgeting",
                "Understanding algebra helps you make better decisions",
                "Problem-solving skills transfer to real-world situations",
            ],
            npc: "Community Member",
            location: "Barangay",
            reward: "5 coins",
        };
    }

    protected getMissionFlavor() {
        return {
            completedTitle: "Mission Already Completed! ✅",
            completedIcon: "🎖️",
            completedMessage: (npc: string) => `${npc}: "Thank you for completing this mission! You've earned your badge and helped our community. Keep up the great work, citizen!"`,
            completedActionLabel: "Continue Exploring",
            prereqTitle: "Mission Prerequisites Required 🔒",
            prereqIcon: "📋",
            prereqActionLabel: "Check Available Missions",
            prereqFallbackList: "Complete Mission 1 first",
            prereqMessage: (npc: string, availableList: string) => `${npc}: "Hello there! I'd love to give you this mission, but you need to complete some other tasks first. Available missions: ${availableList}. Come back after you've gained more experience!"`,
        };
    }

    protected getWorldBackgroundConfig() {
        return {
            label: "barangay",
            textureKey: "barangay-bg-root",
            imagePath: "assets/barangay-background.png",
            fallbackThemeName: "teal",
            fallbackColor: 0x20b2aa,
            fallbackGridColor: 0x20b2aa,
            fallbackGridSpacing: 80,
        };
    }

    protected getCollisionDataKey() {
        return "BarangayMap";
    }

    protected getTreasureHunterBadge() {
        return "Barangay";
    }

    protected getNPCTheme() {
        return {
            noun: "Barangay",
            officialAdjective: "barangay",
            level: 1,
            className: "BarangayMap",
            nameFill: "#FFFFFF",
            nameStroke: "#000000",
            nameShadowColor: "#000000",
            addressFill: "#FFFFFF",
            glowColor: 0xffffff,
            imageMap: {},
            imageFileMap: {},
        };
    }












    async loadCollisions() {
        // Load collision data from collision editor
        const collisionService = CollisionService.getInstance();

        // Try localStorage first — editor-authored blocked spots only.
        // (The stale public/barangaymap-collisions.json is NOT loaded until
        // ENABLE_FILE_COLLISIONS above is flipped to true.)
        let collisionData = collisionService.loadCollisionData("BarangayMap");

        if (!collisionData && this.ENABLE_FILE_COLLISIONS) {
            // Optional: load "barangaymap-collisions.json" from public/ when
            // authoring a shipped collision file for the map.
            collisionData = await collisionService.loadCollisionDataFromFile(
                "BarangayMap"
            );
        }

        if (collisionData && this.backgroundImage) {
            console.log("✅ Loading collision data...");
            console.log(
                `Found ${collisionData.shapes.length} collision shapes`
            );

            this.collisionBodies = collisionService.createCollisions(
                this,
                collisionData,
                this.backgroundImage
            );

            // 🎨 VISUAL DEBUG: Draw colored outlines to see collision boundaries (only in debug mode)
            if (this.DEBUG_SHOW_COLLISIONS) {
                collisionData.shapes.forEach((shape) => {
                    if (shape.type === "rectangle") {
                        const box = shape as any;
                        const coords = this.percentageToWorldCoordinates(
                            box.percentX + box.percentWidth / 2,
                            box.percentY + box.percentHeight / 2
                        );
                        const width =
                            (box.percentWidth / 100) *
                            this.backgroundImage.displayWidth;
                        const height =
                            (box.percentHeight / 100) *
                            this.backgroundImage.displayHeight;

                        // Draw visible red rectangle outline
                        const debugRect = this.add.rectangle(
                            coords.x,
                            coords.y,
                            width,
                            height,
                            0xff0000,
                            0 // Transparent fill
                        );
                        debugRect.setStrokeStyle(3, 0xff0000); // Red outline
                        debugRect.setDepth(1000); // Above everything

                        console.log(
                            `🎨 Visualized collision "${
                                box.name
                            }" at (${box.percentX.toFixed(
                                1
                            )}%, ${box.percentY.toFixed(1)}%)`
                        );
                    } else if (shape.type === "polygon") {
                        const poly = shape as any;

                        // Calculate center for visualization
                        const centerX =
                            poly.points.reduce(
                                (sum: number, p: any) => sum + p.percentX,
                                0
                            ) / poly.points.length;
                        const centerY =
                            poly.points.reduce(
                                (sum: number, p: any) => sum + p.percentY,
                                0
                            ) / poly.points.length;

                        // Draw polygon outline
                        const graphics = this.add.graphics();
                        graphics.lineStyle(3, 0x0000ff); // Blue outline
                        graphics.setDepth(1000);

                        const firstPoint = poly.points[0];
                        const firstCoords = this.percentageToWorldCoordinates(
                            firstPoint.percentX,
                            firstPoint.percentY
                        );
                        graphics.beginPath();
                        graphics.moveTo(firstCoords.x, firstCoords.y);

                        for (let i = 1; i < poly.points.length; i++) {
                            const point = poly.points[i];
                            const coords = this.percentageToWorldCoordinates(
                                point.percentX,
                                point.percentY
                            );
                            graphics.lineTo(coords.x, coords.y);
                        }

                        graphics.closePath();
                        graphics.strokePath();

                        console.log(
                            `🎨 Visualized polygon "${poly.name}" with ${poly.points.length} points`
                        );
                    } else if (shape.type === "circle") {
                        const circle = shape as any;
                        const coords = this.percentageToWorldCoordinates(
                            circle.percentX,
                            circle.percentY
                        );
                        const radius =
                            (circle.percentRadius / 100) *
                            Math.min(
                                this.backgroundImage.displayWidth,
                                this.backgroundImage.displayHeight
                            );

                        // Draw circle outline
                        const graphics = this.add.graphics();
                        graphics.lineStyle(3, 0x00ff00); // Green outline
                        graphics.setDepth(1000);
                        graphics.strokeCircle(coords.x, coords.y, radius);

                        console.log(
                            `🎨 Visualized circle "${
                                circle.name
                            }" at (${circle.percentX.toFixed(
                                1
                            )}%, ${circle.percentY.toFixed(1)}%)`
                        );
                    }
                });
            } else {
                console.log(
                    "🚫 Visual debug disabled - collision boundaries are invisible"
                );
            }

            // Add collision between player and collision bodies
            if (this.collisionBodies && this.player) {
                this.physics.add.collider(this.player, this.collisionBodies);
                console.log(
                    `✅ Player collision enabled with ${collisionData.shapes.length} collision shapes`
                );
            }
        } else {
            console.log("⚠️ No collision data found for BarangayMap");
        }
    }
}