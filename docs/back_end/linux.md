# Linux

## 📌 Linux 目录

![Linux-folder](https://static.yoouu.cn/static/imgs/doc/basic/others/Linux-folder.png)

## 📌 学习资源

[Linux 命令大全](https://wangchujiang.com/linux-command/)

## 📌 一键 DD

https://github.com/bin456789/reinstall

注意不支持本地 iso

```shell
# 安装下载镜像的工具
apt update || true && apt install cpufrequtils -y || true && apt install nano -y || true && apt install mdadm -y || true && apt install vim -y || true && apt install isc-dhcp-server -y || true && apt install numactl -y || true && apt install lm-sensors -y || true && apt install htop -y || true && apt install dmidecode -y || true && apt install zfsutils-linux -y || true && apt install zfs-auto-snapshot -y || true && apt install iputils-ping -y || true && apt install aria2 -y || true && apt install sysbench -y || true

# 当前系统是 Linux
# 国外下载
curl -O https://raw.githubusercontent.com/bin456789/reinstall/main/reinstall.sh || wget -O ${_##*/} $_
# 国内服务器
curl -O https://cnb.cool/bin456789/reinstall/-/git/raw/main/reinstall.sh || wget -O ${_##*/} $_

# 从 linux dd 到 linux
bash reinstall.sh ubuntu 24.04 --password "xxxxxx" --ssh-port 22

# 从 linux dd 到 Windows
bash reinstall.sh windows \
     --image-name "Windows Server 2022 SERVERDATACENTER" \
     --iso "your_windows_remote_download_url"

# 终止安装
killall trans.start
killall aria2c
# 然后编辑 /trans.sh 找到 extract_env_from_cmdline，下面一行添加 iso=新url地址
# 再运行/trans.sh
# 像这样编辑下载地址
extract_env_from_cmdline() {
    # 提取 finalos/extra 到变量
    for prefix in finalos extra; do
        while read -r line; do
            if [ -n "$line" ]; then
                key=$(echo $line | cut -d= -f1)
                value=$(echo $line | cut -d= -f2-)
                eval "$key='$value'"
            fi
        done < <(xargs -n1 </proc/cmdline | grep "^${prefix}_" | sed "s/^${prefix}_//")
    done
    iso="magnet:?xt=urn:btih:7d22a1057235b508736efa660c98b90f8a717380&dn=zh-cn_windows_server_2025_updated_jan_2025_x64_dvd_7a8e5a29.iso&xl=7594012672"
}

echo 'Windows Server 2025 SERVERSTANDARD' >/image-name

# 这样子搜索
# zh-cn_windows_server_2025_x64_dvd_1d93dd12.iso
# zh-cn_windows_server_2025_updated_feb_2025_x64_dvd_3733c10e.iso

# 下载镜像
wget -O windows2022.iso "https://delivery.massgrave.dev/706db63b-5716-4158-ab66-4f12e594d955/zh-cn_windows_server_2022_updated_nov_2024_x64_dvd_4e34897c.iso?t=4e3d2975-599f-4410-a1c1-768738e09d26&P1=1740266314&P2=601&P3=2&P4=bZJrv9CHTLoUIvg3dmYMTSaDrBedIZaCeRIc5fUcf5U%3D"
# 开始安装
     bash reinstall.sh windows \
     --image-name "Windows Server 2022 SERVERDATACENTER" \
     --iso "https://delivery.massgrave.dev/706db63b-5716-4158-ab66-4f12e594d955/zh-cn_windows_11_business_editions_version_24h2_x64_dvd_5f9e5858.iso?t=e4e850b4-a0e3-4d64-8317-063f55463030&P1=1740529100&P2=601&P3=2&P4=xM4gHpk3FQIbH%2Fc0t%2BoZzaCbT0LuCMYC5TySc7E4Z8c%3D"

     # Windows Server Standard
     bash reinstall.sh windows \
     --image-name "Windows Server 2025 SERVERSTANDARD" \
     --iso "https://oemsoc.download.prss.microsoft.com/dbazure/X23-81958_26100.1742.240906-0331.ge_release_svc_refresh_SERVER_OEMRET_x64FRE_en-us.iso_909fa35d-ba98-407d-9fef-8df76f75e133?t=34b8db0f-439b-497c-86ce-ec7ceb898bb7&P1=102816956391&P2=601&P3=2&P4=pG1WoVpBKlyWcmfj%2bt1gYgkTsP4At28ch8mG7vIQm%2fT4elz5v2ZQ3eKAN8%2fFjb1yaa4npBaABURtnI8YmrDv8p0VJmYpLCIUQ0FHEFR4IFiPgtvzwAAI8oNdiEl%2b2uM7MN8Gaju8BvIVgHRl%2fRxq0HFgrFoEGmvHZU4jY0RFsYAaHliUinDUzdVfT0IPwyWqNUJXZTSfguyphv8XZx8OQsBy3zwBp7tNHsKl36ZO2JdZK%2fyPY7QTpAr5ccazUPEa40ALhYRBJXxlQb1F0OeO7kHhW7DKK5D4Wpt5WbpjFn8MqcZBX3%2fQI6WAwzDSKIck7jYL7bYdl2ufoMRrFZrxxw%3d%3d"
```

## oh-my-zsh 快速安装

教程：https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH

### 1. 安装 zsh

大部分系统默认没装 zsh（`zsh --version` 报 command not found、`echo $SHELL` 是 /bin/bash），先按发行版安装：

```shell
# 一并装好依赖：后续安装 oh-my-zsh、克隆插件都需要 git 和 curl
# Ubuntu / Debian
sudo apt update && sudo apt install -y zsh git curl
# CentOS / RHEL / Rocky / AlmaLinux
sudo yum install -y zsh git curl
# Fedora
sudo dnf install -y zsh git curl
# Arch / Manjaro（pacman 不支持部分升级，装包前先刷新整个系统）
sudo pacman -Syu zsh git curl
# openSUSE
sudo zypper install -y zsh git curl
# Alpine
sudo apk add zsh git curl
```

```shell
# 装完验证版本
zsh --version
```

### 2. 设为默认 shell

```shell
chsh -s $(which zsh)
# Fedora 可用
sudo lchsh $USER
# 注销重新登录或重启后生效，验证应输出 /usr/bin/zsh 或 /bin/zsh
echo $SHELL
```

### 3. 安装 oh-my-zsh

> 这是 oh-my-zsh 官方安装方式。介意直接管道执行远端脚本，可先把 install.sh 下载下来审阅再运行；gitee 为第三方镜像，仅在 GitHub 访问困难时用。

```shell
# 官方源（step 1 已装好 curl）
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# 国内（gitee 镜像）
sh -c "$(curl -fsSL https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh)"
```

### 4. 常用插件

```shell
# 命令自动补全
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# 语法高亮
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 编辑 ~/.zshrc 启用，再执行 source ~/.zshrc 生效
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

### 5. 配置主题

```shell
# 编辑 ~/.zshrc，主题见 https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="agnoster"

# 
source ~/.zshrc
```

> 更多主题见 [Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)，更多插件见 [Plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)。

报错 `rbenv_prompt_info: command not found: ruby`

plugins 里启用了 `rbenv ruby` 却没装对应环境时出现。不需要 ruby 就直接从 `~/.zshrc` 的 plugins 里去掉 `rbenv ruby`。确实要用 rbenv，分两步。

装 rbenv 本身（克隆方式各发行版通用）：

```shell
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
# 加入 PATH（写进 ~/.zshrc）
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
# 安装 ruby-build 插件
mkdir -p "$(rbenv root)"/plugins
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

`rbenv install` 是源码编译 ruby，要先装编译依赖（最小系统默认没有，缺了会编译失败；各发行版包名不同，其他系统见 [ruby-build wiki](https://github.com/rbenv/ruby-build/wiki#suggested-build-environment)）：

```shell
# Debian / Ubuntu
sudo apt install -y build-essential libssl-dev libreadline-dev zlib1g-dev libyaml-dev libffi-dev
# 依赖装好后再编译安装并设为全局
rbenv install -l        # 查看可装版本
rbenv install 3.0.0
rbenv global 3.0.0
ruby -v
```

## 📌 文件占用分析工具

```shell
# 交互式查看：ncdu 工具
sudo apt install ncdu  # Debian/Ubuntu
sudo yum install ncdu  # CentOS/RHEL
ncdu /
```

###  journal 日志永久上限改成 1GB 的最简单一键命令

会自动清理之前的

> 支持的系统（基本 100% 兼容，你的脚本能直接跑）
>
> - Ubuntu（从 15.04 开始，默认 systemd + journald）
> - Debian（从 Debian 8/Jessie 开始，默认 systemd）
> - Fedora（从 Fedora 15 开始就用 systemd，现在所有版本）
> - CentOS / Rocky Linux / AlmaLinux（从 CentOS 7 / RHEL 7 开始，默认 systemd + journald）
> - Arch Linux（默认 systemd）
> - openSUSE（Leap 和 Tumbleweed，默认 systemd）
> - Pop!_OS、Linux Mint（基于 Ubuntu，所以兼容）
> - Manjaro、EndeavourOS 等 Arch 衍生版
> - 大多数云服务器镜像（AWS、Azure、GCP 的 Ubuntu/Debian/Fedora/CentOS 镜像）
>
> 这些系统几乎都默认启用 journald 的持久日志（或至少支持创建 /var/log/journal），--vacuum-size=1G、--disk-usage 和 SystemMaxUse=1G 这些选项从 systemd 很早版本（大约 2014-2015 年后）就稳定支持了，现在的 systemd 版本都远超这个。不支持或部分不支持的系统（脚本会失败或无效）
>
> - Devuan（Debian 的无 systemd 分支，默认 sysvinit 或 openrc，没有 journald）
> - Gentoo（可以选择 systemd，但默认 OpenRC，没有 journald）
> - Alpine Linux（默认 OpenRC + busybox/syslog，没有 systemd）
> - Void Linux（默认 runit 或 OpenRC）
> - Slackware（传统 SysVinit）
> - PCLinuxOS、Artix Linux（明确避免 systemd）
> - 非常老的发行版（比如 CentOS 6、Ubuntu 14.04 之前），这些已经基本没人用了
>
> 怎么快速判断你的系统是否支持？跑这条命令就知道：
>
> ```bash
> systemctl status systemd-journald
> ```
>
> - 如果输出是 active (running)，并且有 journald 的信息 → 支持，脚本完美可用。
> - 如果说 "Unit systemd-journald.service could not be found." → 不支持 systemd-journald，这个脚本没用。
>
> 或者直接看：
>
> ```bash
> ls /etc/systemd/journald.conf
> ```
>
> 存在文件 → 支持。总结：如果你用的是主流的桌面/服务器 Linux（Ubuntu、Debian、Fedora、RHEL 系、Arch 等），是的，所有这些系统都可以直接用这个脚本，它已经是标准做法了。非 systemd 系统（少数 niche 发行版）才不行。如果你告诉我你的具体发行版和版本（比如 cat /etc/os-release 的输出），我可以 100% 确认兼容性～

```shell
sudo bash -c '
  echo "当前 journal 占用："
  journalctl --disk-usage
  echo -e "\n立即清理到 1GB 以内（如果已经超过）："
  journalctl --vacuum-size=1G
  echo -e "\n设置永久上限为 1GB（重启 journald 后生效）"
  mkdir -p /etc/systemd && \
  { grep -q "^SystemMaxUse" /etc/systemd/journald.conf 2>/dev/null || echo "" >> /etc/systemd/journald.conf; } && \
  sed -i "/^SystemMaxUse=/d" /etc/systemd/journald.conf && \
  echo "SystemMaxUse=1G" >> /etc/systemd/journald.conf && \
  systemctl restart systemd-journald && \
  echo -e "\n设置完成，新占用："
  journalctl --disk-usage
'

# 100mb
sudo bash -c '
  echo "当前 journal 占用："
  journalctl --disk-usage
  echo -e "\n立即清理到 100MB 以内（如果已经超过）："
  journalctl --vacuum-size=100M
  echo -e "\n设置永久上限为 100MB（重启 journald 后生效）"
  mkdir -p /etc/systemd && \
  { grep -q "^SystemMaxUse" /etc/systemd/journald.conf 2>/dev/null || echo "" >> /etc/systemd/journald.conf; } && \
  sed -i "/^SystemMaxUse=/d" /etc/systemd/journald.conf && \
  echo "SystemMaxUse=100M" >> /etc/systemd/journald.conf && \
  systemctl restart systemd-journald && \
  echo -e "\n设置完成，新占用："
  journalctl --disk-usage
'
```

## 📌 ssh 登录服务器

```shell
ssh -p 12333 root@${your ip}
# 使用密钥文件
ssh -i ~/work/data/id_rsa -p 22 root@{your ip}
```

## 低内存机器优化和监控

> 背景：2C2G 的机器跑了宝塔 + MySQL + 多个 docker 容器，内存长期紧张（swap 常驻 80%+）。某天突然整机僵死，SSH 连不上，连内核日志都写不出来，僵了 2 小时只能面板强制重启。原因是内存耗尽后进入 swap 颠簸（thrash），系统卡死但不会自己恢复。下面是排查方法和三项防护措施。

### 1. 排查卡死原因

机器重启后，先看上一次开机的日志在什么时间断掉。注意：断点只代表最后一次日志成功落盘的时间，僵死发生在这之后的某个时刻，只能定位下界，不是精确时间：

```shell
# 查看重启记录
last reboot -n 5

# 上一次开机的日志尾部（-b -1 表示上一次启动）
journalctl -b -1 --no-pager -n 100

# 搜索上一次开机期间的 OOM / 内核异常记录
journalctl -b -1 --no-pager | grep -iE "out of memory|oom-kill|hung task|blocked for more|kernel panic"
```

如果装了 sysstat（宝塔机器一般默认有），可以看卡死前每 10 分钟的负载、内存、swap 采样：

```shell
# saXX 是日期，比如 sa11 就是 11 号
ls /var/log/sysstat/

# 负载
LANG=C sar -q -f /var/log/sysstat/sa11 | tail -15
# 内存
LANG=C sar -r -f /var/log/sysstat/sa11 | tail -15
# swap 使用率（%swpused 长期 80%+ 就是内存悬崖）
LANG=C sar -S -f /var/log/sysstat/sa11 | tail -15
```

以下是参考信号，不是确定性结论，要结合多个信号交叉判断：

- 日志和 sar 采样在某个时间点后突然全断、且没有任何报错 → 偏向瞬间僵死（颠簸或内核 panic），但也可能只是日志子系统先死了而机器还在跑
- 有 `Out of memory: Killed process xxx` → 发生过 OOM 且内核自救了，说明内存长期紧张
- 有 `systemd-journald.service: Watchdog timeout` → 系统僵死过几分钟后侥幸缓过来，下次未必
- 看云厂商控制台的监控图（宿主机视角，机器僵死时仍可能有数据）：僵死时段 CPU 持续接近 100% 偏向 swap 颠簸；CPU 接近 0% 不能直接断定内核死了，宿主机暂停、监控采样缺口、虚拟化层故障都会表现成低 CPU，只能作为参考

### 2. earlyoom：内存耗尽前主动杀进程

内核自带的 OOM killer 触发太晚，触发前系统早已颠簸到无法操作。earlyoom 在用户态提前介入：内存和 swap 可用量同时低于 10% 时 SIGTERM 杀最大进程，低于 5% 时 SIGKILL。

```shell
apt install -y earlyoom
```

编辑 `/etc/default/earlyoom`，保护核心进程不被误杀：

```shell
EARLYOOM_ARGS="-r 3600 --avoid '(^|/)(init|systemd.*|sshd|dockerd|containerd.*)$'"
```

```shell
systemctl enable --now earlyoom
systemctl restart earlyoom

# 验证：能看到当前阈值和内存状态
journalctl -u earlyoom -n 5 --no-pager
```

注意不要把 mysqld、node 这类业务进程加进 avoid 列表——它们往往就是内存大头，杀掉再由 systemd / docker 重启策略拉起来，正是期望的行为。

### 3. 僵死自动重启兜底（watchdog + hung_task）

万一 earlyoom 没拦住、机器还是僵死了，需要兜底机制让它自动重启，而不是挂着等人工处理。注意：本节整体都是可选项，装它意味着接受"误触发时机器会自己硬重启"；不接受任何自动重启的话整节跳过，只用 earlyoom + zram。这里有两层，作用对象不同：

**第一层：systemd watchdog（主力，对症 swap 颠簸僵死）**

swap 颠簸时所有进程都在频繁短暂地等页换入，单个任务并不会连续阻塞很久，所以靠 hung_task 检测是抓不到的。watchdog 的语义不一样：systemd（PID 1）必须每隔一段时间"喂狗"，整机颠簸到连 PID 1 都得不到调度时，喂不上狗，看门狗直接强制重启——检测的是"整个系统失去响应"，正好对症。

```shell
# 加载软件看门狗模块并持久化
echo softdog > /etc/modules-load.d/softdog.conf
modprobe softdog

# systemd 120 秒内喂不上狗就重启
mkdir -p /etc/systemd/system.conf.d
printf "[Manager]\nRuntimeWatchdogSec=120\n" > /etc/systemd/system.conf.d/watchdog.conf
systemctl daemon-reexec

# 验证：应输出 RuntimeWatchdogUSec=2min，且日志里有 Using hardware watchdog 'Software Watchdog'
systemctl show -p RuntimeWatchdogUSec
journalctl -b | grep -i "software watchdog"
```

局限：softdog 依赖内核定时器还活着。内核完全死透（不响应任何中断）时 softdog 也救不了，只能靠云厂商宿主层面的监控或手动强制重启。

**第二层：hung_task panic（可选，激进，先看清代价再开）**

```shell
printf "kernel.hung_task_panic = 1\nkernel.hung_task_timeout_secs = 300\nkernel.panic = 10\n" > /etc/sysctl.d/99-hang-autoreboot.conf
sysctl --system

# 验证
sysctl kernel.hung_task_panic kernel.hung_task_timeout_secs kernel.panic
```

- `kernel.hung_task_panic = 1`：任何任务在 D 状态（不可中断阻塞）连续超过 `hung_task_timeout_secs` 直接 panic
- `kernel.hung_task_timeout_secs = 300`：默认 120 秒太激进，放宽到 300 秒减少误触发
- `kernel.panic = 10`：panic 后 10 秒自动重启

代价要想清楚：这个参数针对的是内核/IO 级 hang，不只是 OOM 场景。云盘抖动、网络文件系统卡顿、驱动问题导致任务连续阻塞超过阈值，都会被升级成整机硬重启（等效断电）。InnoDB 这类 crash-safe 的存储引擎能恢复，但仍有数据风险。无人值守的小机器上"卡死几小时"通常比"硬重启一次"更糟，可以开；对数据敏感、有人随时值守的机器，建议不开这层，只留 watchdog。

**彻底移除本节配置**（装过之后不想要了）：

```shell
rm -f /etc/sysctl.d/99-hang-autoreboot.conf /etc/systemd/system.conf.d/watchdog.conf /etc/modules-load.d/softdog.conf
sysctl -w kernel.hung_task_panic=0 kernel.hung_task_timeout_secs=120 kernel.panic=0
systemctl daemon-reexec
rmmod softdog

# 验证：依次应为 0、全 0 默认值、0
systemctl show -p RuntimeWatchdogUSec
sysctl kernel.hung_task_panic kernel.hung_task_timeout_secs kernel.panic
lsmod | grep -c softdog
```

### 4. zram：用压缩内存替代磁盘 swap

磁盘 swap 慢，颠簸时整机卡死；zram 在内存里划一块做压缩 swap（zstd 大约 3:1 压缩比），速度是磁盘的几十倍，颠簸时系统仍能响应。

```shell
apt install -y zram-tools
```

如果启动报 `Module zram not found`，是云厂商精简内核没带 zram 模块，补装当前内核的 extra 模块包：

```shell
apt install -y linux-modules-extra-$(uname -r)
modprobe zram
```

**重要的坑**：`linux-modules-extra-*` 是跟内核版本一一对应的。云镜像常用的 `linux-image-virtual-*` 元包升级内核时**不会**自动带上新版本的 extra 包，结果就是：内核自动升级（unattended-upgrades 的安全更新会升内核）→ 下次重启进入新内核 → zram 模块又没了 → zramswap 静默失效，机器退回纯磁盘 swap，没有任何报错提示。两种修法：

```shell
# 修法一（推荐）：换装 generic 元包，extra 模块以后随内核升级自动安装
# 说明：24.04 上 virtual 和 generic 元包装的是同一个 -generic 内核映像，
# 区别只在 generic 会连带 extra 模块和 linux-firmware（多占约 800MB 磁盘，虚拟机用不上但无害）
apt install -y linux-image-generic-hwe-24.04
# 移除 virtual 元包完成替换，避免双元包并存（只删元包，内核映像不会被删）
apt remove linux-image-virtual-hwe-24.04

# 验证：元包只剩 generic，且它依赖 modules-extra
dpkg -l | grep -E "linux-image-(virtual|generic)-hwe"
apt-cache depends linux-image-generic-hwe-24.04 | grep extra

# 修法二：维持 virtual 元包，每次内核升级后手动补装（容易忘，忘了就静默失效）
apt install -y linux-modules-extra-$(uname -r)
```

编辑 `/etc/default/zramswap`：

```shell
# 压缩算法
ALGO=zstd
# zram 大小为物理内存的 50%
PERCENT=50
# 优先级高于磁盘 swap（磁盘 swap 默认 -2），优先用 zram
PRIORITY=100
```

```shell
systemctl enable --now zramswap
systemctl restart zramswap

# 验证：能看到 /dev/zram0，PRIO 为 100
swapon --show
```

保留原磁盘 swap 作为溢出兜底即可，不用删。已经换出到磁盘 swap 的旧页不会立即迁移，新换出的页会优先进 zram，跑一段时间自然过渡。

### 5. 验证清单

```shell
systemctl is-active earlyoom zramswap   # 都是 active
swapon --show   # zram0 PRIO=100，磁盘 swap PRIO=-2
free -h
# 内核升级重启后要复查 zram 还在不在（virtual 元包的机器尤其注意）
lsmod | grep zram

# 以下仅当装了第 3 节的自动重启兜底才检查
systemctl show -p RuntimeWatchdogUSec   # 装了 watchdog 为 2min，没装为 0
sysctl kernel.hung_task_panic kernel.hung_task_timeout_secs kernel.panic   # 开了第二层为 1、300、10，没开为 0、120、0
lsmod | grep softdog
```

## 软件推荐

下面默认 Debian/Ubuntu（apt），其他发行版换包管理器即可。

### docker 日志轮转

docker 默认 json 日志无上限会吃满磁盘。编辑 `/etc/docker/daemon.json` 配全局上限（仅对之后新建的容器生效，旧容器需重建）。文件已有内容（如 registry-mirrors、data-root）就把下面两个键合并进去，别整体覆盖：

```json
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
```

```shell
sudo systemctl restart docker
```

### tmux —— 断线不丢会话

```shell
sudo apt install -y tmux
tmux          # 新建会话，跑长任务用它
# 按 Ctrl+b 再按 d 脱离，任务继续后台跑
tmux a        # 重新接回
```

### fail2ban —— 封 ssh 暴力破解

```shell
sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd   # 看封禁情况
```

### ufw —— 简单防火墙

```shell
sudo apt install -y ufw
# 先查当前 SSH 端口（改过端口的以此为准，默认 22）
sudo ss -tlnp | grep -i ssh
# 放行查到的 SSH 端口，把 <SSH端口> 换成实际值（用面板的再放行面板端口 <面板端口>）
sudo ufw allow <SSH端口>/tcp
# 启用前用 show added 确认放行规则已添加（未启用时 status 只显示 inactive、看不到规则），否则会把自己锁在门外
sudo ufw show added
sudo ufw enable
sudo ufw status   # 启用后查看生效规则
```

> fail2ban / ufw 与宝塔自带的防火墙、防爆破重叠，用宝塔就别再装，免得规则打架。

### mtr —— 网络丢包/路由诊断

```shell
sudo apt install -y mtr
mtr example.com   # 实时看每一跳的延迟和丢包
```

### nethogs —— 看哪个进程在吃带宽

```shell
sudo apt install -y nethogs
sudo nethogs
```

### iotop —— 看哪个进程在做 IO

```shell
sudo apt install -y iotop
sudo iotop -o     # 只显示有 IO 的进程
```

### vnstat —— 流量统计

```shell
sudo apt install -y vnstat
vnstat            # 看日/月流量
```

### btop —— 资源监视器（htop 升级版）

```shell
sudo apt install -y btop
btop
```

### ctop —— 容器版 top

```shell
# 已装 docker，直接用镜像跑，免安装
docker run --rm -ti -v /var/run/docker.sock:/var/run/docker.sock quay.io/vektorlab/ctop
```

### fzf —— 模糊查找（配合 zsh）

```shell
sudo apt install -y fzf
# oh-my-zsh 用户把 fzf 加进 ~/.zshrc 的 plugins，自动启用：Ctrl+R 搜历史、Ctrl+T 搜文件
```

## 配置 ssh 密钥文件登录

需要检查密钥文件是否存在，请运行`ls`命令`ls -l ~/.ssh/id_*.pub`检查是否存在。

### 1. 制作密钥对

首先在服务器上制作密钥对。首先用密码登录到你打算使用密钥登录的账户，然后执行以下命令：

```shell
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```

```
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): <== 按 Enter
Created directory '/root/.ssh'.
Enter passphrase (empty for no passphrase): <== 输入密钥锁码，或直接按 Enter 留空
Enter same passphrase again: <== 再输入一遍密钥锁码
Your identification has been saved in /root/.ssh/id_rsa. <== 私钥
Your public key has been saved in /root/.ssh/id_rsa.pub. <== 公钥
The key fingerprint is:
0f:d3:e7:1a:1c:bd:5c:03:f1:19:f1:22:df:9b:cc:08 root@host
```

密钥锁码在使用私钥时必须输入，这样就可以保护私钥不被盗用。当然，也可以留空，实现无密码登录。

现在，在 root 用户的家目录中生成了一个 .ssh 的隐藏目录，内含两个密钥文件。id_rsa 为私钥，id_rsa.pub 为公钥。

### 2. 在服务器上安装公钥

现在您本地 Ubuntu 计算机有了 SSH 密钥，下一步是将公用密钥复制到要管理的远程服务器。

将公钥复制到服务器的最简单和建议的方法是使用`ssh-copy-id`命令。运行命令`ssh-copy-id server_username@server_ip_address`即可复制远程服务器。

`server_username`是远程服务器用户的名称，`server_ip_address`是你的服务器 IP 地址。系统将提示您输入远程用户密码。

通过身份验证后，公钥`~/.ssh/id_rsa.pub`将追加到远程用户`~/.ssh/authorized_keys`文件中，然后 ssh-copy-id 将会退出。

并且提示你可以运行命令`ssh 'username@server_ip_address'`登录到远程服务器。

```bash
ssh-copy-id remote_username@server_ip_address
remote_username@server_ip_address's password:
```

如果由于某些原因您的本地计算机上没有`ssh-copy-id`实用程序，请使用以下命令复制公钥。

```bash
cat ~/.ssh/id_rsa.pub | ssh remote_username@server_ip_address "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'username@server_ip_address'"
and check to make sure that only the key(s) you wanted were added.
```

完成上述步骤后，您应该能够免密码登录到远程服务器。要测试它，请尝试通过 SSH 登录到服务器。

键入以下命令，在服务器上安装公钥：

```
[root@host ~]$ cd .ssh
[root@host .ssh]$ cat id_rsa.pub >> authorized_keys
```

如此便完成了公钥的安装。为了确保连接成功，请保证以下文件权限正确：

```shell
[root@host .ssh]$ chmod 600 authorized_keys
[root@host .ssh]$ chmod 700 ~/.ssh
# Ubuntu ssh免密配置之后仍然需要输入密码
chmod go-w ~/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### 3. 设置 SSH，打开密钥登录功能

编辑 /etc/ssh/sshd_config 文件，进行如下设置：

```
RSAAuthentication yes
PubkeyAuthentication yes
```

另外，请留意 root 用户能否通过 SSH 登录：

```
PermitRootLogin yes
```

当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录：

```
PasswordAuthentication no
```

最后，重启 SSH 服务：

```shell
# RHEL/CentOS系统
service sshd restart
# Ubuntu系统
service ssh restart
# Debian系统
/etc/init.d/ssh restart
```

## 云服务器开启 root SSH 登录（AWS EC2 / Debian 13）

云镜像（AWS / GCP 等）默认禁止 root 直接登录：root 的 authorized_keys 里塞了一行「请用普通用户登录」的拦截命令；密码认证也被 `/etc/ssh/sshd_config.d/50-cloud-init.conf` 关掉了。下面用 drop-in 文件覆盖，sshd 对同名选项是「第一个出现的值生效」，所以文件名用 `00-` 前缀排到最前。

默认登录用户：Debian 是 `admin`，Ubuntu 是 `ubuntu`，Amazon Linux 是 `ec2-user`。

### 1. 先用默认用户登录

```bash
# 本地 WSL：/mnt/c 挂载盘不能正确 chmod，先把密钥拷到家目录
mkdir -p ~/.ssh
cp /mnt/c/Users/<用户名>/Downloads/your-key.pem ~/.ssh/your-key.pem
chmod 400 ~/.ssh/your-key.pem

# Debian 默认用户是 admin
ssh -i ~/.ssh/your-key.pem admin@<公网IP>
```

### 2. 开启 root 密钥登录

```bash
# 先看 root 现有的 authorized_keys：全新云机器里应只有一行「请用 admin 登录」的拦截命令
# 若出现你不认识的其他管理密钥，先查清来源，别直接覆盖，否则会锁掉其他管理员
sudo cat /root/.ssh/authorized_keys 2>/dev/null

# 只给 root 授予「你这把登录密钥」的公钥，不要整份复制 admin 的 authorized_keys
# （admin 里若有协作者 key、临时 key，整份复制会把它们一并提权成 root，属于权限扩张）
# 在本地（有 .pem 的机器）从私钥导出这把公钥，复制下面命令的输出备用：
ssh-keygen -y -f ~/.ssh/your-key.pem

# 回到服务器：备份原文件，再把上一步导出的那一行公钥写给 root（覆盖掉拦截行）
sudo install -d -m 700 /root/.ssh
sudo cp /root/.ssh/authorized_keys /root/.ssh/authorized_keys.bak 2>/dev/null
echo '把上一步导出的公钥整行粘贴到这里' | sudo tee /root/.ssh/authorized_keys
sudo chmod 600 /root/.ssh/authorized_keys
sudo chown -R root:root /root/.ssh
# 非全新机器想保留 root 原有密钥：先删掉拦截行，再只追加这一把公钥
# 不能只 tee -a 追加而不删拦截行：拦截行绑定的多是同一把公钥且排在前面，SSH 逐行匹配会先
# 命中它的 forced command 把登录拦掉，追加在后面的干净公钥根本轮不到，root 照样登不上
# sudo sed -i '/Please login as/d' /root/.ssh/authorized_keys
# echo '把导出的公钥整行粘贴到这里' | sudo tee -a /root/.ssh/authorized_keys

# 允许 root 用密钥登录，prohibit-password = 只允许密钥、禁止密码
echo 'PermitRootLogin prohibit-password' | sudo tee /etc/ssh/sshd_config.d/00-permit-root.conf

# 测试语法没问题再重启（Debian 服务名是 ssh 不是 sshd）
sudo sshd -t
sudo systemctl restart ssh
```

### 3. 开启 root 密码登录（可选，不推荐公网开放）

```bash
# 给 root 设密码（按提示输两遍）
sudo passwd root

# 同时允许 root 登录 + 密码认证，覆盖 50-cloud-init.conf 的 PasswordAuthentication no
sudo tee /etc/ssh/sshd_config.d/00-permit-root.conf <<'EOF'
PermitRootLogin yes
PasswordAuthentication yes
EOF

sudo sshd -t
sudo systemctl restart ssh
```

### 4. 验证

```bash
# sshd -T 看最终生效值（比 grep 文件可靠），期望值取决于你做到哪一步：
# 只做到第 2 步：permitrootlogin prohibit-password、passwordauthentication no
# 做到第 3 步  ：permitrootlogin yes、passwordauthentication yes
sudo sshd -T | grep -iE 'permitrootlogin|passwordauthentication'

# 保持当前会话别关，另开终端测试

# 验证第 2 步：密钥登录 root
# 加 IdentitiesOnly=yes 让客户端只认 -i 这把 key，否则它还会把 ssh-agent 里已加载的其它 key
# 一起递上去；万一 root 接受了别的 key 也会登录成功，就证明不了刚写进去的 your-key.pem 真可用
ssh -o IdentitiesOnly=yes -i ~/.ssh/your-key.pem root@<公网IP>

# 验证第 3 步：密码登录 root
# 必须强制禁用公钥，否则本机密钥/agent 会优先命中走公钥，看似成功实则测不出密码是否真生效
ssh -o PubkeyAuthentication=no -o PreferredAuthentications=password root@<公网IP>
```

注意：

- 公网开放 root + 密码是爆破首要目标，密码要足够长随机，并装 fail2ban（见「软件推荐」）。
- 临时用完建议把 `PasswordAuthentication` 改回 `no` 再 `systemctl restart ssh`。
- 连不上先查安全组/防火墙是否放行 22 端口。

## 📌 ubuntu

### 常用工具包

```shell
# 安装工具包（含推荐运维工具，用法见「软件推荐」一节）
apt update || true && apt install cpufrequtils -y || true && apt install nano -y || true && apt install mdadm -y || true && apt install vim -y || true && apt install isc-dhcp-server -y || true && apt install numactl -y || true && apt install lm-sensors -y || true && apt install htop -y || true && apt install dmidecode -y || true && apt install iputils-ping -y || true && apt install aria2 -y || true && apt install sysbench -y || true && apt install parted -y || true && apt install parallel -y || true && apt install tmux -y || true && apt install mtr -y || true && apt install nethogs -y || true && apt install iotop -y || true && apt install vnstat -y || true && apt install btop -y || true && apt install fzf -y || true
```

没用宝塔等面板的机器建议装 fail2ban（防 ssh 爆破）、ufw（防火墙）；用面板的别装，会和面板规则重叠。注意：只装不会生效，启用和配规则见「软件推荐」一节：

```shell
apt install fail2ban -y || true && apt install ufw -y || true
```

### aria2 快速多线程下载

```shell
# 多线程下载（16个连接）
aria2c -x 16 -s 16 "文件直链"
```

### ubuntu 24.04 LTS 换软件源（针对大陆）

1. 首先，备份原有的源文件：

   ```shell
   sudo cp /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak
   ```

2. 使用 vim 编辑源文件：

   ```shell
   sudo vim /etc/apt/sources.list.d/ubuntu.sources
   ```

3. 进入 vim 后，按 `i` 键进入插入模式，然后删除所有现有内容（可以用 `gg` 移到文件开头，然后 `dG` 删除到文件末尾）。

4. 粘贴以下内容（以清华大学镜像源为例）：

   ```vim
   Types: deb deb-src
   URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
   Suites: noble noble-updates noble-backports noble-security
   Components: main restricted universe multiverse
   Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

   Types: deb deb-src
   URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
   Suites: noble-proposed
   Components: main restricted universe multiverse
   Enabled: no
   Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
   ```

5. 保存并退出编辑器（如果使用nano，按Ctrl+X，然后按Y，最后按Enter）。

6. 更新软件包列表：

   ```shell
   sudo apt update
   ```

7. 升级软件包：

   ```shell
   sudo apt upgrade
   ```

其他常用的国内镜像源：

- 阿里云：将 URIs 中的地址改为 `https://mirrors.aliyun.com/ubuntu/`
- 中科大：将 URIs 中的地址改为 `https://mirrors.ustc.edu.cn/ubuntu/`
- 网易：将 URIs 中的地址改为 `https://mirrors.163.com/ubuntu/`

注意：

1. 确保使用 "noble" 作为版本代号，因为您使用的是 Ubuntu 24.04 LTS。
2. 如果您希望启用 proposed 仓库，可以将最后一个条目中的 `Enabled: no` 改为 `Enabled: yes`。但请注意，proposed 仓库包含未经充分测试的更新，可能会导致系统不稳定。

### 挂载硬盘

### ubuntu 查看端口被占用并处理

```shell
netstat -tunlp | grep 端口号
```

- -t (tcp) 仅显示 tcp 相关选项
- -u (udp)仅显示 udp 相关选项
- -n 拒绝显示别名，能显示数字的全部转化为数字
- -l 仅列出在 Listen(监听)的服务状态
- -p 显示建立相关链接的程序名

如查看\*\*端口，也可以在终端中输入：

```shell
lsof -i:**
```

若要停止使用这个端口的程序，使用 kill +对应的 pid

```shell
kill pid
```

### ubuntu22.4 开启 root 登录

```shell
# 修改 ssh 配置
sudo nano /etc/ssh/sshd_config
# 至少保证
Port 22
PermitRootLogin yes
PasswordAuthentication yes
UsePAM yes
# 修改完成按 ctrl+o 然后 enter 保存 然后 ctrl+x 退出
# 重启 ssh 服务
sudo systemctl restart ssh
# 或者
sudo systemctl restart ssh.socket

# Ubuntu 24 默认用 systemd socket 激活 sshd
sudo systemctl stop ssh.socket
sudo systemctl disable ssh.socket
sudo systemctl enable ssh.service
sudo systemctl restart ssh.service
```

### 更改 ssh 端口

```shell
# 修改 ssh 配置
sudo nano /etc/ssh/sshd_config
# 至少保证
Port 22

# 修改完成按 ctrl+o 然后 enter 保存 然后 ctrl+x 退出
# 重启 ssh 服务
sudo systemctl restart ssh
# 或者
sudo systemctl restart ssh.socket

# Ubuntu 24 默认用 systemd socket 激活 sshd
sudo systemctl stop ssh.socket
sudo systemctl disable ssh.socket
sudo systemctl enable ssh.service
sudo systemctl restart ssh.service
# 禁止远程登录 root 用户
# 将 PermitRootLogin 改为 PermitRootLogin no
```

### 修改 root 密码

```shell
sudo passwd root
# 可以和 ubuntu 密码一致，也可以修改 (密码会让你输入两次)
# 修改 ssh 配置
sudo vi /etc/ssh/sshd_config
# 修 改 PermitRootLogin 进入 ssh 配置界面后找到 PermitRootLogin，将它后面改为 yes，保存 (按 i 进入编辑模式，编辑完 esc 退出，:w 保存当前文件，:q 退出)
# 重启 ssh 服务
sudo service ssh restart
```

### 连接虚拟机中的 ubuntu

```shell
# 1 安装ssh
sudo apt-get install openssh-server
# 2 启动ssh服务和确认
sudo /etc/init.d/ssh start
# 3 确认ssh服务启动
ps -e | grep ssh
```

## 📌 查看 LINUX 发行版本名和版本号

2017-01-16

最近跟合作方支付公司（一个北京的互联网支付公司，就不具体提名字啦）沟通的时候，需要对方生成非对称加密密钥公钥提供给我方，对方技术是个妹子。不懂怎么在预发／生产机器上面生成加密算法的公私钥，也不知道怎么查看系统版本。属于一问三不知类型，怎么办～ 我也只能打电话过去一步步手把手教如何查看发行版，如何安装命令，如何生成对应的公私钥。下面讲讲如何查看系统发行版和版本号。

查看 LINUX 发行版的名称及其版本号的命令,这些信息对于添加正确的软件更新源很有用，而当你只能在命令行下工作的时候，下面的方法可以帮忙。

### 一、查看 Linux 内核版本命令（两种方法）：

1、`cat /proc/version`

```
[root@localhost ~]# cat /proc/version
Linux version 2.6.18-194.8.1.el5.centos.plus
(mockbuild@builder17.centos.org) (gcc version 4.1.220080704
(Red Hat 4.1.2-48)) #1 SMP Wed Jul 7 11:50:45 EDT 2010
```

2、`uname -a`

```
[root@localhost ~]# uname -a
Linux localhost.localdomain 2.6.18-194.8.1.el5.centos.plus
#1 SMP Wed Jul 7 11:50:45 EDT 2010 i686 i686 i386 GNU/Linux
```

### 二、查看 Linux 系统版本的命令（3 种方法）：

1、`lsb_release -a`，即可列出所有版本信息：

```
[root@localhost ~]# lsb_release -a
LSB Version: :core-3.1-ia32:core-3.1-noarch:graphics-3.1-ia32:graphics-3.1-noarch
Distributor ID: CentOS
Description: CentOS release 6.5 (Final)
Release: 6.5
Codename: Final
```

这个命令适用于所有的 Linux 发行版，包括 Redhat、SuSE、Debian…等发行版。2、`cat /etc/redhat-release`，这种方法只适合 Redhat 系的 Linux：

```
[root@localhost ~]# cat /etc/redhat-release
CentOS release 6.7 (Final)
```

3、`cat /etc/issue`，此命令也适用于所有的 Linux 发行版。

```
[root@localhost ~]# cat /etc/issue
CentOS release 6.7 (Final)
Kernel \r on an \m
```

## 📌 Ubuntu 更新软件和系统

apt-get update: 升级安装包相关的命令,刷新可安装的软件列表(但是不做任何实际的安装动作)

apt-get upgrade: 进行安装包的更新(软件版本的升级)

apt-get dist-upgrade: 进行系统版本的升级(Ubuntu 版本的升级)

do-release-upgrade: Ubuntu 官方推荐的系统升级方式,若加参数-d 还可以升级到开发版本,但会不稳定

## 📌 申请通配符证书

安装 certbot

![certbot](https://static.yoouu.cn/static/imgs/doc/back-end/linux/1186922-0d4dbd223901c210.png)

```bash
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install certbot
```

### 申请证书

```bash
sudo certbot certonly --manual -d example.com -d *.example.com --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```

例如

```bash
sudo certbot certonly --manual -d yoouu.cn -d *.yoouu.cn --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```

按照提示设置 DNS 解析

![DNS解析](https://static.yoouu.cn/static/imgs/doc/back-end/linux/1186922-365bfd53bc81a30f.png)

### Nginx 配置

```dart
server {
    listen      80;
    server_name example.com;
    return      301     https://$server_name$request_uri;
}

server {
    listen      443 ssl;
    server_name example.com;

    charset     utf-8;

    add_header X-Content-Type-Options nosniff;

    ssl on;
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

}
```
