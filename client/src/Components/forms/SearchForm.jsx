/** @format */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_QUERY", payload: { text: keyword.trim() } });
    history.push("/shop");
  };

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        type='search'
        placeholder='Search'
        value={keyword}
        className='form-control mr-sm-2'
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default SearchForm;
