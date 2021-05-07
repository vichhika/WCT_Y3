import React, { createContext, useEffect, useState } from 'react';

export const PreBuildContext = createContext();

function PreBuildContextProvider(props){

    const initState = {
        loading: true,
        components: null,
        sortAs: 'default',
        filterBy: [],
        filterComponents: null, 
    }

    const [state,setState] = useState(initState);

    useEffect(() =>{
        fetch(`https://api-303.herokuapp.com/ChantraComputer`)
        .then(
            (res) => {
                if(res.ok){
                    return res.json();
                }else{
                    console.log(res);
                }
            }
        )
        .then(data => setState({loading:false, components: data, sortAs: 'default', filterBy: [], filterComponents: data}));
    },[]);


    useEffect(() => {
        if(!state.loading){
            let cpu = state.components.cpu;
            // perform filter :
            if(state.filterBy.length == 0){
                
                setState({...state,filterComponents: {cpu}});

            }else if (state.filterBy.length > 0){

                cpu = cpu.filter(item => state.filterBy.includes(item.model));
                setState({...state,filterComponents: {cpu}});

            }
            
            // perform sort
            if(state.sortAs == 'ASC'){
                cpu.sort((a,b) => {
                    if (parseFloat(a.price.replace('$','')) < parseFloat(b.price.replace('$',''))){ return -1; }
                    if(parseFloat(a.price.replace('$','')) > parseFloat(b.price.replace('$',''))){ return 1; }
                    return 0;
                });
                setState({...state,filterComponents: {cpu}});
            }else if (state.sortAs == 'DESC'){
                cpu.sort((a,b) => {
                    if (parseFloat(b.price.replace('$','')) < parseFloat(a.price.replace('$',''))){ return -1; }
                    if(parseFloat(b.price.replace('$','')) > parseFloat(a.price.replace('$',''))){ return 1; }
                    return 0;
                });
                setState({...state, filterComponents: {cpu}});
            }

        }
    },[state.sortAs, state.filterBy.length]);

    // setter function for provider to use
    const setSortAs = (type) => {setState({...state,sortAs: type})};

    const setFilterBy = (type) => {setState({...state,filterBy: type})};




    return (
        <PreBuildContext.Provider value={{...state, setSortAs: setSortAs, setFilterBy: setFilterBy}}>
            {props.children}
        </PreBuildContext.Provider>
    );

}

export default PreBuildContextProvider;