### Slot Machine


<picture>
    <img src="https://github.com/AlbertoGinel/slotMachine/blob/main/ReadMeImages/ReadMe.jpeg" alt="Game" width="600"/>
</picture>


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


The order of spining cascades from GameFrame, this class contains the button, the counter and the ReelsCtrl.
Pressing the button triggers updateMsg() to Counter and triggerAnimation(State,callback) (callback needed to update counter) in ReelsCtrl.

ReelCtrl sends triggerAnimation() to the three reels, with the number of 3 seconds term before revealing.

Reel has 4 symbols and its going to control them by adding animations to its timeline, there are 2 animations: basicSpining and stopSpining:
basicSpining makes the symbols loop for 3 seconds.
stopSpining sets the symbols as is determined by the state with a bouncing animation

Symbols contains the function: changeSymbol(symbol: string) what is triggered at the top of the reel to give a random value to the symbol.

<picture>
    <img src="https://github.com/AlbertoGinel/slotMachine/blob/main/ReadMeImages/tree.jpeg" alt="tree diagram" width="600"/>
</picture>

A reel is made out of 4 symbol boxes that flow from bot to bottom, at the bottom they restart back to the top with a new symbol.


<picture>
    <img src="https://github.com/AlbertoGinel/slotMachine/blob/main/ReadMeImages/loop.jpeg" alt="loop diagram" width="150"/>
</picture>
