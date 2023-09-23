import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
const socket = io();
const Notification = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => { 
    //console.log(socket.id);

    //listen for incoming notifications
    socket.on('notification', (message) => {
      //notification object 
      const newNotification = {
        id: 6, 
        message,
        dismissed: false,
      };
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      //preview message
      console.log('Received test notification', message);
    });
    //disconnect on unmount
    return () => {
      socket.off('notification');
      socket.disconnect();
    };

  }, []);

  //dismiss notify
  const dismissNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, dismissed: true } : notification
      )
    );
  };
  //notify null unless whack, then render notify div with dismiss
  return (
    <div className='notify-container'>
      <h3> Notification</h3>
      {notifications.map((notification) =>
        !notification.dismissed ? (
          <div className="notify-popup" key={notification.id}>
            <p>{notification.message}</p>
            <button onClick={() => dismissNotification(notification.id)}>Dismiss</button>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Notification;
