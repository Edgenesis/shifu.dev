# ***Shifu*** Website

## Development

### Install tools (once)

You should have `node` and `yarn` installed on your computer. To install `node`, view <https://nodejs.org/en/download/>. To install `yarn`, use command `npm install --global yarn`.

To check `node` and `yarn` are installed:

```sh
$ node --version
v16.15.1
$ yarn --version
1.22.19
```

### Install dependencies (once)

```sh
$ yarn
```

### Local development

Following commands start a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

```sh
$ yarn start # en SPA
$ yarn start --locale zh-Hans # zh-Hans SPA
```

## Deployment

Following commands generate static content into the `build` directory and can be served using any static contents hosting service.

```sh
$ yarn build # build for en and zh-Hans
$ yarn serve

# build for a specific language
$ yarn build --locale en
$ yarn build --locale zh-Hans
$ yarn serve
```

## Docusaurus

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Internationalization

Reference: <https://docusaurus.io/docs/next/i18n/tutorial#translate-plugin-data>

- Translate React pages
    - Check https://docusaurus.io/docs/i18n/tutorial#translate-your-react-code
- Translate docs
    - Copy and translate docs in `i18n/zh-Hans/docusaurus-plugin-content-docs/current`.
- Translate blog
    - `blog`: Put the translated markdowns in `i18n/zh-Hans/docusaurus-plugin-content-blog`.
    - `blog-tech`: Put the translated markdowns in `i18n/zh-Hans/docusaurus-plugin-content-blog-blog-tech`.
- Translate plugin data
    - Run `yarn write-translations --locale zh-Hans` to generate json files for translating.
    - Translate
        - sidebar items: `i18n/zh-Hans/docusaurus-plugin-content-docs/current/current.json`
        - navbar and footer items: `i18n/zh-Hans/docusaurus-theme-classic/*.json`
- Check translation
    - Run `yarn start --locale zh-Hans` to start website in `zh-Hans` for local development. (Each locale is a distinct standalone single-page application: it is not possible to start the Docusaurus sites in all locales at the same time.)

### Admonition

Reference: <https://docusaurus.io/docs/next/markdown-features/admonitions>

Use grammar below to add a admonition:

```
:::note
A common note.
:::

:::caution Don't use this in production
A caution with title.
:::
```

- `note`: Use `note` if you don't want to block the reading process of the reader.
- `info`: Use `info` to provide some explanations of the content.
- `tip`: Use `tip` if you want user to jump to another page or site.
- `caution`
- `danger`

## Markdown styles

Check [***Shifu***'s Markdown styles](https://github.com/Edgenesis/shifu/blob/main/docs/contribution/markdown-zh.md).
