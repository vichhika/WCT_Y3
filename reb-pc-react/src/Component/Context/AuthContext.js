import React, {createContext, useEffect, useReducer, useState} from 'react';


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
        case 'reset_context':
            return {...action.payload}
        default:
            return {...state}
    }
}

const AuthContextProvider = props => {
    const [contextAuthState, updateAuthContext] = useReducer(authReducer, initState);
    const [loadingState,setLoadingState] = useState(false);

    return (
        <authContext.Provider value={{contextAuthState, updateAuthContext}}>

            {
                useEffect(() => {
                    setLoadingState(true);
                    if (sessionStorage.getItem("auth") !== null) {
                        updateAuthContext({
                            type: 'reset_context',
                            payload: JSON.parse(sessionStorage.getItem("auth"))
                        })
                        setLoadingState(false);
                    }
                }, [])
            }

            {
                useEffect(() => {
                    if (!loadingState){
                        sessionStorage.setItem("auth", JSON.stringify(contextAuthState));
                    }
                }, [contextAuthState])
            }

            {props.children}
        </authContext.Provider>
    );
}


export {
    AuthContextProvider,
    authContext
};