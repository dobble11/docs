# Yeoman

## 什么是Yeoman

> **示例**
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

## 创建与安装--以react为例

> 步骤
>
> 安装yeoman工具箱
>
> ```shell
> npm i -g yo
> ```
>
> 安装yeoman生成器(有超多开源可用的)
>
> > 比如搭建react的常用生成器之一：generator-react-webpack
> >
> > ```shell
> > npm i -g generator-react-webpack
> > // 命令行创建或直接右键创建新的文件夹
> > mkdir react-demo
> > // 进入该文件夹 然后yo react-webpack即可
> > cd react-demo
> > yo react-webpack
> > ```
> >
> > 三种方法构建react项目之一。利用yeoman搭建react，可以更**容易配置webpack**。
>
> 也可以构建属于自己的脚手架
>
> 比如安装生成器 generator-generator
>
> ```shell
> npm i -g generator-generator
> // 命令行创建或直接右键创建新的文件夹
> mkdir react-generator
> // 进入该文件夹 然后yo react-webpack即可
> cd react-generator
> yo generator
> ```
>
> 安装后，可以看到其生成器的项目结构为：
>
> ```sh
> ├── .yo-rc.json
> ├── package.json
> ├── generators
> │   ├── app
> │       ├── templates
> │           ├── dummyfile.txt
> │       ├── index.js
> ```
>
>

## 如何创建个人脚手架

### 创建目录与修改

### 创建脚手架模板

### 增加子模板

## 发布