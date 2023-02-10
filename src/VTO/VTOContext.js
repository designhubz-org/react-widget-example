import { createContext, useContext, useState } from "react";

export const VTOContext = createContext({});

export const VTOProvider = ({ children, initialProduct }) => {
  const [widgetStatus, setWidgetStatus] = useState("NOT_READY");
  // const [currentVariation, setCurrentVariation] = useState(initialVariation);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [currentView, setCurrentView] = useState("3d");
  const [trackingStatus, setTrackingStatus] = useState("Idle");
  const [snapshotData, setSnapshotData] = useState(null);
  const [snapshotPreview, setSnapshotPreview] = useState(false);

  return (
    <VTOContext.Provider
      value={{
        widgetStatus,
        setWidgetStatus,
        currentView,
        setCurrentView,
        trackingStatus,
        setTrackingStatus,
        currentProduct,
        setCurrentProduct,
        snapshotData,
        setSnapshotData,
        snapshotPreview,
        setSnapshotPreview,
      }}
    >
      {children}
    </VTOContext.Provider>
  );
};

export const useVTOProvider = () => useContext(VTOContext);
