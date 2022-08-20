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
    { type: "doc", id: "intro" },
    { type: "doc", id: "cli/index" },
    {
      type: "category",
      label: "Library",
      collapsed: false,
      link: { type: "doc", id: "library/index" },
      items: [{ type: "doc", id: "library/api" }],
    },
    { type: "doc", id: "v1-to-v2" },
  ],
};

module.exports = sidebars;
