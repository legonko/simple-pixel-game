import { Chunk } from "./Chunk.js";
import { CHUNK_SIZE, RENDER_TILE_SIZE, SOURCE_TILE_SIZE } from "./config.js";

export class GameMap extends Map {
  constructor(ctx, noise) {
    super();
    this.ctx = ctx;
    this.noise = noise;
  }

  setChunk(chunkX, chunkY) {
    const key = `${chunkX},${chunkY}`;
    if (!this.has(key)) {
      const chunk = new Chunk(chunkX, chunkY, this.noise);
      this.set(key, chunk);
    }
  }

  getChunk(chunkX, chunkY) {
    const key = `${chunkX},${chunkY}`;
    return this.get(key)
  }

  getTileAt(tileX, tileY) {
    const chunkX = Math.floor(tileX / CHUNK_SIZE);
    const chunkY = Math.floor(tileY / CHUNK_SIZE);
  
    const localX = Math.floor(((tileX % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE);
    const localY = Math.floor(((tileY % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE);
  
    const chunk = this.getChunk(chunkX, chunkY);
    // console.log(chunk.tiles)
  
    if (!chunk) return null;
  
    return chunk.tiles[localY][localX];
  }

  calculateVisibleChunkXY(cameraX, cameraY, canvas) {
    const pixelsPerChunk = CHUNK_SIZE * RENDER_TILE_SIZE;

    const screenChunkStartX = Math.floor(cameraX / pixelsPerChunk) - 1; // раньше умножалось на тайлсайз
    const screenChunkStartY = Math.floor(cameraY / pixelsPerChunk) - 1; //  тут
  
    const screenChunkEndX = Math.floor((cameraX + canvas.width) / pixelsPerChunk) + 1; //  тут
    const screenChunkEndY = Math.floor((cameraY + canvas.height) / pixelsPerChunk) + 1; //  тут

    return [screenChunkStartX, screenChunkStartY, screenChunkEndX, screenChunkEndY]
  }

  createMapLayout(cameraX, cameraY, canvas) {
    const [screenChunkStartX, 
          screenChunkStartY, 
          screenChunkEndX, 
          screenChunkEndY] = this.calculateVisibleChunkXY(cameraX, cameraY, canvas);
  
    for (let chunkY = screenChunkStartY; chunkY <= screenChunkEndY; chunkY++) {
      for (let chunkX = screenChunkStartX; chunkX <= screenChunkEndX; chunkX++) {
        this.setChunk(chunkX, chunkY);
      }
    }
  }

  renderMap(cameraX, cameraY) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    const [screenChunkStartX, 
          screenChunkStartY, 
          screenChunkEndX, 
          screenChunkEndY] = this.calculateVisibleChunkXY(cameraX, cameraY, canvas);

    for (let chunkY = screenChunkStartY; chunkY <= screenChunkEndY; chunkY++) {
      for (let chunkX = screenChunkStartX; chunkX <= screenChunkEndX; chunkX++) {
        const worldPixelX = chunkX * CHUNK_SIZE * RENDER_TILE_SIZE;
        const worldPixelY = chunkY * CHUNK_SIZE * RENDER_TILE_SIZE;
  
        const screenX = worldPixelX - cameraX; //  тут
        const screenY = worldPixelY - cameraY; //  тут
        
        const chunk = this.getChunk(chunkX, chunkY);
        chunk.renderChunk(this.ctx, screenX, screenY, this);
      }
    }
  }
}