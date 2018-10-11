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

**webpack.cofig.js**

```js
const path = require('path');

module.exports = {
  entry: 'index', //output name默认为main
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
          presets: ['@babel/preset-env']
        }
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
  }
};
```

## 分割 css

## 分割 js
