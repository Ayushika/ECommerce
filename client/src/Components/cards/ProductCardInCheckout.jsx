/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import ModalImage from "react-modal-image";
import {
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const ProductCardInCheckout = ({ p }) => {
  const dispatch = useDispatch();

  //array of colors
  const colors = [
    "Black",
    "Brown",
    "White",
    "Red",
    "Orange",
    "Yellow",
    "Grey",
    "Blue",
    "Silver",
  ];

  //change count
  const handleCountChange = (e) => {
    if (e.target.value < 1) {
      toast.error("Please select alteast one quantity");
      return;
    }

    if (e.target.value > p.quantity) {
      toast.error(`Maximum available quantity is ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((c, i) => {
        if (c._id === p._id) {
          cart[i].count = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  //change color
  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((c, i) => {
        if (c._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  //delete item from cart
  const handleDelete = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart"));

      cart.map((c, i) => {
        if (c._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  return (
    <tr>
      <td className='text-center'>
        <div
          style={{
            height: "auto",
            width: "100px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
          <ModalImage
            small={p.images[0].url}
            large={p.images[0].url}
            alt={p.title}
          />
        </div>
      </td>
      <td className='text-center'>{p.title}</td>
      <td className='text-center'>{p.price}</td>
      <td className='text-center'>{p.brand.name}</td>
      <td className='text-center'>
        <select
          style={{ marginTop: "-10px" }}
          className='form-control'
          onChange={handleColorChange}
          name='color'>
          {p.color ? (
            <option value={p.color} className='text-center'>
              {p.color}
            </option>
          ) : (
            <option>Select</option>
          )}
          {colors.map((c) => (
            <option value={c} className='text-center'>
              {c}
            </option>
          ))}
        </select>
      </td>
      <td className='text-center'>
        <input
          type='number'
          style={{ width: "90px", marginTop: "-6px" }}
          className='form-control text-center ml-4'
          onChange={handleCountChange}
          value={p.count}
        />
      </td>
      <td className='text-center'>
        {p.shipping === "Yes" ? (
          <CheckCircleOutlined
            style={{ cursor: "pointer" }}
            className='text-success'
          />
        ) : (
          <CloseCircleOutlined
            style={{ cursor: "pointer" }}
            className='text-danger'
          />
        )}
      </td>
      <td className='text-center'>
        <DeleteOutlined
          onClick={handleDelete}
          style={{ cursor: "pointer" }}
          className='text-danger'
        />
      </td>
    </tr>
  );
};

export default ProductCardInCheckout;
