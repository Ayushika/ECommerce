/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandsAction } from "../../../Actions/brandAction";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import { getAllSubCategoriesAction } from "../../../Actions/subCategoryAction";
import { createProductAction } from "../../../Actions/productAction";
import { CREATE_PRODUCT_RESET } from "../../../Constants/productConstant";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCreateForm from "../../../Components/forms/ProductCreateForm";

const initialValues = {
  title: "",
  description: "",
  price: "",
  category: "0",
  subcategories: [],
  brand: "",
  quantity: "",
  images: [],
  shipping: "",
  colors: [
    "Black",
    "Brown",
    "White",
    "Red",
    "Orange",
    "Yellow",
    "Grey",
    "Blue",
    "Silver",
  ],
  color: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialValues);
  const [imageLoading, setImageLoading] = useState(false);
  const { images } = values;

  const dispatch = useDispatch();
  const {
    getAllSubCategories,
    getAllCategories,
    getAllBrands,
    userLogin,
    createProduct,
  } = useSelector((state) => state);

  const { userInfo } = userLogin;
  const { subCategories } = getAllSubCategories;
  const { categories } = getAllCategories;
  const { brands } = getAllBrands;
  const { product, createSuccess, loading } = createProduct;

  useEffect(() => {
    if (createSuccess) {
      window.alert(`"${product.title}" created successfully`);
      window.location.reload();
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [createSuccess, dispatch]);

  useEffect(() => {
    dispatch(getAllSubCategoriesAction());
    dispatch(getAllCategoriesAction());
    dispatch(getAllBrandsAction());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductAction(values, userInfo.token));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNavbar />
        </div>
        <div className='col-md-8'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create Product</h4>
          )}
          <hr />
          <ProductCreateForm
            handleImageRemove={handleImageRemove}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            imageLoading={imageLoading}
            categories={categories}
            subCategories={subCategories}
            brands={brands}
            fileUploadAndResize={fileUploadAndResize}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
