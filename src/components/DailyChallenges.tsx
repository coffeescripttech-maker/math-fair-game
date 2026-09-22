/**
 * Daily Challenges Component for CIVIKA
 * Displays daily challenges and tracks progress
 */

import React, { useState, useEffect } from "react";
import ShopService from "../services/ShopService";
import { DailyChallenge } from "../types/shop";
import {
    X,
    CalendarDays,
    Target,
    Clock,
    Check,
    Coins,
    Sparkles,
    Star,
} from "lucide-react";

interface DailyChallengesProps {
    onClose: () => void;
    isVisible: boolean;
}

const YELLOW = "#FFD84D";

export const DailyChallenges: React.FC<DailyChallengesProps> = ({
    onClose,
    isVisible,
}) => {
    const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
    const shopService = ShopService.getInstance();

    useEffect(() => {
        if (isVisible) {
            loadChallenges();
        }
    }, [isVisible]);

    const loadChallenges = () => {
        const dailyChallenges = shopService.getDailyChallenges();
        setChallenges(dailyChallenges);
    };

    const getTimeRemaining = (expiresAt: string): string => {
        const now = new Date();
        const expires = new Date(expiresAt);
        const diff = expires.getTime() - now.getTime();

        if (diff <= 0) return "Expired";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-1.5 sm:p-4">
                {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                <section className="relative w-full min-[420px]:max-w-2xl max-w-[calc(100vw-6px)] animate-slide-up rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-tutor-navy bg-tutor-cream p-1 sm:p-1.5 shadow-[6px_6px_0_0_#071B3A] sm:shadow-[8px_8px_0_0_#071B3A]">
                    <div className="flex max-h-[calc(100dvh-20px)] flex-col rounded-[10px] sm:rounded-[14px] border-2 border-tutor-yellow px-2.5 py-2.5 sm:px-4 sm:py-4">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            type="button"
                            aria-label="Close daily challenges"
                            className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                        >
                            <X className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        </button>

                        {/* Header */}
                        <div className="mb-2 sm:mb-4 text-center pr-6">
                            <h2 className="font-brutal text-base sm:text-xl md:text-2xl uppercase leading-tight tracking-wide text-tutor-navy">
                                Daily Challenges
                            </h2>
                            <div className="mt-1 flex items-center justify-center gap-1.5 sm:gap-2">
                                <div className="h-1 w-5 sm:w-8 rounded-full bg-tutor-orange" />
                                <Star
                                    className="h-3 w-3 sm:h-4 sm:w-4 text-tutor-yellow"
                                    fill={YELLOW}
                                />
                                <div className="h-1 w-5 sm:w-8 rounded-full bg-tutor-orange" />
                            </div>
                            <p className="mt-1.5 sm:mt-2.5 inline-flex items-center gap-1 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-2 py-0.5 sm:px-3 sm:py-1 font-playful text-[9px] font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-xs">
                                <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
                                Fresh quests, every day!
                            </p>
                        </div>

                        {/* Challenges List */}
                        <div className="min-h-0 flex-1 space-y-2 sm:space-y-4 overflow-y-auto overscroll-contain custom-scrollbar pb-0.5">
                            {challenges.map((challenge) => {
                                const progressPercent =
                                    (challenge.progress /
                                        challenge.requirement) *
                                    100;

                                return (
                                    <div
                                        key={challenge.id}
                                        className={`rounded-lg sm:rounded-xl border-[3px] border-tutor-navy p-2 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] ${
                                            challenge.completed
                                                ? "bg-tutor-green/15"
                                                : "bg-tutor-cream"
                                        }`}
                                    >
                                        {/* Challenge Header */}
                                        <div className="mb-1.5 sm:mb-2 flex items-start justify-between gap-2 sm:gap-3">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="flex items-center gap-1.5 sm:gap-2 font-brutal text-[10px] sm:text-sm uppercase tracking-wide text-tutor-navy">
                                                    <span
                                                        className={`flex h-5 w-5 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy shadow-[1px_1px_0_0_#071B3A] sm:shadow-[2px_2px_0_0_#071B3A] ${
                                                            challenge.completed
                                                                ? "bg-tutor-green text-tutor-cream"
                                                                : "bg-tutor-orange text-tutor-cream"
                                                        }`}
                                                    >
                                                        {challenge.completed ? (
                                                            <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        ) : (
                                                            <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        )}
                                                    </span>
                                                    {challenge.title}
                                                </h3>
                                                <p className="mt-0.5 sm:mt-1 font-playful text-[11px] sm:text-sm text-tutor-navy/70">
                                                    {challenge.description}
                                                </p>
                                            </div>
                                            <span
                                                className={`inline-flex shrink-0 items-center gap-0.5 rounded-md border-2 border-tutor-navy px-1.5 py-0.5 sm:px-2 font-playful text-[10px] font-bold ${
                                                    getTimeRemaining(
                                                        challenge.expiresAt,
                                                    ) === "Expired"
                                                        ? "bg-tutor-red text-tutor-cream"
                                                        : "bg-tutor-yellow text-tutor-navy"
                                                }`}
                                            >
                                                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                                {getTimeRemaining(
                                                    challenge.expiresAt,
                                                )}
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-2 sm:mb-3">
                                            <div className="mb-0.5 sm:mb-1 flex justify-between font-playful text-[10px] font-semibold text-tutor-navy/70 sm:text-xs">
                                                <span>
                                                    Progress:{" "}
                                                    {challenge.progress}/
                                                    {challenge.requirement}
                                                </span>
                                                <span>
                                                    {Math.round(
                                                        progressPercent,
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                            <div className="h-2 sm:h-3 w-full overflow-hidden rounded-full border-2 border-tutor-navy bg-tutor-cream">
                                                <div
                                                    className={`h-full transition-all duration-300 ${
                                                        challenge.completed
                                                            ? "bg-tutor-green"
                                                            : "bg-tutor-blue"
                                                    }`}
                                                    style={{
                                                        width: `${Math.min(
                                                            progressPercent,
                                                            100,
                                                        )}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Rewards */}
                                        <div className="flex items-center justify-between flex-wrap gap-1.5 sm:gap-2">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <span className="inline-flex items-center gap-0.5 rounded-md border-2 border-tutor-navy bg-tutor-green/10 px-1.5 py-0.5 sm:px-2 font-playful text-[10px] font-bold text-tutor-navy sm:text-xs">
                                                    <Coins className="h-3 w-3 text-tutor-green sm:h-3.5 sm:w-3.5" />
                                                    +{challenge.coinReward}
                                                </span>
                                                <span className="inline-flex items-center gap-0.5 rounded-md border-2 border-tutor-navy bg-tutor-yellow px-1.5 py-0.5 sm:px-2 font-playful text-[10px] font-bold text-tutor-navy sm:text-xs">
                                                    <Sparkles className="h-3 w-3 text-tutor-orange sm:h-3.5 sm:w-3.5" />
                                                    +{challenge.pointsReward}
                                                </span>
                                            </div>
                                            {challenge.completed && (
                                                <span className="inline-flex items-center gap-0.5 rounded-md border-2 border-tutor-navy bg-tutor-green px-1.5 py-0.5 sm:px-2 font-brutal text-[10px] uppercase tracking-wide text-tutor-cream sm:text-xs">
                                                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                    Done
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="mt-4 rounded-xl border-[3px] border-tutor-navy bg-tutor-yellow p-4 text-center shadow-[3px_3px_0_0_#071B3A]">
                            <p className="font-brutal text-sm uppercase tracking-wide text-tutor-navy">
                                🎯 Complete challenges to earn bonus rewards!
                            </p>
                            <p className="mt-1 font-playful text-xs text-tutor-navy/70">
                                Challenges reset every day at midnight
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

