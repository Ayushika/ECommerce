/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserNavbar from "../../Components/nav/UserNavbar";
import AdminNavbar from "../../Components/nav/AdminNavbar";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password Updated");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='password'
            value={password}
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            disabled={loading}
          />
          <button
            type='submit'
            onClick={handleSubmit}
            className='btn btn-primary btn-raised my-3'
            disabled={loading || password.length < 6}>
            Update Password
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          {userInfo && userInfo.isAdmin ? <AdminNavbar /> : <UserNavbar />}
        </div>
        <div className='col-md-6 offset-md-2'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Password</h4>
          )}

          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
