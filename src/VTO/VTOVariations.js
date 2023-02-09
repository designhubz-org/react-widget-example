import PropTypes from "prop-types";
import { useVTOProvider } from "./VTOContext";
import "./VTOVariations.css";

const VTOVariations = ({ loadProduct, isLoading }) => {
  // const { currentVariation, setCurrentVariation } = useVTOProvider();
  const { currentProduct, setCurrentProduct } = useVTOProvider();

  console.log("currentProduct:", currentProduct);

  const variationSelectHandler = (variationId, index) => {
    loadProduct(variationId);
    // setCurrentVariation(index);
    setCurrentProduct((prevState) => {
      return {
        ...prevState,
        index,
      };
    });
  };

  return (
    <>
      <div
        className={`vto-variations-wrapper ${isLoading ? "display-none" : ""}`}
      >
        <ul className="vto-variations">
          {currentProduct.variations.map((variation, index) => {
            return (
              <li key={index}>
                <div
                  className={`variation-item ${
                    index === currentProduct.index ? "active" : ""
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
  loadProduct: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default VTOVariations;
