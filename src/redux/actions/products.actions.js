import { GET_PRODUCTS, PRODUCTS_ERROR, GET_PRODUCTS_LIST, PAYMENT_CHECKOUT } from "../constatnts/products.constants";
import axios from 'axios';

export const getProducts = () => async dispatch => {
    try {
        const res = await axios.get('http://testdns.netcoo.it/kiosk/products/')
    

        console.log('api data',res.data);
        dispatch({ type: GET_PRODUCTS, payload: res.data })

    } catch (error) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: error
        })
    }
}

export const getProductList = (prod_list) => async dispatch => {
    // console.log('action', prod_list);
    try {
        const res = await prod_list
        dispatch({ type: GET_PRODUCTS_LIST, payload: res })

    } catch (error) {
        // console.log('data',error);
        dispatch({
            type: PRODUCTS_ERROR,
            payload: error
        })
    }
}

export const paymentCheckout = (data) => async dispatch => {
    try {
        // const result = JSON.stringify(data);
        console.log('data', data);
        const res = await axios.post('http://testdns.netcoo.it/kiosk/submit/', data)

        dispatch({ type: PAYMENT_CHECKOUT, payload: res.data })

    } catch (error) {
        // console.log('data',error);
        dispatch({
            type: PRODUCTS_ERROR,
            payload: error
        })
    }
}