/**
 * Secret Quests Component for CIVIKA
 * Displays discovered secret quests, player titles, and hidden achievements
 */

import React, { useState, useEffect } from "react";
import SecretQuestService from "../services/SecretQuestService";
import { SecretQuest, PlayerTitle } from "../types/secretQuest";
import {
    CheckCircle,
    Target,
    HelpCircle,
    Lock,
    X,
    Crown,
    Check,
    Star,
} from "lucide-react";

interface SecretQuestsProps {
    onClose: () => void;
    isVisible: boolean;
}

const YELLOW = "#FFD84D";

export const SecretQuests: React.FC<SecretQuestsProps> = ({
    onClose,
    isVisible,
}) => {
    const [secretQuests, setSecretQuests] = useState<SecretQuest[]>([]);
    const [currentTitle, setCurrentTitle] = useState<PlayerTitle>(
        PlayerTitle.CITIZEN
    );
    const [unlockedTitles, setUnlockedTitles] = useState<PlayerTitle[]>([]);
    const [showTitles, setShowTitles] = useState(false);
    const secretQuestService = SecretQuestService.getInstance();

    useEffect(() => {
        if (isVisible) {
            loadData();
        }
    }, [isVisible]);

    const loadData = () => {
        const quests = secretQuestService.getSecretQuests();
        setSecretQuests(quests);

        const current = secretQuestService.getCurrentTitle();
        setCurrentTitle(current);

        const unlocked = secretQuestService.getUnlockedTitles();
        setUnlockedTitles(unlocked);
    };

    const handleTitleChange = (title: PlayerTitle) => {
        const success = secretQuestService.setActiveTitle(title);
        if (success) {
            setCurrentTitle(title);
        }
    };

    const getTitleColor = (
        rarity: "common" | "uncommon" | "rare" | "legendary"
    ): string => {
        switch (rarity) {
            case "legendary":
                return "bg-tutor-yellow";
            case "rare":
                return "bg-tutor-purple";
            case "uncommon":
                return "bg-tutor-blue";
            default:
                return "bg-tutor-navy/45";
        }
    };

    const getTitleBadgeClass = (
        rarity: "common" | "uncommon" | "rare" | "legendary"
    ): string => {
        switch (rarity) {
            case "legendary":
                return "bg-tutor-yellow text-tutor-navy";
            case "rare":
                return "bg-tutor-purple text-tutor-cream";
            case "uncommon":
                return "bg-tutor-blue text-tutor-cream";
            default:
                return "bg-[#E5DCC9] text-tutor-navy";
        }
    };

    const getQuestIcon = (quest: SecretQuest): React.ReactNode => {
        if (quest.completed)
            return <CheckCircle className="h-5 w-5 text-tutor-green" />;
        if (quest.discovered)
            return <Target className="h-5 w-5 text-tutor-yellow" />;
        return <HelpCircle className="h-5 w-5 text-tutor-navy/40" />;
    };

    if (!isVisible) return null;

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        // Close when clicking the backdrop (dark area)
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        // Prevent closing when clicking inside the modal content
        e.stopPropagation();
    };

    return (
        <div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 pointer-events-auto"
            onClick={handleBackdropClick}
        >
            {/* Tutor Town game window: navy outer frame, yellow inner frame */}
            <section
                className="relative w-full max-w-3xl animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]"
                onClick={handleContentClick}
            >
                <div className="flex max-h-[90vh] flex-col rounded-[14px] border-2 border-tutor-yellow px-5 py-5 sm:px-7">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute right-2.5 top-2.5 z-20 flex h-10 w-10 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Header */}
                    <div className="mb-4 text-center">
                        <h2 className="font-brutal text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                            Secret Quests
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
                            <Lock className="h-4 w-4" />
                            Hidden challenges &amp; titles
                        </p>
                    </div>

                    {/* Current Title Display */}
                    <div className="mb-4 rounded-xl border-[3px] border-tutor-navy bg-tutor-yellow p-4 text-center shadow-[3px_3px_0_0_#071B3A]">
                        <p className="mb-1 font-playful text-xs font-bold uppercase tracking-wide text-tutor-navy/70">
                            Current Title:
                        </p>
                        <h3
                            className={`font-brutal text-xl uppercase tracking-wide sm:text-2xl ${getTitleColor(
                                secretQuestService.getTitleRarity(
                                    currentTitle
                                )
                            )} bg-clip-text text-transparent`}
                        >
                            {currentTitle || "Citizen"}
                        </h3>
                        <p className="mt-1 font-playful text-xs text-tutor-navy/70">
                            {secretQuestService.getTitleDescription(
                                currentTitle
                            )}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="mb-4 flex gap-2">
                        <button
                            onClick={() => setShowTitles(false)}
                            type="button"
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-[3px] px-3 py-2 font-brutal text-xs uppercase tracking-wide transition-all duration-150 sm:text-sm ${
                                !showTitles
                                    ? "-translate-y-0.5 border-tutor-navy bg-tutor-navy text-tutor-cream shadow-[0_0_0_3px_#FFD84D,5px_5px_0_0_#071B3A]"
                                    : "border-tutor-navy bg-tutor-cream text-tutor-navy opacity-80 shadow-[3px_3px_0_0_#071B3A] hover:-translate-y-0.5 hover:opacity-100 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                            }`}
                        >
                            <span
                                className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${
                                    !showTitles
                                        ? "border-tutor-navy bg-tutor-yellow text-tutor-navy"
                                        : "border-tutor-navy bg-tutor-orange text-tutor-cream"
                                }`}
                            >
                                <Target className="h-3.5 w-3.5" />
                            </span>
                            <span>Secret Quests</span>
                        </button>
                        <button
                            onClick={() => setShowTitles(true)}
                            type="button"
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-[3px] px-3 py-2 font-brutal text-xs uppercase tracking-wide transition-all duration-150 sm:text-sm ${
                                showTitles
                                    ? "-translate-y-0.5 border-tutor-navy bg-tutor-navy text-tutor-cream shadow-[0_0_0_3px_#FFD84D,5px_5px_0_0_#071B3A]"
                                    : "border-tutor-navy bg-tutor-cream text-tutor-navy opacity-80 shadow-[3px_3px_0_0_#071B3A] hover:-translate-y-0.5 hover:opacity-100 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                            }`}
                        >
                            <span
                                className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${
                                    showTitles
                                        ? "border-tutor-navy bg-tutor-yellow text-tutor-navy"
                                        : "border-tutor-navy bg-tutor-purple text-tutor-cream"
                                }`}
                            >
                                <Crown className="h-3.5 w-3.5" />
                            </span>
                            <span>Titles ({unlockedTitles.length})</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar pb-1">
                        {!showTitles ? (
                            // Secret Quests View
                            <div className="space-y-3">
                                {secretQuests.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-tutor-navy bg-tutor-cream text-3xl shadow-[3px_3px_0_0_#071B3A]">
                                            ❓
                                        </span>
                                        <p className="mb-2 font-playful font-bold text-tutor-navy">
                                            No secret quests discovered yet!
                                        </p>
                                        <p className="font-playful text-sm text-tutor-navy/70">
                                            Explore the map to uncover hidden
                                            secrets...
                                        </p>
                                    </div>
                                ) : (
                                    secretQuests.map((quest) => (
                                        <div
                                            key={quest.id}
                                            className={`rounded-xl border-[3px] border-tutor-navy p-3 shadow-[3px_3px_0_0_#071B3A] sm:p-4 ${
                                                quest.completed
                                                    ? "bg-tutor-green/15"
                                                    : "bg-tutor-cream"
                                            }`}
                                        >
                                            {/* Quest Header */}
                                            <div className="mb-2 flex items-start gap-2">
                                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-[#F3EBDD] shadow-[2px_2px_0_0_#071B3A]">
                                                    {getQuestIcon(quest)}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                                        {quest.name}
                                                    </h3>
                                                    <p className="mt-1 font-playful text-xs text-tutor-navy/70 sm:text-sm">
                                                        {quest.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Progress */}
                                            {quest.progress !== undefined &&
                                                quest.condition.count && (
                                                    <div className="mb-2">
                                                        <div className="mb-1 flex justify-between font-playful text-xs font-semibold text-tutor-navy/70">
                                                            <span>
                                                                Progress:{" "}
                                                                {quest.progress}
                                                                /
                                                                {
                                                                    quest
                                                                        .condition
                                                                        .count
                                                                }
                                                            </span>
                                                            <span>
                                                                {Math.round(
                                                                    (quest.progress /
                                                                        quest
                                                                            .condition
                                                                            .count) *
                                                                        100
                                                                )}
                                                                %
                                                            </span>
                                                        </div>
                                                        <div className="h-3 w-full overflow-hidden rounded-full border-2 border-tutor-navy bg-tutor-cream">
                                                            <div
                                                                className="h-full rounded-full bg-tutor-purple transition-all duration-300"
                                                                style={{
                                                                    width: `${Math.min(
                                                                        (quest.progress /
                                                                            (quest
                                                                                .condition
                                                                                .count ||
                                                                                1)) *
                                                                            100,
                                                                        100
                                                                    )}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}

                                            {/* Hint */}
                                            {quest.hint && !quest.completed && (
                                                <div className="mb-2 rounded-lg border-2 border-tutor-navy/25 bg-tutor-purple/10 p-2 font-playful text-xs text-tutor-navy">
                                                    <span className="font-bold uppercase text-tutor-purple">
                                                        Hint:
                                                    </span>{" "}
                                                    <span className="italic">
                                                        {quest.hint}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Rewards */}
                                            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center gap-1 rounded-md border-2 border-tutor-navy bg-tutor-green/10 px-2 py-1 font-playful text-xs font-bold text-tutor-navy">
                                                        💰 +{quest.reward.coins}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 rounded-md border-2 border-tutor-navy bg-tutor-yellow px-2 py-1 font-playful text-xs font-bold text-tutor-navy">
                                                        ⭐ +{quest.reward.points}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-md border-2 border-tutor-navy px-2 py-1 font-brutal text-[10px] uppercase tracking-wide ${getTitleBadgeClass(
                                                        secretQuestService.getTitleRarity(
                                                            quest.reward.title
                                                        )
                                                    )}`}
                                                >
                                                    👑 {quest.reward.title}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            // Titles View
                            <div className="space-y-3">
                                {unlockedTitles.map((title) => {
                                    const rarity =
                                        secretQuestService.getTitleRarity(
                                            title
                                        );
                                    const isActive = title === currentTitle;

                                    return (
                                        <div
                                            key={title}
                                            className={`cursor-pointer rounded-xl border-[3px] border-tutor-navy p-3 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 ${
                                                isActive
                                                    ? "-translate-y-0.5 bg-tutor-yellow shadow-[0_0_0_3px_#FFD84D,3px_3px_0_0_#071B3A]"
                                                    : "bg-tutor-cream hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A]"
                                            }`}
                                            onClick={() =>
                                                handleTitleChange(title)
                                            }
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="min-w-0 flex-1">
                                                    <h4
                                                        className={`font-brutal text-lg ${getTitleColor(
                                                            rarity
                                                        )} bg-clip-text text-transparent`}
                                                    >
                                                        {title}
                                                    </h4>
                                                    <p className="font-playful text-xs text-tutor-navy/70">
                                                        {secretQuestService.getTitleDescription(
                                                            title
                                                        )}
                                                    </p>
                                                </div>
                                                {isActive && (
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-green text-tutor-cream">
                                                        <Check className="h-4 w-4" />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 rounded-xl border-[3px] border-tutor-navy bg-tutor-purple p-4 text-center shadow-[3px_3px_0_0_#071B3A]">
                        <p className="font-brutal text-sm uppercase tracking-wide text-tutor-cream">
                            🔐 Discover secrets to unlock unique titles!
                        </p>
                        <p className="mt-1 font-playful text-xs text-tutor-cream/80">
                            {
                                secretQuests.filter((q) => q.discovered).length
                            }{" "}
                            / {secretQuests.length} secrets discovered
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};