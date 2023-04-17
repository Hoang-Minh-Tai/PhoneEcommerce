import React, { useReducer } from "react";

import axiosClient from "./axios";
import currencyClient from "./apiCurrency";

// context
import userContext from "./context";

// reducer
import Reducer from "./reducer";

// type tags
import {
  GET_CURRENCY,
  GET_USER,
  GET_CATEGORIES,
  GET_PRODUCTS,
  POST_USER,
  POST_CATEGORY,
  POST_PRODUCTS,
  GET_CART,
  UPDATE_CART,
  DELETE_ITEM,
} from "./values";

const Context = (props) => {
  const initialState = {
    user: null,
    currency: null,
    products: [],
    categories: [],
    cart: [],
  };

  const userFromStorage = localStorage.getItem("user");
  if (userFromStorage) {
    initialState.user = JSON.parse(userFromStorage);
  }

  // Dispatch to execute actions
  const [state, dispatch] = useReducer(Reducer, initialState);

  // API Currency
  const getCurrency = async () => {
    const res = await currencyClient.get("");

    dispatch({
      type: GET_CURRENCY,
      payload: res.data,
    });
  };

  // POST Methods
  const addUser = async (user) => {
    try {
      const res = await axiosClient.post("/users/register", user);

      localStorage.setItem("user", JSON.stringify(res.data));

      dispatch({
        type: POST_USER,
        payload: res.data,
      });
    } catch (err) {
      if (err.response) {
        return err.response;
      } else {
        throw new Error("Failed to add user");
      }
    }
  };

  const addCategory = async (category) => {
    const res = await axiosClient.post("/categories/add", category);

    dispatch({
      type: POST_CATEGORY,
      payload: res.data,
    });
  };
  const addProduct = async (product) => {
    const res = await axiosClient.post("/products/add", product);

    dispatch({
      type: POST_PRODUCTS,
      payload: res.data,
    });
  };

  // POST Methods
  const getUser = async (user) => {
    try {
      const res = await axiosClient.post("/users/login", user);

      if (res.status == 200) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      dispatch({
        type: GET_USER,
        payload: res.data,
      });

      return res.data;
    } catch (error) {
      return 401;
    }
  };

  const getCategories = async () => {
    const res = await axiosClient.get("/categories/all");

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  };
  const getProducts = async () => {
    const res = await axiosClient.get("/products/all");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  };

  const getCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.get("/cart", {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: GET_CART,
      payload: res.data,
    });

    return res.data;
  };

  const clearUser = async () => {
    localStorage.clear();

    dispatch({
      type: POST_USER,
      payload: null,
    });
  };

  const updateCart = async (id, quantity) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.put(
      "/cart/update/" + id,
      { quantity },
      {
        headers: {
          Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
        },
      }
    );

    dispatch({
      type: UPDATE_CART,
      payload: res.data,
    });
  };

  const deleteCartItem = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.delete("/cart/delete/" + id, {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  };

  return (
    <userContext.Provider
      value={{
        user: state.user,
        cart: state.cart,
        currency: state.currency,
        categories: state.categories,
        products: state.products,
        addUser,
        addCategory,
        addProduct,
        getUser,
        getCart,
        clearUser,
        getCategories,
        getProducts,
        getCurrency,
        updateCart,
        deleteCartItem,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default Context;
