/** @format */

import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    values,
    setValues,
    subCategories,
    categories,
    brands,
    setArrayOfSubs,
    arrayOfSubs,
  } = props;

  const {
    title,
    description,
    price,
    category,
    brand,
    quantity,
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
      <div className='form-group'>
        <label className='text-info'>Category</label>
        <select
          className='form-control'
          name='category'
          onChange={(e) => {
            setValues({
              ...values,
              category: { _id: e.target.value },
              brand: "",
              subcategories: [],
            });
            setArrayOfSubs([]);
          }}>
          {category ? (
            <option>{category.name}</option>
          ) : (
            <option value={0}>Please select Category</option>
          )}
          {categories.length > 0 &&
            categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {category !== "0" && (
        <>
          <div className='form-group'>
            <label className='text-info'>SubCategory</label>
            <Select
              value={arrayOfSubs}
              className='form-control'
              mode='multiple'
              style={{ width: "100%" }}
              placeholder='Please select'
              onChange={(v) => setArrayOfSubs(v)}>
              {subCategories
                .filter((c) => c.category === category._id)
                .map((c) => (
                  <Option value={c._id} key={c._id}>
                    {c.name}
                  </Option>
                ))}
            </Select>
          </div>
          <div className='form-group'>
            <label className='text-info'>Brand</label>
            <select
              className='form-control'
              name='brand'
              onChange={(e) =>
                setValues({ ...values, brand: { _id: e.target.value } })
              }>
              {brand ? (
                <option>{brand.name}</option>
              ) : (
                <option> Please select brand</option>
              )}
              {brands
                .filter((c) => c.category === category._id)
                .map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </>
      )}

      <button className='btn btn-info btn-raised my-3' type='submit'>
        Save
      </button>
    </form>
  );
};

export default ProductUpdateForm;
