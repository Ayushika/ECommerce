/** @format */

import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideCartDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => state);

  return (
    <Drawer
      title='Cart'
      closable={false}
      onClose={() => dispatch({ type: "SET_VISIBLE", payload: false })}
      visible={drawer}>
      {cart.map((p) => (
        <div className='row mt-2' key={p._id}>
          <div className='col'>
            {p.images[0] ? (
              <>
                <img
                alt={p.images[0].url}
                  src={p.images[0].url}
                  style={{ width: "100%", height: "100px", objectFit: "cover" }}
                />
                <p className='text-center bg-secondary text-light'>
                  {p.title} x {p.count}
                </p>
              </>
            ) : null}
          </div>
        </div>
      ))}
      <Link to='/cart'>
        <div className='text-center mt-2'>
          <Button
            onClick={() => {
              dispatch({ type: "SET_VISIBLE", payload: false });
            }}
            className='btn btn-primary text-center'>
            Go To Cart
          </Button>
        </div>
      </Link>
    </Drawer>
  );
};

export default SideCartDrawer;
