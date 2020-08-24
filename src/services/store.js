// src/services/store.js

import Reducer from './Reducer.js'
import React, { createContext, useReducer } from 'react'

// APP STATE AND LOGIC HERE

const initialState = {
    id: '5f417ce8ec17016726f1a1ce',
    first_name: undefined,
    last_name: undefined,
    username: undefined,
    password: undefined,
    city: undefined,
    state: undefined,
    profile_img: undefined,
    isAdmin: false,
    isLogged: true,
    isAuth: false,
    friends: [],
    posts: [],
    favouriteFoods: [],
}

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    return(
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    ) 
}

export const Context = createContext(initialState)
export default Store
