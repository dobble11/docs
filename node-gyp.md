# node-gyp

[node-gyp](https://github.com/nodejs/node-gyp) 是一个用 Node.js 编写的跨平台命令行工具，用于编译 Node.js 的本机插件模块。

它捆绑了 Chromium 团队使用的 gyp 项目，并消除了处理构建平台中各种差异的痛苦。

## 安装

```sh
npm i -g node-gyp
```

您还需要安装：

### Unix

   * `python`（`v2.7` 推荐，`v3.x.x` 不支持）
   * `make`
   * 一个合适的 C/C++ 编译器工具链，如 [GCC](https://gcc.gnu.org)

### Windows

  * 安装 Visual C++ 构建环境：[Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)（选择 "Visual C++ build tools" workload）或者 [Visual Studio 2017 Community](https://visualstudio.microsoft.com/pl/thank-you-downloading-visual-studio/?sku=Community)（选择 "Desktop development with C++" workload）
   * 安装 [Python 2.7](https://www.python.org/downloads/)（`v3.x.x` 不支持），添加 `python` 安装路径到 windows 环境变量
   * 运行命令，`npm config set msvs_version 2017`
