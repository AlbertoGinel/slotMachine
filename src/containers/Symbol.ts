import { Container, Sprite, Texture } from "pixi.js";

export class Symbol extends Container {

  private containerWidth: number;
  private containerHeight: number;
  private containerScale: number;
  private containerX: number;
  private containerY: number;

  private symbolImage: Sprite;

  constructor(containerWidth: number, containerHeight: number, containerScale: number, containerX: number, containerY: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.containerScale = containerScale;
    this.containerX = containerX;
    this.containerY = containerY;

    this.symbolImage = Sprite.from('WILD');

    const horizontalRatio = this.containerWidth / this.symbolImage.width;
    const verticalRatio = this.containerHeight / this.symbolImage.height;
    const criticalScale = Math.min(horizontalRatio, verticalRatio);

    this.symbolImage.scale.set(criticalScale * 0.23);

    //center of the screen
    this.symbolImage.anchor.set(0.5, 0.5);
    this.symbolImage.position.set(containerX, containerY);


    this.addChild(this.symbolImage);

    this.changeSymbol('');

  }

  changeSymbol(symbol: string): void {


    // Define the possible images
    const possibleImages = ['H1', 'H2', 'H3', 'H4', 'L1', 'L2', 'L3', 'L4', 'WILD'];
    let textureSource: string;

    if (symbol === "") {
      textureSource = possibleImages[Math.floor(Math.random() * possibleImages.length)];
    } else {
      textureSource = symbol;
    }

    // Update the texture
    this.symbolImage.texture = Texture.from(textureSource);
  }
}


