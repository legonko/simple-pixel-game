import { SOURCE_TILE_SIZE, RENDER_TILE_SIZE, CHUNK_SIZE } from "./config.js";

export class Player {
  constructor(x, y) {
    this.x = x; // global coordinates in tiles
    this.y = y;
    this.speed = 5; //3
    this.orientation = "down";
    this.isMoving = false;
    this.frame = 0
    this.frameTime = 0;
    this.frameDuration = 0.4;
    this.spritesheet = new Image();
    this.spritesheet.src = "../assets/sprites/character.png";
    this.sprites = this._getSprites();
  }

  _getSprites() {
    // orientation: [idle, walk1, walk2] - indices on spritesheet
    const sprites = {
      up:    [[3, 0], [3, 1], [3, 2]],
      down:  [[0, 0], [0, 1], [0, 2]],
      left:  [[1, 0], [1, 1], [1, 2]],
      right: [[2, 0], [2, 1], [2, 2]]
    }
    return sprites;
  }

  renderPlayer(ctx, cameraX, cameraY) {
    ctx.imageSmoothingEnabled = false;
    
    const screenX = (this.x - 1) * RENDER_TILE_SIZE - cameraX; 
    const screenY = (this.y - 2) * RENDER_TILE_SIZE - cameraY;

    const spriteXY = this.isMoving
    ? this.sprites[this.orientation][this.frame + 1]
    : this.sprites[this.orientation][0]; 

    ctx.drawImage(this.spritesheet,
                  spriteXY[0] * SOURCE_TILE_SIZE * 2, spriteXY[1] * SOURCE_TILE_SIZE * 2, // sx, sy
                  SOURCE_TILE_SIZE * 2, SOURCE_TILE_SIZE * 2, // sw, sh
                  Math.floor(screenX), // pos x
                  Math.floor(screenY), // pos y
                  RENDER_TILE_SIZE * 2, 
                  RENDER_TILE_SIZE * 2
                  );
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.x* RENDER_TILE_SIZE - cameraX, 
      this.y* RENDER_TILE_SIZE - cameraY, 
      4, 4
    );
    ctx.fillStyle = 'blue';
    ctx.fillRect(
      screenX,
      screenY,
      4, 4
    );
  }

  update(dt, input, gameMap) {
    this.isMoving = false;

    const moveActions = {
      w: { xCoeff:  0, yCoeff: -1, orientation: "up" },
      s: { xCoeff:  0, yCoeff:  1, orientation: "down" },
      a: { xCoeff: -1, yCoeff:  0, orientation: "left" },
      d: { xCoeff:  1, yCoeff:  0, orientation: "right" }      
    }

    for (const [key, action] of Object.entries(moveActions)) {
      if (input[key]) {
        this.isMoving = true;
        this.orientation = action.orientation;
        this.tryMove(action.xCoeff * this.speed * dt, action.yCoeff * this.speed * dt, gameMap);
      }
    }

    if (this.isMoving) {
      this.frameTime += dt;
      if (this.frameTime >= this.frameDuration) {
        this.frame = (this.frame + 1) % 2;
        this.frameTime = 0;
      }
    } else {
      this.frame = 0;
    }
  }

  tryMove(dx, dy, gameMap) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    const tile = gameMap.getTileAt(newX, newY);
    const obst = gameMap.getObstAt(newX, newY);

    if (tile.type != "water" && !obst) {
      this.x = newX;
      this.y = newY;
    }
  }
}