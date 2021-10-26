/** @format */

import React from "react";
import AdminNavbar from "../../Components/nav/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col'>Admin Dashboard</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
