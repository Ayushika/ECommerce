/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
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
