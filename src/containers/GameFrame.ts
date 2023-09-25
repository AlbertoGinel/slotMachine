import { Container, Sprite } from "pixi.js";
import { ReelsCtrl } from "./ReelsCtrl";
import { ButtonSpin } from "./ButtonSpin";
import { Counter } from "./Counter";
import states from "../../public/states.json";

export class GameFrame extends Container {

  private containerWidth: number;
  private containerHeight: number;
  private containerScale: number;
  private containerX: number;
  private containerY: number;

  private debugFrameImage: Sprite;

  private reels: ReelsCtrl;
  private stateIndex: number = 0;
  private counter: Counter;

  constructor(containerWidth: number, containerHeight: number, containerScale: number, containerX: number, containerY: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.containerScale = containerScale;
    this.containerX = containerX;
    this.containerY = containerY;

    this.debugFrameImage = Sprite.from('emptyFrame');


    const horizontalRatio = this.containerWidth / this.debugFrameImage.width; //available/original
    const verticalRatio = this.containerHeight / this.debugFrameImage.height;
    const criticalScale = Math.min(horizontalRatio, verticalRatio);

    this.debugFrameImage.scale.set(criticalScale);

    this.debugFrameImage.anchor.set(0.5, 0.5);
    this.debugFrameImage.position.set(this.containerX, this.containerY);

    this.reels = new ReelsCtrl(this.debugFrameImage.width, this.debugFrameImage.height, this.containerScale, this.containerX, this.containerY);
    const buttonSpin = new ButtonSpin(this.debugFrameImage.width, this.debugFrameImage.height, this.containerScale, this.containerX, this.containerY);
    this.counter = new Counter(this.debugFrameImage.width, this.debugFrameImage.height, this.containerScale, this.containerX, this.containerY);


    this.addChild(this.debugFrameImage, this.reels, buttonSpin, this.counter);

    //Game dinamics

    buttonSpin.interactive = true;
    buttonSpin.on("click", () => {
      // Call the spin1() method.
      this.handleButton();

      // Make the button non-interactive immediately after it's clicked.
      buttonSpin.interactive = false;

      // Use setTimeout to make the button interactive again after 10 seconds.
      setTimeout(() => {
        buttonSpin.interactive = true;
      }, 10000); // 10000 milliseconds = 10 seconds
    }, this);
  }

  handleButton() {
    this.counter.updateMsg(1);
    console.log('state Index: ', this.stateIndex);
    this.reels.triggerAnimation(states["machine-state"][this.stateIndex].reels, () => {
      this.counter.updateMsg(2, states["machine-state"][this.stateIndex].win);
    });
    this.stateIndex++;
  }
}





