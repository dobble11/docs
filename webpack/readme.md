# webpack

## 目录

- [核心概念](#核心概念)
- [开始](#开始)
- [常用配置](#常用配置)
- [分离 css](#分离-css)
- [分割 js（代码分割）](#分割-js)

## 核心概念

- 入口(entry)
- 输出(output)
- 加载器(loader)
- 插件(plugins)

webpack 是一个现代 JavaScript 应用程序的静态模块打包器，当 webpack 处理应用程序时，它会从入口开始递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

loader 将各种类型文件转换成 webpack 能够处理的有效模块。（由于 webpack 自身只能理解 JavScript）

> 在 webpack 的配置中 loader 有两个重要属性：
>
> - `test` ：用于标识出需要处理某个或某些文件。
> - `use` ：表示应该使用哪些 loader，当只有一个 loader 时，可以使用 `loader` 属性

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

## 开始

> 一个快速使用 webpack 的项目[模板](https://github.com/dobble11/docs/tree/master/webpack)

```sh
npm i -D webpack
npm i -D webpack-dev-server
```

如果你使用 webpack 4+ 版本，你还需要安装 CLI。（由于 webpack 4+ 后将 cli 部分分离成独立模块，通过 cli 方式调用需要安装，例如 react 通过 api 方式调用则不需要）

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

- `start`：windows 命令，用于启动程序或打开文件
- `--inline`：启用内联模式，当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时。这可能显得很繁琐。
- `--hot`：启用模块热替换
- `--env.dev`：设置 `process.env.NODE_ENV` 值为 `development`
- `-p`：设置 `process.env.NODE_ENV` 值为 `production` ，并会启用 `UglifyJSPlugin` 来压缩代码
- `--progress`：打印打包进度
- `--hide-modules`：折叠打印模块信息
- `rimraf`：一个支持 cli 方式删除文件或文件夹的 node 包（安装 `npm i -D rimraf`）

webpack 配置接收三种类型选项

- 导出为一个函数
  > 环境对象(environment)作为第一个参数。有关语法示例，请查看[CLI 文档的环境选项](/api/cli#environment-options)。
  > 一个选项 map 对象（`argv`）作为第二个参数。这个对象描述了传递给 webpack 的选项，并且具有 [`output-filename`](/api/cli/#output-options) 和 [`optimize-minimize`](/api/cli/#optimize-options) 等 key。

```js
module.exports = (env, argv) => ({
  devtool: env.production ? 'source-maps' : 'eval';
  /* ... */
});
```

- 导出一个返回 Promise 的函数

```js
module.exports = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js'
        /* ... */
      });
    }, 5000);
  });
```

- 导出多个配置对象数组或单个对象

```js
module.exports = [
  {
    entry: './app.js',
    output: {
      filename: './dist-amd.js',
      libraryTarget: 'amd'
    },
    mode: 'production'
  },
  {
    entry: './app.js',
    output: {
      filename: './dist-commonjs.js',
      libraryTarget: 'commonjs'
    },
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

// 以下多个相同属性，只是为演示可接收的多种类型值，实际只需要选择一种
module.exports = (env = {}) => ({
  entry: 'index.js', // output：main.js
  entry: ['one.js', 'two.js'], // output：main.js
  entry: {
    // 当为对象时，key作为文件名
    one: 'one.js',
    two: 'two.js'
  }, // output: one.js two.js，如果两个js中引用相同模块，则会重复打包，可以将公共模块独立打包
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'bundle.js',
    filename: '[name].js?[hash:8]',
    chunkFilename: '[name].chunk.js?[hash:8]' // 代码分割的输出文件名，默认从0开始累加
  },
  module: {
    rules: [
      // 模块规则配置
      // loader：用于处理的loader，需要使用多个loader使用use属性
      // options：loader的配置选项

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
        use: ['style-loader', 'css-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000, // 限制转换base64图片的文件大小不超过10K，否则由file-loader处理
          name: 'dist/media/[name].[ext]?[hash:8]' //用于file-loader选项
        }
      },
      {
        // 只进行简单复制文件
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        loader: 'file-loader',
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
  devtool: env.dev ? '#eval-source-map' : '#source-map' // 生产环境生成.map文件
});
```

> 注：一个完整的配置的例子 [`webpack.config.js`](https://github.com/dobble11/docs/blob/master/webpack/webpack.config.js)，不包含代码分割

#### 常用 loader

- [`babel-loader`](https://www.webpackjs.com/loaders/babel-loader) 加载 ES2015+ 代码，然后使用 [Babel](https://babeljs.io/) 转译为 ES5
- [`url-loader`](https://www.webpackjs.com/loaders/url-loader)如果文件小于限制返回 data URL，否则使用 file-loader 处理
- [`file-loader`](https://www.webpackjs.com/loaders/file-loader) 将文件发送到输出文件夹，并返回（相对）URL
- [`style-loader`](https://www.webpackjs.com/loaders/style-loader) 将模块的导出作为样式添加到 DOM 中
- [`css-loader`](https://www.webpackjs.com/loaders/css-loader) 解析 import 加载的 CSS 文件，并且返回 CSS 代码

更多第三方 loader，查看 [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#loaders) 列表。

#### 常用 plugin

| Name                                                                                        | Description                              |
| ------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin)              | 提取 chunks 之间共享的通用模块           |
| [`CopyWebpackPlugin`](https://www.webpackjs.com/plugins/copy-webpack-plugin)                | 将单个文件或整个目录复制到构建目录       |
| [`DefinePlugin`](https://www.webpackjs.com/plugins/define-plugin)                           | 允许在编译时(compile time)配置的全局常量 |
| [`DllPlugin`](https://www.webpackjs.com/plugins/dll-plugin)                                 | 为了极大减少构建时间，进行分离打包       |
| [`ExtractTextWebpackPlugin`](https://www.webpackjs.com/plugins/extract-text-webpack-plugin) | 从 bundle 中提取文本（CSS）到单独的文件  |
| [`HtmlWebpackPlugin`](https://www.webpackjs.com/plugins/html-webpack-plugin)                | 简单创建 HTML 文件，用于服务器访问       |
| [`I18nWebpackPlugin`](https://www.webpackjs.com/plugins/i18n-webpack-plugin)                | 为 bundle 增加国际化支持                 |
| [`IgnorePlugin`](https://www.webpackjs.com/plugins/ignore-plugin)                           | 从 bundle 中排除某些模块                 |
| [`ProvidePlugin`](https://www.webpackjs.com/plugins/provide-plugin)                         | 不必通过 import/require 使用模块         |
| [`UglifyjsWebpackPlugin`](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin)        | 可以控制项目中 UglifyJS 的版本           |

更多第三方插件，请查看 [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins) 列表.

## 分离 css

webpack 默认将 css 打包进 js 中，当不使用 js 完全控制渲染时，就会带来一些问题：

- 首次加载页面时会出现片刻无样式问题，由于 webpack 添加打包后 js 放在 body 的最后位置
- 修改打包后的 css 带来困难（主要原因）
- 导致单个 js 包过大

##### 1.安装 `extract-text-webpack-plugin` 插件

```sh
npm i -D extract-text-webpack-plugin
```

> 如果使用 webpack 4+版本，需要安装 `npm i -D extract-text-webpack-plugin@next` 作为替换，也可以使用更轻量级，基于 4+实现的插件 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

##### 2.修改 `webpack.config.js` 配置文件

```diff
+ const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = {}) => ({
  module: {
    rules: [
          {
             test: /\.css$/,
+            loader: ExtractTextPlugin.extract({
+              fallback: {  // 当不分离css时，使用该loader，也就是开发环境使用
+                loader: 'style-loader',
+                options: {
+                  hmr: false
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

> warn：由于 `ExtractTextPlugin` 插件只适用于生产环境不支持热替换，如果不想创建两个配置文件，我们可以通过 `env.dev` 来达到区分开发与生产，具体实现参考 [`webpack.config.js`](https://github.com/dobble11/docs/blob/master/webpack/webpack.config.js)

## 分割 js

正是由于 webpack 默认将所有模块打包进一个 js 文件中，导致单个 js 文件过大，加载当前页面不需要的 js 等问题，虽然可以通过设置 `entry` 为多个入口，将公共模块打包进独立的 js 文件中，`main.js` 中只包含业务代码，但随着项目业务的不断增多，还是无法解决单个 js 文件过大问题。

> 代码分割能解决那些问题
>
> - 单个 js 文件过大
> - 模块的按需加载，提高页面响应速度

基于路由将各个组件打包进独立的 js 文件中，不仅可以减小主 js 文件的大小，还可以避免加载不必要的组件，来提高页面的响应速度。

webpack 支持最新的 es 提案 [`import()`](http://es6.ruanyifeng.com/#docs/module#import) 函数，这种方式导入的模块会返回一个 `Promise` 对象，webpack 也会以此为分割点来划分到独立 js 文件中，并由 webpack 来控制相应 js 文件的按需加载，我们只需要关心模块的使用。

由于返回的是 `Promise` 对象，无法与 `Route` 组件直接使用，为了讲解简单，直接推荐第二种方法，使用第三方包。（原文 [Code Splitting in Create React App](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html) ）

##### 1.安装 `react-loadable`

```sh
npm i react-loadable
```

##### 2.修改使用 `Route` 组件部分的引用

```diff
+import Loadable from 'react-loadable';
-import App from './App';
-import SignIn from './SignIn';
-import Demo from './Demo';

+const App = Loadable({
+  loader: () => import('./App'),
+  loading: () => null
+});
+const SignIn = Loadable({
+  loader: () => import('./SignIn'),
+  loading: () => null
+});
+const Demo = Loadable({
+  loader: () => import('./Demo'),
+  loading: () => null
+});

ReactDOM.render(
  <Router>
    <div className="wraper">
      <Route exact path="/" component={App} />
      <Route path="/home" component={App} />
      <Route path="/demo" component={Demo} />
      <Route path="/signin" component={SignIn} />
    </div>
  </Router>,
  document.getElementById('root')
);
```

> 下一篇：[webpack 打包速度优化的方法](https://github.com/dobble11/docs/blob/master/webpack/webpack%E6%89%93%E5%8C%85%E9%80%9F%E5%BA%A6%E4%BC%98%E5%8C%96%E7%9A%84%E6%96%B9%E6%B3%95.md)
