/** @format */

import React, { useState } from "react";
import { Modal } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { starRatingProductAction } from "../../Actions/productAction";

const RatingModal = ({ starRating, slug, children }) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.userLogin);

  const handleModal = () => {
    if (userInfo && userInfo.token) {
      setShowModal(true);
    } else {
      history.push({ pathname: "/login", state: { from: `/product/${slug}` } });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className='text-warning' style={{ fontSize: "17px" }} />
        <br />
        {userInfo && userInfo.token ? "Leave Rating" : "Login to leave Rating"}
      </div>
      <Modal
        title='Leave Rating'
        visible={showModal}
        centered
        onOk={() => {
          setShowModal(false);
          dispatch(starRatingProductAction(starRating, slug, userInfo.token));
        }}
        onCancel={() => setShowModal(false)}>
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
