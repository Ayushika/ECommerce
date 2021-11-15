/** @format */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Result } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { coupon } = useSelector((state) => state);

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [message, setMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };

  useEffect(async () => {
    await axios
      .post(
        "http://localhost:5000/api/create-payment-intent",
        { coupon },
        config,
      )
      .then((res) => {
        console.log("checkout : ", res);
        setClientSecret(res.data.clientSecret);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setTotal(res.data.cartTotal);
        setFinalAmount(res.data.payable);
      });
  }, []);

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
      //create order and save in db for admin to processing
      //empty cart from redux and local storage
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
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
              {coupon && totalAfterDiscount !== undefined && (
                <p className='text-muted'>
                  Discount : Rs {total - totalAfterDiscount}
                </p>
              )}
              <p className='text-muted'>Total Paid Amount: Rs {finalAmount}</p>
              <h5>
                <Link to='/user/history'>See it in your purchase history</Link>
              </h5>
            </>
          }
        />
      ) : (
        <form id='payment-form' onSubmit={handleSubmit} className='stripe-form'>
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
      )}
    </>
  );
};

export default StripeCheckout;
