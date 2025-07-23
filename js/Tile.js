export class Tile {
  constructor(elevation, moisture, temperature) {
    this.elevation = elevation;
    this.moisture = moisture;
    this.temperature = temperature;
    [this.type, this.layerLevel] = this.classifyTile();
    this.bitmask = 0;
  }

  classifyTile() {
    const t = this.temperature;
    const m = this.moisture;
    const e = this.elevation;

    if (e < -0.3) return t < -0.5 ? ['ice', 0] 
                                    : e < -0.6 ? ['deep_water', 0]
                                    : ['water', 0];
    if (e > 0.65) return ['mountain', 0];

    if (t < -0.6) return m > 0.2 ? ['taiga', 1] : ['tundra', 1];
    if (t < -0.4) return m > 0.4 ? ['swamp', 1] : ['taiga', 1];
    if (t < -0.2) return m > 0.4 ? ['swamp', 1] : ['forest', 1];
    if (t <    0) return m > 0.4 ? ['swamp', 1]
                                  : m > -0.4 ? ['forest', 1] 
                                  : ['prairie', 0];
    if (t <  0.2) return m > 0.4 ? ['swamp', 1] 
                                  : m > 0.2 ? ['forest', 1]
                                  : m > -0.2 ? ['savanna', 1]
                                  : m > -0.6 ? ['prairie', 0]
                                  : ['desert', 0];
    if (t <  0.4) return m > 0.4 ? ['jungle', 1] 
                                  : m > 0.2 ? ['forest', 1]
                                  : m > -0.2 ? ['savanna', 1]
                                  : m > -0.6 ? ['prairie', 0]
                                  : ['desert', 0];
    if (t <  0.6) return m > 0.4 ? ['jungle', 1]
                                  : m > -0.2 ? ['savanna', 1]
                                  : m > -0.6 ? ['prairie', 0]
                                  : ['desert', 0];
    return m > 0.4 ? ['jungle', 1]
                    : m > -0.2 ? ['savanna', 1]
                    : m > -0.4 ? ['prairie', 0]
                    : ['desert', 0];
  }

  setBitmask(bitmask) {
    this.bitmask = bitmask;
  }
}