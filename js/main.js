import { Game } from './Game.js';
import { CHUNK_SIZE, RENDER_TILE_SIZE } from './config.js';


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasSize = CHUNK_SIZE * RENDER_TILE_SIZE
canvas.width = canvasSize + parseInt(canvasSize / 2);
canvas.height = canvasSize + parseInt(canvasSize / 3);
let keys = {};
const game = new Game(ctx, canvas, keys);
let lastTime = performance.now();

function gameLoop(currentTime) {
  const dt = (currentTime - lastTime) / 1000; // dt [s] = 0.01...
  lastTime = currentTime;

  game.update(dt);
  game.render();

  requestAnimationFrame(gameLoop);
}

gameLoop(lastTime);

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);




