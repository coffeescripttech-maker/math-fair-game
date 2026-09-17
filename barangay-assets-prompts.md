# Barangay Level — Asset Generation Prompts (ChatGPT-ready)

Copy each prompt into ChatGPT (or your image generator) as-is. All images must be **text-free**, **no watermarks**, and follow the **same art style** as the rest of Civika (flat vector, kid-friendly cartoon, thick clean outlines, bright saturated colors, soft shading).

---

## 🗺️ 1. Barangay Background Map (the whole level's world)

> **Target file:** `public/assets/barangay-background.png` (square 1:1, e.g. 1024×1024)
>
> **How the game uses it:** this single image IS the entire playable map. The player, 10 NPCs, and collectibles are all positioned by percentage coordinates on top of it. Landmark placement is non-negotiable (see the layout below). The image itself must NOT contain any people or characters.

**Prompt:**

```
Create a top-down 2D game map for a Philippine barangay (neighborhood),
square 1:1 aspect ratio, size 1024x1024 pixels.

Art style: flat vector cartoon, clean thick outlines, bright saturated
colors, kid-friendly, soft shading, NO text, NO labels, NO letters,
NO numbers, NO watermark. Detailed but readable.

This is a walkable map with dirt/paved paths connecting the landmarks.
The whole map is ground (grass/dirt/asphalt), not water, so a character
can walk everywhere along the paths.

Place these landmarks EXACTLY at these percentage positions on the map
(X = left-to-right, Y = top-to-bottom). Show each landmark clearly,
with a small open area of flat ground in front of it (NPCs stand there):

1. BARANGAY HALL: small wooden community hall with a Philippine flag
   banner and a "pop-up" counter. Position ~29% X, ~21% Y.
2. BARANGAY SARI-SARI STORE: tiny corner store, shelves with goods,
   a signboard stall facade. Position ~50% X, ~22% Y.
3. BARANGAY SCHOOL: one-story schoolhouse with a chalkboard porch,
   books and schoolbags around. Position ~89% X, ~14% Y (top-right).
4. BARANGAY GARDEN: a small vegetable garden plot with rows of plants
   and a wooden fence. Position ~11% X, ~13% Y (top-left).
5. BARANGAY CHAPEL: a small chapel with a cross on the roof and open
   wooden doors. Position ~14% X, ~15% Y (top-left, near the garden).
6. BARANGAY STORE (market stall): an open-air market stall with fruit
   and goods displayed on a table. Position ~10% X, ~67% Y (left side).
7. BARANGAY BASKETBALL COURT: a small basketball court with hoop,
   painted lines, and cement flooring. Position ~66% X, ~77% Y.
8. BARANGAY HOME (Danny's house): a simple Filipino house (bahay kubo
   style) with a gate and a small yard. Position ~72% X, ~42% Y.
9. STREET AREA: a wider dirt/asphalt street with a few lamp posts and
   tricycle parked. Position ~8% X, ~27% Y (along the left edge).

Also scatter these collectible-touch spots across open ground (no
building needed, small sparkle/shiny spots are fine): ~40/31, ~56/39,
~40/48, ~35/65, ~52/73, ~60/82, ~72/92, ~92/73.

Make paths connect everything so it reads as one lived-in neighborhood.
```

---

## 👨‍🏫 2. NPC Character Images

> **Target folder:** `public/assets/LEVEL1/`
>
> **Technical rules for every NPC:**
>
> - **Front-facing, full-body character**, centered in frame, looking at the viewer.
> - **Solid transparent background** (PNG, cut-out, NO background scene).
> - **One person only, standing naturally**, feet near the bottom edge of the image.
> - **Resolution:** roughly **190–215 px wide × 240–300 px tall** (portrait). Matches the current NPC art so the in-game 0.3 scale keeps everyone consistent.
> - **No text, no watermark, no logo.**
> - Same flat cartoon style as the map. Filipino representation.

