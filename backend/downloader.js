const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");

const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

module.exports = class Downloader {
  constructor() {
    if(!fs.existsSync("./cache")) {
      fs.mkdirSync("./cache");
    }
    
    this.queue = [];

    this.processQueue();
  }

  async processQueue() {
    if(this.queue.length) {
      let id = this.queue.shift();
      
      let { data } = await axios.get(`https://nominatim.openstreetmap.org/details?osmtype=${id[0].toUpperCase()}&osmid=${id.slice(1)}&polygon_geojson=1&format=json`);

      fs.writeFileSync(path.join("./cache", `${id}.json`), JSON.stringify(data));
    }

    setTimeout(() => this.processQueue(), 1000);
  }

  async get(id) {
    if(!fs.existsSync(path.join("./cache", `${id}.json`))) {
      if(this.queue.includes(id)) {
        await sleep(200);
        return this.get(id);
      } else {
        this.queue.push(id);
        return this.get(id);
      }
    } else {
      return fs.readFileSync(path.join("./cache", `${id}.json`));
    }
  }
}