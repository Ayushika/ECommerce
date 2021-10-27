/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from "../Constants/categoryConstant";

export const createCategoryAction =
  (name, idTokenResult) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_CATEGORY_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      const res = await axios.post("/api/category", { name }, config);
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: res.data,
      });

      toast.success(`${name} created successfully`);
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_FAIL,
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

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const res = await axios.get("/api/category/all");
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
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

export const deleteCategoryAction =
  (slug, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_CATEGORY_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      await axios.delete(`/api/category/${slug}`, config);
      dispatch({ type: DELETE_CATEGORY_SUCCESS, });
      toast.success(`Deleted Successfully`);
    } catch (error) {
      dispatch({
        type: DELETE_CATEGORY_FAIL,
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

export const updateCategoryAction =
  (name, slug, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      const res = await axios.put(
        `/api/category/${slug}`,
        { name },
        config,
      );

      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: res.data });
      toast.success("Updated Successfully");
    } catch (error) {
      dispatch({
        type: UPDATE_CATEGORY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCategoryAction = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const res = await axios.get(`/api/category/${slug}`);
    dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
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
