import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import RewardItem from './RewardsComponents/RewardItem.jsx';

const RewardsStore = (props) => {
  const [rewards, setRewards] = useState([]);

  const [user, setUser] = useState(props.user);

  const purchaseReward = (cost, rewardId) => {
    console.log(cost, user.balance, rewardId, user.id);
    if (user.balance >= cost) {
      axios.post('/rewards/purchase', {
        cost, balance: user.balance, rewardId, userId: user.id
      })
        .then(({ data }) => {
          console.log(data);
          setUser(data);
        });
    } else {
      // need to display this to user
      console.log('not enough points!');
    }
  };

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
            rewards.map((reward) => <RewardItem key={reward.stickerId} reward={reward} purchaseReward={purchaseReward} /> )
          }
        </Row>
      </Container>
    </div>
  );
};

export default RewardsStore;
