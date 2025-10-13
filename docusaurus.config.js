// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion
import { theme } from "antd";
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Shifu | Kubernetes native, open-source IoT development framework",
  tagline: "Kubernetes native IoT development framework",
  url: "https://shifu.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/logo.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "edgenesis", // Usually your GitHub org/user name.
  projectName: "shifu.run", // Usually your repo name.

  // https://docusaurus.io/docs/i18n/tutorial#start-your-site
  // https://docusaurus.io/docs/api/docusaurus-config#i18n
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-Hans"],
  },

  plugins: [
    "docusaurus-plugin-hotjar",
    "docusaurus-plugin-sass",
    [
      "docusaurus-plugin-baidu-analytics",
      {
        analyticsId: "3123fa51e13a507dfc99a606fc329c52",
      },
    ],
    "./plugin/plugin-redirect.js",
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "news",
        routeBasePath: "news",
        path: "./blog-news",
        blogSidebarTitle: "All posts",
        blogSidebarCount: "ALL",
        onUntruncatedBlogPosts: "ignore",
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "technical-blogs",
        routeBasePath: "technical-blogs",
        path: "./blog-tech",
        blogSidebarTitle: "All posts",
        blogSidebarCount: "ALL",
        onUntruncatedBlogPosts: "ignore",
      },
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: [
    // mermaid
    "@docusaurus/theme-mermaid",
    // search
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        language: ["en", "zh"],
        blogDir: ["blog-news", "blog-tech"],
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true, // make sidebar expandable
          routeBasePath: "/docs",
          editUrl: "https://github.com/edgenesis/shifu.run/tree/main/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-42F5S9P9CP",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      image: "img/logo.svg",
      navbar: {
        title: "",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "/product",
            position: "left",
            label: "Product",
          },
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },

          // {
          //   to: '/case-studies',
          //   position: 'left',
          //   label: 'Case Studies',
          // },

          // {
          //   to: '/news',
          //   position: 'left',
          //   label: 'News',
          // },
          {
            to: "/technical-blogs",
            position: "left",
            label: "Tech Blog",
          },
          // {
          //   href: '/disclaimer',
          //   label: 'Download Demo',
          //   position: 'left',
          // },
          // {
          //   to: '/company',
          //   position: 'left',
          //   label: 'Company',
          // },
          {
            type: "search",
            position: "right",
            className: "header-search",
          },
          {
            type: "localeDropdown",
            position: "right",
            className: "langDropdown",
          },
          {
            href: "https://github.com/edgenesis/shifu",
            position: "right",
            className: "header-link header-github-link",
            "aria-label": "GitHub repository",
          },
          {
            href: "https://discord.com/channels/1024601454306136074/1024601454759133214",
            position: "right",
            className: "header-link header-discord-link",
            "aria-label": "Discord repository",
          },
          {
            href: "https://twitter.com/ShifuFramework",
            position: "right",
            className: "header-link header-twitter-link",
            "aria-label": "Twitter repository",
          }
        ],
      },
      prism: {
        theme: theme.github,
        darkTheme: theme.dracula,
      },
      docs: {
        sidebar: {
          // don't collapse other category when open a new category
          autoCollapseCategories: false,
          // user can gain larger screen if hide the sidebar
          hideable: true,
        },
      },
      hotjar: {
        applicationId: 3065662,
      },
      metadata: [
        {
          name: "keywords",
          content:
            "cloud-native IoT platform, open-source IoT development framework",
        },
      ],
    }),
};

module.exports = config;
