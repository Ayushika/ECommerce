/** @format */

import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
      .post("http://localhost:5000/api/user/cart", { cart }, config)
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
      <table className='table table-bordered table-responsive mt-5 mr-3'>
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
    );
  };

  return (
    <div className='container-fluid mt-4'>
      <div className='row ml-5'>
        <div className='col-md-8'>
          <h4>Cart / {cart.length} Products</h4>
          {cart.length === 0 ? (
            <p>
              No products in cart. <Link to='/shop'>Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='col-md-3 mr-5'>
          <h4 className='mb-5'>Order Summary</h4>
          {cart.map((c, i) => {
            return (
              <div key={i} className='mb-3'>
                <h6 className='text-muted'>
                  {c.title} x {c.count} = Rs {c.price * c.count}
                </h6>
              </div>
            );
          })}
          <hr className='mb-3' />
          <h6 className='text-muted'>
            Total :{" "}
            <span className='font-weight-bold text-dark'> Rs {getTotal()}</span>
          </h6>
          <hr />
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
