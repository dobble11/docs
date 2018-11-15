# Yeoman

## 什么是Yeoman

**示例**
>
> **目的：**
>
> 开发新项目
>
> **步骤：**
>
> 每次创建一个新项目，脚手架都是从已有的旧项目copy，然后删删改改，留下初始登录框架，然后npm i。
>
> **本质：**
>
> 都是提高项目启动速度，复用项目结构，但是如上述手动的步骤，有点冗余机械化。

只要一段代码，Yeoman可以创建一个web应用程序或者模板。通过脚手架的方式来创建现代web应用。



## 安装与使用

安装yeoman工具箱

```shell
npm i -g yo
```

安装yeoman生成器(有超多开源可用的)



### react生成器

比如搭建react的常用生成器之一：`generator-react-webpack`

```shell
npm i -g generator-react-webpack
# 命令行创建或直接右键创建新的文件夹
mkdir react-demo
# 进入该文件夹 然后yo react-webpack即可
cd react-demo
yo react-webpack
```

> 三种常用方法构建react项目之一。
>
> 利用yeoman搭建react，可以更**容易配置webpack**。



### 定制前端脚手架

也可以构建属于自己的脚手架

比如安装生成器 `generator-generator`

```shell
npm i -g generator-generator
# 命令行创建或直接右键创建新的文件夹
mkdir react-generator
# 进入该文件夹 然后yo react-webpack即可
cd react-generator
yo generator
```

安装后，可以看到其生成器的项目结构为：

```sh
├── .yo-rc.json
├── package.json
├── generators
│   ├── app
│       ├── templates			# 默认存放文件的目录
│           ├── dummyfile.txt
│       ├── index.js			# Yeoman的配置文件
```



#### 配置

每个generator都会继承`yeoman-generator`类，即上述的`generators/app/index.js`文件。

该类有几个重要的生命周期节点：

| 函数         | 释义                                                         |
| ------------ | ------------------------------------------------------------ |
| initializing | 初始化。可以用于获取项目状态、配置                           |
| prompting    | 调用[inquire](https://github.com/SBoudrias/Inquirer.js)方法获取用户输入（generator与用户交互的主要方式） |
| configuring  | 保存配置。创建 `.editorconfig` 等文件                        |
| writing      | 执行文件写操作，即项目文件写入文件系统中                     |
| install      | 执行安装操作，需调用 `this.installDependencies` 方法         |
| end          | 最后执行，可清除临时文件等                                   |

##### initializing

```js
// 打印欢迎语
initializing() {
    // 打印欢迎语
    this.log(
      yosay(`Welcome to the shining ${chalk.cyan('generator-yeoman-demo')} generator!`)
    );
}
```

##### prompting

 prompting这里，会将用户输入的结果配置到 this.props 对象中，方便后续访问。

```diff
const prompts = [
-    {
-      type: 'confirm',
-      name: 'someAnswer',
-      message: 'Would you like to enable this option?',
-      default: true
-    }
+      {
+        type: 'input',
+        name: 'appName',
+        message: 'Your project name',
+        default: this.appname
+      },
+		{
+        type: 'input',
+        name: 'description',
+        message: 'Your project description',
+        default: 'test des'
+      },
+      {
+        type: 'input',
+        name: 'author',
+        message: 'author',
+        default: this.user.git.name()
+      },
+      {
+        type: 'input',
+        name: 'authorEmail',
+        message: 'author email',
+        default: this.user.git.email()
+      },
+      {
+        type: 'confirm',
+        name: 'lint',
+        message: 'Use ESLint to lint your code?'
+      },
+      {
+        name: 'ESlintStyle',
+        type: 'list',
+        message: 'Pick an ESLint preset',
+        when(answers) {
+          return answers.lint;
+        },
+        choices: [
+          {
+            name: 'Airbnb (https://github.com/airbnb/javascript)',
+            value: 'airbnb',
+            short: 'Airbnb'
+          },
+          {
+            name: 'Standard (https://github.com/feross/standard)',
+            value: 'standard',
+            short: 'Standard'
+          }
+        ]
+      },
+      {
+        type: 'confirm',
+        name: 'includeRedux',
+        message: 'Would you like to include Redux in your project?',
+        default: true
+      }
+      ....
    ];
```

##### writing

```diff
writing() {
-    this.fs.copy(
-      this.templatePath('dummyfile.txt'),
-      this.destinationPath('dummyfile.txt')
-    );
+    this.fs.copy(
+      this.templatePath('intellif-demo'),
+      this.destinationPath(this.props.appName),
+      {
+        globOptions: {
+          // https://github.com/isaacs/node-glob
+          dot: true,
+          ignore: ['**/@chooseDownload/**'],
+          gitignore: false
+        }
+      }
+    );
+	  const currPackage = this.fs.readJSON(
+        this.destinationPath(this.props.appName + '/package.json'),
+        {}
+      );

+     // 根据用户选择，决定是否安装redux tes
+    if (this.props.includeRedux) {
+      // 处理package.json
+      currPackage.dependencies = {
+        redux: '^4.0.0',
+        'redux-logger': '^3.0.6',
+        'react-redux': '^5.0.7',
+        'redux-thunk': '^2.3.0',
+        'react-router-redux': '^4.0.8'
+      };
+    }

+    // 引入redux,关联的文件要替换含有redux的。
+    // 1.src/index.js
+    this.fs.copy(
+      this.templatePath('intellif-demo/chooseDownload/index.js'),
+      this.destinationPath(this.props.appName + '/src/index.js')
+    );
+    // 2.src/constants/rootReducerIndex.js
+    this.fs.copy(
+      this.templatePath('intellif-demo/chooseDownload/rootReducerIndex.js'),
+      this.destinationPath(this.props.appName + '/src/constants/rootReducerIndex.js')
+    );
+    // 3. 把rootStore拿出来(src/constants/rootStore.js)
+    this.fs.copy(
+      this.templatePath('intellif-demo/chooseDownload/rootStore.js'),
+      this.destinationPath(this.props.appName + '/src/constants/rootStore.js')
+    );
+
+    // 创建package.json
+      currPackage.name = this.props.appName;
+      currPackage.author = this.props.author;
+      currPackage.description = this.props.description;
+      this.fs.writeJSON(this.destinationPath(this.props.appName + '/package.json'), currPackage);

  }
```

##### install

```js
install() {
    this.installDependencies();
  }
```

##### end

```js
end() {
    this.fs.delete('.yo-rc.json'); // 删除无用的文件
    this.log(chalk.green('Construction completed!'));
}
```



#### 增加子模板

yeoman可以添加子模板，方法只需要执行如下命令：

```sh
yo generator:subgenerator [name]
```

执行后可在原本生成器generators目录下看到该name的文件



#### 试运行

可以通过如下方式，将项目加入本地generator 库：

```sh
npm link
```

之后，就可以执行如下命令，生成手脚架:

```sh
yo [your template name]
```



#### 发布

> 注意：
>
> 1. `generator-test/package.json`中的`name`要在<https://www.npmjs.com/>没被创建过，才可以发布。
>
> 2. 发布需要一个`npm`的账号，如果没有使用`npm adduser`创建；
>
> 3. 如果已有账号，运行`npm login`登陆。
> 4. 使用`npm unpublish 包名`命令可以撤销发布，只有在发包的24小时内才允许撤销发布的包。

```sh
npm publish
npm unpublish
```