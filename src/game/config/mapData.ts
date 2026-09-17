// Per-map data extracted from map scenes
// This file centralizes mission locations, collectibles, and mission metadata

export interface MissionLocation {
    x: number;
    y: number;
    name: string;
    npc: string;
    missionId: number;
    percentX: number;
    percentY: number;
}

export interface CollectibleItemData {
    id: string;
    type: "coin" | "badge" | "powerup" | "treasure";
    name: string;
    description: string;
    value: number;
    points: number;
    rarity: "common" | "uncommon" | "rare" | "legendary";
    percentX: number;
    percentY: number;
    icon: string;
}

export interface MissionMetadata {
    id: string;
    title: string;
    description: string;
    quizOverview: string;
    realLifeTrivia: string[];
    npc: string;
    location: string;
    reward: string;
}

export const barangayMissionLocations: MissionLocation[] = [
    {
        x: 6,
        y: 9,
        name: "Court Diagonal",
        npc: "Miguel",
        missionId: 1,
        percentX: 65.23374193028482,
        percentY: 71.92230956426152,
    },
    {
        x: 12,
        y: 6,
        name: "Recipe Scaling",
        npc: "Aling Maria",
        missionId: 2,
        percentX: 51.066356788711296,
        percentY: 21.650955755027937,
    },
    {
        x: 18,
        y: 12,
        name: "Walking Distance",
        npc: "Ben",
        missionId: 3,
        percentX: 10.69694841398983,
        percentY: 30.94354130319284,
    },
    {
        x: 9,
        y: 15,
        name: "Temperature Switch",
        npc: "Ana",
        missionId: 4,
        percentX: 85.34227508583415,
        percentY: 23.021992486912847,
    },
    {
        x: 21,
        y: 6,
        name: "Garden Area",
        npc: "Lola Rosa",
        missionId: 5,
        percentX: 13.286679814136823,
        percentY: 16.47148458658983,
    },
    {
        x: 3,
        y: 18,
        name: "Original Price",
        npc: "Mang Pedro",
        missionId: 6,
        percentX: 30.348472114958884,
        percentY: 63.23907135022767,
    },
    {
        x: 15,
        y: 18,
        name: "Ladder Reach",
        npc: "Kuya Noel",
        missionId: 7,
        percentX: 5.97448670013199,
        percentY: 22.869654607362076,
    },
    {
        x: 25,
        y: 12,
        name: "Trip Time",
        npc: "Teacher Cruz",
        missionId: 8,
        percentX: 66.75711235764845,
        percentY: 24.088353459696215,
    },
    {
        x: 6,
        y: 3,
        name: "Wire Length",
        npc: "Danny",
        missionId: 9,
        percentX: 77.11605469452468,
        percentY: 56.68856344990464,
    },
    {
        x: 12,
        y: 12,
        name: "Barangay Quiz Prep",
        npc: "Barangay Captain's Daughter",
        missionId: 10,
        percentX: 30.348472114958884,
        percentY: 21.346279995926384,
    },
];

export const barangayCollectibleItems: CollectibleItemData[] = [
    {
        id: "barangay-coin-1",
        type: "coin",
        name: "Radical Coin",
        description: "A shiny coin celebrating square roots",
        value: 5,
        points: 10,
        rarity: "common",
        percentX: 40,
        percentY: 31,
        icon: "💰",
    },
    {
        id: "barangay-coin-2",
        type: "coin",
        name: "Root Power Coin",
        description: "A coin flickering with the power of roots",
        value: 5,
        points: 10,
        rarity: "common",
        percentX: 56,
        percentY: 39,
        icon: "💰",
    },
    {
        id: "barangay-coin-3",
        type: "coin",
        name: "Inverse Coin",
        description: "A coin that always flips back the same way",
        value: 5,
        points: 10,
        rarity: "common",
        percentX: 40,
        percentY: 48,
        icon: "💰",
    },
    {
        id: "barangay-badge-1",
        type: "badge",
        name: "Radical Rookie Badge",
        description: "A badge for rising stars of radicals",
        value: 10,
        points: 25,
        rarity: "uncommon",
        percentX: 35,
        percentY: 65,
        icon: "🏅",
    },
    {
        id: "barangay-badge-2",
        type: "badge",
        name: "Function Flip Badge",
        description: "For students who can flip any function into f⁻¹",
        value: 10,
        points: 25,
        rarity: "uncommon",
        percentX: 52,
        percentY: 73,
        icon: "🏅",
    },
    {
        id: "barangay-treasure-1",
        type: "treasure",
        name: "Inverse Crystal",
        description: "A rare crystal mirroring functions back on themselves",
        value: 25,
        points: 50,
        rarity: "rare",
        percentX: 60,
        percentY: 82,
        icon: "💎",
    },
    {
        id: "barangay-powerup-1",
        type: "powerup",
        name: "Root Rush",
        description: "Boosts your square-root solving speed",
        value: 15,
        points: 30,
        rarity: "uncommon",
        percentX: 72,
        percentY: 92,
        icon: "⚡",
    },
    {
        id: "barangay-powerup-2",
        type: "powerup",
        name: "Flip Boost",
        description: "Boosts your inverse-function flipping power",
        value: 15,
        points: 30,
        rarity: "uncommon",
        percentX: 92,
        percentY: 73,
        icon: "⚡",
    },
];

