
import { GET_PRODUCTS, PRODUCTS_ERROR, GET_PRODUCTS_LIST, PAYMENT_CHECKOUT } from "../constatnts/products.constants";

const initialState = {
    products: [],
    productsList: [],
    isLoading: false,
    message: 'test',
    errors: {}
};
const products = (state = initialState, action) => {
    const { type, payload } = action;
    // console.log('reudcer', state);
    switch (type) {

        case GET_PRODUCTS:     
            return {
                ...state,
                products: payload,
                isLoading: false,
                errors: {}
            };
        case GET_PRODUCTS_LIST:
            // console.log('payload', payload);            
            return {
                ...state,
                productsList: payload,
                isLoading: false,
                errors: {}
            };
        case PAYMENT_CHECKOUT:
            console.log('payload', payload);            
            return {
                message: payload,
                errors: {}
            };
        case PRODUCTS_ERROR:
            return {
                ...state,
                errors: payload
            };
        default:
            return state
    }
}


export default products;