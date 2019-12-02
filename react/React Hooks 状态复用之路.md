## 什么是 React Hooks

_Hook_ 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

**React Hooks 要解决的问题是状态逻辑（也称行为）复用**，之前通过 [render-props](https://zh-hans.reactjs.org/docs/render-props.html) 和 [higher-order components](https://zh-hans.reactjs.org/docs/higher-order-components.html) 方式实现，不但会增加组件的嵌套层级，在多个行为复用时还会出现 JSX 嵌套地狱问题。

## Hook 特点

## Hook 实现原理

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

**render-props**

```jsx
class ToggleProvider extends React.Component {
  state = {
    on: this.props.initial ?? false
  };

  toggle() {
    this.setState({ on: !this.state.on });
  }

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
       <Consumer>
    </ToggleProvider>
  );
}
```

**higher-order components**

```jsx
function createToggle(initial = false) {
  return function withToggle(Component) {
    return class extends React.Component {
      state = {
        on: initial
      };

      toggle() {
        this.setState({ on: !this.state.on });
      }

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

**hook**

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

  return <Consumer on={on} toggle={toggle}>;
}
```

通过三种实现方式的对比，很直观的发现 Hook 的强大，Hook is future!
