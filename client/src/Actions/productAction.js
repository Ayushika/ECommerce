/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  STAR_RATING_PRODUCT_FAIL,
  STAR_RATING_PRODUCT_REQUEST,
  STAR_RATING_PRODUCT_SUCCESS,
} from "../Constants/productConstant";

export const createProductAction =
  (product, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      const res = await axios.put(
        "http://localhost:5000/api/product",
        product,
        config,
      );
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  };

export const getAllProductsAction = (count) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const res = await axios.get(
      `http://localhost:5000/api/product/all/${count}`,
    );
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response });
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    );
  }
};

export const deleteProductAction =
  (slug, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      await axios.delete(`http://localhost:5000/api/product/${slug}`, config);
      dispatch({ type: DELETE_PRODUCT_SUCCESS });
      toast.success(`Deleted Successfully`);
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  };

export const getProductAction = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });

    const res = await axios.get(`http://localhost:5000/api/product/${slug}`);
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    );
  }
};

export const updateProductAction =
  (product, slug, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      const res = await axios.put(`/api/product/${slug}`, product, config);

      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data });
      toast.success("Updated Successfully");
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      );
    }
  };

export const starRatingProductAction =
  (star, slug, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: STAR_RATING_PRODUCT_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      const res = await axios.put(
        `http://localhost:5000/api/product/star/${slug}`,
        { star },
        config,
      );
      dispatch({ type: STAR_RATING_PRODUCT_SUCCESS, payload: res.data });
       toast.success("Thanks for your review");
    } catch (error) {
      dispatch({
        type: STAR_RATING_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
