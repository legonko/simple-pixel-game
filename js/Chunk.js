import { CHUNK_SIZE, RENDER_TILE_SIZE, SOURCE_TILE_SIZE } from "./config.js";
import { GameObject } from "./GameObject.js";
import { Tile } from './Tile.js';

const WATER_TYPES = ["water", "ice", "deepWater", "swampWater"];

const bitmaskLayout = {
  0: [3, 3],
  1: [3, 3],
  4: [3, 3],
  128: [3, 3],
  32: [3, 3],
  11: [0, 0],
  175: [0, 0],
  15: [0, 0],
  47: [0, 0],
  207: [0, 5],
  203: [0, 5],
  124: [3, 5],
  43: [0, 0],
  31: [1, 0],
  191: [1, 0],
  159: [1, 0],
  63: [1, 0],
  22: [2, 0],
  23: [2, 0],
  183: [2, 0],
  151: [2, 0],
  117: [6, 6],
  150: [2, 0],
  107: [0, 1],
  239: [0, 1],
  235: [0, 1],
  111: [0, 1],
  255: [1, 1],
  214: [2, 1],
  246: [2, 1],
  247: [2, 1],
  230: [3, 1],
  215: [2, 1],
  231: [3, 1],
  104: [0, 2],
  236: [0, 2],
  233: [0, 2],
  232: [0, 2],
  125: [3, 5],
  110: [0, 4],
  145: [2, 3],
  105: [0, 2],
  248: [1, 2],
  208: [2, 2],
  244: [2, 2],
  240: [2, 2],
  212: [2, 2],
  241: [2, 2],
  213: [2, 2],
  211: [1, 4],
  221: [2, 5],
  217: [2, 5],
  2: [3, 0],
  7: [3, 0],
  135: [3, 0],
  3: [3, 0],
  55: [2, 0],
  66: [3, 1],
  194: [3, 1],
  226: [3, 1],
  198: [3, 1],
  227: [3, 1],
  98: [3, 1],
  71: [3, 1],
  70: [3, 1],
  195: [3, 1],
  199: [3, 1],
  6: [3, 1],
  64: [3, 2],
  192: [3, 2],
  224: [3, 2],
  68: [3, 2],
  96: [3, 2],
  8: [0, 3],
  41: [0, 3],
  45: [0, 3],
  44: [0, 3],
  24: [1, 3],
  108: [0, 2],
  152: [1, 3],
  156: [1, 3],
  56: [1, 3],
  157: [1, 3],
  57: [1, 3],
  184: [1, 3],
  185: [1, 3],
  188: [1, 3],
  189: [1, 3],
  60: [1, 3],
  153: [1, 3],
  61: [1, 3],
  28: [1, 3],
  25: [1, 3],
  16: [2, 3],
  144: [2, 3],
  148: [2, 3],
  176: [2, 3],
  20: [2, 3],
  52: [2, 3],
  254: [4, 0],
  252: [1, 2],
  253: [1, 2],
  223: [4, 1],
  251: [5, 0],
  249: [1, 2],
  127: [5, 1],
  123: [6, 0],
  95: [6, 1],
  222: [6, 2],
  250: [6, 3],
  94: [4, 2],
  218: [4, 3],
  122: [5, 2],
  91: [5, 3],
  106: [0, 4],
  234: [0, 4],
  75: [0, 5],
  79: [0, 5],
  210: [1, 4],
  242: [1, 4],
  86: [1, 5],
  87: [1, 5],
  118: [1, 5],
  119: [1, 5],
  30: [2, 4],
  190: [2, 4],
  158: [2, 4],
  59: [3, 4],
  216: [2, 5],
  220: [2, 5],
  27: [3, 4],
  121: [3, 5],
  120: [3, 5],
  219: [2, 6],
  126: [3, 6],
  10: [4, 4],
  46: [4, 4],
  74: [4, 5],
  72: [4, 6],
  26: [5, 4],
  90: [5, 5],
  88: [5, 6],
  92: [5, 6],
  18: [6, 4],
  146: [6, 4],
  82: [6, 5],
  80: [6, 6],
  84: [6, 6],
  116: [6, 6],
  62: [2, 4],
  147: [6, 4],
  102: [3, 1],
  109: [0, 2],
  38: [3, 0],
  42: [4, 4],
  201: [4, 6],
  14: [4, 4],
  243: [1, 4],
  40: [0, 3],
  196: [3, 2],
  154: [5, 4],
  237: [0, 2],
  182: [2, 0],
  103: [3, 1],
  179: [6, 4],
  238: [0, 4],
  181: [2, 3],
  166: [3, 0],
  53: [2, 3],
  167: [3, 0],
  99: [3, 1],
  54: [2, 0],
  180: [2, 3],
  58: [5, 4],
  173: [0, 3],
  83: [6, 5],
  209: [2, 2],
  115: [6, 5],
  245: [2, 2],
  143: [0, 0],
  228: [3, 2],
  136: [0, 3],
  137: [0, 3],
  171: [0, 0],
  170: [4, 4],
  13: [0, 3],
  93: [5, 6],
  33: [3, 3],
  187: [3, 4],
  225: [3, 2],
  202: [4, 5],
  186: [5, 4],
  89: [5, 6],
  155: [3, 4],
  85: [6, 6],
  112: [6, 6],
  134: [3, 0],
  49: [2, 3],
  149: [2, 3],
  73: [4, 6],
  29: [1, 3],
  37: [3, 3],
  206: [4, 5],
  169: [0, 3],
  12: [0, 3],
  174: [4, 4],
  51: [6, 4],
  172: [0, 3],
  163: [3, 0],
  17: [2, 3],
  204: [4, 6],
  113: [6, 6],
  78: [4, 5],
  200: [4, 6],
  19: [6, 4],
  229: [3, 2],
  81: [6, 6],
  139: [0, 0],
  21: [2, 3],
  138: [4, 4],
  77: [4, 6],
  141: [0, 3],
  39: [3, 0],
  142: [4, 4],
  131: [3, 0],
  130: [3, 0],
  50: [6, 4],
  205: [4, 6],
  9: [0, 3],
  168: [0, 3],
  178: [6, 4],
  101: [3, 2],
  114: [6, 6],
  197: [3, 2],
  67: [3, 1],
  162: [3, 0],
  161: [2, 2],
  160: [2, 2],
  177: [2, 3],
  65: [3, 2],
  100: [3, 2],
  35: [3, 0],
  164: [3, 3],
  34: [3, 0],
  69: [3, 2],
  165: [3, 3],
  5: [3, 3],
  97: [3, 2],
  48: [2, 3],
  36: [3, 3],
  193: [3, 2],
  76: [4, 6],
  140: [0, 3],
  132: [3, 3],
  133: [3, 3],
  129: [3, 3],
}

