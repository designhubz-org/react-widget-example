import PropTypes from "prop-types";

const VTOViewSwitch = ({
  switchView,
  currentView,
  ARSwitchIcon,
  ThreeDSwitchIcon,
}) => {
  return (
    <>
      {currentView == "tryon" ? (
        <div
          className="vto-switch-view-button vto-3d-switch"
          onClick={() => {
            switchView("3d");
          }}
        >
          <ThreeDSwitchIcon />
        </div>
      ) : (
        <div
          className="vto-switch-view-button"
          onClick={() => {
            switchView("tryon");
          }}
        >
          <ARSwitchIcon style={{ height: 50, width: 50 }} />
        </div>
      )}
    </>
  );
};

//Add proptypes
export default VTOViewSwitch;
