import { Container, Sprite, BitmapText, BitmapFont, DisplayObject } from "pixi.js";

export class Counter extends Container {

  private containerWidth: number;
  private containerHeight: number;
  //private containerScale: number;
  private containerX: number;
  private containerY: number;

  private CounterImage: Sprite;

  private bitmapText: BitmapText;


  constructor(containerWidth: number, containerHeight: number, containerX: number, containerY: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    //this.containerScale = containerScale;
    this.containerX = containerX;
    this.containerY = containerY;


    this.CounterImage = Sprite.from('counter');


    const horizontalRatio = this.containerWidth / this.CounterImage.width;
    const verticalRatio = this.containerHeight / this.CounterImage.height;
    const criticalScale = Math.min(horizontalRatio, verticalRatio);


    this.CounterImage.anchor.set(0.5, 0.5);
    this.CounterImage.scale.set(criticalScale * 0.18); //TODO magic number
    this.CounterImage.position.set(this.containerX, this.containerY + (this.containerHeight * 0.4));



    BitmapFont.from('Space Grotesk', { //TODO magic font
      fill: '#ffffff',
      fontFamily: 'Space Grotesk',
      fontSize: 64
    }, { chars: BitmapFont.ASCII });

    // in this case the font is in a file called 'desyrel.fnt'
    this.bitmapText = new BitmapText('Ready? \n Press the button!', {
      fontName: 'Space Grotesk',
      fontSize: 35,
      align: 'center',
    });

    this.bitmapText.anchor.set(0.5, 0.5);
    this.bitmapText.scale.set(criticalScale * 0.23); //TODO magic number
    this.bitmapText.position.set(this.containerX, this.containerY + (this.containerHeight * 0.395));


    this.addChild(this.CounterImage as Sprite & DisplayObject, this.bitmapText as BitmapText & DisplayObject);

  }


  updateMsg(option: number, win?: number) {
    switch (option) {
      case 0:
        this.bitmapText.text = "Ready?\nPress the button!";
        break;
      case 1:
        this.bitmapText.text = "Good\nluck!";
        break;
      case 2:
        if (typeof win !== 'undefined') {
          this.bitmapText.text = `Win: \n USD ${win}`;
        } else {
          this.bitmapText.text = "Win: \n USD ---";
        }
        break;
      default:
        console.error("Invalid option provided to updateMsg");
        break;
    }
  }

}
