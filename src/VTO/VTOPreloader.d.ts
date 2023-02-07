import * as React from "react";

export interface VTOPreloaderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  progress: number;
  isLoading: boolean;
}

export default function VTOPreloader(props: VTOPreloaderProps): JSX.Element;
