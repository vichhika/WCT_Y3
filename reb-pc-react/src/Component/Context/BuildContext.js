import React, { createContext, useReducer } from 'react'

const initState = {
    component: 0
}

const buildContext = createContext(initState);

const actions = {
    setStep: (state,component) => {
        return {
            ...state,
            component 
        }
    }
}

const buildReucer = (state,action) => {
    switch(action.type){
        case 'set_step':
            state = actions.setStep(state,action.payload)
            return {...state}
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
