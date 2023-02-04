import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./VirtualTryOn.css";
import useVTOWidget from "./useVTOWidget";
import VTORecommendations from "./VTORecommendations";
import VTOViewSwitch from "./VTOViewSwitch";
/*
  Expected VTO Sub Components:
  - VTORecommendations
  - VTOAddToCart
  - VTOVariations
  - VTOShareSnapshot
*/
const WIDGET_STATUS = {
  INITIATED: "INITIATED",
  PRODUCT_LOADED: "PRODUCT_LOADED",
  RECOMMENDATIONS_FETCHED: "RECOMMENDATIONS_FETCHED",
};

const VirtualTryOn = ({
  product,
  checkoutCartURL,
  icons,
  fetchVariationData,
  addToCart,
  userId,
}) => {
  const {
    containerRef,
    vtoCreateWidget,
    vtoLoadProduct,
    vtoSwitchView,
    vtoFetchRecommendations,
  } = useVTOWidget(userId);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [variationData, setVariationData] = useState([]);
  const [tryOnStatus, setTryOnStatus] = useState(null);
  const [currentView, setCurrentView] = useState("tryon");

  useEffect(() => {
    vtoCreateWidget().then(() => {
      vtoLoadProduct(product.variations[product.index].code);
      vtoSwitchView("tryon");
      vtoFetchRecommendations().then((result) => {
        setRecommendedProducts(result);
      });
    });
  }, [
    vtoCreateWidget,
    vtoLoadProduct,
    vtoSwitchView,
    vtoFetchRecommendations,
    product,
  ]);

  useEffect(() => {
    if (recommendedProducts.length > 0) {
      setVariationData(fetchVariationData(recommendedProducts));
    }
  }, [recommendedProducts]);

  const switchView = (view) => {
    vtoSwitchView(view);
    setCurrentView(view);
  };

  return (
    <>
      <div className="vto-widget" ref={containerRef}>
        <VTORecommendations
          variationData={variationData}
          takeSnapshotIcon={icons.takeSnapShotIcon}
        />
        <VTOViewSwitch
          switchView={switchView}
          currentView={currentView}
          ThreeDSwitchIcon={icons.threeDSwitchIcon}
          ARSwitchIcon={icons.ARSwitchIcon}
        />
      </div>
    </>
  );
};

VirtualTryOn.propTypes = {
  checkoutCartURL: PropTypes.string.isRequired,
  icons: PropTypes.object.isRequired,
  fetchVariationData: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default VirtualTryOn;
