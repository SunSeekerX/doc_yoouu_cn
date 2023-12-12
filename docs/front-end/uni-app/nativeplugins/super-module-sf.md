# 食方 AI 秤 - super-module-sf

## ⚠️ 警告

**插件市场的文档解析有问题！方法名解析有丢失，例如 `on start 放在一起就不见了`**

**查看在线文档：**

## 简介

食方 AI 秤

[https://www.mt.com/cn/zh/home/products/retail-weighing-scales/AI-Scales.html](https://www.mt.com/cn/zh/home/products/retail-weighing-scales/AI-Scales.html)

插件地址：[https://ext.dcloud.net.cn/plugin?id=11963](https://ext.dcloud.net.cn/plugin?id=11963)

## 平台兼容性

|  Android   | iOS |
| :--------: | :-: |
| 5.0 - 13.0 |  x  |

## 使用示例

```javascript
const superModuleSF = uni.requireNativePlugin('super-module-sf')

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

`SFSurfaceView`

```html
<SFSurfaceView ref="sfSurfaceView" class="wd-w-640r wd-h-480r wd-rounded-12" />
```

### 测试 uni-app .vue 文件

只用来做个示例

**super-module-sf**

```html
<template>
  <view class="content">
    <!-- getVersion -->
    <button class="margin" type="primary" @tap="getVersion">getVersion</button>
    <!-- checkPermissions -->
    <button class="margin" type="primary" @tap="checkPermissions">checkPermissions</button>
    <!-- release -->
    <button class="margin" type="primary" @tap="release">release</button>
    <!-- setAppAuth -->
    <view class="input">
      <input v-model="appAuth" type="text" placeholder="请输入 appAuth" />
    </view>
    <button type="primary" @click="setAppAuth">setAppAuth</button>

    <!-- login -->
    <view class="input">
      <input v-model="mLicenseNo" type="text" placeholder="请输入 mLicenseNo" />
    </view>
    <view class="input">
      <input v-model="mStoreNo" type="text" placeholder="请输入 mStoreNo" />
    </view>
    <button type="primary" @click="login">login</button>
    <button type="primary" @click="onToSFSurfaceView">onToSFSurfaceView</button>
  </view>
</template>
<script>
  import { toast, safeRunning } from '@/utils'

  // #ifdef APP-PLUS
  const superModuleSF = uni.requireNativePlugin('super-module-sf')
  // #endif
  export default {
    name: 'SuperSF',
    data() {
      return {
        appAuth: '',
        mLicenseNo: '',
        mStoreNo: '',
      }
    },
    methods: {
      getVersion() {
        safeRunning('getVersion', () => {
          const res = superModuleSF.getVersion()
          console.log('getVersion>>>', res)
          toast('getVersion', res)
        })
      },
      setAppAuth() {
        safeRunning('setAppAuth', () => {
          const res = superModuleSF.setAppAuth({
            appAuth: this.appAuth,
          })
          console.log('setAppAuth>>>', res)
          toast('setAppAuth', res)
        })
      },
      login() {
        safeRunning('login', () => {
          superModuleSF.login(
            {
              mLicenseNo: this.mLicenseNo,
              mStoreNo: this.mStoreNo,
            },
            (res) => {
              console.log('login>>>', res)
              toast('login', res)
            },
          )
        })
      },
      checkPermissions() {
        safeRunning('checkPermissions', () => {
          superModuleSF.checkPermissions((res) => {
            console.log('checkPermissions>>>', res)
            toast('checkPermissions', res)
          })
        })
      },
      release() {
        safeRunning('release', () => {
          const res = superModuleSF.release()
          console.log('release>>>', res)
          toast('release', res)
        })
      },
      onToSFSurfaceView() {
        uni.navigateTo({
          url: '/pages/android/ext-super-sf-surface-view',
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .content {
    padding: 12px 24rpx;
  }
  .margin {
    margin: 12px 16px;
  }

  .gap {
    margin-top: 18px;
  }

  .input {
    margin-top: 12px;
    padding: 12rpx 24rpx;
    border: 1px solid #eee;
    color: #333;
  }
</style>
```

**SFSurfaceView**

```html
<template>
  <view class="wd-p-12">
    <view class="wd-flex-center">
      <!-- #ifdef APP-NVUE -->
      <SFSurfaceView ref="sfSurfaceView" class="wd-w-640r wd-h-480r wd-rounded-12" />
      <!-- #endif -->
      <!-- #ifndef APP-NVUE -->
      <view class="wd-w-640r wd-h-480r wd-rounded-12" style="background-color: darkorchid;"></view>
      <!-- #endif -->
    </view>

    <view class="wd-mt-12">
      <!-- 识别 -->
      <button type="primary" @click="recognize">recognize</button>
      <view class="wd-mt-6">
        <!-- 同步方法测试 -->
        <button type="primary" @click="syncFunTest">同步方法测试 - syncFunTest</button>
      </view>

      <view class="wd-mt-6">
        <!-- 异步方法测试 -->
        <button class="wd-mt-6" type="primary" @click="asyncFunTest">异步方法测试 - asyncFunTest</button>
      </view>
    </view>

    <view class="wd-mt-12">
      <view
        style="background-color: darkcyan;"
        class="wd-px-12 wd-py-6 wd-mb-12 wd-rounded-12"
        v-for="item of products"
        :key="item.id"
        @click="feedback(item)"
      >
        <view>
          <text class="wd-text-12 wd-text-fff"
            >{{ `name: ${item.name} - code: ${item.code} - isSale: ${item.isSale}` }}</text
          >
        </view>
        <view>
          <text class="wd-text-12 wd-text-fff"
            >{{ `pluNo: ${item.pluNo} - priceFen: ${item.priceFen} - priceUnit: ${item.priceUnit} - price:
            ${item.price}` }}</text
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { toast, safeRunning } from '@/utils'

  // #ifdef APP-PLUS
  // const superModuleSF = uni.requireNativePlugin('super-module-sf')
  // #endif

  export default {
    name: 'SuperSFSurfaceView',
    data() {
      return {
        products: [
          {
            code: '6615',
            id: 2020,
            isSale: true,
            name: '商品1',
            pluNo: 6615,
            priceFen: 1200,
            priceUnit: 'kg',
            price: 12.0,
          },
          {
            code: '5981',
            id: 2021,
            isSale: true,
            name: '商品2',
            pluNo: 5981,
            priceFen: 3500,
            priceUnit: 'kg',
            price: 35.0,
          },
          {
            code: '4020',
            id: 2022,
            isSale: true,
            name: '商品3',
            pluNo: 4020,
            priceFen: 4000,
            priceUnit: 'kg',
            price: 40.0,
          },
          {
            code: '9673',
            id: 2023,
            isSale: true,
            name: '商品4',
            pluNo: 9673,
            priceFen: 9800,
            priceUnit: 'kg',
            price: 98.0,
          },
          {
            code: '9694',
            id: 2024,
            isSale: true,
            name: '商品5',
            pluNo: 9694,
            priceFen: 17600,
            priceUnit: 'kg',
            price: 176.0,
          },
          {
            code: '2542',
            id: 2025,
            isSale: true,
            name: '商品6',
            pluNo: 2542,
            priceFen: 4800,
            priceUnit: 'kg',
            price: 48.0,
          },
          {
            code: '3940',
            id: 2026,
            isSale: true,
            name: '商品7',
            pluNo: 3940,
            priceFen: 1100,
            priceUnit: 'kg',
            price: 11.0,
          },
          {
            code: '10406',
            id: 2028,
            isSale: true,
            name: '商品8',
            pluNo: 10406,
            priceFen: 3980,
            priceUnit: 'kg',
            price: 39.8,
          },
          {
            code: '9727',
            id: 2029,
            isSale: true,
            name: '商品9',
            pluNo: 9727,
            priceFen: 1300,
            priceUnit: 'kg',
            price: 13.0,
          },
          {
            code: '2697',
            id: 2030,
            isSale: true,
            name: '商品10',
            pluNo: 2697,
            priceFen: 3600,
            priceUnit: 'kg',
            price: 36.0,
          },
          {
            code: '10409',
            id: 2031,
            isSale: true,
            name: '商品11',
            pluNo: 10409,
            priceFen: 600,
            priceUnit: 'kg',
            price: 6.0,
          },
          {
            code: '9956',
            id: 2032,
            isSale: true,
            name: '商品12',
            pluNo: 9956,
            priceFen: 1500,
            priceUnit: 'kg',
            price: 15.0,
          },
          {
            code: '3934',
            id: 2033,
            isSale: true,
            name: '商品13',
            pluNo: 3934,
            priceFen: 500,
            priceUnit: 'kg',
            price: 5.0,
          },
          {
            code: '90304',
            id: 2036,
            isSale: true,
            name: '商品14',
            pluNo: 90304,
            priceFen: 5500,
            priceUnit: 'kg',
            price: 55.0,
          },
          {
            code: '9957',
            id: 2037,
            isSale: true,
            name: '商品15',
            pluNo: 9957,
            priceFen: 11100,
            priceUnit: 'kg',
            price: 111.0,
          },
          {
            code: '9341',
            id: 2038,
            isSale: true,
            name: '商品16',
            pluNo: 9341,
            priceFen: 1100,
            priceUnit: 'kg',
            price: 11.0,
          },
        ],
      }
    },
    methods: {
      recognize() {
        safeRunning('recognize', () => {
          this.$refs.sfSurfaceView.recognize((res) => {
            console.log('recognize>>>', res)
            toast('recognize', res)
          })
        })
      },
      feedback(item) {
        safeRunning('feedback', () => {
          this.$refs.sfSurfaceView.feedback(item, (res) => {
            console.log('feedback>>>', res)
            toast('feedback', res)
          })
        })
      },
      syncFunTest() {
        safeRunning('syncFunTest', () => {
          const res = this.$refs.sfSurfaceView.syncFunTest()
          console.log('syncFunTest>>>', res)
          toast('syncFunTest', res)
        })
      },
      asyncFunTest() {
        safeRunning('asyncFunTest', () => {
          this.$refs.sfSurfaceView.asyncFunTest((res) => {
            console.log('asyncFunTest>>>', res)
            toast('asyncFunTest', res)
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped></style>
```

## 模块方法

### getVersion() : result

获取 sdk 版本

- `result` <Object\> 执行返回信息
  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
  - `msg` <String\> 请求信息
  - `data` <String\> 请求成功返回数据

### checkPermissions(callback) : void

检查所需权限

- `callback` <Function\> 结果回调

  回调结果 <Object\>

  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
  - `msg` <String\> 请求信息
  - `data` <Object\> 提示数据
    - `permissions` <Array<String\>\>
    - `paramArrayOfInt` <Array<Int\>\>

### setAppAuth(options) : result

- `result` <Object\>执行返回信息
  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
    - `400` 用户操作导致失败
  - `msg` <String\> 请求信息
  - `data` <Object\> 权限描述
    - `permissions` 操作成功

### login(options, callback) : void

- `options` <Object\>

  - `mLicenseNo` <String\> mLicenseNo
  - `mStoreNo` <String\> mStoreNo

- `callback` <Function\> 结果回调

  回调结果 <Object\>

  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
  - `msg` <String\> 请求信息
  - `err` <String\> | <Object\> 错误信息，不能直接提示给用户，可以用于 `debug`。

### release(): void

释放资源

- `result` <Object\>执行返回信息
  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
    - `500` 操作失败
  - `msg` <String\> 请求信息
  - `data` <Object\> 结果码
  - `error` <String\> 错误消息

## 全局组件

### SFSurfaceView 模块方法

### recognize(callback) : void

识别

- `callback` <Function\> 结果回调

  回调结果 <Object\>

  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
    - `400` 调用相关错误
  - `msg` <String\> 请求信息

### feedback(callback) : void

- `callback` <Function\> 结果回调

  回调结果 <Object\>

  - `success` <Boolean\> 操作是否成功
  - `code` <Number\> 状态码
    - `200` 操作成功
    - `400` 调用相关错误
  - `msg` <String\> 请求信息

## 权限列表

**ios**

无

**Android**

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## 演示截图

| IOS | Android |
| :-: | :-----: |
|  x  |    x    |

## 更新日志

### 1.0.0

**功能（Features）**

- 交付版本

## 问题反馈

虽然插件已经经过开发者测试和使用，但不排除某些场景下产生问题的可能性，如遇到 `Bug` 可以

- 在评论区留言，收到通知邮件我会第一次时间查看
- 或发送邮件到 `sunseekerx@foxmail.com` 进行反馈

## 更多插件

- [在线插件介绍](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)
- [uni-app 插件市场](https://ext.dcloud.net.cn/publisher?id=64103)

如有插件定制需求，也可以联系我哦。
