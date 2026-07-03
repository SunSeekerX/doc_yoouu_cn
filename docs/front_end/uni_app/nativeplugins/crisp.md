# 📌 Crisp 客服

## ⚠️ 警告

**插件市场的文档解析有问题！方法名解析有丢失，例如 `on start 放在一起就不见了`**

**查看在线文档：**[https://doc.yoouu.cn/front_end/uni_app/nativeplugins/crisp](https://doc.yoouu.cn/front_end/uni_app/nativeplugins/crisp)

## 简介

官网: [https://crisp.chat/en/](https://crisp.chat/en/)

Github: [https://github.com/crisp-im](https://github.com/crisp-im)

更多插件：[https://doc.yoouu.cn/front_end/uni_app/nativeplugins/](https://doc.yoouu.cn/front_end/uni_app/nativeplugins/)

## 平台兼容性

|  Android   |   iOS   |
| :--------: | :-----: |
| 5.0 - 13.0 | 13 - 16 |

## 使用示例

1. 选中原生插件
2. 在可视化区域配置 `websiteId` 参数
3. 直接调用 `onStartCrisp()` 即可启动。

> 2.0 以前只能初始化一次，实际上是不正确的，2.0 的版本使用体验和官方保持了一直，可以动态去修改 `websiteId`，如果未设置 `websiteId` 会出现安卓闪退，ios 没有反应。原因是因为没办法去判断是否已经设置了 `websiteId`。已经提了需求可以点这里查看: [https://github.com/crisp-im/crisp-sdk-android/issues/138](https://github.com/crisp-im/crisp-sdk-android/issues/138) 如果官方后续支持了的话，我会跟进修改。

```javascript
const superModuleCrisp = uni.requireNativePlugin('Super-Module-Crisp')

/**
 * 初始化 Crisp, 2.0 以后 可以重复初始化
*/
onInitConfigureCrisp() {
  const res = superModuleCrisp.onInitConfigure({
    websiteId: 'YOUR_WEBSITE_ID',
  })
  toast('onInitConfigureCrisp', res)
}

/**
 * 启动 Crisp
*/
onStartCrisp() {
  const res =  superModuleCrisp.onStartCrisp()
  toast('onStartCrisp', res)
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

### onInitConfigure(options): result

初始化 Crisp。

- `options` <Object\>
  - `websiteId` <String\> 网站 id
- `result` <Object\> 执行返回信息
  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 初始化 Crisp 成功!
    - `400` 请传入 "websiteId"!
    - `401` 请勿重复初始化!
  - `msg` <String\> 请求信息

### onStartCrisp(options?): result

启动 Crisp。

**请注意在原生插件设置了 `websiteId` 或者传入 `websiteId` 和 `isInit` 为 `true` 才能启动成功，否则安卓会闪退，ios 没有反应。**

`options` <Object\> 启动参数，可选

- `isInit` <Boolean\> 是否进行初始化
- `websiteId` <String\> 网站 id

`result` <Object\> 执行返回信息

- `success` <Boolean\> 操作是否成功
- `code` <Number\> 状态码
  - `200` 启动成功!
- `msg` <String\> 请求信息

### onInvokeCrispFun(options): result

调用 SDK 其他的方法。ios 方法名参考 android sdk 方法名调用。官方 Android 文档: [https://docs.crisp.chat/guides/chatbox-sdks/android-sdk/](https://docs.crisp.chat/guides/chatbox-sdks/android-sdk/)

`options` <Object\> 参数

- `name` <String\> 方法名
- `params` <Object\> 方法参数，根据官网文档参数顺序设置

`result` <Object\> 执行返回信息

- `success` <Boolean\> 操作是否成功
- `code` <Number\> 状态码
  - `200` 启动成功!
  - `400` 请先初始化!
- `msg` <String\> 请求信息

示例

```javascript
const res = superModuleCrisp.onInvokeCrispFun({
  name,
  params,
})
toast(`onInvokeCrispFun - ${name}`, res)
```

## 权限列表

**Ios**

```
 [
         "NSCameraUsageDescription",
         "NSPhotoLibraryAddUsageDescription"
       ]
```

**Android**

无

**本插件采集的数据、发送的服务器地址、以及数据用途说明**

Crisp sdk 隐私政策：[https://crisp.chat/en/privacy/](https://crisp.chat/en/privacy/)

## 演示截图

| IOS | Android |
| :-: | :-: |
| <img src="https://static.yoouu.cn/static/imgs/2021/pic-go/crisp-ios-screenshot.png" alt="ios-screenshot" style="zoom: 25%;" /> | <img src="https://static.yoouu.cn/static/imgs/2021/pic-go/crisp-android-screenshot.jpeg" alt="android-screenshot" style="zoom: 25%;" /> |

## 测试文件代码

```html
<template>
  <view class="content">
    <!-- Crisp -->
    <view class="gap"><text>📌 Crisp</text></view>
    <!-- 初始化 Crisp -->
    <view class="input">
      <input v-model="crisp.websiteId" type="text" placeholder="请输入 websiteId" />
    </view>
    <button type="primary" @click="onInitConfigureCrisp">初始化 Crisp</button>

    <!-- 设置 configure -->
    <view class="input">
      <input v-model="crisp.configureWebsiteId" type="text" placeholder="请输入 websiteId" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'configure',
          params: {
            websiteId: crisp.configureWebsiteId,
          },
        })
      "
      >configure</button
    >

    <!-- setTokenID -->
    <view class="input">
      <input v-model="crisp.tokenID" type="text" placeholder="请输入 tokenID" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setTokenID',
          params: {
            websiteId: crisp.tokenID,
          },
        })
      "
      >setTokenID</button
    >

    <!-- resetChatSession -->
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'resetChatSession',
        })
      "
      >resetChatSession</button
    >

    <!-- setUserAvatar -->
    <view class="input">
      <input v-model="crisp.avatar" type="text" placeholder="请输入 avatar" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setUserAvatar',
          params: {
            avatar: crisp.avatar,
          },
        })
      "
      >setUserAvatar</button
    >

    <!-- setUserCompany -->
    <view class="input">
      <input v-model="crisp.name" type="text" placeholder="请输入 name" />
    </view>
    <view class="input"> <input v-model="crisp.url" type="text" placeholder="请输入 url" /> </view>
    <view class="input">
      <input v-model="crisp.companyDescription" type="text" placeholder="请输入 companyDescription" />
    </view>
    <view class="input">
      <input v-model="crisp.employment.role" type="text" placeholder="请输入 employment.role" />
    </view>
    <view class="input">
      <input v-model="crisp.employment.title" type="text" placeholder="请输入 employment.title" />
    </view>
    <view class="input">
      <input v-model="crisp.geolocation.city" type="text" placeholder="请输入 geolocation.city" />
    </view>
    <view class="input">
      <input v-model="crisp.geolocation.country" type="text" placeholder="请输入 geolocation.country" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setUserCompany',
          params: {
            name: crisp.name,
            url: crisp.url,
            companyDescription: crisp.companyDescription,
            employment: {
              role: crisp.employment.role,
              title: crisp.employment.title,
            },
            geolocation: {
              city: crisp.geolocation.city,
              country: crisp.geolocation.country,
            },
          },
        })
      "
      >setUserCompany</button
    >

    <!-- 设置用户邮箱 -->
    <view class="input">
      <input v-model="crisp.email" type="text" placeholder="请输入用户邮箱" />
    </view>
    <button type="primary" @click="onCrispSetUserEmail">设置用户邮箱</button>

    <!-- setUserNickname -->
    <view class="input">
      <input v-model="crisp.nickname" type="text" placeholder="请输入 nickname" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setUserNickname',
          params: {
            nickname: crisp.nickname,
          },
        })
      "
      >setUserNickname</button
    >

    <!-- setUserPhone -->
    <view class="input">
      <input v-model="crisp.phone" type="text" placeholder="请输入 phone" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setUserPhone',
          params: {
            phone: crisp.phone,
          },
        })
      "
      >setUserPhone</button
    >

    <!-- setSessionBool -->
    <view class="input">
      <input v-model="crisp.setSessionBool.key" type="text" placeholder="请输入 setSessionBool.key" />
    </view>
    <view class="input">
      <text>setSessionBool.value</text>
      <u-switch
        v-model="crisp.setSessionBool.value"
        @change="
          (val) => {
            crisp.setSessionBool.value = val
          }
        "
      />
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setSessionBool',
          params: {
            key: crisp.setSessionBool.key,
            value: crisp.setSessionBool.value,
          },
        })
      "
      >setSessionBool</button
    >

    <!-- setSessionInt -->
    <view class="input">
      <input v-model="crisp.setSessionInt.key" type="text" placeholder="请输入 setSessionInt.key" />
    </view>
    <view class="input">
      <input v-model="crisp.setSessionInt.value" type="text" placeholder="请输入 setSessionInt.value" />
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setSessionInt',
          params: {
            key: crisp.setSessionInt.key,
            value: crisp.setSessionInt.value,
          },
        })
      "
      >setSessionInt</button
    >

    <!-- setSessionString -->
    <view class="input">
      <input v-model="crisp.setSessionString.key" type="text" placeholder="请输入 setSessionString.key" />
    </view>
    <view class="input">
      <input v-model="crisp.setSessionString.value" type="text" placeholder="请输入 setSessionString.value" />
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setSessionString',
          params: {
            key: crisp.setSessionString.key,
            value: crisp.setSessionString.value,
          },
        })
      "
      >setSessionString</button
    >

    <!-- segment -->
    <view class="input">
      <input v-model="crisp.segment" type="text" placeholder="请输入 segment" />
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setSessionSegment',
          params: {
            segment: crisp.segment,
          },
        })
      "
      >segment</button
    >

    <!-- pushSessionEvent -->
    <view class="input">
      <input v-model="crisp.pushSessionEvent.text" type="text" placeholder="请输入 pushSessionEvent.text" />
    </view>
    <view class="input" @tap="state.isShowColorPicker = true">
      <text>crisp.pushSessionEvent.color: {{ crisp.pushSessionEvent.color }}</text>
      <!-- <input v-model="crisp.pushSessionEvent.color" disabled type="text" placeholder="请输入 pushSessionEvent.color" /> -->
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'pushSessionEvent',
          params: {
            text: crisp.pushSessionEvent.text,
            color: crisp.pushSessionEvent.color,
          },
        })
      "
      >pushSessionEvent</button
    >

    <!-- 启动 Crisp -->
    <view class="input">
      <text>是否设置 websiteId</text>
      <u-switch
        v-model="crisp.isInit"
        @change="
          (val) => {
            crisp.isInit = val
          }
        "
      />
    </view>
    <button type="primary" @click="onStartCrisp">启动 Crisp</button>

    <u-picker
      :show="state.isShowColorPicker"
      :defaultIndex="colorIndex"
      @confirm="
        (val) => {
          crisp.pushSessionEvent.color = val.value[0]
          state.isShowColorPicker = false
          colorIndex[0] = val.indexs[0]
        }
      "
      :columns="[['black', 'blue', 'brown', 'green', 'grey', 'orange', 'pink', 'purple', 'red', 'yellow']]"
    />
  </view>
