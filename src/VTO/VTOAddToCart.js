import PropTypes from "prop-types";
import React, { useState } from "react";
import "./VTOAddToCart.css";
import "./VTOAddToCart.css";
import { useVTOProvider } from "./VTOContext";
const VTOAddToCartMsg = React.lazy(() => import("./VTOAddToCartMsg"));

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
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </div>
        <React.Suspense fallback={<></>}>
          {isAddedToCart && (
            <VTOAddToCartMsg
              checkoutCartURL={checkoutCartURL}
              isAddedToCart={isAddedToCart}
            />
          )}
        </React.Suspense>
      </div>
    </>
  );
};

VTOAddToCart.propTypes = {
  checkoutCartURL: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default VTOAddToCart;
