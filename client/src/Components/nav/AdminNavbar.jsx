/** @format */

import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/dashboard' className='nav-link'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/product' className='nav-link'>
            Product
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/products' className='nav-link'>
            Products
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/category' className='nav-link'>
            Category
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/subcategory' className='nav-link'>
            Sub Category
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/brand' className='nav-link'>
            Brand
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/coupon' className='nav-link'>
            Coupon
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/user/update/Password' className='nav-link'>
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
