declare type objectType = { x: number, y: number, r: number, sprite: string }


declare interface Level {
    curve: Array<number> | null
    type: number
    rolling: number
    countBall: number
    maxColor: number
    bg: number
    path: number
    start: number
    end: number
    cannon: number[] | null

    modifierHidden?: number
    modifierRocket?: number
    modifierFrozen?: number
    modifierBrick?: number
    modifierMultycolor?: number
    modifierBomb?: number
    modifierIce?: number
    modifierCopter?: number
    modifierRocketLine?: number

    ballFruits?: number
    ballBird?: number

    object: objectType[]
    diamonds: number[]
    bigRocket: number[]
    bird: number

    ghostData?: number
    ghostFrequency?: number
    ghostCountPer?: number
}

interface InputNumber {
    input: Sizer,
    update: () => void
    save: () => void,
    panelType?: string
    // destroy?: () => void
}


//Decor Object
type TObjectDecorType = 'decor' | 'object' | 'puck' | 'hole' | 'box' | 'gameObject'
type TCollisionType = 'circle' | 'rect'

interface IObjectOptions {
    x: number;
    y: number;
    rotate: number;
    type: TObjectDecorType;
    radius: number;
    spriteName: string;
    collisionType: TCollisionType;
    editor?: boolean;
    friction?: number;
    isStatic?: boolean
}

interface IObjectSetting {
    sprite: string;
    type: TObjectDecorType;
    collisionType: TCollisionType;
    radius: number;
    friction?: number
    isStatic?: boolean
}

//Ball Type
type BallType = 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'bird' | 'fruits'
type BallModifiers = 'none' | 'hidden' | 'rocket' | 'frozen' | 'brick' | 'multycolor' | 'bomb' | 'ice' | 'icebroken' | 'copter' | 'rocketline'

type TBallsList = {
    modifier: BallModifiers;
    color: BallType;
};

type BallModifierConfig = {
    name: BallModifiers;
    count: number;
    indices?: number[];
};
