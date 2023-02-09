import PropTypes from "prop-types";
import { useVTOProvider } from "./VTOContext";
import "./VTOSnapshotPreview.css";

const VTOSnapshotPreview = () => {
  const { snapshotData } = useVTOProvider();

  return (
    <>
      <div className={"vto-snapshot-preview"}>
        {snapshotData && (
          <div className="vto-preview-container">
            <img src={snapshotData} alt="snapshot" />
          </div>
        )}
      </div>
    </>
  );
};

VTOSnapshotPreview.propTypes = {
  children: PropTypes.node,
};

export default VTOSnapshotPreview;
