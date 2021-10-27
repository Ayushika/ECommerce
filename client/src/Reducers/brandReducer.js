/** @format */

import {
  CREATE_BRAND_FAIL,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_REQUEST,
  GET_BRANDS_FAIL,
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
  DELETE_BRAND_FAIL,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  GET_BRAND_RESET,
  UPDATE_BRAND_FAIL,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_RESET,
  UPDATE_BRAND_SUCCESS,
} from "../Constants/brandConstant";

export const createBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BRAND_REQUEST:
      return { loading: true };
    case CREATE_BRAND_SUCCESS:
      return {
        loading: false,
        brand: action.payload,
        createSuccess: true,
      };
    case CREATE_BRAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllBrandsReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case GET_BRANDS_REQUEST:
      return { loading: true, ...state };
    case GET_BRANDS_SUCCESS:
      return { loading: false, brands: action.payload };
    case GET_BRANDS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BRAND_REQUEST:
      return { loading: true };
    case DELETE_BRAND_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case DELETE_BRAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBrandReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case GET_BRAND_REQUEST:
      return { loading: true, ...state };
    case GET_BRAND_SUCCESS:
      return { loading: false, brand: action.payload };
    case GET_BRAND_FAIL:
      return { loading: false, error: action.payload };
    case GET_BRAND_RESET:
      return { brand: {} };
    default:
      return state;
  }
};

export const updateBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BRAND_REQUEST:
      return { loading: false };
    case UPDATE_BRAND_SUCCESS:
      return {
        loading: true,
        brand: action.payload,
        updateSuccess: true,
      };
    case UPDATE_BRAND_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_BRAND_RESET:
      return {};
    default:
      return state;
  }
};
