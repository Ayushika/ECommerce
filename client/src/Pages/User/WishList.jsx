/** @format */

import React, { useState, useEffect } from "react";
import UserNavbar from "../../Components/nav/UserNavbar";
import ProductCard from "../../Components/cards/ProductCard";
import axios from "axios";
import { useSelector } from "react-redux";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/user/wishlist/all", config)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.wishlist);
      });
  }, [result]);

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <UserNavbar />
        </div>
        <div className='col-md-8'>
          <h5 className=' mt-1 text-center display-8'>Wishlist</h5>
          <div className='underline'></div>

          <div className='row'>
            {products.length > 0 &&
              products.map((product) => (
                <>
                  <div className='col-md-4 mb-5' key={product._id}>
                    <ProductCard
                      product={product}
                      wishlist={true}
                      setResult={setResult}
                    />
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
