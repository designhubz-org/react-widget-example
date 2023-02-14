import PropTypes from "prop-types";
import { VTOEywaIcon } from "./VTOEywaIcon";
import "./VTOPreloader.css";

const VTOPreloader = ({ isFirstLoading, isLoadingProduct }) => {
  return (
    <>
      <div className={"vto-loader"}>
        {isFirstLoading && (
          <div className="vto-splash-container">
            <div className="vto-splash-loader">
              <div>
                <VTOEywaIcon className={""} />
              </div>
              <p>Virtual experience is loading...</p>
              <div className="vto-progress-wrapper"></div>
              <div className="vto-blur-text">
                We are committed to protecting your privacy. We use the
                information provided to personalise your experience and not
                store any data
              </div>
            </div>
          </div>
        )}
        {isLoadingProduct && (
          <div className="vto-product-loader">
            <div className="vto-loading-anim"></div>
          </div>
        )}
      </div>
    </>
  );
};

VTOPreloader.propTypes = {
  isFirstLoading: PropTypes.bool.isRequired,
  isLoadingProduct: PropTypes.bool.isRequired,
};

export default VTOPreloader;
