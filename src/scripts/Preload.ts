// import WebFontFile from "./modules/FontLoader"

import WebFontFile from "./components/FontLoader";


export default class Preload extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' })
  }

  preload() {
    //font 
    this.load.addFile(new WebFontFile(this.load, 'Marvin', 'custom'))

    this.load.atlas('flares', 'assets/fx/flares.png', 'assets/fx/flares.json');
    this.load.image('logo', 'assets/logo/logo.png')
    this.load.image('bg', 'assets/bg.jpg')
    this.load.atlas('gui', 'assets/gui.png', 'assets/gui.json');

  }

  create() {
    // this.scene.start('GameScene')
    this.scene.start('StartScene')
  }
}
