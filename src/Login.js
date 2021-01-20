import React, {useState} from 'react';
import './Login.css'
import {useStateValue} from './StateProvider'
import {auth, provider} from './firebase'




function Login(){
    const [user, setUser] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            setUser(result.user);
            console.log('user: ', user);
        })
        .catch((error) => {
            console.log('Authentication error');
        })
    }

    return (
        <div className='login'>
             <div className='login__container'>
                <img
                    src='https://cdn.pixabay.com/photo/2020/01/21/18/39/todo-4783676_960_720.png'
                    alt='todo logo'
                />
                <div className='login__text'>
                    <h1>Sign in to ToDoApp</h1>
                </div>
                <button
                    onClick={signIn}
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}

export default Login;