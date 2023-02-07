import PropTypes from "prop-types";
import { VTOEywaIcon } from "./VTOEywaIcon";
import "./VTOPreloader.css";

const VTOPreloader = ({ progress, isLoading }) => {
  return (
    <>
      <div className={`vto-loader ${isLoading ? "" : "display-none"}`}>
        <div className="vto-splash-loader">
          <div>
            <VTOEywaIcon className={""} />
          </div>
          <p>Virtual experience is loading...</p>
          <div className="vto-progress-wrapper"></div>
          <div className="vto-blur-text">
            We are committed to protecting your privacy. We use the information
            provided to personalise your experience and not store any data
          </div>
        </div>
      </div>
    </>
  );
};

VTOPreloader.propTypes = {
  progress: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
};

export default VTOPreloader;
