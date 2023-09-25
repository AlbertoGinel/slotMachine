import { Container, Sprite, Graphics } from "pixi.js";
import { Symbol } from "./Symbol";
import gsap from "gsap";

export class Reel extends Container {

  private containerWidth: number;
  private containerHeight: number;
  private containerScale: number;
  private containerX: number;
  private containerY: number;

  private debugReelImage: Sprite;

  private symbol0: Symbol;
  private symbol1: Symbol;
  private symbol2: Symbol;
  private symbol3: Symbol;

  private masterTimeline: gsap.core.Timeline = gsap.timeline();

  constructor(containerWidth: number, containerHeight: number, containerScale: number, containerX: number, containerY: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.containerScale = containerScale;
    this.containerX = containerX;
    this.containerY = containerY;


    this.debugReelImage = Sprite.from('emptyReel')

    const horizontalRatio = this.containerWidth / this.debugReelImage.width;
    const verticalRatio = this.containerHeight / this.debugReelImage.height;
    const criticalScale = Math.min(horizontalRatio, verticalRatio);

    this.debugReelImage.scale.set(criticalScale * containerScale);

    //center of the screen
    this.debugReelImage.anchor.set(0.5, 0.5);
    this.debugReelImage.position.set(containerX, containerY);

    this.symbol0 = new Symbol(this.containerWidth, this.containerHeight, 1, this.containerX, this.containerY - (this.containerHeight * 0.5));
    this.symbol1 = new Symbol(this.containerWidth, this.containerHeight, 1, this.containerX, this.containerY - (this.containerHeight * 0.25));
    this.symbol2 = new Symbol(this.containerWidth, this.containerHeight, 1, this.containerX, this.containerY);
    this.symbol3 = new Symbol(this.containerWidth, this.containerHeight, 1, this.containerX, this.containerY + (this.containerHeight * 0.25));

    this.addChild(this.debugReelImage, this.symbol1, this.symbol2, this.symbol3, this.symbol0);

    //mask the reel

    const mask = new Graphics();
    mask.beginFill(0xFFFFFF);
    mask.drawRect(this.debugReelImage.x - this.debugReelImage.width / 2, this.debugReelImage.y - this.debugReelImage.height / 2, this.debugReelImage.width, this.debugReelImage.height); // Draw a circle at (400, 300) with a radius of 150
    mask.endFill();
    this.addChild(mask);
    this.mask = mask;



  }

  resetSymbols() {
    this.symbol0.x = 0;
    this.symbol0.y = 0;
    this.symbol1.x = 0;
    this.symbol1.y = 0;
    this.symbol2.x = 0;
    this.symbol2.y = 0;
    this.symbol3.x = 0;
    this.symbol3.y = 0;
  }

  basicSpining(loopDuration: number, numberOfLoops: number): gsap.core.Timeline[] {

    //spins 4

    this.resetSymbols();

    const tl0 = gsap.timeline({ repeat: numberOfLoops });
    const tl1 = gsap.timeline({ repeat: numberOfLoops });
    const tl2 = gsap.timeline({ repeat: numberOfLoops });
    const tl3 = gsap.timeline({ repeat: numberOfLoops });


    tl0.to(this.symbol0, { y: this.height * 1, duration: loopDuration, ease: "none", onComplete: () => { this.symbol0.changeSymbol("") } }).set(this.symbol0, { y: 0 }, ">");

    tl1.to(this.symbol1, { y: this.height * 3 / 4, duration: loopDuration * 3 / 4, ease: "none", onComplete: () => { this.symbol1.changeSymbol("") } }, ">")
      .set(this.symbol1, { y: this.height * -1 / 4 }, ">")
      .to(this.symbol1, { y: 0, duration: loopDuration * 1 / 4, ease: "none" }, ">");

    tl2.to(this.symbol2, { y: this.height * 2 / 4, duration: loopDuration * 2 / 4, ease: "none", onComplete: () => { this.symbol2.changeSymbol("") } }, ">")
      .set(this.symbol2, { y: this.height * -2 / 4 }, ">")
      .to(this.symbol2, { y: 0, duration: loopDuration * 2 / 4, ease: "none" }, ">");

    tl3.to(this.symbol3, { y: this.height * 1 / 4, duration: loopDuration * 1 / 4, ease: "none", onComplete: () => { this.symbol3.changeSymbol("") } }, ">")
      .set(this.symbol3, { y: this.height * -3 / 4 }, ">")
      .to(this.symbol3, { y: 0, duration: loopDuration * 3 / 4, ease: "none" }, ">");

    return [tl0, tl1, tl2, tl3];
  }

  stopSpining(loopDuration: number, reelSymbols: string[]): gsap.core.Timeline[] {

    //spins 4 boxes

    const tl0 = gsap.timeline({});
    const tl1 = gsap.timeline({});
    const tl2 = gsap.timeline({});
    const tl3 = gsap.timeline({});


    tl0.set(this.symbol0, { onComplete: () => { this.symbol0.changeSymbol(reelSymbols[1]) } })
      .to(this.symbol0, { y: this.height * 1 / 4, duration: loopDuration * 1 / 20, ease: "none" }, ">")
      .to(this.symbol0, { y: this.height * 2 / 4, duration: loopDuration * 19 / 20, ease: "elastic.out(1, 0.2)" }, ">");

    tl1.set(this.symbol1, { onComplete: () => { this.symbol1.changeSymbol(reelSymbols[2]) } })
      .to(this.symbol1, { y: this.height * 1 / 4, duration: loopDuration * 1 / 20, ease: "none" }, ">")
      .to(this.symbol1, { y: this.height * 2 / 4, duration: loopDuration * 19 / 20, ease: "elastic.out(1, 0.2)" }, ">");

    tl2.to(this.symbol2, { y: this.height * 1 / 4, duration: loopDuration * 1 / 20, ease: "none" }, ">")
      .to(this.symbol2, { y: this.height * 2 / 4, duration: loopDuration * 19 / 20, ease: "elastic.out(1, 0.2)" }, ">");

    tl3.set(this.symbol3, { onComplete: () => { this.symbol3.changeSymbol(reelSymbols[0]) } })
      .to(this.symbol3, { y: this.height * 1 / 4, duration: loopDuration * 1 / 20, ease: "none" }, ">")
      .set(this.symbol3, { y: this.height * -3 / 4 }, ">")
      .to(this.symbol3, { y: this.height * -2 / 4, duration: loopDuration * 19 / 20, ease: "elastic.out(1, 0.2)" }, ">");

    return [tl0, tl1, tl2, tl3];
  }

  triggerAnimation(delayCicle: number, reelSymbols: string[], callback?: () => void): void {

    this.masterTimeline.clear();

    for (let i = 0; i < delayCicle; i++) {
      this.masterTimeline.add(this.basicSpining(0.37, 7));

      if (i == 2) {
        this.masterTimeline.call(() => {
          if (callback) {
            callback();
          }
        });
      }
    }

    this.masterTimeline.add(this.stopSpining(2, reelSymbols));
  }

}
