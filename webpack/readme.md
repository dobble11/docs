# webpack

## 目录

- 核心概念
- 开始
- 常用配置
- 分割 css
- 分割 js（代码分割）

## 核心概念

- 入口(entry)
- 输出(output)
- 加载器(loader)
- 插件(plugins)

## 开始

```sh
npm i -D webpack
npm i -D webpack-dev-server
```

如果你使用 webpack 4+ 版本，你还需要安装 CLI。

```sh
npm install -D webpack-cli
```

webpack 配置文件默认名为：`webpack.config.js` or `webpackfile.js` 也可以通过 CLI 的 `--config xxx.js`设置

一个简单的 scripts 配置

```json
  "scripts": {
    "start": "start chrome http://127.0.0.1 && webpack-dev-server --inline --hot --env.dev",
    "build": "rimraf dist && webpack -p --progress --hide-modules"
  }
```

- `--inline`：启用内联模式，当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时。这可能显得很繁琐。
- `--hot`：启用模块热替换
- `--env.dev`：设置 `process.env.NODE_ENV` 值为 `development`
- `-p`：设置 `process.env.NODE_ENV` 值为 `production` ，并会启用 `UglifyJSPlugin` 来压缩代码
- `--progress`：打印打包进度
- `--hide-modules`：折叠打印模块信息

webpack 配置接收三种类型选项

- 导出为一个函数
  > 环境对象(environment)作为第一个参数。有关语法示例，请查看[CLI 文档的环境选项](/api/cli#environment-options)。
  > 一个选项 map 对象（`argv`）作为第二个参数。这个对象描述了传递给 webpack 的选项，并且具有 [`output-filename`](/api/cli/#output-options) 和 [`optimize-minimize`](/api/cli/#optimize-options) 等 key。

```js
module.exports = (env, argv) => {
  devtool: env.production ? 'source-maps' : 'eval';
  /* ... */
};
```

- 导出为一个 Promise

```js
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js'
        /* ... */
      });
    }, 5000);
  });
};
```

- 导出多个配置对象

```js
module.exports = [
  {
    output: {
      filename: './dist-amd.js',
      libraryTarget: 'amd'
    },
    entry: './app.js',
    mode: 'production'
  },
  {
    output: {
      filename: './dist-commonjs.js',
      libraryTarget: 'commonjs'
    },
    entry: './app.js',
    mode: 'production'
  }
];
```

## 常用配置

##### 1.安装相关依赖包

```sh
npm i -D @babel/core @babel/preset-env babel-loader css-loader file-loader style-loader url-loader
npm i -D html-webpack-plugin
```

##### 2.创建**webpack.cofig.js**文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => ({
  entry: 'index', //output file name默认为main
  entry: ['one', 'two'], //output：main.js
  entry: {
    main: 'index',
    verdor: ['react', 'react-redux']
  }, //output: main.js verdor.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    filename: '[name].js?[hash:8]'
  },
  module: {
    rules: [
      // 模块规则（配置 loader、解析器等选项）

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //loader配置选项
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        loader: 'file-loader',
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        options: {
          name: 'dist/media/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    host: '127.0.0.1',
    port: 80,
    stats: 'errors-only'
  },
  devtool: env.dev ? '#eval-source-map' : '#source-map' //生产环境生成.map文件
});
```

> 注：一个完整的配置的例子 [`webpack.config.js`](https://github.com/dobble11/docs/blob/master/webpack/webpack.config.js)，不包含代码分割

## 分割 css

webpack 默认将 css 打包进 js 中，当不使用 js 完全控制渲染时，就会带来一些问题：

- 首次加载页面时会出现片刻无样式问题，由于 webpack 添加打包后 js 放在 body 的最后位置
- 修改打包后的 css 带来困难（主要原因）
- 导致单个 js 包过大

##### 1.安装 `extract-text-webpack-plugin` 插件

```sh
npm i -D extract-text-webpack-plugin
```

> 如果使用 webpack 4+版本，需要安装 `npm i -D extract-text-webpack-plugin@next` 作为替换

##### 2.修改 `webpack.config.js` 配置文件

```diff
+ const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = (env = {}) => ({
  module: {
    rules: [
      {
          {
            test: /\.css$/,
+            loader: ExtractTextPlugin.extract({
+              fallback: {
+                loader: 'style-loader',
+                options: {
+                  hmr: true
+                }
+              },
+              use: [
+                {
+                  loader: 'css-loader',
+                  options: {
+                    importLoaders: 1,
+                    minimize: true
+                  }
+                }
+              ]
+           }),
            exclude: /node_modules/
          },
      }
    ]
  },
  plugins: [
+    new ExtractTextPlugin({
+      filename: '[name].css?[hash:8]'
+    })
  ]
});
```

## 分割 js
