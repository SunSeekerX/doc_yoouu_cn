# Flutter

## Dart

### 抽象类

1. 抽象类通过 abstract 关键字来定义
2. Dart 中的抽象方法不能用 abstract 声明，Dart 中没有方法体的方法我们称为抽象方法。
3. 如果子类继承抽象类必须得实现里面的抽象方法
4. 如果把抽象类当做接口实现的话必须得实现抽象类里面定义的所有属性和方法。
5. 抽象类不能被实例化，只有继承它的子类可以。

extends 抽象类和 implement 的区别

1. 如果要复用抽象类里面的方法，并且要用抽象类方法约束子类的话我们就用 extends 继承抽象类
2. 如果只是把抽象类当成标准的话我们就用 implement 实现抽象类

### 多态

允许将子类类型的指针赋值给父类类型的指针，同一个函数调用会有不同的效果。（之类的实例赋值给父类的引用）

通俗点：多态就是父类定义一个方法不去实现，让继承的子类去实现，每个子类有不同的表现。

### 接口

没有 interface 关键词定义接口，普通类，抽象类都可以作为接口来实现。同样使用 implement 关键词进行实现。

**不同点**

dart 的接口有点奇怪，如果实现的类是普通类，会将普通类和抽象类中的属性的方法全部需要覆写一遍。

而因为抽象类可以定义抽象方法，普通类不可以，所以一般如果要实现像 java 接口那样的方式，一般会使用抽象类。

建议使用抽象类定义接口。

### mixins

在 dart 中可以使用 mixins 实现类似的多继承的功能（mixins 使用的条件随着 dart 版本一直在变，以下是 2.x 的使用的条件）

1. 作为 mixins 的类只能继承自 Object，不能继承其他类
2. 作为 mixins 的类不能有构造函数
3. 一个类可以 mixins 多个 mixins 类
4. mixins 绝不是继承，也不是接口，而是一种全新的特性

### 泛型

解决类、接口、方法的复用性、以及对不特定数据类型的支持（类型校验）

```dart
/**
 * @description 泛型方法，传入返回都校验
 */
T getData<T>(T value) {
  return value;
}

/**
 * @description 泛型方法，只校验传入
 */
getData2<T>(T value) {
  return value;
}

void main() {
  print(getData<String>("hahaha"));
}

```

### 第三方库

```dart
Dart中的库主要有三种：
1、我们自定义的库
    import 'lib/xxx.dart';
2、系统内置库
    import 'dart:math';
    import 'dart:io';
    import 'dart:convert';
3、Pub包管理系统中的库
    https://pub.dev/packages
    https://pub.flutter-io.cn/packages
    https://pub.dartlang.org/flutter/

    1、需要在自己想项目根目录新建一个pubspec.yaml
    2、在pubspec.yaml文件 然后配置名称 、描述、依赖等信息
    3、然后运行 pub get 获取包下载到本地
    4、项目中引入库 import 'package:http/http.dart' as http; 看文档使用
```

## Flutter - 开发环境安装

**说明**

flutter sdk 已经带了完整的 dart 语言运行环境。

**下载地址**

[https://flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install)

**安装**

解压 flutter 文件夹到自定义的目录，配置环境变量，添加 `${app}/flutter/bin` 目录到 Path，输入 `dart --version`，和 `flutter --version` 能成功输出版本号即可。

**国内镜像**

[https://flutter.cn/](https://flutter.cn/)

```
Flutter 社区
FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn
PUB_HOSTED_URL: https://pub.flutter-io.cn
清华大学 TUNA 协会
FLUTTER_STORAGE_BASE_URL: https://mirrors.tuna.tsinghua.edu.cn/flutter
PUB_HOSTED_URL: https://mirrors.tuna.tsinghua.edu.cn/dart-pub
```

**检查安装是否正常**

`flutter doctor`

**Android studio 配置**

安卓 sdk 环境变量：ANDROID_SDK_ROOT=D:\ProgramFiles\Android\Sdk

**同意安卓开发者协议**

`flutter doctor --android-licenses`，全部 y

**结果**

```bash
❯ flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 1.20.4, on Microsoft Windows [Version 10.0.19041.329], locale zh-CN)
[✓] Android toolchain - develop for Android devices (Android SDK version 30.0.2)
[✓] Android Studio (version 4.0)
[✓] VS Code (version 1.49.2)
[✓] Connected device (1 available)

• No issues found!
SunSeekerX@SSX-PC  ~\Desktop                                                                                 [15:43]
❯
```

## Flutter - Android studio 创建项目

## Flutter- 注意事项

### 创建项目可能卡 `create flutter project...`

- 使用全局科学上网就行。
- 检查是否使用了国内源的环境变量

### 运行卡 `Running Gradle task 'assembleDebug'... `

1. **修改项目中 `android/build.gradle` 文件**

```groovy
buildscript {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
    }
}

allprojects {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
}

rootProject.buildDir = '../build'
subprojects {
    project.buildDir = "${rootProject.buildDir}/${project.name}"
}
subprojects {
    project.evaluationDependsOn(':app')
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

修改 Flutter 的配置文件, 该文件在 Flutter 安装目录 ` /packages/flutter_tools/gradle/flutter.gradle`

```groovy
buildscript {
    repositories {
        //修改的地方
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
    }
}
```

2. gradle 不完整
   1. 中止 gradle 构建
   2. 手动下载 gradle ，可以用迅雷很快: https://distfiles.macports.org/gradle/gradle-5.6.2-all.zip
   3. 复制 gradle-5.6.2-all.zip 到 `C:\Users\ <MyUsername>\.gradle\wrapper\dists\gradle-5.6.2-all\9st6wgf78h16so49nn74lgtbb` 不同的版本 hash 值不同
   4. 重新运行 `fluuter run` 或者 `flutter run -v`
