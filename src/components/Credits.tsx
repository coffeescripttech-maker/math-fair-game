import React from "react";

interface CreditsProps {
    onClose: () => void;
    isVisible: boolean;
}

export const Credits: React.FC<CreditsProps> = ({ onClose, isVisible }) => {
    const developmentTeam = [
        {
            role: "Project Lead",
            name: "Your University Team",
            description: "Overall project direction and coordination",
            icon: "👨‍💼",
        },
        {
            role: "Game Designer",
            name: "Tutor Town Development Team",
            description: "Game mechanics and educational content design",
            icon: "🎮",
        },
        {
            role: "Frontend Developer",
            name: "React & TypeScript Team",
            description: "User interface and game logic implementation",
            icon: "💻",
        },
        {
            role: "Educational Consultant",
            name: "Math Education Specialists",
            description: "Philippine algebra education content and validation",
            icon: "📚",
        },
        {
            role: "Art & Design",
            name: "Visual Design Team",
            description: "Medieval UI theme and visual assets",
            icon: "🎨",
        },
        {
            role: "Audio Engineer",
            name: "Sound Design Team",
            description: "Background music and sound effects",
            icon: "🎵",
        },
    ];

    const technologies = [
        {
            name: "React 18",
            description: "User interface framework",
            icon: "⚛️",
        },
        { name: "TypeScript", description: "Type-safe JavaScript", icon: "📘" },
        {
            name: "Phaser 3",
            description: "2D game development framework",
            icon: "🎮",
        },
        {
            name: "Tailwind CSS",
            description: "Utility-first CSS framework",
            icon: "🎨",
        },
        {
            name: "Vite",
            description: "Fast build tool and dev server",
            icon: "⚡",
        },
        {
            name: "LocalStorage API",
            description: "Game progress persistence",
            icon: "💾",
        },
    ];

    const specialThanks = [
        {
            name: "Philippine Education Community",
            description: "Mathematics education curriculum and standards",
            icon: "🏛️",
        },
        {
            name: "Educational Institutions",
            description: "Research and educational methodology support",
            icon: "🏫",
        },
        {
            name: "Community Leaders",
            description: "Real-world tutoring and student learning insights",
            icon: "👥",
        },
        {
            name: "Student Testers",
            description: "Gameplay feedback and educational validation",
            icon: "🎓",
        },
        {
            name: "Open Source Community",
            description: "Tools, libraries, and frameworks",
            icon: "💖",
        },
    ];

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center pointer-events-auto z-50 p-4">
            <div className="brutal-panel p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white brutal-press z-20"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-brutal uppercase text-gray-900 mb-4">
                        👥 Credits
                    </h2>
                    <div className="flex items-center justify-center mb-4">
                        <img
                            src="/logo.png"
                            alt="Tutor Town Logo"
                            className="w-16 h-16 mr-4 drop-shadow-lg"
                        />
                        <div className="text-gray-900 text-lg font-brutal uppercase">
                            Tutor Town - Radicals & Inverse Functions
                        </div>
                    </div>
                    <div className="text-gray-600 text-sm mt-2">
                        Version 1.0.0 • 2025 Capstone Project
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Development Team */}
                    <section>
                        <h3 className="text-xl font-brutal uppercase text-gray-900 border-b-[3px] border-black pb-2 mb-4 flex items-center">
                            <span className="mr-2">👨‍💻</span>
                            Development Team
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {developmentTeam.map((member, index) => (
                                <div
                                    key={index}
                                    className="rounded-none p-4 border-[3px] border-black bg-white shadow-brutal-sm"
                                >
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">
                                            {member.icon}
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-gray-800">
                                                {member.role}
                                            </h4>
                                            <p className="font-semibold text-gray-700 text-sm">
                                                {member.name}
                                            </p>
                                            <p className="text-gray-600 text-xs mt-1">
                                                {member.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Technologies Used */}
                    <section>
                        <h3 className="text-xl font-brutal uppercase text-gray-900 border-b-[3px] border-black pb-2 mb-4 flex items-center">
                            <span className="mr-2">⚙️</span>
                            Technologies Used
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    className="rounded-none p-3 border-[3px] border-black bg-brutal-blue shadow-brutal-xs"
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl">
                                            {tech.icon}
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">
                                                {tech.name}
                                            </h4>
                                            <p className="text-gray-800 text-xs">
                                                {tech.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Special Thanks */}
                    <section>
                        <h3 className="text-xl font-brutal uppercase text-gray-900 border-b-[3px] border-black pb-2 mb-4 flex items-center">
                            <span className="mr-2">🙏</span>
                            Special Thanks
                        </h3>
                        <div className="space-y-3">
                            {specialThanks.map((thanks, index) => (
                                <div
                                    key={index}
                                    className="rounded-none p-4 border-[3px] border-black bg-brutal-green shadow-brutal-xs flex items-center space-x-3"
                                >
                                    <span className="text-2xl">
                                        {thanks.icon}
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-gray-900">
                                            {thanks.name}
                                        </h4>
                                        <p className="text-gray-800 text-sm">
                                            {thanks.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Educational Mission */}
                    <section>
                        <h3 className="text-xl font-brutal uppercase text-gray-900 border-b-[3px] border-black pb-2 mb-4 flex items-center">
                            <span className="mr-2">🎓</span>
                            Educational Mission
                        </h3>
                        <div className="rounded-none p-6 bg-brutal-yellow border-[3px] border-black shadow-brutal-sm">
                            <p className="text-gray-700 text-center leading-relaxed">
                                <strong>Tutor Town</strong> was created as a
                                capstone project to teach algebra through
                                interactive gameplay and real-world problem solving.
                                Filipino students explore their community and city,
                                solving mathematical challenges that mirror everyday
                                situations, from market transactions to business planning,
                                building both algebraic skills and practical mathematical thinking.
                            </p>
                            <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
                                <div className="text-center">
                                    <div className="text-lg">📐</div>
                                    <div>Algebra Education</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg">🎮</div>
                                    <div>Interactive Learning</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg">🇵🇭</div>
                                    <div>Philippine Context</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg">💡</div>
                                    <div>Problem Solving</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Copyright */}
                    <section>
                        <div className="text-center p-4 border-t-2 border-gray-800">
                            <div className="text-gray-700 text-sm mb-2">
                                © 2025 Tutor Town Development Team. Created for
                                educational purposes.
                            </div>
                            <div className="text-gray-200 text-xs">
                                This game is part of a university capstone
                                project and is designed to teach algebra
                                and mathematical thinking to Filipino students
                                through engaging, real-world scenarios.
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
};
