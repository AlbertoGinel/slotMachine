import {
    Assets, Container
} from 'pixi.js';
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


        this.addChild(backgroundImage as any);

        async function loadFonts() {
            await Assets.load({
                data: { family: 'Space Grotesk' },
                src: 'https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2'
            });
        }

        loadFonts()

    }

    update(_framesPassed: number): void {

    }

    resize(_parentWidth: number, _parentHeight: number): void {

    }


}