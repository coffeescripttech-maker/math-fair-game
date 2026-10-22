import type { QuizData } from "./quizzes";

/**
 * MASTERY MODE question bank (Mastery Unlock: all active missions completed).
 *
 * After a player finishes every mission, each completed NPC offers a
 * "practice replay" that pulls its question from this bank instead of the
 * original `quizzes.ts` set. Same math topic as the original mission (the
 * level-by-level ladder), but with fresh numbers, fresh scenarios, and a
 * harder step-up so returning players never see identical questions.
 *
 * Practice replays award NO coins, points, or badges.
 *
 * Difficulty ramp is handled level by level elsewhere via `MAX_LEVELS`
 * (see gameConfig) — this file holds one remix question per live mission ID.
 */
export const quizzesRemix: Record<string, QuizData> = {

// Level 1 remix (1-10) - Integers, harder two-step problems
"1": {
    question:
        "Miguel's basketball team scored 18, 24, and 15 points in three barangay games. Their tournament goal is exactly 80 total points. How many points must they score in their fourth game?",
    options: ["21 points", "23 points", "25 points", "27 points"],
    correctAnswer: 1,
    explanation:
        "First add the three known scores: 18 + 24 + 15 = 57. Then subtract from the goal: 80 - 57 = 23 points. Multi-step integer problems combine addition and subtraction in the right order.",
    steps: [
        "Add the three scores: 18 + 24 = 42, then 42 + 15 = 57",
        "Set up the goal: 57 + ? = 80",
        "Subtract: 80 - 57 = 23",
        "They need 23 points",
    ],
    formula: "remaining = goal - (a + b + c)",
    hints: [
        "Find how many points they already have",
        "Then ask: what plus 57 makes 80?",
        "80 - 57 = ?",
    ],
},
"2": {
    question:
        "Aling Maria buys 12 ballpens at ₱12 each from her supplier and sells all of them at ₱18 each. What is her TOTAL profit from the whole box?",
    options: ["₱60", "₱66", "₱72", "₱84"],
    correctAnswer: 2,
    explanation:
        "Profit per ballpen is 18 - 12 = ₱6, and there are 12 ballpens: 12 × 6 = ₱72. Two-step integer problems multiply the per-item difference by the number of items.",
    steps: [
        "Profit per ballpen: 18 - 12 = ₱6",
        "Number of ballpens: 12",
        "Total profit: 12 × 6 = ₱72",
        "Total profit = ₱72",
    ],
    formula: "total profit = (selling price - cost) × quantity",
    hints: [
        "Start with the profit for one ballpen",
        "Then multiply by how many she sold",
        "12 × (18 - 12) = ?",
    ],
},
"3": {
    question:
        "Ana records the temperature at 6°C during lunch and −9°C at midnight. By how many degrees did the temperature FALL from lunch to midnight?",
    options: ["3°C", "13°C", "15°C", "18°C"],
    correctAnswer: 2,
    explanation:
        "The fall is the difference between the two temperatures: 6 - (-9) = 6 + 9 = 15°C. Subtracting a negative integer is the same as adding its positive counterpart, even across zero.",
    steps: [
        "Lunch temperature = 6°C",
        "Midnight temperature = −9°C",
        "Fall = 6 - (-9)",
        "6 + 9 = 15°C",
    ],
    formula: "fall = warmer - colder",
    hints: [
        "Count from −9 up to zero first",
        "Then count from zero up to 6",
        "6 - (-9) = 6 + 9 = ?",
    ],
},
"4": {
    question:
        "Mang Ben starts with ₱200. He pays ₱35 for each jeepney fare, and makes two trips (going and returning). He also buys drinking water for ₱25. How much money is left?",
    options: ["₱95", "₱105", "₱115", "₱125"],
    correctAnswer: 1,
    explanation:
        "Two fares cost 2 × 35 = ₱70. Total spent is 70 + 25 = ₱95. Money left: 200 - 95 = ₱105. Multi-step problems chain multiplication and subtraction in order.",
    steps: [
        "Fare total: 35 × 2 = ₱70",
        "Add the water: 70 + 25 = ₱95 spent",
        "Money left: 200 - 95 = ₱105",
        "Mang Ben has ₱105 left",
    ],
    formula: "left = start - (per-trip cost × trips + extras)",
    hints: [
        "Two trips means the fare is paid twice",
        "Combine all the money spent first",
        "200 - (70 + 25) = ?",
    ],
},
"5": {
    question:
        "Lola Rosa plants 8 rows of pechay with 12 seedlings per row, and 6 rows of talong with 9 seedlings per row. How many seedlings does she plant in all?",
    options: ["138 seedlings", "146 seedlings", "150 seedlings", "156 seedlings"],
    correctAnswer: 2,
    explanation:
        "Pechay: 8 × 12 = 96 seedlings. Talong: 6 × 9 = 54 seedlings. Total: 96 + 54 = 150 seedlings. Two multiplication steps combine with addition at the end.",
    steps: [
        "Pechay: 8 × 12 = 96",
        "Talong: 6 × 9 = 54",
        "Combine totals: 96 + 54",
        "Total = 150 seedlings",
    ],
    formula: "total = (rows₁ × per row₁) + (rows₂ × per row₂)",
    hints: [
        "Solve each vegetable group separately",
        "96 belongs to pechay, 54 belongs to talong",
        "96 + 54 = ?",
    ],
},
"6": {
    question:
        "Ana saves exactly ₱270, but withdrawals ₱45 from her savings every single week for school supplies. After how many WEEKS will her savings be completely used up?",
    options: ["5 weeks", "6 weeks", "7 weeks", "8 weeks"],
    correctAnswer: 1,
    explanation:
        "Repeated equal withdrawals call for division: 270 ÷ 45 = 6. After 6 withdrawals of ₱45, the ₱270 is exactly gone.",
    steps: [
        "Savings = ₱270",
        "Withdrawal per week = ₱45",
        "Weeks = 270 ÷ 45",
        "270 ÷ 45 = 6 weeks",
    ],
    formula: "weeks = total savings ÷ weekly withdrawal",
    hints: [
        "Equal weekly amounts means divide",
        "45 × 6 = 270 is a quick check",
        "270 ÷ 45 = ?",
    ],
},
"7": {
    question:
        "A sari-sari store buys one case of 24 soft drink bottles at ₱15 each (₱360 total). Every bottle is sold at ₱22 each. If ALL bottles sell, what is the store's total profit?",
    options: ["₱148", "₱158", "₱168", "₱188"],
    correctAnswer: 2,
    explanation:
        "Profit per bottle: 22 - 15 = ₱7. All 24 bottles sold: 24 × 7 = ₱168. Even with the ₱360 total cost given, multiplying the per-item difference is the faster route.",
    steps: [
        "Profit per bottle: 22 - 15 = ₱7",
        "Bottles sold: 24",
        "Total profit: 24 × 7 = ₱168",
        "Total profit = ₱168",
    ],
    formula: "total profit = quantity × (selling price - cost each)",
    hints: [
        "You do NOT need the ₱360 cost of the case",
        "Find profit per bottle first",
        "24 × 7 = ?",
    ],
},
"8": {
    question:
        "During a barangay clean-up drive, Group 1 collected 42 plastic bottles. Group 2 collected 23 bottles FEWER than Group 1. Group 3 collected twice as many as Group 2. How many bottles did all three groups collect together?",
    options: ["89 bottles", "95 bottles", "99 bottles", "103 bottles"],
    correctAnswer: 2,
    explanation:
        "Group 2: 42 - 23 = 19 bottles. Group 3: 2 × 19 = 38 bottles. Total: 42 + 19 + 38 = 99 bottles. A chain of subtraction and multiplication feeds the final addition.",
    steps: [
        "Group 2: 42 - 23 = 19 bottles",
        "Group 3: 19 × 2 = 38 bottles",
        "Combine all groups: 42 + 19 + 38",
        "Total = 99 bottles",
    ],
    formula: "total = g1 + (g1 - fewer) + [2 × (g1 - fewer)]",
    hints: [
        "Build Group 2's amount first",
        "Group 3 doubles Group 2",
        "42 + 19 + 38 = ?",
    ],
},
"9": {
    question:
        "A math fair drone starts at 12 meters ABOVE sea level, rises 25 more meters, then descends 40 meters to film the booths. What is the drone's final position (use − for below sea level)?",
    options: ["−5 meters", "−3 meters", "3 meters", "−13 meters"],
    correctAnswer: 1,
    explanation:
        "Chain the integer moves: 12 + 25 - 40 = 37 - 40 = −3 meters. The negative result means the drone ended 3 meters BELOW sea level.",
    steps: [
        "Start: +12 meters",
        "Rise 25: 12 + 25 = 37",
        "Descend 40: 37 - 40 = −3",
        "Final position = −3 meters",
    ],
    formula: "final = start + rise - fall",
    hints: [
        "Treat the rise as +25 and the descent as −40",
        "Combine the first two numbers",
        "37 - 40 = ?",
    ],
},
"10": {
    question:
        "The barangay gym rearranges 288 graduation chairs from 12 neat rows of 24 into 8 equal rows for the math fair. How many chairs are in each of the 8 rows now?",
    options: ["32 chairs", "34 chairs", "36 chairs", "38 chairs"],
    correctAnswer: 2,
    explanation:
        "The total number of chairs never changes: 12 × 24 = 288. Rearranged into 8 equal rows: 288 ÷ 8 = 36 chairs per row.",
    steps: [
        "Check the total: 12 × 24 = 288 chairs",
        "New arrangement: 8 equal rows",
        "Per row: 288 ÷ 8",
        "288 ÷ 8 = 36 chairs",
    ],
    formula: "per row = total chairs ÷ new row count",
    hints: [
        "Rearranging does not change the 288 total",
        "Divide the total by the new number of rows",
        "288 ÷ 8 = ?",
    ],
},
};
