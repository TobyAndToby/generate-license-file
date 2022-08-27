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
            <button onClick={() => setOverloadNumber(decrement(signatures.length))}>◀</button>
            <button onClick={() => setOverloadNumber(increment(signatures.length))}>▶</button>
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
  margin-bottom: 1em;
`;

const ButtonGroup = styled.span`
  margin-right: 0.5em;

  button {
    border-color: grey;
    height: 1.6em;
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
