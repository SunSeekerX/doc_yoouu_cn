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

