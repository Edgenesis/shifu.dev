# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

#### Internationalization

- Translate docs
    - Translate docs in `i18n/en/docusaurus-plugin-content-docs/current`.
- Translate plugin data
    - Run `yarn run write-translations -- --locale en` to generate json files for translating.
    - Translate
        - sidebar items: `i18n/en/docusaurus-plugin-content-docs/current/current.json`
        - navbar and footer items: `i18n/en/docusaurus-theme-classic/*.json`
- Check translation
    - Run `yarn start -- --locale en` to start website in `en` for local development. (Each locale is a distinct standalone single-page application: it is not possible to start the Docusaurus sites in all locales at the same time.)

Reference: <https://docusaurus.io/docs/next/i18n/tutorial#translate-plugin-data>

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
