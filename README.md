# ***Shifu*** Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Usage

### Development

```sh
$ yarn # install packages

$ yarn start # zh-Hans SPA
$ yarn start --locale en # en SPA
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```sh
$ yarn build # zh-Hans and en

# build SPA of a specific language
$ yarn build --locale zh-Hans
$ yarn build --locale en
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```sh
$ USE_SSH=true yarn deploy
```

Not using SSH:

```sh
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Docusaurus

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

### Internationalization

Reference: <https://docusaurus.io/docs/next/i18n/tutorial#translate-plugin-data>

- Translate React pages
    - Check https://docusaurus.io/docs/i18n/tutorial#translate-your-react-code
- Translate docs
    - Copy and translate docs in `i18n/en/docusaurus-plugin-content-docs/current`.
- Translate plugin data
    - Run `yarn run write-translations --locale en` to generate json files for translating.
    - Translate
        - sidebar items: `i18n/en/docusaurus-plugin-content-docs/current/current.json`
        - navbar and footer items: `i18n/en/docusaurus-theme-classic/*.json`
- Check translation
    - Run `yarn start --locale en` to start website in `en` for local development. (Each locale is a distinct standalone single-page application: it is not possible to start the Docusaurus sites in all locales at the same time.)
