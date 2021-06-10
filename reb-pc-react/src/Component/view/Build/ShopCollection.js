import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import {buildContext} from './../../Context/BuildContext'
import {ShopsContext} from './../../Context/ShopsContext'

const ShopCollection = (props) => {

    const {shopsContext,updateShopsContext} = useContext(ShopsContext);
    
    const handleSelectShop = (shop) => {

        updateShopsContext({type: 'setSeletedShop', payload: shop});
    
    }

    let view;
    if(shopsContext.loading){
        view = <h6 className="w-100 text-center">Loading...</h6>;
    }else {
        view = <div class="list-group">
            {shopsContext.shops.map(shop => {
                return <a href="#" key={shop.adminshopID} id={shop.adminshopID} onClick={() => handleSelectShop(shop.shop_name)} class="list-group-item list-group-item-action">{shop.shop_name}</a>
            })}
        </div>;
        console.log(shopsContext);
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{width: '100%', height: '100%'}}>
            <Box
                boxShadow={6}
                bgcolor="background.paper"
                m={1}
                p={0}
            >
                <div class="card" style={{width: '45rem'}}>
                    <div class="card-body">
                        <h5 class="card-title text-secondary">Choose Reference Shop</h5>
                        
                        {view}

                    </div>
                </div>

            </Box>
        </div>
    );

}

export default ShopCollection;