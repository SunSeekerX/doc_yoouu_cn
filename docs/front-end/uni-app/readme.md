# Uni-app

## 通用

1. 使用 `@tap` 代替 `vue`的 `@click`，为了解决移动端 `300ms` 延迟问题。

2. 为了兼容屏幕大小，宽度应该使用 `rpx`，高度、字体大小、边框、应使用 `px` 开发的时候应该具体分析，`rpx` 会在不同的屏幕尺寸缩放，要考虑元素是否需要缩放。

   > 写完应该切换不同的屏幕分辨率查看，做到 iPad 和手机都能兼容。

3. 路由跳转 `url` 链接需要用 `/` 开始，而不是 `pages.json` 内定义的 `pages/auth/login/login` 类似这种路径开始。

4. `justify-content` 或 `align-items` 属性禁止写 `start`

## 微信

1. 在组件元素用 `v-show` 在微信小程序无效果

2. 微信小程序样式错位问题，加上下面的 css

   ```css
   view,
   text {
     box-sizing: border-box;
     flex-direction: row;
   }
   ```

3. 微信小程序在模板内无法使用全局封装的路由跳转方法跳转，uni-app 的 bug。需要在页面 methods 中定义方法调用全局。

   ```javascript
   export default {
     methods: {
       /**
        * @name 页面跳转，小程序无法在模板内访问$util对象，实际应该是模板内的this并不指向vue组件
        * @param {Object} url 页面url
        */
       navigateTo(url) {
         this.$util.router({
           url,
         })
       },
     },
   }
   ```

## 安卓

1. 在安卓端不使用依赖库无法处理类似 `2020-06-16T09:14:59.000+0000` 的时间格式。

   > 接口统一为时间戳

## 📌 问题

### 1：无法使用调试？

