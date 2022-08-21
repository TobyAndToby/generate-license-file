import styled from "@emotion/styled";
import React, { FC } from "react";
import { CopyButton } from "./CopyButton";

const cmdWithNewLines =
  "npx generate-license-file \\\n--input ./package.json \\\n--output THIRD-PARTY-LICENSES.txt";
const cmdOneLine =
  "npx generate-license-file --input ./package.json --output THIRD-PARTY-LICENSES.txt";

export const Terminal: FC = () => {
  return (
    <Container>
      <Menu>
        <MenuButton type="close" />
        <MenuButton type="minimize" />
        <MenuButton type="zoom" />
      </Menu>
      <Screen>
        <Prefix>$ </Prefix>
        npx generate-license-file \<br />
        <Argument> --input </Argument> ./package.json \<br />
        <Argument> --output </Argument> THIRD-PARTY-LICENSES.txt
        <CopyButtons>
          <CopyButton labelColour="white" label="Copy" contentToCopy={cmdWithNewLines} />
          <CopyButton labelColour="white" label="Copy as one line" contentToCopy={cmdOneLine} />
        </CopyButtons>
      </Screen>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 715px;
  max-width: 950px;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 7px 3px 10px 0px #0000003b;
`;

const Menu = styled.div`
  width: auto;
  box-sizing: border-box;
  height: 25px;
  background-color: #282828;
  margin: 0 auto;
  text-align: left;
  padding-left: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const menuButtonType = {
  close: "#ff3b47",
  minimize: "#ffc100",
  zoom: "#00d742",
};

interface MenuButtonProps {
  type: keyof typeof menuButtonType;
}

const MenuButton = styled.div<MenuButtonProps>`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  position: relative;
  margin: 0 4px;
  background-color: ${({ type }) => menuButtonType[type]};
  display: inline-block;
`;

const Screen = styled.div`
  color: #fff;
  background-color: #151515;
  width: auto;
  margin: 0 auto;
  padding: 20px;
  min-height: 170px;
  text-align: left;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-family: "Fira Mono", monospace;
  white-space: pre;
`;

const Argument = styled.span`
  opacity: 0.7;

  &::before {
    content: "";
    display: inline-block;
    margin-left: 20%;
  }
`;

const Prefix = styled.span`
  user-select: none;
`;

const CopyButtons = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  button:not(:last-child) {
    padding-right: 16px;
  }
`;
