import React from "react";

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

export const GameNotification: React.FC<GameNotificationProps> = ({
    notification,
    onClose,
    isVisible,
}) => {
    if (!notification || !isVisible) {
        return null;
    }

    const getTypeStyles = () => {
        switch (notification.type) {
            case "success":
                return {
                    bgColor: "bg-brutal-green",
                    border: "border-black",
                    icon: notification.icon || "🎉",
                    titleColor: "text-gray-900",
                    messageColor: "text-gray-800",
                };
            case "warning":
                return {
                    bgColor: "bg-brutal-yellow",
                    border: "border-black",
                    icon: notification.icon || "⚠️",
                    titleColor: "text-gray-900",
                    messageColor: "text-gray-800",
                };
            case "info":
                return {
                    bgColor: "bg-brutal-blue",
                    border: "border-black",
                    icon: notification.icon || "ℹ️",
                    titleColor: "text-gray-900",
                    messageColor: "text-gray-800",
                };
            case "error":
                return {
                    bgColor: "bg-brutal-red",
                    border: "border-black",
                    icon: notification.icon || "❌",
                    titleColor: "text-white",
                    messageColor: "text-white",
                };
            default:
                return {
                    bgColor: "bg-white",
                    border: "border-black",
                    icon: notification.icon || "💬",
                    titleColor: "text-gray-900",
                    messageColor: "text-gray-700",
                };
        }
    };

    const getButtonStyles = (style?: string) => {
        switch (style) {
            case "primary":
                return "bg-brutal-orange border-[3px] border-black text-white shadow-brutal-xs brutal-press";
            case "danger":
                return "bg-brutal-red border-[3px] border-black text-white shadow-brutal-xs brutal-press";
            case "secondary":
            default:
                return "bg-white border-[3px] border-black text-black shadow-brutal-xs brutal-press";
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center pointer-events-auto z-50 p-4">
            <div
                className={`brutal-panel p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto custom-scrollbar relative`}
            >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white brutal-press z-20"
                    >
                        ✕
                    </button>

                    {/* Content */}
                    <div className="text-center space-y-4">
                        {/* Icon */}
                        <div className="text-5xl mb-2">
                            {styles.icon}
                        </div>

                        {/* Title */}
                        <h2
                            className={`text-2xl font-brutal uppercase ${styles.titleColor} mb-2`}
                        >
                            {notification.title}
                        </h2>

                        {/* Message */}
                        <div className={`rounded-none border-[3px] border-black shadow-brutal-sm ${styles.bgColor} p-4`}>
                            <p
                                className={`text-base ${styles.messageColor} leading-relaxed`}
                            >
                                {notification.message}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2 mt-6">
                            {notification.actions &&
                            notification.actions.length > 0 ? (
                                notification.actions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            // Execute the action
                                            action.action();
                                            // Close the notification
                                            onClose();
                                        }}
                                        className={`w-full py-3 px-6 rounded-none transition-all duration-150 font-bold uppercase ${getButtonStyles(
                                            action.style
                                        )}`}
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <span>{action.label}</span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <button
                                    onClick={onClose}
                                    className="w-full bg-brutal-orange border-[3px] border-black text-white py-3 px-6 rounded-none transition-all duration-150 font-bold uppercase shadow-brutal-xs brutal-press"
                                >
                                    <div className="text-white flex items-center justify-center space-x-2">
                                        <span>👍</span>
                                        <span>OK</span>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
            </div>
        </div>
    );
};