参考解决：[https://ask.dcloud.net.cn/article/37973](https://ask.dcloud.net.cn/article/37973)

```javascript
const {
  ignoreDefaultArgs = false,
  args = [],
  dumpio = false,
  // 修改这里为你的 chrome 路径
  executablePath = 'C://Program Files//Google//Chrome//Application//chrome.exe',
  pipe = false,
  env = process.env,
  handleSIGINT = true,
  handleSIGTERM = true,
  handleSIGHUP = true,
  ignoreHTTPSErrors = false,
  defaultViewport = { width: 800, height: 600 },
  slowMo = 0,
  timeout = 30000,
} = options
```

### css 文件发布 npm 部分属性不生效？

> 一个 css 文件放在项目下在 app.vue 引入可以使用，发布到 npm 一部分就不能用了，必须放在 main.js 中引入才能全部生效的问题
>
> 不生效的是包含 width: 100% 类似这样的属性

将 `css` 改为 `scss` 即可。应该是编译的时候没走 webpack loader，或者 css loader 之类的处理方式导致的

## 📌 原生插件

### Android

1. 调试调用插件无反应？

   1. 检查是否将模块导入到 `app` 模块

      ```groovy
      // 类似
      implementation project(':local-module:ssx_screenshot_listen')
      ```

   2. 检查 `dcloud_uniplugins.json` 是否配置好插件

   3. 检查模块方法是否加上 `@UniJSMethod(uiThread = true)` 注释

   4. 检查模块混淆规则配置文件 `proguard-rules.pro` 是否加上

      ```properties
      # Uni-app
      -keep public class * extends io.dcloud.feature.uniapp.common.UniModule{*;}
      ```

   5. 如果你得的模块是放在二级文件夹的，并且开启了混淆压缩，类似如下配置

      ```groovy
      buildTypes {
          release {
            signingConfig signingConfigs.config
            zipAlignEnabled true
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
          }
          debug {
            signingConfig signingConfigs.config
            zipAlignEnabled true
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
          }
        }
      ```

      <img src="https://static.yoouu.cn/imgs/2021/pic-go/image-20210727233153192.png" alt="image-20210727233153192" style="zoom:50%;" />

      这样玩不得行，虽然你取消混淆是可以的，但我不确定打包出来的插件能不能用 😒。罢了放外面吧。估计没人像我这么玩。

2. 启动新的 `actovity` 报 `You need to use a Theme.AppCompat theme (or descendant) with this activity.`

   修改 `activity` 继承的父类为 `Activity`，不要用 `AppCompatActivity`

3. 获取 Application 上下文？

   ```java
   // 需要强转
   (Application) mUniSDKInstance.getContext().getApplicationContext()
   ```

4. 同步方法获取不到参数？

   检查你的模块方法是否设置了不在 ui 线程，运行在 ui 线程无法直接获取返回值。

   ```java
   @UniJSMethod (uiThread = false)
   ```

5. 云打包失败？

   检查 `package.json` 依赖是否配置正确。有 `activity` 可以引入 `androidx.legacy:legacy-support-v4:1.0.0` 试试。

6. 打包 aar 内有元信息冲突？

   删除冲突的元信息。

### Ios

#### Q: 依赖库冲突 “duplicate symbols for ...”

A：如果您依赖的三方库与 SDK 依赖的三方库冲突

- 为了保证 SDK 功能的完整性所以请您使用 SDK 内置的三方库，移除您依赖的三方库，对于源码开源的三方库比如 SDWebImage、ZXing 等，这些库的 .h 头文件存放在 SDK/inc 路径中的，将对应库的头文件引入到插件工程中使用即可，如果您使用内置的三方库导致原生功能异常，请反馈给我们；
- 如果引入的是 .a 或 .framework 库里面包含某个三方库导致符号定义冲突，可根据 [这篇文档](https://www.jianshu.com/p/274f93ef6c1c) 移除对应库的符号，然后测试一下功能是否正常；

## 📌 配置 eslint + prettier + stylelint + lint-staged + husky

项目示例：[https://github.com/SunSeekerX/uni-app-starter](https://github.com/SunSeekerX/uni-app-starter)

eslint

用来检查代码的完整性，潜在的错误。

prettier

用来格式化代码。

stylelint

用来格式化 css、scss、less 等代码。

lint-staged

顾名思义，用来检查提交到 git 暂存区的代码。

husky

用来配置 git 钩子，在 commit 之前配合 lint-staged 检查提交到暂存区的代码。

### 规范提交代码说明

可以参考[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/)

一种用于给提交信息增加人机可读含义的规范。

简单来说就是提交代码的规范。

已经详细记录到个人的文档网站，这里不做详细介绍 [地址](https://doc.yoouu.cn/front-end/npm/#%F0%9F%93%8C-%E8%A7%84%E8%8C%83%E6%8F%90%E4%BA%A4%E4%BB%A3%E7%A0%81)

### 0x3 安装需要用到的依赖

- husky - 可以让 git hooks 的使用变得更简单方便
- lint-staged - 可以在 git staged 阶段的文件上执行 linters，简单点来说就是当我们运行 `eslint` 或 `stylelint` 的命令时，只会检查我们通过 `git add` 添加到暂存区的文件，可以避免我们每次检查都把整个项目的代码都检查一遍

```bash
yarn add eslint @babel/eslint-parser eslint-plugin-vue @vue/eslint-config-prettier eslint-plugin-prettier stylelint stylelint-config-prettier stylelint-config-property-sort-order-smacss stylelint-config-recommended-vue stylelint-config-standard-scss stylelint-order husky lint-staged prettier -D
```

### 依赖说明 - eslint

#### eslint

Github: [https://github.com/eslint/eslint](https://github.com/eslint/eslint)

NPM: [https://www.npmjs.com/package/eslint](https://www.npmjs.com/package/eslint)

### 依赖说明 - stylelint

#### stylelint

stylelint 主要 cli 工具库。

Github: [https://github.com/stylelint/stylelint](https://github.com/stylelint/stylelint)

NPM: [https://www.npmjs.com/package/stylelint](https://www.npmjs.com/package/stylelint)

#### stylelint-config-standard

Github: [https://github.com/stylelint/stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)

NPM: [https://www.npmjs.com/package/stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)

Stylelint 的标准可共享配置。继承于 [https://github.com/stylelint/stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)

#### stylelint-config-standard-scss

Github: [https://github.com/stylelint-scss/stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)

NPM: [https://www.npmjs.com/package/stylelint-config-standard-scss](https://www.npmjs.com/package/stylelint-config-standard-scss)

scss 校验配置，已经包含了 `stylelint-config-standard` 的配置。

#### stylelint-config-prettier

Github: [https://github.com/prettier/stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)

NPM: [https://www.npmjs.com/package/stylelint-config-prettier](https://www.npmjs.com/package/stylelint-config-prettier)

关闭所有不必要的或可能与 Prettier 冲突的规则。这让你在使用 Prettier 时，可以使用你最喜欢的可共享的配置，而不会让它的风格选择受到影响。

#### stylelint-order

Github: [https://github.com/hudochenkov/stylelint-order](https://github.com/hudochenkov/stylelint-order)

NPM: [https://www.npmjs.com/package/stylelint-order](https://www.npmjs.com/package/stylelint-order)

css 顺序排序。

#### stylelint-config-recess-order

Github: [https://github.com/stormwarning/stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)

NPM: [https://www.npmjs.com/package/stylelint-config-recess-order](https://www.npmjs.com/package/stylelint-config-recess-order)

css 顺序排序规则。`stylelint-order` 是排序插件，这个是排序的规则。

#### stylelint-config-property-sort-order-smacss

Github: [https://github.com/cahamilton/stylelint-config-property-sort-order-smacss](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)

NPM: [https://www.npmjs.com/package/stylelint-config-property-sort-order-smacss](https://www.npmjs.com/package/stylelint-config-property-sort-order-smacss)

css 顺序排序规则。`stylelint-order` 是排序插件，这个是排序的规则。

### 0x4 配置文件

> 以下设置适用于 `cli` 创建的项目，`HbuilderX` 创建的项目，路径需要修改。例如 `./src/` 改成 `./` 这样。

#### husky

**安装**

```shell
npx husky install
```

**添加**

```shell
npx husky add .husky/pre-commit "npm run lint:lint-staged"
```

#### prettier

`${app}/prettier.config.js`

```javascript
/**
 * uni-app prettier 配置,和 vue 项目有一些区别！！！
 * @url https://prettier.io/docs/en/options.html
 * @author: SunSeekerX
 * @Date: 2020-07-20 16:34:25
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-05-25 11:21:47
 */

module.exports = {
  // 行宽 default:80
  printWidth: 120,
  // tab 宽度 default:2
  tabWidth: 2,
  // 使用 tab 键 default:false
  useTabs: false,
  // 语句行末是否添加分号 default:true
  semi: false,
  // 是否使用单引号 default:false
  singleQuote: true,
  // 对象需要引号在加 default:"as-needed"
  quoteProps: 'as-needed',
  // jsx单引号 default:false
  jsxSingleQuote: true,
  // 最后一个对象元素加逗号 default:"es5"
  trailingComma: 'es5',
  // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格 default:true
  bracketSpacing: true,
  // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）。default:false
  bracketSameLine: false,
  // (x) => {} 是否要有小括号 default:"always"
  arrowParens: 'always',
  // default:0
  rangeStart: 0,
  // default:Infinity
  rangeEnd: Infinity,
  // default:false
  insertPragma: false,
  // default:false
  requirePragma: false,
  // 不包装 markdown text default:"preserve"
  proseWrap: 'preserve',
  // HTML空白敏感性 default:"css"
  htmlWhitespaceSensitivity: 'strict',
  // 在 *.vue 文件中 Script 和 Style 标签内的代码是否缩进 default:false
  vueIndentScriptAndStyle: false,
  // 末尾换行符 default:"lf"
  endOfLine: 'auto',
}
```

#### .prettierignore

```shell
# 忽略打包的文件
src/unpackage
# 忽略uni-app官方的组件库错误和警告，官方的竟然通不过...
src/components/uni-**
```

#### eslint

已经升级到 v8。

`${app}/.eslintrc.js`

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // uni-app 内可以直接访问的全局变量
  globals: {
    uni: 'readonly',
    plus: 'readonly',
    wx: 'readonly',
    getApp: 'readonly',
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    babelOptions: {
      rootMode: 'upward',
    },
  },
  plugins: ['vue'],
  rules: {
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'prettier/prettier': 0,
    // nvue
    'vue/comment-directive': 0,
  },
}
```

#### .eslintignore

> 需要忽略打包的文件，像 `.gitignore` 一样的写法就行

```bash
# 忽略打包的文件
unpackage
# 忽略uni-app官方的组件库错误和警告，官方的竟然通不过...
components/uni-**
```

#### stylelint

> 用来校验 `scss,less,styl,css,html,vue` 的 `css`

`${app}/stylelint.config.js`

```javascript
/**
 * CSS 样式格式化
 * @author: SunSeekerX
 * @Date: 2022-03-23 17:49:16
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-05-26 18:08:09
 */

module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-prettier',
  ],
  rules: {
    'scss/at-import-partial-extension': 'always',
    'selector-class-pattern': null,
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx', 'upx'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['lines'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: [
          'page',
          'picker-view',
          'uni-scroll-view',
          'uni-button',
          'scroll-view',
          'uni-picker',
          'uni-image',
          'uni-textarea',
          'uni-page-body',
          'uni-input',
        ],
      },
    ],
    // nvue 至少需要一个 style 标签
    'no-empty-source': null,
    // nvue 字体设置
    'font-family-no-missing-generic-family-keyword': null,
  },
}
```

#### .stylelintignore

```bash
# 忽略打包的文件
src/unpackage
# 忽略uni-app官方的组件库错误和警告，官方的竟然通不过...
src/components/uni-**
```

#### lint-staged

> 用来对你已经 `git add` 的文件进行校验，所以不需要指定路径。

`${app}/lint-staged.config.js`

```javascript
/**
 * 暂存区检查配置
 * @author: SunSeekerX
 * @Date: 2020-11-13 12:46:27
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-01-13 19:08:29
 */

module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['prettier --write', 'stylelint --fix --allow-empty-input'],
  '*.{scss,less,styl,css,html}': ['stylelint --fix --allow-empty-input', 'prettier --write'],
  '*.md': ['prettier --write'],
}
```

#### package.json

> 删除了不必要的信息

`${app}/package.json`

```json
{
  "scripts": {
    "gc": "git add -A && git-cz && git pull && git push",
    "lint:eslint": "eslint --fix \"src/**/*.{vue,js}\"",
    "lint:lint-staged": "lint-staged",
    "lint:prettier": "prettier --write --loglevel warn \"src/**/*.{js,json,tsx,css,less,scss,vue,html,md}\"",
    "lint:stylelint": "stylelint --fix \"**/*.{vue,less,postcss,css,scss}\" --allow-empty-input --cache --cache-location node_modules/.cache/stylelint/",
    "pkg:sort": "npx sort-package-json"
  }
}
```

### 0x5 使用

#### 提交代码

本地执行

```shell
yarn gc
# 实际执行，这是个人自己定义的命令，因为经常需要推送和拉取代码，核心就是git cz替代git commit -m ''可以选择本次提交的类型，很方便
git add -A && git cz && git pull && git push
```

> 一条命令搞定了代码提交、校验、拉取、推送。当然遇到有冲突的情况还是需要自己手动解决。

#### 代码校验 - lint:eslint

```bash
yarn lint:eslint
```

#### 代码校验 - lint:prettier

```bash
yarn lint:prettier
```

#### 代码校验 - lint:stylelint

```bash
yarn lint:prettier
```

## 📌 HbuilderX

### prettier 插件设置

```javascript
module.exports = {
  // 行宽 default:80
  printWidth: 120,
  // tab 宽度 default:2
  tabWidth: 2,
  // 使用 tab 键 default:false
  useTabs: false,
  // 语句行末是否添加分号 default:true
  semi: false,
  // 是否使用单引号 default:false
  singleQuote: true,
  // 对象需要引号在加 default:"as-needed"
  quoteProps: 'as-needed',
  // jsx单引号 default:false
  jsxSingleQuote: true,
  // 最后一个对象元素加逗号 default:"es5"
  trailingComma: 'es5',
  // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格 default:true
  bracketSpacing: true,
  // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）。default:false
  jsxBracketSameLine: false,
  // (x) => {} 是否要有小括号 default:"always"
  arrowParens: 'always',
  // default:0
  rangeStart: 0,
  // default:Infinity
  rangeEnd: Infinity,
  // default:false
  insertPragma: false,
  // default:false
  requirePragma: false,
  // 不包装 markdown text default:"preserve"
  proseWrap: 'preserve',
  // HTML空白敏感性 default:"css"
  htmlWhitespaceSensitivity: 'strict',
  // 在 *.vue 文件中 Script 和 Style 标签内的代码是否缩进 default:false
  vueIndentScriptAndStyle: false,
  // 末尾换行符 default:"lf"
  endOfLine: 'auto',
  parsers: {
    '.jsx': 'flow',
    '.scss': 'scss',
    '.ts': 'typescript',
    '.less': 'css',
    '.vue': 'vue',
    '.nvue': 'vue',
    '.ux': 'vue',
    '.yml': 'yaml',
  },
}
```

## 📌 业务实现

### H5 复制内容到剪贴板

使用 **vue-clipboard2**

```bash
yarn add vue-clipboard2
```

`main.js`

```javascript
// #ifdef H5
import VueClipboard from 'vue-clipboard2'
// #endif

// #ifdef H5
Vue.use(VueClipboard)
// #endif
```

**message** 为复制的内容

```html
<!-- #ifdef H5 -->
<text
  v-clipboard:copy="message"
  v-clipboard:success="onH5CopySuccess"
  v-clipboard:error="onH5CopyError"
>
  复制
</text>
<!-- #endif -->
```

```javascript
onH5CopySuccess(e) {
  this.$util.toast('复制成功')
},
  onH5CopyError(e) {
    this.$util.toast('复制失败')
  },
```

### 安卓设置 App 通知

```javascript
/* 获取当前手机是否有通知权限 */
// #ifdef APP-PLUS
let main = plus.android.runtimeMainActivity()
let pkName = main.getPackageName()
let NotificationManagerCompat = plus.android.importClass(
  'android.support.v4.app.NotificationManagerCompat'
)
let packageNames = NotificationManagerCompat.from(main)
if (!packageNames.areNotificationsEnabled()) {
  //手机没有开启通知的权限
  let uid = main.getApplicationInfo().plusGetAttribute('uid')
  let Intent = plus.android.importClass('android.content.Intent')
  let Build = plus.android.importClass('android.os.Build')
  //android 8.0引导
  if (Build.VERSION.SDK_INT >= 26) {
    let intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')
    intent.putExtra('android.provider.extra.APP_PACKAGE', pkName)
  } else if (Build.VERSION.SDK_INT >= 21) {
    //android 5.0-7.0
    let intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')
    intent.putExtra('app_package', pkName)
    intent.putExtra('app_uid', uid)
  } else {
    //(<21)其他--跳转到该应用管理的详情页
    let Settings = plus.android.importClass('android.provider.Settings')
    let Uri = plus.android.importClass('android.net.Uri')
    let intent = new Intent()
    intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
    let uri = Uri.fromParts('package', main.getPackageName(), null)
    intent.setData(uri)
  }
  // 跳转到该应用的系统通知设置页
  main.startActivity(intent)
}
// #endif
```

### 微信支付和支付宝支付

```javascript
const payOrder =
  this.payType === 'wxpay'
    ? {
        appid: res.data.appid,
        noncestr: res.data.noncestr,
        package: res.data.package,
        partnerid: res.data.partnerid,
        prepayid: res.data.prepayid,
        timestamp: res.data.timestamp,
        key: res.data.unique_identifier,
        sign: res.data.sign,
      }
    : res.data.pay_str

uni.requestPayment({
  provider: this.payType,
  orderInfo: payOrder,
  success: (res) => {
    console.warn(res)
    uni.$u.toast('支付成功')
    this.isClick = true
    this.$refs.uToast.hide()
    setTimeout(() => {
      uni.navigateBack({})
    }, 1500)
  },
  fail: (res) => {
    console.warn(res)
    uni.$u.toast('支付失败')
    this.isClick = true
    this.$refs.uToast.hide()
  },
})
```

微信订单数据示例

```
{
  "appid": "wx6d3ffd250a0c6373",
  "noncestr": "CQ5u8Ejog9Uch6eqV4JYywnmN7f1dx0H",
  "package": "Sign=WXPay",
  "partnerid": "1622013925",
  "prepayid": "wx13101132913906a7dcdfed10a126a10000",
  "timestamp": 1649815892,
  "key": "QBApjv9cfdOHUzSEToVlrym08aI7gtk2",
  "sign": "E58BD95A072D07FFE8841BCC205BD599"
}
```

支付宝订单数据示例

```
app_id=2021003124663518&version=1.0&alipay_sdk=alipay-sdk-PHP-4.11.14.ALL&charset=UTF-8&format=JSON&sign_type=RSA2&method=alipay.trade.app.pay&timestamp=2022-04-13+10%3A11%3A55&notify_url=https%3A%2F%2Fapi.facetap.cn%2Fapi%2Fpay%2FaliNotify&biz_content=%7B%22subject%22%3A%22%E7%BB%88%E8%BA%ABvip%22%2C%22out_trade_no%22%3A%22M3NjmuSCtTVwGikvFXpxB7I0l2crPebh%22%2C%22total_amount%22%3A%22159.00%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&sign=TwwkHHs4XM9CXvzbeP6V6aQFBpaF%2BD8H6mNK0ghSy%2FzeB05L20pMB44W8PUhL2nj7nvZNC0dTNC3piPpa6QHf6aa068wAiQ%2F7AS8jdieD4gtcGN5nfdo4WEZY%2BA4jGoR5TWLwBeyyCOuX9LI%2BfwHeKnV3ULlYl3eNSeHbjpfKAE9QiMEbDh78zY%2BC7TSECyM4l5QTtMkb0pfG3QiNt%2B4prneuIzBL5i0AscFtmzgSq4AI35h4gZeKHAACvMcvSye8KVir5dkfO5fW16YOVo3djWjRmsJYDOvsMelQDPfl7%2Fyg%2FK0vM83TzM%2Bi7fXuz3X%2Fz%2Boncw0CUtt4y7U4bqI3w%3D%3D
```

## 📌 nvue

### 注意事项

1. 子组件触发父组件的方法，父组件接受方法名不能使用 `-` 连接，否则无法触发

   ```javascript
   // bad
   this.$emit('on-change-sort')

   // good
   this.$emit('abc')
   ```

## 📌 uview

1. Cannot read property 'bottom' of null

https://github.com/YanxinNet/uView/issues/239

```
chunk-vendors.js:10121 Uncaught TypeError: Cannot read property 'bottom' of null
```

## 📌 Utils function

```javascript
//api接口
Vue.prototype.api = 'http://127.0.0.1:3000'
// 全局验证手机号码的方法
Vue.prototype.isPhoneAvailable = function (str) {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(str) ? true : false
}
// 去除空格
Vue.prototype.trim = function (str) {
  return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
}
// 加载
Vue.prototype.loading = () => {
  uni.showLoading({ title: '加载中...', mask: true })
}
//关闭加载
Vue.prototype.hideLoading = () => {
  uni.hideLoading()
}
//toast
Vue.prototype.toast = (title) => {
  uni.showToast({ title, mask: false, duration: 1500, icon: 'none' })
}
```

### About rich-text

```javascript
for (var i = 0; i < data.length; i++) {
  data[i].question_describe = data[i].question_describe.replace(
    /\<img/gi,
    '<img style="max-width:100%;height:auto"'
  )
}
```
