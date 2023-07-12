# 📌 Sensetime 商汤人脸识别

## ⚠️ 警告

**插件市场的文档解析有问题！方法名解析有丢失，例如 `on start 放在一起就不见了`**

**查看在线文档：**[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/sensetime](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/sensetime)

## 简介

官网：[https://www.sensetime.com/senseid/home](https://www.sensetime.com/senseid/home)

该插件需要单独定制，因为需要和证书绑定。

更多插件：[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)

## 平台兼容性

|  Android   |  iOS   |
| :--------: | :----: |
| 4.4 - 11.0 | 9 - 14 |

## 使用示例

```javascript
const superModuleSensetime = uni.requireNativePlugin('Super-Module-Sensetime')

// 启动人脸识别
onStartSenseId() {
  safeRunning('onStartSenseId', () => {
    superModuleSensetime.onStartSenseId({
      name: '张三丰',
      idNumber: '张三丰的身份证号码',
      url: 'xxxxxx',
      nonce: 'xxxxxx',
      sign: 'xxxxxx',
      token:'xxxxxx',
      apiKey: 'xxxxxx',
      apiSecret: 'xxxxxx',
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

### onStartSenseId(options, callback)

启动商汤人脸识别，进入到原生界面进行识别操作。

- `options` <Object\> 验证需要的信息
  - `name` <String\> 姓名
  - `idNumber` <String\> 身份证号码
  - `url` <String\> 活体认证请求 url 地址
  - `nonce` <String\> 签名参数，放在请求 header
  - `sign` <String\> 签名参数，放在请求 header
  - `token` <String\> token，放在请求 header
  - `apiKey` <String\> 商汤 api key
  - `apiSecret` <String\> 商汤 secret
- `callback` <Function\> 结果回调
  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 回调参数
    - `200` 人脸识别成功
    - `450` 用户返回主动取消
    - `451` App 置于后台主动取消
    - `550` 人脸识别结果未知
  - `msg` <String\> 错误信息

### onGetAuthorization(options, callback)

获取签名头。

- `options` <Object\> 参数

  - `apiKey` <String\> 商汤 api key
  - `apiSecret` <String\> 商汤 secret

- `callback` <Function\> 结果回调

  回调参数

  - `success` <Boolean\> 操作是否成功

  - `code` <Number\> 状态码
    - `200` 获取成功
    - `500` 获取失败
  - `msg` <String\> 错误信息
  - `data` <String\> 请求头

## 全局事件

### onLivenessResult

认证结果全局事件。

- `success` <Boolean\> 操作是否成功

- `code` <Number\> 回调参数
  - `200` 人脸识别成功
  - `400` 后台返回错误，直接提示 `msg`
  - `450` 用户返回主动取消
  - `451` App 置于后台主动取消
  - `550` 人脸识别结果未知
- `msg` <String\> 错误信息
- `data` <Object\> `code` 为 `200` 返回
  - `verificationScore` 人脸识别阈值

### onAuthorizationResult

获取验证头回调。

- `success` <Boolean\> 操作是否成功

- `code` <Number\> 状态码
  - `200` 获取成功
  - `500` 获取失败
- `msg` <String\> 错误信息
- `data` <String\> 请求头

## 更新记录

### 1.0.0

**功能（Features）**

- Android 使用的 `sdk` 版本：`3.14.0`

**Bug 修复 （Bug Fixes）**

## 问题反馈

虽然插件已经经过开发者测试和使用，但不排除某些场景下产生问题的可能性，如遇到 `Bug` 可以

- 在评论区留言，收到通知邮件我会第一次时间查看
- 或添加 `微信: sunseekerx` 进行反馈
- 或添加 `QQ: 1647800606` 进行反馈

## 更多插件

- [在线插件介绍](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)
- [uni-app 插件市场](https://ext.dcloud.net.cn/publisher?id=64103)

如有插件定制需求，也可以联系我哦。
