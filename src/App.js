import React, { useState } from "react";
import productImage from "./assets/img/sample-product-image.jpg";
import "./assets/css/App.css";
import { TryOnIcon, CloseIcon } from "./assets/icons";
import Modal from "./VTO/Modal.js";
import VirtualTryOn from "./VTO/VirtualTryOn";
import { currentProduct, variationData } from "./mockData";

const App = () => {
  const [VTOActivated, setVTOActivated] = useState(false);
  const baseURL = "https://d14q52nrvkfszh.cloudfront.net/";
  const checkoutCartURL = `${baseURL}checkout/cart`;
  const VTOIcons = {
    switchIcon: "",
    takeSnapShotIcon: "",
  };

  const showModal = () => {
    setVTOActivated(true);
  };
  const hideModal = () => {
    setVTOActivated(false);
  };
  const fetchVariationData = (variationCodes) => {
    // Current Eyewa: POST https://bff.eyewa.com/v1/catalog/ae-en/productList - Requires Bearer Token
    return variationData;
  };
  const addToCart = (variation) => {
    console.log(variation, "added to cart");
  };

  return (
    <div className="App">
      <div className="sample-product">
        <img src={productImage} />
        <div className="try-on-button" onClick={showModal}>
          <TryOnIcon />
          Try On
        </div>
      </div>
      <Modal show={VTOActivated} handleClose={hideModal} closeIcon={CloseIcon}>
        <VirtualTryOn
          product={currentProduct}
          checkoutCartURL={checkoutCartURL}
          icons={VTOIcons}
          fetchVariationData={fetchVariationData}
          addToCart={addToCart}
        />
      </Modal>
    </div>
  );
};

export default App;
