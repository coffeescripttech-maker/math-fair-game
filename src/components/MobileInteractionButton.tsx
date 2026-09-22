import React from "react";

interface MobileInteractionButtonProps {
    onInteract: () => void;
    isVisible: boolean;
}

export const MobileInteractionButton: React.FC<
    MobileInteractionButtonProps
> = ({ onInteract, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div
            className="fixed z-30 pointer-events-auto"
            style={{
                bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
                right: "calc(16px + env(safe-area-inset-right, 0px))",
            }}
        >
            <button
                onClick={onInteract}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brutal-orange bg-opacity-90 border-[3px] border-black shadow-brutal flex items-center justify-center text-black font-bold uppercase text-xs sm:text-sm active:translate-y-1 active:shadow-none transition-all duration-150"
            >
                TAP
            </button>
        </div>
    );
};
