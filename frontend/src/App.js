import React,{useState, useEffect} from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import {useDispatch, useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
import axiosInstance from "./api/axiosInstance";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const dispatch = useDispatch();

  async function getStripeApiKey() {
    try {
        const {data} = await axiosInstance.get(
          "/api/v1/stripeapikey",  
        );
        setStripeApiKey(data.stripeApiKey);
        
    } catch (error) {
        console.error('Error fetching Stripe API key:', error.response ? error.response.data : error.message);
    }
  }

  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="contact" element={<Contact />} />
        <Route exact path="about" element={<About />} />
        <Route exact path="search" element={<Search />} />
        <Route exact path="/account" element={<ProtectedRoute component={Profile}/>} />
        <Route exact path="/me/update" element={<ProtectedRoute component={UpdateProfile}/>} />
        <Route exact path="/password/update" element={<ProtectedRoute component={UpdatePassword}/>} />
        <Route exact path="/password/forget" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute component={Shipping}/>} />
        <Route exact path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder}/>} />
        <Route
          exact
          path="/process/payment"
          element={
            <Elements stripe={stripePromise}>
              <ProtectedRoute component={Payment} />
            </Elements>
          }
        />  
        <Route exact path="/success" element={<ProtectedRoute component={OrderSuccess}/>} />
        <Route exact path="/orders" element={<ProtectedRoute component={MyOrders}/>} />
        <Route exact path="/order/:id" element={<ProtectedRoute component={OrderDetails}/>} />
        <Route isAdmin={true} exact path="/admin/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route isAdmin={true} exact path="/admin/products" element={<ProtectedRoute component={ProductList} />} />
        <Route isAdmin={true} exact path="/admin/product" element={<ProtectedRoute component={NewProduct} />} />
        <Route isAdmin={true} exact path="/admin/product/:id" element={<ProtectedRoute component={UpdateProduct} />} />
        <Route isAdmin={true} exact path="/admin/orders" element={<ProtectedRoute component={OrderList} />} />
        <Route isAdmin={true} exact path="/admin/order/:id" element={<ProtectedRoute component={ProcessOrder} />} />
        <Route isAdmin={true} exact path="/admin/users" element={<ProtectedRoute component={UsersList} />} />
        <Route isAdmin={true} exact path="/admin/user/:id" element={<ProtectedRoute component={UpdateUser} />} />
        <Route isAdmin={true} exact path="/admin/reviews" element={<ProtectedRoute component={ProductReviews} />} />
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
       />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


