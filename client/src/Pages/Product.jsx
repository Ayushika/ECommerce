/** @format */

import React, { useEffect, useState } from "react";
import { getProductAction } from "../Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import SingleProductCard from "../Components/cards/SingleProductCard";

const Product = ({ match }) => {
  const slug = match.params.slug;
  const dispatch = useDispatch();

  const { getProduct } = useSelector((state) => state);
  const { product } = getProduct;

  useEffect(() => {
    dispatch(getProductAction(slug));
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProductCard product={product} />
      </div>
      {/* <div className='row'>Related Products</div> */}
      <br />
      <br />
    </div>
  );
};

export default Product;
