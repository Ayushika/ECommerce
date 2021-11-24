/** @format */

import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import ProductCardInCheckout from "../Components/cards/ProductCardInCheckout";
import { toast } from "react-toastify";

const Cart = ({ history }) => {
  const { userLogin, cart } = useSelector((state) => state);
  const { userInfo } = userLogin;

  const getTotal = () => {
    return cart.reduce((c, n) => {
      return c + n.price * n.count;
    }, 0);
  };

  const saveOrderToDb = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };

    await axios
      .post("/api/user/cart", { cart }, config)
      .then((res) => {
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const showCartItems = () => {
    return (
      <div className='table-responsive'>
        <table className='table table-bordered mt-5 mr-3'>
          <thead className='thead-light '>
            <tr>
              <th className='text-center'>Image</th>
              <th className='text-center'>Name</th>
              <th className='text-center'>Price</th>
              <th className='text-center'>Brand</th>
              <th className='text-center'>Color</th>
              <th className='text-center'>Count</th>
              <th className='text-center'>Shipping</th>
              <th className='text-center'>Remove</th>
            </tr>
          </thead>
          {cart.map((p) => (
            <ProductCardInCheckout p={p} key={p._id} />
          ))}
        </table>
      </div>
    );
  };

  return (
    <div className='container-fluid mt-4'>
      <div className='row '>
        <div className='col-md-8'>
          <h5 className='display-4 text-center'>Cart</h5>
          {cart.length === 0 ? (
            <h5 className='display-5 mt-5 text-center'>
              No products in cart. <Link to='/shop'>Continue Shopping</Link>
            </h5>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='col-md-4'>
          {cart && cart.length > 0 && (
            <Card>
              <h5 className='display-4 text-center mb-5'>Order Summary</h5>
              {cart.map((c, i) => {
                return (
                  <div key={i} className='mb-3 mt-2'>
                    <h6 className='text-muted'>
                      {c.title} x {c.count} = Rs {c.price * c.count}
                    </h6>
                  </div>
                );
              })}
              <hr className='mb-3 mr-2' />
              <h6 className='text-muted'>
                Total :{" "}
                <span className='font-weight-bold text-dark'>
                  {" "}
                  Rs {getTotal()}
                </span>
              </h6>
              <hr className='mb-3 mr-2' />
              {userInfo ? (
                <div
                  className='mt-2 text-info h6'
                  onClick={saveOrderToDb}
                  style={{ cursor: "pointer" }}>
                  Proceed To Checkout
                </div>
              ) : (
                <div className='mt-2 text-info h6'>
                  <Link to={{ pathname: "/login", state: { from: "/cart" } }}>
                    Login To Checkout
                  </Link>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
