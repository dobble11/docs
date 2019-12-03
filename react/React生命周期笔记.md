# React 生命周期

> getDerivedStateFromProps 和 componentWillReceiveProps 内修改 state 都不会触发附加渲染 （[拥抱 react 新生命周期--getDerivedStateFromProps](https://juejin.im/post/5bea68a6e51d450cb20fdd70)）

### 16.3+ 生命周期图

![16.3生命周期图](https://raw.githubusercontent.com/dobble11/aseets/master/3.png)

新的生命周期函数 `getDerivedStateFromProps(nextProps,prevState)` 内不能访问 `this`，由于这是一个静态函数，其返回值作为 state 值，返回 null 表示不需要更新 state

> warn：该函数会在每次 re-render 之前执行，这意味着 props 与 state 的变化都会触发执行

### 之前版本生命周期

![生命周期图](https://raw.githubusercontent.com/dobble11/aseets/master/4.jpg)

生命周期函数 `componentWillReceiveProps(nextProps)` 用于更新派生自 props 的 state 值（通过调用 setState ）

> warn：该函数一直被错认为只有 props 改变时才触发，其实只要父组 re-render 都会触发
