/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CATEGORY_RESET, GET_CATEGORY_RESET } from "../../../Constants/categoryConstant";
import {
  updateCategoryAction,
  getCategoryAction,
} from "../../../Actions/categoryAction";

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

  const categoryUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter Category Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <button type='submit' className='btn btn-raised btn-primary my-3'>
            Update
          </button>
        </div>
      </form>
    );
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
          {categoryUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
