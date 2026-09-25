# 🏪 MathTuto Shop & Reward System Documentation

## Overview

The Shop & Reward System adds depth and progression to MathTuto with purchasable items, daily challenges, NPC rewards, and powerups that enhance gameplay.

---

## 🎯 Core Features

### 1. ✅ Coin Shop

-   **Categories**: Powerups, Boosters, Cosmetics, Special Items
-   **Purchases**: Spend coins to buy items
-   **Inventory**: Track purchased items
-   **Effects**: Activate powerups and boosts

### 2. ✅ Daily Challenges

-   **3 Challenges Per Day**: Reset at midnight
-   **Bonus Rewards**: Extra coins and points
-   **Progress Tracking**: Auto-updates as you play
-   **Time Limited**: 24-hour window to complete

### 3. ✅ NPC Rewards

-   **Special Gifts**: NPCs give bonus rewards
-   **Mission Milestones**: Rewards for completing key missions
-   **One-Time Bonuses**: Can only claim once

### 4. ✅ Powerups & Effects

-   **Temporary Boosts**: Speed, coins, score multipliers
-   **Consumables**: Single-use items
-   **Active Effects**: Track what's currently active

---

## 🏪 Shop System

### Shop Categories:

#### ⚡ Powerups (Temporary Effects)

| Item        | Price     | Effect                      | Duration |
| ----------- | --------- | --------------------------- | -------- |
| Speed Boost | 50 coins  | Move 50% faster             | 60s      |
| Coin Magnet | 100 coins | 2x coin collection          | 120s     |
| Hint Token  | 75 coins  | Reveal wrong answer in quiz | One-time |
| Time Freeze | 200 coins | Pause quiz timer            | 15s      |

#### 📈 Boosters (Performance Enhancers)

| Item          | Price     | Effect                         | Duration   |
| ------------- | --------- | ------------------------------ | ---------- |
| Score Booster | 150 coins | 1.5x points for next 3 quizzes | Until used |

#### 👑 Cosmetics (Visual Items)

| Item           | Price     | Unlock Level | Rarity    |
| -------------- | --------- | ------------ | --------- |
| Golden Badge   | 120 coins | Level 1      | Uncommon  |
| Civic Crown    | 300 coins | Level 2      | Rare      |
| Trophy Display | 500 coins | Level 2      | Legendary |

#### 🎁 Special Items

| Item        | Price     | Effect                  | Unlock Level |
| ----------- | --------- | ----------------------- | ------------ |
| Mystery Box | 250 coins | Random reward           | Level 1      |
| Lucky Charm | 400 coins | More collectibles spawn | Level 2      |

---

## 💰 How to Earn Coins

### 1. **Complete Missions** (Primary Source)

```
Mission #1:  +20 coins
Mission #2:  +15 coins
Mission #3:  +25 coins
...
Mission #20: +80 coins

Total from all missions: ~750 coins
```

### 2. **Collect Items** (Secondary Source)

```
Common coins (💰):     +5 coins each
Uncommon badges (🏅):  +10 coins each
Rare treasures (💎):   +25 coins each
Powerups (⚡):         +15 coins each

Total from collectibles (BarangayMap): ~80 coins
Total from collectibles (CityMap): ~120 coins
```

### 3. **Daily Challenges** (Bonus Source)

```
Daily Challenge #1: +50 coins
Daily Challenge #2: +75 coins
Daily Challenge #3: +100 coins

Total per day: +225 coins
```

### 4. **NPC Special Rewards**

```
Barangay Captain (Mission #10): +100 coins + Crown
Mayor (Mission #20): +200 coins + Trophy
Health Worker (Mission #9): +50 coins
```

### 5. **Achievements**

```
Master Collector: +50 coins (collect all items in a level)
Speed Achievements: Varies
```

**Total Possible Coins**: ~1,500+ per playthrough!

---

## 📅 Daily Challenges

### Challenge Types:

#### 1. Treasure Hunter

```
Objective: Collect 5 collectible items
Reward: 50 coins + 100 points
Difficulty: Easy
Time: 24 hours
```

#### 2. Speed Demon

```
Objective: Complete 3 quizzes with excellent time (≤10s)
Reward: 75 coins + 150 points
Difficulty: Medium
Time: 24 hours
```

#### 3. Daily Duty

```
Objective: Complete 2 missions
Reward: 100 coins + 200 points
Difficulty: Medium
Time: 24 hours
```

### How It Works:

```
1. Challenges reset every day at midnight
2. Progress tracked automatically as you play
3. Rewards given instantly when completed
4. New challenges appear next day
```

---

## 🎁 NPC Reward System

