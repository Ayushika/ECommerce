/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Components/cards/ProductCard";
import LoadingCard from "../../Components/cards/LoadingCard";
import { Pagination } from "antd";
import { useParams } from "react-router-dom";

const RelatedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/totalrelatedProducts")
      .then((res) => {
        setTotalProducts(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/related/${slug}`)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [page, slug]);

  return (
    <>
      {products && products.length > 0 && (
        <h5 className=' display-4 mt-5 mb-5 p-2 text-center jumbotron'>
          Related Products
        </h5>
      )}
      <div className='container'>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className='row'>
            {products &&
              products.map((product) => (
                <div key={product._id} className='col-md-4'>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        )}
        {products && products.length > 0 && (
          <>
            <div className='row'>
              <nav className='col-md-4 offset-md-4 text-center  pt-5'>
                <Pagination
                  current={page}
                  total={(totalProducts / 3) * 10}
                  onChange={(value) => setPage(value)}
                />
              </nav>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RelatedProducts;
