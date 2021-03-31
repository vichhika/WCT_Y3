import React, { createContext, useReducer } from 'react'

const initState = {
    component: 0,
    listSize: 5
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
