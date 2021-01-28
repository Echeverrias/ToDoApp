import React , {useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import TodoCreator from './components/TodoCreator/TodoCreator';
import Login from './components/Login/Login';
import {useStateValue} from './components/StateProvider';
import db from './firebase/firebase'

function App() {

 const {user, setTypes} = useStateValue();

 useEffect(() => {
        const unsubscribe = db.collection('types').onSnapshot((snapshot) => {
            setTypes(snapshot.docs.map((doc) => doc.data().name).sort());
        });

        return () => {
            unsubscribe();
        }
   }, [])

  return (

    <div className="app">
    { !user?(<Login/>):
        (<div><div className='app__header'>
            <h1>Todo App</h1>
        </div>
        <div className='app__body'>
            <TodoList/>
            <TodoCreator/>
        </div></div>)
    }

    </div>

  );
}

export default App;
