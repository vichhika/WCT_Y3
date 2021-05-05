import React, { createContext, useReducer } from 'react'

const initState = {
    component: 0,
    listSize: 5,
    componentPayload: [],
    listsNumber: 1,
    currentList: 1
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
    setListsNumber: (state,listsNumber) => {
        return {
            ...state,
            listsNumber 
        }
    },
    setCurrentList: (state,currentList) => {
        return {
            ...state,
            currentList 
        }
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
        case 'set_listsNumber':
            state = actions.setListsNumber(state,action.payload)
            return {...state}
        case 'set_currentList':
            state = actions.setCurrentList(state,action.payload)
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
