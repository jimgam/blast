interface IPlayerData {
    id: number
    money: number
    level: number

    heart: number
    heartTime: number

    score: number
    totalScore: number

    magic: number[]

    boost: number[]
    boostTime: number[]

    collection: number[]
    stikers: number[]

    daysPlayed: number
    reward: number
    recoverHeart: number
    friends: string[]
    chest: number[]

    treasureLine: [number, number, number]//очки treasureScore, время мероприятия, твой старт 

}

type ResItem = { key: keyof IPlayerData, value: number, type?: number };
type resType = Array<ResItem>