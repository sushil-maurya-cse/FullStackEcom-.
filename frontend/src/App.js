import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header.js";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Products/ProductDetails";
import Search from "./components/Products/Search.js";
import Products from "./components/Products/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/UserOptions/UserOptions";
import Profile from "./components/layout/UserOptions/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Shipping/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment";
import axios from "axios";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import OrderSuccess from "./components/Cart/OrderSuccess";
import Order from "./components/Order/Order.js";
import OrderDetails from "./components/Order/OrderDetails";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const stripePromise= loadStripe('pk_test_51JQGGmSFrhHe8BspTodIAILWDeBgYnxCcJdq6eGWLIZXuRTIlLmoaIbKFuwyvgst3lSV20xd2IZKe1GsPrUtMAY600e6iPGNH5')
   
  async function getStripeApiKey() {
    const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
  };
    const { data } = await axios.get("/api/v1/stripeapikey",config);

    setStripeApiKey(data.stripeApiKey);
  }
  

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="products/" element={<Products />} />
      </Routes>
      <Routes>
        <Route path="products/:keyword/" element={<Products />} />
      </Routes>
      <Routes>
        <Route path="product/:id/" element={<ProductDetails />} />
      </Routes>
      <Routes>
        <Route path="search/" element={<Search />} />
      </Routes>
      <Routes>
        <Route path="login/" element={<LoginSignUp />} />
      </Routes>
      <Routes>
        <Route path="account/" element={  <ProtectedRoute><Profile /></ProtectedRoute> }/>
      </Routes>
      <Routes>
        <Route path="me/update/" element={ <ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
      </Routes>
      <Routes>
        <Route path="password/update/" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
      </Routes>
      <Routes>
        <Route exact path="password/forgot/" element={<ForgotPassword />} />
      </Routes>
      <Routes>
        <Route exact path="reset-password/:token/" element={<ResetPassword />} />
      </Routes>
      <Routes>
        <Route exact path="cart/" element={<Cart />} />
      </Routes>
      <Routes>
        <Route path="login/shipping/" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
      </Routes>
      <Routes>
        <Route path="order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
      </Routes>
      <Routes>
        <Route path="success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      </Routes>
      <Elements stripe={stripePromise}>
      <Routes>
        <Route path="process/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      </Routes>
      </Elements>
      <Routes>
        <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
      </Routes>
      <Routes>
        <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
