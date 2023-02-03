import { useRef, useEffect, useCallback, useState } from "react";
import { auth, setDeployment, createEyewearWidget } from "designhubz-widget";

const useVTOWidget = (userId) => {
  const widgetRef = useRef(null);
  const containerRef = useRef(null);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const vtoIsWidgetInitiated = () => {
    if (!widgetRef.current) {
      setIsError(true);
      setErrorMsg("widget is not ready");
      return false;
    }
    return true;
  };

  const vtoCreateWidget = useCallback(async () => {
    if (widgetRef.current) {
      setIsError(true);
      setErrorMsg("widget is already instantiated");
      return;
    }

    try {
      if (window.location.origin.includes("//localhost:")) {
        auth(23049412);
        setDeployment("production");
      }
      const widget = await createEyewearWidget(containerRef.current);
      widgetRef.current = widget;
      widgetRef.current.setUserId((userId || "test").toString());
      // onUserInfoUpdate();
      return widget;
    } catch (e) {
      setIsError(true);
      setErrorMsg(e.toString());
    }
  }, [userId]);

  const vtoSwitchView = useCallback(async (view) => {
    if (!vtoIsWidgetInitiated) return null;
    try {
      await widgetRef.current.switchContext(view);
    } catch (e) {
      setIsError(true);
      setErrorMsg(e.toString());
    }
  }, []);

  const vtoLoadProduct = useCallback(async (vtoId) => {
    if (!vtoIsWidgetInitiated) return null;
    try {
      return await widgetRef.current.loadProduct(vtoId);
    } catch (e) {
      setIsError(true);
      setErrorMsg(e.toString());
    }
  }, []);

  const vtoFetchRecommendations = useCallback(async () => {
    if (!vtoIsWidgetInitiated) return null;
    try {
      await widgetRef.current.fetchFitInfo()
      const similarProds = await widgetRef.current.fetchRecommendations();
      //setRecommendedProducts(similarProds.map((prod) => prod?.productKey));
      return similarProds;
    } catch (e) {
      setIsError(true);
      setErrorMsg(e.toString());
    }
  }, []);

  useEffect(() => {
    if (widgetRef.current) {
      return () => {
        widgetRef.current.dispose();
        widgetRef.current = null;
      };
    }
  }, []);

  return {
    widgetRef,
    containerRef,
    isError,
    errorMsg,
    vtoCreateWidget,
    vtoSwitchView,
    vtoLoadProduct,
    vtoFetchRecommendations,
  };
};

export default useVTOWidget;