### Special Rewards from NPCs:

#### Barangay Captain (Mission #10)

```
When: Complete all 10 barangay missions
Reward:
  - 100 bonus coins
  - Civic Crown (free!)
Message: "Congratulations on completing all barangay missions!"
```

#### Mayor (Mission #20)

```
When: Complete all 20 missions
Reward:
  - 200 bonus coins
  - Trophy Display (free!)
Message: "You've mastered civic governance!"
```

#### Barangay Health Worker (Mission #9)

```
When: Complete health mission
Reward:
  - 50 bonus coins
Message: "Thank you for promoting community health!"
```

### How to Claim:

1. Complete the specified mission
2. Talk to the NPC again
3. Receive special reward notification
4. Items automatically added to inventory
5. Can only claim once per playthrough

---

## ⚡ Powerup System

### Active Effects:

When you purchase/use a powerup, it activates immediately:

#### Speed Boost

```
Effect: Player moves 1.5x faster
Duration: 60 seconds
Visual: Speed lines around player
Sound: Whoosh effect
```

#### Coin Magnet

```
Effect: All collected coins count 2x
Duration: 120 seconds
Visual: Gold aura around player
Applies to: Collectibles, mission rewards
```

#### Score Booster

```
Effect: 1.5x points on next 3 quizzes
Duration: Until 3 quizzes completed
Visual: Star particles
Stacks: No (one at a time)
```

#### Hint Token

```
Effect: Removes 2 wrong answers from quiz
Usage: One-time consumable
Shows: Grayed-out wrong options
Max: 10 purchases
```

#### Time Freeze

```
Effect: Pauses quiz countdown timer
Duration: 15 seconds
Usage: Activates when used
Rare: Yes (expensive!)
```

### How to Use:

```
1. Purchase item from shop
2. Go to Inventory tab
3. Click "Use" button on item
4. Effect activates immediately!
5. Timer shows in HUD (for timed effects)
```

---

## 🎮 UI Design

### Shop Modal:

```
┌─────────────────────────────────────────┐
│         🏪 CIVIC SHOP      💰 250       │ ← Coin balance
├─────────────────────────────────────────┤
│  [🏪 Shop] [🎒 Inventory (3)]           │ ← Tabs
├─────────────────────────────────────────┤
│  [⚡ Powerups] [📈 Boosters]             │ ← Categories
│  [👑 Cosmetics] [🎁 Special]             │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │   ⚡    │  │   🧲    │  │   📈    │ │
│  │ Speed   │  │  Coin   │  │ Score   │ │
│  │ Boost   │  │ Magnet  │  │ Booster │ │
│  │ Move    │  │ 2x coins│  │ 1.5x pts│ │
│  │ faster  │  │ 120s    │  │ 3 quiz  │ │
│  │ 💰 50   │  │ 💰 100  │  │ 💰 150  │ │
│  │ [Buy]   │  │ [Buy]   │  │ [Buy]   │ │
│  └─────────┘  └─────────┘  └─────────┘ │
└─────────────────────────────────────────┘
```

### Daily Challenges Modal:

```
┌─────────────────────────────────────────┐
│      📅 DAILY CHALLENGES                │
├─────────────────────────────────────────┤
│  🎯 Treasure Hunter       ⏰ 12h 45m    │
│  Collect 5 items today                  │
│  Progress: 3/5                          │
│  ██████████████░░░░░░░░░ 60%           │
│  💰 +50  ⭐ +100                        │
├─────────────────────────────────────────┤
│  🎯 Speed Demon          ⏰ 12h 45m     │
│  3 quizzes with excellent time (≤10s)   │
│  Progress: 1/3                          │
│  ██████░░░░░░░░░░░░░░░░░ 33%           │
│  💰 +75  ⭐ +150                        │
├─────────────────────────────────────────┤
│  ✅ Daily Duty           COMPLETED      │
│  Complete 2 missions today              │
│  Progress: 2/2                          │
│  ████████████████████████ 100%          │
│  💰 +100  ⭐ +200                       │
└─────────────────────────────────────────┘
```

---

## 🔄 Integration Flow

### Coin Earning Flow:

```
Player Action → Coins Awarded → Update GameState → Save Progress
      │                             │
      └─────────────────────────────┴──→ Can Buy Items
```

### Shop Purchase Flow:

```
1. Player opens shop (🏪 button)
2. Browses items by category
3. Clicks "Buy" on desired item
4. ShopService.purchaseItem() checks:
   - Has enough coins? ✅
   - Level requirement met? ✅
   - Purchase limit not exceeded? ✅
5. Deduct coins from GameStateManager
6. Add item to shop inventory
7. Activate effect (if applicable)
8. Show success notification
9. Update UI
```

