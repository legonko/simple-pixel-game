import { RENDER_TILE_SIZE, SOURCE_TILE_SIZE } from "./config.js";

export class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spritesheet = new Image();
    this.spritesheet.src = "../assets/sprites/objects.png";
  }

  update(dt) {

  }

  render(ctx, screenOffsetX, screenOffsetY) {
    ctx.drawImage(this.spritesheet,
      this.spritePosX * SOURCE_TILE_SIZE, // sx
      this.spritePosY * SOURCE_TILE_SIZE, // sy
      this.spriteWidth  * SOURCE_TILE_SIZE, //sw
      this.spriteHeight * SOURCE_TILE_SIZE, // sh
      Math.floor(this.x * RENDER_TILE_SIZE + screenOffsetX), // pos x
      Math.floor(this.y * RENDER_TILE_SIZE + screenOffsetY), // pos y
      RENDER_TILE_SIZE * this.spriteWidth, 
      RENDER_TILE_SIZE * this.spriteHeight
      );

      ctx.fillStyle = 'black';
      ctx.fillRect(
        this.x * RENDER_TILE_SIZE + screenOffsetX,
        (this.y + this.spriteHeight) * RENDER_TILE_SIZE + screenOffsetY,
        4, 4
      );
  }
}

export class Bush extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.spriteWidth = 2; // in tiles
    this.spriteHeight = 2;
    this.spriteOffset = 0.5; // for bottom shadow
    this.spritePosX = 2; // position on the spritesheet
    this.spritePosY = 0;
    this.solid = false;
    this.zIndex = 1;
  }
}

export class SmallLeave extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.spriteWidth = 1; // in tiles
    this.spriteHeight = 1;
    this.spritePosX = 3; // position on the spritesheet
    this.spritePosY = 2;
    this.solid = false;
    this.spriteOffset = 0;
    this.zIndex = 0;
  }
}

export class SmallRock extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.spriteWidth = 1; // in tiles
    this.spriteHeight = 1;
    this.spritePosX = 2; // position on the spritesheet
    this.spritePosY = 2;
    this.solid = false;
    this.spriteOffset = 0;
    this.zIndex = 0;
  }
}

export class Rock extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.spriteWidth = 2; // in tiles
    this.spriteHeight = 2;
    this.spriteOffset = 0.5; // for bottom shadow
    this.spritePosX = 0; // position on the spritesheet
    this.spritePosY = 4;
    this.obstacle = true;
    this.zIndex = 1;
  }
}