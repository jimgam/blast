export class fxParticles {
    private scene: Phaser.Scene;
    private x: number;
    private y: number;
    private props: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig | undefined;
    private particles: Phaser.GameObjects.Particles.ParticleEmitter;
    private timer: Phaser.Time.TimerEvent;

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        props: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig | undefined,
        delay: number = 100,
    ) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.props = props;

        this.particles = this.scene.add.particles(x, y, undefined, props)

        this.timer = this.scene.time.delayedCall(delay, () => {
            this.particles.stop()
        })

        this.scene.events.on('shutdown', this.destroy, this);
    }

    destroy(): void {
        this.timer.destroy();
        this.particles.destroy();
        this.scene.events.off('shutdown', this.destroy, this);
    }
}


export class fxParticlesBase {
    private scene: Phaser.Scene;
    private x: number;
    private y: number;
    private props: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig | undefined;
    particles: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        props: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig | undefined,
        delay: number = 100,
    ) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.props = props;

        this.particles = this.scene.add.particles(x, y, undefined, props)
            .setDepth(50)
        this.scene.events.on('shutdown', this.destroy, this);
    }

    destroy(): void {
        this.particles.destroy();
        this.scene.events.off('shutdown', this.destroy, this);
    }
}

export const fx_Particle_Block_Selecteted: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    texture: 'flares',
    frame: 'white',
    emitZone: { type: 'edge', source: new Phaser.Geom.Rectangle(-40, -40, 80, 80), quantity: 32 },
    lifespan: 500,
    scale: { values: [0, 0.25, 0] },
    emitting: true,
    blendMode: 'ADD',
}

// export const fx_Particle_Rocket: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
//     texture: 'flares',
//     frame: 'white',
//     color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
//     colorEase: 'quad.out',
//     lifespan: 500,
//     angle: { min: -100, max: -80 },
//     scale: { start: 0.70, end: 0, ease: 'sine.out' },
//     speed: 100,
//     advance: 200,
//     blendMode: 'ADD',
//     emitting: false,
// }
export const fx_Particle_Block: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    texture: 'flares',
    frame: 'white',
    color: [0x040d61, 0xfacc22, 0xf89800, 0xf83600, 0x9f0404, 0x4b4a4f, 0x353438, 0x040404],
    lifespan: 800,
    emitZone: { type: 'random', source: new Phaser.Geom.Circle(0, 0, 40), quantity: 32 },
    angle: { min: -100, max: -80 },
    scale: { values: [0, 0.15, 0.65, 0], ease: 'sine.out' },
    speed: { min: 100, max: 300 },
    advance: 1000,
    blendMode: 'ADD',
    emitting: false,
}

