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
import ShopService from "../services/ShopService";

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
    const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
    const [hintTokens, setHintTokens] = useState<number>(() =>
        ShopService.getInstance().getItemQuantity("hint-token-1"),
    );
    const [timeFreezeCount, setTimeFreezeCount] = useState<number>(() =>
        ShopService.getInstance().getItemQuantity("time-freeze-1"),
    );

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

    // Time bonus mirrors the scoring in GameValidation (based on time spent)
    const calculateTimeBonus = (timeSpent: number): number => {
        if (timeSpent <= 10) return 30; // Excellent!
        if (timeSpent <= 20) return 20; // Great!
        if (timeSpent <= 30) return 10; // Good!
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
        if (!showResult && !eliminatedOptions.includes(index)) {
            setSelectedOption(index);
        }
    };

    const handleUseHintToken = () => {
        if (hintTokens <= 0) return;
        const shopService = ShopService.getInstance();
        const result = shopService.useItem("hint-token-1");
        if (!result.success) return;

        setHintTokens((t) => Math.max(0, t - 1));

        const wrongOptions = question.options
            .map((_, idx) => idx)
            .filter(
                (idx) =>
                    idx !== question.correctAnswer &&
                    !eliminatedOptions.includes(idx),
            );
        if (wrongOptions.length > 0) {
            const pick =
                wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
            setEliminatedOptions((prev) => [...prev, pick]);
        }
    };

    const handleTimeFreeze = () => {
        if (timeFreezeCount <= 0) return;
        const shopService = ShopService.getInstance();
        const result = shopService.useItem("time-freeze-1");
        if (!result.success) return;

        setTimeFreezeCount((c) => Math.max(0, c - 1));
        setTimeRemaining((prev) => Math.min(prev + 15, QUIZ_TIME_LIMIT));
    };

    const handleSubmit = () => {
        if (selectedOption !== null) {
            setIsTimerRunning(false);
            const correct = selectedOption === question.correctAnswer;
            const timeSpent = (Date.now() - startTime) / 1000;
            const bonus = correct ? calculateTimeBonus(timeSpent) : 0;
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
    const questionCardTint = isLevelOne ? "bg-tutor-yellow" : "bg-tutor-blue";

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-1.5 sm:p-4">
                {/* MathTuto game window: navy outer frame, yellow inner frame */}
                <div className="w-full min-[420px]:max-w-2xl lg:max-w-4xl max-w-[calc(100vw-6px)]">
                    <section className="relative animate-slide-up rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-tutor-navy bg-tutor-cream p-1 sm:p-1.5 shadow-[6px_6px_0_0_#071B3A] sm:shadow-[8px_8px_0_0_#071B3A]">
                        <div className="max-h-[calc(100dvh-20px)] overflow-y-auto overscroll-contain custom-scrollbar space-y-2 sm:space-y-3 rounded-[10px] sm:rounded-[14px] border-2 border-tutor-yellow px-2.5 py-2.5 sm:px-4 sm:py-4">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-2 sm:gap-3">
                                <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
                                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg border-2 border-tutor-navy bg-tutor-orange text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
                                        <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </span>
                                    <h2 className="truncate font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-xl">
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
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                >
                                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                            </div>

                            {/* Timer Display */}
                            {!showResult && (
                                <div
                                    className={`rounded-lg sm:rounded-xl border-[3px] border-tutor-navy p-1.5 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] transition-all duration-300 ${getTimerBgColor()}`}
                                >
                                    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <span
                                                className={`flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-md sm:rounded-lg border-2 border-tutor-navy bg-tutor-cream/90 ${getTimerTextColor()}`}
                                            >
                                                <Timer
                                                    className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                                        timeRemaining <= 10
                                                            ? "animate-pulse"
                                                            : ""
                                                    }`}
                                                />
                                            </span>
                                            <span
                                                className={`font-brutal text-base sm:text-xl md:text-3xl ${getTimerTextColor()}`}
                                            >
                                                {timeRemaining}s
                                            </span>
                                        </div>
                                        <span
                                            className={`rounded-full border-2 border-tutor-navy px-1.5 sm:px-2.5 py-0.5 text-center font-playful text-[9px] font-bold uppercase sm:text-sm ${getTimerTextColor()}`}
                                        >
                                            {getTimerMessage()}
                                        </span>
                                    </div>
                                    <div className="mt-1.5 sm:mt-3 h-1.5 sm:h-2.5 md:h-3 w-full overflow-hidden rounded-full border-2 border-tutor-navy bg-tutor-cream/90">
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
                                className={`rounded-lg sm:rounded-xl border-[3px] border-tutor-navy p-2 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] ${questionCardTint}`}
                            >
                                <h3
                                    className={`mb-0.5 flex items-center gap-1.5 font-brutal text-[10px] uppercase tracking-wide sm:text-sm ${
                                        isLevelOne
                                            ? "text-tutor-navy"
                                            : "text-tutor-cream"
                                    }`}
                                >
                                    <span className="text-sm sm:text-lg">
                                        ❓
                                    </span>
                                    Question:
                                </h3>
                                <p
                                    className={`font-playful text-xs leading-relaxed sm:text-sm ${
                                        isLevelOne
                                            ? "text-tutor-navy"
                                            : "text-tutor-cream"
                                    }`}
                                >
                                    {question.question}
                                </p>
                            </div>

                            {/* Help Section (Hints & Formula) */}
                            {!showResult &&
                                (question.hints || question.formula) && (
                                    <div className="space-y-1 sm:space-y-2">
                                        {question.formula && (
                                            <button
                                                onClick={() =>
                                                    setShowFormula(!showFormula)
                                                }
                                                type="button"
                                                className="flex w-full items-center justify-between rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-2 sm:p-3 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A] min-h-[40px]"
                                            >
                                                <span className="flex items-center gap-1.5 sm:gap-2 font-playful text-[11px] sm:text-sm font-bold text-tutor-navy">
                                                    <span className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-blue text-tutor-cream">
                                                        <BookOpen className="h-2.5 sm:h-3.5 w-2.5 sm:w-3.5" />
                                                    </span>
                                                    Show Formula
                                                </span>
                                                <span className="font-playful text-[10px] sm:text-xs font-bold text-tutor-navy">
                                                    {showFormula ? "▲" : "▼"}
                                                </span>
                                            </button>
                                        )}
                                        {showFormula && question.formula && (
                                            <div className="animate-slide-down rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-2 sm:p-3 shadow-[2px_2px_0_0_#071B3A]">
                                                <code className="block text-center font-math text-sm sm:text-lg text-tutor-navy">
                                                    {question.formula}
                                                </code>
                                            </div>
                                        )}
                                        {question.hints &&
                                            question.hints.length > 0 && (
                                                <button
                                                    onClick={handleShowHint}
                                                    type="button"
                                                    disabled={
                                                        currentHintLevel >=
                                                            question.hints
                                                                .length -
                                                                1 && showHints
                                                    }
                                                    className="flex w-full items-center justify-between rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-2 sm:p-3 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A] disabled:cursor-not-allowed disabled:opacity-50 min-h-[40px]"
                                                >
                                                    <span className="flex items-center gap-1.5 sm:gap-2 font-playful text-[11px] sm:text-sm font-bold text-tutor-navy">
                                                        <span className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-orange text-tutor-cream">
                                                            <Lightbulb className="h-2.5 sm:h-3.5 w-2.5 sm:w-3.5" />
                                                        </span>
                                                        Get a Hint
                                                    </span>
                                                    <span className="font-playful text-[9px] sm:text-xs font-bold text-tutor-navy">
                                                        {currentHintLevel + 1}/
                                                        {question.hints.length}
                                                    </span>
                                                </button>
                                            )}
                                        {showHints && question.hints && (
                                            <div className="space-y-1.5 sm:space-y-2 animate-slide-down">
                                                {question.hints
                                                    .slice(
                                                        0,
                                                        currentHintLevel + 1,
                                                    )
                                                    .map((hint, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-start gap-2 rounded-lg border-2 border-tutor-navy bg-tutor-yellow p-2 sm:p-2.5"
                                                        >
                                                            <span className="shrink-0 font-brutal text-[10px] uppercase text-tutor-navy sm:text-xs">
                                                                Hint {idx + 1}:
                                                            </span>
                                                            <span className="font-playful text-xs sm:text-sm text-tutor-navy">
                                                                {hint}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                            {/* Shop Power-ups: Hint Token & Time Freeze */}
                            {!showResult &&
                                (hintTokens > 0 || timeFreezeCount > 0) && (
                                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-3">
                                        {hintTokens > 0 && (
                                            <button
                                                onClick={handleUseHintToken}
                                                type="button"
                                                className="flex items-center justify-between rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-2 sm:p-3 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A] min-h-[40px]"
                                            >
                                                <span className="flex items-center gap-1.5 sm:gap-2 font-playful text-[11px] sm:text-sm font-bold text-tutor-navy">
                                                    <span className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-yellow text-tutor-navy">
                                                        💡
                                                    </span>
                                                    Use Hint Token
                                                </span>
                                                <span className="font-playful text-[10px] sm:text-xs font-bold text-tutor-navy">
                                                    {hintTokens} left
                                                </span>
                                            </button>
                                        )}
                                        {timeFreezeCount > 0 && (
                                            <button
                                                onClick={handleTimeFreeze}
                                                type="button"
                                                className="flex items-center justify-between rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-2 sm:p-3 shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A] min-h-[40px]"
                                            >
                                                <span className="flex items-center gap-1.5 sm:gap-2 font-playful text-[11px] sm:text-sm font-bold text-tutor-navy">
                                                    <span className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-blue text-tutor-cream">
                                                        ⏸️
                                                    </span>
                                                    Freeze Time +15s
                                                </span>
                                                <span className="font-playful text-[10px] sm:text-xs font-bold text-tutor-navy">
                                                    {timeFreezeCount} left
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                )}

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-3">
                                {question.options.map((option, index) => {
                                    const isSelected = selectedOption === index;
                                    const isEliminated =
                                        eliminatedOptions.includes(index);
                                    let optionClass =
                                        "w-full rounded-lg sm:rounded-xl border-[3px] border-tutor-navy p-2 sm:p-3 text-left transition-all duration-150 min-h-[44px] ";

                                    if (showResult) {
                                        if (index === question.correctAnswer) {
                                            optionClass +=
                                                "bg-tutor-green text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A]";
                                        } else if (isSelected && !isCorrect) {
                                            optionClass +=
                                                "bg-tutor-red text-tutor-cream";
                                        } else {
                                            optionClass +=
                                                "bg-tutor-cream text-tutor-navy opacity-60";
                                        }
                                    } else if (isEliminated) {
                                        optionClass +=
                                            " border-dashed bg-tutor-cream text-tutor-navy/40 opacity-50 line-through";
                                    } else {
                                        optionClass += isSelected
                                            ? "-translate-y-0.5 bg-tutor-navy text-tutor-cream shadow-[0_0_0_2px_#FFD84D,3px_3px_0_0_#071B3A]"
                                            : "bg-tutor-cream text-tutor-navy hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#071B3A]";
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleOptionSelect(index)
                                            }
                                            disabled={showResult || isEliminated}
                                            type="button"
                                            className={optionClass}
                                        >
                                            <div className="flex items-center">
                                                <span
                                                    className={`mr-1.5 sm:mr-2 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy font-brutal text-[11px] sm:text-sm ${
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
                                                              : isEliminated
                                                                ? "bg-[#E5DCC9] text-tutor-navy/40"
                                                                : "bg-[#F3EBDD] text-tutor-navy"
                                                    }`}
                                                >
                                                    {String.fromCharCode(
                                                        65 + index,
                                                    )}
                                                </span>
                                                <span
                                                    className={`font-playful text-[11px] sm:text-base ${
                                                        isSelected &&
                                                        !showResult
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
                                    className={`rounded-lg sm:rounded-xl border-[3px] border-tutor-navy p-2 sm:p-4 shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] ${
                                        isCorrect
                                            ? "bg-tutor-green"
                                            : "bg-tutor-red"
                                    }`}
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        {isCorrect ? (
                                            <CheckCircle2 className="h-6 w-6 sm:h-9 sm:w-9 shrink-0 text-tutor-cream" />
                                        ) : (
                                            <XCircle className="h-6 w-6 sm:h-9 sm:w-9 shrink-0 text-tutor-cream" />
                                        )}
                                        <div className="min-w-0">
                                            <h4 className="font-brutal text-xs sm:text-lg uppercase tracking-wide text-tutor-cream">
                                                {isCorrect
                                                    ? "Excellent!"
                                                    : "Not Quite!"}
                                            </h4>
                                            <p className="font-playful text-[10px] sm:text-sm text-tutor-cream/90">
                                                {isCorrect
                                                    ? timeBonus > 0
                                                        ? `Amazing! Speed bonus: +${timeBonus} points!`
                                                        : "Great job solving the problem!"
                                                    : "Let's learn from this together!"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-1.5 sm:mt-3 space-y-0.5 sm:space-y-1">
                                        <p className="font-playful text-[10px] sm:text-xs text-tutor-cream/80">
                                            ⏱️ Time:{" "}
                                            {Math.round(submissionTime)}s /{" "}
                                            {QUIZ_TIME_LIMIT}s
                                        </p>
                                        {isCorrect && timeBonus > 0 && (
                                            <p className="flex items-center gap-1 font-playful text-[10px] sm:text-xs font-bold text-tutor-cream">
                                                <span>⚡</span>
                                                <span>
                                                    Speed Bonus: +{timeBonus}{" "}
                                                    pts!
                                                </span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Step-by-Step Solution */}
                                    {question.steps && (
                                        <div className="mt-2 sm:mt-3 rounded-lg sm:rounded-xl border-2 border-tutor-navy bg-tutor-cream p-2 sm:p-4">
                                            <h5 className="mb-1 sm:mb-2 flex items-center gap-1.5 sm:gap-2 font-brutal text-[10px] uppercase tracking-wide text-tutor-navy sm:text-sm">
                                                <span className="text-sm sm:text-base">
                                                    📝
                                                </span>
                                                Step-by-Step Solution:
                                            </h5>
                                            <ol className="space-y-1 sm:space-y-2">
                                                {question.steps.map(
                                                    (step, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-1.5 sm:gap-2"
                                                        >
                                                            <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-md border-2 border-tutor-navy bg-tutor-navy font-brutal text-[10px] text-tutor-cream sm:text-xs">
                                                                {idx + 1}
                                                            </span>
                                                            <span className="font-playful text-[11px] sm:text-sm text-tutor-navy">
                                                                {step}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ol>
                                        </div>
                                    )}

                                    {/* Key Concept / Explanation */}
                                    <div className="mt-2 sm:mt-3 rounded-lg sm:rounded-xl border-2 border-tutor-navy bg-tutor-yellow p-2 sm:p-4">
                                        <h5 className="mb-0.5 sm:mb-1 flex items-center gap-1.5 sm:gap-2 font-brutal text-[10px] uppercase tracking-wide text-tutor-navy sm:text-sm">
                                            <span className="text-sm sm:text-base">
                                                💡
                                            </span>
                                            Key Concept:
                                        </h5>
                                        <p className="font-playful text-[11px] sm:text-sm text-tutor-navy">
                                            {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-center pt-0.5 sm:pt-1">
                                {!showResult ? (
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        disabled={selectedOption === null}
                                        className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-4 py-2 sm:px-5 sm:py-3 font-brutal text-[11px] sm:text-sm uppercase tracking-wider text-tutor-cream shadow-[4px_4px_0_0_#071B3A] sm:shadow-[5px_5px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[6px_6px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A] disabled:cursor-not-allowed disabled:bg-[#D8CFC0] disabled:text-tutor-navy/40 disabled:shadow-[2px_2px_0_0_#071B3A] disabled:hover:translate-y-0 disabled:hover:brightness-100 min-h-[44px]"
                                    >
                                        <span className="text-sm">📤</span>
                                        Submit Answer
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        type="button"
                                        className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-4 py-2 sm:px-5 sm:py-3 font-brutal text-[11px] sm:text-sm uppercase tracking-wider text-tutor-cream shadow-[4px_4px_0_0_#071B3A] sm:shadow-[5px_5px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[6px_6px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A] min-h-[44px]"
                                    >
                                        Continue
                                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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

