import React, {createContext} from 'react';

export const AuthContext = createContext();

function AuthContextProvider(props){

    const state = {
        isAuthenticated: true
    }

    const setAuth = () => {
        this.setState({isAuthenticated: !this.state.isAuthenticated });
    }
    
    return(

        <AuthContext.Provider value={{...state, setAuth: setAuth}}>
            {props.children}
        </AuthContext.Provider>

    );

}

export default AuthContextProvider;