import React, { useEffect, useState } from "react";

interface AchievementCelebrationProps {
    badge: string;
    coins: number;
    points: number;
    timeBonus?: number;
    show: boolean;
    onComplete: () => void;
}

export const AchievementCelebration: React.FC<AchievementCelebrationProps> = ({
    badge,
    coins,
    points,
    timeBonus = 0,
    show,
    onComplete,
}) => {
    const [confettiPieces] = useState(() =>
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            color: [
                "bg-math-blue",
                "bg-math-purple",
                "bg-math-orange",
                "bg-math-green",
                "bg-level1-secondary",
                "bg-level2-secondary",
            ][Math.floor(Math.random() * 6)],
        })),
    );

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onComplete();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/40"
            onClick={onComplete}
        >
            {/* Confetti layer (purely decorative, non-interactive) */}
            <div
                className="pointer-events-none fixed inset-0 overflow-hidden"
                aria-hidden="true"
            >
                {confettiPieces.map((piece) => (
                    <div
                        key={piece.id}
                        className={`absolute w-2 h-2 rounded-none ${piece.color} animate-confetti`}
                        style={{
                            left: `${piece.left}%`,
                            top: "-20px",
                            animationDelay: `${piece.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Achievement Card */}
            <div className="pointer-events-auto flex min-h-full items-center justify-center p-2 sm:p-4">
                <div className="my-auto w-full max-w-sm sm:max-w-md animate-slide-down">
                    <div className="bg-brutal-orange rounded-none p-1 sm:p-1.5 shadow-brutal-xl border-4 border-black">
                        <div className="max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain bg-brutal-bg rounded-none p-3 sm:p-5 md:p-6">
                        {/* Badge Icon with Celebration */}
                        <div className="text-center mb-3 sm:mb-4 animate-celebrate">
                            <div className="text-3xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">
                                🏆
                            </div>
                            <div className="text-xl sm:text-2xl md:text-3xl font-brutal uppercase text-gray-900">
                                Achievement Unlocked!
                            </div>
                        </div>

                        {/* Badge Name */}
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="inline-flex items-center space-x-2 bg-brutal-yellow border-[3px] border-black rounded-none px-4 sm:px-6 py-2 sm:py-3 shadow-brutal-sm">
                                <span className="text-lg sm:text-xl md:text-2xl">
                                    ✨
                                </span>
                                <span className="text-base sm:text-lg md:text-xl font-brutal text-gray-900">
                                    {badge}
                                </span>
                                <span className="text-lg sm:text-xl md:text-2xl">
                                    ✨
                                </span>
                            </div>
                        </div>

                        {/* Rewards */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="bg-brutal-yellow rounded-none p-3 sm:p-4 text-center border-2 border-black shadow-brutal-xs">
                                <div className="text-2xl sm:text-3xl mb-1">
                                    💰
                                </div>
                                <div className="text-xl sm:text-2xl font-brutal text-gray-900">
                                    +{coins}
                                </div>
                                <div className="text-[11px] sm:text-sm text-gray-700 font-bold uppercase">
                                    Coins
                                </div>
                            </div>
                            <div className="bg-brutal-blue rounded-none p-3 sm:p-4 text-center border-2 border-black shadow-brutal-xs">
                                <div className="text-2xl sm:text-3xl mb-1">
                                    ⭐
                                </div>
                                <div className="text-xl sm:text-2xl font-brutal text-gray-900">
                                    +{points + timeBonus}
                                </div>
                                <div className="text-[11px] sm:text-sm text-gray-700 font-bold uppercase">
                                    Points
                                </div>
                            </div>
                        </div>

                        {/* Time Bonus Badge */}
                        {timeBonus > 0 && (
                            <div className="bg-brutal-green border-[3px] border-black rounded-none p-2 sm:p-3 text-center shadow-brutal-xs">
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="text-xl sm:text-2xl">
                                        ⚡
                                    </span>
                                    <span className="text-base sm:text-lg font-brutal text-gray-900">
                                        Speed Bonus: +{timeBonus} pts!
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Continue Message */}
                        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 animate-pulse-soft">
                            Tap anywhere to continue...
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

