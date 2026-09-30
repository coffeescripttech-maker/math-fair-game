/**
 * Shared "Full Config" export helpers for the Position + Collision editors.
 * Produces ONE JSON file per map containing NPCs, collectibles and collision
 * shapes so the game config can be a single source of truth. Every section
 * keeps its original structure (npcs/collectibles match mapData.ts arrays,
 * collisions match CollisionData).
 */

import {
    CollectibleItemData,
    MissionLocation,
    barangayCollectibleItems,
    barangayMissionLocations,
    cityCollectibleItems,
    cityMissionLocations,
    nationalCollectibleItems,
    nationalMissionLocations,
    provinceCollectibleItems,
    provinceMissionLocations,
    regionCollectibleItems,
    regionMissionLocations,
} from "../game/config/mapData";
import type { CollisionData } from "../types/collision";

export type ConfigExportMapSceneKey =
    | "BarangayMap"
    | "CityMap"
    | "ProvinceMap"
    | "RegionMap"
    | "NationalMap";

/** Default NPC spots per map — the same arrays the scenes spawn from. */
export const MAP_NPC_LOCATIONS: Record<
    ConfigExportMapSceneKey,
    MissionLocation[]
> = {
    BarangayMap: barangayMissionLocations,
    CityMap: cityMissionLocations,
    ProvinceMap: provinceMissionLocations,
    RegionMap: regionMissionLocations,
    NationalMap: nationalMissionLocations,
};

/** Default collectible spots per map — the same arrays the scenes spawn from. */
export const MAP_COLLECTIBLE_ITEMS: Record<
    ConfigExportMapSceneKey,
    CollectibleItemData[]
> = {
    BarangayMap: barangayCollectibleItems,
    CityMap: cityCollectibleItems,
    ProvinceMap: provinceCollectibleItems,
    RegionMap: regionCollectibleItems,
    NationalMap: nationalCollectibleItems,
};

export interface NpcOverrideSpec {
    missionId: number;
    percentX: number;
    percentY: number;
    scale?: number;
}

export interface CollectibleOverrideSpec {
    id: string;
    percentX: number;
    percentY: number;
    scale?: number;
}

export interface MergedFullConfig {
    configVersion: string;
    exportedAt: string;
    mapName: ConfigExportMapSceneKey;
    npcs: MissionLocation[];
    collectibles: CollectibleItemData[];
    collisions: CollisionData;
}

/**
 * Merge authored defaults with the given overrides (positions + sizes) plus
 * the effective collision data. Overrides win; defaults are deep-copied so the
 * exported arrays never mutate the shared mapData arrays.
 */
export function buildFullConfig(args: {
    mapName: ConfigExportMapSceneKey;
    npcOverrides: NpcOverrideSpec[];
    collectibleOverrides: CollectibleOverrideSpec[];
    collisions: CollisionData | null;
}): MergedFullConfig {
    const { mapName, npcOverrides, collectibleOverrides, collisions } = args;
    const now = new Date().toISOString();

    const npcs = JSON.parse(
        JSON.stringify(MAP_NPC_LOCATIONS[mapName] ?? []),
    ) as MissionLocation[];
    npcOverrides.forEach((override) => {
        const npc = npcs.find((n) => n.missionId === override.missionId);
        if (npc) {
            npc.percentX = override.percentX;
            npc.percentY = override.percentY;
            if (override.scale !== undefined && override.scale !== 1) {
                (npc as unknown as { scale?: number }).scale = override.scale;
            }
        }
    });

    const collectibles = JSON.parse(
        JSON.stringify(MAP_COLLECTIBLE_ITEMS[mapName] ?? []),
    ) as CollectibleItemData[];
    collectibleOverrides.forEach((override) => {
        const item = collectibles.find((c) => c.id === override.id);
        if (item) {
            item.percentX = override.percentX;
            item.percentY = override.percentY;
            if (override.scale !== undefined && override.scale !== 1) {
                (item as unknown as { scale?: number }).scale =
                    override.scale;
            }
        }
    });

    const effectiveCollisions: CollisionData = collisions ?? {
        mapName,
        version: "1.0.0",
        createdAt: now,
        updatedAt: now,
        shapes: [],
    };

    return {
        configVersion: "1.2.0",
        exportedAt: now,
        mapName,
        npcs,
        collectibles,
        collisions: effectiveCollisions,
    };
}

/** Robust auto-download (anchor lives in the DOM; delayed revoke). */
export function tryDownload(filename: string, json: string): void {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Clipboard copy with a fallback for browsers without the async API. */
export async function copyTextToClipboard(text: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
    }
}