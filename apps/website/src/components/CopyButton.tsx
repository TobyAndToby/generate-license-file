import styled from "@emotion/styled";
import React, { FC, useState } from "react";

type Props = {
  label: string;
  labelColour: string;
  contentToCopy: string;
};

const iconTimeout = 1500;

export const CopyButton: FC<Props> = ({ label, labelColour, contentToCopy }) => {
  const [showIcon, setShowIcon] = useState(false);

  const copy = (): void => {
    navigator.clipboard.writeText(contentToCopy);

    setShowIcon(true);

    setTimeout(() => {
      setShowIcon(false);
    }, iconTimeout);
  };

  return showIcon ? (
    <IconContainer>
      <Icon />
    </IconContainer>
  ) : (
    <TextButton colour={labelColour} onClick={copy}>
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

const IconContainer = styled.div`
  width: 100%;
`;

const Icon = styled.div`
  margin: 0 auto;
  background-image: url("/img/checkmark-circle-outline.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 18px;
  width: 18px;
`;
