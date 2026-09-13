import React, { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, Check, Star } from "lucide-react";

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

/** Colored info-card used across the tutorial content. */
type Tone =
    | "yellow"
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "red"
    | "cream";

const TONE_CLASSES: Record<Tone, string> = {
    yellow: "bg-tutor-yellow text-tutor-navy",
    blue: "bg-tutor-blue text-tutor-cream",
    green: "bg-tutor-green text-tutor-cream",
    purple: "bg-tutor-purple text-tutor-cream",
    orange: "bg-tutor-orange text-tutor-cream",
    red: "bg-tutor-red text-tutor-cream",
    cream: "bg-tutor-cream text-tutor-navy",
};

const InfoCard: React.FC<{
    tone: Tone;
    title?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}> = ({ tone, title, children, className = "" }) => (
    <div
        className={`rounded-xl border-2 border-tutor-navy p-4 shadow-[3px_3px_0_0_#071B3A] ${TONE_CLASSES[tone]} ${className}`}
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
        const completed = localStorage.getItem("civika-tutorial-completed");
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
                        Welcome to Tutor Town! 🌟
                    </h3>
                    <p className="text-center font-playful text-sm leading-relaxed text-tutor-navy">
                        You're a new math tutor in town! Help students master
                        radicals and inverse functions as you build your
                        tutoring reputation.
                    </p>

                    <InfoCard tone="blue" title="📚 Your Mission:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Complete 50 math challenges
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Progress from Barangay to National level
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Master radicals & inverse functions
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Become a problem-solving expert!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="yellow" title="🎯 What You'll Teach:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Basic arithmetic to advanced algebra
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                How to simplify and solve radicals
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                How to find and use inverse functions
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Critical thinking skills
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

                    <InfoCard tone="green" title="🎥 Camera:">
                        <p>
                            The camera automatically follows your character as
                            you explore the map. Feel free to walk around and
                            discover new areas!
                        </p>
                    </InfoCard>

                    <InfoCard tone="blue" className="p-3">
                        <p>
                            💡 <strong className="font-bold">Tip:</strong> Walk
                            around to discover NPCs and collectibles scattered
                            throughout the map!
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
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">❗</span>
                            <div>
                                <p className="font-bold">Active Mission</p>
                                <p className="text-tutor-navy/70">
                                    NPCs with "!" have math challenges for you
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">✅</span>
                            <div>
                                <p className="font-bold">Completed Mission</p>
                                <p className="text-tutor-navy/70">
                                    You've already helped this NPC
                                </p>
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard tone="blue" title="How to Interact:">
                        <ol className="list-inside list-decimal space-y-1.5">
                            <li>Walk close to an NPC</li>
                            <li>
                                Press <strong className="font-bold">E</strong>{" "}
                                key (or tap on mobile)
                            </li>
                            <li>Read their story and problem</li>
                            <li>Accept the challenge!</li>
                        </ol>
                    </InfoCard>

                    <InfoCard tone="purple" className="p-3">
                        <p>
                            🎯{" "}
                            <strong className="font-bold">Fun Fact:</strong>{" "}
                            Each NPC represents a different profession and
                            teaches unique math concepts!
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
                                Multiple choice questions (4 options)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Only one correct answer
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Take your time to think!
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                No time limit - focus on learning
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="blue" title="🔍 Help Available:">
                        <div className="space-y-2">
                            <div className="rounded-lg border-2 border-tutor-navy bg-tutor-cream px-3 py-2">
                                <span className="font-bold">💡 Hints:</span>{" "}
                                Click for problem-solving tips
                            </div>
                            <div className="rounded-lg border-2 border-tutor-navy bg-tutor-cream px-3 py-2">
                                <span className="font-bold">📖 Formula:</span>{" "}
                                See the mathematical formula
                            </div>
                            <div className="rounded-lg border-2 border-tutor-navy bg-tutor-cream px-3 py-2">
                                <span className="font-bold">📝 Steps:</span>{" "}
                                View step-by-step solution
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard tone="yellow" title="✅ After Answering:">
                        <p>
                            <strong className="font-bold">Correct:</strong>{" "}
                            Earn coins and XP! 🎉
                            <br />
                            <strong className="font-bold">Incorrect:</strong>{" "}
                            See explanation and try again
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
                        <InfoCard tone="green" title="🏘️ Level 1: BARANGAY">
                            <p className="text-tutor-cream/85">
                                Missions 1-10 • Community tutoring in the
                                barangay
                            </p>
                        </InfoCard>
                        <InfoCard tone="blue" title="🏙️ Level 2: CITY">
                            <p className="text-tutor-cream/85">
                                Missions 11-20 • City tutoring for high school
                                students
                            </p>
                        </InfoCard>
                        <InfoCard tone="purple" title="🏛️ Level 3: PROVINCE">
                            <p className="text-tutor-cream/85">
                                Missions 21-30 • Provincial scholarship
                                coaching
                            </p>
                        </InfoCard>
                        <InfoCard tone="orange" title="🌏 Level 4: REGION">
                            <p className="text-tutor-cream/85">
                                Missions 31-40 • Regional math competition
                                training
                            </p>
                        </InfoCard>
                        <InfoCard tone="red" title="🇵🇭 Level 5: NATIONAL">
                            <p className="text-tutor-cream/85">
                                Missions 41-50 • National Olympiad mentoring
                            </p>
                        </InfoCard>
                    </div>

                    <InfoCard tone="blue" className="p-3">
                        <p className="text-center">
                            🎯 Complete all missions in a level to unlock the
                            next!
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
                                Earned by completing missions
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Used to buy items in the shop
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Bonus for perfect scores!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="purple" title="🏆 Badges:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Unlock achievements
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Show your progress
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Collect them all!
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="blue" title="🛒 Shop:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Buy power-ups and items
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Customize your character
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Unlock special features
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="green" title="🎯 Secret Quests:">
                        <p>
                            Hidden challenges throughout the map with extra
                            rewards for explorers!
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
                        <InfoCard tone="blue" title="📍 Minimap (Top Right)">
                            <p className="text-tutor-cream/85">
                                Shows your location, NPCs, and collectibles
                                nearby
                            </p>
                        </InfoCard>
                        <InfoCard tone="green" title="📊 Stats Display">
                            <p className="text-tutor-cream/85">
                                💰 Coins • 🏆 Badges • 📈 Level Progress
                            </p>
                        </InfoCard>
                        <InfoCard tone="purple" title="🎒 Inventory">
                            <p className="text-tutor-cream/85">
                                View collected items and check your progress
                            </p>
                        </InfoCard>
                        <InfoCard tone="yellow" title="🏆 Leaderboard">
                            <p>
                                Compare scores globally and track your ranking
                            </p>
                        </InfoCard>
                        <InfoCard tone="cream" title="⚙️ Settings">
                            <p>
                                Adjust audio, graphics, controls, and tutorials
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
                                Use hints when stuck
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Review step-by-step solutions
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Practice similar problems
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="green" title="🗺️ Exploration Tips:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Talk to all NPCs
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Explore every corner
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Look for hidden collectibles
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Complete secret quests
                            </li>
                        </ul>
                    </InfoCard>

                    <InfoCard tone="purple" title="⚡ Efficiency Tips:">
                        <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Complete missions in order
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Save coins for useful items
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Review formulas regularly
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">✓</span>
                                Take breaks when needed
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
            localStorage.setItem("civika-tutorial-completed", "true");
            localStorage.setItem("civika-tutorial-show-on-start", "false");
        }
        onClose();
    };

    const handleSkip = () => {
        if (
            window.confirm(
                "Are you sure you want to skip the tutorial? You can always access it later from the main menu."
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
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                <section className="relative w-full max-w-3xl animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                    <div className="flex max-h-[90vh] flex-col gap-4 rounded-[14px] border-2 border-tutor-yellow px-5 py-5 sm:px-7">
                        {/* Close / Skip Button */}
                        <button
                            onClick={handleSkip}
                            type="button"
                            aria-label="Skip tutorial"
                            className="absolute right-2.5 top-2.5 z-20 flex h-10 w-10 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Header */}
                        <div className="text-center">
                            <div className="mx-auto mb-2.5 flex h-16 w-16 items-center justify-center rounded-2xl border-[3px] border-tutor-navy bg-tutor-yellow text-3xl shadow-[3px_3px_0_0_#071B3A]">
                                {currentTutorial.icon}
                            </div>
                            <h2 className="font-brutal text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                                How to Play
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
                                {currentTutorial.title}
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2.5 w-full overflow-hidden rounded-full border-2 border-tutor-navy bg-[#E5DCC9]">
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
                                        onClick={() =>
                                            setCurrentSection(index)
                                        }
                                        className={`flex shrink-0 items-center gap-1.5 rounded-lg border-[3px] whitespace-nowrap px-2.5 py-1.5 font-playful text-xs font-bold uppercase transition-all duration-150 ${
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
                        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto rounded-xl border-2 border-tutor-navy bg-[#F3EBDD] p-4 custom-scrollbar sm:p-5">
                            {currentTutorial.content}
                        </div>

                        {/* Footer */}
                        <div>
                            {/* Don't Show Again Checkbox (only for auto-start) */}
                            {autoStart && (
                                <div className="mb-3 flex items-center justify-center">
                                    <label className="flex cursor-pointer select-none items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={dontShowAgain}
                                            onChange={(e) =>
                                                setDontShowAgain(
                                                    e.target.checked
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
                                    className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-cream px-4 py-2.5 font-brutal text-xs uppercase tracking-wide text-tutor-navy shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_0_#071B3A]"
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
                                        className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-4 py-2.5 font-brutal text-xs uppercase tracking-wider text-tutor-cream shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[5px_5px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                    >
                                        Next
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleComplete}
                                        type="button"
                                        className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-green px-4 py-2.5 font-brutal text-xs uppercase tracking-wider text-tutor-cream shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[5px_5px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
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