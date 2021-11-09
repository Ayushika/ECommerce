/** @format */

import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  STAR_RATING_PRODUCT_FAIL,
  STAR_RATING_PRODUCT_REQUEST,
  STAR_RATING_PRODUCT_SUCCESS,
  GET_PRODUCTS_BY_FILTER_SUCCESS,
  GET_PRODUCTS_BY_FILTER_FAIL,
  GET_PRODUCTS_BY_FILTER_REQUEST,
} from "../Constants/productConstant";

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        createSuccess: true,
      };
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, ...state };
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRODUCT_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        deleteSuccess: true,
      };
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload, updateSuccess: true };
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const starRatingProductReducer = (state = {}, action) => {
  switch (action.type) {
    case STAR_RATING_PRODUCT_REQUEST:
      return { loading: true };
    case STAR_RATING_PRODUCT_SUCCESS:
      return {
        loading: false,
        rating: action.payload,
      };
    case STAR_RATING_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProductsByFilterReducer = (
  state = { filterProducts: [] },
  action,
) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_FILTER_REQUEST:
      return { loadingProduct: true, ...state };
    case GET_PRODUCTS_BY_FILTER_SUCCESS:
      return {
        loadingProduct: false,
        filterProducts: action.payload,
      };
    case GET_PRODUCTS_BY_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
