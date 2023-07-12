# Uni-app - Android 离线打包

## 0x1 生成证书

[Android 平台签名证书(.keystore)生成指南](https://ask.dcloud.net.cn/article/35777)

测试需要 jdk 1.7 的 keytool 生成的证书才能使用。

进入 jdk7 安装目录执行 `C:\Program Files\Java\jdk1.7.0_80\bin` 如果在这里路径下记得使用管理员权限，否则无法创建证书文件。

```shell
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
```

例如我执行的

```shell
.\keytool -genkey -alias cn.yoouu.uniplugin.demo -keyalg RSA -keysize 2048 -validity 36500 -keystore cn-yoouu-uniplugin-demo.keystore
# mac
keytool -genkey -alias com.app10x.client -keyalg RSA -keysize 2048 -validity 36500 -keystore com-app10x-client.keystore
```

```
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

### 查看证书信息

```shell
keytool -list -v -keystore test.keystore
```

### 迁移密钥库类型

```shell
keytool -importkeystore -srckeystore foo.keystore -destkeystore foo.keystore -deststoretype pkcs12
```

## 0x2 修改步骤

1. 下载离线打包需要的文件，[链接](https://nativesupport.dcloud.net.cn/AppDocs/download/android)

2. 申请 `Appkey`,[链接](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey)

3. 使用 Android studio 打开 `HBuilder-Integrate-AS` 工程

4. 找到 `Androidmanifest.xml` 配置 `Appkey`

5. 打开 app-> src -> main -> res -> values -> strings.xml 文件，修改“app_name”字段值，该值为安装到手机上桌面显示的应用名称，建议与 manifest.json 中 name（基础配置中的应用名称）对应。

6. 配置应用图标和启动界面

   - icon.png 为应用的图标。
   - push.png 为推送消息的图标。
   - splash.png 为应用启动页的图标。

   将 icon.png、push.png、splash.png 放置到 drawable，drawalbe-ldpi，drawable-mdpi，drawable-hdpi，drawable-xhdpi，drawable-xxhdpi 文件夹下，不同文件夹下对应不同图片尺寸，可参考[文档](https://blog.csdn.net/xuaho0907/article/details/72848520)

7. 放入 uni-app 打包生成的资源。

8. 修改 `dcloud_control.xml` 的 `appid`

9. 修改打包证书

**遇到的问题**

1. .9 图片变形
