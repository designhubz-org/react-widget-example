import PropTypes from "prop-types";
import "./VTOAddToCart.css";

const VTOAddToCart = ({ isLoading }) => {
  return (
    <>
      <div className={`vto-add-cart ${isLoading ? "display-none" : ""}`}>
        <div className="vto-product-title">AED 369</div>
        <div className="vto-action-wrapper">
          <button className="vto-btn-add-cart">Add to cart</button>
        </div>
      </div>
    </>
  );
};

VTOAddToCart.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default VTOAddToCart;
