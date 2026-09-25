# 🔧 MathTuto Leaderboard - Troubleshooting Guide

## 🐛 Error: Invalid Input Syntax for Type Integer

### Error Details:

```json
{
    "code": "22P02",
    "details": null,
    "hint": null,
    "message": "invalid input syntax for type integer: \"26.433333333333113\""
}
```

---

## ✅ SOLUTION IMPLEMENTED

### What Was Fixed:

1. **Added Helper Functions** (`sanitizeInteger` and `sanitizeDecimal`)

    - Handles `undefined`, `null`, `NaN`, and `Infinity` values
    - Rounds integers properly
    - Limits decimals to 2 places

2. **Double Sanitization**

    - Initial sanitization when creating entry
    - Final validation before database submission
    - Ensures no floating-point values slip through

3. **Comprehensive Logging**
    - Shows all field values before submission
    - Identifies problematic fields
    - Displays full error details

---

## 🔍 How to Debug

### Step 1: Check Console Logs

When you complete a mission, you should see:

```
📊 Submitting leaderboard entry: {
  player: "Alex",
  level: 1,
  score: 180,
  badges: 1,
  coins: 20,
  missions: 1,
  accuracy: 100,
  playtime: 0,          ← Should be INTEGER (whole number)
  fastestTime: 8.5,
  excellent: 1,
  great: 0,
  good: 0,
  collectibles: 0
}
✅ Data sanitization complete, validating types...
✅ Final sanitized entry ready for database: { ... }
```

### Step 2: Check for Error Messages

If you see logs like:

```
❌ playtime is not an integer: 26.433333333333113
```

This means the sanitization caught and fixed the issue!

### Step 3: Verify Database Submission

You should see ONE of these:

```
✅ New leaderboard entry created for Alex
```

OR

```
✅ Leaderboard updated for Alex
```

---

## 🎯 Common Issues & Solutions

### Issue 1: `playtime` is a Decimal

**Cause**: `updatePlaytime(1/60)` in App.tsx adds fractional minutes

**Solution**: ✅ FIXED - `sanitizeInteger()` rounds to whole number

```typescript
// Before: playtime = 26.433333333333113
// After:  playtime = 26
```

### Issue 2: `accuracy` has Too Many Decimals

**Cause**: JavaScript division creates long decimals

**Solution**: ✅ FIXED - `sanitizeDecimal()` limits to 2 places

```typescript
// Before: accuracy = 95.499999999999978
// After:  accuracy = 95.50
```

### Issue 3: `Infinity` or `NaN` Values

**Cause**: Division by zero or invalid calculations

**Solution**: ✅ FIXED - Helper functions return 0 or undefined

```typescript
// Before: fastestQuizTime = Infinity
// After:  fastestQuizTime = undefined (not submitted)
```

---

## 🧪 Testing Checklist

### Test After Completing a Mission:

-   [ ] Open browser console (F12)
-   [ ] Complete a mission
-   [ ] Look for `📊 Submitting leaderboard entry:`
-   [ ] Verify all numbers are proper format:
    -   [ ] `level`: Should be 1 or 2 (integer)
    -   [ ] `score`: Should be whole number (e.g., 180)
    -   [ ] `coins`: Should be whole number (e.g., 20)
    -   [ ] `playtime`: Should be whole number (e.g., 0, 1, 2...)
    -   [ ] `accuracy`: Should have max 2 decimals (e.g., 95.50)
    -   [ ] `fastestTime`: Should have max 2 decimals (e.g., 8.33)
-   [ ] Look for `✅ Final sanitized entry ready for database`
-   [ ] Look for `✅ Leaderboard updated` or `✅ New leaderboard entry created`
-   [ ] NO error messages should appear

---

## 🔧 Manual Debugging

### If Error Persists:

**1. Check the exact field causing the issue:**

Look at the error message:

```
"invalid input syntax for type integer: \"26.433333333333113\""
```

The value `26.433333333333113` suggests it's likely `playtime`.

