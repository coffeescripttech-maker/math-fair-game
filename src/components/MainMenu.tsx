import React, { useState } from "react";
import { Newspaper, Settings, BarChart3, BookOpen, LogOut } from "lucide-react";

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
        const savedProgress = localStorage.getItem("civika-game-progress");
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
        <div className="absolute inset-0 bg-brutal-bg flex items-center justify-center p-4">
            {/* Main content - Clean and simple */}
            <div className="w-full max-w-md mx-auto">
                {/* Neobrutalist Card Container */}
                <div className="brutal-panel p-8 space-y-6">
                    {/* Header with Logo */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-brutal-yellow border-4 border-black shadow-brutal rounded-none flex items-center justify-center">
                                <img
                                    src="/logo.png"
                                    alt="Tutor Town"
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                        </div>
                        <h1 className="text-3xl font-brutal uppercase tracking-wide text-gray-900">
                            Tutor Town
                        </h1>
                    </div>

                    {/* Menu Buttons - Neobrutalist tactile buttons */}
                    <div className="space-y-3">
                        {/* New Game Button */}
                        <button
                            onClick={onStartGame}
                            className="w-full bg-brutal-orange border-[3px] border-black text-white py-4 rounded-none font-brutal uppercase text-lg shadow-brutal brutal-press flex items-center justify-center gap-2"
                        >
                            <Newspaper className="w-6 h-6" /> New Game
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
                            className="w-full bg-brutal-pink border-[3px] border-black text-black py-3 rounded-none font-bold uppercase shadow-brutal brutal-press flex items-center justify-center gap-2"
                        >
                            <Settings className="w-6 h-6" /> Settings
                        </button>

                        {/* Leaderboard */}
                        <button
                            onClick={() => onShowLeaderboard?.()}
                            className="w-full bg-brutal-yellow border-[3px] border-black text-black py-3 rounded-none font-bold uppercase shadow-brutal brutal-press flex items-center justify-center gap-2"
                        >
                            <BarChart3 className="w-6 h-6" /> Leaderboard
                        </button>

                        {/* How to Play / Tutorial */}
                        <button
                            onClick={() => onShowTutorial?.()}
                            className="w-full bg-brutal-green border-[3px] border-black text-black py-3 rounded-none font-bold uppercase shadow-brutal brutal-press flex items-center justify-center gap-2"
                        >
                            <BookOpen className="w-6 h-6" /> How to Play
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
                            className="w-full bg-brutal-red border-[3px] border-black text-white py-3 rounded-none font-bold uppercase shadow-brutal brutal-press flex items-center justify-center gap-2"
                        >
                            <LogOut className="w-6 h-6" /> Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
