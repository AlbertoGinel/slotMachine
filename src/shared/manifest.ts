import type { AssetsManifest } from 'pixi.js';


export const assetsManifest: AssetsManifest = {
    bundles: [
        {
            name: "symbols",
            assets: {
                H1: '../../symbols/H1.png',
                H2: '../../symbols/H2.png',
                H3: '../../symbols/H3.png',
                H4: '../../symbols/H4.png',
                L1: '../../symbols/L1.png',
                L2: '../../symbols/L2.png',
                L3: '../../symbols/L3.png',
                L4: '../../symbols/L4.png',
                WILD: '../../symbols/WILD.png',
            }
        },
        {
            name: "General",
            assets: {
                button_spin: '../../button_spin.png',
                counter: '../../counter.png',
                bg: '../../bg.jpg',
                reels: '../../reels.png',
                debugReel: '../../debugReel.png',
                debugFrame: '../../debugFrame.png',
                emptyReel: '../../emptyReel.png',
                emptyFrame: '../../emptyFrame.png'
            }
        }
    ]
}