export const barangayMissionMetadata: Record<number, MissionMetadata> = {
    1: {
        id: "1",
        title: "Court Diagonal",
        description:
            "Miguel is struggling with square roots. Help him find the diagonal of the barangay basketball court using the Pythagorean theorem.",
        quizOverview:
            "This quiz focuses on radicals through the Pythagorean theorem. You'll find the diagonal of a rectangle by taking the square root of the sum of squared sides.",
        realLifeTrivia: [
            "Basketball: Coaches use diagonal distances to plan drills and court layouts",
            "Construction: Carpenters use the Pythagorean theorem to make sure corners are square",
            "Walking shortcuts: The diagonal path across a park is shorter than walking around the edges",
            "TV screens: Screen sizes are measured diagonally using square roots",
        ],
        npc: "Miguel",
        location: "Barangay Basketball Court",
        reward: "10 coins + Radical Beginner Badge",
    },
    2: {
        id: "2",
        title: "Recipe Scaling",
        description:
            "Aling Maria needs to adjust a recipe for a different number of guests. Teach her how inverse functions help reverse a scaling formula.",
        quizOverview:
            "This quiz focuses on inverse functions through recipe scaling. You'll convert between serving sizes and ingredient amounts using inverse relationships.",
        realLifeTrivia: [
            "Cooking: Scale recipes up or down for different group sizes",
            "Budgeting: Reverse a total cost to find the original price before tax",
            "Medicine: Calculate the right dosage based on patient weight",
            "Printing: Resize documents proportionally for different paper sizes",
        ],
        npc: "Aling Maria",
        location: "Barangay Sari-Sari Store",
        reward: "15 coins + Scaling Expert Badge",
    },
    3: {
        id: "3",
        title: "Walking Distance",
        description:
            "Ben wants to know the shortest walking distance between two points on the barangay map. Use the distance formula to help him.",
        quizOverview:
            "This quiz focuses on radicals through the distance formula. You'll find straight-line distances on a coordinate grid by simplifying square roots.",
        realLifeTrivia: [
            "Navigation: GPS uses distance formulas to calculate shortest routes",
            "Sports: Runners measure diagonal distances for training routes",
            "Construction: Surveyors calculate land distances using coordinates",
            "Games: Video games use distance formulas for movement and collision",
        ],
        npc: "Ben",
        location: "Barangay Street",
        reward: "12 coins + Distance Solver Badge",
    },
    4: {
        id: "4",
        title: "Temperature Switch",
        description:
            "Ana needs to convert temperature readings for her science project. Show her how inverse functions connect Celsius and Fahrenheit.",
        quizOverview:
            "This quiz focuses on inverse functions through temperature conversion. You'll convert between Celsius and Fahrenheit using inverse formulas.",
        realLifeTrivia: [
            "Weather: Different countries use different temperature scales",
            "Cooking: Oven temperatures may be in Celsius or Fahrenheit",
            "Health: Body temperature readings need correct unit conversion",
            "Travel: Understanding temperature scales helps when visiting other countries",
        ],
        npc: "Ana",
        location: "Barangay School",
        reward: "18 coins + Conversion Master Badge",
    },
    5: {
        id: "5",
        title: "Garden Area",
        description:
            "Lola Rosa wants to find the side length of her square garden given its area. Teach her how square roots solve this.",
        quizOverview:
            "This quiz focuses on radicals by finding side lengths from area. You'll use square roots and cube roots to reverse area and volume formulas.",
        realLifeTrivia: [
            "Gardening: Find the side length of a plot when you know the total area",
            "Farming: Calculate fence lengths from field dimensions",
            "Construction: Determine material needs from area measurements",
            "Packaging: Find box dimensions from volume requirements",
        ],
        npc: "Lola Rosa",
        location: "Barangay Garden",
        reward: "20 coins + Root Expert Badge",
    },
    6: {
        id: "6",
        title: "Original Price",
        description:
            "Mang Pedro's store has a sale, but he forgot the original price. Use inverse percentage to find it.",
        quizOverview:
            "This quiz focuses on inverse functions through reverse percentage problems. You'll find the original amount before a discount or tax was applied.",
        realLifeTrivia: [
            "Shopping: Check if a sale price is really a good deal by finding the original price",
            "Business: Reverse-calculate costs from marked-up selling prices",
            "Taxes: Find pre-tax amounts from total bills",
            "Tips: Calculate the original meal cost from a final restaurant bill",
        ],
        npc: "Mang Pedro",
        location: "Barangay Store",
        reward: "25 coins + Price Detective Badge",
    },
    7: {
        id: "7",
        title: "Ladder Reach",
        description:
            "Kuya Noel needs to know how high a ladder reaches when leaned against a wall. Use the Pythagorean theorem.",
        quizOverview:
            "This quiz focuses on radicals through right-triangle problems. You'll find missing sides using the Pythagorean theorem and square roots.",
        realLifeTrivia: [
            "Construction: Ladder safety depends on correct height calculations",
            "Rescue: Firefighters calculate ladder reach using right triangles",
            "Home repair: Safely position ladders using the Pythagorean theorem",
            "Sports: Find the length of a ramp or slope using square roots",
        ],
        npc: "Kuya Noel",
        location: "Barangay Chapel",
        reward: "22 coins + Ladder Math Badge",
    },
    8: {
        id: "8",
        title: "Trip Time",
        description:
            "Teacher Cruz's class is planning a field trip. Help them use inverse functions to find travel time from distance and speed.",
        quizOverview:
            "This quiz focuses on inverse functions through the distance-rate-time formula. You'll solve for time, distance, or speed by rearranging the formula.",
        realLifeTrivia: [
            "Travel: Plan arrival times using distance and speed",
            "Logistics: Delivery companies calculate travel time for routes",
            "Sports: Find average speed from race distance and time",
            "Commuting: Estimate how long your trip will take",
        ],
        npc: "Teacher Cruz",
        location: "Barangay School",
        reward: "30 coins + Trip Planner Badge",
    },
    9: {
        id: "9",
        title: "Wire Length",
        description:
            "Danny needs to cut a diagonal brace wire for a gate. Use the Pythagorean theorem to find the exact length.",
        quizOverview:
            "This quiz focuses on radicals through diagonal measurement. You'll calculate diagonal lengths of rectangles and simplify radical answers.",
        realLifeTrivia: [
            "Construction: Diagonal braces make gates and fences stronger",
            "Electrical: Wire lengths are calculated using right triangles",
            "Crafts: Diagonal cuts need accurate measurements",
            "Engineering: Supports and trusses rely on diagonal measurements",
        ],
        npc: "Danny",
        location: "Barangay Home",
        reward: "28 coins + Wire Cutter Badge",
    },
    10: {
        id: "10",
        title: "Barangay Quiz Prep",
        description:
            "The barangay captain's daughter is organizing a quiz bee. Help her review radicals and inverse functions for the community.",
        quizOverview:
            "This mixed quiz reviews radicals and inverse functions from Level 1. You'll solve Pythagorean theorem, distance, scaling, and conversion problems.",
        realLifeTrivia: [
            "Community events: Math quiz bees build confidence in students",
            "Review: Mixing different problem types strengthens understanding",
            "Teamwork: Helping others learn math reinforces your own skills",
            "Progress: Completing this quiz prepares you for city-level tutoring",
        ],
        npc: "Barangay Captain's Daughter",
        location: "Barangay Hall",
        reward: "35 coins + Barangay Tutor Badge",
    },
};

export const cityMissionLocations: MissionLocation[] = [
    {
        x: 8,
        y: 6,
        name: "Simplify for the Exam",
        npc: "Carla",
        missionId: 11,
        percentX: 19, // Background-relative percentage X
        percentY: 46, // Background-relative percentage Y
    },
    {
        x: 21,
        y: 46,
        name: "Fare Formula",
        npc: "Mang Roy",
        missionId: 12,
        percentX: 59, // Background-relative percentage X
        percentY: 23, // Background-relative percentage Y
    },
    {
        x: 22,
        y: 10,
        name: "Building Shadow",
        npc: "Arki Maya",
        missionId: 13,
        percentX: 81, // Background-relative percentage X
        percentY: 23, // Background-relative percentage Y
    },
    {
        x: 10,
        y: 16,
        name: "Peso to Dollar",
        npc: "Student Leo",
        missionId: 14,
        percentX: 81, // Background-relative percentage X
        percentY: 46, // Background-relative percentage Y
    },
    {
        x: 18,
        y: 14,
        name: "Park Path",
        npc: "Gina",
        missionId: 15,
        percentX: 79, // Background-relative percentage X
        percentY: 67, // Background-relative percentage Y
    },
    {
        x: 5,
        y: 20,
        name: "Grade Reverse",
        npc: "Sir Tan",
        missionId: 16,
        percentX: 60, // Background-relative percentage X
        percentY: 90, // Background-relative percentage Y
    },
    {
        x: 20,
        y: 18,
        name: "Bus Route Map",
        npc: "Manager Ben",
        missionId: 17,
        percentX: 50, // Background-relative percentage X
        percentY: 78, // Background-relative percentage Y
    },
    {
        x: 12,
        y: 22,
        name: "Commission Check",
        npc: "Carlos",
        missionId: 18,
        percentX: 19, // Background-relative percentage X
        percentY: 89, // Background-relative percentage Y
    },
    {
        x: 25,
        y: 15,
        name: "Sports Complex",
        npc: "Coach Kim",
        missionId: 19,
        percentX: 27, // Background-relative percentage X
        percentY: 27, // Background-relative percentage Y
    },
    {
        x: 16,
        y: 12,
        name: "Citywide Exam Review",
        npc: "Principal Santos",
        missionId: 20,
        percentX: 50, // Background-relative percentage X
        percentY: 56, // Background-relative percentage Y
    },
];