---

### NPC 1 — Miguel (Coach Miguel)

> File: `public/assets/LEVEL1/coach-miguel.png` · DB name: "Miguel" (mission 1, Basketball Court) · for a current example, he appears as **Basketball Coach**

**Prompt:**

````
### **NPC 1 — Miguel (Coach Miguel)**

> File: `public/assets/LEVEL1/coach-miguel.png` · DB name: "Miguel" (mission 1, Basketball Court) · current role: **Basketball Coach**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A friendly young Filipino man in his 20s who works as a basketball coach.
He has short, neat black hair and a warm, confident, approachable smile.

He wears a simple sporty basketball coach outfit:
a basketball jersey or athletic shirt, basketball shorts, and athletic
shoes. A whistle hangs naturally around his neck, and he holds a basketball
under one arm.

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

The NPC should look like he was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- basketball tucked naturally under one arm
- whistle clearly visible

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
- basketball court
- buildings
- furniture
- props other than the basketball and whistle
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

"Coach Miguel is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a basketball coach."
````

### **NPC 2 — Aling Maria (Store Owner)**

> File: `public/assets/LEVEL1/store-owner-aling-maria.png` · DB name: "Aling Maria" (mission 2, Sari-Sari Store) · current role: **Sari-Sari Store Owner**

**Prompt:**

````
### **NPC 2 — Aling Maria (Store Owner)**

> File: `public/assets/LEVEL1/store-owner-aling-maria.png` · DB name: "Aling Maria" (mission 2, Sari-Sari Store) · current role: **Sari-Sari Store Owner**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A warm, friendly Filipina woman in her 50s who runs the neighborhood
sari-sari store. She has shoulder-length black hair pulled back neatly
and a kind, smiling face.

She wears a simple flower-print blouse with an apron over it and a long
skirt, with comfortable sandals. A pencil tucks behind her ear, and she
holds a small notebook with a pencil in one hand.

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

The NPC should look like she was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- notebook with pencil clearly visible in her hand

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
- sari-sari store
- store shelves
- goods and counters
- buildings
- furniture
- props other than the notebook and pencil
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

"Aling Maria is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a sari-sari store owner."
````

### **NPC 3 — Ben (Student)**

> File: `public/assets/LEVEL1/high-school-student.png` · DB name: "Ben" (mission 3, Barangay Street) · current role: **High School Student**

> ⚠️ Save with this exact filename (`high-school-student.png`, no space) — the code looks it up as `high-school-student`.

**Prompt:**

````
### **NPC 3 — Ben (Student)**

> File: `public/assets/LEVEL1/high-school-student.png` · DB name: "Ben" (mission 3, Barangay Street) · current role: **High School Student**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A cheerful Filipino high school student, around 15 years old, who is
always eager to learn. He has short black hair and a big friendly smile.

He wears the Philippine public school uniform: a white polo shirt and
navy blue pants. He carries a backpack slung over one shoulder and holds
a rolled map (or notebook) in one hand.

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

The NPC should look like he was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- backpack clearly visible slung over one shoulder
- rolled map (or notebook) held in one hand

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
- school building
- classroom
- desks or chairs
- buildings
- furniture
- props other than the backpack and rolled map
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

"Ben is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a high school student."
````

### **NPC 4 — Ana (Student Leader)**

> File: `public/assets/LEVEL1/student-leader-ana.png` · DB name: "Ana" (mission 4, School) · current role: **Student Leader**

**Prompt:**

````
### **NPC 4 — Ana (Student Leader)**

> File: `public/assets/LEVEL1/student-leader-ana.png` · DB name: "Ana" (mission 4, School) · current role: **Student Leader**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A confident Filipino teenage girl, around 16 years old, who is the
school's student leader. She has black hair in a neat ponytail and a
bright, proud smile.

She wears the Philippine public school uniform: a white blouse and a
navy blue skirt, with a red student-leader badge pinned on her chest.
She holds a clipboard with papers in one hand.

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

