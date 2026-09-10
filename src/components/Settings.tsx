import React, { useState, useEffect } from "react";
import {
    Settings as SettingsIcon,
    Volume2,
    Monitor,
    Palette,
    Gamepad2,
    X,
    Lightbulb,
    RotateCcw,
    Check,
} from "lucide-react";

interface SettingsProps {
    onClose: () => void;
    isVisible: boolean;
}

interface GameSettings {
    masterVolume: number;
    musicVolume: number;
    effectsVolume: number;
    enableMusic: boolean;
    enableEffects: boolean;
    fullscreen: boolean;
    language: string;
    difficulty: string;
    showTutorials: boolean;
}

const defaultSettings: GameSettings = {
    masterVolume: 0.7,
    musicVolume: 0.8,
    effectsVolume: 0.9,
    enableMusic: true,
    enableEffects: true,
    fullscreen: false,
    language: "en",
    difficulty: "normal",
    showTutorials: true,
};

export const Settings: React.FC<SettingsProps> = ({ onClose, isVisible }) => {
    const [settings, setSettings] = useState<GameSettings>(defaultSettings);
    const [activeTab, setActiveTab] = useState<
        "audio" | "graphics" | "gameplay"
    >("audio");

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem("civika-settings");
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings({ ...defaultSettings, ...parsed });
            } catch (error) {
                console.error("Failed to load settings:", error);
            }
        }

        // Listen for fullscreen changes to keep settings in sync
        const handleFullscreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            setSettings((prev) => ({ ...prev, fullscreen: isFullscreen }));
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener(
            "mozfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "webkitfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "mozfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "MSFullscreenChange",
                handleFullscreenChange
            );
        };
    }, []);

    // Save settings to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem("civika-settings", JSON.stringify(settings));

        // Apply settings immediately
        applySettings(settings);
    }, [settings]);

    const applySettings = (newSettings: GameSettings) => {
        // Apply audio settings
        if (window.gameAudioManager) {
            window.gameAudioManager.setMasterVolume(newSettings.masterVolume);
            window.gameAudioManager.setMusicVolume(newSettings.musicVolume);
            window.gameAudioManager.setEffectsVolume(newSettings.effectsVolume);
            window.gameAudioManager.setMusicEnabled(newSettings.enableMusic);
            window.gameAudioManager.setEffectsEnabled(
                newSettings.enableEffects
            );
        }

        // Apply graphics settings with proper fullscreen checks
        if (newSettings.fullscreen && !document.fullscreenElement) {
            // Enter fullscreen only if not already in fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch((error) => {
                    console.warn("Failed to enter fullscreen:", error);
                });
            }
        } else if (!newSettings.fullscreen && document.fullscreenElement) {
            // Exit fullscreen only if currently in fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen().catch((error) => {
                    console.warn("Failed to exit fullscreen:", error);
                });
            }
        }

        // Emit settings change event for other components
        window.dispatchEvent(
            new CustomEvent("civika-settings-changed", {
                detail: newSettings,
            })
        );
    };

    const updateSetting = <K extends keyof GameSettings>(
        key: K,
        value: GameSettings[K]
    ) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const resetToDefaults = () => {
        if (window.confirm("Reset all settings to default values?")) {
            setSettings(defaultSettings);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center pointer-events-auto z-50 p-4">
            <div className="brutal-panel max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white brutal-press z-20"
                    >
                                                <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6">
                                                <h2 className="text-2xl font-brutal uppercase text-gray-900 flex items-center justify-center gap-2">
                            <SettingsIcon />
                            Settings
                        </h2>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-6 space-x-2">
                        {(
                            [
                                {
                                    id: "audio",
                                    label: "Audio",
                                    icon: (
                                        <Volume2 className="w-4 h-4" />
                                    ),
                                },
                                {
                                    id: "graphics",
                                    label: "Graphics",
                                    icon: (
                                        <Monitor className="w-4 h-4" />
                                    ),
                                },
                                {
                                    id: "gameplay",
                                    label: "Gameplay",
                                    icon: (
                                        <Gamepad2 className="w-4 h-4" />
                                    ),
                                },
                            ] as const
                        ).map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() =>
                                    setActiveTab(
                                        tab.id as "audio" | "graphics" | "gameplay"
                                    )
                                }
                                className={`px-4 py-2 rounded-none border-2 border-black transition-all duration-150 font-bold uppercase text-sm ${
                                    activeTab === tab.id
                                        ? "bg-black text-white shadow-brutal-xs"
                                        : "bg-white text-gray-700 hover:bg-brutal-bg"
                                }`}
                            >
                                {tab.icon}
                                <span className="hidden sm:inline">
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Settings Content */}
                    <div className="space-y-4">
                        {/* Audio Settings */}
                        {activeTab === "audio" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-brutal uppercase text-gray-900 border-b-[3px] border-black pb-2">
                                    <Volume2 className="inline-block w-5 h-5 mr-2" />
                                    Audio Settings
                                </h3>

                                {/* Master Volume */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-medium">
                                        Master Volume:
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={settings.masterVolume}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "masterVolume",
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                            className="w-32"
                                        />
                                                <span className="w-12 text-gray-900 font-brutal">
                                            {Math.round(
                                                settings.masterVolume * 100
                                            )}
                                            %
                                        </span>
                                    </div>
                                </div>

                                {/* Music Volume */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-semibold">
                                        Music Volume:
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={settings.musicVolume}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "musicVolume",
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                            className="w-32"
                                            disabled={!settings.enableMusic}
                                        />
                                        <span className="w-12 text-gray-900 font-brutal">
                                            {Math.round(
                                                settings.musicVolume * 100
                                            )}
                                            %
                                        </span>
                                    </div>
                                </div>

                                {/* Effects Volume */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-semibold">
                                        Sound Effects:
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={settings.effectsVolume}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "effectsVolume",
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                            className="w-32"
                                            disabled={!settings.enableEffects}
                                        />
                                        <span className="w-12 text-gray-900 font-brutal">
                                            {Math.round(
                                                settings.effectsVolume * 100
                                            )}
                                            %
                                        </span>
                                    </div>
                                </div>

                                {/* Enable Music */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-semibold">
                                        Enable Music:
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.enableMusic}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "enableMusic",
                                                    e.target.checked
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="text-gray-700">
                                            {settings.enableMusic
                                                ? "On"
                                                : "Off"}
                                        </span>
                                    </label>
                                </div>

                                {/* Enable Effects */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-semibold">
                                        Enable Sound Effects:
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.enableEffects}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "enableEffects",
                                                    e.target.checked
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="text-gray-700">
                                            {settings.enableEffects
                                                ? "On"
                                                : "Off"}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Graphics Settings */}
                        {activeTab === "graphics" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-brutal uppercase text-gray-900 border-b-[3px] border-black pb-2">
                                    <Palette className="inline-block w-5 h-5 mr-2" />
                                    Graphics Settings
                                </h3>

                                {/* Fullscreen */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-semibold">
                                        Fullscreen Mode:
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.fullscreen}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "fullscreen",
                                                    e.target.checked
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="text-gray-700">
                                            {settings.fullscreen ? "On" : "Off"}
                                        </span>
                                    </label>
                                </div>

                                <div className="text-gray-800 text-sm bg-brutal-blue p-3 rounded-none border-2 border-black shadow-brutal-xs">
                                    <Lightbulb className="inline-block w-5 h-5 mr-2" />
                                    <strong>Tip:</strong> Graphics settings
                                    are optimized for best performance across
                                    all devices.
                                </div>
                            </div>
                        )}

                        {/* Gameplay Settings */}
                        {activeTab === "gameplay" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-brutal uppercase text-gray-900 border-b-[3px] border-black pb-2">
                                    <SettingsIcon className="inline-block w-5 h-5 mr-2" />
                                    Gameplay Settings
                                </h3>

                                {/* Language */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-semibold">
                                        Language:
                                    </label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) =>
                                            updateSetting(
                                                "language",
                                                e.target.value
                                            )
                                        }
                                        className="px-3 py-1 rounded-none border-2 border-black bg-white text-gray-800 font-bold"
                                    >
                                        <option value="en">🇺🇸 English</option>
                                        <option value="fil">🇵🇭 Filipino</option>
                                        <option value="ceb">🇵🇭 Cebuano</option>
                                        <option value="ilo">🇵🇭 Ilocano</option>
                                    </select>
                                </div>

                                {/* Difficulty */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-semibold">
                                        Difficulty:
                                    </label>
                                    <select
                                        value={settings.difficulty}
                                        onChange={(e) =>
                                            updateSetting(
                                                "difficulty",
                                                e.target.value
                                            )
                                        }
                                        className="px-3 py-1 rounded-none border-2 border-black bg-white text-gray-800 font-bold"
                                    >
                                        <option value="easy">😊 Easy</option>
                                        <option value="normal">
                                            😐 Normal
                                        </option>
                                        <option value="hard">😤 Hard</option>
                                        <option value="expert">
                                            🤯 Expert
                                        </option>
                                    </select>
                                </div>

                                {/* Show Tutorials */}
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-700 font-semibold">
                                        Show Tutorials:
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.showTutorials}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "showTutorials",
                                                    e.target.checked
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="text-gray-700">
                                            {settings.showTutorials
                                                ? "On"
                                                : "Off"}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-8 space-x-4">
                        <button
                            onClick={resetToDefaults}
                            className="bg-brutal-orange border-[3px] border-black text-white px-6 py-3 rounded-none font-bold uppercase shadow-brutal brutal-press flex items-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Reset to Defaults
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-brutal-green border-[3px] border-black text-black px-6 py-3 rounded-none font-bold uppercase shadow-brutal brutal-press flex items-center gap-2"
                        >
                            <Check className="w-5 h-5" />
                            Apply & Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Global audio manager type declaration
declare global {
    interface Window {
        gameAudioManager?: {
            setMasterVolume: (volume: number) => void;
            setMusicVolume: (volume: number) => void;
            setEffectsVolume: (volume: number) => void;
            setMusicEnabled: (enabled: boolean) => void;
            setEffectsEnabled: (enabled: boolean) => void;
        };
    }
}

