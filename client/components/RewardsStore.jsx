// import React, { useState, useEffect, useSelector } from 'react';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';

import RewardItem from './RewardsComponents/RewardItem.jsx';
import PurchasedItem from './RewardsComponents/PurchasedItem.jsx';

const RewardsStore = (props) => {
  // const authUser = useSelector((state) => state.app.authUser);

  const [rewards, setRewards] = useState([]);

  const [balance, setBalance] = useState(props.balance);

  const [user, setUser] = useState(props.user);
  // why is this value the index.html
  console.log('state of user', user);
  console.log('props user', props.user);

  const [purchased, setPurchased] = useState([]);


  // useEffect(() => {
  //   if (authUser) {
  //     setUsername(authUser.username);
  //     setStatus(authUser.status);
  //   }
  // }, [authUser]);

  // points now no longer show - balance state is accurate but user state is not
  useEffect(() => {
    axios.get(`/wofRoutes/users/${props.user.id}`)
      // .then(({data}) => {
      .then((response) => {
        console.log(response);
        console.log('get wof user by id', data);
        setUser(data);
      })
      .catch((err) => console.error('failed finding user', err));
  }, [props.points]);

  const purchaseReward = (cost, rewardId) => {
    console.log(cost, props.user.balance, rewardId, props.user.id);
    if (props.user.balance >= cost) {
      axios.post('/rewards/purchase', {
        cost, balance: props.user.balance, rewardId, userId: props.user.id
      })
        .then(({ data }) => {
          console.log('post rewards purchase', data);
          setUser(data);
          setBalance(data.balance);
        });
    } else {
      // need to display this to user
      console.log('props.user.balance', props.user.balance);
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
