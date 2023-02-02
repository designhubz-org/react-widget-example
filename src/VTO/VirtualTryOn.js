import React from "react";
import PropTypes from "prop-types";
import "./VirtualTryOn.css";

/*
  Expected VTO Sub Components:
  - VTORecommendations
  - VTOAddToCart
  - VTOVariations
  - VTOShareSnapshot
*/

const VirtualTryOn = (props) => {
  return <div className="vto-widget"></div>;
};

VirtualTryOn.propTypes = {
  checkoutCartURL: PropTypes.string.isRequired,
  icons: PropTypes.object.isRequired,
  fetchVariationData: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default VirtualTryOn;
