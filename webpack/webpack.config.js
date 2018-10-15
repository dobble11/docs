const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: env.dev ? '[name].js' : '[name].js?[hash:8]'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            test: /\.css$/,
            use: env.dev
              ? ['style-loader', 'css-loader']
              : ExtractTextPlugin.extract({
                  fallback: {
                    loader: 'style-loader',
                    options: {
                      hmr: false
                    }
                  },
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1,
                        minimize: true
                      }
                    }
                  ]
                }),
            exclude: /node_modules/
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
      filename: '[name].css?[hash:8]'
    }),
    new CopyWebpackPlugin([
      {
        from: 'public'
      }
    ])
  ],
  devServer: {
    host: '127.0.0.1',
    port: 80,
    stats: 'errors-only'
  },
  devtool: env.dev ? '#eval-source-map' : '#source-map'
});
