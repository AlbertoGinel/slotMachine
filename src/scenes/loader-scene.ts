import { Container, Assets } from 'pixi.js'
import { LoadingBarContainer } from '../containers/loading-bar-container';
import { SceneManager, IScene } from '../shared/scene-manager';
import { GameScene } from './game-scene';
import { assetsManifest } from '../shared/manifest';

export class LoaderScene extends Container implements IScene {
    private _loadingBar: LoadingBarContainer;

    constructor() {
        super();

        const loaderBarWidth = 280;
        this._loadingBar = new LoadingBarContainer(loaderBarWidth, SceneManager.width, SceneManager.height);

        this.addChild(this._loadingBar as any);
        this.initLoader().then(() => {
            this.loaded();
        });
    }

    async initLoader(): Promise<void> {
        await Assets.init({ manifest: assetsManifest });
        const bundlesIds = assetsManifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundlesIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this._loadingBar.scaleProgress(progressRatio);
    }

    private loaded(): void {
        SceneManager.changeScene(new GameScene(SceneManager.width, SceneManager.height) as any)
    }

    update(_framesPassed: number): void {
        //...
    }

    resize(_parentWidth: number, _parentHeight: number): void {
        //...
    }
}