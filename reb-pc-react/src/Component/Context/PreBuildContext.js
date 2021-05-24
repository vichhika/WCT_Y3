import React, { createContext, useEffect, useState } from 'react';

export const PreBuildContext = createContext();

function PreBuildContextProvider(props){

    const initState = {
        loading: true,
        components: null,
        sortAs: 'default',
        filterBy: [],
        filterComponents: null,
        currentPage: 1, 
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
        .then(data => setState({loading:false, components: data, sortAs: 'default', filterBy: [], filterComponents: data, currentPage: 1}));
    },[]);


    useEffect(() => {
        if(!state.loading){
            let cpu = state.components.cpu;
            // perform filter :
            if(state.filterBy.length == 0){
                
                setState({...state,filterComponents: {cpu}});

            }else if (state.filterBy.length > 0){

                cpu = cpu.filter(item => state.filterBy.includes(item.model));
                setState({...state,filterComponents: {cpu}, currentPage: 1});

            }
            
            // perform sort
            if(state.sortAs == 'ASC'){
                cpu.sort((a,b) => {
                    if (parseFloat(a.price.replace('$','')) < parseFloat(b.price.replace('$',''))){ return -1; }
                    if(parseFloat(a.price.replace('$','')) > parseFloat(b.price.replace('$',''))){ return 1; }
                    return 0;
                });
                setState({...state,filterComponents: {cpu}, currentPage: 1});
            }else if (state.sortAs == 'DESC'){
                cpu.sort((a,b) => {
                    if (parseFloat(b.price.replace('$','')) < parseFloat(a.price.replace('$',''))){ return -1; }
                    if(parseFloat(b.price.replace('$','')) > parseFloat(a.price.replace('$',''))){ return 1; }
                    return 0;
                });
                setState({...state, filterComponents: {cpu}, currentPage: 1});
            }
        }
    },[state.sortAs, state.filterBy.length]);

    // setter function for provider to use
    const setSortAs = (type) => {setState({...state,sortAs: type})};

    const setFilterBy = (type) => {setState({...state,filterBy: type})};

    const setCurrentPage = (page) => {setState({...state,currentPage: page})}



    return (
        <PreBuildContext.Provider value={{...state, setSortAs: setSortAs, setFilterBy: setFilterBy, setCurrentPage: setCurrentPage}}>
            {props.children}
        </PreBuildContext.Provider>
    );

}

export default PreBuildContextProvider;