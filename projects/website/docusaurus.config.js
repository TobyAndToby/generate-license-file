// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Generate License File",
  tagline:
    "Generate a text file containing all of the licences for your production, third-party dependencies.",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/generate-license-file/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "favicon.ico",
  noIndex: true,

  organizationName: "TobyAndToby",
  projectName: "generate-license-file",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

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
          editUrl:
            "https://github.com/TobyAndToby/generate-license-file/tree/main/projects/website",
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
          src: "img/glf-icon-3.svg",
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
        copyright: `Copyright © ${new Date().getFullYear()} Toby Bessant & Toby Smith. Built with Docusaurus.`,
      },
      prism: {
        theme: require("prism-react-renderer/themes/github"),
        darkTheme: require("prism-react-renderer/themes/vsDark"),
        magicComments: [
          {
            className: "code-block-diff-green",
            line: "diff-green",
          },
          {
            className: "code-block-diff-red",
            line: "diff-red",
          },
        ],
      },
    }),
};

module.exports = config;
