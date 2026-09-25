# National Level — Asset Generation Prompts (ChatGPT-ready)

Copy each prompt into ChatGPT (or your image generator) as-is. All images must be **text-free**, **no watermarks**, and follow the **same art style** as the rest of Civika (flat vector, kid-friendly cartoon, thick clean outlines, bright saturated colors, soft shading).

---

## 🗺️ 1. National Background Map (the whole level's world)

> **Target file:** `public/assets/national-background.png` (square 1:1, e.g. 1024×1024)
>
> **How the game uses it:** this single image IS the entire playable map. The player, the 10 national NPCs, and collectibles are all positioned by percentage coordinates on top of it. Landmark placement is non-negotiable (see the layout below). The image itself must NOT contain any people or characters.

**Prompt:**

```
Create a top-down 2D game map of the PHILIPPINE NATIONAL CAPITAL
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
government quarter.
```

---

## 👨‍🏫 2. NPC Character Images — National (Level 5)

> **Target folder:** `public/assets/LEVEL5/` **— exactly** these file names: the game loads `assets/LEVEL5/<filename>` and falls back to `student-front-1` if the file is missing or misnamed.
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
> The 10 NPCs below are the exact mission cast for this level (mission #, NPC name, and map position map 1:1 to `mapData.ts`). Each prompt is ready to paste into ChatGPT.


### NPC 1 — Sofia (Olympiad Coach)

> File: `public/assets/LEVEL5/sofia.png` · DB name: "Sofia" (Mission 41 · Olympiad Radical Equations, DepEd Central Office) · current role: **Olympiad Coach** · map position: (19% X, 46% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A disciplined Filipina olympiad coach in formal office attire and an
ID badge, holding a mini whiteboard and a problem book.

CRITICAL — UNIQUE FACE (do not skip):
Young woman (24-27), oval face, light-medium skin, bright lively amber-brown eyes with neat arched brows, long straight black hair in a loose style with face-framing layers, no glasses, small crescent-shaped earrings, a faint beauty mark on her left cheek, warm confident smile.

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

The NPC should look like she was created by the SAME artist for the
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
- a mini whiteboard and a problem book clearly visible

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
- props other than the a mini whiteboard and a problem book
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

"Sofia is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of an olympiad coach."
```


### NPC 2 — Sir Andre (DOST-SEI Mentor)

> File: `public/assets/LEVEL5/sir-andre.png` · DB name: "Sir Andre" (Mission 42 · Inverse of Quadratics, DOST-SEI Building) · current role: **DOST-SEI Mentor** · map position: (59% X, 23% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A scholarly Filipino DOST-SEI mentor with glasses and a neat polo,
holding a physics formula sheet and a pen.

CRITICAL — UNIQUE FACE (do not skip):
Man (35-40), rectangular face, medium-brown skin, steady dark eyes with medium-thick brows, neatly combed black hair with a slim side part, thin-rimmed oval glasses, trimmed mustache over a close-cropped short beard, a small silver-stud earring in one ear, composed credible smile.

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

The NPC should look like he was created by the SAME artist for the
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
- a physics formula sheet and a pen clearly visible

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
- props other than the a physics formula sheet and a pen
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

"Sir Andre is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a science mentor."
```


### NPC 3 — Ms. Karen (CHED Education Officer)

> File: `public/assets/LEVEL5/ms-karen.png` · DB name: "Ms. Karen" (Mission 43 · Inverse of Rationals, CHED Central Office) · current role: **CHED Education Officer** · map position: (81% X, 23% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A professional Filipina CHED education officer in office wear with an
ID lanyard, holding accreditation forms and a tablet.

CRITICAL — UNIQUE FACE (do not skip):
Woman (30-35), oval face, fair skin, bright attentive green-gold hazel eyes with sleek slim brows, straight dark-brown hair in a sleek shoulder-length blunt cut with subtle side layers, thin silver-frame rectangle glasses, no facial hair, a single small mole on her chin, polished professional smile.

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

The NPC should look like she was created by the SAME artist for the
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
- accreditation forms and a tablet clearly visible

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
- props other than the accreditation forms and a tablet
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

"Ms. Karen is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a CHED officer."
```


### NPC 4 — Enzo (NEDA Policy Analyst)

> File: `public/assets/LEVEL5/enzo.png` · DB name: "Enzo" (Mission 44 · Radical Inequalities, NEDA Building) · current role: **NEDA Policy Analyst** · map position: (81% X, 46% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A bright Filipino NEDA policy analyst in a slim suit and glasses,
holding an economic chart and a tablet.

CRITICAL — UNIQUE FACE (do not skip):
Man (29-33), diamond-shaped face, deep tan skin, sharp dark-brown eyes with full low brows, thick wavy black hair tousled forward with a natural curl at the ends, no glasses, light stubble lining his jaw and upper lip with a clean-shaven chin, a subtle scar beside his right eyebrow, friendly toothy grin.

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

The NPC should look like he was created by the SAME artist for the
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
- an economic chart and a tablet clearly visible

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
- props other than the an economic chart and a tablet
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

"Enzo is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a policy analyst."
```


### NPC 5 — Dr. Lee (National Scientist)

> File: `public/assets/LEVEL5/dr-lee.png` · DB name: "Dr. Lee" (Mission 45 · Function Composition, National Academy of Science) · current role: **National Scientist** · map position: (79% X, 67% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A distinguished Filipino scientist in a lab coat over a formal shirt,
with glasses, holding a research paper and a fountain pen.

CRITICAL — UNIQUE FACE (do not skip):
Man (48-55), long oval face, fair pale skin, severe intelligent dark eyes with straight brows, black hair with prominent gray at the temples combed back neatly, rectangular gold-frame glasses, clean-shaven with a thin defined mouth line, a small age-mole high on his left forehead, measured polite smile.

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

The NPC should look like he was created by the SAME artist for the
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
- a research paper and a fountain pen clearly visible

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
- props other than the a research paper and a fountain pen
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

"Dr. Lee is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a scientist."
```


### NPC 6 — PAGASA Researcher (PAGASA Researcher)

> File: `public/assets/LEVEL5/pagasa-researcher.png` · DB name: "PAGASA Researcher" (Mission 46 · Physics Formula, PAGASA Science Garden) · current role: **PAGASA Researcher** · map position: (60% X, 90% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A diligent Filipino PAGASA researcher in a government polo with a
sleeve patch, holding a radar data sheet and a weather cap under his
arm.

CRITICAL — UNIQUE FACE (do not skip):
Young man (28-33), oval face, medium-tan skin, focused dark eyes with neat straight brows, short black hair with a small tidy curl at the back of the hairline, no glasses, a closely-trimmed goatee and thin mustache, a small round mole at the left corner of his mouth, studious composed smile.

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

The NPC should look like he was created by the SAME artist for the
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
- a radar data sheet and a weather cap clearly visible

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
- props other than the a radar data sheet and a weather cap
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

"The PAGASA Researcher is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a weather researcher."
```


### NPC 7 — Liam (PSA Statistician)

> File: `public/assets/LEVEL5/liam.png` · DB name: "Liam" (Mission 47 · Inverse in Coordinates, PSA Complex) · current role: **PSA Statistician** · map position: (50% X, 78% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A methodical Filipino statistician in business-casual wear and
glasses, holding a graph sheet and a pen.

CRITICAL — UNIQUE FACE (do not skip):
Young man (23-27), oblong face, light skin with scattered freckles across both cheeks, bright blue eyes with soft light brows, wispy light-brown hair cut short and slightly messy, no glasses, clean-shaven, a tiny mole on the right side of his nose, easy lopsided grin.

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

The NPC should look like he was created by the SAME artist for the
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
- a graph sheet and a pen clearly visible

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
- props other than the a graph sheet and a pen
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

"Liam is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a statistician."
```


### NPC 8 — Ma'am Cruz (Master Teacher)

> File: `public/assets/LEVEL5/maam-cruz.png` · DB name: "Ma'am Cruz" (Mission 48 · Advanced Radical Simplification, DepEd Central Annex) · current role: **Master Teacher** · map position: (19% X, 89% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

An eminent Filipina master teacher in a neat blouse with a DepEd
lanyard, holding chalk and a math module. Wise and warm.

CRITICAL — UNIQUE FACE (do not skip):
Woman (42-47), oval-rounded face, medium-tan skin, warm almond-shaped dark-brown eyes with soft graceful brows, black hair with elegant gray streaks pulled back in a low loose bun, tortoiseshell thick-frame glasses, no facial hair, gentle smile-lines beside her mouth, motherly encouraging smile.

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

The NPC should look like she was created by the SAME artist for the
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
- chalk and a math module clearly visible

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
- props other than the chalk and a math module
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

"Ma'am Cruz is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a master teacher."
```


### NPC 9 — Mr. Santos (Sequence Statistician Mentor)

> File: `public/assets/LEVEL5/mr-santos.png` · DB name: "Mr. Santos" (Mission 49 · Inverse in Sequences, PSA Complex Annex) · current role: **Sequence Statistician Mentor** · map position: (27% X, 27% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A seasoned Filipino statistician mentor with glasses and gray-flecked
hair, holding a sequence chart and a pointer.

CRITICAL — UNIQUE FACE (do not skip):
Man (52-58), broad rectangular face, weathered medium-dark skin, stern but kind dark eyes under straight prominent gray brows, full iron-gray hair with a neat side part, no glasses, thick gray mustache over a short full gray beard, a small age-mole on his right cheekbone, calm grandfatherly smile.

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

The NPC should look like he was created by the SAME artist for the
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
- a sequence chart and a pointer clearly visible

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
- props other than the a sequence chart and a pointer
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

"Mr. Santos is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a statistics mentor."
```


### NPC 10 — DepEd Secretary (National DepEd Secretary)

> File: `public/assets/LEVEL5/deped-secretary.png` · DB name: "DepEd Secretary" (Mission 50 · Philippine Math Olympiad Final, Philippine International Convention Center) · current role: **National DepEd Secretary** · map position: (50% X, 56% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

An authoritative yet warm Filipino DepEd Secretary in a formal
barong tagalog with a red sash, holding a program and a small
championship trophy.

CRITICAL — UNIQUE FACE (do not skip):
Man (50-56), dignified oval face, medium-brown skin, calm authoritative dark eyes with well-shaped brows, silver-white short hair brushed back neatly, no glasses, a neatly trimmed silver mustache with a clean-shaven chin, a small mole under his left ear, composed statesman-like smile.

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

The NPC should look like he was created by the SAME artist for the
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
- a program and a small trophy clearly visible

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
- props other than the a program and a small trophy
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

"The DepEd Secretary is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a government secretary."
```


---

## 🔍 Audit Notes — National (Level 5)

**Level map (open world):**
| Asset | File | Status |
|---|---|---|
| National open-world background | `public/assets/national-background.png` | ✅ exists — regenerate to taste with the prompt above |

**Mission NPCs — exact keys the game looks up (mapData 1:1):**
| # | DB NPC name | Image file it loads | Status |
|---|---|---|---|
| 1 | Sofia | `assets/LEVEL5/sofia.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 2 | Sir Andre | `assets/LEVEL5/sir-andre.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 3 | Ms. Karen | `assets/LEVEL5/ms-karen.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 4 | Enzo | `assets/LEVEL5/enzo.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 5 | Dr. Lee | `assets/LEVEL5/dr-lee.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 6 | PAGASA Researcher | `assets/LEVEL5/pagasa-researcher.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 7 | Liam | `assets/LEVEL5/liam.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 8 | Ma'am Cruz | `assets/LEVEL5/maam-cruz.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 9 | Mr. Santos | `assets/LEVEL5/mr-santos.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 10 | DepEd Secretary | `assets/LEVEL5/deped-secretary.png` | ⚠️ generate (currently falls back to `student-front-1`) |

**⚠️ Code wiring — read this before/while generating:**

1. **The 4 non-barangay maps currently fall back to `student-front-1` for EVERY NPC.** In `NationalMap.ts`, `getNPCTheme().imageMap` is keyed by *titles* (e.g. "DepEd Undersecretary"), but `mapData` mission NPCs use short names (e.g. "Sofia") — so the lookup `npcImageMap[location.npc]` misses and every NPC renders as the default boy sprite. BarangayMap was already fixed to key by mission short names; the other four maps still need that same fix (they'll show the real sprites the moment the imageMap keys match the mission NPC names).
2. **`imageMap.value → imageFileMap.value → file` chain:** the base class (`OpenWorldMapScene.createNPCs`) loads `assets/LEVEL{n}/<imageFileMap[img]>`. If any value in that chain is missing/mismatched, the NPC silently falls back. Keep the filename EXACTLY equal to the map's key value and save under the right LEVEL folder.
3. Existing files in `LEVEL5/` below are leftovers from the earlier title-based batch — fine to reuse as references, but they will NOT display until the `imageMap` fix above lands (and their filenames must match the national imageFileMap values).

**Existing `LEVEL5/` files on disk (for reference):** deped-undersecretary.png, dost-secretary.png, ched-commissioner.png, neda-director-general.png, national-scientist.png, pagasa-administrator.png, psa-administrator.png, senate-education-committee-chair.png, dbm-secretary.png, deped-secretary.png

**Positioning note:** NPCs auto-scale to a target on-screen height in the base class + BarangayMap: `setScale(targetHeight / npc.height)` with `targetHeight = max(player.displayHeight, 80) × 1.35` (~106–119px on screen). This is resolution-independent, so source images can be any pixel size — no need to match a specific width/height. Just keep the character full-body and centered in the frame.
