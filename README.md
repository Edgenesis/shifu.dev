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
$ yarn start-zh # zh-Hans SPA
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
    - Use [official method provided by Docusaurus](https://docusaurus.io/docs/i18n/tutorial#translate-your-react-code):
        - Add `import Translate, {translate} from '@docusaurus/Translate';` at the top of the file.
        - Use `<Translate>string-to-translate</Translate>` to wrap a string as a JSX element;
        - Use `translate({ message: "string-to-translate" }` to take a message and return a string.
        - Save files and run `yarn write-translations-zh`.
        - Add translation in `i18n/zh-Hans/code.json`.
    - Or Use jsx syntax:
        - `{
          localStorage.getItem('manuallySelectLanguage') !== 'zh-Hans' ? (
             en content
          ):(
             cn content
          )`
    -  A Link jump   
        - Add the class name `special` to the parent node of link a
          ```html
          <div className={`${Original class name} special`}>
                <ButtonSquare
                    href={localStorage.getItem('manuallySelectLanguage') !== 'zh-Hans'  ? 'English jump address' : 'Chinese Jump Address'}
                    colorLevel="two" content={translate({message: "Decline"})}></ButtonSquare>
          </div>
          ```
          These two tag should appear at the same position.
- Translate docs
    - Copy and translate docs in `i18n/zh-Hans/docusaurus-plugin-content-docs/current`.
- Translate blog
    - `blog`: Put the translated markdowns in `i18n/zh-Hans/docusaurus-plugin-content-blog`.
    - `blog-tech`: Put the translated markdowns in `i18n/zh-Hans/docusaurus-plugin-content-blog-blog-tech`.
- Translate plugin data
    - Run `yarn write-translations-zh` to generate json files for translating.
    - Translate
        - sidebar items: `i18n/zh-Hans/docusaurus-plugin-content-docs/current/current.json`
        - navbar and footer items: `i18n/zh-Hans/docusaurus-theme-classic/*.json`
- Check translation
    - Run `yarn start-zh` to start website in `zh-Hans` for local development. (Each locale is a distinct standalone single-page application: it is not possible to start the Docusaurus sites in all locales at the same time.)

### Admonition

Reference: <https://docusaurus.io/docs/next/markdown-features/admonitions>

Use grammar below to add a admonition:

```
:::note
A common note.
:::
```

```
:::caution Don't use this in production
A caution with title.
:::
```

- `note`: Use `note` if you don't want to block the reading process of the reader.
- `info`: Use `info` to provide some explanations of the content.
- `tip`: Use `tip` if you want user to jump to another page or site.
- `caution`
- `danger`

### Images

To add an image file in `docs`, you can directly add it at the same position with the markdown file. Or you can create a folder called `images` or `res` at the same level. To use these images in Markdown, use the **relative** path. Notice that images for `en` and `zh-Hans` are in different folders (eg. `/docs/images` and `/i18n/zh-Hans/docusaurus-plugin-content-docs/images`).

To add an image file in `blog`, you should add the image file in `/static`. And in Markdown, you should use the **absolute** paths to refer to according images. Notice that images for `en` and `zh-Hans` are in the same folder (eg. `/static/blog1`).

## Markdown styles

Check [***Shifu***'s Markdown styles](https://github.com/Edgenesis/shifu/blob/main/docs/contribution/markdown-zh.md).
