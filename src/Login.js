import React from 'react';
import './Login.css';
import { Button, IconButton, Avatar } from '@material-ui/core';
import logo from './logo.png';
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';


function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => { 
        auth
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => alert(error.message));

    }

    return (
        <div className='login'>
            <div className='login_container'>
                <img src={logo} alt='logo'/>

                <div className='login__text'>
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign in With Google Account
                </Button>
            </div>
        </div>
    )
}

export default Login
