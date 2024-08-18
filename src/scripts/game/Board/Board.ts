import { GameConfig } from "../GameConfig";
import Tile from "./Tile";

export default class Board {
    private tiles: (ITile)[][];
    private rows: number;
    private cols: number;
    private id: number;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.tiles = this.generateRandomBoard();
    }

    public getBoardSize() {
        return { rows: this.rows, cols: this.cols };
    }

    public getTile(col: number, row: number): ITile {
        return this.tiles[row][col];
    }

    public getBoard() {
        const colors = this.tiles.map(row => row.map(tile => tile.type));
        return colors;
    }

    public burnTiles(col: number, row: number): ITile[] {
        const tile = this.getTile(col, row);
        if (!tile) return [];

        const burnTiles: ITile[] = [];
        const visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
        const groupSize = this.floodFill(col, row, tile.color, visited);

        if (groupSize > 1) {
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    if (visited[row][col]) {
                        this.tiles[row][col].type = 'none';
                        burnTiles.push(this.tiles[row][col]);
                    }
                }
            }
        }

        return burnTiles;
    }

    public bombTiles(col: number, row: number): ITile[] {
        const burnTiles: ITile[] = [];
        const offsets: [number, number][] = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]];

        for (const [offsetCol, offsetRow] of offsets) {
            const newCol = col + offsetCol;
            const newRow = row + offsetRow;

            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                const tile = this.tiles[newRow][newCol];
                if (tile) {
                    tile.type = 'none';
                    burnTiles.push(tile);
                }
            }
        }

        return burnTiles;
    }

    public swapTile(col1: number, row1: number, col2: number, row2: number): ITile[] | null {
        if (!this.isValidPosition(col1, row1) || !this.isValidPosition(col2, row2)) {
            return null;
        }

        const tile1 = this.getTile(col1, row1);
        const tile2 = this.getTile(col2, row2);

        this.tiles[row1][col1] = tile2;
        this.tiles[row2][col2] = tile1;

        tile1.setPos(row2, col2);
        tile2.setPos(row1, col1);

        return [tile1, tile2]; // Return the swapped tiles
    }

    public dropTiles(): ITile[] {
        const droppedTiles: ITile[] = [];

        for (let col = 0; col < this.cols; col++) {
            let emptyRow = this.rows - 1;

            for (let row = this.rows - 1; row >= 0; row--) {
                if (this.tiles[row][col].type !== "none") {
                    if (row !== emptyRow) {
                        this.tiles[emptyRow][col] = this.tiles[row][col];
                        this.tiles[row][col] = new Tile(row, col, 0, "none");
                        this.tiles[emptyRow][col].setPos(emptyRow, col);
                        droppedTiles.push(this.tiles[emptyRow][col]);
                    }
                    emptyRow--;
                }
            }
        }

        return droppedTiles;
    }

    public refillBoard(): ITile[] {
        const newTiles: ITile[] = [];

        for (let col = 0; col < this.cols; col++) {
            let emptySpaces = 0;

            for (let row = this.rows - 1; row >= 0; row--) {
                if (this.tiles[row][col].type === "none") {
                    emptySpaces++;
                }
            }

            for (let i = 0; i < emptySpaces; i++) {
                const row = i;
                const color = Math.floor(Math.random() * GameConfig.COLORS);
                const newTile = new Tile(row, col, color, 'block');
                this.tiles[row][col] = newTile;
                newTiles.push(newTile);
            }
        }

        return newTiles;
    }

    public clearBoard() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.tiles[row][col].type = 'none';
            }
        }
        return this.tiles.flat();
    }

    public canBurnTiles(): boolean {
        const visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (!visited[row][col]) {
                    const tile = this.tiles[row][col];
                    const groupSize = this.floodFill(col, row, tile.color, visited);

                    if (groupSize >= 2) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private isValidPosition(col: number, row: number): boolean {
        return col >= 0 && col < this.cols && row >= 0 && row < this.rows;
    }

    private floodFill(col: number, row: number, color: number, visited: boolean[][]): number {
        if (!this.isValidPosition(col, row) || visited[row][col] || this.tiles[row][col].color !== color) {
            return 0;
        }

        visited[row][col] = true;
        let count = 1;

        count += this.floodFill(col + 1, row, color, visited);
        count += this.floodFill(col - 1, row, color, visited);
        count += this.floodFill(col, row + 1, color, visited);
        count += this.floodFill(col, row - 1, color, visited);

        return count;
    }

    private generateRandomBoard(): ITile[][] {
        const board: ITile[][] = [];
        for (let row = 0; row < this.rows; row++) {
            const rowArray: ITile[] = [];
            for (let col = 0; col < this.cols; col++) {
                const color = Math.floor(Math.random() * GameConfig.COLORS);
                rowArray.push(new Tile(row, col, color));
            }
            board.push(rowArray);
        }
        return board;
    }

    private shuffle(): void { }
}
