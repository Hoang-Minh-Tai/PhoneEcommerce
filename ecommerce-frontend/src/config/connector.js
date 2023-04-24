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
  GET_ORDERS,
  POST_USER,
  POST_CATEGORY,
  POST_PRODUCTS,
  POST_ORDER,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  UPDATE_CATEGORY,
  UPDATE_ORDER,
  UPDATE_PRODUCT,
  DELETE_ITEM,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  POST_VOUCHER,
  GET_VOUCHERS,
  UPDATE_VOUCHER,
  DELETE_VOUCHER,
  GET_ONE_VOUCHER,
} from "./values";

const Context = (props) => {
  const initialState = {
    user: null,
    currency: null,
    products: [],
    categories: [],
    cart: [],
    orders: [],
    vouchers: [],
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
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axiosClient.post("/categories/add", category, {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: POST_CATEGORY,
      payload: res.data,
    });
  };

  const addProduct = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await axiosClient.post("/products/add", product, {
        headers: {
          Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
        },
      });

      dispatch({
        type: POST_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
    }
  };

  const addOrder = async (paymentType, voucher) => {
    const payload = { paymentType };
    if (voucher) payload.voucherCode = voucher.code;
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axiosClient.post("/orders/add", payload, {
        headers: {
          Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
        },
      });
      dispatch({
        type: POST_ORDER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addVoucher = async (voucher) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axiosClient.post("/vouchers/add", voucher, {
        headers: {
          Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
        },
      });
      dispatch({
        type: POST_VOUCHER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getOneVoucher = async (code) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axiosClient.get("/vouchers/get/" + code, {
        headers: {
          Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
        },
      });
      dispatch({
        type: GET_ONE_VOUCHER,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addToCart = async (productId, quantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let res;
    try {
      res = await axiosClient.post(
          "/cart/add",
          {productId, quantity},
          {
            headers: {
              Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
            },
          }
      );

      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      });
      return 201
    }
    catch (error) {
      console.log(error.response.data);
      return 400
    }
  };

  // POST Methods
  const getUser = async (user) => {
    try {
      const res = await axiosClient.post("/users/login", user);

      if (res.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, role: res.data.role })
        );
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

  const getProducts = async (category, model) => {
    const params = {
      category,
      model,
    };

    const res = await axiosClient.get("/products/all", { params });

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

  const getOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.get("/orders/all", {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });

    return res.data;
  };

  const getVouchers = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.get("/vouchers/all", {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: GET_VOUCHERS,
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

  const updateCategory = async (id, category) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("category to update", category);

    try {
      const res = await axiosClient.put(
        "/categories/update/" + id,
        { ...category },
        {
          headers: {
            Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
          },
        }
      );
      dispatch({
        type: UPDATE_CATEGORY,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateProduct = async (id, product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.put("/products/update/" + id, product, {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
  };

  const updateVoucher = async (id, voucher) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.put("/vouchers/update/" + id, voucher, {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: UPDATE_VOUCHER,
      payload: res.data,
    });
  };

  const updateOrder = async (id, status) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.put(
      "/orders/update/" + id,
      { status },
      {
        headers: {
          Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
        },
      }
    );

    dispatch({
      type: UPDATE_ORDER,
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

  const deleteCategory = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.delete("/categories/delete/" + id, {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
  };

  const deleteProduct = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.delete("/products/delete/" + id, {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: DELETE_PRODUCT,
      payload: res.data,
    });
  };
  const deleteVoucher = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosClient.delete("/vouchers/delete/" + id, {
      headers: {
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
      },
    });

    dispatch({
      type: DELETE_VOUCHER,
      payload: res.data,
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
        orders: state.orders,
        vouchers: state.vouchers,
        addUser,
        addToCart,
        addCategory,
        addProduct,
        addOrder,
        getUser,
        getCart,
        addVoucher,
        getOneVoucher,
        getVouchers,
        updateVoucher,
        deleteVoucher,
        clearUser,
        getCategories,
        getProducts,
        getCurrency,
        getOrders,
        updateCart,
        updateCategory,
        deleteCartItem,
        updateProduct,
        deleteCategory,
        deleteProduct,
        updateOrder,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default Context;
