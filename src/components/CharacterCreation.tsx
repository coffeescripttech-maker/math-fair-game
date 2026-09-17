import React, { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    GraduationCap,
    Mars,
    Pencil,
    Star,
    User,
    Users,
    Venus,
} from "lucide-react";
import { audioManager } from "../utils/AudioManager";

interface CharacterCreationProps {
    onCharacterCreated: (
        name: string,
        color: string,
        gender: "boy" | "girl"
    ) => void;
    /** Optional handler for returning to the main menu. */
    onBack?: () => void;
}

type StudentGender = "boy" | "girl";

/**
 * The game ships one chibi player avatar (front-1..4 are walk-cycle frames of
 * the same character). The Boy card uses the real player sprite; the Girl card
 * uses its own front-girl.png preview image. The Boy / Girl choice is a
 * presentation choice: the cards communicate it through their accent scheme,
 * ribbons and badges, and the favorite color is reflected through the frame,
 * backdrop and glow (same CSS hue-rotate the old screen used).
 */
const PLAYER_AVATAR =
    "/assets/student-sprites/front/front-1-removebg-preview.png";

const GIRL_AVATAR = "/assets/student-sprites/front/front-girl.png";

const GENDER_OPTIONS = [
    {
        id: "boy" as StudentGender,
        label: "Boy Student",
        caption: "Sporty & sharp",
        accent: "#216FD1",
        accentSoft: "rgba(33, 111, 209, 0.12)",
        glyph: "mars",
    },
    {
        id: "girl" as StudentGender,
        label: "Girl Student",
        caption: "Bright & quick",
        accent: "#e467c9",
        accentSoft: "rgba(123, 63, 208, 0.12)",
        glyph: "venus",
    },
];

/**
 * Favorite color is now auto-assigned from the chosen gender — the old manual
 * "Choose your color" picker is gone. Each student already carries its own
 * accent (boy → blue, girl → pink), so the preview frame / backdrop / glow
 * reflect it automatically.
 */
const DEFAULT_COLOR = { name: "Green", value: "#16B364", rotation: 0 };

const GENDER_COLOR: Record<
    StudentGender,
    { name: string; value: string; rotation: number }
> = {
    boy: { name: "Blue", value: "#216FD1", rotation: 240 },
    girl: { name: "Pink", value: "#e467c9", rotation: 0 },
};

const ORANGE = "#F26522";
const YELLOW = "#FFD84D";

/** Gender glyph rendered on the preview ribbon. */
const GenderGlyph: React.FC<{ id: StudentGender; className?: string }> = ({
    id,
    className,
}) =>
    id === "boy" ? (
        <Mars className={className} />
    ) : (
        <Venus className={className} />
    );

