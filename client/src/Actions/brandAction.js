/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_FAIL,
  CREATE_BRAND_SUCCESS,
  GET_BRANDS_FAIL,
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
  DELETE_BRAND_FAIL,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
} from "../Constants/brandConstant";

export const createBrandAction =
  (category, name, idTokenResult) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BRAND_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };
      const res = await axios.put(`/api/brand`, { name, category }, config);
      dispatch({ type: CREATE_BRAND_SUCCESS, payload: res.data });
      toast.success(`Brand ${name} created successfully`);
    } catch (error) {
      dispatch({
        type: CREATE_BRAND_FAIL,
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

export const getAllBrandsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BRANDS_REQUEST });
    const res = await axios.get("/api/brand/all");
    dispatch({ type: GET_BRANDS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_BRANDS_FAIL,
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

export const deleteBrandAction = (slug, idTokenResult) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BRAND_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: idTokenResult,
      },
    };
    await axios.delete(`/api/brand/${slug}`, config);
    dispatch({ type: DELETE_BRAND_SUCCESS });
    toast.success(`Brand ${slug} deleted successfully`);
  } catch (error) {
    dispatch({
      type: DELETE_BRAND_FAIL,
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

export const getBrandAction = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_BRAND_REQUEST });
    const res = await axios.get(`/api/brand/${slug}`);
    dispatch({ type: GET_BRAND_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_BRAND_FAIL,
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

export const updateBrandAction =
  (name, category, brandSlug, idTokenResult) => async (dispatch) => {
    try {
      const slug = brandSlug;
      dispatch({ type: UPDATE_BRAND_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: idTokenResult,
        },
      };

      const res = await axios.put(
        `/api/brand/${slug}`,
        { name, category },
        config,
      );
      dispatch({ type: UPDATE_BRAND_SUCCESS, payload: res.data });
      toast.success(`Brand ${name} updated successfully`);
    } catch (error) {
      dispatch({
        type: UPDATE_BRAND_FAIL,
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
