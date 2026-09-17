import { GameObjects, Scene } from "phaser";
import { OpenWorldMapScene } from "./OpenWorldMapScene";
import { EventBus } from "../EventBus";
import { GameStateManager } from "../../utils/GameStateManager";
import CollisionService from "../../services/CollisionService";
import { provinceMissionLocations, provinceCollectibleItems, provinceMissionMetadata } from "../config/mapData";

/**
 * ProvinceMap - Level 3 (Missions 21-30)
 *
 * 🎯 AUTO-LOADED: This scene automatically loads when the player completes
 * all 20 City missions (Levels 1-2). The transition happens automatically
 * after displaying a level-up celebration notification.
 *
 * Contains advanced algebra challenges for experienced players.
 */
export class ProvinceMap extends OpenWorldMapScene {
    // 🎨 DEBUG MODE: Set to false to hide collision boundaries in production

    // 🧪 TESTING MODE: Set to true to bypass mission prerequisites for testing

    // Level 3 Province Mission locations
    missionLocations = provinceMissionLocations;

    // Collectible items for Province (Level 3) - Advanced value items
    collectibleItemsData = provinceCollectibleItems;

    getLocationDisplayColor(): string {
        return "rgba(34, 139, 34, 0.8)";
    }

    getInteractionPromptColor(): string {
        return "#90EE90";
    }

    getInteractionPromptStroke(): string {
        return "#006400";
    }

    getMinimapTitle(): string {
        return "PROVINCE MAP";
    }

    getMinimapTitleFontSize(): string {
        return "11px";
    }

    getMinimapTitleColor(): string {
        return "#87CEEB";
    }

    getMinimapBorderColor(): number {
        return 0x228B22;
    }

    getMinimapBorderWidth(): number {
        return 2;
    }

    getCameraLogName(): string {
        return "Province Map";
    }

    getDefaultAreaName(): string {
        return "Province";
    }

    getAreaName(relativeX: number, relativeY: number): string {
        if (relativeX < 25 && relativeY < 25) {
        return "Education District";
        } else if (relativeX >= 75 && relativeY < 25) {
        return "Business District";
        } else if (relativeX < 25 && relativeY >= 75) {
        return "Residential District";
        } else if (relativeX >= 75 && relativeY >= 75) {
        return "Industrial District";
        } else if (
        relativeX >= 37.5 &&
        relativeX < 62.5 &&
        relativeY >= 37.5 &&
        relativeY < 62.5
        ) {
        return "Province Center";
        } else if (
        relativeX >= 25 &&
        relativeX < 75 &&
        relativeY < 25
        ) {
        return "Administrative Zone";
        } else if (
        relativeX >= 25 &&
        relativeX < 75 &&
        relativeY >= 75
        ) {
        return "Service District";
        } else if (
        relativeX < 25 &&
        relativeY >= 25 &&
        relativeY < 75
        ) {
        return "Cultural Quarter";
        } else if (
        relativeX >= 75 &&
        relativeY >= 25 &&
        relativeY < 75
        ) {
        return "Commercial Zone";
        } else {
        return "Provincial Area";
        }
        
    }
    constructor() {
        super("ProvinceMap");
    }



    // Method to update NPC indicators in real-time
















    // Convert percentage coordinates to world coordinates relative to background image




    // Handle province background scaling for orientation changes


    // Helper methods (same as Level 1 with minor adjustments)
    getMissionMetadata() {
        return provinceMissionMetadata;
    }

    getMissionFallback(missionId: number) {
        return {
            id: missionId.toString(),
            title: "Advanced Province Mission",
            description:
                "A challenging mission to help improve provincial operations.",
            quizOverview:
                "Complete this advanced quiz to test your higher-level algebra skills and help the province.",
            realLifeTrivia: [
                "Advanced math helps solve complex real-world problems",
                "Provinces rely on mathematical analysis for planning and decision-making",
                "Strong algebra skills open doors to STEM careers",
            ],
            npc: "Provincial Official",
            location: "Provincial Hall",
            reward: "40 coins",
        };
    }

    protected getMissionFlavor() {
        return {
            completedTitle: "Mission Already Completed! ✅",
            completedIcon: "🏆",
            completedMessage: (npc: string) => `${npc}: "Excellent work on this mission! You've earned your provincial governance badge and contributed to regional development. Keep up the outstanding leadership!"`,
            completedActionLabel: "Continue Provincial Service",
            prereqTitle: "Province Mission Prerequisites Required 🏛️",
            prereqIcon: "🏛️",
            prereqActionLabel: "Check Prerequisites",
            prereqFallbackList: "Complete all Level 1 missions first",
            prereqMessage: (npc: string, availableList: string) => `${npc}: "Welcome to provincial tutoring! This advanced mission requires more experience. Available missions: ${availableList}. Master the basics first, then return for provincial scholarship challenges!"`,
        };
    }

    protected getWorldBackgroundConfig() {
        return {
            label: "province",
            textureKey: "province-bg-root",
            imagePath: "assets/province-background.png",
            fallbackThemeName: "forest green",
            fallbackColor: 0x228B22,
            fallbackGridColor: 0x2F4F2F,
            fallbackGridSpacing: 100,
        };
    }

    protected getCollisionDataKey() {
        return "ProvinceMap";
    }

    protected getTreasureHunterBadge() {
        return "Provincial";
    }

    protected getNPCTheme() {
        return {
            noun: "Province",
            officialAdjective: "provincial",
            level: 3,
            className: "ProvinceMap",
            nameFill: "#90EE90",
            nameStroke: "#006400",
            nameShadowColor: "#006400",
            addressFill: "#90EE90",
            glowColor: 0x228b22,
            imageMap: {
                "Sarah": "sarah",
                "Mang Tomas": "mang-tomas",
                "Ate Liza": "ate-liza",
                "Engineer Pat": "engineer-pat",
                "Budget Officer Amy": "budget-officer-amy",
                "Nurse Joy": "nurse-joy",
                "Foreman Bob": "foreman-bob",
                "Ma'am Elena": "maam-elena",
                "Sir Dan": "sir-dan",
                "Governor's Aide": "governors-aide",
            },
            imageFileMap: {
                "sarah": "sarah.png",
                "mang-tomas": "mang-tomas.png",
                "ate-liza": "ate-liza.png",
                "engineer-pat": "engineer-pat.png",
                "budget-officer-amy": "budget-officer-amy.png",
                "nurse-joy": "nurse-joy.png",
                "foreman-bob": "foreman-bob.png",
                "maam-elena": "maam-elena.png",
                "sir-dan": "sir-dan.png",
                "governors-aide": "governors-aide.png",
            },
        };
    }





















}