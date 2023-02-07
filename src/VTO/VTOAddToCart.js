import PropTypes from "prop-types";
import { useState } from "react";
import "./VTOAddToCart.css";

const VTOAddToCart = ({ product, checkoutCartURL, addToCart, isLoading }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  console.log("isLoading, isAddedToCart", isLoading, isAddedToCart);
  const addToCartHandler = () => {
    addToCart();
    setIsAddedToCart(true);
  };

  return (
    <>
      <div className={`vto-add-cart ${isLoading ? "display-none" : ""}`}>
        <div className={`vto-cart-action ${isLoading ? "display-none" : ""}`}>
          <div className="vto-product-price">
            {product.variations[0].currency} {product.variations[0].price}
          </div>
          <div className="vto-action-wrapper">
            <button className="vto-btn-add-cart" onClick={addToCartHandler}>
              Add to cart
            </button>
          </div>
        </div>
        <div
          className={`vto-msg-wrapper animate__animated animate__bounceIn ${
            !isLoading && isAddedToCart ? "" : "display-none"
          }`}
        >
          <div className="vto-msg">
            <div className="vto-msg-title">Product added to cart</div>
            <div className="vto-msg-desc">
              You&#39;re AED 10 away from free shipping
            </div>
          </div>
          <div className="vto-link">
            <a href={checkoutCartURL}>View cart</a>
          </div>
        </div>
      </div>
    </>
  );
};

VTOAddToCart.propTypes = {
  product: PropTypes.object.isRequired,
  checkoutCartURL: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default VTOAddToCart;
