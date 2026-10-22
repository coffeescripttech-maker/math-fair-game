export interface QuizData {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    steps?: string[];
    formula?: string;
    hints?: string[];
}

export const quizzes: Record<string, QuizData> = {

// Level 1: Barangay Tutoring (1-10) - Integers & Basic Operations
"1": {
    question:
        "Miguel's basketball team scored 18, 24, and 15 points in their last three barangay games. What is their total score?",
    options: ["55 points", "57 points", "59 points", "67 points"],
    correctAnswer: 1,
    explanation:
        "To find the total score, add the integers: 18 + 24 = 42, then 42 + 15 = 57 points. Adding integers combines amounts into one total.",
    steps: [
        "Line up the scores: 18, 24, 15",
        "Add the first two: 18 + 24 = 42",
        "Add the last score: 42 + 15 = 57",
        "Total score = 57 points",
    ],
    formula: "total = a + b + c",
    hints: [
        "Add all three scores together",
        "Combine the first two scores first",
        "18 + 24 = 42, then add 15",
    ],
},
"2": {
    question:
        "Aling Maria buys ballpens at ₱12 each and sells them at ₱18 each. How much profit does she earn per ballpen?",
    options: ["₱4", "₱2", "₱6", "₱8"],
    correctAnswer: 2,
    explanation:
        "Profit is the difference between selling price and buying price: 18 - 12 = ₱6. Subtracting integers finds the difference between two amounts.",
    steps: [
        "Selling price = ₱18",
        "Buying price = ₱12",
        "Profit = selling price - buying price",
        "18 - 12 = ₱6",
    ],
    formula: "profit = selling price - cost",
    hints: [
        "Profit is what remains after costs",
        "Subtract the cost from the selling price",
        "18 - 12 = ?",
    ],
},
"3": {
    question:
        "Ben budgets ₱100 for jeepney fares on a round-trip visit to his grandmother. Each one-way fare costs ₱17. How much money does he have left?",
    options: ["₱56", "₱66", "₱76", "₱86"],
    correctAnswer: 1,
    explanation:
        "Round trip means two fares: 2 × 17 = ₱34 spent. Then subtract: 100 - 34 = ₱66 left. Subtracting integers from a total shows what remains.",
    steps: [
        "Two one-way fares: 17 × 2 = ₱34",
        "Money left = total budget - fares",
        "100 - 34 = ₱66",
        "Ben has ₱66 left",
    ],
    formula: "left = budget - (fare × trips)",
    hints: [
        "A round trip means paying two fares",
        "Multiply the fare by 2 first",
        "100 - 34 = ?",
    ],
},
"4": {
    question:
        "For her science project, Ana recorded the temperature at −7°C in the evening and 5°C at noon. How many degrees warmer was it at noon?",
    options: ["2°C", "16°C", "12°C", "14°C"],
    correctAnswer: 2,
    explanation:
        "Find the difference between 5 and −7: 5 - (-7) = 5 + 7 = 12°C. Subtracting a negative integer is the same as adding its positive counterpart.",
    steps: [
        "Noon temperature = 5°C",
        "Evening temperature = −7°C",
        "Difference = 5 - (-7)",
        "5 + 7 = 12°C",
    ],
    formula: "difference = higher - lower",
    hints: [
        "The lapse from −7 to 0 is 7 degrees",
        "Then count up from 0 to 5",
        "Subtracting a negative adds a positive",
    ],
},
"5": {
    question:
        "Lola Rosa plants 8 rows of pechay with 12 seedlings in each row. How many seedlings does she plant in all?",
    options: ["84 seedlings", "92 seedlings", "96 seedlings", "108 seedlings"],
    correctAnswer: 2,
    explanation:
        "Equal groups call for multiplication: 8 × 12 = 96 seedlings. Multiplying integers finds the total when groups are equally sized.",
    steps: [
        "Rows = 8, seedlings per row = 12",
        "Total = rows × seedlings per row",
        "8 × 12 = 96",
        "Total = 96 seedlings",
    ],
    formula: "total = groups × amount per group",
    hints: [
        "Each row has the same number of seedlings",
        "Use multiplication, not addition, for equal groups",
        "8 × 12 = ?",
    ],
},
"6": {
    question:
        "Mang Pedro packs 72 fresh eggs into trays that hold 12 eggs each. How many trays does he need?",
    options: ["6 trays", "7 trays", "8 trays", "9 trays"],
    correctAnswer: 0,
    explanation:
        "Division splits a total into equal groups: 72 ÷ 12 = 6 trays. Division finds how many equal groups fit into an amount.",
    steps: [
        "Total eggs = 72",
        "Eggs per tray = 12",
        "Trays = total ÷ eggs per tray",
        "72 ÷ 12 = 6 trays",
    ],
    formula: "trays = total ÷ amount per group",
    hints: [
        "Think: how many groups of 12 make 72?",
        "Count up by 12s: 12, 24, 36...",
        "72 ÷ 12 = ?",
    ],
},
"7": {
    question:
        "Kuya Noel had ₱150 for chapel decorations. He donated ₱75 for streamers and ₱40 for flowers. How much money remains?",
    options: ["₱25", "₱35", "₱45", "₱65"],
    correctAnswer: 1,
    explanation:
        "Subtract the two spendings from the budget: 150 - 75 = 75, then 75 - 40 = ₱35. Subtraction removes amounts from a starting total one at a time.",
    steps: [
        "Starting budget = ₱150",
        "After streamers: 150 - 75 = ₱75",
        "After flowers: 75 - 40 = ₱35",
        "He has ₱35 left",
    ],
    formula: "left = budget - spending1 - spending2",
    hints: [
        "Subtract each cost one at a time",
        "First take away ₱75, then ₱40",
        "150 - 75 - 40 = ?",
    ],
},
"8": {
    question:
        "Teacher Cruz's jeepney for the class trip starts with 18 passengers. At the first stop, 5 students go home, then 7 students board. How many passengers are riding now?",
    options: ["16 passengers", "22 passengers", "30 passengers", "20 passengers"],
    correctAnswer: 3,
    explanation:
        "Start with 18, subtract 5, then add 7: 18 - 5 + 7 = 20 passengers. A mix of adding and subtracting integers tracks change.",
    steps: [
        "Start: 18 passengers",
        "5 get off: 18 - 5 = 13",
        "7 board: 13 + 7 = 20",
        "There are 20 passengers",
    ],
    formula: "result = start - leaving + boarding",
    hints: [
        "Students going home are subtracted",
        "Students boarding are added",
        "18 - 5, then add 7",
    ],
},
"9": {
    question:
        "Danny's hardware collected ₱315 selling spools of wire at ₱45 each. How many spools were sold?",
    options: ["5 spools", "8 spools", "9 spools", "7 spools"],
    correctAnswer: 3,
    explanation:
        "Total money divided by price per spool gives the number sold: 315 ÷ 45 = 7 spools. Division finds how many equal parts fit a total.",
    steps: [
        "Total collected = ₱315",
        "Price per spool = ₱45",
        "Spools = 315 ÷ 45",
        "There were 7 spools",
    ],
    formula: "spools = total money ÷ price per item",
    hints: [
        "How many ₱45 makes ₱315?",
        "Try multiplying 45 by each option",
        "45 × 7 = 315",
    ],
},
"10": {
    question:
        "The barangay captain's daughter reviews absolute value for her quiz bee. Evaluate: |−9| + (−3)",
    options: ["6", "−6", "12", "−12"],
    correctAnswer: 0,
    explanation:
        "The absolute value of −9 is 9: |−9| = 9. Then 9 + (-3) = 9 - 3 = 6. This mixed review combines absolute value and integer addition.",
    steps: [
        "|−9| = 9 (distance from zero)",
        "Replace: 9 + (-3)",
        "Adding a negative is subtracting: 9 - 3",
        "Answer = 6",
    ],
    formula: "|−a| + (−b) = a - b",
    hints: [
        "Absolute value means distance from zero",
        "|−9| becomes +9",
        "Adding −3 means subtracting 3",
    ],
},

// Level 2: City Tutoring (11-20) - Radicals & Inverse Functions
"11": {
    question:
        "Simplify the radical expression: √72",
    options: ["6√2", "3√8", "2√18", "8√3"],
    correctAnswer: 0,
    explanation:
        "Factor 72 into 36 × 2, where 36 is the largest perfect square. So √72 = √(36 × 2) = √36 × √2 = 6√2.",
    steps: [
        "Find the largest perfect square factor of 72",
        "72 = 36 × 2",
        "√72 = √36 × √2",
        "√72 = 6√2",
    ],
    formula: "√(ab) = √a × √b",
    hints: [
        "Find the largest perfect square that divides 72",
        "36 is a perfect square factor",
        "Separate into √36 × √2",
    ],
},
"12": {
    question:
        "A jeepney charges ₱12 base fare plus ₱3 per kilometer. If a passenger paid ₱27, how far did they travel?",
    options: ["3 km", "4 km", "5 km", "6 km"],
    correctAnswer: 2,
    explanation:
        "The fare formula is F = 12 + 3d. To find distance, use the inverse: d = (F - 12) / 3. Substituting F = 27: d = (27 - 12) / 3 = 15 / 3 = 5 km.",
    steps: [
        "Fare formula: F = 12 + 3d",
        "Inverse formula: d = (F - 12) / 3",
        "Substitute F = 27: d = (27 - 12) / 3",
        "d = 15 / 3 = 5 km",
    ],
    formula: "d = (F - 12) / 3",
    hints: [
        "Subtract the base fare first",
        "Divide the remaining amount by the per-km rate",
        "(27 - 12) ÷ 3 = ?",
    ],
},
"13": {
    question:
        "A 30-meter building, the tip of its shadow, and the end of the shadow form a right triangle. The line from the top of the building to the tip of the shadow is 50 meters. How long is the shadow?",
    options: ["30 m", "40 m", "45 m", "50 m"],
    correctAnswer: 1,
    explanation:
        "Use the Pythagorean theorem: shadow² + 30² = 50². So shadow = √(50² - 30²) = √(2500 - 900) = √1600 = 40 m.",
    steps: [
        "shadow² + 30² = 50²",
        "shadow² = 2500 - 900 = 1600",
        "shadow = √1600",
        "shadow = 40 m",
    ],
    formula: "shadow = √(hypotenuse² - height²)",
    hints: [
        "The 50m line is the hypotenuse",
        "Subtract the building height squared",
        "Take the square root",
    ],
},
"14": {
    question:
        "If $1 = ₱56, then $50 is worth ₱2,800. Using the inverse conversion, how many dollars is ₱2,800?",
    options: ["₱2,800 and $50", "₱2,800 and $40", "₱2,500 and $50", "₱3,000 and $60"],
    correctAnswer: 0,
    explanation:
        "Forward: pesos = 56 × dollars. Inverse: dollars = pesos ÷ 56. So ₱2,800 ÷ 56 = $50. The conversion formulas are inverse functions.",
    steps: [
        "Forward: P = 56D",
        "Inverse: D = P / 56",
        "D = 2800 / 56",
        "D = 50",
    ],
    formula: "D = P / 56",
    hints: [
        "The inverse formula divides pesos by 56",
        "2800 ÷ 56 = ?",
        "Check: 50 × 56 = 2800",
    ],
},
"15": {
    question:
        "A rectangular city park is 60 meters long and 80 meters wide. What is the diagonal shortcut across the park?",
    options: ["90 m", "100 m", "110 m", "120 m"],
    correctAnswer: 1,
    explanation:
        "Use the Pythagorean theorem: diagonal = √(60² + 80²) = √(3600 + 6400) = √10000 = 100 m.",
    steps: [
        "diagonal² = 60² + 80²",
        "diagonal² = 3600 + 6400 = 10000",
        "diagonal = √10000",
        "diagonal = 100 m",
    ],
    formula: "d = √(l² + w²)",
    hints: [
        "Use the Pythagorean theorem",
        "60 and 80 are the legs of a 3-4-5 triangle scaled by 20",
        "The hypotenuse is 100",
    ],
},
"16": {
    question:
        "A teacher calculates final grades using G = 0.8R + 20, where R is the raw score. If a student's final grade is 84, what was the raw score?",
    options: ["75", "80", "85", "90"],
    correctAnswer: 1,
    explanation:
        "Use the inverse formula: R = (G - 20) / 0.8. Substituting G = 84: R = (84 - 20) / 0.8 = 64 / 0.8 = 80.",
    steps: [
        "G = 0.8R + 20",
        "Inverse: R = (G - 20) / 0.8",
        "R = (84 - 20) / 0.8",
        "R = 64 / 0.8 = 80",
    ],
    formula: "R = (G - 20) / 0.8",
    hints: [
        "Subtract 20 from the final grade first",
        "Divide by 0.8 to find the raw score",
        "64 ÷ 0.8 = ?",
    ],
},
"17": {
    question:
        "Two bus stops are at points (1, 2) and (4, 6) on a city grid where 1 unit = 500 meters. What is the straight-line distance between them?",
    options: ["1,500 m", "2,000 m", "2,500 m", "3,000 m"],
    correctAnswer: 2,
    explanation:
        "Distance = √((4-1)² + (6-2)²) = √(3² + 4²) = √(9 + 16) = √25 = 5 units. Since 1 unit = 500 m, distance = 5 × 500 = 2,500 m.",
    steps: [
        "Distance = √((4-1)² + (6-2)²)",
        "Distance = √(9 + 16) = √25",
        "Distance = 5 grid units",
        "5 × 500 m = 2,500 m",
    ],
    formula: "d = √(Δx² + Δy²)",
    hints: [
        "Find the differences in x and y coordinates",
        "Use the distance formula",
        "Convert grid units to meters",
    ],
},
"18": {
    question:
        "A sales agent earns 8% commission. If they earned ₱4,000 in commission, what were their total sales?",
    options: ["₱45,000", "₱50,000", "₱55,000", "₱60,000"],
    correctAnswer: 1,
    explanation:
        "Commission = 0.08 × sales. Using the inverse: sales = commission / 0.08 = 4000 / 0.08 = ₱50,000.",
    steps: [
        "Commission = 0.08 × sales",
        "Inverse: sales = commission / 0.08",
        "sales = 4000 / 0.08",
        "sales = 50,000",
    ],
    formula: "sales = commission / rate",
    hints: [
        "Divide the commission by the commission rate",
        "4000 ÷ 0.08 = ?",
        "Check: 50,000 × 0.08 = 4,000",
    ],
},
"19": {
    question:
        "A badminton court is 13.4 meters long and 6.1 meters wide. What is the approximate diagonal of the court?",
    options: ["13.7 m", "14.7 m", "15.7 m", "16.7 m"],
    correctAnswer: 1,
    explanation:
        "Use the Pythagorean theorem: diagonal = √(13.4² + 6.1²) = √(179.56 + 37.21) = √216.77 ≈ 14.72 m.",
    steps: [
        "diagonal² = 13.4² + 6.1²",
        "diagonal² = 179.56 + 37.21 = 216.77",
        "diagonal = √216.77",
        "diagonal ≈ 14.7 m",
    ],
    formula: "d = √(l² + w²)",
    hints: [
        "Square both dimensions and add",
        "Take the square root of the sum",
        "Round to one decimal place",
    ],
},
"20": {
    question:
        "Which of the following is the simplified form of √98?",
    options: ["7√2", "2√7", "49√2", "14√7"],
    correctAnswer: 0,
    explanation:
        "Simplify √98 by factoring out the largest perfect square: √98 = √(49 × 2) = √49 × √2 = 7√2.",
    steps: [
        "Find the largest perfect square factor of 98",
        "98 = 49 × 2",
        "√98 = √49 × √2",
        "√98 = 7√2",
    ],
    formula: "√(ab) = √a × √b",
    hints: [
        "49 is a perfect square factor of 98",
        "Separate into √49 × √2",
        "√49 = 7",
    ],
},
// Level 3: Province Tutoring (21-30) - Radicals & Inverse Functions
"21": {
    question:
        "Solve for x: √(x + 5) = 4",
    options: ["x = 9", "x = 11", "x = 16", "x = 21"],
    correctAnswer: 1,
    explanation:
        "Square both sides: x + 5 = 16. Subtract 5: x = 11. Check: √(11 + 5) = √16 = 4 ✓.",
    steps: [
        "Square both sides: (√(x + 5))² = 4²",
        "x + 5 = 16",
        "Subtract 5: x = 11",
        "Check: √16 = 4 ✓",
    ],
    formula: "√(x + 5) = 4 → x + 5 = 16",
    hints: [
        "Square both sides to remove the radical",
        "Solve the resulting linear equation",
        "Always check your answer",
    ],
},
"22": {
    question:
        "A rectangular rice field is 40 m long and 30 m wide. What is the diagonal distance across the field?",
    options: ["50 m", "60 m", "70 m", "80 m"],
    correctAnswer: 0,
    explanation:
        "Use the Pythagorean theorem: diagonal = √(40² + 30²) = √(1600 + 900) = √2500 = 50 m.",
    steps: [
        "diagonal² = 40² + 30²",
        "diagonal² = 1600 + 900 = 2500",
        "diagonal = √2500",
        "diagonal = 50 m",
    ],
    formula: "d = √(l² + w²)",
    hints: [
        "40 and 30 form a 3-4-5 triangle scaled by 10",
        "The hypotenuse is 50",
        "Use square root to find the diagonal",
    ],
},
"23": {
    question:
        "Ate Liza mixes fertilizer with water. The concentration formula is C = F / 20, where F is fertilizer in grams and C is concentration. If the desired concentration is 3 g/L, how much fertilizer is needed?",
    options: ["40 g", "50 g", "60 g", "70 g"],
    correctAnswer: 2,
    explanation:
        "Use the inverse formula: F = 20C. Substituting C = 3: F = 20(3) = 60 g.",
    steps: [
        "C = F / 20",
        "Inverse: F = 20C",
        "F = 20(3)",
        "F = 60 g",
    ],
    formula: "F = 20C",
    hints: [
        "Multiply concentration by 20 to find fertilizer amount",
        "This is the inverse of the concentration formula",
        "20 × 3 = ?",
    ],
},
"24": {
    question:
        "An irrigation pipe runs diagonally under a field. Horizontally it spans 12 m, and vertically it drops 5 m. What is the pipe length?",
    options: ["12 m", "13 m", "14 m", "15 m"],
    correctAnswer: 1,
    explanation:
        "Use the Pythagorean theorem: length = √(12² + 5²) = √(144 + 25) = √169 = 13 m.",
    steps: [
        "length² = 12² + 5²",
        "length² = 144 + 25 = 169",
        "length = √169",
        "length = 13 m",
    ],
    formula: "length = √(horizontal² + vertical²)",
    hints: [
        "12 and 5 are legs of a right triangle",
        "The hypotenuse is 13",
        "Take the square root of the sum",
    ],
},
"25": {
    question:
        "Budget Officer Amy allocates 35% of the total fund to health. If health received ₱175,000, what was the original total fund?",
    options: ["₱500,000", "₱550,000", "₱600,000", "₱650,000"],
    correctAnswer: 0,
    explanation:
        "Use the inverse formula: total = allocation / percentage = 175,000 / 0.35 = 500,000.",
    steps: [
        "allocation = 0.35 × total",
        "Inverse: total = allocation / 0.35",
        "total = 175,000 / 0.35",
        "total = 500,000",
    ],
    formula: "total = allocation / percentage",
    hints: [
        "Divide the allocation by the percentage",
        "175,000 ÷ 0.35 = ?",
        "Check: 500,000 × 0.35 = 175,000",
    ],
},
"26": {
    question:
        "A medicine dosage formula is D = 5W, where D is dosage in mg and W is patient weight in kg. If a patient needs 350 mg, what is the patient's weight?",
    options: ["60 kg", "65 kg", "70 kg", "75 kg"],
    correctAnswer: 2,
    explanation:
        "Use the inverse formula: W = D / 5. Substituting D = 350: W = 350 / 5 = 70 kg.",
    steps: [
        "D = 5W",
        "Inverse: W = D / 5",
        "W = 350 / 5",
        "W = 70 kg",
    ],
    formula: "W = D / 5",
    hints: [
        "Divide dosage by 5 to find weight",
        "350 ÷ 5 = ?",
        "This is the inverse of the dosage formula",
    ],
},
"27": {
    question:
        "A hilly road rises 9 m over a horizontal distance of 40 m. What is the actual slope distance of the road?",
    options: ["41 m", "42 m", "43 m", "44 m"],
    correctAnswer: 0,
    explanation:
        "Use the Pythagorean theorem: slope = √(40² + 9²) = √(1600 + 81) = √1681 = 41 m.",
    steps: [
        "slope² = 40² + 9²",
        "slope² = 1600 + 81 = 1681",
        "slope = √1681",
        "slope = 41 m",
    ],
    formula: "slope = √(horizontal² + rise²)",
    hints: [
        "40 and 9 are the legs",
        "The hypotenuse is the actual road length",
        "Take the square root",
    ],
},
"28": {
    question:
        "A cornfield yields 8 tons per hectare. How many hectares are needed to produce 48 tons?",
    options: ["4 ha", "5 ha", "6 ha", "7 ha"],
    correctAnswer: 2,
    explanation:
        "Use the inverse formula: area = total yield / yield per hectare = 48 / 8 = 6 hectares.",
    steps: [
        "yield = 8 × area",
        "Inverse: area = total yield / 8",
        "area = 48 / 8",
        "area = 6 ha",
    ],
    formula: "area = total yield / yield rate",
    hints: [
        "Divide total yield by yield per hectare",
        "48 ÷ 8 = ?",
        "This uses the inverse of the yield formula",
    ],
},
"29": {
    question:
        "A cubic water tank has a volume of 729 cubic meters. What is the length of each side?",
    options: ["7 m", "8 m", "9 m", "10 m"],
    correctAnswer: 2,
    explanation:
        "For a cube, V = s³. So s = ∛V = ∛729 = 9 m.",
    steps: [
        "V = s³",
        "s = ∛729",
        "9³ = 729",
        "s = 9 m",
    ],
    formula: "s = ∛V",
    hints: [
        "Cube root is the inverse of cubing",
        "What number cubed equals 729?",
        "9 × 9 × 9 = 729",
    ],
},
"30": {
    question:
        "Which of the following is equivalent to √(72) + √(50)?",
    options: ["11√2", "12√2", "13√2", "14√2"],
    correctAnswer: 0,
    explanation:
        "Simplify each radical: √72 = √(36 × 2) = 6√2, and √50 = √(25 × 2) = 5√2. Adding like radicals: 6√2 + 5√2 = 11√2.",
    steps: [
        "√72 = √(36 × 2) = 6√2",
        "√50 = √(25 × 2) = 5√2",
        "6√2 + 5√2 = 11√2",
        "Answer: 11√2",
    ],
    formula: "a√c + b√c = (a + b)√c",
    hints: [
        "Simplify each radical first",
        "Both have √2 after simplifying",
        "Add the coefficients",
    ],
},
// Level 4: Region Tutoring (31-40) - Radicals & Inverse Functions
"31": {
    question:
        "Solve for x: √(2x + 3) = √(x + 7)",
    options: ["x = 2", "x = 3", "x = 4", "x = 5"],
    correctAnswer: 2,
    explanation:
        "Square both sides: 2x + 3 = x + 7. Subtract x: x + 3 = 7. Subtract 3: x = 4. Check: √(11) = √(11) ✓.",
    steps: [
        "Square both sides: 2x + 3 = x + 7",
        "Subtract x: x + 3 = 7",
        "Subtract 3: x = 4",
        "Check both sides are equal",
    ],
    formula: "√(2x + 3) = √(x + 7)",
    hints: [
        "Square both sides to eliminate radicals",
        "Solve the linear equation",
        "Verify by substitution",
    ],
},
"32": {
    question:
        "A signal's strength S is given by S = 12 / √d, where d is distance in km. If the measured strength is 4, how far away is the source?",
    options: ["6 km", "8 km", "9 km", "12 km"],
    correctAnswer: 2,
    explanation:
        "Use the inverse formula: 4 = 12 / √d, so √d = 12 / 4 = 3. Square both sides: d = 9 km.",
    steps: [
        "4 = 12 / √d",
        "√d = 12 / 4 = 3",
        "Square both sides: d = 9",
        "d = 9 km",
    ],
    formula: "d = (12 / S)²",
    hints: [
        "Rearrange to isolate √d",
        "12 ÷ 4 = 3",
        "Square to find d",
    ],
},
"33": {
    question:
        "Find the distance between points A(2, 3) and B(5, 7).",
    options: ["3 units", "4 units", "5 units", "6 units"],
    correctAnswer: 2,
    explanation:
        "Distance = √((5-2)² + (7-3)²) = √(9 + 16) = √25 = 5 units.",
    steps: [
        "Distance = √((5-2)² + (7-3)²)",
        "Distance = √(3² + 4²)",
        "Distance = √(9 + 16) = √25",
        "Distance = 5 units",
    ],
    formula: "d = √(Δx² + Δy²)",
    hints: [
        "Find differences in x and y",
        "3-4-5 triangle pattern",
        "Take the square root",
    ],
},
"34": {
    question:
        "The temperature T in °C at altitude h in meters is T = 25 - 0.006h. At what altitude is the temperature 7°C?",
    options: ["2,000 m", "3,000 m", "3,500 m", "4,000 m"],
    correctAnswer: 1,
    explanation:
        "Use the inverse formula: h = (25 - T) / 0.006. Substituting T = 7: h = 18 / 0.006 = 3,000 m.",
    steps: [
        "T = 25 - 0.006h",
        "Inverse: h = (25 - T) / 0.006",
        "h = (25 - 7) / 0.006",
        "h = 18 / 0.006 = 3,000 m",
    ],
    formula: "h = (25 - T) / 0.006",
    hints: [
        "Subtract temperature from 25 first",
        "Divide by 0.006",
        "18 ÷ 0.006 = ?",
    ],
},
"35": {
    question:
        "Find the roots of x² - 6x + 4 = 0 using the quadratic formula.",
    options: [
        "3 ± √5",
        "3 ± √13",
        "6 ± √5",
        "6 ± √13",
    ],
    correctAnswer: 0,
    explanation:
        "x = [6 ± √(36 - 16)] / 2 = [6 ± √20] / 2 = [6 ± 2√5] / 2 = 3 ± √5.",
    steps: [
        "a = 1, b = -6, c = 4",
        "x = [6 ± √(36 - 16)] / 2",
        "x = [6 ± √20] / 2",
        "x = 3 ± √5",
    ],
    formula: "x = [-b ± √(b² - 4ac)] / 2a",
    hints: [
        "Identify a, b, c",
        "Calculate the discriminant",
        "Simplify the radical",
    ],
},
"36": {
    question:
        "A cipher encodes a number by n → 3n + 7. If the encoded number is 22, what was the original number?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation:
        "Use the inverse: n = (encoded - 7) / 3 = (22 - 7) / 3 = 15 / 3 = 5.",
    steps: [
        "Encoded = 3n + 7",
        "Inverse: n = (encoded - 7) / 3",
        "n = (22 - 7) / 3",
        "n = 15 / 3 = 5",
    ],
    formula: "n = (encoded - 7) / 3",
    hints: [
        "Subtract 7 from the encoded number",
        "Divide by 3",
        "15 ÷ 3 = ?",
    ],
},
"37": {
    question:
        "A projectile's height is h = -5t² + 30t. When does it hit the ground?",
    options: ["t = 5 s", "t = 6 s", "t = 7 s", "t = 8 s"],
    correctAnswer: 1,
    explanation:
        "Set h = 0: -5t² + 30t = 0. Factor: -5t(t - 6) = 0. So t = 0 or t = 6. It hits the ground at t = 6 seconds.",
    steps: [
        "Set h = 0: -5t² + 30t = 0",
        "Factor: -5t(t - 6) = 0",
        "t = 0 or t = 6",
        "t = 6 seconds when it lands",
    ],
    formula: "h = -5t² + 30t",
    hints: [
        "Set height equal to zero",
        "Factor out -5t",
        "Choose the positive time",
    ],
},
"38": {
    question:
        "An investment grows by 5% annually. If the final amount after 1 year is ₱21,000, what was the principal?",
    options: ["₱18,000", "₱19,000", "₱20,000", "₱20,500"],
    correctAnswer: 2,
    explanation:
        "Use the inverse formula: principal = final / 1.05 = 21,000 / 1.05 = 20,000.",
    steps: [
        "Final = principal × 1.05",
        "Inverse: principal = final / 1.05",
        "principal = 21,000 / 1.05",
        "principal = 20,000",
    ],
    formula: "principal = final / (1 + rate)",
    hints: [
        "Divide final amount by 1.05",
        "21,000 ÷ 1.05 = ?",
        "Check: 20,000 × 1.05 = 21,000",
    ],
},
"39": {
    question:
        "Rationalize the denominator: 5 / √2",
    options: [
        "(5√2) / 2",
        "5√2",
        "5 / 2",
        "√2 / 5",
    ],
    correctAnswer: 0,
    explanation:
        "Multiply numerator and denominator by √2: (5√2) / (√2 × √2) = (5√2) / 2.",
    steps: [
        "Multiply by √2 / √2",
        "Numerator: 5√2",
        "Denominator: √2 × √2 = 2",
        "Result: (5√2) / 2",
    ],
    formula: "a/√b = (a√b) / b",
    hints: [
        "Multiply by the radical over itself",
        "Simplify the denominator",
        "Keep the radical in the numerator",
    ],
},
"40": {
    question:
        "Which expression is equivalent to √(50) - √(18)?",
    options: [
        "√2",
        "2√2",
        "3√2",
        "4√2",
    ],
    correctAnswer: 1,
    explanation:
        "Simplify: √50 = √(25 × 2) = 5√2, and √18 = √(9 × 2) = 3√2. So 5√2 - 3√2 = 2√2.",
    steps: [
        "√50 = 5√2",
        "√18 = 3√2",
        "5√2 - 3√2 = 2√2",
        "Answer: 2√2",
    ],
    formula: "a√c - b√c = (a - b)√c",
    hints: [
        "Simplify each radical first",
        "Both have √2",
        "Subtract coefficients",
    ],
},
// Level 5: National Tutoring (41-50) - Radicals & Inverse Functions
"41": {
    question:
        "Solve for x: √(x + 1) + √(x - 1) = 2",
    options: ["x = 1", "x = 5/4", "x = 2", "x = 5"],
    correctAnswer: 1,
    explanation:
        "Isolate one radical: √(x + 1) = 2 - √(x - 1). Square both sides: x + 1 = 4 - 4√(x - 1) + x - 1. Simplify: 1 = 3 - 4√(x - 1), so 4√(x - 1) = 2, √(x - 1) = 1/2. Square: x - 1 = 1/4, x = 5/4. Check: √(9/4) + √(1/4) = 3/2 + 1/2 = 2 ✓.",
    steps: [
        "Isolate √(x + 1)",
        "Square both sides",
        "Isolate the remaining radical",
        "Solve and check x = 5/4",
    ],
    formula: "√(x + 1) + √(x - 1) = 2",
    hints: [
        "Isolate one radical before squaring",
        "Be careful expanding the squared binomial",
        "Check for extraneous solutions",
    ],
},
"42": {
    question:
        "Find the inverse of f(x) = x² + 4 for x ≥ 0.",
    options: [
        "f⁻¹(x) = √(x - 4)",
        "f⁻¹(x) = -√(x - 4)",
        "f⁻¹(x) = √(x + 4)",
        "f⁻¹(x) = x - 4",
    ],
    correctAnswer: 0,
    explanation:
        "Let y = x² + 4. Swap x and y: x = y² + 4. Solve: y² = x - 4, y = √(x - 4). Since the original domain is x ≥ 0, we take the positive root.",
    steps: [
        "y = x² + 4",
        "Swap: x = y² + 4",
        "y² = x - 4",
        "y = √(x - 4) (positive because x ≥ 0)",
    ],
    formula: "f⁻¹(x) = √(x - 4)",
    hints: [
        "Swap x and y",
        "Solve for y",
        "Choose the positive root because of the domain restriction",
    ],
},
"43": {
    question:
        "Find the inverse of f(x) = (2x + 3) / (x - 1).",
    options: [
        "f⁻¹(x) = (x + 3) / (x - 2)",
        "f⁻¹(x) = (x - 3) / (x + 2)",
        "f⁻¹(x) = (x + 3) / (x + 2)",
        "f⁻¹(x) = (x - 3) / (x - 2)",
    ],
    correctAnswer: 0,
    explanation:
        "Let y = (2x + 3)/(x - 1). Swap: x = (2y + 3)/(y - 1). Multiply: x(y - 1) = 2y + 3. Expand: xy - x = 2y + 3. Collect y terms: xy - 2y = x + 3. Factor: y(x - 2) = x + 3. So y = (x + 3)/(x - 2).",
    steps: [
        "Swap x and y",
        "x(y - 1) = 2y + 3",
        "xy - 2y = x + 3",
        "y = (x + 3)/(x - 2)",
    ],
    formula: "f⁻¹(x) = (x + 3)/(x - 2)",
    hints: [
        "Cross-multiply after swapping",
        "Collect all y terms on one side",
        "Factor out y and divide",
    ],
},
"44": {
    question:
        "Solve the inequality: √(x - 2) ≤ 3",
    options: [
        "x ≤ 11",
        "x ≥ 2",
        "2 ≤ x ≤ 11",
        "x ≥ 11",
    ],
    correctAnswer: 2,
    explanation:
        "First, the expression under the radical must be non-negative: x - 2 ≥ 0, so x ≥ 2. Then square both sides: x - 2 ≤ 9, so x ≤ 11. Combined: 2 ≤ x ≤ 11.",
    steps: [
        "Domain: x - 2 ≥ 0, so x ≥ 2",
        "Square both sides: x - 2 ≤ 9",
        "x ≤ 11",
        "Combined solution: 2 ≤ x ≤ 11",
    ],
    formula: "√(x - 2) ≤ 3",
    hints: [
        "Find the domain first",
        "Square both sides (valid because both sides are non-negative)",
        "Combine the two conditions",
    ],
},
"45": {
    question:
        "If f(x) = 4x - 7 and g(x) = (x + 7)/4, which statement is true?",
    options: [
        "f(g(x)) = x and g(f(x)) = x",
        "f(g(x)) = 0",
        "g(f(x)) = 7",
        "f and g are not inverses",
    ],
    correctAnswer: 0,
    explanation:
        "f(g(x)) = 4((x + 7)/4) - 7 = x + 7 - 7 = x. g(f(x)) = (4x - 7 + 7)/4 = 4x/4 = x. Since both compositions equal x, f and g are inverses.",
    steps: [
        "Compute f(g(x)) = 4((x+7)/4) - 7",
        "Simplify: x + 7 - 7 = x",
        "Compute g(f(x)) = (4x - 7 + 7)/4",
        "Simplify: 4x/4 = x",
    ],
    formula: "f and g are inverses if f(g(x)) = g(f(x)) = x",
    hints: [
        "Substitute g into f",
        "Substitute f into g",
        "If both equal x, they are inverses",
    ],
},
"46": {
    question:
        "The period T of a pendulum is T = 2π√(L/g). Solve for L in terms of T and g.",
    options: [
        "L = gT²/(4π²)",
        "L = T²/(4π²g)",
        "L = gT/(2π)",
        "L = T²g/(2π)",
    ],
    correctAnswer: 0,
    explanation:
        "T = 2π√(L/g). Divide by 2π: T/(2π) = √(L/g). Square: T²/(4π²) = L/g. Multiply by g: L = gT²/(4π²).",
    steps: [
        "T = 2π√(L/g)",
        "T/(2π) = √(L/g)",
        "Square both sides",
        "L = gT²/(4π²)",
    ],
    formula: "L = gT²/(4π²)",
    hints: [
        "Isolate the radical first",
        "Square both sides",
        "Multiply by g to solve for L",
    ],
},
"47": {
    question:
        "If the point (3, 5) is on the graph of f, what point must be on the graph of f⁻¹?",
    options: [
        "(3, 5)",
        "(5, 3)",
        "(-3, -5)",
        "(-5, -3)",
    ],
    correctAnswer: 1,
    explanation:
        "Inverse functions swap x and y coordinates. If f(3) = 5, then f⁻¹(5) = 3, so the point (5, 3) is on f⁻¹.",
    steps: [
        "f(3) = 5 means (3, 5) is on f",
        "For inverse, swap coordinates",
        "f⁻¹(5) = 3",
        "Point on f⁻¹ is (5, 3)",
    ],
    formula: "(a, b) on f → (b, a) on f⁻¹",
    hints: [
        "Inverse functions swap input and output",
        "Swap the coordinates of the point",
        "(3, 5) becomes (5, 3)",
    ],
},
"48": {
    question:
        "Simplify the nested radical: √(7 + 4√3)",
    options: [
        "2 + √3",
        "2 - √3",
        "2 + 2√3",
        "4 + √3",
    ],
    correctAnswer: 0,
    explanation:
        "Assume √(7 + 4√3) = √(a) + √(b). Then a + b = 7 and 2√(ab) = 4√3, so ab = 12. a and b are 4 and 3. So √(7 + 4√3) = √4 + √3 = 2 + √3.",
    steps: [
        "Let expression = √a + √b",
        "a + b = 7 and ab = 12",
        "a = 4, b = 3",
        "Result: 2 + √3",
    ],
    formula: "√(7 + 4√3) = 2 + √3",
    hints: [
        "Look for two numbers whose sum is 7 and product is 12",
        "Those numbers are 4 and 3",
        "Take square roots and add",
    ],
},
"49": {
    question:
        "In the arithmetic sequence aₙ = 3n + 5, which term has the value 26?",
    options: ["5th", "6th", "7th", "8th"],
    correctAnswer: 2,
    explanation:
        "Use the inverse: set 3n + 5 = 26. Subtract 5: 3n = 21. Divide by 3: n = 7. So the 7th term is 26.",
    steps: [
        "aₙ = 3n + 5 = 26",
        "3n = 21",
        "n = 7",
        "The 7th term",
    ],
    formula: "n = (value - 5) / 3",
    hints: [
        "Set the sequence formula equal to 26",
        "Solve for n",
        "n tells you the term position",
    ],
},
"50": {
    question:
        "Which of the following is equivalent to (√8 + √18) / √2?",
    options: [
        "5",
        "2√2",
        "3√2",
        "5√2",
    ],
    correctAnswer: 0,
    explanation:
        "Simplify: √8 = 2√2 and √18 = 3√2. So (√8 + √18)/√2 = (2√2 + 3√2)/√2 = 5√2/√2 = 5.",
    steps: [
        "√8 = 2√2",
        "√18 = 3√2",
        "(2√2 + 3√2)/√2 = 5√2/√2",
        "= 5",
    ],
    formula: "(√8 + √18)/√2 = 5",
    hints: [
        "Simplify each radical first",
        "Combine like terms in the numerator",
        "Divide by √2",
    ],
},

};

export const defaultQuiz: QuizData = {
    question: "If x + 5 = 12, what is the value of x?",
    options: ["5", "7", "17", "12"],
    correctAnswer: 1,
    explanation:
        "Subtract 5 from both sides: x = 12 - 5 = 7. This is a basic algebraic equation solving technique.",
};
