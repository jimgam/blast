import { DepthLayer } from "../game/GameConfig"
import GameController from "../game/GameController"
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default class GameScene extends Phaser.Scene {
    gameController: GameController
    rexUI: UIPlugin;

    constructor() {
        super({ key: 'GameScene' })
    }


    private create() {
        this.input.setTopOnly(true)


        this.add.sprite(0, 0, 'bg')
            .setOrigin(0, 0)
            .setDepth(DepthLayer.BG)

        this.gameController = new GameController(this)


    }

}