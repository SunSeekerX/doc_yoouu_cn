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

## 📌 注意事项

1. 如果需要获取 activity 的上下文，不能直接传递 `this`，因为上下文会频繁的销毁和重建，如果传递会造成内存泄漏。可以使用 `getApplicationContext()` 方法传递上下文实例。（可以理解为指向 App 的顶级引用，单例模式，只要应用存在，就会有一个实例）
1. 使用 Fresco 加载 `webp` 的时候出现重复图片的问题，卸载重新安装调试的 app 就好了，应该是缓存的问题。

## 📌 添加 adb 环境变量

找到你 android sdk 安装的路径，添加 `${sdk}/platform-tools` 到 path，例如我的：

```
W:\ProgramFiles\Android\Sdk\platform-tools
```

## 📌 .9 图片相关

Android平台启动图使用.9.png图片 https://ask.dcloud.net.cn/article/35527

.9 独立工具在 udisk 项目内，也可以在上面文章底部下载使用。

## 📌 Android studio 初始设置

1. 更改所有编码为 `utf-8`
2. 修改 indent 为 2

### avd 位置更改

不然默认在 c 盘，又大又不常用

#### 方法 1：通过环境变量修改 AVD 位置

Windows 系统

1. 打开 **环境变量** 设置：

   - 在搜索栏中输入 `env`，选择 "编辑系统环境变量"。
   - 点击 "环境变量" 按钮，进入环境变量设置界面。

2. 在“系统变量”或者“用户变量”中，点击 **新建**。

3. 添加以下变量：

   - **变量名**：`ANDROID_SDK_HOME`

   - **变量值**：你希望存储 AVD 的新路径（例如 `D:\Android\AVD`）

   - ```
     ANDROID_SDK_HOME
     D:\app\code\android\sdk
     ```

4. 点击 **确定** 完成设置。

macOS/Linux 系统

1. 打开终端编辑你的 `.bash_profile`、`.zshrc` 或者 `.bashrc` 文件（根据你使用的 shell 而定）：

   bash

   复制

   ```
   nano ~/.bash_profile
   ```

2. 添加以下行，将存储路径替换为你想要的位置：

   bash

   复制

   ```
   export ANDROID_SDK_HOME=~/新路径/AVD
   ```

3. 保存文件并执行以下命令以使更改生效：

   bash

   复制

   ```
   source ~/.bash_profile
   ```

#### 方法 2：直接修改 Android Studio 配置文件

1. 找到 Android Studio 的配置文件 `config.ini`。这个文件存储了各个 AVD 的配置信息，默认路径通常在：

   - Windows: `C:\Users\YourUsername\.android\avd\YourAVD.avd\config.ini`
   - macOS/Linux: `/Users/YourUsername/.android/avd/YourAVD.avd/config.ini`

2. 打开 `config.ini` 并找到以下配置项：

   ini

   复制

   ```
   path=<当前 AVD 位置>
   ```

3. 将 `path` 修改为你希望存储 AVD 的新路径。

#### 方法 3：通过 Android Studio 重新配置 SDK 位置

1. 在 Android Studio 中，点击 **File** -> **Settings**（macOS 上是 **Android Studio** -> **Preferences**）。
2. 在左侧导航栏中选择 **Appearance & Behavior** -> **System Settings** -> **Android SDK**。
3. 在 **Android SDK Location** 中，你可以修改 SDK 的默认存储位置。
4. 修改完后，点击 **Apply** 并重启 Android Studio。

注意事项

- 修改 AVD 位置后，确保新路径有足够的存储空间。
- 如果你只是想修改 SDK 的位置，`ANDROID_SDK_HOME` 环境变量只影响 SDK 相关文件的存储路径，不会影响项目文件或其他配置。

### Logcat 颜色设置

默认所有级别都是 `BBBBBB`，很难区分。

**打开设置搜索 logcat**

找到 Color scheme > Android logcat

| Log 级别 | 色值   |
| -------- | ------ |
| ASSERT   | 909399 |
| DEBUG    | 2B85E4 |
| ERROR    | FA3534 |
| INFO     | 19BE6B |
| VERBOSE  | 909399 |
| WARN     | FF9900 |

### 控制台乱码

实际上是调用 java 的 grade 编译输出中文乱码。需要设置虚拟机的 `-Dfile.encoding=UTF-8` 就行了。

**操作步骤**

Help > Edit custom VM options > 添加就行

### 编辑器报红能编译运行

#### 0x1 先 clean 项目，再 build

