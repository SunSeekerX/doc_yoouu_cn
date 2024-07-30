# react-native

## 开发环境安装

### 常见问题

1. `adb 不是内部命令` 或 `npx react-native run-android` 无法启动，需要将 android 开发 sdk 的 `platform-tools` 加入环境变量，否则无法访问 adb

### 安卓闪退

1. 引入了字体图标，安装启动闪退。`cd android &&./gradlew clean`。清除 `Gradle` 打包出来的文件，理论上改变了原生配置都需要清除。

## 路径别名

`../../../../../components/location` 这种路径看起来极度不友好，用惯了 vue 都习惯了 `@`，下面配置下路径别名方便使用。

```bash
npm i babel-plugin-module-resolver -D
# yarn
yarn add babel-plugin-module-resolver -D
```

**更新 Babel 配置**

`babel.config.js`

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
}
```

更新了记得重启项目。

## 字体图标

[**react-native-vector-icons**](https://github.com/oblador/react-native-vector-icons)

**安装**

```bash
$ npm install --save react-native-vector-icons
# yarn
$ yarn add react-native-vector-icons
```

**ios**

参考官网手动导入

**Android**

推荐使用 `Gradle`，编辑 `android/app/build.gradle`（不是 `android/build.gradle`），添加下面的内容

```groovy
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

如果要自定义复制的字体包，可以使用下面的代码进行自定义要复制的字体包

```groovy
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // 你想要复制的字体名
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

**iconfont**

一个项目不可能不自定义图标，国内 `iconfont` 是不二的选择。在 rn 中使用字体图标略有麻烦。推荐一个 cli 工具转换成 rn 组件，用起来非常方便。按照 github 示例使用即可。

[**react-native-iconfont-cli**](https://github.com/iconfont-cli/react-native-iconfont-cli)
