import React, {useState} from 'react';
import './TodoCreator.css';
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from './StateProvider'
import Type from './Type'

function TodoCreator(){
    const [taskName, setTaskName] = useState('');
    const [newType, setNewType] = useState('');
    const {user, todos, setTodos} = useStateValue();

    const handleChangeOnTask = (e) => setTaskName(e.target.value);
    const handleChangeOnType = (e) => setNewType(e.target.value);

    const saveTask = (e) => {
       e.preventDefault();
       console.log('saveTask');
       console.log(e);
       console.log(e.target);
       console.log('newType:', newType);
       console.log('task name:', e.target?.name.value);
       console.log('task type:', e.target?.type.value);

        db.collection('todos').doc(user).collection('todos')
        .add({
            name: e.target.name.value,
            type: e.target.type.value,
            completed: false,
            createdTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        db.collection('types').where('name', '==', newType.toLowerCase()).get()
            .then(querySnapshot => {
                if (querySnapshot.empty){
                    db.collection('types')
                        .add({
                            name: e.target.type.value.toLowerCase(),
                        })
                }
            })
            .catch(error => console.log(error));
        /*
        if (newType && !types.includes(newType)){
            db.collection('types')
            .add({
                name: e.target.type.value.toLowerCase(),
            })
        }
        */
        setTaskName('')
        setNewType('')

    }

    return (
        <div className='todocreator'>
            <form onSubmit={(e) => saveTask(e)}>
                <div className='todocreator__section'>
                    <label htmlFor='newTask'>New Task:</label>
                    <input
                        value={taskName}
                        onChange={handleChangeOnTask}
                        type='text'
                        id='newTask'
                        name='name'
                        placeholder='Write your task'
                    />
                </div>
                <div className='todocreator__section'>
                    <Type
                        show_input={true}
                        extra_types={['']}
                        value={newType}
                        setValue={setNewType}
                    />
                </div>
                <button type='submit'>Add task</button>
            </form>
        </div>
    )
}

export default TodoCreator;
