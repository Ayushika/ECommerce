/** @format */

import React, { useEffect, useState } from "react";
import { Card, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AverageRating from "./AverageRating";
import { toast } from "react-toastify";
import StarRating from "react-star-ratings";
import axios from "axios";
import _ from "lodash";
const { Meta } = Card;

const ProductCard = ({ product, wishlist, setResult }) => {
  const { images, title, description, slug, price, quantity, _id } = product;

  const [tooltip, setTooltip] = useState("Add To Cart");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };

  const addToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      if (cart.length > 0) {
        console.log(product._id);
        cart = cart.filter((c) => c._id !== product._id);
        console.log(cart);
      }

      cart.push({
        ...product,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));

      dispatch({ type: "ADD_TO_CART", payload: unique });
      dispatch({ type: "SET_VISIBLE", payload: true });
      setTooltip("Added");
    }
  };

  //remove from wishlist
  const removeFromWishlist = async () => {
    await axios
      .delete(`http://localhost:5000/api/user/wishlist/${_id}`, config)
      .then((res) => {
        if (res.data.ok) {
          setResult((prev) => !prev);
          toast.success("Removed from wishlist");
        }
      })
      .catch((err) => {
        toast.error("Error while removing from wishlist");
        // setIsAdded(true);
      });
  };

  //add to wishlist
  const addToWishlist = async () => {
    await axios
      .put(`http://localhost:5000/api/user/wishlist/${_id}`, {}, config)
      .then((res) => {
        if (res.data.ok) {
          toast.success("Added to wishlist");
        }
      })
      .catch((err) => {
        toast.error("Error while adding to wishlist");
      });
  };

  return (
    <Card
      cover={
        images && images.length > 0 ? (
          <img
            alt={images[0].url}
            src={images[0].url}
            style={{ height: "150px", objectFit: "cover" }}
          />
        ) : (
          ""
        )
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className='text-info' />,<br /> View Product
        </Link>,
        <Tooltip title={tooltip}>
          <a onClick={addToCart} disabled={quantity <= 0}>
            <ShoppingCartOutlined className='text-danger' />,<br />{" "}
            {quantity < 1 ? "Out Of Stock" : "Add To Cart"}
          </a>
        </Tooltip>,
        <>
          {wishlist ? (
            <a onClick={removeFromWishlist}>
              <DeleteOutlined className='text-warning' />,<br />
              Remove
            </a>
          ) : (
            <a onClick={addToWishlist}>
              <HeartOutlined className='text-warning' />,<br />
              Add To Wishlist
            </a>
          )}
        </>,
      ]}>
      <Meta
        title={`${title} - Rs ${price}`}
        description={`${description && description.substring(0, 20)}...`}
      />

      <p style={{ marginTop: "10px" }}>
        {product && product.ratings && product.ratings.length > 0 ? (
          <AverageRating product={product} />
        ) : (
          <StarRating
            numberOfStars={5}
            starDimension='15px'
            starSpacing='5px'
          />
        )}
      </p>
    </Card>
  );
};

export default ProductCard;
