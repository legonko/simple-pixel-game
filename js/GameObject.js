import { RENDER_TILE_SIZE, SOURCE_TILE_SIZE } from "./config.js";

const gameObjects = {
  bush:                      {spriteWidth: 2, spriteHeight: 2, spriteOffset: 0.5, spritePosX: 2, spritePosY: 0, zIndex: 1, isObstacle: false},
  rock:                      {spriteWidth: 2, spriteHeight: 2, spriteOffset: 0.5, spritePosX: 0, spritePosY: 7, zIndex: 1, isObstacle: true},
  smallLeave:                {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 3, spritePosY: 2, zIndex: 0, isObstacle: false},
  smallFlowerRed:            {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 2, spritePosY: 3, zIndex: 0, isObstacle: false},
  smallFlowerYellow:         {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 3, spritePosY: 3, zIndex: 0, isObstacle: false},
  smallStone:                {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 1, spritePosY: 6, zIndex: 0, isObstacle: false},
  stump:                     {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 1, spritePosY: 3, zIndex: 1, isObstacle: true},
  smallGrass:                {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 2, spritePosY: 2, zIndex: 1, isObstacle: false},
  smallMushroomRed:          {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 1, spritePosY: 1, zIndex: 1, isObstacle: false},
  smallMushroomBrown:        {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 1, spritePosY: 2, zIndex: 1, isObstacle: false},
  smallMushroomGray:         {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 0, spritePosY: 3, zIndex: 1, isObstacle: false},
  berryBush:                 {spriteWidth: 2, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 0, spritePosY: 0, zIndex: 1, isObstacle: false},
  smallBush:                 {spriteWidth: 1, spriteHeight: 1, spriteOffset: 0.0, spritePosX: 4, spritePosY: 0, zIndex: 1, isObstacle: false},
};

export class GameObject {
  constructor(x, y, objName, path) {
    this.x = x;
    this.y = y;
    Object.assign(this, this._classifyObject(objName));
    this.spritesheet = new Image();
    this.spritesheet.src = "./assets/sprites/" + path;
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

      // this._debugRender();  
  }

  _debugRender() {
    ctx.fillStyle = 'black';
    ctx.fillRect(
      this.x * RENDER_TILE_SIZE + screenOffsetX,
      (this.y + this.spriteHeight) * RENDER_TILE_SIZE + screenOffsetY,
      4, 4
    );
  }

  _classifyObject(objName) {
    return gameObjects[objName];
  }
}