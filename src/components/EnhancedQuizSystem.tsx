import React, { useState, useEffect } from "react";
import {
    X,
    Timer,
    ClipboardList,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Lightbulb,
    BookOpen,
} from "lucide-react";

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

    // Timer band colors: solid tutor tones (cream text) except yellow (navy)
    const getTimerBgColor = () => {
        if (timeRemaining <= 10) return "bg-tutor-red";
        if (timeRemaining <= 20) return "bg-tutor-orange";
        if (timeRemaining <= 30) return "bg-tutor-yellow";
        return "bg-tutor-green";
    };

    const getTimerTextColor = () => {
        if (timeRemaining <= 30) return "text-tutor-navy";
        return "text-tutor-cream";
    };

    const getTimerMessage = () => {
        if (timeRemaining <= 10) return "⚠️ HURRY!";
        if (timeRemaining <= 20) return "⏰ Time Running Out!";
        return "💪 You Got This!";
    };

    const timePercentage = (timeRemaining / QUIZ_TIME_LIMIT) * 100;

    const isLevelOne = level === 1;
    // Level tint for the question card: yellow (level 1) vs blue (level 2+)
    const questionCardTint = isLevelOne
        ? "bg-tutor-yellow"
        : "bg-tutor-blue";

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
                {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl">
                    <section className="relative animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                        <div className="space-y-4 rounded-[14px] border-2 border-tutor-yellow px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-orange text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                        <ClipboardList className="h-4 w-4" />
                                    </span>
                                    <h2 className="truncate font-brutal text-base uppercase tracking-wide text-tutor-navy sm:text-xl">
                                        Math Challenge
                                    </h2>
                                    <span className="hidden shrink-0 rounded-lg border-2 border-tutor-navy bg-tutor-navy px-2 py-1 font-playful text-xs font-bold uppercase text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:inline-block">
                                        Mission #{missionId}
                                    </span>
                                    <span
                                        className={`hidden shrink-0 rounded-lg border-2 border-tutor-navy px-2 py-1 font-playful text-xs font-bold uppercase shadow-[2px_2px_0_0_#071B3A] sm:inline-block ${
                                            isLevelOne
                                                ? "bg-tutor-yellow text-tutor-navy"
                                                : "bg-tutor-blue text-tutor-cream"
                                        }`}
                                    >
                                        Level {level}
                                    </span>
                                </div>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    aria-label="Close quiz"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] sm:h-10 sm:w-10"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Timer Display */}
                            {!showResult && (
                                <div
                                    className={`rounded-xl border-[3px] border-tutor-navy p-3 shadow-[3px_3px_0_0_#071B3A] transition-all duration-300 sm:p-4 ${getTimerBgColor()}`}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`flex h-9 w-9 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-cream/90 ${getTimerTextColor()}`}
                                            >
                                                <Timer
                                                    className={`h-4 w-4 ${
                                                        timeRemaining <= 10
                                                            ? "animate-pulse"
                                                            : ""
                                                    }`}
                                                />
                                            </span>
                                            <span
                                                className={`font-brutal text-xl sm:text-3xl ${getTimerTextColor()}`}
                                            >
                                                {timeRemaining}s
                                            </span>
                                        </div>
                                        <span
                                            className={`rounded-full border-2 border-tutor-navy px-2.5 py-1 text-center font-playful text-xs font-bold uppercase sm:text-sm ${getTimerTextColor()}`}
                                        >
                                            {getTimerMessage()}
                                        </span>
                                    </div>
                                    <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full border-2 border-tutor-navy bg-tutor-cream/90 sm:h-3">
                                        <div
                                            className="h-full bg-tutor-navy transition-all duration-1000 ease-linear"
                                            style={{
                                                width: `${timePercentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Question Card */}
                            <div
                                className={`rounded-xl border-[3px] border-tutor-navy p-3 shadow-[3px_3px_0_0_#071B3A] sm:p-4 ${questionCardTint}`}
                            >
                                <h3
                                    className={`mb-1.5 flex items-center gap-2 font-brutal text-xs uppercase tracking-wide sm:text-sm ${
                                        isLevelOne
                                            ? "text-tutor-navy"
                                            : "text-tutor-cream"
                                    }`}
                                >
                                    <span className="text-base sm:text-lg">
                                        ❓
                                    </span>
                                    Question:
                                </h3>
                                <p
                                    className={`font-playful text-sm leading-relaxed sm:text-base ${
                                        isLevelOne
                                            ? "text-tutor-navy"
                                            : "text-tutor-cream"
                                    }`}
                                >
                                    {question.question}
                                </p>
                            </div>

                            {/* Help Section (Hints & Formula) */}
                            {!showResult && (question.hints || question.formula) && (
                                <div className="space-y-2">
                                    {question.formula && (
                                        <button
                                            onClick={() =>
                                                setShowFormula(!showFormula)
                                            }
                                            type="button"
                                            className="flex w-full items-center justify-between rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-2.5 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A] sm:p-3"
                                        >
                                            <span className="flex items-center gap-2 font-playful text-sm font-bold text-tutor-navy">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-blue text-tutor-cream">
                                                    <BookOpen className="h-3.5 w-3.5" />
                                                </span>
                                                Show Formula
                                            </span>
                                            <span className="font-playful text-sm font-bold text-tutor-navy">
                                                {showFormula ? "▲" : "▼"}
                                            </span>
                                        </button>
                                    )}
                                    {showFormula && question.formula && (
                                        <div className="animate-slide-down rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-3 shadow-[2px_2px_0_0_#071B3A]">
                                            <code className="block text-center font-math text-lg text-tutor-navy">
                                                {question.formula}
                                            </code>
                                        </div>
                                    )}
                                    {question.hints && question.hints.length > 0 && (
                                        <button
                                            onClick={handleShowHint}
                                            type="button"
                                            disabled={
                                                currentHintLevel >=
                                                    question.hints.length -
                                                        1 && showHints
                                            }
                                            className="flex w-full items-center justify-between rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-2.5 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A] disabled:cursor-not-allowed disabled:opacity-50 sm:p-3"
                                        >
                                            <span className="flex items-center gap-2 font-playful text-sm font-bold text-tutor-navy">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-orange text-tutor-cream">
                                                    <Lightbulb className="h-3.5 w-3.5" />
                                                </span>
                                                Get a Hint
                                            </span>
                                            <span className="font-playful text-xs font-bold text-tutor-navy">
                                                {currentHintLevel + 1}/
                                                {question.hints.length}
                                            </span>
                                        </button>
                                    )}
                                    {showHints && question.hints && (
                                        <div className="space-y-2 animate-slide-down">
                                            {question.hints
                                                .slice(0, currentHintLevel + 1)
                                                .map((hint, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-2 rounded-lg border-2 border-tutor-navy bg-tutor-yellow p-2.5"
                                                    >
                                                        <span className="shrink-0 font-brutal text-xs uppercase text-tutor-navy">
                                                            Hint {idx + 1}:
                                                        </span>
                                                        <span className="font-playful text-sm text-tutor-navy">
                                                            {hint}
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                                {question.options.map((option, index) => {
                                    const isSelected = selectedOption === index;
                                    let optionClass =
                                        "w-full rounded-xl border-[3px] border-tutor-navy p-2.5 text-left transition-all duration-150 sm:p-3 ";

                                    if (showResult) {
                                        if (
                                            index === question.correctAnswer
                                        ) {
                                            optionClass +=
                                                "bg-tutor-green text-tutor-cream shadow-[3px_3px_0_0_#071B3A]";
                                        } else if (isSelected && !isCorrect) {
                                            optionClass +=
                                                "bg-tutor-red text-tutor-cream";
                                        } else {
                                            optionClass +=
                                                "bg-tutor-cream text-tutor-navy opacity-60";
                                        }
                                    } else {
                                        optionClass += isSelected
                                            ? "-translate-y-0.5 bg-tutor-navy text-tutor-cream shadow-[0_0_0_3px_#FFD84D,4px_4px_0_0_#071B3A]"
                                            : "bg-tutor-cream text-tutor-navy hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#071B3A]";
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleOptionSelect(index)
                                            }
                                            disabled={showResult}
                                            type="button"
                                            className={optionClass}
                                        >
                                            <div className="flex items-center">
                                                <span
                                                    className={`mr-2.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy font-brutal text-sm ${
                                                        showResult
                                                            ? index ===
                                                              question.correctAnswer
                                                                ? "bg-tutor-cream text-tutor-green"
                                                                : isSelected &&
                                                                  !isCorrect
                                                                ? "bg-tutor-cream text-tutor-red"
                                                                : "bg-[#E5DCC9] text-tutor-navy/50"
                                                            : isSelected
                                                            ? "bg-tutor-yellow text-tutor-navy"
                                                            : "bg-[#F3EBDD] text-tutor-navy"
                                                    }`}
                                                >
                                                    {String.fromCharCode(
                                                        65 + index
                                                    )}
                                                </span>
                                                <span
                                                    className={`font-playful text-sm font-medium sm:text-base ${
                                                        isSelected && !showResult
                                                            ? "text-tutor-cream"
                                                            : showResult &&
                                                              index ===
                                                                  question.correctAnswer
                                                            ? "text-tutor-cream"
                                                            : "text-tutor-navy"
                                                    }`}
                                                >
                                                    {option}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Result Section with Step-by-Step Solution */}
                            {showResult && (
                                <div
                                    className={`rounded-xl border-[3px] border-tutor-navy p-3 shadow-[3px_3px_0_0_#071B3A] sm:p-4 ${
                                        isCorrect
                                            ? "bg-tutor-green"
                                            : "bg-tutor-red"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {isCorrect ? (
                                            <CheckCircle2 className="h-9 w-9 shrink-0 text-tutor-cream" />
                                        ) : (
                                            <XCircle className="h-9 w-9 shrink-0 text-tutor-cream" />
                                        )}
                                        <div className="min-w-0">
                                            <h4 className="font-brutal text-base uppercase tracking-wide text-tutor-cream sm:text-lg">
                                                {isCorrect
                                                    ? "Excellent!"
                                                    : "Not Quite!"}
                                            </h4>
                                            <p className="font-playful text-sm text-tutor-cream/90">
                                                {isCorrect
                                                    ? timeBonus > 0
                                                        ? `Amazing! Speed bonus: +${timeBonus} points!`
                                                        : "Great job solving the problem!"
                                                    : "Let's learn from this together!"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 space-y-1">
                                        <p className="font-playful text-xs text-tutor-cream/80">
                                            ⏱️ Time Taken:{" "}
                                            {Math.round(submissionTime)}s /{" "}
                                            {QUIZ_TIME_LIMIT}s
                                        </p>
                                        {isCorrect && timeBonus > 0 && (
                                            <p className="flex items-center gap-1 font-playful text-xs font-bold text-tutor-cream">
                                                <span>⚡</span>
                                                <span>
                                                    Speed Bonus: +{timeBonus}{" "}
                                                    points!
                                                </span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Step-by-Step Solution */}
                                    {question.steps && (
                                        <div className="mt-3 rounded-xl border-2 border-tutor-navy bg-tutor-cream p-3 sm:p-4">
                                            <h5 className="mb-2 flex items-center gap-2 font-brutal text-xs uppercase tracking-wide text-tutor-navy sm:text-sm">
                                                <span className="text-base">
                                                    📝
                                                </span>
                                                Step-by-Step Solution:
                                            </h5>
                                            <ol className="space-y-2">
                                                {question.steps.map(
                                                    (step, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-navy font-brutal text-xs text-tutor-cream">
                                                                {idx + 1}
                                                            </span>
                                                            <span className="font-playful text-sm text-tutor-navy">
                                                                {step}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ol>
                                        </div>
                                    )}

                                    {/* Key Concept / Explanation */}
                                    <div className="mt-3 rounded-xl border-2 border-tutor-navy bg-tutor-yellow p-3 sm:p-4">
                                        <h5 className="mb-1 flex items-center gap-2 font-brutal text-xs uppercase tracking-wide text-tutor-navy sm:text-sm">
                                            <span className="text-base">
                                                💡
                                            </span>
                                            Key Concept:
                                        </h5>
                                        <p className="font-playful text-sm text-tutor-navy">
                                            {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-center">
                                {!showResult ? (
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        disabled={selectedOption === null}
                                        className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-5 py-3 font-brutal text-sm uppercase tracking-wider text-tutor-cream shadow-[5px_5px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[7px_7px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A] disabled:cursor-not-allowed disabled:bg-[#D8CFC0] disabled:text-tutor-navy/40 disabled:shadow-[3px_3px_0_0_#071B3A] disabled:hover:translate-y-0 disabled:hover:brightness-100"
                                    >
                                        <span className="text-base">📤</span>
                                        Submit Answer
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        type="button"
                                        className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-5 py-3 font-brutal text-sm uppercase tracking-wider text-tutor-cream shadow-[5px_5px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-1 hover:brightness-105 hover:shadow-[7px_7px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A]"
                                    >
                                        Continue
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};