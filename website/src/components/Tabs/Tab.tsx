import React, { FC, PropsWithChildren } from "react";

type Props = {
  // Not used in this component, but enforces that child components of the
  // tabs have a label.
  label: string;
};

export const Tab: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <>{children}</>;
};
