# Region Level — Asset Generation Prompts (ChatGPT-ready)

Copy each prompt into ChatGPT (or your image generator) as-is. All images must be **text-free**, **no watermarks**, and follow the **same art style** as the rest of Civika (flat vector, kid-friendly cartoon, thick clean outlines, bright saturated colors, soft shading).

---

## 🗺️ 1. Region Background Map (the whole level's world)

> **Target file:** `public/assets/region-background.png` (square 1:1, e.g. 1024×1024)
>
> **How the game uses it:** this single image IS the entire playable map. The player, the 10 region NPCs, and collectibles are all positioned by percentage coordinates on top of it. Landmark placement is non-negotiable (see the layout below). The image itself must NOT contain any people or characters.

**Prompt:**

```
Create a top-down 2D game map of a Philippine REGIONAL CENTER,
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

Make paths connect everything so it reads as one institutional quarter.
```

---

## 👨‍🏫 2. NPC Character Images — Region (Level 4)

> **Target folder:** `public/assets/LEVEL4/` **— exactly** these file names: the game loads `assets/LEVEL4/<filename>` and falls back to `student-front-1` if the file is missing or misnamed.
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


### NPC 1 — Marco (Math Competition Coach)

> File: `public/assets/LEVEL4/marco.png` · DB name: "Marco" (Mission 31 · Regional Qualifier, Regional DepEd Office) · current role: **Math Competition Coach** · map position: (19% X, 46% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

An approachable Filipino math coach in a polo shirt, with a whistle
lanyard and a problem-sheet pad in his hand. Encouraging expression.

CRITICAL — UNIQUE FACE (do not skip):
Man (33-38), oval face, tan skin, warm dark-brown eyes with strong brows, black hair in a stylish undercut with natural waves brushed back on top, no glasses, well-groomed dark full beard with a trimmed mustache connected to the beard, a small cleft in his chin, confident grin.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a marker and practice problem sheets clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a marker and practice problem sheets
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Marco is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a math coach."
```


### NPC 2 — Engineer Ray (DOST Signal Engineer)

> File: `public/assets/LEVEL4/engineer-ray.png` · DB name: "Engineer Ray" (Mission 32 · Signal Decay, Regional DOST Office) · current role: **DOST Signal Engineer** · map position: (59% X, 23% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A precise Filipino DOST engineer in a lab coat over a shirt, with an
ID lanyard, holding a signal-strength chart.

CRITICAL — UNIQUE FACE (do not skip):
Man (36-40), angular rectangular face, dark-brown skin, sharp alert eyes with straight firm brows, very short cropped black hair with a high hairline, black full-rim rectangular glasses, a neat thin mustache and a clean-shaven jaw, a small mole on his right cheek, serious focused smile.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a lab coat and a signal chart clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a lab coat and a signal chart
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Engineer Ray is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a DOST engineer."
```


### NPC 3 — Clara (STEM Scholar / Mathlete)

> File: `public/assets/LEVEL4/clara.png` · DB name: "Clara" (Mission 33 · Coordinate Challenge, Regional STEM Center) · current role: **STEM Scholar / Mathlete** · map position: (81% X, 23% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A brilliant Filipina STEM scholar in a smart polo shirt, holding a
geometry set and a notebook. Confident and studious.

CRITICAL — UNIQUE FACE (do not skip):
Young woman (27-31), oval face with soft features, fair skin, expressive hazel eyes with soft arched brows, long straight chestnut-brown hair with light layers, no glasses, a small beauty mark just above her left eyebrow, delicate smile with both dimples showing.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a geometry set and a notebook clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a geometry set and a notebook
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Clara is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a mathlete."
```


### NPC 4 — Scientist May (PAGASA Scientist)

> File: `public/assets/LEVEL4/scientist-may.png` · DB name: "Scientist May" (Mission 34 · Altitude Temperature, Regional PAGASA Station) · current role: **PAGASA Scientist** · map position: (81% X, 46% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A curious Filipina scientist in a lab coat with safety glasses, her
hair in a bun, holding a thermometer and a weather clipboard.

CRITICAL — UNIQUE FACE (do not skip):
Woman (38-44), oval-rounded face, light skin with a light dusting of freckles, thoughtful gray-blue eyes with very light brows, black hair pulled into a neat low bun with a few flyaway strands at her temples, thick dark cat-eye glasses, no facial hair, a small mole below the outer corner of her left eye, measured curious smile.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a thermometer and a weather clipboard clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a thermometer and a weather clipboard
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Scientist May is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a weather scientist."
```


### NPC 5 — Sir Nico (Training Instructor)

> File: `public/assets/LEVEL4/sir-nico.png` · DB name: "Sir Nico" (Mission 35 · Polynomial Roots, Regional Training Room) · current role: **Training Instructor** · map position: (79% X, 67% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A patient Filipino training instructor in business-casual attire,
holding a quadratic-formula card and a whiteboard marker.

CRITICAL — UNIQUE FACE (do not skip):
Man (40-45), broad round face, medium-tan skin, gentle warm-brown eyes under thick unruly brows, black hair with a receding hairline and short gray-flecked sides, no glasses, salt-and-pepper mustache only with a clean-shaven jaw, very deep smile-lines creasing beside his mouth, kind fatherly smile.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a quadratic-formula card and a marker clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a quadratic-formula card and a marker
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Sir Nico is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a training instructor."
```


### NPC 6 — Kuya Jay (Tech-Club Mentor)

> File: `public/assets/LEVEL4/kuya-jay.png` · DB name: "Kuya Jay" (Mission 36 · Cipher Decode, Regional Tech Hub) · current role: **Tech-Club Mentor** · map position: (60% X, 90% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A hip Filipino tech-club mentor in a geeky tee and glasses, holding
a laptop and a QR code card. Friendly and gadget-savvy.

CRITICAL — UNIQUE FACE (do not skip):
Young man (22-26), boyish round-oval face, medium-dark skin, bright confident dark eyes with easygoing brows, black hair in a cool short fade with a small fluffy quiff on top, no glasses, clean-shaven, a tiny round mole on his left cheek, relaxed lopsided grin.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a laptop and a QR code card clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a laptop and a QR code card
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Kuya Jay is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a tech mentor."
```


### NPC 7 — Student Alex (Physics Student)

> File: `public/assets/LEVEL4/student-alex.png` · DB name: "Student Alex" (Mission 37 · Projectile Height, Regional Science Lab) · current role: **Physics Student** · map position: (50% X, 78% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A curious Filipino physics student with a backpack, holding a
protractor and a lab notebook, wearing a student ID.

CRITICAL — UNIQUE FACE (do not skip):
Teenage boy (16-17), slender oval face, light-medium skin, curious gray eyes with thin straight brows, straight black hair with side-swept wispy bangs, slim rectangular glasses, no facial hair, a faint dusting of freckles across his nose only, shy small smile.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a protractor and a lab notebook clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a protractor and a lab notebook
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Student Alex is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a physics student."
```


### NPC 8 — Ms. Gina (NEDA Financial Analyst)

> File: `public/assets/LEVEL4/ms-gina.png` · DB name: "Ms. Gina" (Mission 38 · Investment Return, Regional NEDA Office) · current role: **NEDA Financial Analyst** · map position: (19% X, 89% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A sharp Filipina financial analyst in a business blazer and glasses,
holding a growth chart and a calculator. Professional and friendly.

CRITICAL — UNIQUE FACE (do not skip):
Woman (45-50), oval face, medium skin, composed dark eyes with finely shaped brows, black hair streaked with silver at the temples in a tight neat bun, slender rectangular glasses on thin silver frames, no facial hair, a small mole just above the right corner of her mouth, poised gentle smile.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a growth chart and a calculator clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a growth chart and a calculator
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Ms. Gina is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a financial analyst."
```


### NPC 9 — Ma'am Tina (Competition Coach)

> File: `public/assets/LEVEL4/maam-tina.png` · DB name: "Ma'am Tina" (Mission 39 · Rationalize It, Regional Training Center) · current role: **Competition Coach** · map position: (27% X, 27% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

An encouraging Filipina competition coach in a smart tracksuit with
a whistle, holding a stopwatch and problem sheets.

CRITICAL — UNIQUE FACE (do not skip):
Woman (34-39), round cheerful face, fair skin with a healthy rosy undertone, big sparkling brown eyes with expressive arched brows, wavy dark hair with caramel highlights worn loose with a side part, no glasses, two deep round dimples that appear when she smiles widely, vibrant warm smile.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a stopwatch and problem sheets clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a stopwatch and problem sheets
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
retro educational adventure game as the Tutor Town student characters.

Think:

"Ma'am Tina is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a competition coach."
```


### NPC 10 — Regional Coordinator (Regional Events Coordinator)

> File: `public/assets/LEVEL4/regional-coordinator.png` · DB name: "Regional Coordinator" (Mission 40 · Regional Math Competition, Regional Competition Hall) · current role: **Regional Events Coordinator** · map position: (50% X, 56% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A composed Filipino regional coordinator in formal office attire with
a red-trimmed sash and ID, holding a program folder and a
megaphone.

CRITICAL — UNIQUE FACE (do not skip):
Man (40-46), sharp rectangular face, tan-brown skin, decisive dark eyes with straight firm brows, black hair in a tidy short crop with a subtle widow's peak, dark plastic square glasses, a neat mustache with a short boxed beard on the chin, a small mole at the right side of his jaw, official composed smile.

This face is assigned to ONLY this character. It must look DIFFERENT
from every other NPC in the whole game. Do not reuse, copy, or slightly
modify any other character's face, hairstyle, skin tone, glasses, or
facial hair. If the generator starts producing a face similar to
another NPC, change the features until it is clearly unique.

IMPORTANT STYLE REQUIREMENT:

The character must visually belong to the EXACT SAME GAME and character
family as the existing Tutor Town student sprites.

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
SAME Tutor Town game as the student characters.

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
- a program folder and a small megaphone clearly visible

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
- consistent scale with the existing Tutor Town student sprites
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
- props other than the a program folder and a small megaphone
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
retro educational adventure game as the Tutor Town student characters.

Think:

"The Regional Coordinator is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a coordinator."
```


---

## 🔍 Audit Notes — Region (Level 4)

**Level map (open world):**
| Asset | File | Status |
|---|---|---|
| Region open-world background | `public/assets/region-background.png` | ✅ exists — regenerate to taste with the prompt above |

**Mission NPCs — exact keys the game looks up (mapData 1:1):**
| # | DB NPC name | Image file it loads | Status |
|---|---|---|---|
| 1 | Marco | `assets/LEVEL4/marco.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 2 | Engineer Ray | `assets/LEVEL4/engineer-ray.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 3 | Clara | `assets/LEVEL4/clara.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 4 | Scientist May | `assets/LEVEL4/scientist-may.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 5 | Sir Nico | `assets/LEVEL4/sir-nico.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 6 | Kuya Jay | `assets/LEVEL4/kuya-jay.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 7 | Student Alex | `assets/LEVEL4/student-alex.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 8 | Ms. Gina | `assets/LEVEL4/ms-gina.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 9 | Ma'am Tina | `assets/LEVEL4/maam-tina.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 10 | Regional Coordinator | `assets/LEVEL4/regional-coordinator.png` | ⚠️ generate (currently falls back to `student-front-1`) |

**⚠️ Code wiring — read this before/while generating:**

1. **The 4 non-barangay maps currently fall back to `student-front-1` for EVERY NPC.** In `RegionMap.ts`, `getNPCTheme().imageMap` is keyed by *titles* (e.g. "Regional Development Council Director"), but `mapData` mission NPCs use short names (e.g. "Marco") — so the lookup `npcImageMap[location.npc]` misses and every NPC renders as the default boy sprite. BarangayMap was already fixed to key by mission short names; the other four maps still need that same fix (they'll show the real sprites the moment the imageMap keys match the mission NPC names).
2. **`imageMap.value → imageFileMap.value → file` chain:** the base class (`OpenWorldMapScene.createNPCs`) loads `assets/LEVEL{n}/<imageFileMap[img]>`. If any value in that chain is missing/mismatched, the NPC silently falls back. Keep the filename EXACTLY equal to the map's key value and save under the right LEVEL folder.
3. Existing files in `LEVEL4/` below are leftovers from the earlier title-based batch — fine to reuse as references, but they will NOT display until the `imageMap` fix above lands (and their filenames must match the region imageFileMap values).

**Existing `LEVEL4/` files on disk (for reference):** regional-math-director.png, regional-analyst.png, regional-coordinator.png, regional-strategist.png, regional-planner.png, regional-economist.png, regional-researcher.png, regional-systems-expert.png, regional-data-scientist.png, regional-policy-advisor.png

**Positioning note:** NPCs auto-scale to a target on-screen height in the base class + BarangayMap: `setScale(targetHeight / npc.height)` with `targetHeight = max(player.displayHeight, 80) × 1.35` (~106–119px on screen). This is resolution-independent, so source images can be any pixel size — no need to match a specific width/height. Just keep the character full-body and centered in the frame.
