module.exports = {
    extends: [                  //继承配置
        "eslint:recommended",
        "prettier"
    ],
    parserOptions: {		//指定校验的ecma的版本,及ecma的一些特性
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
    rules: {                            // 启用的规则及其各自的错误级别
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
    overrides: [                        // 如果同一个目录下的文件需要有不同的配置
        {
            "files": [ "lib/*.js" ],
            "excludedFiles": "*.test.js",
            "rules": {
              "quotes": [ 2, "single" ]
            }
        }
    ]
};
