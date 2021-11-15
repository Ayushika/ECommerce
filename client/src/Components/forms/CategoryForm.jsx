/** @format */

import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='text-muted mt-3'>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <button type='submit' className='btn btn-outline-primary my-3'>
          Create
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
