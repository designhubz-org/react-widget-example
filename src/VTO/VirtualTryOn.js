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


  useEffect(() => {
    vtoCreateWidget().then(() => {
      vtoLoadProduct(product.variations[product.index].code);
      vtoSwitchView("tryon");
      vtoFetchRecommendations().then((result)=> {
        setRecommendedProducts(result);
      })
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

  return (
    <>
      <div className="vto-widget" ref={containerRef}></div>
      <VTORecommendations
        variationData={variationData}
        takeSnapshotIcon={icons.takeSnapShotIcon}
      />
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
