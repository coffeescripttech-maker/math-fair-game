import { GameObjects, Scene } from "phaser";
import { OpenWorldMapScene } from "./OpenWorldMapScene";
import { EventBus } from "../EventBus";
import { GameStateManager } from "../../utils/GameStateManager";
import CollisionService from "../../services/CollisionService";
import { nationalMissionLocations, nationalCollectibleItems, nationalMissionMetadata } from "../config/mapData";

/**
 * NationalMap - Level 5 (Missions 41-50)
 *
 * 🎯 AUTO-LOADED: This scene automatically loads when the player completes
 * all 40 Regional missions (Levels 1-4). The transition happens automatically
 * after displaying a level-up celebration notification.
 *
 * Contains expert-level algebra challenges for top-tier players.
 */
export class NationalMap extends OpenWorldMapScene {
    // 🎨 DEBUG MODE: Set to false to hide collision boundaries in production

    // 🧪 TESTING MODE: Set to true to bypass mission prerequisites for testing

    // Level 5 National Mission locations
    missionLocations = nationalMissionLocations;

    // Collectible items for National (Level 5) - Expert value items
    collectibleItemsData = nationalCollectibleItems;

    getLocationDisplayColor(): string {
        return "rgba(255, 215, 0, 0.8)";
    }

    getInteractionPromptColor(): string {
        return "#FFA500";
    }

    getInteractionPromptStroke(): string {
        return "#8B4513";
    }

    getMinimapTitle(): string {
        return "NATIONAL MAP";
    }

    getMinimapTitleFontSize(): string {
        return "11px";
    }

    getMinimapTitleColor(): string {
        return "#87CEEB";
    }

    getMinimapBorderColor(): number {
        return 0x000000;
    }

    getMinimapBorderWidth(): number {
        return 3;
    }

    getCameraLogName(): string {
        return "National Map";
    }

    getDefaultAreaName(): string {
        return "National";
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
        return "National Center";
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
        return "National Area";
        }
    }

    constructor() {
        super("NationalMap");
    }



    // Method to update NPC indicators in real-time
















    // Convert percentage coordinates to world coordinates relative to background image




    // Handle national background scaling for orientation changes


    // Helper methods (same as Level 1 with minor adjustments)
    getMissionMetadata() {
        return nationalMissionMetadata;
    }

    getMissionFallback(missionId: number) {
        return {
            id: missionId.toString(),
            title: "Advanced National Mission",
            description:
                "A challenging mission to help improve national operations.",
            quizOverview:
                "Complete this expert-level quiz to test your advanced algebra skills and help the nation.",
            realLifeTrivia: [
                "Advanced math helps solve complex real-world problems",
                "Nations rely on mathematical analysis for planning and decision-making",
                "Strong algebra skills open doors to STEM careers",
            ],
            npc: "National Education Official",
            location: "National Education Center",
            reward: "40 coins",
        };
    }

    protected getMissionFlavor() {
        return {
            completedTitle: "Mission Already Completed! ✅",
            completedIcon: "🏆",
            completedMessage: (npc: string) => `${npc}: "Excellent work on this mission! You've earned your national excellence badge and contributed to national development. Keep up the outstanding leadership!"`,
            completedActionLabel: "Continue National Service",
            prereqTitle: "National Mission Prerequisites Required 🏛️",
            prereqIcon: "🏛️",
            prereqActionLabel: "Check Prerequisites",
            prereqFallbackList: "Complete all Level 1 missions first",
            prereqMessage: (npc: string, availableList: string) => `${npc}: "Welcome to national tutoring! This expert-level mission requires exceptional experience. Available missions: ${availableList}. Master the fundamentals first, then return for Olympiad mentoring challenges!"`,
        };
    }

    protected getWorldBackgroundConfig() {
        return {
            label: "national",
            textureKey: "national-bg-root",
            imagePath: "assets/national-background.png",
            fallbackThemeName: "gold",
            fallbackColor: 0xFFD700,
            fallbackGridColor: 0xFFA500,
            fallbackGridSpacing: 150,
        };
    }

    protected getCollisionDataKey() {
        return "NationalMap";
    }

    protected getTreasureHunterBadge() {
        return "National";
    }

    protected getNPCTheme() {
        return {
            noun: "National",
            officialAdjective: "national",
            level: 5,
            className: "NationalMap",
            nameFill: "#FFD700",
            nameStroke: "#8B4513",
            nameShadowColor: "#000080",
            addressFill: "#FFA500",
            glowColor: 0xffd700,
            imageMap: {
                "Sofia": "national-scientist",
                "Sir Andre": "neda-director-general",
                "Ms. Karen": "ched-commissioner",
                "Enzo": "dost-secretary",
                "Dr. Lee": "senate-education-committee-chair",
                "PAGASA Researcher": "pagasa-administrator",
                "Liam": "dbm-secretary",
                "Ma'am Cruz": "deped-undersecretary",
                "Mr. Santos": "psa-administrator",
                "DepEd Secretary": "deped-secretary",
            },
            imageFileMap: {
                "national-scientist": "national-scientist.png",
                "neda-director-general": "neda-director-general.png",
                "ched-commissioner": "ched-commissioner.png",
                "dost-secretary": "dost-secretary.png",
                "senate-education-committee-chair": "senate-education-committee-chair.png",
                "pagasa-administrator": "pagasa-administrator.png",
                "dbm-secretary": "dbm-secretary.png",
                "deped-undersecretary": "deped-undersecretary.png",
                "psa-administrator": "psa-administrator.png",
                "deped-secretary": "deped-secretary.png",
            },
        };
    }







 updateNPCIndicators() {
    const gameStateManager = GameStateManager.getInstance();
    
    this.missionLocations.forEach((location) => {
        const indicator = this.missionIndicators.get(location.missionId);

        if (indicator) {
            // Calculate world coordinates using the same logic as in createNationalNPCsAfterLoad
            let worldX, worldY;
            if (location.percentX !== undefined && location.percentY !== undefined) {
                const coords = this.percentageToWorldCoordinates(
                    location.percentX,
                    location.percentY
                );
                worldX = coords.x;
                worldY = coords.y;
            } else {
                worldX = location.x * this.tileSize + this.tileSize / 2;
                worldY = location.y * this.tileSize + this.tileSize / 2;
            }

            let indicatorText = `Mission #${location.missionId}`;
            let indicatorColor = "#FFD700"; // Gold for available

            if (gameStateManager.isMissionCompleted(location.missionId)) {
                indicatorText = "✓";
                indicatorColor = "#32CD32"; // Lime green for completed
            } else if (!gameStateManager.canAccessMission(location.missionId)) {
                indicatorText = "🔒";
                indicatorColor = "#DC143C"; // Crimson red for locked
            }

            indicator.setText(indicatorText);
            indicator.setColor(indicatorColor);
            indicator.setPosition(worldX + 30, worldY - 100);  // Position adjusted
        }
    });

    console.log("National NPC indicators updated in real-time");
}
















}