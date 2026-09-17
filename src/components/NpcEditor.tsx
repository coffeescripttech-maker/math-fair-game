/**
 * NPC Position Editor Component for CIVIKA
 * Drag NPCs around the map background and save their locations.
 * Saves background-relative percentage coordinates to browser storage (the
 * same pattern as the Collision Editor), so the game spawns NPCs at the
 * edited spots.
 */

import React, { useState, useRef, useEffect } from "react";
import {
    MissionLocation,
    barangayMissionLocations,
    cityMissionLocations,
    provinceMissionLocations,
    regionMissionLocations,
    nationalMissionLocations,
} from "../game/config/mapData";
import NpcService from "../services/NpcService";
import { NpcPositionData } from "../types/npcPositions";

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

/** Default NPC spots per map — the same arrays the scenes spawn from. */
const MAP_NPC_LOCATIONS: Record<MapSceneKey, MissionLocation[]> = {
    BarangayMap: barangayMissionLocations,
    CityMap: cityMissionLocations,
    ProvinceMap: provinceMissionLocations,
    RegionMap: regionMissionLocations,
    NationalMap: nationalMissionLocations,
};

interface NpcMarker {
    missionId: number;
    npc: string;
    locationName: string;
    percentX: number; // effective (override wins)
    percentY: number;
    defaultPercentX: number;
    defaultPercentY: number;
    isOverridden: boolean;
}

const MARKER_RADIUS = 7;
const MARKER_RADIUS_DRAGGING = 9;
const HIT_RADIUS = 14;

