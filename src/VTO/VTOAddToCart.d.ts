import * as React from "react";

export interface VTOAddToCart
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  product: any;
  checkoutCartURL: string;
  addToCart: any;
  isLoading: boolean;
}

export default function VTOAddToCart(props: VTOPreloaderProps): JSX.Element;
