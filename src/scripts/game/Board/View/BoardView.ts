import Container from "phaser3-rex-plugins/templates/ui/container/Container";
import Board from "../Board";
import { TileView } from "./TileView";
import { fx_Particle_Block_Selecteted, fxParticlesBase } from "../../../components/Particles";

export default class BoardView {
    private scene: Phaser.Scene;
    private tiles: TileView[][];
    private board: Board;
    private startX: number;
    private startY: number;
    private tileSize: number;
    private spriteContainer: Phaser.GameObjects.Container;
    private clickCallback: (col: number, row: number) => void;
    private selectedParticles: fxParticlesBase[] = []

    constructor(scene: Phaser.Scene, board: Board, startX: number, startY: number) {
        this.scene = scene;
        this.board = board;
        this.startX = startX;
        this.startY = startY;
        this.tiles = [];

        this.initialize();
    }

    private initialize(): void {
        this.spriteContainer = this.scene.add.container(0, 0)
        this.calculateTileSize();
        this.createTiles();
    }

    private calculateTileSize(): void {
        const { rows, cols } = this.board.getBoardSize();

        const maxWidth = 550
        const maxHeight = 550

        const tileWidth = Math.floor(maxWidth / cols);
        const tileHeight = Math.floor(maxHeight / rows);

        this.tileSize = Math.min(tileWidth, tileHeight);
    }

    private createTiles(): void {
        const { rows, cols } = this.board.getBoardSize();

        for (let y = 0; y < rows; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < cols; x++) {
                const tile = this.board.getTile(x, y);
                const posX = this.startX + tile.getPos().col * this.tileSize;
                const posY = this.startY + tile.getPos().row * this.tileSize;

                const tileView = this.createTileView(posX, posY, tile, this.tileSize)
                this.tiles[y][x] = tileView;
            }
        }
        this.sortTile()
    }



    public sortTile() { this.spriteContainer.sort('y', (a, b) => a.y < b.y); }
    public getTileSize() { return this.tileSize }
    public getBoard() { return { x: this.startX, y: this.startY } }

    private createTileView(posX, posY, tile, tileSize) {
        const tileView = new TileView(this.scene, posX, posY, tile, tileSize);
        this.spriteContainer.add(tileView)
        return tileView
    }

    public async burnTiles(tiles: ITile[] | null): Promise<void> {
        if (!tiles) return;
        const animationPromises: Promise<void>[] = [];

        tiles.forEach(tile => {
            const tileView = this.tiles[tile.getPos().row][tile.getPos().col];
            animationPromises.push(tileView.playBurnAnimation());
        });

        await Promise.all(animationPromises);
    }

    public async shakeTile(x, y) {
        await this.tiles[y][x].playShakeAnimation(5, 100)
    }

    public async scaleTile(x, y) {
        const tile = this.tiles[y][x]


        // const tileView = this.spriteContainer.list.find((child) => {
        //     return child === tile;
        // }) as TileView

        await tile.playScaleAnimation(1, 200)
    }

    public async addParticles(x, y) {
        return new Promise<void>((resolve, reject) => {

            const posX = this.startX + x * this.tileSize;
            const posY = this.startY + y * this.tileSize;

            const paricle = new fxParticlesBase(this.scene, posX, posY, fx_Particle_Block_Selecteted, 500)
            this.selectedParticles.push(paricle)

            setTimeout(() => {
                if (this.selectedParticles.length == 2) {
                    this.selectedParticles.forEach((p) => p.particles.stop())
                    this.selectedParticles = []
                    resolve()
                }
            }, 1000)
        })
    }

    public async dropTiles(tiles: ITile[] | null): Promise<void> {
        if (!tiles) return;
        const animationPromises: Promise<void>[] = [];

        tiles.forEach(tile => {
            const { row, col } = tile.getPos();
            const prevPos = tile.getPrevPos();

            this.tiles[row][col] = this.tiles[prevPos.row][prevPos.col];
            const posY = this.startY + row * this.tileSize;

            animationPromises.push(this.tiles[row][col].playDropAnimation(posY));

        });

        await Promise.all(animationPromises);
        this.sortTile()
    }


    public async refillBoard(newTiles: ITile[]): Promise<void> {
        const animationPromises: Promise<void>[] = [];

        newTiles.forEach(tile => {

            const { row, col } = tile.getPos();
            const posX = this.startX + col * this.tileSize;
            const posY = this.startY + row * this.tileSize;

            const tileView = this.createTileView(posX, -this.tileSize, tile, this.tileSize)//new TileView(this.scene, posX, -this.tileSize, tile, this.tileSize);
            this.tiles[row][col] = tileView;

            animationPromises.push(tileView.playRefillAnimation(posY));

        });

        await Promise.all(animationPromises);
        this.sortTile()
    }

    public async swapTiles(tiles: ITile[] | null): Promise<void> {
        if (!tiles || tiles.length !== 2) return;

        const [tile1, tile2] = tiles;
        const { row: row1, col: col1 } = tile1.getPos();
        const { row: row2, col: col2 } = tile2.getPos();

        const tileView1 = this.tiles[row1][col1];
        const tileView2 = this.tiles[row2][col2];

        const posX1 = this.startX + col1 * this.tileSize;
        const posY1 = this.startY + row1 * this.tileSize;
        const posX2 = this.startX + col2 * this.tileSize;
        const posY2 = this.startY + row2 * this.tileSize;

        const animationPromises: Promise<void>[] = [];

        // Swap the tiles visually
        animationPromises.push(tileView1.playSwapAnimation(posX2, posY2));
        animationPromises.push(tileView2.playSwapAnimation(posX1, posY1));

        // Swap the tiles in the board
        this.tiles[row1][col1] = tileView2;
        this.tiles[row2][col2] = tileView1;

        await Promise.all(animationPromises);
        this.sortTile();
    }

}


