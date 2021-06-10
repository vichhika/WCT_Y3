import axios from 'axios';
import React, {useEffect, createContext, useReducer, useContext} from 'react';
import server from './../../config.json';
import {authContext} from './../Context/AuthContext';

const initState = {
    fullname: null,
    username: null,
    email: null,
    phoneNo: null,
}

const UserProfileContext = createContext(initState);

const actions = {

    setFullname: (state,fullname) => {
        return {
            ...state,
            fullname
        }
    },
    setUsername: (state,username) => {
        return {
            ...state,
            username
        }
    },
    setEmail: (state, email) => {
        return {
            ...state,
            email
        }
    },
    setPhoneNo: (state, phoneNo) => {
        return {
            ...state,
            phoneNo
        }
    }

}

const userProfileReducer = (state, action) => {

    switch (action.type){

        case 'setFullname'  :   state = actions.setFullname(state, action.payload);
                                return {
                                    ...state
                                }
        case 'setUsername'  :   state = actions.setUsername(state, action.payload);
                                return {
                                    ...state
                                }
        case 'setEmail'  :      state = actions.setEmail(state, action.payload);
                                return {
                                    ...state
                                }    
        case 'setPhoneNo'  :    state = actions.setPhoneNo(state, action.payload);
                                return {
                                    ...state
                                }                   
    }

}

const UserProfileContextProvider = (props) => {

    const {contextAuthState} = useContext(authContext);

    const [userProfileContext, updateUserProfileContext] = useReducer(userProfileReducer, initState);

    let token = null;
    // if(contextAuthState.isAuthenticated){
    //     token = contextAuthState.token;
    //     console.log(contextAuthState.token);
    // }
    return (

        <UserProfileContext.Provider value={{userProfileContext, updateUserProfileContext}}>
            
            {
                useEffect(() => {
                    axios.get(server.uri + 'profile_info', { 'headers': { 'Authorization': `bearer ` + `${contextAuthState.token}`}}).then(
                        (response) => {
                            console.log(response.data);
                        }
                    ).catch((error) => {
                        console.log(contextAuthState.token);
                    })
                },[contextAuthState.token])
            }

            {props.children}
        </UserProfileContext.Provider>

    );

}

export {
    UserProfileContext,
    UserProfileContextProvider
}
