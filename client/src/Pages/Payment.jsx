/** @format */

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../Components/StripeCheckout";
import "../stripe.css";

//load stripe outside of component render to avoid recreating stripe object on every render
const promise = loadStripe(
  "pk_test_51Jw3H8SJnWSxlCWB2zapEfrT7fM98uCFA3mf56VuDVch019LCYUwrKKAwUbY3RPloD482csPClH61pSzoGrywgXe00MOzWja1N",
);

const Payment = () => {
  return (
    <>
      <div className='container p-5  text-center'>
        <Elements stripe={promise}>
          <div className='col-md-8 offset-md-2 mt-5'>
            <StripeCheckout />
          </div>
        </Elements>
      </div>
    </>
  );
};

export default Payment;