**2. Add temporary logging in App.tsx:**

```typescript
// In handleQuizAnswer, before submitScore
const progress = gameStateManager.current.getProgress();
console.log("🔍 Progress before submission:", {
    playtime: progress.playtime,
    totalScore: progress.totalScore,
    coins: progress.coins,
    level: progress.level,
});
leaderboardService.current.submitScore(progress);
```

**3. Check localStorage data:**

Open console and run:

```javascript
const saved = localStorage.getItem("mathtuto-game-progress");
const parsed = JSON.parse(saved);
console.log("Playtime value:", parsed.playtime);
console.log("Type:", typeof parsed.playtime);
```

---

## 🛡️ Sanitization Functions

### sanitizeInteger() - For INTEGER columns

```typescript
private sanitizeInteger(value: number | undefined): number {
    if (value === undefined || value === null || isNaN(value)) {
        return 0;
    }
    if (!isFinite(value)) {
        return 0;
    }
    return Math.round(value);  // Always returns whole number
}
```

**Examples:**

```typescript
sanitizeInteger(26.433333333333113) → 26
sanitizeInteger(0.5) → 1
sanitizeInteger(180.0000001) → 180
sanitizeInteger(undefined) → 0
sanitizeInteger(Infinity) → 0
sanitizeInteger(NaN) → 0
```

### sanitizeDecimal() - For DECIMAL columns

```typescript
private sanitizeDecimal(value: number | undefined): number | undefined {
    if (value === undefined || value === null || isNaN(value)) {
        return undefined;
    }
    if (!isFinite(value)) {
        return undefined;
    }
    return parseFloat(value.toFixed(2));  // Max 2 decimal places
}
```

**Examples:**

```typescript
sanitizeDecimal(95.499999999) → 95.50
sanitizeDecimal(8.333333333) → 8.33
sanitizeDecimal(100.00000001) → 100.00
sanitizeDecimal(undefined) → undefined
sanitizeDecimal(Infinity) → undefined
sanitizeDecimal(NaN) → undefined
```

---

## 📊 Expected Console Output

### Successful Submission:

```
📊 Submitting leaderboard entry: {
  player: "Alex",
  level: 1,
  score: 180,
  badges: 1,
  coins: 20,
  missions: 1,
  accuracy: 100,
  playtime: 0,
  fastestTime: 8.5,
  excellent: 1,
  great: 0,
  good: 0,
  collectibles: 0
}
✅ Data sanitization complete, validating types...
✅ Final sanitized entry ready for database: {
  player_name: "Alex",
  level: 1,
  total_score: 180,
  badges: 1,
  coins: 20,
  completed_missions: 1,
  accuracy: 100,
  playtime: 0,
  fastest_quiz_time: 8.5,
  excellent_answers: 1,
  great_answers: 0,
  good_answers: 0,
  total_collectibles: 0
}
📝 Inserting new leaderboard entry: { ... }
✅ New leaderboard entry created for Alex
```

### If There's an Issue:

```
📊 Submitting leaderboard entry: { ... }
✅ Data sanitization complete, validating types...
✅ Final sanitized entry ready for database: { ... }
📝 Inserting new leaderboard entry: { ... }
❌ Insert failed: {
  "code": "22P02",
  "message": "invalid input syntax for type integer: \"26.43...\""
}
Entry that failed: { ... }  ← Shows exact data sent to database
```

---

## 🎯 Quick Fixes

### Fix 1: Clear Local Storage and Restart

Sometimes old data with wrong formats can cause issues.

```javascript
// In browser console:
localStorage.removeItem("mathtuto-game-progress");
location.reload();
```

Then start a new game with a fresh character.

### Fix 2: Verify Database Schema

Make sure your Supabase table has correct column types:

```sql
-- Run this in Supabase SQL Editor to check:
SELECT
    column_name,
    data_type,
    character_maximum_length,
    numeric_precision,
    numeric_scale
FROM information_schema.columns
WHERE table_name = 'leaderboard'
ORDER BY ordinal_position;
```

