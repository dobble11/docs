# React 生命周期

> getDerivedStateFromProps 和 componentWillReceiveProps 内修改 state 都不会触发额外的更新，之后的生命周期函数也只会执行一次
>
> 通常情况下两者都能很好的解决反模式同步问题，但还是存在后者滥用的问题，所以前者用于替代后者在新的版本中 ( [ReactV16.3 即将更改的生命周期](<[ReactV16.3即将更改的生命周期_慕课手记](https://www.imooc.com/article/27954?block_id=tuijian_wz)>))
>
> **注: setState 的调用不会触发两者执行**

### 16.3+ 生命周期图

![16.3生命周期图](https://github.com/dobble11/aseets/blob/master/3.png)

新的生命周期函数 `getDerivedStateFromProps(nextProps,prevState)` 内不能访问 `this`，由于这是一个静态函数，其返回值作为 state 值，返回 null 表示不需要更新 state

### 之前版本生命周期

![生命周期图](https://github.com/dobble11/aseets/blob/master/4.jpg)

生命周期函数 `componentWillReceiveProps(nextProps)` 用于更新派生自 props 的 state 值（通过调用 setState ）
