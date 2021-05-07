import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

function AuthContextProvider(props){

    const initState = {
        isAuthenticated: false,
    }

    const [state, setState] = useState(initState);

    const setAuth = () => {
        setState({isAuthenticated: !this.state.isAuthenticated });
    }
    
    return(

        <AuthContext.Provider value={{...state, setAuth: setAuth}}>
            {props.children}
        </AuthContext.Provider>

    );

}

export default AuthContextProvider;