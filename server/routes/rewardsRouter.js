const express = require('express');
const rewardsRouter = express.Router();

const { Rewards } = require('../database/index');
const { getStickers } = require('../api/stipop');

// this route is called in the seed
rewardsRouter.get('/seed', (req, res) => {
  getStickers()
    .then((stickerArray) => {
      return Rewards.bulkCreate(stickerArray, { fields: ['stickerId', 'keyword', 'stickerImg', 'stickerImg_96', 'price'] });
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error('failed getting stickers', err);
      res.sendStatus(500);
    });
});

rewardsRouter.get('/', (req, res) => {
  Rewards.findAll({})
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error('failed getting rewards', err);
      res.sendStatus(500);
    });
});

module.exports = rewardsRouter;
