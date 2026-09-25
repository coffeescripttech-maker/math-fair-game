// Generates the four per-level asset-prompt docs (City/Province/Region/National),
// mirroring the structure of barangay-assets-prompts.md.
// Pure Node, no dependencies. Run: node scripts/generate-level-assets-prompts.mjs

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ────────────────────────────────────────────────────────────────────────────
// Shared NPC prompt boilerplate (mirrors the barangay doc's style contract)
// ────────────────────────────────────────────────────────────────────────────
function npcPrompt({ pronoun, role, appearance, props, think, not, face }) {
  return `Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

${appearance}

CRITICAL — UNIQUE FACE (do not skip):
${face}

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing MathTuto student sprites.

Use the same polished retro pixel-art aesthetic:
- crisp 16-bit / 32-bit-inspired pixel art
- clearly defined pixel clusters
- hard pixel edges
- dark pixel outlines
- limited but vibrant color palette
- simple cel-style pixel shading
- subtle highlights and shadows
- clean readable shapes
- cute slightly chibi proportions
- expressive but simple pixel face

Do NOT use smooth vector illustration.
Do NOT use painterly rendering.
Do NOT use realistic anatomy.
Do NOT use smooth gradients.
Do NOT use anti-aliased edges.
Do NOT make the character look like a generic modern cartoon.

MATCH THE STUDENT SPRITE LANGUAGE:

Keep the same overall:
- pixel density
- outline thickness
- head-to-body proportion
- facial construction
- eye style
- shading technique
- color treatment
- simplified clothing detail
- overall sprite scale

The NPC should look like ${pronoun} was created by the SAME artist for the
SAME MathTuto game as the student characters.

CHARACTER PROPORTIONS:

Use a friendly slightly chibi game-character proportion:
- relatively large head
- compact torso
- simplified arms and hands
- short but natural legs
- slightly exaggerated cartoon features
- readable silhouette at small game resolution

POSE:

- straight front view
- full body
- standing upright
- both feet visible
- shoulders facing forward
- relaxed natural posture
- friendly expression
- ${props} clearly visible

Do not use:
- side profile
- three-quarter view
- running pose
- action pose
- dramatic perspective
- extreme foreshortening

SPRITE COMPOSITION:

- one character only
- centered horizontally
- full body from head to shoes
- character fills most of the vertical canvas
- consistent scale with the existing MathTuto student sprites
- feet positioned near the bottom of the canvas
- small amount of transparent padding around the character
- no cropping
- no body parts touching the canvas edge

BACKGROUND:

Completely transparent PNG background.

NO:
- scenery
- buildings
- furniture
- props other than the ${props}
- ground
- floor shadow
- text
- labels
- speech bubbles
- logo
- watermark
- UI elements

FINAL TARGET:

This should look like a playable/interactive NPC sprite from the same
retro educational adventure game as the MathTuto student characters.

Think:

"${think}"

NOT:

"${not}"`;
}

