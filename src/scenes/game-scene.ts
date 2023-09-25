import { Assets, BitmapFont, Container, Sprite } from 'pixi.js';
import { IScene } from '../shared/scene-manager';
import { Background } from '../containers/Background';


export class GameScene extends Container implements IScene {
    //you can  remove all of this variable
    private containerWidth: number;
    private containerHeight: number;

    constructor(parentWidth: number, parentHeight: number) {
        super();

        this.containerWidth = parentWidth;
        this.containerHeight = parentHeight;

        const backgroundImage = new Background(this.containerWidth, this.containerHeight);


        this.addChild(backgroundImage);

        async function loadFonts() {
            await Assets.load({
                data: { family: 'Space Grotesk' },
                src: 'https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2'
            });
        }

        loadFonts()

    }

    update(framesPassed: number): void {

    }

    resize(parentWidth: number, parentHeight: number): void {
        //
        // this._viteLogo.position.x = parentWidth / 2 - 120;
        // this._viteLogo.position.y = parentHeight / 2;

        // this._pixiLogo.position.x = parentWidth / 2;
        // this._pixiLogo.position.y = parentHeight / 2;

        // this._tsLogo.position.x = parentWidth / 2 + 120;
        // this._tsLogo.position.y = parentHeight / 2;
    }


}