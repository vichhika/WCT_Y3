import React, {createContext, useEffect, useReducer, useState} from 'react';
import server from './../../config.json';
import axios from 'axios';

const initState = {
    loading: true,
    isAuthenticated: false,
    token: null,
    userProfile: null,
    isVerify: false,
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
    },
    setUserProfile: (state, userProfile) => {
        return {
            ...state,
            userProfile
        }
    },
    setIsVerify: (state, isVerify) => {
        return {
            ...state,
            isVerify
        }
    },
    setLoading: (state, loading) => {
        return {
            ...state,
            loading
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
        case 'setUserProfile'  :
            state = actions.setUserProfile(state, action.payload);
            return {
                ...state
            }
        case 'setIsVerify'  :
            state = actions.setIsVerify(state, action.payload);
            return {
                ...state,
            }
        case 'setLoading'   :
            state = actions.setLoading(state, action.payload);
            return {
                ...state,
            }
        default:
            return {...state}
    }
}

const AuthContextProvider = props => {
    const [contextAuthState, updateAuthContext] = useReducer(authReducer, initState);
    const [loadingState, setLoadingState] = useState(false);

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
                    if (!loadingState) {
                        sessionStorage.setItem("auth", JSON.stringify(contextAuthState));

                    }
                }, [contextAuthState])

            }

            {/* {
                useEffect(() => {

                    if(contextAuthState.isAuthenticated){

                        // request user profile
                        axios.get(server.uri + 'profile_info', { 'headers': { 'Authorization': `Bearer ` + `${contextAuthState.token}`}}).then(
                            (response) => {
                                
                                updateAuthContext({type: 'setFullname', payload: response.data});
                                let userProfile = response.data.message[0];

                                updateAuthContext({type: 'setUserProfile', payload: userProfile});
                            }
                        ).catch((error) => {
                            console.log(error.response.status);
                            if(error.response.status == 401){
                                alert("Your email address is not verified.");
                            }
                        })

                    }

                },[contextAuthState.isAuthenticated])
            } */}

            {
                useEffect(() => {

                    if (contextAuthState.isAuthenticated) {

                        axios.get(server.uri + 'is_verify', {
                            headers: {'Authorization': 'Bearer ' + `${contextAuthState.token}`}
                        }).then(
                            response => {
                                let verified = response.data.message
                                    .localeCompare('email has been verified.') === 0 ? true : false;
                                updateAuthContext({type: 'setIsVerify', payload: verified})
                            }
                        )

                    }

                }, [contextAuthState.isAuthenticated])
            }

            {
                useEffect(() => {

                    if (contextAuthState.isAuthenticated && contextAuthState.isVerify) {

                        // request user profile
                        axios.get(server.uri + 'profile_info', {'headers': {'Authorization': `Bearer ` + `${contextAuthState.token}`}})
                            .then(
                                (response) => {
                                    let userProfile = response.data.message[0];

                                    updateAuthContext({type: 'setUserProfile', payload: userProfile});
                                    updateAuthContext({type: 'setLoading', payload: false});

                                }
                            ).catch((error) => {
                            console.log(error.response.status);
                            if (error.response.status == 401) {
                                alert("Your email address is not verified.");
                            }
                        })

                    }

                }, [contextAuthState.isVerify])
            }

            {props.children}
        </authContext.Provider>
    );
}


export {
    AuthContextProvider,
    authContext
};