import { useState, useEffect } from "react";
import { toast } from 'react-toastify'; //notification props
import axios from 'axios';
// import { setAuthUser } from './store/appSlice';
import Canvas from './Canvas.jsx';
import io from 'socket.io-client';
import Notification from "./Notifications.jsx";
const socket = io();
import ResolutionLogo from '../img/resolution_app_logo_mini.svg';


const Whack = ({loggedIn}) => {
  const [searchInput, setSearchInput] = useState(''); // search input to search users
  const [user, setUser] = useState('...'); // set user (your opponent) state
  const [userPhoto, setUserPhoto] = useState(''); //set user photo src
  const [userId, setUserId] = useState();

  //function to handle toast/notification onClick/Whack
  //promise added to make toast async with whack toast success
  const notify = (userId) => {
    return new Promise((resolve) => {
      //toast.warn used to give 'warning' notification message to user on Piñata whack
      toast.info(`🦄 Assault recorded, ${userId} notified`, {//using .info until fully styled
      //props on toast object to style/modify
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: (
          <img
            src={ResolutionLogo}
            style={{
              width: '32px',
              height: '32px',
              marginRight: '10px',
            }}
          />
        ),
        progress: undefined,
        theme: "light",
        onClose: () => {
          resolve();
        }
      });
    });
  };
  //func to send toast to user who pinata was attacked 
  const notifyWhackedUser = (userId) => {
    toast.warn(`🤨 ${user} pulled up on your pinata!`, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: (
        <img
          src={ResolutionLogo}
          style={{
            width: '32px',
            height: '32px',
            marginRight: '10px',
          }}
        />
      ),
    });
  };
  
  const getUser = () => {
    axios.get(`/users/search/${searchInput}`)
      .then((response) => {
        setUser(response.data.username);
        setUserPhoto(response.data.picture);
        setUserId(response.data.id);
        setSearchInput('');
        // //toast whacked user 
        // if (loggedIn.id !== response.data.id) {
        //   notifyWhackedUser();
        // }
        
      })
      .catch((err) => {
        console.error('error getting user:', err);
        setUser('User does not exist. Please enter a valid username');
      });
  };
  
 //updated handle whack to pass in user and then notify of once whacked
  const handleWhack = () => {
    //whacker toast to alert assault event
    notify(user)
      .then(() => {
        //then alert searched user
        setTimeout(() => {
          notifyWhackedUser();
        }, 2000);
        
      });
  };

  // value to search username
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  return (
    <div className='section container'>
      <h1 className="text-primary">Who would you like to Whack?</h1>
      <p>Take your anger out on whoever you are mad at! Search for your Enemy
        to get a personalized Piñata of them and give them as many Whacks as you
        want, they will get a notification every time you do!
      </p>
      <input type="text"
        placeholder='Enemy username'
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            getUser();
          }
        }}
        value={searchInput}/>
      <button className='btn btn-primary'
        type="button"
        onClick={getUser}
      >Search</button>
      <h2>Your Piñata of {user}</h2>
      <div>
        <button className='btn btn-primary'
          onClick={handleWhack}
        >Whack'em!</button>
       
      </div>
      <Canvas userPhoto={userPhoto}/>
    </div>
  );
};

export default Whack;

