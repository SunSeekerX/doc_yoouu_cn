# Hackintosh（黑苹果）

## 教程收集

- opencore 官方教程 - [https://dortania.github.io/OpenCore-Install-Guide/](https://dortania.github.io/OpenCore-Install-Guide/)
- [国光的黑苹果安装教程：手把手教你配置 OpenCore](https://apple.sqlsec.com/)
- [NUC8（豆子峡谷）黑苹果新手指南 Q&A](https://zhuanlan.zhihu.com/p/165596210) by weachy
- [NUC8（豆子峡谷）在线安装 macOS，这才是 OpenCore 正确的打开方式](https://zhuanlan.zhihu.com/p/165608087) by weachy

## 下载黑苹果镜像

### mac 下载镜像

这部分在 oc 官方的教程有详细的说明，这里我翻译一下贴上来。

对于需要特定操作系统版本或无法从 App Store 下载的计算机，您可以使用 Munki 的 InstallInstallMacOS 实用程序。

运行 InstallInstallMacOS 需要 Python 环境，Mac 从 Monterey 12.3 开始移除了 Python，需要执行以下命令

```shell
# 先安装开发工具包
xcode-select --install
# 安装 xattr
pip3 install xattr
```

下载 Mac 镜像

```shell
mkdir -p ~/macOS-installer && cd ~/macOS-installer && curl https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py > installinstallmacos.py && sudo python3 installinstallmacos.py
```

但是我试了官方提供的出现

```
Could not find a default catalog url for this OS version.
```

换一个

官方的仓库地址：[https://github.com/munki/macadmin-scripts](https://github.com/munki/macadmin-scripts)

仓库地址：[https://github.com/grahampugh/macadmin-scripts](https://github.com/grahampugh/macadmin-scripts)

```shell
curl https://raw.githubusercontent.com/grahampugh/macadmin-scripts/main/installinstallmacos.py > installinstallmacos.py
```

出现

```
$ sudo python3 installinstallmacos.py                                                                                                                               ‹system: ruby 2.6.10p210›

installinstallmacos.py - get macOS installers from the Apple software catalog

This Mac:
Model Identifier : Macmini8,1

Board ID         : Mac-xxxxxx
OS Version       : 13.2.1
Build ID         : 22D68

 #  ProductID       Version    Build    Post Date   Title
 1  061-26578       10.14.5    18F2059  2019-10-14  macOS Mojave
 2  061-26589       10.14.6    18G103   2019-10-14  macOS Mojave
 3  041-91758       10.13.6    17G66    2019-10-19  macOS High Sierra
 4  041-88800       10.14.4    18E2034  2019-10-23  macOS Mojave
 5  041-90855       10.13.5    17F66a   2019-10-23  Install macOS High Sierra Beta
 6  061-86291       10.15.3    19D2064  2020-03-23  macOS Catalina
 7  001-04366       10.15.4    19E2269  2020-05-04  macOS Catalina
 8  001-15219       10.15.5    19F2200  2020-06-15  macOS Catalina
 9  001-36735       10.15.6    19G2006  2020-08-06  macOS Catalina
10  001-36801       10.15.6    19G2021  2020-08-12  macOS Catalina
11  001-51042       10.15.7    19H2     2020-09-24  macOS Catalina
12  001-57224       10.15.7    19H4     2020-10-27  macOS Catalina
13  001-68446       10.15.7    19H15    2020-11-11  macOS Catalina
14  071-78704       11.5.2     20G95    2021-08-18  macOS Big Sur
15  002-23589       11.6.1     20G224   2021-12-01  macOS Big Sur
16  002-42341       11.6.2     20G314   2022-01-14  macOS Big Sur
17  002-57023       11.6.3     20G415   2022-01-26  macOS Big Sur
18  002-65695       11.6.4     20G417   2022-02-17  macOS Big Sur
19  002-77154       11.6.5     20G527   2022-04-11  macOS Big Sur
20  012-08272       11.6.6     20G624   2022-05-24  macOS Big Sur
21  012-90254       12.6.1     21G217   2022-10-24  macOS Monterey
22  012-90253       11.7.1     20G918   2022-10-24  macOS Big Sur
23  012-93766       13.0.1     22A400   2022-11-09  macOS Ventura
24  012-60271       13.1       22C65    2023-01-11  macOS Ventura
25  032-12843       12.6.2     21G320   2023-01-11  macOS Monterey
26  032-12833       11.7.2     20G1020  2023-01-11  macOS Big Sur
27  032-35706       13.2       22D49    2023-01-23  macOS Ventura
28  032-33756       11.7.3     20G1116  2023-01-31  macOS Big Sur
29  032-33828       12.6.3     21G419   2023-01-31  macOS Monterey
30  032-48342       13.2.1     22D68    2023-02-20  macOS Ventura
31  032-50519       11.7.4     20G1120  2023-02-15  macOS Big Sur

Choose a product to download (1-31):
```

选择一个版本就能下载了。

## 黑苹果工具 - mac

### ioregistryexplorer

苹果硬件信息查看工具

Download: [https://mac.softpedia.com/get/System-Utilities/IORegistryExplorer.shtml](https://mac.softpedia.com/get/System-Utilities/IORegistryExplorer.shtml)

### hackintool

mac 的黑苹果瑞士军刀

github: [https://github.com/benbaker76/Hackintool](https://github.com/benbaker76/Hackintool)

### OCAuxiliaryTools

opencore efi 可视化配置工具，跨平台

github: [https://github.com/ic005k/OCAuxiliaryTools](https://github.com/ic005k/OCAuxiliaryTools)

### OpenCore Configurator

opencore efi 可视化配置工具，仅 mac

Download: [https://mackie100projects.altervista.org/opencore-configurator/](https://mackie100projects.altervista.org/opencore-configurator/)

### MacSerialTransporter

Hackintosh 三码拷贝工具 所谓三码就是 ROM，序列号，以及系统 UUID 这三者，用于提供身份令牌，令用户可以正常使用 iMessage,facetime 等服务。 通常用户不需要修改 config 文件，但是 EFI 整体替换或者 Clover 转 OpenCore 需要拷贝三码。但是一个不小心替换错了之前又没退出登陆，会造成无法退出甚至被封号的窘境。 于是本人写了个简单的小软件，可以方便的拷贝三码。

github: [https://github.com/haoke123/MacSerialTransporter](https://github.com/haoke123/MacSerialTransporter)

### Caffeinated

防止 mac 睡眠

App Store: [https://apps.apple.com/app/id1362171212?mt=12](https://apps.apple.com/app/id1362171212?mt=12)

### MaciASL

ACPI editing IDE for macOS

github: [https://github.com/acidanthera/MaciASL](https://github.com/acidanthera/MaciASL)

### balenaEtche

官网：[https://www.balena.io/etcher](https://www.balena.io/etcher)

1. 先安装 mac os 然后安装 windows。
2. 下载 mac os 镜像使用 `balenaEtcher` 写入到 16G 以上的 u 盘 作为 mac os 安装镜像。记得处理 efi 分区 替换为适合的 efi 文件
3. 下载 windows 镜像写入到 8g 以上的 u 盘 作为 windows 安装镜像。

### Intel Power Gadget

intel 官方出品的软件，常用来查看 CPU 的频率、功耗、稳定等相关参数。

官方下载地址为：https://www.intel.com/content/www/us/en/developer/articles/tool/power-gadget.html

## 📌 解锁 CFGLock

### 神舟(hasee) g8-ca5ns-NH5x_7xDPx

1. 工具下载

   蓝天模具 bios 工具:

   百度云链接：https://pan.baidu.com/s/19JkKK_RWvJGH-jFGrNQ9Uw 提取码：szlt

2. 下载官方的 bios 文件

   下载地址：[http://kfgl.hasee.com/lookup/bios/bios_nb.asp](http://kfgl.hasee.com/lookup/bios/bios_nb.asp)

   输入 ca5ns 按照笔记本搜索

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-1.webp)

3. 桌面新建一个文件夹，解压下载的 bios 文件

   你应该能看到如下的文件结构

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-2.webp)

4. win + x 打开 powershell（管理员）模式进入到桌面下载的文件夹里面，执行以下命令备份当前的 bios

   ```powershell
   .\FPTW64.exe -bios -d backup.fd
   ```

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-3.webp)

5. 找到备份的 `backup.fd` 文件复制到桌面使用 `InsydeH2OUVE_x86_WINx64_200.00.01.00` 工具打开

   点击 setup，然后点击 file > export 导出为 text 文件命名为 `bios.txt`

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-4.webp)

6. 使用你喜欢的文本编辑器打开 `bios.txt`，这里我使用 vscode 打开，搜索 show 可以打开 bios 菜单显示，不要多一个空格，不要少，不然我也不知道会出什么问题 ❗❗❗，如果你不知道这一步在干嘛可以跳过，不然打开了很多危险的选项可能你就开不了机了。

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-5.webp)

   修改后

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-6.webp)

   我们需要的 cfg 搜索就能关闭了

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-7.webp)

7. 然后使用导出的工具导入点击 save as 保存为 **mod.fd**

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-8.webp)

8. 最后使用命令刷回去

   ```powershell
   .\FPTW64.exe -bios -f mod.fd
   ```

   ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-9.webp)

9. 全程接通电源不进行其它操作

   刷写完关机 断电拔出电池

   清除静电 可以用手碰碰电池连接触片

   开机 f2 进入 bios F9 加载默认设置 会发现...多了一堆选项

10. 解锁了菜单选项没有发现可以在 bios 里面控制 cfg 的菜单，有一些其他的菜单出来

解锁前

![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-10.webp)

解锁后

![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-11.webp)

11. 不过通过 oc 的工具可以验证确实是解锁了的

    ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-12.webp)

    ![](https://static.yoouu.cn/imgs/doc/interest/hackintosh/g8-unlock-cfglock-13.webp)

参考

1. [神舟 tx6zx6gx9tx9 蓝天模具解锁 bios 高级菜单](https://bbs.pcbeta.com/viewthread-1867971-1-1.html)

## 📌 nuc8 安装单盘双系统

### 参考教程

[NUC8（豆子峡谷）在线安装 macOS，这才是 OpenCore 正确的打开方式](https://zhuanlan.zhihu.com/p/165608087)

Mac 镜像下载地址

- 官方（需要 App store）：https://support.apple.com/zh-cn/HT201372
- msdn（只有 Catalina）：https://next.itellyou.cn/

nuc8 bios 下载地址: https://www.intel.cn/content/www/cn/zh/download/19303/bios-update-becfl357.html

### Bios 设置

```
豆子峡谷（NUC8ixBEx）的具体设置项如下：（启用为勾选，禁用为不勾选）
1、开机时，连续点按 F2 进入 BIOS，为了避免之前有其他不合适的改动，建议先按 F9 重置 BIOS 默认设置。
2、Boot->Boot Priority->Legacy Boot Priority-> « Legacy Boot » ：禁用
3、Boot->Boot Configuration->
UEFI Boot->« Fast Boot »： 禁用
UEFI Boot->« Boot USB Devices First » ： 启用
UEFI Boot->« Boot Network Devices Last » ：启用
Boot Devices->«Network Boot» ：设置为 « Disable »
4、Boot->Secure Boot-> « Secure Boot » ：禁用
5、Security->Security Features-> « Inter VT for directed I/VO (VT-d) » ： 禁用
6、Power->Secondary Power Settings-> « Wake on LAN from S4/S5 » ： 设置为 « Stay Off »
以下为使用白果拆机卡的用户设置：
7、Devices->Onboard Devices-> « WLAN » 和 « Bluetooth » ：禁用
```

## 📌 重装记录

- 下载 chrome
- 下载 typora
  - 更换所有 md 文档用 typora 打开
- 下载 vscode
- 下载百度输入法
- 关闭鼠标自然滚动
- 切换 ctrl 和 command 位置 设置 > 键盘 > 修饰键
- 下载微信
- 下载 qq
- 下载 hackintool 电源 > 修复深度休眠预留空间
- 迁移三码
- 复制 efi 到引导盘
- 下载 maczip
  - 更换所有 zip 文档用 maczip 打开
- 设置 finder
  - 设置文件夹显示在前
  - 设置默认按照名称排序 （右键空白地方显示选项）
- 下载 nodejs

## 📌 问题解决

### 1. mac 和 windows 时间不正确

办法也很简单，就是让 Windows 把硬件时间当作 UTC 时间，保持和 macOS 一致。

Window7 用户点击左下角 开始 -> 运行 -> 输入 CMD

Window8/10 用户按下 Win+X 组合键，使用管理员模式进入 CMD

输入以下命令：

```powershell
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

### 2. 下载文件校验命令

### Mac

- 查看 sha256sum，对比原有值：

  ```
  #shasum -a 256 文件名
  # -a 指定算法，现在一般是用 256，未来可能会使用 384 或者 512
  shasum -a 256 Install-macOS-Big-Sur-11.5-20G71.iso
  # 输出如下值，对比一下判断是否正确
  5af8f20621fe61856ad0ccbe714aea0341b062240af04ac76661dd68ed83ccb9
  ```

- 从校验文件中读取对比

  ```
  #shasum -a 256 -c 校验文件
  shasum -a 256 -c Install-macOS-Big-Sur-11.5-20G71.iso.sha2
  # 输出 OK 即正确：
  Install-macOS-Big-Sur-11.5-20G71.iso: OK
  ```

### Windows

- PowerShell

  Windows PowerShell 通过 Get-FileHash cmdlet 查看和获取文件校验和，并且默认使用 sha256 算法。

  ```
  Get-FileHash D:\Download\Install-macOS-Big-Sur-11.5-20G71.iso | Format-List

  Algorithm : SHA256
  Hash      : 5af8f20621fe61856ad0ccbe714aea0341b062240af04ac76661dd68ed83ccb9
  Path      : D:\Download\Install-macOS-Big-Sur-11.5-20G71.iso
  ```

  如果需要指定算法使用 `-Algorithm` 参数，例如 sha384：`Get-FileHash D:\Download\Install-macOS-Big-Sur-11.5-20G71.iso -Algorithm SHA384 | Format-List`

- 第三方软件

  推荐使用 [7-Zip](https://www.7-zip.org/)，免费的全能压缩解压软件，安装后，在资源管理器点击文件的右键菜单后多出一个 “CRC SHA”，点击 “SHA-256” 即可，也可以点击 “\*” 查看所有校验类型。

  其他有很多小软件，请自行搜索。

### Linux

- Ubuntu 直接使用 shasum 命令，用法参看上述 macOS，不在赘述。
- CentOS 默认没有 shasum，需要手动安装：`yum -y install perl-Digest-SHA`，然后命令也是一样，参考 macOS
