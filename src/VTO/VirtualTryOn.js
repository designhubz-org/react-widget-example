import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./VirtualTryOn.css";
import useVTOWidget from "./useVTOWidget";
import VTORecommendations from "./VTORecommendations";
import VTOViewSwitch from "./VTOViewSwitch";
import { useVTOProvider } from "./VTOContext";
/*
  Expected VTO Sub Components:
  - VTORecommendations
  - VTOAddToCart
  - VTOVariations
  - VTOShareSnapshot
*/

// const WIDGET_STATUS = {
//   INITIATED: "INITIATED",
//   PRODUCT_LOADED: "PRODUCT_LOADED",
//   RECOMMENDATIONS_FETCHED: "RECOMMENDATIONS_FETCHED",
// };

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
    vtoSetUserId,
    vtoLoadProduct,
    vtoSwitchView,
    vtoTakeSnapshot,
    vtoFetchRecommendations,
  } = useVTOWidget({
    onUserInfoUpdate: (userInfo) => {
      console.log("userInfo:", userInfo);
      vtoFetchRecommendations(10).then((result) => {
        console.log("recommendation result:", result);
        const recommendedProducts = result;
        const variations = fetchVariationData(recommendedProducts);
        setVariationData(variations);
      });
    },
    onTrackingStatusChange: (trackingStatus) => {
      console.log("trackingStatus:", trackingStatus);
    },
  });
  const [variationData, setVariationData] = useState([]);
  // const [tryOnStatus, setTryOnStatus] = useState(null);
  const [currentView, setCurrentView] = useState("tryon");
  const [, setSnapshotPreview] = useState(false);
  const { widgetStatus, setWidgetStatus } = useVTOProvider();

  console.log("widgetStatus:", widgetStatus);

  useEffect(() => {
    vtoCreateWidget().then(() => {
      setWidgetStatus("INITIATED");
      vtoSetUserId(userId);
      vtoLoadProduct(product.variations[product.index].code);
      vtoSwitchView("tryon");
    });
  }, [
    userId,
    vtoCreateWidget,
    vtoSetUserId,
    vtoLoadProduct,
    vtoSwitchView,
    product,
    setWidgetStatus,
  ]);

  const switchView = (view) => {
    vtoSwitchView(view);
    setCurrentView(view);
  };

  const takeSnapshot = () => {
    vtoTakeSnapshot().then((snapshot) => {
      console.log("taken snapshot:", snapshot);
      setSnapshotPreview(true);
    });
  };

  const loadProduct = (productId) => {
    vtoLoadProduct(productId);
  };

  return (
    <>
      <div className="vto-widget" ref={containerRef}>
        <VTORecommendations
          variationData={variationData}
          takeSnapshotIcon={icons.takeSnapShotIcon}
          takeSnapshot={takeSnapshot}
          loadProduct={loadProduct}
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
