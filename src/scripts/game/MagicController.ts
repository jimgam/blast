import { fx_Particle_Block_Selecteted, fxParticlesBase } from "../components/Particles";
import { SimpleButton } from "../gui/SimpleButton";
import GameScene from "../scene/GameScene";

export class MagicController {
    public scene: GameScene;
    private selected: number = 0;
    private button0: SimpleButton;
    private button1: SimpleButton;

    private swapTile: number[]

    constructor(scene: GameScene) {
        this.scene = scene
        this.button0 = new SimpleButton(scene, 280, 670, 'magic0', () => {
            this.toggleSelection(1, this.button0);
        });

        this.button1 = new SimpleButton(scene, 1130, 670, 'magic1', () => {
            this.swapTile = []
            this.toggleSelection(2, this.button1);
        });
    }

    addSwapTile(x: number, y: number) {
        this.swapTile.push(x, y)
  
    }

    canMoveTiles(): boolean {
        return this.swapTile.length == 4
    }

    getMoveTiles() {
        const [col1, row1, col2, row2] = this.swapTile;
        return { col1, row1, col2, row2 };
    }

    addParticles(x, y) {
        new fxParticlesBase(this.scene, 150, 150, fx_Particle_Block_Selecteted, 500)
    }


    toggleSelection(value: number, button: SimpleButton) {
        if (this.selected === value) {
            this.selected = 0; // Unselect if already selected
            button.unselect(); // Unselect the button
        } else {
            this.selected = value; // Select the new value
            button.select(); // Select the button
            // If there's another button selected, unselect it
            if (button === this.button0 && this.button1.isSelected) {
                this.button1.unselect();
            } else if (button === this.button1 && this.button0.isSelected) {
                this.button0.unselect();
            }
        }
    }

    getSelected() {
        return this.selected;
    }

    resetSelected() {
        this.swapTile = []
        this.selected = 0; // Resets selected to 0
        this.button0.unselect(); // Unselect button 0
        this.button1.unselect(); // Unselect button 1
    }
}
