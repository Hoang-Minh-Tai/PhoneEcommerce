import {
    POST_CATEGORY,
    GET_CATEGORIES,
    GET_PRODUCTS,
    POST_USER,
    POST_PRODUCTS,
    GET_USER,
    GET_CURRENCY,
    GET_CART,
    UPDATE_CART
} from "./values";

export default (state, action) => {
    switch (action.type) {
        case GET_CURRENCY:
            return {
                ...state,
                currency: action.payload,
            };
        case POST_USER:
            return {
                ...state,
                user: action.payload,
            };
        case POST_CATEGORY:
            return {
                ...state,
                categories: action.payload,
            };
        case POST_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };

        case GET_CART:
            console.log(action.payload, "log payload");
            return {
                ...state,
                cart: action.payload,
            };

        case UPDATE_CART:
            return {
                ...state,
                cart: state.cart.map((item) => item.id === action.payload.id ? action.payload : item)
            }

        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        default:
            return state;
    }
};
