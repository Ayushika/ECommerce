/** @format */

import React from "react";
import { Card, Tabs } from "antd";
import { ShoppingOutlined, HeartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
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

  return (
    <>
      <div className='col-md-7'>
        <Carousel autoPlay={true} infiniteLoop={true} showArrows={true}>
          {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
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
            <>
              <ShoppingOutlined className='text-info' />
              Add To Cart
            </>,
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
