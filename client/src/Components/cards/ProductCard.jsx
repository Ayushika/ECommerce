/** @format */

import React from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug } = product;

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
        title={title}
        description={`${description && description.substring(0, 20)}...`}
      />
    </Card>
  );
};

export default ProductCard;
