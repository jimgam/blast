import Phaser from 'phaser'

import WebFontLoader from 'webfontloader'

/**
 * @param {Phaser.Loader.LoaderPlugin} loader
 * @param {string | string[]} fontNames
 * @param {string} [service]
 */

export default class WebFontFile extends Phaser.Loader.File {
    fontNames: any[]
    service: string

    constructor(loader, fontNames, service = 'custom') {
        super(loader, {
            type: 'webfont',
            key: fontNames.toString()
        })

        this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames]
        this.service = service
    }

    load() {
        const config = {
            active: () => {
                this.loader.nextFile(this, true)
            }
        }

        switch (this.service) {
                case 'custom':
                config['custom'] = {
                    families: this.fontNames,
                    urls: ['assets/font/fonts.css'],
                }

                break

            default:
                throw new Error('Unsupported font service')
        }

        WebFontLoader.load(config)
    }
}