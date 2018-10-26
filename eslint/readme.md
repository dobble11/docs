

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
> ```sh
> npm install -g eslint
> ```
>
> 设置配置文件：
>
> ```sh
> eslint --init
> ```
>
> 文件或者项目运行eslint
>
> ```sh
> eslint xxx.js
> ```

栗子：

```javascript
//test-eslint.js + lib/demo.js + lib/demo.test.js
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

```diff
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
+  "eslintConfig": {
+    "extends": "eslint:recommended",
+    "env": {
+        "node": true
+    },
+    "rules": {
+        "no-console": "off"
+    },
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
    parserOptions: {	//指定校验的ecma的版本,及ecma的一些特性
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
        'no-console': 'off',            // 启用 console
        'eqeqeq':'error',                // 要求使用 === 和 !==
        'no-return-assign':'error',      // 禁止 return 一个赋值表达式
        'no-constant-condition':'error', // 禁止在 if/while/for 等判断条件中出现永远不变的判断结果
        'no-empty':'error',              // 禁止出现空代码块，比如 if/else/for/catch 等代码块都在报警之列
        'no-empty-function':'error',     // 禁止出现空函数 1
        'valid-jsdoc':'warn',          // 强制使用有效JSDoc注释,参数，返回
        'no-fallthrough':'error',       // 禁止case落空，在 switch/case 语句中出现了穿透特性
        'no-param-reassign':'error',     // 禁止对 function 的参数进行重新赋值
        'for-direction':'error',        // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--) 1
        'getter-return':'error',        // getter 必须有返回值，并且禁止返回空或者return; 1
        'no-unused-vars':'error',				// 定义过的变量必须使用 1
        'curly':'error',                // if 后面必须要有 {，除非是单行 if 1
        'dot-location':'error',         // 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
        'no-floating-decimal':'warn',   // 表示小数时，禁止省略 0，比如 .1
        'no-redeclare':'error',         // 禁止重复定义变量 1
        'no-label-var':'error',         // 禁止 label 名称与定义过的变量重复
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
    "semi": true,				//启用 句尾分号
    "singleQuote": true,		//字符串使用单引号
    "arrowParens": "avoid",		//避免箭头函数括号出现  例如单个参数不要括号 （a）=> {} 转换 a => {}
    "printWidth": 80,			//单行字符最大个数
    "tabWidth": 2,				//tab宽度为2个字符  当useTabs为false时，用2个空格填充，而不是单个tab字符
    "useTabs": true				//是否禁用 tab
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

### stylelint样式校验

> stylelint拥有超过150条的规则，包括捕捉错误、最佳实践、控制可以使用的语言特性和强制代码风格规范。它支持最新的CSS语法，并且灵活可配置

##### 安装与配置

安装依赖

```sh
npm install --save-dev stylelint 
stylelint-config-standard 
stylelint-order 	
stylelint-prettier
stylelint-config-css-modules
stylelint-config-prettier
stylelint-selector-bem-pattern
```

根目录下创建.stylelintrc配置文件

```javascript
// .stylelintrc.js
module.exports = {
	extends: [
		'stylelint-config-standard',
		"stylelint-config-css-modules",
		"stylelint-prettier/recommended"
	],
	plugins: [
		'stylelint-order',  // 指定事物的顺序，例如声明块（插件包）中的属性。
		'stylelint-prettier', 	//运用prettier
		"stylelint-selector-bem-pattern"  //为选择器指定BEM模式
	],
	rules: {
		"prettier/prettier": true,
        "color-hex-case":"lower",
        "color-no-invalid-hex":true,	//禁止无效十六进制颜色
        "function-calc-no-unspaced-operator":true,	//禁止calc函数内的没有空格运算符
		"at-rule-no-unknown": null,
		"no-descending-specificity": null	//禁止在具有较高特异性的重叠选择子后出现较低特异性的选择子
	}
}
```

 [更多stylelint插件](https://stylelint.io/user-guide/plugins/)

[更多stylelint规则](https://stylelint.io/user-guide/rules/)

使用stylelint校验即可

```sh
stylelint 'src/**/*.css'
```

修复可以再package.json内npm scripts里加入命令

```diff
{
  "name": "eslint-test",
  "version": "1.0.0",
  "description": "eslint-test",
  "main": "test-eslint.js",
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom",
    "prettier": "prettier --config .prettierrc src/**/*.{js,jsx,json,less,ts,tsx}",
++   "lintcss": "stylelint 'src/**/*.less' --fix"
  },
  "author": "zhaomeiling",
  "license": "ISC",
  "devDependencies": {
    ...
  }
    ...
  }
}
```

或者使用`lint-staged`(详细见本文档最后一段)

### TSLint

> TSLint是一种可扩展的静态分析工具，可检查[TypeScript](http://www.typescriptlang.org/)代码的可读性，可维护性和功能性错误。它在现代编辑器和构建系统中得到广泛支持，可以使用您自己的lint规则，配置和格式化程序进行自定义。
>
> 安装
>
> ```shell
> npm install -g tslint typescript
> ```
>
> 生成tslint（或者-i)
>
> ```shell
> tslint --init
> ```
>
> 校验(-c就是 --config， -fix修复)
>
> ```shell
> tslint -c tslint.json 'src/**/*.tsx'
> ```

##### 配置

tslint.json配置内容如下

```javascript
{
  "extends": [
    "tslint:recommended",
    "tslint-react",
    "tslint-config-prettier"
  ],
  "rules": {
    "no-console": false,
    "object-literal-sort-keys": false,   // 检查对象文字中键的排序
    "max-classes-per-file": [	// 文件不能包含超过指定数量的类
      true,
      5,
      "exclude-class-expressions"
    ],
    "ordered-imports": false,   // 要求将import语句按照字母
	"interface-name":false,	// 定义一个接口的名字必须是大写I开头
	"no-any": true,	// 禁止类型是any
        "no-for-in-array":true,	// 禁止对数组使用for in循环
  },
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "public/**/*.js",
      "node_modules/**/*.ts"
    ]
  }
}
```

[更多tslint规则]([TypeScript](http://www.typescriptlang.org/))

### lint-staged构建代码检查

##### 什么是lint-staged

针对暂存的文件运行linters，commit前依次执行写好的任务（ESLint 和 Prettier）

##### 安装和配置步骤

> 安装依赖
>
> ```sh
> npm install --save-dev lint-staged husky
> ```
>
> 修改package.json配置
>
> ```diff
> {
>   "scripts": {
> +    "precommit": "lint-staged"
>   },
> + "lint-staged": {
> +    "src/**/*.{js,vue,jsx}": [
> +      "prettier --config .prettierrc --write",
> +      "eslint",
> +      "git add"
> +    ],
> +    "src/**/*.{ts,tsx}": [
> +      "prettier --config .prettierrc --write",
> +      "tslint",
> +      "git add"
> +    ],
> +    "src/**/*.{css,scss,less}": [
> +      "prettier --config .prettierrc --write",
> +      "stylelint --fix",
> +      "git add"
> +    ]
> +  }
> }
> ```
>
>
>

`"precommit": "lint-staged"`git commit时会执行这个命令，根据lint-staged配置进行校验。

##### 原理

在`git`中，我们每次执行`commit`、`push`等操作时，都会触发一个或多个`shell`脚本，这些脚本我们称为`钩子`，它们存放在`.git/hooks`目录下。

- 前置（pre）钩子，在动作完成前调用
- 后置（post）钩子，在动作完成后执行

![](.\gitHook.png)

在钩子里写入指令，执行git操作前先运行钩子里的指令，调用eslint和prettier检查代码，如果代码不符合规范就非零(warn,error)退出，git操作就会停止。
