import React from 'react';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Overlay from 'react-bootstrap/Overlay';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import BuyButton from './BuyButton.jsx';
import DisabledBuy from './DisabledBuy.jsx';

const RewardItem = ({reward, purchaseReward, user, balance}) => {
  const { stickerImg, price, id, keyword } = reward;
  // const { balance} = user;

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
    if (balance - cost >= 0) {
      return <BuyButton purchaseReward={purchaseReward} cost={cost} id={id} />;
    } else {
      return <DisabledBuy />;
    }

  };

  return (
    <Col>
      {/* {cost}
      <Image src={stickerImg} />
      {buttonPicker()} */}
      <Card>
        <Card.Img style={{"width": 200}} src={stickerImg} alt={keyword} />
        <Card.ImgOverlay>
          {/* <Card.Title>{cost}</Card.Title> */}
          <Badge bg="info">{cost} points</Badge>
          {buttonPicker()}
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
};

export default RewardItem;
