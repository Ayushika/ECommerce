/** @format */

import React from "react";
import Jumbotron from "../Components/cards/Jumbotron";
import NewArrival from "../Components/home/NewArrival";
import BestSeller from "../Components/home/BestSeller";
import TopRated from "../Components/home/TopRated";
import Laptop from "../images/l4.jpg";
import Mobile from "../images/m1.jpg";
import Camera from "../images/c3.jpg";
import Watch from "../images/w1.jpg";
import { Carousel , Button } from "antd";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className='jumbotron text-info h1 font-weight-bold text-center '>
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      <h5 className=' mt-5 text-center display-4'>New Arrivals</h5>
      <div className='underline'></div>
      <NewArrival />
      <div style={{ backgroundColor: " #E9ECEF" }}>
        <div className='container mt-5 mb-5'>
          <div className='row'>
            <div className='col-md-4 mt-5 mb-5'>
              <h3 className='mb-4' style={{ color: "rgb(0, 21, 41)" }}>
                Up to{" "}
                <span
                  className='display-3'
                  style={{ color: "rgb(64,169,255)" }}>
                  <strong>40% </strong>
                </span>
                off
              </h3>

              <p style={{ maxWidth: "26rem" }}>
                Apply Coupon{" "}
                <b style={{ color: "rgb(64,169,255)" }}>OFFER2021 </b>{" "}
                Offer valid for limited time period T&C applied
              </p>
              <Button
                className='mt-2 mb-4'
                size='large'
                style={{ backgroundColor: "rgb(0, 21, 41)", color: "white" }}>
                <Link to='/shop'>
                  <i className='fas fa-shopping-bag p-1'></i> Shop Now
                </Link>
              </Button>
            </div>
            <div className='col-md-6 offset-md-2 mt-5 mb-5'>
              <Carousel autoplay>
                <div>
                  <img
                    src={Laptop}
                    alt={"Laptop"}
                    width='100%'
                    height='200px'
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <img
                    src={Watch}
                    alt={"watch"}
                    width='100%'
                    height='200px'
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <img
                    src={Camera}
                    alt={"Camera"}
                    width='100%'
                    height='200px'
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <img
                    src={Mobile}
                    alt={"Mobile"}
                    width='100%'
                    height='200px'
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <h5 className=' display-4 mt-5 text-center'>Top Rated</h5>
      <div className='underline'></div>
      <TopRated />
      <h5 className=' display-4 mt-5 text-center'>Best Sellers</h5>
      <div className='underline'></div>
      <BestSeller />
      <br />
      <br />
    </>
  );
};

export default Home;
