import { useRef, useState, useEffect } from "react";
import {
    ClipboardList,
    Store,
    CalendarDays,
    Lock,
    Pause,
    X,
    Play,
    ScrollText,
    Backpack,
    Trophy,
    Home,
    RotateCcw,
    Map,
    Star,
} from "lucide-react";
import { IRefPhaserGame, PhaserGame } from "./PhaserGame";
import { MainMenu } from "./components/MainMenu";
import { CharacterCreation } from "./components/CharacterCreation";
import { EnhancedQuizSystem } from "./components/EnhancedQuizSystem";
import { AchievementCelebration } from "./components/AchievementCelebration";
import { MissionSystem } from "./components/MissionSystem";
import { VirtualJoystick } from "./components/VirtualJoystick";
import { MobileInteractionButton } from "./components/MobileInteractionButton";
import { Settings } from "./components/Settings";
import { Extras } from "./components/Extras";
import { Credits } from "./components/Credits";
import { Leaderboard } from "./components/Leaderboard";
import { Tutorial } from "./components/Tutorial";
import { Shop } from "./components/Shop";
import { DailyChallenges } from "./components/DailyChallenges";
import { SecretQuests } from "./components/SecretQuests";
import { CollisionEditor } from "./components/CollisionEditor";
import { NpcEditor } from "./components/NpcEditor";
import { GameValidation } from "./utils/GameValidation";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { LandscapePrompt } from "./components/LandscapePrompt";
import {
    GameNotification,
    NotificationData,
} from "./components/GameNotification";
import { EventBus } from "./game/EventBus";
import { GameStateManager } from "./utils/GameStateManager";
import { GameProgress } from "./utils/GameValidation";
import { audioManager } from "./utils/AudioManager";
import LeaderboardService from "./services/LeaderboardService";
import ShopService from "./services/ShopService";
import SecretQuestService from "./services/SecretQuestService";
import {
    ACTIVE_LEVELS,
    GAME_CONFIG,
    TOTAL_MISSIONS,
    getSceneForLevel as getGameSceneForLevel,
} from "./config/gameConfig";
import type { LevelTone } from "./config/gameConfig";
import { quizzes, defaultQuiz } from "./data/quizzes";

// 🧪 TESTING MODE: Set to true to bypass mission prerequisites for testing
const DEBUG_BYPASS_PREREQUISITES = false;

// 🧱 COLLISION EDITOR authoring tool — which scenes can open it, and the
// background image the editor draws on top of for each map.
type MapSceneKey =
    | "BarangayMap"
    | "CityMap"
    | "ProvinceMap"
    | "RegionMap"
    | "NationalMap";

const COLLISION_EDITOR_MAPS: MapSceneKey[] = [
    "BarangayMap",
    "CityMap",
    "ProvinceMap",
    "RegionMap",
    "NationalMap",
];

/** Icon-chip colors for each level tone in the pause-menu map navigation. */
const LEVEL_ICON_TONE: Record<LevelTone, string> = {
    yellow: "bg-tutor-yellow text-tutor-navy",
    blue: "bg-tutor-blue text-tutor-cream",
    green: "bg-tutor-green text-tutor-cream",
    purple: "bg-tutor-purple text-tutor-cream",
    orange: "bg-tutor-orange text-tutor-cream",
    red: "bg-tutor-red text-tutor-cream",
    cream: "bg-tutor-cream text-tutor-green",
};

