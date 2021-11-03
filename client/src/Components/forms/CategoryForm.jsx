/** @format */

import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <button type='submit' className='btn btn-raised btn-primary my-3'>
          Create
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
