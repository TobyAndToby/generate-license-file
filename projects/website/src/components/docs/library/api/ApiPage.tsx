import TypeScriptToggle from "@site/src/components/TypeScriptToggle";
import React, { FC } from "react";
import { getLibraryMethods } from "./getLibraryMethods";
import LibraryMethod from "./LibraryMethod";
import { TopLevelNode } from "./schemaTypes";

interface Props {
  librarySchema: TopLevelNode;
}

const ApiPage: FC<Props> = ({ librarySchema }) => {
  return (
    <>
      <TypeScriptToggle />
      <h2>Methods</h2>
      {getLibraryMethods(librarySchema).map(method => (
        <LibraryMethod key={method.name} method={method} />
      ))}
    </>
  );
};
export default ApiPage;
