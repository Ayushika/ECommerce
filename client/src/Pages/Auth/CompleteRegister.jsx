/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerComplete } from "../../Actions/userAction";
import { toast } from "react-toastify";
import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";

const CompleteRegister = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect =
    userInfo && userInfo.isAdmin ? "/admin/dashboard" : "/user/history";

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (userInfo) {
      history.push(redirect);
    }
  }, [error, userInfo, history, redirect]);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    dispatch(registerComplete(email, password));
  };

  const completeRegisterForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Enter email address'
          className='form-control'
          value={email}
          disabled
        />
        <input
          type='password'
          placeholder='Enter password'
          className='form-control my-4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <Button
          type='primary'
          className='mb-3'
          block
          shape='round'
          size='large'
          onClick={handleSubmit}
          icon={<MailOutlined />}
          disabled={!email || password.length < 6}>
          Sign Up with email/password
        </Button>
      </form>
    );
  };
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? (
            <h4 className='text-danger'>Loading</h4>
          ) : (
            <h4>Sign Up</h4>
          )}
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default CompleteRegister;
