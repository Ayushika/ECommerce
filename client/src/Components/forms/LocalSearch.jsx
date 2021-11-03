/** @format */

import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  return (
    <div className='container pt-4 pb-4'>
      <input
        type='search'
        placeholder='Search'
        className='form-control'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />
    </div>
  );
};

export default LocalSearch;
