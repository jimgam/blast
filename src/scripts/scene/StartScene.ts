import Board from "../game/Board/Board"
import { DepthLayer } from "../game/GameConfig"
import { Logo } from "../gui/Logo"
import { SimpleButton } from "../gui/SimpleButton"
import { SCENE_WIDTH } from "../Index"

export default class StartScene extends Phaser.Scene {
    board: Board
    constructor() {
        super({ key: 'StartScene' })
    }


    private create() {

        this.add.sprite(0, 0, 'bg')
            .setOrigin(0, 0)
            .setDepth(DepthLayer.BG)

        new Logo(this, SCENE_WIDTH / 2, 250)
        
        new SimpleButton(this, SCENE_WIDTH / 2, 550, 'start', () => {
            this.scene.start('GameScene')
        })

    }

}