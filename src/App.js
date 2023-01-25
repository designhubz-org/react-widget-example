import React, { useState } from "react";
import productImage from "./assets/img/sample-product-image.jpg";
import "./assets/css/App.css";
import { TryOnIcon } from "./assets/icons";
import Modal from "./VTO/Modal.js";
import VirtualTryOn from "./VTO/VirtualTryOn";

const App = () => {
  const [VTOActivated, setVTOActivated] = useState(false);
  const showModal = () => {
    setVTOActivated(true);
  };

  const hideModal = () => {
    setVTOActivated(false);
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
      <Modal show={VTOActivated} handleClose={hideModal}>
        <VirtualTryOn />
      </Modal>
    </div>
  );
};

export default App;
