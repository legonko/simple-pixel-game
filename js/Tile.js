export class Tile {
  constructor(elevation, moisture, temperature) {
    this.elevation = elevation;
    this.moisture = moisture;
    this.temperature = temperature;
    [this.type, this.layerLevel] = this.classifyTile();
    this.bitmask = 0;
  }

  classifyTile() {
    // if (this.elevation < -0.3) {
    //   return this.temperature < -0.6 ? ['ice', 0]
    //   : this.elevation < -0.5 ? ['deep_water', 0] 
    //   : ['water', 0];
    // }

    // if (this.elevation > 0.6) {
    //   return ['mountain', 1];
    // }

    // if (this.temperature < -0.6) {
    //   return this.moisture > 0.0 ? ['taiga', 1] : ['snow', 1]; //taiga : tundra 
    // }

    // if (this.temperature < -0.4) {
    //   return this.moisture > 0.7 ? ['swamp', 1] : ['grass', 1] //swamp : regular forest
    // }

    // if (this.temperature < 0.0) {
    //   return this.moisture < -0.4 ? ['prairie', 0] // prairie
    //   : this.moisture > 0.7 ? ['swamp', 1] // swamp
    //   : ['grass', 1]; // regular forest
    // }

    // if (this.temperature > 0.5) {
    //   return this.moisture < -0.5 ? ['sand', 0] // desert
    //   : this.moisture < 0.0 ? ['prairie', 0]  // prairie
    //   : this.moisture < 0.5 ? ['savanna', 1] //savanna
    //   : ['jungle', 1]; //jungle
    // }

    // if (this.temperature > 0.2) {
    //   return this.moisture < -0.3 ? ['prairie', 0] // prairie
    //   : this.moisture < 0.5 ? ['savanna', 1] //savanna
    //   : ['jungle', 1]; //jungle
    // }

    // if (this.temperature >= 0.0) {
    //   return this.moisture < -0.5 ? ['prairie', 0] // prairie
    //   : this.moisture < 0.7 ? ['grass', 1] // regular forest
    //   : ['swamp', 1] // swamp
    // }
    if (this.elevation < -0.3) return this.temperature < -0.5 ? ['ice', 0] 
                                                              : this.elevation < -0.6 ? ['deep_water', 0]
                                                              : ['water', 0];
    // if (this.elevation < -0.2) return ['water', 0];
    if (this.elevation > 0.65) return ['mountain', 0];

    const t = this.temperature;
    const m = this.moisture;

    // if (t < -0.6) return m > 0.4 ? ['taiga', 1] : ['snow', 1];
    // if (t < -0.2) return m > 0.5 ? ['swamp', 1] : ['grass', 1];
    // if (t < 0.25)  return m < -0.5 ? ['prairie', 0] 
    //                       : m > 0.5 ? ['swamp', 1]
    //                       : ['taiga', 1]; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // if (t < 0.5)  return m < -0.4 ? ['prairie', 0]
    //                       : m < 0.4 ? ['savanna', 1]
    //                       : ['jungle', 1];
    // return m < -0.5 ? ['desert', 0]
    //     : m < 0.2 ? ['savanna', 1]
    //     : ['jungle', 1];



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