export const cityCollectibleItems: CollectibleItemData[] = [
    {
        id: "city-coin-1",
        type: "coin",
        name: "Radicand Token",
        description: "A token stamped with the number under the radical",
        value: 10,
        points: 20,
        rarity: "common",
        percentX: 35,
        percentY: 37,
        icon: "💰",
    },
    {
        id: "city-coin-2",
        type: "coin",
        name: "Index Token",
        description: "A token honoring the small index of every root",
        value: 10,
        points: 20,
        rarity: "common",
        percentX: 35,
        percentY: 9,
        icon: "💰",
    },
    {
        id: "city-coin-3",
        type: "coin",
        name: "Surd Token",
        description: "A token for radicals that refuse to simplify neatly",
        value: 10,
        points: 20,
        rarity: "common",
        percentX: 59,
        percentY: 4,
        icon: "💰",
    },
    {
        id: "city-badge-1",
        type: "badge",
        name: "One-to-One Badge",
        description: "Earned only by functions that never repeat an output",
        value: 20,
        points: 40,
        rarity: "uncommon",
        percentX: 44,
        percentY: 4,
        icon: "🏅",
    },
    {
        id: "city-badge-2",
        type: "badge",
        name: "Conjugate Badge",
        description: "For masters of the conjugate that clears radicals",
        value: 20,
        points: 40,
        rarity: "uncommon",
        percentX: 5,
        percentY: 42,
        icon: "🏅",
    },
    {
        id: "city-treasure-1",
        type: "treasure",
        name: "Rationalize Crystal",
        description:
            "A legendary crystal that sweeps radicals out of denominators",
        value: 50,
        points: 100,
        rarity: "rare",
        percentX: 11,
        percentY: 67,
        icon: "💎",
    },
    {
        id: "city-powerup-1",
        type: "powerup",
        name: "Simplify Rush",
        description: "Speeds up radical simplification",
        value: 25,
        points: 50,
        rarity: "uncommon",
        percentX: 6,
        percentY: 94,
        icon: "⚡",
    },
    {
        id: "city-powerup-2",
        type: "powerup",
        name: "Conjugate Charge",
        description: "Charges your skill with conjugate pairs",
        value: 25,
        points: 50,
        rarity: "uncommon",
        percentX: 30,
        percentY: 95,
        icon: "⚡",
    },
    {
        id: "city-gem-1",
        type: "treasure",
        name: "Perfect Square Gem",
        description: "A rare gem cut from flawless perfect squares",
        value: 40,
        points: 80,
        rarity: "rare",
        percentX: 41,
        percentY: 82,
        icon: "💠",
    },
    {
        id: "city-gem-2",
        type: "treasure",
        name: "Golden Inverse Medal",
        description: "A prestigious medal for flawless inverse work",
        value: 35,
        points: 70,
        rarity: "rare",
        percentX: 87,
        percentY: 82,
        icon: "🎖️",
    },
];

export const cityMissionMetadata: Record<number, MissionMetadata> = {
    11: {
        id: "11",
        title: "Simplify for the Exam",
        description:
            "Carla has an exam on radicals tomorrow. Help her simplify radical expressions with confidence.",
        quizOverview:
            "This quiz focuses on simplifying radicals. You'll factor out perfect squares and write radical expressions in simplest form.",
        realLifeTrivia: [
            "Exams: Simplified radicals are easier to work with on timed tests",
            "Engineering: Exact radical answers are often preferred over decimal approximations",
            "Geometry: Simplified radicals appear in diagonal and distance calculations",
            "Higher math: Simplifying radicals is a foundation for calculus and physics",
        ],
        npc: "Carla",
        location: "City Public School",
        reward: "40 coins + Radical Simplifier Badge",
    },
    12: {
        id: "12",
        title: "Fare Formula",
        description:
            "Mang Roy needs to reverse his jeepney fare formula to find the distance traveled from the total fare.",
        quizOverview:
            "This quiz focuses on inverse functions through fare calculations. You'll rearrange a linear formula to solve for distance.",
        realLifeTrivia: [
            "Transportation: Passengers can check if they were charged correctly",
            "Budgeting: Estimate travel costs by reversing the fare formula",
            "Logistics: Companies reverse cost formulas to find distance or weight",
            "Math skills: Inverse operations undo the original calculation",
        ],
        npc: "Mang Roy",
        location: "City Terminal",
        reward: "45 coins + Fare Solver Badge",
    },
    13: {
        id: "13",
        title: "Building Shadow",
        description:
            "Arki Maya is studying how building height, shadow length, and sunlight distance form a right triangle. Use radicals to find the shadow length.",
        quizOverview:
            "This quiz focuses on radicals through right-triangle problems. You'll find missing sides using the Pythagorean theorem.",
        realLifeTrivia: [
            "Architecture: Shadow studies help design buildings that don't block sunlight",
            "Urban planning: Calculate spacing between tall buildings",
            "Astronomy: Similar triangles explain shadow lengths at different times of day",
            "Surveying: Right-triangle math measures inaccessible heights",
        ],
        npc: "Arki Maya",
        location: "City Plaza",
        reward: "50 coins + Shadow Math Badge",
    },
    14: {
        id: "14",
        title: "Peso to Dollar",
        description:
            "Student Leo sells items online to international buyers. Teach him how to convert pesos to dollars and back using inverse functions.",
        quizOverview:
            "This quiz focuses on inverse functions through currency conversion. You'll convert between pesos and dollars in both directions.",
        realLifeTrivia: [
            "Online selling: Accurate conversion prevents pricing mistakes",
            "Travel: Tourists convert money both ways during trips",
            "Business: Exporters need to quote prices in different currencies",
            "Math concept: Conversion formulas are inverse functions of each other",
        ],
        npc: "Student Leo",
        location: "City Internet Café",
        reward: "55 coins + Currency Converter Badge",
    },
    15: {
        id: "15",
        title: "Park Path",
        description:
            "Gina wants to know the diagonal shortcut across a rectangular city park. Use the distance formula to help her.",
        quizOverview:
            "This quiz focuses on radicals through the distance formula. You'll find diagonal distances on a coordinate grid.",
        realLifeTrivia: [
            "Walking: Diagonal shortcuts save time in parks and campuses",
            "City design: Pathways often follow shortest-distance routes",
            "Navigation: GPS calculates straight-line and route distances",
            "Geometry: The distance formula is an application of the Pythagorean theorem",
        ],
        npc: "Gina",
        location: "City Park",
        reward: "60 coins + Park Path Badge",
    },
    16: {
        id: "16",
        title: "Grade Reverse",
        description:
            "Sir Tan uses a curve formula to adjust test scores. Help a student find the raw score from the final grade using the inverse.",
        quizOverview:
            "This quiz focuses on inverse functions through grading formulas. You'll rearrange a linear equation to find the original input.",
        realLifeTrivia: [
            "Education: Students can estimate raw scores from curved grades",
            "Testing: Standardized tests convert raw scores to scaled scores",
            "Fairness: Inverse formulas ensure grading transparency",
            "Math skills: Undoing a formula requires inverse operations",
        ],
        npc: "Sir Tan",
        location: "City High School",
        reward: "50 coins + Grade Detective Badge",
    },
    17: {
        id: "17",
        title: "Bus Route Map",
        description:
            "Manager Ben needs the straight-line distance between two bus stops on the city grid. Use the distance formula.",
        quizOverview:
            "This quiz focuses on radicals through coordinate geometry. You'll calculate distances between points on a map.",
        realLifeTrivia: [
            "Transportation: Route planning uses distance and coordinate data",
            "Logistics: Delivery routes optimize distance and time",
            "Urban maps: Bus stops are placed using spacing calculations",
            "Math connection: Coordinate distance uses square roots",
        ],
        npc: "Manager Ben",
        location: "City Bus Stop",
        reward: "65 coins + Route Mapper Badge",
    },
    18: {
        id: "18",
        title: "Commission Check",
        description:
            "Carlos earned a sales commission and wants to find his total sales. Use the inverse percentage formula.",
        quizOverview:
            "This quiz focuses on inverse functions through commission problems. You'll find total sales from a commission amount and rate.",
        realLifeTrivia: [
            "Sales: Agents verify their targets from commission payments",
            "Business: Reverse percentages find original revenue",
            "Finance: Tax and tip problems use inverse percentage thinking",
            "Math concept: Commission = rate × sales, so sales = commission ÷ rate",
        ],
        npc: "Carlos",
        location: "City Mall",
        reward: "70 coins + Commission Pro Badge",
    },
    19: {
        id: "19",
        title: "Sports Complex",
        description:
            "Coach Kim is designing a new badminton court and needs the diagonal measurement. Use the Pythagorean theorem.",
        quizOverview:
            "This quiz focuses on radicals through sports court dimensions. You'll find diagonals of rectangular playing areas.",
        realLifeTrivia: [
            "Sports design: Court dimensions must meet official standards",
            "Construction: Diagonal braces keep courts and structures stable",
            "Geometry: Right triangles appear in many sports fields",
            "Precision: Exact radical answers help in construction planning",
        ],
        npc: "Coach Kim",
        location: "City Sports Complex",
        reward: "60 coins + Sports Math Badge",
    },
    20: {
        id: "20",
        title: "Citywide Exam Review",
        description:
            "Principal Santos wants you to lead a review session for the citywide exam. Test students on radicals and inverse functions.",
        quizOverview:
            "This mixed quiz reviews radicals and inverse functions from Level 2. You'll simplify radicals, reverse formulas, and find distances.",
        realLifeTrivia: [
            "Education: Review sessions help students retain skills",
            "Standardized tests: Radicals and inverse functions appear on many exams",
            "Tutoring: Mixed practice prepares students for surprise questions",
            "Progress: Passing this review unlocks provincial-level tutoring",
        ],
        npc: "Principal Santos",
        location: "City School",
        reward: "80 coins + City Tutor Badge",
    },
};

