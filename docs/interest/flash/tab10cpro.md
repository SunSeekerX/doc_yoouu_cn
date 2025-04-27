# 文石BOOX Tab10C Pro10.3

- 官网 https://zh.boox.com/tab10cpro

- 解密 upx GitHub https://github.com/Hagb/decryptBooxUpdateUpx

- 设备 model 表格 https://github.com/Hagb/decryptBooxUpdateUpx/blob/master/BooxKeys.csv

- 获取固件: https://github.com/Hagb/decryptBooxUpdateUpx/issues/2

- 高通工具箱 https://syxz.lanzoue.com/b01g1c7ve 密码 bulf

  - 酷安帖子 https://www.coolapk.com/feed/56441690?shareKey=YmE4ZmFmNWU3YzA2NjgwYTI4OGY~&shareUid=775868&shareFrom=com.coolapk.market_15.2.2

- 高通 855 loader https://github.com/bkerler/Loaders/tree/main/qualcomm/factory/sdm855

- **How to Root the Onyx Boox Tab Ultra C (Windows)** https://www.mobileread.com/forums/showthread.php?t=355147

  这是网上找到的一个帖子，里面的方法目前已经不可用，但是提到了一个关键的东西进入 edl 模式

  这里面有一堆的模式很多我也不太清楚

  ```shell
  adb reboot edl
  ```

  <img src="https://static.yoouu.cn/static/imgs/doc/interest/tab10cpro/Screenshot_20250424-195248.avif" style="zoom:33%;" />

## Root

一句话概括就是进入 edl 模式回读分区修改然后刷入。

玩这个你需要自己排查出现的问题 比如 Windows 缩放会导致一些软件按钮提示看不到这种细节

1. 下载 855 loader https://github.com/bkerler/Loaders/tree/main/qualcomm/factory/sdm855

2. 自行准备好 adb 命令

   ```shell
   ➜ adb devices
   List of devices attached
   1643A899        device
   emulator-5554   device
   ```

3. 打开 usb 调试模式进入到 fastboot 查看当前槽位

   ```shell
   ➜ fastboot devices
   1643A899         fastboot
   # 获取当前槽位 可以看到我是 b
   ➜ fastboot -s 1643A899 getvar current-slot
   current-slot: b
   Finished. Total time: 0.004s
   # 重启开机准备进入 edl 模式
   fastboot -s 1643A899 reboot
   ➜ fastboot -s 1643A899 reboot
   Rebooting                                          OKAY [  0.001s]
   Finished. Total time: 0.003s
   ```

4. 进入 edl 模式，进入这个模式平板会定屏

   ```shell
   adb -s 1643A899 reboot edl
   ```

5. 打开高通工具箱 发送引导选择文件 需要选择显示全部

   <img src="https://static.yoouu.cn/static/imgs/doc/interest/tab10cpro/send_select_loader.avif"  />

6. 发送引导成功

   <img src="https://static.yoouu.cn/static/imgs/doc/interest/tab10cpro/send.avif"  />

7. 这工具我不是很熟练所以我选择了回读全部分区并生成 gpt 和 xml

   <img src="https://static.yoouu.cn/static/imgs/doc/interest/tab10cpro/read_back.avif"  />

8. 找到回读出来的镜像文件

   <img src="https://static.yoouu.cn/static/imgs/doc/interest/tab10cpro/read_images.avif"  />

9. 接下来就简单了，用之前确定的当前分区用 magisk 修补然后直接刷入例如当前分区是 b

   ```shell
   # 选择刷入单个分区输入
   boot_b
   # 选择你修复好的镜像文件，刷入然后重启到系统就 ok 了
   ```

下面是之前写的，先放着。

1. 拿到固件包

2. 拿到 boot.img

3. patch boot.img

4. 刷入 patch 的 boot.img

5. 解包 payload.bin

   工具地址 https://github.com/ssut/payload-dumper-go

   ```shell
   ➜ .\payload-dumper-go.exe .\payload.bin
   payload.bin: .\payload.bin
   Payload Version: 2
   Payload Manifest Length: 109119
   Payload Manifest Signature Length: 267
   Found partitions:
   abl (152 kB), boot (101 MB), dtbo (8.4 MB), modem (57 MB), odm (1.0 MB), product (557 MB), recovery (101 MB), system (2.2 GB), system_ext (324 MB), vbmeta (8.2 kB), vbmeta_system (4.1 kB), vendor (611 MB), xbl (3.2 MB)
   Number of workers: 4
   abl (152 kB)            [=================================================================================================================================] 100 %
   dtbo (8.4 MB)           [=================================================================================================================================] 100 %
   modem (57 MB)           [=================================================================================================================================] 100 %
   boot (101 MB)           [=================================================================================================================================] 100 %
   odm (1.0 MB)            [=================================================================================================================================] 100 %
   product (557 MB)        [=================================================================================================================================] 100 %
   recovery (101 MB)       [=================================================================================================================================] 100 %
   system (2.2 GB)         [=================================================================================================================================] 100 %
   system_ext (324 MB)     [=================================================================================================================================] 100 %
   vbmeta (8.2 kB)         [=================================================================================================================================] 100 %
   vbmeta_system (4.1 kB)  [=================================================================================================================================] 100 %
   vendor (611 MB)         [=================================================================================================================================] 100 %
   xbl (3.2 MB)            [=================================================================================================================================] 100 %
    D:\rom_builder\tab10cpro
   ```

6. 拿到了 boot.img

7. 使用 https://github.com/topjohnwu/Magisk/releases 进行 patch

8. 导出 patch 的 boot.img 到电脑 magisk_patched-28000_Xygq2.img

9. 进入 fastboot

   ```shell
   adb reboot bootloader
   ```

10. 检查是否解锁 bl

    ```shell
    fastboot getvar unlocked

    # 例如我的
     D:\rom_builder\tab10cpro                                                                                                                             | 17:34:51
    ➜ fastboot getvar unlocked
    unlocked: yes
    Finished. Total time: 0.003s
     D:\rom_builder\tab10cpro
    ```

11. 刷入 patch 的 boot

    ```shell
    fastboot flash boot boot.img
    ```

```
http://data.onyx-international.cn/api/firmware/update?where={"buildNumber":0,"buildType":"user","deviceMAC":"","lang":"zh_CN","model":"NovaPro","submodel":"","fingerprint":""}

http://data.onyx-international.cn/api/firmware/update?where={"buildNumber":0,"buildType":"user","deviceMAC":"=","lang":"zh_CN","model":"Tab10CPro","submodel":"","fingerprint":""}
```

## 解密更新 upx

1. 从系统更新处获得 update.upx

2. 使用这个项目进行解密 https://github.com/Hagb/decryptBooxUpdateUpx

   ```shell
   # 安装依赖
   pip install pycryptodome
   # 进行解密
   python DeBooxUpx.py <device model> [input file name [output file name]]
   python DeBooxUpx.py Tab10CPro C:\Users\zero\Desktop\update.upx C:\Users\zero\Desktop\update.zip
   # 打开压缩包得到 payload.bin
   ```

3. 使用这个工具 https://github.com/ssut/payload-dumper-go 解包 payload.bin
