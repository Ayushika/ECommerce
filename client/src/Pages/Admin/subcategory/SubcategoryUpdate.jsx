/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import CategoryForm from "../../../Components/forms/CategoryForm";
import {
  UPDATE_SUBCATEGORY_RESET,
  GET_SUBCATEGORY_RESET,
} from "../../../Constants/subCategoryConstant";
import {
  updateSubCategoryAction,
  getSubCategoryAction,
} from "../../../Actions/subCategoryAction";

const SubcategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const subcategorySlug = match.params.slug;
  const slug = subcategorySlug;

  const dispatch = useDispatch();

  const { getAllCategories, getSubCategory, userLogin, updateSubCategory } =
    useSelector((state) => state);

  const { userInfo } = userLogin;
  const { categories } = getAllCategories;
  const { subCategory } = getSubCategory;
  const { updateSuccess, loading } = updateSubCategory;

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_SUBCATEGORY_RESET });
      dispatch({ type: GET_SUBCATEGORY_RESET });
      history.push("/admin/subcategory");
    } else if (
      !subCategory.name ||
      !subCategory.category ||
      subCategory.slug !== subcategorySlug
    ) {
      dispatch(getSubCategoryAction(slug));
    } else {
      setName(subCategory.name);
      setCategory(subCategory.category);
    }
  }, [updateSuccess, subCategory, dispatch, history, slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSubCategoryAction(name, category, slug, userInfo.token));
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
            <h4 className='text-primary'>Update category</h4>
          )}
          <div className='form-group'>
            <label> Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                    selected={c._id === subCategory.category}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
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

export default SubcategoryUpdate;
