import { CHUNK_SIZE, RENDER_TILE_SIZE, SOURCE_TILE_SIZE } from "./config.js";
import { Bush } from "./GameObject.js";
import { Tile } from './Tile.js';


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

export class Chunk {
  constructor(chunkX, chunkY, noise) {
    this.chunkX = chunkX;
    this.chunkY = chunkY;
    this.noise = noise;
    [this.tiles, this.objects] = this.generateLayers();
    // console.log(this.tiles)
    this.tilemapGrass = new Image();
    this.tilemapGrass.src = "../assets/sprites/grass.png"
    this.tilemap = new Image();
    this.tilemap.src = "../assets/sprites/dirt.png"
  }

  generateLayers() {
    const tiles = [];
    const objects = [];
    const scale = 0.02;

    for (let y = 0; y < CHUNK_SIZE; y++) {
      const row = []
      for (let x = 0; x < CHUNK_SIZE; x++){
        const worldX = this.chunkX * CHUNK_SIZE + x;
        const worldY = this.chunkY * CHUNK_SIZE + y;
        const n = this.noise.perlin2(worldX * scale, worldY * scale);
        row.push(new Tile(n));

        // if (n > 0.0 && Math.random() < 0.01) {
        //   objects.push(new Bush(x, y));
        // }
      }
      tiles.push(row);
    }
    return [tiles, objects]
  }

  getTileNeighborData(x, y, type, gameMap) {
    let bitmask = 0;
    let primaryNeighborType = "";

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

    for (let [dx, dy, bit] of neighborsOffsets) {
      const nx = globalX + dx;
      const ny = globalY + dy;
      const neighborTile = gameMap.getTileAt(nx, ny);

      if (neighborTile) {
        if (neighborTile.type === type) {
          bitmask |= bit;
        }
        else if (!primaryNeighborType) {
          primaryNeighborType = neighborTile.type;
        }
      }
    }
    this.tiles[y][x].setBitmask(bitmask);

    return [bitmask, primaryNeighborType]
  }

  getTileType(x, y) {
    return this.tiles[y][x].type
  }

  drawTile(ctx, x, y, sx, sy, screenX, screenY, type, neighborType) {
    const tilemaps = {
      water: this.tilemap,
      grass: this.tilemapGrass,
      sand:  this.tilemap,
      forest: this.tilemap,
    };
    const spritesXY = {
      sand:   [0, 1],
      forest: [1, 0],
      water:  [3, 0]
    };

    const currTilemap = tilemaps[type];

    if (neighborType && type === "grass") {
      const neighborTilemap = tilemaps[neighborType];
      const [nsx, nsy] = spritesXY[neighborType];

      ctx.drawImage(neighborTilemap, 
                  SOURCE_TILE_SIZE * nsx,
                  SOURCE_TILE_SIZE * nsy,
                  SOURCE_TILE_SIZE, SOURCE_TILE_SIZE, 
                  Math.floor(x * RENDER_TILE_SIZE + screenX), 
                  Math.floor(y * RENDER_TILE_SIZE + screenY), 
                  RENDER_TILE_SIZE, 
                  RENDER_TILE_SIZE);
    };

    ctx.drawImage(currTilemap, 
                  SOURCE_TILE_SIZE * sx,
                  SOURCE_TILE_SIZE * sy, 
                  SOURCE_TILE_SIZE, SOURCE_TILE_SIZE,
                  Math.floor(x * RENDER_TILE_SIZE + screenX), 
                  Math.floor(y * RENDER_TILE_SIZE + screenY), 
                  RENDER_TILE_SIZE, 
                  RENDER_TILE_SIZE);
  }
  
  renderChunk(ctx, screenX, screenY, gameMap) {
    ctx.imageSmoothingEnabled = false;
    const spritesXY = {
      sand:   [0, 1],
      forest: [1, 0],
      water:  [3, 0]
    };
    let bitmask = 0;
    let underTile = "";
    let [sx, sy] = [0, 0];

    for (let y = 0; y < CHUNK_SIZE; y++) {
      for (let x = 0; x < CHUNK_SIZE; x++) {
        const tile = this.tiles[y][x];

        if (tile.type === "grass") {
          [bitmask, underTile] = this.getTileNeighborData(x, y, tile.type, gameMap);
          [sx, sy] = bitmaskLayout[bitmask];
        }
        else {     
          [sx, sy] = spritesXY[tile.type];
        }

        this.drawTile(ctx,
          x, y, 
          sx, sy,
          screenX, screenY,
          tile.type,
          underTile);

      }
    }

    // this.objects.map((obj) => obj.render(ctx, screenX, screenY))
  }
}