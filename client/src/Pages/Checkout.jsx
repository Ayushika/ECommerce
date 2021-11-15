/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { Alert } from "antd";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState("");

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
          setDiscountError("");
          setTotalAfterDiscount(0);
          setCoupon("");

          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
            dispatch({ type: "ADD_TO_CART", payload: [] });
          }

          history.push("/cart");
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

  //apply coupon
  const applyCoupon = async () => {
    await axios
      .post("http://localhost:5000/api/user/cart/coupon", { coupon }, config)
      .then((res) => {
        if (res.data.err) {
          setDiscountError("Invalid coupon");
          setTotalAfterDiscount(0);
          setDiscountSuccess("");
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
        } else if (res.data) {
          setTotalAfterDiscount(res.data);
          setDiscountSuccess("Valid coupon");
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        }
      })
      .catch((err) => toast.error(err.message));
  };

  //address form
  const showAddressForm = () => (
    <>
      <ReactQuill theme='snow' value={address} onChange={setAddress} />
      <button
        className='btn btn-outline-primary mt-4'
        onClick={SaveAddressToDb}>
        Save
      </button>
    </>
  );

  //order summary form
  const showOrderSummaryForm = () => (
    <>
      <h5 className='mb-4'>Products ({products.length})</h5>
      {products &&
        products.length > 0 &&
        products.map((c, i) => {
          return (
            <div key={i} className='mb-3'>
              <h6 className='text-muted'>
                {c.product.title} ({c.color}) x {c.count} = Rs{" "}
                {c.price * c.count}
              </h6>
            </div>
          );
        })}
      <hr className='mb-3' />
      <h6 className='text-muted'>
        {totalAfterDiscount > 0 ? (
          <Alert
            type='warning'
            className='mt-2'
            message={
              <span style={{ letterSpacing: "0.08rem" }}>
                Cart Total :
                <span
                  className='text-muted ml-1'
                  style={{ textDecoration: "line-through" }}>
                  Rs {total}
                </span>
                <b className='ml-2'>Rs {totalAfterDiscount}</b>
              </span>
            }
          />
        ) : (
          <span className='font-weight-bold text-dark ml-1'>
            Cart Total : Rs {total}
          </span>
        )}
      </h6>
    </>
  );

  //coupon form
  const showApplyCouponForm = () => (
    <div className='form-group'>
      <label className='text-muted'>Coupon</label>
      <input
        type='text'
        className='form-control'
        value={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
          setDiscountSuccess("");
          setTotalAfterDiscount(0);
        }}
      />
      {discountError && (
        <Alert message={discountError} type='error' className='mt-2' showIcon />
      )}
      {discountSuccess && (
        <Alert
          message={discountSuccess}
          type='success'
          className='mt-2'
          showIcon
        />
      )}
      <button
        className='btn btn-outline-primary mt-4'
        onClick={() => applyCoupon()}>
        Apply Coupon
      </button>
    </div>
  );

  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-md-5 ml-5'>
          <h4>Delievery Address</h4>
          <br />
          {showAddressForm()}
          <hr />
          <h4>Got Coupon ? </h4>
          <br />
          {showApplyCouponForm()}
        </div>
        <div className='col-md-5 ml-5'>
          <h4>Order Summary</h4>
          <hr />
          {showOrderSummaryForm()}
          <div className='row mt-5'>
            <div className='col-md-6'>
              <button
                onClick={() => history.push("/payment")}
                className='btn btn-outline-primary'
                disabled={!addressSaved || products.length <= 0}>
                Place Order
              </button>
            </div>
            <div className='col-md-6'>
              <button
                disabled={!products.length}
                className='btn btn-outline-primary'
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
