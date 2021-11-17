/** @format */

import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { useParams } from "react-router-dom";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import AverageRating from "../../Components/cards/AverageRating";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
const { TabPane } = Tabs;

const SingleProductCard = ({ product, handleStarClick, starRating }) => {
  const { title, images, description, quantity, _id } = product;
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

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
      dispatch({ type: "SET_VISIBLE", payload: true });
      setTooltip("Added");
    }
  };

  //add to wishlist
  const addToWishlist = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };

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
              <a onClick={addToCart} disabled={quantity < 1}>
                <ShoppingCartOutlined className='text-danger' />,<br />
                {quantity < 1 ? "Out Of Stock" : "Add To Cart"}
              </a>
            </Tooltip>,
            <>
              {userInfo && userInfo.token ? (
                <a onClick={addToWishlist}>
                  <HeartOutlined className='text-warning' />,<br />
                  Add To Wishlist
                </a>
              ) : (
                <>
                  <HeartOutlined className='text-warning' />
                  Login To Add To Wishlist
                </>
              )}
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
