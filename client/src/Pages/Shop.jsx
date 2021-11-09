/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Components/cards/ProductCard";
import {
  getAllProductsAction,
  getProductsByFilterAction,
} from "../Actions/productAction";

const Shop = () => {
  const { getAllProducts, getProductsByFilter } = useSelector((state) => state);
  const { products } = getAllProducts;
  const { filterProducts } = getProductsByFilter;

  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getAllProductsAction(10));
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      dispatch(getProductsByFilterAction({ query: text }));
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>Filter submenu</div>
          <div className='col-md-9'>
            <h5 className=' display-4 mt-5 text-center'>Products</h5>
            <div className='underline'></div>
            <div className='row mt-2'>
              {text.length <= 0 ? (
                products &&
                products.length > 0 &&
                products.map((p) => {
                  return (
                    <div className='col-md-4 mb-5' key={p._id}>
                      <ProductCard product={p} />
                    </div>
                  );
                })
              ) : filterProducts && filterProducts.length > 0 ? (
                filterProducts.map((p) => {
                  return (
                    <div className='col-md-4 mb-5' key={p._id}>
                      <ProductCard product={p} />
                    </div>
                  );
                })
              ) : (
                <h4>No Products Found</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
