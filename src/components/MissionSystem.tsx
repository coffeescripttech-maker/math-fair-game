import React from "react";
import { X, Star, ClipboardList } from "lucide-react";

interface Mission {
    id: string;
    title: string;
    description: string;
    quizOverview: string;
    realLifeTrivia: string[];
    npc: string;
    location: string;
    reward: string;
}

interface MissionSystemProps {
    mission: Mission;
    onStartQuiz: () => void;
    onClose: () => void;
}

const YELLOW = "#FFD84D";

export const MissionSystem: React.FC<MissionSystemProps> = ({
    mission,
    onStartQuiz,
    onClose,
}) => {
    // Provide default values if properties are missing
    const quizOverview =
        mission.quizOverview ||
        "Complete this quiz to test your algebra skills.";
    const realLifeTrivia = mission.realLifeTrivia || [
        "Math helps solve real-world problems",
        "Understanding algebra improves decision-making",
        "Problem-solving skills are valuable in everyday life",
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-1.5 sm:p-4">
                {/* MathTuto game window: navy outer frame, yellow inner frame */}
                <section className="relative w-full min-[420px]:max-w-2xl max-w-[calc(100vw-6px)] animate-slide-up rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-tutor-navy bg-tutor-cream p-1 sm:p-1.5 shadow-[6px_6px_0_0_#071B3A] sm:shadow-[8px_8px_0_0_#071B3A]">
                    <div className="max-h-[calc(100dvh-20px)] overflow-y-auto overscroll-contain custom-scrollbar rounded-[10px] sm:rounded-[14px] border-2 border-tutor-yellow px-2.5 py-3 sm:px-4 sm:py-4">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            type="button"
                            aria-label="Close mission details"
                            className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                        >
                            <X className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        </button>

                        {/* Header */}
                        <div className="mb-3 sm:mb-5 text-center pr-6">
                            <h2 className="font-brutal text-base sm:text-xl md:text-2xl uppercase leading-tight tracking-wide text-tutor-navy">
                                Mission Details
                            </h2>
                            <div className="mt-1 flex items-center justify-center gap-1.5 sm:gap-2">
                                <div className="h-1 w-6 sm:w-8 rounded-full bg-tutor-orange" />
                                <Star
                                    className="h-3 w-3 sm:h-4 sm:w-4 text-tutor-yellow"
                                    fill={YELLOW}
                                />
                                <div className="h-1 w-6 sm:w-8 rounded-full bg-tutor-orange" />
                            </div>
                            <p className="mt-1.5 sm:mt-2.5 inline-flex items-center gap-1 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-2 py-0.5 sm:px-3 sm:py-1 font-playful text-[10px] font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-xs">
                                <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4" />
                                Ready for the challenge?
                            </p>
                        </div>

                        {/* Mission Info */}
                        <div className="space-y-4">
                            {/* Mission Title */}
                            {/* <div className="rounded-xl border-[3px] border-tutor-navy bg-tutor-blue/10 p-4 shadow-[3px_3px_0_0_#071B3A]">
                                <h3 className="mb-2 flex items-center gap-2 font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-blue text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                        ⚔️
                                    </span>
                                    {mission.title}
                                </h3>
                                <p className="font-playful text-sm leading-relaxed text-tutor-navy sm:text-base">
                                    {mission.description}
                                </p>
                            </div> */}

                            {/* NPC Info */}
                            {/* <div className="flex items-center gap-3 rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-4 shadow-[3px_3px_0_0_#071B3A]">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-yellow text-2xl shadow-[2px_2px_0_0_#071B3A]">
                                    👤
                                </span>
                                <div className="min-w-0">
                                    <h4 className="font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                        NPC: {mission.npc}
                                    </h4>
                                    <p className="font-playful text-sm text-tutor-navy/70 sm:text-base">
                                        📍 Location: {mission.location}
                                    </p>
                                </div>
                            </div> */}

                            {/* Quiz Overview */}
                            <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-orange/10 p-2.5 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A]">
                                <h4 className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 font-brutal text-[11px] uppercase tracking-wide text-tutor-navy sm:text-sm">
                                    <span className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg border-2 border-tutor-navy bg-tutor-orange text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[2px_2px_0_0_#071B3A]">
                                        📝
                                    </span>
                                    Quiz Overview
                                </h4>
                                <p className="font-playful text-xs leading-relaxed text-tutor-navy sm:text-sm">
                                    {quizOverview}
                                </p>
                            </div>

                            {/* Real-Life Applications */}
                            <div className="rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-green/15 p-2.5 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A]">
                                <h4 className="mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 font-brutal text-[11px] uppercase tracking-wide text-tutor-navy sm:text-sm">
                                    <span className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg border-2 border-tutor-navy bg-tutor-green text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                        💡
                                    </span>
                                    Why This Matters in Real Life
                                </h4>
                                <ul className="space-y-1.5 sm:space-y-2">
                                    {realLifeTrivia.map((trivia, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-1.5 sm:gap-2"
                                        >
                                            <span className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-navy font-brutal text-[10px] text-tutor-cream sm:text-xs">
                                                {index + 1}
                                            </span>
                                            <span className="font-playful text-xs text-tutor-navy sm:text-sm">
                                                {trivia}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Reward */}
                            <div className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-yellow p-2.5 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A]">
                                <span className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-md sm:rounded-lg border-2 border-tutor-navy bg-tutor-cream text-xl sm:text-2xl shadow-[2px_2px_0_0_#071B3A]">
                                    🏆
                                </span>
                                <div className="min-w-0">
                                    <h4 className="font-brutal text-xs uppercase tracking-wide text-tutor-navy sm:text-sm">
                                        Reward:
                                    </h4>
                                    <p className="font-playful text-xs font-semibold text-tutor-navy sm:text-sm">
                                        {mission.reward}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 sm:mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
                            <button
                                onClick={onStartQuiz}
                                type="button"
                                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-4 py-2.5 sm:px-6 sm:py-3 font-brutal text-xs uppercase tracking-wider text-tutor-cream shadow-[4px_4px_0_0_#071B3A] sm:shadow-[5px_5px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[6px_6px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A] min-h-[44px]"
                            >
                                <span>📝</span>
                                Start Quiz
                            </button>
                            <button
                                onClick={onClose}
                                type="button"
                                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-cream px-4 py-2.5 sm:px-6 sm:py-3 font-brutal text-xs uppercase tracking-wide text-tutor-navy shadow-[3px_3px_0_0_#071B3A] sm:shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] min-h-[44px]"
                            >
                                <span>🚪</span>
                                Close
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

