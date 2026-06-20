import styled from "@emotion/styled";
import { useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import React, { FC } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const typescriptAtom = atomWithStorage<boolean>("showTypeScript", true);

export const useTypeScriptSnippets = () => {
  return useAtomValue(typescriptAtom);
};

const TypeScriptToggle: FC = () => {
  const [showTypeScript, setShowTypeScript] = useAtom(typescriptAtom);

  return (
    <form>
      <Label htmlFor="show-typescript">
        <LabelText>Language:</LabelText>
        <Toggle
          id="show-typescript"
          icons={{
            checked: <Language color="white">TS</Language>,
            unchecked: <Language color="black">JS</Language>,
          }}
          checked={showTypeScript}
          onChange={e => setShowTypeScript(e.target.checked)}
        />
      </Label>
    </form>
  );
};
export default TypeScriptToggle;

const Label = styled.label`
  display: flex;
  align-items: center;

  .react-toggle-track {
    background-color: #fcd93c !important;
  }

  .react-toggle-thumb {
    border-color: #fcd93c;
  }

  .react-toggle--checked .react-toggle-track {
    background-color: #337bc2 !important;
  }

  .react-toggle--checked .react-toggle-thumb {
    border-color: #337bc2;
  }

  .react-toggle-track-check,
  .react-toggle-track-x {
    margin: 0;
    height: 100%;
    display: grid;
    align-content: center;
  }

  .react-toggle--focus .react-toggle-thumb {
    box-shadow: 0px 0px 2px 3px #c7ab2f;
  }

  .react-toggle--checked.react-toggle--focus .react-toggle-thumb {
    box-shadow: 0px 0px 2px 3px #214e7a;
  }

  .react-toggle-thumb {
    background-color: var(--ifm-hero-background-color);
  }
`;

const LabelText = styled.span`
  margin-right: 0.5em;
  font-weight: bold;
  font-size: 1.3em;
`;

interface LanguageProps {
  color: "white" | "black";
}

const Language = styled.span<LanguageProps>`
  color: ${({ color }) => color};
  display: inline-block;
  font-weight: 600;
  font-family: "Arial";
  font-size: 14px;
  padding-top: 2px;
`;
