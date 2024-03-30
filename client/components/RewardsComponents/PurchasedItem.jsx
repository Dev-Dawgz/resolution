import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

const PurchasedItem = ({ reward }) => {
  const { purchasedAt, stickerImg } = reward;
  const newDate = new Date(purchasedAt);
  return (
    <Col>
      <Image style={{width: 250}} src={stickerImg} />
      <Badge style={{width: 200}} >Owned since: {newDate.toLocaleDateString()}</Badge>
    </Col>
  );
};

export default PurchasedItem;
