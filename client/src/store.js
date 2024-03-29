/** @format */

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./Reducers/userReducer";
import {
  createCategoryReducer,
  getAllCategoriesReducer,
  deleteCategoryReducer,
  updateCategoryReducer,
  getCategoryReducer,
} from "./Reducers/categoryReducer";
import {
  createSubCategoryReducer,
  deleteSubCategoryReducer,
  getAllSubCategoriesReducer,
  getSubCategoryReducer,
  updateSubCategoryReducer,
} from "./Reducers/subCategoryReducer";
import {
  createBrandReducer,
  getAllBrandsReducer,
  deleteBrandReducer,
  updateBrandReducer,
  getBrandReducer,
} from "./Reducers/brandReducer";
import {
  createProductReducer,
  deleteProductReducer,
  getProductReducer,
  updateProductReducer,
  starRatingProductReducer,
  getProductsByFilterReducer,
} from "./Reducers/productReducer";
import { searchReducer } from "./Reducers/searchReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { drawerReducer } from "./Reducers/drawerReducer";
import { couponReducer } from "./Reducers/couponReducer";
import { cashOrderReducer } from "./Reducers/cashOrder";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createcategory: createCategoryReducer,
  getAllCategories: getAllCategoriesReducer,
  deleteCategory: deleteCategoryReducer,
  updateCategory: updateCategoryReducer,
  getCategory: getCategoryReducer,
  createSubCategory: createSubCategoryReducer,
  getAllSubCategories: getAllSubCategoriesReducer,
  getSubCategory: getSubCategoryReducer,
  deleteSubCategory: deleteSubCategoryReducer,
  updateSubCategory: updateSubCategoryReducer,
  createBrand: createBrandReducer,
  getAllBrands: getAllBrandsReducer,
  getBrand: getBrandReducer,
  deleteBrand: deleteBrandReducer,
  updateBrand: updateBrandReducer,
  createProduct: createProductReducer,
  deleteProduct: deleteProductReducer,
  getProduct: getProductReducer,
  updateProduct: updateProductReducer,
  starRatingProduct: starRatingProductReducer,
  getProductsByFilter: getProductsByFilterReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  cashOrder :cashOrderReducer
});

const userInfoFromStorage = window.localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
