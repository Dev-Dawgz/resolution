import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RewardsStore = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    axios.get('/rewards')
      .then(({data}) => {
        console.log(data);
        setRewards(data);
      })
      .catch((err) => console.error('failed getting rewards'));
  }, []);

  return (
    <div className="wof-component container">
      <h1>Rewards Store</h1>
    </div>
  );
};

export default RewardsStore;
