import React, { useState, useEffect } from "react";

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    steps?: string[]; // Step-by-step solution
    formula?: string; // Mathematical formula
    hints?: string[]; // Progressive hints
}

interface EnhancedQuizSystemProps {
    question: QuizQuestion;
    onAnswer: (isCorrect: boolean) => void;
    onClose: () => void;
    missionId?: string;
    level?: number; // 1 for Barangay, 2 for City
}

export const EnhancedQuizSystem: React.FC<EnhancedQuizSystemProps> = ({
    question,
    onAnswer,
    onClose,
    missionId,
    level = 1,
}) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [submissionTime, setSubmissionTime] = useState<number>(0);
    const [startTime] = useState<number>(Date.now());
    const [showHints, setShowHints] = useState(false);
    const [currentHintLevel, setCurrentHintLevel] = useState(0);
    const [showFormula, setShowFormula] = useState(false);

    // Timer system
    const QUIZ_TIME_LIMIT = 60;
    const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME_LIMIT);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [timeBonus, setTimeBonus] = useState(0);

    // Level-based colors
    const levelColors = level === 1 ? {
        primary: "level1-primary",
        secondary: "level1-secondary",
        light: "level1-light",
        gradient: "from-level1-primary to-level1-secondary",
    } : {
        primary: "level2-primary",
        secondary: "level2-secondary",
        light: "level2-light",
        gradient: "from-level2-primary to-level2-accent",
    };

    // Countdown timer effect
    useEffect(() => {
        if (!isTimerRunning || showResult) return;

        const timerInterval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
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

    const calculateTimeBonus = (remainingTime: number): number => {
        if (remainingTime >= 50) return 30; // Excellent!
        if (remainingTime >= 40) return 20; // Great!
        if (remainingTime >= 30) return 10; // Good!
        return 0;
    };

    const handleTimeUp = () => {
        setIsCorrect(false);
        setSubmissionTime(QUIZ_TIME_LIMIT);
        setShowResult(true);
        setTimeBonus(0);
        onAnswer(false);
    };

    const handleOptionSelect = (index: number) => {
        if (!showResult) {
            setSelectedOption(index);
        }
    };

    const handleSubmit = () => {
        if (selectedOption !== null) {
            setIsTimerRunning(false);
            const correct = selectedOption === question.correctAnswer;
            const timeSpent = (Date.now() - startTime) / 1000;
            const bonus = correct ? calculateTimeBonus(timeRemaining) : 0;
            setTimeBonus(bonus);
            setIsCorrect(correct);
            setSubmissionTime(timeSpent);
            setShowResult(true);
            onAnswer(correct);
        }
    };

    const handleNext = () => {
        onClose();
    };

    const handleShowHint = () => {
        setShowHints(true);
        if (currentHintLevel < (question.hints?.length || 0) - 1) {
            setCurrentHintLevel(currentHintLevel + 1);
        }
    };

    const getTimerColor = () => {
        if (timeRemaining <= 10) return "text-error animate-pulse";
        if (timeRemaining <= 20) return "text-warning";
        if (timeRemaining <= 30) return "text-math-orange";
        return "text-success";
    };

    const getTimerBgColor = () => {
        if (timeRemaining <= 10) return "bg-brutal-red";
        if (timeRemaining <= 20) return "bg-brutal-orange";
        if (timeRemaining <= 30) return "bg-brutal-yellow";
        return "bg-brutal-green";
    };

    const getProgressBarColor = () => {
        if (timeRemaining <= 10) return "bg-error";
        if (timeRemaining <= 20) return "bg-warning";
        if (timeRemaining <= 30) return "bg-math-orange";
        return "bg-success";
    };

    const timePercentage = (timeRemaining / QUIZ_TIME_LIMIT) * 100;

    return (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl mx-2 sm:mx-4 max-h-[95vh] overflow-y-auto custom-scrollbar">
                {/* Neobrutalist Quiz Container (level-tinted outer frame) */}
                <div className={`${level === 1 ? "bg-brutal-orange" : "bg-brutal-blue"} rounded-none p-1.5 shadow-brutal-xl border-4 border-black`}>
                    <div className="bg-brutal-bg rounded-none p-4 sm:p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-black rounded-none px-4 py-2 border-2 border-black shadow-brutal-xs">
                                    <span className="text-white font-bold text-sm font-heading">
                                        MISSION #{missionId}
                                    </span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-heading font-black text-gray-900">
                                    📝 MATH CHALLENGE
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white brutal-press"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Timer Display */}
                        {!showResult && (
                            <div className={`mb-4 p-4 rounded-none border-[3px] border-black ${getTimerBgColor()} transition-all duration-300 shadow-brutal-sm`}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-3xl">⏱️</span>
                                        <span className={`text-3xl font-bold font-math ${getTimerColor()}`}>
                                            {timeRemaining}s
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">
                                        {timeRemaining <= 10 ? "⚠️ HURRY!" : timeRemaining <= 20 ? "⏰ Time Running Out!" : "💪 You Got This!"}
                                    </div>
                                </div>
                                <div className="w-full bg-white h-3 border-2 border-black overflow-hidden">
                                    <div
                                        className={`h-full ${getProgressBarColor()} transition-all duration-1000 ease-linear`}
                                        style={{ width: `${timePercentage}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Question Card */}
                        <div className="mb-6">
                            <div className={`${level === 1 ? "bg-brutal-yellow" : "bg-brutal-blue"} border-[3px] border-black rounded-none p-6 shadow-brutal-sm`}>
                                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                                    <span className="text-2xl">❓</span>
                                    <span>Question:</span>
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-body">
                                    {question.question}
                                </p>
                            </div>
                        </div>

                        {/* Help Section (Hints & Formula) */}
                        {!showResult && (question.hints || question.formula) && (
                            <div className="mb-4 space-y-2">
                                {question.formula && (
                                    <button
                                        onClick={() => setShowFormula(!showFormula)}
                                        className="w-full bg-white hover:bg-brutal-bg border-[3px] border-black shadow-brutal-sm rounded-none p-3 transition-all duration-150 flex items-center justify-between brutal-press"
                                    >
                                        <span className="flex items-center space-x-2 font-semibold text-info">
                                            <span className="text-xl">📐</span>
                                            <span>Show Formula</span>
                                        </span>
                                        <span className="text-info">{showFormula ? "▼" : "▶"}</span>
                                    </button>
                                )}
                                {showFormula && question.formula && (
                                    <div className="bg-white border-[3px] border-black rounded-none p-4 animate-slide-down shadow-brutal-sm">
                                        <code className="text-info font-math text-lg block text-center">
                                            {question.formula}
                                        </code>
                                    </div>
                                )}
                                {question.hints && question.hints.length > 0 && (
                                    <button
                                        onClick={handleShowHint}
                                        disabled={currentHintLevel >= question.hints.length - 1 && showHints}
                                        className="w-full bg-white hover:bg-brutal-bg border-[3px] border-black shadow-brutal-sm rounded-none p-3 transition-all duration-150 flex items-center justify-between disabled:opacity-50 brutal-press"
                                    >
                                        <span className="flex items-center space-x-2 font-semibold text-warning">
                                            <span className="text-xl">💡</span>
                                            <span>Get a Hint</span>
                                        </span>
                                        <span className="text-xs text-warning">
                                            ({currentHintLevel + 1}/{question.hints.length})
                                        </span>
                                    </button>
                                )}
                                {showHints && question.hints && (
                                    <div className="space-y-2 animate-slide-down">
                                        {question.hints.slice(0, currentHintLevel + 1).map((hint, idx) => (
                                            <div key={idx} className="bg-brutal-yellow border-2 border-black rounded-none p-3">
                                                <div className="flex items-start space-x-2">
                                                    <span className="text-warning font-bold text-sm">Hint {idx + 1}:</span>
                                                    <span className="text-gray-700 text-sm">{hint}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {question.options.map((option, index) => {
                                let optionClass = "p-4 rounded-none border-[3px] border-black shadow-brutal-sm transition-all duration-150 cursor-pointer ";

                                if (showResult) {
                                    if (index === question.correctAnswer) {
                                        optionClass += "bg-brutal-green text-black";
                                    } else if (index === selectedOption && !isCorrect) {
                                        optionClass += "bg-brutal-red text-white";
                                    } else {
                                        optionClass += "bg-white text-gray-500 opacity-60";
                                    }
                                } else {
                                    optionClass += selectedOption === index
                                        ? "bg-brutal-blue text-black"
                                        : "bg-white hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        disabled={showResult}
                                        className={optionClass}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 rounded-none border-2 border-black mr-3 flex items-center justify-center font-bold flex-shrink-0 transition-all duration-150 ${
                                                showResult
                                                    ? index === question.correctAnswer
                                                        ? "bg-brutal-green text-black"
                                                        : index === selectedOption && !isCorrect
                                                        ? "bg-brutal-red text-white"
                                                        : "bg-gray-300 text-gray-500"
                                                    : selectedOption === index
                                                    ? "bg-black text-white"
                                                    : "bg-white text-black"
                                            }`}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <span className={`font-medium text-base transition-all duration-200 ${
                                                selectedOption === index && !showResult ? "text-black font-bold" : "text-gray-800"
                                            }`}>{option}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Result Section with Step-by-Step Solution */}
                        {showResult && (
                            <div className={`rounded-none mb-4 border-[3px] border-black p-6 shadow-brutal ${
                                isCorrect ? "bg-green-100" : "bg-red-100"
                            }`}>
                                <div className="flex items-center mb-4">
                                    <div className={`text-4xl mr-3 ${isCorrect ? "text-success" : "text-error"}`}>
                                        {isCorrect ? "🎉" : "❌"}
                                    </div>
                                    <div>
                                        <h4 className={`text-2xl font-bold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                                            {isCorrect ? "Excellent!" : "Not Quite!"}
                                        </h4>
                                        <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                                            {isCorrect
                                                ? timeBonus > 0
                                                    ? `Amazing! Speed bonus: +${timeBonus} points!`
                                                    : "Great job solving the problem!"
                                                : "Let's learn from this together!"}
                                        </p>
                                    </div>
                                </div>

                                {/* Step-by-Step Solution */}
                                {question.steps && (
                                    <div className="bg-white rounded-none p-4 border-[3px] border-black mb-4 shadow-brutal-sm">
                                        <h5 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                                            <span className="text-xl">📝</span>
                                            <span>Step-by-Step Solution:</span>
                                        </h5>
                                        <ol className="space-y-2">
                                            {question.steps.map((step, idx) => (
                                                <li key={idx} className="flex items-start space-x-3">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-none border-2 border-black bg-black text-white flex items-center justify-center text-xs font-bold">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="text-gray-700 font-body">{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}

                                {/* Explanation */}
                                <div className="bg-brutal-yellow p-4 rounded-none border-[3px] border-black">
                                    <h5 className="font-bold text-amber-800 mb-2 flex items-center space-x-2">
                                        <span className="text-xl">💡</span>
                                        <span>Key Concept:</span>
                                    </h5>
                                    <p className="text-amber-700 font-body">{question.explanation}</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-4">
                            {!showResult ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={selectedOption === null}
                                    className="bg-brutal-orange border-[3px] border-black text-white font-bold rounded-none shadow-brutal transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-x-1 active:translate-y-1 active:shadow-none"
                                >
                                    <span className="text-xl">📤</span>
                                    <span>Submit Answer</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="bg-brutal-orange border-[3px] border-black text-white font-bold rounded-none shadow-brutal transition-all duration-150 flex items-center space-x-2 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-x-1 active:translate-y-1 active:shadow-none"
                                >
                                    <span className="text-xl">➡️</span>
                                    <span>Continue</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