export const provinceMissionLocations: MissionLocation[] = [
    {
        x: 8,
        y: 6,
        name: "Scholarship Qualifier",
        npc: "Sarah",
        missionId: 21,
        percentX: 19,
        percentY: 46,
    },
    {
        x: 21,
        y: 46,
        name: "Farm Plot Diagonal",
        npc: "Mang Tomas",
        missionId: 22,
        percentX: 59,
        percentY: 23,
    },
    {
        x: 22,
        y: 10,
        name: "Fertilizer Mix",
        npc: "Ate Liza",
        missionId: 23,
        percentX: 81,
        percentY: 23,
    },
    {
        x: 10,
        y: 16,
        name: "Irrigation Pipe",
        npc: "Engineer Pat",
        missionId: 24,
        percentX: 81,
        percentY: 46,
    },
    {
        x: 18,
        y: 14,
        name: "Budget Scaling",
        npc: "Budget Officer Amy",
        missionId: 25,
        percentX: 79,
        percentY: 67,
    },
    {
        x: 5,
        y: 20,
        name: "Dosage Formula",
        npc: "Nurse Joy",
        missionId: 26,
        percentX: 60,
        percentY: 90,
    },
    {
        x: 20,
        y: 18,
        name: "Road Slope",
        npc: "Foreman Bob",
        missionId: 27,
        percentX: 50,
        percentY: 78,
    },
    {
        x: 12,
        y: 22,
        name: "Yield Reverse",
        npc: "Ma'am Elena",
        missionId: 28,
        percentX: 19,
        percentY: 89,
    },
    {
        x: 25,
        y: 15,
        name: "Water Tank Volume",
        npc: "Sir Dan",
        missionId: 29,
        percentX: 27,
        percentY: 27,
    },
    {
        x: 16,
        y: 12,
        name: "Provincial Scholarship Final",
        npc: "Governor's Aide",
        missionId: 30,
        percentX: 50,
        percentY: 56,
    },
];

export const provinceCollectibleItems: CollectibleItemData[] = [
    {
        id: "province-coin-1",
        type: "coin",
        name: "Principal Root Token",
        description: "A token for the positive principal root everyone trusts",
        value: 10,
        points: 20,
        rarity: "common",
        percentX: 35,
        percentY: 37,
        icon: "💰",
    },
    {
        id: "province-coin-2",
        type: "coin",
        name: "Nth Root Token",
        description: "A token for roots beyond the square",
        value: 15,
        points: 25,
        rarity: "common",
        percentX: 35,
        percentY: 9,
        icon: "💰",
    },
    {
        id: "province-coin-3",
        type: "coin",
        name: "Cube Root Token",
        description: "A token carved for perfect cube roots",
        value: 15,
        points: 25,
        rarity: "common",
        percentX: 59,
        percentY: 4,
        icon: "💰",
    },
    {
        id: "province-badge-1",
        type: "badge",
        name: "Radical Simplifier Badge",
        description: "A badge for taming messy radical expressions",
        value: 25,
        points: 50,
        rarity: "uncommon",
        percentX: 44,
        percentY: 4,
        icon: "🏅",
    },
    {
        id: "province-badge-2",
        type: "badge",
        name: "Domain Swap Badge",
        description: "For swapping domain and range like a true inverse pro",
        value: 25,
        points: 50,
        rarity: "uncommon",
        percentX: 5,
        percentY: 42,
        icon: "🏅",
    },
    {
        id: "province-treasure-1",
        type: "treasure",
        name: "Range Mirror Crystal",
        description: "A legendary crystal that mirrors outputs back to inputs",
        value: 60,
        points: 120,
        rarity: "rare",
        percentX: 11,
        percentY: 67,
        icon: "💎",
    },
    {
        id: "province-powerup-1",
        type: "powerup",
        name: "Extraction Surge",
        description: "Pulls perfect roots out of any expression in a flash",
        value: 30,
        points: 60,
        rarity: "uncommon",
        percentX: 6,
        percentY: 94,
        icon: "⚡",
    },
    {
        id: "province-powerup-2",
        type: "powerup",
        name: "Reverse Surge",
        description: "Reverses any function back to its input instantly",
        value: 30,
        points: 60,
        rarity: "uncommon",
        percentX: 30,
        percentY: 95,
        icon: "⚡",
    },
    {
        id: "province-gem-1",
        type: "treasure",
        name: "Rationalizing Gem",
        description: "A rare gem that clears radicals from the bottom lines",
        value: 50,
        points: 100,
        rarity: "rare",
        percentX: 41,
        percentY: 82,
        icon: "💠",
    },
    {
        id: "province-gem-2",
        type: "treasure",
        name: "Provincial Root Medal",
        description: "A prestigious medal for provincial root mastery",
        value: 45,
        points: 90,
        rarity: "rare",
        percentX: 87,
        percentY: 82,
        icon: "🎖️",
    },
];

