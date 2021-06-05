import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ProductContextProvider} from "./Component/productContext";
import "../src/css/dashboard.css"
import "../src/css/custom_css_dashboard.css"

ReactDOM.render(
    <ProductContextProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ProductContextProvider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
