import * as React from "react";

export interface VTOSnapshotPreviewProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
}

export default function VTOSnapshotPreview(
  props: VTOSnapshotPreviewProps
): JSX.Element;
