import { StyleManager } from "../gui/StyleManager";

export class ScoreManager extends Phaser.Events.EventEmitter {
    private score: number;
    private maxScore: number;

    constructor(maxScore: number) {
        super(); 
        this.score = 0;
        this.maxScore = maxScore;
    }

    addScore(points: number) {
        this.score += points;
        this.emit('scoreChanged', this.score); 
    }

    getScore() { return this.score }
    getMaxScore() { return this.maxScore }
    hasEnoughPoints() { return this.score >= this.maxScore }

    resetScore() {
        this.score = 0;
        this.emit('scoreChanged', this.score); 
    }
}

export class ScoreView extends Phaser.GameObjects.Container {
    private scoreText: Phaser.GameObjects.Text;
    private prefix: string = ' Цель';
    private postfix: string = ' Очков';
    private scoreManager: ScoreManager;
    private maxScoreText: Phaser.GameObjects.Text;
    private bg: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, scoreManager: ScoreManager) {
        super(scene, x, y);
        scene.add.existing(this);

        this.scoreManager = scoreManager;

        this.bg = scene.add.sprite(0, 0, 'gui', 'score_panel' + '0000');

        this.scoreText = scene.add.text(0, 10, `${0}${this.postfix} `)
            .setStyle(StyleManager.TARGAET_TEXT)
            .setOrigin(0.5)

        this.maxScoreText = scene.add.text(0, -60, `${this.prefix} ${scoreManager.getMaxScore()}`)
            .setStyle(StyleManager.DEFAULT_WHITE)
            .setOrigin(0.5)

        this.add([this.bg, this.scoreText, this.maxScoreText]);

        scoreManager.on('scoreChanged', this.update.bind(this));
    }

    update(newScore: number) {
        const currentScore = parseInt(this.scoreText.text);
        const duration = 500;

        this.scene.tweens.add({
            targets: { value: currentScore },
            value: newScore,
            duration: duration,
            onUpdate: (tween) => {
                const value = Math.round(tween.getValue());
                this.scoreText.setText(`${value}${this.postfix}`);
            },
            onComplete: () => {
                this.scoreText.setText(`${newScore}${this.postfix}`);
            }
        });


        this.scene.tweens.add({
            targets: this,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 300,

            ease: 'Power4',
            yoyo: true,
            repeat: 0
        });
    }
}


