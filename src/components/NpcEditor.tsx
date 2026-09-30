/**
 * NPC & Collectible Position Editor Component for MathTuto
 * Drag NPCs and collectibles around the map background and save their locations.
 * Saves background-relative percentage coordinates to browser storage (the
 * same pattern as the Collision Editor), so the game spawns them at the
 * edited spots — override deltas only, defaults come from mapData.
 */

import React, { useState, useRef, useEffect } from "react";
import {
    CollectibleItemData,
    MissionLocation,
} from "../game/config/mapData";
import NpcService from "../services/NpcService";
import { NpcPositionData } from "../types/npcPositions";
import { GameStateManager } from "../utils/GameStateManager";
import CollisionService from "../services/CollisionService";
import SceneConfigService from "../services/SceneConfigService";
import {
    MAP_COLLECTIBLE_ITEMS,
    MAP_NPC_LOCATIONS,
    buildFullConfig,
    copyTextToClipboard,
    tryDownload,
} from "../utils/configExport";

type MapSceneKey =
    | "BarangayMap"
    | "CityMap"
    | "ProvinceMap"
    | "RegionMap"
    | "NationalMap";

interface NpcEditorProps {
    onClose: () => void;
    isVisible: boolean;
    mapName: MapSceneKey;
    backgroundImage: string; // Path to background image
    /** Called after Save to Browser / Reset to Default so the game can re-read. */
    onNpcsPersisted?: (mapName: string) => void;
}

type MarkerKind = "npc" | "collectible";

interface NpcMarker {
    key: string; // "npc:<missionId>"
    kind: "npc";
    missionId: number;
    npc: string;
    locationName: string;
    percentX: number; // effective (override wins)
    percentY: number;
    defaultPercentX: number;
    defaultPercentY: number;
    scale: number; // size multiplier, 0.5-2.5 (1 = authored default)
    defaultScale: number;
    isOverridden: boolean;
}

interface CollectibleMarker {
    key: string; // "collect:<itemId>"
    kind: "collectible";
    id: string;
    icon: string;
    name: string;
    percentX: number; // effective (override wins)
    percentY: number;
    defaultPercentX: number;
    defaultPercentY: number;
    scale: number; // size multiplier, 0.5-2.5 (1 = authored default)
    defaultScale: number;
    isOverridden: boolean;
    collected: boolean; // already picked up in the current save; won't render
}

type EditorMarker = NpcMarker | CollectibleMarker;

const MARKER_RADIUS = 7;
const MARKER_RADIUS_DRAGGING = 9;
const HIT_RADIUS = 14;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;

const COLOR_DEFAULT = "#4169E1";
const COLOR_OVERRIDDEN = "#FFB300";
const COLOR_COLLECT_DEFAULT = "#22C55E";
const COLOR_COLLECT_OVERRIDDEN = "#00E5FF";
const COLOR_SELECTED = "#FFFF00";

