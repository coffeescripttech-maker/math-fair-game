/**
 * Shop Component for CIVIKA
 * Displays shop items, handles purchases, and shows player inventory
 */

import React, { useState, useEffect } from "react";
import ShopService from "../services/ShopService";
import {
    ShopItem,
    ShopItemCategory,
    ShopItemRarity,
    PurchasedItem,
} from "../types/shop";
import { GameStateManager } from "../utils/GameStateManager";
import {
    X,
    Store,
    Backpack,
    Coins,
    Lock,
    Star,
    Zap,
    TrendingUp,
    Crown,
    Gift,
} from "lucide-react";

interface ShopProps {
    onClose: () => void;
    isVisible: boolean;
}

const YELLOW = "#FFD84D";

export const Shop: React.FC<ShopProps> = ({ onClose, isVisible }) => {
    const [selectedCategory, setSelectedCategory] = useState<ShopItemCategory>(
        ShopItemCategory.POWERUPS
    );
    const [shopItems, setShopItems] = useState<ShopItem[]>([]);
    const [playerCoins, setPlayerCoins] = useState(0);
    const [playerLevel, setPlayerLevel] = useState(1);
    const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
    const [showInventory, setShowInventory] = useState(false);
    const shopService = ShopService.getInstance();
    const gameStateManager = GameStateManager.getInstance();

    useEffect(() => {
        if (isVisible) {
            loadShopData();
        }
    }, [isVisible, selectedCategory]);

    const loadShopData = () => {
        // Get player data
        const progress = gameStateManager.getProgress();
        if (progress) {
            setPlayerCoins(progress.coins);
            setPlayerLevel(progress.level);
        }

        // Get shop items for current category and player level
        const availableItems = shopService.getAvailableItems(
            progress?.level || 1
        );
        const categoryItems = availableItems.filter(
            (item) => item.category === selectedCategory
        );
        setShopItems(categoryItems);

        // Get purchased items
        const inventory = shopService.getInventory();
        setPurchasedItems(inventory.purchasedItems);
    };

    const handlePurchase = (item: ShopItem) => {
        const result = shopService.purchaseItem(item.id);

        if (result.success) {
            // Show success notification
            alert(
                `✅ ${result.message}\n\n${
                    item.effect
                        ? "Effect activated!"
                        : "Added to your collection!"
                }`
            );
            loadShopData(); // Refresh shop data
        } else {
            // Show error
            alert(`❌ ${result.message}`);
        }
    };

    const getRarityColor = (rarity: ShopItemRarity): string => {
        switch (rarity) {
            case ShopItemRarity.LEGENDARY:
                return "bg-tutor-yellow text-tutor-navy";
            case ShopItemRarity.RARE:
                return "bg-tutor-purple text-tutor-cream";
            case ShopItemRarity.UNCOMMON:
                return "bg-tutor-blue text-tutor-cream";
            case ShopItemRarity.COMMON:
            default:
                return "bg-[#E5DCC9] text-tutor-navy";
        }
    };

    const getRarityBadge = (rarity: ShopItemRarity): string => {
        switch (rarity) {
            case ShopItemRarity.LEGENDARY:
                return "⭐⭐⭐";
            case ShopItemRarity.RARE:
                return "⭐⭐";
            case ShopItemRarity.UNCOMMON:
                return "⭐";
            case ShopItemRarity.COMMON:
            default:
                return "";
        }
    };

    const canAfford = (item: ShopItem): boolean => {
        return playerCoins >= item.price;
    };

    const isUnlocked = (item: ShopItem): boolean => {
        return !item.unlockLevel || playerLevel >= item.unlockLevel;
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Tutor Town game window: navy outer frame, yellow inner frame */}
                <section className="relative w-full max-w-5xl animate-slide-up rounded-2xl border-4 border-tutor-navy bg-tutor-cream p-1.5 shadow-[8px_8px_0_0_#071B3A]">
                    <div className="flex max-h-[90vh] flex-col rounded-[14px] border-2 border-tutor-yellow px-5 py-5 sm:px-7">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            type="button"
                            aria-label="Close shop"
                            className="absolute right-2.5 top-2.5 z-20 flex h-10 w-10 items-center justify-center rounded-lg border-[3px] border-tutor-navy bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Header */}
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pr-10">
                            <div>
                                <h2 className="font-brutal text-2xl uppercase leading-tight tracking-wide text-tutor-navy sm:text-3xl">
                                    Shop
                                </h2>
                                <div className="mt-1.5 flex items-center gap-2">
                                    <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                    <Star
                                        className="h-4 w-4 text-tutor-yellow"
                                        fill={YELLOW}
                                    />
                                    <div className="h-1.5 w-8 rounded-full bg-tutor-orange" />
                                </div>
                                <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border-2 border-tutor-navy bg-tutor-yellow px-3 py-1 font-playful text-xs font-bold uppercase tracking-wide text-tutor-navy shadow-[2px_2px_0_0_#071B3A] sm:text-sm">
                                    <Store className="h-4 w-4" />
                                    Upgrade your adventure
                                </p>
                            </div>
                            {/* Player Coins */}
                            <div className="flex items-center gap-2 rounded-xl border-[3px] border-tutor-navy bg-tutor-yellow px-4 py-2.5 shadow-[3px_3px_0_0_#071B3A]">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-green text-tutor-cream">
                                    <Coins className="h-5 w-5" />
                                </span>
                                <span className="font-brutal text-xl text-tutor-navy">
                                    {playerCoins}
                                </span>
                            </div>
                        </div>

                        {/* View Tabs: Shop / Inventory */}
                        <div className="mb-4 flex flex-wrap gap-2">
                            <button
                                onClick={() => setShowInventory(false)}
                                type="button"
                                className={`flex items-center gap-2 rounded-xl border-[3px] px-3 py-2 font-brutal text-xs uppercase tracking-wide transition-all duration-150 sm:text-sm ${
                                    !showInventory
                                        ? "-translate-y-0.5 border-tutor-navy bg-tutor-navy text-tutor-cream shadow-[0_0_0_3px_#FFD84D,5px_5px_0_0_#071B3A]"
                                        : "border-tutor-navy bg-tutor-cream text-tutor-navy opacity-80 shadow-[3px_3px_0_0_#071B3A] hover:-translate-y-0.5 hover:opacity-100 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                }`}
                            >
                                <span
                                    className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${
                                        !showInventory
                                            ? "border-tutor-navy bg-tutor-yellow text-tutor-navy"
                                            : "border-tutor-navy bg-tutor-orange text-tutor-cream"
                                    }`}
                                >
                                    <Store className="h-3.5 w-3.5" />
                                </span>
                                <span>Shop</span>
                            </button>
                            <button
                                onClick={() => setShowInventory(true)}
                                type="button"
                                className={`flex items-center gap-2 rounded-xl border-[3px] px-3 py-2 font-brutal text-xs uppercase tracking-wide transition-all duration-150 sm:text-sm ${
                                    showInventory
                                        ? "-translate-y-0.5 border-tutor-navy bg-tutor-navy text-tutor-cream shadow-[0_0_0_3px_#FFD84D,5px_5px_0_0_#071B3A]"
                                        : "border-tutor-navy bg-tutor-cream text-tutor-navy opacity-80 shadow-[3px_3px_0_0_#071B3A] hover:-translate-y-0.5 hover:opacity-100 hover:shadow-[4px_4px_0_0_#071B3A] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                }`}
                            >
                                <span
                                    className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${
                                        showInventory
                                            ? "border-tutor-navy bg-tutor-yellow text-tutor-navy"
                                            : "border-tutor-navy bg-tutor-purple text-tutor-cream"
                                    }`}
                                >
                                    <Backpack className="h-3.5 w-3.5" />
                                </span>
                                <span>Inventory ({purchasedItems.length})</span>
                            </button>
                        </div>

                        {!showInventory ? (
                            <>
                                {/* Category Tabs */}
                                <div className="mb-4 flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                                    {[
                                        {
                                            cat: ShopItemCategory.POWERUPS,
                                            icon: <Zap className="h-3 w-3" />,
                                            label: "Powerups",
                                            accent: "bg-tutor-orange",
                                        },
                                        {
                                            cat: ShopItemCategory.BOOSTERS,
                                            icon: (
                                                <TrendingUp className="h-3 w-3" />
                                            ),
                                            label: "Boosters",
                                            accent: "bg-tutor-green",
                                        },
                                        {
                                            cat: ShopItemCategory.COSMETICS,
                                            icon: <Crown className="h-3 w-3" />,
                                            label: "Cosmetics",
                                            accent: "bg-tutor-purple",
                                        },
                                        {
                                            cat: ShopItemCategory.SPECIAL,
                                            icon: <Gift className="h-3 w-3" />,
                                            label: "Special",
                                            accent: "bg-tutor-red",
                                        },
                                    ].map((category) => {
                                        const active =
                                            selectedCategory === category.cat;
                                        return (
                                            <button
                                                key={category.cat}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        category.cat
                                                    )
                                                }
                                                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border-[3px] border-tutor-navy px-3 py-2 font-playful text-xs font-bold uppercase tracking-wide transition-all duration-150 sm:text-sm ${
                                                    active
                                                        ? "-translate-y-0.5 bg-tutor-navy text-tutor-cream shadow-[3px_3px_0_0_#071B3A]"
                                                        : "bg-tutor-cream text-tutor-navy opacity-80 shadow-[2px_2px_0_0_#071B3A] hover:-translate-y-0.5 hover:opacity-100 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                                }`}
                                            >
                                                <span
                                                    className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                                                        active
                                                            ? "border-tutor-navy bg-tutor-yellow text-tutor-navy"
                                                            : `border-tutor-navy text-tutor-cream ${category.accent}`
                                                    }`}
                                                >
                                                    {category.icon}
                                                </span>
                                                <span>{category.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Shop Items Grid */}
                                <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar pb-1">
                                    {shopItems.length === 0 ? (
                                        <div className="py-14 text-center">
                                            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-tutor-navy bg-tutor-cream text-3xl shadow-[3px_3px_0_0_#071B3A]">
                                                📦
                                            </span>
                                            <p className="font-playful font-bold text-tutor-navy">
                                                No items in this category yet!
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                                            {shopItems.map((item) => {
                                                const affordable =
                                                    canAfford(item);
                                                const unlocked =
                                                    isUnlocked(item);

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={`flex flex-col rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-4 shadow-[3px_3px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#071B3A] ${
                                                            !unlocked
                                                                ? "opacity-55"
                                                                : ""
                                                        }`}
                                                    >
                                                        {/* Item Header */}
                                                        <div className="mb-2 flex items-start justify-between gap-2">
                                                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-yellow text-2xl shadow-[2px_2px_0_0_#071B3A]">
                                                                {item.icon}
                                                            </span>
                                                            <span
                                                                className={`inline-flex items-center gap-1 rounded-md border-2 border-tutor-navy px-2 py-1 font-brutal text-[10px] uppercase tracking-wide ${getRarityColor(
                                                                    item.rarity
                                                                )}`}
                                                            >
                                                                {getRarityBadge(
                                                                    item.rarity
                                                                )}
                                                                {item.rarity.toUpperCase()}
                                                            </span>
                                                        </div>

                                                        {/* Item Name */}
                                                        <h3 className="mb-1 font-brutal text-sm uppercase tracking-wide text-tutor-navy sm:text-base">
                                                            {item.name}
                                                        </h3>

                                                        {/* Item Description */}
                                                        <p className="mb-3 font-playful text-xs leading-relaxed text-tutor-navy/70 sm:text-sm">
                                                            {item.description}
                                                        </p>

                                                        {/* Item Effect */}
                                                        {item.effect && (
                                                            <div className="mb-3 rounded-lg border-2 border-tutor-navy/25 bg-tutor-blue/10 p-2 font-playful text-xs text-tutor-navy">
                                                                <span className="font-bold uppercase text-tutor-blue">
                                                                    Effect:
                                                                </span>{" "}
                                                                {item.effect.duration && (
                                                                    <span className="font-semibold">
                                                                        {
                                                                            item
                                                                                .effect
                                                                                .duration
                                                                        }
                                                                        s
                                                                        duration
                                                                    </span>
                                                                )}
                                                                {item.effect.multiplier && (
                                                                    <span className="font-semibold">
                                                                        {" "}
                                                                        {
                                                                            item
                                                                                .effect
                                                                                .multiplier
                                                                        }
                                                                        x
                                                                        multiplier
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Price & Buy Button */}
                                                        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                                                            <div className="flex items-center gap-1.5 rounded-lg border-2 border-tutor-navy bg-tutor-green/10 px-2 py-1">
                                                                <Coins className="h-4 w-4 text-tutor-green" />
                                                                <span className="font-brutal text-base text-tutor-navy">
                                                                    {
                                                                        item.price
                                                                    }
                                                                </span>
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    handlePurchase(
                                                                        item
                                                                    )
                                                                }
                                                                disabled={
                                                                    !affordable ||
                                                                    !unlocked
                                                                }
                                                                type="button"
                                                                className={`flex items-center rounded-lg border-[3px] border-tutor-navy px-4 py-2 font-brutal text-xs uppercase tracking-wider transition-all duration-150 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A] ${
                                                                    !unlocked
                                                                        ? "cursor-not-allowed bg-[#E5DCC9] text-tutor-navy/50 shadow-[2px_2px_0_0_#071B3A]"
                                                                        : affordable
                                                                          ? "bg-tutor-green text-tutor-cream shadow-[3px_3px_0_0_#071B3A] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[4px_4px_0_0_#071B3A]"
                                                                          : "cursor-not-allowed bg-tutor-red text-tutor-cream shadow-[3px_3px_0_0_#071B3A]"
                                                                }`}
                                                            >
                                                                {!unlocked ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <Lock className="h-3.5 w-3.5" />
                                                                        L
                                                                        {
                                                                            item.unlockLevel
                                                                        }
                                                                    </span>
                                                                ) : affordable ? (
                                                                    "Buy"
                                                                ) : (
                                                                    "No Coins"
                                                                )}
                                                            </button>
                                                        </div>

                                                        {/* Purchase Limit */}
                                                        {item.maxPurchases && (
                                                            <div className="mt-2 text-center font-playful text-xs font-semibold text-tutor-orange">
                                                                Max:{" "}
                                                                {
                                                                    item.maxPurchases
                                                                }{" "}
                                                                purchases
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Inventory View
                            <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar pb-1">
                                {purchasedItems.length === 0 ? (
                                    <div className="py-14 text-center">
                                        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-tutor-navy bg-tutor-purple text-3xl shadow-[3px_3px_0_0_#071B3A]">
                                            🎒
                                        </span>
                                        <p className="mb-2 font-playful font-bold text-tutor-navy">
                                            Your inventory is empty!
                                        </p>
                                        <p className="font-playful text-sm font-semibold text-tutor-orange">
                                            Purchase items from the shop to fill
                                            your inventory.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                        {purchasedItems.map((purchased) => {
                                            const item = shopService
                                                .getShopCatalog()
                                                .find(
                                                    (i) =>
                                                        i.id ===
                                                        purchased.itemId
                                                );
                                            if (!item) return null;

                                            return (
                                                <div
                                                    key={purchased.itemId}
                                                    className="flex flex-col items-center rounded-xl border-[3px] border-tutor-navy bg-tutor-cream p-3 text-center shadow-[2px_2px_0_0_#071B3A]"
                                                >
                                                    <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-tutor-navy bg-tutor-yellow text-2xl">
                                                        {item.icon}
                                                    </span>
                                                    <h4 className="mb-1 font-brutal text-xs uppercase tracking-wide text-tutor-navy sm:text-sm">
                                                        {item.name}
                                                    </h4>
                                                    <div className="mb-2 font-playful text-xs text-tutor-navy/60">
                                                        Qty: {purchased.quantity}
                                                    </div>
                                                    {item.effect?.duration && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const result =
                                                                    shopService.useItem(
                                                                        item.id
                                                                    );
                                                                alert(
                                                                    result.success
                                                                        ? `✅ ${result.message}`
                                                                        : `❌ ${result.message}`
                                                                );
                                                                loadShopData();
                                                            }}
                                                            className="w-full rounded-lg border-[3px] border-tutor-navy bg-tutor-green px-2 py-1.5 font-brutal text-xs uppercase tracking-wide text-tutor-cream shadow-[2px_2px_0_0_#071B3A] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#071B3A]"
                                                        >
                                                            Use
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="mt-4 text-center font-playful text-xs text-tutor-navy/60">
                            💡 Earn coins by completing missions and collecting
                            items!
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};