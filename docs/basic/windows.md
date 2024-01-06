# Windows 技巧

## 关闭基于虚拟化的安全性

win+x powershell 管理员模式输入，输入完成，重启

```powershell
bcdedit /set hypervisorlaunchtype off
```

win+r 输入 msinfo32 查看是否关闭

## 关闭兼容性遥测

使用 dism++ 关闭服务。

## 微软拼音输入自定义时间

Windows 10：`设置`→`时间和语言`→`区域和语言`→`中文(中华人民共和国)`→`选项`→`微软拼音`→`选项`→`词库和自学习`→`添加新的或编辑现有的用户自定义短语`→`添加`。

然后在短语里面输入以下代码：

```
%yyyy%-%MM%-%dd% %HH%:%mm%:%ss% +0800
```

## 右下角时间显示秒

[http://iknow.lenovo.com.cn/detail/dc_173611.html](http://iknow.lenovo.com.cn/detail/dc_173611.html)

## 清除 Dns 缓存

用于更新域名后，访问域名解析到老的 ip 地址。

1：首先清除 Windows 的 dns 缓存。powershell 执行

```powershell
# 清除
ipconfig /flushdns

# 查看
ipconfig /displaydns
```

2：chrome 或 egde 地址栏输入

```
chrome://net-internals/#dns
```

点击 `Clear host cache`

找到 `Sockets`

点击 `Flush socket pools` 刷新试试

## PDF 压缩

[https://zh.pdf24.org/](https://zh.pdf24.org/)

## EDGE 多开

快捷方式添加参数

```
--user-data-dir="D:\edge\user1"
```

## 查看端口占用

**查看被占用端口对应的 PID**

```powershell
netstat -aon|findstr "49157"
```

**查看是哪个进程或者程序占用了`2720`端口**

```powershell
tasklist|findstr "2720"
```

输入 tasklist|findstr "2720"

## Win10

### 删除资源管理器左边用户文件夹

```
Windows Registry Editor Version 5.00

;使用说明
;
;如果不想删除某个快捷方式则在中括号前面加上英文半角的 ; 分号
;
;如果想要恢复的话则把前面的 - 减号去除即可

;取消文件资源管理器左侧 下载 文件夹
;[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{088e3905-0323-4b02-9826-5d99428e115f}]

;取消文件资源管理器左侧 3D对象 文件夹
[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}]

;取消文件资源管理器左侧 图片 文件夹
[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{24ad3ad4-a569-4530-98e1-ab02f9417aa8}]

;取消文件资源管理器左侧 音乐 文件夹
[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}]

;取消文件资源管理器左侧 桌面 文件夹
;[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}]

;取消文件资源管理器左侧 文档 文件夹
[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{d3162b92-9365-467a-956b-92703aca08af}]

;取消文件资源管理器左侧 视频 文件夹
[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}]
```

### 休眠唤醒后，所有的窗口都跑到了左上角，如何解决？

1、按下 Win+R 打开运行，输入 regedit 回车，打开注册表；

2、打开注册表定位到：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers\Configuration。查找 NOEDID 开头的项（我的电脑是最后一个），查找的项展开有个 00 项，00 项展开又还有个 00 项；会发现 PrimSurfSize.cx 和 PrimSurfSize.cy 不像其他几个跟屏幕分辨率一致。小一些。

![win10-window-error.png](https://static.yoouu.cn/imgs/doc/issue/win10-window-error.png)

3、两个 00 项都要修改两个键值：PrimSurfSize.cx 和 PrimSurfSize.cy，把这两个键值双击修改，输入你电脑对应的正常分辨率数值，比如 PrimSurfSize.cx 为宽度 1920，PrimSurfSize.cy 为高度 1080。十进制十六进制随意，看其他几个的 00 下的“数据”一栏，都能看到对应的十进制和十六进制，0x780（1920），0x438（1080）

重点就是这两个 00 都有这个名称，两个都要改，我之前只改了第二层的 00，重启后发现没解决。仔细看了是要两个都改，又把第一层 00 的这两个值改了，重启后就解决了。

当然，我看到 HWP 开头的也不是这个分辨率，手快了，同时改了。不过按照他人的经验应该不用吧。但已经忘了原先的值，只记得跟最后这个 NOEDID 的不一样。

另据说“在使用 HDMI 输出线时正常，只有在使用 Display Port 输出线才发现有此问题。” 而我的显示屏就是 DP 输出线，所以遇到此问题。这个只当做扩展小知识了解吧。

## Win11

### 恢复 Win10 经典文件资源管理器样式

[https://finance.sina.com.cn/tech/2021-08-05/doc-ikqcfncc1009508.shtml](https://finance.sina.com.cn/tech/2021-08-05/doc-ikqcfncc1009508.shtml)

### 恢复 Win10 右键菜单

https://www.sordum.org/14479/windows-11-classic-context-menu-v1-0/

### 关闭客户体验改善计划

该条目会造成一个 Microsoft 兼容性遥测的程序大量占用 cpu 造成 卡顿

1.按“Windows+R”键，打开“运行”，输入“gpedit.msc”，点击“确定”，打开“本地组策略编辑器”。

![](https://static.yoouu.cn/imgs/doc/basic/windows/202202091034151.png)

[完全禁用 Microsoft Compatibility Telemetry](https://blog.csdn.net/m0_49448331/article/details/113824078)

## 常用电脑软件（重装）

Win10 系统联网后会自动下载安装驱动，已经没必要用第三方的驱动更新软件。如果确实需要也可以使用 [驱动精灵纯净版单文件](https://pan.lanzoui.com/iIv3Ahiyo5i)、[鲁大师去广告单文件](https://pan.lanzoui.com/ibRIBkug9sd)

### 激活系统

**激活工具**可用 [HEU KMS Activator](https://423down.lanzouv.com/iT5AE0fhkcpa)，一键使用非常方便，Win7-Win11 通用。

（此类软件出现报毒属于正常现象，建议关闭系统自带杀毒软件再使用）

<img src="https://static.yoouu.cn/imgs/doc/basic/windows/20221209110352.png" style="zoom: 50%;" />

### 关闭系统自动更新

如果需要关闭系统自动更新，可以用 **[Winaero Tweaker](https://yaohuo.me/bbs-755790.html)**

### 微软运行库

对我来讲是必装的，不然无法使用各种绿色版软件。 [微软常用运行库合集 2022.09.15](https://423down.lanzouv.com/b0f1dlg3a)

<img src="https://static.yoouu.cn/imgs/doc/basic/windows/20221209110450.png" style="zoom:50%;" />

### 系统安全软件

**系统安全软件**我用的是[火绒](https://www.huorong.cn/person5.html)，为什么不用自带的 Windows Defender ，因为它很容易报毒，使用体验不好。火绒的好处是不打扰，占用资源少，没那么敏感，但它的杀毒能力不强，所以要注意电脑使用习惯。杀毒软件 [360 杀毒极速版](https://sd.360.cn/) 还是挺强的，别装安全卫士就行。

### 解压软件

**解压软件**依然是 BandZip，用它是因为界面比较漂亮。推荐 [Bandizip 7.27 专业版](https://423down.lanzouv.com/b0f1mc0cd)

### 输入法

**输入法**用的是 Win10 自带，因为隐私问题，不再用搜狗等国产输入法了，推荐大家试试自带的。

### QQ

**QQ**用的是 Dreamcast 大神做的 QQ 绿色版，可以去掉多余的组件，按自己的意愿定制，还有消息防撤回等小功能。感兴趣可以尝试：[去广告绿色版&安装版](https://423down.lanzouv.com/b0f3rmr2h)

<img src="https://static.yoouu.cn/imgs/doc/basic/windows/20221209111148.png" style="zoom:50%;" />

**建议先卸载官方版 QQ** ，再使用绿色版，避免官方的组件扫描硬盘检测到修改版导致 QQ 号冻结。 QQ 的聊天记录在“此电脑——文档——Tencent Files”，如果要备份，可直接备份这个文件夹。

### 看图软件

**看图软件**用的是 [FSViewer](https://www.faststone.org/FSViewerDownload.htm)，主要是操作顺手，免费且好用。另外国产的 2345 看图王做得也不错，更轻量化：[2345 看图王去广告纯净版](https://www.123pan.com/s/A6cA-3CAJh)

### 音乐播放器

**音乐播放器**是 [酷我音乐绿色版](https://wwi.lanzoup.com/iBhGJ06mkijg)，不需要充钱，手机电脑都用它…主要是现在很少听歌了，没必要花钱了。

如果有**下载无损、高音质音乐**的需求，[MusicTools](https://www.123pan.com/s/A6cA-SOAJh) 非常好用，第一次打开需要耐心等待一会，必须先安装[微软运行库](https://yaohuo.me/bbs-1076072.html#运行库)否则可能无法运行。

<img src="https://static.yoouu.cn/imgs/doc/basic/windows/20221209111422.png" style="zoom:50%;" />

### 轻文本编辑器

**轻文本编辑器**用的是 [Notepad++ 7.8.5](https://pan.lanzoui.com/ia7dhna)，习惯了这个编辑器的界面，所以始终没有更换。

推荐把全局字体换成：[Source Code Pro](https://pan.lanzoui.com/ia7dg9a)，好看不发虚，其它编辑器也可以试试这个字体。

<img src="https://static.yoouu.cn/imgs/doc/basic/windows/20221209112002.png" style="zoom:50%;" />

### 办公套件

**办公套件**用的是 [Office 2016 精简版](https://www.123pan.com/s/guQ9-Xi3WA)，我用办公软件很少，偶尔用用 Excel，所以不追求最新版，用 2016 精简版是因为启动速度更快，以及占用硬盘较少。你也可以选择：[WPS 专业增强版&精简版](https://423down.lanzouv.com/b0f2ql3be)

### 视频播放器

**视频播放器**用的是 [PotPlayer 去广告绿色版](https://423down.lanzouv.com/b0f1k59qh)，这款软件的优点是比较好用，每个人都可以通过设置满足自己的需求。 **字幕字体**我推荐“[文泉驿微米黑](https://wwi.lanzoup.com/i7tuU06ml82f)”，电视上观影也可以用这个字体，简洁美观易读。

### 下载工具

**下载工具**用的是 IDM ，我是好多年前买的正版，挺值得。[ IDM 6.39 绿色特别版](https://www.123pan.com/s/A6cA-HWHJh)

### BT 工具

**BT 工具**用的是 [qBittorrent 4.3.5](https://wwa.lanzoui.com/ifqDooz2dpe)，不玩 PT 的话不推荐用这个，没有离线下载加速。

### 日常下载

**日常下载** 迅雷 11 版本做得还不错，资源不限速了，审查也没有那么严格，日常使用体验还可以，推荐这个版本：[迅雷 11.1.7.1334 绿色版](http://pan.lanzoui.com/iGL36kzhnsd)

百度网盘、天翼云盘都可以用：[去广告绿色版](https://423down.lanzouv.com/b0f19imab)

### 文件快速复制工具

**文件快速复制工具** 换成了 [ExtremeCopy](http://www.easersoft.com/download/) ，界面没有 [FastCopy](https://www.123pan.com/s/A6cA-cdAJh) 漂亮，速度也不如，不过可以接管系统的复制粘贴功能。

### 本地文件搜索

**本地文件搜索**自然是 Everything ，用过都说好系列。官网下载即可：https://www.voidtools.com/zh-cn/

### 系统垃圾清理

**系统垃圾清理**推荐 [CCleaner](https://www.123pan.com/s/A6cA-tuAJh)，界面漂亮，清理速度快。其实火绒自带的垃圾清理也不错。

<img src="https://static.yoouu.cn/imgs/doc/basic/windows/20221209112324.png" style="zoom:50%;" />

### 硬盘检测工具

**硬盘检测工具**推荐 [CrystalDiskInfo 单文件版](https://423down.lanzouv.com/b0f1dp0mh)，了解硬盘健康状态和参数。

<img src="https://static.yoouu.cn/imgs/doc/basic/windows/20221209112520.png" style="zoom:50%;" />

### 硬盘文件分析软件

**硬盘文件分析软件** [WizTree](https://www.123pan.com/s/guQ9-6ThWA) 可以让你快速了解哪些文件和文件夹占用的磁盘空间最多，帮助你手动清理掉那些无用的大文件。

<img src="https://static.yoouu.cn/imgs/doc/basic/windows/20221209112550.png" style="zoom:50%;" />

### 重复图片查找工具

**重复图片查找工具**推荐 [Duplicate Photo Finder](https://wwa.lanzoui.com/ieEnvoz4iyf) ，可帮助你清理近似的照片和重复的图片。

### 文件批量改名

**文件批量改名**我用的是 [拖把更名器](https://wwa.lanzoui.com/ihQccoz4qgf) ，使用比较简单，首次运行需要管理员权限不然会有错误提示。

### 截图工具

**截图工具**用的是 [FSCapture](https://423down.lanzouh.com/iUlyutv61vi)，QQ 自带截图也很够用。这个软件有更多功能、快捷键，但需要适应。很少截图也不用 QQ 的话，可以用 Win10 自带的快捷键“Win+Shift+S”截图。

### 图片压缩

**图片压缩**用的是 [PPDuck](https://ppduck.com/)，免费版一次只能压缩 10 张，一般也够用了，建议大家传图片到网站前先压缩一下。

### GIF 录制

**GIF 录制**用的是 [ScreenToGif](https://pan.lanzoui.com/iJMAH0020fve)，另一款软件 [GifCam](https://423down.lanzouv.com/iBzaY05zb3yj) 功能略少但录制的文件体积更小也可以考虑！有时候录个动图教程发给朋友，或者发到论坛，都很方便，清晰度很好，示例：

![](https://static.yoouu.cn/imgs/doc/basic/windows/005YhI8igy1fwcf4daa6rg30j10gw7vw.gif)

### GIF 图片压缩

**GIF 图片压缩**可以用 [WinForGIFSicle](https://423down.lanzouh.com/iq7Nqjjbhqh)

### 屏幕录制

**屏幕录制**用的是 [Bandicam](https://pan.lanzoui.com/b0f197pud)，相当好用。（首次运行请使用管理员权限）

### 视频转码、压制、分割、合并、画面裁剪

**视频转码、压制、分割、合并、画面裁剪**推荐 [ShanaEncoder](https://1265578519.lanzouq.com/i3k0q03o0gaj) ，非常好用。

### Adobe 系列软件

偶尔也会用 PR 编辑一下视频，Adobe 系列软件： https://cloud.189.cn/t/reaU73RvQji2

## Windows 文件夹结构

![windows-folder-structure](https://static.yoouu.cn/imgs/doc/basic/others/windows-folder-structure.png)

## Typora 快捷键

- 无序列表：输入-之后输入空格
- 有序列表：输入数字+“.”之后输入空格
- 任务列表：-[空格]空格 文字
- 标题：ctrl+数字
- 表格：ctrl+t
- 生成目录：[TOC]按回车
- 选中一整行：ctrl+l
- 选中单词：ctrl+d
- 选中相同格式的文字：ctrl+e
- 跳转到文章开头：ctrl+home
- 跳转到文章结尾：ctrl+end
- 搜索：ctrl+f
- 替换：ctrl+h
- 引用：输入>之后输入空格
- 代码块：ctrl+alt+f
- 加粗：ctrl+b
- 倾斜：ctrl+i
- 下划线：ctrl+u
- 删除线：alt+shift+5
- 插入图片：直接拖动到指定位置即可或者 ctrl+shift+i
- 插入链接：ctrl+k
- 分割线：
  - `***`+回车
  - `---`+回车
