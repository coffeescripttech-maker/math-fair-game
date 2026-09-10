import React, { useState } from "react";

interface CharacterCreationProps {
    onCharacterCreated: (name: string, color: string) => void;
}

const colorOptions = [
    { name: "Green", value: "#00ff00", bg: "bg-green-500" },
    { name: "Blue", value: "#0066ff", bg: "bg-blue-500" },
    { name: "Red", value: "#ff0000", bg: "bg-red-500" },
    { name: "Yellow", value: "#ffff00", bg: "bg-yellow-500" },
    { name: "Purple", value: "#9900ff", bg: "bg-purple-500" },
    { name: "Orange", value: "#ff6600", bg: "bg-orange-500" },
];

export const CharacterCreation: React.FC<CharacterCreationProps> = ({
    onCharacterCreated,
}) => {
    const [playerName, setPlayerName] = useState("");
    const [selectedColor, setSelectedColor] = useState("#00ff00");

    // Function to convert hex color to hue rotation for CSS filter
    const getHueRotation = (hexColor: string) => {
        const colorMap: { [key: string]: number } = {
            "#00ff00": 0, // Green - no rotation
            "#0066ff": 240, // Blue
            "#ff0000": 0, // Red - no rotation
            "#ffff00": 60, // Yellow
            "#9900ff": 270, // Purple
            "#ff6600": 30, // Orange
        };
        return colorMap[hexColor] || 0;
    };

    const handleSubmit = () => {
        if (playerName.trim()) {
            onCharacterCreated(playerName.trim(), selectedColor);
        }
    };

    return (
        <div className="fixed inset-0 bg-brutal-bg flex items-center justify-center z-50 overflow-y-auto p-4">
            {/* Main content */}
            <div className="w-full max-w-md mx-auto">
                {/* Character Creation Container - Neobrutalist */}
                <div className="brutal-panel p-6 sm:p-8">
                        {/* Title - Simple */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-brutal uppercase tracking-wide text-gray-900">
                                Create Your Character
                            </h1>
                        </div>
                        {/* <p className="text-lg sm:text-xl text-amber-700 mb-6 sm:mb-8 text-center font-medium game-element-border rounded-md py-2 px-4">
                            🏰 Customize your tutor character 🏰
                        </p> */}

                        {/* Character Preview */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="rounded-none p-2 border-[3px] border-black bg-white shadow-brutal-sm">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-none overflow-hidden">
                                        <img
                                            src="/assets/student-sprites/front/front-1-removebg-preview.png"
                                            alt="Character Preview"
                                            className="w-full h-full object-cover"
                                            style={{
                                                filter: `hue-rotate(${getHueRotation(
                                                    selectedColor
                                                )}deg)`,
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* Glow effect */}
                                <div
                                    className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-none animate-ping opacity-20"
                                    style={{ backgroundColor: selectedColor }}
                                ></div>
                            </div>
                        </div>

                        {/* Name Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => {
                                    console.log(
                                        "Input changed:",
                                        e.target.value
                                    );
                                    setPlayerName(e.target.value);
                                }}
                                placeholder="Enter your name..."
                                className="w-full px-4 py-3 text-sm sm:text-base border-[3px] border-black rounded-none focus:outline-none transition-all duration-150 text-gray-900 bg-white shadow-brutal-sm focus:shadow-brutal focus:-translate-x-0.5 focus:-translate-y-0.5"
                                maxLength={20}
                                autoFocus
                            />
                            {/* Debug display */}
                            {/* <div className="mt-1 text-xs text-amber-600 text-center">
                                Current value: "{playerName}" (Length:{" "}
                                {playerName.length})
                            </div> */}
                        </div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold uppercase text-gray-800 mb-3 text-center">
                                Choose your color:
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() =>
                                            setSelectedColor(color.value)
                                        }
                                        className={`p-3 rounded-none border-[3px] border-black transition-all duration-150 hover:-translate-y-0.5 ${
                                            selectedColor === color.value
                                                ? "bg-brutal-yellow shadow-brutal"
                                                : "bg-white shadow-brutal-xs hover:shadow-brutal-sm"
                                        }`}
                                    >
                                        <div
                                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-none border-2 border-black ${color.bg} mx-auto mb-1`}
                                        ></div>
                                        <div className="text-xs font-bold uppercase text-gray-800">
                                            {color.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                disabled={!playerName.trim()}
                                className="w-full bg-brutal-orange border-[3px] border-black text-white py-3 rounded-none font-brutal uppercase shadow-brutal brutal-press disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create Character
                            </button>
                        </div>
                </div>
            </div>
        </div>
    );
};