### Daily Challenge Flow:

```
1. Daily challenges generated at midnight
2. Player completes action (collect item, mission, quiz)
3. EventBus.emit("update-daily-challenge")
4. ShopService.updateChallengeProgress()
5. Check if requirement met (e.g., 5/5 items)
6. If complete:
   - Award coins via GameStateManager
   - Award points to totalScore
   - Mark challenge as completed
   - Show notification
```

---

## 💻 Implementation Details

### Files Created:

1. **`src/types/shop.ts`** - TypeScript interfaces
2. **`src/services/ShopService.ts`** - Shop logic and inventory
3. **`src/components/Shop.tsx`** - Shop UI component
4. **`src/components/DailyChallenges.tsx`** - Challenges UI

### Files Updated:

1. **`src/App.tsx`** - Integrated shop and challenges
2. **`src/utils/GameValidation.ts`** - Added purchasedItems tracking
3. **`src/game/scenes/BarangayMap.ts`** - Daily challenge events

---

## 🎯 Example Player Journey

### Day 1: Starting Out

```
Start: 0 coins

Mission #1 complete → +20 coins (Total: 20)
Collect 3 items → +15 coins (Total: 35)
Mission #2 complete → +15 coins (Total: 50)

Purchases Speed Boost (50 coins) → 0 coins left
Uses Speed Boost → Moves faster for 60s
Completes Mission #3 faster!

Mission #3 complete → +25 coins (Total: 25)
```

### Day 2: Building Up

```
Start: 25 coins (from previous day)

Daily Challenge #1: Collect 5 items
  - Collects 5 items → +25 coins
  - Challenge complete → +50 bonus coins
  - Total: 100 coins

Mission #4 complete → +30 coins (Total: 130)

Purchases Coin Magnet (100 coins) → 30 coins left
Activates 2x coin multiplier
Complects Mission #5 → +35 coins x2 = +70 coins
Total: 100 coins
```

### Day 10: Master Collector

```
Complete Mission #10 → Barangay Captain gives:
  - +100 bonus coins
  - Civic Crown (free cosmetic!)

Total coins accumulated: ~500 coins

Can now afford:
  - Trophy Display (500 coins)
  - Multiple powerups
  - Special items
```

---

## 📊 Shop Item Catalog

### Complete Item List:

#### Powerups (5 items):

1. **Speed Boost** (⚡) - 50 coins
2. **Coin Magnet** (🧲) - 100 coins
3. **Score Booster** (📈) - 150 coins
4. **Hint Token** (💡) - 75 coins (max 10)
5. **Time Freeze** (⏸️) - 200 coins

#### Cosmetics (3 items):

1. **Golden Badge** (🏅) - 120 coins
2. **Civic Crown** (👑) - 300 coins (Level 2+)
3. **Trophy Display** (🏆) - 500 coins (Level 2+)

#### Special (2 items):

1. **Mystery Box** (🎁) - 250 coins
2. **Lucky Charm** (🍀) - 400 coins (Level 2+)

**Total Items**: 10

---

## 🎁 Reward Distribution

### By Source:

```
Missions (20):        ~750 coins
Collectibles:         ~200 coins
Daily Challenges:     ~225 coins/day
NPC Special Rewards:  ~350 coins
Achievements:         ~50 coins

TOTAL AVAILABLE:      ~1,575+ coins per playthrough
```

### Spending Guide:

**Budget Player** (Essential items only):

-   Hint Tokens (75 x 3): 225 coins
-   Speed Boost (50 x 5): 250 coins
-   **Total**: 475 coins

**Balanced Player** (Mix of items):

-   Score Booster: 150 coins
-   Coin Magnet: 100 coins
-   Hint Tokens: 150 coins
-   Golden Badge: 120 coins
-   **Total**: 520 coins

**Collector Player** (All cosmetics):

-   Golden Badge: 120 coins
-   Civic Crown: 300 coins
-   Trophy Display: 500 coins
-   **Total**: 920 coins

**Completionist** (Everything!):

-   All items: ~1,545 coins total
-   Requires: All missions + challenges + efficient coin usage

---

## 🔄 Technical Implementation

### Purchase Flow:

```typescript
// 1. Player clicks "Buy" button
handlePurchase(item) {
    // 2. ShopService validates purchase
    const result = shopService.purchaseItem(item.id);

    // Checks:
    // - Player has enough coins?
    // - Level requirement met?
    // - Purchase limit not exceeded?

    if (result.success) {
        // 3. Deduct coins
        gameStateManager.spendCoins(item.price, item.name);

        // 4. Add to inventory
        shopService.addToInventory(item.id);

        // 5. Activate effect (if applicable)
        if (item.effect?.duration) {
            shopService.activateEffect(item.id, item.effect);
        }

        // 6. Show success message
        alert(`✅ Purchased ${item.name}!`);
    }
}
```

