/** @format */

import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ProductCard from "../../Components/cards/ProductCard";
import LoadingCard from "../../Components/cards/LoadingCard";
import axios from "axios";

const BestSeller = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);


  useEffect(() => {
    axios
      .post("/api/product/home", {
        sort: "sold",
        order: "desc",
        page,
      })
      .then((res) => {
        setLoading(false);
        setProducts(res.data.products);
        setTotalProducts(res.data.total);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [page]);

  return (
    <>
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
        <div className='row'>
          <nav className='col-md-4 offset-md-4 text-center  pt-5'>
            <Pagination
              current={page}
              total={(totalProducts / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
