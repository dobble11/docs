# 人脸拼图组件

![预览](https://github.com/dobble11/aseets/blob/master/1.PNG)

### FaceCanvas

| 属性             | 说明                                             | 类型          | 默认值                          |
| ---------------- | ------------------------------------------------ | ------------- | ------------------------------- |
| id               | dom 元素 id 属性                                 | `string`      | -                               |
| face             | 人脸对象数据                                     | `Face`        | -                               |
| selectedPartName | 已选择的部位名，被选择的部位在画布中会显示控制框 | `string`      | -                               |
| rendered         | 状态标记，是否已经渲染                           | `boolean`        | `false`                         |
| recorded         | 状态标记，是否已经记录                           | `boolean`        | `false`                         |
| onModified       | 图层修改回调                                     | `onModified`  | -                               |
| onSelected       | 选择图层回调                                     | `onSelected`  | -                               |
| zoom             | 缩放选项                                         | `ZoomOptions` | `{min: 50, val: 100, max: 150}` |

```ts
type Face = {
  [partName: string]: {
    url: string;
    hidden?: boolean;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    scaleX?: number;
    scaleY?: number;
  };
};

type onModified = (
  newFace: Face,
  state: { rendered: boolean; recorded: boolean }
) => void;

type onSelected = (partName: string) => void;

type ZoomOptions = {
  min: number;
  val: number;
  max: number;
};
```
