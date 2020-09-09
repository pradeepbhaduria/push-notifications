const saveSubscriptionOnServer = (subscription) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/api/save-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: subscription ? JSON.stringify(subscription) : '{}',
  })
    .then(function (response) {
      console.log('response', response);
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }

      return response.json();
    })
    .then(function (responseData) {
      if (!(responseData.data && responseData.data.success)) {
        throw new Error('Bad response from server.');
      }
    });
};

const deleteSubscriptionOnServer = (subscription) => {
  return fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/delete-subscription`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: subscription ? JSON.stringify(subscription) : '{}',
    }
  )
    .then(function (response) {
      console.log('response', response);
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }

      return response.json();
    })
    .then(function (responseData) {
      if (!(responseData.data && responseData.data.success)) {
        throw new Error('Bad response from server.');
      }
    });
};

const triggerPushMessage = (payload = 'hello') => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trigger-push-message`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      payload: payload,
    }),
  });
};

// const triggerPushMessage = () => fetch(`${baseUrl}/api/trigger-push-message`);

export {
  saveSubscriptionOnServer,
  deleteSubscriptionOnServer,
  triggerPushMessage,
};
