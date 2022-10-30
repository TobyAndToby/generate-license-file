import styled from "@emotion/styled";
import React, { SetStateAction, useState } from "react";
import MethodSignature, { SignatureDetails } from "./MethodSignature";

interface Props {
  methodData: MethodData;
}

export interface MethodData {
  name: string;
  signatures: SignatureDetails[];
}

const LibraryMethod = ({ methodData }: Props): JSX.Element => {
  const { name, signatures } = methodData;

  const [overloadNumber, setOverloadNumber] = useState<number>(0);

  const signature = signatures[overloadNumber];

  return (
    <>
      {signatures.length > 1 && (
        <Overloads>
          <ButtonGroup>
            <button onClick={() => setOverloadNumber(decrement(signatures.length))}>
              <img src="/img/chevron-down-outline.svg" />
            </button>
            <button onClick={() => setOverloadNumber(increment(signatures.length))}>
              <img src="/img/chevron-up-outline.svg" />
            </button>
          </ButtonGroup>

          <span>
            Overload {overloadNumber + 1} of {signatures.length}
          </span>
        </Overloads>
      )}

      <MethodSignature methodName={name} signature={signature} />
    </>
  );
};

export default LibraryMethod;

const Overloads = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

const ButtonGroup = styled.span`
  display: flex;
  align-items: center;
  margin-right: 0.5em;

  button {
    border-color: grey;
    margin: 0;
    padding: 0;
    height: auto;
    width: 40px;

    img {
      height: 18px;
      margin: 0 auto;
      margin-top: 4px;
    }
  }

  button:first-of-type {
    border-radius: 0.4em 0 0 0.4em;
    border-width: 1px 0 1px 1px;
  }

  button:last-of-type {
    border-radius: 0 0.4em 0.4em 0;
    border-width: 1px;
  }
`;

const decrement = (total: number): SetStateAction<number> => {
  return n => (n + total - 1) % total;
};

const increment = (total: number): SetStateAction<number> => {
  return n => (n + 1) % total;
};