</template>

<script>
  import { toast, safeRunning } from '@/utils'

  // #ifdef APP-PLUS
  const superModuleCrisp = uni.requireNativePlugin('Super-Module-Crisp')
  // #endif

  export default {
    name: 'SuperModuleCrisp',
    data() {
      return {
        state: {
          isShowColorPicker: false,
        },
        colorIndex: [9],

        // Crisp
        crisp: {
          websiteId: '7a30b69a-ec9e-4957-9ffa-b6635d2ba069',
          isInit: false,

          // configure
          configureWebsiteId: '7a30b69a-ec9e-4957-9ffa-b6635d2ba069',

          // setTokenID
          tokenID: '',

          // setUserAvatar
          avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',

          // setUserCompany
          name: 'SunSeekerX 公司',
          url: 'https://yoouu.cn/',
          companyDescription: '天下第一。',
          employment: {
            role: '总经理',
            title: '我是标题',
          },
          geolocation: {
            city: '上海',
            country: '中国',
          },

          // setUserEmail
          email: 'xxx@outlook.com',

          // setUserNickname
          nickname: '不知道起啥昵称',

          // setUserPhone
          phone: '13800000000',

          // setSessionBool
          setSessionBool: {
            key: '',
            value: false,
          },

          // setSessionInt
          setSessionInt: {
            key: '',
            value: 0,
          },

          // setSessionString
          setSessionString: {
            key: '',
            value: '',
          },

          // setSessionSegment
          segment: '',

          // pushSessionEvent
          pushSessionEvent: {
            text: '',
            /*
           @SerializedName("black")
            BLACK,
            @SerializedName("blue")
            BLUE,
            @SerializedName("brown")
            BROWN,
            @SerializedName("green")
            GREEN,
            @SerializedName("grey")
            GREY,
            @SerializedName("orange")
            ORANGE,
            @SerializedName("pink")
            PINK,
            @SerializedName("purple")
            PURPLE,
            @SerializedName("red")
            RED,
            @SerializedName("yellow")
            YELLOW;
           */
            color: 'yellow',
          },
        },
      }
    },
    methods: {
      /**
       * 初始化 Crisp
       */
      onInitConfigureCrisp() {
        safeRunning('onInitConfigureCrisp', () => {
          const res = superModuleCrisp.onInitConfigure({
            // 4650b9b7-111f-4548-9e09-94dede5be9ed Cowbitex,
            // 7a30b69a-ec9e-4957-9ffa-b6635d2ba069 sunseekerx,
            websiteId: this.crisp.websiteId,
          })
          toast('onInitConfigureCrisp', res)
        })
      },

      /**
       * 启动 Crisp
       */
      onStartCrisp() {
        safeRunning('onStartCrisp', () => {
          // superModuleCrisp.onStartCrisp()
          const res = superModuleCrisp.onStartCrisp({
            isInit: this.crisp.isInit,
            websiteId: this.crisp.websiteId,
          })
          toast('onStartCrisp', res)
        })
      },

      /**
       * 设置用户邮箱
       */
      onCrispSetUserEmail() {
        safeRunning('onCrispSetUserEmail', () => {
          const res = superModuleCrisp.onInvokeCrispFun({
            name: 'setUserEmail',
            params: {
              email: this.crisp.email,
            },
          })
          toast('onCrispSetUserEmail', res)
        })
      },

      /**
       * onInvokeCrispFun
       */
      onInvokeCrispFun({ name, params }) {
        safeRunning(`onInvokeCrispFun - ${name}`, () => {
          const res = superModuleCrisp.onInvokeCrispFun({
            name,
            params,
          })
          toast(`onInvokeCrispFun - ${name}`, res)
        })
      },
      confirm(e) {
        console.log(e)
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
      margin-top: 12px;
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

## 更新日志

### 2.0.0 2022-09-24

**功能（Features）**

- 【重要】支持调用 sdk 其他的方法，已经全部支持官方提供的方法
- 【重要】支持可视化配置 `websiteId`
- 【重要】支持动态修改 `websiteId`
- 【重要】升级到最新的可用的 sdk 版本

- Android 使用的 `sdk` 版本：`crisp-sdk-1.0.11.aar`
- Ios 使用的 `sdk` 版本：`Crisp_1.6.4.zip`

### 1.0.1

**功能（Features）**

1. 更新插件采集数据说明

**Bug 修复 （Bug Fixes）**

### 1.0.0

**功能（Features）**

- Android 使用的 `sdk` 版本：`crisp-sdk-1.0.7.aar`
- Ios 使用的 `sdk` 版本：`Crisp_1.0.14.zip`

**Bug 修复 （Bug Fixes）**

## 问题反馈

虽然插件已经经过开发者测试和使用，但不排除某些场景下产生问题的可能性，如遇到 `Bug` 可以

- 在评论区留言，收到通知邮件我会第一次时间查看
- 或发送邮件到 `sunseekerx@foxmail.com` 进行反馈

## 更多插件

- [在线插件介绍](https://doc.yoouu.cn/front_end/uni_app/nativeplugins/)
- [uni-app 插件市场](https://ext.dcloud.net.cn/publisher?id=64103)

如有插件定制需求，也可以联系我哦。
