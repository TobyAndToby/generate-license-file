import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Highlight, { defaultProps } from "prism-react-renderer";
import React, { FC, useState } from "react";
import { CopyButton } from "../CopyButton";
import { demoFiles } from "./demoFiles";
import "./theme.css";

export const MonacoEditor: FC = () => {
  const [activeTab, setActiveTab] = useState(demoFiles[0].fileName);

  return (
    <Window>
      <Menu>
        <MenuButton type="close" />
        <MenuButton type="minimize" />
        <MenuButton type="zoom" />
      </Menu>
      <Screen>
        <Sidebar />
        <ViewContainer>
          <MonacoTabsContainer>
            {demoFiles.map(({ fileName, tabIcon }) => (
              <MonacoTab
                isActive={activeTab === fileName}
                iconUrl={tabIcon}
                onClick={() => setActiveTab(fileName)}
              >
                {fileName}
              </MonacoTab>
            ))}
          </MonacoTabsContainer>
          <Editor>
            {demoFiles.map(({ fileName, language, content }) => (
              <MonacoTabContent isActive={activeTab === fileName}>
                <Highlight {...defaultProps} code={content} language={language} theme={undefined}>
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={style}>
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
                <CopyButtons>
                  <div>
                    <CopyButton labelColour="white" label="Copy" contentToCopy={content} />
                  </div>
                </CopyButtons>
              </MonacoTabContent>
            ))}
          </Editor>
        </ViewContainer>
      </Screen>
    </Window>
  );
};

const Window = styled.div`
  width: auto;
  height: auto;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 7px 3px 10px 0px #0000003b;
  overflow: hidden;
`;

const Menu = styled.div`
  width: 100%;
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
  zoom: "#00d742"
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
  width: 100%;
  color: #fff;
  background-color: #1e1e1e;
  margin: 0 auto;
  height: 100%;
  min-height: 130px;
  text-align: left;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-family: "Fira Mono", monospace;
  position: relative;
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  background: #333333;
  width: 48px;
`;

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MonacoTabsContainer = styled.div`
  width: 100%;
  height: 35px;
  position: relative;
  background-color: #252526;
  display: flex;
`;

const activeStyle = css`
  background: #1e1e1e;
`;

const MonacoTab = styled.div<{ isActive: boolean; iconUrl: string }>`
  width: auto;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: #2d2d2d;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 13px;

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: "";
    background: url(${({ iconUrl }) => iconUrl});
    background-size: 16px;
    background-repeat: no-repeat;
    height: 25px;
    top: 5px;
    width: 28px;
    position: relative;
  }

  ${({ isActive }) => isActive && activeStyle}
`;

const Editor = styled.div`
  background-color: #1e1e1e;
  margin-left: 20px;
  padding-left: 10px;
  border-left: 1px solid #ffffff5c;
`;

const MonacoTabContent = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? "block" : "none")};
`;

const CopyButtons = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
