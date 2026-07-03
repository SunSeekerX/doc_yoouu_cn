# Uni-app - Ios 离线打包

## SDK 文件说明

> 1、HBuilder-Hello 这个文件夹的作用： uni-app 项目的离线打包工程,里面只包含了基础模块，其他的三方 SDK 和模块需要自己配置。
>
> 2、HBuilder-ExampleDemo 这个文件夹的作用： uni-app 项目包含所有模块的离线示例工程，注意这个里面的工程不是打包工程
>
> 3、HBuilder-uniPluginDemo 这个目录的作用： uni-app 规范的、基于 weex 扩展的原生插件开发工程，,注意这个里面的工程不是打包工程。
>
> 4、Feature-iOS.xls 这个文件的作用： 配置表（依赖的库、资源文件、参数配置等）。
>
> 5、SDK 这个目录的作用： 这个里面是工程需要的库文件，.h 头文件，配置文件，资源文件。

其他库的用途在离线包中 Feature-iOS.xls 文件里有详细描述

| 主要库 | 作用 ｜ |
| :-: | :-: |
| AlipaySDK.framework | 支付宝支付 |
| AMapFoundationKit.framework、AMapFoundationKit.framework、 |  |
| AMapLocationKit.framework、AMapSearchKit.framework、MAMapKit.framework | 高德地图和定位 |
| BaiduMapAPI_Base.framework、BaiduMapAPI_Cloud.framework、 |  |
| BaiduMapAPI_Location.framework、BaiduMapAPI_Map.framework、BaiduMapAPI_Search.framework、BaiduMapAPI_Utils.framework | 百度地图和定位 |
| BUAdSDK.framework、BUFoundation.framework | 穿山甲广告 |
| DCUniVideoPublic.framework | video 组件和 videoPlayer 控件的公共库 |
| GTSDK.framework | 个推消息推送 |
| iflyMSC.framework | 讯飞语音识别 |
| IJKMediaFramework.framework | video 组件和 videoPlayer 控件播放 |
| libBaiduSpeechSDK.a | 百度语音识别 |
| libSDWebImage.a | 开源的 SDWebImage 打出来的库 |
| libWeChatSDK_pay.a | 微信 SDK 带支付功能 |
| libWeChatSDK.a | 微信 SDK 不带支付功能 |
| libWeiboSDK.a | 新浪微博 SDK |
| QHADSDK.framework | 360 广告 |
| UMAnalytics.framework、UMCommon.framework | 友盟统计 |
| UPLiveSDKDll.framework | livePusher 推流 |

## 运行 SDK 内的 `HBuilder-Hello`

官方配置教程: [https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios)

- 将 `HBuilder-Hello` 放在 ios 工程目录下

  <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app/uni-app-ios-project-list.webp" style="zoom:25%;" />

- 添加 `.gitignore`

  ```shell
  # OS X
  .DS_Store

  # Xcode
  build/
  *.pbxuser
  !default.pbxuser
  *.mode1v3
  !default.mode1v3
  *.mode2v3
  !default.mode2v3
  *.perspectivev3
  !default.perspectivev3
  xcuserdata
  *.xccheckout
  profile
  *.moved-aside
  DerivedData
  *.hmap
  *.ipa

  # CocoaPods
  Pods
  ```

- 创建 git 本地仓库，并进行本地 commit，防止更改了未知项，无法回退

- 将 SDK 文件夹放在 `HBuilder-Hello` 项目同级，不要放在项目内， uni-app 通过相对路径导入 SDK 内的文件

  > 这一步如果你运行 app 的话应该是可以正常跑起来的。只不过会提醒 appkey 未配置或者错误

  <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app/uni-app-ios-project-frist-run.webp" style="zoom:25%;" />

- 配置 `dcloud_appkey` [链接](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey), `${app}/HBuilder-Hello/HBuilder-Hello/HBuilder-Hello-Info.plist`

  <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app/uni-app-ios-project-dcloud_appkey.webp" style="zoom:25%;" />

- 生成离线打包资源放入 `${app}/HBuilder-Hello/HBuilder-Hello/Pandora/apps/__UNI__XXXXXXX/www`

  `__UNI__XXXXXXX` 需要修改为你的 `appid`

- 修改 `${app}/HBuilder-Hello/HBuilder-Hello/control.xml`

  `__UNI__XXXXXXX` 需要修改为你的 `appid`

  <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app/uni-app-ios-project-control-xml.webp" style="zoom: 25%;" />

  > 内置资源更新如果您更新了内置资源，重新运行 App 加载的还是旧的资源时请检查下面的配置：
  >
  > 工程 Bundle Identifier 已经改成您自己的；内置的资源版本名称和版本号需要高于上一个版本； control.xml 中 debug 改成 false

- 配置应用标识(Bundle Identifier)

  选择左侧应用工程根目录，选中 TARGETS 下的 HBuilder 打开工程属性界面，在 General 下修改 Identity 的值：

  ![](https://static.yoouu.cn/static/imgs/doc/front-end/uni-app/uni-app-ios-project-boundle-id.webp)

- 配置应用名称

  > 在打开的原生工程中，点击工程的 targets 和点开 manifest 文件，然后将 manifest 文件里的“name”字段的内容 和原生工程里的 Display Name 的写成一样。
  >
  > 注意，manifest 文件里的”name“ 对应的是 HBuilderX 打开的工程里的“基础配置”里的应用名称。如下图红色框所示：
  >
  > <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app/uni-app-ios-project-name.webp" style="zoom:25%;" />
  >
  > <img src="https://static.yoouu.cn/static/imgs/doc/front-end/uni-app/uni-app-ios-project-name2.webp" style="zoom:25%;" />

  这里自己测试还需要修改国际化下面的 `CFBundleDisplayName` 这个 key 值才能生效
