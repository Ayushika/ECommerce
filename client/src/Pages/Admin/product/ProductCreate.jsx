/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandsAction } from "../../../Actions/brandAction";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import { getAllSubCategoriesAction } from "../../../Actions/subCategoryAction";
import { createProductAction } from "../../../Actions/productAction";
import { CREATE_PRODUCT_RESET } from "../../../Constants/productConstant";
import { Select } from "antd";
const { Option } = Select;

const initialValues = {
  title: "",
  description: "",
  price: "",
  category: "0",
  subcategories: [],
  brand: "",
  quantity: "",
  images: [],
  shipping: "",
  colors: [
    "Black",
    "Brown",
    "White",
    "Red",
    "Orange",
    "Yellow",
    "Grey",
    "Blue",
    "Silver",
  ],
  color: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialValues);
  const {
    title,
    description,
    price,
    category,
    subcategories,
    brand,
    quantity,
    images,
    shipping,
    colors,
    color,
  } = values;

  const dispatch = useDispatch();
  const {
    getAllSubCategories,
    getAllCategories,
    getAllBrands,
    userLogin,
    createProduct,
  } = useSelector((state) => state);

  const { userInfo } = userLogin;
  const { subCategories } = getAllSubCategories;
  const { categories } = getAllCategories;
  const { brands } = getAllBrands;
  const { product, createSuccess, loading } = createProduct;

  useEffect(() => {
    if (createSuccess) {
      window.alert(`"${product.title}" created successfully`);
      window.location.reload();
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [createSuccess, dispatch]);

  useEffect(() => {
    dispatch(getAllSubCategoriesAction());
    dispatch(getAllCategoriesAction());
    dispatch(getAllBrandsAction());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductAction(values, userInfo.token));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
            <h4>Create Product</h4>
          )}
          <hr />
          {JSON.stringify(values)}
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-info'>Title</label>
              <input
                type='text'
                name='title'
                value={title}
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label className='text-info'>Description</label>
              <input
                type='text'
                name='description'
                value={description}
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label className='text-info'>Price</label>
              <input
                type='number'
                name='price'
                value={price}
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label className='text-info'>Shipping</label>
              <select
                className='form-control'
                name='shipping'
                onChange={handleChange}>
                <option>Please select shipping</option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </div>
            <div className='form-group'>
              <label className='text-info'>Quantity</label>
              <input
                type='number'
                name='quantity'
                value={quantity}
                className='form-control'
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label className='text-info'>Color</label>
              <select
                className='form-control'
                name='color'
                onChange={handleChange}>
                <option>Please select Color</option>
                {colors.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label className='text-info'>Category</label>
              <select
                className='form-control'
                name='category'
                onChange={handleChange}>
                <option value={0}>Please select Category</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            {category !== "0" && (
              <>
                <div className='form-group'>
                  <label className='text-info'>SubCategory</label>
                  <Select
                    className='form-control'
                    mode='multiple'
                    style={{ width: "100%" }}
                    placeholder='Please select'
                    onChange={(v) =>
                      setValues({ ...values, subcategories: v })
                    }>
                    {subCategories
                      .filter((c) => c.category === category)
                      .map((c) => (
                        <Option value={c._id} key={c._id}>
                          {c.name}
                        </Option>
                      ))}
                  </Select>
                </div>
                <div className='form-group'>
                  <label className='text-info'>Brand</label>
                  <select
                    className='form-control'
                    name='brand'
                    onChange={handleChange}>
                    <option>Please select brand</option>
                    {brands
                      .filter((c) => c.category === category)
                      .map((c) => (
                        <option value={c._id} key={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </>
            )}

            <button className='btn btn-info btn-raised my-3' type='submit'>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
