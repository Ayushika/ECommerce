/** @format */

import React from "react";
import Jumbotron from "../Components/cards/Jumbotron";
import NewArrival from "../Components/home/NewArrival";
import BestSeller from "../Components/home/BestSeller";
import TopRated from "../Components/home/TopRated";

const Home = () => {
  return (
    <>
      <div className='jumbotron text-info h1 font-weight-bold text-center'>
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h5 className='jumbotron display-4 mt-5 mb-5 p-2 text-center'>
        New Arrivals
      </h5>
      <NewArrival />

      <h5 className='jumbotron display-4 mt-5 mb-5 p-4 text-center'>
        Top Rated
      </h5>
      <TopRated />

      <h5 className='jumbotron display-4 mt-5 mb-5 p-4 text-center'>
        Best Sellers
      </h5>
      <BestSeller />

      <br />
      <br />
    </>
  );
};

export default Home;
