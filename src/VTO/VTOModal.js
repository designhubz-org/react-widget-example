import PropTypes from "prop-types";
import "./VTOModal.css";

const VTOModal = ({ handleClose, show, children, CloseIcon }) => {
  const showHideClassName = show
    ? "vto-modal display-block"
    : "vto-modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="vto-modal-main">
        {children}
        <button
          type="button"
          onClick={handleClose}
          className="vto-modal-closeBtn"
        >
          <CloseIcon />
        </button>
      </section>
    </div>
  );
};

VTOModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  CloseIcon: PropTypes.any.isRequired,
};

export default VTOModal;
