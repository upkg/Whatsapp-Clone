import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function SidebarChat({ id, name, addNewChat }) {
    const [{ user }, dispatch] = useStateValue();

    const [seed, setSeed] = useState('');

    const [messages, setMessages] = useState('');

    // useEffect for random avatar 
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    
    // create a new chat room 
    const createChat = () => {
        const roomName = prompt('Please enter a new chat group name');

        if (roomName) {
            // adding new group to db 
            db.collection("rooms").add({
                name: roomName,
            })
        };
    };

    // useEffect fro last message 
    useEffect(() => {
        if (id) {
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => 
                doc.data()))
            );
        }
    },[id]);



    

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ): (
        <div className='sidebarChat' onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
 