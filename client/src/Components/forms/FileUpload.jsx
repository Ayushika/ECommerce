/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { Avatar, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";

const FileUpload = ({ values, setValues }) => {
  const { images } = values;

  const [imageLoading, setImageLoading] = useState(false);
  const { userLogin } = useSelector((state) => state);

  const { userInfo } = userLogin;

  const handleImageRemove = (public_id) => {
    setImageLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };
    axios
      .post(
        "http://localhost:5000/api/cloudinary/removeimage",
        { public_id },
        config,
      )
      .then(() => {
        setImageLoading(false);
        const updatedImages = images.filter(
          (item) => item.public_id !== public_id,
        );
        setValues({ ...values, images: updatedImages });
      })
      .catch(() => {
        setImageLoading(false);
        toast.error("Error while deleting image");
      });
  };

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    setImageLoading(true);
    const allUploadedFiles = images;
    if (files) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo.token,
        },
      };
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                "http://localhost:5000/api/cloudinary/uploadimages",
                { image: uri },
                config,
              )
              .then((res) => {
                setImageLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, image: allUploadedFiles });
              })
              .catch((error) => {
                setImageLoading(false);
                console.log(error);
                toast.error("Upload failed");
              });
          },
          "base64",
        );
      }
    }
  };
  return (
    <>
      {imageLoading ? (
        <LoadingOutlined />
      ) : (
        images.length > 0 &&
        images.map((item) => (
          <Badge
            key={item.public_id}
            count={"X"}
            style={{ cursor: "pointer" }}
            onClick={() => handleImageRemove(item.public_id)}>
            <Avatar size={100} shape='square' src={item.url} className='ml-3' />
          </Badge>
        ))
      )}

      <div className='form-group'>
        <label className='btn btn-info btn-raised my-2'>
          Upload Image
          <input
            type='file'
            multiple
            hidden
            accept='images/*'
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
