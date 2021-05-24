import React, {useContext,useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {PaginateContext} from './../../Context/PaginateContext';

function Paginations(props){

    const {setCurrentPage} = useContext(PaginateContext);

    const handlePageChange = (event,page) =>{
        setCurrentPage(page);
    }

    return(
        <div className="d-flex justify-content-center mb-5">
            <Pagination count={props.pageNum} shape="rounded" onChange={handlePageChange} />
        </div>
    );

}

export default Paginations;

// const MyPagination = props => {

//     const {itemsCount, pageSize} = props;

//     return (
//         <div className="d-flex justify-content-center mb-5">
//             <Pagination count={itemsCount} shape="rounded" onChange={handlePageChange} />
//         </div>
//     );


// }