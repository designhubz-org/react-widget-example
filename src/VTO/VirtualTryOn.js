//import * as Designhubz from 'designhubz-widget'
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
  return <div className="widget">Widget</div>;
};

VirtualTryOn.propTypes = {
  checkoutCartURL: PropTypes.string.isRequired,
  icons: PropTypes.object.isRequired,
  fetchVariationData: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default VirtualTryOn;
