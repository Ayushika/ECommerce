/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import NewArrival from "../../../Components/home/NewArrival";

const AllProducts = () => {
  const role = "admin";

  const { deleteProduct } = useSelector((state) => state);
  const { deleteSuccess } = deleteProduct;

  useEffect(() => {}, [deleteSuccess]);

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col-md-10'>
          <h5 className=' mt-4 text-center display-4'>Products</h5>
          <div className='underline'></div>
          <div className='row pt-4'>
            <NewArrival role={role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
