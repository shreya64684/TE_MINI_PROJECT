const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    constants: require.resolve("constants-browserify"),
    os: require.resolve("os-browserify/browser"),
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    assert: require.resolve("assert"),
    url: require.resolve("url"),
    zlib: require.resolve("browserify-zlib"),
    buffer: require.resolve("buffer"),
    process: require.resolve("process/browser"),
    path: require.resolve("path-browserify")
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ]);

  return config;
};
