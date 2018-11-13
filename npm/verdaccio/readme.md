# Verdaccio

Verdaccio 是一个 Node.js 创建的轻量的私有 npm 代理注册服务

## 开始

#### 安装

```sh
npm i -g verdaccio
```

**具备条件**

1. Node>6.12.0
2. 安装 node-gyp 依赖环境，相关安装手册参考 [node-gyp](https://github.com/dobble11/docs/blob/master/npm/node-gyp.md)

#### 用法

```sh
> verdaccio
 warn --- config file  - C:\Users\intellif\AppData\Roaming\verdaccio\config.yaml
 warn --- Plugin successfully loaded: htpasswd
 warn --- Plugin successfully loaded: audit
 warn --- http address - http://localhost:4873/ - verdaccio/3.8.5
```

现在打开地址 http://localhost:4873/ 将显示所有本地软件包

通过 Verdaccio 代理访问包，需要修改 npm 配置 `registry`，有三种方法

- 项目根目录创建 .npmrc 文件，修改内容 `registry = "http://localhost:4873"` (推荐)
- CLI 运行 `npm set registry http://localhost:4873`
- 所有 npm 命令内联 `--registry http://localhost:4873`

## 发布与删除 npm 包

> 以下命令都假设你已经修改 npm 注册服务地址为本地 Verdaccio 服务地址

首先，**添加用户**

```sh
npm adduser
```

运行以上命令，会提示输入用户名和密码，添加成功后会在用户的 npm 配置文件中生成相应 token

**发布你的包**

```sh
npm publish
```

> Verdaccio 的发包流程恰好与下载包相反，会先检查 npm.org 上是否已存在该包名，存在则报错，可以在本地包名前加上特定前缀解决冲突。更新包时，也需要注意版本号的增加

**取消发布包**，只会删除 `package.json` 中 `version` 对应版本包

```sh
npm unpublish
```

如果想删除指定版本包，运行

```sh
npm unpublish xxx@0.0.1
```

## 常用配置

默认 config.yaml 文件，路径会在终端启动 Verdaccio 时输出

```yaml
# npm 包存放目录
storage: ./storage
# 插件存放目录
plugins: ./plugins
# 监听端口
listen: localhost:4873 # default

web:
  # 默认启用 WebUI，如果要禁用它，只需取消注释下一行
  #enable: false
  title: Verdaccio # WebUI 标题

auth:
  htpasswd: # 默认授权插件，也就是使用 .npmrc 中生成的 token
    file: ./htpasswd
    # 允许注册的最大用户数，默认为 "+inf"
    # 你可以将此值设置为 -1 以禁用注册
    #max_users: 1000

# 我们可以访问的仓库列表
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

# 对不同包访问权限进行控制，可选的值: "$all", "$anonymous", "$authenticated"
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs

  '**':
    # 允许所有用户访问
    access: $all

    # 允许授权用户发布
    publish: $authenticated

    # 如果本地未找到包, 代理请求 'npmjs' registry
    proxy: npmjs

# 为了使用 `npm audit` 取消注释以下部分
middlewares:
  audit:
    enabled: true

# 日志设置，过滤记录的信息
logs:
  - { type: stdout, format: pretty, level: http }
  #- {type: file, path: verdaccio.log, level: info}
```

## 服务器配置

#### 保持 Verdaccio 永远运行

安装 PM2

```sh
$ sudo npm i -g pm2
```

> 注：Verdaccio 当前不支持 PM2 的集群模式，使用集群模式运行它可能会导致未知行为。

启动 Verdaccio

```sh
$ pm2 start verdaccio
```

> 由于 Verdaccio 默认监听的是 localhost，无法通过 ip 访问，可以通过设置 config.yaml 中的 `listen` 值为 `0.0.0.0:4873`
