import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './config/firebase';//////
import { useEffect, useState } from 'react';
import { apiCalls } from './config/server';
import { async } from '@firebase/util';

function App() {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [token,setToken] = useState('');
  requestForToken().then(currentToken => {
    setToken(currentToken); 
  }).catch(err => {
    console.log('error enters')
  });
  const makeApicall = async(token) => {
    let data = JSON.stringify({
      "token": token
    });
    const res = await apiCalls.post('http://localhost:3000/subscribe',data);
  }
  useEffect(() => {
    if(token!=='')
      makeApicall(token)
  }, [token])

  onMessageListener()
    .then((payload) => { 
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log('failed: ', err));
  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };
  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification])
  return (
    <div className="App">
      <Toaster />
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