export const provinceMissionMetadata: Record<number, MissionMetadata> = {
    21: {
        id: "21",
        title: "Scholarship Qualifier",
        description:
            "Help Sarah practice solving radical equations so she can pass the provincial scholarship qualifying exam.",
        quizOverview:
            "Solve basic radical equations by isolating the radical and squaring both sides. Always check for extraneous solutions.",
        realLifeTrivia: [
            "Scholarship exams often include radical equations to test algebra fluency.",
            "Isolating the radical first prevents errors when squaring both sides.",
            "Checking answers prevents extraneous solutions from wrong answers.",
            "Radical equations appear in physics formulas like kinetic energy and pendulum period.",
        ],
        npc: "Sarah",
        location: "Provincial Capitol",
        reward: "70 coins + Scholar Tutor Badge",
    },
    22: {
        id: "22",
        title: "Farm Plot Diagonal",
        description:
            "Mang Tomas wants to find the shortest path across his rectangular rice field using the distance formula.",
        quizOverview:
            "Apply the Pythagorean theorem and distance formula to find diagonals of rectangular farm plots.",
        realLifeTrivia: [
            "Farmers use diagonal measurements to plan irrigation and fencing.",
            "The distance formula is a direct application of square roots.",
            "A right triangle's hypotenuse is always the longest side.",
            "Square roots turn squared lengths back into real lengths.",
        ],
        npc: "Mang Tomas",
        location: "Provincial Farm",
        reward: "75 coins + Farm Math Badge",
    },
    23: {
        id: "23",
        title: "Fertilizer Mix",
        description:
            "Ate Liza needs to reverse the concentration formula to find how much fertilizer was actually used.",
        quizOverview:
            "Use inverse functions to undo a concentration formula and find an original amount.",
        realLifeTrivia: [
            "Concentration = amount / volume, so amount = concentration x volume.",
            "Inverse operations help reconstruct missing quantities.",
            "Agriculturists use these calculations for fertilizer and pesticide mixing.",
            "Inverse functions undo the effect of the original formula.",
        ],
        npc: "Ate Liza",
        location: "Provincial Agriculture Office",
        reward: "80 coins + Agri Math Badge",
    },
    24: {
        id: "24",
        title: "Irrigation Pipe",
        description:
            "Engineer Pat needs the exact length of a pipe running diagonally under a field.",
        quizOverview:
            "Use radicals and the Pythagorean theorem to calculate diagonal pipe lengths.",
        realLifeTrivia: [
            "Underground pipes often follow diagonal routes to avoid obstacles.",
            "Square roots convert horizontal and vertical distances into true lengths.",
            "Engineers use these calculations for cost estimates and material orders.",
            "The Pythagorean theorem works in both 2D and 3D space.",
        ],
        npc: "Engineer Pat",
        location: "Irrigation Site",
        reward: "85 coins + Infrastructure Badge",
    },
    25: {
        id: "25",
        title: "Budget Scaling",
        description:
            "Budget Officer Amy must reverse a budget allocation to find the original total fund.",
        quizOverview:
            "Apply inverse proportion and scaling to recover original amounts from allocated budgets.",
        realLifeTrivia: [
            "If allocation = percentage x total, then total = allocation / percentage.",
            "Inverse scaling recovers original values from scaled results.",
            "Budget officers use this to verify fund sources.",
            "Reverse percentage problems are common in finance.",
        ],
        npc: "Budget Officer Amy",
        location: "Provincial Capitol",
        reward: "75 coins + Budget Whiz Badge",
    },
    26: {
        id: "26",
        title: "Dosage Formula",
        description:
            "Nurse Joy needs to find a patient's weight from the prescribed dosage using the inverse dosage formula.",
        quizOverview:
            "Use inverse functions to reverse a medicine dosage formula and find patient weight.",
        realLifeTrivia: [
            "Dosage formulas depend on patient weight.",
            "Inverse formulas let healthcare workers verify correct prescriptions.",
            "Medicine safety relies on accurate reverse calculations.",
            "Inverse functions undo the original dosage relationship.",
        ],
        npc: "Nurse Joy",
        location: "Provincial Health Office",
        reward: "80 coins + Health Math Badge",
    },
    27: {
        id: "27",
        title: "Road Slope",
        description:
            "Foreman Bob needs the actual slope distance of a hilly provincial road.",
        quizOverview:
            "Apply the Pythagorean theorem with elevation to find true road length using radicals.",
        realLifeTrivia: [
            "Roads that go up hills are longer than their flat map distance.",
            "Slope distance = sqrt(horizontal^2 + vertical^2).",
            "DPWH engineers use this for road construction estimates.",
            "Square roots connect flat maps to real terrain.",
        ],
        npc: "Foreman Bob",
        location: "Provincial Road",
        reward: "75 coins + Road Builder Badge",
    },
    28: {
        id: "28",
        title: "Yield Reverse",
        description:
            "Ma'am Elena wants to know how much area to plant to reach a target harvest.",
        quizOverview:
            "Use the inverse of a yield formula to find the required planted area.",
        realLifeTrivia: [
            "Yield = harvest / area, so area = harvest / yield.",
            "Agronomists plan planting areas using inverse calculations.",
            "Reverse formulas help farmers meet production targets.",
            "Inverse functions swap input and output quantities.",
        ],
        npc: "Ma'am Elena",
        location: "Provincial Agriculture Field",
        reward: "85 coins + Yield Planner Badge",
    },
    29: {
        id: "29",
        title: "Water Tank Volume",
        description:
            "Sir Dan needs the side length of a cubic water tank given its volume.",
        quizOverview:
            "Use cube roots and radicals to find dimensions from a given volume.",
        realLifeTrivia: [
            "Volume of a cube = side^3, so side = cube root of volume.",
            "Cube roots are radicals with index 3.",
            "Water tank design uses these calculations.",
            "Radicals with different indices appear in many engineering formulas.",
        ],
        npc: "Sir Dan",
        location: "Provincial Water Site",
        reward: "80 coins + Water Works Badge",
    },
    30: {
        id: "30",
        title: "Provincial Scholarship Final",
        description:
            "Help the governor's aide prepare a full review for the provincial scholarship exam.",
        quizOverview:
            "Mixed review of radicals and inverse functions at the provincial scholarship level.",
        realLifeTrivia: [
            "Scholarship finals combine multiple algebra skills.",
            "Radicals and inverse functions often appear together in advanced exams.",
            "Reviewing both topics strengthens problem-solving flexibility.",
            "Passing this exam unlocks the regional competition level.",
        ],
        npc: "Governor's Aide",
        location: "Provincial Capitol",
        reward: "90 coins + Provincial Scholar Badge",
    },
};

