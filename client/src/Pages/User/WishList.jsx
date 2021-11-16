/** @format */

import React from "react";
import UserNavbar from "../../Components/nav/UserNavbar";

const WishList = () => {
  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <UserNavbar />
        </div>
        <div className='col-md-8'>
          <h5 className=' mt-1 text-center display-8'>Wishlist</h5>
          <div className='underline'></div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
