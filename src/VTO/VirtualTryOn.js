import { useEffect } from "react";
import PropTypes from "prop-types";
import "./VirtualTryOn.css";
import useVTOWidget from "./useVTOWidget";
/*
  Expected VTO Sub Components:
  - VTORecommendations
  - VTOAddToCart
  - VTOVariations
  - VTOShareSnapshot
*/

const VirtualTryOn = ({
  product,
  checkoutCartURL,
  icons,
  fetchVariationData,
  addToCart,
  userId
}) => {
  const { containerRef, vtoCreateWidget, vtoLoadProduct, vtoSwitchView } =
    useVTOWidget(userId);

  useEffect(() => {
    vtoCreateWidget().then(() => {
      vtoLoadProduct(product.variations[product.index].code);
      vtoSwitchView("tryon");
    });
  }, [vtoCreateWidget, vtoLoadProduct, vtoSwitchView, product]);

  return <div className="vto-widget" ref={containerRef}></div>;
};

VirtualTryOn.propTypes = {
  checkoutCartURL: PropTypes.string.isRequired,
  icons: PropTypes.object.isRequired,
  fetchVariationData: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default VirtualTryOn;
