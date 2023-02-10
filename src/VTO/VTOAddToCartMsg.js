import { useState } from "react";
import "./VTOAddToCartMsg.css";

const VTOAddToCartMsg = ({ checkoutCartURL, isAddedToCart }) => {
  return (
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
  );
};

export default VTOAddToCartMsg;
