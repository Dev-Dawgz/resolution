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
        <div className="container my-5 py-5 text-dark">
          <div className="row d-flex justify-content-center">
            <div className="col-md-11 col-lg-9 col-xl-7">
              <div className="d-flex flex-start mb-4">
                <img className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar" width="65"
                  height="65" />
                <div className="card w-100">
                  <div className="card-body p-4">
                    <div className="">
                      <h5>Logan</h5>
                      <p className="small">3 hours ago</p>
                      <p>
                        Random text not really related to anything in particular, but I oppose what Nasthia said!
                      </p>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <a href="#!" className="link-muted me-2"><i className="fas fa-thumbs-up me-1"></i>132</a>
                          <a href="#!" className="link-muted"><i className="fas fa-thumbs-down me-1"></i>15</a>
                        </div>
                        <a href="#!" className="link-muted"><i className="fas fa-reply me-1"></i> Reply</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-start">
                <img className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp" alt="avatar" width="65"
                  height="65" />
                <div className="card w-100">
                  <div className="card-body p-4">
                    <div className="">
                      <h5>Nasthia</h5>
                      <p className="small">5 hours ago</p>
                      <p>
                        Also, not responding to anything in particular, hard coded text!
                      </p>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <a href="#!" className="link-muted me-2"><i className="fas fa-thumbs-up me-1"></i>158</a>
                          <a href="#!" className="link-muted"><i className="fas fa-thumbs-down me-1"></i>13</a>
                        </div>
                        <a href="#!" className="link-muted"><i className="fas fa-reply me-1"></i> Reply</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controversy;
