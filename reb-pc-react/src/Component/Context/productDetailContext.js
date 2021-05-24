import React, { createContext, useState } from 'react';

export const ProductDetailContext = createContext();

const ProductDetailContextProvider = (props) => {

    const [selectedDetailProduct, selectDetailProduct] = useState(null);

    return(
        <ProductDetailContext.Provider value = {{selectedDetailProduct: selectedDetailProduct, 
                                                selectDetailProduct: selectDetailProduct}}>
            {props.children}
        </ProductDetailContext.Provider>
    );

}

export default ProductDetailContextProvider;