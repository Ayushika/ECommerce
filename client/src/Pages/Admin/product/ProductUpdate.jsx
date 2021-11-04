/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import ProductUpdateForm from "../../../Components/forms/ProductUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../../Actions/productAction";

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

const ProductUpdate = ({ match }) => {
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();
  const slug = match.params.slug;

  const { getProduct } = useSelector((state) => state);
  const { product } = getProduct;

  useEffect(() => {
    dispatch(getProductAction(slug));
  }, []);

  useEffect(() => {
    setValues({ ...values, ...product });
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <h4>Update Product</h4>
          <hr />
          <ProductUpdateForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
