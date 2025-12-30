# 虚拟机折腾

## PVE

```shell
# 安装工具包
apt update || true && apt install cpufrequtils -y || true && apt install nano -y || true && apt install mdadm -y || true && apt install vim -y || true && apt install isc-dhcp-server -y || true && apt install numactl -y || true && apt install lm-sensors -y || true && apt install htop -y || true && apt install dmidecode -y || true && apt install iputils-ping -y || true && apt install aria2 -y || true && apt install sysbench -y || true && apt install parted -y || true && apt install parallel -y || true

# 升级母鸡 qemu 版本
apt update
apt full-upgrade -y
# 查看
pveversion
qemu-system-x86_64 --version
```

### 直通

```shell
# 参看当前配置
cat /etc/default/grub
root@pve:~# cat /etc/default/grub
# If you change this file, run 'update-grub' afterwards to update
# /boot/grub/grub.cfg.
# For full documentation of the options in this file, see:
#   info -f grub -n 'Simple configuration'

GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
GRUB_CMDLINE_LINUX=""

# If your computer has multiple operating systems installed, then you
# probably want to run os-prober. However, if your computer is a host
# for guest OSes installed via LVM or raw disk devices, running
# os-prober can cause damage to those guest OSes as it mounts
# filesystems to look for things.
#GRUB_DISABLE_OS_PROBER=false

# Uncomment to enable BadRAM filtering, modify to suit your needs
# This works with Linux (no patch required) and with any kernel that obtains
# the memory map information from GRUB (GNU Mach, kernel of FreeBSD ...)
#GRUB_BADRAM="0x01234567,0xfefefefe,0x89abcdef,0xefefefef"

# Uncomment to disable graphical terminal
#GRUB_TERMINAL=console

# The resolution used on graphical terminal
# note that you can use only modes which your graphic card supports via VBE
# you can see them in real GRUB with the command `vbeinfo'
#GRUB_GFXMODE=640x480

# Uncomment if you don't want GRUB to pass "root=UUID=xxx" parameter to Linux
#GRUB_DISABLE_LINUX_UUID=true

# Uncomment to disable generation of recovery mode menu entries
#GRUB_DISABLE_RECOVERY="true"

# Uncomment to get a beep at grub start
#GRUB_INIT_TUNE="480 440 1"
root@pve:~#



```

### 开启PVE直通功能

PVE all in one保姆级教程：iKuai+iStoreOS, 核显SR-IOV, 飞牛fnOS, 黑群晖, TrueNAS, Windows10 https://www.fqkeji.net/1796.html

```shell
#若你的CPU为Intel：
sed -i '/^GRUB_CMDLINE_LINUX_DEFAULT/c\GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream"' /etc/default/grub
#若你的CPU为AMD修改为
sed -i '/^GRUB_CMDLINE_LINUX_DEFAULT/c\GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt pcie_acs_override=downstream"' /etc/default/grub

# 增加所需模块，修改文件`/etc/modules`，输入如下命令：
echo -e "vfio\nvfio_iommu_type1\nvfio_pci\nvfio_virqfd" | tee -a /etc/modules

# 更新上述配置信息并重启PVE：
update-grub
update-initramfs -u -k all  
reboot

# 验证是否已开启iommu：
dmesg | grep iommu

# 看看可直通设备列表：
lspci
```

### istore

不能直接选择镜像驱动需要使用命令导入才能开机

```shell
#pve虚拟机id和img文件路径替换为自己的
qm importdisk pve虚拟机id img文件路径 local

#如：
qm importdisk 100 /var/lib/vz/template/iso/istoreos-24.10.2-2025072517-x86-64-squashfs-combined.img vmdata
```

#### iStoreOS插件下载：

https://github.com/AUK9527/Are-u-ok/tree/main/x86

passwall 独立下载 https://github.com/bcseputetto/Are-u-ok