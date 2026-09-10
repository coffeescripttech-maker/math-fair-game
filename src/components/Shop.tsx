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

interface ShopProps {
    onClose: () => void;
    isVisible: boolean;
}

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
                return "bg-brutal-yellow";
            case ShopItemRarity.RARE:
                return "bg-brutal-purple";
            case ShopItemRarity.UNCOMMON:
                return "bg-brutal-blue";
            case ShopItemRarity.COMMON:
            default:
                return "bg-gray-300";
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
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center pointer-events-auto p-4 z-50">
            <div className="brutal-panel p-6 w-full max-w-5xl mx-4 max-h-[95vh] overflow-hidden flex flex-col">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-brutal-red border-2 border-black shadow-brutal-xs flex items-center justify-center text-white brutal-press z-20"
                    >
                        ✕
                    </button>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-brutal uppercase text-gray-900">
                            🏪 Shop
                        </h2>
                        <div className="rounded-none px-4 py-2 border-[3px] border-black bg-brutal-yellow shadow-brutal-sm">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">💰</span>
                                <span className="text-xl font-brutal text-gray-900">
                                    {playerCoins}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex space-x-2 mb-4 overflow-x-auto">
                        <button
                            onClick={() => setShowInventory(false)}
                            className={`px-4 py-2 rounded-none border-2 border-black font-bold uppercase transition-all duration-150 whitespace-nowrap ${
                                !showInventory
                                    ? "bg-black text-white shadow-brutal-xs"
                                    : "bg-white text-gray-700 hover:bg-brutal-bg"
                            }`}
                        >
                            🏪 Shop
                        </button>
                        <button
                            onClick={() => setShowInventory(true)}
                            className={`px-4 py-2 rounded-none border-2 border-black font-bold uppercase transition-all duration-150 whitespace-nowrap ${
                                showInventory
                                    ? "bg-black text-white shadow-brutal-xs"
                                    : "bg-white text-gray-700 hover:bg-brutal-bg"
                            }`}
                        >
                            🎒 Inventory ({purchasedItems.length})
                        </button>
                    </div>

                    {!showInventory ? (
                        <>
                            {/* Shop Categories */}
                            <div className="flex space-x-2 mb-4 overflow-x-auto">
                                {[
                                    {
                                        cat: ShopItemCategory.POWERUPS,
                                        icon: "⚡",
                                        label: "Powerups",
                                    },
                                    {
                                        cat: ShopItemCategory.BOOSTERS,
                                        icon: "📈",
                                        label: "Boosters",
                                    },
                                    {
                                        cat: ShopItemCategory.COSMETICS,
                                        icon: "👑",
                                        label: "Cosmetics",
                                    },
                                    {
                                        cat: ShopItemCategory.SPECIAL,
                                        icon: "🎁",
                                        label: "Special",
                                    },
                                ].map((category) => (
                                    <button
                                        key={category.cat}
                                        onClick={() =>
                                            setSelectedCategory(category.cat)
                                        }
                                        className={`px-3 py-2 rounded-none border-2 border-black font-bold uppercase transition-all duration-150 whitespace-nowrap text-xs sm:text-sm ${
                                            selectedCategory === category.cat
                                                ? "bg-brutal-orange text-white shadow-brutal-xs"
                                                : "bg-white text-gray-700 hover:bg-brutal-bg"
                                        }`}
                                    >
                                        <span className="mr-1">
                                            {category.icon}
                                        </span>
                                        <span>{category.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Shop Items Grid */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {shopItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-4xl mb-4">📦</div>
                                        <p className="text-gray-600">
                                            No items in this category yet!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                        {shopItems.map((item) => {
                                            const affordable = canAfford(item);
                                            const unlocked = isUnlocked(item);

                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`rounded-none border-[3px] border-black bg-white shadow-brutal-sm p-4 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal ${
                                                        !unlocked
                                                            ? "opacity-50"
                                                            : ""
                                                    }`}
                                                >
                                                    {/* Item Header */}
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="text-4xl">
                                                            {item.icon}
                                                        </div>
                                                        <div
                                                            className={`px-2 py-1 rounded-none border-2 border-black text-xs font-bold text-black ${getRarityColor(
                                                                item.rarity
                                                            )}`}
                                                        >
                                                            {getRarityBadge(
                                                                item.rarity
                                                            )}{" "}
                                                            {item.rarity.toUpperCase()}
                                                        </div>
                                                    </div>

                                                    {/* Item Name */}
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                                                        {item.name}
                                                    </h3>

                                                    {/* Item Description */}
                                                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                                                        {item.description}
                                                    </p>

                                                    {/* Item Effect */}
                                                    {item.effect && (
                                                        <div className="mb-3 p-2 bg-brutal-blue border border-black rounded-none text-xs">
                                                            <span className="font-bold text-blue-800">
                                                                Effect:
                                                            </span>{" "}
                                                            {item.effect
                                                                .duration && (
                                                                <span className="text-blue-700">
                                                                    {
                                                                        item
                                                                            .effect
                                                                            .duration
                                                                    }
                                                                    s duration
                                                                </span>
                                                            )}
                                                            {item.effect
                                                                .multiplier && (
                                                                <span className="text-blue-700">
                                                                    {" "}
                                                                    {
                                                                        item
                                                                            .effect
                                                                            .multiplier
                                                                    }
                                                                    x multiplier
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Price & Buy Button */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-1">
                                                            <span className="text-xl">
                                                                💰
                                                            </span>
                                                            <span className="text-lg font-bold text-amber-800">
                                                                {item.price}
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
                                                            className={`px-3 py-1 rounded-none border-2 border-black font-bold text-sm transition-all duration-150 ${
                                                                !unlocked
                                                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                    : affordable
                                                                    ? "bg-brutal-green text-black shadow-brutal-xs brutal-press"
                                                                    : "bg-brutal-red text-white cursor-not-allowed"
                                                            }`}
                                                        >
                                                            {!unlocked
                                                                ? `🔒 L${item.unlockLevel}`
                                                                : affordable
                                                                ? "Buy"
                                                                : "No Coins"}
                                                        </button>
                                                    </div>

                                                    {/* Purchase Limit */}
                                                    {item.maxPurchases && (
                                                        <div className="mt-2 text-xs text-amber-600 text-center">
                                                            Max:{" "}
                                                            {item.maxPurchases}{" "}
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
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {purchasedItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-4">🎒</div>
                                    <p className="text-gray-600 font-bold mb-2">
                                        Your inventory is empty!
                                    </p>
                                    <p className="text-amber-600 text-sm">
                                        Purchase items from the shop to fill
                                        your inventory.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {purchasedItems.map((purchased) => {
                                        const item = shopService
                                            .getShopCatalog()
                                            .find(
                                                (i) => i.id === purchased.itemId
                                            );
                                        if (!item) return null;

                                        return (
                                            <div
                                                key={purchased.itemId}
                                                className="rounded-none border-[3px] border-black bg-white shadow-brutal-xs p-3 text-center"
                                            >
                                                <div className="text-3xl mb-2">
                                                    {item.icon}
                                                </div>
                                                <h4 className="text-sm font-bold text-gray-800 mb-1">
                                                    {item.name}
                                                </h4>
                                                <div className="text-xs text-gray-600 mb-2">
                                                    Qty: {purchased.quantity}
                                                </div>
                                                {item.effect?.duration && (
                                                    <button
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
                                                        className="w-full px-2 py-1 rounded-none bg-brutal-green border-2 border-black text-black text-xs font-bold brutal-press"
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
                    <div className="mt-4 text-center text-xs text-gray-600">
                        💡 Earn coins by completing missions and collecting
                        items!
                    </div>
            </div>
        </div>
    );
};
