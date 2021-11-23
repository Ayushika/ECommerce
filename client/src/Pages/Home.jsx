/** @format */

import React from "react";
import Jumbotron from "../Components/cards/Jumbotron";
import NewArrival from "../Components/home/NewArrival";
import BestSeller from "../Components/home/BestSeller";
import TopRated from "../Components/home/TopRated";

const Home = () => {
  return (
    <>
      <div className='jumbotron text-info h1 font-weight-bold text-center '>
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h5 className=' mt-5 text-center display-4'>New Arrivals</h5>
      <div className='underline'></div>
      <NewArrival />

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
