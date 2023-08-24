const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = class Downloader {
  constructor() {
    if(!fs.existsSync("./cache")) {
      fs.mkdirSync("./cache");
    }

    this.queue = [];

    this.processQueue();
  }

  async processQueue() {
    try {
      if (this.queue.length) {
        const id = this.queue[0];
        const [first, ...other] = id;
        const osmType = first.toUpperCase();
        const osmId = other.join("");

        const url = `https://nominatim.openstreetmap.org/details?osmtype=${osmType}&osmid=${osmId}&polygon_geojson=1&format=json`;
        const { data } = await axios.get(url);

        fs.writeFileSync(path.join("./cache", `${id}.json`), JSON.stringify(data));
      }
    } catch (e) {
    }
    
    if(this.queue.length) {
      this.queue.shift();
    }

    setTimeout(() => this.processQueue(), 1000);
  }

  async get(id, redl = false) {
    if(!fs.existsSync(path.join("./cache", `${id}.json`))) {
      if(this.queue.includes(id)) {
        await sleep(200);
        return this.get(id);
      } else {
        this.queue.push(id);
        return this.get(id);
      }
    } else if(redl) {
      fs.unlinkSync(path.join("./cache", `${id}.json`));
      return this.get(id, redl);
    }
    
    return fs.readFileSync(path.join("./cache", `${id}.json`));
  }
}
