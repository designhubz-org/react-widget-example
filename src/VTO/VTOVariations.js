import PropTypes from "prop-types";
import "./VTOVariations.css";

const VTOVariations = ({ product, loadProduct, isLoading }) => {
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
                    index === product.index ? "active" : ""
                  } `}
                  style={{
                    backgroundColor: variation.hexColor,
                    backgroundImage: `url('${variation.textureUrl}')`,
                  }}
                  onClick={() => loadProduct(variation.code)}
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
