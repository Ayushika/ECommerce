/** @format */

import React from "react";
import { Card, Tabs } from "antd";
import { ShoppingOutlined, HeartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductListItems from "./ProductListItems";
const { TabPane } = Tabs;

const SingleProductCard = ({ product }) => {
  const { title, images, description } = product;
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
        <h2 className='pt-3 pb-2'>{title}</h2>
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
          ]}>
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;
