import PropTypes from 'prop-types';
import './Modal.css';
const Modal = ({ handleClose, show, children, closeIcon}) => {
    const showHideClassName = show ? "vto-modal display-block" : "vto-modal display-none";
    const CloseIcon = closeIcon;
    return (
        <div className={showHideClassName}>
            <section className="vto-modal-main">
                {children}
                <button type="button" onClick={handleClose} className="vto-modal-closeBtn">
                    <CloseIcon />
                </button>
            </section>
        </div>
    );
};


Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    children: PropTypes.any.isRequired,
    closeIcon: PropTypes.func.isRequired
}

export default Modal


