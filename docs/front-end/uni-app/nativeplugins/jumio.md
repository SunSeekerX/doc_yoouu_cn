# 📌 Jumio

## ⚠️ 警告

**插件市场的文档解析有问题！方法名解析有丢失，例如 `on start 放在一起就不见了`**

**查看在线文档：**[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/jumio](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/jumio)

## 简介

Jumio kyc 平台插件

更多插件：[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)

官网: [https://www.jumio.com/](https://www.jumio.com/)

Github: [https://github.com/Jumio](https://github.com/Jumio)

## 平台兼容性

|  Android   | iOS |
| :--------: | :-: |
| 4.4 - 11.0 |     |

## 使用示例

```javascript
const superModuleJumio = uni.requireNativePlugin('Super-Module-Jumio')

/**
 * 启动 Jumio
*/
// Jumio
onStartJumio() {
    const { token, dataCenter } = this.jumio
    if (!token) {
        return toast('onStartJumio', '请输入 token')
    } else if (!dataCenter) {
        return toast('onStartJumio', '请输入 dataCenter')
    }
    safeRunning('onStartJumio', () => {
        superModuleJumio.onStartJumio(
            {
                token,
                dataCenter,
            },
            (res) => {
                toast('onStartJumio', res)
            }
        )
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

### onStartJumio(options, callback) : Void

启动 jumio

- `options` <Object\>

  - `token` <String\> SDK 启动 token
  - `dataCenter` <String\> 数据中心字符串
    - `US`
    - `EU`
    - `SG`

- `callback` <Function\> 结果回调

  回调结果

  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 提交成功
    - `400` 客户端造成的应用程序错误
    - `500` 应用程序错误
  - `err` <String\> 错误信息

## 全局事件

none

## 权限列表

**ios**

无

**Android**

```xml
<uses-permission android:name="android.permission.VIBRATE" />
```

## 演示截图

| IOS | Android |
| :-: | :-: |
|  | <img src="https://static.yoouu.cn/static/imgs/2021/pic-go/jumio-android-screenshot.jpg" alt="e0cff53506fd1b5769925a276608871" style="zoom: 25%;" /> |

## 更新日志

### 1.0.0

**功能（Features）**

- 使用的 `sdk` 版本：`Android 4.0`

**Bug 修复 （Bug Fixes）**

**技术预研（Research）**

## 问题反馈

虽然插件已经经过开发者测试和使用，但不排除某些场景下产生问题的可能性，如遇到 `Bug` 可以

- 在评论区留言，收到通知邮件我会第一次时间查看
- 或发送邮件到 `sunseekerx@foxmail.com` 进行反馈

## 更多插件

- [在线插件介绍](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)
- [uni-app 插件市场](https://ext.dcloud.net.cn/publisher?id=64103)

如有插件定制需求，也可以联系我哦。