const COLOR_DEFAULT = "#4169E1";
const COLOR_OVERRIDDEN = "#FFB300";
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
    const [markers, setMarkers] = useState<NpcMarker[]>([]);
    const [selectedMissionId, setSelectedMissionId] = useState<number | null>(
        null,
    );
    const [dragMissionId, setDragMissionId] = useState<number | null>(null);
    const [showGrid, setShowGrid] = useState(true);

    /** Build the working list: mapData defaults with saved overrides on top. */
    const buildMarkers = (): NpcMarker[] => {
        const defaults = MAP_NPC_LOCATIONS[mapName] ?? [];
        const overrides = NpcService.getInstance().getNpcPositions(mapName);

        return defaults.map((location) => {
            const override = overrides?.get(location.missionId) ?? null;
            return {
                missionId: location.missionId,
                npc: location.npc,
                locationName: location.name,
                percentX: override ? override.percentX : location.percentX,
                percentY: override ? override.percentY : location.percentY,
                defaultPercentX: location.percentX,
                defaultPercentY: location.percentY,
                isOverridden: override !== null,
            };
        });
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
            setMarkers(buildMarkers());
            setSelectedMissionId(null);
            setDragMissionId(null);
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

        markers.forEach((marker) => {
            drawMarker(ctx, marker, canvas.width, canvas.height);
        });
    }, [bgImage, markers, selectedMissionId, dragMissionId, showGrid, canvasSize]);

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
        marker: NpcMarker,
        width: number,
        height: number,
    ) => {
        const x = (marker.percentX / 100) * width;
        const y = (marker.percentY / 100) * height;
        const isSelected = marker.missionId === selectedMissionId;
        const isDragging = marker.missionId === dragMissionId;

        // Ghost ring at the authored default when this NPC has been moved
        if (marker.isOverridden) {
            const dx = (marker.defaultPercentX / 100) * width;
            const dy = (marker.defaultPercentY / 100) * height;
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(dx, dy, MARKER_RADIUS, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        // Marker dot
        const fill = isSelected
            ? COLOR_SELECTED
            : marker.isOverridden
              ? COLOR_OVERRIDDEN
              : COLOR_DEFAULT;
        ctx.beginPath();
        ctx.arc(
            x,
            y,
            isDragging ? MARKER_RADIUS_DRAGGING : MARKER_RADIUS,
            0,
            Math.PI * 2,
        );
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.stroke();

        // Name + live percentage label
        const label = `${marker.npc}`;
        const subLabel = `#${marker.missionId} (${marker.percentX.toFixed(
            1,
        )}%, ${marker.percentY.toFixed(1)}%)`;

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

    const findMarkerAt = (percentX: number, percentY: number) => {
        if (!canvasRef.current) return null;
        const width = canvasSize.width;
        const height = canvasSize.height;

        // Topmost (last drawn) first, so overlapping markers select predictably.
        for (let i = markers.length - 1; i >= 0; i--) {
            const marker = markers[i];
            const dx = (marker.percentX / 100) * width - (percentX / 100) * width;
            const dy =
                (marker.percentY / 100) * height - (percentY / 100) * height;
            if (Math.sqrt(dx * dx + dy * dy) <= HIT_RADIUS) {
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
            setSelectedMissionId(hit.missionId);
            setDragMissionId(hit.missionId);
            event.currentTarget.setPointerCapture?.(event.pointerId);
        } else {
            setSelectedMissionId(null);
        }
    };

    const handlePointerMove = (
        event: React.PointerEvent<HTMLCanvasElement>,
    ) => {
        if (dragMissionId === null) return;
        const pos = getCanvasPercent(event);
        if (!pos) return;

        const clampedX = Math.max(0, Math.min(100, pos.percentX));
        const clampedY = Math.max(0, Math.min(100, pos.percentY));

        setMarkers((prev) =>
            prev.map((marker) => {
                if (marker.missionId !== dragMissionId) return marker;
                const isOverridden =
                    Math.abs(clampedX - marker.defaultPercentX) > 0.01 ||
                    Math.abs(clampedY - marker.defaultPercentY) > 0.01;
                return {
                    ...marker,
                    percentX: clampedX,
                    percentY: clampedY,
                    isOverridden,
                };
            }),
        );
    };

    const endDrag = () => {
        setDragMissionId(null);
    };

    /** Persist the current overrides to localStorage (and tell the game). */
    const saveToBrowser = () => {
        try {
            const service = NpcService.getInstance();
            const existing = service.loadNpcData(mapName);

            // Start with a copy of the default locations
            const defaults = MAP_NPC_LOCATIONS[mapName] ?? [];
            const locationsWithOverrides = JSON.parse(JSON.stringify(defaults)); // Deep copy

            // Apply overrides
            const overridden = markers.filter((m) => m.isOverridden);
            overridden.forEach((marker) => {
                const npc = locationsWithOverrides.find((npc: MissionLocation) => npc.missionId === marker.missionId);
                if (npc) {
                    npc.percentX = marker.percentX;
                    npc.percentY = marker.percentY;
                }
            });

            // Create the data object for compatibility with NpcService
            const data: NpcPositionData = {
                mapName,
                version: "1.0.0",
                createdAt: existing?.createdAt ?? new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                npcs: locationsWithOverrides.map((npc: MissionLocation) => ({
                    missionId: npc.missionId,
                    npc: npc.npc,
                    percentX: npc.percentX,
                    percentY: npc.percentY,
                })),
            };

            // Save to localStorage for compatibility (so game sees updates immediately)
            service.saveNpcData(data);
            onNpcsPersisted?.(mapName);

            alert(
                overridden.length > 0
                    ? `Saved ${overridden.length} NPC position(s) to browser storage!`
                    : "No NPCs moved — saved with all NPCs at their default spots."
            );
        } catch (error) {
            console.error("Failed to save NPC positions:", error);
            alert("Failed to save NPC positions!");
        }
    };

    const downloadJson = () => {
        try {
            const service = NpcService.getInstance();
            const existing = service.loadNpcData(mapName);

            // Start with a copy of the default locations
            const defaults = MAP_NPC_LOCATIONS[mapName] ?? [];
            const locationsWithOverrides = JSON.parse(JSON.stringify(defaults)); // Deep copy

            // Apply overrides
            const overridden = markers.filter((m) => m.isOverridden);
            overridden.forEach((marker) => {
                const npc = locationsWithOverrides.find((npc: MissionLocation) => npc.missionId === marker.missionId);
                if (npc) {
                    npc.percentX = marker.percentX;
                    npc.percentY = marker.percentY;
                }
            });

            // Create the data object for compatibility with NpcService (localStorage)
            const data: NpcPositionData = {
                mapName,
                version: "1.0.0",
                createdAt: existing?.createdAt ?? new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                npcs: locationsWithOverrides.map((npc: MissionLocation) => ({
                    missionId: npc.missionId,
                    npc: npc.npc,
                    percentX: npc.percentX,
                    percentY: npc.percentY,
                })),
            };

            // Save to localStorage for compatibility (so game sees updates immediately)
            service.saveNpcData(data);

            // For download, export the complete array with all fields (copy-paste friendly for mapData.ts)
            const filename = `${mapName.toLowerCase()}-npcs.json`;
            const json = JSON.stringify(locationsWithOverrides, null, 2);
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);

            alert(
                overridden.length > 0
                    ? `Saved ${overridden.length} NPC position(s) to browser storage and downloaded complete configuration!`
                    : "No NPCs moved — downloaded complete configuration with default positions."
            );
        } catch (error) {
            console.error("Failed to download NPC positions:", error);
            alert("Failed to download NPC positions!");
        }
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
                        alert("That file has no NPC position data!");
                        return;
                    }

                    // Show the loaded spots in the editor; persist via Save.
                    const byMissionId = new Map(
                        data.npcs.map((npc) => [npc.missionId, npc]),
                    );
                    setMarkers((prev) =>
                        prev.map((marker) => {
                            const loaded = byMissionId.get(marker.missionId);
                            if (!loaded) return marker;
                            return {
                                ...marker,
                                percentX: loaded.percentX,
                                percentY: loaded.percentY,
                                isOverridden: true,
                            };
                        }),
                    );
                    alert(
                        "NPC positions loaded! Click Save to Browser to apply them.",
                    );
                } catch (error) {
                    console.error("Failed to load NPC positions:", error);
                    alert("Failed to load NPC positions!");
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    const resetToDefault = () => {
        if (
            !confirm(
                "Reset all NPCs on this map back to their default spots? This cannot be undone.",
            )
        ) {
            return;
        }
        NpcService.getInstance().removeNpcData(mapName);
        setMarkers(buildMarkers());
        setSelectedMissionId(null);
        setDragMissionId(null);
        onNpcsPersisted?.(mapName);
    };

    const selectMarker = (missionId: number) => {
        setSelectedMissionId(missionId);
    };

    const selectedMarker =
        markers.find((m) => m.missionId === selectedMissionId) ?? null;
    const activeMarker =
        markers.find((m) => m.missionId === dragMissionId) ?? selectedMarker;
    const overrideCount = markers.filter((m) => m.isOverridden).length;

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-none w-full h-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden border-4 border-black shadow-brutal-xl">
                {/* Header */}
                <div className="bg-brutal-yellow p-4 flex items-center justify-between border-b-4 border-black">
                    <h2 className="text-2xl font-brutal uppercase text-gray-900 flex items-center space-x-2">
                        <span>🧍</span>
                        <span>NPC Position Editor - {mapName}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white font-bold text-xl brutal-press"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Left Panel - Tools */}
                    <div className="w-64 bg-gray-800 p-4 overflow-y-auto border-r-2 border-amber-600">
                        <h3 className="text-lg font-bold text-amber-400 mb-4">
                            🛠️ How to use
                        </h3>
                        <div className="text-sm text-gray-300 space-y-2 mb-6">
                            <p>1. Click an NPC marker to select it.</p>
                            <p>2. Drag it anywhere on the map.</p>
                            <p>
                                3. Press{" "}
                                <span className="font-bold text-blue-400">
                                    Save to Browser
                                </span>{" "}
                                so the game reads the new spot.
                            </p>
                            <p className="text-xs text-gray-400 pt-1">
                                A dashed ring marks where an NPC was by default.
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

                        {/* Save/Load */}
                        <div className="space-y-2">
                            <button
                                onClick={downloadJson}
                                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition-all"
                            >
                                💾 Download JSON
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
                                    Drag an NPC to move it.{" "}
                                    <span className="font-bold text-yellow-400">
                                        {overrideCount} moved
                                    </span>
                                </p>
                                {activeMarker && (
                                    <p className="text-green-400">
                                        {activeMarker.npc}: (
                                        {activeMarker.percentX.toFixed(1)}%,{" "}
                                        {activeMarker.percentY.toFixed(1)}%)
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - NPC List */}
                    <div className="w-64 bg-gray-800 p-4 overflow-y-auto border-l-2 border-amber-600">
                        <h3 className="text-lg font-bold text-amber-400 mb-4">
                            🧍 NPCs ({markers.length})
                        </h3>

                        {markers.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-8">
                                No NPCs found for this map.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {markers.map((marker) => (
                                    <div
                                        key={marker.missionId}
                                        onClick={() =>
                                            selectMarker(marker.missionId)
                                        }
                                        className={`p-3 rounded cursor-pointer transition-all ${
                                            marker.missionId ===
                                            selectedMissionId
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
                                        {marker.isOverridden && (
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
                                    Click and drag an NPC marker to move it,
                                    then Save to Browser.
                                </span>
                            </p>
                        </div>
                        <div className="text-amber-400">
                            Moved: {overrideCount} / {markers.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NpcEditor;