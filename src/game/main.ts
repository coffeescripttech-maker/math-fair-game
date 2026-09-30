import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { MainMenu } from "./scenes/MainMenu";
import { CharacterCreation } from "./scenes/CharacterCreation";
import { BarangayMap } from "./scenes/BarangayMap";
import { CityMap } from "./scenes/CityMap";
import { ProvinceMap } from "./scenes/ProvinceMap";
import { RegionMap } from "./scenes/RegionMap";
import { NationalMap } from "./scenes/NationalMap";
import { AUTO, Game } from "phaser";
import SceneConfigService, {
    ALL_CONFIG_MAP_KEYS,
} from "../services/SceneConfigService";
import NpcService from "../services/NpcService";
import CollisionService from "../services/CollisionService";
import type { NpcPositionData } from "../types/npcPositions";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: "100%",
    height: "100%",
    parent: "game-container",
    backgroundColor: "#87CEEB", // Sky blue like Pokémon
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: "100%",
        height: "100%",
        min: {
            width: 320,
            height: 240,
        },
        max: {
            width: 1920,
            height: 1080,
        },
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false,
        },
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        CharacterCreation,
        BarangayMap,
        CityMap,
        ProvinceMap,
        RegionMap,
        NationalMap,
    ],
};

const StartGame = (parent: string) => {
    // Detect optional full-config files (public/config/<map>-config.json) so
    // NPCs, collectibles and collisions can be driven entirely by file when one
    // exists. Fire-and-forget so it never blocks game boot.
    void SceneConfigService.getInstance()
        .preloadAll()
        .then(() => {
            const configService = SceneConfigService.getInstance();
            ALL_CONFIG_MAP_KEYS.forEach((mapKey) => {
                const cfg = configService.getSync(mapKey);
                if (!cfg) return;
                const now = new Date().toISOString();
                const positionData: NpcPositionData = {
                    mapName: mapKey,
                    version: "1.2.0",
                    createdAt: cfg.exportedAt ?? now,
                    updatedAt: cfg.exportedAt ?? now,
                    npcs: cfg.npcs.map((n) => ({
                        missionId: n.missionId,
                        npc: n.npc,
                        percentX: n.percentX,
                        percentY: n.percentY,
                        scale: (n as { scale?: number }).scale,
                    })),
                    collectibles: cfg.collectibles.map((c) => ({
                        id: c.id,
                        percentX: c.percentX,
                        percentY: c.percentY,
                        scale: (c as { scale?: number }).scale,
                    })),
                };
                NpcService.getInstance().setFileData(mapKey, positionData);
                if (cfg.collisions) {
                    CollisionService.getInstance().setFileCollisionData(
                        mapKey,
                        cfg.collisions,
                    );
                }
            });
        })
        .catch((error) => {
            console.error("Failed to preload map config files:", error);
        });

    return new Game({ ...config, parent });
};

export default StartGame;