// ────────────────────────────────────────────────────────────────────────────
// Per-level data (all real values taken from code + mapData.ts)
// ────────────────────────────────────────────────────────────────────────────
const levels = [
  // ═══════════════════════ CITY — LEVEL 2 ═══════════════════════
  {
    level: 2,
    folder: "LEVEL2",
    title: "City",
    label: "city",
    bgFile: "city-background.png",
    size: "1024×1024",
    fallbackColor: "steel blue",
    fallbackHex: "#4682B4",
    world: `Create a top-down 2D game map of a modern Philippine CITY,
square 1:1 aspect ratio, size 1024x1024 pixels.

Art style: flat vector cartoon, clean thick outlines, bright saturated
colors, kid-friendly, soft shading, NO text, NO labels, NO letters,
NO numbers, NO watermark. Detailed but readable.

This is a walkable urban map with paved streets and sidewalks connecting
the landmarks. The whole map is city ground (asphalt/sidewalk/plaza),
so a character can walk everywhere along the paths.

The city reads as four districts: EDUCATION DISTRICT (top-left),
BUSINESS DISTRICT (top-right), RESIDENTIAL DISTRICT (bottom-left),
INDUSTRIAL DISTRICT (bottom-right), wrapped around a CITY CENTER.

Place these landmarks EXACTLY at these percentage positions on the map
(X = left-to-right, Y = top-to-bottom). Show each landmark clearly,
with a small open area of flat ground in front of it (NPCs stand there):

1. CITY PUBLIC SCHOOL: modern two-story public school with classroom
   windows and a flagpole. Position ~19% X, ~46% Y.
2. CITY TERMINAL: jeepney/UV terminal with parked jeepneys and a
   covered waiting shed. Position ~59% X, ~23% Y.
3. CITY PLAZA: open public plaza with a fountain and trees.
   Position ~81% X, ~23% Y.
4. CITY INTERNET CAFÉ: small internet café with a lit signboard front.
   Position ~81% X, ~46% Y.
5. CITY PARK: rectangular public park with a diagonal paved shortcut
   and benches. Position ~79% X, ~67% Y.
6. CITY HIGH SCHOOL: taller school building with a clock tower.
   Position ~60% X, ~90% Y.
7. CITY BUS STOP: bus shelter with a route board and a bus bay.
   Position ~50% X, ~78% Y.
8. CITY MALL: large shopping mall with glass storefront facade.
   Position ~19% X, ~89% Y.
9. CITY SPORTS COMPLEX: covered sports complex with badminton court
   markings visible through the entrance. Position ~27% X, ~27% Y.
10. CITY SCHOOL (exam hall): central school campus with an exam hall.
    Position ~50% X, ~56% Y.

Also scatter these collectible-touch spots across open ground (no
building needed, small sparkle/shiny spots are fine): ~35/37, ~35/9,
~59/4, ~44/4, ~5/42, ~11/67, ~6/94, ~30/95, ~41/82, ~87/82.

Make paths connect everything so it reads as one lived-in city.`,
    landmarks: [
      ["City Public School", 19, 46],
      ["City Terminal", 59, 23],
      ["City Plaza", 81, 23],
      ["City Internet Café", 81, 46],
      ["City Park", 79, 67],
      ["City High School", 60, 90],
      ["City Bus Stop", 50, 78],
      ["City Mall", 19, 89],
      ["City Sports Complex", 27, 27],
      ["City School (exam hall)", 50, 56],
    ],
    collectibles: "~35/37, ~35/9, ~59/4, ~44/4, ~5/42, ~11/67, ~6/94, ~30/95, ~41/82, ~87/82",
    existingFiles: [
      "accountant-lisa.png", "architect-maya.png", "city-planner-tom.png",
      "engineer-sarah.png", "entrepreneur-carlos.png", "logistics-manager-ben.png",
      "sales-director-kim.png", "transit-manager-roy.png", "transport-chief-mike.png",
      "urban-planner-gina.png", "removebg/accountant-lisa.png",
      "Gemini_Generated_Image_2f5hb82f5hb82f5h-removebg-preview.png",
    ],
    npcs: [
      { num: 1, name: "Carla", role: "Public-School Student", fname: "carla.png",
        mission: "Mission 11 · Simplify for the Exam", location: "City Public School",
        pronoun: "she",
        appearance: `A focused Filipina high-school student ready for her math exam. She
has her dark hair in a neat ponytail, wears the public school uniform
(white blouse, dark skirt), and carries a school bag full of books.`,
        props: "school bag and a calculator",
        think: "Carla is another student living inside the same Civika world.",
        not: "a standalone vector illustration of a generic schoolgirl." },
      { num: 2, name: "Mang Roy", role: "Jeepney Driver", fname: "mang-roy.png",
        mission: "Mission 12 · Fare Formula", location: "City Terminal",
        pronoun: "he",
        appearance: `A friendly Filipino jeepney driver in his 40s. He wears a sleeveless
vest over a faded shirt, a driver's cap, and has a kind, weathered face
with a confident smile.`,
        props: "a small fare guide and coins",
        think: "Mang Roy is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a jeepney driver." },
      { num: 3, name: "Arki Maya", role: "Architect", fname: "arki-maya.png",
        mission: "Mission 13 · Building Shadow", location: "City Plaza",
        pronoun: "she",
        appearance: `A creative Filipina architect in her 30s. Her hair is in a tidy bun,
she wears a smart-casual blouse with a sketching pencil tucked behind
her ear and glasses pushed up on her head.`,
        props: "a rolled blueprint and a measuring tape",
        think: "Arki Maya is another character living inside the same Civika world.",
        not: "a standalone vector illustration of an architect." },
      { num: 4, name: "Student Leo", role: "Online-Seller Student", fname: "student-leo.png",
        mission: "Mission 14 · Peso to Dollar", location: "City Internet Café",
        pronoun: "he",
        appearance: `A cheerful Filipino student who sells items online. He wears a casual
graphic tee and jeans, has a backpack over one shoulder, and carries
a small parcel ready to ship.`,
        props: "a smartphone and a small delivery parcel",
        think: "Student Leo is another character living inside the same Civika world.",
        not: "a standalone vector illustration of an online seller." },
      { num: 5, name: "Gina", role: "Urban Planner", fname: "gina.png",
        mission: "Mission 15 · Park Path", location: "City Park",
        pronoun: "she",
        appearance: `A thoughtful Filipina urban planner with rectangular glasses and a
city-government ID lanyard. She wears a smart blouse and a blazer,
holding a map of the city park.`,
        props: "a folded city map and a clipboard",
        think: "Gina is another character living inside the same Civika world.",
        not: "a standalone vector illustration of an urban planner." },
      { num: 6, name: "Sir Tan", role: "High-School Teacher", fname: "sir-tan.png",
        mission: "Mission 16 · Grade Reverse", location: "City High School",
        pronoun: "he",
        appearance: `A kind Filipino high-school math teacher in his 30s. He wears a
buttoned checked polo and slacks, has neat hair and glasses, and
carries a gradebook under his arm.`,
        props: "a gradebook and a marker",
        think: "Sir Tan is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a teacher." },
      { num: 7, name: "Manager Ben", role: "Transit Operations Manager", fname: "manager-ben.png",
        mission: "Mission 17 · Bus Route Map", location: "City Bus Stop",
        pronoun: "he",
        appearance: `A capable Filipino transit manager in his 40s, wearing a city transit
uniform polo and a transit badge. He holds a route plan of the city
bus network.`,
        props: "a bus route map and a pocket radio",
        think: "Manager Ben is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a transit manager." },
      { num: 8, name: "Carlos", role: "Sales Entrepreneur", fname: "carlos.png",
        mission: "Mission 18 · Commission Check", location: "City Mall",
        pronoun: "he",
        appearance: `A sharp young Filipino entrepreneur in a crisp polo and slacks. He
sells at the city mall and carries a sales ledger, looking friendly
and business-savvy.`,
        props: "a sales ledger and a pen",
        think: "Carlos is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a salesman." },
      { num: 9, name: "Coach Kim", role: "Sports Coach", fname: "coach-kim.png",
        mission: "Mission 19 · Sports Complex", location: "City Sports Complex",
        pronoun: "she",
        appearance: `An energetic Filipina sports coach in a workout track jacket and
whistle around her neck. Short hair, athletic build, holding a
badminton racket.`,
        props: "a badminton racket and a whistle",
        think: "Coach Kim is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a sports coach." },
      { num: 10, name: "Principal Santos", role: "School Principal", fname: "principal-santos.png",
        mission: "Mission 20 · Citywide Exam Review", location: "City School",
        pronoun: "he",
        appearance: `A distinguished Filipino school principal with graying hair, wearing a
formal barong with an ID badge. He has a warm, welcoming expression
and carries a review binder.`,
        props: "a binder and a school ID",
        think: "Principal Santos is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a principal." },
    ],
  },

  // ═══════════════════════ PROVINCE — LEVEL 3 ═══════════════════════
  {
    level: 3,
    folder: "LEVEL3",
    title: "Province",
    label: "province",
    bgFile: "province-background.png",
    size: "1024×1024",
    fallbackColor: "forest green",
    fallbackHex: "#228B22",
    world: `Create a top-down 2D game map of a Philippine PROVINCE,
square 1:1 aspect ratio, size 1024x1024 pixels.

Art style: flat vector cartoon, clean thick outlines, bright saturated
colors, kid-friendly, soft shading, NO text, NO labels, NO letters,
NO numbers, NO watermark. Detailed but readable.

This is a walkable provincial map with dirt/paved roads and farm paths
connecting the landmarks. The whole map is countryside ground
(fields/grass/dirt roads), so a character can walk everywhere along
the paths.

The province reads as a rural government center surrounded by
farmland, rivers and rolling hills.

Place these landmarks EXACTLY at these percentage positions on the map
(X = left-to-right, Y = top-to-bottom). Show each landmark clearly,
with a small open area of flat ground in front of it (NPCs stand there):

1. PROVINCIAL CAPITOL: main capitol building with a Philippine flag
   and steps. Position ~19% X, ~46% Y.
2. PROVINCIAL FARM: rectangular rice/farm plot with neat field rows.
   Position ~59% X, ~23% Y.
3. PROVINCIAL AGRICULTURE OFFICE: one-story agri office with a small
   greenhouse beside it. Position ~81% X, ~23% Y.
4. IRRIGATION SITE: irrigation canal with visible pipes and a pump
   house. Position ~81% X, ~46% Y.
5. CAPITOL ANNEX (BUDGET OFFICE): smaller capitol annex building.
   Position ~79% X, ~67% Y.
6. PROVINCIAL HEALTH OFFICE: rural health building with a cross/plus
   sign marker. Position ~60% X, ~90% Y.
7. PROVINCIAL HILL ROAD: a hilly paved road section with a slope
   signboard. Position ~50% X, ~78% Y.
8. PROVINCIAL AGRICULTURE FIELD: open farm field with crop rows.
   Position ~19% X, ~89% Y.
9. PROVINCIAL WATER DISTRICT: water tank facility with a large
   elevated tank. Position ~27% X, ~27% Y.
10. CAPITOL HALL: grand capitol hall with flagpoles and a plaza.
    Position ~50% X, ~56% Y.

Also scatter these collectible-touch spots across open ground (no
building needed, small sparkle/shiny spots are fine): ~35/37, ~35/9,
~59/4, ~44/4, ~5/42, ~11/67, ~6/94, ~30/95, ~41/82, ~87/82.

Make paths connect everything so it reads as one lived-in province.`,
    landmarks: [
      ["Provincial Capitol", 19, 46],
      ["Provincial Farm", 59, 23],
      ["Provincial Agriculture Office", 81, 23],
      ["Irrigation Site", 81, 46],
      ["Capitol Annex (Budget Office)", 79, 67],
      ["Provincial Health Office", 60, 90],
      ["Provincial Hill Road", 50, 78],
      ["Provincial Agriculture Field", 19, 89],
      ["Provincial Water District", 27, 27],
      ["Capitol Hall", 50, 56],
    ],
    collectibles: "~35/37, ~35/9, ~59/4, ~44/4, ~5/42, ~11/67, ~6/94, ~30/95, ~41/82, ~87/82",
    existingFiles: [
      "provincial-budget-director.png", "provincial-economist.png",
      "provincial-engineer.png", "financial-analyst.png", "policy-coordinator.png",
      "operations-director.png", "land-use-planner.png", "resource-manager.png",
      "investment-analyst.png", "strategic-planner.png",
    ],
    npcs: [
      { num: 1, name: "Sarah", role: "Scholarship Applicant", fname: "sarah.png",
        mission: "Mission 21 · Scholarship Qualifier", location: "Provincial Capitol",
        pronoun: "she",
        appearance: `A determined Filipina provincial scholarship applicant in her late
teens. She wears a neat blouse and skirt, rectangular glasses, and
carries a folder of application papers.`,
        props: "a folder of scholarship papers",
        think: "Sarah is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a scholarship student." },
      { num: 2, name: "Mang Tomas", role: "Farmer", fname: "mang-tomas.png",
        mission: "Mission 22 · Farm Plot Diagonal", location: "Provincial Farm",
        pronoun: "he",
        appearance: `A rugged Filipino farmer in his 50s wearing a wide straw hat, rolled-up
sleeves and farm pants. He has a warm smile and sun-weathered skin.`,
        props: "a measuring tape and a rice stalk",
        think: "Mang Tomas is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a farmer." },
      { num: 3, name: "Ate Liza", role: "Agricultural Technician", fname: "ate-liza.png",
        mission: "Mission 23 · Fertilizer Mix", location: "Provincial Agriculture Office",
        pronoun: "she",
        appearance: `A practical Filipina agricultural technician in khaki work clothes
and a cap. She has a clipboard in hand and a sample bag over her
shoulder.`,
        props: "a clipboard and a fertilizer sample bag",
        think: "Ate Liza is another character living inside the same Civika world.",
        not: "a standalone vector illustration of an agri technician." },
      { num: 4, name: "Engineer Pat", role: "Irrigation Engineer", fname: "engineer-pat.png",
        mission: "Mission 24 · Irrigation Pipe", location: "Irrigation Site",
        pronoun: "he",
        appearance: `A focused Filipino civil engineer in a yellow hard hat and safety
vest, holding rolled pipe plans. Practical and no-nonsense.`,
        props: "a hard hat and pipe blueprint",
        think: "Engineer Pat is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a civil engineer." },
      { num: 5, name: "Budget Officer Amy", role: "Provincial Budget Officer", fname: "budget-officer-amy.png",
        mission: "Mission 25 · Budget Scaling", location: "Capitol Annex (Budget Office)",
        pronoun: "she",
        appearance: `A precise Filipina budget officer in office attire and a lanyard,
with her hair in a low bun. She carries a thick budget ledger.`,
        props: "a budget ledger and a calculator",
        think: "Budget Officer Amy is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a budget officer." },
      { num: 6, name: "Nurse Joy", role: "Rural Health Nurse", fname: "nurse-joy.png",
        mission: "Mission 26 · Dosage Formula", location: "Provincial Health Office",
        pronoun: "she",
        appearance: `A caring Filipina nurse in a white uniform with a small cross on
the collar, wearing a stethoscope around her neck. Gentle smile.`,
        props: "a stethoscope and a medication pack",
        think: "Nurse Joy is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a nurse." },
      { num: 7, name: "Foreman Bob", role: "Road Foreman", fname: "foreman-bob.png",
        mission: "Mission 27 · Road Slope", location: "Provincial Hill Road",
        pronoun: "he",
        appearance: `A sturdy Filipino road foreman in an orange safety vest and hard
hat, holding a roll of road plans and a measuring wheel.`,
        props: "road plans and a measuring wheel",
        think: "Foreman Bob is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a road foreman." },
      { num: 8, name: "Ma'am Elena", role: "Provincial Agronomist", fname: "maam-elena.png",
        mission: "Mission 28 · Yield Reverse", location: "Provincial Agriculture Field",
        pronoun: "she",
        appearance: `A knowledgeable Filipina agronomist in a sun hat and light work
shirt, holding a small tray of grain samples.`,
        props: "a tablet and a tray of grain samples",
        think: "Ma'am Elena is another character living inside the same Civika world.",
        not: "a standalone vector illustration of an agronomist." },
      { num: 9, name: "Sir Dan", role: "Water Utility Engineer", fname: "sir-dan.png",
        mission: "Mission 29 · Water Tank Volume", location: "Provincial Water District",
        pronoun: "he",
        appearance: `A capable Filipino water engineer in a polo shirt with a water
district cap, holding a pipe fitting and a water-system blueprint.`,
        props: "a pipe fitting and a water-system blueprint",
        think: "Sir Dan is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a water engineer." },
      { num: 10, name: "Governor's Aide", role: "Provincial Governor's Aide", fname: "governors-aide.png",
        mission: "Mission 30 · Provincial Scholarship Final", location: "Capitol Hall",
        pronoun: "he",
        appearance: `A polished young Filipino professional aide in formal office wear and
a capitol ID, carrying a scholarship program folder and a phone.`,
        props: "a program folder and a smartphone",
        think: "The Governor's Aide is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a government aide." },
    ],
  },

  // ═══════════════════════ REGION — LEVEL 4 ═══════════════════════
  {
    level: 4,
    folder: "LEVEL4",
    title: "Region",
    label: "region",
    bgFile: "region-background.png",
    size: "1024×1024",
    fallbackColor: "deep purple",
    fallbackHex: "#800080",
    world: `Create a top-down 2D game map of a Philippine REGIONAL CENTER,
square 1:1 aspect ratio, size 1024x1024 pixels.

Art style: flat vector cartoon, clean thick outlines, bright saturated
colors, kid-friendly, soft shading, NO text, NO labels, NO letters,
NO numbers, NO watermark. Detailed but readable.

This is a walkable regional-government map with paved roads and
institutional grounds connecting the landmarks. The whole map is
city-like ground (asphalt/sidewalk), so a character can walk
everywhere along the paths.

The region reads as an institutional QUARTER where the regional
offices of DepEd, DOST, PAGASA, NEDA and training centers are
clustered around a competition hall.

Place these landmarks EXACTLY at these percentage positions on the map
(X = left-to-right, Y = top-to-bottom). Show each landmark clearly,
with a small open area of flat ground in front of it (NPCs stand there):

1. REGIONAL DEPED OFFICE: regional education department building with
   flagpoles. Position ~19% X, ~46% Y.
2. REGIONAL DOST OFFICE: science & technology institute building with
   a lab wing. Position ~59% X, ~23% Y.
3. REGIONAL STEM CENTER: modern STEM learning center with a glass
   facade. Position ~81% X, ~23% Y.
4. REGIONAL PAGASA STATION: weather station with a small radar dome.
   Position ~81% X, ~46% Y.
5. REGIONAL TRAINING ROOM: training pavilion with a whiteboard front.
   Position ~79% X, ~67% Y.
6. REGIONAL TECH HUB: tech club hub building with a network antenna.
   Position ~60% X, ~90% Y.
7. REGIONAL SCIENCE LAB: science laboratory building with flask
   signage. Position ~50% X, ~78% Y.
8. REGIONAL NEDA OFFICE: economic planning office building.
   Position ~19% X, ~89% Y.
9. REGIONAL TRAINING CENTER: big training center with seminar rooms.
   Position ~27% X, ~27% Y.
10. REGIONAL COMPETITION HALL: grand competition hall with a stage-
    like entrance. Position ~50% X, ~56% Y.

Also scatter these collectible-touch spots across open ground (no
building needed, small sparkle/shiny spots are fine): ~35/37, ~35/9,
~59/4, ~44/4, ~5/42, ~11/67, ~6/94, ~30/95, ~41/82, ~87/82.

Make paths connect everything so it reads as one institutional quarter.`,
    landmarks: [
      ["Regional DepEd Office", 19, 46],
      ["Regional DOST Office", 59, 23],
      ["Regional STEM Center", 81, 23],
      ["Regional PAGASA Station", 81, 46],
      ["Regional Training Room", 79, 67],
      ["Regional Tech Hub", 60, 90],
      ["Regional Science Lab", 50, 78],
      ["Regional NEDA Office", 19, 89],
      ["Regional Training Center", 27, 27],
      ["Regional Competition Hall", 50, 56],
    ],
    collectibles: "~35/37, ~35/9, ~59/4, ~44/4, ~5/42, ~11/67, ~6/94, ~30/95, ~41/82, ~87/82",
    existingFiles: [
      "regional-math-director.png", "regional-analyst.png", "regional-coordinator.png",
      "regional-strategist.png", "regional-planner.png", "regional-economist.png",
      "regional-researcher.png", "regional-systems-expert.png",
      "regional-data-scientist.png", "regional-policy-advisor.png",
    ],
    npcs: [
      { num: 1, name: "Marco", role: "Math Competition Coach", fname: "marco.png",
        mission: "Mission 31 · Regional Qualifier", location: "Regional DepEd Office",
        pronoun: "he",
        appearance: `An approachable Filipino math coach in a polo shirt, with a whistle
lanyard and a problem-sheet pad in his hand. Encouraging expression.`,
        props: "a marker and practice problem sheets",
        think: "Marco is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a math coach." },
      { num: 2, name: "Engineer Ray", role: "DOST Signal Engineer", fname: "engineer-ray.png",
        mission: "Mission 32 · Signal Decay", location: "Regional DOST Office",
        pronoun: "he",
        appearance: `A precise Filipino DOST engineer in a lab coat over a shirt, with an
ID lanyard, holding a signal-strength chart.`,
        props: "a lab coat and a signal chart",
        think: "Engineer Ray is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a DOST engineer." },
      { num: 3, name: "Clara", role: "STEM Scholar / Mathlete", fname: "clara.png",
        mission: "Mission 33 · Coordinate Challenge", location: "Regional STEM Center",
        pronoun: "she",
        appearance: `A brilliant Filipina STEM scholar in a smart polo shirt, holding a
geometry set and a notebook. Confident and studious.`,
        props: "a geometry set and a notebook",
        think: "Clara is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a mathlete." },
      { num: 4, name: "Scientist May", role: "PAGASA Scientist", fname: "scientist-may.png",
        mission: "Mission 34 · Altitude Temperature", location: "Regional PAGASA Station",
        pronoun: "she",
        appearance: `A curious Filipina scientist in a lab coat with safety glasses, her
hair in a bun, holding a thermometer and a weather clipboard.`,
        props: "a thermometer and a weather clipboard",
        think: "Scientist May is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a weather scientist." },
      { num: 5, name: "Sir Nico", role: "Training Instructor", fname: "sir-nico.png",
        mission: "Mission 35 · Polynomial Roots", location: "Regional Training Room",
        pronoun: "he",
        appearance: `A patient Filipino training instructor in business-casual attire,
holding a quadratic-formula card and a whiteboard marker.`,
        props: "a quadratic-formula card and a marker",
        think: "Sir Nico is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a training instructor." },
      { num: 6, name: "Kuya Jay", role: "Tech-Club Mentor", fname: "kuya-jay.png",
        mission: "Mission 36 · Cipher Decode", location: "Regional Tech Hub",
        pronoun: "he",
        appearance: `A hip Filipino tech-club mentor in a geeky tee and glasses, holding
a laptop and a QR code card. Friendly and gadget-savvy.`,
        props: "a laptop and a QR code card",
        think: "Kuya Jay is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a tech mentor." },
      { num: 7, name: "Student Alex", role: "Physics Student", fname: "student-alex.png",
        mission: "Mission 37 · Projectile Height", location: "Regional Science Lab",
        pronoun: "he",
        appearance: `A curious Filipino physics student with a backpack, holding a
protractor and a lab notebook, wearing a student ID.`,
        props: "a protractor and a lab notebook",
        think: "Student Alex is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a physics student." },
      { num: 8, name: "Ms. Gina", role: "NEDA Financial Analyst", fname: "ms-gina.png",
        mission: "Mission 38 · Investment Return", location: "Regional NEDA Office",
        pronoun: "she",
        appearance: `A sharp Filipina financial analyst in a business blazer and glasses,
holding a growth chart and a calculator. Professional and friendly.`,
        props: "a growth chart and a calculator",
        think: "Ms. Gina is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a financial analyst." },
      { num: 9, name: "Ma'am Tina", role: "Competition Coach", fname: "maam-tina.png",
        mission: "Mission 39 · Rationalize It", location: "Regional Training Center",
        pronoun: "she",
        appearance: `An encouraging Filipina competition coach in a smart tracksuit with
a whistle, holding a stopwatch and problem sheets.`,
        props: "a stopwatch and problem sheets",
        think: "Ma'am Tina is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a competition coach." },
      { num: 10, name: "Regional Coordinator", role: "Regional Events Coordinator", fname: "regional-coordinator.png",
        mission: "Mission 40 · Regional Math Competition", location: "Regional Competition Hall",
        pronoun: "he",
        appearance: `A composed Filipino regional coordinator in formal office attire with
a red-trimmed sash and ID, holding a program folder and a
megaphone.`,
        props: "a program folder and a small megaphone",
        think: "The Regional Coordinator is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a coordinator." },
    ],
  },

  // ═══════════════════════ NATIONAL — LEVEL 5 ═══════════════════════
  {
    level: 5,
    folder: "LEVEL5",
    title: "National",
    label: "national",
    bgFile: "national-background.png",
    size: "1024×1024",
    fallbackColor: "gold",
    fallbackHex: "#FFD700",
    world: `Create a top-down 2D game map of the PHILIPPINE NATIONAL CAPITAL
government quarter, square 1:1 aspect ratio, size 1024x1024 pixels.

Art style: flat vector cartoon, clean thick outlines, bright saturated
colors, kid-friendly, soft shading, NO text, NO labels, NO letters,
NO numbers, NO watermark. Detailed but readable.

This is a walkable national-government map with wide boulevards and
plazas connecting the landmark buildings. The whole map is city ground
(asphalt/sidewalk), so a character can walk everywhere along the
paths.

The map reads as the seat of national education, science and
governance: DepEd, DOST-SEI, CHED, NEDA, PSA and the national science
academy arranged around a grand convention center.

Place these landmarks EXACTLY at these percentage positions on the map
(X = left-to-right, Y = top-to-bottom). Show each landmark clearly,
with a small open area of flat ground in front of it (NPCs stand there):

1. DEPED CENTRAL OFFICE: grand education headquarters with a large
   flagpole. Position ~19% X, ~46% Y.
2. DOST-SEI BUILDING: science education institute tower with a
   government seal. Position ~59% X, ~23% Y.
3. CHED CENTRAL OFFICE: higher education commission building.
   Position ~81% X, ~23% Y.
4. NEDA BUILDING: national economic planning building.
   Position ~81% X, ~46% Y.
5. NATIONAL ACADEMY OF SCIENCE: stately science academy hall.
   Position ~79% X, ~67% Y.
6. PAGASA SCIENCE GARDEN: weather agency grounds with a radar dome
   and science garden. Position ~60% X, ~90% Y.
7. PSA COMPLEX: statistics authority complex building.
   Position ~50% X, ~78% Y.
8. DEPED CENTRAL ANNEX: smaller annex of the education department.
   Position ~19% X, ~89% Y.
9. PSA COMPLEX ANNEX: statistics building annex.
   Position ~27% X, ~27% Y.
10. PHILIPPINE INTERNATIONAL CONVENTION CENTER: landmark convention
    center with a grand entrance. Position ~50% X, ~56% Y.

Also scatter these collectible-touch spots across open ground (no
building needed, small sparkle/shiny spots are fine): ~35/37, ~35/9,
~59/4, ~44/4, ~5/42, ~11/67, ~6/94, ~30/95, ~41/82, ~87/82.

Make paths connect everything so it reads as one prestigious national
government quarter.`,
    landmarks: [
      ["DepEd Central Office", 19, 46],
      ["DOST-SEI Building", 59, 23],
      ["CHED Central Office", 81, 23],
      ["NEDA Building", 81, 46],
      ["National Academy of Science", 79, 67],
      ["PAGASA Science Garden", 60, 90],
      ["PSA Complex", 50, 78],
      ["DepEd Central Annex", 19, 89],
      ["PSA Complex Annex", 27, 27],
      ["Philippine International Convention Center", 50, 56],
    ],
    collectibles: "~35/37, ~35/9, ~59/4, ~44/4, ~5/42, ~11/67, ~6/94, ~30/95, ~41/82, ~87/82",
    existingFiles: [
      "deped-undersecretary.png", "dost-secretary.png", "ched-commissioner.png",
      "neda-director-general.png", "national-scientist.png", "pagasa-administrator.png",
      "psa-administrator.png", "senate-education-committee-chair.png",
      "dbm-secretary.png", "deped-secretary.png",
    ],
    npcs: [
      { num: 1, name: "Sofia", role: "Olympiad Coach", fname: "sofia.png",
        mission: "Mission 41 · Olympiad Radical Equations", location: "DepEd Central Office",
        pronoun: "she",
        appearance: `A disciplined Filipina olympiad coach in formal office attire and an
ID badge, holding a mini whiteboard and a problem book.`,
        props: "a mini whiteboard and a problem book",
        think: "Sofia is another character living inside the same Civika world.",
        not: "a standalone vector illustration of an olympiad coach." },
      { num: 2, name: "Sir Andre", role: "DOST-SEI Mentor", fname: "sir-andre.png",
        mission: "Mission 42 · Inverse of Quadratics", location: "DOST-SEI Building",
        pronoun: "he",
        appearance: `A scholarly Filipino DOST-SEI mentor with glasses and a neat polo,
holding a physics formula sheet and a pen.`,
        props: "a physics formula sheet and a pen",
        think: "Sir Andre is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a science mentor." },
      { num: 3, name: "Ms. Karen", role: "CHED Education Officer", fname: "ms-karen.png",
        mission: "Mission 43 · Inverse of Rationals", location: "CHED Central Office",
        pronoun: "she",
        appearance: `A professional Filipina CHED education officer in office wear with an
ID lanyard, holding accreditation forms and a tablet.`,
        props: "accreditation forms and a tablet",
        think: "Ms. Karen is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a CHED officer." },
      { num: 4, name: "Enzo", role: "NEDA Policy Analyst", fname: "enzo.png",
        mission: "Mission 44 · Radical Inequalities", location: "NEDA Building",
        pronoun: "he",
        appearance: `A bright Filipino NEDA policy analyst in a slim suit and glasses,
holding an economic chart and a tablet.`,
        props: "an economic chart and a tablet",
        think: "Enzo is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a policy analyst." },
      { num: 5, name: "Dr. Lee", role: "National Scientist", fname: "dr-lee.png",
        mission: "Mission 45 · Function Composition", location: "National Academy of Science",
        pronoun: "he",
        appearance: `A distinguished Filipino scientist in a lab coat over a formal shirt,
with glasses, holding a research paper and a fountain pen.`,
        props: "a research paper and a fountain pen",
        think: "Dr. Lee is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a scientist." },
      { num: 6, name: "PAGASA Researcher", role: "PAGASA Researcher", fname: "pagasa-researcher.png",
        mission: "Mission 46 · Physics Formula", location: "PAGASA Science Garden",
        pronoun: "he",
        appearance: `A diligent Filipino PAGASA researcher in a government polo with a
sleeve patch, holding a radar data sheet and a weather cap under his
arm.`,
        props: "a radar data sheet and a weather cap",
        think: "The PAGASA Researcher is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a weather researcher." },
      { num: 7, name: "Liam", role: "PSA Statistician", fname: "liam.png",
        mission: "Mission 47 · Inverse in Coordinates", location: "PSA Complex",
        pronoun: "he",
        appearance: `A methodical Filipino statistician in business-casual wear and
glasses, holding a graph sheet and a pen.`,
        props: "a graph sheet and a pen",
        think: "Liam is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a statistician." },
      { num: 8, name: "Ma'am Cruz", role: "Master Teacher", fname: "maam-cruz.png",
        mission: "Mission 48 · Advanced Radical Simplification", location: "DepEd Central Annex",
        pronoun: "she",
        appearance: `An eminent Filipina master teacher in a neat blouse with a DepEd
lanyard, holding chalk and a math module. Wise and warm.`,
        props: "chalk and a math module",
        think: "Ma'am Cruz is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a master teacher." },
      { num: 9, name: "Mr. Santos", role: "Sequence Statistician Mentor", fname: "mr-santos.png",
        mission: "Mission 49 · Inverse in Sequences", location: "PSA Complex Annex",
        pronoun: "he",
        appearance: `A seasoned Filipino statistician mentor with glasses and gray-flecked
hair, holding a sequence chart and a pointer.`,
        props: "a sequence chart and a pointer",
        think: "Mr. Santos is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a statistics mentor." },
      { num: 10, name: "DepEd Secretary", role: "National DepEd Secretary", fname: "deped-secretary.png",
        mission: "Mission 50 · Philippine Math Olympiad Final", location: "Philippine International Convention Center",
        pronoun: "he",
        appearance: `An authoritative yet warm Filipino DepEd Secretary in a formal
barong tagalog with a red sash, holding a program and a small
championship trophy.`,
        props: "a program and a small trophy",
        think: "The DepEd Secretary is another character living inside the same Civika world.",
        not: "a standalone vector illustration of a government secretary." },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Build each doc
// ────────────────────────────────────────────────────────────────────────────
// UNIQUE FACE SPECS -- one per NPC across all four level docs (keyed "LEVEL{n}:{name}").
// Every face below is intentionally distinct: no two NPCs share the same combination of
// age range, face shape, skin tone, eyes/brows, hair, glasses, facial hair, or
// distinguishing marks. These are the authoritative specs used by npcPrompt().
const FACES = {
  "LEVEL2:Carla": "Teenage girl (16-17), oval face, fair-light skin, big warm brown eyes with slim arched brows, straight black hair in a high ponytail with a small butterfly pin, no glasses, no facial hair, small gold stud earrings, a tiny mole above the right corner of her lip, fresh friendly smile.",
  "LEVEL2:Mang Roy": "Man (45-50), weathered square face, tanned brown skin, deep-set dark eyes with crow's feet, thick gray-flecked brows, broad nose, gray mustache over a scruffy gray-flecked stubble beard, deep laugh-lines at the corners of his mouth, warm crinkly grin.",
  "LEVEL2:Arki Maya": "Young woman (26-30), heart-shaped face, light-medium skin, almond-shaped hazel eyes with arched brows, sleek black hair in a low bun with two thin braids framing her temples, thin round wire glasses, no facial hair, small beauty mark just below her left eye, calm confident slight smile.",
  "LEVEL2:Student Leo": "Teenage boy (15-16), narrow oblong face, medium skin, bright amber eyes with straight brows, spiky dark-brown hair with a single bleached streak in front, no glasses, no facial hair, faint baby-freckles across the bridge of his nose, playful half-grin.",
  "LEVEL2:Gina": "Woman (35-40), round face, medium-tan skin, warm onyx eyes with softly rounded brows, shoulder-length wavy black hair with wispy bangs, rectangular dark full-rim glasses, no facial hair, two small beauty marks in a diagonal line on her right cheek, warm open smile.",
  "LEVEL2:Sir Tan": "Man (38-42), rectangular face, fair skin, sharp dark eyes with low straight brows, neat short black hair with a precise side part, half-moon glasses on a thin gold bridge, fine trimmed mustache with no beard, a small scar through his right eyebrow, composed firm smile.",
  "LEVEL2:Manager Ben": "Man (40-45), broad square-jawed face, light-olive skin, calm gray-blue eyes with thick heavy brows, balding at the crown with short dark hair at the sides, no glasses, clean-shaven, short salt-and-pepper sideburns, a dimpled chin, steady confident smile.",
  "LEVEL2:Carlos": "Man (28-33), oval face, deep tan skin, bright warm-brown eyes with medium-thick brows, thick wavy black hair slicked back with a neat widow's peak, no glasses, groomed short full beard with trimmed mustache, a small mole on his left cheekbone, cheerful toothy grin.",
  "LEVEL2:Coach Kim": "Woman (32-36), athletic oval face, tan skin, lively dark eyes with strong defined brows, black hair in a tight high ponytail with a zigzag headband, no glasses, no facial hair, two faint dimples that deepen when she smiles, energetic wide grin.",
  "LEVEL2:Principal Santos": "Man (50-55), dignified round face, medium-brown skin, kind brown eyes with gently arched brows, short gray-flecked black hair neatly combed with a side part, thin clear-rimmed glasses, neat gray mustache without a beard, small age-moles scattered on his left cheek, warm grandfatherly smile.",
  "LEVEL3:Sarah": "Young woman (24-28), heart-shaped face, medium skin, sparkling brown eyes with neatly arched brows, long straight black hair parted down the middle falling past her shoulders, no glasses, small teardrop silver earrings, a dimple in her left cheek, bright cheerful smile.",
  "LEVEL3:Mang Tomas": "Elderly man (55-60), weathered angular face, deep sun-tanned skin, kind deep-set eyes under bushy white eyebrows, full thick white hair, bushy white mustache over a full white beard, a gap between his two front teeth, gentle warm smile with deep eye-creases.",
  "LEVEL3:Ate Liza": "Woman (40-45), oval face, light skin, gentle brown eyes with softly curved brows, dark hair with a reddish-brown tint in a loose low bun, thin gold-rimmed round glasses, no facial hair, a small mole at the corner of her right eye, kind knowing smile.",
  "LEVEL3:Engineer Pat": "Man (30-35), diamond-shaped face, medium skin, attentive greenish-brown eyes with straight brows, short black hair with a slightly uneven cowlick at the front, no glasses, a thin neat goatee without a mustache, a tiny scar on his left jaw, focused subtle smile.",
  "LEVEL3:Budget Officer Amy": "Woman (35-40), round face with a soft jawline, fair skin, alert dark eyes with sleek slim brows, straight black hair in a sharp jaw-length bob with blunt side-swept bangs, thick black rectangular nerd-chic glasses, no facial hair, a small beauty mark beside her right nostril, composed precise smile.",
  "LEVEL3:Nurse Joy": "Young woman (25-30), soft oval face, light-medium skin, warm honey-brown eyes with gently curved brows, black hair in a practical low braid with a few escaping wisps, no glasses, round pearl stud earrings, a faint scatter of freckles on both cheeks, gentle caring smile.",
  "LEVEL3:Foreman Bob": "Man (45-50), rugged square face, weather-beaten brown skin, intense brown eyes under heavy grizzled brows, balding with gray stubble around the sides and back, no glasses, thick gray mustache over a short cropped gray beard, a scar cutting through his left eyebrow, sturdy workman's smile.",
  "LEVEL3:Ma'am Elena": "Woman (48-53), kind oval face, medium-tan skin, soft brown eyes with warm softly-arched brows, silver-streaked dark hair tied in a low loose ponytail, half-frame reading glasses on a chain, no facial hair, laugh lines fanning from both eye corners, calm motherly smile.",
  "LEVEL3:Sir Dan": "Man (42-47), lean rectangular face, fair skin with light freckles across the nose, sharp watchful brown eyes with slightly hooded lids, short black hair graying heavily at the temples, no glasses, trimmed mustache over a short neat full beard, a thin scar on the left corner of his mouth, quiet assured smile.",
  "LEVEL3:Governor's Aide": "Young man (27-32), oval face, medium-brown skin, bright keen eyes with well-groomed brows, neatly styled black hair with a sharp side part and a slight sheen, thin wire-frame glasses, clean-shaven with a very light mustache shadow, a small mole above his left eyebrow, polished polite smile.",
  "LEVEL4:Marco": "Man (33-38), oval face, tan skin, warm dark-brown eyes with strong brows, black hair in a stylish undercut with natural waves brushed back on top, no glasses, well-groomed dark full beard with a trimmed mustache connected to the beard, a small cleft in his chin, confident grin.",
  "LEVEL4:Engineer Ray": "Man (36-40), angular rectangular face, dark-brown skin, sharp alert eyes with straight firm brows, very short cropped black hair with a high hairline, black full-rim rectangular glasses, a neat thin mustache and a clean-shaven jaw, a small mole on his right cheek, serious focused smile.",
  "LEVEL4:Clara": "Young woman (27-31), oval face with soft features, fair skin, expressive hazel eyes with soft arched brows, long straight chestnut-brown hair with light layers, no glasses, a small beauty mark just above her left eyebrow, delicate smile with both dimples showing.",
  "LEVEL4:Scientist May": "Woman (38-44), oval-rounded face, light skin with a light dusting of freckles, thoughtful gray-blue eyes with very light brows, black hair pulled into a neat low bun with a few flyaway strands at her temples, thick dark cat-eye glasses, no facial hair, a small mole below the outer corner of her left eye, measured curious smile.",
  "LEVEL4:Sir Nico": "Man (40-45), broad round face, medium-tan skin, gentle warm-brown eyes under thick unruly brows, black hair with a receding hairline and short gray-flecked sides, no glasses, salt-and-pepper mustache only with a clean-shaven jaw, very deep smile-lines creasing beside his mouth, kind fatherly smile.",
  "LEVEL4:Kuya Jay": "Young man (22-26), boyish round-oval face, medium-dark skin, bright confident dark eyes with easygoing brows, black hair in a cool short fade with a small fluffy quiff on top, no glasses, clean-shaven, a tiny round mole on his left cheek, relaxed lopsided grin.",
  "LEVEL4:Student Alex": "Teenage boy (16-17), slender oval face, light-medium skin, curious gray eyes with thin straight brows, straight black hair with side-swept wispy bangs, slim rectangular glasses, no facial hair, a faint dusting of freckles across his nose only, shy small smile.",
  "LEVEL4:Ms. Gina": "Woman (45-50), oval face, medium skin, composed dark eyes with finely shaped brows, black hair streaked with silver at the temples in a tight neat bun, slender rectangular glasses on thin silver frames, no facial hair, a small mole just above the right corner of her mouth, poised gentle smile.",
  "LEVEL4:Ma'am Tina": "Woman (34-39), round cheerful face, fair skin with a healthy rosy undertone, big sparkling brown eyes with expressive arched brows, wavy dark hair with caramel highlights worn loose with a side part, no glasses, two deep round dimples that appear when she smiles widely, vibrant warm smile.",
  "LEVEL4:Regional Coordinator": "Man (40-46), sharp rectangular face, tan-brown skin, decisive dark eyes with straight firm brows, black hair in a tidy short crop with a subtle widow's peak, dark plastic square glasses, a neat mustache with a short boxed beard on the chin, a small mole at the right side of his jaw, official composed smile.",
  "LEVEL5:Sofia": "Young woman (24-27), oval face, light-medium skin, bright lively amber-brown eyes with neat arched brows, long straight black hair in a loose style with face-framing layers, no glasses, small crescent-shaped earrings, a faint beauty mark on her left cheek, warm confident smile.",
  "LEVEL5:Sir Andre": "Man (35-40), rectangular face, medium-brown skin, steady dark eyes with medium-thick brows, neatly combed black hair with a slim side part, thin-rimmed oval glasses, trimmed mustache over a close-cropped short beard, a small silver-stud earring in one ear, composed credible smile.",
  "LEVEL5:Ms. Karen": "Woman (30-35), oval face, fair skin, bright attentive green-gold hazel eyes with sleek slim brows, straight dark-brown hair in a sleek shoulder-length blunt cut with subtle side layers, thin silver-frame rectangle glasses, no facial hair, a single small mole on her chin, polished professional smile.",
  "LEVEL5:Enzo": "Man (29-33), diamond-shaped face, deep tan skin, sharp dark-brown eyes with full low brows, thick wavy black hair tousled forward with a natural curl at the ends, no glasses, light stubble lining his jaw and upper lip with a clean-shaven chin, a subtle scar beside his right eyebrow, friendly toothy grin.",
  "LEVEL5:Dr. Lee": "Man (48-55), long oval face, fair pale skin, severe intelligent dark eyes with straight brows, black hair with prominent gray at the temples combed back neatly, rectangular gold-frame glasses, clean-shaven with a thin defined mouth line, a small age-mole high on his left forehead, measured polite smile.",
  "LEVEL5:PAGASA Researcher": "Young man (28-33), oval face, medium-tan skin, focused dark eyes with neat straight brows, short black hair with a small tidy curl at the back of the hairline, no glasses, a closely-trimmed goatee and thin mustache, a small round mole at the left corner of his mouth, studious composed smile.",
  "LEVEL5:Liam": "Young man (23-27), oblong face, light skin with scattered freckles across both cheeks, bright blue eyes with soft light brows, wispy light-brown hair cut short and slightly messy, no glasses, clean-shaven, a tiny mole on the right side of his nose, easy lopsided grin.",
  "LEVEL5:Ma'am Cruz": "Woman (42-47), oval-rounded face, medium-tan skin, warm almond-shaped dark-brown eyes with soft graceful brows, black hair with elegant gray streaks pulled back in a low loose bun, tortoiseshell thick-frame glasses, no facial hair, gentle smile-lines beside her mouth, motherly encouraging smile.",
  "LEVEL5:Mr. Santos": "Man (52-58), broad rectangular face, weathered medium-dark skin, stern but kind dark eyes under straight prominent gray brows, full iron-gray hair with a neat side part, no glasses, thick gray mustache over a short full gray beard, a small age-mole on his right cheekbone, calm grandfatherly smile.",
  "LEVEL5:DepEd Secretary": "Man (50-56), dignified oval face, medium-brown skin, calm authoritative dark eyes with well-shaped brows, silver-white short hair brushed back neatly, no glasses, a neatly trimmed silver mustache with a clean-shaven chin, a small mole under his left ear, composed statesman-like smile."
};

function buildDoc(L) {
  const line = "─".repeat(14);
  const parts = [];

  parts.push(`# ${L.title} Level — Asset Generation Prompts (ChatGPT-ready)`);

  parts.push(`
Copy each prompt into ChatGPT (or your image generator) as-is. All images must be **text-free**, **no watermarks**, and follow the **same art style** as the rest of Civika (flat vector, kid-friendly cartoon, thick clean outlines, bright saturated colors, soft shading).

---

## 🗺️ 1. ${L.title} Background Map (the whole level's world)

> **Target file:** \`public/assets/${L.bgFile}\` (square 1:1, e.g. ${L.size})
>
> **How the game uses it:** this single image IS the entire playable map. The player, the 10 ${L.label} NPCs, and collectibles are all positioned by percentage coordinates on top of it. Landmark placement is non-negotiable (see the layout below). The image itself must NOT contain any people or characters.

**Prompt:**

\`\`\`
${L.world}
\`\`\`

---

## 👨‍🏫 2. NPC Character Images — ${L.title} (Level ${L.level})

> **Target folder:** \`public/assets/LEVEL${L.level}/\` **— exactly** these file names: the game loads \`assets/LEVEL${L.level}/<filename>\` and falls back to \`student-front-1\` if the file is missing or misnamed.
>
> **Technical rules for every NPC:**
>
> - **Front-facing, full-body character**, centered in frame, looking at the viewer.
> - **Solid transparent background** (PNG, cut-out, NO background scene).
> - **One person only, standing naturally**, feet near the bottom edge of the image.
> - **Resolution:** roughly **190–215 px wide × 240–300 px tall** (portrait) or any higher-res equivalent — the game auto-scales to a fixed on-screen height.
> - **No text, no watermark, no logo.**
> - Same flat cartoon style as the map. Filipino representation.
> - UNIQUE FACES: every NPC below has its own one-of-a-kind face (age, face shape, skin tone, eyes, brows, hair, glasses, facial hair, distinguishing marks). No two NPCs in the whole game may share the same face, hairstyle, glasses, or facial-hair combination. Generate each face exactly as specified - do not reuse, copy, or slightly alter another NPC's face even if it would be faster.
>
> The 10 NPCs below are the exact mission cast for this level (mission #, NPC name, and map position map 1:1 to \`mapData.ts\`). Each prompt is ready to paste into ChatGPT.
`);

  L.npcs.forEach((npc) => {
    const header = `NPC ${npc.num} — ${npc.name} (${npc.role})`;
    parts.push(`
### ${header}

> File: \`public/assets/LEVEL${L.level}/${npc.fname}\` · DB name: "${npc.name}" (${npc.mission}, ${npc.location}) · current role: **${npc.role}** · map position: (${L.landmarks[npc.num - 1][1]}% X, ${L.landmarks[npc.num - 1][2]}% Y)

**Prompt:**

\`\`\`text
${npcPrompt({ ...npc, face: FACES[`LEVEL${L.level}:${npc.name}`] })}
\`\`\`
`);
  });

  parts.push(`
---

## 🔍 Audit Notes — ${L.title} (Level ${L.level})

**Level map (open world):**
| Asset | File | Status |
|---|---|---|
| ${L.title} open-world background | \`public/assets/${L.bgFile}\` | ✅ exists — regenerate to taste with the prompt above |

**Mission NPCs — exact keys the game looks up (mapData 1:1):**
| # | DB NPC name | Image file it loads | Status |
|---|---|---|---|
${L.npcs
  .map(
    (n) =>
      `| ${n.num} | ${n.name} | \`assets/LEVEL${L.level}/${n.fname}\` | ⚠️ generate (currently falls back to \`student-front-1\`) |`
  )
  .join("\n")}

**⚠️ Code wiring — read this before/while generating:**

1. **The 4 non-barangay maps currently fall back to \`student-front-1\` for EVERY NPC.** In \`${L.title}Map.ts\`, \`getNPCTheme().imageMap\` is keyed by *titles* (e.g. "${L.subjectExample}"), but \`mapData\` mission NPCs use short names (e.g. "${L.npcExample}") — so the lookup \`npcImageMap[location.npc]\` misses and every NPC renders as the default boy sprite. BarangayMap was already fixed to key by mission short names; the other four maps still need that same fix (they'll show the real sprites the moment the imageMap keys match the mission NPC names).
2. **\`imageMap.value → imageFileMap.value → file\` chain:** the base class (\`OpenWorldMapScene.createNPCs\`) loads \`assets/LEVEL{n}/<imageFileMap[img]>\`. If any value in that chain is missing/mismatched, the NPC silently falls back. Keep the filename EXACTLY equal to the map's key value and save under the right LEVEL folder.
3. Existing files in \`LEVEL${L.level}/\` below are leftovers from the earlier title-based batch — fine to reuse as references, but they will NOT display until the \`imageMap\` fix above lands (and their filenames must match the ${L.label} imageFileMap values).

**Existing \`LEVEL${L.level}/\` files on disk (for reference):** ${L.existingFiles.join(", ")}

**Positioning note:** NPCs auto-scale to a target on-screen height in the base class + BarangayMap: \`setScale(targetHeight / npc.height)\` with \`targetHeight = max(player.displayHeight, 80) × 1.35\` (~106–119px on screen). This is resolution-independent, so source images can be any pixel size — no need to match a specific width/height. Just keep the character full-body and centered in the frame.
`);
  return parts.join("\n");
}

// ═══════════════════════ subject/npc example per level (audit wording) ═══════════════════════
levels[0].subjectExample = "Entrepreneur Carlos";
levels[0].npcExample = "Carlos";
levels[1].subjectExample = "Provincial Budget Officer";
levels[1].npcExample = "Budget Officer Amy";
levels[2].subjectExample = "Regional Development Council Director";
levels[2].npcExample = "Marco";
levels[3].subjectExample = "DepEd Undersecretary";
levels[3].npcExample = "Sofia";

// ═══════════════════════ write the four files ═══════════════════════
const names = {
  2: "city-assets-prompts.md",
  3: "province-assets-prompts.md",
  4: "region-assets-prompts.md",
  5: "national-assets-prompts.md",
};

for (const L of levels) {
  const out = join(ROOT, names[L.level]);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buildDoc(L), "utf8");
  console.log(`✓ ${names[L.level]}  (${out})`);
}