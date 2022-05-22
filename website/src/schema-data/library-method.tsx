import styled from "@emotion/styled";
import React, { FC } from "react";
import { Signature, Type } from "./get-library-methods";

interface Props {
  methodName: string;
  signature: Signature;
}

const LibraryMethod: FC<Props> = ({ methodName, signature }) => {
  const { shortText, parameters, returns, returnType } = signature;

  const title = methodName + "(" + parameters.map(p => p.name).join(", ") + ")";
  const isAsync = returnType.name === "Promise" && !returnType.isArray;

  return (
    <div>
      <MethodName id={methodName}>
        <OnHoverAnchorWrapper>
          <code>{title}</code>
          {isAsync && <Tag>Async</Tag>}
          <a href={"#" + methodName} title={"Direct link to " + methodName} />
        </OnHoverAnchorWrapper>
      </MethodName>
      <p>{shortText}</p>

      <h4>Parameters</h4>
      <ul>
        {parameters.map(parameter => (
          <li key={parameter.name}>
            <p>
              <code>{parameter.name}</code>
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
export default LibraryMethod;

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

const MethodName = styled.h3`
  ::before {
    display: block;
    content: " ";
    margin-top: -70px;
    height: 70px;
    visibility: hidden;
  }
`;

const OnHoverAnchorWrapper = styled.div`
  a {
    opacity: 0;
    transition: opacity 0.1s ease-in-out;

    ::before {
      content: "#";
    }
  }

  &:hover {
    a {
      opacity: 1;
    }
  }
`;

const Tag = styled.span`
  background-color: var(--ifm-color-primary);
  border-radius: 0.5em;
  font-size: small;
  padding: 0.2em 0.4em;
  font-style: italic;
  margin: 0 0.5em;
  color: white;
  font-weight: 600;
`;

const Returns = styled.p`
  list-style-type: none;
  padding-left: var(--ifm-list-left-padding);
`;
