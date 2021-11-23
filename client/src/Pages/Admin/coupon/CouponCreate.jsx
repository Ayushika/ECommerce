/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const CouponCreate = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  //redux
  const { userInfo } = useSelector((state) => state.userLogin);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };

  //deletions
  const handleRemove = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/coupon/${id}`, config)
      .then((res) => {
        loadAllCoupons();
        toast.success("Deleted successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //creation of coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "http://localhost:5000/api/coupon",
        { name, expiry, discount },
        config,
      )
      .then((res) => {
        setLoading(false);
        loadAllCoupons();
        toast.success("Created Successfully");
        setName("");
        setDiscount("");
        setExpiry("");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = async () => {
    await axios.get("http://localhost:5000/api/coupon/all").then((res) => {
      setCoupons(res.data);
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col-md-8'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <>
              <h5 className=' mt-1 text-center display-8'>Coupon</h5>
              <div className='underline'></div>
            </>
          )}

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-muted mt-1'>Name</label>
              <input
                type='text'
                className='form-control'
                value={name}
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />{" "}
              <label className='text-muted mt-3'>Discount</label>
              <input
                type='text'
                className='form-control'
                value={discount}
                required
                onChange={(e) => setDiscount(e.target.value)}
              />{" "}
              <label className='text-muted mt-3'>Expiry</label>
              <br />
              <DatePicker
                selected={expiry}
                className='form-control'
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>

            <button
              className='btn btn-outline-primary mt-3'
              onSubmit={handleSubmit}>
              Save
            </button>
          </form>
          <table className='table table-bordered mt-4 text-center'>
            <thead className='thead-light'>
              <th>Name</th>
              <th>Expiry</th>
              <th>Discount</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {coupons &&
                coupons.length > 0 &&
                coupons.map((c) => {
                  return (
                    <tr>
                      <td>{c.name}</td>
                      <td>{new Date(c.expiry).toLocaleDateString()}</td>
                      <td>{c.discount}</td>
                      <td>
                        <DeleteOutlined
                          className='text-danger'
                          onClick={() => handleRemove(c._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponCreate;
