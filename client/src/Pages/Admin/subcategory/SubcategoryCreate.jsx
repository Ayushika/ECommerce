/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../Components/forms/CategoryForm";
import { Link } from "react-router-dom";
import {
  createSubCategoryAction,
  getAllSubCategoriesAction,
  deleteSubCategoryAction,
} from "../../../Actions/subCategoryAction";
import LocalSearch from "../../../Components/forms/LocalSearch";

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
  }, [dispatch]);

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
              <h5 className=' mt-1 text-center display-8'>Create Subcategory</h5>
              <div className='underline'></div>
            </>
          )}
          <div className='form-group mt-1'>
            <label className='text-muted'> Category</label>
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

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
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
