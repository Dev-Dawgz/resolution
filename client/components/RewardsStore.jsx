// import React, { useState, useEffect, useSelector } from 'react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';

import RewardItem from './RewardsComponents/RewardItem.jsx';
import PurchasedItem from './RewardsComponents/PurchasedItem.jsx';

const RewardsStore = (props) => {
  const authUser = useSelector((state) => state.app.authUser);

  const [rewards, setRewards] = useState([]);

  const [balance, setBalance] = useState(props.balance);

  const [user, setUser] = useState(props.user);

  const [purchased, setPurchased] = useState([]);

  // this fixes the page refresh issue, but no longer update balance on increase
  useEffect(() => {
    if (authUser) {
      // setUsername(authUser.username);
      // setStatus(authUser.status);
      console.log('authUser', authUser);
      axios.get(`/wofRoutes/users/${authUser.id}`)
        .then(({data}) => {
          console.log(data);
          setUser(data);
          setBalance(data.balance);
        })
        .catch((err) => console.error('failed getting user', err));
    }
  }, [authUser]);

  // any time points are changed, user should be updated to reflect new balance
  useEffect(() => {
    axios.get(`/wofRoutes/users/${user.id}`)
      .then(({data}) => {
        setUser(data);
      })
      .catch((err) => console.error('failed finding user', err));
  }, [props.points]);

  // function called whenever BuyButton is clicked
  const purchaseReward = (cost, rewardId) => {
    // console.log(cost, props.user.balance, rewardId, props.user.id);
    if (balance >= cost) {
      // add sticker and user to usersRewards table
      axios.post('/rewards/purchase', {
        cost, balance: balance, rewardId, userId: props.user.id
      })
        .then(({ data }) => {
          // refresh rewardsStore user/balance state
          setUser(data);
          setBalance(data.balance);
          // refresh app user/balance state
          props.changeBalance(data, cost);
        });
    } else {
      // the buy button should no longer show up if not enough points
      console.log('not enough points!');
    }
  };

  useEffect(() => {
    axios.get(`/rewards/${user.id}`)
      .then(({ data }) => {
        setPurchased(data);
      })
      .catch((err) => console.error('failed updating purchases', err));
  }, [user]);

  useEffect(() => {
    axios.get('/rewards')
      .then(({data}) => {
        // console.log(data);
        setRewards(data);
        return axios.get(`/rewards/${user.id}`);
      })
      .then(({ data }) => {
        setPurchased(data);
      })
      .catch((err) => console.error('failed getting rewards'));
  }, []);

  return (
    <div className="wof-component container">
      <h1 className="text-primary">Rewards Store</h1>
      <Badge style={{width: 200}} bg="info">Balance: {balance} points</Badge>
      <h2>Already Purchased</h2>
      <Container>
        <Row>
          {
            purchased.map((reward) => <PurchasedItem key={`purchased-${reward.stickerId}`} reward={reward}/>)
          }
        </Row>
      </Container>
      <h2>Browse More</h2>
      <Container>
        <Row>
          {
            rewards.map((reward) => <RewardItem key={reward.stickerId} user={user} reward={reward} balance={balance} purchaseReward={purchaseReward} /> )
          }
        </Row>
      </Container>
    </div>
  );
};

export default RewardsStore;
