const webpack = require("@nativescript/webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

  // // https://stackoverflow.com/questions/64402821/module-not-found-error-cant-resolve-util-in-webpack
  // webpack.chainWebpack(config => {
  //   // console.log('XXX chainWebpack!! XXX')
  //   // process.exit(1)
  //   config.plugin("polyfills").use(new NodePolyfillPlugin({
  //     'node:zlib': require.resolve('zlib')
  //   }))
  // })

	return webpack.resolveConfig();
};


// {
  // resolve: {
  //   fallback: {
  //     util: require.resolve('util')
  //   }
  // },
  // plugins: [
  //   new NodePolyfillPlugin()
  // ]
// }