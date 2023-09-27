### Slot Machine

![Game](/slotMachine/ReadMeImages/ReadMe.jpeg)

[Play it!](https://slot-machine-git-deploymentvercel-albertoginel.vercel.app/)

### Install and run

```
$ npm install
$ npm run dev
```

### Structure

Positioning

I employ a cascading system to position the Sprite elements. Each object's position is determined by its parent, which is the reason the constructor requires multiple parameters related to the container.

The following step is to determine the scale of the object to ensure it fits within its parent. For this, I utilize the "critical Scale" method. This involves adjusting the sprite's dimensions, either in width or height, so that it snugly fits within its parent container.

```js
constructor(containerWidth: number, containerHeight: number, containerScale: number, containerX: number, containerY: number) {
    super();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.containerScale = containerScale;
    this.containerX = containerX;
    this.containerY = containerY;

    this.debugFrameImage = Sprite.from('emptyFrame');

    //make the sprite wide or tall enough to fit it its parent, this is the criticalScale
    const horizontalRatio = this.containerWidth / this.debugFrameImage.width; //available/original
    const verticalRatio = this.containerHeight / this.debugFrameImage.height;
    const criticalScale = Math.min(horizontalRatio, verticalRatio)
    this.debugFrameImage.scale.set(criticalScale);

    this.debugFrameImage.anchor.set(0.5, 0.5);
    this.debugFrameImage.position.set(this.containerX, this.containerY);
```

![tree diagram](/slotMachine/ReadMeImages/tree.jpeg)

A reel is made out of 4 symbol boxes that flow from bot to bottom, at the bottom they restart back to the top with a new symbol.

![loop diagram](/slotMachine/ReadMeImages/loop.jpeg)
