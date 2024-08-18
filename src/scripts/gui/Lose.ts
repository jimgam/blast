import Cover from 'phaser3-rex-plugins/templates/ui/cover/Cover';
import GameScene from '../scene/GameScene';
import { SimpleButton } from './SimpleButton';
import NinePatch from 'phaser3-rex-plugins/plugins/ninepatch';
import { StyleManager } from './StyleManager';
import { DepthLayer } from '../game/GameConfig';
import { createNinePatch } from './Components';


export class Lose {
    public scene: GameScene;
    private cover: Cover;
    private width: number = 600
    private height: number = 500
    private x: number;
    private y: number;

    constructor(scene: GameScene) {
        this.scene = scene
        this.cover = scene.rexUI.add.cover()


        this.x = scene.scale.width / 2
        this.y = scene.scale.height / 2

        const bg = createNinePatch(scene, { baseFrame: 'window0000', rows: [30, undefined!, 30], columns: [40, undefined!, 40] })

        const button = new SimpleButton(this.scene, 0, 0, 'start', () => {
            this.scene.scene.start('GameScene')
        }).setDepth(DepthLayer.UI)

        const text = this.scene.add.text(0, 0, 'Вы проиграли! ')
            .setStyle(StyleManager.BIG_TEXT)

        const postText = this.scene.add.text(0, 0, 'Но не переживайте,\n теперь у вас есть возможность \n стать мастером проигрыша ', { align: 'center' })
            .setStyle(StyleManager.DEFAULT_DARK)

        const window = scene.rexUI.add.overlapSizer({ x: this.x, y: this.y, width: this.width, height: this.height })
            .addBackground(bg)
            .add(button, { expand: false, align: 'center', offsetY: 120 })
            .add(text, { expand: false, offsetY: -170 })
            .add(postText, { expand: false, offsetY: -50 })
            .layout()
    }
}


