# 笔记

## 常用 shell

```sh
# pm2 运行 npm 脚本
pm2 start npm --name <service name> -- run <script name>

# 获取本机 ip
ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'

# 删除本地分支
git branch -D <branch name>
git push origin --delete <branch name>

# 回退版本
1. git本地版本回退
git reset --hard <commit_id>(可用 git log –oneline 查看)
2. 强制提交远程版本回退
git push origin HEAD --force

# 推送本地仓库到远端
git push <远程主机名> <本地分支名>:<远程分支名> [-f]
```

## web 存储

| 存储           | 生命周期                                                 | 适用场景     |
| -------------- | -------------------------------------------------------- | ------------ |
| sessionStorage | 所有同一站点 tab 页关闭                                  |              |
| cookie         | 可以设置时间，不设置默认过期时间为 Session，即浏览器关闭 | 保存登录状态 |

## vue router

例如首次访问/a?q=1，再路由跳转/b

| 场景     | to     | from   | location.href |
| -------- | ------ | ------ | ------------- |
| 初次访问 | /a?q=1 | /      | /a?q=1        |
| 路由切换 | /b     | /a?q=1 | /a?q=1        |

总结：使用 to 获取准确路径

## vue provide/inject 实现响应式

```ts
{
  provide() {
        return {
            __reactiveObj__: Object.defineProperty({}, 'cateList', {
                get: () => {
                    return this.cateList
                },
                enumerable: true
            })
        }
    },
    data() {
        return {
            cateList: []
        }
    },
}
```

```ts
@Component({
    inject: ['__reactiveObj__'],
})
export default class FeedbackDetail extends Vue {
    get cateList() {
        return this.__reactiveObj__.cateList
    }
}
```

bff 日志文档：<https://yued.myscrm.cn/bff-doc/#/docs/core?id=%e6%97%a5%e5%bf%97>

## lodash

\_.truncate 截断 string 字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."。

## react

父组件触发 render 则所有层级子组件将会执行 render，直到子组件 needUpdate 或 React.memo 返回 false 或到达叶节点为止
