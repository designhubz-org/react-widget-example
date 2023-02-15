import PropTypes from "prop-types";
import { useVTOProvider } from "./VTOContext";
import { DownloadIcon } from "../assets/icons/DownloadIcon";
import { CircleCheckIcon } from "../assets/icons/CircleCheckIcon";
import { useRef } from "react";

const VTOSnapshotPreview = () => {
  const { snapshotData, setSnapshotPreview } = useVTOProvider();
  const downloadRef = useRef(null);

  const closeSnapshotPreview = () => {
    setSnapshotPreview(false);
  };
  const downloadSnapshotPreview = () => {
    // downloadRef.current.href = snapshotData;
    console.log("downloading....");
    downloadRef.current.download = "tryon-snapshot.png";
    downloadRef.current.click();
  };
  return (
    <>
      <div className={"vto-snapshot-preview"}>
        {snapshotData && (
          <div className="vto-preview-container">
            <div className="vto-preview-msg">
              <div className="vto-items-center">
                <span className="vto-icon-container">
                  <CircleCheckIcon />
                </span>
                <span className="vto-text-container">Image captured</span>
              </div>
              <button
                className="vto-close-action"
                onClick={closeSnapshotPreview}
              >
                Close
              </button>
            </div>
            <div className="vto-download-wrapper">
              <div
                className="vto-items-center vto-download-action"
                onClick={downloadSnapshotPreview}
              >
                <span className="vto-icon-container">
                  <DownloadIcon />
                </span>
                <span className="vto-text-container">Save to your device</span>
              </div>
              <a ref={downloadRef} href={snapshotData}>
                Download Link
              </a>
            </div>
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
