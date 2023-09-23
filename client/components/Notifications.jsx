import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
const socket = io();
const Notification = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => { 
    console.log(socket.connected);

    //listen for incoming notifications
    socket.on('test_notify', (message) => {
      const newNotification = {
        id: Math.random(), 
        message,
        dismissed: false,
      };
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      //preview message
      console.log('Received test notification', message);
    });
    //disconnect on unmount
    return () => socket.disconnect();

  }, []);

  //dismiss notify
  const dismissNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, dismissed: true } : notification
      )
    );
  };

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
