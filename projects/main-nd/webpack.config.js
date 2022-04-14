const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const mf = require("@angular-architects/module-federation/webpack");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();

module.exports = {
  output: {
    uniqueName: "main-nd",
    publicPath: "http://localhost:4200/",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases()
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        "angular3": "angular3@http://localhost:4201/remoteEntry.js"
      },
      shared: share({
        "@angular/core": { eager: true, singleton: true, requiredVersion: 'auto' },
        "@angular/common": { eager: true, singleton: true, requiredVersion: 'auto' },
        "@angular/router": { eager: true, singleton: true, requiredVersion: 'auto' },
        "@angular/common/http": { eager: true, singleton: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors()
      })
    }),
    sharedMappings.getPlugin()
  ]
};
