/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  createSubCategoryAction,
  getAllSubCategoriesAction,
  deleteSubCategoryAction,
} from "../../../Actions/subCategoryAction";

const SubcategoryCreate = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const {
    getAllCategories,
    getAllSubCategories,
    userLogin,
    createSubCategory,
    deleteSubCategory,
    updateSubCategory,
  } = useSelector((state) => state);

  const { userInfo } = userLogin;
  const { categories } = getAllCategories;
  const { subCategories } = getAllSubCategories;
  const { loading, createSuccess } = createSubCategory;
  const { deleteSuccess } = deleteSubCategory;
  const { updateSuccess } = updateSubCategory;

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, []);

  useEffect(() => {
    dispatch(getAllSubCategoriesAction());
  }, [updateSuccess, createSuccess, deleteSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubCategoryAction(category, name, userInfo.token));
    setName("");
  };

  const removeSubcategory = (slug) => {
    if (window.confirm("Delete?")) {
      dispatch(deleteSubCategoryAction(slug, userInfo.token));
    }
  };

  const subcategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter Subcategory Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <button type='submit' className='btn btn-raised btn-primary my-3'>
            Create
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
            <h4 className='text-primary'>Create Subcategory</h4>
          )}
          <div className='form-group'>
            <label> Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}>
              <option>Please select category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          {subcategoryForm()}
          <input
            type='search'
            placeholder='Search Subcategory'
            className='form-control'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
          <hr />
          {subCategories
            .filter((c) => c.name.toLowerCase().includes(keyword))
            .map((c) => (
              <div className='alert alert-secondary' key={c._id}>
                {c.name}
                <span
                  className='btn btn-sm float-right'
                  onClick={() => removeSubcategory(c.slug)}>
                  <DeleteOutlined className='text-danger' />
                </span>
                <Link to={`/admin/subcategory/${c.slug}`}>
                  <span className='btn btn-sm float-right'>
                    <EditOutlined className='text-primary' />
                  </span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCreate;