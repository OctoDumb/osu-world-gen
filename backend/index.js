const express = require("express");
const cors = require("cors");
const Downloader = require("./downloader");

const dl = new Downloader();

const app = express();

app.use(cors());

app.get('/map/:id', async (req, res) => {
  let map = await dl.get(req.params.id);
  res.setHeader("Content-Type", "application/json").send(map);
});

if(!process.env.DEV) {
  app.get('*', async (req, res) => {

  });
}

app.listen(7890, () => {
  console.log("Open http://localhost:7890");
});
