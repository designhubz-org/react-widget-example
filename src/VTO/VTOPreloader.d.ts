import * as React from "react";

export interface VTOPreloaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  loadingHandler: (progress: number) => void;
}

export default function VTOPreloader(props: VTOPreloaderProps): JSX.Element;
