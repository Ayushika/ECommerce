/** @format */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Result } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { coupon } = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };

  useEffect(() => {
    createPayment();
  }, []);

  const createPayment = async () => {
    await axios
      .post("/api/create-payment-intent", { coupon }, config)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setTotal(res.data.cartTotal);
        setFinalAmount(res.data.payable);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      //here you get result after successfull payment
      const paymentIntent = payload.paymentIntent;
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      //create order and save in db for admin to processing
      await axios
        .post("/api/user/order", { paymentIntent }, config)
        .then((res) => {
          if (res.data.ok) {
            //empty cart from local storage
            if (typeof window !== "undefined") {
              window.localStorage.removeItem("cart");
            }

            //empty cart from redux
            dispatch({ type: "ADD_TO_CART", payload: [] });

            //set coupon applied to false
            dispatch({ type: "COUPON_APPLIED", payload: false });

            //remove cart from db
            emptyCart();
          }
        });
    }
  };

  //Empty cart object
  const emptyCart = async () => {
    await axios
      .delete("/api/user/cart", config)
      .then((res) => {})
      .catch((error) => console.log(error.message));
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cardstyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {succeeded ? (
        <Result
          status='success'
          title='Payment Successful.'
          subTitle={
            <>
              <p className='text-muted'>Total Amount: Rs {total}</p>
              <p className='text-muted'>Total Paid Amount: Rs {finalAmount}</p>
              <h5>
                <Link to='/user/history'>See it in your purchase history</Link>
              </h5>
            </>
          }
        />
      ) : (
        <>
          <h6 className='display-5 text-muted text-center mb-4'>
            For Testing Purpose Use Credit Card Details <br /> 4242 4242 4242
            4242
          </h6>
          {coupon ? (
            <Alert
              message={"Coupon Applied"}
              type='success'
              className='mt-2 mb-4'
              showIcon
            />
          ) : (
            <Alert
              message={"Coupon Not Applied"}
              type='error'
              className='mt-2 mb-4'
              showIcon
            />
          )}
          <form
            id='payment-form'
            onSubmit={handleSubmit}
            className='stripe-form'>
            <CardElement
              id='card-element'
              options={cardstyle}
              onChange={handleChange}
            />
            <button
              disabled={processing || disabled || succeeded}
              className='stripe-button'>
              <span className='button-text'>
                {processing ? (
                  <div className='spinner' id='spinner'></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            <br />
            {error && (
              <div id='card-error' role='alert'>
                {error}
              </div>
            )}
          </form>
        </>
      )}
    </>
  );
};

export default StripeCheckout;
