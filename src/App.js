import React , {useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoCreator from './TodoCreator';
import Login from './Login';
import {useStateValue} from './StateProvider';
import db from './firebase'

function App() {

 const [user, todos, types, setTodos, setTypes] = useStateValue();

 useEffect(() => {
        const unsubscribe = db.collection('types').onSnapshot((snapshot) => {

            setTypes(snapshot.docs.map((doc) => { return {
               ...doc.data(),
            }}).sort());
               console.log('types: ', types);
            }


        );

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
