import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header.js";
import WebFont from "webfontloader";
import React, { useEffect } from "react";
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
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/products/" element={<Products />} />
      </Routes>
      <Routes>
        <Route path="/products/:keyword/" element={<Products />} />
      </Routes>
      <Routes>
        <Route path="/product/:id/" element={<ProductDetails />} />
      </Routes>
      <Routes>
        <Route path="/search/" element={<Search />} />
      </Routes>
      <Routes>
        <Route path="/login/" element={<LoginSignUp />} />
      </Routes>
      <Routes>
        <Route path="/account/" element={  <ProtectedRoute><Profile /></ProtectedRoute> }/>
      </Routes>
      <Routes>
        <Route path="/me/update/" element={ <ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
      </Routes>
      <Routes>
        <Route path="/password/update/" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
      </Routes>
      <Routes>
        <Route exact path="/password/forgot/" element={<ForgotPassword />} />
      </Routes>
      <Routes>
        <Route exact path="/reset-password/:token/" element={<ResetPassword />} />
      </Routes>
      <Routes>
        <Route exact path="/cart/" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
