

#  ESLint

> Lint:代码风格检查（Code Linting，简称 Lint）是保障代码规范一致性的重要手段
>
> - 减少bug.
> - 提高开发效率
> - 提高代码可读性

### 什么是ESLint

ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

因为js是弱类型语言，编程灵活时会有很多不易发现的雷。除了明显的语法错误之外，很多隐含的错误在运行的时候才会突现。比如我们在转测或者现网经常遇到的`xx is undefined`导致页面崩了。

ESLint 插件化的js代码检测工具：

- 检查js代码错误
- 代码风格检查---prettier

### ESLint的配置

##### 安装使用步骤

> 安装：
>
> ```javascript
> npm install -g eslint
> ```
>
> 设置配置文件：
>
> ```javascript
> eslint --init
> ```
>
> 文件或者项目运行eslint
>
> ```javascript
> eslint xxx.js
> ```

栗子：

```javascript
//test-eslint.js
var infoObj=[{name:"张三",age:30},
             {name:"李四",age:20},
             {name:"王五",age:40}
			];
//升序排列
function compare(property){
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;
    }
}
var sortObj = infoObj.sort(compare("age"));
console.log(sortObj); 
```

package.json内`eslintConfig`：

```javascript
{
  "name": "eslint-test",
  "version": "1.0.0",
  "description": "eslint-test",
  "main": "test-eslint.js",
  "scripts": {
    ...
  },
  "author": "zhaomeiling",
  "license": "ISC",
  "devDependencies": {
    ...
  },
  "eslintConfig": {
    "extends": "eslint:recommended",
    "env": {
        "node": true
    },
    "rules": {
        "no-console": "off"
    },
    ...
  }
}

```

或者.eslintrc.js （*ESLint 会查找和自动读取它们*）

```javascript
module.exports = {
    extends: "eslint:recommended",
    env: {                              //脚本的运行环境
        node: true
    },
    rules: {                            //启用的规则及其各自的错误级别
        'no-console': 'off',
    }
};
```

##### 常见配置

```javascript
module.exports = {
    extends: [                  //继承配置
        "eslint:recommended",
        "prettier"
    ],
    parserOptions: {
        ecmaVersion: 6,     //指定ECMAScript支持的版本，6为ES6
        sourceType: "module", //指定来源的类型，有两种”script”或”module”
        ecmaFeatures: {     //想使用的额外的语言特性
            jsx: true      //启动JSX
        }
    },
    plugins: [
		"prettier"
	],
    env: {                              //脚本的运行环境
        browser: true,
        node: true,
        es6: true
    },
    rules: {                            //启用的规则及其各自的错误级别
        ...
    },
    overrides: [                        //如果同一个目录下的文件需要有不同的配置
        {
            ...
        }
    ]
};
```

##### 规则错误级别

> - `"off"` 或 `0` - 关闭规则
> - `"warn"` 或 `1` -使用警告级别的错误
> - `"error"` 或 `2` - 使用错误级别的错误

##### 规则释义

```javascript
rules: {                            //启用的规则及其各自的错误级别
        'no-console': 'off',            //启用 console
        'eqeqeq':'error',                //要求使用 === 和 !==
        'no-return-assign':'error',      //禁止 return 一个赋值表达式
        'no-constant-condition':'error', //禁止在 if/while/for 等判断条件中出现永远不变的判断结果
        'no-empty':'error',              //禁止出现空代码块，比如 if/else/for/catch 等代码块都在报警之列
        'no-empty-function':'error',     //禁止出现空函数
        'valid-jsdoc':'error',          //强制使用有效JSDoc注释,参数，返回
        'no-fallthrough':'error',       //禁止case落空，在 switch/case 语句中出现了穿透特性     
        'no-param-reassign':'error',     //禁止对 function 的参数进行重新赋值
    }
```

### eslint与prettier配合使用

http://web.jobbole.com/94786/?tdsourcetag=s_pctim_aiomsg



### lint-staged构建代码检查

##### 安装和配置步骤

> 安装依赖
>
> ```javascript
> npm install -D lint-staged
> ```
>
> 修改package.json配置
>
> ```javascript
> {
>   "scripts": {
>     "precommit": "lint-staged"
>   },
>   "lint-staged": {
>     "src/**/*.js": "eslint"
>   }
> }
> ```
>
> 算法
>
>



















https://segmentfault.com/a/1190000009546913

