# manbun

manbun is a CLI tool that helps with developing React components in Dreamtsoft bundles.

`npm i -D manbun`
`yarn add -D manbun`

```
/components
/source
  /components
    /VideoPlayer

```

## babel

```json
// package.json

{
  "babel": {
    "extends": "manbun/babel.config"
  }
}
```

## prettier

```json
// package.json

{
  "prettier": "manbun/prettier.config"
}
```
