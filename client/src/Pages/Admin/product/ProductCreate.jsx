/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandsAction } from "../../../Actions/brandAction";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import { getAllSubCategoriesAction } from "../../../Actions/subCategoryAction";
import { createProductAction } from "../../../Actions/productAction";
import { CREATE_PRODUCT_RESET } from "../../../Constants/productConstant";
import ProductCreateForm from "../../../Components/forms/ProductCreateForm";
import FileUpload from "../../../Components/forms/FileUpload";

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
          <FileUpload values={values} setValues={setValues} />
          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            categories={categories}
            subCategories={subCategories}
            brands={brands}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
