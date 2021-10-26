/** @format */

import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_REQUEST,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from "../Constants/categoryConstant";

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case GET_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true };
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, deleted: true, deletedCategory: action.payload };
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload, updateSuccess: true };
    case UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const getCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { loading: true, ...state };
    case GET_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload, getSuccess: true };
    case GET_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
