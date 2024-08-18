import NinePatch from "phaser3-rex-plugins/plugins/ninepatch";
import GameScene from "../scene/GameScene";

export function createNinePatch(scene: GameScene, props?: {
    x?: number,
    y?: number,
    key?: string,
    baseFrame?: string,
    columns?: number[],
    rows?: number[],
    maxFixedPartScale?: number
}): NinePatch {
    const {
        x = 0,
        y = 0,
        key = 'gui',
        baseFrame = 'window0000',
        columns = [14, undefined, 14],
        rows = [14, undefined, 14],
        maxFixedPartScale = 1
    } = props || {};

    return scene.rexUI.add.ninePatch({
        x: x,
        y: y,
        key: key,
        baseFrame: baseFrame,
        columns: columns,
        rows: rows,
        maxFixedPartScale: maxFixedPartScale,
    });
}
