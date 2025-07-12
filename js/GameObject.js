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

  render(ctx, cameraX, cameraY) {

  }
}

export class Bush extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.spriteWidth = 3 * SOURCE_TILE_SIZE;
    this.spriteHeight = 2 * SOURCE_TILE_SIZE;
    this.solid = false;
    this.coverPlayer = true;
  }

  render(ctx, cameraX, cameraY) {
    const screenX = this.x * RENDER_TILE_SIZE + cameraX; // actually it is screenX
    const screenY = this.y * RENDER_TILE_SIZE + cameraY;

    ctx.drawImage(this.spritesheet,
                  0, 0, // sx, sy
                  this.spriteWidth, this.spriteHeight, // sw, sh
                  Math.floor(screenX), // pos x
                  Math.floor(screenY), // pos y
                  this.spriteWidth, 
                  this.spriteHeight
                  );
  }
}

// сделать что-то типа бинмапы досутпности спавна объекта
// ставим куст - помечаем занятые клетки, ставим новый куст - проверяем занято
// или нет - ставим если свободно