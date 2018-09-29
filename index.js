module.exports = class HtmlWebpackEnhancePlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    const self = this

    compiler.plugin('compilation', function (compilation) {
      compiler.plugin('html-webpack-plugin-before-html-processing', function (data, callback) {
        const oldPublicPath = self.getOriginPublicPath(compilation)
        const {assets} = data

        // deal with assets
        Object.keys(assets).forEach(key => {
          const assetList = assets[key]
          if (!Array.isArray(assetList)) return
          assetList.forEach((_, i) => {
            if (!assets[key][i].path) return
            assets[key][i].path = assets[key][i].path.replace(new RegExp(`${oldPublicPath}`), self.options.publicPath)
          })
        })

        // deal with html
        data.html = data.html.replace(new RegExp(`="${oldPublicPath}`, 'g'), `="${self.options.publicPath}`)

        callback(null, data)
      })
    })
  }

  getOriginPublicPath (compilation) {
    const compilationHash = compilation.hash

    let publicPath = typeof compilation.options.output.publicPath !== 'undefined'
      // If a hard coded public path exists use it
      ? compilation.mainTemplate.getPublicPath({hash: compilationHash})
      // If no public path was set get a relative url path
      : path.relative(path.resolve(compilation.options.output.path, path.dirname(this.childCompilationOutputName)), compilation.options.output.path)
        .split(path.sep).join('/')

    if (publicPath.length && publicPath.substr(-1, 1) !== '/') {
      publicPath += '/'
    }

    return publicPath
  }
}