import axios from 'axios';
import React, {createContext, useEffect, useReducer} from 'react';
import server from '../../config.json';

const initState = {

    loading: true,
    shops: null,
    selectedShop: null,

}

const ShopsContext = createContext(initState);

const actions = {

    setLoading: (state, loading) => {
        return {
            ...state,
            loading
        }
    },
    setShops: (state, shops) => {
        return {
            ...state,
            shops
        }
    },
    setSeletedShop: (state, selectedShop) => {
        return {
            ...state,
            selectedShop
        }
    }

}

const shopReducer = (state, action) => {

    switch(action.type){
        case 'setLoading'  :       state = actions.setLoading(state,action.payload);
                                return {
                                    ...state
                                }
        case 'setShops' :       state = actions.setShops(state, action.payload);
                                return {
                                    ...state
                                }
        case 'setSeletedShop':  state = actions.setSeletedShop(state, action.payload);
                                return {
                                    ...state
                                }
        default         :       return {...state}
    }

}

const ShopsContextProvider = (props) => {

    const [shopsContext,updateShopsContext] = useReducer(shopReducer,initState);

    return (

        <ShopsContext.Provider value={{shopsContext,updateShopsContext}}>
            {
                useEffect( () => {
                    axios.get(server.uri + 'list_shop').then(
                        (response) => {
                            updateShopsContext({type: 'setShops', payload: response.data.message});
                            updateShopsContext({type: 'setLoading', payload: false});
                        }
                    ).catch( (error) => {
                        console.log(error);
                    })
                },[])
            }
            {props.children}
        </ShopsContext.Provider>

    );

}

export {
    ShopsContextProvider,
    ShopsContext
}

