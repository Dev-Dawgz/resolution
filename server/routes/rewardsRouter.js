const express = require('express');
const rewardsRouter = express.Router();

const { Rewards } = require('../database/index');
const { getStickers } = require('../api/stipop');

rewardsRouter.get('/', (req, res) => {
  getStickers()
    .then((stickerArray) => {
      console.log(stickerArray);
      
      // res.send(stickerArray);
      // lol way too many values come from the api to throw it directly into the model
      return Rewards.bulkCreate(stickerArray, { fields: ['stickerId', 'keyword', 'stickerImg', 'price'] });
    })
    .then((response) => console.log(response))
    .catch((err) => {
      console.error('failed getting stickers', err);
      res.sendStatus(500);
    });
});

module.exports = rewardsRouter;
