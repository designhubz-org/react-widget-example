import PropTypes from "prop-types";
import { useVTOProvider } from "./VTOContext";
import "./VTOVariations.css";

const VTOVariations = ({ product, loadProduct, isLoading }) => {
  const { currentVariation, setCurrentVariation } = useVTOProvider();

  const variationSelectHandler = (variationId, index) => {
    loadProduct(variationId);
    setCurrentVariation(index);
  };

  return (
    <>
      <div
        className={`vto-variations-wrapper ${isLoading ? "display-none" : ""}`}
      >
        <ul className="vto-variations">
          {product.variations.map((variation, index) => {
            return (
              <li key={index}>
                <div
                  className={`variation-item ${
                    index === currentVariation ? "active" : ""
                  } `}
                  style={{
                    backgroundColor: variation.hexColor,
                    backgroundImage: `url('${variation.textureUrl}')`,
                  }}
                  onClick={() => variationSelectHandler(variation.code, index)}
                >
                  {index}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

VTOVariations.propTypes = {
  product: PropTypes.object.isRequired,
  loadProduct: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default VTOVariations;
