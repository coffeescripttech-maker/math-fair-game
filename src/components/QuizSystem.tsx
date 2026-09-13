import React, { useState, useEffect } from "react";
import {
    X,
    Timer,
    ClipboardList,
    CheckCircle2,
    XCircle,
    ArrowRight,
} from "lucide-react";

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

    // Helper function to get timer background color (tutor status colors)
    const getTimerBgColor = () => {
        if (timeRemaining <= 10) return "bg-tutor-red";
        if (timeRemaining <= 20) return "bg-tutor-orange";
        if (timeRemaining <= 30) return "bg-tutor-yellow";
        return "bg-tutor-green";
    };

    // Text color on top of the timer band (cream on solid, navy on yellow)
    const getTimerTextColor = () => {
        if (timeRemaining <= 30) return "text-tutor-navy";
        return "text-tutor-cream";
    };

    // Helper function for the status message
    const getTimerMessage = () => {
        if (timeRemaining <= 10) return "⚠️ HURRY!";
        if (timeRemaining <= 20) return "⏰ Time Running Out!";
        if (timeRemaining <= 30) return "⏳ Keep Going!";
        return "💪 You Got This!";
    };

    const timePercentage = (timeRemaining / QUIZ_TIME_LIMIT) * 100;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
                {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                <div className="w-full max-w-sm sm:max-w-lg lg:max-w-2xl">
                    <section className="relative animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                        <div className="space-y-4 rounded-[14px] border-2 border-tutor-yellow px-4 py-4 sm:space-y-5 sm:px-5 sm:py-5">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-orange text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                        <ClipboardList className="h-4 w-4" />
                                    </span>
                                    <h2 className="font-brutal text-base uppercase tracking-wide text-tutor-navy sm:text-xl">
                                        Math Challenge
                                    </h2>
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

                            {/* Timer Display - Prominent */}
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
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Question */}
                            <div className="rounded-xl border-[3px] border-tutor-navy bg-tutor-yellow p-3 shadow-[3px_3px_0_0_#071B3A] sm:p-4">
                                <h3 className="mb-1.5 flex items-center gap-2 font-brutal text-xs uppercase tracking-wide text-tutor-navy sm:text-sm">
                                    <span className="text-base sm:text-lg">
                                        ❓
                                    </span>
                                    Question:
                                </h3>
                                <p className="font-playful text-sm leading-relaxed text-tutor-navy sm:text-base">
                                    {question.question}
                                </p>
                            </div>

                            {/* Options */}
                            <div className="space-y-2 sm:space-y-3">
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
                                                    className={`mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy font-brutal text-xs sm:h-7 sm:w-7 sm:text-sm ${
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

                            {/* Result */}
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
                                                    ? "Correct!"
                                                    : "Incorrect!"}
                                            </h4>
                                            <p className="font-playful text-sm text-tutor-cream/90">
                                                {isCorrect
                                                    ? timeBonus > 0
                                                        ? `Excellent! You earned +${timeBonus} bonus points for quick thinking!`
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
                                        {isCorrect &&
                                            timeBonus === 0 &&
                                            timeRemaining > 0 && (
                                                <p className="font-playful text-xs text-tutor-cream/80">
                                                    💡 Tip: Answer faster
                                                    (within 30s) for bonus
                                                    points!
                                                </p>
                                            )}
                                    </div>
                                    <div className="mt-3 rounded-xl border-2 border-tutor-navy bg-tutor-cream p-3">
                                        <h5 className="mb-1 font-brutal text-xs uppercase tracking-wide text-tutor-navy">
                                            📚 Explanation:
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