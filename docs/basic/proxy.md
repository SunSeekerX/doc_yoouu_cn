# 代理设置大全

记录下开发需要用到的网络代理设置。

## Openwrt

MIUIGMS 谷歌服务补全计划: https://blog.minamigo.moe/archives/1022

中国大陆 FCM Hosts Magisk模块: https://blog.minamigo.moe/archives/201

~~openclash 谷歌商店无法下载，openclash 设置添加绕过中国大陆 IPv4 黑名单~~

```
##解决绕过大陆后谷歌商店无法更新
services.googleapis.cn
googleapis.cn
xn--ngstr-lra8j.com
```

~~覆写设置 规则设置~~

```
- DST-PORT,22,DIRECT
- DOMAIN-SUFFIX,okx.com,proxy
- DOMAIN-SUFFIX,xn--ngstr-lra8j.com,proxy
- DOMAIN-SUFFIX,googleapis.cn,proxy
- DOMAIN-SUFFIX,services.googleapis.cn,proxy
```

## Git

```shell
# clash
git config --global http.proxy http://localhost:7890
git config --global https.proxy https://localhost:7890

git config --global http.proxy http://localhost:10809
git config --global https.proxy https://localhost:10809

# 恢复
git config --global --unset http.proxy
git config --global --unset https.proxy

# 如果发现取消代理的命令不生效，可以用以下命令查看全局配置信息
git config --global -l
# 编辑全局配置，会启动编辑器，你可以手动去除代理信息
git config --global -e
```

ssh clone 代理

找到你的 ssh 配置文件，没有就新建，例如 Windows -> C:\Users\your-username\\.ssh\config

```
ProxyCommand connect -S 127.0.0.1:7890 -a none %h %p

...others
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

### Clash

https://blog.gakki.icu/linux/55

Clash 是一款免费的代理软件，可以帮助我们实现科学上网。在 Ubuntu 系统中安装和配置 Clash 代理非常简单，只需要按照以下步骤操作即可。

#### 下载 clash

> 具体版本自行前往 [github](https://github.com/Dreamacro/clash/releases) 下载。

```shell
#下载并重命名为clash.gz
wget -O clash.gz https://github.com/Dreamacro/clash/releases/download/v1.13.0/clash-linux-amd64-v1.13.0.gz
```

#### 安装 clash

```shell
gunzip -d clash.gz #将下载的clash.gz解压缩(解压缩后的文件名为clash)
sudo chmod +x clash #给文件执行权限
sudo mkdir /opt/clash #创建/opt/clash文件夹
sudo mv clash /opt/clash #移动文件到/opt/clash
cd /opt/clash #进入/opt/clash
```

#### 获取 Country.mmdb

> Country.mmdb 是 MaxMind GeoIP2 数据库中的一个文件，用于将 IP 地址映射到国家 / 地区。它包含一个 IPv4 和 IPv6 地址范围列表，以及每个地址范围对应的国家 / 地区代码。可以将其用于开发 Web 应用程序，以便根据访问者的 IP 地址获取其国家 / 地区信息，从而提供更好的用户体验和定位服务。**简单来说就是可以被用来确定目标网站所在的国家或地区，从而方便选择相应的代理。**

#当缺少该文件时，启动clash时会自动下载wget -O Country.mmdb https://www.sub-speeder.com/client-download/Country.mmdb

https://github.com/Dreamacro/maxmind-geoip

```
https://github.com/Dreamacro/maxmind-geoip/releases/download/20230912/Country.mmdb
```

#### 获取配置文件

clash 运行时需要加载配置文件 (也就是需要订阅链接中的内容)。先获取配置文件，直接在浏览器打开你的 [订阅链接] 看看内容。可能会直接下载一个文件或者打开一个页面显示你的配置信息。

```shell
#下载订阅链接内容并重命名为config.yaml
wget -O config.yaml [订阅链接]
```

一些代理商的订阅链接打开是没有规律的乱码，此时可以手动新建 `config.yaml`，手动把 windows clash 中已订阅的配置文件内容复制到配置文件中。

```shell
#新建并编辑config.yaml的文件
sudo vim config.yaml
# i 进入插入模式
# shift + insert 粘贴
# esc 退出插入模式
# :wq 写入并退出编辑器
```

#### 测试 clash

上述操作后，在 `/opt/clash` 内应该有三个文件：`clash`、`config.yaml`、`Country.mmdb`。

```shell
 #表示以指定配置文件运行clash
  #crtl + c 停止clash
  ./clash -f config.yaml
