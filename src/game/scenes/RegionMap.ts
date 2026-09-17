import { GameObjects, Scene } from "phaser";
import { OpenWorldMapScene } from "./OpenWorldMapScene";
import { EventBus } from "../EventBus";
import { GameStateManager } from "../../utils/GameStateManager";
import CollisionService from "../../services/CollisionService";
import { regionMissionLocations, regionCollectibleItems, regionMissionMetadata } from "../config/mapData";

/**
 * RegionMap - Level 4 (Missions 31-40)
 *
 * 🎯 AUTO-LOADED: This scene automatically loads when the player completes
 * all 30 Province missions (Levels 1-3). The transition happens automatically
 * after displaying a level-up celebration notification.
 *
 * Contains mastery-level algebra challenges for advanced players.
 */
export class RegionMap extends OpenWorldMapScene {
    // 🎨 DEBUG MODE: Set to false to hide collision boundaries in production

    // 🧪 TESTING MODE: Set to true to bypass mission prerequisites for testing

    // Level 4 Region Mission locations
    missionLocations = regionMissionLocations;

    // Collectible items for Region (Level 4) - Mastery value items
    collectibleItemsData = regionCollectibleItems;

    getLocationDisplayColor(): string {
        return "rgba(128, 0, 128, 0.8)";
    }

    getInteractionPromptColor(): string {
        return "#DDA0DD";
    }

    getInteractionPromptStroke(): string {
        return "#4B0082";
    }

    getMinimapTitle(): string {
        return "REGION MAP";
    }

    getMinimapTitleFontSize(): string {
        return "11px";
    }

    getMinimapTitleColor(): string {
        return "#87CEEB";
    }

    getMinimapBorderColor(): number {
        return 0x800080;
    }

    getMinimapBorderWidth(): number {
        return 2;
    }

    getCameraLogName(): string {
        return "Region Map";
    }

    getDefaultAreaName(): string {
        return "Region";
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
        return "Region Center";
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
        return "Regional Area";
        }
    }

    constructor() {
        super("RegionMap");
    }



    // Method to update NPC indicators in real-time
















    // Convert percentage coordinates to world coordinates relative to background image




    // Handle region background scaling for orientation changes


    // Helper methods (same as Level 1 with minor adjustments)
    getMissionMetadata() {
        return regionMissionMetadata;
    }

    getMissionFallback(missionId: number) {
        return {
            id: missionId.toString(),
            title: "Advanced Region Mission",
            description:
                "A challenging mission to help improve regional operations.",
            quizOverview:
                "Complete this mastery-level quiz to test your advanced algebra skills and help the region.",
            realLifeTrivia: [
                "Advanced math helps solve complex real-world problems",
                "Regions rely on mathematical analysis for planning and decision-making",
                "Strong algebra skills open doors to STEM careers",
            ],
            npc: "Regional Official",
            location: "Regional Hall",
            reward: "40 coins",
        };
    }

    protected getMissionFlavor() {
        return {
            completedTitle: "Mission Already Completed! ✅",
            completedIcon: "🏆",
            completedMessage: (npc: string) => `${npc}: "Excellent work on this mission! You've earned your regional governance badge and contributed to regional development. Keep up the outstanding leadership!"`,
            completedActionLabel: "Continue Regional Service",
            prereqTitle: "Region Mission Prerequisites Required 🏛️",
            prereqIcon: "🏛️",
            prereqActionLabel: "Check Prerequisites",
            prereqFallbackList: "Complete all Level 1 missions first",
            prereqMessage: (npc: string, availableList: string) => `${npc}: "Welcome to regional tutoring! This mastery-level mission requires more experience. Available missions: ${availableList}. Master the basics first, then return for regional competition challenges!"`,
        };
    }

    protected getWorldBackgroundConfig() {
        return {
            label: "region",
            textureKey: "region-bg-root",
            imagePath: "assets/region-background.png",
            fallbackThemeName: "purple",
            fallbackColor: 0x800080,
            fallbackGridColor: 0x9370DB,
            fallbackGridSpacing: 120,
        };
    }

    protected getCollisionDataKey() {
        return "RegionMap";
    }

    protected getTreasureHunterBadge() {
        return "Regional";
    }

    protected getNPCTheme() {
        return {
            noun: "Region",
            officialAdjective: "regional",
            level: 4,
            className: "RegionMap",
            nameFill: "#E6E6FA",
            nameStroke: "#4B0082",
            nameShadowColor: "#000080",
            addressFill: "#DDA0DD",
            glowColor: 0x800080,
            imageMap: {
                "Marco": "marco",
                "Engineer Ray": "engineer-ray",
                "Clara": "clara",
                "Scientist May": "scientist-may",
                "Sir Nico": "sir-nico",
                "Kuya Jay": "kuya-jay",
                "Student Alex": "student-alex",
                "Ms. Gina": "ms-gina",
                "Ma'am Tina": "maam-tina",
                "Regional Coordinator": "regional-coordinator",
            },
            imageFileMap: {
                "marco": "marco.png",
                "engineer-ray": "engineer-ray.png",
                "clara": "clara.png",
                "scientist-may": "scientist-may.png",
                "sir-nico": "sir-nico.png",
                "kuya-jay": "kuya-jay.png",
                "student-alex": "student-alex.png",
                "ms-gina": "ms-gina.png",
                "maam-tina": "maam-tina.png",
                "regional-coordinator": "regional-coordinator.png",
            },
        };
    }





















}