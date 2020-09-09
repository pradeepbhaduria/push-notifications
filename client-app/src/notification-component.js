import React from 'react';

const NotificationComponent = () => {
  const options = {
    body: 'First notification!',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      route: 'route2',
    },
    actions: [
      {
        action: 'explore',
        title: 'Go to the site',
      },
      {
        action: 'close',
        title: 'Close the notification',
      },
    ],
  };
  const showNotification = async () => {
    if (window.Notification) {
      if (Notification.permission !== 'denied') {
        await Notification.requestPermission();
      }
      if (Notification.permission === 'granted') {
        const registration = await navigator.serviceWorker.getRegistration();
        registration.showNotification('Hello world!', options);
      }
    } else {
      console.log('Browser does not support desktop notification');
    }
  };

  return (
    <div>
      <button onClick={showNotification}>Show Notification</button>
    </div>
  );
};

export default NotificationComponent;
