# Push Notifications using web-push

## Basic Setup

### Generate VAPID keys

- Eun the following command to generate VAPID keys

  ```
  npm install -g web-push
  web-push generate-vapid-keys
  ```

- Add both public and private keys to server `.env` file.

- Add only public keys in the client `.env` file

### Start client app

- Create a `.env` file with the below content at the root of `client-app` folder.

  ```
  REACT_APP_VAPID_PUBLIC_KEY=Public key
  REACT_APP_API_BASE_URL=http://localhost:8080
  ```

- run `npm start`

### Start server app

- Create a `.env` file with the below content at the root of `web-push-server` folder.

  ```
  VAPID_PUBLIC_KEY=Public Key
  VAPID_PRIVATE_KEY=Private Key
  ```

- run `npm start` in a separate terminal

NOTE: public key on both `client-app` and `web-push-server` are the same. Don't generate separate keys for client and server. Generate once and use.
