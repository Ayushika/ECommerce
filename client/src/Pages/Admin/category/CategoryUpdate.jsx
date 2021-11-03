/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_CATEGORY_RESET,
  GET_CATEGORY_RESET,
} from "../../../Constants/categoryConstant";
import {
  updateCategoryAction,
  getCategoryAction,
} from "../../../Actions/categoryAction";
import CategoryForm from "../../../Components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const dispatch = useDispatch();

  const categorySlug = match.params.slug;
  const [name, setName] = useState("");

  const { userLogin, updateCategory, getCategory } = useSelector(
    (state) => state,
  );
  const { userInfo } = userLogin;
  const { loading, updateSuccess } = updateCategory;
  const { category } = getCategory;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_CATEGORY_RESET });
      dispatch({ type: GET_CATEGORY_RESET });
      history.push("/admin/category");
    } else if (!category.name || category.slug !== categorySlug) {
      dispatch(getCategoryAction(categorySlug));
    } else {
      setName(category.name);
    }
  }, [updateSuccess, category, dispatch, history, categorySlug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAction(name, categorySlug, userInfo.token));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col-md-8'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4 className='text-primary'>Update Category</h4>
          )}
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
