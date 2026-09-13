import { GameObjects, Scene } from "phaser";
import { OpenWorldMapScene } from "./OpenWorldMapScene";
import { EventBus } from "../EventBus";
import { GameStateManager } from "../../utils/GameStateManager";
import CollisionService from "../../services/CollisionService";
import { cityMissionLocations, cityCollectibleItems, cityMissionMetadata } from "../config/mapData";

/**
 * CityMap - Level 2 (Missions 11-20)
 *
 * 🎯 AUTO-LOADED: This scene automatically loads when the player completes
 * all 10 Barangay missions (Level 1). The transition happens automatically
 * after displaying a level-up celebration notification.
 *
 * Contains advanced algebra challenges for intermediate players.
 */
export class CityMap extends OpenWorldMapScene {
    // 🎨 DEBUG MODE: Set to false to hide collision boundaries in production

    // Level 2 City Mission locations
    missionLocations = cityMissionLocations;

    // Collectible items for City (Level 2) - Higher value items
    collectibleItemsData = cityCollectibleItems;

    getLocationDisplayColor(): string {
        return "rgba(70, 130, 180, 0.8)";
    }

    getInteractionPromptColor(): string {
        return "#87CEEB";
    }

    getInteractionPromptStroke(): string {
        return "#000080";
    }

    getMinimapTitle(): string {
        return "CITY MAP";
    }

    getMinimapTitleFontSize(): string {
        return "11px";
    }

    getMinimapTitleColor(): string {
        return "#87CEEB";
    }

    getMinimapBorderColor(): number {
        return 0x87ceeb;
    }

    getMinimapBorderWidth(): number {
        return 2;
    }

    getCameraLogName(): string {
        return "City Map";
    }

    getDefaultAreaName(): string {
        return "City";
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
        return "City Center";
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
        return "Municipal Area";
        }
    }

    constructor() {
        super("CityMap");
    }



    // Method to update NPC indicators in real-time
















    // Convert percentage coordinates to world coordinates relative to background image




    // Handle city background scaling for orientation changes


    // Helper methods (same as Level 1 with minor adjustments)


    getMissionMetadata() {
        return cityMissionMetadata;
    }

    getMissionFallback(missionId: number) {
        return {
            id: missionId.toString(),
            title: "Advanced City Mission",
            description:
                "A challenging mission to help improve city operations.",
            quizOverview:
                "Complete this advanced quiz to test your higher-level algebra skills and help the city.",
            realLifeTrivia: [
                "Advanced math helps solve complex real-world problems",
                "Cities rely on mathematical analysis for planning and decision-making",
                "Strong algebra skills open doors to STEM careers",
            ],
            npc: "City Official",
            location: "City Hall",
            reward: "40 coins",
        };
    }

    protected getMissionFlavor() {
        return {
            completedTitle: "Mission Already Completed! ✅",
            completedIcon: "🏆",
            completedMessage: (npc: string) => `${npc}: "Excellent work on this mission! You've earned your city governance badge and contributed to municipal development. Keep up the outstanding leadership!"`,
            completedActionLabel: "Continue City Service",
            prereqTitle: "City Mission Prerequisites Required 🏛️",
            prereqIcon: "🏛️",
            prereqActionLabel: "Check Prerequisites",
            prereqFallbackList: "Complete all Level 1 missions first",
            prereqMessage: (npc: string, availableList: string) => `${npc}: "Welcome to city tutoring! This advanced mission requires more experience. Available missions: ${availableList}. Master the basics first, then return for city tutoring challenges!"`,
        };
    }

    protected getWorldBackgroundConfig() {
        return {
            label: "city",
            textureKey: "city-bg-root",
            imagePath: "assets/city-background.png",
            fallbackThemeName: "steel blue",
            fallbackColor: 0x4682b4,
            fallbackGridColor: 0x708090,
            fallbackGridSpacing: 80,
        };
    }

    protected getCollisionDataKey() {
        return "CityMap";
    }

    protected getTreasureHunterBadge() {
        return "Municipal";
    }

    protected getNPCTheme() {
        return {
            noun: "City",
            officialAdjective: "city",
            level: 2,
            className: "CityMap",
            nameFill: "#F0F8FF",
            nameStroke: "#000080",
            nameShadowColor: "#000080",
            addressFill: "#87CEEB",
            glowColor: 0x4169e1,
            imageMap: {
                "Entrepreneur Carlos": "entrepreneur-carlos",
                "Accountant Lisa": "accountant-lisa",
                "Logistics Manager Ben": "logistics-manager-ben",
                "Sales Director Kim": "sales-director-kim",
                "Urban Planner Gina": "urban-planner-gina",
                "Transit Manager Roy": "transit-manager-roy",
                "Architect Maya": "architect-maya",
                "City Planner Tom": "city-planner-tom",
                "Engineer Sarah": "engineer-sarah",
                "Transport Chief Mike": "transport-chief-mike",
            },
            imageFileMap: {
                "entrepreneur-carlos": "entrepreneur-carlos.png",
                "accountant-lisa": "removebg/accountant-lisa.png",
                "logistics-manager-ben": "logistics-manager-ben.png",
                "sales-director-kim": "sales-director-kim.png",
                "urban-planner-gina": "urban-planner-gina.png",
                "transit-manager-roy": "transit-manager-roy.png",
                "architect-maya": "architect-maya.png",
                "city-planner-tom": "city-planner-tom.png",
                "engineer-sarah": "engineer-sarah.png",
                "transport-chief-mike": "transport-chief-mike.png",
            },
        };
    }





















}