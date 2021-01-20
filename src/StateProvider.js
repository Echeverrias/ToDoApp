import React, {createContext, useContext, useEffect, useState} from 'react';
import db from './firebase';

export const StateContext = createContext();

export const StateProvider = ({children}) => {

     const [user, setUser] = useState('kaine555');
     const [todos, setTodos] = useState([]);
     const [types, setTypes] = useState([]);
     useEffect(() => {console.log('sss')})


    return (
        <StateContext.Provider value={[user, todos, types, setTodos, setTypes]}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);