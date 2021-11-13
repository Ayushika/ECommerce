/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import ProductUpdateForm from "../../../Components/forms/ProductUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductAction,
  updateProductAction,
} from "../../../Actions/productAction";
import { getAllBrandsAction } from "../../../Actions/brandAction";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import { getAllSubCategoriesAction } from "../../../Actions/subCategoryAction";
import {
  GET_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from "../../../Constants/productConstant";
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

const ProductUpdate = ({ match, history }) => {
  const [values, setValues] = useState(initialValues);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const dispatch = useDispatch();
  const slug = match.params.slug;

  const {
    getProduct,
    getAllSubCategories,
    getAllCategories,
    getAllBrands,
    updateProduct,
    userLogin,
  } = useSelector((state) => state);

  const { userInfo } = userLogin;
  const { product } = getProduct;
  const { subCategories } = getAllSubCategories;
  const { categories } = getAllCategories;
  const { brands } = getAllBrands;
  const { updateSuccess } = updateProduct;

  useEffect(() => {
    dispatch(getAllSubCategoriesAction());
    dispatch(getAllCategoriesAction());
    dispatch(getAllBrandsAction());
  }, [dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch({ type: GET_PRODUCT_RESET });
      history.push("/admin/products");
    } else if (!product.title || product.slug !== slug) {
      dispatch(getProductAction(slug));
    } else {
      setValues({
        ...values,
        ...product,
      });

      let arr = [];
      product.subcategories.map((s) => arr.push(s._id));

      setArrayOfSubs((prev) => arr);
    }
  }, [slug, dispatch, product, updateSuccess, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    values.subcategories = arrayOfSubs;
    values.category = values.category._id;
    values.brand = values.brand._id;
    dispatch(updateProductAction(values, slug, userInfo.token));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col-md-8'>
          <>
            <h5 className=' mt-1 text-center display-8'>Update Product</h5>
            <div className='underline'></div>
          </>
          <FileUpload values={values} setValues={setValues} />
          <ProductUpdateForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValues={setValues}
            subCategories={subCategories}
            categories={categories}
            brands={brands}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
