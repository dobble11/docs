# webpack 打包速度优化的方法

webpack 是个模块化打包工具，所以影响打包速度的因素主要取决于打包量。

我们将从减少打包量和 webpack 配置优化两方面讲解优化方法。

## 减少打包量

##### 1.模块按需引入

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

##### 2.移除未使用的引入模块

未使用的引入，webpack 还是会进行打包，可以开启 eslint 的 `no-unused-vars` 规则为 `error` 避免不必要的导入，还可以限制空函数等。

##### 3.统一技术栈，避免同类型包引入

## webpack 配置优化
