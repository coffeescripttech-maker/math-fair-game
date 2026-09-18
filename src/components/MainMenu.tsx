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
    "group flex w-full items-center gap-2 rounded-lg border-[3px] border-tutor-navy bg-tutor-cream px-2.5 py-2 min-h-[44px] shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]";

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
        <div className="absolute inset-0 bg-tutor-cream">
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

            {/* Main content - viewport constrained */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-3">
                <div className="w-full max-w-sm">
                    {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                    <section className="animate-slide-up rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-1 shadow-[4px_4px_0_0_#071B3A]">
                        <div className="max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain custom-scrollbar space-y-2 rounded-lg border-2 border-tutor-yellow px-3 py-3">
                            {/* Header with Title */}
                            <div className="text-center">
                                <h1 className="font-brutal text-2xl uppercase leading-tight tracking-wide text-tutor-navy">
                                    Tutor Town
                                </h1>
                                <div className="mt-1 flex items-center justify-center gap-1.5">
                                    <div className="h-1 w-6 rounded-full bg-tutor-orange" />
                                    <Star
                                        className="h-3 w-3 text-tutor-yellow"
                                        fill={YELLOW}
                                    />
                                    <div className="h-1 w-6 rounded-full bg-tutor-orange" />
                                </div>
                                <p className="mt-1.5 inline-flex items-center gap-1 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-2.5 py-0.5 font-playful text-[10px] font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A]">
                                    <GraduationCap className="h-3 w-3" />
                                    Math Adventure Awaits!
                                </p>
                            </div>

                            {/* Menu Buttons */}
                            <div className="space-y-2">
                                {/* New Game - primary CTA */}
                                <button
                                    onClick={onStartGame}
                                    className="group flex w-full items-center justify-center gap-2 rounded-lg border-[3px] border-tutor-navy bg-tutor-orange py-2.5 min-h-[44px] font-brutal text-base uppercase tracking-wider text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                >
                                    <Newspaper className="h-4 w-4" />
                                    New Game
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-purple text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.4)]">
                                        <Settings className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="flex-1 text-left font-brutal text-sm uppercase tracking-wide text-tutor-navy">
                                        Settings
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-tutor-navy/40 transition-transform group-hover:translate-x-0.5" />
                                </button>

                                {/* Leaderboard */}
                                <button
                                    onClick={() => onShowLeaderboard?.()}
                                    className={secondaryButtonClasses}
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-blue text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.4)]">
                                        <BarChart3 className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="flex-1 text-left font-brutal text-sm uppercase tracking-wide text-tutor-navy">
                                        Leaderboard
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-tutor-navy/40 transition-transform group-hover:translate-x-0.5" />
                                </button>

                                {/* How to Play / Tutorial */}
                                <button
                                    onClick={() => onShowTutorial?.()}
                                    className={secondaryButtonClasses}
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-green text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.4)]">
                                        <BookOpen className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="flex-1 text-left font-brutal text-sm uppercase tracking-wide text-tutor-navy">
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
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.4)]">
                                        <LogOut className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="flex-1 text-left font-brutal text-sm uppercase tracking-wide text-tutor-navy">
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

