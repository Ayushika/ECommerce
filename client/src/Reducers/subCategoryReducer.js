/** @format */

import {
  CREATE_SUBCATEGORY_FAIL,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_REQUEST,
  GET_SUBCATEGORIES_FAIL,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_SUCCESS,
  DELETE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORY_FAIL,
  GET_SUBCATEGORY_REQUEST,
  GET_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_FAIL,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_SUCCESS,
} from "../Constants/subCategoryConstant";

export const createSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBCATEGORY_REQUEST:
      return { loading: true };
    case CREATE_SUBCATEGORY_SUCCESS:
      return {
        loading: false,
        subCategory: action.payload,
        createSuccess: true,
      };
    case CREATE_SUBCATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllSubCategoriesReducer = (
  state = { subCategories: [] },
  action,
) => {
  switch (action.type) {
    case GET_SUBCATEGORIES_REQUEST:
      return { loading: true, ...state };
    case GET_SUBCATEGORIES_SUCCESS:
      return { loading: false, subCategories: action.payload };
    case GET_SUBCATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUBCATEGORY_REQUEST:
      return { loading: true };
    case DELETE_SUBCATEGORY_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case DELETE_SUBCATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSubCategoryReducer = (state = { subCategory: {} }, action) => {
  switch (action.type) {
    case GET_SUBCATEGORY_REQUEST:
      return { loading: true, ...state };
    case GET_SUBCATEGORY_SUCCESS:
      return { loading: false, subCategory: action.payload };
    case GET_SUBCATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case GET_SUBCATEGORY_RESET:
      return { subCategory: {} };
    default:
      return state;
  }
};

export const updateSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SUBCATEGORY_REQUEST:
      return { loading: false };
    case UPDATE_SUBCATEGORY_SUCCESS:
      return {
        loading: true,
        subCategory: action.payload,
        updateSuccess: true,
      };
    case UPDATE_SUBCATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SUBCATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
