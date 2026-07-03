# 📌 海康威视 SADP SDK_IOS - Super-Module-HKWS

## ⚠️ 警告

**插件市场的文档解析有问题！方法名解析有丢失，例如 `on start 放在一起就不见了`**

**查看在线文档：**[https://doc.yoouu.cn/front_end/uni_app/nativeplugins/super-module-hkws-sadp](https://doc.yoouu.cn/front_end/uni_app/nativeplugins/super-module-hkws-sadp)

## 简介

官网: [https://open.hikvision.com/download/5cda567cf47ae80dd41a54b3?type=10&id=643174655be04ffabef494f3f1f07746](https://open.hikvision.com/download/5cda567cf47ae80dd41a54b3?type=10&id=643174655be04ffabef494f3f1f07746)

Github: ~

更多插件：[https://doc.yoouu.cn/front_end/uni_app/nativeplugins/](https://doc.yoouu.cn/front_end/uni_app/nativeplugins/)

海康威视 SADP SDK_IOS。

基于私有搜索在线设备协议开发的 SDK，动态库形式提供，适用于"硬件与客户端处于同一个子网"的网络环境，主要功能包括搜索在线设备、激活设备、修改设备网络参数、重置设备密码等。

## 平台兼容性

| Android |  iOS   |
| :-----: | :----: |
|    ~    | >=11.0 |

## 使用示例

### @/utils/index.js

工具方法

```javascript
// Toast 提示
export function toast(title, val) {
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

// 安全运行
export function safeRunning(name, fun) {
  try {
    fun()
  } catch (e) {
    toast(name, e.message)
  }
}
```

### 测试 uni-app .vue 文件

```html
<template>
  <view class="content">
    <!-- 海康威视 -->
    <view class="gap"><text>📌 海康威视 - SADP</text></view>
    <button type="primary" @click="onStart">开始搜索设备: onStart</button>
    <button type="primary" @click="onSetFindDeviceCallback">设置设备回调监听: onSetFindDeviceCallback</button>
    <button type="primary" @click="onRefresh">刷新: onRefresh</button>

    <view class="wd-py-10">
      <text>iDS-2CD6810F/C20171215AAWR156541444</text>
    </view>
    <view class="input">
      <input v-model="sDevSerialNO" type="text" placeholder="请输入 sDevSerialNO" />
    </view>
    <view class="wd-py-10">
      <text>hik12345</text>
    </view>
    <view class="input">
      <input v-model="sCommand" type="text" placeholder="请输入 sCommand" />
    </view>

    <button type="primary" @click="onActivate">激活: onActivate</button>
    <button type="primary" @click="onSadpStop">停止: onSadpStop</button>
  </view>
</template>

<script>
  import { toast, safeRunning } from '@/utils'

  // #ifdef APP-PLUS
  const superModuleHkwsSadp = uni.requireNativePlugin('super-module-hkws-sadp')
  // #endif

  export default {
    name: 'SuperModulesIosHKWS',
    data() {
      return {
        sDevSerialNO: null,
        sCommand: null,
      }
    },
    methods: {
      // 寻找到设备设备信息回调
      onFindDeviceCallback(res) {
        toast('onFindDeviceCallback', res)
      },
      // 开始搜索设备
      onStart() {
        safeRunning('onStart', () => {
          superModuleHkwsSadp.onStart((result) => {
            toast('onStart', result)
          })
        })
      },
      // 设置设备回调监听
      onSetFindDeviceCallback() {
        safeRunning('onSetFindDeviceCallback', () => {
          const result = superModuleHkwsSadp.onSetFindDeviceCallback(this.onFindDeviceCallback)
          toast('onSetFindDeviceCallback', result)
        })
      },
      // 刷新
      onRefresh() {
        safeRunning('onRefresh', () => {
          superModuleHkwsSadp.onRefresh((result) => {
            toast('onRefresh', result)
          })
        })
      },
      // 激活
      onActivate() {
        safeRunning('onActivate', () => {
          if (!this.sDevSerialNO) {
            return toast('onActivate', '请输入 sDevSerialNO')
          }
          if (!this.sCommand) {
            return toast('onActivate', '请输入 sCommand')
          }
          superModuleHkwsSadp.onActivate(
            {
              sDevSerialNO: this.sDevSerialNO,
              sCommand: this.sCommand,
            },
            (result) => {
              toast('onActivate', result)
            },
          )
        })
      },

      // 停止
      onSadpStop() {
        safeRunning('onSadpStop', () => {
          superModuleHkwsSadp.onSadpStop((result) => {
            toast('onSadpStop', result)
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 12px 24rpx;

    button {
      margin-top: 6px;
      font-size: 16px;
    }

    .gap {
      margin-top: 18px;

      text {
        font-size: 18px;
      }

      &:first-child {
        margin-top: 0;
      }
    }

    .input {
      // margin-top: 12px;
      padding: 12rpx 24rpx;
      border: 1px solid #eee;
      color: #333;

      &:first-child {
        margin-top: 0;
      }
    }
  }
</style>
```

## 模块方法

### onSetFindDeviceCallback(callback): result

设置设备回调监听

- `callback` <Function\> 结果回调函数
- `result` <Object\> 执行返回信息
  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 设置设备监听成功
    - `400` 请传入监听函数
  - `msg` <String\> 请求信息

### onStart(callback):void

开始搜索设备

`callback` <Function\> 结果回调函数

回调结果

- `success` <Boolean\> 操作是否成功
- `code` <Number\> 状态码
  - `200` SADP_Start_V40 success
  - `400` 错误信息
- `msg` <String\> 请求信息

### onRefresh:void

刷新

`callback` <Function\> 结果回调函数

回调结果

- `success` <Boolean\> 操作是否成功
- `code` <Number\> 状态码
  - `200` SADP_SendInquiry success
  - `400` 错误信息
- `msg` <String\> 请求信息

### onActivate:void

激活

`callback` <Function\> 结果回调函数

回调结果

- `success` <Boolean\> 操作是否成功
- `code` <Number\> 状态码
  - `200` SADP_SendInquiry success
  - `400` 错误信息
  - `421` 请传入 sDevSerialNO
  - `422` 请传入 sCommand
- `msg` <String\> 请求信息

### onSadpStop:void

停止

`callback` <Function\> 结果回调函数

回调结果

- `success` <Boolean\> 操作是否成功
- `code` <Number\> 状态码
  - `200` SADP_Stop success
  - `400` 错误信息
- `msg` <String\> 请求信息

## 全局事件

## 权限列表

**ios**

无

**Android**

```xml

```

## 演示截图

**Ios**

| 开始搜索设备 | 开始搜索设备 | 刷新 | 停止 |
| --- | --- | --- | --- |
| <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app-nativeplugins/super-module-hkws-01.webp" alt="super-module-hkws-01" style="zoom:25%;" /> | <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app-nativeplugins/super-module-hkws-02.webp" alt="super-module-hkws-02" style="zoom:25%;" /> | <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app-nativeplugins/super-module-hkws-03.png" alt="super-module-hkws-03" style="zoom:25%;" /> | <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app-nativeplugins/super-module-hkws-04.png" alt="super-module-hkws-04" style="zoom:25%;" /> |

**Android**

## 更新日志

### 1.0.0

**功能（Features）**

- SADP SDK_IOS V4.2.8.10_build20220517

**Bug 修复 （Bug Fixes）**

**技术预研（Research）**

## 问题反馈

虽然插件已经经过开发者测试和使用，但不排除某些场景下产生问题的可能性，如遇到 `Bug` 可以

- 在评论区留言，收到通知邮件我会第一次时间查看
- 或发送邮件到 `sunseekerx@foxmail.com` 进行反馈

## 更多插件

- [在线插件介绍](https://doc.yoouu.cn/front_end/uni_app/nativeplugins/)
- [uni-app 插件市场](https://ext.dcloud.net.cn/publisher?id=64103)

如有插件定制需求，也可以联系我哦。
