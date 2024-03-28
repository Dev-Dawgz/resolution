const express = require('express');
const rewardsRouter = express.Router();

const { Rewards, Users, UsersRewards } = require('../database/index');
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

const updateUserBalance = (balance, id) => {
  return Users.update({ balance }, { where: { id }});
};

rewardsRouter.patch('/balance', (req, res) => {
  const { balance, id } = req.body;
  console.log(balance, id);
  updateUserBalance(balance, id)
  // Users.update({ balance }, { where: { id }})
    .then(res.sendStatus(200))
    .catch((err) => {
      console.error('failed updating user', err);
      sendStatus(500);
    });
});

rewardsRouter.post('/purchase', (req, res) => {
  // console.log(req.body);
  const { cost, balance, rewardId, userId } = req.body;
  UsersRewards.create({ rewardId, userId })
    .then(() => {
      return updateUserBalance(balance - cost, userId);
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('failed purchasing rewards', err);
      res.sendStatus(500);
    });
});

module.exports = rewardsRouter;
