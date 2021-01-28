import React, {useState} from 'react';
import './Todo.css';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import db from '../../../firebase/firebase';
import Type from '../../Type/Type'
import {useStateValue} from '../../StateProvider'

 const useStyles = makeStyles((theme) => ({
        paper:{
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2,4,3),
        },

}));

function Todo({todo}){

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState(todo.name);
    const [type, setType] = useState(todo.type);
    const {user} = useStateValue();

     const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleCompleteTaskChange = (e) => {
        e.preventDefault();
        todo.completed=!todo.completed
        db.collection('todos').doc(user).collection('todos')
            .doc(todo.id).update({completed: todo.completed})
    }

    const updateTodo = () => {
        db.collection('types').where('name', '==', type.toLowerCase()).get()
            .then(querySnapshot => {
                if (querySnapshot.empty){
                    db.collection('types')
                        .add({
                            name: type.toLowerCase(),
                        })
                }
            })
            .catch(error => console.log(error));
        db.collection('todos').doc(user).collection('todos')
            .doc(todo.id).update({name: inputName, type: type})
        setOpen(false);
    }

    const deleteTodo = () => {
        db.collection('todos').doc(user).collection('todos')
            .doc(todo.id).delete()
    }


    return (
        <div className='todo'>
             <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className={classes.paper}>
                    <Type
                        show_input={true}
                        defaultValue={todo.type}
                        extra_types={['']}
                        handleTypeChange={handleTypeChange}
                    />
                    Task:
                    <input
                        type='text'
                        placeholder={todo.name}
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                    <Button onClick={updateTodo}>Update todo</Button>
                </div>
            </Modal>
            <input
                id={todo.id}
                type="checkbox"
                name={todo.name}
                value={todo.id}
                onChange={handleCompleteTaskChange}
                checked={todo.completed}
            />
            <label htmlFor={todo.id}>
                <h3 onClick={(e) => {e.preventDefault();setOpen(true)}}>{todo.name}</h3>
            </label>
            <button className='todo__delete' onClick={deleteTodo}>x</button>
        </div>
    )
}


export default Todo;
