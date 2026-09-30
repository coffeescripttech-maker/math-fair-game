/**
 * NPC Position System Type Definitions for MathTuto
 * Background-relative NPC positions (overrides of the default mission-location spots)
 */

export interface NpcPosition {
    missionId: number;
    npc: string;
    percentX: number; // Background-relative X (%)
    percentY: number; // Background-relative Y (%)
    scale?: number; // Size multiplier vs. the authored default (defaults to 1)
}

export interface CollectiblePosition {
    id: string;
    percentX: number; // Background-relative X (%)
    percentY: number; // Background-relative Y (%)
    scale?: number; // Size multiplier vs. the authored default (defaults to 1)
}

export interface NpcPositionData {
    mapName: string; // "BarangayMap" or "CityMap" etc.
    version: string;
    createdAt: string;
    updatedAt: string;
    npcs: NpcPosition[]; // Overrides only — defaults come from mapData missionLocations
    collectibles?: CollectiblePosition[]; // Overrides only — defaults come from mapData collectibleItems
}