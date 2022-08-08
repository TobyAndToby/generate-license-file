import styled from "@emotion/styled";
import { useTypeScriptSnippets } from "@site/src/components/TypeScriptToggle";
import React, { FC } from "react";
import { Parameter, Signature, Type } from "./getLibraryMethods";

interface Props {
  methodName: string;
  signature: Signature;
}

const MethodSignature: FC<Props> = ({ methodName, signature }) => {
  const showTypeScriptSnippets = useTypeScriptSnippets();

  const { shortText, parameters, returns, returnType } = signature;

  const getParameter = (parameter: Parameter) => {
    if (showTypeScriptSnippets) {
      return parameter.name + ": " + formatType(parameter.type);
    }

    return parameter.name;
  };

  let title = methodName + "(" + parameters.map(getParameter).join(", ") + ")";

  if (showTypeScriptSnippets) {
    title += ": " + formatType(returnType);
  }

  return (
    <div>
      <code>{title}</code>
      <p>{shortText}</p>

      <h4>Parameters</h4>
      <ul>
        {parameters.map(parameter => (
          <li key={parameter.name}>
            <p>
              <code>
                {parameter.name}
                {showTypeScriptSnippets && ": " + formatType(parameter.type)}
              </code>
              {!!parameter.shortText &&
                parameter.shortText.length > 0 &&
                " - " + parameter.shortText}
            </p>
          </li>
        ))}
      </ul>

      <h4>Returns</h4>
      <Returns>
        <code>{formatType(returnType)}</code>
        {!!returns && returns.length > 0 && " - " + returns}
      </Returns>

      <hr />
    </div>
  );
};
export default MethodSignature;

const formatType = (type: Type) => {
  let result = type.isArray ? "" : type.name;

  if (!!type.genericArguments && type.genericArguments.length > 0) {
    if (!type.isArray) {
      result += "<";
    }

    const formattedGenericArguments = type.genericArguments.map(formatType);
    result += formattedGenericArguments.join(", ");

    if (!type.isArray) {
      result += ">";
    }
  }

  if (type.isArray) {
    result += "[]";
  }

  return result;
};

const Returns = styled.p`
  list-style-type: none;
  padding-left: var(--ifm-list-left-padding);
`;
