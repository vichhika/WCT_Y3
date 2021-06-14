import React, { createContext, useEffect, useReducer, useState } from 'react';

const initContext = {
    isVerify: false,
    authentication: {
        isAuthentication: false,
        token: null
    },
    admin_shop_profile: null,
}

const AuthContext = createContext(initContext);

const actions = {
    setAuthentication: (state, authentication) => {
        return { ...state, authentication }
    },
    setIsVerify: (state, isVerify) => {
        return { ...state, isVerify }
    },
    set_admin_shop_profile: (state, admin_shop_profile) => {
        return { ...state, admin_shop_profile }
    }

}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'set_authentication':
            state = actions.setAuthentication(state, action.payload)
            return { ...state }
        case 'set_isVerify':
            state = actions.setIsVerify(state, action.payload)
            return { ...state }
        case 'reset_context':
            return { ...action.payload }
        case 'set_admin_shop_profile':
            state = actions.set_admin_shop_profile(state, action.payload)
            return { ...state }
        default:
            return { ...state }
    }
}

const AuthContextProvider = props => {
    const [authContextState, authUpdateContextState] = useReducer(authReducer, initContext);
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ authContextState, authUpdateContextState }}>
            {
                useEffect(() => {
                    setLoading(true);
                    if (sessionStorage.getItem("auth") !== null) {
                        authUpdateContextState({
                            type: 'reset_context',
                            payload: JSON.parse(sessionStorage.getItem("auth"))
                        })
                    }
                    setLoading(false);
                }, [])
            }

            {
                useEffect(() => {
                    loading || sessionStorage.setItem("auth", JSON.stringify(authContextState));
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