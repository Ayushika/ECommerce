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

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createcategory: createCategoryReducer,
  getAllCategories: getAllCategoriesReducer,
  deleteCategory: deleteCategoryReducer,
  updateCategory: updateCategoryReducer,
  getCategory: getCategoryReducer,
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