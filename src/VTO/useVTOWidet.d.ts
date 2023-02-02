import * as React from "react";

export default function useTreeItem(useId: string): {
  containerRef: React.Ref<HTMLElement>;
  view: string;
  recommendedProducts: Array<string>;
  vtoCreateWidget: () => void;
  vtoSwitchView: () => void;
  vtoLoadProduct: () => void;
  vtoFetchRecommendations: () => void;
};
