/** @format */
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/User/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import CompleteRegister from "./Pages/Auth/CompleteRegister";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Header from "./Components/nav/Header";
import History from "./Pages/User/History";
import Wishlist from "./Pages/User/WishList";
import UserRoute from "./Components/protectedRoutes/UserRoute";
import AdminRoute from "./Components/protectedRoutes/AdminRoute";
import CategoryCreate from "../src/Pages/Admin/category/CategoryCreate";
import CategoryUpdate from "../src/Pages/Admin/category/CategoryUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={CompleteRegister} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <UserRoute
          exact
          path='/user/update/password'
          component={UpdatePassword}
        />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={CategoryCreate} />
        <AdminRoute
          exact
          path='/admin/category/:slug'
          component={CategoryUpdate}
        />
      </Switch>
    </>
  );
};

export default App;