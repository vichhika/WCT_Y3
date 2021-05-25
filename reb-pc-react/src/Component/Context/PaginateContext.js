import React, {useState,createContext} from 'react';

export const PaginateContext = createContext();

const PaginateContextProvider = (props) => {

    const initState = {
        currentPage: 1
    }

    const [state,setState] = useState(initState);

    const setCurrentPage = (newPage) => {
        setState({...state,currentPage: newPage});
    }

    return(
        <PaginateContext.Provider value={{...state, setCurrentPage: setCurrentPage}}>
            {props.children}
        </PaginateContext.Provider>
    );

}

export default PaginateContextProvider;