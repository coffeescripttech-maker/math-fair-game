# City Level — Asset Generation Prompts (ChatGPT-ready)

Copy each prompt into ChatGPT (or your image generator) as-is. All images must be **text-free**, **no watermarks**, and follow the **same art style** as the rest of Civika (flat vector, kid-friendly cartoon, thick clean outlines, bright saturated colors, soft shading).

---

## 🗺️ 1. City Background Map (the whole level's world)

> **Target file:** `public/assets/city-background.png` (square 1:1, e.g. 1024×1024)
>
> **How the game uses it:** this single image IS the entire playable map. The player, the 10 city NPCs, and collectibles are all positioned by percentage coordinates on top of it. Landmark placement is non-negotiable (see the layout below). The image itself must NOT contain any people or characters.

**Prompt:**

```
Create a top-down 2D game map of a modern Philippine CITY,
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

Make paths connect everything so it reads as one lived-in city.
```

---

## 👨‍🏫 2. NPC Character Images — City (Level 2)

> **Target folder:** `public/assets/LEVEL2/` **— exactly** these file names: the game loads `assets/LEVEL2/<filename>` and falls back to `student-front-1` if the file is missing or misnamed.
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


### NPC 1 — Carla (Public-School Student)

> File: `public/assets/LEVEL2/carla.png` · DB name: "Carla" (Mission 11 · Simplify for the Exam, City Public School) · current role: **Public-School Student** · map position: (19% X, 46% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A focused Filipina high-school student ready for her math exam. She
has her dark hair in a neat ponytail, wears the public school uniform
(white blouse, dark skirt), and carries a school bag full of books.

CRITICAL — UNIQUE FACE (do not skip):
Teenage girl (16-17), oval face, fair-light skin, big warm brown eyes with slim arched brows, straight black hair in a high ponytail with a small butterfly pin, no glasses, no facial hair, small gold stud earrings, a tiny mole above the right corner of her lip, fresh friendly smile.

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
- school bag and a calculator clearly visible

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
- props other than the school bag and a calculator
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

"Carla is another student living inside the same Civika world."

NOT:

"a standalone vector illustration of a generic schoolgirl."
```


### NPC 2 — Mang Roy (Jeepney Driver)

> File: `public/assets/LEVEL2/mang-roy.png` · DB name: "Mang Roy" (Mission 12 · Fare Formula, City Terminal) · current role: **Jeepney Driver** · map position: (59% X, 23% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A friendly Filipino jeepney driver in his 40s. He wears a sleeveless
vest over a faded shirt, a driver's cap, and has a kind, weathered face
with a confident smile.

CRITICAL — UNIQUE FACE (do not skip):
Man (45-50), weathered square face, tanned brown skin, deep-set dark eyes with crow's feet, thick gray-flecked brows, broad nose, gray mustache over a scruffy gray-flecked stubble beard, deep laugh-lines at the corners of his mouth, warm crinkly grin.

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
- a small fare guide and coins clearly visible

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
- props other than the a small fare guide and coins
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

"Mang Roy is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a jeepney driver."
```


### NPC 3 — Arki Maya (Architect)

> File: `public/assets/LEVEL2/arki-maya.png` · DB name: "Arki Maya" (Mission 13 · Building Shadow, City Plaza) · current role: **Architect** · map position: (81% X, 23% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A creative Filipina architect in her 30s. Her hair is in a tidy bun,
she wears a smart-casual blouse with a sketching pencil tucked behind
her ear and glasses pushed up on her head.

CRITICAL — UNIQUE FACE (do not skip):
Young woman (26-30), heart-shaped face, light-medium skin, almond-shaped hazel eyes with arched brows, sleek black hair in a low bun with two thin braids framing her temples, thin round wire glasses, no facial hair, small beauty mark just below her left eye, calm confident slight smile.

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
- a rolled blueprint and a measuring tape clearly visible

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
- props other than the a rolled blueprint and a measuring tape
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

"Arki Maya is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of an architect."
```


### NPC 4 — Student Leo (Online-Seller Student)

> File: `public/assets/LEVEL2/student-leo.png` · DB name: "Student Leo" (Mission 14 · Peso to Dollar, City Internet Café) · current role: **Online-Seller Student** · map position: (81% X, 46% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A cheerful Filipino student who sells items online. He wears a casual
graphic tee and jeans, has a backpack over one shoulder, and carries
a small parcel ready to ship.

CRITICAL — UNIQUE FACE (do not skip):
Teenage boy (15-16), narrow oblong face, medium skin, bright amber eyes with straight brows, spiky dark-brown hair with a single bleached streak in front, no glasses, no facial hair, faint baby-freckles across the bridge of his nose, playful half-grin.

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
- a smartphone and a small delivery parcel clearly visible

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
- props other than the a smartphone and a small delivery parcel
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

"Student Leo is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of an online seller."
```


### NPC 5 — Gina (Urban Planner)

> File: `public/assets/LEVEL2/gina.png` · DB name: "Gina" (Mission 15 · Park Path, City Park) · current role: **Urban Planner** · map position: (79% X, 67% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A thoughtful Filipina urban planner with rectangular glasses and a
city-government ID lanyard. She wears a smart blouse and a blazer,
holding a map of the city park.

CRITICAL — UNIQUE FACE (do not skip):
Woman (35-40), round face, medium-tan skin, warm onyx eyes with softly rounded brows, shoulder-length wavy black hair with wispy bangs, rectangular dark full-rim glasses, no facial hair, two small beauty marks in a diagonal line on her right cheek, warm open smile.

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
- a folded city map and a clipboard clearly visible

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
- props other than the a folded city map and a clipboard
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

"Gina is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of an urban planner."
```


### NPC 6 — Sir Tan (High-School Teacher)

> File: `public/assets/LEVEL2/sir-tan.png` · DB name: "Sir Tan" (Mission 16 · Grade Reverse, City High School) · current role: **High-School Teacher** · map position: (60% X, 90% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A kind Filipino high-school math teacher in his 30s. He wears a
buttoned checked polo and slacks, has neat hair and glasses, and
carries a gradebook under his arm.

CRITICAL — UNIQUE FACE (do not skip):
Man (38-42), rectangular face, fair skin, sharp dark eyes with low straight brows, neat short black hair with a precise side part, half-moon glasses on a thin gold bridge, fine trimmed mustache with no beard, a small scar through his right eyebrow, composed firm smile.

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
- a gradebook and a marker clearly visible

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
- props other than the a gradebook and a marker
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

"Sir Tan is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a teacher."
```


### NPC 7 — Manager Ben (Transit Operations Manager)

> File: `public/assets/LEVEL2/manager-ben.png` · DB name: "Manager Ben" (Mission 17 · Bus Route Map, City Bus Stop) · current role: **Transit Operations Manager** · map position: (50% X, 78% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A capable Filipino transit manager in his 40s, wearing a city transit
uniform polo and a transit badge. He holds a route plan of the city
bus network.

CRITICAL — UNIQUE FACE (do not skip):
Man (40-45), broad square-jawed face, light-olive skin, calm gray-blue eyes with thick heavy brows, balding at the crown with short dark hair at the sides, no glasses, clean-shaven, short salt-and-pepper sideburns, a dimpled chin, steady confident smile.

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
- a bus route map and a pocket radio clearly visible

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
- props other than the a bus route map and a pocket radio
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

"Manager Ben is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a transit manager."
```


### NPC 8 — Carlos (Sales Entrepreneur)

> File: `public/assets/LEVEL2/carlos.png` · DB name: "Carlos" (Mission 18 · Commission Check, City Mall) · current role: **Sales Entrepreneur** · map position: (19% X, 89% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A sharp young Filipino entrepreneur in a crisp polo and slacks. He
sells at the city mall and carries a sales ledger, looking friendly
and business-savvy.

CRITICAL — UNIQUE FACE (do not skip):
Man (28-33), oval face, deep tan skin, bright warm-brown eyes with medium-thick brows, thick wavy black hair slicked back with a neat widow's peak, no glasses, groomed short full beard with trimmed mustache, a small mole on his left cheekbone, cheerful toothy grin.

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
- a sales ledger and a pen clearly visible

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
- props other than the a sales ledger and a pen
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

"Carlos is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a salesman."
```


### NPC 9 — Coach Kim (Sports Coach)

> File: `public/assets/LEVEL2/coach-kim.png` · DB name: "Coach Kim" (Mission 19 · Sports Complex, City Sports Complex) · current role: **Sports Coach** · map position: (27% X, 27% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

An energetic Filipina sports coach in a workout track jacket and
whistle around her neck. Short hair, athletic build, holding a
badminton racket.

CRITICAL — UNIQUE FACE (do not skip):
Woman (32-36), athletic oval face, tan skin, lively dark eyes with strong defined brows, black hair in a tight high ponytail with a zigzag headband, no glasses, no facial hair, two faint dimples that deepen when she smiles, energetic wide grin.

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
- a badminton racket and a whistle clearly visible

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
- props other than the a badminton racket and a whistle
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

"Coach Kim is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a sports coach."
```


### NPC 10 — Principal Santos (School Principal)

> File: `public/assets/LEVEL2/principal-santos.png` · DB name: "Principal Santos" (Mission 20 · Citywide Exam Review, City School) · current role: **School Principal** · map position: (50% X, 56% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A distinguished Filipino school principal with graying hair, wearing a
formal barong with an ID badge. He has a warm, welcoming expression
and carries a review binder.

CRITICAL — UNIQUE FACE (do not skip):
Man (50-55), dignified round face, medium-brown skin, kind brown eyes with gently arched brows, short gray-flecked black hair neatly combed with a side part, thin clear-rimmed glasses, neat gray mustache without a beard, small age-moles scattered on his left cheek, warm grandfatherly smile.

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
- a binder and a school ID clearly visible

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
- props other than the a binder and a school ID
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

"Principal Santos is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a principal."
```


---

## 🔍 Audit Notes — City (Level 2)

**Level map (open world):**
| Asset | File | Status |
|---|---|---|
| City open-world background | `public/assets/city-background.png` | ✅ exists — regenerate to taste with the prompt above |

**Mission NPCs — exact keys the game looks up (mapData 1:1):**
| # | DB NPC name | Image file it loads | Status |
|---|---|---|---|
| 1 | Carla | `assets/LEVEL2/carla.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 2 | Mang Roy | `assets/LEVEL2/mang-roy.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 3 | Arki Maya | `assets/LEVEL2/arki-maya.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 4 | Student Leo | `assets/LEVEL2/student-leo.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 5 | Gina | `assets/LEVEL2/gina.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 6 | Sir Tan | `assets/LEVEL2/sir-tan.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 7 | Manager Ben | `assets/LEVEL2/manager-ben.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 8 | Carlos | `assets/LEVEL2/carlos.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 9 | Coach Kim | `assets/LEVEL2/coach-kim.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 10 | Principal Santos | `assets/LEVEL2/principal-santos.png` | ⚠️ generate (currently falls back to `student-front-1`) |

**⚠️ Code wiring — read this before/while generating:**

1. **The 4 non-barangay maps currently fall back to `student-front-1` for EVERY NPC.** In `CityMap.ts`, `getNPCTheme().imageMap` is keyed by *titles* (e.g. "Entrepreneur Carlos"), but `mapData` mission NPCs use short names (e.g. "Carlos") — so the lookup `npcImageMap[location.npc]` misses and every NPC renders as the default boy sprite. BarangayMap was already fixed to key by mission short names; the other four maps still need that same fix (they'll show the real sprites the moment the imageMap keys match the mission NPC names).
2. **`imageMap.value → imageFileMap.value → file` chain:** the base class (`OpenWorldMapScene.createNPCs`) loads `assets/LEVEL{n}/<imageFileMap[img]>`. If any value in that chain is missing/mismatched, the NPC silently falls back. Keep the filename EXACTLY equal to the map's key value and save under the right LEVEL folder.
3. Existing files in `LEVEL2/` below are leftovers from the earlier title-based batch — fine to reuse as references, but they will NOT display until the `imageMap` fix above lands (and their filenames must match the city imageFileMap values).

**Existing `LEVEL2/` files on disk (for reference):** accountant-lisa.png, architect-maya.png, city-planner-tom.png, engineer-sarah.png, entrepreneur-carlos.png, logistics-manager-ben.png, sales-director-kim.png, transit-manager-roy.png, transport-chief-mike.png, urban-planner-gina.png, removebg/accountant-lisa.png, Gemini_Generated_Image_2f5hb82f5hb82f5h-removebg-preview.png

**Positioning note:** NPCs auto-scale to a target on-screen height in the base class + BarangayMap: `setScale(targetHeight / npc.height)` with `targetHeight = max(player.displayHeight, 80) × 1.35` (~106–119px on screen). This is resolution-independent, so source images can be any pixel size — no need to match a specific width/height. Just keep the character full-body and centered in the frame.