function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const gameStateManager = useRef(GameStateManager.getInstance());
    const [gameInfo, setGameInfo] = useState({
        currentScene: "MainMenu",
        playerName: "",
        badges: 0,
        coins: 0,
        totalScore: 0,
        accuracy: "0%",
        level: 1,
    });

    // Derived level display values (from gameConfig)
    const currentLevelDef = ACTIVE_LEVELS.find(
        (lv) => lv.level === gameInfo.level,
    );
    const currentLevelIndex = currentLevelDef
        ? currentLevelDef.level - 1
        : Math.max(
              0,
              Math.min(ACTIVE_LEVELS.length - 1, gameInfo.level - 1),
          );
    const earnedInCurrentLevel = Math.max(
        0,
        Math.min(
            gameInfo.badges,
            (currentLevelIndex + 1) * GAME_CONFIG.MISSIONS_PER_LEVEL,
        ) -
            currentLevelIndex * GAME_CONFIG.MISSIONS_PER_LEVEL,
    );
    const levelProgressPercent = Math.round(
        (earnedInCurrentLevel / GAME_CONFIG.MISSIONS_PER_LEVEL) * 100,
    );
    const currentRank = (() => {
        const ratio =
            TOTAL_MISSIONS > 0 ? gameInfo.badges / TOTAL_MISSIONS : 0;
        if (ratio < 0.25) return "Beginner";
        if (ratio < 0.5) return "Problem Solver";
        if (ratio < 0.75) return "Math Expert";
        if (ratio < 1) return "Algebra Master";
        return "Math Olympiad Champion";
    })();
    const [showPauseMenu, setShowPauseMenu] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const [showQuestLog, setShowQuestLog] = useState(false);
    const [showMainMenu, setShowMainMenu] = useState(true);
    const [showCharacterCreation, setShowCharacterCreation] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showMission, setShowMission] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState<any>(null);
    const [currentMission, setCurrentMission] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [joystickDirection, setJoystickDirection] = useState({ x: 0, y: 0 });
    const [notification, setNotification] = useState<NotificationData | null>(
        null,
    );
    const [showNotification, setShowNotification] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showExtras, setShowExtras] = useState(false);
    const [showCredits, setShowCredits] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [showDailyChallenges, setShowDailyChallenges] = useState(false);
    const [showSecretQuests, setShowSecretQuests] = useState(false);
    const [showCollisionEditor, setShowCollisionEditor] = useState(false);
    const [showNpcEditor, setShowNpcEditor] = useState(false);
    const [currentMapForEditor, setCurrentMapForEditor] =
        useState<MapSceneKey>("BarangayMap");
    // Background image path for the editor — taken from the active scene's own
    // getWorldBackgroundConfig().imagePath so the editor always shows exactly
    // the same background file the game displays (no stale variant drift).
    const [currentMapBackground, setCurrentMapBackground] = useState(
        "/assets/barangay-background.png",
    );
    const [showCelebration, setShowCelebration] = useState(false);
    const [isDialogueActive, setIsDialogueActive] = useState(false);
    const [celebrationData, setCelebrationData] = useState({
        badge: "",
        coins: 0,
        points: 0,
        timeBonus: 0,
    });
    const leaderboardService = useRef(LeaderboardService.getInstance());
    const shopService = useRef(ShopService.getInstance());
    const secretQuestService = useRef(SecretQuestService.getInstance());

    const currentScene = (scene: Phaser.Scene) => {
        console.log("Current scene:", scene.scene.key);
        setGameInfo((prev) => ({
            ...prev,
            currentScene: scene.scene.key,
        }));

        // Track current map for collision editor
        if (COLLISION_EDITOR_MAPS.includes(scene.scene.key as MapSceneKey)) {
            setCurrentMapForEditor(scene.scene.key as MapSceneKey);

            // Editor background = the exact background the scene displays, by
            // asking the scene for its own config (not a hardcoded path).
            const mapScene = scene as unknown as {
                getWorldBackgroundConfig?: () => { imagePath: string };
            };
            const bgConfig = mapScene.getWorldBackgroundConfig?.();
            if (bgConfig?.imagePath && !bgConfig.imagePath.startsWith("/")) {
                setCurrentMapBackground("/" + bgConfig.imagePath);
            }
        }

        // Update game data from Phaser registry
        if (scene.game && scene.game.registry) {
            const playerName = scene.game.registry.get("playerName") || "";
            const badges = scene.game.registry.get("badges") || [];
            const coins = scene.game.registry.get("coins") || 0;

            setGameInfo((prev) => ({
                ...prev,
                playerName,
                badges: badges.length,
                coins,
            }));
        }

        // Listen for preloader complete event
        if (scene.scene.key === "Preloader") {
            scene.events.on("preloader-complete", () => {
                // Ensure MainMenu is shown when preloader completes
                setShowMainMenu(true);
            });
        }
    };

    // Handle keyboard events for UI
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Don't steal keys while the player is typing in an input/textarea
            const target = event.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.tagName === "SELECT" ||
                    target.isContentEditable)
            ) {
                return;
            }

            if (event.key === "Escape") {
                // Close the collision editor first, else toggle the pause menu
                if (showCollisionEditor) {
                    setShowCollisionEditor(false);
                } else {
                    setShowPauseMenu(!showPauseMenu);
                }
            } else if (event.key === "c" || event.key === "C") {
                // Collision Editor authoring tool — only on map scenes
                if (
                    COLLISION_EDITOR_MAPS.includes(
                        gameInfo.currentScene as MapSceneKey,
                    )
                ) {
                    setShowCollisionEditor((prev) => !prev);
                }
            } else if (event.key === "i" || event.key === "I") {
                setShowInventory(!showInventory);
            } else if (event.key === "q" || event.key === "Q") {
                setShowQuestLog(!showQuestLog);
            } else if (event.key === "n" || event.key === "N") {
                // NPC Position Editor authoring tool — only on map scenes
                if (
                    COLLISION_EDITOR_MAPS.includes(
                        gameInfo.currentScene as MapSceneKey,
                    )
                ) {
                    setShowCollisionEditor(false);
                    setShowNpcEditor((prev) => !prev);
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [
        showPauseMenu,
        showInventory,
        showQuestLog,
        showCollisionEditor,
        showNpcEditor,
        gameInfo.currentScene,
    ]);

    // Initialize audio manager
    useEffect(() => {
        const initAudio = async () => {
            try {
                await audioManager.initialize();
                audioManager.playLevelMusic("MainMenu");
            } catch (error) {
                console.warn("Audio initialization failed:", error);
            }
        };

        // Initialize audio on first user interaction
        const handleFirstInteraction = () => {
            initAudio();
            document.removeEventListener("click", handleFirstInteraction);
            document.removeEventListener("keydown", handleFirstInteraction);
        };

        document.addEventListener("click", handleFirstInteraction);
        document.addEventListener("keydown", handleFirstInteraction);

        return () => {
            document.removeEventListener("click", handleFirstInteraction);
            document.removeEventListener("keydown", handleFirstInteraction);
        };
    }, []);

    // Game flow handlers
    const handleStartGame = () => {
        audioManager.playEffect("button-click");
        // Don't start level music here - wait until character is created and scene starts
        setShowMainMenu(false);
        setShowCharacterCreation(true);
    };

    const handleBackToMainMenu = () => {
        audioManager.playEffect("button-click");
        // Return to the menu — the creation screen is React-only at this point,
        // and menu music was never stopped, so no Phaser or audio work is needed.
        setShowCharacterCreation(false);
        setShowMainMenu(true);
    };

    const handleLoadGame = () => {
        audioManager.playEffect("button-click");
        const savedProgress = GameValidation.loadProgress();
        if (savedProgress) {
            const playerName = savedProgress.playerName || "Citizen";
            handleCharacterCreated(playerName, "default", savedProgress.gender);
        } else {
            alert("No saved game found! Start a new game first.");
        }
    };

    const handleShowSettings = () => {
        audioManager.playEffect("menu-open");
        setShowSettings(true);
    };

    const handleShowExtras = () => {
        audioManager.playEffect("menu-open");
        setShowExtras(true);
    };

    const handleShowCredits = () => {
        audioManager.playEffect("menu-open");
        setShowCredits(true);
    };

    const handleShowLeaderboard = () => {
        audioManager.playEffect("menu-open");
        setShowLeaderboard(true);
    };

    const handleShowTutorial = () => {
        audioManager.playEffect("menu-open");
        setShowTutorial(true);
    };

    const handleExit = () => {
        audioManager.playEffect("button-click");
        // Exit functionality is handled in MainMenu component
    };

    const handleCharacterCreated = (
        name: string,
        color: string,
        gender?: "boy" | "girl",
    ) => {
        console.log("Character created:", name, color, gender);
        setShowCharacterCreation(false);

        // Stop any current music to ensure clean transition
        audioManager.stopMusic();

        // Initialize game state with validation (persist gender for reload)
        const resolvedGender = gender ?? "boy";
        const progress = gameStateManager.current.initializeGame(
            name,
            resolvedGender,
        );
        updateGameInfoFromProgress(progress);

        // Show welcome notification for new players
        if (progress.completedMissions.length === 0) {
            setTimeout(() => {
                showGameNotification({
                    type: "info",
                    title: `Welcome to MathTuto, ${name}! 👋`,
                    message: `You just moved to town and decided to help your community through math! Look for the gold Mission #N markers above NPCs who need your help. Complete missions, collect items, earn badges, and grow from a barangay tutor to a national math mentor. Good luck!`,
                    icon: "🎓",
                    actions: [
                        {
                            label: "Start My Math Journey!",
                            action: closeNotification,
                            style: "primary",
                        },
                    ],
                });
            }, 2000); // Show after game world loads
        }

        // Wait for Phaser game to be ready, then start the appropriate scene based on level
        let retryCount = 0;
        const maxRetries = 50; // 5 seconds max

        const startGameWorld = () => {
            if (phaserRef.current?.game) {
                console.log("Phaser game found, setting registry...");
                phaserRef.current.game.registry.set("playerName", name);
                phaserRef.current.game.registry.set("playerColor", color);
                phaserRef.current.game.registry.set(
                    "playerGender",
                    resolvedGender,
                );

                // Sync game state with Phaser registry
                syncGameStateWithPhaser(progress);

                // Check available scenes
                const availableScenes =
                    phaserRef.current.game.scene.getScenes();
                console.log(
                    "Available scenes:",
                    availableScenes.map((s) => s.scene.key),
                );

                // Determine which scene to start based on player level
                // (driven by gameConfig - only configured levels are live)
                const startScene = getGameSceneForLevel(progress.level);
                console.log(
                    `Starting ${startScene} scene for Level ${progress.level}...`,
                );

                // Play level-specific music
                audioManager.crossfadeToLevel(
                    startScene as
                        | "BarangayMap"
                        | "CityMap"
                        | "ProvinceMap"
                        | "RegionMap"
                        | "NationalMap",
                );

                phaserRef.current.game.scene.start(startScene);
                console.log(`${startScene} scene started successfully`);

                // Show level-specific welcome message
                if (
                    progress.completedMissions.length >=
                    (progress.level - 1) * 10
                ) {
                    const levelNames: Record<number, string> = {
                        2: "the City",
                        3: "the Province",
                        4: "the Region",
                        5: "the National Stage",
                    };
                    const levelName = levelNames[progress.level];
                    if (levelName) {
                        setTimeout(() => {
                            showGameNotification({
                                type: "info",
                                title: `Welcome to ${levelName}, ${name}!`,
                                message: `Congratulations! You've mastered basic math and are now ready for advanced challenges! The city awaits with complex business, urban planning, and financial math problems. Show your intermediate algebra skills!`,
                                icon: "🏢",
                                actions: [
                                    {
                                        label: "Start City Challenges!",
                                        action: closeNotification,
                                        style: "primary",
                                    },
                                ],
                            });
                        }, 3000); // Show after scene loads
                    }
                }
            } else if (retryCount < maxRetries) {
                retryCount++;
                console.log(
                    `Phaser game still not ready, retrying in 100ms... (${retryCount}/${maxRetries})`,
                );
                setTimeout(startGameWorld, 100);
            } else {
                console.log("Failed to start game scene after maximum retries");
            }
        };

        // Start the game world with retry logic
        startGameWorld();
    };

    const handleQuizAnswer = (isCorrect: boolean) => {
        if (currentMission && currentQuiz) {
            try {
                const missionId = parseInt(currentMission.id);
                const selectedAnswer = isCorrect
                    ? currentQuiz.correctAnswer
                    : (currentQuiz.correctAnswer + 1) %
                      currentQuiz.options.length;

                // Submit answer through game state manager
                const { result, updated } =
                    gameStateManager.current.submitQuizAnswer(
                        missionId,
                        selectedAnswer,
                        currentQuiz.correctAnswer,
                    );

                console.log("Quiz submission result:", { result, updated });

                // Update UI with new progress
                const progress = gameStateManager.current.getProgress();
                if (progress) {
                    updateGameInfoFromProgress(progress);
                    syncGameStateWithPhaser(progress);

                    // Update NPC indicators in real-time for active scene
                    if (phaserRef.current?.game) {
                        const activeScenes =
                            phaserRef.current.game.scene.getScenes(true);
                        activeScenes.forEach((scene: any) => {
                            if (
                                scene.updateNPCIndicators &&
                                (scene.scene.key === "BarangayMap" ||
                                    scene.scene.key === "CityMap")
                            ) {
                                scene.updateNPCIndicators();
                            }
                        });
                    }
                }

                // Record speed challenge if answer is correct
                if (isCorrect && result.timeSpent) {
                    gameStateManager.current.recordSpeedChallenge(
                        result.timeSpent,
                    );

                    // Check for speed achievements
                    const speedAchievements =
                        gameStateManager.current.checkSpeedAchievements();
                    if (speedAchievements.length > 0) {
                        console.log(
                            "Speed achievements earned:",
                            speedAchievements,
                        );
                    }

                    // Update daily challenge progress for speed
                    if (result.timeSpent <= 10) {
                        shopService.current.updateChallengeProgress(
                            "excellent quiz",
                            1,
                        );
                    }
                }

                // Show result feedback with notifications
                if (updated) {
                    console.log(`Mission ${missionId} completed successfully!`);
                    const progress = gameStateManager.current.getProgress();
                    if (progress) {
                        const mission = currentMission;
                        // Reward coins come from the centralized mission reward table
                        const missionReward =
                            GameValidation.getMissionReward(missionId);
                        const rewardCoins = missionReward?.coins || 0;
                        const leveledUp = progress.level > gameInfo.level;

                        if (leveledUp) {
                            // Play level up sound effect
                            audioManager.playEffect("level-up");

                            // Update game info level immediately to prevent duplicate transitions
                            setGameInfo((prev) => ({
                                ...prev,
                                level: progress.level,
                            }));

                            // Show level up notification
                            setTimeout(() => {
                                const reachedLevel = ACTIVE_LEVELS.find(
                                    (lv) => lv.level === progress.level,
                                );
                                const nextLevel = ACTIVE_LEVELS.find(
                                    (lv) => lv.level === progress.level + 1,
                                );
                                const levelUpMessage = reachedLevel
                                    ? nextLevel
                                        ? `You've mastered ${reachedLevel.name} tutoring and are ready to tutor across the ${nextLevel.name}! Automatically transitioning...`
                                        : `You've reached the final level, ${reachedLevel.name}! You've conquered every district — you're a true Math Hero! 🏆`
                                    : "You've completed all math challenges with excellent accuracy. Great job, math champion!";
                                showGameNotification({
                                    type: "success",
                                    title: "LEVEL UP! 🌟",
                                    message: `Amazing! You've reached Level ${progress.level}! ${levelUpMessage}`,
                                    icon: "🎓",
                                    actions: [],
                                });

                                // Automatically transition to the next map after level up
                                const transition =
                                    reachedLevel && progress.level > 1
                                        ? {
                                              from: getGameSceneForLevel(
                                                  progress.level - 1,
                                              ),
                                              to: reachedLevel.scene,
                                          }
                                        : undefined;
                                const game = phaserRef.current?.game;
                                if (game && transition) {
                                    setTimeout(() => {
                                        console.log(
                                            `🎉 Level ${progress.level} reached! Auto-transitioning from ${transition.from} to ${transition.to}...`,
                                        );
                                        closeNotification();
                                        audioManager.crossfadeToLevel(
                                            transition.to as
                                                | "BarangayMap"
                                                | "CityMap"
                                                | "ProvinceMap"
                                                | "RegionMap"
                                                | "NationalMap",
                                        );
                                        game.scene.stop(transition.from);
                                        game.scene.start(transition.to);
                                    }, 3000); // Auto-transition after 3 seconds
                                }
                            }, 2000); // Show after mission completion notification
                        }

                        // Play mission completion sounds
                        audioManager.playEffect("mission-complete");
                        audioManager.playEffect("badge-earned");
                        audioManager.playEffect("coin-collect");

                        // Submit score to leaderboard
                        leaderboardService.current.submitScore(progress);

                        // Update daily challenge progress for missions
                        shopService.current.updateChallengeProgress(
                            "missions",
                            1,
                        );

                        // Claim any NPC milestone gift (missions 9, 10, 20)
                        const npcReward = shopService.current.claimNPCReward(
                            missionId,
                        );
                        const npcRewardNote = npcReward.success
                            ? `\n\n🎁 ${npcReward.reward?.npcName}: ${npcReward.reward?.message}`
                            : "";

                        showGameNotification({
                            type: "success",
                            title: "Math Challenge Completed! 🎉",
                            message: `Excellent work! You've solved "${
                                mission?.title
                            }" and earned the "${
                                progress.badges[progress.badges.length - 1]
                            }" achievement! You received ${rewardCoins} coins and ${
                                result.points + 100
                            } points!${npcRewardNote}`,
                            icon: "🏆",
                            actions: [
                                {
                                    label: "Continue Learning",
                                    action: closeNotification,
                                    style: "primary",
                                },
                            ],
                        });

                        // Show achievement celebration with confetti
                        setTimeout(() => {
                            setCelebrationData({
                                badge:
                                    progress.badges[
                                        progress.badges.length - 1
                                    ] || "Achievement Unlocked",
                                coins: rewardCoins,
                                points: result.points + 100,
                                timeBonus: result.timeBonus || 0,
                            });
                            setShowCelebration(true);
                        }, 1500);
                    }
                } else if (!result.isCorrect) {
                    console.log(
                        `Quiz failed for mission ${missionId}. Try again!`,
                    );

                    // Play quiz wrong sound effect
                    audioManager.playEffect("quiz-wrong");

                    showGameNotification({
                        type: "warning",
                        title: "Incorrect Answer",
                        message: `Oops! That wasn't the correct answer. Don't worry, you can try again! Review the problem and apply the right math concepts. Keep practicing!`,
                        icon: "📚",
                        actions: [
                            {
                                label: "Try Again",
                                action: closeNotification,
                                style: "secondary",
                            },
                        ],
                    });
                } else {
                    // Correct answer but mission not completed (shouldn't happen in current logic)
                    audioManager.playEffect("quiz-correct");
                }
            } catch (error) {
                console.error("Error handling quiz answer:", error);
            }
        }

        setShowQuiz(false);
        setCurrentQuiz(null);
    };

    const handleMissionStart = () => {
        if (currentMission) {
            const missionId = parseInt(currentMission.id);

            // Check if mission is accessible (skip if debug mode is enabled)
            if (
                !DEBUG_BYPASS_PREREQUISITES &&
                !gameStateManager.current.canAccessMission(missionId)
            ) {
                console.warn(`Mission ${missionId} is not accessible yet`);
                return;
            }

            // Check if mission is already completed
            if (gameStateManager.current.isMissionCompleted(missionId)) {
                console.log(`Mission ${missionId} is already completed`);
                setShowMission(false);
                return;
            }

            // Start quiz tracking
            gameStateManager.current.startQuiz(missionId);

            setShowMission(false);
            setShowQuiz(true);
            setCurrentQuiz(getQuizForMission(currentMission.id));

            // Play quiz start music
            audioManager.crossfadeToLevel("Quiz");
        }
    };

    const getQuizForMission = (missionId: string) => {
        return quizzes[missionId] || defaultQuiz;
    };

    // Helper function to update UI from game progress
    const updateGameInfoFromProgress = (progress: GameProgress) => {
        const stats = gameStateManager.current.getPlayerStats();
        setGameInfo((prev) => ({
            ...prev,
            playerName: progress.playerName,
            badges: progress.badges.length,
            coins: progress.coins,
            totalScore: progress.totalScore,
            accuracy: stats?.accuracy || "0%",
            level: progress.level,
        }));
    };

    // Helper function to sync game state with Phaser registry
    const syncGameStateWithPhaser = (progress: GameProgress) => {
        if (phaserRef.current?.game) {
            phaserRef.current.game.registry.set(
                "playerName",
                progress.playerName,
            );
            phaserRef.current.game.registry.set("coins", progress.coins);
            phaserRef.current.game.registry.set("badges", progress.badges);
            phaserRef.current.game.registry.set(
                "completedMissions",
                progress.completedMissions,
            );
            phaserRef.current.game.registry.set(
                "totalScore",
                progress.totalScore,
            );
            phaserRef.current.game.registry.set("level", progress.level);
        }
    };

    // Helper function to show notifications
    const showGameNotification = (notificationData: NotificationData) => {
        setNotification(notificationData);
        setShowNotification(true);
    };

    // Helper function to close notifications
    const closeNotification = () => {
        setShowNotification(false);
        setTimeout(() => setNotification(null), 300); // Delay to allow animation
    };

    // Subscribe to game state changes
    useEffect(() => {
        const unsubscribe = gameStateManager.current.subscribe((progress) => {
            updateGameInfoFromProgress(progress);
        });

        return unsubscribe;
    }, []);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            const mobile =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent,
                ) ||
                window.innerWidth <= 768 ||
                "ontouchstart" in window;
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Set up interval to update game data periodically and validate state
    useEffect(() => {
        const interval = setInterval(() => {
            // Validate game state periodically
            if (!gameStateManager.current.validateCurrentState()) {
                console.warn(
                    "Game state validation failed - potential tampering detected",
                );
            }

            // Update playtime tracking
            gameStateManager.current.updatePlaytime(1 / 60); // 1 minute every 60 seconds

            // Sync with Phaser registry if needed
            const progress = gameStateManager.current.getProgress();
            if (progress && phaserRef.current?.game?.registry) {
                // Check if Phaser registry is out of sync
                const phaserCoins =
                    phaserRef.current.game.registry.get("coins") || 0;
                if (phaserCoins !== progress.coins) {
                    syncGameStateWithPhaser(progress);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Send joystick input to Phaser game
    useEffect(() => {
        if (phaserRef.current?.game && isMobile) {
            // Send joystick direction to Phaser game
            phaserRef.current.game.registry.set(
                "joystickDirection",
                joystickDirection,
            );
        }
    }, [joystickDirection, isMobile]);

    // Listen for mission and notification events from Phaser
    useEffect(() => {
        const handleShowMission = (data: any) => {
            console.log("Mission event received:", data);
            setCurrentMission(data.mission);
            setShowMission(true);
        };

        const handleGameNotification = (data: NotificationData) => {
            console.log("Notification event received:", data);
            showGameNotification(data);
        };

        const handleOpenQuestLog = () => {
            console.log("Quest Log open event received");
            setShowQuestLog(true);
            // Close any open notification when quest log opens
            closeNotification();
        };

        const handleDailyChallengeUpdate = (data: any) => {
            console.log("Daily challenge update:", data);
            shopService.current.updateChallengeProgress(data.type, data.amount);
        };

        const handleDialogueStarted = () => {
            setIsDialogueActive(true);
        };

        const handleDialogueEnded = () => {
            setIsDialogueActive(false);
        };

        // Listen for events using EventBus
        EventBus.on("show-mission", handleShowMission);
        EventBus.on("show-notification", handleGameNotification);
        EventBus.on("open-quest-log", handleOpenQuestLog);
        EventBus.on("update-daily-challenge", handleDailyChallengeUpdate);
        EventBus.on("dialogue-started", handleDialogueStarted);
        EventBus.on("dialogue-ended", handleDialogueEnded);

        return () => {
            EventBus.off("show-mission", handleShowMission);
            EventBus.off("show-notification", handleGameNotification);
            EventBus.off("open-quest-log", handleOpenQuestLog);
            EventBus.off("update-daily-challenge", handleDailyChallengeUpdate);
            EventBus.off("dialogue-started", handleDialogueStarted);
            EventBus.off("dialogue-ended", handleDialogueEnded);
        };
    }, []);

    const showMobileControls =
        isMobile &&
        !showMainMenu &&
        !showCharacterCreation &&
        !showQuiz &&
        !showMission &&
        !showPauseMenu &&
        !showShop &&
        !showQuestLog &&
        !showInventory &&
        !showSettings &&
        !showExtras &&
        !showCredits &&
        !showLeaderboard &&
        !showTutorial &&
        !showDailyChallenges &&
        !showSecretQuests &&
        !showCelebration &&
        !showCollisionEditor &&
        !showNpcEditor &&
        !isDialogueActive;

    return (
        <div className="relative w-full h-dvh overflow-hidden bg-sky-300">
            {/* Landscape Orientation Overlay - Blocks game until rotated */}
            <LandscapePrompt />

            {/* React UI Components */}
            {showMainMenu && (
                <MainMenu
                    onStartGame={handleStartGame}
                    onLoadGame={handleLoadGame}
                    onShowSettings={handleShowSettings}
                    onShowExtras={handleShowExtras}
                    onShowCredits={handleShowCredits}
                    onShowLeaderboard={handleShowLeaderboard}
                    onShowTutorial={handleShowTutorial}
                    onExit={handleExit}
                />
            )}
            {showCharacterCreation && (
                <CharacterCreation
                    onCharacterCreated={handleCharacterCreated}
                    onBack={handleBackToMainMenu}
                />
            )}
            {showQuiz && currentQuiz && (
                <EnhancedQuizSystem
                    question={currentQuiz}
                    onAnswer={handleQuizAnswer}
                    onClose={() => setShowQuiz(false)}
                    missionId={currentMission?.id}
                    level={gameInfo.level}
                />
            )}
            {showMission && currentMission && (
                <MissionSystem
                    mission={currentMission}
                    onStartQuiz={handleMissionStart}
                    onClose={() => setShowMission(false)}
                />
            )}

            {/* Phaser Game Canvas - Show when in game world */}
            {!showMainMenu && !showCharacterCreation && (
                <div className="w-full h-full flex items-center justify-center">
                    <div
                        id="game-container"
                        className="relative w-full h-full max-w-full max-h-full"
                    >
                        <PhaserGame
                            ref={phaserRef}
                            currentActiveScene={currentScene}
                        />
                    </div>
                </div>
            )}

            {/* Mobile Controls - React Overlay */}
            {showMobileControls && (
                    <>
                        <VirtualJoystick
                            onMove={(direction) =>
                                setJoystickDirection(direction)
                            }
                            onStop={() => setJoystickDirection({ x: 0, y: 0 })}
                            isVisible={true}
                        />
                        <MobileInteractionButton
                            onInteract={() => {
                                // Trigger interaction in Phaser game
                                if (phaserRef.current?.game) {
                                    phaserRef.current.game.events.emit(
                                        "mobile-interact",
                                    );
                                }
                            }}
                            isVisible={true}
                        />
                    </>
                )}

            {/* React Overlay UI - Positioned above Phaser canvas */}
            {!showMainMenu &&
                !showCharacterCreation &&
                !showQuiz &&
                !showMission && (
                    <div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                        style={{ zIndex: 10 }}
                    >
                        {/* HUD - Top Left - Player Card */}
                        <div
                            className="absolute pointer-events-auto max-w-[calc(100vw-10px)]"
                            style={{
                                top: "calc(8px + env(safe-area-inset-top, 0px))",
                                left: "calc(8px + env(safe-area-inset-left, 0px))",
                            }}
                        >
                            <div className="flex flex-col gap-0.5 rounded-lg border-2 border-tutor-navy bg-tutor-cream/95 p-1 shadow-[2px_2px_0_0_#071B3A]">
                                <div className="flex gap-1">
                                    {/* Player Name */}
                                    <div className="flex items-center gap-1 rounded-md border-2 border-tutor-navy bg-tutor-orange px-1.5 py-0.5 font-playful text-[10px] font-bold text-tutor-cream">
                                        <span className="sm:inline hidden">
                                            👤
                                        </span>
                                        <span className="truncate max-w-[60px] sm:max-w-[100px]">
                                            {gameInfo.playerName || "Explorer"}
                                        </span>
                                    </div>

                                    {/* Level */}
                                    <div className="flex items-center gap-1 rounded-md border-2 border-tutor-navy bg-tutor-orange px-1.5 py-0.5 font-playful text-[10px] font-bold text-tutor-cream">
                                        <span>⭐</span>L{gameInfo.level}
                                    </div>
                                </div>

                                {/* Player Title */}
                                {secretQuestService.current.getCurrentTitle() && (
                                    <div className="flex items-center gap-1 rounded-md border-2 border-tutor-navy bg-tutor-purple px-1.5 py-0.5 font-playful text-[10px] font-bold text-tutor-cream truncate max-w-[160px]">
                                        <span>👑</span>
                                        {secretQuestService.current.getCurrentTitle()}
                                    </div>
                                )}

                                <div className="flex gap-1 flex-wrap">
                                    {/* Badges */}
                                    <div className="flex items-center gap-0.5 rounded-md border-2 border-tutor-navy bg-tutor-yellow px-1.5 py-0.5 font-playful text-[10px] font-bold text-tutor-navy">
                                        <span>🏆</span>
                                        {gameInfo.badges}/{TOTAL_MISSIONS}
                                    </div>

                                    {/* Coins */}
                                    <div className="flex items-center gap-0.5 rounded-md border-2 border-tutor-navy bg-tutor-green px-1.5 py-0.5 font-playful text-[10px] font-bold text-tutor-cream">
                                        <span>💰</span>
                                        {gameInfo.coins}
                                    </div>

                                    {/* Score */}
                                    <div className="flex items-center gap-0.5 rounded-md border-2 border-tutor-navy bg-tutor-blue px-1.5 py-0.5 font-playful text-[10px] font-bold text-tutor-cream">
                                        <span>📊</span>
                                        {gameInfo.totalScore}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions - Top Right */}
                        <div
                            className="absolute pointer-events-auto max-w-[calc(100vw-170px)] sm:max-w-none"
                            style={{
                                top: "calc(8px + env(safe-area-inset-top, 0px))",
                                right: "calc(8px + env(safe-area-inset-right, 0px))",
                            }}
                        >
                            <div className="flex flex-wrap justify-end gap-1 sm:gap-1.5">
                                <button
                                    onClick={() =>
                                        setShowQuestLog(!showQuestLog)
                                    }
                                    className="flex items-center gap-1 rounded-lg border-2 border-tutor-navy bg-tutor-cream px-1.5 py-1 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] min-h-[44px] min-w-[44px]"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-blue text-tutor-cream">
                                        <ClipboardList className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="hidden font-playful text-[10px] font-bold uppercase text-tutor-navy sm:inline sm:text-xs">
                                        Quest
                                    </span>
                                </button>
                                <button
                                    onClick={() => setShowShop(!showShop)}
                                    className="flex items-center gap-1 rounded-lg border-2 border-tutor-navy bg-tutor-cream px-1.5 py-1 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] min-h-[44px] min-w-[44px]"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-yellow text-tutor-navy">
                                        <Store className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="hidden font-playful text-[10px] font-bold uppercase text-tutor-navy sm:inline sm:text-xs">
                                        Shop
                                    </span>
                                </button>
                                <button
                                    onClick={() =>
                                        setShowDailyChallenges(
                                            !showDailyChallenges,
                                        )
                                    }
                                    className="flex items-center gap-1 rounded-lg border-2 border-tutor-navy bg-tutor-cream px-1.5 py-1 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] min-h-[44px] min-w-[44px]"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-green text-tutor-cream">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="hidden font-playful text-[10px] font-bold uppercase text-tutor-navy sm:inline sm:text-xs">
                                        Daily
                                    </span>
                                </button>
                                <button
                                    onClick={() =>
                                        setShowSecretQuests(!showSecretQuests)
                                    }
                                    className="flex items-center gap-1 rounded-lg border-2 border-tutor-navy bg-tutor-cream px-1.5 py-1 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] min-h-[44px] min-w-[44px]"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-purple text-tutor-cream">
                                        <Lock className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="hidden font-playful text-[10px] font-bold uppercase text-tutor-navy sm:inline sm:text-xs">
                                        Secrets
                                    </span>
                                </button>
                                <button
                                    onClick={() =>
                                        setShowPauseMenu(!showPauseMenu)
                                    }
                                    className="flex items-center gap-1 rounded-lg border-2 border-tutor-navy bg-tutor-cream px-1.5 py-1 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] min-h-[44px] min-w-[44px]"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-navy text-tutor-cream">
                                        <Pause className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="hidden font-playful text-[10px] font-bold uppercase text-tutor-navy sm:inline sm:text-xs">
                                        Menu
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Pause Menu Overlay */}
                        {showPauseMenu && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-1.5 sm:p-4 pointer-events-auto">
                                {/* MathTuto game window: navy outer frame, yellow inner frame */}
                                <section className="relative w-full max-w-md animate-slide-up rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-tutor-navy bg-tutor-cream p-1 sm:p-1.5 shadow-[6px_6px_0_0_#071B3A] sm:shadow-[8px_8px_0_0_#071B3A]">
                                    <div className="max-h-[calc(100dvh-20px)] overflow-y-auto overscroll-contain custom-scrollbar rounded-[10px] sm:rounded-[14px] border-2 border-tutor-yellow px-2.5 py-3 sm:px-4 sm:py-4">
                                        {/* Close Button */}
                                        <button
                                            onClick={() =>
                                                setShowPauseMenu(false)
                                            }
                                            type="button"
                                            aria-label="Close pause menu"
                                            className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[3px_3px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                        >
                                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </button>

                                        {/* Header */}
                                        <div className="mb-5 text-center">
                                            <h2 className="font-brutal text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                                                Game Menu
                                            </h2>
                                            <div className="mt-1.5 flex items-center justify-center gap-2">
                                                <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                                <Star
                                                    className="h-4 w-4 text-tutor-yellow"
                                                    fill="#FFD84D"
                                                />
                                                <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                            </div>
                                            <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-3 py-1 font-playful text-xs font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-sm">
                                                <Pause className="h-4 w-4" />
                                                Take a breather!
                                            </p>
                                        </div>

                                        {/* Resume Game */}
                                        <button
                                            onClick={() =>
                                                setShowPauseMenu(false)
                                            }
                                            type="button"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-green px-4 py-3 font-brutal text-sm uppercase tracking-wider text-tutor-cream shadow-[5px_5px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[7px_7px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A]"
                                        >
                                            <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-green">
                                                <Play className="h-4 w-4" />
                                            </span>
                                            Resume Game
                                        </button>

                                        {/* Feature Buttons */}
                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() =>
                                                    setShowQuestLog(true)
                                                }
                                                type="button"
                                                className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-blue px-3 py-3 font-brutal text-xs uppercase tracking-wide text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-blue">
                                                    <ScrollText className="h-3.5 w-3.5" />
                                                </span>
                                                Quest Log
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowPauseMenu(false);
                                                    setShowInventory(true);
                                                }}
                                                type="button"
                                                className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-purple px-3 py-3 font-brutal text-xs uppercase tracking-wide text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-purple">
                                                    <Backpack className="h-3.5 w-3.5" />
                                                </span>
                                                Inventory
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowPauseMenu(false);
                                                    setShowShop(true);
                                                }}
                                                type="button"
                                                className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-yellow px-3 py-3 font-brutal text-xs uppercase tracking-wide text-tutor-navy shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-orange">
                                                    <Store className="h-3.5 w-3.5" />
                                                </span>
                                                Shop
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowPauseMenu(false);
                                                    setShowDailyChallenges(
                                                        true,
                                                    );
                                                }}
                                                type="button"
                                                className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-green px-3 py-3 font-brutal text-xs uppercase tracking-wide text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-green">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                </span>
                                                Daily
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowPauseMenu(false);
                                                    setShowSecretQuests(true);
                                                }}
                                                type="button"
                                                className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-purple px-3 py-3 font-brutal text-xs uppercase tracking-wide text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-purple">
                                                    <Lock className="h-3.5 w-3.5" />
                                                </span>
                                                Secrets
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowPauseMenu(false);
                                                    setShowLeaderboard(true);
                                                }}
                                                type="button"
                                                className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-yellow px-3 py-3 font-brutal text-xs uppercase tracking-wide text-tutor-navy shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-orange">
                                                    <Trophy className="h-3.5 w-3.5" />
                                                </span>
                                                Leaderboard
                                            </button>
                                        </div>

                                        {/* Quick Map Navigation */}
                                        <div className="mt-5 rounded-xl border-[3px] border-tutor-navy bg-[#F3EBDD] p-3 shadow-[3px_3px_0_0_#071B3A]">
                                            <div className="mb-2.5 flex items-center gap-2">
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-orange text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                                    <Map className="h-4 w-4" />
                                                </span>
                                                <h3 className="font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                                    Quick Map Navigation
                                                </h3>
                                                <div className="h-1 flex-1 rounded-full bg-tutor-yellow" />
                                            </div>
                                            <div className="space-y-2">
                                                {ACTIVE_LEVELS.map((lv) => (
                                                    <button
                                                        key={lv.scene}
                                                        onClick={() => {
                                                            const scene =
                                                                phaserRef
                                                                    .current
                                                                    ?.scene;
                                                            if (scene) {
                                                                scene.scene.stop(
                                                                    gameInfo.currentScene,
                                                                );
                                                                scene.scene.start(
                                                                    lv.scene,
                                                                );
                                                                setShowPauseMenu(
                                                                    false,
                                                                );
                                                            }
                                                        }}
                                                        type="button"
                                                        className={`flex w-full items-center gap-2 rounded-lg border-[3px] border-tutor-navy px-3 py-2 font-playful text-sm font-bold transition-all duration-150 ${
                                                            gameInfo.currentScene ===
                                                            lv.scene
                                                                ? "-translate-y-0.5 bg-tutor-navy text-tutor-cream shadow-[0_0_0_3px_#FFD84D,3px_3px_0_0_#071B3A]"
                                                                : "bg-tutor-cream text-tutor-navy shadow-[2px_2px_0_0_#071B3A] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy ${LEVEL_ICON_TONE[lv.tone]}`}
                                                        >
                                                            {lv.icon}
                                                        </span>
                                                        <span className="flex-1 text-left">
                                                            Level {lv.level}:{" "}
                                                            {lv.name} Map
                                                        </span>
                                                        {gameInfo.currentScene ===
                                                            lv.scene && (
                                                            <span className="rounded-full border-2 border-tutor-yellow px-2 py-0.5 font-brutal text-[10px] uppercase tracking-wide text-tutor-yellow">
                                                                ● Here
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Collision Editor Button — authoring tool (C key) */}
                                        <button
                                            onClick={() => {
                                                setShowPauseMenu(false);
                                                setShowCollisionEditor(true);
                                            }}
                                            type="button"
                                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-dashed border-tutor-navy bg-tutor-cream px-3 py-2.5 font-brutal text-xs uppercase tracking-wide text-tutor-navy shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-orange text-tutor-cream">
                                                🧱
                                            </span>
                                            Map Collisions (C)
                                        </button>

                                        {/* Bottom Actions */}
                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => {
                                                    // Return to main menu
                                                    setShowPauseMenu(false);
                                                    setShowMainMenu(true);
                                                    // Stop current scene
                                                    if (
                                                        phaserRef.current?.game
                                                    ) {
                                                        phaserRef.current.game.scene.scenes.forEach(
                                                            (scene) => {
                                                                if (
                                                                    scene.scene.isActive()
                                                                ) {
                                                                    scene.scene.stop();
                                                                }
                                                            },
                                                        );
                                                    }
                                                    // Switch to main menu music
                                                    audioManager.crossfadeToLevel(
                                                        "MainMenu",
                                                    );
                                                }}
                                                type="button"
                                                className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-cream px-3 py-3 font-brutal text-xs uppercase tracking-wide text-tutor-navy shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-blue text-tutor-cream">
                                                    <Home className="h-3.5 w-3.5" />
                                                </span>
                                                Main Menu
                                            </button>
                                            <button
                                                onClick={() =>
                                                    window.location.reload()
                                                }
                                                type="button"
                                                className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-red px-3 py-3 font-brutal text-xs uppercase tracking-wide text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-red">
                                                    <RotateCcw className="h-3.5 w-3.5" />
                                                </span>
                                                Restart
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}
                        {/* Quest Log Overlay */}
                        {showQuestLog && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-1.5 sm:p-4 pointer-events-auto">
                                {/* MathTuto game window: navy outer frame, yellow inner frame */}
                                <section className="relative w-full min-[420px]:max-w-2xl max-w-[calc(100vw-6px)] animate-slide-up rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-tutor-navy bg-tutor-cream p-1 sm:p-1.5 shadow-[6px_6px_0_0_#071B3A] sm:shadow-[8px_8px_0_0_#071B3A]">
                                    <div className="max-h-[calc(100dvh-20px)] overflow-y-auto overscroll-contain custom-scrollbar rounded-[10px] sm:rounded-[14px] border-2 border-tutor-yellow px-2.5 py-3 sm:px-4 sm:py-4">
                                        {/* Close Button */}
                                        <button
                                            onClick={() =>
                                                setShowQuestLog(false)
                                            }
                                            type="button"
                                            aria-label="Close quest log"
                                            className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[3px_3px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                        >
                                            <X className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                                        </button>

                                        {/* Header */}
                                        <div className="mb-3 sm:mb-5 text-center pr-6">
                                            <h2 className="font-brutal text-lg sm:text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                                                Quest Log
                                            </h2>
                                            <div className="mt-1 flex items-center justify-center gap-1.5 sm:gap-2">
                                                <div className="h-1 w-6 sm:w-8 rounded-full bg-tutor-orange" />
                                                <Star
                                                    className="h-3 w-3 sm:h-4 sm:w-4 text-tutor-yellow"
                                                    fill="#FFD84D"
                                                />
                                                <div className="h-1 w-6 sm:w-8 rounded-full bg-tutor-orange" />
                                            </div>
                                            <p className="mt-2 sm:mt-2.5 inline-flex items-center gap-1 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-2 py-0.5 sm:px-3 sm:py-1 font-playful text-[10px] font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-xs">
                                                <ScrollText className="h-3 w-3 sm:h-4 sm:w-4" />
                                                Your mission checklist
                                            </p>
                                        </div>

                                        {/* Quest Cards */}
                                        <div className="space-y-3">
                                            {/* Main Objective */}
                                            <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-blue/10 p-2.5 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A]">
                                                <h3 className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 font-brutal text-[11px] uppercase tracking-wide text-tutor-navy sm:text-base">
                                                    <span className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg border-2 border-tutor-navy bg-tutor-blue text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                                        🎯
                                                    </span>
                                                    Main Objective
                                                </h3>
                                                <p className="font-playful text-xs leading-relaxed text-tutor-navy sm:text-sm">
                                                    {(() => {
                                                        const current = ACTIVE_LEVELS.find(
                                                            (lv) =>
                                                                lv.level ===
                                                                gameInfo.level,
                                                        );
                                                        if (!current) {
                                                            return "Keep solving math challenges to advance!";
                                                        }
                                                        const next = ACTIVE_LEVELS.find(
                                                            (lv) =>
                                                                lv.level ===
                                                                gameInfo.level +
                                                                    1,
                                                        );
                                                        return next
                                                            ? `Complete ${GAME_CONFIG.MISSIONS_PER_LEVEL} ${current.name.toLowerCase()} math challenges to unlock ${next.name.toLowerCase()}-level problems and level up!`
                                                            : `You've conquered all ${TOTAL_MISSIONS} math challenges! Continue practicing to maintain your math excellence.`;
                                                    })()}
                                                </p>
                                            </div>

                                            {/* Progress */}
                                            <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-green/15 p-2.5 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A]">
                                                <h3 className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 font-brutal text-[11px] uppercase tracking-wide text-tutor-navy sm:text-base">
                                                    <span className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg border-2 border-tutor-navy bg-tutor-green text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                                        📊
                                                    </span>
                                                    Progress
                                                </h3>
                                                <p className="mb-2 font-playful text-sm text-tutor-navy">
                                                    {currentLevelDef?.name ??
                                                        "Math"}{" "}
                                                    Achievements Earned:{" "}
                                                    <span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-green px-2 py-0.5 font-brutal text-sm text-tutor-cream">
                                                        {earnedInCurrentLevel}/
                                                        {GAME_CONFIG.MISSIONS_PER_LEVEL}
                                                    </span>
                                                </p>
                                                <div className="h-3 w-full overflow-hidden rounded-full border-2 border-tutor-navy bg-tutor-cream">
                                                    <div
                                                        className="h-full rounded-full bg-tutor-green transition-all duration-300"
                                                        style={{
                                                            width: `${levelProgressPercent}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="mt-2 text-center font-playful text-sm font-bold text-tutor-green">
                                                    {levelProgressPercent}%
                                                    Complete
                                                </div>
                                            </div>

                                            {/* Current Level */}
                                            <div className="rounded-xl border-[3px] border-tutor-navy bg-tutor-purple/10 p-4 shadow-[3px_3px_0_0_#071B3A]">
                                                <h3 className="mb-3 flex items-center gap-2 font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-purple text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                                        🏛️
                                                    </span>
                                                    Current Level
                                                </h3>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="font-playful text-sm font-bold text-tutor-navy">
                                                            {currentLevelDef
                                                                ? `${currentLevelDef.name} Math Zone`
                                                                : "Math Zone"}
                                                        </span>
                                                        <span className="inline-flex items-center rounded-md border-2 border-tutor-navy bg-tutor-yellow px-2 py-0.5 font-brutal text-xs text-tutor-navy">
                                                            Level{" "}
                                                            {gameInfo.level}
                                                        </span>
                                                    </div>
                                                    <p className="rounded-lg border-2 border-tutor-navy/25 bg-tutor-cream px-3 py-2 font-playful text-xs text-tutor-navy/70 sm:text-sm">
                                                        {gameInfo.level === 1
                                                            ? "Learning basic algebra through real-world market and community problems"
                                                            : "Mastering intermediate algebra with business and urban planning challenges"}
                                                    </p>
                                                    <div className="flex items-center justify-between gap-2 font-playful text-xs text-tutor-navy sm:text-sm">
                                                        <span>Accuracy:</span>
                                                        <span className="font-bold text-tutor-green">
                                                            {gameInfo.accuracy}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-2 font-playful text-xs text-tutor-navy sm:text-sm">
                                                        <span>
                                                            Total Score:
                                                        </span>
                                                        <span className="font-bold text-tutor-blue">
                                                            {
                                                                gameInfo.totalScore
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}
                        {/* Inventory Overlay */}
                        {showInventory && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-1.5 sm:p-4 pointer-events-auto">
                                {/* MathTuto game window: navy outer frame, yellow inner frame */}
                                <section className="relative w-full min-[420px]:max-w-2xl max-w-[calc(100vw-6px)] animate-slide-up rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-tutor-navy bg-tutor-cream p-1 sm:p-1.5 shadow-[6px_6px_0_0_#071B3A] sm:shadow-[8px_8px_0_0_#071B3A]">
                                    <div className="max-h-[calc(100dvh-20px)] overflow-y-auto overscroll-contain custom-scrollbar rounded-[10px] sm:rounded-[14px] border-2 border-tutor-yellow px-2.5 py-3 sm:px-4 sm:py-4">
                                        {/* Close Button */}
                                        <button
                                            onClick={() =>
                                                setShowInventory(false)
                                            }
                                            type="button"
                                            aria-label="Close inventory"
                                            className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[3px_3px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                        >
                                            <X className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                                        </button>

                                        {/* Header */}
                                        <div className="mb-3 sm:mb-5 text-center pr-6">
                                            <h2 className="font-brutal text-lg sm:text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                                                Inventory
                                            </h2>
                                            <div className="mt-1 flex items-center justify-center gap-1.5 sm:gap-2">
                                                <div className="h-1 w-6 sm:w-8 rounded-full bg-tutor-orange" />
                                                <Backpack
                                                    className="h-3 w-3 sm:h-4 sm:w-4 text-tutor-yellow"
                                                    fill="#FFD84D"
                                                />
                                                <div className="h-1 w-6 sm:w-8 rounded-full bg-tutor-orange" />
                                            </div>
                                            <p className="mt-2 sm:mt-2.5 inline-flex items-center gap-1 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-2 py-0.5 sm:px-3 sm:py-1 font-playful text-[10px] font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-xs">
                                                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                                                Your collection
                                            </p>
                                        </div>
                                        {/* Player Stats Grid */}
                                        <div className="space-y-3">
                                            {/* Coins and Badges Row */}
                                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                                <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-yellow p-2.5 sm:p-3 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] text-center">
                                                    <div className="text-2xl sm:text-3xl mb-1">
                                                        💰
                                                    </div>
                                                    <div className="font-playful font-bold text-tutor-navy text-lg sm:text-xl">
                                                        {gameInfo.coins}
                                                    </div>
                                                    <div className="font-playful text-[10px] sm:text-xs text-tutor-navy/80 font-medium">
                                                        Gold Coins
                                                    </div>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-orange p-2.5 sm:p-3 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] text-center">
                                                    <div className="text-2xl sm:text-3xl mb-1">
                                                        🏆
                                                    </div>
                                                    <div className="font-playful font-bold text-tutor-navy text-lg sm:text-xl">
                                                        {gameInfo.badges}
                                                    </div>
                                                    <div className="font-playful text-[10px] sm:text-xs text-tutor-navy/80 font-medium">
                                                        {gameInfo.level === 1
                                                            ? "Math Achievements"
                                                            : "Total Achievements"}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quest Items and Score Row */}
                                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                                <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-purple p-2.5 sm:p-3 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] text-center">
                                                    <div className="text-2xl sm:text-3xl mb-1">
                                                        📜
                                                    </div>
                                                    <div className="font-playful font-bold text-tutor-cream text-lg sm:text-xl">
                                                        0
                                                    </div>
                                                    <div className="font-playful text-[10px] sm:text-xs text-tutor-cream/80 font-medium">
                                                        Quest Items
                                                    </div>
                                                </div>
                                                <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-blue p-2.5 sm:p-3 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] text-center">
                                                    <div className="text-2xl sm:text-3xl mb-1">
                                                        ⭐
                                                    </div>
                                                    <div className="font-playful font-bold text-tutor-cream text-lg sm:text-xl">
                                                        {gameInfo.totalScore}
                                                    </div>
                                                    <div className="font-playful text-[10px] sm:text-xs text-tutor-cream/80 font-medium">
                                                        Experience Points
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-green/15 p-2.5 sm:p-3 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A]">
                                            <h3 className="mb-2 flex items-center gap-1.5 sm:gap-2 font-brutal text-[10px] sm:text-sm uppercase tracking-wide text-tutor-navy">
                                                <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md sm:rounded-lg border-2 border-tutor-navy bg-tutor-green text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                                    📈
                                                </span>
                                                Character Stats
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 text-xs sm:gap-3 sm:text-sm">
                                                <div className="text-center">
                                                    <div className="font-playful font-semibold text-tutor-navy">
                                                        Level
                                                    </div>
                                                    <div className="font-playful font-bold text-tutor-navy">
                                                        {gameInfo.level}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-playful font-semibold text-tutor-navy">
                                                        Math Rank
                                                    </div>
                                                    <div className="font-playful font-bold text-tutor-navy text-[10px] sm:text-xs">
                                                        {currentRank}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-playful font-semibold text-tutor-navy">
                                                        Difficulty
                                                    </div>
                                                    <div className="font-playful font-bold text-tutor-navy">
                                                        {currentLevelDef?.name ??
                                                            "Basic"}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-playful font-semibold text-tutor-navy">
                                                        Accuracy
                                                    </div>
                                                    <div className="font-playful font-bold text-tutor-navy">
                                                        {gameInfo.accuracy}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                )}

            {/* Game Notification Modal */}
            <GameNotification
                notification={notification}
                onClose={closeNotification}
                isVisible={showNotification}
            />

            {/* Settings Modal */}
            <Settings
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowSettings(false);
                }}
                isVisible={showSettings}
            />

            {/* Extras Modal */}
            <Extras
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowExtras(false);
                }}
                isVisible={showExtras}
            />

            {/* Credits Modal */}
            <Credits
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowCredits(false);
                }}
                isVisible={showCredits}
            />

            {/* Leaderboard Modal */}
            <Leaderboard
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowLeaderboard(false);
                }}
                isVisible={showLeaderboard}
            />

            {/* Tutorial Modal */}
            <Tutorial
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowTutorial(false);
                }}
                isVisible={showTutorial}
            />

            {/* Shop Modal */}
            <Shop
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowShop(false);
                }}
                isVisible={showShop}
            />

            {/* Daily Challenges Modal */}
            <DailyChallenges
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowDailyChallenges(false);
                }}
                isVisible={showDailyChallenges}
            />

            {/* Secret Quests Modal */}
            <SecretQuests
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowSecretQuests(false);
                }}
                isVisible={showSecretQuests}
            />

            {/* Collision Editor Modal */}
            <CollisionEditor
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowCollisionEditor(false);
                }}
                isVisible={showCollisionEditor}
                mapName={currentMapForEditor}
                backgroundImage={currentMapBackground}
            />

            {/* NPC Position Editor Modal */}
            <NpcEditor
                onClose={() => {
                    audioManager.playEffect("menu-close");
                    setShowNpcEditor(false);
                }}
                isVisible={showNpcEditor}
                mapName={currentMapForEditor}
                backgroundImage={currentMapBackground}
                onNpcsPersisted={(mapName) => {
                    // Tell the live scene to re-read the saved positions so the
                    // NPCs jump to their new spots without a scene restart.
                    phaserRef.current?.game?.events.emit("mathtuto-npcs-saved", {
                        mapName,
                    });
                }}
            />

            {/* Achievement Celebration */}
            {showCelebration && (
                <AchievementCelebration
                    badge={celebrationData.badge}
                    coins={celebrationData.coins}
                    points={celebrationData.points}
                    timeBonus={celebrationData.timeBonus || 0}
                    show={showCelebration}
                    onComplete={() => setShowCelebration(false)}
                />
            )}

            {/* PWA Install Prompt */}
            {/* <PWAInstallPrompt /> */}
        </div>
    );
}

export default App;

