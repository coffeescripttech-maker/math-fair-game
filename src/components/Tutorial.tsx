import React, { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import {
    ACTIVE_COLLECTIBLES,
    ACTIVE_LEVELS,
    GAME_CONFIG,
    TOTAL_BADGES,
    TOTAL_MISSIONS,
    TOTAL_LEVELS,
    getProgressionRequirement,
} from "../config/gameConfig";
import { GameValidation } from "../utils/GameValidation";

const FIRST_LEVEL_NAME =
    ACTIVE_LEVELS[0]?.name.toLowerCase() ?? "barangay";
const LAST_LEVEL_NAME =
    ACTIVE_LEVELS[TOTAL_LEVELS - 1]?.name.toLowerCase() ?? "national";
const LAST_ACTIVE_BADGE =
    GameValidation.getMissionReward(TOTAL_MISSIONS)?.badge ??
    "Olympiad Mentor";

interface TutorialProps {
    onClose: () => void;
    isVisible: boolean;
    autoStart?: boolean; // For first-time players
}

interface TutorialSection {
    id: number;
    title: string;
    icon: string;
    content: React.ReactNode;
}

const YELLOW = "#FFD84D";

/** Simple info-card: neutral white body with a thin colored left accent. */
type Tone = "yellow" | "blue" | "green" | "purple" | "orange" | "red" | "cream";

const TONE_ACCENT: Record<Tone, string> = {
    yellow: "border-l-tutor-yellow",
    blue: "border-l-tutor-blue",
    green: "border-l-tutor-green",
    purple: "border-l-tutor-purple",
    orange: "border-l-tutor-orange",
    red: "border-l-tutor-red",
    cream: "border-l-tutor-navy",
};

const InfoCard: React.FC<{
    tone: Tone;
    title?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}> = ({ tone, title, children, className = "" }) => (
    <div
        className={`rounded-xl border-2 border-l-8 border-tutor-navy bg-white p-4 text-tutor-navy shadow-[3px_3px_0_0_#071B3A] ${TONE_ACCENT[tone]} ${className}`}
    >
        {title && (
            <h4 className="mb-2 font-brutal text-sm uppercase leading-snug tracking-wide">
                {title}
            </h4>
        )}
        <div className="space-y-2 font-playful text-sm leading-relaxed">
            {children}
        </div>
    </div>
);

export const Tutorial: React.FC<TutorialProps> = ({
    onClose,
    isVisible,
    autoStart = false,
}) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        // Check if tutorial has been completed
        const completed = localStorage.getItem("mathtuto-tutorial-completed");
        if (completed === "true" && autoStart) {
            // Don't auto-show if already completed
            onClose();
        }
    }, [autoStart, onClose]);

    const tutorialSections: TutorialSection[] = [
        {
            id: 1,
            title: "Welcome & Introduction",
            icon: "🎓",
            content: (
                <div className="space-y-4">
                    <h3 className="text-center font-brutal text-xl uppercase tracking-wide text-tutor-navy">
                        Welcome to MathTuto! 🌟
                    </h3>
                    <p className="text-center font-playful text-sm leading-relaxed text-tutor-navy">
                        You're a brand-new math tutor! Travel the
                        Philippines{TOTAL_LEVELS > 1 ? (
                            <>
                                {" "}
                                from your {FIRST_LEVEL_NAME} all the way to the{" "}
                                {LAST_LEVEL_NAME} level,
                            </>
                        ) : (
                            " "
                        )}{" "}
                        helping residents and officials solve real community
                        problems with math.
                    </p>

                    <InfoCard tone="blue" title="📚 Your Mission:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Complete {TOTAL_MISSIONS} math missions across{" "}
                                {TOTAL_LEVELS}{" "}
                                {TOTAL_LEVELS === 1 ? "map" : "maps"}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Help people from {FIRST_LEVEL_NAME} to{" "}
                                {LAST_LEVEL_NAME} level
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Collect {ACTIVE_COLLECTIBLES} hidden collectibles
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Earn all {TOTAL_BADGES} badges and climb the
                                leaderboard!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="yellow" title="🧮 What You'll Solve:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Real-life problems like distance, recipes & prices
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Radicals & inverse functions
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Growing into algebra, finance, physics & data
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Critical thinking, one problem at a time
                            </li>
                        </ul>
                    </InfoCard>

                    <p className="text-center font-playful text-base font-bold text-tutor-orange">
                        Ready to start your adventure? Let's go! 🚀
                    </p>
                </div>
            ),
        },
        {
            id: 2,
            title: "Controls & Movement",
            icon: "🎮",
            content: (
                <div className="space-y-4">
                    <h3 className="text-center font-brutal text-xl uppercase tracking-wide text-tutor-navy">
                        How to Move Around 🎮
                    </h3>

                    <InfoCard tone="purple" title="⌨️ Keyboard Controls:">
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { key: "W or ↑", desc: "Move Up" },
                                { key: "S or ↓", desc: "Move Down" },
                                { key: "A or ←", desc: "Move Left" },
                                { key: "D or →", desc: "Move Right" },
                                { key: "SPACE", desc: "Talk to NPCs" },
                                { key: "ESC", desc: "Pause Menu" },
                            ].map((control) => (
                                <div
                                    key={control.key}
                                    className="rounded-lg border-2 border-tutor-navy bg-tutor-cream px-3 py-2 text-center"
                                >
                                    <p className="font-brutal text-sm text-tutor-navy">
                                        {control.key}
                                    </p>
                                    <p className="font-playful text-xs text-tutor-navy/70">
                                        {control.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </InfoCard>

                    <InfoCard tone="blue" title="📱 Mobile Controls:">
                        <p>
                            Drag the virtual joystick (bottom-left) to move,
                            and press the{" "}
                            <strong className="font-bold">TAP</strong> button
                            (bottom-right) to talk to NPCs. Tap anywhere to
                            continue a conversation.
                        </p>
                    </InfoCard>

                    <InfoCard tone="green" title="🎥 Camera:">
                        <p>
                            The camera automatically follows your character as
                            you explore the map. Feel free to walk around and
                            discover new areas!
                        </p>
                    </InfoCard>

                    <InfoCard tone="yellow" className="p-3">
                        <p>
                            💡 <strong className="font-bold">Tip:</strong> Walk
                            around to find NPCs and collectibles scattered
                            across the map — keep an eye on the minimap!
                        </p>
                    </InfoCard>
                </div>
            ),
        },
        {
            id: 3,
            title: "NPC Interaction",
            icon: "💬",
            content: (
                <div className="space-y-4">
                    <h3 className="text-center font-brutal text-xl uppercase tracking-wide text-tutor-navy">
                        Talking to NPCs 💬
                    </h3>

                    <InfoCard tone="yellow" title="Finding Missions:">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="text-lg font-bold text-yellow-600">
                                    Mission #N
                                </span>
                                <div>
                                    <p className="font-bold">
                                        Available (gold)
                                    </p>
                                    <p className="text-tutor-navy/70">
                                        This NPC has a math mission for you
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-lg font-bold text-green-700">
                                    ✓
                                </span>
                                <div>
                                    <p className="font-bold">
                                        Completed (green)
                                    </p>
                                    <p className="text-tutor-navy/70">
                                        You've already helped this NPC
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-lg font-bold text-red-700">
                                    🔒
                                </span>
                                <div>
                                    <p className="font-bold">Locked (red)</p>
                                    <p className="text-tutor-navy/70">
                                        Finish earlier missions to unlock
                                    </p>
                                </div>
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard tone="blue" title="How to Interact:">
                        <ol className="list-inside list-decimal space-y-1.5">
                            <li>Walk close to an NPC</li>
                            <li>
                                Press <strong className="font-bold">SPACE</strong>{" "}
                                (or the TAP button on mobile)
                            </li>
                            <li>Read their story and problem</li>
                            <li>Press Start Challenge to help them out!</li>
                        </ol>
                    </InfoCard>

                    <InfoCard tone="purple" className="p-3">
                        <p>
                            🎯 <strong className="font-bold">Fun Fact:</strong>{" "}
                            Each NPC has a different profession and a real
                            community problem — from captains to engineers to
                            government officials!
                        </p>
                    </InfoCard>
                </div>
            ),
        },
        {
            id: 4,
            title: "Quiz System",
            icon: "📝",
            content: (
                <div className="space-y-4">
                    <h3 className="text-center font-brutal text-xl uppercase tracking-wide text-tutor-navy">
                        Solving Math Problems 📝
                    </h3>

                    <InfoCard tone="green" title="📋 Quiz Format:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Multiple choice questions (4 options, A-D)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Only one correct answer
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                60 second timer per question
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Running out of time counts as wrong
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="blue" title="🏆 Scoring:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                50 points for a correct answer
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Time bonus for fast answers (10s / 20s / 30s tiers)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Beat the mission for coins + a badge!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="yellow" title="🔍 Help Available:">
                        <div className="space-y-2">
                            <div className="rounded-lg border-2 border-tutor-navy bg-tutor-cream px-3 py-2">
                                <span className="font-bold">💡 Hints:</span>{" "}
                                Click to reveal problem-solving tips
                            </div>
                            <div className="rounded-lg border-2 border-tutor-navy bg-tutor-cream px-3 py-2">
                                <span className="font-bold">📖 Formula:</span>{" "}
                                See the mathematical formula
                            </div>
                            <div className="rounded-lg border-2 border-tutor-navy bg-tutor-cream px-3 py-2">
                                <span className="font-bold">📝 Steps:</span>{" "}
                                Review the step-by-step solution & key concept
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard tone="cream" title="✅ After Answering:">
                        <p>
                            <strong className="font-bold">Correct:</strong> Earn
                            points, coins and a badge! 🎉
                            <br />
                            <strong className="font-bold">
                                Incorrect:
                            </strong>{" "}
                            See the full explanation, then try again as many
                            times as you like
                        </p>
                    </InfoCard>
                </div>
            ),
        },
        {
            id: 5,
            title: "Game Progression",
            icon: "📈",
            content: (
                <div className="space-y-4">
                    <h3 className="text-center font-brutal text-xl uppercase tracking-wide text-tutor-navy">
                        Leveling Up 📈
                    </h3>
                    <p className="text-center font-playful text-sm text-tutor-navy/70">
                        Your Tutoring Journey
                    </p>

                    <div className="space-y-3">
                        {ACTIVE_LEVELS.map((lv) => (
                            <InfoCard
                                key={lv.level}
                                tone={lv.tone}
                                title={`${lv.icon} Level ${lv.level}: ${lv.name.toUpperCase()}`}
                            >
                                <p className="text-tutor-navy/85">
                                    Missions {lv.missionStart}-{lv.missionEnd} •{" "}
                                    {lv.theme}
                                </p>
                            </InfoCard>
                        ))}
                    </div>

                    <InfoCard tone="blue" className="p-3">
                        <p className="text-center">
                            🎯 Finish all{" "}
                            {GAME_CONFIG.MISSIONS_PER_LEVEL} missions in a level
                            to unlock the next map — plus keep at least 70% quiz
                            accuracy
                            {ACTIVE_LEVELS.length > 2
                                ? ` (${ACTIVE_LEVELS.slice(1)
                                      .map(
                                          (lv) =>
                                              `${getProgressionRequirement(lv.level).minScorePercentage}% → Level ${lv.level}`,
                                      )
                                      .join(", ")})`
                                : ""}
                            !
                        </p>
                    </InfoCard>
                </div>
            ),
        },
        {
            id: 6,
            title: "Rewards & Shop",
            icon: "🎁",
            content: (
                <div className="space-y-4">
                    <h3 className="text-center font-brutal text-xl uppercase tracking-wide text-tutor-navy">
                        Collectibles & Rewards 🎁
                    </h3>

                    <InfoCard tone="yellow" title="💰 Coins:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Earned from missions and collectibles
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Spent in the Shop
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Bonus from daily challenges!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="purple" title="🏆 Badges:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                {TOTAL_BADGES} badges, one per mission
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                From "Market Mathematician" to "
                                {LAST_ACTIVE_BADGE}"
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Collect them all!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="green" title="💎 Collectibles:">
                        <p>
                            {ACTIVE_COLLECTIBLES} hidden items — coins, badges,
                            power-ups, treasures & gems. Watch the minimap dots:
                            gold means legendary, magenta rare, cyan uncommon,
                            yellow common! Grab every item in a map for the Master
                            Collector bonus.
                        </p>
                    </InfoCard>

                    <InfoCard tone="blue" title="🛒 Shop:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
Power-ups: Speed, Coin Magnet, Score Booster,
                                    Hint Token, Time Freeze
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Cosmetics: Golden Badge, Math Master Crown,
                                Trophy
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Special: Mystery Box, Lucky Charm
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="orange" title="🗓️ Daily Challenges:">
                        <p>
                            Three fresh tasks every day — collect items, answer
                            quizzes fast, and finish missions for extra coins
                            and points!
                        </p>
                    </InfoCard>

                    <InfoCard tone="cream" title="🎯 Secret Quests:">
                        <p>
                            Hidden quests at secret spots around the maps, plus
                            legendary titles from Citizen up to Master of
                            Algebra!
                        </p>
                    </InfoCard>
                </div>
            ),
        },
        {
            id: 7,
            title: "UI Elements",
            icon: "🗺️",
            content: (
                <div className="space-y-4">
                    <h3 className="text-center font-brutal text-xl uppercase tracking-wide text-tutor-navy">
                        Understanding the Interface 🗺️
                    </h3>

                    <div className="space-y-3">
                        <InfoCard tone="blue" title="📍 Minimap (Bottom Left)">
                            <p className="text-tutor-navy/85">
                                Shows you, NPCs, and collectibles color-coded by
                                rarity
                            </p>
                        </InfoCard>
                        <InfoCard tone="green" title="📊 Player Card (Top Left)">
                            <p className="text-tutor-navy/85">
                                Your name, level, title, badge count, coins &
                                points
                            </p>
                        </InfoCard>
                        <InfoCard tone="purple" title="⚡ Quick Actions (Top Right)">
                            <p className="text-tutor-navy/85">
                                Quest Log, Shop, Daily Challenges, Secret Quests
                                & Menu
                            </p>
                        </InfoCard>
                        <InfoCard tone="yellow" title="🎒 Inventory">
                            <p>
                                Check your coins, items, XP, rank & accuracy
                                (press I, or find it in the pause menu)
                            </p>
                        </InfoCard>
                        <InfoCard tone="cream" title="🧭 Pause Menu">
                            <p>
                                Press ESC for Resume, Inventory, Shop, Daily,
                                Secrets, Leaderboard & Quick Map Navigation
                            </p>
                        </InfoCard>
                        <InfoCard tone="orange" title="🏆 Leaderboard">
                            <p>
                                Compare scores globally and track your ranking
                            </p>
                        </InfoCard>
                    </div>
                </div>
            ),
        },
        {
            id: 8,
            title: "Tips & Strategies",
            icon: "💡",
            content: (
                <div className="space-y-4">
                    <h3 className="text-center font-brutal text-xl uppercase tracking-wide text-tutor-navy">
                        Pro Tips 💡
                    </h3>

                    <InfoCard tone="blue" title="📚 Math Tips:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Read problems carefully
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Use hints, formulas & step-by-step solutions
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Answer fast for time bonuses
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Keep your accuracy nice and high to level up
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="green" title="🗺️ Exploration Tips:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Talk to every NPC (✓ = done, 🔒 = not yet)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Explore every corner for hidden collectibles
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Follow the colored dots on the minimap
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Hunt the secret quests!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="purple" title="⚡ Efficiency Tips:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Finish missions in order to unlock the next map
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Save coins for the items you really want
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Do the daily challenges for bonus coins
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Take breaks when needed!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="yellow">
                        <p className="text-center font-brutal text-sm uppercase">
                            🌟 Remember: It's about learning, not just winning!
                            🌟
                        </p>
                    </InfoCard>
                </div>
            ),
        },
    ];

    const handleNext = () => {
        if (currentSection < tutorialSections.length - 1) {
            setCurrentSection(currentSection + 1);
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleComplete = () => {
        if (dontShowAgain) {
            localStorage.setItem("mathtuto-tutorial-completed", "true");
            localStorage.setItem("mathtuto-tutorial-show-on-start", "false");
        }
        onClose();
    };

    const handleSkip = () => {
        if (
            window.confirm(
                "Are you sure you want to skip the tutorial? You can always access it later from the main menu.",
            )
        ) {
            handleComplete();
        }
    };

    if (!isVisible) return null;

    const currentTutorial = tutorialSections[currentSection];
    const progress = ((currentSection + 1) / tutorialSections.length) * 100;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-0 sm:p-4">
                {/* MathTuto game window: navy outer frame, yellow inner frame.
                    On mobile the card is a full-height sheet so the content
                    scroll area gets all the leftover viewport space. */}
                <section className="relative flex h-[100dvh] w-full flex-col rounded-none sm:h-auto sm:max-h-[calc(100dvh-20px)] sm:rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1 sm:p-1.5 max-w-full min-[400px]:max-w-3xl animate-slide-up shadow-[8px_8px_0_0_#071B3A]">
                    <div className="flex min-h-0 flex-1 flex-col gap-2 sm:gap-3 rounded-[10px] sm:rounded-[14px] border-2 border-tutor-yellow px-2.5 py-2 sm:px-4 sm:py-4">
                        {/* Close / Skip Button */}
                        <button
                            onClick={handleSkip}
                            type="button"
                            aria-label="Skip tutorial"
                            className="absolute right-2.5 top-2.5 z-20 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                        >
                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>

                        {/* Header — compact one-row layout on mobile */}
                        <div className="flex items-center justify-between gap-2 sm:block sm:text-center">
                            <div className="flex items-center gap-2 sm:flex-col sm:gap-2">
                                <div className="flex h-9 w-9 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border-[3px] border-tutor-navy bg-tutor-yellow text-xl sm:text-3xl shadow-[3px_3px_0_0_#071B3A]">
                                    {currentTutorial.icon}
                                </div>
                                <div>
                                    <h2 className="font-brutal text-lg sm:text-2xl md:text-3xl uppercase leading-tight tracking-wide text-tutor-navy">
                                        How to Play
                                    </h2>
                                    <div className="mt-0.5 hidden items-center justify-center gap-2 sm:flex">
                                        <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                        <Star
                                            className="h-4 w-4 text-tutor-yellow"
                                            fill={YELLOW}
                                        />
                                        <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                    </div>
                                </div>
                            </div>
                            <p className="inline-flex items-center gap-1.5 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-2.5 py-1 sm:px-3 sm:py-1 font-playful text-[10px] sm:text-xs font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A]">
                                {currentTutorial.title}
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 sm:h-2.5 w-full overflow-hidden rounded-full border-2 border-tutor-navy bg-[#E5DCC9]">
                            <div
                                className="h-full rounded-full bg-tutor-green transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        {/* Section Navigation */}
                        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                            {tutorialSections.map((section, index) => {
                                const active = currentSection === index;
                                return (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => setCurrentSection(index)}
                                        className={`flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-lg border-[3px] whitespace-nowrap px-2.5 py-1.5 font-playful text-xs font-bold uppercase transition-all duration-150 ${
                                            active
                                                ? "-translate-y-0.5 border-tutor-navy bg-tutor-navy text-tutor-cream shadow-[0_0_0_3px_#FFD84D,3px_3px_0_0_#071B3A]"
                                                : "border-tutor-navy bg-tutor-cream text-tutor-navy opacity-80 shadow-[2px_2px_0_0_#071B3A] hover:-translate-y-0.5 hover:opacity-100"
                                        }`}
                                    >
                                        <span className="text-sm">
                                            {section.icon}
                                        </span>
                                        <span className="hidden sm:inline">
                                            {section.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content Area */}
                        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto rounded-xl border-2 border-tutor-navy bg-[#F3EBDD] p-3 custom-scrollbar sm:p-5">
                            {currentTutorial.content}
                        </div>

                        {/* Footer */}
                        <div>
                            {/* Don't Show Again Checkbox (only for auto-start) */}
                            {autoStart && (
                                <div className="mb-3 flex items-center justify-center">
                                    <label className="flex min-h-[44px] cursor-pointer select-none items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={dontShowAgain}
                                            onChange={(e) =>
                                                setDontShowAgain(
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-5 w-5 cursor-pointer rounded accent-tutor-orange"
                                        />
                                        <span className="font-playful text-sm font-bold text-tutor-navy">
                                            Don't show this tutorial again
                                        </span>
                                    </label>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between gap-3">
                                <button
                                    onClick={handlePrevious}
                                    type="button"
                                    disabled={currentSection === 0}
                                    className="flex min-h-[44px] items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-cream px-4 py-2.5 font-brutal text-xs uppercase tracking-wide text-tutor-navy shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_0_#071B3A]"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Previous
                                </button>

                                <div className="font-brutal text-sm text-tutor-navy">
                                    {currentSection + 1} /{" "}
                                    {tutorialSections.length}
                                </div>

                                {currentSection <
                                tutorialSections.length - 1 ? (
                                    <button
                                        onClick={handleNext}
                                        type="button"
className="flex min-h-[44px] items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-4 py-2.5 font-brutal text-xs uppercase tracking-wider text-tutor-cream shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[5px_5px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                        >
                                        Next
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleComplete}
                                        type="button"
                                        className="flex min-h-[44px] items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-green px-4 py-2.5 font-brutal text-xs uppercase tracking-wider text-tutor-cream shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[5px_5px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                    >
                                        <Check className="h-4 w-4" />
                                        Got It!
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

