import * as React from "react";

export interface VTOPreloaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  isFirstLoading: boolean;
  isLoadingProduct: boolean;
}

export default function VTOPreloader(props: VTOPreloaderProps): JSX.Element;
