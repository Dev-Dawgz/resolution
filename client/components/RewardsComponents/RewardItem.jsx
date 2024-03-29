import React from 'react';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import BuyButton from './BuyButton.jsx';
import DisabledBuy from './DisabledBuy.jsx';

const RewardItem = ({reward, purchaseReward, user}) => {
  const { stickerImg, price, id } = reward;
  const { balance} = user;

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

  const buttonPicker = () => {
    if (user.balance - cost >= 0) {
      return <BuyButton purchaseReward={purchaseReward} cost={cost} id={id} />;
    } else {
      return <DisabledBuy />;
    }

  };

  return (
    <Col>
      {cost}
      <Image src={stickerImg} />
      {buttonPicker()}
      {/* <BuyButton purchaseReward={purchaseReward} cost={cost} id={id} /> */}
      {/* <Button onClick={() => purchaseReward(cost, id)}>Buy!</Button> */}
    </Col>
  );
};

export default RewardItem;