![](https://static.yoouu.cn/static/imgs/doc/front-end/android/202207021943881.png)

#### 0x2 如果 1 不行，再试 invalidate cache / restart

![](https://static.yoouu.cn/static/imgs/doc/front-end/android/202207021939504.png)

#### 0x3 如果上述都不行，来个终结方法

![](https://static.yoouu.cn/static/imgs/doc/front-end/android/202207021944546.png)

先关闭 Android Studio，然后删除项目目录下面的 .idea 文件夹和 .gradle 文件夹，然后重新打开 AS ，发现问题解决

## 📌 Android studio 查看 SQLite 数据库

**使用自带的安装模拟器**

创建一个最高 api 的模拟器，屏幕可以选择 480x800 节省资源

设置 `Graphics` 为 `Hardware` 硬件显卡

**运行你的 app**

下方 toolbar 会有 一个 Datebase inspector 就可以查看数据库里面的表了。

## 📌 Butterknife 注解绑定试图和点击事件

> 1、强大的 View 绑定和 Click 事件处理功能，简化代码，提升开发效率 2、方便的处理 Adapter 里的 ViewHolder 绑定问题 3、运行时不会影响 APP 效率，使用配置方便 4、代码清晰，可读性强

[Github - https://github.com/JakeWharton/butterknife](https://github.com/JakeWharton/butterknife)

**Gradle - app**

```groovy
dependencies {
  implementation 'com.jakewharton:butterknife:10.2.3'
  annotationProcessor 'com.jakewharton:butterknife-compiler:10.2.3'
}
```

**buildscript**

```groovy
buildscript {
  repositories {
    mavenCentral()
    google()
  }
  dependencies {
    classpath 'com.jakewharton:butterknife-gradle-plugin:10.2.3'
  }
}
```

**在你项目模块中使用:**

```groovy
apply plugin: 'com.android.library'
apply plugin: 'com.jakewharton.butterknife'
```

**使用 `R2` 代替 `R`**

```groovy
class ExampleActivity extends Activity {
  @BindView(R2.id.user) EditText username;
  @BindView(R2.id.pass) EditText password;
...
}
```

**编辑器插件 - Android ButterKnife Zelezny**

## 📌 Gradle 加速

1. 打开工程文件根目录 build.gradle
2. 在 buildscript 和 allprojects 的 repositories 中分别注释掉 jcenter()，并使用国内镜像进行替换：maven{url 'http://maven.aliyun.com/nexus/content/groups/public/'}
3. 在 buildscript 的 repositories 添加：maven{url "https://jitpack.io"}

```groovy
buildscript {
  repositories {
    maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }
    maven { url "https://jitpack.io" }
    google()
//        jcenter()
  }
  dependencies {
    classpath 'com.android.tools.build:gradle:3.2.1'
    classpath "io.realm:realm-gradle-plugin:4.3.1"
    classpath 'com.jakewharton:butterknife-gradle-plugin:8.8.1'
    classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.7.3'
    classpath 'org.greenrobot:greendao-gradle-plugin:3.2.2'
    classpath 'com.github.dcendents:android-maven-gradle-plugin:1.5'
  }
}

allprojects {
  repositories {
    maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }
    google()
//    jcenter()
//    mavenCentral()
//    maven { url "https://jitpack.io" }
  }
}

task clean(type: Delete) {
  delete rootProject.buildDir
}

ext {
  supportVersion = '28.0.3'
}
```

## 📌 无痛修改包名

- 在开发中，我们多多少少不可避免需要更改项目中的包名，但是不规范的操作，可能会直接导致 Studio 崩溃的（我上次就遇到过，后面重装了 Studio），又或者导致编译跑不起来，现在我将之前踩过的坑总结出来了一些套路

#### 修改步骤

- 先对项目进行 clean 操作

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-3b7a83388bbf5bef.png)

- 跑到所在的文件夹中新建整个包名目录

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-7c881d12fb7ac855.png)

- 选择所需要的包，然后右击选择移动

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-0a4f0913ec8d8218.png)

- 选择第一个，直接移动包

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-dc86e2ca69046cfc.png)

- 在这里输入刚刚新建的包名

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-224801a5f1d9d937.png)

- 几秒种后就完成了移动

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-7e320385e399b868.png)

- 然后在项目右键中选择 **Replace in Path**

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-07c0f1b96070f40b.png)

- 然后选择 **Replace All** 来替换

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-1d05c1b53da98945.png)

- 再同步一下 Gradle 配置

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-8a2835e0ae270303.png)

- 最后直接编译或者运行项目即可

