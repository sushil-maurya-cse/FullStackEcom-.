import React, { useEffect } from "react";
import { CgMouse, CgArrowRight } from "react-icons/cg";
import "./Home.css";
import ProductCard from "../Home/ProductCard.js";
import Metadata from "../layout/Metadata";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error,alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="FullStackEcom." />
          <div className="banner">
            <p>Welcome to FullStackEcom.</p>
            <h1>Find Amazing products at affordable prices</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Our Products</h2>
          <div>
          <button className="all-p" ><a href="/products"> All Products<CgArrowRight/></a></button></div>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
