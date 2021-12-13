import React from "react";
import { Link } from "react-router-dom";
import "@material-ui/core"
import ReactStars from 'react-rating-stars-component'

const ProductCard = ({product}) => {
    const options = {
        edit:false,
        color:"gray",
        size:window.innerWidth < 600 ? 20:25,
        activeColor:"tomato",
        value: product.ratings,
        isHalf:true,
      };

  return (
    <Link className="productCard" to ={`/product/${product._id}`}>
      <img src= {product.images[0].url} alt={product.name} />
      <p> {product.name}</p>
      
      <div>
      <ReactStars {...options} />
        <span className="productCardSpan">
          {`(${product.numOfreview} reviews)`}
        </span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
