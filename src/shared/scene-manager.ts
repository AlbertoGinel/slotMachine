import { Application } from "pixi.js";
import { Stage, Layer } from "@pixi/layers";
import { diffuseGroup, normalGroup, lightGroup } from "@pixi/lights";

export class SceneManager {
    private constructor() { };
    private static _app: Application;
    private static _currentScene: IScene;

    public static get width() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    public static get height() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

    public static init(background: number): void {
        SceneManager._app = new Application({
            view: document.getElementById("pixi-screen") as HTMLCanvasElement,
            width: SceneManager.width,
            height: SceneManager.height,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
        });

        // The initial resize
        SceneManager.resize();

        //Debug
        (globalThis as any).__PIXI_APP__ = SceneManager._app;

        SceneManager._app.stage = new Stage();
        SceneManager._app.stage.addChild(
            new Layer(diffuseGroup) as any,
            new Layer(normalGroup) as any,
            new Layer(lightGroup) as any
        );

        SceneManager._app.ticker.add(SceneManager.update);
        window.addEventListener("resize", SceneManager.resize);
    }

    public static changeScene(newScene: IScene): void {
        if (SceneManager._currentScene) {
            SceneManager._app.stage.removeChild(SceneManager._currentScene as any);
        }
        // Add the new one
        SceneManager._currentScene = newScene;
        SceneManager._app.stage.addChild(SceneManager._currentScene as any);
    }

    private static update(framesPassed: number): void {
        if (SceneManager._currentScene) {
            SceneManager._currentScene.update(framesPassed);
        }
    }

    public static resize(): void {
        const scaleFactor = Math.min(
            window.innerWidth / SceneManager._app.screen.width,
            window.innerHeight / SceneManager._app.screen.height
        );

        const newWidth = Math.ceil(SceneManager._app.screen.width * scaleFactor);
        const newHeight = Math.ceil(SceneManager._app.screen.height * scaleFactor);

        SceneManager._app.renderer.resize(newWidth, newHeight);
        SceneManager._app.stage.scale.set(scaleFactor);

        // if we have a scene, we let it know that a resize happened!
        if (SceneManager._currentScene) {
            SceneManager._currentScene.resize(newWidth, newHeight);
        }
    }
}

export interface IScene {
    update(framesPassed: number): void;
    resize(screenWidth: number, screenHeight: number): void;
}
