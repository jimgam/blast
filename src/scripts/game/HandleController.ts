import Phaser from 'phaser';
import GameScene from '../scene/GameScene';
import Board from './Board/Board';
import BoardView from './Board/View/BoardView';

export class HandleController {
    scene: GameScene;
    private clickCallback: (col: number, row: number) => void;
    private cursorMoveCallback: (col: number, row: number) => void; // New callback for cursor movement
    private startX: number;
    private startY: number;
    private tileSize: number;
    private board: any; // Replace with the actual type of your board

    constructor(scene: GameScene, board: Board, boardView: BoardView) {
        this.scene = scene;
        this.board = board;
        this.startX = boardView.getBoard().x;
        this.startY = boardView.getBoard().y;
        this.tileSize = boardView.getTileSize();
        this.clickCallback = () => { }; // Default to a no-op function
        this.cursorMoveCallback = () => { }; // Default to a no-op function
    }

    public onTileClick(callback: (col: number, row: number) => void): void {
        this.clickCallback = callback;

        const { rows, cols } = this.board.getBoardSize();
        const hitArea = new Phaser.Geom.Rectangle(
            this.startX - this.tileSize / 2,
            this.startY - this.tileSize / 2,
            cols * this.tileSize,
            rows * this.tileSize
        );

        const clickHandler = (pointer: Phaser.Input.Pointer) => {
            if (hitArea.contains(pointer.x, pointer.y)) {
                const col = Math.floor((pointer.x - (this.startX - this.tileSize / 2)) / this.tileSize);
                const row = Math.floor((pointer.y - (this.startY - this.tileSize / 2)) / this.tileSize);
                this.clickCallback(col, row);
            }
        };

        this.scene.input.on('pointerdown', clickHandler);
    }

    public onCursorMove(callback: (col: number, row: number) => void): void {
        this.cursorMoveCallback = callback;

        const moveHandler = (pointer: Phaser.Input.Pointer) => {
            const col = Math.floor((pointer.x - (this.startX - this.tileSize / 2)) / this.tileSize);
            const row = Math.floor((pointer.y - (this.startY - this.tileSize / 2)) / this.tileSize);
            this.cursorMoveCallback(col, row);
        };

        this.scene.input.on('pointermove', moveHandler);
    }

    public removeClickHandler(): void {
        this.scene.input.off('pointerdown');
    }

    public removeCursorMoveHandler(): void {
        this.scene.input.off('pointermove');
    }
}