### Active Effect System:

```typescript
// Store active effects with timestamps
interface ActiveEffect {
    itemId: "speed-boost-1",
    effectType: "speed_boost",
    startTime: 1696950000000,
    endTime: 1696950060000,  // +60 seconds
    multiplier: 1.5
}

// Check if effect is active
hasActiveEffect("speed_boost") → true/false

// Get multiplier if active
getActiveMultiplier("coin_multiplier") → 2.0 or 1.0
```

### Daily Challenge Tracking:

```typescript
// Example: Collectible item found
EventBus.emit("update-daily-challenge", {
    type: "collect",
    amount: 1
});

// ShopService updates challenge
updateChallengeProgress("collect", 1) {
    // Find "Treasure Hunter" challenge
    // Increment progress: 3 → 4
    // Check if complete: 4/5 (not yet)
    // Save to localStorage
}

// When 5th item collected:
updateChallengeProgress("collect", 1) {
    // Progress: 5/5 ✅
    // Award 50 coins
    // Award 100 points
    // Mark challenge.completed = true
    // Show notification
}
```

---

## 🎨 UI Components

### Shop Component Features:

-   ✅ Medieval theme (wooden frame, parchment)
-   ✅ Category tabs (Powerups, Boosters, Cosmetics, Special)
-   ✅ Item grid layout (responsive)
-   ✅ Rarity badges (⭐⭐⭐ for legendary)
-   ✅ Purchase buttons (disabled if can't afford)
-   ✅ Lock icons for level-restricted items
-   ✅ Inventory tab (shows purchased items)
-   ✅ "Use" button for consumables
-   ✅ Coin balance display

### Daily Challenges Features:

-   ✅ Challenge cards with progress bars
-   ✅ Time remaining countdown
-   ✅ Reward display (coins + points)
-   ✅ Completed status (green background)
-   ✅ Auto-updates as you play
-   ✅ Visual feedback (✅ when done)

---

## 🚀 Future Enhancements

### Planned Features:

-   [ ] **Weekly Challenges**: Special weekly objectives
-   [ ] **Limited-Time Shop**: Rotating exclusive items
-   [ ] **Item Bundles**: Discounted packages
-   [ ] **Gifting System**: Send items to friends
-   [ ] **Trade System**: Exchange items with players
-   [ ] **Seasonal Events**: Holiday-themed items
-   [ ] **Achievement Shop**: Special items for achievements
-   [ ] **VIP Rewards**: Bonus for top leaderboard players

### Advanced Items:

-   [ ] **Auto-Collector**: Automatically collects nearby items
-   [ ] **Quiz Shield**: One free wrong answer
-   [ ] **Double Rewards**: 2x mission rewards for 1 mission
-   [ ] **XP Booster**: Faster level progression
-   [ ] **Teleport Scrolls**: Quick travel to NPCs
-   [ ] **Pet Companions**: Cosmetic followers

---

## 📱 Mobile Optimization

### Responsive Design:

-   Grid adapts: 1 column (mobile) → 3 columns (desktop)
-   Touch-friendly buttons (min 44px)
-   Horizontal scroll for categories
-   Modal fits within viewport
-   Large tap targets for purchases

---

## 💾 Data Persistence

### What Gets Saved:

**Shop Inventory** (`mathtuto-shop-inventory`):

```javascript
{
    purchasedItems: [
        { itemId: "speed-boost-1", quantity: 2, purchaseDate: "..." },
        { itemId: "crown-1", quantity: 1, used: false }
    ],
    activeEffects: [
        {
            itemId: "coin-magnet-1",
            effectType: "coin_multiplier",
            startTime: 1696950000000,
            endTime: 1696950120000,
            multiplier: 2.0
        }
    ]
}
```

**Daily Challenges** (`mathtuto-daily-challenges`):

```javascript
[
    {
        id: "daily-collect-2025-10-10",
        title: "Treasure Hunter",
        progress: 3,
        requirement: 5,
        completed: false,
        expiresAt: "2025-10-11T00:00:00Z",
    },
];
```

**Game Progress** (`mathtuto-game-progress`):

```javascript
{
    // ... existing fields
    purchasedItems: ["speed-boost-1", "crown-1"],
    npcRewardsReceived: ["captain-reward-10"]
}
```

---

## 🎯 Coin Economy Balance

### Income vs Expenses:

**Total Coins Available**: ~1,575 coins

**Essential Items** (for progression):

-   3 Hint Tokens: 225 coins (15% of income)
-   Score Booster: 150 coins (10% of income)
-   **Subtotal**: 375 coins (24% of income)

**Recommended Items** (quality of life):

-   Speed Boost (2x): 100 coins
-   Coin Magnet: 100 coins
-   **Subtotal**: 200 coins (13% of income)

**Luxury Items** (cosmetics):

-   All cosmetics: 920 coins (58% of income)

**Balance**: Well-balanced! Players can afford essentials + several luxury items with smart coin management.

---

## 🧪 Testing Scenarios

### Test 1: Purchase Item

1. Start new game
2. Complete Mission #1 (+20 coins)
3. Open Shop (🏪 button in HUD)
4. Try to buy Speed Boost (50 coins)
    - Should show "No Coins" (only have 20)
5. Complete Mission #2 (+15 coins, total 35)
6. Complete Mission #3 (+25 coins, total 60)
7. Buy Speed Boost (50 coins)
    - Should succeed!
    - Inventory: 1 item
    - Coins left: 10

### Test 2: Daily Challenge

1. Start game
2. Open Daily Challenges (📅 button)
3. See 3 challenges
4. Collect 1 item
5. Reopen Daily Challenges
6. "Treasure Hunter" progress: 1/5
7. Collect 4 more items
8. Challenge completes!
9. +50 coins, +100 points awarded

### Test 3: NPC Reward

1. Complete all 10 barangay missions
2. Talk to Barangay Captain again
3. Receive notification:
    - "Special reward from Captain!"
    - +100 coins
    - Civic Crown (free!)
4. Check inventory: Crown is there
5. Try claiming again: Already received

---

## 📚 Code Examples

### Check Active Effect:

```typescript
import ShopService from "./services/ShopService";

const shopService = ShopService.getInstance();

// Check if coin multiplier is active
if (shopService.hasActiveEffect("coin_multiplier")) {
    const multiplier = shopService.getActiveMultiplier("coin_multiplier");
    const coins = baseCoins * multiplier; // 2x coins!
}
```

### Update Daily Challenge:

```typescript
// When player collects an item
EventBus.emit("update-daily-challenge", {
    type: "collect",
    amount: 1,
});

// When player completes mission
EventBus.emit("update-daily-challenge", {
    type: "missions",
    amount: 1,
});
```

### Use Powerup:

```typescript
const result = shopService.useItem("speed-boost-1");

if (result.success) {
    console.log("Speed boost activated!");
    // Effect is now active for 60 seconds
}
```

---

## 🎉 Benefits to Gameplay

### Player Engagement:

-   ✅ **More goals**: Collect coins for shop items
-   ✅ **Daily return**: Come back for daily challenges
-   ✅ **Progression**: Save up for expensive items
-   ✅ **Choices**: Spend on powerups or cosmetics?
-   ✅ **Rewards**: Feel accomplished with purchases

### Educational Value:

-   ✅ **Resource management**: Budget your coins wisely
-   ✅ **Planning**: Save for future purchases
-   ✅ **Delayed gratification**: Work towards goals
-   ✅ **Decision making**: Prioritize needs vs wants

---

## 🎮 Quickstart Guide

### For Players:

1. **Earn coins** by completing missions and collecting items
2. **Open shop** by clicking 🏪 in top-right corner
3. **Browse items** by category
4. **Purchase** items you can afford
5. **Use powerups** from inventory tab
6. **Check daily challenges** for bonus rewards!

### For Developers:

1. All code is ready to use!
2. Shop automatically integrates with coin system
3. Daily challenges track automatically
4. Just open shop/challenges from HUD
5. Customize items in `ShopService.ts` SHOP_CATALOG

---

## 📊 Summary

**Complete Shop & Reward System**:

-   🏪 10 unique shop items across 4 categories
-   📅 3 daily challenges (reset every 24h)
-   🎁 NPC special rewards for milestones
-   ⚡ Active powerup/effect system
-   🎒 Persistent inventory
-   💰 Balanced coin economy
-   🎨 Beautiful medieval-themed UI
-   📱 Mobile-optimized
-   💾 LocalStorage persistence

**Benefits**:

-   ⬆️⬆️⬆️ Significantly increases engagement
-   🔄 Daily return motivation
-   🎯 Clear progression goals
-   💎 Collectibles have more value
-   🏆 Rewards exploration and skill

---

**Last Updated**: October 10, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Integration**: Fully integrated with existing systems

---

**🏪 Start shopping and earn those rewards! 💰**
