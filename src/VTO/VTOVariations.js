import PropTypes from "prop-types";
import { useVTOProvider } from "./VTOContext";
import "./VTOVariations.css";

const VTOVariations = ({ loadProduct }) => {
  // const { currentVariation, setCurrentVariation } = useVTOProvider();
  const { currentProduct, setCurrentProduct } = useVTOProvider();

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
      <div className={"vto-variations-wrapper"}>
        <div className="vto-variations">
          {currentProduct.variations ? (
            currentProduct.variations.map((variation, index) => {
              return (
                <div
                  key={index}
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
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

VTOVariations.propTypes = {
  loadProduct: PropTypes.func.isRequired,
};

export default VTOVariations;
