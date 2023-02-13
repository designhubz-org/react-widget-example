import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./VirtualTryOn.css";
import useVTOWidget from "./useVTOWidget";
import VTORecommendations from "./VTORecommendations";
import VTOViewSwitch from "./VTOViewSwitch";
import { useVTOProvider } from "./VTOContext";
import VTOPreloader from "./VTOPreloader";
import VTOAddToCart from "./VTOAddToCart";
import VTOVariations from "./VTOVariations";
import VTOSnapshotPreview from "./VTOSnapshotPreview";

const VTOWidget = ({
  checkoutCartURL,
  icons,
  fetchVariationData,
  addToCart,
  userId,
}) => {
  const {
    currentProduct,
    setTrackingStatus,
    setSnapshotData,
    snapshotPreview,
    setSnapshotPreview,
  } = useVTOProvider();
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
      vtoFetchRecommendations(10).then((result) => {
        const recommendedProducts = result;
        fetchVariationData(recommendedProducts).then((variations) => {
          setVariationData(variations);
        });
      });
    },
    onTrackingStatusChange: (trackingStatus) => {
      setTrackingStatus(trackingStatus);
      if (trackingStatus === "Tracking") {
        setIsFirstTracking(true);
      }
    },
  });
  const [variationData, setVariationData] = useState([]);
  const [currentView, setCurrentView] = useState("tryon");
  const { widgetStatus, setWidgetStatus } = useVTOProvider();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isFirstTracking, setIsFirstTracking] = useState(false);

  useEffect(() => {
    if (widgetStatus === "NOT_READY") {
      vtoCreateWidget().then(() => {
        setWidgetStatus("INITIATED");
        vtoSetUserId(userId);
        vtoLoadProduct(
          currentProduct.variations[currentProduct.index].code,
          (progress) => {
            if (progress >= 1) {
              setTimeout(() => setIsFirstLoading(false), 2000);
            }
          }
        );
        vtoSwitchView("tryon");
      });
    }
  }, [
    userId,
    widgetStatus,
    vtoCreateWidget,
    vtoSetUserId,
    vtoLoadProduct,
    vtoSwitchView,
    setWidgetStatus,
    currentProduct,
  ]);

  const switchView = (view) => {
    vtoSwitchView(view);
    setCurrentView(view);
  };

  const takeSnapshot = () => {
    vtoTakeSnapshot().then((snapshot) => {
      const imgData = snapshot.getDataURL();
      setSnapshotData(imgData);
      setSnapshotPreview(true);
    });
  };

  const loadProduct = (productId) => {
    setIsLoadingProduct(true);
    vtoLoadProduct(productId, (progress) => {
      if (progress >= 1) {
        setTimeout(() => setIsLoadingProduct(false), 1000);
      }
    });
  };

  return (
    <div className="vto-widget-wrapper">
      <div className="vto-widget" ref={containerRef}></div>
      {(isFirstLoading || isLoadingProduct) && (
        <VTOPreloader
          isFirstLoading={isFirstLoading}
          isLoadingProduct={isLoadingProduct}
        />
      )}
      {!isFirstLoading && isFirstTracking && (
        <>
          <div className="vto-product-title">{currentProduct.name}</div>
          <VTOAddToCart
            checkoutCartURL={checkoutCartURL}
            addToCart={addToCart}
          />
          <VTOVariations loadProduct={loadProduct} />
          <VTORecommendations
            variationData={variationData}
            takeSnapshotIcon={icons.takeSnapShotIcon}
            takeSnapshot={takeSnapshot}
            loadProduct={loadProduct}
            view={currentView}
          />
          <VTOViewSwitch
            switchView={switchView}
            currentView={currentView}
            ThreeDSwitchIcon={icons.threeDSwitchIcon}
            ARSwitchIcon={icons.ARSwitchIcon}
          />
        </>
      )}
      {!isFirstLoading && snapshotPreview && <VTOSnapshotPreview />}
    </div>
  );
};

VTOWidget.propTypes = {
  checkoutCartURL: PropTypes.string.isRequired,
  icons: PropTypes.object.isRequired,
  fetchVariationData: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default VTOWidget;
