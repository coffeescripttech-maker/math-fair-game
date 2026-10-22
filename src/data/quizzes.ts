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

// Level 2: City Tutoring (11-20) - Fractions, Decimals & Percent
"11": {
    question:
        "Carla answered 3/8 of the questions in a 64-item diagnostic exam at the city public school. How many items did she answer?",
    options: ["21 items", "24 items", "27 items", "32 items"],
    correctAnswer: 1,
    explanation:
        "A fraction of a total is found by multiplying: 3/8 × 64 = 3 × 8 = 24 items. Multiplying a whole number by a fraction takes part of the whole.",
    steps: [
        "Fraction answered = 3/8, total items = 64",
        "Multiply: (3/8) × 64",
        "64 ÷ 8 = 8, so 3 × 8 = 24",
        "She answered 24 items",
    ],
    formula: "part = (fraction) × total",
    hints: [
        "To find a fraction OF a number, multiply",
        "Simplify first: 64 ÷ 8 = 8",
        "(3/8) × 64 = 3 × 8 = ?",
    ],
},
"12": {
    question:
        "Mang Roy's jeepney spends ₱18.75 worth of gasoline per trip. If he makes 8 trips around the city, what is his total gasoline cost?",
    options: ["₱140.00", "₱160.00", "₱150.00", "₱155.00"],
    correctAnswer: 2,
    explanation:
        "Multiply the decimal cost by the whole number of trips: 18.75 × 8 = ₱150.00. Multiplying decimals by whole numbers scales money amounts.",
    steps: [
        "Cost per trip = ₱18.75",
        "Number of trips = 8",
        "Multiply: 18.75 × 8",
        "Total = ₱150.00",
    ],
    formula: "total = cost per trip × trips",
    hints: [
        "Multiply 1875 by 8, then place the decimal point",
        "1875 × 8 = 15,000",
        "Two decimal places: ₱150.00",
    ],
},
"13": {
    question:
        "Arki Maya's blueprint shows a city lot measuring 3/4 of a hectare. One hectare is 10,000 m². How many square meters is the lot?",
    options: ["7,000 m²", "8,000 m²", "7,500 m²", "7,750 m²"],
    correctAnswer: 2,
    explanation:
        "Multiply the whole by the fraction: 3/4 × 10,000 = 30,000 ÷ 4 = 7,500 m². A fraction times a whole gives that portion of the whole.",
    steps: [
        "Whole: 1 hectare = 10,000 m²",
        "Lot = (3/4) × 10,000",
        "10,000 × 3 = 30,000, then ÷ 4",
        "Lot = 7,500 m²",
    ],
    formula: "portion = (fraction) × whole",
    hints: [
        "Multiply 10,000 by 3 first",
        "Then divide by 4",
        "30,000 ÷ 4 = 7,500",
    ],
},
"14": {
    question:
        "Student Leo's online store sells a jacket worth ₱600 with a 15% discount. What is the sale price?",
    options: ["₱585", "₱510", "₱540", "₱450"],
    correctAnswer: 1,
    explanation:
        "A 15% discount means you pay 85% of the price: 600 × 0.85 = ₱510. A percent is just a decimal, so convert 15% to 0.15 before multiplying.",
    steps: [
        "Discount = 15%, so the buyer pays 100% - 15% = 85%",
        "85% as a decimal is 0.85",
        "Sale price = 600 × 0.85",
        "Sale price = ₱510",
    ],
    formula: "sale price = original × (1 - discount rate)",
    hints: [
        "Convert 15% to a decimal: 0.15",
        "Pay 85%: multiply by 1 - 0.15",
        "600 × 0.85 = 510",
    ],
},
"15": {
    question:
        "Gina jogged 850 meters of the 2.4 km park loop. How many kilometers are left to jog?",
    options: ["1.45 km", "1.65 km", "1.55 km", "1.85 km"],
    correctAnswer: 2,
    explanation:
        "Convert meters to kilometers first: 850 m = 0.85 km. Then subtract decimals: 2.4 - 0.85 = 1.55 km.",
    steps: [
        "Convert: 850 m = 0.85 km",
        "Left = 2.4 - 0.85",
        "Align decimal points and subtract",
        "Left = 1.55 km",
    ],
    formula: "remaining = total - completed",
    hints: [
        "1 km = 1,000 m, so 850 m = 0.85 km",
        "Line up the decimal points",
        "2.40 - 0.85 = ?",
    ],
},
"16": {
    question:
        "Sir Tan computes a student's percentage score for a 40-item test where the student got 36 correct. What is the percentage score?",
    options: ["80%", "85%", "95%", "90%"],
    correctAnswer: 3,
    explanation:
        "Divide the score by the total, then multiply by 100: (36 ÷ 40) × 100 = 90%. Division turns a fraction of items into a percent score.",
    steps: [
        "Score fraction = 36/40",
        "Simplify: 36 ÷ 40 = 0.9",
        "Multiply by 100: 0.9 × 100",
        "Percentage score = 90%",
    ],
    formula: "percentage = (score ÷ total) × 100",
    hints: [
        "First find the score as a decimal",
        "36 ÷ 40 = 0.9",
        "Multiply the decimal by 100",
    ],
},
"17": {
    question:
        "Manager Ben schedules one jeepney departure slot every 0.75 hours. In 12 hours of operation, how many departure slots are there?",
    options: ["14 slots", "16 slots", "15 slots", "18 slots"],
    correctAnswer: 1,
    explanation:
        "Divide the total hours by the interval: 12 ÷ 0.75 = 16 slots. Dividing by a decimal finds how many equal intervals fit a total.",
    steps: [
        "Total hours = 12, interval = 0.75 h",
        "Slots = 12 ÷ 0.75",
        "Multiply both by 100: 1200 ÷ 75",
        "Slots = 16",
    ],
    formula: "slots = total hours ÷ interval",
    hints: [
        "0.75 hours is 45 minutes",
        "How many 45-minute intervals fit in 12 hours?",
        "12 ÷ 0.75 = 1200 ÷ 75 = ?",
    ],
},
"18": {
    question:
        "Carlos earns a 5% commission on ₱12,000 of sales at the city mall. How much commission does he receive?",
    options: ["₱600", "₱550", "₱500", "₱700"],
    correctAnswer: 0,
    explanation:
        "Commission is a percent of sales: 12,000 × 0.05 = ₱600. Multiply the total by the percent written as a decimal.",
    steps: [
        "Rate = 5% = 0.05",
        "Commission = 12,000 × 0.05",
        "12,000 × 5 = 60,000, two decimal places",
        "Commission = ₱600",
    ],
    formula: "commission = sales × rate",
    hints: [
        "Convert 5% to a decimal: 0.05",
        "Multiply the sales by 0.05",
        "12,000 × 0.05 = 600",
    ],
},
"19": {
    question:
        "Coach Kim places two badminton courts, each 6.1 meters wide, side by side with a 0.5 meter gap between them. What is the total width?",
    options: ["12.2 meters", "13.2 meters", "12.7 meters", "13.7 meters"],
    correctAnswer: 2,
    explanation:
        "Add the widths and the gap: 6.1 + 6.1 + 0.5 = 12.7 meters. Adding decimals line up and carry just like whole numbers.",
    steps: [
        "Two courts: 6.1 × 2 = 12.2",
        "Add the gap: 12.2 + 0.5",
        "Align decimals and add",
        "Total width = 12.7 meters",
    ],
    formula: "total = court width × 2 + gap",
    hints: [
        "Double the court width first",
        "6.1 × 2 = 12.2",
        "Then add the 0.5 gap",
    ],
},
"20": {
    question:
        "For Principal Santos' citywide exam review, students practice converting percents to fractions. Which fraction equals 45%?",
    options: ["9/25", "9/20", "4/9", "9/50"],
    correctAnswer: 1,
    explanation:
        "45% = 45/100. Simplify: GCF 45 and 100 is 5, so 45/100 = 9/20. This mixed review connects percents, fractions, and lowest terms.",
    steps: [
        "45% means 45 out of 100",
        "Write as a fraction: 45/100",
        "Divide both by the GCF, 5",
        "45/100 = 9/20",
    ],
    formula: "a% = a/100, simplified to lowest terms",
    hints: [
        "Percent means per hundred",
        "Write 45 as 45/100",
        "Both 45 and 100 divide evenly by 5",
    ],
},
// Level 3: Province Tutoring (21-30) - Ratio, Proportion & Radical Flourishes
"21": {
    question:
        "Sarah's scholarship committee splits 40 qualifying slots between two districts in the ratio 3:2. How many slots go to the district with the larger share?",
    options: ["16 slots", "20 slots", "24 slots", "28 slots"],
    correctAnswer: 2,
    explanation:
        "Add the ratio parts: 3 + 2 = 5 parts. One part is 40 ÷ 5 = 8. The larger share takes 3 parts: 3 × 8 = 24 slots. Ratios split totals in fixed proportions.",
    steps: [
        "Ratio parts: 3 + 2 = 5 parts",
        "One part = 40 ÷ 5 = 8",
        "Larger share = 3 × 8",
        "Larger share = 24 slots",
    ],
    formula: "share = (ratio part ÷ total parts) × whole",
    hints: [
        "Count the total number of ratio parts first",
        "Divide the total slots by the number of parts",
        "40 ÷ 5 = 8 per part, then multiply by 3",
    ],
},
"22": {
    question:
        "Mang Tomas harvests 15 sacks of rice from every 3 hectares of his farm. At the same rate, how many sacks will he harvest from 8 hectares?",
    options: ["35 sacks", "40 sacks", "45 sacks", "48 sacks"],
    correctAnswer: 1,
    explanation:
        "Direct proportion: find the unit rate first. 15 sacks ÷ 3 hectares = 5 sacks per hectare. Then 5 × 8 = 40 sacks. Doubling one quantity doubles the other.",
    steps: [
        "Unit rate = 15 ÷ 3 = 5 sacks per hectare",
        "More hectares means more sacks — direct proportion",
        "Sacks = 5 × 8",
        "Sacks = 40",
    ],
    formula: "total = (amount ÷ base) × new amount",
    hints: [
        "Find how many sacks ONE hectare yields",
        "15 ÷ 3 = 5 sacks per hectare",
        "Multiply the rate by 8 hectares",
    ],
},
"23": {
    question:
        "Ate Liza mixes fertilizer and water in the ratio 2:7. If she prepares 90 liters of mixture altogether, how many liters of fertilizer does she use?",
    options: ["12 liters", "18 liters", "20 liters", "24 liters"],
    correctAnswer: 2,
    explanation:
        "The ratio has 2 + 7 = 9 equal parts. One part is 90 ÷ 9 = 10 liters. Fertilizer is 2 parts: 2 × 10 = 20 liters.",
    steps: [
        "Total ratio parts: 2 + 7 = 9",
        "One part = 90 ÷ 9 = 10 liters",
        "Fertilizer = 2 × 10",
        "Fertilizer = 20 liters",
    ],
    formula: "part = (number of parts ÷ total parts) × total amount",
    hints: [
        "Add the ratio parts 2 + 7 to get 9",
        "90 liters divided by 9 parts gives 10 per part",
        "Fertilizer takes 2 of those parts",
    ],
},
"24": {
    question:
        "Engineer Pat's crew of 6 workers digs an irrigation canal in 12 days. If 9 workers of the same speed take over, in how many days will it be finished?",
    options: ["9 days", "10 days", "8 days", "12 days"],
    correctAnswer: 2,
    explanation:
        "The work is 6 × 12 = 72 worker-days. More workers finish sooner — inverse proportion: 72 ÷ 9 = 8 days.",
    steps: [
        "Total work = workers × days = 6 × 12 = 72 worker-days",
        "More workers → fewer days (inverse proportion)",
        "Days = 72 ÷ 9",
        "Days = 8",
    ],
    formula: "workers × days = constant total work",
    hints: [
        "Multiply workers and days for the total amount of work",
        "72 worker-days ÷ 9 workers = ?",
        "Inverse proportion means one goes up, the other goes down",
    ],
},
"25": {
    question:
        "Budget Officer Amy splits a ₱1,200,000 improvement fund between the health office and the school district in the ratio 5:3. How much does the school district receive?",
    options: ["₱400,000", "₱450,000", "₱480,000", "₱750,000"],
    correctAnswer: 1,
    explanation:
        "The ratio 5:3 has 8 parts. One part is ₱1,200,000 ÷ 8 = ₱150,000. The school district's 3 parts: 3 × 150,000 = ₱450,000.",
    steps: [
        "Ratio parts: 5 + 3 = 8",
        "One part = ₱1,200,000 ÷ 8 = ₱150,000",
        "School district = 3 × ₱150,000",
        "School district = ₱450,000",
    ],
    formula: "share = (parts ÷ total parts) × whole",
    hints: [
        "Count all 8 parts together",
        "One part is ₱150,000",
        "Multiply 3 parts by ₱150,000",
    ],
},
"26": {
    question:
        "Nurse Joy's IV drip delivers 60 mL per hour and empties a fluid bag in 4 hours. If a procedure needs the same fluid drained in only 3 hours, what drip rate is needed?",
    options: ["80 mL/h", "75 mL/h", "100 mL/h", "90 mL/h"],
    correctAnswer: 0,
    explanation:
        "The bag holds 60 × 4 = 240 mL. Faster time needs faster rate — inverse proportion: 240 ÷ 3 = 80 mL per hour.",
    steps: [
        "Fluid total = 60 × 4 = 240 mL",
        "Less time → higher rate (inverse proportion)",
        "Rate = 240 ÷ 3",
        "Rate = 80 mL per hour",
    ],
    formula: "rate × time = constant fluid amount",
    hints: [
        "Multiply rate and time for the total volume",
        "240 mL ÷ 3 hours = ?",
        "Halving the time doubles the rate exactly?",
    ],
},
"27": {
    question:
        "Foreman Bob measures a road cut with a rise of 6 meters over a run of 8 meters. Write the slope as a ratio in lowest terms.",
    options: ["2:3", "3:4", "4:3", "6:7"],
    correctAnswer: 1,
    explanation:
        "The slope ratio is 6:8. Divide both numbers by their GCF, 2: 6 ÷ 2 : 8 ÷ 2 = 3:4. Ratios in lowest terms compare cleanly.",
    steps: [
        "Rise : run = 6 : 8",
        "Find the GCF of 6 and 8: it is 2",
        "6 ÷ 2 = 3 and 8 ÷ 2 = 4",
        "Slope in lowest terms = 3:4",
    ],
    formula: "slope = rise : run, in lowest terms",
    hints: [
        "Write rise first: 6:8",
        "Both 6 and 8 divide evenly by 2",
        "3:4 means every 3 units up over 4 units across",
    ],
},
"28": {
    question:
        "Ma'am Elena maps a provincial road where 1 cm on the map means 5,000 cm on land, a scale of 1:5,000. A road measures 6 cm on the map. How many meters on land is that?",
    options: ["120 meters", "600 meters", "3,000 meters", "300 meters"],
    correctAnswer: 3,
    explanation:
        "Multiply by scale: 6 × 5,000 = 30,000 cm. Since 1 m = 100 cm, 30,000 ÷ 100 = 300 meters.",
    steps: [
        "Land distance = 6 × 5,000 = 30,000 cm",
        "Convert: 100 cm = 1 m",
        "30,000 ÷ 100 = 300",
        "Land distance = 300 meters",
    ],
    formula: "land distance = map distance × scale, unit-converted",
    hints: [
        "Scale 1:5,000 means each cm is 5,000 cm",
        "6 × 5,000 = 30,000 centimeters",
        "30,000 cm is how many meters? Divide by 100",
    ],
},
"29": {
    question:
        "Sir Dan's 3 water pumps fill a provincial tank in 2 hours. If 4 pumps of the same rate run together, how many hours does filling take?",
    options: ["2 hours", "1.75 hours", "1.5 hours", "1 hour"],
    correctAnswer: 2,
    explanation:
        "One tank needs 3 × 2 = 6 pump-hours. More pumps finish faster — inverse proportion: 6 ÷ 4 = 1.5 hours.",
    steps: [
        "Tank work = 3 × 2 = 6 pump-hours",
        "More pumps → less time (inverse proportion)",
        "Hours = 6 ÷ 4",
        "Hours = 1.5",
    ],
    formula: "pumps × hours = constant tank work",
    hints: [
        "Pump-hours stay constant for one tank",
        "6 pump-hours with 4 pumps = ?",
        "6 ÷ 4 = 1.5 hours",
    ],
},
"30": {
    question:
        "For her provincial scholarship final, Sarah writes the ratio √144 : 15 in lowest terms. Which ratio matches her answer?",
    options: ["4:5", "3:5", "5:4", "4:3"],
    correctAnswer: 0,
    explanation:
        "Evaluate the radical first: √144 = 12. The ratio becomes 12:15, and both divide by the GCF 3: 12 ÷ 3 : 15 ÷ 3 = 4:5.",
    steps: [
        "√144 = 12",
        "Ratio becomes 12 : 15",
        "GCF of 12 and 15 is 3",
        "12 ÷ 3 : 15 ÷ 3 = 4 : 5",
    ],
    formula: "√144 : 15 = 12 : 15 = 4 : 5",
    hints: [
        "Simplify the radical first",
        "12 and 15 share a common factor of 3",
        "Divide both ratio terms by 3",
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
