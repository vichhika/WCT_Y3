import React, {createContext, useEffect, useReducer, useState} from 'react';

const initContext = {
    isVerify: false,
    authentication: {
        isAuthentication: false,
        token: null
    }
}

const AuthContext = createContext(initContext);

const actions = {
    setAuthentication: (state,authentication) => {
        return {...state,authentication}
    },
    setIsVerify: (state,isVerify) => {
        return {...state,isVerify}
    }

}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'set_authentication':
            state = actions.setAuthentication(state,action.payload)
            return {...state}
        case 'set_isVerify':
            state = actions.setIsVerify(state,action.payload)
            return {...state}
        case 'reset_context':
            return {...action.payload}
        default:
            return {...state}
    }
}

const AuthContextProvider = props => {
    const [authContextState, authUpdateContextState] = useReducer(authReducer, initContext);
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{authContextState, authUpdateContextState}}>
            {
                useEffect(() => {
                    setLoading(true);
                    if (sessionStorage.getItem("auth") !== null) {
                        authUpdateContextState({
                            type: 'reset_context',
                            payload: JSON.parse(sessionStorage.getItem("auth"))
                        })
                        setLoading(false);
                    }
                }, [])
            }

            {
                useEffect(() => {
                    if (!loading) {
                        sessionStorage.setItem("auth", JSON.stringify(authContextState));
                    }
                }, [authContextState])
            }
            {props.children}
        </AuthContext.Provider>
    );
}

export {
    AuthContextProvider,
    AuthContext
};