import PropTypes from "prop-types";
import VTOWidget from "./VTOWidget";
import { VTOProvider } from "./VTOContext";

const VirtualTryOn = ({
  product,
  checkoutCartURL,
  icons,
  fetchVariationData,
  addToCart,
  userId,
}) => {
  return (
    <VTOProvider initialVariation={product.index}>
      <VTOWidget
        product={product}
        checkoutCartURL={checkoutCartURL}
        icons={icons}
        fetchVariationData={fetchVariationData}
        addToCart={addToCart}
        userId={userId}
      />
    </VTOProvider>
  );
};

VirtualTryOn.propTypes = {
  checkoutCartURL: PropTypes.string.isRequired,
  icons: PropTypes.object.isRequired,
  fetchVariationData: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default VirtualTryOn;
