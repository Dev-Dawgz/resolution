import React from 'react';
import Button from 'react-bootstrap/Button';

const BuyButton = ({ purchaseReward, cost, id }) => (
  <Button onClick={() => purchaseReward(cost, id)}>Buy</Button>
);

export default BuyButton;
