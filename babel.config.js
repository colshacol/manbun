module.exports = {
  "presets": [
    "@babel/preset-flow",
    '@babel/preset-env',
    "@babel/preset-react",
  ],

  "plugins": [
    // "@babel/plugin-transform-runtime",
    "babel-plugin-transform-dev-warning",
    "babel-plugin-jsx-control-statements",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties"
  ]
}