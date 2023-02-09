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

const VTOWidget = ({
  checkoutCartURL,
  icons,
  fetchVariationData,
  addToCart,
  userId,
}) => {
  const { currentProduct, setTrackingStatus } = useVTOProvider();
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
        fetchVariationData(recommendedProducts).then((variations) => {
          setVariationData(variations);
        });
      });
    },
    onTrackingStatusChange: (trackingStatus) => {
      console.log("trackingStatus:", trackingStatus);
      setTrackingStatus(trackingStatus);
    },
  });
  const [variationData, setVariationData] = useState([]);
  const [currentView, setCurrentView] = useState("tryon");
  const [, setSnapshotPreview] = useState(false);
  const { widgetStatus, setWidgetStatus } = useVTOProvider();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  console.log("widgetStatus:", widgetStatus);
  const loadingHandler = (progress) => {
    console.log("progress:", progress);
    setLoadingProgress(progress);
    if (progress >= 1) {
      setTimeout(() => setIsLoadingProduct(false), 2000);
    }
  };

  useEffect(() => {
    if (widgetStatus === "NOT_READY") {
      vtoCreateWidget().then(() => {
        setWidgetStatus("INITIATED");
        vtoSetUserId(userId);
        vtoLoadProduct(
          currentProduct.variations[currentProduct.index].code,
          loadingHandler
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
      console.log("taken snapshot:", snapshot);
      setSnapshotPreview(true);
    });
  };

  const loadProduct = (productId) => {
    // setIsLoading(true);
    vtoLoadProduct(productId, loadingHandler);
  };

  return (
    <div className="vto-widget-wrapper">
      <div className="vto-widget" ref={containerRef}></div>
      <VTOPreloader progress={loadingProgress} isLoading={isLoadingProduct} />
      <VTOAddToCart
        checkoutCartURL={checkoutCartURL}
        addToCart={addToCart}
        isLoading={isLoadingProduct}
      />
      <VTOVariations loadProduct={loadProduct} isLoading={isLoadingProduct} />
      <VTORecommendations
        variationData={variationData}
        takeSnapshotIcon={icons.takeSnapShotIcon}
        takeSnapshot={takeSnapshot}
        loadProduct={loadProduct}
        isLoading={isLoadingProduct}
      />
      <VTOViewSwitch
        switchView={switchView}
        currentView={currentView}
        ThreeDSwitchIcon={icons.threeDSwitchIcon}
        ARSwitchIcon={icons.ARSwitchIcon}
      />
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
