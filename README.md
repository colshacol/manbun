# manbun

`manbun` is a CLI tool that aides in developing components for Dreamtsoft bundles.

## Installation

Install with npm: `npm i -D manbun`

Install with yarn: `yarn add -D manbun`

## Overview

`manbun` is a tool that makes developing Dreamtsoft bundles _easier_ and less opinionated. It is a transpiler, a bundler, and a provider of cleaner and simpler API wrappers around APIs provided by Dreamtsoft.

Given this setup:

![](https://i.imgur.com/IOMlrrE.png)

You get this output:

![](https://i.imgur.com/4UPiD5C.png)

## Rules

A component's source directory can be named whatever you like. You have the freedom to choose camel casing or snake casing the name. `/source/components/MyComp` or `/source/components/my_comp`, it is your choice.

Inside of your component's source directory, there are only four requirements in order for `manbun` to work properly.

1. You should have a `.dsconfig.json` file. This JSON data is only slightly different than the data you would find in the various configuration elements within a standard Dreamtsoft `Client.html` file. The main differences, other than the filetype, are as follows:

- Instead of `className`, you will use the sensible and intuitive alternative: `serverName`. The value of `serverName` applies exactly how you would expect it to: It becomes the name of your component's server.

**[WIP]**

## Provided Configurations

### babel

You can and should extend the provided `manbun` Babel configuration inside of your `package.json`.

```json
{
  "babel": {
    "extends": "manbun/babel.config"
  }
}
```

## prettier

If you want, you can also use the provided `manbun` prettier configuration by adding this to your
`package.json`.

```json
{
  "prettier": "manbun/prettier.config"
}
```

## Development Instructions

```sh
yarn scripts build
```

```sh
yarn publish
```
