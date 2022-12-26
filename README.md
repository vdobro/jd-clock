# jd-clock

`jd-clock` (JD laikmatis) is a simple countdown timer app, developed for usage in debates as developed by [Jaunimo debatai](https://jaunimodebatai.eu) within the scope of project "Ateitis yra šiandien" ("The future is now").

## Building

Use the package manager [yarn](https://yarnpkg.com/) to build `jd-clock`.

```bash
yarn install
yarn build
```

## Usage

You can either use `jd-clock` as a standalone app or embed it in any web page, e.g. a [WordPress](https://wordpress.org/) blog, by simply including the bundled script and creating an empty div with ID `jd-clock-root`.

You can use the following example snippet as a reference:
 
```html
<script type="module" crossorigin src="https://example.com/assets/index.js"></script>
<div id="jd-clock-root"></div>
```

## Contributing

Pull requests are welcome, especially any regarding internationalization, accessibility and testing. For major changes, please open an issue first
to discuss what you would like to change.

## License

[AGPL](https://choosealicense.com/licenses/agpl/)
