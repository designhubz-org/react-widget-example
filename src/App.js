import React, { useState } from "react";
import productImage from "./assets/img/sample-product-image.jpg";
import "./assets/css/App.css";
import {
  TryOnIcon,
  CloseIcon,
  ARIcon,
  ThreeDIcon,
  TakeSnapshotIcon,
} from "./assets/icons";
import Modal from "./VTO/VTOModal.js";
import VirtualTryOn from "./VTO/VirtualTryOn";
import { currentProduct, variationData } from "./mockData";

const App = () => {
  const [VTOActivated, setVTOActivated] = useState(false);
  const baseURL = "https://d14q52nrvkfszh.cloudfront.net/";
  const checkoutCartURL = `${baseURL}checkout/cart`;
  const userId = "1234";
  const VTOIcons = {
    threeDSwitchIcon: ThreeDIcon,
    ARSwitchIcon: ARIcon,
    takeSnapShotIcon: TakeSnapshotIcon,
  };

  const showModal = () => {
    setVTOActivated(true);
  };
  const hideModal = () => {
    setVTOActivated(false);
  };

  const fetchVariationData = async (variationCodes) => {
    //return variationData;
    // Current Eyewa: POST https://bff.eyewa.com/v1/catalog/ae-en/productList - Requires Bearer Token
    if (!variationCodes) return [];
    const response = await fetch(
      `https://prod-prd-gateway-api.designhubz.com/workspace/eyewear/variation/?&collectProductDetails=true&referenceIds=${variationCodes}`,
      {
        method: "GET",
        headers: {
          Authorization: "38cff8acaa7d457a935b5db01ca4e22d",
          orgid: "23049412",
        },
      }
    );
    const variationsData = await response.json();
    const variationArray = [];
    variationsData.data.forEach(function (item) {
      const variation = {
        code: item.referenceId,
        hexColor: item.colorHex,
        price: 369,
        currency: "AED",
        thumbnailUrl: item.thumbnailUrl,
        name: item.product.name,
        textureUrl: "",
        pdpUrl:
          "https://eyewa.com/ae-en/30sundays-valiant-000241-1201-sunglasses.html",
      };
      variationArray.push({
        index: 0,
        variations: [variation],
      });
    });

    return variationArray;
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
      <Modal show={VTOActivated} handleClose={hideModal} CloseIcon={CloseIcon}>
        <VirtualTryOn
          product={currentProduct}
          userId={userId}
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
