import React, { useEffect } from "react";
import {
    X,
    Star,
    CheckCircle2,
    AlertTriangle,
    Info,
    XCircle,
} from "lucide-react";

export type NotificationPresentation = "modal" | "toast";

export interface NotificationData {
    type: "success" | "warning" | "info" | "error";
    title: string;
    message: string;
    icon?: string;
    presentation?: NotificationPresentation;
    actions?: Array<{
        label: string;
        action: () => void;
        style?: "primary" | "secondary" | "danger";
    }>;
}

interface GameNotificationProps {
    notification: NotificationData | null;
    onClose: () => void;
    isVisible: boolean;
}

const YELLOW = "#FFD84D";

// How long a toast stays on screen before auto-dismissing.
const TOAST_DURATION_MS = 3000;

export const GameNotification: React.FC<GameNotificationProps> = ({
    notification,
    onClose,
    isVisible,
}) => {
    // Toasts auto-dismiss after a short while; modals wait for the player.
    useEffect(() => {
        if (!notification || notification.presentation !== "toast") return;
        const timer = setTimeout(onClose, TOAST_DURATION_MS);
        return () => clearTimeout(timer);
    }, [notification, onClose]);

    if (!notification || !isVisible) return null;

    const getTypeStyles = (): { tile: string; icon: React.ReactNode } => {
        switch (notification.type) {
            case "success":
                return {
                    tile: "bg-tutor-green text-tutor-cream",
                    icon: <CheckCircle2 className="h-7 w-7" />,
                };
            case "warning":
                return {
                    tile: "bg-tutor-yellow text-tutor-navy",
                    icon: <AlertTriangle className="h-7 w-7" />,
                };
            case "info":
                return {
                    tile: "bg-tutor-blue text-tutor-cream",
                    icon: <Info className="h-7 w-7" />,
                };
            case "error":
            default:
                return {
                    tile: "bg-tutor-red text-tutor-cream",
                    icon: <XCircle className="h-7 w-7" />,
                };
        }
    };

    const getMessageBox = (): string => {
        switch (notification.type) {
            case "success":
                return "bg-tutor-green/15 text-tutor-navy";
            case "warning":
                return "bg-tutor-yellow/20 text-tutor-navy";
            case "info":
                return "bg-tutor-blue/10 text-tutor-navy";
            case "error":
            default:
                return "bg-tutor-red/10 text-tutor-navy";
        }
    };

    const getButtonStyles = (
        style?: "primary" | "secondary" | "danger",
    ): string => {
        switch (style) {
            case "primary":
                return "bg-tutor-orange text-tutor-cream shadow-[4px_4px_0_0_#071B3A] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[5px_5px_0_0_#071B3A]";
            case "danger":
                return "bg-tutor-red text-tutor-cream shadow-[4px_4px_0_0_#071B3A] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[5px_5px_0_0_#071B3A]";
            case "secondary":
            default:
                return "bg-tutor-cream text-tutor-navy shadow-[4px_4px_0_0_#071B3A] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#071B3A]";
        }
    };

    const iconToShow = notification.icon || getTypeStyles().icon;

    // Non-blocking toast: stays out of the way, gameplay continues.
    if (notification.presentation === "toast") {
        return (
            <div
                className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex justify-center"
                style={{
                    paddingTop: "calc(8px + env(safe-area-inset-top, 0px))",
                    paddingLeft:
                        "calc(8px + env(safe-area-inset-left, 0px))",
                    paddingRight:
                        "calc(8px + env(safe-area-inset-right, 0px))",
                }}
            >
                <div className="pointer-events-auto flex w-full max-w-md items-center gap-2 sm:gap-3 animate-slide-down rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-1.5 sm:p-2 px-2 sm:px-3 shadow-[4px_4px_0_0_#071B3A] sm:shadow-[6px_6px_0_0_#071B3A]">
                    <span
                        className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg border-[3px] border-tutor-navy shadow-[2px_2px_0_0_#071B3A] ${getTypeStyles().tile}`}
                    >
                        {typeof iconToShow === "string" ? (
                            <span className="text-xl leading-none">
                                {iconToShow}
                            </span>
                        ) : (
                            iconToShow
                        )}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate font-brutal text-xs sm:text-sm uppercase leading-snug tracking-wide text-tutor-navy">
                            {notification.title}
                        </p>
                        <p className="font-playful text-xs sm:text-sm leading-snug text-tutor-navy/80">
                            {notification.message}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        type="button"
                        aria-label="Dismiss notification"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-1.5 sm:p-4">
            {/* Tutor Town game window: navy outer frame, yellow inner frame */}
            <section className="relative w-full min-[380px]:max-w-lg max-w-[calc(100vw-6px)] animate-slide-up rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-tutor-navy bg-tutor-cream p-1 sm:p-1.5 shadow-[6px_6px_0_0_#071B3A] sm:shadow-[8px_8px_0_0_#071B3A]">
                <div className="max-h-[calc(100dvh-20px)] overflow-y-auto overscroll-contain rounded-[10px] sm:rounded-[14px] border-2 border-tutor-yellow px-2.5 py-3 sm:px-4 sm:py-4">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        type="button"
                        aria-label="Close notification"
                        className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[3px_3px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                    >
                        <X className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                    </button>

                    {/* Header */}
                    <div className="mb-2 sm:mb-4 text-center pr-6">
                        <h2 className="font-brutal text-base sm:text-xl md:text-2xl uppercase leading-tight tracking-wide text-tutor-navy">
                            {notification.title}
                        </h2>
                        <div className="mt-1 flex items-center justify-center gap-1.5 sm:gap-2">
                            <div className="h-1 w-5 sm:w-8 rounded-full bg-tutor-orange" />
                            <Star
                                className="h-3 w-3 sm:h-4 sm:w-4 text-tutor-yellow"
                                fill={YELLOW}
                            />
                            <div className="h-1 w-5 sm:w-8 rounded-full bg-tutor-orange" />
                        </div>
                    </div>

                    {/* Icon + Message */}
                    <div className="mb-3 sm:mb-5 text-center">
                        <div className="mb-2 sm:mb-4 flex items-center justify-center">
                            <span
                                className={`flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl border-[3px] border-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:shadow-[3px_3px_0_0_#071B3A] ${getTypeStyles().tile}`}
                            >
                                {typeof iconToShow === "string" ? (
                                    <span className="text-xl sm:text-3xl leading-none">
                                        {iconToShow}
                                    </span>
                                ) : (
                                    <span className="scale-75 sm:scale-100">
                                        {iconToShow}
                                    </span>
                                )}
                            </span>
                        </div>
                        <div
                            className={`rounded-lg sm:rounded-xl border-[3px] border-tutor-navy p-2 sm:p-4 font-playful text-[11px] sm:text-sm leading-relaxed ${getMessageBox()}`}
                        >
                            {notification.message}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-center sm:gap-2">
                        {notification.actions &&
                        notification.actions.length > 0 ? (
                            notification.actions.map((action, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        action.action();
                                        onClose();
                                    }}
                                    className={`w-full min-h-[44px] rounded-lg sm:rounded-xl border-[3px] border-tutor-navy px-3 sm:px-4 py-2 sm:py-2.5 font-brutal text-[11px] sm:text-sm uppercase tracking-wider transition-all duration-150 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] ${getButtonStyles(
                                        action.style,
                                    )}`}
                                >
                                    {action.label}
                                </button>
                            ))
                        ) : (
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full min-h-[44px] rounded-lg sm:rounded-xl border-[3px] border-tutor-navy bg-tutor-orange px-3 sm:px-4 py-2 sm:py-2.5 font-brutal text-[11px] sm:text-sm uppercase tracking-wider text-tutor-cream shadow-[3px_3px_0_0_#071B3A] sm:shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A]"
                            >
                                👍 OK
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

