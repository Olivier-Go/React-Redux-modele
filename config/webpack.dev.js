const paths = require('./paths');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Common = require('./webpack.common.js');
const DotenvPlugin = require('dotenv');

const port = 8080;

const env = DotenvPlugin.config({ path: '.env.' + process.env.NODE_ENV}).parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(Common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    // .env
    new webpack.DefinePlugin(envKeys),
  ],
  module: {
    rules: [
      // Styles
      {
        test: /\.(s?css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },

  output: {
    publicPath: '/',
  },

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    clientLogLevel: 'warn',
    overlay: true,
    stats: 'minimal',
    open: false,
    compress: true,
    hot: true,
    port,
    /* For specific Devserver only */
    //disableHostCheck: true,
    //host: '192.168.0.150',
  },
});
