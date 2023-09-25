import axios from 'axios';
import { useState, useEffect } from 'react';
import { FcNews } from "react-icons/fc";
import { toast } from 'react-toastify';
import ResolutionLogo from '../img/resolution_app_logo_mini.svg';



const Controversy = ({user, loggedIn }) => {
  const [headline, setHeadline] = useState('');

  // Function to show a toast when the component mounts
  useEffect(() => {
    if (user && user.username) {
      toast.info(`${user.username}, let's get controversial!`, {
        position: 'top-right',
        autoClose: 5000,
        icon: (
          <img
            src={ResolutionLogo}
            alt='Resolution'
            style={{
              width: '32px',
              height: '32px',
              marginRight: '10px',
            }}
          />
        ),
      });
    }
  }, [user.username]);
  
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
  //console.log(headline.title);// posting headline to page to the page




  return (
    <div className='con-component container'>
      <div className="con-header-container">
        <div className='con-users-component'>
          <h1 className="text-primary">Headlines <FcNews /></h1>
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
            onClick={() => {
              getHeadlines(); 
            }}>
              Grab A Headline
          </button>
        </div>
        <textarea className='cont-box' placeholder='Speak on it...' />
      </div>
    </div>
  );
};

export default Controversy;
