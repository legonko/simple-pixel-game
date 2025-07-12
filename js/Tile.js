export class Tile {
  constructor(n) {
    this.n = n;
    [this.type, this.layerLevel] = this.classifyTile();
    this.bitmask = 0;
  }

  classifyTile() {
    if (this.n < -0.2) return ["water", 0];
    if (this.n < 0.0)  return ["sand", 0];
    if (this.n < 0.3)  return ["grass", 1]
    return ["forest", 0]
  }

  setBitmask(bitmask) {
    this.bitmask = bitmask;
  }
}