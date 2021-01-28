import React, {createContext, useContext, useEffect, useState} from 'react';

export const StateContext = createContext();

export const StateProvider = ({children}) => {

     const [user, setUser] = useState('kaine555');
     const [todos, setTodos] = useState([]);
     const [types, setTypes] = useState([]);
     useEffect(() => {console.log('sss')})


    return (
        <StateContext.Provider value={
            {
                user:user,
                todos:todos,
                types:types,
                setTodos:setTodos,
                setTypes: setTypes
            }
        }>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);