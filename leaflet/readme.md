### 目录结构

```bash
|—— /leaflet-react/                 # leaflet公用组件
| |—— getMapOpts.js                 # 根据不同mapType返回地图opts的函数
| |—— leaflet-animated-marker.js    # leaflet动态marker插件，用于轨迹回放
| |—— leaflet-lasso.js              # leaflet框选插件
| |—— leaflet-state-marker.js       # leaflet状态插件，会依据iconOpts的state值添加不同的类名
| |—— Map.js                        # 地图组件
| |—— Marker.js                     # 标记组件
| |—— HeatMap.js                    # 热力图组件
| |—— MarkerCluster.js              # 标记聚类组件，单击聚类点会显示标记列表气泡
| |—— Trace.js                      # 轨迹回放组件
| |—— index.js                      # 导出所有组件
```

### leaflet 组件

| 组件          | input                                                                                                                                                                     | output                                                                   | 备注                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Map           | options [`object`]：leaflet 地图选项，会覆盖 config 默认选项<br>enableLasso [`bool`]：是否启用框选，默认 false                                                            |                                                                          | 所有 leaflet 组件的直接父组件                                                                                                                                                                                   |
| HeatMap       | options [`object`]：heatmap.js 选项<br>data [`object`]：热力图数据，例如 `{max:0,data:[{lat:0,lng:0,count:0},...]}`，具体参考 heatmap.js 文档                             |                                                                          |                                                                                                                                                                                                                 |
| Marker        | data [`array`]：标记 iconOpts，例如`[{html:'',className:'',lat:0,lng:0,args:1},...]`，具体参考 leaflet divIcon 选项<br>autoPan [`bool`]：是否平移到第一个标记，默认 false | onClick [`args=>void`]：标记单击回调，iconOpts 的 point 值会作为回调参数 | iconOpts 的 args 属性为自定义属性                                                                                                                                                                               |  |
| MarkerCluster | data [`array`]：标记数据，例如`[{lat:0,lng:0,id:0,state:0,name:''},...]`                                                                                                  | onSelect [`id=>void`]：气泡单击回调，传入的 id 作为回调参数              | 其中 id，name 属性为单击聚类点位显示气泡所需要的值，name 作为列表显示 label，id 作为单击回调参数，state 表示当前标记状态，会依据当前值添加类名（0：默认，不添加；1：selected_a；2：selected_b；3：selected_ab） |
| Trace         | data [`array`]：轨迹点位数组，例如`[[0,0],...]`<br>traceImg [`string`]：轨迹图片 url                                                                                      |                                                                          |                                                                                                                                                                                                                 |

> 所有组件 data 变化会同步视图变化
