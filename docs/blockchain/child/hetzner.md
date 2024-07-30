# hetzner

https://www.hetzner.com/

德国服务器提供商，价格友好。如果是节点服务器可以使用 robot 专用服务器。

## 1. 注册账号

不要使用代理注册！不然会被机器封号的。

> Dear xxx
>
> Please sign up again and do NOT use a VPN/proxy during registration.
>
> Kind regards
>
> Customer Data Analytics
>
> Hetzner Online GmbH Sigmundstrasse 135 90431 Nürnberg [info@hetzner.com](mailto:info@hetzner.com) > [www.hetzner.com](http://www.hetzner.com/)
>
> Register Court: Registergericht Ansbach, HRB 6089 CEO: Martin Hetzner, Stephan Konvickova, Günther Müller
>
> For the purposes of this communication, we may save some of your personal data. For information on our data privacy policy, please see: https://www.hetzner.com/de/privacy-policy-notice

## 2. 申请专用服务器

如果是需要大硬盘，可以自己添加，默认安装的是救援系统，需要自己安装服务器系统。

在这个界面能看到自己的服务器 https://robot.hetzner.com/server

## 3. 重装服务器

这里安装的是 linux，如果是 Windows，服务器控制面板可以安装，不过需要额外的付费，应该可以 dd 到任何的系统去。

```shell
# 在救援服务器执行
installimage
# 选择 ubuntu 最新版本
# 关闭 SWRAID 设置为 0
# 其他的用默认设置就行，按 f10 保存，然后会提示你格式化硬盘
# 默认是安装在 DRIVE1 硬盘上，进入系统可以格式化其他的硬盘挂载为数据盘
```

安装配置

```
## ======================================================
##  Hetzner Online GmbH - installimage - standard config
## ======================================================


## ====================
##  HARD DISK DRIVE(S):
## ====================

## PLEASE READ THE NOTES BELOW!

# Device Model: SAMSUNG MZVLB512HBJQ-00000, Serial Number: S4GENF1N241503
DRIVE1 /dev/nvme0n1
# Device Model: SAMSUNG MZVLB512HBJQ-00000, Serial Number: S4GENF1N241470
DRIVE2 /dev/nvme1n1
# Device Model: TOSHIBA KHK61RSE1T92, Serial Number: 89HS101VTXGQ
DRIVE3 /dev/sda

## if you dont want raid over your three drives then comment out the following line and set SWRAIDLEVEL not to 5
## please make sure the DRIVE[nr] variable is strict ascending with the used harddisks, when you comment out one or more harddisks


## ===============
##  SOFTWARE RAID:
## ===============

## activate software RAID?  < 0 | 1 >

SWRAID 1

## Choose the level for the software RAID < 0 | 1 | 5 | 10 >

SWRAIDLEVEL 5

## ==========
##  HOSTNAME:
## ==========

## which hostname should be set?
##

HOSTNAME Ubuntu-2204-jammy-amd64-base


## ================
##  NETWORK CONFIG:
## ================

# IPV4_ONLY no


## =============
##  MISC CONFIG:
## =============

USE_KERNEL_MODE_SETTING yes

## ==========================
##  PARTITIONS / FILESYSTEMS:
## ==========================

## define your partitions and filesystems like this:
##
## PART  <mountpoint/lvm/btrfs.X>  <filesystem/VG>  <size in MB>
##
## * <mountpoint/lvm/btrfs.X>
##            mountpoint for this filesystem *OR*
##            keyword 'lvm' to use this PART as volume group (VG) for LVM *OR*
##            identifier 'btrfs.X' to use this PART as volume for
##            btrfs subvolumes. X can be replaced with a unique
##            alphanumeric keyword
##            NOTE: no support btrfs multi-device volumes
##            NOTE: reiserfs support is deprecated and will be removed in a future version
## * <filesystem/VG>
##            can be ext2, ext3, ext4, btrfs, reiserfs, xfs, swap  *OR*  name
##            of the LVM volume group (VG), if this PART is a VG.
## * <size>
##            you can use the keyword 'all' to assign all the
##            remaining space of the drive to the *last* partition.
##            you can use M/G/T for unit specification in MiB/GiB/TiB
##
## notes:
##   - extended partitions are created automatically
##   - '/boot' cannot be on a xfs filesystem
##   - '/boot' cannot be on LVM!
##   - when using software RAID 0, you need a '/boot' partition
##
## example without LVM (default):
## -> 4GB   swapspace
## -> 1024MB /boot
## -> 10GB  /
## -> 5GB   /tmp
## -> all the rest to /home
#PART swap   swap        4G
#PART /boot  ext2      1024M
#PART /      ext4       10G
#PART /tmp   xfs         5G
#PART /home  ext3       all
#
##
## to activate LVM, you have to define volume groups and logical volumes
##
## example with LVM:
#
## normal filesystems and volume group definitions:
## -> 1024MB boot  (not on lvm)
## -> all the rest for LVM VG 'vg0'
#PART /boot  ext3     1024M
#PART lvm    vg0       all
#
## logical volume definitions:
#LV <VG> <name> <mount> <filesystem> <size>
#
#LV vg0   root   /        ext4         10G
#LV vg0   swap   swap     swap          4G
#LV vg0   home   /home    xfs          20G
#
##
## to use btrfs subvolumes, define a volume identifier on a partition
##
## example with btrfs subvolumes:
##
## -> all space on one partition with volume 'btrfs.1'
#PART btrfs.1    btrfs       all
##
## btrfs subvolume definitions:
#SUBVOL <volume> <subvolume> <mount>
#
#SUBVOL btrfs.1  @           /
#SUBVOL btrfs.1  @/usr       /usr
#SUBVOL btrfs.1  @home       /home
#
## your system has the following devices:
#
# Disk /dev/nvme0n1: 512.12 GB (=> 476.94 GiB)
# Disk /dev/nvme1n1: 512.12 GB (=> 476.94 GiB)
# Disk /dev/sda: 1.93 TB (=> 1.75 TiB)
#
## Based on your disks and which RAID level you will choose you have
## the following free space to allocate (in GiB):
# RAID  0: ~1428
# RAID  1: ~476
# RAID  5: ~952
#

PART swap swap 32G
PART /boot ext3 1024M
PART / ext4 all


## ========================
##  OPERATING SYSTEM IMAGE:
## ========================

## full path to the operating system image
##   supported image sources:  local dir,  ftp,  http,  nfs
##   supported image types: tar, tar.gz, tar.bz, tar.bz2, tar.xz, tgz, tbz, txz
## examples:
#
# local: /path/to/image/filename.tar.gz
# ftp:   ftp://<user>:<password>@hostname/path/to/image/filename.tar.bz2
# http:  http://<user>:<password>@hostname/path/to/image/filename.tbz
# https: https://<user>:<password>@hostname/path/to/image/filename.tbz
# nfs:   hostname:/path/to/image/filename.tgz
#
# for validation of the image, place the detached gpg-signature
# and your public key in the same directory as your image file.
# naming examples:
#  signature:   filename.tar.bz2.sig
#  public key:  public-key.asc

IMAGE /root/.oldroot/nfs/install/../images/Ubuntu-2204-jammy-amd64-base.tar.gz
```

出现下面的就是安装完成了

```

                Hetzner Online GmbH - installimage

  Your server will be installed now, this will take some minutes
             You can abort at any time with CTRL+C ...

         :  Reading configuration                           done
         :  Loading image file variables                    done
         :  Loading ubuntu specific functions               done
   1/16  :  Deleting partitions                             done
   2/16  :  Test partition size                             done
   3/16  :  Creating partitions and /etc/fstab              done
   4/16  :  Creating software RAID level 5                  done
   5/16  :  Formatting partitions
         :    formatting /dev/md/0 with swap                done
         :    formatting /dev/md/1 with ext3                done
         :    formatting /dev/md/2 with ext4                done
   6/16  :  Mounting partitions                             done
   7/16  :  Sync time via ntp                               done
         :  Importing public key for image validation       done
   8/16  :  Validating image before starting extraction     done
   9/16  :  Extracting image (local)                        done
  10/16  :  Setting up network config                       done
  11/16  :  Executing additional commands
         :    Setting hostname                              done
         :    Generating new SSH keys                       done
         :    Generating mdadm config                       done
         :    Generating ramdisk                            done
         :    Generating ntp config                         done
  12/16  :  Setting up miscellaneous files                  done
  13/16  :  Configuring authentication
         :    Setting root password                         done
                                                            done
         :    Enabling SSH root login with password         done
  14/16  :  Installing bootloader grub                      done
  15/16  :  Running some ubuntu specific functions          done
  16/16  :  Clearing log files                              done

                  INSTALLATION COMPLETE
   You can now reboot and log in to your new system with the
 same credentials that you used to log into the rescue system.
```

## 4. 挂载数据盘

如果关闭了 raid 就需要格式化其他的硬盘用作数据盘

## 挂载硬盘

```
# nvme2n1
sudo mkdir -p /mnt/nvme02
sudo mount /dev/nvme2n1 /mnt/nvme02
```

步骤 1: 检查和创建文件系统

1. **检查是否已经有文件系统**: 使用 `lsblk -f` 命令来查看所有磁盘和分区以及它们的文件系统类型：

   ```
   lsblk -f
   ```

   如果 `nvme2n1` 显示有文件系统，比如 `ext4`、`xfs` 等，你可以跳过创建文件系统的步骤。

2. **创建文件系统**: 如果没有文件系统，你可以使用 `mkfs` 命令来创建一个。假设我们使用 `ext4` 文件系统：

   ```
   sudo mkfs.ext4 /dev/nvme2n1
   ```

   **注意**: 这将删除 `nvme2n1` 上的所有数据！

步骤 2: 创建挂载点

你需要一个目录来作为挂载点。假设我们要将其挂载到 `/mnt/mydrive`：

```
sudo mkdir -p /mnt/mydrive
```

步骤 3: 挂载驱动器

现在你可以挂载这个驱动器了：

```
sudo mount /dev/nvme2n1 /mnt/mydrive
```

步骤 4: 自动挂载（可选）

如果你希望每次系统启动时自动挂载这个驱动器，你需要编辑 `/etc/fstab` 文件。

1. **找出 UUID**: 使用 `blkid` 命令来获取 `nvme2n1` 的 UUID：

   ```bash
   sudo blkid
   # d14cd72c-4b82-4512-8bad-9191313ab458
   ```

   记录下 `/dev/nvme2n1` 的 UUID。

2. **编辑 fstab 文件**: 打开 `/etc/fstab` 文件：

   ```
   sudo nano /etc/fstab
   ```

   在文件的末尾添加以下行（替换 `<UUID>` 为你的实际 UUID）：

   ```
   UUID=<UUID> /mnt/mydrive ext4 defaults 0 2

   # UUID=d14cd72c-4b82-4512-8bad-9191313ab458 /mnt/nvme02 ext4 defaults 0 2
   ```

   保存并关闭文件。

3. **测试 fstab 文件的正确性**: 在重启之前，你可以测试 fstab 文件的正确性：

   ```
   sudo mount -a
   ```

   如果没有错误消息，这意味着你的 fstab 文件是正确的。

现在，每次启动系统时，`nvme2n1` 都会自动挂载到 `/mnt/mydrive` 目录。请确保每一步操作都正确无误，特别是编辑 fstab 文件时，因为错误的配置可能阻碍系统启动。