```

> **注意！！！clash 执行后是去～/.config/clash 中加载配置的，不是程序所在目录**
>
> > 由于在～/.config/clash 中，不同用户启动就可能会导致缺乏文件，比如自己用户装好的，然后 root 去启动，root 的 home 目录中就没有对应的文件。
>
> 所以我们要把配置文件复制一份到～/.config/clash 中，
>
> ```shell
> cp Country.mmdb config.yaml ~/.config/clash
> ```

- 持久化 clash

> 运行 clash 后，一旦关闭终端会导致 clash 也关闭，所以使用 nohup 命令后台运行 clash。
>
> ```shell
> nohup ./clash -f config.yaml &
> #判断clash状态
> ps -ef | grep clash
> ```

#### 设置终端代理

- 终端默认是直连的，设置代理命令如下

```shell
export http_proxy=http://127.0.0.1:7890 #7890为你配置的端口
export https_proxy=http://127.0.0.1:7890 #7890为你配置的端口

export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890

#取消终端代理
unset http_proxy
unset https_proxy
```

- 本次终端设置代理后，下次打开终端依旧需要重新设置。这里我们通过设置别名（alias）来简化操作。

```shell
  sudo vim ~/.bashrc #编辑bashrc文件
```

- 在文件中添加下面的内容，其中 7890 为你设置的端口。“proxy” 和 “unproxy” 为你喜欢的变量名字，一个用于开启代理，一个用于关闭。

```shell
  alias proxy="export http_proxy=http://127.0.0.1:7890;export https_proxy=http://127.0.0.1:7890"
  alias unproxy="unset http_proxy;unset https_proxy"
```

- 编译一下，使配置生效。

```shell
  source ~/.bashrc #注意不编译无法生效




```

- 以后终端代理直接终端输入 `proxy` 即可。取消用 `unproxy`。

```shell
  #查看终端代理状态
  env | grep -i proxy
  #注意：
      # 这两个命令只会在当前终端会话中生效，并不会持久保存。
      # 如果希望这些代理设置在下次登录时仍然生效，需要将它们添加到系统环境变量中。
      # 不过因为clash配置文件中已经配置好了代理策略，所以我们会通过clash选择节点来选择是否使用代理，这两个命令用处不大。
```

#### 配置别名快速启动 clash

上面的终端代理可以用别名快速进行，同理 clash 也可以快速启动。不过上面的命令是在 /opt/clash 目录下且该目录有配置文件才能正确执行，所以有关别名的命令需要将路径都写为绝对路径。

```shell
#编辑bashrc文件
sudo vim ~/.bashrc
```

在文件中添加下面的内容。“clash” 和 “unclash” 为你喜欢的变量名字，一个用于开启 clash，一个用于关闭。

后面的意思是将输出文件写入到 /dev/null 下，这个目录会丢弃所有写入数据，就是垃圾站，而数字是 linux 的重定向，里面的数字含义如下所示

- 1：标准输出，在一般使用时，默认的是标准输出。
- 2：表示错误信息输出。

这里整句话含义是将错误信息重定向到标准输出，其他信息丢进 /dev/null

```shell
alias 'clash'='nohup /opt/clash/clash -f /opt/clash/config.yaml -d /opt/clash/ > /dev/null 2>&1 &'
alias 'unclash'='pkill -9 clash'
```

记得保存后编译以使配置生效

```shell
source ~/.bashrc
#判断clash状态
ps -ef | grep clash
```

此时就可用 `clash` 和 `unclash` 命令来启动和关闭 clash，通过命令 `ps -ef | grep clash` 来判断 clash 是否运行。

#### 配置 clash 开机自启

#### 方式一

1. 打开 /etc/profile 文件：`sudo vim /etc/profile`
2. 在文件的末尾添加以下内容：

```shell
# start clash
nohup /opt/clash/clash -f /opt/clash/config.yaml -d /opt/clash/ > /dev/null 2>&1 &
```

1. 保存并关闭文件
2. 运行以下命令使配置生效：`source /etc/profile`
3. 现在重新启动系统时，Clash 将在启动时自动启动。

> 管理 clash 进程：
>
> 1. 通过 `pkill -9 clash` 来杀死 clash 进程。
> 2. 也可以通过上面配置的 `clash` 和 `unclash` 来管理 clash 进程。

#### 方式二

1. 创建一个新的 systemd 服务文件：`sudo nano /etc/systemd/system/clash.service`
2. 在该文件中输入以下内容：

```shell
[Unit]
Description=Clash Service
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash -c "nohup /opt/clash/clash -f /opt/clash/config.yaml -d /opt/clash/ > /dev/null 2>&1 &"
KillSignal=SIGTERM
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

