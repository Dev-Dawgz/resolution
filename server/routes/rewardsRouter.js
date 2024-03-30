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

rewardsRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  UsersRewards.findAll({
    where: { userId },
    include: [{ model: Rewards, as: 'reward' }]
  })
    .then((response) => {
      // we don't need the regular usersrewards data, just the reward for the rewardId - and the createdAt
      // console.log('response', response);
      const rewards = response.map((row) => {
        console.log('purchased date', row.dataValues.createdAt);
        console.log('row.reward', row.reward);
        row.reward.dataValues.purchasedAt = row.dataValues.createdAt;
        console.log('row reward after addition', row.reward.dataValues);
        return row.reward;
      });
      // console.log('response post map', rewards);
      res.send(rewards);
    })
    .catch((err) => {
      console.error('failed getting users rewards', err);
      res.sendStatus(500);
    });

});

const updateUserBalance = (balance, id) => {
  return Users.update({ balance }, { where: { id } });
};

rewardsRouter.patch('/balance', (req, res) => {
  const { balance, id } = req.body;
  updateUserBalance(balance, id)
    .then(res.sendStatus(200))
    .catch((err) => {
      console.error('failed updating user', err);
      sendStatus(500);
    });
});

rewardsRouter.post('/purchase', (req, res) => {
  const { cost, balance, rewardId, userId } = req.body;
  UsersRewards.create({ rewardId, userId })
    .then(() => {
      return updateUserBalance(balance - cost, userId);
    })
    .then(() => {
      return Users.findByPk(userId);
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error('failed purchasing rewards', err);
      res.sendStatus(500);
    });
});

module.exports = rewardsRouter;
