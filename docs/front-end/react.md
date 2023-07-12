# React

![react.png](https://static.yoouu.cn/imgs/doc/front-end/react/react.png)

数据渲染性能提升

1. 数据+模板 直接替换 DOM
2. 数据+模板 计算变化的 DOM 进行替换
3. 数据+模板 生成虚拟 DOM 替换虚拟 DOM 内容最后生成页面 DOM **JSX > 虚拟 DOM > 页面 DOM**

虚拟 DOM 的比对

虚拟 DOM 的比对是同层的，从上到下，发现不同进行替换，不会管下面的虚拟 DOM

页面循环产生 dom，为什么不用数组的下标（index）作为 key 值

因为在虚拟 dom 比对的时候，如果是 index 作为 key 值，在进行数组的重新排序时会造成 key 值的不稳定

会触发虚拟 dom 的重新排序，diff 算法会对全部的虚拟 dom 全部进行 key 值比对，失去了 key 值存在的意义，所以可以用元素的 id 作为 key 值提高性能

虚拟 dom 比对，只替换更新的内容

![1561796749309](https://static.yoouu.cn/imgs/doc/basic/coding/react/1561796749309.png)

同层比对

![1561796803532](https://static.yoouu.cn/imgs/doc/basic/coding/react/1561796803532.png)

## Getting Started

```
npm i create-react-app -g
create-react-app app
cd app
npm start
```

## 文件目录

### `app/src/index.js`

```javascript
// Pwa progress web application
// 部署应用在Https服务器，断网能继续使用
import * as serviceWorker from './serviceWorker'
```

### `app/public/manifest.json`

可以在桌面创建一个网页应用快捷方式

## JSX

- 在 js 中写 html 语法，就是 jsx 语法

- 使用自己编写的组件时需要使用大写字母开头
- Fragment：占位标签，需要引入，类似于 uni-app 的 block 标签

## 组件

类似于 vue 的组件模式，父传子需要通过属性，子传父需要调父组件的方法进行数据传递

同样有 props，可以设置默认类型和默认值

### 生命周期

**在线地址新版：http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/**

![1561812762437](https://static.yoouu.cn/imgs/doc/basic/coding/react/1561812762437.png)

### 无状态组件

只有 ui 层界面，只负责显示，性能较高，没有 js 类的生命周期函数

## Redux

### Redux 全局 store 管理

![1561818716438](https://static.yoouu.cn/imgs/doc/basic/coding/react/1561818716438.png)

### Redux store 运行模式

![1561873237937](https://static.yoouu.cn/imgs/doc/basic/coding/react/1561873237937.png)

### Redux 使用

#### 使用原则

1. store 必须唯一
2. 只有 store 能改变自己的内容
3. reduce 必须是纯函数（给定一个固定的输入，就会有固定的输出，而且不会有副作用）

#### 核心 api

1. createStore
2. store.dispatch
3. store.getState
4. store.subscribe

在项目 todo-list 中进行了使用

### Redux-thunk 中间件使用

简介：中间件指的是 action 和 store 的中间

用来管理发送 Ajax 请求，store。dispatch()可以传递对象或者函数

原理：对 store 的 dispatch 方法进行升级

安装

```shell
npm i redux-thunk
```

![1561949895246](https://static.yoouu.cn/imgs/doc/basic/coding/react/1561949895246.png)

### Redux-saga 中间件

安装

```shell
npm i redux-saga
```

不建议使用，很复杂，需要很大型的项目

### React-redux

## styled-components

```shell
npm i styled-components
```

1. css 后缀改 js

## 项目实战 简书网

ref 可以获取组件 dom 的真实节点

### 组件库

- styled-components
- react-transition-group
- redux
- react-redux
- immutable.js `将state变成不可改变的对象，需要用state对象的数据，需要get方法，修改用set方法`
- redux-immutable
- redux-thunk`可以在actions`里面写函数发送 ajax 请求
- axios `ajax请求`
- react-router-dom`页面路由`
- react-loadable`异步组件需要用的库`

### 路由

react-router-dom

#### 动态路由

在组件中 to 的后面带上需要的参数

在页面通过`this.props.match.params`进行接受参数

![1562568960386](https://static.yoouu.cn/imgs/doc/basic/coding/react/1562568960386.png)

#### 静态路由

### 异步组件

使用第三方模块`npm i react-loadable`

```javascript
import React from 'react'
import Loadable from 'react-loadable'

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading() {
    return <div>loading</div>
  },
})

export default () => <LoadableComponent />

// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent />
//   }
// }

// App.js 引入
import Detail from './pages/detail/loadable'

// 修改获取路由参数
// detail/index.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
class Detail extends Component {
  render() {
    console.log(this.props.match.params)
    return <div>Detail~~</div>
  }
}
// 可以让Detail组件有能力获取到页面传递过来的内容
export default connect()(withRouter(Detail))
```

## About

- Facebook 推出
- 2013 开源
- 函数式编程风格
