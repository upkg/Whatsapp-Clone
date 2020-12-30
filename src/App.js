import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Login from './Login';
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';


function App() {

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will run once when app loads 
    // checking for auth 
    auth.onAuthStateChanged(authUser => {
      console.log('User >> ', authUser);

      if (authUser) {
        // user logged in or was logged in

        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })

      } else {
        // the user is logged out 
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        })
      }
    })
    return () => {
      
    }
  }, [])



  const [messages, setMessages] = useState([]);

  useEffect(() => {
      axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, []);

  useEffect(() => {

    const pusher = new Pusher('7b891bf4f76932cf7929', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return ()=> {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]);

  console.log(messages);

  return (
    <div className="app">

    {!user ? (
      <Login />
    ): (
      <div className="app__body">
          <Router>
            {/* sidebar always renders  */}
            <Sidebar />

            <Switch>              
                <Route path='/rooms/:roomId'>                
                  <Chat messages={messages}/>
                </Route>

                <Route path='/'>
                  <Chat messages={messages} />
                </Route>              
            </Switch>        
	      	    
          </Router>
	      	  
    	</div>  
    )}

      	
    </div>
  );
}

export default App;
