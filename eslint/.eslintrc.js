module.exports = {
    extends: ["eslint:recommended","prettier"],      //继承配置
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
        'no-console': 'off',            //启用 console
        'eqeqeq':'error',                //要求使用 === 和 !==
        'no-return-assign':'warn',      //禁止 return 一个赋值表达式
        'no-constant-condition':'warn', //禁止在 if/while/for 等判断条件中出现永远不变的判断结果
        'no-empty':'warn',              //禁止出现空代码块，比如 if/else/for/catch 等代码块都在报警之列
        'no-empty-function':'warn',     //禁止出现空函数
        'valid-jsdoc':'error',          //强制使用有效JSDoc注释,参数，返回
        'no-fallthrough':'error',       //禁止case落空，在 switch/case 语句中出现了穿透特性     
        'no-param-reassign':'warn',     //禁止对 function 的参数进行重新赋值
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