export const regionMissionLocations: MissionLocation[] = [
    {
        x: 8,
        y: 6,
        name: "Regional Qualifier",
        npc: "Marco",
        missionId: 31,
        percentX: 19,
        percentY: 46,
    },
    {
        x: 21,
        y: 46,
        name: "Signal Decay",
        npc: "Engineer Ray",
        missionId: 32,
        percentX: 59,
        percentY: 23,
    },
    {
        x: 22,
        y: 10,
        name: "Coordinate Challenge",
        npc: "Clara",
        missionId: 33,
        percentX: 81,
        percentY: 23,
    },
    {
        x: 10,
        y: 16,
        name: "Altitude Temperature",
        npc: "Scientist May",
        missionId: 34,
        percentX: 81,
        percentY: 46,
    },
    {
        x: 18,
        y: 14,
        name: "Polynomial Roots",
        npc: "Sir Nico",
        missionId: 35,
        percentX: 79,
        percentY: 67,
    },
    {
        x: 5,
        y: 20,
        name: "Cipher Decode",
        npc: "Kuya Jay",
        missionId: 36,
        percentX: 60,
        percentY: 90,
    },
    {
        x: 20,
        y: 18,
        name: "Projectile Height",
        npc: "Student Alex",
        missionId: 37,
        percentX: 50,
        percentY: 78,
    },
    {
        x: 12,
        y: 22,
        name: "Investment Return",
        npc: "Ms. Gina",
        missionId: 38,
        percentX: 19,
        percentY: 89,
    },
    {
        x: 25,
        y: 15,
        name: "Rationalize It",
        npc: "Ma'am Tina",
        missionId: 39,
        percentX: 27,
        percentY: 27,
    },
    {
        x: 16,
        y: 12,
        name: "Regional Math Competition",
        npc: "Regional Coordinator",
        missionId: 40,
        percentX: 50,
        percentY: 56,
    },
];

export const regionCollectibleItems: CollectibleItemData[] = [
    {
        id: "region-coin-1",
        type: "coin",
        name: "Radical Equation Token",
        description: "A token for solving radical equations step by step",
        value: 10,
        points: 20,
        rarity: "common",
        percentX: 35,
        percentY: 37,
        icon: "💰",
    },
    {
        id: "region-coin-2",
        type: "coin",
        name: "Inequality Token",
        description: "A token for radicals balanced inside inequalities",
        value: 10,
        points: 20,
        rarity: "common",
        percentX: 35,
        percentY: 9,
        icon: "💰",
    },
    {
        id: "region-coin-3",
        type: "coin",
        name: "Variable Root Token",
        description: "A token for rooting out variable answers",
        value: 10,
        points: 20,
        rarity: "common",
        percentX: 59,
        percentY: 4,
        icon: "💰",
    },
    {
        id: "region-badge-1",
        type: "badge",
        name: "Radical Mastery Badge",
        description: "A badge for conquering the toughest radicals",
        value: 30,
        points: 60,
        rarity: "uncommon",
        percentX: 44,
        percentY: 4,
        icon: "🏅",
    },
    {
        id: "region-badge-2",
        type: "badge",
        name: "Inverse Pro Badge",
        description: "A badge for pros who invert functions with ease",
        value: 30,
        points: 60,
        rarity: "uncommon",
        percentX: 5,
        percentY: 42,
        icon: "🏅",
    },
    {
        id: "region-treasure-1",
        type: "treasure",
        name: "Nested Radical Crystal",
        description: "A legendary crystal hiding roots within roots",
        value: 70,
        points: 140,
        rarity: "rare",
        percentX: 11,
        percentY: 67,
        icon: "💎",
    },
    {
        id: "region-powerup-1",
        type: "powerup",
        name: "Root Breakthrough",
        description: "Breaks through even the trickiest radicands",
        value: 25,
        points: 50,
        rarity: "uncommon",
        percentX: 6,
        percentY: 94,
        icon: "⚡",
    },
    {
        id: "region-powerup-2",
        type: "powerup",
        name: "Inverse Insight",
        description: "Sharpens your eye for reversible functions",
        value: 25,
        points: 50,
        rarity: "uncommon",
        percentX: 30,
        percentY: 95,
        icon: "⚡",
    },
    {
        id: "region-gem-1",
        type: "treasure",
        name: "Nested Root Gem",
        description: "A rare gem glowing from radicals inside radicals",
        value: 60,
        points: 120,
        rarity: "rare",
        percentX: 41,
        percentY: 82,
        icon: "💠",
    },
    {
        id: "region-gem-2",
        type: "treasure",
        name: "Regional Roots Medal",
        description: "A prestigious medal for regional root champions",
        value: 55,
        points: 110,
        rarity: "rare",
        percentX: 87,
        percentY: 82,
        icon: "🎖️",
    },
];