/** Shared section heading: orange icon tile + navy label + yellow rule. */
const SectionHeading: React.FC<{
    icon: React.ReactNode;
    children: React.ReactNode;
}> = ({ icon, children }) => (
    <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-orange text-tutor-cream shadow-[2px_2px_0_0_#071B3A]">
            {icon}
        </span>
        <h2 className="font-brutal text-base uppercase tracking-wide text-tutor-navy sm:text-lg">
            {children}
        </h2>
        <div className="h-1 flex-1 rounded-full bg-tutor-yellow" />
    </div>
);

export const CharacterCreation: React.FC<CharacterCreationProps> = ({
    onCharacterCreated,
    onBack,
}) => {
    const [playerName, setPlayerName] = useState("");
    const [gender, setGender] = useState<StudentGender | null>(null);

    // Color follows the chosen gender automatically (no manual picker).
    const colorMeta = gender ? GENDER_COLOR[gender] : DEFAULT_COLOR;
    const genderMeta = GENDER_OPTIONS.find((g) => g.id === gender) ?? null;

    const nameReady = playerName.trim().length > 0;
    const genderReady = gender !== null;
    const canCreate = nameReady && genderReady;

    const selectGender = (next: StudentGender) => {
        audioManager.playEffect("button-click");
        setGender(next);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canCreate) return;
        audioManager.playEffect("button-click");
        // Pass the chosen gender so the in-game sprite reflects the selection.
        // Favorite color is derived from the gender automatically.
        onCharacterCreated(
            playerName.trim(),
            colorMeta.value,
            gender as "boy" | "girl",
        );
    };

    const handleBack = () => {
        audioManager.playEffect("button-click");
        onBack?.();
    };

    return (
        <main
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-tutor-cream"
            style={{
                backgroundImage:
                    "radial-gradient(rgba(33,111,209,0.10) 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
            }}
        >
            {/* Back to main menu */}
            {onBack && (
                <button
                    type="button"
                    onClick={handleBack}
                    aria-label="Back to main menu"
                    className="fixed left-3 top-3 z-20 flex items-center gap-1.5 rounded-xl border-2 border-tutor-navy bg-tutor-cream px-3 py-2 font-brutal text-xs uppercase tracking-wider text-tutor-navy shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                >
                    <ArrowLeft className="h-4 w-4 text-tutor-orange" />
                    Back
                </button>
            )}

            {/* Decorative background doodles */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                <span
                    className="absolute top-8 left-[8%] font-brutal text-3xl text-tutor-navy/10"
                    style={{ transform: "rotate(-8deg)" }}
                >
                    √
                </span>
                <span
                    className="absolute top-16 right-[9%] font-brutal text-2xl text-tutor-navy/10"
                    style={{ transform: "rotate(6deg)" }}
                >
                    π
                </span>
                <span className="absolute bottom-24 left-[6%] text-2xl text-tutor-navy/10">
                    +
                </span>
                <span className="absolute bottom-32 right-[7%] text-2xl text-tutor-navy/10">
                    ×
                </span>
                <Star
                    className="absolute top-10 right-[18%] h-6 w-6 text-tutor-yellow/60"
                    fill={YELLOW}
                />
                <Star
                    className="absolute bottom-40 left-[16%] h-5 w-5 text-tutor-orange/50"
                    fill={ORANGE}
                />
            </div>

            <div className="flex min-h-full flex-col items-center justify-center px-4 py-6 sm:py-8">
                <div className="w-full max-w-[760px]">
                    {/* Double-frame game window: navy outer, yellow inner */}
                    <section className="animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 rounded-[14px] border-2 border-tutor-yellow px-4 py-5 sm:space-y-5 sm:px-7 sm:py-6"
                        >
                            {/* =========================== TITLE =========================== */}
                            <div className="relative text-center">
                                <h1 className="font-brutal text-[26px] uppercase leading-tight tracking-wide text-tutor-navy sm:text-[34px]">
                                    Create Your Character
                                </h1>
                                <div className="mt-1.5 flex items-center justify-center gap-2">
                                    <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                    <Star
                                        className="h-4 w-4 text-tutor-yellow"
                                        fill={YELLOW}
                                    />
                                    <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                </div>
                                <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-3 py-1 font-playful text-xs font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-sm">
                                    <GraduationCap className="h-4 w-4" />
                                    Choose your student
                                </p>
                            </div>

                            {/* ====================== CHOOSE STUDENT ====================== */}
                            <div className="space-y-2">
                                <SectionHeading
                                    icon={<Users className="h-4 w-4" />}
                                >
                                    Pick who you play
                                </SectionHeading>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                    {GENDER_OPTIONS.map((option) => {
                                        const selected = gender === option.id;
                                        const Glyph =
                                            option.glyph === "mars"
                                                ? Mars
                                                : Venus;
                                        return (
                                            <button
                                                type="button"
                                                key={option.id}
                                                aria-pressed={selected}
                                                onClick={() =>
                                                    selectGender(option.id)
                                                }
                                                className={`relative flex items-center gap-3 rounded-xl border-tutor-navy px-4 py-3 text-left transition-all duration-150 ${
                                                    selected
                                                        ? "-translate-y-0.5 scale-[1.02] border-4 bg-tutor-cream shadow-[0_0_0_4px_#FFD84D,7px_7px_0_0_#071B3A]"
                                                        : "border-[3px] bg-tutor-cream opacity-85 saturate-[0.85] hover:-translate-y-0.5 hover:opacity-100 hover:shadow-[6px_6px_0_0_#071B3A] active:translate-y-0 active:shadow-[3px_3px_0_0_#071B3A]"
                                                }`}
                                            >
                                                {/* Warm yellow highlight strip */}
                                                {selected && (
                                                    <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-xl bg-tutor-yellow" />
                                                )}
                                                {/* Selection checkmark */}
                                                {selected && (
                                                    <span className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-tutor-navy bg-tutor-navy text-tutor-yellow shadow-[2px_2px_0_0_rgba(7,27,58,0.35)]">
                                                        <Check
                                                            className="h-4 w-4"
                                                            strokeWidth={3.5}
                                                        />
                                                    </span>
                                                )}

                                                {/* Avatar thumb */}
                                                <span
                                                    className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy sm:h-20 sm:w-20"
                                                    style={{
                                                        backgroundColor:
                                                            option.accentSoft,
                                                    }}
                                                >
                                                    <img
                                                        src={option.id === "girl" ? GIRL_AVATAR : PLAYER_AVATAR}
                                                        alt={`${option.label} student avatar`}
                                                        className="h-[85%] w-[85%] object-contain"
                                                        style={{
                                                            // Each card keeps its own gender color —
                                                            // picking Boy must not recolor the Girl card.
                                                            filter: `hue-rotate(${GENDER_COLOR[option.id].rotation}deg)`,
                                                        }}
                                                    />
                                                </span>

                                                <span className="flex min-w-0 flex-col gap-0.5">
                                                    <span
                                                        className="flex items-center gap-1.5 font-brutal text-sm uppercase tracking-wide sm:text-base"
                                                        style={{
                                                            color: option.accent,
                                                        }}
                                                    >
                                                        <Glyph className="h-4 w-4" />
                                                        {option.label}
                                                    </span>
                                                    <span className="truncate font-playful text-xs font-semibold text-tutor-navy/55">
                                                        {option.caption}
                                                    </span>
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ===================== CHARACTER PREVIEW ===================== */}
                            <div className="relative overflow-hidden rounded-xl border-[3px] border-tutor-navy bg-white shadow-[5px_5px_0_0_#071B3A]">
                                {/* Top accent strip = favorite color */}
                                <div
                                    className="h-2"
                                    style={{ backgroundColor: colorMeta.value }}
                                />
                                <div className="relative flex min-h-[210px] items-center justify-center px-5 pb-4 pt-8 sm:min-h-[225px] sm:px-6">
                                    {/* Soft color spotlight */}
                                    <div
                                        className="pointer-events-none absolute inset-0"
                                        style={{
                                            background: `radial-gradient(circle at 50% 42%, ${colorMeta.value}33 0%, rgba(255,249,237,0) 72%)`,
                                        }}
                                    />
                                    {/* Dot grid */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-40"
                                        style={{
                                            backgroundImage:
                                                "radial-gradient(#071B3A 1px, transparent 1px)",
                                            backgroundSize: "16px 16px",
                                        }}
                                    />
                                    {/* Math doodles */}
                                    <span className="pointer-events-none absolute left-3 top-2 font-brutal text-2xl text-tutor-navy/15">
                                        √
                                    </span>
                                    <span className="pointer-events-none absolute right-4 top-3 font-brutal text-lg text-tutor-navy/15">
                                        π
                                    </span>
                                    <span className="pointer-events-none absolute bottom-2 left-5 font-brutal text-xl text-tutor-navy/15">
                                        +
                                    </span>
                                    <span className="pointer-events-none absolute bottom-3 right-6 font-brutal text-xl text-tutor-navy/15">
                                        ×
                                    </span>

                                    {/* Gender ribbon */}
                                    <div className="absolute left-2 top-2 flex">
                                        {genderMeta ? (
                                            <span
                                                className="flex items-center gap-1 rounded-full border-2 border-tutor-navy px-2.5 py-0.5 font-playful text-[11px] font-bold uppercase tracking-wide text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:text-xs"
                                                style={{
                                                    backgroundColor:
                                                        genderMeta.accent,
                                                }}
                                            >
                                                <GenderGlyph
                                                    id={genderMeta.id}
                                                    className="h-3.5 w-3.5"
                                                />
                                                {genderMeta.label} Student
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 rounded-full border-2 border-tutor-navy bg-tutor-navy px-2.5 py-0.5 font-playful text-[11px] font-bold uppercase tracking-wide text-tutor-cream shadow-[2px_2px_0_0_rgba(7,27,58,0.3)] sm:text-xs">
                                                <Users className="h-3.5 w-3.5" />
                                                Pick a student
                                            </span>
                                        )}
                                    </div>

                                    {/* Favorite color chip */}
                                    <div className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full border-2 border-tutor-navy bg-tutor-cream px-2.5 py-0.5 font-playful text-[11px] font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-xs">
                                        <span
                                            className="h-3.5 w-3.5 rounded-full border border-tutor-navy/60"
                                            style={{
                                                backgroundColor: colorMeta.value,
                                            }}
                                        />
                                        {colorMeta.name} splash
                                    </div>

                                    {/* The avatar itself */}
                                    <div className="relative flex flex-col items-center">
                                        <img
                                            src={gender === "girl" ? GIRL_AVATAR : PLAYER_AVATAR}
                                            alt="Character preview"
                                            className="h-32 w-auto max-w-[200px] object-contain drop-shadow-[3px_4px_0_rgba(7,27,58,0.25)] sm:h-36"
                                            style={{
                                                filter: `hue-rotate(${colorMeta.rotation}deg)`,
                                            }}
                                        />
                                        {/* Live name plate */}
                                        <div className="mt-2 rounded-lg border-2 border-tutor-navy bg-tutor-cream px-4 py-1 shadow-[2px_2px_0_0_#071B3A]">
                                            <span className="font-playful text-sm font-bold text-tutor-navy">
                                                {playerName.trim() ||
                                                    "Your name here"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ========================== NAME ========================== */}
                            <div className="space-y-2">
                                <SectionHeading
                                    icon={<Pencil className="h-4 w-4" />}
                                >
                                    What's your name?
                                </SectionHeading>
                                <div className="relative">
                                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tutor-navy/45" />
                                    <input
                                        type="text"
                                        value={playerName}
                                        onChange={(e) =>
                                            setPlayerName(e.target.value)
                                        }
                                        placeholder="Enter your name..."
                                        maxLength={20}
                                        aria-label="What's your name?"
                                        className="w-full rounded-xl border-[3px] border-tutor-navy bg-tutor-cream py-3 pl-10 pr-14 font-playful text-base font-bold text-tutor-navy outline-none shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 placeholder:text-tutor-navy/35 focus:-translate-y-0.5 focus:border-tutor-orange focus:shadow-[4px_4px_0_0_#F26522]"
                                    />
                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-playful text-[11px] font-bold text-tutor-navy/40">
                                        {playerName.length}/20
                                    </span>
                                </div>
                            </div>

                            {/* ====================== CREATE BUTTON ====================== */}
                            <div className="space-y-2 pt-1">
                                <button
                                    type="submit"
                                    disabled={!canCreate}
                                    className={`group flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-tutor-navy py-3.5 font-brutal text-base uppercase tracking-wider transition-all duration-150 sm:py-4 sm:text-lg ${
                                        canCreate
                                            ? "bg-tutor-orange text-tutor-cream shadow-[5px_5px_0_0_#071B3A] hover:-translate-y-1 hover:shadow-[7px_7px_0_0_#071B3A] hover:brightness-105 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A]"
                                            : "cursor-not-allowed bg-[#D8CFC0] text-tutor-navy/40 shadow-[3px_3px_0_0_rgba(7,27,58,0.35)]"
                                    }`}
                                >
                                    Create Character
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>
                                {!canCreate && (
                                    <p className="text-center font-playful text-xs font-bold uppercase tracking-wide text-tutor-navy/50">
                                        {!genderReady && !nameReady
                                            ? "Pick a student and type your name to begin!"
                                            : !genderReady
                                              ? "Pick a student to begin!"
                                              : "Type your name to begin!"}
                                    </p>
                                )}
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
};

