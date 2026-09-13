import React from "react";
import { X, Star, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";

export interface NotificationData {
    type: "success" | "warning" | "info" | "error";
    title: string;
    message: string;
    icon?: string;
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

export const GameNotification: React.FC<GameNotificationProps> = ({
    notification,
    onClose,
    isVisible,
}) => {
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
        style?: "primary" | "secondary" | "danger"
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

    return (
        <div className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-4">
            {/* Tutor Town game window: navy outer frame, yellow inner frame */}
            <section className="relative w-full max-w-lg animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                <div className="rounded-[14px] border-2 border-tutor-yellow px-5 py-6 sm:px-7">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        type="button"
                        aria-label="Close notification"
                        className="absolute right-2.5 top-2.5 z-20 flex h-10 w-10 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Header */}
                    <div className="mb-4 text-center">
                        <h2 className="font-brutal text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                            {notification.title}
                        </h2>
                        <div className="mt-1.5 flex items-center justify-center gap-2">
                            <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                            <Star
                                className="h-4 w-4 text-tutor-yellow"
                                fill={YELLOW}
                            />
                            <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                        </div>
                    </div>

                    {/* Icon + Message */}
                    <div className="mb-5 text-center">
                        <div className="mb-4 flex items-center justify-center">
                            <span
                                className={`flex h-16 w-16 items-center justify-center rounded-2xl border-[3px] border-tutor-navy shadow-[3px_3px_0_0_#071B3A] ${getTypeStyles().tile}`}
                            >
                                {typeof iconToShow === "string" ? (
                                    <span className="text-3xl leading-none">
                                        {iconToShow}
                                    </span>
                                ) : (
                                    iconToShow
                                )}
                            </span>
                        </div>
                        <div
                            className={`rounded-xl border-[3px] border-tutor-navy p-4 font-playful text-sm leading-relaxed sm:text-base ${getMessageBox()}`}
                        >
                            {notification.message}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2.5">
                        {notification.actions && notification.actions.length > 0 ? (
                            notification.actions.map((action, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        action.action();
                                        onClose();
                                    }}
                                    className={`w-full rounded-xl border-[3px] border-tutor-navy py-3 font-brutal text-sm uppercase tracking-wider transition-all duration-150 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A] ${getButtonStyles(
                                        action.style
                                    )}`}
                                >
                                    {action.label}
                                </button>
                            ))
                        ) : (
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full rounded-xl border-[3px] border-tutor-navy bg-tutor-orange py-3 font-brutal text-sm uppercase tracking-wider text-tutor-cream shadow-[4px_4px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[5px_5px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#071B3A]"
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