export const regionMissionMetadata: Record<number, MissionMetadata> = {
    31: {
        id: "31",
        title: "Regional Qualifier",
        description:
            "Coach Marco through advanced radical equations with variables on both sides for the regional qualifier.",
        quizOverview:
            "Solve radical equations where variables appear on both sides. Isolate radicals and square both sides, checking for extraneous solutions.",
        realLifeTrivia: [
            "Regional competitions include harder radical equations.",
            "Variables on both sides require careful isolation.",
            "Squaring both sides can introduce extraneous answers.",
            "Always substitute back to verify.",
        ],
        npc: "Marco",
        location: "Regional DepEd Office",
        reward: "70 coins + Regional Qualifier Badge",
    },
    32: {
        id: "32",
        title: "Signal Decay",
        description:
            "Engineer Ray needs to find the distance from a signal source given its decay formula involving a square root.",
        quizOverview:
            "Apply radical formulas from physics. Solve for distance when signal strength depends on the square root of distance.",
        realLifeTrivia: [
            "Signal strength often decreases with distance.",
            "Square root relationships appear in physics formulas.",
            "DOST engineers use these calculations.",
            "Isolate the radical, then square both sides.",
        ],
        npc: "Engineer Ray",
        location: "Regional DOST Office",
        reward: "75 coins + Signal Solver Badge",
    },
    33: {
        id: "33",
        title: "Coordinate Challenge",
        description:
            "Mathlete Clara practices finding distances between multiple points on the coordinate plane.",
        quizOverview:
            "Use the distance formula, which is based on square roots, to find distances between points.",
        realLifeTrivia: [
            "The distance formula is the Pythagorean theorem in disguise.",
            "Square roots convert coordinate differences into true distances.",
            "Regional mathletes use this in geometry rounds.",
            "Calculate Δx and Δy first, then apply the formula.",
        ],
        npc: "Clara",
        location: "Regional STEM Center",
        reward: "80 coins + Coordinate Master Badge",
    },
    34: {
        id: "34",
        title: "Altitude Temperature",
        description:
            "Scientist May uses an inverse linear relationship between altitude and temperature to predict conditions.",
        quizOverview:
            "Apply inverse functions to convert altitude to temperature and vice versa using a scientific formula.",
        realLifeTrivia: [
            "Temperature generally decreases as altitude increases.",
            "Inverse formulas let you find altitude from temperature.",
            "PAGASA uses these relationships for weather forecasting.",
            "Inverse functions swap the input and output variables.",
        ],
        npc: "Scientist May",
        location: "Regional PAGASA Station",
        reward: "85 coins + Weather Math Badge",
    },
    35: {
        id: "35",
        title: "Polynomial Roots",
        description:
            "Coach Sir Nico reviews finding roots of quadratics using the quadratic formula, which always involves radicals.",
        quizOverview:
            "Use the quadratic formula to solve quadratic equations. Results often include square roots.",
        realLifeTrivia: [
            "The quadratic formula gives exact roots of any quadratic.",
            "The discriminant under the radical determines root type.",
            "Radicals appear naturally in quadratic solutions.",
            "This skill is essential for higher-level competitions.",
        ],
        npc: "Sir Nico",
        location: "Regional Training Room",
        reward: "90 coins + Quadratic Roots Badge",
    },
    36: {
        id: "36",
        title: "Cipher Decode",
        description:
            "Kuya Jay's tech club uses inverse operations to decode a simple cipher message.",
        quizOverview:
            "Apply inverse operations to undo encoding steps and decode a cipher.",
        realLifeTrivia: [
            "Ciphers often use operations that can be reversed.",
            "Inverse operations undo each other.",
            "Tech clubs use simple ciphers to learn about cybersecurity.",
            "Decoding is an application of inverse functions.",
        ],
        npc: "Kuya Jay",
        location: "Regional Tech Hub",
        reward: "95 coins + Cipher Decoder Badge",
    },
    37: {
        id: "37",
        title: "Projectile Height",
        description:
            "Student Alex wants to know when a projectile hits the ground using the quadratic formula.",
        quizOverview:
            "Set a height equation equal to zero and use the quadratic formula to find the time. Radicals appear in the solution.",
        realLifeTrivia: [
            "Projectile motion is modeled by quadratic equations.",
            "The quadratic formula finds when height equals zero.",
            "Physics aspirants use this in olympiad preparation.",
            "Square roots give exact landing times.",
        ],
        npc: "Student Alex",
        location: "Regional Science Lab",
        reward: "100 coins + Physics Math Badge",
    },
    38: {
        id: "38",
        title: "Investment Return",
        description:
            "Finance coach Ms. Gina teaches how to find the principal investment given the final amount and interest rate.",
        quizOverview:
            "Use inverse compound interest formulas to recover the original principal from a final amount.",
        realLifeTrivia: [
            "Compound interest grows money exponentially.",
            "Inverse formulas help find the original investment.",
            "NEDA uses similar calculations for economic planning.",
            "Divide by the growth factor to reverse interest.",
        ],
        npc: "Ms. Gina",
        location: "Regional NEDA Office",
        reward: "105 coins + Finance Reverse Badge",
    },
    39: {
        id: "39",
        title: "Rationalize It",
        description:
            "Math coach Ma'am Tina focuses on rationalizing denominators that contain radicals.",
        quizOverview:
            "Rationalize denominators by multiplying by the conjugate or by the radical itself. Simplify the result.",
        realLifeTrivia: [
            "Rationalized denominators are standard form in math.",
            "Multiply by a clever form of 1 to eliminate the radical.",
            "Conjugates help rationalize binomial denominators.",
            "This skill is common in competition problems.",
        ],
        npc: "Ma'am Tina",
        location: "Regional Training Center",
        reward: "110 coins + Rationalizer Badge",
    },
    40: {
        id: "40",
        title: "Regional Math Competition",
        description:
            "Help the Regional Coordinator prepare a final mixed review for the regional math competition.",
        quizOverview:
            "Mixed review of radicals and inverse functions at the regional competition level.",
        realLifeTrivia: [
            "Regional competitions combine multiple algebra skills.",
            "Radicals and inverse functions appear in many rounds.",
            "Speed and accuracy both matter in competitions.",
            "Passing this unlocks the national olympiad level.",
        ],
        npc: "Regional Coordinator",
        location: "Regional Competition Hall",
        reward: "115 coins + Regional Champion Badge",
    },
};

export const nationalMissionLocations: MissionLocation[] = [
    {
        x: 8,
        y: 6,
        name: "Olympiad Radical Equations",
        npc: "Sofia",
        missionId: 41,
        percentX: 19,
        percentY: 46,
    },
    {
        x: 21,
        y: 46,
        name: "Inverse of Quadratics",
        npc: "Sir Andre",
        missionId: 42,
        percentX: 59,
        percentY: 23,
    },
    {
        x: 22,
        y: 10,
        name: "Inverse of Rationals",
        npc: "Ms. Karen",
        missionId: 43,
        percentX: 81,
        percentY: 23,
    },
    {
        x: 10,
        y: 16,
        name: "Radical Inequalities",
        npc: "Enzo",
        missionId: 44,
        percentX: 81,
        percentY: 46,
    },
    {
        x: 18,
        y: 14,
        name: "Function Composition",
        npc: "Dr. Lee",
        missionId: 45,
        percentX: 79,
        percentY: 67,
    },
    {
        x: 5,
        y: 20,
        name: "Physics Formula",
        npc: "PAGASA Researcher",
        missionId: 46,
        percentX: 60,
        percentY: 90,
    },
    {
        x: 20,
        y: 18,
        name: "Inverse in Coordinates",
        npc: "Liam",
        missionId: 47,
        percentX: 50,
        percentY: 78,
    },
    {
        x: 12,
        y: 22,
        name: "Advanced Radical Simplification",
        npc: "Ma'am Cruz",
        missionId: 48,
        percentX: 19,
        percentY: 89,
    },
    {
        x: 25,
        y: 15,
        name: "Inverse in Sequences",
        npc: "Mr. Santos",
        missionId: 49,
        percentX: 27,
        percentY: 27,
    },
    {
        x: 16,
        y: 12,
        name: "Philippine Math Olympiad Final",
        npc: "DepEd Secretary",
        missionId: 50,
        percentX: 50,
        percentY: 56,
    },
];

export const nationalCollectibleItems: CollectibleItemData[] = [
    {
        id: "national-coin-1",
        type: "coin",
        name: "Olympiad Root Coin",
        description: "A gold coin for olympiad-grade radical battles",
        value: 15,
        points: 30,
        rarity: "common",
        percentX: 35,
        percentY: 37,
        icon: "💰",
    },
    {
        id: "national-coin-2",
        type: "coin",
        name: "Olympiad Inverse Coin",
        description: "A gold coin for olympiad-grade inverse duels",
        value: 15,
        points: 30,
        rarity: "common",
        percentX: 35,
        percentY: 9,
        icon: "💰",
    },
    {
        id: "national-coin-3",
        type: "coin",
        name: "Champion Root Coin",
        description: "A champion coin for flawless root solving",
        value: 15,
        points: 30,
        rarity: "common",
        percentX: 59,
        percentY: 4,
        icon: "💰",
    },
    {
        id: "national-badge-1",
        type: "badge",
        name: "National Radical Badge",
        description: "A badge crowning the nation's radical champions",
        value: 40,
        points: 80,
        rarity: "uncommon",
        percentX: 44,
        percentY: 4,
        icon: "🏅",
    },
    {
        id: "national-badge-2",
        type: "badge",
        name: "National Inverse Badge",
        description: "A badge crowning the nation's inverse champions",
        value: 40,
        points: 80,
        rarity: "uncommon",
        percentX: 5,
        percentY: 42,
        icon: "🏅",
    },
    {
        id: "national-treasure-1",
        type: "treasure",
        name: "Function Composition Crystal",
        description: "A legendary crystal of composed-and-undone functions",
        value: 90,
        points: 180,
        rarity: "rare",
        percentX: 11,
        percentY: 67,
        icon: "💎",
    },
    {
        id: "national-powerup-1",
        type: "powerup",
        name: "Hyper Root Boost",
        description: "Unleashes supercharged radical speed",
        value: 35,
        points: 70,
        rarity: "uncommon",
        percentX: 6,
        percentY: 94,
        icon: "⚡",
    },
    {
        id: "national-powerup-2",
        type: "powerup",
        name: "Hyper Inverse Boost",
        description: "Unleashes supercharged inverse power",
        value: 35,
        points: 70,
        rarity: "uncommon",
        percentX: 30,
        percentY: 95,
        icon: "⚡",
    },
    {
        id: "national-gem-1",
        type: "treasure",
        name: "Radical Inequality Gem",
        description: "A rare gem forged in radical inequality duels",
        value: 80,
        points: 160,
        rarity: "rare",
        percentX: 41,
        percentY: 82,
        icon: "💠",
    },
    {
        id: "national-gem-2",
        type: "treasure",
        name: "Grand Olympiad Medal",
        description: "The grandest honor for the math olympiad's finest",
        value: 75,
        points: 150,
        rarity: "rare",
        percentX: 87,
        percentY: 82,
        icon: "🎖️",
    },
];

