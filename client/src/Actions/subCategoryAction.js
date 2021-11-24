/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_FAIL,
  CREATE_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORIES_FAIL,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_SUCCESS,
  DELETE_SUBCATEGORY_FAIL,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORY_FAIL,
  GET_SUBCATEGORY_REQUEST,
  GET_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAIL,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_SUCCESS,
} from "../Constants/subCategoryConstant";

export const createSubCategoryAction =
  (category, name, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SUBCATEGORY_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };
      const res = await axios.put(
        `/api/subcategory`,
        { name, category },
        config,
      );
      dispatch({ type: CREATE_SUBCATEGORY_SUCCESS, payload: res.data });
      toast.success(`SubCategory ${name} created successfully`);
    } catch (error) {
      dispatch({
        type: CREATE_SUBCATEGORY_FAIL,
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

export const getAllSubCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBCATEGORIES_REQUEST });
    const res = await axios.get("/api/subcategory/all");
    dispatch({ type: GET_SUBCATEGORIES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORIES_FAIL,
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

export const deleteSubCategoryAction =
  (slug, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_SUBCATEGORY_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };
      await axios.delete(`/api/subcategory/${slug}`, config);
      dispatch({ type: DELETE_SUBCATEGORY_SUCCESS });
      toast.success(`SubCategory ${slug} deleted successfully`);
    } catch (error) {
      dispatch({
        type: DELETE_SUBCATEGORY_FAIL,
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

export const getSubCategoryAction = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBCATEGORY_REQUEST });
    const res = await axios.get(`/api/subcategory/${slug}`);
    dispatch({ type: GET_SUBCATEGORY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORY_FAIL,
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

export const updateSubCategoryAction =
  (name, category, subCategorySlug, idTokenResult) => async (dispatch) => {
    try {
      const slug = subCategorySlug;
      dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      const res = await axios.put(
        `/api/subcategory/${slug}`,
        { name, category },
        config,
      );
      dispatch({ type: UPDATE_SUBCATEGORY_SUCCESS, payload: res.data });
      toast.success(`SubCategory ${name} updated successfully`);
    } catch (error) {
      dispatch({
        type: UPDATE_SUBCATEGORY_FAIL,
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
