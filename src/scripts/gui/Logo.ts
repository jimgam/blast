export class Logo extends Phaser.GameObjects.Sprite {
    glowFX: Phaser.FX.Glow | undefined;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'logo')
        scene.add.existing(this)
        this.addScaleAnimation()
        this.addFX()
    }

    addFX() {
        this.postFX?.addShine()
    }

    addScaleAnimation() {
        this.scene.add.tween({
            targets: this,
            ease: Phaser.Math.Easing.Sine.InOut,
            scale: 1.1,
            repeat: -1,
            yoyo: true

        })
    }



}