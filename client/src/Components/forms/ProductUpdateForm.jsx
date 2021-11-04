/** @format */

import React from "react";
import { Avatar, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = (props) => {
  const {
    // handleImageRemove,
    handleChange,
    handleSubmit,
    values,
    // imageLoading,
    // categories,
    // subCategories,
    // brands,
    setValues,
    // fileUploadAndResize,
  } = props;

  const {
    title,
    description,
    price,
    category,
    subcategories,
    brand,
    quantity,
    images,
    shipping,
    colors,
    color,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-info'>Title</label>
        <input
          type='text'
          name='title'
          value={title}
          className='form-control'
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label className='text-info'>Description</label>
        <input
          type='text'
          name='description'
          value={description}
          className='form-control'
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label className='text-info'>Price</label>
        <input
          type='number'
          name='price'
          value={price}
          className='form-control'
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label className='text-info'>Shipping</label>
        <select
          value={shipping}
          className='form-control'
          name='shipping'
          onChange={handleChange}>
          <option>Please select shipping</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-info'>Quantity</label>
        <input
          type='number'
          name='quantity'
          value={quantity}
          className='form-control'
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label className='text-info'>Color</label>
        <select
          value={color}
          className='form-control'
          name='color'
          onChange={handleChange}>
          <option>Please select Color</option>
          {colors.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button className='btn btn-info btn-raised my-3' type='submit'>
        Save
      </button>
    </form>
  );
};

export default ProductUpdateForm;
