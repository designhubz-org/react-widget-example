import PropTypes from "prop-types";
import "./VTOVariations.css";

const VTOVariations = ({ product, loadProduct, isLoading }) => {
  return (
    <>
      <div
        className={`vto-variations-wrapper ${isLoading ? "display-none" : ""}`}
      >
        <ul>
          {product.variations.map((variation, index) => {
            return <li key={index}>{index}</li>;
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
