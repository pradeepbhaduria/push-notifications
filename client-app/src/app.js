import React from 'react';
import NotificationComponent from './notification-component';
import PushMessagingComponent from './push-messaging-component';

import './app.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h2>Notifications Test</h2>
      </header>
      <main>
        <NotificationComponent />
        <PushMessagingComponent />
      </main>
    </div>
  );
}

export default App;
