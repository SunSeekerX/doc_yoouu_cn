# Android 开发

![roadmap.svg](https://static.yoouu.cn/static/imgs/doc/front-end/android/roadmap.svg)

## 📌 0x1 Android 项目视图

### Project

**.gradle：** Gradle 编译系统，版本由 wrapper 指定

**.idea：**IDE 所需要的文件

**app：**开发项目的所有代码和资源文件

- **app/build：**app 模块编译输出的文件

- **app/libs：** 放置引用的类库文件

- **app/src：** 放置应用的主要文件目录

- **app/src/androidTest：**单元测试目录

- **app/src/main：**主要的项目目录和代码

- **app/src/main/assets：**放置原生文件，里面的文件会保留原有格式，文件的读取需要通过流

- **app/src/main/java：**项目的源代码

- app/src/main/res：

  项目的资源

  - **app/src/main/res/anim：**存放动画的 XML 文件
  - **app/src/main/res/drawable：**存放各种位图文件(.png，.jpg，.9png，.gif 等)和 drawable 类型的 XML 文件
  - **app/src/main/res/drawable-v24：**存放自定义 Drawables 类（Android API 24 开始，可在 XML 中使用）
  - **app/src/main/res/layout：**存放布局文件
  - **app/src/main/res/menu：**存放菜单文件
  - **app/src/main/res/mipmap-hdpi：**存放高分辨率图片资源
  - **app/src/main/res/mipmap-mdpi：**存放中等分辨率图片资源
  - **app/src/main/res/mipmap-xdpi：**存放超高分辨率图片资源
  - **app/src/main/res/mipmap-xxdpi：**存放超超分辨率图片资源
  - **app/src/main/res/mipmap-xxxdpi：**存放超超超高分辨率图片资源
  - **app/src/main/res/raw：**存放各种原生资源(音频，视频，一些 XML 文件等)
  - **app/src/main/res/values：** 存放各种配置资源（颜色，尺寸，样式，字符串等）
  - **app/src/main/res/values/attrs.xml：**自定义控件时用的较多，自定义控件的属性
  - **app/src/main/res/values/arrays.xml：**定义数组资源
  - **app/src/main/res/values/colors.xml：**定义颜色资源
  - **app/src/main/res/values/dimens.xml：**定义尺寸资源
  - **app/src/main/res/values/string.xml：**定义字符串资源
  - **app/src/main/res/values/styles.xml：**定义样式资源
  - **app/src/main/res/values-v11：**在 API 11+的设备上调用
  - **app/src/main/res/values-v14：**在 API 14+的设备上调用
  - **app/src/main/res/values-v21：**在 API 21+的设备上调用

- **app/src/main/res/AndroidManifest.xml：**项目的清单文件（名称、版本、SDK、权限等配置信息）

- **app/src/.gitignore：**忽略的文件或者目录

- **app/app.iml：**app 模块的配置文件

- **app/build.gradle：**app 模块的 gradle 编译文件

- **app/proguard-rules.pro：**app 模块的代码混淆配置文件

**build：**系统生成的文件目录

**gradle:** wrapper 的 jar 和配置文件所在的位置

**.gitattributes：**用于设置文件的对比方式

**.gitignore：** 忽略的文件或者目录

**build.gradle：**项目的 gradle 编译文件

**gradle.properties：** gradle 相关的全局属性设置

**gradlew：** 编译脚本，可以在命令行执行打包

**gradlew.bat：**windows 下的 gradle wrapper 可执行文件

**local.properties：**配置 SDK/NDK 所在的路径

**MyApplication.iml：**保存该模块的相关信息

**README.md：**文本编辑器，记录一些相关信息

**settings.gradle：**设置相关的 gradle 脚本

**External Libraries：**项目依赖的库，编译时自动下载

### Android 项目结构

**app/manifests：**APP 配置信息目录

**app/java：** 主要为源代码和测试代码目录

**app/res：** 主要是资源目录，存储所有的项目资源

**Gradle Scripts：** gradle 编译相关的脚本

### Packages 项目结构

- **app/android：**项目依赖的库
- **app/com：**项目源代码
- **app/Libraries：**项目资源

## 📌 0x2 四大组件

### Activity

![img](https://static.yoouu.cn/static/imgs/doc/front-end/android/activity_lifecycle.png)

**感知生命周期**

实现 `LifecycleObserver` 这个接口即可实现在自己的 `class` 中监听生命周期的回调。而不需要在 `activity` 中操作自己的 `class` 的状态。

![lifecycle_feeling.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/lifecycle_feeling.png)

### Service

### Broadcast

### ContentProvider

## 📌 ViewModel

文档：[https://developer.android.google.cn/topic/libraries/architecture/viewmodel?hl=zh_cn#java](https://developer.android.google.cn/topic/libraries/architecture/viewmodel?hl=zh_cn#java)

如果系统销毁或重新创建界面控制器，则存储在其中的任何临时性界面相关数据都会丢失。例如，应用的某个 Activity 中可能包含用户列表。因配置更改而重新创建 Activity 后，新 Activity 必须重新提取用户列表。对于简单的数据，Activity 可以使用 `onSaveInstanceState()` 方法从 `onCreate()` 中的捆绑包恢复其数据，但此方法仅适合可以序列化再反序列化的少量数据，而不适合数量可能较大的数据，如用户列表或位图。

### 生命周期

![viewmodel-lifecycle.png](https://developer.android.google.cn/images/topic/libraries/architecture/viewmodel-lifecycle.png?hl=zh_cn)

您通常在系统首次调用 Activity 对象的 `onCreate()` 方法时请求 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh_cn)。系统可能会在 Activity 的整个生命周期内多次调用 `onCreate()`，如在旋转设备屏幕时。[`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh_cn) 存在的时间范围是从您首次请求 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh_cn) 直到 Activity 完成并销毁。

### SavedState

当 activity 在后台，如果内存不足，activity 会被系统杀掉，甚至 onDestroy 也不会被调用。 ViewModel 的数据也就丢失了。

![viewmodel_savedstate.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/viewmodel_savedstate.png)

### ViewModel + SavedState 生命周期

![viewmode_savedstate_lifecycle.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/viewmode_savedstate_lifecycle.png)

## 📌 LiveData

### mvc

![livedata_mvc.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/livedata_mvc.png)

### mvvm

![livedata_mvvm.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/livedata_mvvm.png)

### DataBinding

View 跟 Controller 解耦，只需要控制数据，ViewModel 发生变化 ViewGroup 会自动更新（有点像 Vue）。DataBinding 是绑定试图到 Controller。

![databinding.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/databinding.png)

## 📌 DataBinding

编译环境

要开始使用数据绑定，请从 Android SDK 管理器中的**支持代码库**下载该库。有关详情，请参阅[更新 IDE 和 SDK 工具](https://developer.android.google.cn/studio/intro/update?hl=zh_cn)。

要将应用配置为使用数据绑定，请在应用模块的 `build.gradle` 文件中添加 `dataBinding` 元素，如以下示例所示：

```groovy
android {
        ...
        dataBinding {
            enabled = true
        }
    }

```

## 📌 ViewBinding

## 📌 Fragment

### Navigation

![fragment_navigation.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/fragment_navigation.png)

### ViewModel

![viewmodel_fragment.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/viewmodel_fragment.png)

## 📌 Room

![room_components.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/room_components.png)

## 📌 serializable

就相当于 `JavaScript` 里面的 `JSON.stringify()` 序列化，`JSON.parse()` 反序列化。

![serializable.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/serializable.png)

### 打开 idea 自动插入序列号功能

setting > search `serializable class without 'serialVersionUID'` > 勾选

如果你的类实现了序列化接口没写 `serialVersionUID` 就会警告。

## 📌 kotlin

![android/kotlin.png](https://static.yoouu.cn/static/imgs/doc/front-end/android/kotlin.png)
