import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, PropsWithChildren, useState } from "react";

const activeStyle = css`
  background: #0070f3;
  color: white;
`;

const TabItem = styled.div<{ isActive: boolean }>`
  min-width: 100px;
  padding: 10px 20px;

  ${({ isActive }) => isActive && activeStyle}
`;

export const Tabs: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [activeTabLabel, setActiveTabLabel] = useState(children[0].props.label);

  return (
    <>
      <TabsContainer>
        {React.Children.map(children, child => {
          const { label } = (child as any).props;

          return (
            <TabItem
              key={label}
              isActive={activeTabLabel === label}
              onClick={() => setActiveTabLabel(label)}
            >
              {label}
            </TabItem>
          );
        })}
      </TabsContainer>

      <div className="tab-content">
        {React.Children.map(children, child => {
          if ((child as any).props.label !== activeTabLabel) {
            return undefined;
          }

          return (child as any).props.children;
        })}
      </div>
    </>
  );
};

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;

  div {
    border: 1px solid black;
    border-radius: 0;
    transition: all 0.2s;

    &:hover {
      background: #0070f3;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
    }

    &:first-of-type {
      border-radius: 0.5em 0 0 0.5em;
      border-right: none;
    }

    &:last-of-type {
      border-radius: 0 0.5em 0.5em 0;
    }
  }
`;
