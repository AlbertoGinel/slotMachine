import { Container, Sprite, DisplayObject } from "pixi.js";
import { GameFrame } from "./GameFrame";

export class Background extends Container {

  private containerWidth: number;
  private containerHeight: number;
  private backgroundImage: Sprite;


  constructor(containerWidth: number, containerHeight: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.backgroundImage = Sprite.from('bg')

    const horizontalRatio = this.containerWidth / this.backgroundImage.width; //available/original
    const verticalRatio = this.containerHeight / this.backgroundImage.height;
    const criticalScale = Math.max(horizontalRatio, verticalRatio);

    this.backgroundImage.scale.set(criticalScale);

    //center of the screen
    this.backgroundImage.anchor.set(0.5, 0.5);
    this.backgroundImage.position.set(this.containerWidth / 2, this.containerHeight / 2);

    const frame = new GameFrame(containerWidth, containerHeight, this.containerWidth / 2, this.containerHeight / 2);


    this.addChild(this.backgroundImage as Sprite & DisplayObject, frame as GameFrame & DisplayObject);
  }

}