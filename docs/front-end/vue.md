# Vue

## 📌 文章

[vue-cli4 全面配置 - https://staven630.github.io/vue-cli4-config/](https://staven630.github.io/vue-cli4-config/)

## 📌 创建项目

### vue2

**安装 Vue CLI**

```shell
npm install -g @vue/cli
```

**检查是否安装**

```shell
vue --version
```

**创建项目**

```shell
vue create hello-world
```

### vue3

**vue-cli**

需要 `vue-cli 4.x`

```shell
vue create hello-world
```

**vite**

```shell
# npm 6.x
$ npm init vite@latest <project-name> --template vue

# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue

$ cd <project-name>
$ npm install
$ npm run dev
```

**配置**

- vue3
- ts
- vite
- vue-router
- vuex
- element-plus

`.gitignore`

```
node_modules
.DS_Store
dist
dist-ssr
*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Env
.env.**
!.env.example
```

#### vue-router

官方中文：[https://next.router.vuejs.org/zh/introduction.html](https://next.router.vuejs.org/zh/introduction.html)

**安装**

```shell
npm install vue-router@4
```

#### vuex

官方中文：[https://next.vuex.vuejs.org/zh/index.html](https://next.vuex.vuejs.org/zh/index.html)

**安装**

```shell
npm install vuex@next --save
```

#### element-plus

官方中文：[https://element-plus.gitee.io/zh-CN/component/button.html](https://element-plus.gitee.io/zh-CN/component/button.html)

```shell
npm install element-plus --save
# 图标
npm install @element-plus/icons
```

#### unplugin-auto-import

> 不需要自己从库引入一些函数，帮你自动导入，配置完成会在本地生成 `auto-imports.d.ts` 文件用来代码提示

官方 github：[https://github.com/antfu/unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

默认导入的预设：[https://github.com/antfu/unplugin-auto-import/tree/main/src/presets](https://github.com/antfu/unplugin-auto-import/tree/main/src/presets)

```shell
npm i -D unplugin-auto-import
```

` ite.config.ts`

```typescript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      /* options */
    }),
  ],
})
```

#### unplugin-vue-components

> 组件按需自动导入

官方 github：[https://github.com/antfu/unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

```shell
npm i unplugin-vue-components -D
```

`vite.config.ts`

```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      /* options */
    }),
  ],
})
```

## 📌 项目初始化

1. 新建 layout
2. 配置路由
3. 配置 app.vue
4. 配置 main.js
5. 导入 axios

`.editorconfig`

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = true
```

## 📌 导入 tailwindcss

### vue2

**安装依赖**

```shell
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

**创建您的配置文件**

```shell
npx tailwindcss init -p
```

`postcss.config.js`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

`tailwind.config.js`

```javascript
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

**配置 Tailwind 来移除生产环境下没有使用到的样式声明**

`tailwind.config.js`

```javascript
module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

**新增**

`app/src/assets/styles/index.css`

```css
/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**配置 main.js**

`app/src/main.js`

```javascript
import './assets/styles/index.css'
```

### vue3

配置代码检查: [https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/](https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/)

- 修改 `.gitignore`
- 安装 `normalize.css`，在 `main.js` 导入
-

## 📌 遇到的问题

### 修改 data 内深层嵌套对象的属性页面不更新

因为 vue 2.0 监听 data 的方式无法监听 深层嵌套的改变

**解决**

1. 使用 \$set

2. 深拷贝（会有不必要的性能浪费，更新一个，整块 dom 都要刷新）

3. 使用 vue 3.0

   vue 3.0 使用了 proxy 方式可以监听到深层嵌套对象属性的改变。

### 页面卡顿

更新 dom 操作频繁，使用 chrome 的性能分析工具分析，瓶颈出现在浏览器的脚本执行时间和浏览器的重绘。

**解决**

1. 减少 dom 操作次数
2. 优化代码逻辑，原来有非常频繁的读取本地 local storage，后面去除了

### vue 生命周期理解不深刻

混淆第三方库和 vue 生命周期加载时机。

## 📌 i18n 语言标识

https://i18ns.com/languagecode.html

https://www.techonthenet.com/js/language_tags.php

```
简体中文(中国)        zh_CN
繁体中文(台湾地区)     zh_TW
繁体中文(香港)        zh_HK
英语(香港)            en_HK
英语(美国)            en_US
英语(英国)            en_GB
英语(全球)    en_WW
英语(加拿大)    en_CA
英语(澳大利亚)    en_AU
英语(爱尔兰)    en_IE
英语(芬兰)    en_FI
芬兰语(芬兰)    fi_FI
英语(丹麦)    en_DK
丹麦语(丹麦)    da_DK
英语(以色列)    en_IL
希伯来语(以色列)    he_IL
英语(南非)    en_ZA
英语(印度)    en_IN
英语(挪威)    en_NO
英语(新加坡)    en_SG
英语(新西兰)    en_NZ
英语(印度尼西亚)    en_ID
英语(菲律宾)    en_PH
英语(泰国)    en_TH
英语(马来西亚)    en_MY
英语(阿拉伯)    en_XA
韩文(韩国)    ko_KR
日语(日本)    ja_JP
荷兰语(荷兰)    nl_NL
荷兰语(比利时)    nl_BE
葡萄牙语(葡萄牙)    pt_PT
葡萄牙语(巴西)    pt_BR
法语(法国)    fr_FR
法语(卢森堡)    fr_LU
法语(瑞士)    fr_CH
法语(比利时)    fr_BE
法语(加拿大)    fr_CA
西班牙语(拉丁美洲)    es_LA
西班牙语(西班牙)    es_ES
西班牙语(阿根廷)    es_AR
西班牙语(美国)    es_US
西班牙语(墨西哥)    es_MX
西班牙语(哥伦比亚)    es_CO
西班牙语(波多黎各)    es_PR
德语(德国)    de_DE
德语(奥地利)    de_AT
德语(瑞士)    de_CH
俄语(俄罗斯)    ru_RU
意大利语(意大利)    it_IT
希腊语(希腊)    el_GR
挪威语(挪威)    no_NO
匈牙利语(匈牙利)    hu_HU
土耳其语(土耳其)    tr_TR
捷克语(捷克共和国)    cs_CZ
斯洛文尼亚语    sl_SL
波兰语(波兰)    pl_PL
瑞典语(瑞典)    sv_SE
西班牙语 (智利)    es_CL
```

## 📌 vue 移动端适配

> 作者：走啊丶去拯救世界
>
> [https://juejin.im/post/5c9347405188252db7569a5a](https://juejin.im/post/5c9347405188252db7569a5a)

1.首先把安装 amfe-flexible

```bash
yarn add amfe-flexible
```

2.在入口文件`main.js`中引入

```javascript
import 'amfe-flexible/index.js'
```

3.在根目录的 index.html 的头部加入手机端适配的 meta 代码

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
/>
```

4.安装`postcss-pxtorem`是一款 postcss 插件，用于将单位转化为 rem ps：前提是 ui 设计的 psd 图尺寸大小是 750\*1334，这样我们在 iphone6 的模拟机上直接使用所标注的尺寸

```bash
yarn add postcss-pxtorem -D
```

5.在`package.json`配置

```json
  "postcss": {
    "plugins": {
      "autoprefixer": {
        "browsers": [
          "Android >= 4.0",
          "iOS >= 7"
        ]
      },
      "postcss-pxtorem": {
        "rootValue": 37.5,
        "propList": [
          "*"
        ]
      }
    }
  },
```

或者在`postcss.config.js`中配置（**此文件需要在根目录下新建**）

```javascript
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = ({ file }) => {
  let rootValue
  // vant 37.5 [link](https://github.com/youzan/vant/issues/1181)
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    rootValue = 37.5
  } else {
    rootValue = 75
  }
  return {
    plugins: [
      autoprefixer(),
      pxtorem({
        rootValue: rootValue,
        propList: ['*'],
        minPixelValue: 2,
      }),
    ],
  }
}
```

温馨提示： rootValue 这个配置项的数值是多少呢？？？ 通常我们是根据设计图来定这个值，原因很简单，便于开发。假如设计图给的宽度是 750，我们通常就会把 rootValue 设置为 75，这样我们写样式时，可以直接按照设计图标注的宽高来 1:1 还原开发。（iPhone 界面尺寸：320 _ 480、640 _ 960、640 _ 1136、750 _ 1334、1080 \* 1920 等。）

那为什么你在这里写成了 37.5 呢？？？

之所以设为 37.5，是为了引用像 vant、mint-ui 这样的第三方 UI 框架，因为第三方框架没有兼容 rem，用的是 px 单位，将 rootValue 的值设置为设计图宽度（这里为 750px）75 的一半，即可以 1:1 还原 vant、mint-ui 的组件，否则会样式会有变化，例如按钮会变小。

既然设置成了 37.5 那么我们必须在写样式时，也将值改为设计图的一半。

## 📌 路由权限管理

`${app}/src/router/index.js`

```javascript
export default new Router({
  routes: [
    {
      path: '/',
      hidden: true,
      redirect: '/home',
    },
    // 首页
    {
      path: '/home',
      name: 'HomeIndex',
      component: () => import('@/views/home/index'),
      meta: {
        isPublic: true,
      },
    },
  ],
})
```

在路由的元信息对象上加上`isPublic`参数代表该页面不需要验证即可访问

`${app}/src/utils/permission.js`

```javascript
router.beforeEach(async (to, from, next) => {
  // Permission
  if (store.state.token) {
    // Has login
    next()
  } else {
    // 判断是否是公开页面
    if (to.meta.isPublic) {
      next()
    } else {
      // Redirect to login
      next('/user/user-login')
    }
  }
})
```

在路由守卫进行判断拦截，如果登录用户直接放行，未登录用户如果访问公开页面直接放行，否则拦截跳转到登录页面。

## 📌 Api 接口加密

待定

## 📌 源码加密

我们希望生产环境下的 js 代码不是源码那么易读，用来隐藏一些特殊信息，

[webpack-obfuscator](https://www.npmjs.com/package/webpack-obfuscator)

待定

## 📌 网络状态监听

待定

## 📌 常见问题

### `node-sass`安装较慢怎么解决？

> 安装依赖之前确保你安装了`yarn`
>
> ```bash
> npm i yarn -g
> ```
>
> 更换`yarn`下载的依赖源
>
> ```bash
> # yarn
> # 1、查看一下当前源
> yarn config get registry
> # 2、切换为淘宝源
> yarn config set registry https://registry.npm.taobao.org
> # 3、或者切换为自带的
> yarn config set registry https://registry.yarnpkg.com
> ```

在最新的`vue-cli`项目中可以直接替换为`sass`即可解决

**0x1** 删除`${app}/package.json` 文件中的`devDependencies`里面的`node-sass`依赖

**0x2** 安装依赖，项目根目录下执行

```bash
yarn
```

**0x3** 安装`sass`

```bash
yarn add sass -D
```

**0x4** 启动项目

> 有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。

ps：如果发现`/deep/`不能用换成`::v-deep`就行了
