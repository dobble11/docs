# webpack 打包速度优化的方法

webpack 是个模块化打包工具，所以影响打包速度的因素主要取决于打包量。

我们将从减少打包量和 webpack 配置优化两方面讲解优化方法。

## 减少打包量

#### 1.模块按需引入

例如 antd、echarts、lodash 都支持按需引入，其它支持请查看各包使用文档

```diff
! lodash
-import _ from 'lodash';
+import _map from 'lodash/map';

var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];

// => ['barney', 'fred']
-_.map(users, 'user');
+_map(users, 'user');

! antd
-import { Button } from 'antd';
+import Button from 'antd/lib/button';
+import 'antd/lib/button/style/css';
// 如果整体引入样式（import 'antd/dist/antd.css'），则css无法按需引入

! echarts
-import echarts from 'echarts';
+import echarts from 'echarts/lib/echarts';
+import 'echarts/lib/component/tooltip';
+import 'echarts/lib/component/title';
+import 'echarts/lib/chart/line';
```

> 一些插件可以保持当前整体引入的写法，通过插件自动转换成按需引入写法
>
> - lodash：[babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)
> - antd：[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

#### 2.移除未使用的引入模块

未使用的引入，webpack 还是会进行打包，可以开启 eslint 的 `no-unused-vars` 规则为 `error` 避免不必要的导入，还可以限制空函数等。

#### 3.统一技术栈，避免同类型包引入

## webpack 配置优化

开发环境应该避免不必要的 loader 与 plugin ，如 postcss，uglifyjs-webpack-plugin 等，只启用保证运行的工具。

#### 1.移除不必要的 polyfill 与兼容 loader（适用 dev）

```diff
//webpack.config.dev.js
module.exports = {
  entry: [
-   require.resolve('./polyfills')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
              'style-loader',
              'css-loader',
-             'postcss-loader'
              ]
      }
    ]
  }
};
```

#### 2.DllPlugin 预编译与 IgnorePlugin 忽略语言文件打包（适用 dev 和 prod）

可以通过 DllPlugin 插件将公共模块预编译，减少构建时间

- 创建 config/webpack.config.dll.js 文件

```js
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
```

- 修改 package.json 的 scripts

```diff
  "scripts": {
+    "build:dll": "webpack --config config/webpack.config.dll.js -p"
  }
```

运行 `npm run build:dll` 会在 config/ 下生成 vendor-manifest.json 打包清单文件，用于 DllReferencePlugin 插件忽略掉已预编译的模块，从而减少打包量。
同时会在 public/static/js/ 下生成打包文件

- 修改 dev 与 prod 的 webpack 配置文件

```diff
module.exports = {
  plugins: [
+    new webpack.DllReferencePlugin({
+     manifest: require('./vendor-manifest.json')
+    })
  ]
};
```

- 修改 index.html 添加 dll 包的引用

```diff
+  <script src="%PUBLIC_URL%/static/js/vendor.dll.js"></script>
```

> 注：如果报公共库找不到，先检查 public/static/js/vendor.dll.js 是否存在，否则先构建公共库 `npm run build:dll`，如果修改或升级预编译的模块也需要重新构建公共库

## 升级 webpack 等构建工具
