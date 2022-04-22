import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import {requestForToken,onMessageListener} from './firebase';//////
import { useEffect, useState } from 'react';

function App() {
  const [notification, setNotification] = useState({title: '', body: ''});
  useEffect(()=>{
    // requestFirebaseNotificationPermission()
    // .then((firebaseToken) => {
    //   // eslint-disable-next-line no-console
    //   console.log(firebaseToken);
    // })
    // .catch((err) => {
    //   return err;
    // });
  })
  
  requestForToken();
  onMessageListener()
    .then((payload) => {
      setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
    })
    .catch((err) => console.log('failed: ', err));
  const notify = () =>  toast(<ToastDisplay/>); 
  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };
  useEffect(() => {
    if (notification?.title ){
     notify()
    }
  }, [notification])
  return (
    <div className="App">
      <Toaster/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
