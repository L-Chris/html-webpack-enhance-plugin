# html-webpack-enhance-plugin
enhance html-webpack-plugin features

## Install
```
npm i html-webpack-enhance-plugin -D
yarn add html-webpack-enhance-plugin -D
```

## ✨ Features:

- override publicPath options in webpack config

## Usage

**webpack.config.js**

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackEnhancePlugin = require('html-webpack-enhance-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackEnhancePlugin({
      publicPath: ''
    })
  ]
}
```