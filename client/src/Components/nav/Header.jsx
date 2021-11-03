/** @format */

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/userAction";
import {
  AppstoreOutlined,
  UserAddOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    </Menu>
  );
};

export default Header;