export const nationalMissionMetadata: Record<number, MissionMetadata> = {
    41: {
        id: "41",
        title: "Olympiad Radical Equations",
        description:
            "Coach Sofia through Olympiad-level radical equations involving multiple radicals and extraneous solutions.",
        quizOverview:
            "Solve multi-step radical equations by isolating radicals, squaring both sides, and checking every solution.",
        realLifeTrivia: [
            "Olympiad problems often require isolating radicals more than once.",
            "Each squaring can introduce extraneous solutions.",
            "Checking answers is essential in radical equations.",
            "These skills prepare students for international math competitions.",
        ],
        npc: "Sofia",
        location: "DepEd Central Office",
        reward: "120 coins + Olympiad Radical Badge",
    },
    42: {
        id: "42",
        title: "Inverse of Quadratics",
        description:
            "Sir Andre asks you to find and verify the inverse of a quadratic function by restricting its domain.",
        quizOverview:
            "Find the inverse of a quadratic function. Remember to restrict the domain so the inverse is a function.",
        realLifeTrivia: [
            "Quadratic functions are not one-to-one unless the domain is restricted.",
            "Inverse functions swap x and y values.",
            "Parabolas that open up or down need domain restrictions.",
            "This concept is used in physics and engineering.",
        ],
        npc: "Sir Andre",
        location: "DOST-SEI Building",
        reward: "125 coins + Inverse Quadratic Badge",
    },
    43: {
        id: "43",
        title: "Inverse of Rationals",
        description:
            "Ms. Karen teaches how to find the inverse of a rational function and verify the result.",
        quizOverview:
            "Find the inverse of a rational function, then check that f(f⁻¹(x)) = x.",
        realLifeTrivia: [
            "Rational functions have inverses when they are one-to-one.",
            "Finding the inverse may require solving another rational equation.",
            "Verification using composition prevents errors.",
            "Inverse rational functions appear in economics and science.",
        ],
        npc: "Ms. Karen",
        location: "CHED Central Office",
        reward: "130 coins + Inverse Rational Badge",
    },
    44: {
        id: "44",
        title: "Radical Inequalities",
        description:
            "Enzo needs to solve real-world inequalities involving radicals for a national planning problem.",
        quizOverview:
            "Solve inequalities with radicals. Determine the domain first, then solve and test intervals.",
        realLifeTrivia: [
            "Radical inequalities require considering the domain of the radical.",
            "Test values in intervals to find the solution set.",
            "These appear in optimization and constraint problems.",
            "Graphing helps visualize the solution.",
        ],
        npc: "Enzo",
        location: "NEDA Building",
        reward: "135 coins + Radical Inequality Badge",
    },
    45: {
        id: "45",
        title: "Function Composition",
        description:
            "Dr. Lee wants you to verify if two functions are inverses using composition.",
        quizOverview:
            "Use function composition to check whether f(g(x)) = x and g(f(x)) = x.",
        realLifeTrivia: [
            "Two functions are inverses if both compositions equal x.",
            "Composition applies one function after another.",
            "This is the most reliable way to verify inverse functions.",
            "Inverse functions undo each other's effects.",
        ],
        npc: "Dr. Lee",
        location: "National Academy of Science",
        reward: "140 coins + Composition Verify Badge",
    },
    46: {
        id: "46",
        title: "Physics Formula",
        description:
            "A PAGASA researcher needs to solve a physics formula involving a square root for an unknown variable.",
        quizOverview:
            "Isolate a radical variable in a physics formula and solve for the unknown.",
        realLifeTrivia: [
            "Physics formulas often contain square roots.",
            "Isolating the radical is the first step to solving.",
            "PAGASA uses formulas involving roots and powers.",
            "Accurate algebra prevents forecasting errors.",
        ],
        npc: "PAGASA Researcher",
        location: "PAGASA Science Garden",
        reward: "145 coins + Physics Algebra Badge",
    },
    47: {
        id: "47",
        title: "Inverse in Coordinates",
        description:
            "Liam practices inverse relations in coordinate geometry for the Olympiad training camp.",
        quizOverview:
            "Apply inverse relationships to coordinate geometry problems, such as swapping coordinates and interpreting reflections.",
        realLifeTrivia: [
            "The inverse of a relation swaps x and y coordinates.",
            "Graphically, inverses reflect across the line y = x.",
            "Coordinate geometry connects algebra and visuals.",
            "Olympiad problems often combine multiple concepts.",
        ],
        npc: "Liam",
        location: "PSA Complex",
        reward: "150 coins + Coordinate Inverse Badge",
    },
    48: {
        id: "48",
        title: "Advanced Radical Simplification",
        description:
            "Ma'am Cruz challenges you to simplify complex nested radical expressions.",
        quizOverview:
            "Simplify advanced radical expressions including nested radicals. Factor out perfect powers and combine like radicals.",
        realLifeTrivia: [
            "Nested radicals contain radicals inside other radicals.",
            "Simplification requires finding perfect power factors.",
            "Advanced simplification is common in Olympiad problems.",
            "Patience and careful factoring are key.",
        ],
        npc: "Ma'am Cruz",
        location: "DepEd Central Office",
        reward: "155 coins + Nested Radical Badge",
    },
    49: {
        id: "49",
        title: "Inverse in Sequences",
        description:
            "Mr. Santos needs to find the term position from a sequence value using the inverse of the sequence rule.",
        quizOverview:
            "Use the inverse of an arithmetic or geometric sequence rule to find the term number for a given value.",
        realLifeTrivia: [
            "Sequences have rules that can be inverted.",
            "Finding term position is like asking 'which term?'",
            "Statisticians use inverse sequence calculations.",
            "This combines sequences with inverse functions.",
        ],
        npc: "Mr. Santos",
        location: "PSA Complex",
        reward: "160 coins + Sequence Inverse Badge",
    },
    50: {
        id: "50",
        title: "Philippine Math Olympiad Final",
        description:
            "The DepEd Secretary presents the final challenge: a mixed mastery review of radicals and inverse functions at Olympiad level.",
        quizOverview:
            "Final mixed review of radicals and inverse functions. Demonstrate mastery to complete the tutoring journey.",
        realLifeTrivia: [
            "The Philippine Math Olympiad is the country's top math competition.",
            "Mastery of radicals and inverse functions is essential for advanced math.",
            "Your tutoring has helped students reach the national level.",
            "This final mission celebrates your journey from tutor to Olympiad mentor.",
        ],
        npc: "DepEd Secretary",
        location: "Philippine International Convention Center",
        reward: "165 coins + Olympiad Mentor Badge",
    },
};
