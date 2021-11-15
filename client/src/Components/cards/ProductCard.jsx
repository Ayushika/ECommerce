/** @format */

import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AverageRating from "./AverageRating";
import StarRating from "react-star-ratings";
import _ from "lodash";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug, price } = product;

  const [tooltip, setTooltip] = useState("Add To Cart");
  const dispatch = useDispatch();

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
          <a onClick={addToCart}>
            <ShoppingCartOutlined className='text-danger' />,<br /> Add To Cart
          </a>
        </Tooltip>,
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