![img](https://static.yoouu.cn/static/imgs/doc/pic-go/6038844-8b98155360852185.png)

**在本次测试用的是我自己搭建的架构项目，解决开发中遇到的坑，可以帮你减少开发时间和精力**

> 作者：Android 轮子哥链接：https://www.jianshu.com/p/17327e191d2e 来源：简书著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 📌 生成 keysore 证书

jdk 版本过高无法使用，会报不是有效的 keystore 文件,测试需要使用 jdk 1.7 生成的才能用。不知道高版本是啥问题还是有其他的方式。

需要有 java 环境，使用 keytool -genkey 命令生成证书：

```shell
# keytool 在 windows 存在于你 jdk 安装路径下的 bin 目录
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore -storetype PKCS12

# 如果是 jks 可以升级到 PKCS12 srckeystore 和 destkeystore 不能同名
keytool -importkeystore -srckeystore test.keystore -destkeystore test2.keystore -deststoretype pkcs12

keytool -list -v -keystore test.keystore
```

- testalias 是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字
- test.keystore 是证书文件名称，可修改为自己想设置的文件名称，也可以指定完整文件路径
- 36500 是证书的有效期，表示 100 年有效期，单位天，建议时间设置长一点，避免证书过期

回车后会提示：

```shell
Enter keystore password:  //输入证书文件密码，输入完成回车
Re-enter new password:   //再次输入证书文件密码，输入完成回车
What is your first and last name?
  [Unknown]:  //输入名字和姓氏，输入完成回车
What is the name of your organizational unit?
  [Unknown]:  //输入组织单位名称，输入完成回车
What is the name of your organization?
  [Unknown]:  //输入组织名称，输入完成回车
What is the name of your City or Locality?
  [Unknown]:  //输入城市或区域名称，输入完成回车
What is the name of your State or Province?
  [Unknown]:  //输入省/市/自治区名称，输入完成回车
What is the two-letter country code for this unit?
  [Unknown]:  //输入国家/地区代号（两个字母），中国为CN，输入完成回车
Is CN=XX, OU=XX, O=XX, L=XX, ST=XX, C=XX correct?
  [no]:  //确认上面输入的内容是否正确，输入y，回车

Enter key password for <testalias>
        (RETURN if same as keystore password):  //确认证书密码与证书文件密码一样（HBuilder|HBuilderX要求这两个密码一致），直接回车就可以
```

**查看证书信息**

可以使用以下命令查看：

```
复制代码keytool -list -v -keystore test.keystore
Enter keystore password: //输入密码，回车
```

会输出以下格式信息：

```
复制代码Keystore type: PKCS12
Keystore provider: SUN

Your keystore contains 1 entry

Alias name: test
Creation date: 2019-10-28
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Tester, OU=Test, O=Test, L=HD, ST=BJ, C=CN
Issuer: CN=Tester, OU=Test, O=Test, L=HD, ST=BJ, C=CN
Serial number: 7dd12840
Valid from: Fri Jul 26 20:52:56 CST 2019 until: Sun Jul 02 20:52:56 CST 2119
Certificate fingerprints:
         MD5:  F9:F6:C8:1F:DB:AB:50:14:7D:6F:2C:4F:CE:E6:0A:A5
         SHA1: BB:AC:E2:2F:97:3B:18:02:E7:D6:69:A3:7A:28:EF:D2:3F:A3:68:E7
         SHA256: 24:11:7D:E7:36:12:BC:FE:AF:2A:6A:24:BD:04:4F:2E:33:E5:2D:41:96:5F:50:4D:74:17:7F:4F:E2:55:EB:26
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3
```

其中证书指纹信息（Certificate fingerprints）：

- MD5 证书的 MD5 指纹信息（安全码 MD5）
- SHA1 证书的 SHA1 指纹信息（安全码 SHA1）
- SHA256 证书的 SHA256 指纹信息（安全码 SHA245）

## 📌 区块链钱包

https://www.cnblogs.com/zhaoweiwei/p/address.html - 比特币地址生成算法详解

https://bitcoinj.org/javadoc/0.15.7/ - bitcoinj api doc

https://bitcoinj.org/ - bitcoinj doc

### Base58

> **Base58**是用于 Bitcoin 中使用的一种独特的编码方式，主要用于产生 Bitcoin 的钱包地址。相比 Base64，Base58 不使用数字"0"，字母大写"O"，字母大写"I"，和字母小写"l"，以及"+"和"/"符号。设计 Base58 主要的目的是：
>
> 1. 避免混淆。在某些字体下，数字 0 和字母大写 O，以及字母大写 I 和字母小写 l 会非常相似。
> 2. 不使用"+"和"/"的原因是非字母或数字的字符串作为帐号较难被接受。
> 3. 没有标点符号，通常不会被从中间分行。
> 4. 大部分的软件支持双击选择整个字符串。

不同的应用实现中，base58 最后查询的字母表可能不同，所以没有具体的标准。下面是几个应用中的字母表:

比特币地址:

```
123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
```

Monero 地址

```
123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
```

Ripple 地址

```
rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz
```

Flickr 的短 URL

```
123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ
```
