const { Rewards } = require('./index');
const { getStickers } = require('../api/stipop');


const rewardsSeed = () => {
  getStickers()
    .then((stickerArray) => {
      return Rewards.bulkCreate(stickerArray, { fields: ['stickerId', 'keyword', 'stickerImg', 'stickerImg_96', 'price'] });
    })
    .catch((err) => {
      console.error('failed getting stickers', err);
    });
};

module.exports.rewardsSeed = rewardsSeed;
