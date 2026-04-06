import styled from "@emotion/styled";
import { useTypeScriptSnippets } from "@site/src/components/TypeScriptToggle";
import React from "react";

export interface Props {
  methodName: string;
  signature: SignatureDetails;
}

export interface SignatureDetails {
  params: Param[];
  returnType: ReturnType;
  description: string;
}

interface Param {
  name: string;
  type: string;
  description: string;
  isOptional?: boolean;
}

interface ReturnType {
  type: string;
  description: string;
}

const MethodSignature = ({ methodName, signature }: Props) => {
  const useTypeScript = useTypeScriptSnippets();

  const { params, returnType, description } = signature;

  const formattedReturnType = useTypeScript ? `: ${returnType.type}` : "";

  const formattedParameters = params
    .map(p => (useTypeScript ? `${p.name}${p.isOptional ? "?:" : ":"} ${p.type}` : p.name))
    .join(", ");

  const fullSignature = `${methodName}(${formattedParameters})${formattedReturnType}`;

  return (
    <>
      <p>
        <code>{fullSignature}</code>
      </p>
      <p>{description}</p>

      <h4>Parameters</h4>
      <ul>
        {params.map(parameter => (
          <li key={parameter.name}>
            <p>
              <code>
                {parameter.name}
                {useTypeScript && parameter.isOptional && "?"}
                {useTypeScript && ": "}
                {useTypeScript && parameter.type}
              </code>
              {parameter.description && ` - ${parameter.description}`}
            </p>
          </li>
        ))}
      </ul>

      <h4>Returns</h4>
      <Returns>
        <code>{returnType.type}</code>
        {returnType.description && ` - ${returnType.description}`}
      </Returns>
    </>
  );
};
export default MethodSignature;

const Returns = styled.p`
  list-style-type: none;
  padding-left: var(--ifm-list-left-padding);
`;
