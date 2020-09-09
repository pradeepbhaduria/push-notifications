import React, { useState, useEffect } from 'react';

import { urlB64ToUint8Array } from './util';
import {
  deleteSubscriptionOnServer,
  saveSubscriptionOnServer,
  triggerPushMessage,
} from './api-wrapper';

const PushMessaging = () => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const getSubscription = async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration.pushManager.getSubscription();
      setSubscription(subscription);
    };
    getSubscription();
  }, []);

  const subscribeUser = async () => {
    try {
      const applicationServerKey = urlB64ToUint8Array(
        process.env.REACT_APP_VAPID_PUBLIC_KEY
      );
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
      console.log('Received PushSubscription: ', JSON.stringify(subscription));
      saveSubscriptionOnServer(subscription);
      setSubscription(subscription);
    } catch (err) {
      if (Notification.permission === 'denied') {
        console.warn('Permission for notifications was denied');
      } else {
        console.error('Failed to subscribe the user: ', err);
      }
    }
  };

  const unSubscribeUser = async () => {
    await subscription.unsubscribe();
    setSubscription(null);
    deleteSubscriptionOnServer(subscription);
    console.log('User is unsubscribed');
  };

  const toggleSubscription = () => {
    subscription ? unSubscribeUser() : subscribeUser();
  };

  const getLabel = () => {
    return subscription ? 'Disable Push Messaging' : 'Enable Push Messaging';
  };

  return (
    <div>
      <button onClick={toggleSubscription}>{getLabel()}</button>
      <button
        onClick={() => triggerPushMessage('new message')}
        disabled={!subscription}
      >
        Trigger Push Message
      </button>
    </div>
  );
};

export default PushMessaging;
