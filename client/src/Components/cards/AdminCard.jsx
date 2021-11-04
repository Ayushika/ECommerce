/** @format */

import React from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction } from "../../Actions/productAction";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const AdminCard = ({ product }) => {
  const { images, title, description, slug } = product;
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state);
  const { userInfo } = userLogin;

  const removeProduct = (slug) => {
    console.log(slug);
    dispatch(deleteProductAction(slug, userInfo.token));
  };

  return (
    <Card
      cover={
        images && images.length > 0 ? (
          <img
            src={images[0].url}
            style={{ height: "150px", objectFit: "cover" }}
          />
        ) : (
          ""
        )
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className='text-info' />,
        </Link>,
        <DeleteOutlined
          className='text-danger'
          onClick={() => removeProduct(slug)}
        />,
      ]}>
      <Meta
        title={title}
        description={`${description && description.substring(0, 20)}...`}
      />
    </Card>
  );
};

export default AdminCard;
