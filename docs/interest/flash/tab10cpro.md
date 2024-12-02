## Root

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
    # 例如我的
    
    ```

    

https://github.com/Hagb/decryptBooxUpdateUpx?tab=readme-ov-file

设备大全: https://github.com/Hagb/decryptBooxUpdateUpx/blob/master/BooxKeys.csv

获取固件: https://github.com/Hagb/decryptBooxUpdateUpx/issues/2

```
http://data.onyx-international.cn/api/firmware/update?where={"buildNumber":0,"buildType":"user","deviceMAC":"","lang":"zh_CN","model":"NovaPro","submodel":"","fingerprint":""}

http://data.onyx-international.cn/api/firmware/update?where={"buildNumber":0,"buildType":"user","deviceMAC":"=","lang":"zh_CN","model":"Tab10CPro","submodel":"","fingerprint":""}
```



