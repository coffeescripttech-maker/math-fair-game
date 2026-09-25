# Province Level — Asset Generation Prompts (ChatGPT-ready)

Copy each prompt into ChatGPT (or your image generator) as-is. All images must be **text-free**, **no watermarks**, and follow the **same art style** as the rest of Civika (flat vector, kid-friendly cartoon, thick clean outlines, bright saturated colors, soft shading).

---

## 🗺️ 1. Province Background Map (the whole level's world)

> **Target file:** `public/assets/province-background.png` (square 1:1, e.g. 1024×1024)
>
> **How the game uses it:** this single image IS the entire playable map. The player, the 10 province NPCs, and collectibles are all positioned by percentage coordinates on top of it. Landmark placement is non-negotiable (see the layout below). The image itself must NOT contain any people or characters.

**Prompt:**

```
Create a top-down 2D game map of a Philippine PROVINCE,
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

Make paths connect everything so it reads as one lived-in province.
```

---

## 👨‍🏫 2. NPC Character Images — Province (Level 3)

> **Target folder:** `public/assets/LEVEL3/` **— exactly** these file names: the game loads `assets/LEVEL3/<filename>` and falls back to `student-front-1` if the file is missing or misnamed.
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


### NPC 1 — Sarah (Scholarship Applicant)

