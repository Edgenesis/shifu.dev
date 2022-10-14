// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Shifu',
  tagline: 'Orchestration for IoT Application Development',
  url: 'https://shifu.run',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'edgenesis', // Usually your GitHub org/user name.
  projectName: 'shifu.run', // Usually your repo name.

  // https://docusaurus.io/docs/i18n/tutorial#start-your-site
  // https://docusaurus.io/docs/api/docusaurus-config#i18n
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
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
    './plugin/plugin-redirect.js',
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'news',
        routeBasePath: 'news',
        path: './blog-news',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'technical-blogs',
        routeBasePath: 'technical-blogs',
        path: './blog-tech',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'case-studies',
        routeBasePath: 'case-studies',
        path: './blog-cases',
      },
    ]
  ],

  themes: [
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
          sidebarCollapsible: true, // make sidebar expandable
          routeBasePath: '/docs',
          editUrl:
            'https://github.com/edgenesis/shifu.run/tree/main/',
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
        title: 'Shifu',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/case-studies',
            position: 'left',
            label: 'Case Studies',
          },
          {
            to: '/news',
            position: 'left',
            label: 'News',
          },
          {
            to: '/technical-blogs',
            position: 'left',
            label: 'Technical Blog',
          },
          {
            href: '/disclaimer',
            label: 'Download Demo',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
            className: 'langDropdown'
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
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/docs/tutorials',
              },
              {
                label: 'How-to guides',
                to: '/docs/guides',
              },
              {
                label: 'References',
                to: '/docs/references',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/ShifuFramework',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/7yXmbQm8ns',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/user/ShifuFramework/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/edgenesis/shifu',
              },
              {
                label: 'Download Demo',
                href: '/disclaimer',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Edgenesis. | <a href="https://beian.miit.gov.cn/">京ICP备2021037926号</a>  | <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802039843">京公网安备11010802039843号</a>`,
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
