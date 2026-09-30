/**
 * NPC Position Service for MathTuto
 * Provides NPC + collectible position data with this precedence:
 *   1) Full-config file (public/config/<map>-config.json, auto-detected)
 *      → treated as the map's ENTIRE config (defaults + edits).
 *   2) localStorage overrides authored in the Position Editor.
 *   3) mapData defaults (only when neither of the above exists).
 * The service only stores the deltas the user drags in the editor; the
 * defaults come from mapData's mission-location arrays.
 */

import {
    CollectiblePosition,
    NpcPosition,
    NpcPositionData,
} from "../types/npcPositions";

export class NpcService {
    private static instance: NpcService;

    /** Per-mapName memo so the editor and the Phaser scenes agree instantly. */
    private cache = new Map<string, NpcPositionData | null>();

    /** Data sourced from an auto-detected full-config file (highest priority). */
    private fileData = new Map<string, NpcPositionData>();

    private constructor() {}

    public static getInstance(): NpcService {
        if (!NpcService.instance) {
            NpcService.instance = new NpcService();
        }
        return NpcService.instance;
    }

    /**
     * Register file-sourced position data (from SceneConfigService) — this
     * becomes the map's entire config and outranks localStorage overrides.
     */
    public setFileData(mapName: string, data: NpcPositionData): void {
        this.fileData.set(mapName, data);
        console.log(`Using full-config file data for ${mapName}`);
    }

    /** True when a full-config file currently drives the given map. */
    public isFileDataActive(mapName: string): boolean {
        return this.fileData.has(mapName);
    }

    /**
     * Load position data for a map with file > localStorage > null priority.
     */
    public loadNpcData(mapName: string): NpcPositionData | null {
        const file = this.fileData.get(mapName);
        if (file) return file;

        if (this.cache.has(mapName)) {
            return this.cache.get(mapName) ?? null;
        }

        try {
            const saved = localStorage.getItem(`mathtuto-npcs-${mapName}`);
            if (saved) {
                const data = JSON.parse(saved) as NpcPositionData;
                this.cache.set(mapName, data);
                console.log(
                    `Loaded NPC position data from localStorage for ${mapName}`,
                );
                return data;
            }
        } catch (error) {
            console.error(
                "Failed to load NPC position data from localStorage:",
                error,
            );
        }

        this.cache.set(mapName, null);
        return null;
    }

    /**
     * Save NPC position overrides to localStorage and refresh the memo cache.
     */
    public saveNpcData(data: NpcPositionData): void {
        try {
            localStorage.setItem(
                `mathtuto-npcs-${data.mapName}`,
                JSON.stringify(data),
            );
            this.cache.set(data.mapName, data);
            console.log(`NPC position data saved for ${data.mapName}`);
        } catch (error) {
            console.error("Failed to save NPC position data:", error);
        }
    }

    /**
     * Clear stored overrides for a map (used by "Reset to Default").
     */
    public removeNpcData(mapName: string): void {
        try {
            localStorage.removeItem(`mathtuto-npcs-${mapName}`);
            this.cache.set(mapName, null);
            console.log(`NPC position data cleared for ${mapName}`);
        } catch (error) {
            console.error("Failed to clear NPC position data:", error);
        }
    }

    /**
     * Single NPC override for a mission, or null.
     */
    public getNpcPosition(
        mapName: string,
        missionId: number,
    ): NpcPosition | null {
        const data = this.loadNpcData(mapName);
        if (!data) return null;
        return (
            data.npcs.find((npc) => npc.missionId === missionId) ?? null
        );
    }

    /**
     * All overrides for a map keyed by missionId, or null when nothing saved.
     */
    public getNpcPositions(
        mapName: string,
    ): Map<number, NpcPosition> | null {
        const data = this.loadNpcData(mapName);
        if (!data || data.npcs.length === 0) return null;

        const positions = new Map<number, NpcPosition>();
        data.npcs.forEach((npc) => {
            positions.set(npc.missionId, npc);
        });
        return positions;
    }

    /**
     * Single collectible override for a map's item, or null.
     */
    public getCollectiblePosition(
        mapName: string,
        id: string,
    ): CollectiblePosition | null {
        const data = this.loadNpcData(mapName);
        if (!data || !data.collectibles) return null;
        return data.collectibles.find((c) => c.id === id) ?? null;
    }

    /**
     * All collectible overrides for a map keyed by item id, or null.
     */
    public getCollectiblePositions(
        mapName: string,
    ): Map<string, CollectiblePosition> | null {
        const data = this.loadNpcData(mapName);
        if (!data || !data.collectibles || data.collectibles.length === 0) {
            return null;
        }

        const positions = new Map<string, CollectiblePosition>();
        data.collectibles.forEach((c) => {
            positions.set(c.id, c);
        });
        return positions;
    }
}

export default NpcService;