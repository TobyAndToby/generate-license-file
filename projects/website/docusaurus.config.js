// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "My Site",
  tagline: "Dinosaurs are cool",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/generate-license-file/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  noIndex: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "TobyAndToby", // Usually your GitHub org/user name.
  projectName: "generate-license-file", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          includeCurrentVersion: true,
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Generate License File",
        logo: {
          alt: "Generate License File Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro/index",
            position: "left",
            label: "Docs",
          },
          {
            type: "docsVersionDropdown",
            position: "left",
            dropdownActiveClassDisabled: true,
          },
          {
            type: "custom-languageToggle",
            position: "right",
          },
          {
            href: "https://github.com/TobyAndToby/generate-license-file",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Docs",
                to: "/docs/cli",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/TobyAndToby/generate-license-file",
              },
              {
                label: "Toby Smith",
                href: "https://tobysmith.uk",
              },
              {
                label: "Toby Bessant",
                href: "https://tobybessant.co.uk",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Generate License File. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      announcementBar: {
        content:
          "🚧 <b>Welcome! This site is a work in progress, check back soon.</b> 🚧",
        backgroundColor: "#f5e831",
        textColor: "black",
        id: "wip",
        isCloseable: false,
      },
    }),
};

module.exports = config;
