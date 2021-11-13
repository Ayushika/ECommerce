/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/user/cart", config)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  //Empty cart object
  const emptyCart = async () => {
    await axios
      .delete("http://localhost:5000/api/user/cart", config)
      .then((res) => {
        if (res.data) {
          setProducts([]);
          setTotal(0);

          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
            dispatch({ type: "ADD_TO_CART", payload: [] });
          }
        }
      });
  };

  //save address to database
  const SaveAddressToDb = async () => {
    await axios
      .post("http://localhost:5000/api/user/address", { address }, config)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Address saved successfully");
        }
      });
  };

  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-md-5 ml-5'>
          <h4>Delievery Address</h4>
          <br />
          <ReactQuill theme='snow' value={address} onChange={setAddress} />
          <button
            className='btn btn-primary btn-raised mt-3'
            onClick={SaveAddressToDb}>
            Save
          </button>
          <hr />
          <h4>Got Coupon ? </h4>
          <br />
          <p>Apply Coupon</p>
        </div>
        <div className='col-md-5 ml-5'>
          <h4>Order Summary</h4>
          <hr />
          <h5 className='mb-4'>Products ({products.length})</h5>
          {products &&
            products.length > 0 &&
            products.map((c, i) => {
              return (
                <div key={i} className='mb-3'>
                  <h6 className='text-muted'>
                    {c.product.title} (){} x {c.count} = ${c.price * c.count}
                  </h6>
                </div>
              );
            })}
          <hr className='mb-3' />
          <h6 className='text-muted'>
            Total : <span className='font-weight-bold text-dark'>${total}</span>
          </h6>
          <div className='row mt-5'>
            <div className='col-md-6'>
              <button
                className='btn btn-primary btn-raised'
                disabled={!products.length && addressSaved}>
                Place Order
              </button>
            </div>
            <div className='col-md-6'>
              <button
                disabled={!products.length}
                className='btn btn-primary btn-raised'
                onClick={emptyCart}>
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
