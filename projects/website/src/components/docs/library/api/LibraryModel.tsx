import { useTypeScriptSnippets } from "@site/src/components/TypeScriptToggle";
import React from "react";

interface Property {
  name: string;
  type: string;
  description: string;
}

interface Props {
  properties: Property[];
  description: string | JSX.Element;
}

const LibraryModel = ({ properties, description }: Props): JSX.Element => {
  return (
    <>
      <p>{description}</p>

      <h4>Properties</h4>
      <ul>
        {properties.map(p => (
          <li>
            {" "}
            <LibraryProperty {...p} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default LibraryModel;

const LibraryProperty = ({ name, type, description }: Property): JSX.Element => {
  const useTypeScript = useTypeScriptSnippets();

  return (
    <p>
      <code>
        {name}
        {useTypeScript && ": " + type}
      </code>
      {description && ` - ${description}`}
    </p>
  );
};
