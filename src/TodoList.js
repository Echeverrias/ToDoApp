import React, {useEffect, useState} from 'react';
import {useStateValue} from './StateProvider';
import SelectInputForm from './SelectInputForm';
import './TodoList.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'


function TodoList(){

    const {user, todos, setTodos} = useStateValue();
    const [filter, setFilter] = useState('all');

     useEffect(() => {
        const unsubscribe = db.collection('todos').doc(user).collection('todos').onSnapshot((snapshot) => {

            setTodos(snapshot.docs.map((doc) => { return {
               id: doc.id,
               ...doc.data(),
            }}));
            }
        );

        return () => {
            unsubscribe();
        }
   }, [])



  // useEffect(() => setCurrentTodos(todos), []);


   const handleChange = (e) => {
        console.log('handleChange', e.target.value);
        e.preventDefault();
        setFilter(e.target.value);
   }


   const deleteCompletedTasks = (e) => {
        console.log('deleting')
        e.preventDefault();
        let deletable_tasks = todos.filter((todo) => ((todo.type === filter) ||(filter === 'all') ||(filter === 'completed')) && todo.completed);

        deletable_tasks.forEach((todo) => {
            db.collection('todos').doc(user).collection('todos')
                .doc(todo.id).delete()
        })

   }

   const debug = (e) => {
    e.preventDefault();
    console.log('Debugging');

   }
    return (
        <div className='todolist'>
        <button onClick={debug}>Debug</button>
        <div className='todolist__filter'>
            <SelectInputForm
                id={'filter'}
                label={'Filter'}
                show_input={false}
                options={[
                    'all',
                    'completed',
                    'not completed',
                    ...Array.from(new Set(todos.map(todo => todo.type))).sort(),
                ]}
                value={filter}
                setValue={setFilter}
            />
        </div>
        <div className='todolist__list__tasks'>
            { todos.filter((todo) =>
                (todo.type === filter) ||
                (filter === 'not completed' && !todo.completed) ||
                (filter === 'completed' && todo.completed) ||
                (filter === 'all')
              ).map((todo) =>
                 <Todo key={todo.id} todo={todo}/>
               )
            }

        </div>
         <div className='todolist__delete'>
            <button onClick={deleteCompletedTasks}>Delete completed tasks</button>
         </div>
        </div>
    )
}

//
export default TodoList;

