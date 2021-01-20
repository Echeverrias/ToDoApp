import React, {useEffect, useState} from 'react';
import {useStateValue} from './StateProvider';
import Type from './Type';
import './TodoList.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'


function TodoList(){

    const [user, todos, types, setTodos, setTypes] = useStateValue();
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

   const completeTask = (id) => {

        console.log('completeTask: ', id)
        let todo = null;
        let index = undefined;
        for(let i=0; i < todos.length; i++){
            if (todos[i].id === id){
                todo = todos[i];
                index = i;
                break;
            }
        }
        todo = todos[index]
        db.collection('todos').doc(user).collection('todos')
            .doc(todo.id).set({completed: todo.completed}, {merge: true})
   }

   const deleteCompletedTasks = (e) => {
        console.log('deleting')
        e.preventDefault();
        let deletable_tasks = todos.filter((todo) => ((todo.type === filter) ||(filter === 'all')) && todo.completed);

        deletable_tasks.forEach((todo) => {
            db.collection('todos').doc(user).collection('todos')
                .doc(todo.id).delete()
        })

   }

   const debug = (e) => {
    e.preventDefault();
    console.log(db.collection('todos').doc('xxx'))
    db.collection('todos').doc('debug').collection('todos')
        .add({
                todos:{
                    name: 'zzz',
                    type: 'prueba',
                    completed: false,
                    createdTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    array: ['a', 'b', 'c']
                }
        })
   }

    return (
        <div className='todolist'>
        <button onClick={debug}>Debug</button>
        <div className='todolist__filter'>
            <Type
                show_input={false}
                label={'Filter'}
                type={filter}
                setType={setFilter}
                types={types}
                extra_types={[{name:'all'}, {name:'not completed'}]}
            />
        </div>
        <div className='todolist__list__tasks'>
            { todos.filter((todo) =>
                (todo.type === filter) || (filter === 'not completed' && !todo.completed) ||(filter === 'all')
              ).map((todo) =>
                 <Todo key={todo.id} todo={todo} types={types} handleCompletedTodo={completeTask}/>
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

