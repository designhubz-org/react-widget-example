import { createContext, useContext, useState } from "react";

export const VTOContext = createContext({});

export const VTOProvider = ({ children, initialVariation }) => {
  const [widgetStatus, setWidgetStatus] = useState("NOT_READY");
  const [currentVariation, setCurrentVariation] = useState(initialVariation);

  return (
    <VTOContext.Provider
      value={{
        widgetStatus,
        setWidgetStatus,
        currentView: "3d",
        currentVariation,
        setCurrentVariation,
        trackingStatus: "",
      }}
    >
      {children}
    </VTOContext.Provider>
  );
};

export const useVTOProvider = () => useContext(VTOContext);
