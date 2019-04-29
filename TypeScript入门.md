# Typescript 入门

## 引言

Typescript 优势：

- 静态类型检查与代码提示
- 适用大型项目开发，如代码重构等
- 更好的协作
- 更强的生产力

## Typescript 类型系统

![image](https://note.youdao.com/yws/public/resource/2977a2eee38c81c6adafee2e9b196dea/xmlnote/D3C48ECFDB1941FABB1D194D8DD832FC/14093)

## Typescript 项目基本构成

一个 react+ts 项目的目录结构：

```sh
├── /@types/                     # 全局类型声明
├── /config/                     # Create React App脚手架webpack配置文件目录
├── /scripts/                    # npm执行脚本目录
├── /src/                        # 源码目录
│ ├── /actions/                  # action目录
│ ├── /assets/                   # 静态资源目录
│ ├── /components/               # 公共组件目录
│ ├── /constants/                # 项目constants目录
│ │ ├── _const.scss              # scss常量
│ │ ├── ActionTypes.ts           # ActionType常量
│ │ └── Api.ts                   # API常量
│ ├── /pages/                    # UI组件目录
│ ├── /reducer/                  # reducer目录
│ ├── /services/                 # 请求服务目录
│ ├── /store/                    # 存放store文件目录
│ ├── /style/                    # 全局样式
│ ├── /utils/                    # utils目录
│ │ ├── request.ts               # 基于fetch封装的API请求工具
│ │ ├── global.ts                # 公共方法库
│ └── index.tsx                  # 项目入口
|——tsconfig.json                 # ts配置
|——...
```

### tsconfig.json

在项目根目录下，这个 json 文件规定了 ts 的编译选项，相见的编译选项配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".", // 用于解析非相对模块名称的基目录
    "outDir": "build/dist", // 指定输出目录
    "module": "esnext", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "target": "es5", // 指定 ECMAScript 目标版本:
    "lib": ["dom", "esnext"], // 指定要包含在编译中的库文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "allowJs": true, // 允许编译 javascript 文件
    "jsx": "react", // 指定 jsx 代码的生成: 'preserve', 'react-native'等
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic'
    "strict": true // 启用所有严格类型检查选项
  },
  "include": ["src/**/*", "@types/**/*"], // 编译包含的问题件
  "exclude": [
    "node_modules",
    "build",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts",
    "config"
  ] // 排除的文件
}
```

### 声明文件

#### @types

安装第三方库之前，我们可以[搜索 DefinitelyTyped](https://microsoft.github.io/TypeSearch//)，查看是否有第三方在维护类型声明。通过@types 安装，就能在项目中使用它的类型声明。

```ts
// IDE中按下F12，跳转中定义文件
// Partial :把 interface 所有属性变成可选
// node_modules/typescript/lib/lib.es5.d.ts,安装ts的时候生成
type Partial<T> = { [P in keyof T]?: T[P] };

// Event
// node_modules/@types/react/index.d.ts,通过@types安装react的时候生成
handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation();
};

// RouteComponentProps:提供了 location、history 的类型定义
// node_modules/@types/react-router/index.d.ts
interface HomeProps extends RouteComponentProps {}
```

#### 自定义声明文件

扩展名.d.ts 结尾就是项目中的声明文件。在上面的项目中，我们创建了一个名为@types 的文件夹，用来维护项目中需要的变量声明。

1. 全局变量声明

```ts
declare const config: {
  version: string;
  systemName: string;
  debug: boolean;
};

declare interface IResponseBody<T> {
  data: T;
  code: number;
  total: number;
}
```

2. 非 js 资源

```ts
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

declare module '*.module.css';
declare module '*.module.scss';
```

## jsx

用 ts 在 React 中编写 jsx 要注意：

- 使用文件后缀 .tsx,并在 tsconfig.json 中设置选项 "jsx": "react"
- 在你的项目里为 JSX 和 React 安装声明文件：yarn add @types/react @types/react-dom -D；
- react.d.ts 文件定义了 React.Component<Props,State>，例用 props 和 state 对组件进行类型检查。

```ts
import * as React from 'react';
import * as L from 'leaflet';

interface MapProps {
  width?: string;
  height?: string;
}
interface MapState {
  map?:L.Map;
}

class Map extends React.Component<MapProps, MapState> {
    static defaultProps:MapProps{
       width: '300px',
       height: '200px'
    }

    state:MapState= {}

    render() {
        return(

        )
    }
}

export default Map;
```

## 类型兼容性

TypeScript 里的类型兼容性是基于结构化类型的。结构类型是一种只使用其成员来描述类型的方式。

```ts
interface Named {
  name: string;
}

let x: Named;
// y 推断的类型是 { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y; // OK
```

TypeScript 结构化类型系统的基本规则是，如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性。也就是赋值语句左边数据结构需要是右边的子集（ any、enum 除外）。

在 TypeScript 里，有两种兼容性：子类型和赋值。 它们的不同点在于，赋值扩展了子类型兼容性，增加了一些规则，**允许和 any 来回赋值，以及 enum 和对应数字值或字符串值之间的来回赋值**。

语言里的不同地方分别使用了它们之中的机制。 实际上，类型兼容性是由赋值兼容性来控制的，即使在 implements 和 extends 语句也不例外。

## 类型保护

1. as 操作符（类型断言）

当你比 ts 更确定其数据类型，你能使用 as 语法确定其类型，但需要遵守类型兼容转换。
另外一种写法：\<typeName\>varName，但不建议使用

```ts
function getDynamicValue():number|string|undefined{
  ...
}

const v=getDynamicValue();  // v:number|string|undefined，联合类型变量只允许访问所有类型共有的属性

// 确定返回 string
(v as string).trim();
```

2. typeof 操作符

```ts
function isNumber(val: any): val is number {
  return typeof val === 'number';
}

const a: any = 1;

if (isNumber(a)) {
  // a:number
}
```

3. instanceof 操作符

```ts
class Base {
  ...
}

class A extends Base{
  ...
}

const inst:Base=new A();

if(inst instanceof Base){
  // inst:A
}
```

4. 函数或变量后面添加 !

当要去掉联合类型的可空类型（null|undefined）,可以使用 js if 语句实现类型保护或短路运算符，也可以使用 Typescript 2.0+ !语法

```ts
const x: string | null = getDynamicValue();

// if判断
if (x) {
  // x:string
}
// 短路运算符
function f(sn: string | null) {
  return sn || '';
}
// !语法
x!.trim();
// or
const r = [1, 2, 3, 4].find(x => x === 3)!; // r:number
```