The NPC should look like she was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- clipboard with papers clearly visible in her hand
- red student-leader badge clearly visible on her chest

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
- school building
- hallways
- classrooms
- crowd of students
- buildings
- furniture
- props other than the clipboard, papers, and badge
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

"Ana is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a student leader."
````

### **NPC 5 — Lola Rosa (Parent / Gardener Grandma)**

> File: `public/assets/LEVEL1/parent-rosa.png` · DB name: "Lola Rosa" (mission 5, Garden) · current role: **Grandma Gardener**

**Prompt:**

````
### **NPC 5 — Lola Rosa (Parent / Gardener Grandma)**

> File: `public/assets/LEVEL1/parent-rosa.png` · DB name: "Lola Rosa" (mission 5, Garden) · current role: **Grandma Gardener**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A warm, grandmotherly Filipina in her 60s who tends her vegetable
garden every morning. She has gray hair in a neat bun and a kind,
gentle smile.

She wears a patterned baro't saya-style dress with a headband or scarf
on her hair. She holds a small trowel (garden spade) in one hand and a
tiny potted seedling in the other.

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

The NPC should look like she was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- kind gentle expression
- small trowel clearly visible in one hand
- tiny potted seedling clearly visible in the other hand

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
- garden
- plants
- soil
- vegetable plots
- buildings
- furniture
- props other than the trowel and potted seedling
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

"Lola Rosa is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a grandmother gardener."
````

### **NPC 6 — Mang Pedro (Vendor)**

> File: `public/assets/LEVEL1/vendor-mang-pedro.png` · DB name: "Mang Pedro" (mission 6, Barangay Store) · current role: **Market Vendor**

**Prompt:**

````
### **NPC 6 — Mang Pedro (Vendor)**

> File: `public/assets/LEVEL1/vendor-mang-pedro.png` · DB name: "Mang Pedro" (mission 6, Barangay Store) · current role: **Market Vendor**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A friendly elderly Filipino man in his 50s who runs a market stall in
the barangay. He has short graying hair, a slight stubble, and a warm
smile, with a cap on his head.

He wears a short-sleeved shirt with an apron over it and a cap on his
head. He holds a weighing scale with a few fruits on it in one hand.

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

The NPC should look like he was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- warm smile
- cap clearly visible on his head
- weighing scale with a few fruits clearly visible in his hand

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
- market stall
- fruit stands
- tables of goods
- buildings
- furniture
- props other than the weighing scale and fruits
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

"Mang Pedro is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a market vendor."
````

### **NPC 7 — Kuya Noel (Gardener / Handyman)**

> File: `public/assets/LEVEL1/gardener-noel.png` · DB name: "Kuya Noel" (mission 7, Chapel) · current role: **Gardener / Handyman**

> ⚠️ Save with this exact filename (`gardener-noel.png`, no `-removebg-preview` suffix) — the code looks it up as `gardener-noel`.

**Prompt:**

````
### **NPC 7 — Kuya Noel (Gardener / Handyman)**

> File: `public/assets/LEVEL1/gardener-noel.png` · DB name: "Kuya Noel" (mission 7, Chapel) · current role: **Gardener / Handyman**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A friendly Filipino man in his 30s who works as the barangay's gardener
and handyman. He has short black hair and an easygoing smile.

He wears an orange work vest over a t-shirt and jeans, with work boots.
He holds a folded ladder in one hand and garden shears in the other.

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

The NPC should look like he was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- easygoing smile
- folded ladder clearly visible in one hand
- garden shears clearly visible in the other hand

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
- garden
- chapel
- ladders leaning on walls
- buildings
- furniture
- props other than the folded ladder and garden shears
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

"Kuya Noel is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a garden handyman."
````

### **NPC 8 — Teacher Cruz (Math Teacher)**

