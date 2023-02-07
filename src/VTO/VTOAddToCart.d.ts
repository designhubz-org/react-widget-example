import * as React from "react";

export interface VTOAddToCart
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  isLoading: boolean;
}

export default function VTOAddToCart(props: VTOPreloaderProps): JSX.Element;
