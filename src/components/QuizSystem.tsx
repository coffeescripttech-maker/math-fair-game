import React, { useState, useEffect } from "react";

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface QuizSystemProps {
    question: QuizQuestion;
    onAnswer: (isCorrect: boolean) => void;
    onClose: () => void;
    missionId?: string;
}

export const QuizSystem: React.FC<QuizSystemProps> = ({
    question,
    onAnswer,
    onClose,
    missionId,
}) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [submissionTime, setSubmissionTime] = useState<number>(0);
    const [startTime] = useState<number>(Date.now());

    // Timer system
    const QUIZ_TIME_LIMIT = 60; // 60 seconds per quiz
    const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME_LIMIT);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [timeBonus, setTimeBonus] = useState(0);

    // Countdown timer effect
    useEffect(() => {
        if (!isTimerRunning || showResult) return;

        const timerInterval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    // Time's up! Auto-submit or fail
                    clearInterval(timerInterval);
                    setIsTimerRunning(false);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [isTimerRunning, showResult]);

    // Calculate time bonus based on remaining time
    const calculateTimeBonus = (remainingTime: number): number => {
        if (remainingTime >= 50) return 30; // Answered in 10s or less - Excellent!
        if (remainingTime >= 40) return 20; // Answered in 20s or less - Great!
        if (remainingTime >= 30) return 10; // Answered in 30s or less - Good!
        return 0; // No bonus
    };

    const handleTimeUp = () => {
        // Time ran out - auto-fail
        setIsCorrect(false);
        setSubmissionTime(QUIZ_TIME_LIMIT);
        setShowResult(true);
        setTimeBonus(0);

        console.log("Quiz time expired - auto-failed");
        onAnswer(false);
    };

    const handleOptionSelect = (index: number) => {
        if (!showResult) {
            setSelectedOption(index);
        }
    };

    const handleSubmit = () => {
        if (selectedOption !== null) {
            // Stop the timer
            setIsTimerRunning(false);

            const correct = selectedOption === question.correctAnswer;
            const timeSpent = (Date.now() - startTime) / 1000;

            // Calculate time bonus
            const bonus = correct ? calculateTimeBonus(timeRemaining) : 0;
            setTimeBonus(bonus);

            setIsCorrect(correct);
            setSubmissionTime(timeSpent);
            setShowResult(true);

            // Provide detailed feedback
            console.log("Quiz submission:", {
                missionId,
                selectedOption,
                correctAnswer: question.correctAnswer,
                isCorrect: correct,
                timeSpent: Math.round(timeSpent),
                timeRemaining,
                timeBonus: bonus,
            });

            onAnswer(correct);
        }
    };

    const handleNext = () => {
        onClose();
    };

    // Helper function to get timer color based on time remaining
    const getTimerColor = () => {
        if (timeRemaining <= 10) return "text-red-600 animate-pulse";
        if (timeRemaining <= 20) return "text-orange-600";
        if (timeRemaining <= 30) return "text-yellow-600";
        return "text-green-600";
    };

    // Helper function to get timer background color (flat neobrutalist pastels)
    const getTimerBgColor = () => {
        if (timeRemaining <= 10) return "bg-brutal-red";
        if (timeRemaining <= 20) return "bg-brutal-orange";
        if (timeRemaining <= 30) return "bg-brutal-yellow";
        return "bg-brutal-green";
    };

    // Helper function to get progress bar color
    const getProgressBarColor = () => {
        if (timeRemaining <= 10) return "bg-red-600";
        if (timeRemaining <= 20) return "bg-orange-500";
        if (timeRemaining <= 30) return "bg-yellow-500";
        return "bg-green-500";
    };

    const timePercentage = (timeRemaining / QUIZ_TIME_LIMIT) * 100;

    return (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="w-full max-w-sm sm:max-w-lg lg:max-w-2xl mx-2 sm:mx-4 max-h-[95vh] overflow-y-auto">
                {/* Neobrutalist Quiz System Container */}
                <div className="brutal-panel p-3 sm:p-6 relative">
                        {/* Timer Display - Prominent */}
                        {!showResult && (
                            <div
                                className={`mb-4 p-3 sm:p-4 rounded-none border-[3px] border-black shadow-brutal-sm ${getTimerBgColor()} transition-all duration-300`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl sm:text-3xl">
                                            ⏱️
                                        </span>
                                        <span
                                            className={`text-xl sm:text-3xl font-bold ${getTimerColor()} transition-colors duration-300`}
                                        >
                                            {timeRemaining}s
                                        </span>
                                    </div>
                                    <div className="text-xs sm:text-sm font-semibold text-gray-800">
                                        {timeRemaining <= 10
                                            ? "⚠️ HURRY!"
                                            : timeRemaining <= 20
                                            ? "⏰ Time Running Out!"
                                            : timeRemaining <= 30
                                            ? "⏳ Keep Going!"
                                            : "💪 You Got This!"}
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-white h-2 sm:h-3 border-2 border-black overflow-hidden">
                                    <div
                                        className={`h-full ${getProgressBarColor()} transition-all duration-1000 ease-linear`}
                                        style={{ width: `${timePercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-2xl font-black text-gray-900">
                                📝 MATH CHALLENGE
                            </h2>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white text-sm sm:text-base brutal-press"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Question */}
                        <div className="mb-4 sm:mb-6">
                            <div className="rounded-none border-[3px] border-black p-3 sm:p-4 bg-brutal-yellow shadow-brutal-sm">
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 flex items-center space-x-1 sm:space-x-2">
                                    <span>❓</span>
                                    <span>Question:</span>
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                    {question.question}
                                </p>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            {question.options.map((option, index) => {
                                let optionClass =
                                    "p-2 sm:p-3 rounded-none border-[3px] border-black shadow-brutal-sm transition-all duration-150 cursor-pointer ";

                                if (showResult) {
                                    if (index === question.correctAnswer) {
                                        optionClass +=
                                            "bg-brutal-green text-black";
                                    } else if (
                                        index === selectedOption &&
                                        !isCorrect
                                    ) {
                                        optionClass +=
                                            "bg-brutal-red text-white";
                                    } else {
                                        optionClass +=
                                            "bg-white opacity-60";
                                    }
                                } else {
                                    optionClass +=
                                        selectedOption === index
                                            ? "bg-brutal-blue text-black"
                                            : "bg-white hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleOptionSelect(index)
                                        }
                                        disabled={showResult}
                                        className={`w-full text-left ${optionClass}`}
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-none border-2 border-black mr-2 sm:mr-3 flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 ${
                                                    showResult
                                                        ? index ===
                                                          question.correctAnswer
                                                            ? "bg-brutal-green text-black"
                                                            : index ===
                                                                  selectedOption &&
                                                              !isCorrect
                                                            ? "bg-brutal-red text-white"
                                                            : "bg-gray-300 text-gray-600"
                                                        : selectedOption ===
                                                          index
                                                        ? "bg-black text-white"
                                                        : "bg-white text-black"
                                                }`}
                                            >
                                                {String.fromCharCode(
                                                    65 + index
                                                )}
                                            </div>
                                            <span className="font-medium text-sm sm:text-base text-gray-800">
                                                {option}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Result */}
                        {showResult && (
                            <div
                                className={`p-3 sm:p-4 rounded-none mb-3 sm:mb-4 border-[3px] border-black shadow-brutal-sm ${
                                    isCorrect ? "bg-green-100" : "bg-red-100"
                                }`}
                            >
                                <div className="flex items-center mb-2 sm:mb-3">
                                    <div
                                        className={`text-2xl sm:text-3xl mr-2 sm:mr-3 ${
                                            isCorrect
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {isCorrect ? "🎉" : "❌"}
                                    </div>
                                    <div>
                                        <h4
                                            className={`text-lg sm:text-xl font-bold ${
                                                isCorrect
                                                    ? "text-green-800"
                                                    : "text-red-800"
                                            }`}
                                        >
                                            {isCorrect
                                                ? "Correct!"
                                                : "Incorrect!"}
                                        </h4>
                                        <div className="space-y-1">
                                            <p
                                                className={`text-sm sm:text-base ${
                                                    isCorrect
                                                        ? "text-green-700"
                                                        : "text-red-700"
                                                }`}
                                            >
                                                {isCorrect
                                                    ? timeBonus > 0
                                                        ? `Excellent! You earned bonus points for quick thinking! +${timeBonus} time bonus!`
                                                        : "Great job! You earned points and coins!"
                                                    : timeRemaining === 0
                                                    ? "⏰ Time's up! The quiz failed due to timeout."
                                                    : `The correct answer was: ${
                                                          question.options[
                                                              question
                                                                  .correctAnswer
                                                          ]
                                                      }`}
                                            </p>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    ⏱️ Time Taken:{" "}
                                                    {Math.round(submissionTime)}
                                                    s / {QUIZ_TIME_LIMIT}s
                                                </p>
                                                {isCorrect && timeBonus > 0 && (
                                                    <p className="text-xs sm:text-sm text-green-600 font-bold flex items-center space-x-1">
                                                        <span>⚡</span>
                                                        <span>
                                                            Speed Bonus: +
                                                            {timeBonus} points!
                                                        </span>
                                                    </p>
                                                )}
                                                {isCorrect &&
                                                    timeBonus === 0 &&
                                                    timeRemaining > 0 && (
                                                        <p className="text-xs sm:text-sm text-amber-600">
                                                            💡 Tip: Answer
                                                            faster (within 30s)
                                                            for bonus points!
                                                        </p>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-2 sm:p-3 rounded-none border-2 border-black">
                                    <h5 className="font-bold text-amber-800 mb-2 text-sm sm:text-base">
                                        📚 Explanation:
                                    </h5>
                                    <p className="text-amber-700 text-sm sm:text-base">
                                        {question.explanation}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-2 sm:space-x-4">
                            {!showResult ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={selectedOption === null}
                                    className="game-button-frame px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                        <span>📤</span>
                                        <span>Submit Answer</span>
                                    </div>
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="game-button-frame px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold"
                                >
                                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                        <span>➡️</span>
                                        <span>Continue</span>
                                    </div>
                                </button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    );
};

