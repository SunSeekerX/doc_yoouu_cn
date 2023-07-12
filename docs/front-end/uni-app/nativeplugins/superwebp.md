# 📌 安卓显示 Webp 插件 - SuperModuleWebp

## ⚠️ 警告

**插件市场的文档解析有问题！方法名解析有丢失，例如 `on start 放在一起就不见了`**

**查看在线文档：**[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/superwebp](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/superwebp)

## 简介

安卓端 webp 图片显示加强，不会出现闪烁，卡顿。nvue 自带的图片显示器，显示 webp 效果并不好，并且无法支持圆角。

支持缓存图片，图片圆角。

官网: ~

插件地址：[https://ext.dcloud.net.cn/plugin?id=7679](https://ext.dcloud.net.cn/plugin?id=7679)

## 平台兼容性

|  Android   | iOS |
| :--------: | :-: |
| 4.4 - 12.0 |  ~  |

## 使用示例

下载插件，配置原生插件，直接在模块使用

```html
<!-- 远程 url -->
<SuperModuleWebp
  :options="{
      url: 'http://facexiu.oss-cn-shanghai.aliyuncs.com/uploads/20220120/fe4ea886e623b6952133527759ad3f6d.webp',
      radius: 20,
      radiusColor: '#ffffff'
    }"
  style="width:270;height:480; margin-top: 10px;"
/>
<!-- 本地图片 -->
<SuperModuleWebp
  :options="{
      url: '/static/imgs/super-webp/girl-webp.webp',
      radius: 20,
      radiusColor: '#000000'
    }"
  style="width:270;height:480;"
/>
```

## 模块方法

### options

- options <Object\> 图片信息配置
  - url <String\> 图片 url 地址，支持网络路径和本地路径，本地路径以 `/` 开头作为根目录
  - radius <Number\> 圆角配置
  - radiusColor <String\> 圆角颜色，要实现圆角效果需要这个颜色跟背景色一致。

## 全局事件

~

## 权限列表

~

**ios**

无

**Android**

```xml
~
```

## 演示截图

| Android |
| :-: |
| <img src="https://static.yoouu.cn/imgs/doc/front-end/uni-app-nativeplugins/202203221053019.webp" style="zoom: 25%;" /> |

## 更新日志

### 1.0.2

**功能（Features）**

- 文档优化

**Bug 修复 （Bug Fixes）**

**技术预研（Research）**

### 1.0.1

**功能（Features）**

- 文档优化

**Bug 修复 （Bug Fixes）**

**技术预研（Research）**

### 1.0.0

**功能（Features）**

- 完成第一版本

**Bug 修复 （Bug Fixes）**

**技术预研（Research）**

## 问题反馈

虽然插件已经经过开发者测试和使用，但不排除某些场景下产生问题的可能性，如遇到 `Bug` 可以

- 在评论区留言，收到通知邮件我会第一次时间查看
- 或添加 `微信: sunseekerx` 进行反馈
- 或添加 `QQ: 1647800606` 进行反馈

## 更多插件

- [在线插件介绍](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)
- [uni-app 插件市场](https://ext.dcloud.net.cn/publisher?id=64103)

如有插件定制需求，也可以联系我哦。
