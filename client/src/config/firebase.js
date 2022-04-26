import * as firebase from 'firebase/app';
import { getMessaging,getToken,onMessage} from "firebase/messaging";
// import fireBaseConfig from './fireBaseConfig.js';



// export const requestFirebaseNotificationPermission = () =>
//   new Promise((resolve, reject) => {
//     messaging
//       .requestPermission()
//       .then(() => messaging.getToken())
//       .then((firebaseToken) => {
//         resolve(firebaseToken);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });
export const requestForToken = () => {
  let token = '';
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      projectId: process.env.REACT_APP_PROJECT_ID,
      messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
      appId: process.env.REACT_APP_APP_ID,
    }
    firebase.initializeApp(firebaseConfig);
    

    const messaging = getMessaging();
    return new Promise((resolve, reject) => {
         getToken(messaging, { vapidKey: 'BKsqtamJDrtIzdBabhWT1badD3j341VP5pc-hONQsmuDVtBdpoZdz9xkLPsiY-Ftjw9anEBHCBfGlQHaXEVOypA' })
        .then((currentToken) => {
          if (currentToken) {
            // console.log('current token for client: ', currentToken);
            // Perform any other neccessary action with the token
            resolve(currentToken);
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
  })
}

  export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });