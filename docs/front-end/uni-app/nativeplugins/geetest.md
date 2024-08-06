# 📌 Geetest 极验

## ⚠️ 警告

**插件市场的文档解析有问题！方法名解析有丢失，例如 `on start 放在一起就不见了`**

**查看在线文档：**[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/geetest](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/geetest)

## 简介

官网: [https://www.geetest.com/](https://www.geetest.com/)

官方 uni-app 插件：[https://ext.dcloud.net.cn/plugin?id=2431](https://ext.dcloud.net.cn/plugin?id=2431)

更多插件：[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)

## 平台兼容性

|  Android   |  iOS   |
| :--------: | :----: |
| 4.4 - 11.0 | 9 - 14 |

## 使用示例

```javascript
const superModuleGeetest = uni.requireNativePlugin('Super-Module-Geetest')

// 启动极验验证
onStartGeetestVerify() {
  safeRunning('onStartGeetestVerify', () => {
    uni.showLoading({
      title: '请求极验接口参数',
      mask: true,
    })
    uni.request({
      url: 'YOUR_API_ADDRESS',
      method: 'GET',
      data: {
        source: 'app',
      },
      success: (res) => {
        safeRunning('onStartGeetestVerify', () => {
          superModuleGeetest.onStartGeetestVerify(
            {
              lang: 'zh', // zh | en | null
              initParams: res.data,
            },
            (res) => {
              toast('onStartGeetestVerify', res)
            }
          )
        })
      },
      fail: () => {
        toast('onStartGeetestVerify', '获取极验初始化参数失败')
      },
      complete: () => {
        uni.hideLoading()
      },
    })
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

### onStartGeetestVerify(options, callback)

启动极验认证

- `options` <Object\> 配置参数

  - `lang` <String\> | <null\> 国际化配置，默认为系统语言，支持的语言及语言短码如下：

    ```
    /**
     *  "zh" - 简体中文
     *  "zh-tw" - 繁体中文
     *  "zh-hk" - 繁体中文
     *  "ko" - 韩语
     *  "ja" - 日语
     *  "en" - 英语
     *  "id" - 印度尼西亚语
     *  "ar" - 阿拉伯语
     *  "de" - 德语
     *  "es" - 西班牙语
     *  "fr" - 法语
     *  "pt-pt" - 葡萄牙语
     *  "ru" - 俄语
     */
    ```

  - `initParams` <Object\> 初始化参数 类似 `{"success":1,"challenge":"f876950b0c0189566e8bee4a87943c3c","gt":"9a7972a4d1a4c71e421ed8f7ce3cabfa"}`

- `callback` <Function\> 结果回调

  回调结果

  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
    - `401` 启动极验验证参数获取失败，请检查!
    - `402` 验证失败
  - `msg` <String\> 请求信息
  - `data` <Object\> 请求成功返回数据
  - `err` <String\> | <Object\> 错误信息，不能直接提示给用户，可以用于 `debug`。

## 权限列表

**ios**

无

**Android**

无

**本插件采集的数据、发送的服务器地址、以及数据用途说明**

采集数据：设备电量、型号、屏幕尺寸等基础信息。用途：为动态安全对抗提供识别黑产依据。

极验 sdk 隐私政策：[https://www.geetest.com/Private](https://www.geetest.com/Private)

## 演示截图

| IOS | Android |
| :-: | :-: |
| <img src="https://static.yoouu.cn/static/imgs/2021/pic-go/geetest-ios1.jpg" alt="geetest-ios1" style="zoom:25%;" /> | <img src="https://static.yoouu.cn/static/imgs/2021/pic-go/geetest-android1.jpeg" alt="geetest-android1" style="zoom:25%;" /> |
| <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app-nativeplugins/super-module-geetest-01.webp" alt="super-module-geetest-01" style="zoom:25%;" /> | <img src="https://static.yoouu.cn/static/imgs/2021/pic-go/geetest-android2.jpeg" alt="geetest-android2" style="zoom:25%;" /> |

## 更新日志

### 1.0.2

**功能（Features）**

1. 升级 android `sdk` 版本到 `geetest_sensebot_android_v4.3.5.4_20220429.aar`
1. Android 插件添加需要的依赖

**Bug 修复 （Bug Fixes）**

1. 修复安卓部分情况下打包无法使用的问题

### 1.0.1

**功能（Features）**

1. 更新插件采集数据说明

**Bug 修复 （Bug Fixes）**

### 1.0.0

**功能（Features）**

- Android 使用极验 `sdk` 版本：`geetest_sensebot_android_v4.3.4.1_20210706.aar`
- Ios 使用极验 `sdk` 版本：`0.13.8`

**Bug 修复 （Bug Fixes）**

## 问题反馈

虽然插件已经经过开发者测试和使用，但不排除某些场景下产生问题的可能性，如遇到 `Bug` 可以

- 在评论区留言，收到通知邮件我会第一次时间查看
- 或发送邮件到 `sunseekerx@foxmail.com` 进行反馈

## 更多插件

- [在线插件介绍](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)
- [uni-app 插件市场](https://ext.dcloud.net.cn/publisher?id=64103)

如有插件定制需求，也可以联系我哦。
