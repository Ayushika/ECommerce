/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect =
    userInfo && userInfo.isAdmin ? "/admin/dashboard" : "/user/history";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(`Email sent to ${email}`);
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Enter email address'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <button type='submit' className='btn btn-raised my-4'>
          Register
        </button>
      </form>
    );
  };
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
