/** @format */

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Badge, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/userAction";
import { getAllCategoriesAction } from "../../Actions/categoryAction";
import { getAllSubCategoriesAction } from "../../Actions/subCategoryAction";
import { getAllBrandsAction } from "../../Actions/brandAction";
import SearchForm from "../forms/SearchForm";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    userLogin,
    getAllCategories,
    getAllSubCategories,
    getAllBrands,
    cart,
  } = useSelector((state) => state);

  const { userInfo } = userLogin;
  const { categories } = getAllCategories;
  const { subCategories } = getAllSubCategories;
  const { brands } = getAllBrands;

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllSubCategoriesAction());
    dispatch(getAllBrandsAction());
  }, [dispatch]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>
      <SubMenu icon={<DownCircleOutlined />} title='Items' key='items'>
        <SubMenu key='category' title='Categories'>
          {categories &&
            categories.length > 0 &&
            categories.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/category/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
        <SubMenu key='subcategory' title='Subcategories'>
          {subCategories &&
            subCategories.length > 0 &&
            subCategories.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/subcategory/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
        <SubMenu key='brand' title='Brands'>
          {brands &&
            brands.length > 0 &&
            brands.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/brand/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
      </SubMenu>
      <Item key='shop' icon={<ShoppingOutlined />}>
        <Link to='/shop'>Shop</Link>
      </Item>
      <Item key='cart' icon={<ShoppingCartOutlined />}>
        <Link to='/cart'>
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>
      {userInfo ? (
        <SubMenu
          key='SubMenu'
          icon={<SettingOutlined />}
          title={userInfo.name}
          className='float-right'>
          {userInfo && userInfo.isAdmin ? (
            <Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          ) : (
            <Item>
              <Link to='/user/history'>Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logoutHandler}>
            Logout
          </Item>
        </SubMenu>
      ) : (
        <>
          <Item
            key='register'
            icon={<UserAddOutlined />}
            className='float-right'>
            <Link to='/register'>Register</Link>
          </Item>
          <Item key='login' icon={<UserOutlined />} className='float-right'>
            <Link to='/login'>Login</Link>
          </Item>
        </>
      )}
      <span className='float-right p-1'>
        <SearchForm />
      </span>
    </Menu>
  );
};

export default Header;
