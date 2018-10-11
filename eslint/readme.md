

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
            "files": [ "lib/*.js" ],
            "excludedFiles": "*.test.js",
            "rules": {
              "quotes": [ 2, "single" ]
            }
        }
    ]
};
```

##### 规则错误级别

> - `"off"` 或 `0` - 关闭规则
> - `"warn"` 或 `1` -使用警告级别的错误
> - `"error"` 或 `2` - 使用错误级别的错误

##### 常见规则释义

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
        'for-direction':'error',        //禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
        'getter-return':'error',        //getter 必须有返回值，并且禁止返回空或者return;
        'curly':'error',                //if 后面必须要有 {，除非是单行 if
        'dot-location':'error',         //链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
        'no-floating-decimal':'warn',   //表示小数时，禁止省略 0，比如 .1
        'no-redeclare':'error',         //禁止重复定义变量
        'no-label-var':'error',         //禁止 label 名称与定义过的变量重复
    },
```

### eslint与prettier配合使用

> - prettier 主要是为了格式化代码
> - eslint 主要负责代码规则校验

##### 插件

eslint-config-prettier ：

如果eslint与prettier规则同时定义了，关闭额外报错，只显示一条。*(如果eslint只负责检测代码，prettier格式化代码，互不干扰，则用不到此插件)*

##### prettier配置

prettier 的检查规则是通过配置文件`.prettierrc` 实现的，不过一般来说，只需要配置少部分规则。

```javascript
{
    "semi": true,
    "singleQuote": true,
    "arrowParens": "avoid",
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": true
}
//更详细的配置项，请看https://prettier.io/docs/en/configuration.html
```

##### 配置editorconfig

> - 帮助多人开发再不同编辑器开发汇总维护一致的代码风格
> - 自动格式化或者自动排版，对代码格式化，减轻一定的代码格式化压力

```javascript
// 放在项目根目录的.editorconfig文件
root = true
 
[*]
charset = utf-8					//编码格式
indent_style = tab			//indent_style
indent_size = 2				//缩进
end_of_line = lf			//换行符
insert_final_newline = true	 //文件以一个空白行结尾
trim_trailing_whitespace = true //表示会除去换行行首的任意空白字符
```

### lint-staged构建代码检查

什么是lint-staged

针对暂存的文件运行linters

##### 安装和配置步骤

> 安装依赖
>
> ```javascript
> npm install --save-dev lint-staged husky
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
>     "src/**/*.js": [
>         "eslint",
>         "prettier --write",
>         "git add"
>     ]
>   }
> }
> ```
>
> 使用
>
>
>
>



