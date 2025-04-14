## 构建内核

内核源码地址 https://github.com/MotorolaMobilityLLC/kernel-msm/releases/tag/MMI-S1RXS32.50-13-10

先 clone

然后找个教程编译出来内核先

```shell
# 创建文件夹路径，不要到 Windows 下路径操作因为会有大小写不敏感的问题，这个仓库有同名文件大小写不一样的
mkdir -p ~/work
cd ~/work
# 克隆项目
git clone https://github.com/MotorolaMobilityLLC/kernel-msm
cd kernel-msm
# 切换到 xpeng 分支
git checkout MMI-S1RXS32.50-13-10
# 新建开发分支
git switch -c dev_xpeng
# 然后用 vscode 搭配 wsl 插件就行修改
# 安装需要的工具包
sudo apt-get install git ccache automake flex lzop bison gperf build-essential zip curl zlib1g-dev g++-multilib libxml2-utils bzip2 libbz2-dev libbz2-1.0 libghc-bzlib-dev squashfs-tools pngcrush schedtool dpkg-dev make optipng maven libssl-dev pwgen libswitch-perl policycoreutils minicom libxml-sax-base-perl libxml-simple-perl bc libc6-dev-i386 libx11-dev lib32z-dev libgl1-mesa-dev xsltproc unzip device-tree-compiler python3 zstd libc6 binutils libc6-dev-i386 gcc g++ p7zip p7zip-full -y
# 创建目录
mkdir -p Kernel && mkdir -p Gcc && mkdir -p Clang
# 获取 LLVM
wget github.com/llvm/llvm-project/releases/download/llvmorg-19.1.0/LLVM-19.1.0-Linux-X64.tar.xz
# 解压
mkdir Clang/clang-llvm && tar -C Clang/clang-llvm/ -xvf LLVM-19.1.0-Linux-X64.tar.xz --strip-components
# 上面的用不了提示 --strip-components 需要一个参数
mkdir Clang/clang-llvm && tar -C Clang/clang-llvm/ -xvf LLVM-19.1.0-Linux-X64.tar.xz
```

编译 Android 官方内核（GKI）练手

本教程基于 [Android 官方文档](https://source.android.com/docs/setup/build/building-kernels?hl=zh-cn)，目标是编译 AOSP 提供的通用内核映像（Generic Kernel Image, GKI），适用于运行 Android 的设备，例如模拟器或支持 GKI 的手机。

执行环境

- 操作系统: Ubuntu 24.04
- Shell: zsh 5.9 (x86_64-ubuntu-linux-gnu)

1. 安装依赖工具

   更新系统并安装编译内核所需的工具包。

```bash
sudo apt update
sudo apt install git gnupg flex bison build-essential zip curl zlib1g-dev \
gcc-multilib g++-multilib libc6-dev-i386 libncurses-dev \
x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils \
xsltproc unzip python3 bc
```

验证工具是否正确安装：

```bash
git --version
make --version
python3 --version
```

2. 安装 Repo 工具

Repo 是 Android 源码管理的工具，需手动下载并配置。

```bash
mkdir ~/bin
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

3. 创建工作目录

为内核源码创建一个专门的目录。

```bash
mkdir -p ~/work/google_android_kernel
cd ~/work/google_android_kernel
```

4. 配置 Git

设置 Git 的用户信息，用于版本控制。

```bash
git config --global user.name "root"
git config --global user.email "root@outlook.com"
```

5. 下载 AOSP 内核源码

使用 Repo 下载 Android 内核源码，这里以 common-android13-5.10 分支为例。

```bash
repo init -u https://android.googlesource.com/kernel/manifest -b common-android13-5.10
repo sync
```

6. 编译 GKI 内核

为 aarch64 平台构建通用内核映像（GKI）。

```bash
BUILD_CONFIG=common/build.config.gki.aarch64 build/build.sh
```

注意事项

- 确保网络连接稳定，repo sync 可能需要较长时间下载源码。
- 如果需要为其他平台编译，替换 build.config.gki.aarch64 为对应的配置文件。
- 编译完成后，内核映像通常位于 out/ 目录下。

编译 Android 官方的内核练手

官方教程 https://source.android.com/docs/setup/build/building-kernels?hl=zh-cn

我们将编译 AOSP 提供的通用内核（Generic Kernel Image, GKI），它适用于运行 Android 的设备，比如模拟器或支持 GKI 的手机。

执行环境 

Ubuntu 24.04

zsh zsh 5.9 (x86_64-ubuntu-linux-gnu)

```shell
# 安装需要的工具
sudo apt update
sudo apt install git gnupg flex bison build-essential zip curl zlib1g-dev \
gcc-multilib g++-multilib libc6-dev-i386 libncurses-dev \
x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils \
xsltproc unzip python3 bc
# 检查安装
git --version
make --version
python3 --version
# 安装 Repo 工具
mkdir ~/bin
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
# 新建一个目录用来放内核源码
mkdir -p ~/work/google_android_kernel && cd ~/work/google_android_kernel
# 记得配置下 git 信息
git config --global user.name "root"
git config --global user.email "root@outlook.com"
# 下载 AOSP 内核源码
repo init -u https://android.googlesource.com/kernel/manifest -b common-android13-5.10
repo sync
# 运行以下命令编译出来一个通用的内核，如需为 aarch64 平台构建 GKI 内核，请运行以下命令：
BUILD_CONFIG=common/build.config.gki.aarch64 build/build.sh
```

## 线刷包下载地址

XT2175-2_XPENG_RETCN_12_S3RXC32.33-8-25_subsidy-DEFAULT_regulatory-DEFAULT_CFC.xml

https://mirrors.lolinet.com/firmware/lenomola/2021/xpeng_retcn/official/RETCN/

https://support.hiunlock.com/index.php?a=downloads&b=file&id=17565

安装教程

https://wiki.lineageos.org/devices/xpeng/



官方包线刷教程 https://bbs.letitfly.me/d/1210/2

再来下载 Tiny Fastboot Script 固件刷写工具，EN 为英文版，CN 为简体中文版。如果你的 Windows 操作系统不是简体中文环境，请使用英文版。

[点击这里访问下载目录](https://mirrors.lolinet.com/software/windows/TinyFastbootScript/)

下载完之后，将 Tiny Fastboot Script 内的 tools 和 flash.bat 解压到和固件一致的目录，如下图所示：

完成之后，直接打开 flash.bat，无需使用管理员权限，输入 1 后回车。

通常情况下，跨地区固件刷写只需要输入 1 后按回车即可。刷写完成之后，请输入 6 回车重置手机，然后重启手机。



官方系统安装 root 注意

需要安装 v27 版本的 magisk 然后在 app 升级到 v28