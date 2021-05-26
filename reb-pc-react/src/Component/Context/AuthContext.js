import React, {createContext, useReducer} from 'react';


const initState = {
    isAuthenticated: false,
    token: null
}

const authContext = createContext(initState);

const actions = {
    setIsAuthenticated: (state, isAuthenticated) => {
        return {
            ...state,
            isAuthenticated
        }
    },
    setToken: (state, token) => {
        return {
            ...state,
            token
        }
    }
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'set_isAuthenticated':
            state = actions.setIsAuthenticated(state, action.payload)
            return {...state}
        case 'set_token':
            state = actions.setToken(state, action.payload)
            return {...state}
        default:
            return {...state}
    }
}

const AuthContextProvider = props => {
    const [contextAuthState, updateAuthContext] = useReducer(authReducer, initState);
    return (
        <authContext.Provider value={{contextAuthState, updateAuthContext}}>
            {props.children}
        </authContext.Provider>
    );
}


export {
    AuthContextProvider,
    authContext
};