# Linux

## 📌 Linux 目录

![Linux-folder](https://static.yoouu.cn/static/imgs/doc/basic/others/Linux-folder.png)

## 📌 学习资源

[Linux 命令大全](https://wangchujiang.com/linux-command/)

## 📌 一键 DD

github https://github.com/bin456789/reinstall

```shell
bash reinstall.sh ubuntu 24.04
```

## oh-my-zsh

- 检查是否安装 zsh

  ```shell
  zsh --version
  ```

- 如果没安装

  ```shell
  # 显示默认的 shell
  echo $SHELL
  # 安装 zsh
  sudo apt install zsh
  # 检查是否安装 zsh
  zsh --version
  # 设置为默认 shell
  chsh -s $(which zsh)
  # 设置为默认 shell（Fedora）
  sudo lchsh $USER
  ```

  不行的话查看文档：[https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)

- 安装 oh-my-zsh [官方文档](https://github.com/ohmyzsh/ohmyzsh#prerequisites)

  ```shell
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```

- 剩下的可以查看 mac 下的配置：[https://doc.yoouu.cn/basic/mac.html#oh-my-zsh](https://doc.yoouu.cn/basic/mac.html#oh-my-zsh)

## 📌 ssh 登录服务器

```shell
ssh -p 12333 root@${your ip}
# 使用密钥文件
ssh -i ~/work/data/id_rsa -p 22 root@{your ip}
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

## 📌 ubuntu

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

### 安装 zsh 和配置

教程来源：https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH

```shell

# 安装 zsh
sudo apt install zsh
# 检查 zsh 是否安装和查看版本
zsh --version
# 设置 Zsh 为默认 Shell
chsh -s $(which zsh)
# 此命令会将当前用户的默认 shell 更改为 Zsh。你需要退出当前会话并重新登录，或者直接重启系统以使更改生效。
# 配置 Zsh 安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# 或者，如果你没有 curl，可以使用 wget
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# 验证默认 Shell 输出应该是 /usr/bin/zsh 或 /bin/zsh。
echo $SHELL

# 国内安装
sh -c "$(curl -fsSL https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh)"
```

### 挂载硬盘

### ubuntu22.4 开启 root 登录

1. 使用管理权限打开`/etc/ssh/sshd_config`文件，并更改以下行

```yaml
FROM:
#PermitRootLogin prohibit-password
TO:
PermitRootLogin yes
```

或者使用以下命令快速替换

```bash
sudo sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
```

重启 ssh 服务

```
sudo systemctl restart ssh
```

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

### 更改 ssh 端口

**一、更改 ssh 的端口**

1.修改 sshd_config

```bash
vim /etc/ssh/sshd_config
```

2.在 port 后面添加端口即可，这些端口都是并列的，添加后如下

```bash
Port 22
Port 443
```

3、重启 ssh 服务

```bash
sudo service ssh restart
```

**二、禁止远程登录 root 用户**

1.修改/etc/ssh/sshd_config

```bash
vim /etc/ssh/sshd_config

# 将 PermitRootLogin 改为 PermitRootLogin no
```

2.重启

```bash
service sshd restart
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