> File: `public/assets/LEVEL3/sarah.png` · DB name: "Sarah" (Mission 21 · Scholarship Qualifier, Provincial Capitol) · current role: **Scholarship Applicant** · map position: (19% X, 46% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A determined Filipina provincial scholarship applicant in her late
teens. She wears a neat blouse and skirt, rectangular glasses, and
carries a folder of application papers.

CRITICAL — UNIQUE FACE (do not skip):
Young woman (24-28), heart-shaped face, medium skin, sparkling brown eyes with neatly arched brows, long straight black hair parted down the middle falling past her shoulders, no glasses, small teardrop silver earrings, a dimple in her left cheek, bright cheerful smile.

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
- a folder of scholarship papers clearly visible

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
- props other than the a folder of scholarship papers
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

"Sarah is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a scholarship student."
```


### NPC 2 — Mang Tomas (Farmer)

> File: `public/assets/LEVEL3/mang-tomas.png` · DB name: "Mang Tomas" (Mission 22 · Farm Plot Diagonal, Provincial Farm) · current role: **Farmer** · map position: (59% X, 23% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A rugged Filipino farmer in his 50s wearing a wide straw hat, rolled-up
sleeves and farm pants. He has a warm smile and sun-weathered skin.

CRITICAL — UNIQUE FACE (do not skip):
Elderly man (55-60), weathered angular face, deep sun-tanned skin, kind deep-set eyes under bushy white eyebrows, full thick white hair, bushy white mustache over a full white beard, a gap between his two front teeth, gentle warm smile with deep eye-creases.

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
- a measuring tape and a rice stalk clearly visible

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
- props other than the a measuring tape and a rice stalk
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

"Mang Tomas is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a farmer."
```


### NPC 3 — Ate Liza (Agricultural Technician)

> File: `public/assets/LEVEL3/ate-liza.png` · DB name: "Ate Liza" (Mission 23 · Fertilizer Mix, Provincial Agriculture Office) · current role: **Agricultural Technician** · map position: (81% X, 23% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A practical Filipina agricultural technician in khaki work clothes
and a cap. She has a clipboard in hand and a sample bag over her
shoulder.

CRITICAL — UNIQUE FACE (do not skip):
Woman (40-45), oval face, light skin, gentle brown eyes with softly curved brows, dark hair with a reddish-brown tint in a loose low bun, thin gold-rimmed round glasses, no facial hair, a small mole at the corner of her right eye, kind knowing smile.

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
- a clipboard and a fertilizer sample bag clearly visible

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
- props other than the a clipboard and a fertilizer sample bag
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

"Ate Liza is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of an agri technician."
```


### NPC 4 — Engineer Pat (Irrigation Engineer)

> File: `public/assets/LEVEL3/engineer-pat.png` · DB name: "Engineer Pat" (Mission 24 · Irrigation Pipe, Irrigation Site) · current role: **Irrigation Engineer** · map position: (81% X, 46% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A focused Filipino civil engineer in a yellow hard hat and safety
vest, holding rolled pipe plans. Practical and no-nonsense.

CRITICAL — UNIQUE FACE (do not skip):
Man (30-35), diamond-shaped face, medium skin, attentive greenish-brown eyes with straight brows, short black hair with a slightly uneven cowlick at the front, no glasses, a thin neat goatee without a mustache, a tiny scar on his left jaw, focused subtle smile.

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
- a hard hat and pipe blueprint clearly visible

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
- props other than the a hard hat and pipe blueprint
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

"Engineer Pat is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a civil engineer."
```


### NPC 5 — Budget Officer Amy (Provincial Budget Officer)

> File: `public/assets/LEVEL3/budget-officer-amy.png` · DB name: "Budget Officer Amy" (Mission 25 · Budget Scaling, Capitol Annex (Budget Office)) · current role: **Provincial Budget Officer** · map position: (79% X, 67% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A precise Filipina budget officer in office attire and a lanyard,
with her hair in a low bun. She carries a thick budget ledger.

CRITICAL — UNIQUE FACE (do not skip):
Woman (35-40), round face with a soft jawline, fair skin, alert dark eyes with sleek slim brows, straight black hair in a sharp jaw-length bob with blunt side-swept bangs, thick black rectangular nerd-chic glasses, no facial hair, a small beauty mark beside her right nostril, composed precise smile.

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
- a budget ledger and a calculator clearly visible

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
- props other than the a budget ledger and a calculator
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

"Budget Officer Amy is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a budget officer."
```


### NPC 6 — Nurse Joy (Rural Health Nurse)

> File: `public/assets/LEVEL3/nurse-joy.png` · DB name: "Nurse Joy" (Mission 26 · Dosage Formula, Provincial Health Office) · current role: **Rural Health Nurse** · map position: (60% X, 90% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A caring Filipina nurse in a white uniform with a small cross on
the collar, wearing a stethoscope around her neck. Gentle smile.

CRITICAL — UNIQUE FACE (do not skip):
Young woman (25-30), soft oval face, light-medium skin, warm honey-brown eyes with gently curved brows, black hair in a practical low braid with a few escaping wisps, no glasses, round pearl stud earrings, a faint scatter of freckles on both cheeks, gentle caring smile.

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
- a stethoscope and a medication pack clearly visible

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
- props other than the a stethoscope and a medication pack
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

"Nurse Joy is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a nurse."
```


### NPC 7 — Foreman Bob (Road Foreman)

> File: `public/assets/LEVEL3/foreman-bob.png` · DB name: "Foreman Bob" (Mission 27 · Road Slope, Provincial Hill Road) · current role: **Road Foreman** · map position: (50% X, 78% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A sturdy Filipino road foreman in an orange safety vest and hard
hat, holding a roll of road plans and a measuring wheel.

CRITICAL — UNIQUE FACE (do not skip):
Man (45-50), rugged square face, weather-beaten brown skin, intense brown eyes under heavy grizzled brows, balding with gray stubble around the sides and back, no glasses, thick gray mustache over a short cropped gray beard, a scar cutting through his left eyebrow, sturdy workman's smile.

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
- road plans and a measuring wheel clearly visible

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
- props other than the road plans and a measuring wheel
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

"Foreman Bob is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a road foreman."
```


### NPC 8 — Ma'am Elena (Provincial Agronomist)

> File: `public/assets/LEVEL3/maam-elena.png` · DB name: "Ma'am Elena" (Mission 28 · Yield Reverse, Provincial Agriculture Field) · current role: **Provincial Agronomist** · map position: (19% X, 89% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A knowledgeable Filipina agronomist in a sun hat and light work
shirt, holding a small tray of grain samples.

CRITICAL — UNIQUE FACE (do not skip):
Woman (48-53), kind oval face, medium-tan skin, soft brown eyes with warm softly-arched brows, silver-streaked dark hair tied in a low loose ponytail, half-frame reading glasses on a chain, no facial hair, laugh lines fanning from both eye corners, calm motherly smile.

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
- a tablet and a tray of grain samples clearly visible

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
- props other than the a tablet and a tray of grain samples
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

"Ma'am Elena is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of an agronomist."
```


### NPC 9 — Sir Dan (Water Utility Engineer)

> File: `public/assets/LEVEL3/sir-dan.png` · DB name: "Sir Dan" (Mission 29 · Water Tank Volume, Provincial Water District) · current role: **Water Utility Engineer** · map position: (27% X, 27% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A capable Filipino water engineer in a polo shirt with a water
district cap, holding a pipe fitting and a water-system blueprint.

CRITICAL — UNIQUE FACE (do not skip):
Man (42-47), lean rectangular face, fair skin with light freckles across the nose, sharp watchful brown eyes with slightly hooded lids, short black hair graying heavily at the temples, no glasses, trimmed mustache over a short neat full beard, a thin scar on the left corner of his mouth, quiet assured smile.

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
- a pipe fitting and a water-system blueprint clearly visible

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
- props other than the a pipe fitting and a water-system blueprint
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

"Sir Dan is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a water engineer."
```


### NPC 10 — Governor's Aide (Provincial Governor's Aide)

> File: `public/assets/LEVEL3/governors-aide.png` · DB name: "Governor's Aide" (Mission 30 · Provincial Scholarship Final, Capitol Hall) · current role: **Provincial Governor's Aide** · map position: (50% X, 56% Y)

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A polished young Filipino professional aide in formal office wear and
a capitol ID, carrying a scholarship program folder and a phone.

CRITICAL — UNIQUE FACE (do not skip):
Young man (27-32), oval face, medium-brown skin, bright keen eyes with well-groomed brows, neatly styled black hair with a sharp side part and a slight sheen, thin wire-frame glasses, clean-shaven with a very light mustache shadow, a small mole above his left eyebrow, polished polite smile.

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
- a program folder and a smartphone clearly visible

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
- props other than the a program folder and a smartphone
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

"The Governor's Aide is another character living inside the same Civika world."

NOT:

"a standalone vector illustration of a government aide."
```


---

## 🔍 Audit Notes — Province (Level 3)

**Level map (open world):**
| Asset | File | Status |
|---|---|---|
| Province open-world background | `public/assets/province-background.png` | ✅ exists — regenerate to taste with the prompt above |

**Mission NPCs — exact keys the game looks up (mapData 1:1):**
| # | DB NPC name | Image file it loads | Status |
|---|---|---|---|
| 1 | Sarah | `assets/LEVEL3/sarah.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 2 | Mang Tomas | `assets/LEVEL3/mang-tomas.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 3 | Ate Liza | `assets/LEVEL3/ate-liza.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 4 | Engineer Pat | `assets/LEVEL3/engineer-pat.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 5 | Budget Officer Amy | `assets/LEVEL3/budget-officer-amy.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 6 | Nurse Joy | `assets/LEVEL3/nurse-joy.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 7 | Foreman Bob | `assets/LEVEL3/foreman-bob.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 8 | Ma'am Elena | `assets/LEVEL3/maam-elena.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 9 | Sir Dan | `assets/LEVEL3/sir-dan.png` | ⚠️ generate (currently falls back to `student-front-1`) |
| 10 | Governor's Aide | `assets/LEVEL3/governors-aide.png` | ⚠️ generate (currently falls back to `student-front-1`) |

**⚠️ Code wiring — read this before/while generating:**

1. **The 4 non-barangay maps currently fall back to `student-front-1` for EVERY NPC.** In `ProvinceMap.ts`, `getNPCTheme().imageMap` is keyed by *titles* (e.g. "Provincial Budget Officer"), but `mapData` mission NPCs use short names (e.g. "Budget Officer Amy") — so the lookup `npcImageMap[location.npc]` misses and every NPC renders as the default boy sprite. BarangayMap was already fixed to key by mission short names; the other four maps still need that same fix (they'll show the real sprites the moment the imageMap keys match the mission NPC names).
2. **`imageMap.value → imageFileMap.value → file` chain:** the base class (`OpenWorldMapScene.createNPCs`) loads `assets/LEVEL{n}/<imageFileMap[img]>`. If any value in that chain is missing/mismatched, the NPC silently falls back. Keep the filename EXACTLY equal to the map's key value and save under the right LEVEL folder.
3. Existing files in `LEVEL3/` below are leftovers from the earlier title-based batch — fine to reuse as references, but they will NOT display until the `imageMap` fix above lands (and their filenames must match the province imageFileMap values).

**Existing `LEVEL3/` files on disk (for reference):** provincial-budget-director.png, provincial-economist.png, provincial-engineer.png, financial-analyst.png, policy-coordinator.png, operations-director.png, land-use-planner.png, resource-manager.png, investment-analyst.png, strategic-planner.png

**Positioning note:** NPCs auto-scale to a target on-screen height in the base class + BarangayMap: `setScale(targetHeight / npc.height)` with `targetHeight = max(player.displayHeight, 80) × 1.35` (~106–119px on screen). This is resolution-independent, so source images can be any pixel size — no need to match a specific width/height. Just keep the character full-body and centered in the frame.
