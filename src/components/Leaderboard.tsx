/**
 * Leaderboard Component for CIVIKA
 *
 * Displays global rankings with multiple leaderboard types:
 * - Overall: Top scores
 * - Daily: Today's best performers
 * - Speed: Fastest quiz times
 * - Collectors: Most collectibles found
 */

import React, { useState, useEffect } from "react";
import LeaderboardService from "../services/LeaderboardService";
import { LeaderboardEntry, LeaderboardType } from "../types/leaderboard";
import { GameStateManager } from "../utils/GameStateManager";
import {
    Trophy,
    X,
    RefreshCw,
    Globe,
    AlertTriangle,
    Star,
    CalendarDays,
    Zap,
    Gem,
} from "lucide-react";

interface LeaderboardProps {
    onClose: () => void;
    isVisible: boolean;
}

const YELLOW = "#FFD84D";

export const Leaderboard: React.FC<LeaderboardProps> = ({
    onClose,
    isVisible,
}) => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
        []
    );
    const [selectedTab, setSelectedTab] = useState<LeaderboardType>(
        LeaderboardType.OVERALL
    );
    const [loading, setLoading] = useState(false);
    const [playerRank, setPlayerRank] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const leaderboardService = LeaderboardService.getInstance();
    const gameStateManager = GameStateManager.getInstance();

    useEffect(() => {
        if (isVisible) {
            loadLeaderboard();

            // Subscribe to real-time updates if enabled
            if (leaderboardService.isEnabled()) {
                const channel = leaderboardService.subscribeToLeaderboard(
                    () => {
                        console.log("Leaderboard updated, refreshing...");
                        loadLeaderboard();
                    }
                );

                return () => {
                    leaderboardService.unsubscribeFromLeaderboard(channel);
                };
            }
        }
    }, [isVisible, selectedTab]);

    const loadLeaderboard = async () => {
        setLoading(true);
        setError(null);

        // Check if leaderboard is enabled
        if (!leaderboardService.isEnabled()) {
            setError(
                "Leaderboard is not configured. Please set up Supabase to enable this feature."
            );
            setLoading(false);
            return;
        }

        try {
            let data: LeaderboardEntry[] = [];

            switch (selectedTab) {
                case LeaderboardType.OVERALL:
                    data = await leaderboardService.getTopPlayers(100);
                    break;
                case LeaderboardType.SPEED:
                    data = await leaderboardService.getSpeedLeaderboard(50);
                    break;
                case LeaderboardType.COLLECTORS:
                    data = await leaderboardService.getCollectorLeaderboard(50);
                    break;
                case LeaderboardType.DAILY:
                    const dailyData =
                        await leaderboardService.getDailyLeaderboard(50);
                    // Convert to LeaderboardEntry format
                    data = dailyData.map((d) => ({
                        player_name: d.player_name,
                        total_score: d.score,
                        level: 0,
                        badges: 0,
                        coins: 0,
                        completed_missions: 0,
                        accuracy: 0,
                        playtime: 0,
                    }));
                    break;
            }

            setLeaderboardData(data);

            // Get player's rank
            const progress = gameStateManager.getProgress();
            if (progress && selectedTab === LeaderboardType.OVERALL) {
                const rank = await leaderboardService.getPlayerRank(
                    progress.playerName
                );
                setPlayerRank(rank);
            } else {
                setPlayerRank(null);
            }
        } catch (error) {
            console.error("Failed to load leaderboard:", error);
            setError(
                "Failed to load leaderboard. Please check your connection."
            );
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (rank: number): React.ReactNode => {
        if (rank === 1)
            return (
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-tutor-navy bg-tutor-yellow text-tutor-navy">
                    <Trophy className="h-4 w-4" />
                </span>
            );
        if (rank === 2)
            return (
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-tutor-navy bg-[#E5E7EB] text-tutor-navy">
                    <Trophy className="h-4 w-4" />
                </span>
            );
        if (rank === 3)
            return (
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-tutor-navy bg-tutor-orange text-tutor-cream">
                    <Trophy className="h-4 w-4" />
                </span>
            );
        return (
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-tutor-navy bg-tutor-cream font-brutal text-xs text-tutor-navy">
                {rank}
            </span>
        );
    };

    const isCurrentPlayer = (entry: LeaderboardEntry): boolean => {
        const progress = gameStateManager.getProgress();
        return progress?.playerName === entry.player_name;
    };

    const TABS: ReadonlyArray<{
        type: LeaderboardType;
        label: string;
        accent: string;
        icon: React.ReactNode;
    }> = [
        {
            type: LeaderboardType.OVERALL,
            label: "Overall",
            accent: "bg-tutor-blue",
            icon: <Trophy className="h-3.5 w-3.5" />,
        },
        {
            type: LeaderboardType.DAILY,
            label: "Daily",
            accent: "bg-tutor-orange",
            icon: <CalendarDays className="h-3.5 w-3.5" />,
        },
        {
            type: LeaderboardType.SPEED,
            label: "Speed",
            accent: "bg-tutor-red",
            icon: <Zap className="h-3.5 w-3.5" />,
        },
        {
            type: LeaderboardType.COLLECTORS,
            label: "Collectors",
            accent: "bg-tutor-purple",
            icon: <Gem className="h-3.5 w-3.5" />,
        },
    ];

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                <section className="relative w-full max-w-3xl animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                    <div className="flex max-h-[90vh] flex-col rounded-[14px] border-2 border-tutor-yellow px-5 py-5 sm:px-7">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            type="button"
                            aria-label="Close leaderboard"
                            className="absolute right-2.5 top-2.5 z-20 flex h-10 w-10 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Header */}
                        <div className="mb-4 text-center">
                            <h2 className="font-brutal text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                                Leaderboard
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
                                <Trophy className="h-4 w-4" />
                                Global rankings
                            </p>
                        </div>

                        {/* Player's Rank Display */}
                        {playerRank && (
                            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border-2 border-tutor-navy bg-tutor-yellow px-4 py-3 shadow-[3px_3px_0_0_#071B3A]">
                                <span className="font-playful text-sm font-bold text-tutor-navy">
                                    Your Rank:
                                </span>
                                <div className="flex items-center gap-2">
                                    {getRankIcon(playerRank)}
                                    <span className="font-brutal text-xl text-tutor-navy">
                                        #{playerRank}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Tabs */}
                        <div className="mb-4 flex flex-wrap gap-2">
                            {TABS.map((tab) => {
                                const active = selectedTab === tab.type;
                                return (
                                    <button
                                        key={tab.type}
                                        type="button"
                                        onClick={() =>
                                            setSelectedTab(tab.type)
                                        }
                                        className={`flex items-center gap-2 rounded-xl border-[3px] px-3 py-2 font-brutal text-xs uppercase tracking-wide transition-all duration-150 sm:text-sm ${
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
                                            {tab.icon}
                                        </span>
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Leaderboard Content */}
                        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
                            {error ? (
                                <div className="py-12 text-center">
                                    <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-tutor-navy bg-tutor-red text-3xl shadow-[3px_3px_0_0_#071B3A]">
                                        ⚠️
                                    </span>
                                    <p className="mb-2 font-playful font-bold text-tutor-red">
                                        {error}
                                    </p>
                                    <p className="font-playful text-sm text-tutor-navy/60">
                                        Check the console for more details or
                                        refer to LEADERBOARD_SETUP_GUIDE.md
                                    </p>
                                </div>
                            ) : loading ? (
                                <div className="py-12 text-center">
                                    <span className="mb-4 inline-flex h-14 w-14 animate-bounce items-center justify-center rounded-2xl border-2 border-tutor-navy bg-tutor-yellow text-3xl shadow-[3px_3px_0_0_#071B3A]">
                                        ⏳
                                    </span>
                                    <p className="font-playful font-bold text-tutor-navy">
                                        Loading leaderboard...
                                    </p>
                                </div>
                            ) : leaderboardData.length === 0 ? (
                                <div className="py-12 text-center">
                                    <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-tutor-navy bg-tutor-cream text-3xl shadow-[3px_3px_0_0_#071B3A]">
                                        📜
                                    </span>
                                    <p className="mb-2 font-playful font-bold text-tutor-navy">
                                        No entries yet!
                                    </p>
                                    <p className="font-playful text-sm text-tutor-navy/60">
                                        Be the first to appear on the
                                        leaderboard. Complete missions to
                                        submit your score!
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto pb-1">
                                    <table className="w-full min-w-[500px] border-2 border-tutor-navy shadow-[3px_3px_0_0_#071B3A]">
                                        <thead className="sticky top-0 bg-tutor-navy">
                                            <tr className="font-brutal text-[11px] uppercase tracking-wide text-tutor-cream sm:text-xs">
                                                <th className="p-2.5 text-center">
                                                    Rank
                                                </th>
                                                <th className="p-2.5 text-left">
                                                    Player
                                                </th>
                                                <th className="p-2.5 text-center">
                                                    Score
                                                </th>
                                                <th className="p-2.5 text-center">
                                                    Badges
                                                </th>
                                                {selectedTab ===
                                                    LeaderboardType.SPEED && (
                                                    <th className="p-2.5 text-center">
                                                        Fastest
                                                    </th>
                                                )}
                                                {selectedTab ===
                                                    LeaderboardType.COLLECTORS && (
                                                    <th className="p-2.5 text-center">
                                                        Items
                                                    </th>
                                                )}
                                                {selectedTab ===
                                                    LeaderboardType.OVERALL && (
                                                    <th className="hidden p-2.5 text-center sm:table-cell">
                                                        Level
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaderboardData.map(
                                                (entry, index) => {
                                                    const rank = index + 1;
                                                    const isPlayer =
                                                        isCurrentPlayer(entry);

                                                    return (
                                                        <tr
                                                            key={
                                                                entry.id ||
                                                                index
                                                            }
                                                            className={`border-t-2 border-tutor-navy/15 font-playful text-xs transition-colors duration-150 sm:text-sm ${
                                                                isPlayer
                                                                    ? "bg-tutor-yellow font-bold"
                                                                    : "bg-tutor-cream hover:bg-[#F3EBDD]"
                                                            }`}
                                                        >
                                                            <td className="p-2.5 text-center">
                                                                {getRankIcon(
                                                                    rank
                                                                )}
                                                            </td>
                                                            <td className="p-2.5 text-tutor-navy">
                                                                {isPlayer && (
                                                                    <span className="mr-1">
                                                                        ⭐
                                                                    </span>
                                                                )}
                                                                {
                                                                    entry.player_name
                                                                }
                                                                {isPlayer && (
                                                                    <span className="ml-1">
                                                                        ⭐
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="p-2.5 text-center font-semibold text-tutor-navy">
                                                                {entry.total_score.toLocaleString()}
                                                            </td>
                                                            <td className="p-2.5 text-center">
                                                                <span className="inline-flex items-center gap-1 rounded-md border-2 border-tutor-navy bg-tutor-yellow px-2 py-0.5 font-brutal text-xs text-tutor-navy">
                                                                    <Trophy className="h-3 w-3" />
                                                                    {entry.badges}
                                                                </span>
                                                            </td>
                                                            {selectedTab ===
                                                                LeaderboardType.SPEED && (
                                                                <td className="p-2.5 text-center font-bold text-tutor-green">
                                                                    <Zap className="mr-1 inline h-3 w-3" />
                                                                    {entry.fastest_quiz_time?.toFixed(
                                                                        1
                                                                    ) || "-"}
                                                                    s
                                                                </td>
                                                            )}
                                                            {selectedTab ===
                                                                LeaderboardType.COLLECTORS && (
                                                                <td className="p-2.5 text-center font-bold text-tutor-purple">
                                                                    <Gem className="mr-1 inline h-3 w-3" />
                                                                    {entry.total_collectibles ||
                                                                        0}
                                                                </td>
                                                            )}
                                                            {selectedTab ===
                                                                LeaderboardType.OVERALL && (
                                                                <td className="hidden p-2.5 text-center sm:table-cell">
                                                                    <span className="inline-block rounded-md border-2 border-tutor-navy bg-tutor-cream px-2 py-0.5 font-brutal text-xs text-tutor-navy">
                                                                        L
                                                                        {
                                                                            entry.level
                                                                        }
                                                                    </span>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-4 flex items-center justify-center gap-1 text-center font-playful text-xs text-tutor-navy/60">
                            {leaderboardService.isEnabled() ? (
                                <>
                                    <RefreshCw className="h-3.5 w-3.5" />
                                    Updates every 30 seconds •{" "}
                                    <Globe className="h-3.5 w-3.5" />
                                    Global Rankings
                                </>
                            ) : (
                                <>
                                    <AlertTriangle className="h-3.5 w-3.5" />
                                    Leaderboard not configured • See
                                    LEADERBOARD_SETUP_GUIDE.md
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};