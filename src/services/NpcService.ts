/**
 * NPC Position Service for CIVIKA
 * Loads and saves NPC position overrides (localStorage, editor-authored only).
 * The default NPC spots come from mapData's mission-location arrays — this
 * service only stores the deltas the user drags in the NPC Position Editor.
 */

import {
    NpcPosition,
    NpcPositionData,
} from "../types/npcPositions";

export class NpcService {
    private static instance: NpcService;

    /** Per-mapName memo so the editor and the Phaser scenes agree instantly. */
    private cache = new Map<string, NpcPositionData | null>();

    private constructor() {}

    public static getInstance(): NpcService {
        if (!NpcService.instance) {
            NpcService.instance = new NpcService();
        }
        return NpcService.instance;
    }

    /**
     * Load NPC position overrides from localStorage (or null when none/corrupt).
     */
    public loadNpcData(mapName: string): NpcPositionData | null {
        if (this.cache.has(mapName)) {
            return this.cache.get(mapName) ?? null;
        }

        try {
            const saved = localStorage.getItem(`civika-npcs-${mapName}`);
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
                `civika-npcs-${data.mapName}`,
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
            localStorage.removeItem(`civika-npcs-${mapName}`);
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
}

export default NpcService;