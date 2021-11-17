/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../Components/nav/AdminNavbar";
import { useSelector } from "react-redux";
import { Card, Alert, Select } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
const { Option } = Select;

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [orders, setOrders] = useState([]);
  const [result , setResult] =useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };
  const handleValueChange = async (orderId, orderStaus) => {
    await axios
      .post(
        "http://localhost:5000/api/admin/order/updateStatus",
        { orderId, orderStaus },
        config,
      )
      .then((res) => {
        setResult(true)
        toast.success("Successfully updated Order Status");
      })
      .catch((err) => {
        toast.error("Error updating Order Status");
      });
  };

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/admin/order/all", config)
      .then((res) => setOrders(res.data));
  }, [result]);

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col-md-10'>
          <h5 className=' mt-1 text-center display-5'>All Orders</h5>
          <div className='underline'></div>
          {orders.map((order, i) => {
            let alertColor = "error";
            if (order.orderStaus === "Not Processed") {
              alertColor = "error";
            } else if (order.orderStaus === "Processing") {
              alertColor = "warning";
            } else if (order.orderStaus === "Dispatched") {
              alertColor = "warning";
            } else if (order.orderStaus === "Cancelled") {
              alertColor = "info";
            } else if (order.orderStaus === "Delievered") {
              alertColor = "success";
            }
            return (
              <Card className='mt-4 mb-3' key={i}>
                <Alert
                  message={`Order Status  :  ${order.orderStaus.toUpperCase()}`}
                  type={alertColor}
                  className='mt-1 mb-4'
                />
                <div className='row'>
                  <div className='col-md-4 mt-2'>
                    <span className='text-muted mb-4'>
                      <b>Order Id</b> : {order.paymentIntent.id}
                    </span>
                    <br />
                    <span className='text-muted mb-4'>
                      <b>Amount</b> :{" "}
                      {(order.paymentIntent.amount /= 100).toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "INR",
                        },
                      )}
                    </span>
                    <br />
                    <span className='text-muted mb-4'>
                      <b>Currency</b> :{" "}
                      {order.paymentIntent.currency.toUpperCase()}
                    </span>
                    <br />
                    <span className='text-muted mb-4'>
                      <b>Payment method</b> :{" "}
                      {order.paymentIntent.payment_method_types[0]}
                    </span>
                    <br />
                    <span className='text-muted mb-4'>
                      <b>Ordered on</b> :{" "}
                      {new Date(
                        order.paymentIntent.created * 1000,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className='col-md-8'>
                    <div className='row mt-2 mb-2 '>
                      <h6 className='mt-1 mr-4 text-muted'>Change Status : </h6>
                      <Select
                        onChange={(value) => {
                          handleValueChange(order._id, value);
                        }}
                        defaultValue={order.orderStaus}
                        style={{ width: 360 }}>
                        <Option value='Not Processed'>Not Processed</Option>
                        <Option value='Processing'>Processing</Option>
                        <Option value='Dispatched'>Dispatched</Option>
                        <Option value='Cancelled'>Cancelled</Option>
                        <Option value='Delievered'>Delievered</Option>
                      </Select>
                    </div>
                    <div className='row table-responsive'>
                      <table className='table table-bordered mt-2'>
                        <thead className='thead-light '>
                          <tr>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Color</th>
                            <th className='text-center'>Count</th>
                            <th className='text-center'>Shipping</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((p, i) => (
                            <tr key={i}>
                              <td scope='col' className='text-center'>
                                {p.product.title}
                              </td>
                              <td scope='col' className='text-center'>
                                {p.product.price}
                              </td>
                              <td scope='col' className='text-center'>
                                {p.color}
                              </td>
                              <td scope='col' className='text-center'>
                                {p.count}
                              </td>
                              <td scope='col' className='text-center'>
                                {p.product.shipping === "Yes" ? (
                                  <CheckCircleOutlined className='text-success' />
                                ) : (
                                  <CloseCircleOutlined className='text-danger' />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
