# 📌 Screenshot 截屏监听 - Super-Module-ScreenshotListen

## ⚠️ 警告

**插件市场的文档解析有问题！方法名解析有丢失，例如 `on start 放在一起就不见了`**

**查看在线文档：**[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/screenshot-listen](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/screenshot-listen)

## 简介

监听系统截屏事件，返回截图图片路径。

更多插件：[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)

## 平台兼容性

|  Android   |  iOS   |
| :--------: | :----: |
| 4.4 - 11.0 | 9 - 14 |

## 使用示例

```javascript
const superModuleScreenshotListen = uni.requireNativePlugin('Super-Module-ScreenshotListen')

// 开始监听屏幕截图事件
onStartListenScreenshot() {
  safeRunning('onStartListenScreenshot', () => {
    const res = superModuleScreenshotListen.onStartListenScreenshot((result) => {
      toast('屏幕截图事件', result)
    })
    toast('onStartListenScreenshot', res)
  })
}

// 停止监听屏幕截图事件
onStopListenScreenshot() {
  safeRunning('onStopListenScreenshot', () => {
    const res = superModuleScreenshotListen.onStopListenScreenshot()
    toast('onStopListenScreenshot', res)
  })
}

/**
 * Toast 提示
 */
const toast = (title, val) => {
  try {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else {
      val = String(val)
    }
  } catch (e) {
    val = e.message
  } finally {
    uni.showToast({
      icon: 'none',
      title: `${title}: ${val}`,
      duration: 3000,
    })
  }
}

/**
 * 安全运行
 */
const safeRunning = (name, fun) => {
  try {
    fun()
  } catch (e) {
    toast(name, e.message)
  }
}
```

## 模块方法

### onStartListenScreenshot([callback]) : result

启动截屏监听。

- `callback` <Function\> 结果回调

  回调结果

  - `success` <Boolean\> 操作是否成功

  - `code` <Number\> 状态码

    - `200` 屏幕截图成功
    - `500` 查询出错（仅安卓）

  - `msg` <String\> 请求信息

  - `data` <Object\> 请求成功返回数据

    - `imgPath` <String\> | <null\> 图片绝对路径，仅安卓！

      > 在 Android 11 之后可能无法查询出来！目前在 `miui 12.5` Android 11 是可以查询出来的。

  - `err` <String\> 错误信息（仅安卓）

- `result` <Object\> 执行返回信息

  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
    - `400` 禁止重复添加截屏事件
  - `msg` <String\> 请求信息

### onStopListenScreenshot() : result

关闭截屏监听。

- `result` <Object\>执行返回信息
  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 停止监听截屏成功
    - `400` 未监听截屏事件
  - `msg` <String\> 请求信息

## 全局事件

### onScreenshot

截屏之后触发。

- `success` <Boolean\> 操作是否成功

- `code` <Number\> 状态码

  - `200` 屏幕截图成功
  - `500` 查询出错（仅安卓）

- `msg` <String\> 请求信息

- `data` <Object\> 请求成功返回数据

  - `imgPath` <String\> | <null\> 图片绝对路径，仅安卓！

    > 在 Android 11 之后可能无法查询出来！目前在 `miui 12.5` Android 11 是可以查询出来的。

- `err` <String\> 错误信息（仅安卓）

## 权限列表

**ios**

无

**Android**

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION"/>
```

## 演示截图

| IOS | Android |
| :-: | :-: |
| <img src="https://static.yoouu.cn/imgs/2021/pic-go/screenshot-listen-ios-screenshot.jpg" alt="screenshot-listen-ios-screenshot" style="zoom: 25%;" /> | <img src="https://static.yoouu.cn/imgs/2021/pic-go/screenshot-listen-android-screenshot.jpeg" alt="screenshot-listen-android-screenshot" style="zoom: 25%;" /> |

## 更新日志

### 1.0.3

**功能（Features）**

**Bug 修复 （Bug Fixes）**

1. 修复华为手机重复触发截屏事件
2. 修复与 `uni.chooseImage` 冲突，导致无法使用的问题

### 1.0.2

**功能（Features）**

**Bug 修复 （Bug Fixes）**

1. 【重要】ios 修复截屏之后会造成卡顿的问题，在 ios 不返回截屏图片路径
2. 修复安卓截屏插件重复触发截屏事件

### 1.0.1

**功能（Features）**

1. 更新插件权限说明

**Bug 修复 （Bug Fixes）**

### 1.0.0

**功能（Features）**

1. 完成开发。

**Bug 修复 （Bug Fixes）**

## 问题反馈

虽然插件已经经过开发者测试和使用，但不排除某些场景下产生问题的可能性，如遇到 `Bug` 可以

- 在评论区留言，收到通知邮件我会第一次时间查看
- 或发送邮件到 `sunseekerx@foxmail.com` 进行反馈

## 更多插件

- [在线插件介绍](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)
- [uni-app 插件市场](https://ext.dcloud.net.cn/publisher?id=64103)

如有插件定制需求，也可以联系我哦。
