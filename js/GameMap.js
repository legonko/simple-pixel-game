import { Chunk } from "./Chunk.js";
import { CHUNK_SIZE, RENDER_TILE_SIZE, SOURCE_TILE_SIZE } from "./config.js";

export class GameMap extends Map {
  constructor(ctx, noise) {
    super();
    this.ctx = ctx;
    this.noise = noise;
  }

  _chunkKey(chunkX, chunkY) {
    return `${chunkX},${chunkY}`;
  }

  setChunk(chunkX, chunkY) {
    const key = this._chunkKey(chunkX, chunkY);
    if (!this.has(key)) {
      const chunk = new Chunk(chunkX, chunkY, this.noise);
      this.set(key, chunk);
    }
  }

  _getChunk(chunkX, chunkY) {
    const key = this._chunkKey(chunkX, chunkY);
    return this.get(key);
  }

  _getChunkCoords(tileX, tileY) {
    const chunkX = Math.floor(tileX / CHUNK_SIZE);
    const chunkY = Math.floor(tileY / CHUNK_SIZE);
  
    const localX = Math.floor(((tileX % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE);
    const localY = Math.floor(((tileY % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE);

    return [chunkX, chunkY, localX, localY];
  }

  getTileAt(tileX, tileY) {
    const [chunkX, chunkY, localX, localY] = this._getChunkCoords(tileX, tileY);
    const chunk = this._getChunk(chunkX, chunkY);  
    return chunk?.tiles[localY][localX] || null;
  }

  getObstAt(tileX, tileY) {
    const [chunkX, chunkY, localX, localY] = this._getChunkCoords(tileX, tileY);
    const chunk = this._getChunk(chunkX, chunkY);  
    return chunk?.obstaclesBinMap[localY][localX] || null;
  }

  _getVisibleChunkXY(cameraX, cameraY, canvas) {
    const pixelsPerChunk = CHUNK_SIZE * RENDER_TILE_SIZE;

    const screenChunkStartX = Math.floor(cameraX / pixelsPerChunk) - 1;
    const screenChunkStartY = Math.floor(cameraY / pixelsPerChunk) - 1;
  
    const screenChunkEndX = Math.floor((cameraX + canvas.width) / pixelsPerChunk) + 1;
    const screenChunkEndY = Math.floor((cameraY + canvas.height) / pixelsPerChunk) + 1;

    return [screenChunkStartX, screenChunkStartY, screenChunkEndX, screenChunkEndY];
  }

  createMapLayout(cameraX, cameraY, canvas) {
    const [screenChunkStartX, 
          screenChunkStartY, 
          screenChunkEndX, 
          screenChunkEndY] = this._getVisibleChunkXY(cameraX, cameraY, canvas);
  
    for (let chunkY = screenChunkStartY; chunkY <= screenChunkEndY; chunkY++) {
      for (let chunkX = screenChunkStartX; chunkX <= screenChunkEndX; chunkX++) {
        this.setChunk(chunkX, chunkY);
      }
    }
  }

  renderMap(cameraX, cameraY, player) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    const foregroundObjectsList = [];
    const backgroundObjectList = [];

    const [screenChunkStartX, 
          screenChunkStartY, 
          screenChunkEndX, 
          screenChunkEndY
          ] = this._getVisibleChunkXY(cameraX, cameraY, canvas);

    for (let chunkY = screenChunkStartY; chunkY <= screenChunkEndY; chunkY++) {
      for (let chunkX = screenChunkStartX; chunkX <= screenChunkEndX; chunkX++) {
        const chunk = this._getChunk(chunkX, chunkY);
        if (!chunk) continue;

        const worldPixelX = chunkX * CHUNK_SIZE * RENDER_TILE_SIZE;
        const worldPixelY = chunkY * CHUNK_SIZE * RENDER_TILE_SIZE;
  
        const screenY = worldPixelY - cameraY;
        const screenX = worldPixelX - cameraX;
        
        chunk.renderChunk(this.ctx, screenX, screenY, this);

        backgroundObjectList.push(...chunk.getRenderableBgObjects().map(obj => ({
          ...obj,
          screenX,
          screenY
        })));

        foregroundObjectsList.push(...chunk.getRenderableFgObjects().map(obj => ({
          ...obj,
          screenX,
          screenY
        })));
      }
    }

    foregroundObjectsList.push({
      type: 'player',
      entity: player,
      sortY: player.y,
      screenX: 0,
      screenY: 0
    })

    foregroundObjectsList.sort((a, b) => {
      if (a.sortY !== b.sortY) return a.sortY - b.sortY;
      return a.type === 'player' ? -1 : 1;
    });

    const renderObjects = [...backgroundObjectList, ...foregroundObjectsList]; 

    renderObjects.forEach(item => {
      if (item.type === "player") {
        item.entity.renderPlayer(this.ctx, cameraX, cameraY);
      }
      else {
        item.entity.render(this.ctx, item.screenX, item.screenY);
      }
    });
  } 
}