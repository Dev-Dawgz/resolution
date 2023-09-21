import axios from 'axios';
import { React, useState, useEffect } from 'react';

const [newsPost, setNewsPost] = useState([]);

const Controversy = () => {

  const getHeadlines = async () => {
    await axios.get('news/api/')
      .then((newsStories) => {
        setNewsPost(newsStories);
      })
      .catch((err) => {
        console.error('Could not retrieve newsStories array', err);
      });
  };
  useEffect(() => {
    getHeadlines();
  });



  return (
    <div className='con-component container'>
      <div className="con-header-container">
        <div className='con-users-component'>
          <h1 className="text-primary">Controversy</h1>
      
        </div>
      </div>
    </div>
  );
};

export default Controversy;
