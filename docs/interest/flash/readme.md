# 玩机

## Android

ksu https://kernelsu.org/zh_CN/

noactive 三方墓碑模块，简称 noa https://app.myflv.cn/

freezer 官网文档 https://freezer.sakion.top/

LSPosed 已经停止更新 https://github.com/LSPosed/LSPosed

JingMatrix 修改版本 LSPosed https://github.com/JingMatrix/LSPosed

### Root

#### redmi9 刷入 root 步骤

1. 提取 boot.img 用 magisk 修补

2. fastboot 刷入

   ```shell
   fastboot flash boot .\magisk_patched-28000_idff0.img
   ```

3. 提取 vbmeta.img 刷入

   ```shell
   fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
   fastboot reboot
   ```

4. 输出参考

   ```
   PowerShell 7.4.6
   Loading personal and system profiles took 815ms.
    ~\Desktop                                                                                                  | 00:04:07
   ➜ fastboot flash boot .\magisk_patched-28000_idff0.img
   Sending 'boot' (65536 KB)                          OKAY [  1.549s]
   Writing 'boot'                                     OKAY [  0.880s]
   Finished. Total time: 2.433s
    ~\Desktop                                                                                                  | 00:04:22
   ➜ fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
   Rewriting vbmeta struct at offset: 0
   Sending 'vbmeta' (4 KB)                            OKAY [  0.011s]
   Writing 'vbmeta'                                   OKAY [  0.004s]
   Finished. Total time: 0.023s
    ~\Desktop                                                                                                  | 00:05:06
   ➜ fastboot reboot
   Rebooting                                          OKAY [  0.000s]
   Finished. Total time: 0.001s
    ~\Desktop
   ```

**Magisk**

Supporting devices higher than Android 5.0.

[https://github.com/topjohnwu/Magisk](https://github.com/topjohnwu/Magisk)

## 机型分区

[摩托罗拉](./motorola)

[红米9 redmi9](./redmi9)

[魅蓝 Note3](./m3-note.md)

### 小米 10T / 10T Pro / 红米 K30S 至尊纪念版 (apollo) 

官方线刷工具 https://xiaomirom.com/rom/mi-10t-10t-pro-apollo-china-fastboot-recovery-rom/

rom

- 白羊‖miui_apollo_V13.0.6.0.SJDCNXM_f559664_12_221216.zip‖https://www.123pan.com/s/f12RVv-Z4kVv‖Oskr
- 柚稚的孩纸‖https://www.123pan.com/s/jKv8Vv-vfSWd.html‖bwHc
- mingofficial 个人主页‖https://mingofficial.cn/‖rom 下载 https://www.123684.com/s/YmWSVv-RFGVh

## recovery

android 下刷入命令

```shell
 刷：fastboot flash recovery|recovery_ab|recovery_a|recovery_b rec.img
 启动：fastboot reboot recovery
```

官改

## 归档 archive

以下内容随着时间的推移，已经不再适合时代，你可以怀旧

### 软件

#### **SuperSU**

https://supersuroot.org/

Android 版本 7.1 及以下使用 SuperSU 来 ROOT 手机，Android 版本 8.0 及以上使用 Magisk 来 ROOT 手机。SuperSU 支持至安卓 7.1，且不再更新

### Recovery 下载(wzsx150)

LR.Team 定制版 TWRP 下载地址集合：[https://weibo.com/ttarticle/p/show?id=2309404160776561631202](https://weibo.com/ttarticle/p/show?id=2309404160776561631202)

> 开发者：wzsx150
>
> 微博名：wzsx150
>
> 微博地址：https://weibo.com/u/6033736159
>
> 邮箱地址：wzsx150@163.com
>
> 捐赠支付宝：wzsx150@163.com
>
> QQ 号：扫二维码添加

包括但不限于下面的手机型号

![recovery](https://static.yoouu.cn/static/imgs/doc/interest/recovery.png)

### Edxposed 安装教程

1. 确保已经安装 Magisk Manager， 版本不低于 V17.0。
2. [https://github.com/topjohnwu/Magisk/releases ](https://github.com/topjohnwu/Magisk/releases)
3. 在 Magisk Manager 里安装 Riru-core，版本不低于 v10 。
4. [https://github.com/RikkaApps/Riru/releases](https://github.com/RikkaApps/Riru/releases)
5. 在 Magisk Manager 里安装 EdXposed。
6. [https://github.com/solohsu/EdXposed/releases](https://github.com/solohsu/EdXposed/releases)
7. 安装 Ed Xposed Installer App。
8. [https://github.com/solohsu/XposedInstaller/releases](https://github.com/solohsu/XposedInstaller/releases)
9. 重启手机。
10. EdXposedManager
11. [https://github.com/ElderDrivers/EdXposedManager/releases](https://github.com/ElderDrivers/EdXposedManager/releases)

**常见问题**

- 第一次刷机安装了 Edxpoed，完了 EdXposedManager 显示警告未激活？

  > 可以尝试删除 EdXposedManager，在安装一次

### MTK 刷机

**条件**

最好是 win7 的电脑（win10 的驱动是真的难搞）

**注意事项**

1. 一般 mtk 的不会亮屏，一般按住音量下键连接电脑就不会亮屏。
2. 只要不是字库或者硬件损坏，基本是不死（都能刷机复原）的状态。

**刷机包资源**

[东海论坛 - http://bbs.eastsea.com.cn/](http://bbs.eastsea.com.cn/) - 基本国产、山寨手机，mtk 平台的刷机包都能找到

**魅蓝 note3 win10 2004 救砖成功**

![mlnote3](https://static.yoouu.cn/static/imgs/doc/interest/mtk.png)
