import TypeScriptToggle from "@site/src/components/TypeScriptToggle";
import React, { FC } from "react";
import { getLibraryMethods } from "./getLibraryMethods";
import LibraryMethod from "./LibraryMethod";

const ApiPage: FC = () => {
  return (
    <>
      <TypeScriptToggle />

      <h2>Methods</h2>
      {getLibraryMethods().map(method => (
        <LibraryMethod key={method.name} method={method} />
      ))}
    </>
  );
};
export default ApiPage;
