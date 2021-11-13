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
import CategoryForm from "../../../Components/forms/CategoryForm";
import LocalSearch from "../../../Components/forms/LocalSearch";

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
  const { loading, createSuccess } = createcategory;
  const { categories } = getAllCategories;
  const { deleteSuccess } = deleteCategory;
  const { updateSuccess } = updateCategory;

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [createSuccess, deleteSuccess, updateSuccess, dispatch]);

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

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col-md-8'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <>
              <h5 className=' mt-1 text-center display-8'>Create Category</h5>
              <div className='underline'></div>
            </>
          )}
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
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
