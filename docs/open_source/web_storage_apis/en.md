# Web-storage-apis

[Github](https://github.com/SunSeekerX/web-storage-apis)

[online](https://doc.yoouu.cn/open_source/web_storage_apis/zh)

[简体中文](zh.md) **English**

Make localstorage and sessionStorage easy to use.

- Simple api
- Three types of data storage location switching
- `Storage` is not supported to automatically switch to `Cookie` for data Storage
- Optional, readable and unreadable
- `debug`

> Actually, I am not good at english, so i use the machine to help me do some translate.

## Usage 🔨

## Install

```bash
# using npm
npm i web-storage-apis

# of yarn

yarn add web-storage-apis
```

## With vue

### Import module

`app/src/main.js`

```javascript
import storage from 'web-storage-apis'
Vue.prototype.$storage = storage
```

### Test code

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

    <button class="bg-success" @click=";(storageSetting.debug = !storageSetting.debug), onChangeStorageConfig()">
      切换debug
    </button>

    <button class="bg-success" @click=";(local = !local), onChangeStorageConfig()"> 切换local </button>

    <button @click="onStorageData('DATA', 'Hello World!')"> Store String（Hello World!） </button>

    <button @click="onStorageData('DATA', true)"> Store Boolean（true） </button>

    <button @click="onStorageData('DATA', 1234567890)"> Store Number（1234567890） </button>

    <button @click="onStorageData('DATA', ['one', 'two', 'three'])"> Store Array（['one', 'two', 'three']） </button>

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
  transition:
    transform 0.3s,
    opacity 0.5s;
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

> Change default Settings

| Arguments |  Type  | Default | Description    |
| :-------: | :----: | :-----: | :------------- |
|  options  | Object |   {}    | Set the object |

```javascript
storage.setConfig({
    // Whether to use a cookie as a fallback if localstorage is not available
    isUsingCookie: true,
    // Whether to turn on debug mode
    debug: false,
    // Whether the written data is obfuscated
    isReadable: true,
})

// options default
{
    // Whether to use a cookie as a fallback if localstorage is not available
    isUsingCookie: true,
    // Whether to turn on debug mode
    debug: false,
    // Whether the written data is obfuscated
    isReadable: true,
}
```

### setStorageSync(KEY,DATA[,LOCAL])

> Storing the data in the key specified in the local cache overwrites the contents of the original key, which is a synchronization interface.

| Arguments | Type | Default | Description |
| :-: | :-: | :-: | :-- |
| key | String |  | The specified key in the local cache |
| data | Any |  | Only native types and objects that can be serialized through JSON.stringify are supported for content that needs to be stored |
| local | Boolean | false | save to localStorage ? |

```javascript
try {
  setStorageSync('storage_key', 'hello', false)
} catch (error) {
  console.log(error.message)
}
```

### getStorageSync(KEY[,LOCAL])

> Synchronizes the contents of the specified key from the local cache, which is a synchronization interface

| Arguments |  Type   | Default | Description                          |
| :-------: | :-----: | :-----: | :----------------------------------- |
|    key    | String  |         | The specified key in the local cache |
|   local   | Boolean |  false  | get data from localStorage ?         |

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

> Synchronously removes the specified key from the local cache.

| Arguments |  Type   | Default | Description                          |
| :-------: | :-----: | :-----: | :----------------------------------- |
|    key    | String  |         | The specified key in the local cache |
|   local   | Boolean |  false  | remove data from localStorage ?      |

```javascript
try {
  removeStorageSync('storage_key')
} catch (error) {
  console.log(error.message)
}
```

### clearStorageSync([LOCAL])

> Cleans up the local data cache synchronously.

| Arguments |  Type   | Default | Description                    |
| :-------: | :-----: | :-----: | :----------------------------- |
|   local   | Boolean |  false  | clean data from localStorage ? |

```javascript
try {
  clearStorageSync()
} catch (error) {
  console.log(error.message)
}
```

## Why ❔

Recently, the background management project of the development company needs to persist the data, using the localStorage of H5 to save it, but the native api interface is very difficult to use, so it is encapsulated. The api style draws lessons from the data interface style of [uni-app](https://uniapp.dcloud.io/api/storage/storage).

- easy to maintain

- unified error handling

- easy access to more projects

## **Attention** 🔔

> This library is using in our company project, So you can use it with confidence.
>
> If you find any bug,please using `Issues`.
>
> Thanks.

### Data confusion

> If data obfuscation is enabled, the stored data will be larger than the original data, and the obfuscation process will require computation time.

### Cookie rollback

> If the `Cookie` fallback is not enabled, the data cannot be written without support for the use of `Storage`, and the size of the data stored by `Cookie` is smaller than that of `Storage`.

## Example gif

![example.gif](https://static.yoouu.cn/static/imgs/doc/open-source/web-storage-apis/example.gif)

## Changelog

- **2020-04-23** `1.3.3`

  - fix docs description
  - fix if not support `Storage` using `Cookie` store data the expires always infinity

- **2020-04-23** `1.0.0`
  - Rebuild
  - Add debug
  - Add Store to cookie
  - Add custom config
  - Added store data obfuscation(closed by default)
  - If `Storage` is not available, automatically switch to `Cookie` （`Storage` is not available in `safari` stealth mode）
- **2020-02-21** `0.0.2`
  - Publish to npm
  - Rename `browser-storage-apis` to `web-storage-apis`
- **2019-09-16** `0.0.1` Add version information
- **2019-07-29** `0.0.1` Optimization: get a value that does not specify a key and return null
- **2019-07-27** `0.0.1` Frist commit