export const NpcEditor: React.FC<NpcEditorProps> = ({
    onClose,
    isVisible,
    mapName,
    backgroundImage,
    onNpcsPersisted,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
    const [npcMarkers, setNpcMarkers] = useState<NpcMarker[]>([]);
    const [collectibleMarkers, setCollectibleMarkers] = useState<
        CollectibleMarker[]
    >([]);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [dragKey, setDragKey] = useState<string | null>(null);
    const [showGrid, setShowGrid] = useState(true);
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewJson, setPreviewJson] = useState<string | null>(null);

    /** True when a marker's spot or size differs from the authored default. */
    const markerChanged = (m: {
        percentX: number;
        percentY: number;
        defaultPercentX: number;
        defaultPercentY: number;
        scale: number;
        defaultScale: number;
    }) =>
        Math.abs(m.percentX - m.defaultPercentX) > 0.01 ||
        Math.abs(m.percentY - m.defaultPercentY) > 0.01 ||
        Math.abs(m.scale - m.defaultScale) > 0.01;

    /** Build the working list: mapData defaults with saved overrides on top. */
    const buildMarkers = () => {
        const npcDefaults = MAP_NPC_LOCATIONS[mapName] ?? [];
        const npcOverrides = NpcService.getInstance().getNpcPositions(mapName);
        const npcs: NpcMarker[] = npcDefaults.map((location) => {
            const override = npcOverrides?.get(location.missionId) ?? null;
            return {
                key: `npc:${location.missionId}`,
                kind: "npc",
                missionId: location.missionId,
                npc: location.npc,
                locationName: location.name,
                percentX: override ? override.percentX : location.percentX,
                percentY: override ? override.percentY : location.percentY,
                defaultPercentX: location.percentX,
                defaultPercentY: location.percentY,
                scale: override?.scale ?? 1,
                defaultScale: 1,
                isOverridden: override !== null,
            };
        });

        const collectibleDefaults = MAP_COLLECTIBLE_ITEMS[mapName] ?? [];
        const collectibleOverrides =
            NpcService.getInstance().getCollectiblePositions(mapName);
        const gsm = GameStateManager.getInstance();
        const collectibles: CollectibleMarker[] = collectibleDefaults.map(
            (item) => {
                const override = collectibleOverrides?.get(item.id) ?? null;
                return {
                    key: `collect:${item.id}`,
                    kind: "collectible",
                    id: item.id,
                    icon: item.icon,
                    name: item.name,
                    percentX: override ? override.percentX : item.percentX,
                    percentY: override ? override.percentY : item.percentY,
                    defaultPercentX: item.percentX,
                    defaultPercentY: item.percentY,
                    scale: override?.scale ?? 1,
                    defaultScale: 1,
                    isOverridden: override !== null,
                    collected: gsm.isItemCollected(item.id),
                };
            },
        );

        return { npcs, collectibles };
    };

    // Load background image and fit the canvas to it
    useEffect(() => {
        if (isVisible && backgroundImage) {
            const img = new Image();
            img.src = backgroundImage;
            img.onload = () => {
                setBgImage(img);
                const maxWidth = window.innerWidth * 0.7;
                const maxHeight = window.innerHeight * 0.7;
                const scale = Math.min(
                    maxWidth / img.width,
                    maxHeight / img.height,
                    1,
                );
                setCanvasSize({
                    width: img.width * scale,
                    height: img.height * scale,
                });
            };
        }
    }, [isVisible, backgroundImage]);

    // Load default spots + saved overrides whenever the editor opens
    useEffect(() => {
        if (isVisible) {
            // Ensure any full-config file for this map has been registered
            // (NpcService gives it top priority), then build markers from it.
            SceneConfigService.getInstance()
                .ensureLoaded(mapName)
                .then(() => {
                    const built = buildMarkers();
                    setNpcMarkers(built.npcs);
                    setCollectibleMarkers(built.collectibles);
                    setSelectedKey(null);
                    setDragKey(null);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, mapName]);

    // Draw the canvas
    useEffect(() => {
        if (!canvasRef.current || !bgImage) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        if (showGrid) {
            drawGrid(ctx, canvas.width, canvas.height);
        }

        const allMarkers: EditorMarker[] = [
            ...npcMarkers,
            ...collectibleMarkers,
        ];
        allMarkers.forEach((marker) => {
            drawMarker(ctx, marker, canvas.width, canvas.height);
        });
    }, [
        bgImage,
        npcMarkers,
        collectibleMarkers,
        selectedKey,
        dragKey,
        showGrid,
        canvasSize,
    ]);

    const drawGrid = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
    ) => {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * width;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    };

    const drawMarker = (
        ctx: CanvasRenderingContext2D,
        marker: EditorMarker,
        width: number,
        height: number,
    ) => {
        const x = (marker.percentX / 100) * width;
        const y = (marker.percentY / 100) * height;
        const isSelected = marker.key === selectedKey;
        const isDragging = marker.key === dragKey;
        const isCollect = marker.kind === "collectible";
        // Reflect the size multiplier on the marker itself so it's previewable.
        const sizeFactor = Math.max(MIN_SCALE, Math.min(MAX_SCALE, marker.scale));

        // Ghost ring at the authored default when this marker has been moved
        if (marker.isOverridden) {
            const dx = (marker.defaultPercentX / 100) * width;
            const dy = (marker.defaultPercentY / 100) * height;
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(dx, dy, MARKER_RADIUS * sizeFactor, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        const r = (isDragging ? MARKER_RADIUS_DRAGGING : MARKER_RADIUS) * sizeFactor;
        let fill = COLOR_DEFAULT;
        if (isCollect) {
            fill = marker.isOverridden
                ? COLOR_COLLECT_OVERRIDDEN
                : COLOR_COLLECT_DEFAULT;
        } else {
            fill = marker.isOverridden ? COLOR_OVERRIDDEN : COLOR_DEFAULT;
        }
        if (isSelected) fill = COLOR_SELECTED;

        // Collected collectibles are dimmed: they don't render in-game until
        // restored (collected items never respawn on their own).
        const isCollectedDim = isCollect && marker.collected;
        if (isCollectedDim) ctx.globalAlpha = 0.4;

        // NPCs: circle dots. Collectibles: diamonds so the two are easy to tell apart.
        ctx.beginPath();
        if (isCollect) {
            ctx.moveTo(x, y - r);
            ctx.lineTo(x + r, y);
            ctx.lineTo(x, y + r);
            ctx.lineTo(x - r, y);
            ctx.closePath();
        } else {
            ctx.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.stroke();

        // Name + live percentage label
        const label = isCollect
            ? `${marker.icon} ${marker.name}`
            : `${marker.npc}`;
        const subLabel = `(${marker.percentX.toFixed(1)}%, ${marker.percentY.toFixed(
            1,
        )}%)`;

        ctx.font = "bold 12px Arial";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
        ctx.fillStyle = marker.isOverridden ? "#FFD84D" : "#FFFFFF";
        ctx.strokeText(label, x + 12, y - 4);
        ctx.fillText(label, x + 12, y - 4);

        ctx.font = "11px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeText(subLabel, x + 12, y + 10);
        ctx.fillText(subLabel, x + 12, y + 10);

        if (isCollectedDim) ctx.globalAlpha = 1;
    };

    /** Pointer position → background-relative percent (canvas-size agnostic). */
    const getCanvasPercent = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        // Account for any CSS down-scaling of the canvas element.
        const scaleX = rect.width > 0 ? canvasSize.width / rect.width : 1;
        const scaleY = rect.height > 0 ? canvasSize.height / rect.height : 1;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        return {
            percentX: (x / canvasSize.width) * 100,
            percentY: (y / canvasSize.height) * 100,
        };
    };

    const findMarkerAt = (
        percentX: number,
        percentY: number,
    ): EditorMarker | null => {
        if (!canvasRef.current) return null;
        const width = canvasSize.width;
        const height = canvasSize.height;
        const allMarkers: EditorMarker[] = [
            ...npcMarkers,
            ...collectibleMarkers,
        ];

        // Topmost (last drawn) first, so overlapping markers select predictably.
        for (let i = allMarkers.length - 1; i >= 0; i--) {
            const marker = allMarkers[i];
            const dx =
                (marker.percentX / 100) * width - (percentX / 100) * width;
            const dy =
                (marker.percentY / 100) * height - (percentY / 100) * height;
            const hitRadius = Math.max(HIT_RADIUS, marker.scale * 14);
            if (Math.sqrt(dx * dx + dy * dy) <= hitRadius) {
                return marker;
            }
        }
        return null;
    };

    const handlePointerDown = (
        event: React.PointerEvent<HTMLCanvasElement>,
    ) => {
        const pos = getCanvasPercent(event);
        if (!pos) return;

        const hit = findMarkerAt(pos.percentX, pos.percentY);
        if (hit) {
            setSelectedKey(hit.key);
            setDragKey(hit.key);
            event.currentTarget.setPointerCapture?.(event.pointerId);
        } else {
            setSelectedKey(null);
        }
    };

    const handlePointerMove = (
        event: React.PointerEvent<HTMLCanvasElement>,
    ) => {
        if (dragKey === null) return;
        const pos = getCanvasPercent(event);
        if (!pos) return;

        const clampedX = Math.max(0, Math.min(100, pos.percentX));
        const clampedY = Math.max(0, Math.min(100, pos.percentY));

        setNpcMarkers((prev) =>
            prev.map((marker) => {
                if (marker.key !== dragKey) return marker;
                const next = {
                    ...marker,
                    percentX: clampedX,
                    percentY: clampedY,
                };
                return {
                    ...next,
                    isOverridden: markerChanged(next),
                };
            }),
        );
        setCollectibleMarkers((prev) =>
            prev.map((marker) => {
                if (marker.key !== dragKey) return marker;
                const next = {
                    ...marker,
                    percentX: clampedX,
                    percentY: clampedY,
                };
                return {
                    ...next,
                    isOverridden: markerChanged(next),
                };
            }),
        );
    };

    /** Clamp + round a size multiplier to one decimal. */
    const clampScale = (scale: number) =>
        Math.max(MIN_SCALE, Math.min(MAX_SCALE, Math.round(scale * 100) / 100));

    const updateMarkerScale = (scale: number) => {
        const clamped = clampScale(scale);
        setNpcMarkers((prev) =>
            prev.map((marker) => {
                if (marker.key !== selectedKey) return marker;
                const next = { ...marker, scale: clamped };
                return { ...next, isOverridden: markerChanged(next) };
            }),
        );
        setCollectibleMarkers((prev) =>
            prev.map((marker) => {
                if (marker.key !== selectedKey) return marker;
                const next = { ...marker, scale: clamped };
                return { ...next, isOverridden: markerChanged(next) };
            }),
        );
    };

    const copyJsonToClipboard = async (text: string) => {
        await copyTextToClipboard(text);
        alert("JSON copied to clipboard!");
    };

    const openJsonPreview = (title: string, json: string) => {
        setPreviewTitle(title);
        setPreviewJson(json);
    };

    const endDrag = () => {
        setDragKey(null);
    };

    /** Persist the current overrides to localStorage (and tell the game). */
    const saveToBrowser = () => {
        try {
            const service = NpcService.getInstance();
            const existing = service.loadNpcData(mapName);

            // NPCs: start from defaults, overlay the moved ones.
            const npcDefaults = MAP_NPC_LOCATIONS[mapName] ?? [];
            const locationsWithOverrides = JSON.parse(
                JSON.stringify(npcDefaults),
            ); // Deep copy
            const overriddenNpcs = npcMarkers.filter((m) => m.isOverridden);
            overriddenNpcs.forEach((marker) => {
                const npc = locationsWithOverrides.find(
                    (n: MissionLocation) => n.missionId === marker.missionId,
                );
                if (npc) {
                    npc.percentX = marker.percentX;
                    npc.percentY = marker.percentY;
                    if (marker.scale !== 1) (npc as any).scale = marker.scale;
                }
            });

            // Collectibles: same overlay approach.
            const collectibleDefaults = MAP_COLLECTIBLE_ITEMS[mapName] ?? [];
            const collectiblesWithOverrides = JSON.parse(
                JSON.stringify(collectibleDefaults),
            ); // Deep copy
            const overriddenCollectibles = collectibleMarkers.filter(
                (m) => m.isOverridden,
            );
            overriddenCollectibles.forEach((marker) => {
                const item = collectiblesWithOverrides.find(
                    (c: CollectibleItemData) => c.id === marker.id,
                );
                if (item) {
                    item.percentX = marker.percentX;
                    item.percentY = marker.percentY;
                    if (marker.scale !== 1)
                        (item as any).scale = marker.scale;
                }
            });

            const totalMoved = overriddenNpcs.length + overriddenCollectibles.length;

            // Create the data object for compatibility with NpcService
            const data: NpcPositionData = {
                mapName,
                version: "1.1.0",
                createdAt: existing?.createdAt ?? new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                npcs: locationsWithOverrides.map((npc: MissionLocation) => ({
                    missionId: npc.missionId,
                    npc: npc.npc,
                    percentX: npc.percentX,
                    percentY: npc.percentY,
                    ...((npc as any).scale !== undefined
                        ? { scale: (npc as any).scale }
                        : {}),
                })),
                collectibles: collectiblesWithOverrides.map(
                    (item: CollectibleItemData) => ({
                        id: item.id,
                        percentX: item.percentX,
                        percentY: item.percentY,
                        ...((item as any).scale !== undefined
                            ? { scale: (item as any).scale }
                            : {}),
                    }),
                ),
            };

            // Save to localStorage for compatibility (so game sees updates immediately)
            service.saveNpcData(data);
            onNpcsPersisted?.(mapName);

            alert(
                totalMoved > 0
                    ? `Saved ${totalMoved} position(s) to browser storage!`
                    : "Nothing moved — saved with all NPCs and collectibles at their default spots.",
            );
        } catch (error) {
            console.error("Failed to save positions:", error);
            alert("Failed to save positions!");
        }
    };

    const downloadJson = () => {
        try {
            const service = NpcService.getInstance();
            const existing = service.loadNpcData(mapName);

            // NPCs: full array (copy-paste friendly for mapData.ts)
            const npcDefaults = MAP_NPC_LOCATIONS[mapName] ?? [];
            const locationsWithOverrides = JSON.parse(
                JSON.stringify(npcDefaults),
            ); // Deep copy
            const overriddenNpcs = npcMarkers.filter((m) => m.isOverridden);
            overriddenNpcs.forEach((marker) => {
                const npc = locationsWithOverrides.find(
                    (n: MissionLocation) => n.missionId === marker.missionId,
                );
                if (npc) {
                    npc.percentX = marker.percentX;
                    npc.percentY = marker.percentY;
                    if (marker.scale !== 1) (npc as any).scale = marker.scale;
                }
            });

            // Collectibles: full array (copy-paste friendly for mapData.ts)
            const collectibleDefaults = MAP_COLLECTIBLE_ITEMS[mapName] ?? [];
            const collectiblesWithOverrides = JSON.parse(
                JSON.stringify(collectibleDefaults),
            ); // Deep copy
            const overriddenCollectibles = collectibleMarkers.filter(
                (m) => m.isOverridden,
            );
            overriddenCollectibles.forEach((marker) => {
                const item = collectiblesWithOverrides.find(
                    (c: CollectibleItemData) => c.id === marker.id,
                );
                if (item) {
                    item.percentX = marker.percentX;
                    item.percentY = marker.percentY;
                    if (marker.scale !== 1)
                        (item as any).scale = marker.scale;
                }
            });

            const totalMoved = overriddenNpcs.length + overriddenCollectibles.length;

            // Save to localStorage for compatibility (so game sees updates immediately)
            saveDataToService(service, existing, locationsWithOverrides, collectiblesWithOverrides);

            // NPC download (unchanged shape)
            tryDownload(
                `${mapName.toLowerCase()}-npcs.json`,
                JSON.stringify(locationsWithOverrides, null, 2),
            );

            // Collectible download (new)
            tryDownload(
                `${mapName.toLowerCase()}-collectibles.json`,
                JSON.stringify(collectiblesWithOverrides, null, 2),
            );

            alert(
                totalMoved > 0
                    ? `Saved ${totalMoved} position(s) to browser storage and downloaded NPCs + collectibles configs!`
                    : "Downloaded NPCs + collectibles configs with default positions.",
            );
        } catch (error) {
            console.error("Failed to download positions:", error);
            alert("Failed to download positions!");
        }
    };

    /**
     * Download ONE file containing everything for this map (NPCs +
     * collectibles + collisions) so it can be copied/imported as a single
     * source of truth. Each section keeps its exact original structure:
     *   npcs        -> paste into mapData's <map>MissionLocations array
     *   collectibles -> paste into mapData's <map>CollectibleItems array
     *   collisions   -> load via the Collision Editor (Load from File) or
     *                   publish as public/<map>-collisions.json
     */
    const downloadFullConfig = () => {
        try {
            const collisions =
                CollisionService.getInstance().loadCollisionData(mapName);
            const fullConfig = buildFullConfig({
                mapName,
                npcOverrides: npcMarkers
                    .filter((m) => m.isOverridden)
                    .map((m) => ({
                        missionId: m.missionId,
                        percentX: m.percentX,
                        percentY: m.percentY,
                        scale: m.scale !== 1 ? m.scale : undefined,
                    })),
                collectibleOverrides: collectibleMarkers
                    .filter((m) => m.isOverridden)
                    .map((m) => ({
                        id: m.id,
                        percentX: m.percentX,
                        percentY: m.percentY,
                        scale: m.scale !== 1 ? m.scale : undefined,
                    })),
                collisions,
            });

            const json = JSON.stringify(fullConfig, null, 2);
            tryDownload(`${mapName.toLowerCase()}-config.json`, json);
            openJsonPreview(
                `Full Config — ${mapName} (${fullConfig.npcs.length} NPCs, ${fullConfig.collectibles.length} collectibles, ${fullConfig.collisions.shapes.length} collision shapes)`,
                json,
            );
        } catch (error) {
            console.error("Failed to download full config:", error);
            alert("Failed to download full config!");
        }
    };

    const saveDataToService = (
        service: NpcService,
        existing: NpcPositionData | null,
        locationsWithOverrides: MissionLocation[],
        collectiblesWithOverrides: CollectibleItemData[],
    ) => {
        const data: NpcPositionData = {
            mapName,
            version: "1.1.0",
            createdAt: existing?.createdAt ?? new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            npcs: locationsWithOverrides.map((npc: MissionLocation) => ({
                missionId: npc.missionId,
                npc: npc.npc,
                percentX: npc.percentX,
                percentY: npc.percentY,
                ...((npc as any).scale !== undefined
                    ? { scale: (npc as any).scale }
                    : {}),
            })),
            collectibles: collectiblesWithOverrides.map(
                (item: CollectibleItemData) => ({
                    id: item.id,
                    percentX: item.percentX,
                    percentY: item.percentY,
                    ...((item as any).scale !== undefined
                        ? { scale: (item as any).scale }
                        : {}),
                }),
            ),
        };
        service.saveNpcData(data);
    };

    const loadFromFile = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(
                        event.target?.result as string,
                    ) as NpcPositionData;

                    if (!data || !Array.isArray(data.npcs)) {
                        alert("That file has no position data!");
                        return;
                    }

                    // Show the loaded NPC spots in the editor; persist via Save.
                    const byMissionId = new Map(
                        data.npcs.map((npc) => [npc.missionId, npc]),
                    );
                    setNpcMarkers((prev) =>
                        prev.map((marker) => {
                            const loaded = byMissionId.get(marker.missionId);
                            if (!loaded) return marker;
                            return {
                                ...marker,
                                percentX: loaded.percentX,
                                percentY: loaded.percentY,
                                scale: loaded.scale ?? 1,
                                isOverridden: true,
                            };
                        }),
                    );

                    // Same for collectibles when the file carries them.
                    if (data.collectibles) {
                        const byItemId = new Map(
                            data.collectibles.map((c) => [c.id, c]),
                        );
                        setCollectibleMarkers((prev) =>
                            prev.map((marker) => {
                                const loaded = byItemId.get(marker.id);
                                if (!loaded) return marker;
                                return {
                                    ...marker,
                                    percentX: loaded.percentX,
                                    percentY: loaded.percentY,
                                    scale: loaded.scale ?? 1,
                                    isOverridden: true,
                                };
                            }),
                        );
                    }

                    alert(
                        "Positions loaded! Click Save to Browser to apply them.",
                    );
                } catch (error) {
                    console.error("Failed to load positions:", error);
                    alert("Failed to load positions!");
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    const resetToDefault = () => {
        if (
            !confirm(
                "Reset all NPCs and collectibles on this map back to their default spots? This cannot be undone.",
            )
        ) {
            return;
        }
        NpcService.getInstance().removeNpcData(mapName);
        const built = buildMarkers();
        setNpcMarkers(built.npcs);
        setCollectibleMarkers(built.collectibles);
        setSelectedKey(null);
        setDragKey(null);
        onNpcsPersisted?.(mapName);
    };

    const restoreCollectedItems = () => {
        const removed =
            GameStateManager.getInstance().uncollectItemsByMap(mapName);
        if (removed === 0) {
            alert(`No collected items found for "${mapName}".`);
            return;
        }
        const built = buildMarkers();
        setCollectibleMarkers(built.collectibles);
        alert(
            `Restored ${removed} collected item(s) on ${mapName}. Back in the game, leave and re-enter this map (or reload) for them to appear again.`,
        );
    };

    const selectMarker = (key: string) => {
        setSelectedKey(key);
    };

    const allMarkers: EditorMarker[] = [
        ...npcMarkers,
        ...collectibleMarkers,
    ];
    const selectedMarker =
        allMarkers.find((m) => m.key === selectedKey) ?? null;
    const activeMarker =
        allMarkers.find((m) => m.key === dragKey) ?? selectedMarker;
    const movedCount = allMarkers.filter((m) => m.isOverridden).length;
    const activeLabel = activeMarker
        ? activeMarker.kind === "collectible"
            ? `${activeMarker.icon} ${activeMarker.name}`
            : activeMarker.npc
        : null;

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-none w-full h-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden border-4 border-black shadow-brutal-xl">
                {/* Header */}
                <div className="bg-brutal-yellow p-4 flex items-center justify-between border-b-4 border-black">
                    <h2 className="text-2xl font-brutal uppercase text-gray-900 flex items-center space-x-2">
                        <span>🧍</span>
                        <span>NPC & Collectible Position Editor - {mapName}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white font-bold text-xl brutal-press"
                    >
                        ✕
                    </button>
                </div>

                {SceneConfigService.getInstance().isConfigActive(mapName) && (
                    <div className="bg-teal-950 border-b-2 border-teal-500 px-4 py-2 text-sm text-teal-100">
                        ⚡{" "}
                        <span className="font-bold">
                            Active config file detected
                        </span>{" "}
                        (public/config/{mapName.toLowerCase()}-config.json) — the
                        game loads this file as the map's entire config. After
                        editing here, re-download the Full Config and overwrite
                        that file (Save to Browser is shadowed while it exists).
                    </div>
                )}

                <div className="flex flex-1 overflow-hidden">
                    {/* Left Panel - Tools */}
                    <div className="w-64 bg-gray-800 p-4 overflow-y-auto border-r-2 border-amber-600">
                        <h3 className="text-lg font-bold text-amber-400 mb-4">
                            🛠️ How to use
                        </h3>
                        <div className="text-sm text-gray-300 space-y-2 mb-6">
                            <p>1. Click a marker to select it.</p>
                            <p>2. Drag it anywhere on the map.</p>
                            <p>
                                3. Press{" "}
                                <span className="font-bold text-blue-400">
                                    Save to Browser
                                </span>{" "}
                                so the game reads the new spot.
                            </p>
                            <p className="text-xs text-gray-400 pt-1">
                                Blue circles = NPCs, green diamonds =
                                collectibles. A dashed ring marks where an item
                                was by default.
                            </p>
                            <p className="text-xs text-gray-400 pt-1">
                                Select a marker to resize it with the{" "}
                                <span className="text-cyan-400 font-bold">
                                    📏 Size
                                </span>{" "}
                                slider (0.5×–2.5× of the default).
                            </p>
                            <p className="text-xs text-gray-400 pt-1">
                                <span className="text-teal-400 font-bold">
                                    📦 Full Config
                                </span>{" "}
                                exports everything for this map in one file:
                                NPCs, collectibles, and collision shapes.
                            </p>
                            <p className="text-xs text-gray-400 pt-1">
                                <span className="text-purple-400 font-bold">
                                    Dimmed diamonds
                                </span>{" "}
                                were already collected in your save — they won't
                                render until you{" "}
                                <span className="text-purple-400 font-bold">
                                    Restore Collected Items
                                </span>
                                .
                            </p>
                        </div>

                        {/* View Options */}
                        <div className="space-y-2 mb-6">
                            <label className="flex items-center space-x-2 text-white">
                                <input
                                    type="checkbox"
                                    checked={showGrid}
                                    onChange={(e) =>
                                        setShowGrid(e.target.checked)
                                    }
                                    className="w-4 h-4"
                                />
                                <span>Show Grid</span>
                            </label>
                        </div>

                        {/* Size control for the selected marker */}
                        {activeMarker && (
                            <div className="mb-6 p-3 bg-gray-700 rounded space-y-2">
                                <p className="text-sm font-bold text-white flex items-center justify-between">
                                    <span>📏 Size</span>
                                    <span className="text-yellow-400">
                                        {activeMarker.scale.toFixed(2)}×
                                    </span>
                                </p>
                                <input
                                    type="range"
                                    min={MIN_SCALE}
                                    max={MAX_SCALE}
                                    step={0.05}
                                    value={activeMarker.scale}
                                    onChange={(e) =>
                                        updateMarkerScale(
                                            parseFloat(e.target.value),
                                        )
                                    }
                                    className="w-full"
                                />
                                <div className="flex gap-1">
                                    <button
                                        onClick={() =>
                                            updateMarkerScale(
                                                activeMarker.scale - 0.1,
                                            )
                                        }
                                        className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded"
                                    >
                                        −
                                    </button>
                                    <button
                                        onClick={() =>
                                            updateMarkerScale(
                                                activeMarker.scale + 0.1,
                                            )
                                        }
                                        className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => updateMarkerScale(1)}
                                        className="flex-1 h-8 bg-gray-600 hover:bg-gray-500 text-white text-xs font-bold rounded"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-tight">
                                    NPCs: sprite + name/mission labels.
                                    Collectibles: emoji + glow radius.
                                </p>
                            </div>
                        )}

                        {/* Save/Load */}
                        <div className="space-y-2">
                            <button
                                onClick={downloadJson}
                                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition-all"
                            >
                                💾 Download JSON
                            </button>
                            <button
                                onClick={downloadFullConfig}
                                className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded transition-all"
                            >
                                📦 Download Full Config (NPCs + Collectibles + Collisions)
                            </button>
                            <button
                                onClick={saveToBrowser}
                                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-all"
                            >
                                💿 Save to Browser
                            </button>
                            <button
                                onClick={loadFromFile}
                                className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded transition-all"
                            >
                                📂 Load from File
                            </button>
                            <button
                                onClick={restoreCollectedItems}
                                className="w-full px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded transition-all"
                            >
                                ♻️ Restore Collected Items
                            </button>
                            <button
                                onClick={resetToDefault}
                                className="w-full px-4 py-2 bg-red-800 hover:bg-red-900 text-white font-bold rounded transition-all"
                            >
                                ↺ Reset to Default
                            </button>
                        </div>
                    </div>

                    {/* Center Panel - Canvas */}
                    <div className="flex-1 bg-gray-900 p-4 flex items-center justify-center overflow-auto">
                        <div className="relative">
                            <canvas
                                ref={canvasRef}
                                width={canvasSize.width}
                                height={canvasSize.height}
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={endDrag}
                                onPointerCancel={endDrag}
                                onPointerLeave={endDrag}
                                className="border-2 border-amber-600 cursor-move"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    touchAction: "none",
                                }}
                            />
                            <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-2 rounded text-sm">
                                <p>
                                    Drag an NPC or collectible to move it.{" "}
                                    <span className="font-bold text-yellow-400">
                                        {movedCount} moved
                                    </span>
                                </p>
                                {activeMarker && activeLabel && (
                                    <p className="text-green-400">
                                        {activeLabel}: (
                                        {activeMarker.percentX.toFixed(1)}%,{" "}
                                        {activeMarker.percentY.toFixed(1)}%) —{" "}
                                        {activeMarker.scale.toFixed(2)}×
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Lists */}
                    <div className="w-64 bg-gray-800 p-4 overflow-y-auto border-l-2 border-amber-600">
                        <h3 className="text-lg font-bold text-amber-400 mb-4">
                            🧍 NPCs ({npcMarkers.length})
                        </h3>

                        {npcMarkers.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-4">
                                No NPCs found for this map.
                            </p>
                        ) : (
                            <div className="space-y-2 mb-6">
                                {npcMarkers.map((marker) => (
                                    <div
                                        key={marker.key}
                                        onClick={() => selectMarker(marker.key)}
                                        className={`p-3 rounded cursor-pointer transition-all ${
                                            marker.key === selectedKey
                                                ? "bg-yellow-600 text-white"
                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        }`}
                                    >
                                        <p className="font-bold text-sm flex items-center gap-2">
                                            <span
                                                className="inline-block w-3 h-3 rounded-full border border-black shrink-0"
                                                style={{
                                                    backgroundColor:
                                                        marker.isOverridden
                                                            ? COLOR_OVERRIDDEN
                                                            : COLOR_DEFAULT,
                                                }}
                                            />
                                            {marker.npc}
                                        </p>
                                        <p className="text-xs opacity-75 mt-1">
                                            #{marker.missionId}{" "}
                                            {marker.locationName}
                                        </p>
                                        <p className="text-xs opacity-75">
                                            ({marker.percentX.toFixed(1)}%,{" "}
                                            {marker.percentY.toFixed(1)}%)
                                        </p>
                                        {marker.scale !== 1 && (
                                            <p className="text-xs font-bold text-cyan-400 mt-1">
                                                📏 SIZED{" "}
                                                {marker.scale.toFixed(2)}×
                                            </p>
                                        )}
                                        {(
                                            Math.abs(
                                                marker.percentX -
                                                    marker.defaultPercentX,
                                            ) > 0.01 ||
                                            Math.abs(
                                                marker.percentY -
                                                    marker.defaultPercentY,
                                            ) > 0.01
                                        ) && (
                                            <p className="text-xs font-bold text-amber-400 mt-1">
                                                MOVED from (
                                                {marker.defaultPercentX.toFixed(
                                                    1,
                                                )}
                                                %,{" "}
                                                {marker.defaultPercentY.toFixed(
                                                    1,
                                                )}
                                                %)
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <h3 className="text-lg font-bold text-amber-400 mb-4 mt-6 pt-4 border-t border-amber-700">
                            ⭐ Collectibles ({collectibleMarkers.length})
                        </h3>

                        {collectibleMarkers.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-4">
                                No collectibles found for this map.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {collectibleMarkers.map((marker) => (
                                    <div
                                        key={marker.key}
                                        onClick={() => selectMarker(marker.key)}
                                        className={`p-3 rounded cursor-pointer transition-all ${
                                            marker.key === selectedKey
                                                ? "bg-yellow-600 text-white"
                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        }`}
                                    >
                                        <p className="font-bold text-sm flex items-center gap-2">
                                            <span
                                                className="inline-block w-3 h-3 rounded-full border border-black shrink-0"
                                                style={{
                                                    backgroundColor:
                                                        marker.isOverridden
                                                            ? COLOR_COLLECT_OVERRIDDEN
                                                            : COLOR_COLLECT_DEFAULT,
                                                }}
                                            />
                                            {marker.icon} {marker.name}
                                        </p>
                                        <p className="text-xs opacity-75 mt-1">
                                            {marker.id}
                                        </p>
                                        {marker.collected && (
                                            <p className="text-xs font-bold text-purple-400 mt-1">
                                                ☑ Collected — not shown in-game
                                                until restored
                                            </p>
                                        )}
                                        <p className="text-xs opacity-75">
                                            ({marker.percentX.toFixed(1)}%,{" "}
                                            {marker.percentY.toFixed(1)}%)
                                        </p>
                                        {marker.scale !== 1 && (
                                            <p className="text-xs font-bold text-cyan-400 mt-1">
                                                📏 SIZED{" "}
                                                {marker.scale.toFixed(2)}×
                                            </p>
                                        )}
                                        {(
                                            Math.abs(
                                                marker.percentX -
                                                    marker.defaultPercentX,
                                            ) > 0.01 ||
                                            Math.abs(
                                                marker.percentY -
                                                    marker.defaultPercentY,
                                            ) > 0.01
                                        ) && (
                                            <p className="text-xs font-bold text-amber-400 mt-1">
                                                MOVED from (
                                                {marker.defaultPercentX.toFixed(
                                                    1,
                                                )}
                                                %,{" "}
                                                {marker.defaultPercentY.toFixed(
                                                    1,
                                                )}
                                                %)
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer - Instructions */}
                <div className="bg-gray-800 p-3 border-t-2 border-amber-600">
                    <div className="text-sm text-white flex items-center justify-between">
                        <div>
                            <p>
                                📖{" "}
                                <span className="font-bold">
                                    Click and drag a marker to move it, then
                                    Save to Browser.
                                </span>
                            </p>
                        </div>
                        <div className="text-amber-400">
                            Moved: {movedCount} / {allMarkers.length}
                        </div>
                    </div>
                </div>
            </div>

            {/* JSON preview fallback — some browsers/previews block auto-downloads */}
            {previewJson && (
                <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
                    <div className="bg-gray-900 border-4 border-black shadow-brutal-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
                        <div className="bg-brutal-yellow p-3 flex items-center justify-between border-b-4 border-black">
                            <h3 className="font-brutal uppercase text-gray-900 font-bold text-base truncate">
                                {previewTitle}
                            </h3>
                            <button
                                onClick={() => setPreviewJson(null)}
                                className="w-9 h-9 bg-brutal-red border-2 border-black text-white font-bold text-xl brutal-press shrink-0 ml-2"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-xs text-gray-300 px-4 py-2">
                            Auto-download started. If no file appeared, select
                            all + copy the JSON below — the structure matches
                            what to paste into mapData.ts / the Collision
                            Editor.
                        </p>
                        <div className="flex justify-end px-4 pb-2">
                            <button
                                onClick={() =>
                                    copyJsonToClipboard(previewJson)
                                }
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded"
                            >
                                📋 Copy JSON
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={previewJson}
                            onFocus={(e) => e.currentTarget.select()}
                            className="flex-1 mx-4 mb-4 bg-gray-950 text-green-400 font-mono text-xs p-3 resize-none outline-none rounded"
                            spellCheck={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NpcEditor;