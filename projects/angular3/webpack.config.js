const webpack = require('webpack');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const mf = require('@angular-architects/module-federation/webpack');
const share = mf.share;

module.exports = {
  output: {
    uniqueName: "angular3",
    publicPath: "http://localhost:4201/",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angular3",
      library: { type: "var", name: "angular3" },
      filename: "remoteEntry.js",
      exposes: {
        './web-components': './projects/angular3/src/bootstrap.ts',
      },
      shared: share({
        "@angular/core": { eager: true, requiredVersion:'auto' },
        "@angular/common": { eager: true, requiredVersion:'auto' },
        "@angular/router": { eager: true, requiredVersion:'auto' },
        "rxjs": { eager: true, requiredVersion:'auto' }
      })
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 2
    })
  ]
};
