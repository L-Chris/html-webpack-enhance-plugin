module.exports = class HtmlWebpackEnhancePlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    const self = this
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-html-processing', function (data, callback) {
        const oldPublicPath = data.assets.publicPath
        data.html = data.html.replace(new RegExp(`=(")?${oldPublicPath}`, 'g'), `=$1${self.options.publicPath}`)
        callback(null, data)
      })
    })
  }
}