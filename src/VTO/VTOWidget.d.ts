import * as React from "react";

type TVTOVariation = {
  code: string;
  hexColor: string;
  price: number;
  currency: string;
  thumbnailUrl: string;
  name: string;
  textureUrl: string;
  pdpUrl: string;
};

type TVTOIcons = {
  ThreeDSwitchIcon: React.ReactNode;
  ARSwitchIcon: React.ReactNode;
  takeSnapShotIcon: React.ReactNode;
};

export interface VTOWidgetProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  userId: string;
  checkoutCartURL: string;
  icons: TVTOIcons;
  fetchVariationData: (codes: string[]) => Array<TVTOVariation>;
  addToCart: (variation: TVTOVariation) => void;
}

export default function VTOWidget(props: VTOWidgetProps): JSX.Element;
