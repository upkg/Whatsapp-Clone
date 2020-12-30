import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Button, IconButton, Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import axios from './axios';
import background from './whatsapp-background.png';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';



function Chat({}) {

  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
        db.collection("rooms")
        .doc(roomId).
        onSnapshot(snapshot =>
          setRoomName(snapshot.data().name)
      );
      db.collection('rooms')
          .doc(roomId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data())) 
          );

    }
  },[roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
}, []);

// firebase send message 
  const sendMessage = async (e) => {
    e.preventDefault();

    db.collection('rooms')
    .doc(roomId).collection('messages')
    .add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

     setInput('');

    
  };


// Mongo DB send message
  // const sendMessage = async (e) => {
  //   e.preventDefault();

  //   console.log(input);
  //   await axios.post('/messages/new', {
  //     message: input,
  //     name: "hansen",
  //     timestamp: "11 pm",
  //     received: false,
  //   });

  //    setInput('');

    
  // };


  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>    

        <div className="chat__headerInfo">
          <h3>{roomName}</h3> 
          <p>
            Last seen at{" "}
            {
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()
            }
          </p>     
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton> 

          <IconButton>
            <AttachFileIcon />
          </IconButton> 

          <IconButton>
            <MoreVertIcon />
          </IconButton> 
        </div>
      </div>  

      <div className='chat__body'>
        {/* mern stack way 
        {messages.map((message) => (
          <p className={`chat__message ${message.received && "chat__receiver"}`}>
          <span className='chat__name'>{message.name}</span>
          {message.message}
          <span className='chat__timestamp'>
          {message.timestamp} 
          </span>
        </p>
        ))} */}


        {/* firebase  */}
        {messages.map((message) => (
          <p className={`chat__message ${message.name === user.displayName
          && "chat__receiver"}`}>
          <span className='chat__name'>{message.name}</span>
          {message.message}
          <span className='chat__timestamp'>
            {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
        </p>
        ))}
        

        

        
      </div>

      <div className='chat__footer'>
        
        <div className='chat__footerInput'>
        <InsertEmoticonIcon />
        {/* mongo fb
        <form>
          <input value={input} 
            onChange={(e => setInput(e.target.value))} 
            placeholder='Type a message' type='text' />
            <button onClick={sendMessage} type='submit'>
              Send a message
            </button>
        </form> */}

        <form>
          <input value={input} 
            onChange={(e => setInput(e.target.value))} 
            placeholder='Type a message' type='text' />
            <button onClick={sendMessage} type='submit'>
              Send a message
            </button>
        </form>
 
        <IconButton>
            <AttachFileIcon />
        </IconButton>

        <IconButton>
            <PhotoCameraIcon />
        </IconButton>         
        </div>
        
        <div className='chat__footerSpeaker'>
        <IconButton>
          <MicIcon />
        </IconButton>  
        </div>
        
      </div> 
      
         
    </div>
  );
}

export default Chat;
