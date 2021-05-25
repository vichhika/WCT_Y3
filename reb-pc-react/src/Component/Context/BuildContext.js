import React, { createContext, useReducer } from 'react'
import {act} from "@testing-library/react";

const initState = {
    component: 0,
    listSize: 5,
    currentList: 1,
    shopPayload: null,
    componentPayload: [],
    isBuildDone: false,
    selectedComponent: [null,null,null,null,null,null,null,null]
}

const buildContext = createContext(initState);

const actions = {
    setStep: (state,component) => {
        return {
            ...state,
            component 
        }
    },
    setlistSize: (state,listSize) => {
        return {
            ...state,
            listSize
        }
    },
    setComponentPayload: (state,componentPayload) => {
        return {
            ...state,
            componentPayload 
        }
    },
    setCurrentList: (state,currentList) => {
        return {
            ...state,
            currentList 
        }
    },
    setShopPayload: (state,shopPayload) => {
        return {
            ...state,
            shopPayload
        }
    },
    setSelectedComponent: (state,selectedComponent) => {
        return {
            ...state,
            selectedComponent
        }
    },
    setisBuildDone: (state,isBuildDone) => {
        return {
            ...state,
            isBuildDone
        }
    },
    resetContext: (state,newContext) => {
        return {...newContext}
    }
}

const buildReucer = (state,action) => {
    switch(action.type){
        case 'set_step':
            state = actions.setStep(state,action.payload)
            return {...state}
        case 'set_listSize':
            state = actions.setlistSize(state,action.payload)
            return {...state}
        case 'set_ComponentPayload':
            state = actions.setComponentPayload(state,action.payload)
            return {...state}
        case 'set_currentList':
            state = actions.setCurrentList(state,action.payload)
            return {...state}
        case 'set_shopPayload':
            state = actions.setShopPayload(state,action.payload)
            return {...state}
        case 'set_SelectedComponent':
            state = actions.setSelectedComponent(state,action.payload)
            return {...state}
        case 'set_setIsBuildDone':
            state = actions.setisBuildDone(state,action.payload)
            return {...state}
        case 'rest_context':
            state = actions.resetContext(state,action.payload)
            return {...state}
        default:
    }
}

const BuildContextProvider = prop => {
    const [contextState,updatContext] = useReducer(buildReucer,initState)
    return (
        <buildContext.Provider value = {{contextState,updatContext}}>
            {prop.children}
        </buildContext.Provider>
    )
}

export {
    BuildContextProvider,
    buildContext
}
