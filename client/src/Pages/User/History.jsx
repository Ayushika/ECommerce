/** @format */

import React, { useState, useEffect } from "react";
import UserNavbar from "../../Components/nav/UserNavbar";
import { useSelector } from "react-redux";
import { Result, Button, Card, Alert, Modal } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../Components/order/Invoice";
import ModalImage from "react-modal-image";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const History = ({ history }) => {
  const [orders, setOrders] = useState([]);

  const { userInfo } = useSelector((state) => state.userLogin);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo.token,
    },
  };

  //get orders from db
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/user/orders", config)
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
      });
  }, []);

  //payment info modal
  const paymentModal = (order) =>
    Modal.info({
      title: `Payment Info`,
      content: (
        <div>
          <span className='text-muted mb-4'>
            <b>Order Id</b> : {order.paymentIntent.id}
          </span>
          <br />
          <span className='text-muted mb-4'>
            <b>Amount</b> :{" "}
            {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </span>
          <br />
          <span className='text-muted mb-4'>
            <b>Currency</b> : {order.paymentIntent.currency.toUpperCase()}
          </span>
          <br />
          <span className='text-muted mb-4'>
            <b>Payment method</b> :{" "}
            {order.paymentIntent.payment_method_types[0]}
          </span>
          <br />
          <span className='text-muted mb-4'>
            <b>Ordered on</b> :{" "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </span>
        </div>
      ),
      onOk() {},
    });

  //show product int table
  const showOrderDetails = (order) => (
    <div className='table-responsive'>
      <table className='table table-bordered mt-2'>
        <thead className='thead-light '>
          <tr>
            <th className='text-center'>Image</th>
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
                <div
                  style={{
                    height: "auto",
                    width: "100px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}>
                  <ModalImage
                    small={p.product.images[0].url}
                    large={p.product.images[0].url}
                    alt={p.title}
                  />
                </div>
              </td>
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
  );

  //show all orders card
  const showOrders = () =>
    orders.map((order, i) => {
      return (
        <Card
          key={i}
          bordered={true}
          className='mt-5 mb-5 text-center'
          actions={[
            <>
              <InfoCircleOutlined
                className='text-info'
                onClick={() => paymentModal(order)}
              />{" "}
              , Payment Info
            </>,
            <>
              <PDFDownloadLink
                document={<Invoice order={order} />}
                fileName='invoice.pdf'>
                <DownloadOutlined className='text-info' /> , Download PDF
              </PDFDownloadLink>
            </>,
          ]}>
          <Alert
            message={`Order Status  :  ${order.orderStaus.toUpperCase()}`}
            type='warning'
            className='mt-2 mb-2'
          />
          {showOrderDetails(order)}
        </Card>
      );
    });

  return (
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <UserNavbar />
        </div>
        <div className='col-md-10'>
          {orders.length > 0 ? (
            <>
              <h5 className=' mt-1 text-center display-8'>Your Orders</h5>
              <div className='underline'></div>
            </>
          ) : (
            <Result
              title='No Orders Yet'
              extra={
                <Button
                  type='primary'
                  key='shop'
                  onClick={() => history.push("/shop")}>
                  Shop Something
                </Button>
              }
            />
          )}
          {showOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
