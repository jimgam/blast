import Container from "phaser3-rex-plugins/templates/ui/container/Container";
import { DepthLayer } from "../../GameConfig";
import { fx_Particle_Block, fxParticlesBase } from "../../../components/Particles";

export class TileView extends Container {
    private sprite: Phaser.GameObjects.Sprite;
    // private text: Phaser.GameObjects.Text;
    private posX: number;
    private posY: number;
    private tileSize: number;
    private tile: ITile;

    constructor(scene: Phaser.Scene, posX: number, posY: number, tile: ITile, tileSize: number) {
        super(scene);

        this.posX = posX
        this.posY = posY
        this.tileSize = tileSize
        this.tile = tile

        this.sprite = this.scene.add.sprite(0, 0, 'gui', `box${tile.color}0000`)
            .setDisplaySize(tileSize, tileSize + tileSize / 10)

        this.add(this.sprite);
        this.setPosition(posX, posY)
    }

    addStaticAnimationSprite() {
        this.scene.add.tween({
            targets: this.sprite,
            yoyo: true,
            startDelay: (this.posX / 50),
            repeat: -1,
            scale: 0.99
        })
    }

    public onClick(callback: () => void): void {
        this.sprite.setInteractive().on('pointerdown', callback);
    }

    public async playBurnAnimation(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scene.tweens.add({
                targets: this.sprite,
                alpha: 0,
                scale: 0.1,
                duration: 300,
                angle: 180,
                onStart: () => {
                    new fxParticlesBase(this.scene, this.posX, this.posY, fx_Particle_Block, 500)
                },
                onComplete: () => {
                    this.destroy()
                    resolve();
                }
            });
        });
    }

    public async playDropAnimation(newY: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scene.tweens.add({
                targets: this,
                y: newY,
                duration: 500,
                ease: 'Bounce.easeOut',

                onComplete: () => {
                    this.posY = newY
                    resolve();
                }
            });
        })
    }

    public async playRefillAnimation(newY: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scene.tweens.add({
                targets: this,
                y: newY,
                duration: 1000 - newY,
                alpha: 1,
                ease: 'Bounce.easeOut',
                onComplete: () => {
                    this.posY = newY
                    resolve();
                }
            });
        });
    }

    public async playShakeAnimation(amplitude: number, duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            const shakeTween = this.scene.tweens.add({
                targets: this,
                x: this.posX + amplitude,
                angle: { from: -amplitude, to: amplitude },
                duration: duration,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: 2,
                onComplete: () => {
                    this.setAngle(0)
                    resolve();
                }
            });
        });
    }


    public async playSwapAnimation(newX: number, newY: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.scene.tweens.add({
                targets: this,
                x: newX,
                y: newY,
                duration: 500,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.posX = newX;
                    this.posY = newY;
                    resolve();
                }
            });
        });
    }


    public async playScaleAnimation(scale: number, duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            const shakeTween = this.scene.tweens.add({
                targets: this,
                scale: scale,
                duration: duration,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    resolve();
                }
            })
        })


    }


}
