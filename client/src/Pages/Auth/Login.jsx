/** @format */

import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin } from "../../Actions/userAction";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, loginSuccess } = userLogin;

  const redirect =
    userInfo && userInfo.isAdmin ? "/admin/dashboard" : "/user/history";

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (userInfo) {
      history.push(redirect);
    }
  }, [error, userInfo, history, redirect, loginSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, history));
  };

  const loginWithGoogle = () => {
    dispatch(googleLogin(history));
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email address'
            autoFocus
          />
        </div>
        <div className='form-group my-4'>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
          />
        </div>
        <Button
          type='primary'
          className='mb-3 '
          block
          shape='round'
          size='large'
          onClick={handleSubmit}
          icon={<MailOutlined />}
          disabled={!email || password.length < 6}>
          Login with email/password
        </Button>
      </form>
    );
  };

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? (
            <>
              <h4 className=' mt-1 text-center display-5'>Loading...</h4>
              <div className='underline'></div>
            </>
          ) : (
            <>
              <h4 className=' mt-1 text-center display-5'>Login</h4>
              <div className='underline'></div>
            </>
          )}
          {loginForm()}
          <Button
            type='danger'
            className='btn mb-3 btn-outline-primary'
            block
            shape='round'
            size='large'
            onClick={loginWithGoogle}
            icon={<GoogleOutlined />}>
            Login with Google
          </Button>
          <Link to='/forgot/password' className='float-right text-primary'>
            Forgot Password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
