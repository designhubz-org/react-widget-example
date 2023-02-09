import PropTypes from "prop-types";
import { useState } from "react";
import "./VTOAddToCart.css";
import { useVTOProvider } from "./VTOContext";

const VTOAddToCart = ({ checkoutCartURL, addToCart }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  // const { currentVariation } = useVTOProvider();
  const { currentProduct } = useVTOProvider();

  const addToCartHandler = () => {
    addToCart();
    setIsAddedToCart(true);
  };

  return (
    <>
      <div className={"vto-add-cart"}>
        <div className={"vto-cart-action"}>
          {currentProduct.variations && (
            <>
              <div className="vto-product-price">
                {currentProduct.variations[currentProduct.index].currency}{" "}
                {currentProduct.variations[currentProduct.index].price}
              </div>
              <div className="vto-action-wrapper">
                <button className="vto-btn-add-cart" onClick={addToCartHandler}>
                  Add to cart
                </button>
              </div>
            </>
          )}
        </div>
        <div
          className={`vto-msg-wrapper animate__animated animate__bounceIn ${
            isAddedToCart ? "" : "display-none"
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
  checkoutCartURL: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default VTOAddToCart;
