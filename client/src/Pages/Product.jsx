/** @format */

import React, { useEffect, useState } from "react";
import { getProductAction } from "../Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import SingleProductCard from "../Components/cards/SingleProductCard";
import RelatedProducts from "../Components/home/RelatedProducts";

const Product = ({ match }) => {
  const [starRating, setStarRating] = useState(0);

  const slug = match.params.slug;
  const dispatch = useDispatch();

  const { getProduct } = useSelector((state) => state);
  const { product } = getProduct;

  useEffect(() => {
    if (!product.title || product.slug !== slug) {
      dispatch(getProductAction(slug));
    } else if (product && product.ratings && product.ratings.length > 0) {
      setStarRating(product.ratings[0].star);
    }
  }, [slug, product]);

  const handleStarClick = (star) => {
    setStarRating(star);
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProductCard
          product={product}
          handleStarClick={handleStarClick}
          starRating={starRating}
        />
      </div>
      <RelatedProducts />
      <br />
      <br />
    </div>
  );
};

export default Product;
