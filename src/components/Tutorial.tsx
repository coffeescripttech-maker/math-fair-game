import React, { useState, useEffect } from "react";

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
                    <h3 className="text-2xl font-brutal uppercase text-center text-gray-900">
                        Welcome to Tutor Town! 🌟
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        You're a new math tutor in town! Help students master radicals and inverse functions as you build your tutoring reputation.
                    </p>

                    <div className="bg-brutal-blue p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-2">
                            📚 Your Mission:
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                            <li>✓ Complete 50 math challenges</li>
                            <li>
                                ✓ Progress from Barangay to National level
                            </li>
                            <li>✓ Master radicals & inverse functions</li>
                            <li>✓ Become a problem-solving expert!</li>
                        </ul>
                    </div>

                    <div className="bg-brutal-yellow p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-2">
                            🎯 What You'll Teach:
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                            <li>✓ Basic arithmetic to advanced algebra</li>
                            <li>✓ How to simplify and solve radicals</li>
                            <li>✓ How to find and use inverse functions</li>
                            <li>✓ Critical thinking skills</li>
                        </ul>
                    </div>

                    <p className="text-center text-lg font-semibold text-blue-600">
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
                    <h3 className="text-2xl font-brutal uppercase text-center text-gray-900">
                        How to Move Around 🎮
                    </h3>

                    <div className="bg-brutal-purple p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            ⌨️ Keyboard Controls:
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <span className="font-bold text-gray-800">
                                    W or ↑
                                </span>
                                <p className="text-sm text-gray-600">
                                    Move Up
                                </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <span className="font-bold text-gray-800">
                                    S or ↓
                                </span>
                                <p className="text-sm text-gray-600">
                                    Move Down
                                </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <span className="font-bold text-gray-800">
                                    A or ←
                                </span>
                                <p className="text-sm text-gray-600">
                                    Move Left
                                </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <span className="font-bold text-gray-800">
                                    D or →
                                </span>
                                <p className="text-sm text-gray-600">
                                    Move Right
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-brutal-green p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-2">
                            🎥 Camera:
                        </h4>
                        <p className="text-gray-700">
                            The camera automatically follows your character as
                            you explore the map. Feel free to walk around and
                            discover new areas!
                        </p>
                    </div>

                    <div className="bg-brutal-blue p-3 rounded-none border-2 border-black">
                        <p className="text-sm text-gray-900">
                            💡 <strong>Tip:</strong> Walk around to discover
                            NPCs and collectibles scattered throughout the map!
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            title: "NPC Interaction",
            icon: "💬",
            content: (
                <div className="space-y-4">
                    <h3 className="text-2xl font-brutal uppercase text-center text-gray-900">
                        Talking to NPCs 💬
                    </h3>

                    <div className="bg-brutal-yellow p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            Finding Missions:
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <span className="text-3xl">❗</span>
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Active Mission
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        NPCs with "!" have math challenges for
                                        you
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-3xl">✅</span>
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Completed Mission
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        You've already helped this NPC
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-brutal-blue p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            How to Interact:
                        </h4>
                        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                            <li>Walk close to an NPC</li>
                            <li>Press <strong>E</strong> key (or tap on mobile)</li>
                            <li>Read their story and problem</li>
                            <li>Accept the challenge!</li>
                        </ol>
                    </div>

                    <div className="bg-brutal-purple p-3 rounded-none border-2 border-black">
                        <p className="text-sm text-gray-900">
                            🎯 <strong>Fun Fact:</strong> Each NPC represents a
                            different profession and teaches unique math
                            concepts!
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 4,
            title: "Quiz System",
            icon: "📝",
            content: (
                <div className="space-y-4">
                    <h3 className="text-2xl font-brutal uppercase text-center text-gray-900">
                        Solving Math Problems 📝
                    </h3>

                    <div className="bg-brutal-green p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            📋 Quiz Format:
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                            <li>✓ Multiple choice questions (4 options)</li>
                            <li>✓ Only one correct answer</li>
                            <li>✓ Take your time to think!</li>
                            <li>✓ No time limit - focus on learning</li>
                        </ul>
                    </div>

                    <div className="bg-brutal-blue p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            🔍 Help Available:
                        </h4>
                        <div className="space-y-2">
                            <div className="bg-white p-2 rounded-lg">
                                <span className="font-bold">💡 Hints:</span>{" "}
                                Click for problem-solving tips
                            </div>
                            <div className="bg-white p-2 rounded-lg">
                                <span className="font-bold">📖 Formula:</span>{" "}
                                See the mathematical formula
                            </div>
                            <div className="bg-white p-2 rounded-lg">
                                <span className="font-bold">📝 Steps:</span>{" "}
                                View step-by-step solution
                            </div>
                        </div>
                    </div>

                    <div className="bg-brutal-yellow p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-2">
                            ✅ After Answering:
                        </h4>
                        <p className="text-gray-700">
                            <strong>Correct:</strong> Earn coins and XP! 🎉
                            <br />
                            <strong>Incorrect:</strong> See explanation and try
                            again
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 5,
            title: "Game Progression",
            icon: "📈",
            content: (
                <div className="space-y-4">
                    <h3 className="text-2xl font-brutal uppercase text-center text-gray-900">
                        Leveling Up 📈
                    </h3>
                    <p className="text-center text-gray-600">
                        Your Tutoring Journey
                    </p>

                    <div className="space-y-3">
                        <div className="bg-brutal-green p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-gray-900">
                                🏘️ Level 1: BARANGAY
                            </h4>
                            <p className="text-sm text-gray-700">
                                Missions 1-10 • Community tutoring in the barangay
                            </p>
                        </div>

                        <div className="bg-brutal-blue p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-gray-900">
                                🏙️ Level 2: CITY
                            </h4>
                            <p className="text-sm text-gray-700">
                                Missions 11-20 • City tutoring for high school students
                            </p>
                        </div>

                        <div className="bg-brutal-purple p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-gray-900">
                                🏛️ Level 3: PROVINCE
                            </h4>
                            <p className="text-sm text-gray-700">
                                Missions 21-30 • Provincial scholarship coaching
                            </p>
                        </div>

                        <div className="bg-brutal-orange p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-orange-800">
                                🌏 Level 4: REGION
                            </h4>
                            <p className="text-sm text-gray-700">
                                Missions 31-40 • Regional math competition training
                            </p>
                        </div>

                        <div className="bg-brutal-red p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-white">
                                🇵🇭 Level 5: NATIONAL
                            </h4>
                            <p className="text-sm text-gray-700">
                                Missions 41-50 • National Olympiad mentoring
                            </p>
                        </div>
                    </div>

                    <div className="bg-brutal-blue p-3 rounded-none border-2 border-black">
                        <p className="text-sm text-gray-900 text-center">
                            🎯 Complete all missions in a level to unlock the
                            next!
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 6,
            title: "Rewards & Shop",
            icon: "🎁",
            content: (
                <div className="space-y-4">
                    <h3 className="text-2xl font-brutal uppercase text-center text-gray-900">
                        Collectibles & Rewards 🎁
                    </h3>

                    <div className="bg-brutal-yellow p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            💰 Coins:
                        </h4>
                        <ul className="space-y-1 text-gray-700 text-sm">
                            <li>✓ Earned by completing missions</li>
                            <li>✓ Used to buy items in the shop</li>
                            <li>✓ Bonus for perfect scores!</li>
                        </ul>
                    </div>

                    <div className="bg-brutal-purple p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            🏆 Badges:
                        </h4>
                        <ul className="space-y-1 text-gray-700 text-sm">
                            <li>✓ Unlock achievements</li>
                            <li>✓ Show your progress</li>
                            <li>✓ Collect them all!</li>
                        </ul>
                    </div>

                    <div className="bg-brutal-blue p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            🛒 Shop:
                        </h4>
                        <ul className="space-y-1 text-gray-700 text-sm">
                            <li>✓ Buy power-ups and items</li>
                            <li>✓ Customize your character</li>
                            <li>✓ Unlock special features</li>
                        </ul>
                    </div>

                    <div className="bg-brutal-green p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-3">
                            🎯 Secret Quests:
                        </h4>
                        <p className="text-gray-700 text-sm">
                            Hidden challenges throughout the map with extra
                            rewards for explorers!
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 7,
            title: "UI Elements",
            icon: "🗺️",
            content: (
                <div className="space-y-4">
                    <h3 className="text-2xl font-brutal uppercase text-center text-gray-900">
                        Understanding the Interface 🗺️
                    </h3>

                    <div className="space-y-3">
                        <div className="bg-brutal-blue p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-gray-900">
                                📍 Minimap (Top Right)
                            </h4>
                            <p className="text-sm text-gray-700">
                                Shows your location, NPCs, and collectibles
                                nearby
                            </p>
                        </div>

                        <div className="bg-brutal-green p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-gray-900">
                                📊 Stats Display
                            </h4>
                            <p className="text-sm text-gray-700">
                                💰 Coins • 🏆 Badges • 📈 Level Progress
                            </p>
                        </div>

                        <div className="bg-brutal-purple p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-gray-900">
                                🎒 Inventory
                            </h4>
                            <p className="text-sm text-gray-700">
                                View collected items and check your progress
                            </p>
                        </div>

                        <div className="bg-brutal-yellow p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-gray-900">
                                🏆 Leaderboard
                            </h4>
                            <p className="text-sm text-gray-700">
                                Compare scores globally and track your ranking
                            </p>
                        </div>

                        <div className="bg-white p-3 rounded-none border-2 border-black">
                            <h4 className="font-bold text-gray-800">
                                ⚙️ Settings
                            </h4>
                            <p className="text-sm text-gray-700">
                                Adjust audio, graphics, controls, and tutorials
                            </p>
                        </div>
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
                    <h3 className="text-2xl font-brutal uppercase text-center text-gray-900">
                        Pro Tips 💡
                    </h3>

                    <div className="bg-brutal-blue p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-2">
                            📚 Math Tips:
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>✓ Read problems carefully</li>
                            <li>✓ Use hints when stuck</li>
                            <li>✓ Review step-by-step solutions</li>
                            <li>✓ Practice similar problems</li>
                        </ul>
                    </div>

                    <div className="bg-brutal-green p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-2">
                            🗺️ Exploration Tips:
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>✓ Talk to all NPCs</li>
                            <li>✓ Explore every corner</li>
                            <li>✓ Look for hidden collectibles</li>
                            <li>✓ Complete secret quests</li>
                        </ul>
                    </div>

                    <div className="bg-brutal-purple p-4 rounded-none border-2 border-black">
                        <h4 className="font-bold text-gray-900 mb-2">
                            ⚡ Efficiency Tips:
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>✓ Complete missions in order</li>
                            <li>✓ Save coins for useful items</li>
                            <li>✓ Review formulas regularly</li>
                            <li>✓ Take breaks when needed</li>
                        </ul>
                    </div>

                    <div className="bg-brutal-yellow p-4 rounded-none border-2 border-black text-center">
                        <p className="text-gray-900 font-bold text-lg">
                            🌟 Remember: It's about learning, not just winning!
                            🌟
                        </p>
                    </div>
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center pointer-events-auto z-50 p-4">
            <div className="brutal-panel max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-brutal-yellow p-6 relative border-b-[3px] border-black">
                    <button
                        onClick={handleSkip}
                        className="absolute top-4 right-4 w-10 h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white brutal-press"
                    >
                        ✕
                    </button>
                    <div className="text-center">
                        <div className="text-4xl mb-2">
                            {currentTutorial.icon}
                        </div>
                        <h2 className="text-2xl font-brutal uppercase text-gray-900">How to Play</h2>
                        <p className="text-sm font-bold uppercase text-gray-800 mt-1">
                            {currentTutorial.title}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white h-2 border-b-2 border-black">
                    <div
                        className="bg-brutal-green h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Section Navigation */}
                <div className="bg-brutal-bg p-3 border-b-2 border-black overflow-x-auto">
                    <div className="flex space-x-2 min-w-max">
                        {tutorialSections.map((section, index) => (
                            <button
                                key={section.id}
                                onClick={() => setCurrentSection(index)}
                                className={`px-3 py-2 rounded-none border-2 border-black text-xs font-bold uppercase transition-all duration-150 whitespace-nowrap ${
                                    currentSection === index
                                        ? "bg-black text-white shadow-brutal-xs"
                                        : "bg-white text-gray-700 hover:bg-brutal-yellow"
                                }`}
                            >
                                <span className="mr-1">{section.icon}</span>
                                <span className="hidden sm:inline">
                                    {section.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {currentTutorial.content}
                </div>

                {/* Footer */}
                <div className="bg-brutal-bg p-4 border-t-2 border-black">
                    {/* Don't Show Again Checkbox (only for auto-start) */}
                    {autoStart && (
                        <div className="mb-3 flex items-center justify-center">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={dontShowAgain}
                                    onChange={(e) =>
                                        setDontShowAgain(e.target.checked)
                                    }
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-gray-700">
                                    Don't show this tutorial again
                                </span>
                            </label>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePrevious}
                            disabled={currentSection === 0}
                            className="px-4 py-2 bg-white border-2 border-black text-gray-800 rounded-none font-bold uppercase transition-all duration-150 brutal-press disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ◀ Previous
                        </button>

                        <div className="text-sm font-brutal text-gray-900">
                            {currentSection + 1} / {tutorialSections.length}
                        </div>

                        {currentSection < tutorialSections.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-brutal-orange border-[3px] border-black text-white rounded-none font-bold uppercase shadow-brutal-xs brutal-press"
                            >
                                Next ▶
                            </button>
                        ) : (
                            <button
                                onClick={handleComplete}
                                className="px-4 py-2 bg-brutal-green border-[3px] border-black text-black rounded-none font-bold uppercase shadow-brutal-xs brutal-press"
                            >
                                ✓ Got It!
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
