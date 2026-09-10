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
        <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
            <button
                onClick={onInteract}
                className="w-16 h-16 rounded-full bg-brutal-orange bg-opacity-90 border-[3px] border-black shadow-brutal flex items-center justify-center text-black font-bold uppercase text-sm active:translate-y-1 active:shadow-none transition-all duration-150"
            >
                TAP
            </button>
        </div>
    );
};
