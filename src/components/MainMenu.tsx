import React, { useState } from "react";
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    ChevronRight,
    GraduationCap,
    LogOut,
    Newspaper,
    Settings,
    Star,
} from "lucide-react";
import { GameValidation } from "../utils/GameValidation";

interface MainMenuProps {
    onStartGame: () => void;
    onLoadGame?: () => void;
    onShowSettings?: () => void;
    onShowExtras?: () => void;
    onShowCredits?: () => void;
    onShowLeaderboard?: () => void;
    onShowTutorial?: () => void;
    onExit?: () => void;
}

const YELLOW = "#FFD84D";

/** Shared secondary button: cream game-card with a colored icon tile. */
const secondaryButtonClasses =
    "group flex w-full items-center gap-3 rounded-xl border-[3px] border-tutor-navy bg-tutor-cream px-3 py-3 shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A]";

export const MainMenu: React.FC<MainMenuProps> = ({
    onStartGame,
    onLoadGame,
    onShowSettings,
    onShowExtras,
    onShowCredits,
    onShowLeaderboard,
    onShowTutorial,
    onExit,
}) => {
    const [showSubMenu, setShowSubMenu] = useState<string | null>(null);

    const handleLoadGame = () => {
        // Check if there's saved progress
        const savedProgress = GameValidation.loadProgress();
        if (savedProgress) {
            onLoadGame?.();
        } else {
            alert("No saved game found! Start a new game first.");
        }
    };

    const handleExit = () => {
        if (window.confirm("Are you sure you want to exit Tutor Town?")) {
            onExit?.();
            // For web, we can close the tab/window or redirect
            window.close();
        }
    };

    return (
        <div className="absolute inset-0 overflow-y-auto bg-tutor-cream">
            {/* Kept: background image, slightly dimmed */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('/assets/images/menu-background.png')",
                }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

            {/* Main content */}
            <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-4 py-6 sm:py-8">
                <div className="w-full max-w-md sm:max-w-lg">
                    {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                    <section className="animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                        <div className="space-y-5 rounded-[14px] border-2 border-tutor-yellow px-5 py-6 sm:px-8">
                            {/* Header with Title */}
                            <div className="text-center">
                                <h1 className="font-brutal text-3xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-4xl">
                                    Tutor Town
                                </h1>
                                <div className="mt-1.5 flex items-center justify-center gap-2">
                                    <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                    <Star className="h-4 w-4 text-tutor-yellow" fill={YELLOW} />
                                    <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                </div>
                                <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-3 py-1 font-playful text-xs font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-sm">
                                    <GraduationCap className="h-4 w-4" />
                                    Math Adventure Awaits!
                                </p>
                            </div>

                            {/* Menu Buttons */}
                            <div className="space-y-3">
                                {/* New Game - primary CTA */}
                                <button
                                    onClick={onStartGame}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-orange py-4 font-brutal text-base uppercase tracking-wider text-tutor-cream shadow-[5px_5px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[7px_7px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A] sm:text-lg"
                                >
                                    <Newspaper className="h-5 w-5" />
                                    New Game
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>

                                {/* Continue Button */}
                                {/* <button
                                    onClick={handleLoadGame}
                                    className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                                >
                                    💾 Continue
                                </button> */}

                                {/* Settings */}
                                <button
                                    onClick={() => onShowSettings?.()}
                                    className={secondaryButtonClasses}
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-purple text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.4)]">
                                        <Settings className="h-4 w-4" />
                                    </span>
                                    <span className="flex-1 text-left font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                        Settings
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-tutor-navy/40 transition-transform group-hover:translate-x-0.5" />
                                </button>

                                {/* Leaderboard */}
                                <button
                                    onClick={() => onShowLeaderboard?.()}
                                    className={secondaryButtonClasses}
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-blue text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.4)]">
                                        <BarChart3 className="h-4 w-4" />
                                    </span>
                                    <span className="flex-1 text-left font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                        Leaderboard
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-tutor-navy/40 transition-transform group-hover:translate-x-0.5" />
                                </button>

                                {/* How to Play / Tutorial */}
                                <button
                                    onClick={() => onShowTutorial?.()}
                                    className={secondaryButtonClasses}
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-green text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.4)]">
                                        <BookOpen className="h-4 w-4" />
                                    </span>
                                    <span className="flex-1 text-left font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                        How to Play
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-tutor-navy/40 transition-transform group-hover:translate-x-0.5" />
                                </button>

                                {/* Extras */}
                                {/* <button
                                    onClick={() => onShowExtras?.()}
                                    className="w-full bg-green-500 text-white py-3 rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                                >
                                    🎨 Extras
                                </button> */}

                                {/* Credits */}
                                {/* <button
                                    onClick={() => onShowCredits?.()}
                                    className="w-full bg-purple-500 text-white py-3 rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                                >
                                    👥 Credits
                                </button> */}

                                {/* Exit */}
                                <button
                                    onClick={handleExit}
                                    className={secondaryButtonClasses}
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.4)]">
                                        <LogOut className="h-4 w-4" />
                                    </span>
                                    <span className="flex-1 text-left font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                        Exit
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-tutor-navy/40 transition-transform group-hover:translate-x-0.5" />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};