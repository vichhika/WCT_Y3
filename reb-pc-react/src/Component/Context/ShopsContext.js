import axios from 'axios';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import server from '../../config.json';

const initState = {

    loading: true,
    shops: null,
    shopName: null,
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
    },
    setShopName: (state, shopName) => {
        return {
            ...state,
            shopName
        }
    }

}

const shopReducer = (state, action) => {

    switch (action.type) {
        case 'setLoading': state = actions.setLoading(state, action.payload);
            return {
                ...state
            }
        case 'setShops': state = actions.setShops(state, action.payload);
            return {
                ...state
            }
        case 'setSeletedShop': state = actions.setSeletedShop(state, action.payload);
            return {
                ...state
            }
        case 'setShopName': state = actions.setShopName(state, action.payload);
            return {
                ...state
            }
        case 'reset_context':
            return {
                ...action.payload
            }
        default: return { ...state }
    }

}

const ShopsContextProvider = (props) => {

    const [shopsContext, updateShopsContext] = useReducer(shopReducer, initState);
    const [loading, setloading] = useState(false);

    return (

        <ShopsContext.Provider value={{ shopsContext, updateShopsContext }}>
            {
                useEffect(() => {
                    setloading(true)
                    if (sessionStorage.getItem('shop') === null) {
                        axios.get(server.uri + 'list_shop').then(
                            (response) => {
                                updateShopsContext({ type: 'setShops', payload: response.data.message });
                                updateShopsContext({ type: 'setLoading', payload: false });
                            }
                        ).catch((error) => {
                            console.log(error);
                        })
                        setloading(false)
                    } else {
                        updateShopsContext({
                            type: 'reset_context',
                            payload: JSON.parse(sessionStorage.getItem("shop"))
                        })
                        setloading(false)
                    }
                }, [])

            }

            {
                useEffect(() => {
                    if (!loading) {
                        sessionStorage.setItem("shop", JSON.stringify(shopsContext));

                    }
                }, [shopsContext])

            }

            {props.children}
        </ShopsContext.Provider>

    );

}

export {
    ShopsContextProvider,
    ShopsContext
}