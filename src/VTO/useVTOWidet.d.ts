import { TrackingStatus, IUserInfo } from "designhubz-widget";
import * as React from "react";

export interface useVTOWidgetProps {
  onUserInfoUpdate: (userInfo: IUserInfo) => void;
  onTrackingStatusChange: (trackingStatus: TrackingStatus) => void;
}

export default function useVTOWidget({
  onUserInfoUpdate,
  onTrackingStatusChange,
}): {
  containerRef: React.Ref<HTMLElement>;
  view: string;
  recommendedProducts: Array<string>;
  vtoCreateWidget: () => void;
  vtoSwitchView: () => void;
  vtoLoadProduct: () => void;
  vtoFetchRecommendations: () => void;
};
