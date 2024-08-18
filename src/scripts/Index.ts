import 'phaser'
import 'phaser/plugins/spine/dist/SpinePluginDebug'
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin"
import Preload from './Preload'
import GameScene from './scene/GameScene';
import StartScene from './scene/StartScene';


export const SCENE_WIDTH = 1400;
export const SCENE_HEIGHT = 788;


const config = {
  type: Phaser.AUTO,
  dom: { createContainer: true },
  backgroundColor: '#161616',
  // autoRound: true,
  // roundPixels: true,
  // antialias: true,
  // smoothStep: true,

  scale: {
    width: SCENE_WIDTH,
    height: SCENE_HEIGHT,
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    resolution: window.devicePixelRatio,
  },
  scene: [Preload, GameScene, StartScene],
  plugins: {
    scene: [
      { key: 'rexUI', plugin: UIPlugin, mapping: 'rexUI' },
      { key: 'SpinePlugin', plugin: SpinePlugin, mapping: 'spine' },
    ]
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
