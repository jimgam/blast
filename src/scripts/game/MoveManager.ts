import { StyleManager } from "../gui/StyleManager";
import GameScene from "../scene/GameScene";

export class MoveManager extends Phaser.Events.EventEmitter {
    private move: number;

    constructor(maxMove: number) {
        super(); 
        this.move = maxMove;
    }

    madeMove() {
        this.move -= 1;
        this.emit('moved', this.move); 
    }

    hasMoreMoves() { return this.move > 0 }
    getMove() { return this.move }
}


export class MoveView extends Phaser.GameObjects.Container {
    private move: Phaser.GameObjects.Text;
    private bg: Phaser.GameObjects.Sprite;
    private moveCount: Phaser.GameObjects.Text;
    private moveManager: MoveManager;
    private postfix: string;

    constructor(scene: GameScene, x: number, y: number, moveManager: MoveManager) {
        super(scene, x, y);
        scene.add.existing(this);

        this.moveManager = moveManager;

        this.bg = scene.add.sprite(0, 0, 'gui', 'moves' + '0000');
        this.postfix = this.getPostfix(moveManager.getMove());

        this.moveCount = scene.add.text(0, 30, `${moveManager.getMove()} ${this.postfix}`)
            .setStyle(StyleManager.TARGAET_TEXT)
            .setOrigin(0.5);

        this.add([this.bg, this.moveCount]);

        moveManager.on('moved', this.update.bind(this));
    }

    private getPostfix(moveCount: number): string {
        const lastDigit = moveCount % 10;
        const lastTwoDigits = moveCount % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'ходов'; // 11-19
        } else if (lastDigit === 1) {
            return 'ход'; // 1
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return 'хода'; // 2, 3, 4
        } else {
            return 'ходов'; // 0, 5-9
        }
    }

    update(newScore: number) {
        this.postfix = this.getPostfix(newScore);
        this.moveCount.setText(`${newScore} ${this.postfix}`);
    }

  
}
