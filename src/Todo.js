import React, {useState} from 'react';
import './Todo.css';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import db from './firebase';
import Type from './Type'
import {useStateValue} from './StateProvider'

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

function Todo({todo, handleCompletedTodo, types}){

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState(todo.name);
    const [type, setType] = useState(todo.type);
    const [user] = useStateValue();

    const handleChange = (e) => {
        e.preventDefault();
        console.log('onClick', e);
        console.log('onClick', e.target);
        console.log('onClick', e.target.value);
        todo.completed=!todo.completed
        handleCompletedTodo(e.target.value);
    }

    const handleChange_ = (e) => {
        //e.preventDefault();
        console.log('onChange', e);
        console.log('onChange', e.target);
        console.log('onChange', e.target.value);
    }

    const updateTodo = () => {
        console.log(`Updating task ${todo.id}`)
        db.collection('todos').doc(user).collection('todos')
            .doc(todo.id).set({name: inputName, type: type}, {merge: true})
        setOpen(false);
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
                        type={type}
                        setType={setType}
                        types={types}
                        extra_types={[{name:''}]}
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
                onChange={handleChange}
                checked={todo.completed}
            />
            <label for={todo.id}>
                <h3 onClick={(e) => {e.preventDefault();setOpen(true)}}>{todo.name}</h3>
            </label>
        </div>
    )
}


export default Todo;
