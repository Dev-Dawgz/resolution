import React from 'react';

const RewardItem = ({reward}) => {
  const { stickerImg, price } = reward;

  let cost;
  switch (price) {
    case 'tier1':
      cost = 10;
      break;
    case 'tier2':
      cost = 20;
      break;
    default:
      cost = 10;
      break;
  }

  return (
    <li>
      {cost}
      <img src={stickerImg} />
    </li>
  );
};

export default RewardItem;
