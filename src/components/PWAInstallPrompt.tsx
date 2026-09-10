import React, { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PWAInstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if app is already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
            console.log("✅ Tutor Town is running as installed PWA");
            return;
        }

        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent the default install prompt
            e.preventDefault();

            // Store the event for later use
            setDeferredPrompt(e as BeforeInstallPromptEvent);

            // Show custom install button after 10 seconds
            setTimeout(() => {
                setShowInstallPrompt(true);
                console.log("📱 PWA install prompt ready");
            }, 10000); // Show after 10 seconds of gameplay
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        // Listen for app installed event
        window.addEventListener("appinstalled", () => {
            console.log("✅ Tutor Town PWA installed successfully!");
            setIsInstalled(true);
            setShowInstallPrompt(false);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            console.log("⚠️ Install prompt not available");
            return;
        }

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user's response
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            console.log("✅ User accepted the install prompt");
        } else {
            console.log("❌ User dismissed the install prompt");
        }

        // Clear the deferredPrompt
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);

        // Show again after 5 minutes
        setTimeout(() => {
            if (deferredPrompt && !isInstalled) {
                setShowInstallPrompt(true);
            }
        }, 300000); // 5 minutes
    };

    // Don't show if already installed or no prompt available
    if (isInstalled || !showInstallPrompt || !deferredPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-[9999] pointer-events-auto animate-bounce">
            <div className="brutal-panel p-4 max-w-xs sm:max-w-sm relative">
                {/* Content */}
                <div className="bg-white rounded-none p-4 relative">
                    <button
                        onClick={handleDismiss}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-brutal-red border-2 border-black flex items-center justify-center text-white text-xs shadow-brutal-xs brutal-press"
                    >
                        ✕
                    </button>

                    <div className="flex items-center space-x-3 mb-3">
                        <img
                            src="/logo.png"
                            alt="Tutor Town Logo"
                            className="w-8 h-8 drop-shadow-lg"
                        />
                        <div>
                            <h3 className="font-brutal uppercase text-gray-900 text-sm">
                                Install Tutor Town
                            </h3>
                            <p className="text-xs text-gray-700">
                                Play offline anytime!
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3">
                        Install Tutor Town on your device for:
                    </p>

                    <ul className="text-xs text-gray-700 mb-3 space-y-1">
                        <li>✅ Offline gameplay</li>
                        <li>✅ Faster loading</li>
                        <li>✅ Full-screen experience</li>
                        <li>✅ Home screen icon</li>
                    </ul>

                    <div className="flex space-x-2">
                        <button
                            onClick={handleInstallClick}
                            className="flex-1 game-button-frame py-2 px-4 rounded-none font-bold text-white text-xs"
                        >
                            📥 Install Now
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="px-3 py-2 bg-white border-2 border-black rounded-none font-bold text-gray-800 text-xs brutal-press"
                        >
                            Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
