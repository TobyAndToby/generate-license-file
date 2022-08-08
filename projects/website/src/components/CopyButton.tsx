import styled from "@emotion/styled";
import React, { FC } from "react";

type Props = {
  label: string;
  labelColour: string;
  contentToCopy: string;
};

export const CopyButton: FC<Props> = ({ label, labelColour, contentToCopy }) => {
  return (
    <TextButton colour={labelColour} onClick={() => navigator.clipboard.writeText(contentToCopy)}>
      {label}
    </TextButton>
  );
};

type TextButtonProps = {
  colour: string;
};

const TextButton = styled.button<TextButtonProps>`
  background: none;
  border: none;
  outline: none;
  height: auto;
  width: auto;
  color: ${({ colour }) => colour};
  cursor: pointer;
`;
