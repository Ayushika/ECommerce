/** @format */

import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AverageRating from "./AverageRating";
import StarRating from "react-star-ratings";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug, price } = product;

  return (
    <Card
      cover={
        images && images.length > 0 ? (
          <img
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
        <>
          <ShoppingCartOutlined className='text-danger' /> Add To Cart
        </>,
      ]}>
      <Meta
        title={`${title} - $${price}`}
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
