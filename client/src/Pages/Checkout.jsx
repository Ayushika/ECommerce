/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { Alert, Button, Modal, Spin, Result, Card } from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
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
  const [showModal, setShowModal] = useState(false);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentWithCash, setPaymentWithCash] = useState(false);
  const dispatch = useDispatch();

  const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;

  const { userInfo } = useSelector((state) => state.userLogin);
  const { cashOrder } = useSelector((state) => state);
  const couponApplied = useSelector((state) => state.coupon);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    await axios
      .get("/api/user/cart", config)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  //Empty cart object
  const emptyCart = async () => {
    await axios.delete("/api/user/cart", config);
  };

  //save address to database
  const SaveAddressToDb = async () => {
    await axios.post("/api/user/address", { address }, config).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved successfully");
      }
    });
  };

  //apply coupon
  const applyCoupon = async () => {
    await axios
      .post("/api/user/cart/coupon", { coupon }, config)
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

  //cash order backend request
  const cashOrderToDatabase = async () => {
    await axios
      .post("/api/user/cash-order", { couponApplied, cashOrder }, config)
      .then((res) => {
        if (res.data.ok) {
          setLoading(false);
          setPaymentWithCash(true);
          //empty cart from local storage
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("cart");
          }
          //cashOrder to false
          dispatch({ type: "CASH_ORDER", payload: false });

          //empty cart from redux
          dispatch({ type: "ADD_TO_CART", payload: [] });

          //set coupon applied to false
          dispatch({ type: "COUPON_APPLIED", payload: false });

          //remove cart from db
          emptyCart();
        }
      });
  };

  return (
    <Spin spinning={loading} indicator={antIcon}>
      {paymentWithCash ? (
        <Result
          status='success'
          title='Your Order has placed.'
          subTitle={
            <h5>
              <Link to='/user/history'>See it in your purchase history</Link>
            </h5>
          }
        />
      ) : (
        <div className='container-fluid mt-5'>
          <div className='row'>
            <div className='col-md-6 offset-md-1'>
              <h5>Delievery Address</h5>
              <br />
              {showAddressForm()}
              <hr />
              <h5>Got Coupon?</h5>
              <br />
              {showApplyCouponForm()}
            </div>
            <div className='col-md-4 '>
              <Card>
                <h5 className='display-4 text-center mb-5'>Order Summary</h5>
                <hr />
                {showOrderSummaryForm()}
                <div className='row mt-5'>
                  <div className='col-md-6'>
                    <button
                      onClick={() => setShowModal(true)}
                      className='btn btn-outline-primary'
                      disabled={!addressSaved || products.length <= 0}>
                      Place Order
                    </button>
                    <Modal
                      title='Choose Payment option'
                      visible={showModal}
                      centered
                      onOk={() => {
                        setShowModal(false);
                        setLoading(true);
                        if (modeOfPayment === "online") {
                          history.push("/payment");
                        }

                        if (modeOfPayment === "cash") {
                          cashOrderToDatabase();
                        }
                      }}
                      onCancel={() => setShowModal(false)}>
                      <div className='row'>
                        <Button
                          className='col-md-6 offset-md-3 mb-3'
                          onClick={() => {
                            setModeOfPayment("online");
                            dispatch({ type: "CASH_ORDER", payload: false });
                          }}>
                          <i class='fab fa-cc-stripe mr-4'></i>
                          Pay Using Card
                        </Button>
                        <Button
                          className='col-md-6 offset-md-3 mb-3'
                          onClick={() => {
                            setModeOfPayment("cash");
                            dispatch({ type: "CASH_ORDER", payload: true });
                          }}>
                          <i class='fas fa-wallet mr-4'></i>
                          Cash On Delievery
                        </Button>
                      </div>
                    </Modal>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </Spin>
  );
};

export default Checkout;
