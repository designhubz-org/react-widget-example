import { createContext, useContext, useState } from "react";

export const VTOContext = createContext({});

export const VTOProvider = ({ children, initialProduct }) => {
  const [widgetStatus, setWidgetStatus] = useState("NOT_READY");
  // const [currentVariation, setCurrentVariation] = useState(initialVariation);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [currentView, setCurrentView] = useState("3d");
  const [trackingStatus, setTrackingStatus] = useState("Idle");

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
      }}
    >
      {children}
    </VTOContext.Provider>
  );
};

export const useVTOProvider = () => useContext(VTOContext);
