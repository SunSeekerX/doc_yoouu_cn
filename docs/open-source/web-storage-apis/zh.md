# Web-storage-apis

[Github](https://github.com/SunSeekerX/web-storage-apis)

[online](https://doc.yoouu.cn/open-source/web-storage-apis/zh)

**简体中文** [English](en.md)

帮助你更好地使用浏览器的数据存储功能

- 简单易懂的 api
- 三种数据存储位置切换
- 不支持`Storage`自动切换到`Cookie`进行数据存储
- 数据可选可读与不可读
- `debug`功能

## 使用 🔨

## 安装

```bash
# 使用npm
npm i web-storage-apis

# 或者 yarn

yarn add web-storage-apis
```

## 在 Vue 中使用

### 引入模块

`app/src/main.js`

```javascript
import storage from 'web-storage-apis'
Vue.prototype.$storage = storage
```

### 测试代码

`app/src/App.vue`

```vue
<template>
  <div id="app">
    <h1>web-storage-apis test</h1>

    <div>
      <span class="primary">isReadable?：</span>
      <span
        class="value"
        :class="{
          success: storage && storage._config && storage._config.isReadable,
        }"
      >
        {{ storage && storage._config ? storage._config.isReadable : '-' }}
      </span>
    </div>

    <div>
      <span class="primary">debug?：</span>
      <span
        class="value"
        :class="{
          success: storage && storage._config && storage._config.debug,
        }"
      >
        {{ storage && storage._config ? storage._config.debug : '-' }}
      </span>
    </div>

    <div>
      <span class="primary">local storage?：</span>
      <span class="value" :class="{ success: local }">
        {{ local }}
      </span>
    </div>

    <div>
      <span class="primary">isUsingCookie?：</span>
      <span
        class="value"
        :class="{
          success: storage && storage._config && storage._config.isUsingCookie,
        }"
      >
        {{ storage && storage._config ? storage._config.isUsingCookie : '-' }}
      </span>
    </div>

    <div>
      <span class="primary">Support Storage?：</span>
      <span
        class="value"
        :class="{
          success: storage && storage._config && storage._config.isSupportStorage,
        }"
      >
        {{ storage && storage._config ? storage._config.isSupportStorage : '-' }}
      </span>
    </div>

    <div>
      <span class="primary">Support Cookie?：</span>
      <span
        class="value"
        :class="{
          success: storage && storage._config && storage._config.isSupportCookie,
        }"
      >
        {{ storage && storage._config ? storage._config.isSupportCookie : '-' }}
      </span>
    </div>

    <hr />

    <button
      class="bg-success"
      @click=";(storageSetting.isReadable = !storageSetting.isReadable), onChangeStorageConfig()"
    >
      切换可读配置
    </button>

    <button
      class="bg-success"
      @click=";(storageSetting.debug = !storageSetting.debug), onChangeStorageConfig()"
    >
      切换debug
    </button>

    <button class="bg-success" @click=";(local = !local), onChangeStorageConfig()">
      切换local
    </button>

    <button @click="onStorageData('DATA', 'Hello World!')"> Store String（Hello World!） </button>

    <button @click="onStorageData('DATA', true)"> Store Boolean（true） </button>

    <button @click="onStorageData('DATA', 1234567890)"> Store Number（1234567890） </button>

    <button @click="onStorageData('DATA', ['one', 'two', 'three'])">
      Store Array（['one', 'two', 'three']）
    </button>

    <button @click="onStorageData('DATA', { age: 11, name: '李白', emoji: '❤' })">
      Store Object（{age: 11, name: '李白', emoji: '❤'}）
    </button>

    <button class="bg-success" @click="onGetStorageData('DATA')"> 获取数据 </button>

    <button class="bg-warn" @click="onRemoveData('DATA')">移除数据</button>

    <button class="bg-warn" @click="onClearData()">清空数据</button>
  </div>
</template>

<script>
  import storage from './utils/bundle.esm'

  export default {
    name: 'App',
    data() {
      return {
        // 工具对象
        storage: null,
        // 是否存入localStorage
        local: false,
        storageSetting: {
          // 在localstorage无法使用的情况下是否使用cookie作为回退
          isUsingCookie: true,
          // 是否开启调试模式
          debug: false,
          // 写入的数据是否可读
          isReadable: true,
        },
      }
    },
    mounted() {
      // 初始化存储设置
      this.onChangeStorageConfig()
      this.storage = storage
    },
    methods: {
      // 改变storage设置
      onChangeStorageConfig() {
        storage.setConfig(this.storageSetting)
      },
      // 存入数据
      onStorageData(key, data) {
        storage.setStorageSync(key, data, this.local)
      },
      // 获取数据
      onGetStorageData(key) {
        console.log(storage.getStorageSync(key, this.local))
      },
      // 移除数据
      onRemoveData(key) {
        storage.removeStorageSync(key, this.local)
      },
      // 清空数据
      onClearData() {
        storage.clearStorageSync(this.local)
      },
    },
  }
</script>

<style>
  html,
  body {
    background-color: #f5f5f5;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 auto;
    max-width: 750px;
  }
  button {
    width: 100%;
    margin-bottom: 10px;
    color: #fff;
    background-color: #409eff;
    padding: 10px 0;
    border: none;
    outline: none;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
  }
  button:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.3s, opacity 0.5s;
  }

  button:active:after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }

  .bg-primary {
    background-color: #409eff;
  }
  .bg-success {
    background-color: #67c23a;
  }
  .bg-warn {
    background-color: #e6a23c;
  }

  .primary {
    font-weight: 700;
    font-size: 16px;
    color: #409eff;
  }
  .success {
    color: #67c23a;
  }
  .warn {
    color: #e6a23c;
  }
  .value {
    font-weight: 700;
    font-size: 16px;
  }
</style>
```

## Apis 📄

### setConfig([options])

> 更改默认设置

|  参数   |  类型  | 默认 | 描述     |
| :-----: | :----: | :--: | :------- |
| options | Object |  {}  | 设置对象 |

```javascript
storage.setConfig({
    // 在localstorage无法使用的情况下是否使用cookie作为回退
    isUsingCookie: true,
    // 是否开启调试模式
    debug: false,
    // 写入的数据是否混淆
    isReadable: true,
})

// option 默认值
{
    // 在localstorage无法使用的情况下是否使用cookie作为回退
    isUsingCookie: true,
    // 是否开启调试模式
    debug: false,
    // 写入的数据是否可读
    isReadable: true,
}
```

### setStorageSync(KEY,DATA[,LOCAL])

> 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

| 参数  |  类型   | 默认  | 描述                                                                   |
| :---: | :-----: | :---: | :--------------------------------------------------------------------- |
|  key  | String  |       | 本地缓存中的指定的 key                                                 |
| data  |   Any   |       | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |
| local | Boolean | false | 是否使用 localStorage                                                  |

```javascript
try {
  setStorageSync('storage_key', 'hello', false)
} catch (error) {
  console.log(error.message)
}
```

### getStorageSync(KEY[,LOCAL])

> 从本地缓存中同步获取指定 key 对应的内容,这是一个同步接口

| 参数  |  类型   | 默认  | 描述                   |
| :---: | :-----: | :---: | :--------------------- |
|  key  | String  |       | 本地缓存中的指定的 key |
| local | Boolean | false | 是否使用 localStorage  |

```javascript
try {
  const value = getStorageSync('storage_key', false)
  if (value) {
    console.log(value)
  }
} catch (error) {
  console.log(error.message)
}
```

### removeStorageSync(KEY[,LOCAL])

> 从本地缓存中同步移除指定 key。

| 参数  |  类型   | 默认  | 描述                   |
| :---: | :-----: | :---: | :--------------------- |
|  key  | String  |       | 本地缓存中的指定的 key |
| local | Boolean | false | 是否使用 localStorage  |

```javascript
try {
  removeStorageSync('storage_key')
} catch (error) {
  console.log(error.message)
}
```

### clearStorageSync([LOCAL])

> 同步清理本地数据缓存。

| 参数  |  类型   | 默认  | 描述                  |
| :---: | :-----: | :---: | :-------------------- |
| local | Boolean | false | 是否使用 localStorage |

```javascript
try {
  clearStorageSync()
} catch (error) {
  console.log(error.message)
}
```

## 为什么开发这个库 ❔

最近开发公司后台管理项目需要将数据持久化，利用 H5 的 localStorage 去保存但是原生的 api 接口非常不好用，因此对其进行了封装，api 风格借鉴了 uni-app 的[数据接口风格](https://uniapp.dcloud.io/api/storage/storage)

- 方便维护
- 统一错误处理
- 方便接入更多的项目

## **注意**🔔

> 这个库正在我们公司的项目中使用，所以您可以放心地使用它。
>
> 如果您发现任何错误，请使用`issue`。
>
> 谢谢。

### 数据混淆

> 如果开启了数据混淆，存入的数据会比原来的数据大，并且混淆过程需要计算时间。

### Cookie 回退

> 如果未开启`Cookie`回退，在不支持使用`Storage`的情况下，数据无法写入，同时`Cookie`存储数据大小比`Storage`要小。

## 使用动图

![example.gif](https://static.yoouu.cn/imgs/doc/open-source/web-storage-apis/example.gif)

## 更新日志

- **2020-04-23** `1.3.3`

  - 修复文档错误
  - 修复如果不支持`Storage`使用`Cookie`进行回滚操作存储数据永不过期的 bug

- **2020-04-23** `1.0.0`

  - 重写逻辑
  - 加入 debug 功能
  - 加入存入到 cookie 功能
  - 加入手动配置信息功能
  - 加入存入数据混淆功能（默认关闭）
  - 加入如果`Storage`不可用，自动切换到`Cookie`功能（`safari`隐身模式下，`Storage`不可用）

- **2020-02-21** `0.0.2`
  - 发布到 npm，可以使用 npm 安装了
  - 同时`browser-storage-apis`改名为`web-storage-apis`
- **2019-09-16** `0.0.1` 添加版本信息
- **2019-07-29** `0.0.1` 优化：获取不到指定 key 的值返回 null
- **2019-07-27** `0.0.1` 第一次提交
