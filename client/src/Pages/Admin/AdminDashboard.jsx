/** @format */

import React from "react";
import AdminNavbar from "../../Components/nav/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col'>
          <h5 className=' mt-1 text-center display-5'>Admin Dashboard</h5>
          <div className='underline'></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
