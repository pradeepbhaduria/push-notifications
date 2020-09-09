/* eslint-disable no-restricted-globals */

self.addEventListener('install', function () {
  console.log('Service worker Installed !!');
});

self.addEventListener('activate', function () {
  console.log('Service worker Activated !!');
});

self.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});

self.addEventListener('load', async () => {
  console.log('Window is loaded inside SW !!!');
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');
      console.log('Service worker registration successful !!');
    } catch (err) {
      console.log('error in registration', err);
    }
  }
});

self.addEventListener('notificationclose', (event) => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ', notification);
});

self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const route = notification.data.route;
  const action = event.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow(route);
    notification.close();
  }

  // TODO 5.3 - close all notifications when one is clicked
});

self.addEventListener('push', (event) => {
  let body;
  console.log('push event received', event);
  console.log('push event received', event.data.text());
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Default body';
  }
  const options = {
    body: body,
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
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

// self.addEventListener('message', (event) => {
//   console.log('message received in SW', event.data);
// });

// function register() {}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