> File: `public/assets/LEVEL1/math-teacher-mrs-cruz.png` · DB name: "Teacher Cruz" (mission 8, School) · current role: **Math Teacher**

**Prompt:**

````
### **NPC 8 — Teacher Cruz (Math Teacher)**

> File: `public/assets/LEVEL1/math-teacher-mrs-cruz.png` · DB name: "Teacher Cruz" (mission 8, School) · current role: **Math Teacher**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A kind Filipina math teacher in her 40s who teaches at the barangay
school. She has neat hair, glasses on her nose, and a warm,
encouraging smile.

She wears a smart blouse with a pencil skirt. She holds a chalkboard
pointer / ruler in one hand and a stack of papers in the other.

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

The NPC should look like she was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- warm encouraging smile
- glasses clearly visible on her nose
- chalkboard pointer / ruler clearly visible in one hand
- stack of papers clearly visible in the other hand

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
- classroom
- chalkboard
- desks
- school building
- furniture
- props other than the chalkboard pointer / ruler and stack of papers
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

"Teacher Cruz is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a math teacher."
````

### **NPC 9 — Danny (Shop Owner / Handyman at home)**

> File: `public/assets/LEVEL1/shop-owner-danny.png` · DB name: "Danny" (mission 9, Barangay Home) · current role: **Shop / Hardware Owner**

**Prompt:**

````
### **NPC 9 — Danny (Shop Owner / Handyman at home)**

> File: `public/assets/LEVEL1/shop-owner-danny.png` · DB name: "Danny" (mission 9, Barangay Home) · current role: **Shop / Hardware Owner**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A friendly Filipino man in his 40s who owns the barangay's hardware /
general store. He has short black hair with a slight beard and a
helpful smile.

He wears a polo shirt with rolled-up sleeves and a tool belt around
his waist. He holds a coil of wire (or measuring tape) in his hands.

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

The NPC should look like he was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- helpful smile
- tool belt clearly visible around his waist
- coil of wire (or measuring tape) clearly visible in his hands

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
- hardware store
- shelves
- bags of cement
- home interior
- buildings
- furniture
- props other than the tool belt and coil of wire / measuring tape
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

"Danny is another character living inside the same Tutor Town world."

NOT:

"A standalone vector illustration of a hardware store owner."
````

### **NPC 10 — Barangay Captain's Daughter (Final Mission, Barangay Hall)**

> File: `public/assets/LEVEL1/barangay-captains-daughter.png` (**NEW dedicated asset**) · DB name: "Barangay Captain's Daughter" (mission 10, Barangay Hall) · current role: **Quiz Bee Organizer / Student**

> ⚠️ Save as `barangay-captains-daughter.png` — do **NOT** overwrite `barangay-captain.png` (the captain is a separate character used by the secret quest). Right now the code loads `barangay-captain.png` as a temporary stand-in so mission 10 already works; once this new asset exists, tell the dev and the map's `npcImageMap` will be pointed at `barangay-captains-daughter`.

**Prompt:**

````
### **NPC 10 — Barangay Captain's Daughter (Final Mission, Barangay Hall)**

> File: `public/assets/LEVEL1/barangay-captains-daughter.png` (**NEW dedicated asset**) · DB name: "Barangay Captain's Daughter" (mission 10, Barangay Hall) · current role: **Quiz Bee Organizer / Student**

**Prompt:**