1. 保存并退出文件。
2. 重新加载 systemd 进程：`sudo systemctl daemon-reload`
3. 启用 clash 服务：`sudo systemctl enable clash`
4. 现在重新启动系统时，Clash 将在启动时自动启动。可以使用以下命令来手动启动、停止或重启服务：

- 启动 clash 服务：`sudo systemctl start clash`
- 停止 clash 服务：`sudo systemctl stop clash`
- 重启 clash 服务：`sudo systemctl restart clash`

#### 配置 ui 管理界面

终端运行 clash 后需要使用 ui 界面进行交互。为此我们需要调整一下配置文件。具体参考如下配置。

```shell
#config.yaml

#port: 1234 #http端口，不用动
#socks-port: 1235 #socks端口，不用动
#allow-lan: true #是否允许来自局域网的链接，不用动
external-controller: '0.0.0.0:0000' #用于ui连接的地址，冒号前面一定要是0.0.0.0，包括云服务器，不然无法连接ui。0000改为自己想要的端口
secret: '密钥' #连接ui用的密钥，自己配置
#proxies:
#省略
```

> 此时开启 clash 后访问 http://clash.razord.top/，会来 clash 官方提供的管理面板。但可能出现无法直连的情况，不如直接在本地部署来得方便。

#### 配置本地 ui

1. 克隆项目并重命名为 ui，方便后续配置

```shell
sudo git clone -b gh-pages https://github.com/Dreamacro/clash-dashboard ui
```

1. 修改 clash 的配置文件

```shell
#先关闭后台运行的clash进程
pkill -9 clash
#编辑配置文件
sudo vim config.yaml
```

在配置文件中加上 `external-ui` 参数

```shell
#这里写本地ui的路径
external-ui: /opt/clash/ui
```

参考配置：

```shell
#config.yaml

#http端口，不用动
port: 1234
#socks端口，不用动
socks-port: 1235
#是否允许来自局域网的链接，不用动
allow-lan: true
#用于ui连接的地址，冒号前面一定要是0.0.0.0，包括云服务器，不然无法连接ui。
#XXXX改为自己想要的端口
external-controller: '0.0.0.0:XXXX'
#这里写本地ui的路径
external-ui: /opt/clash/ui
#连接ui用的密钥，自己配置
secret: '密钥'
#节点信息
proxies: ...
```

#### 访问 dashboard

访问地址为：**你的 ip 地址：端口 /ui**

#### 为代理添加用户认证 / 允许其他主机访问

有时使用其他主机，为它配置代理不方便，可用浏览器自带的代理设置功能。此时，只需开放先前布置的端口即可。但这样很容易被其他人盗用，所以应该给代理配置中加上用户名和密码认证。

```shell
port: 1234 #开放这个http端口，一般默认是7890，建议改为其他，一些配置中，显示的参数是mixed-port
#socks-port: 1235
#allow-lan: true
#mode: rule
#log-level: info
#external-controller: '0.0.0.0:0000'
authentication:
- "user:password" #修改为你自己想要的用户名(user)和密码(password)
#external-ui: /opt/clash/ui
#secret: '密钥'
#proxies:
#省略
```

Url 型

```
user:password@ip:端口
http://user:password@ip:端口
```

当然如果有些浏览器，是代理服务器依然填写 ip: 端口，然后访问网络时会弹出认证要求填写用户和密码，需要自己判断

#### clash 自定义规则

规则参数：

```
DOMAIN-SUFFIX：域名后缀匹配
DOMAIN：域名匹配
DOMAIN-KEYWORD：域名关键字匹配
IP-CIDR：IP段匹配
SRC-IP-CIDR：源IP段匹配
GEOIP：GEOIP数据库（国家代码）匹配
DST-PORT：目标端口匹配
SRC-PORT：源端口匹配
PROCESS-NAME：源进程名匹配
RULE-SET：Rule Provider规则匹配
MATCH：全匹配
```

规则模板为：规则，域名 /ip，类型 参考：

```yaml
parsers: #array
  - url: https://xxxxxxx.ini
    yaml:
      prepend-rules:
        - DOMAIN-KEYWORD,hdbits.org,🎯 国内网络
        - DOMAIN-SUFFIX,xthor.tk,🎯 国内网络
        - DOMAIN-SUFFIX,filelist.io,🎯 国内网络
```

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

！注意 `C:\Users\{你的用户名}\.gradle\gradle.properties` 路径下的配置文件要删除，不然启动老是问问问！！！

！注意 `C:\Users\{你的用户名}\.gradle\gradle.properties` 路径下的配置文件要删除，不然启动老是问问问！！！

！注意 `C:\Users\{你的用户名}\.gradle\gradle.properties` 路径下的配置文件要删除，不然启动老是问问问！！！

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
