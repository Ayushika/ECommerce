/** @format */

import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { useParams } from "react-router-dom";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import AverageRating from "../../Components/cards/AverageRating";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const { TabPane } = Tabs;

const SingleProductCard = ({ product, handleStarClick, starRating }) => {
  const { title, images, description } = product;
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [tooltip, setTooltip] = useState("Add To Cart");

  const addToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({
        ...product,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));

      dispatch({ type: "ADD_TO_CART", payload: unique });
      setTooltip("Added");
    }
  };

  return (
    <>
      <div className='col-md-7'>
        <Carousel autoPlay={true} infiniteLoop={true} showArrows={true}>
          {images &&
            images.map((i) => (
              <img alt={i.url} src={i.url} key={i.public_id} />
            ))}
        </Carousel>
        <Tabs type='card'>
          <TabPane key='1' tab='Description'>
            {description}
          </TabPane>
        </Tabs>
      </div>
      <div className='col-md-5'>
        <h2 className='pt-3'>{title}</h2>
        <div className='pb-2'>
          {product && product.ratings && product.ratings.length > 0 ? (
            <AverageRating product={product} />
          ) : (
            "No Rating Yet"
          )}
        </div>
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={addToCart}>
                <ShoppingCartOutlined className='text-danger' />,<br /> Add To
                Cart
              </a>
            </Tooltip>,
            <>
              <HeartOutlined className='text-warning' />
              Add To Wishlist
            </>,
            <>
              <RatingModal starRating={starRating} slug={slug}>
                <StarRating
                  name={slug}
                  numberOfStars={5}
                  rating={starRating}
                  changeRating={handleStarClick}
                  isSelectable={true}
                  starRatedColor='#FF5722'
                  starDimension='15px'
                  starSpacing='5px'
                />
              </RatingModal>
            </>,
          ]}>
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;
