const express = require('express');
const rewardsRouter = express.Router();

const { Rewards } = require('../database/index');
const { getStickers } = require('../api/stipop');

rewardsRouter.get('/', (req, res) => {
  getStickers()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => console.error('failed getting stickers', err));
});

module.exports = rewardsRouter;
