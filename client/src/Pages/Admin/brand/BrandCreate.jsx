/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  createBrandAction,
  deleteBrandAction,
  getAllBrandsAction,
} from "../../../Actions/brandAction";

const BrandCreate = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const {
    getAllCategories,
    getAllBrands,
    userLogin,
    createBrand,
    deleteBrand,
    updateBrand,
  } = useSelector((state) => state);

  const { userInfo } = userLogin;
  const { categories } = getAllCategories;
  const { brands } = getAllBrands;
  const { loading, createSuccess } = createBrand;
  const { deleteSuccess } = deleteBrand;
  const { updateSuccess } = updateBrand;

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, []);

  useEffect(() => {
    dispatch(getAllBrandsAction());
  }, [updateSuccess, createSuccess, deleteSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBrandAction(category, name, userInfo.token));
    setName("");
  };

  const removeBrand = (slug) => {
    if (window.confirm("Delete?")) {
      dispatch(deleteBrandAction(slug, userInfo.token));
    }
  };

  const brandForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter Brand Name'
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
            <h4 className='text-primary'>Create Brand</h4>
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
          {brandForm()}
          <input
            type='search'
            placeholder='Search Brand'
            className='form-control'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
          <hr />
          {brands
            .filter((c) => c.name.toLowerCase().includes(keyword))
            .map((c) => (
              <div className='alert alert-secondary' key={c._id}>
                {c.name}
                <span
                  className='btn btn-sm float-right'
                  onClick={() => removeBrand(c.slug)}>
                  <DeleteOutlined className='text-danger' />
                </span>
                <Link to={`/admin/brand/${c.slug}`}>
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

export default BrandCreate;