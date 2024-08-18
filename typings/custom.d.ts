declare interface Window {
    API_callback: Function
}



//-----------------------------------------

interface ITile {
    row: number;
    col: number;
    color: number;
    type: "block" | "none";

    getPos(): { row: number, col: number };
    getPrevPos(): { row: number, col: number };
    setPos(row: number, col: number): ITile;
}

interface IGameBoard {
    // rows: number
    // cols: number

    getBoard(): {}
    getBoardSize(): { rows: number, cols: number }
    getTile(x: number, y: number)
    burnTiles(x: number, y: number): ITile[] | null;
    dropTiles(): void;
    refillBoard(): void;
    canBurnTiles(): boolean;
    shuffle(): void;
}
