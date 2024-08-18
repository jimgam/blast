import { Lose } from "../gui/Lose";
import { Win } from "../gui/Win";
import GameScene from "../scene/GameScene";
import Board from "./Board/Board";
import BoardView from "./Board/View/BoardView";
import { GameConfig } from "./GameConfig";
import { HandleController } from "./HandleController";
import { MagicController } from "./MagicController";
import { MoveManager, MoveView } from "./MoveManager";
import { ScoreManager, ScoreView } from "./ScoreManager";

export default class GameController {
    public scene: GameScene;

    private board: Board;
    private boardView: BoardView;
    private lock: boolean = false

    private scoreManager: ScoreManager;
    private scoreView: ScoreView;
    private handleControlller: HandleController;
    private magicController: MagicController;

    private moveManager: MoveManager;
    private moveView: MoveView;

    constructor(scene: GameScene) {
        this.scene = scene
        this.start()
    }

    public start() {
        this.createBoard()
        this.createHandle()

        this.createScorePanel()
        this.createMovePanel()

        this.createMagicButton()

        this.key()
    }

    private createMagicButton() {
        this.magicController = new MagicController(this.scene)
    }

    private createScorePanel() {
        this.scoreManager = new ScoreManager(50)
        this.scoreView = new ScoreView(this.scene, 190, 140, this.scoreManager)
    }

    private createMovePanel() {
        this.moveManager = new MoveManager(10)
        this.moveView = new MoveView(this.scene, 1220, 140, this.moveManager)
    }

    private createBoard() {
        this.board = new Board(7, 7);
        this.boardView = new BoardView(this.scene, this.board, GameConfig.BOARD_X, GameConfig.BOARD_Y);
    }

    private createHandle() {
        this.handleControlller = new HandleController(this.scene, this.board, this.boardView)

        this.handleControlller.onTileClick(async (x, y) => {

            // If the first magic is chosen
            if (this.magicController.getSelected() == 1) {
                this.handleMagicBomb(x, y)
                this.magicController.resetSelected()
                return
            }

            // If the second magic is chosen
            if (this.magicController.getSelected() == 2) {

                this.magicController.addSwapTile(x, y)
                await this.boardView.scaleTile(x, y)
                await this.boardView.addParticles(x, y)

                if (this.magicController.canMoveTiles()) {
                    const { col1, row1, col2, row2 } = this.magicController.getMoveTiles();
                    const swapTiles = this.board.swapTile(col1, row1, col2, row2)
                    await this.boardView.swapTiles(swapTiles)
                    this.magicController.resetSelected()
                }
                return
            }

            //Simple click
            this.handleTileClick(x, y)
        })


    }

    private checkWin() {
        if (this.scoreManager.hasEnoughPoints()) {
            this.lock = true
            new Win(this.scene)
            return
        } else if (!this.moveManager.hasMoreMoves()) {
            this.lock = true
            new Lose(this.scene)
        }
    }

    private async handleMagicBomb(x: number, y: number) {
        this.lock = true
        const bombTiles = this.board.bombTiles(x, y)
        await this.boardView.burnTiles(bombTiles)
        this.scoreManager.addScore(bombTiles.length)

        const dropTiles = this.board.dropTiles();
        this.boardView.dropTiles(dropTiles);

        const refillBoard = this.board.refillBoard();
        await this.boardView.refillBoard(refillBoard);

        this.lock = false
    }

    private async handleTileClick(x: number, y: number) {
        const burnTiles = this.board.burnTiles(x, y);

        if (!this.lock) {
            this.lock = true
            if (burnTiles.length > 0) {
                this.moveManager.madeMove()
                await this.boardView.burnTiles(burnTiles);
                this.scoreManager.addScore(burnTiles.length)

                const dropTiles = this.board.dropTiles();
                this.boardView.dropTiles(dropTiles);

                const refillBoard = this.board.refillBoard();
                await this.boardView.refillBoard(refillBoard);

            } else {
                await this.boardView.shakeTile(x, y)
            }
            this.lock = false
            this.checkWin()
        }
    }


    //------------------------------------------

    key() {
        this.scene.input.keyboard?.addKey('A')
            .on('down', async () => {
                const burnTiles = this.board.clearBoard()
                await this.boardView.burnTiles(burnTiles);

                const refillBoard = this.board.refillBoard()
                await this.boardView.refillBoard(refillBoard);

            })
        this.scene.input.keyboard?.addKey('S')
            .on('down', () => {

                // const test = this.boardView.sortTile()
                // console.log(test);
                this.scene.scene.start('StartScene')

            })

    }
}