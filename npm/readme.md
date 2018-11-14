
## 目录

- [verdaccio](https://github.com/verdaccio/verdaccio) 搭建私有 npm 代理注册服务
- [yeoman](https://github.com/yeoman/yeoman) 一套用于自动化开发工作流程的工具
- [npm](https://github.com/npm/cli) 包含在node.js里面的一个包管理工具


---

## npm

---

### 1. 什么是npm

npm是Node官方提供的包管理工具，它已经成了Node包的标准发布平台，用于Node包的发布、传播、依赖控制。npm提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包。

### 2. 安装npm

npm不需要单独安装。在安装Node的时候，会连带一起安装npm。
>但是，Node附带的npm可能不是最新版本，最后用下面的命令，更新到最新版本。
```sh
$ sudo npm install npm@latest -g
```

安装完成查看 npm 的版本
```sh
$ npm -v
# 6.4.1
```


### 3. npm常用命令

#### 3.1 安装npm包

有两种方式用来安装 npm 包：本地安装和全局安装。至于选择哪种方式来安装，取决于我们如何使用这个包。

如果你自己的模块依赖于某个包（比如通过 Node.js 的`require`加载），那么你应该选择本地安装，这种方式也是`npm install`命令的默认行为。 如果你想将包作为一个命令行工具，比如 `creat-react-app`,`Vue Cli`，那么你应该选择全局安装。

##### 3.1.1 本地安装

使用`npm install `进行本地安装,可以简写为`npm i`

```sh
npm i <package_name>
```

上述命令执行之后将会在当前的目录下创建一个` node_modules` 的目录（如果不存在的话），然后将下载的包保存到这个目录下。

##### 3.1.2 全局安装

使用`npm i -g `进行全局安装
```sh
npm i -g 
```

##### 3.1.3 安装不同版本

```sh
 npm i <package_name>@latest
 npm i <package_name>@1.1.1
 npm i <package_name>@">=1.1.0 <1.2.0"
```

##### 3.1.4 –save与--save-dev参数

npm 5.x以上版本使用`npm i`默认会安装`dependencies`字段和`devDependencies`字段中的所有模块 
+ `–save`：模块名将被添加到`dependencies`，可以简化为参数`-S`
+ `–save-dev`: 模块名将被添加到`devDependencies`，可以简化为参数`-D`

> 将运行时的依赖安装到`dependencies`，将开发时的依赖安装到`devDependencies`。
> dependencies下记录的是项目在运行时必须依赖的插件，常见的例如vue react jquery等，
> 即使项目打包好了、上线了，这些也是需要用的，否则程序无法正常执行。
> devDependencies下记录的是项目在开发过程中使用的插件，例如我们开发过程中需要使用webpack打包，
> 但是一旦项目打包发布、上线了之后，webpack就都没有用了。

一旦将包安装到` node_modules` 目录中，你就可以使用它了。

#### 3.2 更新与卸载npm包

##### 3.2.1 更新npm包

可以使用`npm outdate`命令查询已安装过的包中是否有过时版本
```sh
$ npm outdated
Package      Current   Wanted   Latest  Location
glob          5.0.15   5.0.15    6.0.1  test-outdated-output
nothingness    0.0.3      git      git  test-outdated-output
npm            3.5.1    3.5.2    3.5.1  test-outdated-output
local-dev      0.0.3   linked   linked  test-outdated-output
once           1.3.2    1.3.3    1.3.3  test-outdated-output
```
使用`npm update`命令,可以简写为`npm up`
```sh
# 本地更新
npm up <package_name>

# 使用 -S 参数更新package.json里面dependencies模块的版本号
npm up <package_name> -S

# 使用 -D 参数更新package.json里面devDependencies模块的版本号
npm up <package_name> -D

# 全局更新
npm up -g <package_name>
```
##### 3.2.2 卸载npm包

使用`npm uninstall`命令,可以简写为`npm un`
```sh
# 卸载本地模块
$ npm un <package_name>

# 卸载全局模块
$ npm un -g <package_name>
```

#### 3.3 npm run指令

npm不仅可以用于模块管理，还可以用于执行脚本。`package.json`文件有一个`scripts`字段，可以用于指定脚本命令，供npm直接调用。

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
    }
    
npm start 
npm run build
```

>npm内置了两个命令简写，`npm test`等同于执行`npm run test`，`npm start`等同于执行`npm run start`。

`npm run`为每条命令提供了`pre-`和`post-`两个钩子（hook）,
以`npm run test`为例，执行这条命令之前，npm会先查看有没有定义`pretest`和`posttest`两个钩子，
如果有的话，就会先执行`npm run pretest`，然后执行`npm run test`，最后执行`npm run posttest`。
如果执行过程出错，就不会执行排在后面的脚本，即如果`pretest`脚本执行出错，就不会接着执行`test`和`posttest`脚本。

**例子**

```json
{
  "test": "karma start",
  "test:lint": "eslint . --ext .js --ext .jsx",
  "pretest": "npm run test:lint"
}

# 上面代码中，在运行npm run test之前，会自动检查代码，即运行npm run test:lint命令。
```

下面是一些常见的pre-和post-脚本。

- `prepublish`，`postpublish`
- `preinstall`，`postinstall`
- `preuninstall`，`postuninstall`
- `preversion`，`postversion`
- `pretest`，`posttest`
- `prestop`，`poststop`
- `prestart`，`poststart`
- `prerestart`，`postrestart`

另外，不能在`pre`脚本之前再加`pre`，即`prepretest`脚本不起作用。

注意，即使npm可以自动运行`pre`和`post`脚本，也可以手动执行它们。

>[更多npm命令参考npm命令行文档](https://www.npmjs.com.cn/files/npmrc/)

### 4. 如何发布npm包

通常发包的仓库地址为npm仓库或者公司内部私有 npm 仓库，这里以发布到npm仓库为例

#### 4.1 npm init初始化package.json文件
```sh
npm init

# 使用npm init -y可以快速生成默认的package.json文件
```
```json
# 根据提示填写，其中name与version为必填
About to write to D:\luotongzhou\npm-example\package.json:
{
  "name": "npm-example-luotongzhou",
  "version": "1.0.0",
  "description": "npm-example",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "luotongzhou",
  "license": "ISC"
}
```

如果是将包发布到私有仓库需要在`package.json`修改发布地址

```json
# packages.json
"publishConfig": {
    "registry": "http://localhost/repository/npm-hosted/" 
 }
```
#### 4.2 创建模块入口文件

在当前目录下创建`index.js`文件，该文件为模块的入口文件，可在`npm init`或`package.json`文件中设置
```js
# index.js
module.exports.printMsg = function() {
    console.log("my first npm package")
}
```
#### 4.3 发布npm包

##### 4.3.1 注册npm账号

注册npm账号有两种方式，一种是在[npm官网](https://www.npmjs.com/)注册，另外一种是使用`npm adduser`命令注册
```sh
npm adduser

Username: # 输入用户名
Password：# 输入密码，默认不可见
Email：# 输入邮箱

# 注册完成后显示
Logged in as <your username> on http://registry.npmjs.org/.
```
##### 4.3.2 将包发布到npm仓库

使用`npm publish`命令将包发布到npm仓库
```sh
npm publish

# 发布完成后显示
+ npm-example-luotongzhou@1.0.0
```

发布时可能报以下错误：

***1.no_perms Private mode enable, only admin can publish this module***

使用cnpm的原因，设置回原本的就可以了
`npm config set registry http://registry.npmjs.org`

发布完成之后,如果还想回到之前的cnpm,使用下面的命令

`npm config set registry https://registry.npm.taobao.org`

***2.npm ERR! publish Failed PUT 403
You do not have permission to publish "xxxx". Are you logged in
as the correct user? : xxxx***

这个错误是`package.json`中的name与npm仓库中的包名重复了，修改`package.json`中的name为全网唯一就好了

***3.npm ERR! publish Failed PUT 403
npm ERR! you must verify your email before publishing a new package***

没有验证邮箱的原因，去注册npm账号的邮箱找到验证的邮件点击验证链接就行了，链接有可能过期，官网上登录后可以重新发送验证邮件

#### 4.4 拉取并使用发布的包

新建一个文件夹,使用`npm i`拉取刚才发布的包
```sh
npm i npm-example-luotongzhou
```

创建index.js文件
```js
var test = require('npm-example-luotongzhou')

test.printMsg();
```
运行`node index.js`命令

```sh
D:\luotongzhou\npm>node index.js
my first npm package  # 打印出结果
```
#### 4.5 更新已发布的包

更新已发布的包需要修改包的版本号即`packages.json`的version值，可以直接修改`packages.json`文件中version的版本号。但为了使用语义化的版本不建议直接修改version的值，可以使用`npm version`命令进行版本更新

```js
# 修改printMsg方法里的内容
module.exports.printMsg = function() {
    console.log("my first npm package has updated")
}
```
```sh
# 更新版本
npm version <update_type>
常用update_type有 major | minor | patch 
# 示例
npm version patch
v1.0.1

npm version minor
v1.1.0

npm version major
v2.0.0
```
继续`npm publish`发布就好了
之后只需要在引入该包的项目中`npm up`更新该包即可。

### 5. npm配置

#### 5.1 npm config

`npm cli` 提供了 `npm config` 命令进行 npm 相关配置，通过 `npm config ls -l` 可查看 npm 的所有配置，包括默认配置。
修改配置的命令为` npm config set <key> <value>`, 我们使用相关的常见重要配置:

- `proxy`, `https-proxy`: 指定 npm 使用的代理
- `registry` 指定 npm 下载安装包时的源，默认为 `https://registry.npmjs.org/` 可以指定为私有 `registry` 源
- `package-lock` 指定是否默认生成 `package-lock` 文件，建议保持默认 true
- `save` true/false 指定是否在 `npm instal`l 后保存包为 `dependencies`, npm 5 起默认为 true

**例**：

```sh
npm config set registry https://registry.npm.taobao.org 
# 切换淘宝镜像
```
删除指定的配置项命令为 `npm config delete <key>`.

#### 5.2 npmrc 文件

除了使用 CLI 的 `npm config` 命令显示更改 npm 配置，还可以通过 npmrc 文件直接修改配置。

这样的 npmrc 文件优先级由高到低包括：

- 工程内配置文件: `/path/to/my/project/.npmrc`
- 用户级配置文件: `~/.npmrc`
- 全局配置文件: `$PREFIX/etc/npmrc` (即`npm config get globalconfig` 输出的路径)
- npm内置配置文件: `/path/to/npm/npmrc`

通过这个机制，我们可以方便地在工程根目录创建一个` .npmrc` 文件来共享需要在团队间共享的 npm 运行相关配置。比如如果我们在公司内网环境下需通过代理才可访问 `registry.npmjs.org` 源，或需访问内网的 `registry`, 就可以在工作项目下新增` .npmrc` 文件并提交代码库。

```sh
proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/
```

