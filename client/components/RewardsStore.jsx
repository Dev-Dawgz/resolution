import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import RewardItem from './RewardsComponents/RewardItem.jsx';

const RewardsStore = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    axios.get('/rewards')
      .then(({data}) => {
        // console.log(data);
        setRewards(data);
      })
      .catch((err) => console.error('failed getting rewards'));
  }, []);

  return (
    <div className="wof-component container">
      <h1 className="text-primary">Rewards Store</h1>
      <Container>
        <Row>
          {
            rewards.map((reward) => <RewardItem key={reward.stickerId} reward={reward} /> )
          }
        </Row>
      </Container>
    </div>
  );
};

export default RewardsStore;
