/** @format */

import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../Components/nav/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../../../Actions/categoryAction";
import CategoryForm from "../../../Components/forms/CategoryForm";
import {
  updateBrandAction,
  getBrandAction,
} from "../../../Actions/brandAction";
import {
  UPDATE_BRAND_RESET,
  GET_BRAND_RESET,
} from "../../../Constants/brandConstant";

const BrandUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const slug = match.params.slug;

  const dispatch = useDispatch();

  const { getAllCategories, getBrand, userLogin, updateBrand } = useSelector(
    (state) => state,
  );

  const { userInfo } = userLogin;
  const { categories } = getAllCategories;
  const { brand } = getBrand;
  const { updateSuccess, loading } = updateBrand;

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_BRAND_RESET });
      dispatch({ type: GET_BRAND_RESET });
      history.push("/admin/brand");
    } else if (!brand.name || !brand.category || brand.slug !== slug) {
      dispatch(getBrandAction(slug));
    } else {
      setName(brand.name);
      setCategory(brand.category);
    }
  }, [updateSuccess, brand, dispatch, history, slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBrandAction(name, category, slug, userInfo.token));
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
            <h4 className='text-primary'>Update Brand</h4>
          )}

          <div className='form-group'>
            <label>Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                    selected={c._id === brand.category}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandUpdate;
