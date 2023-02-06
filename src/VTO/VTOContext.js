import { createContext, useContext, useState } from "react";

export const VTOContext = createContext({});

export const VTOProvider = ({ children }) => {
  const [widgetStatus, setWidgetStatus] = useState("NOT_READY");
  return (
    <VTOContext.Provider
      value={{
        widgetStatus,
        setWidgetStatus,
        currentView: "3d",
        trackingStatus: "",
      }}
    >
      {children}
    </VTOContext.Provider>
  );
};

export const useVTOProvider = () => useContext(VTOContext);
