import {
  POST_CATEGORY,
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_ORDERS,
  POST_USER,
  POST_PRODUCTS,
  POST_ORDER,
  GET_USER,
  GET_CURRENCY,
  GET_CART,
  UPDATE_CART,
  DELETE_ITEM,
  UPDATE_ORDER,
  ADD_TO_CART,
} from "./values";

export default (state, action) => {
  console.log(state, action);
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
    case POST_ORDER:
      return {
        ...state,
        orders: state.orders.push(action.payload),
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
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_CART:
      state.cart.push(action.payload);
      return {
        ...state,
      };

    case UPDATE_CART:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case DELETE_ITEM:
      const filteredArray = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: filteredArray,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};
