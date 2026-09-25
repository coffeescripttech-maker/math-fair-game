/**
 * MathTuto — single source of truth for the game's level structure.
 *
 * Change ONLY `GAME_CONFIG.MAX_LEVELS` below (default 3) and every part of the
 * game that depends on it recomputes automatically: HUD badge totals, quest
 * log, pause-menu map navigation, tutorial, progression rules, secret quests.
 * Raise it to 4 or 5 later and the remaining levels "come alive" again without
 * any other code change — their maps, missions, quizzes and assets stay
 * bundled but unreachable until then.
 *
 * `LEVEL_CATALOG` is the FULL intended game (5 districts). Only the first
 * `MAX_LEVELS` entries are treated as live content.
 */

import {
    barangayCollectibleItems,
    cityCollectibleItems,
    provinceCollectibleItems,
    regionCollectibleItems,
    nationalCollectibleItems,
} from "../game/config/mapData";

export type LevelTone =
    | "yellow"
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "red"
    | "cream";

export interface LevelDefinition {
    /** 1-based level number */
    level: number;
    /** Display name, e.g. "Barangay" */
    name: string;
    /** Phaser scene key, e.g. "BarangayMap" */
    scene: string;
    /** Emoji used in UI */
    icon: string;
    /** Accent color used in cards / buttons */
    tone: LevelTone;
    /** First mission id in this level (inclusive) */
    missionStart: number;
    /** Last mission id in this level (inclusive) */
    missionEnd: number;
    /** One-line description of the level's content */
    theme: string;
}

/** The knob for how much of the game is live. 1-5. */
export const GAME_CONFIG = {
    MAX_LEVELS: 3,
    MISSIONS_PER_LEVEL: 10,
} as const;

export const LEVEL_CATALOG: LevelDefinition[] = [
    {
        level: 1,
        name: "Barangay",
        scene: "BarangayMap",
        icon: "🏘️",
        tone: "green",
        missionStart: 1,
        missionEnd: 10,
        theme: "Community tutoring: radicals & inverse functions",
    },
    {
        level: 2,
        name: "City",
        scene: "CityMap",
        icon: "🏙️",
        tone: "blue",
        missionStart: 11,
        missionEnd: 20,
        theme: "Business & intermediate algebra around the city",
    },
    {
        level: 3,
        name: "Province",
        scene: "ProvinceMap",
        icon: "🏛️",
        tone: "purple",
        missionStart: 21,
        missionEnd: 30,
        theme: "Scholarship coaching with deeper radicals",
    },
    {
        level: 4,
        name: "Region",
        scene: "RegionMap",
        icon: "🌏",
        tone: "orange",
        missionStart: 31,
        missionEnd: 40,
        theme: "Regional competition: physics & formula-driven problems",
    },
    {
        level: 5,
        name: "National",
        scene: "NationalMap",
        icon: "🇵🇭",
        tone: "red",
        missionStart: 41,
        missionEnd: 50,
        theme: "National Olympiad mentoring for government agencies",
    },
];

/** Live levels (first `MAX_LEVELS` entries of the catalog). */
export const ACTIVE_LEVELS = LEVEL_CATALOG.filter(
    (lv) => lv.level <= GAME_CONFIG.MAX_LEVELS
);

export const TOTAL_LEVELS = ACTIVE_LEVELS.length;

/** Total number of playable missions across the live levels. */
export const TOTAL_MISSIONS =
    ACTIVE_LEVELS.length * GAME_CONFIG.MISSIONS_PER_LEVEL;

export const TOTAL_BADGES = TOTAL_MISSIONS;

const COLLECTIBLES_BY_SCENE: Record<string, unknown[]> = {
    BarangayMap: barangayCollectibleItems,
    CityMap: cityCollectibleItems,
    ProvinceMap: provinceCollectibleItems,
    RegionMap: regionCollectibleItems,
    NationalMap: nationalCollectibleItems,
};

/** Number of collectible items that exist across the live maps. */
export const ACTIVE_COLLECTIBLES = ACTIVE_LEVELS.reduce(
    (total, lv) => total + (COLLECTIBLES_BY_SCENE[lv.scene]?.length ?? 0),
    0
);

/** Which level a mission id belongs to (1-based, clamped to live levels). */
export function getLevelOfMission(missionId: number): number {
    return Math.min(
        TOTAL_LEVELS,
        Math.max(1, Math.ceil(missionId / GAME_CONFIG.MISSIONS_PER_LEVEL))
    );
}

/** Phaser scene key for a level number (falls back to the first live map). */
export function getSceneForLevel(level: number): string {
    return (
        ACTIVE_LEVELS.find((lv) => lv.level === level)?.scene ??
        ACTIVE_LEVELS[0].scene
    );
}

/**
 * Requirements to REACH `targetLevel` from the previous level:
 * badges = every badge of the previous levels, accuracy = 60 + 5×level
 * (70% → Level 2, 75% → Level 3, 80% → Level 4, 85% → Level 5, …).
 */
export function getProgressionRequirement(targetLevel: number): {
    badgesRequired: number;
    minScorePercentage: number;
} {
    return {
        badgesRequired: (targetLevel - 1) * GAME_CONFIG.MISSIONS_PER_LEVEL,
        minScorePercentage: 60 + 5 * targetLevel,
    };
}