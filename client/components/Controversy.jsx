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
          <p>
            {headline.title}
          </p>
          <button 
            className="btn btn-outline-warning" 
            type="button" 
            data-toggle="collapse" 
            data-target="#collapseExample" 
            aria-expanded="false" 
            aria-controls="collapseExample" 
            onClick={() => { getHeadlines(); }}>
              Grab A Headline
          </button>
        </div>
        <textarea className='cont-box' placeholder='Speak on it...' />
      </div>
    </div>
  );
};

export default Controversy;
