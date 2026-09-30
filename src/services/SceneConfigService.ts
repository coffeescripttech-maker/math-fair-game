/**
 * Scene Config Service for MathTuto
 * Auto-detects an optional full-config JSON per map under public/config/
 * (e.g. public/config/barangaymap-config.json). When a file exists for a map,
 * it becomes the SINGLE source of truth for that map: its npcs, collectibles
 * and collisions are used entirely (higher precedence than localStorage and
 * mapData defaults). When no file exists, the game keeps the old behavior
 * (localStorage overrides, then mapData defaults).
 *
 * Workflow: author with the Position + Collision editors, then use
 * "Download Full Config" and drop the generated <map>-config.json into
 * public/config/ — detection + loading is automatic for every map.
 */

import type {
    ConfigExportMapSceneKey,
    MergedFullConfig,
} from "../utils/configExport";

export const ALL_CONFIG_MAP_KEYS: ConfigExportMapSceneKey[] = [
    "BarangayMap",
    "CityMap",
    "ProvinceMap",
    "RegionMap",
    "NationalMap",
];

/** Filename used by both the Full Config export and the auto-loader. */
export function configFilename(mapKey: string): string {
    return `${mapKey.toLowerCase()}-config.json`;
}

export class SceneConfigService {
    private static instance: SceneConfigService;

    /** Per-mapKey memo: the parsed config, or null when no file was detected. */
    private cache = new Map<string, MergedFullConfig | null>();
    private loading = new Map<string, Promise<MergedFullConfig | null>>();

    private constructor() {}

    public static getInstance(): SceneConfigService {
        if (!SceneConfigService.instance) {
            SceneConfigService.instance = new SceneConfigService();
        }
        return SceneConfigService.instance;
    }

    private isValidConfig(
        raw: unknown,
        mapKey: string,
    ): raw is MergedFullConfig {
        if (!raw || typeof raw !== "object") return false;
        const cfg = raw as Partial<MergedFullConfig>;
        return (
            Array.isArray(cfg.npcs) &&
            Array.isArray(cfg.collectibles) &&
            !!cfg.collisions &&
            Array.isArray((cfg.collisions as { shapes?: unknown[] }).shapes)
        );
    }

    /**
     * Detect and parse the config file for a map. Resolves null when the file
     * is absent. Results are cached so repeated sync reads are cheap.
     */
    public async ensureLoaded(
        mapKey: ConfigExportMapSceneKey,
        force = false,
    ): Promise<MergedFullConfig | null> {
        if (!force && this.cache.has(mapKey)) {
            return this.cache.get(mapKey) ?? null;
        }
        const pending = this.loading.get(mapKey);
        if (pending && !force) return pending;

        const promise = this.fetchConfig(mapKey)
            .then((cfg) => {
                this.cache.set(mapKey, cfg);
                this.loading.delete(mapKey);
                return cfg;
            })
            .catch((error) => {
                console.error(
                    `Failed to load config for ${mapKey}:`,
                    error,
                );
                this.cache.set(mapKey, null);
                this.loading.delete(mapKey);
                return null;
            });
        this.loading.set(mapKey, promise);
        return promise;
    }

    private async fetchConfig(
        mapKey: ConfigExportMapSceneKey,
    ): Promise<MergedFullConfig | null> {
        const filename = configFilename(mapKey);
        // Canonical: public/config/. Fallback: public/ root.
        const candidates = [`/config/${filename}`, `/${filename}`];

        for (const url of candidates) {
            try {
                const response = await fetch(url);
                if (!response.ok) continue;
                const raw: unknown = await response.json();
                if (!this.isValidConfig(raw, mapKey)) {
                    console.warn(
                        `Config ${url} for ${mapKey} has an invalid structure — ignoring it.`,
                    );
                    continue;
                }
                const cfg = raw as MergedFullConfig;
                cfg.mapName = mapKey;
                console.log(
                    `✅ Detected full config file for ${mapKey} (${url}): ${cfg.npcs.length} NPCs, ${cfg.collectibles.length} collectibles, ${cfg.collisions.shapes.length} collision shapes`,
                );
                return cfg;
            } catch {
                // 404 / network — try next candidate.
            }
        }
        return null;
    }

    /** Preload every map's config at app boot (fire-and-forget friendly). */
    public async preloadAll(): Promise<void> {
        await Promise.all(
            ALL_CONFIG_MAP_KEYS.map((key) => this.ensureLoaded(key)),
        );
    }

    /** Sync read of a cached config (must run after ensureLoaded settled). */
    public getSync(mapKey: string): MergedFullConfig | null {
        const cached = this.cache.get(mapKey as ConfigExportMapSceneKey);
        return cached ?? null;
    }

    /** True when a config file is active for the given map. */
    public isConfigActive(mapKey: string): boolean {
        return this.getSync(mapKey) !== null;
    }
}

export default SceneConfigService;