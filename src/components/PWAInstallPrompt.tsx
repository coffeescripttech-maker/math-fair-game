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
            console.log("✅ MathTuto is running as installed PWA");
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
            handleBeforeInstallPrompt,
        );

        // Listen for app installed event
        window.addEventListener("appinstalled", () => {
            console.log("✅ MathTuto PWA installed successfully!");
            setIsInstalled(true);
            setShowInstallPrompt(false);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt,
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
        <div
            className="fixed z-[9999] pointer-events-auto"
            style={{
                bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
                right: "calc(16px + env(safe-area-inset-right, 0px))",
                left: "calc(16px + env(safe-area-inset-left, 0px))",
            }}
        >
            <div className="brutal-panel relative max-h-[calc(100dvh-32px)] w-full max-w-xs overflow-y-auto p-4 sm:max-w-sm">
                {/* Content */}
                <div className="bg-white rounded-none p-4 relative">
                    <button
                        onClick={handleDismiss}
                        aria-label="Dismiss install prompt"
                        className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center bg-brutal-red border-2 border-black text-white text-xs shadow-brutal-xs brutal-press"
                    >
                        ✕
                    </button>

                    <div className="flex items-center space-x-3 mb-3">
                        <img
                            src="/logo.jpg"
                            alt="MathTuto Logo"
                            className="w-8 h-8 drop-shadow-lg animate-pulse"
                        />
                        <div>
                            <h3 className="font-brutal uppercase text-gray-900 text-sm">
                                Install MathTuto
                            </h3>
                            <p className="text-xs text-gray-700">
                                Play offline anytime!
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3">
                        Install MathTuto on your device for:
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
                            className="flex-1 game-button-frame min-h-[44px] px-4 rounded-none font-bold text-white text-xs"
                        >
                            📥 Install Now
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="min-h-[44px] px-3 bg-white border-2 border-black rounded-none font-bold text-gray-800 text-xs brutal-press"
                        >
                            Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
