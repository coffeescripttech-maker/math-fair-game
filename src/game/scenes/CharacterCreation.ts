import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";

export class CharacterCreation extends Scene {
    background: GameObjects.Image;
    title: GameObjects.Text;
    subtitle: GameObjects.Text;
    characterSprite: GameObjects.Sprite;
    nameInput: GameObjects.Text;
    selectedColor: number = 0x00ff00;
    colorOptions: GameObjects.Shape[] = [];
    confirmButton: GameObjects.Text;
    playerName: string = "";

    constructor() {
        super("CharacterCreation");
    }

    create() {
        // This scene is now handled by React components
        // Clear the scene to prevent any Phaser UI from showing
        this.scene.stop();
        EventBus.emit("current-scene-ready", this);
    }

    createPokemonBackground() {
        // Create gradient background
        const graphics = this.add.graphics();

        // Sky gradient
        graphics.fillGradientStyle(0x87ceeb, 0x87ceeb, 0x98d8e8, 0x98d8e8, 1);
        graphics.fillRect(0, 0, 1024, 400);

        // Ground gradient
        graphics.fillGradientStyle(0x90ee90, 0x90ee90, 0x7cfc00, 0x7cfc00, 1);
        graphics.fillRect(0, 400, 1024, 368);

        // Add decorative elements
        this.add.rectangle(150, 150, 80, 80, 0xFFDC58, 0.2).setDepth(1);
        this.add.rectangle(850, 200, 60, 60, 0xFF6B6B, 0.2).setDepth(1);
        this.add.rectangle(750, 500, 70, 70, 0x7FBCFF, 0.2).setDepth(1);
    }

    createPokemonColorOptions() {
        const colors = [
            0x00ff00, 0xff0000, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
        ];
        const startX = 300;
        const spacing = 80;

        colors.forEach((color, index) => {
            // Color option background
            const colorBg = this.add.rectangle(
                startX + index * spacing,
                400,
                60,
                60,
                0xffffff
            );
            colorBg.setStrokeStyle(4, 0x000000);
            colorBg.setDepth(98);

            // Color circle
            const colorOption = this.add
                .circle(startX + index * spacing, 400, 25, color)
                .setStrokeStyle(4, 0x000000)
                .setInteractive()
                .on("pointerdown", () => this.selectColor(color, index))
                .on("pointerover", () => {
                    colorOption.setStrokeStyle(6, 0x000000);
                    colorBg.setStrokeStyle(4, 0x000000);
                })
                .on("pointerout", () => {
                    colorOption.setStrokeStyle(4, 0x000000);
                    colorBg.setStrokeStyle(4, 0x000000);
                });

            this.colorOptions.push(colorOption);
        });

        // Highlight first color
        this.colorOptions[0].setStrokeStyle(6, 0x000000);
    }

    createPokemonNameInput() {
        // Name input background
        const nameBg = this.add.rectangle(512, 450, 300, 50, 0xFFFFFF);
        nameBg.setStrokeStyle(4, 0x000000);
        nameBg.setDepth(98);

        this.nameInput = this.add
            .text(512, 450, "Click to enter name", {
                fontFamily: "Arial",
                fontSize: 20,
                color: "#111111",
                stroke: "#FFFFFF",
                strokeThickness: 2,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive()
            .on("pointerdown", () => this.promptForName())
            .on("pointerover", () => {
                this.nameInput.setColor("#111111");
                nameBg.setFillStyle(0xFF6B6B);
                nameBg.setStrokeStyle(4, 0x000000);
            })
            .on("pointerout", () => {
                this.nameInput.setColor("#111111");
                nameBg.setFillStyle(0xFFFFFF);
                nameBg.setStrokeStyle(4, 0x000000);
            });
    }

    createPokemonConfirmButton() {
        // Confirm button background
        const confirmBg = this.add.rectangle(512, 550, 180, 50, 0xFF8656);
        confirmBg.setStrokeStyle(6, 0x000000);
        confirmBg.setDepth(98);

        this.confirmButton = this.add
            .text(512, 550, "CONFIRM", {
                fontFamily: "Arial Black",
                fontSize: 24,
                color: "#FFFFFF",
                stroke: "#000000",
                strokeThickness: 3,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive()
            .on("pointerdown", () => this.confirmCharacter())
            .on("pointerover", () => {
                this.confirmButton.setColor("#FFFFFF");
                confirmBg.setFillStyle(0xFF6B6B);
                confirmBg.setStrokeStyle(6, 0x000000);
            })
            .on("pointerout", () => {
                this.confirmButton.setColor("#FFFFFF");
                confirmBg.setFillStyle(0xFF8656);
                confirmBg.setStrokeStyle(6, 0x000000);
            });
    }

    createColorOptions() {
        const colors = [
            0x00ff00, 0xff0000, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
        ];
        const startX = 300;
        const spacing = 80;

        colors.forEach((color, index) => {
            const colorOption = this.add
                .rectangle(startX + index * spacing, 400, 50, 50, color)
                .setStrokeStyle(3, 0xffffff)
                .setInteractive()
                .on("pointerdown", () => this.selectColor(color, index))
                .on("pointerover", () =>
                    colorOption.setStrokeStyle(5, 0xffff00)
                )
                .on("pointerout", () =>
                    colorOption.setStrokeStyle(3, 0xffffff)
                );

            this.colorOptions.push(colorOption);
        });

        // Highlight first color
        this.colorOptions[0].setStrokeStyle(5, 0xffff00);
    }

    selectColor(color: number, index: number) {
        this.selectedColor = color;
        this.characterSprite.setTint(color);

        // Update visual selection
        this.colorOptions.forEach((option, i) => {
            option.setStrokeStyle(
                i === index ? 5 : 3,
                i === index ? 0xffff00 : 0xffffff
            );
        });
    }

    promptForName() {
        const name = prompt("Enter your character name:");
        if (name && name.trim()) {
            this.playerName = name.trim();
            this.nameInput.setText(`Name: ${this.playerName}`);
        }
    }

    confirmCharacter() {
        if (!this.playerName) {
            this.nameInput.setText("Please enter a name first!");
            this.nameInput.setColor("#ff0000");
            return;
        }

        // Store character data
        this.registry.set("playerName", this.playerName);
        this.registry.set("playerColor", this.selectedColor);
        this.registry.set("badges", []);
        this.registry.set("coins", 0);
        this.registry.set("completedMissions", []);

        // Emit event to notify React of data change
        EventBus.emit("game-data-updated");

        // Start the game
        this.scene.start("BarangayMap");
    }
}
