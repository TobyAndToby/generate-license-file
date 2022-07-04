import styled from "@emotion/styled";
import React, { FC } from "react";
import { Method } from "./getLibraryMethods";
import MethodSignature from "./MethodSignature";

interface Props {
  method: Method;
}

const LibraryMethod: FC<Props> = ({ method }) => {
  const { name: methodName, signatures } = method;
  const isAsync = signatures[0].returnType.name === "Promise" && !signatures[0].returnType.isArray;

  return (
    <div>
      <MethodName id={methodName}>
        <OnHoverAnchorWrapper>
          <h3>
            {methodName}
            {isAsync && <Tag>Async</Tag>}
            <a href={"#" + methodName} title={"Direct link to " + methodName} />
          </h3>
        </OnHoverAnchorWrapper>
      </MethodName>
      {signatures.map((signature, i) => (
        <MethodSignature key={i} methodName={methodName} signature={signature} />
      ))}
    </div>
  );
};
export default LibraryMethod;

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
