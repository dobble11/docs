const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: env.dev ? '[name].js' : '[name].js?[hash:8]',
    chunkFilename: env.dev ? '[name].chunk.js' : '[name].chunk.js?[hash:8]'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
              plugins: ['syntax-dynamic-import'] // polyfill import()
            }
          },
          {
            test: /\.css$/,
            use: env.dev
              ? ['style-loader', 'css-loader']
              : ExtractTextPlugin.extract({
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1,
                        minimize: true
                      }
                    }
                  ]
                })
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'dist/media/[name].[ext]?[hash:8]'
            }
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'dist/media/[name].[ext]?[hash:8]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].css?[hash:8]',
      disable: env.dev ? true : false
    }),
    new CopyWebpackPlugin([
      {
        from: 'public'
      }
    ])
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    //minimizer: [new UglifyJsPlugin({...})]
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 80,
    stats: 'errors-only'
  },
  devtool: env.dev ? '#eval-source-map' : '#source-map'
});
