import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductsDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartActions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert= useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors());
    }
    dispatch(getProductsDetails(params.id));
  }, [dispatch, params.id,alert,error]);

  let rating = product.ratings;
  const options = {
    edit: false,
    color: "gray",
    size: window.innerWidth < 600 ? 20 : 25,
    activeColor: "tomato",
    value: rating,
    isHalf: true,
  };
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addtocartHandler = ()=>{
    dispatch(addItemsToCart(params.id,quantity));
    alert.success("Item Added to Cart Successfuly")
     
  }

  return (
    <>
    {loading ?<Loader />:(<Fragment>
      <div className="productDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img src={item.url} className="carouselImage" key={i} alt={i} />
              ))}
          </Carousel>
        </div>

        <div>
          {/* Product name and Id Section */}
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          {/* Rating Section */}
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span className="detailsBlock-2-span">
              ({`${product.numOfreview} Reviews)`}
            </span>
          </div>
          {/* Price and Add to cart section  */}
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button onClick={addtocartHandler} disabled={product.stock < 1 ? true : false}>
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "Out of Stock" : "In stock ("+ product.stock+") left"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>

      {product.review && product.review[0] ? (
            <div className="reviews">
              {product.review &&
                product.review.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          </Fragment>)}
    </>
  );
};

export default ProductDetails;
