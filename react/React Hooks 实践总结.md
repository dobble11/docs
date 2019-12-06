## 什么是 React Hooks

_Hook_ 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

**React Hooks 要解决的问题是状态逻辑（也称行为）复用**，之前通过 [render-props](https://zh-hans.reactjs.org/docs/render-props.html) 和 [higher-order components](https://zh-hans.reactjs.org/docs/higher-order-components.html) 方式实现，不但会增加组件的嵌套层级，在复用多个行为时还会出现 JSX 嵌套地狱问题。

## Hook 特点

一个简单使用 Hook 开发的函数组件代码

```tsx
import React, { useState } from "react";

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 每次渲染更新文档标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

React Hooks 带来的好处不仅是 “更 FP，更新粒度更细，代码更清晰”，其特性如下：

1. 无多余的嵌套组件
2. Hooks 可以引用其他 Hooks
3. 更容易将组件的 UI 与状态分离
4. 更好的类型推断

由于 Hook 只能在函数组件中使用，也消除了 class 组件带来的 `this` 经常忘记 bind 当前上下文问题。

## 简单的 Hook 实现

```ts
const HOOKS: any[] = [];
let cursor = 0;

function useState<T>(initialState: T): [T, (newState: T) => void] {
  const index = cursor;
  HOOKS[index] = HOOKS[index] || initialState; // 检查是否渲染过

  function setState(newState: T) {
    HOOKS[index] = newState;
    // 触发组件渲染
  }

  cursor++;
  return [HOOKS[index], setState];
}
```

> 使用 Hook 需要遵守下面两条规则
>
> 1. 只能在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook
> 2. Hook 函数必须以 "use" 命名开头

React 也提供了对应的 eslint 插件（`eslint-plugin-react-hooks`）来检查以上规则。

## 行为复用的实现对比

例如，复用开关行为的例子

首先定义消费开关组件 `Consumer`

```jsx
function Consumer({ on, toggle }) {
  return (
    <>
      <Button onClick={toggle}>Open Modal</Button>
      <Modal visible={on} onOk={toggle} onCancel={toggle} />
    </>
  );
}
```

**三种实现方式**

- render-props

```jsx
class ToggleProvider extends React.Component {
  state = {
    on: this.props.initial ?? false
  };

  toggle = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return React.cloneElement(this.props.children, {
      on: this.state.on,
      toggle: this.toggle
    });
  }
}

function App() {
  return (
    <ToggleProvider initial={true}>
      <Consumer />
    </ToggleProvider>
  );
}
```

- higher-order components

```jsx
function createToggle(initial = false) {
  return function withToggle(Component) {
    return class extends React.Component {
      state = {
        on: initial
      };

      toggle = () => {
        this.setState({ on: !this.state.on });
      };

      render() {
        return (
          <Component {...this.props} on={this.state.on} toggle={this.toggle} />
        );
      }
    };
  };
}

createToggle(true)(Consumer);
```

- hook

```tsx
function useToggle(
  initial=false
) {
  const [value, setValue] = useState<boolean>(initial);
  const toggle = useCallback(
    () => {
        setValue(currentValue => !currentValue);
      }
    },
    [setValue]
  );

  return [value, toggle];
};

function App() {
  const [on, toggle] = useToggle(true);

  return <Consumer on={on} toggle={toggle} />;
}
```

## 常见使用问题

1. 如何保存实例引用，例如 echart 实例对象或 dom 节点？

```ts
// ref.current
const cntr = useRef<HTMLDivElement | null>(null);
const chart = useRef<echarts.ECharts | null>(null);
```

2. 常见生命周期的模拟

```ts
// didMount
useEffect(() => {
  /* do something */
}, []);

// unmount
useEffect(() => {
  return () => {
    /* do something */
  };
}, []);

// didUpdate
useEffect(() => {
  const isFirst = useRef(true);

  if (!isFirst.current) {
    /* do something */
  } else {
    isFirst.current = false;
  }
});
```

第三方库 `react-use` 已经提供了各生命周期的 hook 函数及其它 hook

3. 如何实现继发间隔发送请求

```ts
const timerRef = useRef<NodeJS.Timeout | null>(null);
const taskRef = useRef(function task() {
  timerRef.current = setTimeout(async () => {
    await fetch();
    task();
  }, 5000);
});

useEffect(() => {
  taskRef.current();
  return () => {
    timerRef.current && clearTimeout(timerRef.current);
  };
}, []);
```

总结：大部分 Hook 使用问题都是如何保存实例引用
