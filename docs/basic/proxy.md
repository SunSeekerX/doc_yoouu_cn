# 代理设置大全

记录下开发需要用到的网络代理设置。

## Git

```shell
# clash
git config --global http.proxy http://localhost:7890
git config --global https.proxy https://localhost:7890

# 恢复
git config --global --unset http.proxy
git config --global --unset https.proxy

# 如果发现取消代理的命令不生效，可以用以下命令查看全局配置信息
git config --global -l
# 编辑全局配置，会启动编辑器，你可以手动去除代理信息
git config --global -e
```

## Windows

```powershell
# 设置代理
netsh winhttp set proxy 127.0.0.1:1080
# 取消代理
netsh winhttp reset proxy
# 查看代理
netsh winhttp show proxy
```

### PowerShell

```powershell
# clash 复制 power shell
$Env:http_proxy="http://127.0.0.1:7890";$Env:https_proxy="http://127.0.0.1:7890"

# v2ray
$Env:http_proxy="http://127.0.0.1:10809";$Env:https_proxy="http://127.0.0.1:10809"
```

### CMD

```shell
# clash 复制 cmd
set http_proxy=http://127.0.0.1:7890 & set https_proxy=http://127.0.0.1:7890
# v2ray
set http_proxy=http://127.0.0.1:10809 & set https_proxy=http://127.0.0.1:10809
```

### WSL

首先在 powershell 查看 wsl 网卡信息

```powershell
ipconfig /all
```

把下面的 ip 改成 wsl 的网卡 ip 地址

```shell
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

## Mac 

### shell

```shell
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

## Linux

### curl

```shell
curl x 127.0.0.1:7890 -L https://foundry.paradigm.xyz | bash
```

### 修改 dns

在 WSL2 中修改 DNS 设置需要进行以下步骤：

1. 打开 Ubuntu WSL2 终端，并编辑`/etc/resolv.conf`文件：

   ```
   sudo nano /etc/resolv.conf
   ```

2. 在打开的文件中，将 nameserver 修改为您想要使用的 DNS 服务器的 IP 地址。例如，如果您想使用 Google 的 DNS 服务器，则可以将其修改为：

   ```
   nameserver 8.8.8.8
   nameserver 8.8.4.4
   ```

3. 保存并关闭文件。

4. 确认修改是否生效。运行以下命令来检查当前使用的 DNS 服务器：

   ```
   nslookup google.com
   ```

   如果返回的 IP 地址与您设置的 DNS 服务器相同，则说明修改已经生效。

## NodeJS

### npm

```shell
# 设置代理
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
# 取消代理
npm config delete proxy
npm config delete https-proxy
```

## ProxyChains-NG 安装与使用

安装

```shell
git clone https://github.com/rofl0r/proxychains-ng.git
./configure --prefix=/usr --sysconfdir=/etc
make
# 以下命令非 root 用户注意使用 sudo 命令
make install
make install-config
# ubuntu
sudo apt install proxychains4
```

配置

编辑 `/etc/proxychains.conf`, 在最后一行改为:

```
socks5 127.0.0.1 7890
```

使用

```shell
proxychains4 curl -L https://foundry.paradigm.xyz | bash
```

## Android studio

Android 开发中我们会用到两种模式，一种是直接 IDE 编译运行，一种是直接在命令行运行，两种场景下的代理配置并不一致。其中在命令行下运行时的代理配置与 shell 下的一致，因此不再专门介绍，仅仅介绍 IDE 的环境变量配置。

### gradle

Android studio 提供了 IDE 全局的环境变量的配置模式，就在 Appearance & Behavior > System Settings > HTTP Proxy 中，由于这个配置是全局的，因此开发中并不是很方便，主要表现在：

- 不同的项目可能不一定需要配置代理，或者需要的代理并不一致
- 如果项目有多个开发者，每个开发者都需要配置一次

具体的就是在项目的根目录的 gradle.properties 中添加如下的配置：

这里需要注意的是，很多 android 的 maven 依赖都是使用 https 的，因此不要仅仅配置 http 相关的代理，需要同时配置 https 的

```groovy
systemProp.http.proxyHost='proxy.com'
systemProp.http.proxyPort='8080'
# 过滤不使用代理的域名
systemProp.http.nonProxyHosts=*.bihe0832.com
systemProp.https.proxyHost='proxy.com'
systemProp.https.proxyPort='8080'
# 过滤不使用代理的域名
systemProp.https.nonProxyHosts=*.bihe0832.com
```

## pip 代理设置

正如前面提到的，在某些情况下会出现 shell 配置了代理，但是并没有生效的情况。例如 pip，这里介绍一下 pip 设置代理的方法，比如我们安装 Appium-Python-Client。

#### 代理设置

如果在安装时需要代理，只需要在命令参数中加上`--proxy`参数，例如：

```shell
➜  temp  pip3.7 install Appium-Python-Client --proxy http://127.0.0.1:8080
```

如果在安装时不需要代理，只需要在命令参数中去除`--proxy`参数，例如：

```shell
➜  temp  pip3.7 install Appium-Python-Client
```

#### 修改 pip 的镜像源

由于国外官方 pypi 经常被墙，所以我们最好是将自己使用的 pip 源更换一下。iMac 下，修改 ~/.pip/pip.conf (没有就创建一个)内容如下:

```shell
 [global]
 index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

## gem 代理设置

正如前面提到的，在某些情况下会出现 shell 配置了代理，但是并没有生效的情况。例如 gem，这里介绍一下 gem 设置代理的方法，比如我们安装 github-pages。

#### 代理设置

如果在安装时需要代理，只需要在命令参数中加上`--http-proxy`参数，例如：

```shell
➜  temp  gem install --http-proxy http://proxy.com:8080 github-pages

# 示例
# sudo gem install cocoapods --http-proxy http://127.0.0.1:7890
```

如果在安装时不需要代理，只需要在命令参数中去除`--http-proxy`参数，例如：

```shell
➜  temp  gem install github-pages
```

#### 修改镜像

除了通过配置代理来访问资源外，我们还可以通过直接修改 gem 的镜像源地址。这样即使不用代理也可访问。gem 源的修改方法如下：

```shell
➜  temp  gem source --add <new registry url>  --remove  <new registry url>
```

具体示例如下：

```shell
➜  temp  gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
➜  temp  gem sources -l
/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/universal-darwin17/rbconfig.rb:214: warning: Insecure world writable dir /Users/hardyshi/lib/android-sdk in PATH, mode 040777
*** CURRENT SOURCES ***

https://gems.ruby-china.org
```

如果修改镜像，建议只保留一个即可，其余的都删除，然后根据剩余的镜像确定是否使用代理，这样会大大提升效率。你也可以直接修改`~/.gemrc`，添加镜像源。示例如下：

```shell
➜  ~  cat ~/.gemrc
---
:backtrace: false
:bulk_threshold: 1000
:sources:
- https://gems.ruby-china.com/
:update_sources: true
:verbose: true
```

#### 本地安装

当然，gem 除了设置代理或者直接修改镜像以外, 还可以直接本地安装，比如我们要安装 github-pages, 先到 [https://gems.ruby-china.org](https://gems.ruby-china.org/) 或者其余镜像源把 github-pages 下载到本地, 然后在本地安装:

```shell
➜  temp  gem install --local ~/temp/github-pages-localname.gem
```
