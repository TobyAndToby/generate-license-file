/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    {
      type: "category",
      label: "Introduction",
      collapsed: false,
      link: { type: "doc", id: "intro/index" },
      items: [{ type: "doc", id: "intro/getting-started" }],
    },
    {
      type: "category",
      label: "CLI",
      collapsed: false,
      link: { type: "doc", id: "cli/index" },
      items: [{ type: "doc", id: "cli/config-file" }],
    },
    {
      type: "category",
      label: "Library",
      collapsed: false,
      link: { type: "doc", id: "library/index" },
      items: [{ type: "doc", id: "library/api" }],
    },
    {
      type: "category",
      label: "Integrations",
      collapsed: false,
      items: [{ type: "doc", id: "webpack-plugin" }],
    },
    {
      type: "category",
      label: "Migration Guides",
      collapsed: false,
      items: [
        { type: "doc", id: "v3-to-v4", label: "V3 to V4" },
        { type: "doc", id: "v2-to-v3", label: "V2 to V3" },
        { type: "doc", id: "v1-to-v2", label: "V1 to V2" },
      ],
    },
  ],
};

module.exports = sidebars;
