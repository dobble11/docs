const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-router-redux',
      'redux',
      'react-redux',
      'redux-thunk',
      'axios',
      'react-intl-universal',
      'antd'
    ]
  },
  output: {
    path: path.join(__dirname, 'public/static/js'), // 放在项目的static/js目录下面
    filename: '[name].dll.js', // 打包文件的名字
    library: '[name]_library' // 暴露出的全局变量名，需要与插件name对应
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'), // 生成模块清单文件
      name: '[name]_library'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            comparisons: false
          },
          warnings: false
        }
      })
    ]
  },
  devtool: 'source-map'
};
