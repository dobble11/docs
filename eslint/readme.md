

#  ESLint

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
> npm install -g eslint
>
> 设置配置文件：
>
> eslint --init
>
> 文件或者项目运行eslint
>
> eslint xxx.js

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







##### 规则错误级别

> - `"off"` 或 `0` - 关闭规则
> - `"warn"` 或 `1` -使用警告级别的错误
> - `"error"` 或 `2` - 使用错误级别的错误

##### 规则释义







### eslint与prettier配合使用

http://web.jobbole.com/94786/?tdsourcetag=s_pctim_aiomsg



### lint-staged构建代码检查

https://segmentfault.com/a/1190000009546913

