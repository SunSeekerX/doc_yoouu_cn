# vue-simple-admin

> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont，这些搭建后台必要的东西。
>
> 基于最新的依赖进行构建。
>
> ~~[线上地址:https://vsa.yoouu.cn/](https://vsa.yoouu.cn/)~~

## 个人改造

> 本项目基于[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
>
> 个人基于`4.2.1`版本进行改造，以后进行独立维护，
>
> 改造目标
>
> - 更加适合快速开发，去除中小团队接触不到，或者用的比较少的功能
> - 拉下代码就能上手业务开发
> - 不断完成文档添加前端解决方案
> - 删除`Mock`，`Test`模块，同时对依赖进行升级，跟随最新的依赖。

### Api 管理

在全局挂载了 api 对象，所有项目的网络请求分模块统一管理

### 网络请求错误处理

统一处理网络请求产生的错误

## Build Setup

```bash
# 克隆项目
git clone https://github.com/SunSeekerX/vue-simple-admin.git

# 进入项目目录
cd vue-simple-admin

# 安装依赖
yarn

# 启动服务
yarn serve
```

浏览器访问 [http://localhost:9530/](http://localhost:9530/)

## 发布

```bash
# 构建生产环境
yarn build:prod

# 预览发布环境效果
yarn preview

# 预览发布环境效果 + 静态资源分析
yarn preview -- --report

# 代码格式检查
yarn lint

# 代码格式检查并自动修复
yarn lint -- --fix
```

## 原作者信息

> 地址：[PanJiaChen - vue-element-admin](https://github.com/PanJiaChen)
