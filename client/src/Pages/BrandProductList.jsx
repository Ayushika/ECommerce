/** @format */

import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ProductCard from "../Components/cards/ProductCard";
import LoadingCard from "../Components/cards/LoadingCard";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BrandProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const { slug } = useParams();

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/product/brand/${slug}`, { page })
      .then((res) => {
        setLoading(false);
        setProducts(res.data.products);
        setTotalProducts(res.data.total);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [page, slug]);

  return (
    <>
      <div className='container'>
        {loading ? (
          <LoadingCard count={3} />
        ) : totalProducts > 0 ? (
          <>
            <h5 className=' display-4 mt-5 text-center'>Products</h5>
            <div className='underline'></div>
            <div className='row'>
              {products &&
                products.map((product) => (
                  <div key={product._id} className='col-md-4'>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className='container'>
            <div className='container'>
              <h5 className=' mt-4 text-center display-4'>No Products Found</h5>
              <div className='underline'></div>
            </div>
          </div>
        )}
        {totalProducts > 0 && (
          <div className='row'>
            <nav className='col-md-4 offset-md-4 text-center  pt-5'>
              <Pagination
                current={page}
                total={(totalProducts / 3) * 10}
                onChange={(value) => setPage(value)}
              />
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default BrandProductList;
