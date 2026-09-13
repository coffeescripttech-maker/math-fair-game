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
    Star,
} from "lucide-react";
import { audioManager } from "../utils/AudioManager";

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

const YELLOW = "#FFD84D";

type TabId = "audio" | "graphics" | "gameplay";

const TABS: ReadonlyArray<{
    id: TabId;
    label: string;
    accent: string;
}> = [
    { id: "audio", label: "Audio", accent: "bg-tutor-orange" },
    { id: "graphics", label: "Graphics", accent: "bg-tutor-blue" },
    { id: "gameplay", label: "Gameplay", accent: "bg-tutor-green" },
];

/** Section heading: orange icon tile + navy label + yellow flex rule. */
const SectionHeading: React.FC<{
    icon: React.ReactNode;
    children: React.ReactNode;
}> = ({ icon, children }) => (
    <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-orange text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
            {icon}
        </span>
        <h3 className="font-brutal text-base uppercase tracking-wide text-tutor-navy sm:text-lg">
            {children}
        </h3>
        <div className="h-1 flex-1 rounded-full bg-tutor-yellow" />
    </div>
);

/** Cream game-card holding one setting label + its control. */
const SettingRow: React.FC<{
    label: string;
    hint?: string;
    children: React.ReactNode;
}> = ({ label, hint, children }) => (
    <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-tutor-navy bg-tutor-cream px-4 py-3 shadow-[3px_3px_0_0_#071B3A]">
        <div className="min-w-0">
            <p className="font-playful text-sm font-bold text-tutor-navy sm:text-base">
                {label}
            </p>
            {hint && (
                <p className="font-playful text-xs text-tutor-navy/60">
                    {hint}
                </p>
            )}
        </div>
        {children}
    </div>
);

/** Game-style volume slider with a percentage chip. */
const VolumeControl: React.FC<{
    value: number;
    onChange: (v: number) => void;
    disabled?: boolean;
}> = ({ value, onChange, disabled }) => (
    <div className="flex items-center gap-2">
        <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="h-2 w-28 cursor-pointer accent-tutor-orange disabled:cursor-not-allowed disabled:opacity-40 sm:w-36"
        />
        <span className="w-12 rounded-md border-2 border-tutor-navy bg-tutor-yellow px-1 py-0.5 text-center font-brutal text-sm text-tutor-navy">
            {Math.round(value * 100)}%
        </span>
    </div>
);

/** Game-style toggle: real checkbox + an ON/OFF chip. */
const ToggleControl: React.FC<{
    checked: boolean;
    onChange: (v: boolean) => void;
}> = ({ checked, onChange }) => (
    <label className="flex shrink-0 cursor-pointer select-none items-center gap-2">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-5 w-5 cursor-pointer rounded accent-tutor-orange"
        />
        <span
            className={`rounded-md border-2 border-tutor-navy px-2 py-0.5 font-brutal text-xs uppercase transition-colors ${
                checked
                    ? "bg-tutor-green text-tutor-cream"
                    : "bg-[#E5DCC9] text-tutor-navy/60"
            }`}
        >
            {checked ? "On" : "Off"}
        </span>
    </label>
);

export const Settings: React.FC<SettingsProps> = ({ onClose, isVisible }) => {
    const [settings, setSettings] = useState<GameSettings>(defaultSettings);
    const [activeTab, setActiveTab] = useState<TabId>("audio");

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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                <section className="relative w-full max-w-2xl animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                    <div className="relative space-y-5 rounded-[14px] border-2 border-tutor-yellow px-5 py-6 sm:px-7">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            type="button"
                            aria-label="Close settings"
                            className="absolute right-2.5 top-2.5 z-20 flex h-10 w-10 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Header */}
                        <div className="text-center">
                            <h2 className="font-brutal text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                                Settings
                            </h2>
                            <div className="mt-1.5 flex items-center justify-center gap-2">
                                <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                <Star
                                    className="h-4 w-4 text-tutor-yellow"
                                    fill={YELLOW}
                                />
                                <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                            </div>
                            <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-3 py-1 font-playful text-xs font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-sm">
                                <SettingsIcon className="h-4 w-4" />
                                Tweak your adventure
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {TABS.map((tab) => {
                                const active = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => {
                                            audioManager.playEffect(
                                                "button-click"
                                            );
                                            setActiveTab(tab.id);
                                        }}
                                        className={`flex items-center gap-2 rounded-xl border-[3px] px-3 py-2 font-brutal text-xs uppercase tracking-wide transition-all duration-150 sm:px-4 sm:text-sm ${
                                            active
                                                ? "-translate-y-0.5 border-tutor-navy bg-tutor-navy text-tutor-cream shadow-[0_0_0_3px_#FFD84D,5px_5px_0_0_#071B3A]"
                                                : "border-tutor-navy bg-tutor-cream text-tutor-navy opacity-80 shadow-[3px_3px_0_0_#071B3A] hover:-translate-y-0.5 hover:opacity-100 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                        }`}
                                    >
                                        <span
                                            className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${
                                                active
                                                    ? "border-tutor-navy bg-tutor-yellow text-tutor-navy"
                                                    : `border-tutor-navy text-tutor-cream ${tab.accent}`
                                            }`}
                                        >
                                            {tab.id === "audio" ? (
                                                <Volume2 className="h-3.5 w-3.5" />
                                            ) : tab.id === "graphics" ? (
                                                <Monitor className="h-3.5 w-3.5" />
                                            ) : (
                                                <Gamepad2 className="h-3.5 w-3.5" />
                                            )}
                                        </span>
                                        <span className="hidden sm:inline">
                                            {tab.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Settings Content */}
                        <div className="space-y-4">
                            {/* Audio Settings */}
                            {activeTab === "audio" && (
                                <div className="space-y-3">
                                    <SectionHeading
                                        icon={<Volume2 className="h-4 w-4" />}
                                    >
                                        Audio Settings
                                    </SectionHeading>

                                    <SettingRow
                                        label="Master Volume"
                                        hint="Overall game loudness"
                                    >
                                        <VolumeControl
                                            value={settings.masterVolume}
                                            onChange={(v) =>
                                                updateSetting(
                                                    "masterVolume",
                                                    v
                                                )
                                            }
                                        />
                                    </SettingRow>

                                    <SettingRow
                                        label="Music Volume"
                                        hint="Background music level"
                                    >
                                        <VolumeControl
                                            value={settings.musicVolume}
                                            disabled={!settings.enableMusic}
                                            onChange={(v) =>
                                                updateSetting(
                                                    "musicVolume",
                                                    v
                                                )
                                            }
                                        />
                                    </SettingRow>

                                    <SettingRow
                                        label="Sound Effects"
                                        hint="Effects & interface sounds"
                                    >
                                        <VolumeControl
                                            value={settings.effectsVolume}
                                            disabled={!settings.enableEffects}
                                            onChange={(v) =>
                                                updateSetting(
                                                    "effectsVolume",
                                                    v
                                                )
                                            }
                                        />
                                    </SettingRow>

                                    <SettingRow label="Enable Music">
                                        <ToggleControl
                                            checked={settings.enableMusic}
                                            onChange={(v) =>
                                                updateSetting(
                                                    "enableMusic",
                                                    v
                                                )
                                            }
                                        />
                                    </SettingRow>

                                    <SettingRow label="Enable Sound Effects">
                                        <ToggleControl
                                            checked={settings.enableEffects}
                                            onChange={(v) =>
                                                updateSetting(
                                                    "enableEffects",
                                                    v
                                                )
                                            }
                                        />
                                    </SettingRow>
                                </div>
                            )}

                            {/* Graphics Settings */}
                            {activeTab === "graphics" && (
                                <div className="space-y-3">
                                    <SectionHeading
                                        icon={<Palette className="h-4 w-4" />}
                                    >
                                        Graphics Settings
                                    </SectionHeading>

                                    <SettingRow
                                        label="Fullscreen Mode"
                                        hint="Expand the game to fill your screen"
                                    >
                                        <ToggleControl
                                            checked={settings.fullscreen}
                                            onChange={(v) =>
                                                updateSetting(
                                                    "fullscreen",
                                                    v
                                                )
                                            }
                                        />
                                    </SettingRow>

                                    <div className="flex items-start gap-3 rounded-xl border-2 border-tutor-navy bg-tutor-yellow px-4 py-3 font-playful text-sm font-semibold text-tutor-navy shadow-[3px_3px_0_0_#071B3A]">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-cream text-tutor-orange">
                                            <Lightbulb className="h-4 w-4" />
                                        </span>
                                        <p>
                                            <strong className="font-brutal uppercase">
                                                Tip:
                                            </strong>{" "}
                                            Graphics settings are optimized for
                                            best performance across all devices.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Gameplay Settings */}
                            {activeTab === "gameplay" && (
                                <div className="space-y-3">
                                    <SectionHeading
                                        icon={<Gamepad2 className="h-4 w-4" />}
                                    >
                                        Gameplay Settings
                                    </SectionHeading>

                                    <SettingRow
                                        label="Language"
                                        hint="Choose your language"
                                    >
                                        <select
                                            value={settings.language}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "language",
                                                    e.target.value
                                                )
                                            }
                                            className="cursor-pointer rounded-lg border-[3px] border-tutor-navy bg-tutor-cream px-3 py-2 font-playful text-sm font-bold text-tutor-navy shadow-[2px_2px_0_0_#071B3A] transition-colors focus:border-tutor-orange focus:outline-none"
                                        >
                                            <option value="en">
                                                🇺🇸 English
                                            </option>
                                            <option value="fil">
                                                🇵🇭 Filipino
                                            </option>
                                            <option value="ceb">
                                                🇵🇭 Cebuano
                                            </option>
                                            <option value="ilo">
                                                🇵🇭 Ilocano
                                            </option>
                                        </select>
                                    </SettingRow>

                                    <SettingRow
                                        label="Difficulty"
                                        hint="Challenge level for math quizzes"
                                    >
                                        <select
                                            value={settings.difficulty}
                                            onChange={(e) =>
                                                updateSetting(
                                                    "difficulty",
                                                    e.target.value
                                                )
                                            }
                                            className="cursor-pointer rounded-lg border-[3px] border-tutor-navy bg-tutor-cream px-3 py-2 font-playful text-sm font-bold text-tutor-navy shadow-[2px_2px_0_0_#071B3A] transition-colors focus:border-tutor-orange focus:outline-none"
                                        >
                                            <option value="easy">
                                                😊 Easy
                                            </option>
                                            <option value="normal">
                                                😐 Normal
                                            </option>
                                            <option value="hard">
                                                😤 Hard
                                            </option>
                                            <option value="expert">
                                                🤯 Expert
                                            </option>
                                        </select>
                                    </SettingRow>

                                    <SettingRow
                                        label="Show Tutorials"
                                        hint="Show helpful hints as you play"
                                    >
                                        <ToggleControl
                                            checked={settings.showTutorials}
                                            onChange={(v) =>
                                                updateSetting(
                                                    "showTutorials",
                                                    v
                                                )
                                            }
                                        />
                                    </SettingRow>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-between">
                            <button
                                onClick={resetToDefaults}
                                type="button"
                                className="group flex items-center justify-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-cream px-5 py-3.5 font-brutal text-sm uppercase tracking-wide text-tutor-navy shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A]"
                            >
                                <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-red text-tutor-cream">
                                    <RotateCcw className="h-3.5 w-3.5" />
                                </span>
                                Reset to Defaults
                            </button>
                            <button
                                onClick={onClose}
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-6 py-3.5 font-brutal text-sm uppercase tracking-wider text-tutor-cream shadow-[5px_5px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[7px_7px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A]"
                            >
                                <Check className="h-5 w-5" />
                                Apply & Close
                            </button>
                        </div>
                    </div>
                </section>
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