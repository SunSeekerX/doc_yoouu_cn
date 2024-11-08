## Motorola

## 多开分身

目标是多开谷歌支持框架，让依赖谷歌框架的 app 多开后也能运行。

来源：https://club.lenovo.com.cn/thread-7820754-1-1.html

![mlnote3](https://static.yoouu.cn/static/imgs/doc/interest/motorola.jpg)

```shell
# 查看链接列表
adb devices

List of devices attached
ZY22G683SX      device
# 进入 shell
adb -d shell
# 查看 user 空间
pm list users

Users:
        UserInfo{0:机主:c13} running
        UserInfo{900:应用分身:1010} running
        UserInfo{901:应用分身:1010} running
        UserInfo{902:应用分身:1010} running
        UserInfo{903:应用分身:1010} running
        UserInfo{904:应用分身:1010} running
# 显示完整包名
pm path com.google.android.gms

# 安装到指定空间
pm install -r --user 900 /data/app/~~Y5cS_m33p8VXcnSMfj9suA==/com.google.android.apps.fitness-hm96paELi8KJuE68IZanPA==/base.apk
```

包名和名称

```
Google Play 服务
com.google.android.gms
Google Play 商店
com.android.vending
Google 服务框架
com.google.android.gsf

Carrier Services
com.google.android.ims

健康数据共享
com.google.android.apps.healthdata

健身
com.google.android.apps.fitness

Fitbit
com.fitbit.FitbitMobile

Support components
com.google.mainline.telemetry
```

