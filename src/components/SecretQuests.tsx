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
} from "lucide-react";

interface SecretQuestsProps {
    onClose: () => void;
    isVisible: boolean;
}

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
                return "bg-brutal-yellow";
            case "rare":
                return "bg-brutal-purple";
            case "uncommon":
                return "bg-brutal-blue";
            default:
                return "bg-gray-400";
        }
    };

    const getQuestIcon = (quest: SecretQuest): React.ReactNode => {
        if (quest.completed) return <CheckCircle className="w-5 h-5 text-brutal-green" />;
        if (quest.discovered) return <Target className="w-5 h-5 text-brutal-yellow" />;
        return <HelpCircle className="w-5 h-5 text-gray-400" />;
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
            className="absolute inset-0 bg-black/70 flex items-center justify-center pointer-events-auto p-4 z-50"
            onClick={handleBackdropClick}
        >
            <div
                className="brutal-panel p-6 w-full max-w-3xl mx-4 max-h-[95vh] overflow-hidden relative flex flex-col"
                onClick={handleContentClick}
            >
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white brutal-press z-20"
                    >
                                                    <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <h2 className="text-3xl font-brutal uppercase text-gray-900 mb-6 text-center">
                        🔐 Secret Quests
                    </h2>

                    {/* Current Title Display */}
                    <div className="mb-4 p-4 rounded-none border-[3px] border-black bg-brutal-yellow shadow-brutal-sm">
                        <div className="text-center">
                            <p className="text-sm font-bold uppercase text-gray-800 mb-1">
                                Current Title:
                            </p>
                            <h3
                                className={`text-xl sm:text-2xl font-brutal ${getTitleColor(
                                    secretQuestService.getTitleRarity(
                                        currentTitle
                                    )
                                )} bg-clip-text text-transparent`}
                            >
                                {currentTitle || "Citizen"}
                            </h3>
                            <p className="text-xs text-gray-800 mt-1">
                                {secretQuestService.getTitleDescription(
                                    currentTitle
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-2 mb-4">
                        <button
                            onClick={() => setShowTitles(false)}
                            className={`flex-1 px-4 py-2 rounded-none border-2 border-black font-bold uppercase transition-all duration-150 text-sm ${
                                !showTitles
                                    ? "bg-black text-white shadow-brutal-xs"
                                    : "bg-white text-gray-700 hover:bg-brutal-bg"
                            }`}
                        >
                            🎯 Secret Quests
                        </button>
                        <button
                            onClick={() => setShowTitles(true)}
                            className={`flex-1 px-4 py-2 rounded-none border-2 border-black font-bold uppercase transition-all duration-150 text-sm ${
                                showTitles
                                    ? "bg-black text-white shadow-brutal-xs"
                                    : "bg-white text-gray-700 hover:bg-brutal-bg"
                            }`}
                        >
                            👑 Titles ({unlockedTitles.length})
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {!showTitles ? (
                            // Secret Quests View
                            <div className="space-y-3">
                                {secretQuests.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-4xl mb-4">❓</div>
                                        <p className="text-gray-900 font-bold mb-2">
                                            No secret quests discovered yet!
                                        </p>
                                        <p className="text-gray-700 text-sm">
                                            Explore the map to uncover hidden
                                            secrets...
                                        </p>
                                    </div>
                                ) : (
                                    secretQuests.map((quest) => (
                                        <div
                                            key={quest.id}
                                            className={`rounded-none border-[3px] border-black shadow-brutal-sm p-3 sm:p-4 ${
                                                quest.completed
                                                    ? "bg-brutal-green"
                                                    : "bg-white"
                                            }`}
                                        >
                                            {/* Quest Header */}
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-start space-x-2 flex-1">
                                                    <span className="text-2xl">
                                                        {getQuestIcon(quest)}
                                                    </span>
                                                    <div>
                                                        <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                                            {quest.name}
                                                        </h3>
                                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                                            {quest.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress */}
                                            {quest.progress !== undefined &&
                                                quest.condition.count && (
                                                    <div className="mb-2">
                                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
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
                                                        <div className="w-full bg-white h-2 border-2 border-black">
                                                            <div
                                                                className="bg-brutal-purple h-full rounded-none transition-all duration-300"
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
                                                <div className="mb-2 p-2 bg-purple-100 rounded text-xs">
                                                    <span className="font-bold text-gray-900">
                                                        Hint:
                                                    </span>{" "}
                                                    <span className="text-gray-800 italic">
                                                        {quest.hint}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Rewards */}
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center space-x-1">
                                                        <span>💰</span>
                                                        <span className="font-bold text-gray-900">
                                                            +
                                                            {quest.reward.coins}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <span>⭐</span>
                                                        <span className="font-bold text-gray-900">
                                                            +
                                                            {
                                                                quest.reward
                                                                    .points
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`px-3 py-1 rounded-none border-2 border-black text-xs font-bold text-black ${getTitleColor(
                                                        secretQuestService.getTitleRarity(
                                                            quest.reward.title
                                                        )
                                                    )}`}
                                                >
                                                    👑 {quest.reward.title}
                                                </div>
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
                                            className={`rounded-none border-[3px] border-black p-3 shadow-brutal-xs transition-all duration-150 cursor-pointer ${
                                                isActive
                                                    ? "bg-brutal-yellow"
                                                    : "bg-white hover:-translate-y-0.5 hover:shadow-brutal-sm"
                                            }`}
                                            onClick={() =>
                                                handleTitleChange(title)
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4
                                                        className={`text-lg font-brutal ${getTitleColor(
                                                            rarity
                                                        )} bg-clip-text text-transparent`}
                                                    >
                                                        {title}
                                                    </h4>
                                                    <p className="text-xs text-gray-600">
                                                        {secretQuestService.getTitleDescription(
                                                            title
                                                        )}
                                                    </p>
                                                </div>
                                                {isActive && (
                                                    <div className="text-2xl">
                                                        ✅
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 p-3 rounded-none border-[3px] border-black bg-brutal-purple shadow-brutal-sm">
                        <div className="text-center text-sm text-gray-800">
                            <p className="font-bold">
                                🔐 Discover secrets to unlock unique titles!
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                {
                                    secretQuests.filter((q) => q.discovered)
                                        .length
                                }{" "}
                                / {secretQuests.length} secrets discovered
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    );
};
