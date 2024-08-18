export default class Tile implements ITile {
    private pos: { row: number, col: number }
    private prevPos: { row: number, col: number }

    constructor(
        public row: number,
        public col: number,
        public color: number,
        public type: "block" | "none" = "block"
    ) {
        this.pos = { row, col }
        this.prevPos = { row, col }
    }

    public getPos() { return this.pos }
    public getPrevPos() { return this.prevPos }

    public setPos(row: number, col: number) {
        this.prevPos = { ...this.pos }
        this.pos = { row, col }
        return this
    }
}
