import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

const PurchasedItem = ({ reward }) => {
  console.log(reward.createdAt);
  console.log(typeof reward.createdAt);
  const newDate = new Date(reward.purchasedAt);
  console.log(newDate);
  return (
    <Col>
      <Image style={{width: 250}} src={reward.stickerImg} />
      <Badge style={{width: 200}} >Owned since: {newDate.toLocaleDateString()}</Badge>
    </Col>
  );
};

export default PurchasedItem;
