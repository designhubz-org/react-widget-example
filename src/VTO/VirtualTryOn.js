import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./VirtualTryOn.css";
import useVTOWidget from "./useVTOWidget";
import VTORecommendations from "./VTORecommendations";
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

  useEffect(() => {
    vtoCreateWidget().then(() => {
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
  ]);

  return (
    <>
      <div className="vto-widget" ref={containerRef}>
        <VTORecommendations
          variationData={variationData}
          takeSnapshotIcon={icons.takeSnapShotIcon}
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
