import { useRef, useEffect, useState } from "react";
import { auth, setDeployment, createEyewearWidget } from "designhubz-widget";
import useEventCallback from "./useEventCallback";

const useVTOWidget = ({ onUserInfoUpdate, onTrackingStatusChange }) => {
  const widgetRef = useRef(null);
  const containerRef = useRef(null);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const vtoSetError = (error) => {
    setIsError(true);
    setErrorMsg(error);
  };

  const onVTOUserInfoUpdate = useEventCallback((userInfo) => {
    onUserInfoUpdate(userInfo);
  }, []);

  const onVTOTrackingStatusChange = useEventCallback((trackingStatus) => {
    onTrackingStatusChange(trackingStatus);
  }, []);

  const vtoIsWidgetInitiated = useEventCallback(() => {
    if (!widgetRef.current) {
      vtoSetError("widget is not ready");
      return false;
    }
    return true;
  }, []);

  const vtoCreateWidget = useEventCallback(async () => {
    if (widgetRef.current) {
      vtoSetError("widget is already instantiated");
      return;
    }

    try {
      if (window.location.origin.includes("//localhost:")) {
        auth(23049412);
        setDeployment("production");
      }
      const widget = await createEyewearWidget(containerRef.current);
      widgetRef.current = widget;
      widget.onUserInfoUpdate.Add(onVTOUserInfoUpdate);
      widget.onTrackingStatusChange.Add(onVTOTrackingStatusChange);
      return widget;
    } catch (e) {
      vtoSetError(e.toString());
    }
  }, []);

  const vtoSetUserId = useEventCallback(
    async (userId) => {
      if (!vtoIsWidgetInitiated()) return null;

      try {
        widgetRef.current.setUserId((userId || "test").toString());
      } catch (e) {
        vtoSetError(e.toString());
      }
    },
    [vtoIsWidgetInitiated]
  );

  const vtoSwitchView = useEventCallback(async (view) => {
    if (!vtoIsWidgetInitiated()) return null;
    try {
      await widgetRef.current.switchContext(view);
    } catch (e) {
      vtoSetError(e.toString());
    }
  }, []);

  const vtoLoadProduct = useEventCallback(async (vtoId, progressHandler) => {
    if (!vtoIsWidgetInitiated()) return null;
    try {
      return await widgetRef.current.loadProduct(vtoId, progressHandler);
    } catch (e) {
      vtoSetError(e.toString());
    }
  }, []);

  const vtoTakeSnapshot = useEventCallback(async () => {
    if (!vtoIsWidgetInitiated()) return null;
    try {
      return await widgetRef.current.takeSnapshotAsync();
    } catch (e) {
      vtoSetError(e.toString());
    }
  }, []);

  const vtoFetchRecommendations = useEventCallback(async (count) => {
    if (!vtoIsWidgetInitiated()) return null;
    try {
      // await widgetRef.current.fetchFitInfo();
      const similarProds = await widgetRef.current.fetchRecommendations(count);
      //setRecommendedProducts(similarProds.map((prod) => prod?.productKey));
      return similarProds;
    } catch (e) {
      vtoSetError(e.toString());
    }
  }, []);

  useEffect(() => {
    if (widgetRef.current) {
      return () => {
        widgetRef.current.onUserInfoUpdate.Remove(onVTOUserInfoUpdate);
        widgetRef.current.onTrackingStatusChange.Remove(
          onVTOTrackingStatusChange
        );
        // widgetRef.current.dispose();
        widgetRef.current = null;
      };
    }
  }, [onVTOUserInfoUpdate, onVTOTrackingStatusChange]);

  return {
    widgetRef,
    containerRef,
    isError,
    errorMsg,
    vtoCreateWidget,
    vtoSetUserId,
    vtoSwitchView,
    vtoLoadProduct,
    vtoTakeSnapshot,
    vtoFetchRecommendations,
  };
};

export default useVTOWidget;
