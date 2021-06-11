import React, {createContext, useEffect, useReducer, useState} from 'react';

const initContext = {
    componentIndex: 0,
    totalPage: undefined,
    currentPage: 1,
    displayComponent: []
}

const ProductContext = createContext(initContext);

const actions = {
    setComponentIndex: (state, componentIndex) => {
        return {
            ...state,
            componentIndex
        }
    },
    setTotalPage: (state, totalPage) => {
        return {
            ...state,
            totalPage
        }
    },
    setCurrentPage: (state, currentPage) => {
        return {
            ...state,
            currentPage
        }
    },
    setDisplayComponent: (state, displayComponent) => {
        return {
            ...state,
            displayComponent
        }
    }

}

const productReducer = (state, action) => {
    switch (action.type) {
        case 'set_componentIndex':
            state = actions.setComponentIndex(state, action.payload)
            return {...state}
        case 'set_totalPage':
            state = actions.setTotalPage(state, action.payload)
            return {...state}
        case 'set_displayComponent':
            state = actions.setDisplayComponent(state, action.payload)
            return {...state}
        case 'set_currentPage':
            state = actions.setCurrentPage(state, action.payload)
            return {...state}
        case 'reset_context':
            return {...action.payload}
        default:
            return {...state}
    }
}

const ProductContextProvider = props => {
    const [contextProductState, updateContextProductState] = useReducer(productReducer, initContext);
    const [loading, setLoading] = useState(false);

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
                    if (!loading) {
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