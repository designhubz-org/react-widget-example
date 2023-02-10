import * as React from "react";

export interface VTOVariationsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  product: any;
  loadProduct: any;
}

export default function VTOVariations(props: VTOVariationsProps): JSX.Element;
