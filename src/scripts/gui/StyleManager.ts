
const FONT_SIZE = 26

export class StyleManager {
    static fontsize = (size: number) => size.toString() + 'px Marvin'

    static DEFAULT_WHITE: Phaser.Types.GameObjects.Text.TextStyle = {
        font: this.fontsize(FONT_SIZE),
        color: '#ffffff',
        stroke: '#001149',
        strokeThickness: 2,
        shadow: { offsetX: 0, offsetY: 1, color: '#4c156f', blur: 1, fill: true, stroke: true },
    }

    static DEFAULT_DARK: Phaser.Types.GameObjects.Text.TextStyle = {
        font: this.fontsize(FONT_SIZE),
        color: '#562b22',
        stroke: '#ffffff',
        strokeThickness: 2,
        // shadow: { offsetX: 0, offsetY: 0, color: '#ffffff', blur: 0, fill: true, stroke: true },
    }

    static TARGAET_TEXT = { ...this.DEFAULT_DARK, font: this.fontsize(32) }
    static BIG_TEXT = { ...this.DEFAULT_DARK, font: this.fontsize(42) }
    // static SMALLL_TEXT = { ...this.DEFAULT_DARK, font: this.fontsize(42) }
}