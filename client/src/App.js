/** @format */
import { LoadingOutlined } from "@ant-design/icons";
import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./Pages/Home"));
const Checkout = lazy(() => import("./Pages/Checkout"));

/* Auth */
const Login = lazy(() => import("./Pages/Auth/Login"));
const Register = lazy(() => import("./Pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));
const UpdatePassword = lazy(() => import("./Pages/Auth/UpdatePassword"));
const CompleteRegister = lazy(() => import("./Pages/Auth/CompleteRegister"));

/* UserRoutes*/
const History = lazy(() => import("./Pages/User/History"));
const Wishlist = lazy(() => import("./Pages/User/WishList"));
const UserRoute = lazy(() => import("./Components/protectedRoutes/UserRoute"));

/*Components*/
const Header = lazy(() => import("./Components/nav/Header"));
const SideCartDrawer = lazy(() => import("./Components/drawer/SideCartDrawer"));

/*Admin */
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const AdminRoute = lazy(() =>
  import("./Components/protectedRoutes/AdminRoute"),
);
const CategoryCreate = lazy(() =>
  import("../src/Pages/Admin/category/CategoryCreate"),
);
const CategoryUpdate = lazy(() =>
  import("../src/Pages/Admin/category/CategoryUpdate"),
);
const SubcategoryCreate = lazy(() =>
  import("../src/Pages/Admin/subcategory/SubcategoryCreate"),
);
const SubcategoryUpdate = lazy(() =>
  import("../src/Pages/Admin/subcategory/SubcategoryUpdate"),
);
const BrandCreate = lazy(() => import("./Pages/Admin/brand/BrandCreate"));
const BrandUpdate = lazy(() => import("./Pages/Admin/brand/BrandUpdate"));
const ProductCreate = lazy(() => import("./Pages/Admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./Pages/Admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./Pages/Admin/product/ProductUpdate"));
const CouponCreate = lazy(() => import("./Pages/Admin/coupon/CouponCreate"));

/* Pages */
const CategoryProductList = lazy(() => import("./Pages/CategoryProductList"));
const SubcategoryProductList = lazy(() =>
  import("./Pages/SubcategoryProductList"),
);
const BrandProductList = lazy(() => import("./Pages/BrandProductList"));
const Product = lazy(() => import("./Pages/Product"));
const Cart = lazy(() => import("./Pages/Cart"));
const Shop = lazy(() => import("./Pages/Shop"));
const Payment = lazy(() => import("./Pages/Payment"));

const NotFound = lazy(() => import("./Components/NotFound"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className='col text-center p-5 mt-5'>
          <LoadingOutlined style={{ fontSize: "100px" }} />
        </div>
      }>
      <Header />
      <SideCartDrawer />
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
        <AdminRoute
          exact
          path='/admin/subcategory'
          component={SubcategoryCreate}
        />
        <AdminRoute
          exact
          path='/admin/subcategory/:slug'
          component={SubcategoryUpdate}
        />
        <AdminRoute exact path='/admin/brand' component={BrandCreate} />
        <AdminRoute exact path='/admin/brand/:slug' component={BrandUpdate} />
        <AdminRoute exact path='/admin/product' component={ProductCreate} />
        <AdminRoute
          exact
          path='/admin/product/:slug'
          component={ProductUpdate}
        />
        <AdminRoute exact path='/admin/products' component={AllProducts} />
        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryProductList} />
        <Route
          exact
          path='/subcategory/:slug'
          component={SubcategoryProductList}
        />
        <Route exact path='/brand/:slug' component={BrandProductList} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />
        <UserRoute exact path='/checkout' component={Checkout} />
        <UserRoute exact path='/payment' component={Payment} />
        <AdminRoute exact path='/admin/coupon' component={CouponCreate} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default App;
