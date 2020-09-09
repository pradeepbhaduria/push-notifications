const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webPush = require('web-push');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(
    'You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY ' +
      'environment variables. You can use the following ones:'
  );
  console.log(webPush.generateVAPIDKeys());
  return;
}

webPush.setVapidDetails(
  'https://developers.google.com/web/fundamentals/push-notifications',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

console.log('process.env.VAPID_PUBLIC_KEY', process.env.VAPID_PUBLIC_KEY);

let subscriptions = [];
// let subscription = [];

const isValidSubscription = (req, res) => {
  // Check the request body has at least an endpoint.
  if (!req.body || !req.body.endpoint) {
    // Not a valid subscription.
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send(
      JSON.stringify({
        error: {
          id: 'no-endpoint',
          message: 'Subscription must have an endpoint.',
        },
      })
    );
    return false;
  }
  return true;
};

app.post('/api/save-subscription', function (req, res) {
  console.log('subscription is :', req.body);
  if (!isValidSubscription(req, res)) {
    return;
  }
  subscriptions.push(req.body);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ data: { success: true } }));
});

app.post('/api/delete-subscription', function (req, res) {
  console.log('subscription is :', req.body);

  subscriptions = subscriptions.filter((subscription) => {
    subscription.endpoint !== req.body.endpoint;
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ data: { success: true } }));
});

const triggerPushMsg = function (subscription, dataToSend) {
  return webPush.sendNotification(subscription, dataToSend).catch((err) => {
    console.log('err', err);
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log('Subscription has expired or is no longer valid: ', err);
      subscriptions = subscriptions.filter((subscription) => {
        subscription.endpoint !== req.body.endpoint;
      });
    }
    return true;
  });
};

app.post('/api/trigger-push-message', function (request, response) {
  const dataToSend = 'hello';

  const pushPromises = [];

  subscriptions.forEach((subscription) => {
    console.log('triggering push messages to', subscription.endpoint);
    pushPromises.push(triggerPushMsg(subscription, dataToSend));
  });

  Promise.all(pushPromises)
    .then(function () {
      response.sendStatus(201);
    })
    .catch(function (error) {
      response.sendStatus(500);
      console.log(error);
    });
});
// app.post('/api/trigger-push-message', function (request, response) {
//   console.log('triggering push message');
//   const dataToSend = 'hello';
//   webPush
//     .sendNotification(subscriptions[0], dataToSend)
//     .then(function () {
//       response.sendStatus(201);
//     })
//     .catch(function (error) {
//       response.sendStatus(500);
//       console.log(error);
//     });
// });

app.listen(8080);
