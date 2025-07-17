import { GameMap } from "./GameMap.js";
import { Player } from "./Player.js";
import { RENDER_TILE_SIZE, SOURCE_TILE_SIZE, CHUNK_SIZE } from "./config.js";
// import { noise };

export class Game {
  constructor(ctx, canvas, keys) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.keys = keys;

    this.globalNoise = this.generateNoise();
    this.setup();
    this.render();
  }

  setup() {
    if (typeof noise === 'undefined') {
      throw new Error('noisejs not loaded! Check <script> tag.');
    }
    this.gameMap = new GameMap(this.ctx, this.globalNoise);
    this.player = new Player(0, 0);
    this.cameraX = this.player.x * RENDER_TILE_SIZE - canvas.width / 2 //+ RENDER_TILE_SIZE / 2;
    this.cameraY = this.player.y * RENDER_TILE_SIZE - canvas.height / 2 //+ RENDER_TILE_SIZE / 2;
    // console.log(canvas.width, canvas.height, this.cameraX, this.cameraY)
  }

  render() {
    this.gameMap.createMapLayout(this.cameraX, this.cameraY, this.canvas)
    this.gameMap.renderMap(this.cameraX, this.cameraY);
    this.player.renderPlayer(this.ctx, 
                            this.cameraX,
                            this.cameraY);
    // console.log(`Player: ${this.player.x},${this.player.y} | Camera: ${this.cameraX},${this.cameraY}`);
  }

  update(dt) {
    this.player.update(dt, this.keys, this.gameMap);

    const targetCameraX = this.player.x * RENDER_TILE_SIZE - this.canvas.width / 2 //+ RENDER_TILE_SIZE / 2;
    const targetCameraY = this.player.y * RENDER_TILE_SIZE - this.canvas.height / 2 //+ RENDER_TILE_SIZE / 2;
  
    const lerpSpeed = 0.3; // small = smooth
    this.cameraX += (targetCameraX - this.cameraX) * lerpSpeed;
    this.cameraY += (targetCameraY - this.cameraY) * lerpSpeed;
  }

  getWorldSeed() {
    let worldSeed = sessionStorage.getItem("worldSeed");
    if (!worldSeed) {
      worldSeed = Math.floor(Math.random() * 1000000); //Date.now().toString(36) + Math.random().toString(36).slice(2);
      sessionStorage.setItem("worldSeed", worldSeed);
    }
    return worldSeed
  }

  generateNoise() {
    let worldSeed = this.getWorldSeed();
    // const rng = new Math.seedrandom(worldSeed);
    noise.seed(worldSeed);
    return noise;
    // return //new Noise(rng());
  }
}