/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../../Actions/productAction";
import AdminCard from "../../../Components/cards/AdminCard";

const AllProducts = () => {
  const { getAllProducts, deleteProduct } = useSelector((state) => state);
  const { products, loading } = getAllProducts;
  const { deleteSuccess } = deleteProduct;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsAction(10));
  }, [deleteSuccess]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className='row pt-4'>
            {products &&
              products.map((product) => {
                return (
                  <div key={product._id} className='col-md-4 px-4 pb-3'>
                    <AdminCard product={product} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
