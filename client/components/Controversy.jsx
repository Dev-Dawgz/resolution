import axios from 'axios';
import { useState, useEffect } from 'react';


const Controversy = () => {
  const [headline, setHeadline] = useState('');

  const getHeadlines = () => {
    axios.get('/news/api')
      .then((newsStories) => {
        setHeadline(newsStories.data[Math.floor(Math.random() * 26)]);
        newsStories.data.forEach(element => {
          axios.post('/news', element);
        });
      })
      .catch((err) => {
        console.error('Could not retrieve newsStories array', err);
      });
  };
  console.log(headline.title);// posting headline to page to the page




  return (
    <div className='con-component container'>
      <div className="con-header-container">
        <div className='con-users-component'>
          <h1 className="text-primary">Controversy</h1>
          <button type="button" 
            className="btn btn-outline-warning" 
            onClick={() => { getHeadlines(); }}
          >Speak 4 Yourself!!!
          </button>
      
        </div>
      </div>
    </div>
  );
};

export default Controversy;
