import { Container, Sprite } from "pixi.js";
import { Reel } from "./Reel";

export class ReelsCtrl extends Container {

  private containerWidth: number;
  private containerHeight: number;
  private containerScale: number;
  private containerX: number;
  private containerY: number;

  private ReelsImage: Sprite;

  private reel1: Reel;
  private reel2: Reel;
  private reel3: Reel;

  constructor(containerWidth: number, containerHeight: number, containerScale: number, containerX: number, containerY: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.containerScale = containerScale;
    this.containerX = containerX;
    this.containerY = containerY;


    this.ReelsImage = Sprite.from('reels');

    //    console.log("containerWidth", this.containerWidth, "containerHeight", this.containerHeight);

    const horizontalRatio = this.containerWidth / this.ReelsImage.width;
    const verticalRatio = this.containerHeight / this.ReelsImage.height;
    const criticalScale = Math.min(horizontalRatio, verticalRatio);


    this.ReelsImage.anchor.set(0.5, 0.5);
    this.ReelsImage.scale.set(criticalScale * 0.78); //TODO magic number
    this.ReelsImage.position.set(this.containerX, this.containerY - (this.containerHeight * 0.08));


    //add Reels
    this.reel1 = new Reel(this.containerWidth, this.containerHeight, 0.78, this.containerX - (this.containerWidth * 0.185), this.containerY - (this.containerHeight * 0.08));
    this.reel2 = new Reel(this.containerWidth, this.containerHeight, 0.78, this.containerX, this.containerY - (this.containerHeight * 0.08));
    this.reel3 = new Reel(this.containerWidth, this.containerHeight, 0.78, this.containerX + (this.containerWidth * 0.185), this.containerY - (this.containerHeight * 0.08));



    this.addChild(this.ReelsImage, this.reel1, this.reel2, this.reel3);


  }

  triggerAnimation(reels: string[][], callback: () => void) {
    this.reel1.triggerAnimation(1, reels[0]);
    this.reel2.triggerAnimation(2, reels[1]);
    this.reel3.triggerAnimation(3, reels[2], callback);
  }


}