**Expected Output:**

```
total_score      → integer
coins            → integer
playtime         → integer
accuracy         → numeric (5,2)
fastest_quiz_time → numeric (6,2)
```

### Fix 3: Force Re-sanitization

If the error persists, the helper functions will catch and fix it automatically. Check console for which field is problematic.

---

## 📝 Database Column Requirements

### INTEGER Columns (Must be whole numbers):

```
✅ GOOD:
- level: 1
- total_score: 180
- badges: 1
- coins: 20
- playtime: 26
- completed_missions: 1
- excellent_answers: 1
- great_answers: 0
- good_answers: 0
- total_collectibles: 0

❌ BAD:
- playtime: 26.433333333333113  ← Will be auto-fixed to 26
- coins: 20.0                   ← Will be auto-fixed to 20
- score: 180.00000001           ← Will be auto-fixed to 180
```

### DECIMAL Columns (Max 2 decimal places):

```
✅ GOOD:
- accuracy: 95.50
- fastest_quiz_time: 8.33

❌ BAD:
- accuracy: 95.499999999999978    ← Will be auto-fixed to 95.50
- fastest_quiz_time: 8.333333333  ← Will be auto-fixed to 8.33
```

---

## 🚀 Updated Features

### Enhanced Error Handling:

1. **Automatic Sanitization**

    - All values cleaned before database submission
    - No manual intervention needed

2. **Comprehensive Logging**

    - See exact values being submitted
    - Identify problematic fields instantly

3. **Graceful Error Recovery**

    - Catches and fixes type mismatches
    - Logs warnings but continues operation

4. **Type Safety**
    - Helper functions ensure correct types
    - Double-checks all numeric fields

---

## 🎮 Test the Fix

### Quick Test:

1. **Start the game**
2. **Create character** (e.g., "TestPlayer")
3. **Complete Mission #1**
4. **Check console** for:
    ```
    ✅ Final sanitized entry ready for database
    ✅ New leaderboard entry created for TestPlayer
    ```
5. **Open leaderboard** from main menu
6. **Verify** your score appears!

### If Successful:

You'll see your entry in the leaderboard with:

-   Proper rank (🥇🥈🥉 or number)
-   Your name highlighted with ⭐
-   Correct score and badges

---

## 💡 Prevention Tips

### For Future Development:

**1. Always use helper functions for database:**

```typescript
// ✅ GOOD
const score = this.sanitizeInteger(playerScore);
const time = this.sanitizeDecimal(quizTime);

// ❌ AVOID
const score = playerScore; // Might have decimals
```

**2. Use Number.isInteger() to verify:**

```typescript
if (!Number.isInteger(myValue)) {
    console.warn("Value is not integer:", myValue);
    myValue = Math.round(myValue);
}
```

**3. Log before database operations:**

```typescript
console.log("Submitting to database:", data);
await supabase.from("table").insert([data]);
```

---

## 📊 Summary

**Problem**: Floating-point values (26.433333...) being sent to INTEGER columns  
**Root Cause**: JavaScript floating-point arithmetic + playtime tracking  
**Solution**: Comprehensive data sanitization with helper functions  
**Status**: ✅ FIXED

**Changes Made**:

-   ✅ Added `sanitizeInteger()` helper
-   ✅ Added `sanitizeDecimal()` helper
-   ✅ Double sanitization (entry creation + final validation)
-   ✅ Comprehensive logging for debugging
-   ✅ Better error messages

**Result**: All numeric values are now properly formatted before database submission!

---

## 🎉 Next Steps

1. **Test the game** - Complete a mission
2. **Check console** - Look for ✅ success messages
3. **Open leaderboard** - Verify your score appears
4. **Enjoy!** - The error is fixed! 🚀

---

**Last Updated**: October 10, 2025  
**Issue**: Data type mismatch (floating-point to integer)  
**Status**: ✅ RESOLVED with comprehensive sanitization

---

**🏆 Database submissions should now work perfectly! ⚡**