```text
Full-body retro pixel-art cartoon character, front-facing, standing upright
in the center of the frame, looking directly at the viewer, on a completely
transparent background.

A bright teenage Filipina girl around 17 years old, the barangay
captain's daughter, who is organizing a quiz bee at the barangay hall.
She has black hair in a low ponytail and a big, confident smile.

She wears a neat white blouse and a skirt, with a small badge on her
chest. She holds a megaphone in one hand and a stack of quiz papers in
the other.

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

The NPC should look like she was created by the SAME artist for the SAME
Tutor Town game as the student characters.

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
- big confident smile
- small badge clearly visible on her chest
- megaphone clearly visible in one hand
- stack of quiz papers clearly visible in the other hand

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
- barangay hall
- stage
- quiz bee set / banners
- audience
- buildings
- furniture
- props other than the megaphone, badge and stack of quiz papers
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

"The barangay captain's daughter is another character living inside the
same Tutor Town world."

NOT:

"A standalone vector illustration of a quiz bee organizer."
````

---

## 🔍 Audit Notes (what the game actually loads)

**Level map (open world):**
| Asset | File | Status |
|---|---|---|
| Barangay open-world background | `public/assets/barangay-background.png` (1024×1024) | ✅ exists — regenerate with prompts above if you want a fresh one |

**Mission NPCs — `npcImageMap` in `BarangayMap.ts:createNPCs()` (10 entries, exact keys):**
| # | DB NPC name | Image key loaded | File on disk | Status |
|---|---|---|---|---|
| 1 | Miguel (Coach) | `coach-miguel` | `coach-miguel.png` | ✅ exists |
| 2 | Aling Maria | `store-owner-aling-maria` | `store-owner-aling-maria.png` | ✅ exists |
| 3 | Ben (High-school student) | `high-school-student` | `high-school student.png` (⚠️ **space, key mismatch**) | ⚠️ fix filename |
| 4 | Ana (Student Leader) | `student-leader-ana` | `student-leader-ana.png` | ✅ exists |
| 5 | Lola Rosa (Parent) | `parent-rosa` | `parent-rosa.png` | ✅ exists |
| 6 | Mang Pedro (Vendor) | `vendor-mang-pedro` | `vendor-mang-pedro.png` | ✅ exists |
| 7 | Kuya Noel (Gardener) | `gardener-noel` | `gardener-noel-removebg-preview.png` (⚠️ **key mismatch**) | ⚠️ fix filename |
| 8 | Teacher Cruz (Math) | `math-teacher-mrs-cruz` | `math-teacher-mrs-cruz.png` | ✅ exists |
| 9 | Danny (Shop Owner) | `shop-owner-danny` | `shop-owner-danny.png` | ✅ exists |
| 10 | Barangay Captain's Daughter | `barangay-captain` (shared!) | `barangay-captain.png` | ⚠️ **needs its own new asset** |

**Two filename mismatches cause silent falls-back (`student-front-1`):** `high-school student.png` (space) and `gardener-noel-removebg-preview.png` (suffix). Fix = save new generations with the exact key filenames above (`high-school-student.png`, `gardener-noel.png`), or rename the two files.

**✔ npcImageMap key bug — FIXED in code (BarangayMap.ts:createNPCsAfterLoad):** the map previously looked up NPCs by display names ("Coach Miguel", "Store Owner Aling Maria", …) which matched **none** of the mission NPC names, so all 10 NPCs silently fell back to `student-front-1`. The map now uses the mission NPC names exactly ("Miguel", "Aling Maria", …, "Danny"); only "Barangay Captain's Daughter" still shares `barangay-captain` as a temporary stand-in until its dedicated asset is generated.

**Other LEVEL1 files (secret quest / extra NPCs, not part of the 10-mission map — keep them):** `barangay-health-worker.png`, `barangay-secretary.png`, `barangay-tanod.png`, `comelec-volunteer.png`, `construction-foreman.png`, `elderly-resident.png`, `librarian.png`, `mediation-officer.png`, `baker-tess.png`, `banker-mr-santos.png`.

**Positioning note:** NPCs auto-scale to a target on-screen height in `BarangayMap.ts` (`createNPCsAfterLoad`): `setScale(targetHeight / npc.height)` with `targetHeight = Math.max(player.displayHeight, 80) × 1.35` (~106–119px on screen). This is resolution-independent, so source images can be any pixel size (1024×1024 up to 2000px+) — no need to match a specific width/height. Just keep the character full-body and centered in the frame.
