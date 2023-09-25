import { Container, Sprite } from "pixi.js";

export class ButtonSpin extends Container {


  private containerWidth: number;
  private containerHeight: number;
  private containerScale: number;
  private containerX: number;
  private containerY: number;

  private buttonSpinImage: Sprite;


  constructor(containerWidth: number, containerHeight: number, containerScale: number, containerX: number, containerY: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.containerScale = containerScale;
    this.containerX = containerX;
    this.containerY = containerY;

    this.buttonSpinImage = Sprite.from('button_spin')

    const horizontalRatio = this.containerWidth / this.buttonSpinImage.width; //available/original
    const verticalRatio = this.containerHeight / this.buttonSpinImage.height;
    const criticalScale = Math.max(horizontalRatio, verticalRatio);

    this.buttonSpinImage.scale.set(criticalScale * 0.1);

    //center of the screen
    this.buttonSpinImage.anchor.set(0.5, 0.5);
    this.buttonSpinImage.position.set(this.containerX + (this.containerWidth * 0.38), this.containerY - (this.containerHeight * 0.08));

    this.addChild(this.buttonSpinImage);

  }

}