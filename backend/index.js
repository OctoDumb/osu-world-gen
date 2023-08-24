const express = require("express");
const cors = require("cors");
const Downloader = require("./downloader");

const dl = new Downloader();

const app = express();

app.use(cors());

app.get('/map/:id/:redl', async (req, res) => {
  let map = await dl.get(req.params.id, !!+req.params.redl);
  res.setHeader("Content-Type", "application/json").send(map);
});

const static = express.static('dist');
app.get('*', (req, res, next) => {
  console.log(req.url);
  req.url = (req.url.length > 1 && req.url.endsWith("/")) ? req.url.slice(0, req.url.length - 1) : req.url;
  static(req, res, next);
});

app.listen(7890, () => {
  console.log("Open http://localhost:7890");
});