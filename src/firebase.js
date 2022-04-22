import * as firebase from 'firebase/app';
import { getMessaging,getToken,onMessage} from "firebase/messaging";




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
    const firebaseConfig = {
        apiKey: "AIzaSyDdRLpmLKzYFJVbV9_4ETiEn8BeJ8X33-g",
        authDomain: "react-push-notification-4b570.firebaseapp.com",
        projectId: "react-push-notification-4b570",
        storageBucket: "react-push-notification-4b570.appspot.com",
        messagingSenderId: "1011115309376",
        appId: "1:1011115309376:web:7f81db00b9a2b9d58b22a5",
        measurementId: "G-4EY3T6JPSK"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    

    const messaging = getMessaging();

        return getToken(messaging, { vapidKey: 'BKsqtamJDrtIzdBabhWT1badD3j341VP5pc-hONQsmuDVtBdpoZdz9xkLPsiY-Ftjw9anEBHCBfGlQHaXEVOypA' })
        .then((currentToken) => {
          if (currentToken) {
            console.log('current token for client: ', currentToken);
            // Perform any other neccessary action with the token
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });

    

  };

  export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });