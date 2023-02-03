import * as React from "react";

export interface VTOModalProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  value: string;
  handleClose: (event: React.SyntheticEvent) => void;
  show: boolean;
  closeIcon: React.ReactNode;
}

export default function VTOModal(props: VTOModalProps): JSX.Element;
