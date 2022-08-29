// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Shifu Framework',
  tagline: '让开发产业场景像开发一个APP一样简单',
  url: 'https://shifu.run',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'edgenesis', // Usually your GitHub org/user name.
  projectName: 'shifu-docs-docusaurus', // Usually your repo name.

  // https://docusaurus.io/docs/i18n/tutorial#start-your-site
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },

  plugins: [
    'docusaurus-plugin-hotjar',
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-baidu-analytics',
      {
        analyticsId: '3123fa51e13a507dfc99a606fc329c52'
      }
    ],
  ],

  themes: [
    // ... Your other themes.

    // search
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        language: ["en", "zh"],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [require('mdx-mermaid')],
          sidebarPath: require.resolve('./sidebars.js'),
          // make sidebar expandable
          sidebarCollapsible: true,
          routeBasePath: '/docs',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/edgenesis/shifu-docs-docusaurus/tree/main/',
        },
        blog: {
          routeBasePath: '/blog',
          blogSidebarTitle: '所有博客',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Shifu Framework',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '文档',
          },
          {
            href: '/disclaimer',
            label: 'Shifu Demo 下载',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/edgenesis/shifu',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '极速安装',
                to: 'docs/quickstart/quick_install',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: '敬请期待！',
                to: 'docs',
                // href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/edgenesis/shifu',
              },
              {
                label: 'Shifu Demo 下载',
                href: '/disclaimer',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} 边无际 Edgenesis.  |  <a href="https://beian.miit.gov.cn/">京ICP备2021037926号</a>  | <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802039843">京公网安备11010802039843号</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
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
        applicationId: 3065662
      },
    }),
};

module.exports = config;