import PropTypes from "prop-types";
import "./VTOPreloader.css";

const VTOPreloader = ({ progress, isLoading }) => {
  return (
    <>
      <div className={`vto-loader ${isLoading ? "" : "display-none"}`}>
        Progress... {progress}
      </div>
    </>
  );
};

VTOPreloader.propTypes = {
  loadingHandler: PropTypes.func.isRequired,
};

export default VTOPreloader;
