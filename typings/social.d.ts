interface ISocial {
    init(scene: EngineScene): void;
    buy(item: any): Promise;
    wallpost(level: number): void;
    invite(): void;
    getAppUser(): Promise<[]>
    getTop(scene: Top): void
    showAdw(): Promise;
    exitFromGame(scene: EngineScene): void;
    getUserInfo(ids: string[]): Promise<{ first_name: string, last_name: string, pic128x128: string, uid: string }[]>
    showAdwReward(): Promise
    notice(): Promise
    // Другие методы 
}