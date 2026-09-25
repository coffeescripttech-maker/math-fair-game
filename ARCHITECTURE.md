# MathTuto Game Architecture

## Clear Separation of Concerns

### 🎮 **Phaser Canvas (Game World)**

-   **Location**: Inside `#game-container` div
-   **Styling**: Native Phaser styling (sprites, text, custom art)
-   **Responsibilities**:
    -   Game world rendering (tiles, sprites, animations)
    -   Player movement and collision detection
    -   NPC interactions and dialogue
    -   Game logic and state management
    -   Character creation interface
    -   Mission and quiz systems

### 🎨 **React Overlay UI (Modern Interface)**

-   **Location**: Positioned above Phaser canvas with `z-index: 10`
-   **Styling**: Tailwind CSS with modern design
-   **Responsibilities**:
    -   HUD display (player stats, badges, coins)
    -   Menu systems (pause, inventory, quest log)
    -   Modern UI components and interactions
    -   Keyboard shortcuts (ESC, I, Q)
    -   Data synchronization with Phaser

## Visual Layout

```
┌─────────────────────────────────────────────────────────┐
│                    React App Container                   │
│  ┌─────────────────────────────────────────────────┐    │
│  │              React Overlay UI                   │    │
│  │  ┌─────────────┐              ┌─────────────┐   │    │
│  │  │    HUD      │              │ Quick Actions│   │    │
│  │  │ (Top Left)  │              │ (Top Right) │   │    │
│  │  └─────────────┘              └─────────────┘   │    │
│  │                                               │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │         Modal Overlays                  │   │    │
│  │  │  (Pause Menu, Quest Log, Inventory)    │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │            Phaser Game Canvas                   │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │        Game World (1024x768)           │   │    │
│  │  │  - Tile-based map                      │   │    │
│  │  │  - Player sprites                      │   │    │
│  │  │  - NPCs and interactions               │   │    │
│  │  │  - Phaser native styling               │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Key Features

### ✅ **Phaser Canvas**

-   Centered on screen with golden border
-   Native Phaser styling for all game elements
-   Tile-based map with collision detection
-   Pokémon-style sprites and animations
-   Character creation with color selection
-   Mission and quiz systems

### ✅ **React Overlays**

-   Modern glassmorphism design
-   Backdrop blur effects
-   Responsive and interactive
-   Real-time data synchronization
-   Keyboard shortcuts
-   Professional UI/UX

## Data Flow

1. **Phaser** manages game state in registry
2. **React** polls Phaser registry for updates
3. **Event Bus** enables communication between systems
4. **Tailwind CSS** provides modern styling for overlays
5. **Phaser** handles all game rendering and logic

This architecture ensures clean separation while maintaining seamless integration between the game world and modern UI.
