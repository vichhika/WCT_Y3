import axios from 'axios';
import React, {createContext, useState, useEffect, useReducer} from 'react';

const initState = {
    loading: true,
    products: null,
    sortAs: 'default',
    productsFilter: null,
    filterBy: [],
    page: 1,
}

const ProductsContext = createContext(initState);

const actions = {

    setLoading: (state, loading) => {
        return {
            ...state,
            loading
        }
    },
    setProducts: (state, products) => {

        let productsFilter = products;

        return {
            ...state,
            products,
            productsFilter
        }

    },
    setSortAs: (state, sortAs) => {

        // check if state.productsFilter is null
        let productsFilter = state.productsFilter ?? state.products; 
        
        // reset page
        let page = 1;

        // perform sort
        if(sortAs == 'ASC'){
            productsFilter.sort((a,b) => {
                if (parseFloat(a.price.replace('$','')) < parseFloat(b.price.replace('$',''))){ return -1; }
                if(parseFloat(a.price.replace('$','')) > parseFloat(b.price.replace('$',''))){ return 1; }
                return 0;
            });
        }else if (sortAs == 'DESC'){
            productsFilter.sort((a,b) => {
                if (parseFloat(b.price.replace('$','')) < parseFloat(a.price.replace('$',''))){ return -1; }
                if(parseFloat(b.price.replace('$','')) > parseFloat(a.price.replace('$',''))){ return 1; }
                return 0;
            });
        }else if (sortAs == 'default'){
            productsFilter = state.products;
        }

        return {
            ...state,
            sortAs,
            productsFilter,
            page
        }
    },
    setFilterBy: (state, filterBy) => {

        let productsFilter = state.products;
        // reset sort back to default
        let sortAs = 'default';
        let page = 1;
        if(filterBy.length > 0){
            productsFilter = productsFilter.filter(product => filterBy.includes(product.model));
        }
        return {
            ...state,
            sortAs,
            filterBy,
            productsFilter,
            page
        };

    },
    setPage: (state, page) => {
        return {
            ...state,
            page
        }
    }

}

const ProductsReducer = (state, action) => {

    switch(action.type) {

        case 'setLoading':    state = actions.setLoading(state,action.payload);
                                return {
                                    ...state
                                }
        case 'setProducts':     state = actions.setProducts(state,action.payload);
                                return {
                                    ...state
                                }
        case 'setSortAs':       state = actions.setSortAs(state,action.payload);
                                return {
                                    ...state
                                }
        case 'setFilterBy':     state = actions.setFilterBy(state,action.payload);
                                return{
                                    ...state
                                }     
        case 'setPage' :        state = actions.setPage(state,action.payload);                  

        default: return {...state}

    }

}

const ProductsContextProvider = (props) => {

    const [productsContextState, updateProductsContext] = useReducer(ProductsReducer,initState);
    
    return (

        <ProductsContext.Provider value={{productsContextState, updateProductsContext}}>

            {
                useEffect(() => {
                    axios.get(`https://api-303.herokuapp.com/ChantraComputer`).then(
                        response => {
                            updateProductsContext({type: 'setProducts', payload: response.data.cpu});
                            updateProductsContext({type: 'setLoading', payload: false});
                            // updateProductsContext({type: 'setSortAs', payload: 'DESC'});
                            // updateProductsContext({type: 'setFilterBy', payload: ['Ryzen 5', 'Intel 5th']});
                            // updateProductsContext({type: 'setSortAs', payload: 'ASC'});
                            // updateProductsContext({type: 'setFilterBy', payload: ['Intel 5th']});   
                            // updateProductsContext({type: 'setSortAs', payload: 'ASC'});
                        }
                    )
                },[])
            }

            {props.children}

        </ProductsContext.Provider>

    );

}

export {
    ProductsContext,
}

export default ProductsContextProvider;