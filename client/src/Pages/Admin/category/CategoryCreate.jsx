/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  createCategoryAction,
  deleteCategoryAction,
  getAllCategoriesAction,
} from "../../../Actions/categoryAction";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const {
    userLogin,
    createcategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
  } = useSelector((state) => state);

  const { userInfo } = userLogin;
  const { loading, success } = createcategory;
  const { categories } = getAllCategories;
  const { deleted } = deleteCategory;
  const { updateSuccess } = updateCategory;

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [success, deleted, updateSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction(name, userInfo.token));
    setName("");
  };

  const removeCategory = (slug) => {
    if (window.confirm("Delete?")) {
      dispatch(deleteCategoryAction(slug, userInfo.token));
    }
  };
  const categoryForm = () => {
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
          <button type='submit' className='btn btn-raised my-3'>
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
            <h4>Create Category</h4>
          )}
          {categoryForm()}
          <input
            type='search'
            placeholder='Search Category'
            className='form-control'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <hr />
          {categories
            .filter((c) => c.name.toLowerCase().includes(keyword))
            .map((c) => (
              <div className='alert alert-secondary' key={c._id}>
                {c.name}
                <span
                  className='btn btn-sm float-right'
                  onClick={() => removeCategory(c.slug)}>
                  <DeleteOutlined className='text-danger' />
                </span>
                <Link to={`/admin/category/${c.slug}`}>
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

export default CategoryCreate;
