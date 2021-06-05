import React, {createContext, useEffect, useReducer, useState} from 'react';

const initContext = {
    componentIndex: 1
}

const ProductContext = createContext(initContext);

const actions = {
    setComponentIndex: (state, componentIndex) => {
        return {
            ...state,
            componentIndex
        }
    }
}

const productReducer = (state, action) => {
    switch (action.type) {
        case 'set_componentIndex':
            state = actions.setComponentIndex(state, action.payload)
            return {...state}
        case 'reset_context':
            return {...action.payload}
        default:
            return {...state}
    }
}

const ProductContextProvider = props => {
    const [contextProductState, updateContextProductState] = useReducer(productReducer, initContext);
    const [loading,setLoading] = useState(false);

    return (
        <ProductContext.Provider value={{contextProductState, updateContextProductState}}>
            {
                useEffect(() => {
                    setLoading(true);
                    if (sessionStorage.getItem("adminProductList") !== null) {
                        updateContextProductState({
                            type: 'reset_context',
                            payload: JSON.parse(sessionStorage.getItem("adminProductList"))
                        })
                        setLoading(false);
                    }
                }, [])
            }

            {
                useEffect(() => {
                    if (!loading){
                        sessionStorage.setItem("adminProductList", JSON.stringify(contextProductState));
                    }
                }, [contextProductState])
            }

            {props.children}
        </ProductContext.Provider>
    );
}

export {
    ProductContextProvider,
    ProductContext
};