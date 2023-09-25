import { Container, Sprite, DisplayObject } from "pixi.js";
import { ReelsCtrl } from "./ReelsCtrl";
import { ButtonSpin } from "./ButtonSpin";
import { Counter } from "./Counter";
import states from "../../public/states.json";

export class GameFrame extends Container {

  private containerWidth: number;
  private containerHeight: number;
  private containerX: number;
  private containerY: number;

  private debugFrameImage: Sprite;

  private reels: ReelsCtrl;
  private stateIndex: number = 0;
  private counter: Counter;

  constructor(containerWidth: number, containerHeight: number, containerX: number, containerY: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.containerX = containerX;
    this.containerY = containerY;

    this.debugFrameImage = Sprite.from('emptyFrame');


    const horizontalRatio = this.containerWidth / this.debugFrameImage.width; //available/original
    const verticalRatio = this.containerHeight / this.debugFrameImage.height;
    const criticalScale = Math.min(horizontalRatio, verticalRatio);

    this.debugFrameImage.scale.set(criticalScale);

    this.debugFrameImage.anchor.set(0.5, 0.5);
    this.debugFrameImage.position.set(this.containerX, this.containerY);

    this.reels = new ReelsCtrl(this.debugFrameImage.width, this.debugFrameImage.height, this.containerX, this.containerY);
    const buttonSpin = new ButtonSpin(this.debugFrameImage.width, this.debugFrameImage.height, this.containerX, this.containerY);
    this.counter = new Counter(this.debugFrameImage.width, this.debugFrameImage.height, this.containerX, this.containerY);


    this.addChild(this.debugFrameImage as Sprite & DisplayObject, this.reels as ReelsCtrl & DisplayObject, buttonSpin as ButtonSpin & DisplayObject, this.counter as Counter & DisplayObject);

    //Game dinamics

    buttonSpin.eventMode = 'auto';  // This makes the button interactive, similar to interactive = true

    buttonSpin.interactive = true;  // This makes the button interactive


    buttonSpin.on("click", handleInteraction, this);
    buttonSpin.on("tap", handleInteraction, this);

    function handleInteraction(this: any) {
      // Call the handleButton() method.
      this.handleButton();

      // Make the button non-interactive immediately after it's clicked/tapped.
      buttonSpin.interactive = false;  // This makes the button non-interactive

      // Use setTimeout to make the button interactive again after 10 seconds.
      setTimeout(() => {
        buttonSpin.interactive = true;  // Make it interactive again after the timeout
      }, 10000); // 10000 milliseconds = 10 seconds
    }



  }

  private handleButton(): void {
    this.counter.updateMsg(1);
    this.reels.triggerAnimation(states["machine-state"][this.stateIndex].reels, () => {
      this.counter.updateMsg(2, states["machine-state"][this.stateIndex].win);
    });
    this.stateIndex++;
  }
}