const objectSpawnProbability = {
  bush:                 0.02,
  rock:                 0.01,
  smallLeave:           0.02,
  smallFlowerRed:       0.03,
  smallFlowerYellow:    0.03,
  smallStone:           0.02,
  stump:                0.01,
  smallGrass:           0.20,
  smallMushroomRed:     0.01,
  smallMushroomBrown:   0.01,
  smallMushroomGray:    0.01,
  berryBush:            0.02,
  smallBush:            0.10,
};

const biomeData = {
  swamp: {
    tiles: [
      {type: "swampGrass", layerLevel: 2},
      {type: "swampWater", layerLevel: 0},
    ],
    objects: [
      {type: "smallStone"},
      {type: "smallLeave"},
    ],
    path: "objectsForest.png"
  },
  forest: {
    tiles: [
      {type: "forestGrass", layerLevel: 2},
    ],
    objects: [
      // {type: "rock"},
      {type: "bush"},
      {type: "smallFlowerRed"},
      {type: "smallFlowerYellow"},
      {type: "smallGrass"},
      {type: "stump"},
      {type: "smallMushroomRed"},
      {type: "smallMushroomBrown"},
      {type: "smallMushroomGray"},
      {type: "berryBush"},
      {type: "smallBush"},
    ],
    path: "objectsForest.png"
  },
  tundra: {
    tiles: [
      {type: "snow", layerLevel: 3},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  jungle: {
    tiles: [
      {type: "jungleGrass", layerLevel: 2},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  savanna: {
    tiles: [
      {type: "savannaGrass", layerLevel: 2},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  prairie: {
    tiles: [
      {type: "prairieDirt", layerLevel: 1},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  taiga: {
    tiles: [
      {type: "taigaGrass", layerLevel: 2},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  desert: {
    tiles: [
      {type: "sand", layerLevel: 1},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  mountain: {
    tiles: [
      {type: "mountain", layerLevel: 1},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  water: {
    tiles: [
      {type: "water", layerLevel: 0},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  deepWater: {
    tiles: [
      {type: "deepWater", layerLevel: 0},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
  ice: {
    tiles: [
      {type: "ice", layerLevel: 0},
    ],
    objects: [
    ],
    path: "objectsForest.png"
  },
}

export class Chunk {
  constructor(chunkX, chunkY, noise) {
    this.chunkX = chunkX;
    this.chunkY = chunkY;
    this.noise = noise;

    this._loadTilemaps();
    
    this.objectsBinMap   = Array.from({ length: CHUNK_SIZE }, () => Array(CHUNK_SIZE).fill(false));
    this.obstaclesBinMap = Array.from({ length: CHUNK_SIZE }, () => Array(CHUNK_SIZE).fill(false));

    [this.elevVals, this.equalizedTemp, this.equalizedMoisture] = this._generateNoises();
    [this.tiles, this.fgObjects, this.bgObjects] = this._generateBiomes();
  }

  _loadTilemaps() {
    const path = "./assets/sprites/";
    this.tilemapGrass               = this._loadImage(path + "grass.png");
    this.tilemapMain                = this._loadImage(path + "tilemapMain.png");
    this.tilemapJungleGrass         = this._loadImage(path + "jungleGrass.png");
    this.tilemapSavannaGrass        = this._loadImage(path + "savannaGrass.png");
    this.tilemapSnow                = this._loadImage(path + "snow.png");
    this.tilemapSwampGrass          = this._loadImage(path + "swampGrass.png");
    this.tilemapTaigaGrass          = this._loadImage(path + "taigaGrass.png");
  }

  _loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  _generateNoises() {
    const heightScale   = 0.05;
    const detailScale   = 0.01;
    const tempScale     = 0.006;
    const moistureScale = 0.008;

    const tempVals = [];
    const moisVals = [];
    const elevVals = [];

    for (let y = 0; y < CHUNK_SIZE; y++) {
      for (let x = 0; x < CHUNK_SIZE; x++){
        const worldX = this.chunkX * CHUNK_SIZE + x;
        const worldY = this.chunkY * CHUNK_SIZE + y;

        const heightNoise =    this.noise.simplex2(worldX * heightScale, worldY * heightScale);
        const detailNoise =    this.noise.simplex2(worldX * detailScale, worldY * detailScale);
        const moisturelNoise = this.noise.simplex2(worldX * moistureScale, worldY * moistureScale);
        const tempNoise =      this.noise.simplex2(worldX * tempScale, worldY * tempScale);

        const elevation = heightNoise * 0.7 + detailNoise * 0.3;
        const moisture = moisturelNoise; // (biomeNoise + detailNoise * 0.2) / 1.2;
        const temperature = tempNoise; //* 0.9 + detailNoise * 0.1;

        elevVals.push(elevation);
        moisVals.push(moisture);
        tempVals.push(temperature);
      }
    }
    const [equalizedTemp, equalizedMoisture] = equalize2D(tempVals, moisVals);

    return [elevVals, equalizedTemp, equalizedMoisture];
  }

  _generateBiomes() {
    const tiles = [];
    const fgObjects = [];
    const bgObjects = [];
    
    let index = 0;
    for (let y = 0; y < CHUNK_SIZE; y++) {
      const row = []
      for (let x = 0; x < CHUNK_SIZE; x++){
        const biomeType = this._classifyBiome(
          this.elevVals[index], 
          this.equalizedMoisture[index],
          this.equalizedTemp[index]
        )
        index++;
        const tile = this._createBiome(biomeData[biomeType], x, y, fgObjects, bgObjects);
        row.push(tile);
        
      }  
      tiles.push(row);
    }

    return [tiles, fgObjects, bgObjects];
  }

  _createBiome(biome_obj, x, y, fgObjects, bgObjects) {
    const prob = 0.1
    let tile;

    // --------- fix this ------------- 
    if (biome_obj.tiles.length > 1) {
      if (Math.random() < prob) {
        tile = new Tile(biome_obj.tiles[1].type, biome_obj.tiles[1].layerLevel);  
      } else {
        tile = new Tile(biome_obj.tiles[0].type, biome_obj.tiles[0].layerLevel);
      }
    } else {
      tile = new Tile(biome_obj.tiles[0].type, biome_obj.tiles[0].layerLevel);
    }

    if (!WATER_TYPES.includes(tile.type)) {
      for (const obj of biome_obj.objects) {
        this._spawnObject(
          objectSpawnProbability[obj.type], 
          x, y, 
          obj.type,
          fgObjects, 
          bgObjects,
          biome_obj.path,
        );
      }
    }
    return tile;
  }

  _classifyBiome(elevation, moisture, temperature) {
    const t = temperature;
    const m = moisture;
    const e = elevation;

    if (e < -0.3) return t < -0.5 ? 'ice' 
                                    : e < -0.6 ? 'deepWater'
                                    : 'water';
    if (e > 0.65) return 'mountain';

    if (t < -0.6) return m > 0.2 ? 'taiga' : 'tundra';
    if (t < -0.4) return m > 0.4 ? 'swamp' : 'taiga';
    if (t < -0.2) return m > 0.4 ? 'swamp' : 'forest';
    if (t <    0) return m > 0.4 ? 'swamp'
                                  : m > -0.4 ? 'forest' 
                                  : 'prairie';
    if (t <  0.2) return m > 0.4 ? 'swamp' 
                                  : m >  0.2 ? 'forest'
                                  : m > -0.2 ? 'savanna'
                                  : m > -0.6 ? 'prairie'
                                  : 'desert';
    if (t <  0.4) return m > 0.4 ? 'jungle' 
                                  : m >  0.2 ? 'forest'
                                  : m > -0.2 ? 'savanna'
                                  : m > -0.6 ? 'prairie'
                                  : 'desert';
    if (t <  0.6) return m > 0.4 ? 'jungle'
                                  : m > -0.2 ? 'savanna'
                                  : m > -0.6 ? 'prairie'
                                  : 'desert';
    return m > 0.4 ? 'jungle'
                    : m > -0.2 ? 'savanna'
                    : m > -0.4 ? 'prairie'
                    : 'desert';
  }

  _spawnObject(prob, x, y, objClass, fgObjects, bgObjects, path) {
    if (Math.random() < prob && !this.objectsBinMap[y][x] && x < CHUNK_SIZE - 2 && y < CHUNK_SIZE - 2) {
      const obj = new GameObject(x, y, objClass, path);
      obj.zIndex === 1 ? fgObjects.push(obj) : bgObjects.push(obj);
      this._markOccupied(obj, x, y);
    }
  }

  _markOccupied(obj, x, y) {
    const w = obj.spriteWidth;
    const h = obj.spriteHeight;

    setSubArray(this.objectsBinMap, y, y + h, x, x + w);
    if (obj.isObstacle) setSubArray(this.obstaclesBinMap, y + (h >= 2 ? h / 2 : 0), y + h, x, x + w);
  }

  getTileNeighborData(x, y, tileLayerLevel, gameMap) {
    let bitmask = 0;
    let neighbors = [];

    const globalX = this.chunkX * CHUNK_SIZE + x;
    const globalY = this.chunkY * CHUNK_SIZE + y;

    const neighborsOffsets = [
      [-1, -1, 128],   // NW
      [ 0, -1,  64],   // N
      [ 1, -1,  32],   // NE
      [-1,  0,  16],   // W
      [ 1,  0,   8],   // E
      [-1,  1,   4],   // SW
      [ 0,  1,   2],   // S
      [ 1,  1,   1]    // SE
    ];

    for (const [dx, dy, bit] of neighborsOffsets) {
      const nx = globalX + dx;
      const ny = globalY + dy;
      const neighborTile = gameMap.getTileAt(nx, ny);
      const neighborTileLayerLevel = neighborTile?.layerLevel;
      neighbors.push(neighborTile);

      if (neighborTile && neighborTileLayerLevel >= tileLayerLevel) {
        bitmask |= bit;
      }
    }
    this.tiles[y][x].setBitmask(bitmask);

    return [bitmask, neighbors];
  }

  getRenderableFgObjects() {
    return this.fgObjects.map(obj => ({
      type: 'fgObject',
      entity: obj,
      sortY: this.chunkY * CHUNK_SIZE + obj.y + obj.spriteHeight - obj.spriteOffset,
    }));
  }

  getRenderableBgObjects() {
    return this.bgObjects.map(obj => ({
      type: 'bgObject',
      entity: obj,
    }));
  }

  getTileType(x, y) {
    return this.tiles[y][x]?.type
  }

  drawTile(ctx, x, y, tile, sx, sy, nsx, nsy, screenOffsetX, screenOffsetY, neighborType) {
    const tilemaps = {
      ice:          this.tilemapMain,
      deepWater:    this.tilemapMain,
      water:        this.tilemapMain,
      snow:         this.tilemapSnow,
      mountain:     this.tilemapMain,
      sand:         this.tilemapMain,
      swampGrass:   this.tilemapSwampGrass,
      swampWater:   this.tilemapMain,
      forestGrass:  this.tilemapGrass,
      taigaGrass:   this.tilemapTaigaGrass,
      prairieDirt:  this.tilemapMain,
      savannaGrass: this.tilemapSavannaGrass,
      jungleGrass:  this.tilemapJungleGrass,
    };

    const currTilemap = tilemaps[tile.type];

    const targetX = Math.floor(x * RENDER_TILE_SIZE + screenOffsetX);
    const targetY = Math.floor(y * RENDER_TILE_SIZE + screenOffsetY);

    if (neighborType && tile.layerLevel >= 2) {
      const neighborTilemap = tilemaps[neighborType];

      ctx.drawImage(neighborTilemap, 
                  SOURCE_TILE_SIZE * nsx,
                  SOURCE_TILE_SIZE * nsy,
                  SOURCE_TILE_SIZE, SOURCE_TILE_SIZE, 
                  targetX, 
                  targetY, 
                  RENDER_TILE_SIZE, 
                  RENDER_TILE_SIZE);
    };

    ctx.drawImage(currTilemap, 
                  SOURCE_TILE_SIZE * sx,
                  SOURCE_TILE_SIZE * sy, 
                  SOURCE_TILE_SIZE, SOURCE_TILE_SIZE,
                  targetX, 
                  targetY,
                  RENDER_TILE_SIZE, 
                  RENDER_TILE_SIZE);
  }
  
  renderChunk(ctx, screenOffsetX, screenOffsetY, gameMap) {
    ctx.imageSmoothingEnabled = false;
    
    const spritesXY = {
      ice:          [2, 0],
      deepWater:    [4, 0],
      water:        [3, 0],
      mountain:     [6, 0],
      sand:         [0, 0],
      swampGrass:   [1, 1],
      swampWater:   [2, 1],
      prairieDirt:  [0, 1],
      snow:         [1, 1],
      forestGrass:  [1, 1],
      taigaGrass:   [1, 1],
      savannaGrass: [1, 1],
      jungleGrass:  [1, 1],
    };

    for (let y = 0; y < CHUNK_SIZE; y++) {
      for (let x = 0; x < CHUNK_SIZE; x++) {
        const tile = this.tiles[y][x];
        const tileLayerLevel = tile.layerLevel;

        let [sx, sy]   = [0, 0];
        let [nsx, nsy] = [0, 0];
        let neighborType = null;

        if (tileLayerLevel >= 2) {
          const [bitmask, neighbors] = this.getTileNeighborData(x, y, tileLayerLevel, gameMap);
          const isFullySurrounded = neighbors.every(n => n?.layerLevel === tileLayerLevel);

          [sx, sy] = isFullySurrounded ? spritesXY[tile.type] : bitmaskLayout[bitmask];

          for (const neighbor of neighbors) {
            if (neighbor && neighbor?.layerLevel < tileLayerLevel) {
              [nsx, nsy] = spritesXY[neighbor.type];
              neighborType = neighbor.type;
            } 
          }
        }
        else {     
          [sx, sy] = spritesXY[tile.type];
        }

        this.drawTile(ctx,
                      x, y, 
                      tile,
                      sx, sy,
                      nsx, nsy,
                      screenOffsetX, screenOffsetY,
                      neighborType
                      );
      }
    }
  }

  renderObjects(ctx, screenOffsetX, screenOffsetY) {
    this.objects?.forEach(obj => obj.render(ctx, screenOffsetX, screenOffsetY));
  }
}

function equalize2D(tempArray, moistureArray, bins = 32) {
  const size = tempArray.length;
  const data = [];

  let minTemp = Math.min(...tempArray);
  let maxTemp = Math.max(...tempArray);
  let minMoist = Math.min(...moistureArray);
  let maxMoist = Math.max(...moistureArray);

  for (let i = 0; i < size; i++) {
    const tempNorm = (tempArray[i] - minTemp) / (maxTemp - minTemp);
    const moistNorm = (moistureArray[i] - minMoist) / (maxMoist - minMoist);
    data.push([tempNorm, moistNorm]);
  }

  const hist = Array.from({ length: bins }, () => new Array(bins).fill(0));
  for (const [t, m] of data) {
    const x = Math.min(Math.floor(t * bins), bins - 1);
    const y = Math.min(Math.floor(m * bins), bins - 1);
    hist[x][y]++;
  }

  const cdf = Array.from({ length: bins }, () => new Array(bins).fill(0));
  let cumulative = 0;
  for (let i = 0; i < bins; i++) {
    for (let j = 0; j < bins; j++) {
      cumulative += hist[i][j];
      cdf[i][j] = cumulative;
    }
  }

  const total = cumulative;
  const newTemp = [];
  const newMoisture = [];

  for (const [t, m] of data) {
    const x = Math.min(Math.floor(t * bins), bins - 1);
    const y = Math.min(Math.floor(m * bins), bins - 1);

    const normalized = cdf[x][y] / total;

    const newT = normalized * (maxTemp - minTemp) + minTemp;
    const newM = normalized * (maxMoist - minMoist) + minMoist;

    newTemp.push(newT);
    newMoisture.push(newM);
  }
  return [newTemp, newMoisture];
}

function setSubArray(array, startRow, stopRow, startCol, stopCol, value=true) {
  for (let i = startRow; i < stopRow; i++) {
    for (let j = startCol; j < stopCol; j++) {
      array[i][j] = value;
    }
  }
}

function saveNoiseData(data) {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = `noise_data_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  }, 100);
}
