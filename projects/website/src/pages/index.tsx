import styled from "@emotion/styled";
import Layout from "@theme/Layout";
import React from "react";
import { MonacoEditor } from "../components/MonacoEditor/MonacoEditor";
import { Tab } from "../components/Tabs/Tab";
import { Tabs } from "../components/Tabs/Tabs";
import { Terminal } from "../components/Terminal";

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Generate License File | Docs`}
      description="Docs website for the generate-license-file npm package."
    >
      <header>
        <Hero>
          <Intro>
            <Icon />
            <Title>Generate License File</Title>
            <Subtitle>
              Generate a text file containing all of the licencss for your <br /> production,
              third-party dependencies.
            </Subtitle>
          </Intro>
          <Examples>
            <Tabs>
              <Tab label="CLI">
                <Terminal />
              </Tab>
              <Tab label="Library">
                <MonacoEditor />
              </Tab>
            </Tabs>
          </Examples>
        </Hero>
      </header>
    </Layout>
  );
}

const Hero = styled.div`
  padding: 80px 70px 100px 70px;
  min-height: 100vh;
`;

const Icon = styled.div`
  background-image: url("/img/glf-icon-3.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100px;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--ifm-heading-color);
  font-family: var(--ifm-heading-font-family);
  font-weight: var(--ifm-heading-font-weight);
  line-height: var(--ifm-heading-line-height);
  margin: var(--ifm-heading-margin-top) 0 30px 0;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  max-width: 700px;
  margin-bottom: 64px;
`;

const Intro = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

const Examples = styled.div`
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
