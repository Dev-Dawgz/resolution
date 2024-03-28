import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const PurchasedItem = ({ reward }) => {
  return (
    <Col>
      <Image src={reward.stickerImg} />
    </Col>
  );
};

export default PurchasedItem;
