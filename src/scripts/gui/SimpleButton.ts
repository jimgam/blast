export class SimpleButton extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    onClick: Function;
    sprite: Phaser.GameObjects.Sprite;
    glowFX: Phaser.FX.Glow | undefined;
    isSelected: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, img: string, onClick: Function) {
        super(scene, x, y);
        this.scene = scene;
        this.onClick = onClick;

        this.create(img);
        this.scene.add.existing(this);
    }

    private create(img: string) {
        this.sprite = this.scene.add.sprite(0, 0, 'gui', img + '0000');
        this.sprite.preFX?.addShine()
        this.add(this.sprite);

        this.width = this.sprite.getBounds().width;
        this.height = this.sprite.getBounds().height;

        this.setInteractive({ useHandCursor: true });
        this.on('pointerdown', this.handleClick, this);
        this.on('pointerover', this.addGlow, this);
        this.on('pointerout', this.removeGlow, this);
        this.on('pointerdown', this.removeGlow, this);
    }

    private addAnimation() {
        this.scene.add.tween({
            targets: this,
            scale: 1.1,
            repeat: -1,
            yoyo: true
        })
    }

    private addGlow() {
        if (!this.glowFX && this.sprite.preFX) {
            this.glowFX = this.sprite.preFX.addGlow();

        }
    }

    private removeGlow() {
        if (this.glowFX && this.sprite.preFX) {
            this.sprite.preFX.remove(this.glowFX);
            this.glowFX = undefined;
        }
    }

    private handleClick() {
        this.onClick();
    }

    select() {
        this.isSelected = true;
        this.setScale(1.1);
    }

    unselect() {
        this.isSelected = false;
        this.setScale(1)
    }
}
