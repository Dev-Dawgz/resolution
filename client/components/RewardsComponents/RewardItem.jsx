import React from 'react';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const RewardItem = ({reward, purchaseReward}) => {
  const { stickerImg, price, id } = reward;

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
    <Col>
      {cost}
      <Image src={stickerImg} />
      <Button onClick={() => purchaseReward(cost, id)}>Buy!</Button>
    </Col>
  );
};

export default RewardItem;
