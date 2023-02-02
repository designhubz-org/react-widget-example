import { useRef, useCallback, useState } from "react";
import {
  auth,
  setDeployment,
  createEyewearWidget,
  switchContext,
  loadProduct,
  fetchRecommendations,
} from "designhubz-widget";

const useVTOWidget = (userId) => {
  const widgetRef = useRef(null);
  const containerRef = useRef(null);

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [view, setView] = useState("3d");

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const vtoCreateWidget = useCallback(async () => {
    if (widgetRef.current) return;

    try {
      if (window.location.origin.includes("//localhost:")) {
        auth(23049412);
        setDeployment("production");
      }
      widgetRef.current = await createEyewearWidget(containerRef.current);
      widgetRef.current.setUserId((userId || "test").toString());
      // onUserInfoUpdate();
    } catch (e) {
      setIsError(true);
      setErrorMsg(e.toString());
    }
  }, [userId]);

  const vtoSwitchView = useCallback(async () => {
    try {
      const nextView = view === "3d" ? "tryon" : "3d";
      await switchContext();
      setView(nextView);
    } catch (e) {
      setIsError(true);
      setErrorMsg(e.toString());
    }
  }, [view]);

  const vtoLoadProduct = useCallback(async (vtoId) => {
    try {
      await loadProduct(vtoId);
    } catch (e) {
      setIsError(true);
      setErrorMsg(e.toString());
    }
  }, []);

  const vtoFetchRecommendations = useCallback(async () => {
    try {
      const similarProds = await fetchRecommendations();
      setRecommendedProducts(similarProds.map((prod) => prod?.productKey));
    } catch (e) {
      setIsError(true);
      setErrorMsg(e.toString());
    }
  }, []);

  return {
    containerRef,
    view,
    recommendedProducts,
    isError,
    errorMsg,
    vtoCreateWidget,
    vtoSwitchView,
    vtoLoadProduct,
    vtoFetchRecommendations,
  };
};

export default useVTOWidget;
