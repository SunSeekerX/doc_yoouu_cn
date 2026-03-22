# Docker

**安装**

> **centos 安装文档**：[https://docs.docker.com/install/linux/docker-ce/centos/](https://docs.docker.com/install/linux/docker-ce/centos/)
>
> **Docker Hub**: [https://docs.docker.com/install/linux/docker-ce/centos/](https://docs.docker.com/install/linux/docker-ce/centos/)

## 📌 镜像加速

国内从 DockerHub 拉取镜像有时会遇到困难，此时可以配置镜像加速器。Docker 官方和国内很多云服务商都提供了国内加速器服务，例如：

- 科大镜像：https://docker.mirrors.ustc.edu.cn
- 网易：https://hub-mirror.c.163.com
- 阿里云：**https://<你的 ID>.mirror.aliyuncs.com**
- 七牛云加速器：https://reg-mirror.qiniu.com

当配置某一个加速器地址之后，若发现拉取不到镜像，请切换到另一个加速器地址。国内各大云服务商均提供了 Docker 镜像加速服务，建议根据运行 Docker 的云平台选择对应的镜像加速服务。

阿里云镜像获取地址：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors，登陆后，左侧菜单选中镜像加速器就可以看到你的专属地址了：

### Docker desktop

```json
"registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
  "https://reg-mirror.qiniu.com"
  ]
```

## 📌 常用命令

### 服务（service）重启

```bash
# 守护进程重启
$ sudo systemctl daemon-reload
# 重启docker服务
$ sudo systemctl restart docker
# 关闭docker
$ sudo systemctl stop docker

# service 方式
# 重启 docker 服务
$ sudo service docker restart
# 关闭 docker
$ sudo service docker stop

# 查看容器cpu状态
docker stats
```

### 镜像（images）常用命令

```bash
# 拉取镜像
docker pull [镜像名称:版本]
# 镜像列表
docker images
# 删除镜像
docker rmi [镜像名称:版本]
# 镜像操作记录
docker history [镜像名称]
#
docker tag [镜像名称:版本][新镜像名称:新版本]
# 查看镜像详细
docker inspect [镜像名称:版本]
# 搜索镜像
docker search [关键字]
# 镜像登陆
docker login

# 删除全部镜像
docker rmi -f $(docker images -aq)
```

### 镜像推送（images）

给镜像打 `tag`

```shell
# docker tag 镜像id dockerhub账号名称/dockerhub仓库名称:仓库标签
docker tag 0ae3cc39ae0d sunseekerx/uni-pushy-server:latest
```

### 容器（container）常用命令

```bash
# 容器列表(所有容器)
docker ps -a
# 查看所有(运行的)容器
docker ps
# 以 bash 命令进入容器内
docker exec -ti <container_id> bash
# 查看容器日志
docker logs
# 启动容器 映射端口
docker run --name -d [容器名称] -p 8080:80 [镜像名称:版本]
# 删除容器
docker rm <container_id>
# 停止容器
docker stop <container_id>
# 开启容器
docker start <container_id>
# 重启容器
docker restart <container_id>
# 查看容器详情
docker inspect <container_id>
# 容器提交为新的镜像
docker commit [容器名称] my_image:v1.0
```

### 容器（container）补充命令

```bash
# attach： 进入容器正在执行的终端，不会开启新的进程
docker attach <container_id>
# 查看容器最近的一个进程
docker top <container_id>
# 删除所有的容器
docker rm -f $(docker ps -aq)
# 强制停止容器
docker kill <container_id>
# 拷贝容器内的文件到主机
docker cp <container_id>:<容器内的路径> <主机路径>
```

## 📌 Docker desktop

**Windows 加速**

复制阿里云的 docker 加速地址，打开设置，重启应用。

```json
{
  "registry-mirrors": ["https://ihe7845m.mirror.aliyuncs.com/"],
  "insecure-registries": [],
  "debug": true,
  "experimental": false,
  "features": {
    "buildkit": true
  }
}
```

## 📌 介绍

### 镜像

> Docker 镜像加载原理

Docker 的镜像实际上由一层一层的文件系统组成，这种层级的文件系统 UnionFS。

bootfs(boot file system)主要包含 bootloader 和 kernel, bootloader 主要是引导加载 kernel, Linux 刚启动时会加载 bootfs 文件系统，在 Docker 镜像的最底层是 bootfs。这一层与我们典型的 Linux/Unix 系统是一样的，包含 boot 加载器和内核。当 boot 加载完成之后整个内核就都在内存中了，此时内存的使用权已由 bootfs 转交给内核，此时系统也会卸载 bootfs。

rootfs (root file system)，在 bootfs 之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标准目录和文件。rootfs 就是各种不同的操作系统发行版，比如 Ubuntu, Centos 等等。

对于一个精简的 OS ,rootfs 可以很小，只需要包含最基本的命令，工具和程序库就可以了，因为底层直接用 Host 的 kernel，自己只需要提供 rootfs 就可以了。由此可见对于不同的 linux 发行版, bootfs 基本是一致的, rootfs 会有差别,因此不同的发行版可以公用 bootfs。

虚拟机是分钟级别，容器是秒级!

### 分层理解

> 分层的理解

我们可以去下载一个镜像，注意观察下载的日志输出，可以看到是一层一层的在下载!

![image-20200829154226727](https://static.yoouu.cn/static/imgs/doc/back-end/docker/image-20200829154226727.png)

思考:为什么 Docker 镜像要采用这种分层的结构呢?

最大的好处，我觉得莫过于是资源共享了!比如有多个镜像都从相同的 Base 镜像构建而来，那么宿主机只需在磁盘上保留一份 base 镜像，同时内存中也只需要加载一份 base 镜像，这样就可以为所有的容器服务了，而且镜像的每一层都可以被共享。

查看镜像分层的方式可以通过 `docker image inspect` 命令!

> 特点

Docker 镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部!

这一层就是我们通常说的容器层，容器之下的都叫镜像层!

### commit 镜像

```bash
# commit 提交容器成为一个新的副本
docker commit
# 命令和git原理类似
docker commit -m=<提交的描述信息> -a=<作者> <容器id> 目标镜像名:[TAG]
```

## 📌 容器数据卷

### 什么是容器数据卷

**docker 的理念回顾**

将应用和环境打包成一个镜像！

数据？如果数据都在容器中，那么我们容器删除，数据就会丢失!需求：数据可以持久化

MySQL，容器删了，删库跑路！需求：MySQL 数据可以存储在本地！

容器之间可以有一个数据共享的技术！Docker 容器中产生的数据，同步到本地！

这就是卷技术！目录的挂载，将我们容器内的目录，挂载到 Linux 上面！

**总结一句话：容器的持久化和同步操作！**

## 📌 Dockerfile

```bash
FROM				# 基础镜镜像，—切从这里开始构建
MAINTAINER	# 镜像是谁写的，姓名+邮箱
RUN 				# 镜像构建的时候需要运行的命令
ADD					# 步骤:tomcat镜像，这个tomcat压缩包!添加内容
WORKDIR			# 镜像的工作目录
VOLUME			# 挂载的目录
EXPOSE			# 保留端口配置
CMD					# 指定这个容器启动的时候要运行的命令,只有最后一个会生效，可被替代
ENTRYPOINT	# 指定这个容器启动的时候要运行的命令,可以追加命令
ONBUILD			# 当构建一个被继承DockerFile这个时候就会运行ONBUILD的指令。触发指令。
COPY				# 类似ADD，将我们文件拷贝到镜像中
ENV					# 构建的时候设置环境变量!
```

![image-20200829162756885](https://static.yoouu.cn/static/imgs/doc/back-end/docker/image-20200829162756885.png)

## 📌 Docker 网络

### 理解 Docker0

```bash
ip addr
```

![image-20200830152740185](https://static.yoouu.cn/static/imgs/doc/back-end/docker/image-20200830152740185.png)

Docker0：`172.18.0.1` 相当于路由器，其他所有启动的镜像都是接入到这个路由器，所以容器之前可以 ping 通，主机也可以 ping 通容器，容器之前互相 ping 请求并不是直接到达各个容器，需要经过 Docker0 进行广播到接入 Docker0 里面的容器。

![image-20200830154055179](https://static.yoouu.cn/static/imgs/doc/back-end/docker/image-20200830154055179.png)

> 原理

1、我们每启动一个 docker 容器，docker 就会给 docker 容器分配一个 ip，我们只要安装了 docker，就会有一个网卡 dockerO，桥接模式，使用的技术是 veth-pair 技术!

### 自定义网络

> 这部分等到深度使用进行补充。

不同的集群之间使用不同的网络，保证集群是安全和健康的。

如果需要打通两个不同网络（不同网段，一般是自定义网络产生）之间的链接，需要使用 Dockek network connect 链接不同网络之间的容器。

**打通是单向的！**

## 📌 部署服务

### 0x2. Docker 安装 MariaDB

```shell
# 2025-10-10 11:28:47 MariaDB没有Alpine镜像,最小的是基于Ubuntu Noble的镜像,但比MySQL 8.0官方镜像仍然要小一些
docker run -d \
  --name mariadb11 \
  --privileged=true \
  --restart=always \
  -p 13306:3306 \
  --memory="800m" \
  --memory-swap="800m" \
  --memory-swappiness=0 \
  --cpus="0.5" \
  -v /data/docker_data/mariadb11/data:/var/lib/mysql \
  -v /data/docker_data/mariadb11/config:/etc/mysql/conf.d \
  -e MYSQL_ROOT_PASSWORD=my_secret_pw \
  -e TZ=Asia/Shanghai \
  mariadb:11-noble
  
# win
docker run -d `
  --name mariadb11 `
  --restart=always `
  -p 13307:3306 `
  -v "C:\data\docker_data\mariadb11\data:/var/lib/mysql" `
  -v "C:\data\docker_data\mariadb11\config:/etc/mysql/conf.d" `
  -e MYSQL_ALLOW_EMPTY_PASSWORD=yes `
  -e TZ=Asia/Shanghai `
  mariadb:11-noble
  
# 1.搜索mariadb镜像（非必须）
$ docker search mariadb
# 2.下载docker镜像
$ docker pull mariadb
# 3.查看本地已有的所有镜像
$ docker images
# 4.建一个目录作为和容器的映射目录(-p:递归建立目录)
$ mkdir -p /root/data/mariadb
# 5.启动MariaDB
$ docker run --restart=always -d --name mariadb -p 3306:3306 --restart=always -e MYSQL_ROOT_PASSWORD=输入数据库root用户的密码 -v /root/data/mariadb:/var/lib/mysql mariadb
#　　--name启动容器设置容器名称为mariadb
#　　-p设置容器的3306端口映射到主机3306端口
#　　-e MYSQL_ROOT_PASSWORD设置环境变量数据库root用户密码为输入数据库root用户的密码
#　　-v设置容器目录/var/lib/mysql映射到本地目录/root/data/mariadb
#　　-d后台运行容器mariadb并返回容器id
# 6.查看容器是否运行
$ docker ps -a
# 7.修改容器为自启动
$ docker container update --restart=always 容器id
# 8.进入容器
$ docker exec -it 容器Id bash
# 9.在容器内登录数据库
$ mysql -uroot -proot密码

#其他常用命令：
$ docker start 容器id　　# 启动容器
$ docker stop 容器id　　 # 停止容器
```

### 0x3. Docker 安装 MongoDB

> ！如果外部目录存在老的数据文件，创建初始化用户不会生效。

```shell
# 1.搜索MongoDB镜像（非必须）
$ docker search mongo
# 2.下载docker镜像
$ docker pull mongo
# 3.查看本地已有的所有镜像
$ docker images
# 4.建一个目录作为和容器的映射目录(-p:递归建立目录)
$ mkdir -p /data/mongodb
# 5.启动MongoDB
$ docker run --name mongodb -p 27017:27017 --restart=always -v /data/mongodb:/data/db -d mongo --auth
    # 5.1 下面启动在admin数据库创建了一个超级管理员，具有管理所有数据库的权限。
    $ docker run --name mongodb -p 27017:27017 --restart=always -v /data/mongodb:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=12345678900 -d mongo
# 6.查看容器是否运行
$ docker ps -a
# 7.修改容器为自启动
$ docker container update --restart=always 容器id
# 8.进入容器
$ docker exec -it mongodb bash
# 9.在容器内登录数据库
$ mongo -u root -p 12345678900

docker run --name mongodb -p 27018:27017 --restart=always -v /data/docker_data/mongodb7x:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=my_secret_pw -d mongo

# 3.x
docker run --name mongodb3x -p 27019:27017 --restart=always -v /data/docker_data/mongodb3x:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=my_secret_pw -d mongo:3.6.23
```

### 0x4. Docker 安装 Portainer

**2.x**

```shell
# 拉取镜像
docker pull portainer/portainer-ce
# 创建数据卷
docker volume create portainer_data
# 删除原来的容器
docker rm portainer -f
# 启动容器
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

# Linux
docker run -d \
--name portainer \
--restart=always \
-p 8000:8000 \
-p 9000:9000 \
-p 9443:9443 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /data/docker_data/portainer:/data portainer/portainer-ce

# Win
docker run -d `
--name portainer `
--restart=always `
-p 8000:8000 `
-p 9000:9000 `
-p 9443:9443 `
-v /var/run/docker.sock:/var/run/docker.sock `
-v D:\data\docker_data\portainer:/data portainer/portainer-ce
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

---

**1.24.x（不建议）**

```shell
# 1.搜索MongoDB镜像（非必须）
$ docker search portainer
# 2.下载docker镜像
$ docker pull portainer/portainer
# 3.查看本地已有的所有镜像
$ docker images
# 4.启动portainer
$ docker run -d -p 9000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --name portain portainer/portainer
# 5.查看容器是否运行
$ docker ps -a
```

### 0x5. Docker 安装 nondanee/unblockneteasemusic

```shell
# 1.搜索MongoDB镜像（非必须）
$ docker search nondanee
# 2.下载docker镜像
$ docker pull nondanee/unblockneteasemusic
# 3.查看本地已有的所有镜像
$ docker images
# 4.启动nondanee/unblockneteasemusic
$ docker run -d -p 65535:8080 --restart=always --name music nondanee/unblockneteasemusic
# 5.查看容器是否运行
$ docker ps -a


# 新版本
# Github：https://github.com/UnblockNeteaseMusic/server
# 下载镜像
$ docker run pan93412/unblock-netease-music-enhanced
# 启动
$ docker run -d -p 65535:8080 --restart=always --name music pan93412/unblock-netease-music-enhanced
```

### 0x6. Docker 安装 jenkins

> Jenkins 是开源 CI&CD 软件领导者， 提供超过 1000 个插件来支持构建、部署、自动化， 满足任何项目的需要。
>
> 官网：[https://jenkins.io/zh/](https://jenkins.io/zh/)
>
> 推荐使用 docker 安装，这样可以方便升级，不用被 jdk 环境搭建搞得焦头烂额，直接关注使用功能
>
> Docker 镜像：[https://hub.docker.com/r/jenkins/jenkins](https://hub.docker.com/r/jenkins/jenkins)

```bash
# lts-jdk21
docker run --name jenkins \
-m 12288M \
--cpus=6.0 \
-p 50001:8080 \
-p 50000:50000 \
--restart=always \
-u root \
-d \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /data/docker_data/jenkins_home:/var/jenkins_home \
-e JAVA_OPTS="-Duser.timezone=Asia/Shanghai -Dfile.encoding=UTF-8 -Xms4g -Xmx8g -XX:+UseG1GC -XX:+UseCompressedOops -Xlog:gc*:file=/var/jenkins_home/gc.log:time,uptime:filecount=5,filesize=20M" \
jenkins/jenkins:lts-jdk21

# 方向代理记得加上
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Port $server_port;
proxy_set_header X-Forwarded-Proto $scheme;

docker run --name jenkins \
-m 6144M \
-p 50001:8080 \
-p 50000:50000 \
--restart=always \
 -u root  \
 -d  \
 -v /var/run/docker.sock:/var/run/docker.sock  \
 -v /data/docker_data/jenkins_home:/var/jenkins_home  \
 -e JAVA_OPTS="-Duser.timezone=Asia/Shanghai -Dfile.encoding=UTF-8 -Xms1g -Xmx3g -XX:+UseG1GC -XX:+UseCompressedOops -Xlog:gc*:file=/var/jenkins_home/gc.log:time,uptime:filecount=5,filesize=10M" \
  jenkins/jenkins:lts-jdk21
 
# lts-jdk17 8192M
docker run --name jenkins \
-m 8192M \
-p 50001:8080 \
-p 50000:50000 \
--restart=always \
 -u root  \
 -d  \
 -v /var/run/docker.sock:/var/run/docker.sock  \
 -v /data/docker_data/jenkins_home:/var/jenkins_home  \
 -e JAVA_OPTS="-Duser.timezone=Asia/Shanghai -Dfile.encoding=UTF-8"  \
 jenkins/jenkins:lts-jdk17

# jdk 11 8192M
docker run --name jenkins -m 8192M -p 50001:8080 --restart=always -u root -d -v /var/run/docker.sock:/var/run/docker.sock -v /data/docker_data/jenkins_home:/var/jenkins_home -e JAVA_OPTS="-Duser.timezone=Asia/Shanghai -Dfile.encoding=UTF-8" jenkins/jenkins:lts-jdk11

# 限制内存为 1.5 GB 腾讯云不限制构建 Vue 项目很容易把内存吃满然后其他服务挂掉
docker run --name jenkins -m 1536M -p 50001:8080 -p 50000:50000 --restart=always -u root -d -v /var/run/docker.sock:/var/run/docker.sock -v /data/docker_data/jenkins_home:/var/jenkins_home -e JAVA_OPTS="-Duser.timezone=Asia/Shanghai -Dfile.encoding=UTF-8" jenkins/jenkins:jdk21

# 端口 8080：用于访问 Jenkins 的 Web 管理界面。
# 端口 50000：用于 Jenkins 主节点和代理节点之间的通信。

# 拉取长期服务版
$ docker pull jenkins/jenkins:lts
# 在启动Jenkins时，需要先创建一个Jenkins的配置目录，并且挂载到docker 里的Jenkins目录下
$ mkdir -p /var/jenkins_home
# 修改目录权限（很重要！）否则jenkins没有读取改目录的权限
$ chown -R 1000 /var/jenkins_home
# 查看文件夹权限
$ sudo ls -nd /var/jenkins_home/
# 运行 Jenkins
$ docker run --name jenkins -p 50001:8080 --restart=always -u root  -d -v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home:/var/jenkins_home -e JENKINS_UC="	https://updates.jenkins-zh.cn" -e JENKINS_UC_DOWNLOAD="https://mirrors.tuna.tsinghua.edu.cn/jenkins" -e JAVA_OPTS=-Duser.timezone=Asia/Shanghai -v $(which git):/usr/bin/git jenkins/jenkins:lts
```

`jenkinsci/blueocean` - 官方推荐安装

```bash
$ # Pull image from Docker Hub.
$ docker pull jenkinsci/blueocean:latest

# Official Start Url:https://www.jenkins.io/zh/doc/book/installing/#%E5%9C%A8docker%E4%B8%AD%E4%B8%8B%E8%BD%BD%E5%B9%B6%E8%BF%90%E8%A1%8Cjenkins
$ docker run \
  -u root \
  --rm \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean

# Custom start
$ docker run --name jenkins-blueocean -u root -d -p 8081:8080 -v /var/jenkins_blueocean_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkinsci/blueocean
```

**配置 Jenkins**

> 第一次进入需要加载依赖和配置需要一段时间，可以通过`docker logs <容器id> -f`监控 jenkins 运行日志

访问`http://<你的ip>:50001`访问 Jenkins。如果无法访问请检查系统防火墙、云的安全组设置。

可以看到需要我们输入密码。

首先进入容器：

```shell
docker exec -it jenkins /bin/bash
```

然后查看密码：

```shell
cat /var/jenkins_home/secrets/initialAdminPassword
```

复制输出的内容，粘贴到 Administrator password，输入 exit 退出容器，此时进行下一步你会看到此界面，点击 Install suggested plugins，然后创建管理用户。

### 0x7 Docker 安装 gogs

```shell
# Pull image from Docker Hub.
$ docker pull gogs/gogs

# Create local directory for volume.
$ mkdir -p /var/gogs

# Use `docker run` for the first time.
$ docker run --restart=always -d --name=gogs -p 10022:22 -p 10080:3000 -v /var/gogs:/data gogs/gogs

# 接入到 docker 路由
docker run --restart=always -d --name=gogs -p 10022:22 -p 10080:3000 -v /var/gogs:/data gogs/gogs --network=dockernet

# Use `docker start` if you have stopped it.
$ docker start gogs
```

配置文件地址`/var/gogs/gogs/conf`

**升级**

```shell
docker pull gogs/gogs
docker stop gogs
docker rm gogs
# 重新创建容器
```

### 0x8 Docker 安装 rancher

> 文档：[https://docs.rancher.cn/](https://docs.rancher.cn/)

```bash
# Pull image from Docker Hub.
$ docker pull rancher/rancher

# Start
$ docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher

# Custom start
$ docker run --name rancher -d --restart=unless-stopped -p 8082:80 -p 8083:443 rancher/rancher
```

### 0x9 Docker 安装 frps

https://gofrp.org/

https://hub.docker.com/r/snowdreamtech/frps

新建配置文件

```shell
mkdir -p /data/docker_data/frps/ && cd /data/docker_data/frps/
touch frps.toml && nano frps.toml
```

写入配置文件，`frps.toml`，根据你自己的配置

```ini
bindPort = 7000
vhostHTTPPort = 7070
vhostHTTPSPort = 7443

auth.method = "token"
auth.token = "xxxxxx"

webServer.addr = "0.0.0.0"
webServer.port = 7071
webServer.user = "admin"         # 设置用户名
webServer.password = "yourpassword"  # 设置密码
```

启动容器

```shell
# Linux
docker run --restart=always --network host -d -v /data/docker_data/frps/frps.toml:/etc/frp/frps.toml --name frps snowdreamtech/frps
# 放开 7000 7070 7071 7443
```

### 0x10 Docker 安装 frpc

frpc.toml

```toml
serverAddr = "x.x.x.x"
serverPort = 7000
auth.method = "token"
auth.token = "xxxxxx"
```

启动容器

```shell
docker run --restart=always --network host -d -v /etc/frp/frpc.ini:/etc/frp/frpc.ini --name frpc snowdreamtech/frpc
# 或者本地下载启动
./frpc -c ./frpc.toml
```

### 0x11 Docker 安装 redis

https://hub.docker.com/_/redis

mac&linux&wsl

```shell
# 先搞配置文件
mkdir -p /data/docker_data/redis7x && cd /data/docker_data/redis7x
# 下载 redis.conf 文件
wget https://download.redis.io/redis-stable/redis.conf
chmod 777 redis.conf
```

修改默认配置信息

```nginx
vi redis.conf
# or
nano redis.conf

# 这行要注释掉，解除本地连接限制 配置绑定 ip，搜索 bind 127.0.0.1 -::1
bind 0.0.0.0
# 默认yes，如果设置为yes，则只允许在本机的回环连接，其他机器无法连接。
protected-mode no
# 默认no 为不守护进程模式，docker部署不需要改为yes，docker run -d本身就是后台启动，不然会冲突
daemonize no
# 密码，搜索 requirepass foobared
requirepass my_secret_pw
# 持久化
appendonly yes
```

windows

```powershell
# 创建目录
New-Item -ItemType Directory -Force -Path D:\data\docker_data\redis7x
cd D:\data\docker_data\redis7x
# 下载 redis.conf（方法一：Invoke-WebRequest）
Invoke-WebRequest -Uri "https://download.redis.io/redis-stable/redis.conf" -OutFile "redis.conf"
# 修改配置（PowerShell 方式）
# 用记事本打开
notepad redis.conf
# 或者用 VS Code
code redis.conf
# 快速替换配置（一键脚本）
# 读取并替换关键配置
$conf = Get-Content redis.conf -Raw
$conf = $conf -replace 'bind 127.0.0.1 -::1', 'bind 0.0.0.0'
$conf = $conf -replace 'protected-mode yes', 'protected-mode no'
$conf = $conf -replace '# requirepass foobared', 'requirepass my_secret_pw'
$conf = $conf -replace 'appendonly no', 'appendonly yes'
$conf | Set-Content redis.conf -Encoding UTF8
```



```shell
# 限制资源版本
# Redis 7.4是稳定的LTS分支
docker run --name redis7x \
  --restart=always \
  -p 16379:6379 \
  --memory="256m" \
  --memory-swap="256m" \
  --memory-swappiness=0 \
  --cpus="0.3" \
  --log-opt max-size=100m \
  --log-opt max-file=2 \
  -v /data/docker_data/redis7x/redis.conf:/etc/redis/redis.conf \
  -v /data/docker_data/redis7x:/data \
  -d redis:7.4-alpine redis-server /etc/redis/redis.conf --appendonly yes
  
# Linux
docker run --name redis7x \
--restart=always \
-p 16379:6379 \
--log-opt max-size=100m --log-opt max-file=2 \
-v /data/docker_data/redis7x/redis.conf:/etc/redis/redis.conf \
-v /data/docker_data/redis7x:/data \
-d redis:7.4 redis-server /etc/redis/redis.conf --appendonly yes

# Win
docker run --name redis7x `
--restart=always `
-p 16379:6379 `
--log-opt max-size=100m `
--log-opt max-file=2 `
-v D:\data\docker_data\redis7x\redis.conf:/etc/redis/redis.conf `
-v D:\data\docker_data\redis7x\:/data `
-d redis:7.4 `
redis-server /etc/redis/redis.conf --appendonly yes

# win 本地开发
docker run --name redis7x `
  -p 16379:6379 `
  -v D:\data\docker_data\redis7x\redis.conf:/etc/redis/redis.conf `
  -v D:\data\docker_data\redis7x\:/data `
  -d redis:7.4 `
  redis-server /etc/redis/redis.conf

# Mac
docker run --name redis7x \
--restart=always \
-p 16379:6379 \
--log-opt max-size=100m --log-opt max-file=2 \
-v ~/work/data/docker_data/redis7x/redis.conf:/etc/redis/redis.conf \
-v ~/work/data/docker_data/redis7x:/data \
-d redis:7.4 redis-server /etc/redis/redis.conf --appendonly yes
```



**说明：**

- -p 63799:6379：端口映射，前面是宿主机，后面是容器。
- –name redis：指定该容器名称。
- -v 挂载文件或目录：前面是宿主机，后面是容器。
- -d redis redis-server /etc/redis/redis.conf：表示后台启动 redis，以配置文件启动 redis，加载容器内的 conf 文件。
- appendonly yes：开启 redis 持久化。

### 0x12 Docker 安装 zentao

镜像地址：[https://hub.docker.com/r/easysoft/zentao](https://hub.docker.com/r/easysoft/zentao)

```shell
# 拉取镜像
docker pull easysoft/zentao
# 创建一个网络
docker network create --subnet=172.172.172.0/24 zentaonet
# 创建禅道数据目录
mkdir -p /root/app/zentao
# 创建禅道 mysql 目录
mkdir -p /root/app/zentao-db
# 启动容器
docker run --name zentao -p 8081:80 --network=zentaonet --ip 172.172.172.172 --mac-address 02:42:ac:11:00:00 -v /root/app/zentao:/www/zentaopms -v /root/app/zentao-db:/var/lib/mysql -d easysoft/zentao
```

遗留问题

nginx 反向代理无法正常工作，禅道工作目录为 www/

### 0x13 Docker 安装 mysql

镜像地址：[https://hub.docker.com/\_/mysql?tab=reviews](https://hub.docker.com/_/mysql?tab=reviews)

#### **mysql 8.x**

```shell
# 限制资源版本
# MySQL 8.x (开发环境)  
docker run -d \
  --name mysql8x \
  --privileged=true \
  --restart=always \
  -p 13306:3306 \
  --memory="1g" \
  --memory-swap="1g" \
  --memory-swappiness=0 \
  --cpus="0.5" \
  -v /data/docker_data/mysql8x/data:/var/lib/mysql \
  -v /data/docker_data/mysql8x/config:/etc/mysql/conf.d \
  -v /data/docker_data/mysql8x/logs:/logs \
  -e MYSQL_ROOT_PASSWORD=my_secret_pw \
  -e TZ=Asia/Shanghai \
  mysql:8.0
  
# Linux
docker run -d \
--name mysql8x \
--privileged=true \
--restart=always \
-p 13306:3306 \
-v /data/docker_data/mysql8x/data:/var/lib/mysql \
-v /data/docker_data/mysql8x/config:/etc/mysql/conf.d  \
-v /data/docker_data/mysql8x/logs:/logs \
-e MYSQL_ROOT_PASSWORD=my_secret_pw \
-e TZ=Asia/Shanghai mysql:8

# Win
docker run -d `
--name mysql8x `
--privileged=true `
--restart=always `
-p 13306:3306 `
-v D:\data\docker_data\mysql8x\data:/var/lib/mysql `
-v D:\data\docker_data\mysql8x\config:/etc/mysql/conf.d `
-v D:\data\docker_data\mysql8x\logs:/logs `
-e MYSQL_ROOT_PASSWORD=root `
-e TZ=Asia/Shanghai mysql:8.3

# Mac
docker run  -d  \
--name mysql8x \
--privileged=true \
--restart=always \
-p 13306:3306 \
-v ~/work/data/docker_data/mysql8/data:/var/lib/mysql \
-v ~/work/data/docker_data/mysql8/config:/etc/mysql/conf.d  \
-v ~/work/data/docker_data/logs:/logs \
-e MYSQL_ROOT_PASSWORD=my_secret_pw \
-e TZ=Asia/Shanghai mysql:8.3

# 开放远程访问 MySQL 8.4+ 中默认已经 移除了 mysql_native_password 插件
# 进入容器
docker exec -it <container_id_or_name> /bin/bash
docker exec -it mysql8x /bin/bash
# 登录 mysql
mysql -u root -p
# 开放权限
DROP USER 'root'@'%';
CREATE USER 'root'@'%' IDENTIFIED BY 'my_secret_pw';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

# 开放远程访问 MySQL 8.4 中默认已经 移除了 mysql_native_password 插件
# 进入容器
docker exec -it <container_id_or_name> /bin/bash
docker exec -it mysql8x /bin/bash
# 登录 mysql
mysql -u root -p
# 开放权限
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'my_secret_pw';
# 刷新权限
flush privileges;
```

#### **mysql 57**

```shell
# Linux
docker run -d \
--name mysql57 \
--privileged=true \
--restart=always \
-p 23066:3306 \
-v /data/docker_data/mysql57x/data:/var/lib/mysql \
-v /data/docker_data/mysql57x/config:/etc/mysql/conf.d  \
-v /data/docker_data/mysql57x/logs:/logs \
-e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
-e TZ=Asia/Shanghai mysql:5.7

docker run -d \
  --name mysql57 \
  --privileged=true \
  --restart=always \
  -p 13306:3306 \
  -v /data/docker_data/mysql57x/data:/var/lib/mysql \
  -v /data/docker_data/mysql57x/config:/etc/mysql/conf.d \
  -v /data/docker_data/mysql57x/logs:/logs \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  -e MYSQL_ROOT_PASSWORD=my_secret_pw \
  -e TZ=Asia/Shanghai \
  --memory=600m \
  --memory-swap=1g \
  --cpus="0.8" \
  mysql:5.7

# Win
docker run -d `
--name mysql57 `
--privileged=true `
--restart=always `
-p 23306:3306 `
-v D:\data\docker_data\mysql57x\data:/var/lib/mysql `
-v D:\data\docker_data\mysql57x\config:/etc/mysql/conf.d `
-v D:\data\docker_data\mysql57x\logs:/logs `
-e MYSQL_ALLOW_EMPTY_PASSWORD=yes `
-e TZ=Asia/Shanghai mysql:5.7


# 启动 phpmyadmin 测试
docker run -d `
--name myadmin `
--restart=always `
-e PMA_HOST=host.docker.internal `
-e PMA_PORT=23306 `
-p 28080:80 `
phpmyadmin:latest
```

### 0x14 Docker 安装 Bookstack

参数需要提前设置好, 官方文档：[https://www.bookstackapp.com/docs/admin/installation/#docker](https://www.bookstackapp.com/docs/admin/installation/#docker)

> 默认
>
> username: admin@admin.com
>
> pwd: **password**

```shell
docker run -d \
  --name=bookstack \
  -e PUID=1000 \
  -e PGID=1000 \
  -e APP_URL=https://bookstack.yoouu.cn \
  -e DB_HOST=192.168.0.1 \
  -e DB_USER=${your-db-user} \
  -e DB_PASS=${your-db-password} \
  -e DB_DATABASE=${your-db} \
  -p 6875:80 \
  -v /root/data/bookstack:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/bookstack

  # 自己加入了网络
  docker run -d \
  --name=bookstack \
  -e PUID=1000 \
  -e PGID=1000 \
  -e APP_URL=https://bookstack.yoouu.cn \
  -e DB_HOST=192.168.0.1 \
  -e DB_USER=${your-db-user} \
  -e DB_PASS=${your-db-password} \
  -e DB_DATABASE=${your-db} \
  -p 6875:80 \
  -v /root/data/bookstack:/config \
  --restart unless-stopped \
  --network=dockernet \
  lscr.io/linuxserver/bookstack
```

### 0x15 Docker 安装 Gitea

> [Gitea](https://gitea.io/zh-cn/)

```shell
# 创建一个网络
docker network create -d macvlan --subnet=172.172.172.0/24 --gateway=172.172.172.1 -o parent=eth0 dockernet
# 上面那个不能用
docker network create \
  --driver bridge \
  --subnet 192.168.0.0/24 \
  --gateway 192.168.0.1 \
  dockernet

# 注意 DB_HOST 和 dockernet 需要新建 docker 网络
# Linux & mac
docker run -d \
--name=gitea \
-e USER_UID=1000 \
-e USER_GID=1000 \
-e DB_TYPE=mysql \
-e DB_HOST=192.168.0.1:3306 \
-e DB_NAME=db_name \
-e DB_USER=db_user \
-e DB_PASSWD=db_pwd \
-p 222:22 \
-p 3000:3000 \
--network=dockernet \
--restart=always \
-v /data/docker_data/gitea:/data \
-v /etc/timezone:/etc/timezone:ro \
-v /etc/localtime:/etc/localtime:ro \
gitea/gitea:latest

# win
docker run -d --name=gitea -e USER_UID=1000 -e USER_GID=1000 -e DB_TYPE=mysql -e DB_HOST=172.172.172.1:3306 -e DB_NAME=db_name -e DB_USER=db_user -e DB_PASSWD=db_pwd -p 222:22 -p 3030:3000 --network=dockernet --restart=always -v D:\data\gitea:/data -v /etc/timezone:/etc/timezone:ro -v /etc/localtime:/etc/localtime:ro gitea/gitea:latest

# 备份和恢复 官方文档 https://docs.gitea.com/zh-cn/administration/backup-and-restore
# 我是直接导出数据库 然后备份文件 在新的机器还原 如果域名更改需要修改数据库导出的内容 数据库 sql 压缩之后可以变得更小
# 查看 1000 用户名
grep ':1000:' /etc/passwd

# 我的 dump 命令
docker exec -u git -w /data/gitea -it gitea bash -c '/usr/local/bin/gitea dump -c /data/gitea/conf/app.ini'

# 在容器中打开 bash 会话
docker exec --user git -it 2a83b293548e bash
docker exec --user git -it gitea bash
# 在容器内解压您的备份文件
unzip gitea-dump-1610949662.zip
cd gitea-dump-1610949662
# 恢复 Gitea 数据
mv data/* /data/gitea
# 恢复仓库本身
mv repos/* /data/git/gitea-repositories/
# 调整文件权限
chown -R git:git /data
# 重新生成 Git 钩子
/usr/local/bin/gitea -c '/data/gitea/conf/app.ini' admin regenerate hooks
```

一些基础安全设置

```ini
# 禁止注册
DISABLE_REGISTRATION = true
# 只允许管理员创建用户
ALLOW_ONLY_EXTERNAL_REGISTRATION = false
REGISTER_EMAIL_CONFIRM = false
# 关闭自助邮件功能（防止外部滥用）
ENABLE_NOTIFY_MAIL = false
# 禁止匿名访问
REQUIRE_SIGNIN_VIEW = true
# 禁止未登录用户克隆仓库
DISABLE_GRAVATAR = true

# 下面是开启 ssh
DISABLE_SSH = false
DOMAIN = gitea.yoouu.cn
SSH_DOMAIN = gitea.yoouu.cn
HTTP_PORT = 3000
ROOT_URL = https://gitea.yoouu.cn/
START_SSH_SERVER = true
SSH_PORT = 222
SSH_LISTEN_PORT = 22
LFS_START_SERVER = true
```

### 0x16 Docker 安装 AppHost

```shell
# 新建数据目录
mkdir -p /data/docker_data/app_host

docker run --name app_host --restart=always -v /data/docker_data/app_host:/app/shared -p 8686:8686 -d tinyc/app-host:lastest
```

测试可以成功访问的 nginx 反向代理配置文件，不按照这个配置可能无法使用，

https://x/users/new 这里新建用户

```

#PROXY-START/

location ^~ /
{
    proxy_pass http://127.0.0.1:8686;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Port $server_port;
    proxy_set_header REMOTE-HOST $remote_addr;
    # proxy_hide_header Upgrade;

    add_header X-Cache $upstream_cache_status;
    #Set Nginx Cache

    set $static_fileK05aa2de 0;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
        set $static_fileK05aa2de 1;
        expires 1m;
    }
    if ( $static_fileK05aa2de = 0 )
    {
        add_header Cache-Control no-cache;
    }
}
#PROXY-END/
```

记得修改 nginx 上传配置

```
client_max_body_size 250m;
```

### 0x17 Docker 安装 twikoo 评论系统

```shell
# 3002 我服务器可用的端口号
docker run --name twikoo -e TWIKOO_THROTTLE=1000 -p 3002:8080 -v /data/docker_data/twikoo:/app/data --restart=always -d imaegoo/twikoo

# 我的实例
docker run --name twikoo_blog -e TWIKOO_THROTTLE=1000 -p 3002:8080 -v /data/docker_data/twikoo_blog:/app/data --restart=always -d imaegoo/twikoo
docker run --name twikoo_doc -e TWIKOO_THROTTLE=1000 -p 3003:8080 -v /data/docker_data/twikoo_doc:/app/data --restart=always -d imaegoo/twikoo
```

### 0x18 Docker 安装 artalk 评论系统

```shell
# 更新镜像
docker pull artalk/artalk-go:latest

# 新建数据目录
mkdir -p ~/data/artalk
# 启动容器
docker run -d \
    --name artalk \
    -p 23366:23366 \
    -v ~/data/artalk:/data \
    --restart=always \
    artalk/artalk-go
```

### 0x19 Docker 安装 gitness

```shell
# mac
docker run -d \
  -p 3456:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/work/data/gitness:/data \
  --name gitness \
  --restart always \
  harness/gitness

docker run -d \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /tmp/gitness:/data \
  --name gitness \
  --restart always \
  harness/gitness
```

### 0x20 Docker 安装 minio oss

https://github.com/minio/minio

Doc: https://min.io/docs/minio/container/index.html

客户端：https://s3browser.com/

9001 是控制面板

9000 是 api 访问和公开访问链接

```shell
# Linux
docker run -d \
   --restart=always \
   -p 9000:9000 \
   -p 9001:9001 \
   --name minio \
   -v ~/data/docker_data/minio/data:/data \
   -e "MINIO_ROOT_USER=ROOTNAME" \
   -e "MINIO_ROOT_PASSWORD=CHANGEME123" \
   quay.io/minio/minio server /data --console-address ":9001"
```

示例 static 桶

```json
// 原来的
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": ["s3:GetBucketLocation"],
      "Resource": ["arn:aws:s3:::static"]
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::static/**"]
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::static"],
      "Condition": {
        "StringEquals": {
          "s3:prefix": ["*"]
        }
      }
    }
  ]
}
```

### 0x21 Docker 安装 nginx

```shell
# 新建一个文件夹 D:\data\docker_data\nginx12x\html
# 新建一个配置文件 D:\data\docker_data\nginx12x\default.conf

docker run -d `
--restart=always `
--name nginx `
--network host `
-v D:\data\docker_data\nginx12x\html:/usr/share/nginx/html `
-v D:\data\docker_data\nginx12x\default.conf:/etc/nginx/conf.d/default.conf `
nginx

# 测试配置文件 win
nginx -t -c D:\data\docker_data\nginx12x\default.conf
# 运行 Nginx
start nginx
# 重新加载配置
nginx -s reload
# 强制停止
nginx -s stop
# 优雅停止
nginx -s quit
```

default.conf

```nginx

#user  nobody;
worker_processes 1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;
events {
    worker_connections 1024;
}


http {
    include mime.types;
    default_type application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;
    sendfile on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout 65;

    #gzip  on;

    server {
        listen 80;
        server_name xxx.yyy.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        location / {
            root /app2/site;
            index index.html;
        }
        location /api/ {
            proxy_pass http://127.0.0.1:8088/dk/;
        }
    }

}

```

### 0x22 Docker 安装 Ghost blog 系统

来源：https://hub.docker.com/_/ghost/

```shell
# 创建一个网络
docker network create \
  --driver bridge \
  --subnet 192.168.0.0/24 \
  --gateway 192.168.0.1 \
  dockernet

# Linux
docker run -d \
  --name ghost \
  --restart always \
  -e database__client=mysql \
  -e database__connection__host=192.168.0.1 \
  -e database__connection__port=3306 \
  -e database__connection__user=db_user \
  -e database__connection__password=db_pwd \
  -e database__connection__database=db_name \
  -e url=https://yoouu.cn/ \
  -p 12368:2368 \
	--network=dockernet \
  -v /data/docker_data/ghost:/var/lib/ghost/content \
  ghost:6
  
# 安装目录在 /var/lib/ghost
  
docker run -d \
  --name ghost \
  --restart always \
  -e database__client=mysql \
  -e database__connection__host=192.168.0.1 \
  -e database__connection__port=3306 \
  -e database__connection__user=db_user \
  -e database__connection__password=db_pwd \
  -e database__connection__database=db_name \
  -e url=your_site_url \
  -p 12368:2368 \
	--network=dockernet \
  -v /data/docker_data/ghost:/var/lib/ghost/content \
  ghost:5
```

可用的 nginx 代理配置

```nginx
#PROXY-START/

location ^~ /
{
    proxy_pass http://localhost:12368;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_http_version 1.1;

    add_header X-Cache $upstream_cache_status;
    #Set Nginx Cache

    set $static_filerl2wBvit 0;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
        set $static_filerl2wBvit 1;
        expires 1m;
    }
    if ( $static_filerl2wBvit = 0 )
    {
        add_header Cache-Control no-cache;
    }
}
#PROXY-END/
```

### 0x23 Docker 安装 rustdesk

镜像 https://hub.docker.com/r/rustdesk/rustdesk-server/tags

官方文档：https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/

```shell
# 这个能用
docker run --name hbbs -v /data/docker_data/rustdesk/hbbs:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs -k your_public_key_here
docker run --name hbbr -v /data/docker_data/rustdesk/hbbr:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr -k your_public_key_here

# 这个可以设置 ip
docker run --name hbbs -v /data/docker_data/rustdesk/hbbs:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs -r 192.168.1.100:21117 -k your_public_key_here
docker run --name hbbr -v /data/docker_data/rustdesk/hbbr:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr -k your_public_key_here

# 开放 tcp 21114-21119
# 开放 udp 21116

# 下面是 docker-compose 方式配置文件在下面
mkdir -p /data/docker_data/rustdesk
touch /data/docker_data/rustdesk/docker-compose.yml
cd /data/docker_data/rustdesk
# 启动
docker compose up -d
# 停止
docker-compose down
# -v 参数会同时删除 volumes，这样就会删除数据库中的所有数据。
docker-compose down -v
```

docker-compose.yml 配置内容，替换下 <your_public_ip> 和 <your_key>

```yaml
version: '3'

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r <your_public_ip>:21117 --key <your_key>
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:latest
    command: hbbr --key <your_key>
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```

### 0x24 Docker 安装 webdav

```shell
docker run -d \
    --name webdav \
    -v /data/docker_data/webdav:/var/lib/dav \
    -e USERNAME=yourusername \
    -e PASSWORD=yourpassword \
    -p 18080:80 \
    bytemark/webdav
```

### 0x25 Docker 安装 Tduck-填鸭收集器

https://github.com/TDuckCloud/tduck-front

```shell
# 创建一个网络
docker network create \
  --driver bridge \
  --subnet 192.168.0.0/24 \
  --gateway 192.168.0.1 \
  dockernet

# 启动，需要导入 初始化数据库 https://github.com/TDuckCloud/tduck-platform/blob/master/docker/init-db/tduck-v4.sql
docker run -d \
  --name tduck \
  -e SPRING_DATASOURCE_URL="jdbc:mysql://192.168.0.1:3306/tduck_v4?useSSL=false&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&tinyInt1isBit=false&nullCatalogMeansCurrent=true" \
  -e SPRING_DATASOURCE_USERNAME=tduck_v4 \
  -e SPRING_DATASOURCE_PASSWORD=3ms7s5Zy4BxxTaFJ \
  -p 8999:8999 \
  --network=dockernet \
  -v /data/docker_data/tduck/upload:/application/BOOT-INF/lib/upload \
  tduckcloud/tduck-platform
```

### 0x26 Docker 安装 OneNav 书签管理

```shell
docker run -itd --name="onenav" -p 11180:80 \
    -v /data/docker_data/onenav:/data/wwwroot/default/data \
    helloz/onenav
```

### 0x27 Docker 安装 stirling pdf 工具

https://github.com/Stirling-Tools/Stirling-PDF

配置 ocr https://github.com/Stirling-Tools/Stirling-PDF/blob/main/HowToUseOCR.md

```shell
docker run -d \
  -p 8081:8080 \
  -v /data/docker_data/stirling/trainingData:/usr/share/tessdata \
  -v /data/docker_data/stirling/extraConfigs:/configs \
  -v /data/docker_data/stirling/logs:/logs \
 	-v /data/docker_data/stirling/customFiles:/customFiles \
  -e DOCKER_ENABLE_SECURITY=false \
  -e INSTALL_BOOK_AND_ADVANCED_HTML_OPS=true \
  -e LANGS=zh_CN \
  --name stirling_pdf \
  frooodle/s-pdf:latest
```

### 0x28 Docker 安装 dpanel

```shell
docker run -it -d --name dpanel --restart=always \
 -p 8807:8080 -e APP_NAME=dpanel \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /data/docker_data/dpanel:/dpanel dpanel/dpanel:lite
```

### 0x29 Docker 安装 Cloudreve

https://docs.cloudreve.org/zh/overview/deploy/

```shell
docker run -d --name cloudreve -p 5212:5212 \
    -v /data/docker_data/cloudreve:/cloudreve/data \
    cloudreve/cloudreve:latest
# 查看初始管理员账户和密码（新版本注册第一个用户就是管理员）
```

### 0x30 Claude Relay Service

https://github.com/Wei-Shaw/claude-relay-service

https://pincc.ai/

```shell
# 创建目录
mkdir -p /data/docker_data/crs && cd /data/docker_data/crs
# 
curl -fsSL https://pincc.ai/crs-compose.sh -o crs-compose.sh && chmod +x crs-compose.sh && ./crs-compose.sh
# 启动服务
docker-compose up -d

# 更新
docker-compose pull
# 停止并删除旧容器
docker-compose down
# 重新启动服务
docker-compose up -d
```

### 0x31 闲鱼自动回复系统

https://github.com/zhinianboke/xianyu-auto-reply

```shell
docker run -d \
  -p 18888:8080 \
  -v /data/docker_data/xianyu_auto_reply/:/app/data/ \
  --name xianyu_auto_reply \
  registry.cn-shanghai.aliyuncs.com/zhinian-software/xianyu-auto-reply:1.0.2
```

### 0x32 new-api

https://github.com/QuantumNous/new-api?tab=readme-ov-file

```shell
docker network create \
  --driver bridge \
  --subnet 192.168.0.0/24 \
  --gateway 192.168.0.1 \
  dockernet

# 使用 SQLite（默认）
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest

# 使用 MySQL
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest

# 宝塔配置数据库权限 记得防火墙也要放开的 不然链接不上
127.0.0.1
192.168.%.%
# 
docker run --name new_api -d --restart always \
  -p 3040:3000 \
  -e SQL_DSN="root:123456@tcp(192.168.0.1:3306)/oneapi" \
  -e TZ=Asia/Shanghai \
  -v /data/docker_data/new_api:/data \
  --network=dockernet \
  calciumion/new-api:latest
  
docker pull calciumion/new-api:latest && \
docker rm -f new_api && \
docker run --name new_api -d --restart always \
  -p 3040:3000 \
  -e SQL_DSN="root:123456@tcp(192.168.0.1:3306)/oneapi" \
  -e TZ=Asia/Shanghai \
  -v /data/docker_data/new_api:/data \
  --network=dockernet \
  calciumion/new-api:latest
```

### 0x33 aiclient2api

```shell
docker run -d \
  --name aiclient2api \
  -p 3041:3000 \
  -v /data/docker_data/aiclient2api:/app/data \
  justlikemaki/aiclient-2-api:latest
```

### 0x34 gost

https://github.com/go-gost/gost

```shell
docker run -d --restart=always --net=host \
  --name gost \
  gogost/gost:latest \
  -L=socks5://user:pass@:1080?udp=true \
  -L=http://user:pass@:3128
```

### 0x35 Antigravity-Manager

https://github.com/lbjlaq/Antigravity-Manager

```
docker run -d --name antigravity_manager \
  -p 8045:8045 \
  -e API_KEY=sk-你自己改成强密钥 \
  -e WEB_PASSWORD=你的后台登录密码 \
  -e ABV_MAX_BODY_SIZE=104857600 \
  -v /data/docker_data/.antigravity_tools:/root/.antigravity_tools \
  --restart unless-stopped \
  lbjlaq/antigravity-manager:latest
```

### 0x36 CLIProxyAPI

> 将 Gemini CLI、Claude Code、Codex、Qwen Code 等 AI CLI 工具包装成 OpenAI 兼容的 HTTP API 服务
>
> 文档：https://help.router-for.me/introduction/quick-start.html
>
> GitHub：https://github.com/router-for-me/CLIProxyAPI
>
> 镜像：`eceasy/cli-proxy-api:latest`

```shell
# 创建目录
mkdir -p /data/docker_data/cli_proxy_api

# 写入最小启动配置
cat > /data/docker_data/cli_proxy_api/config.yaml << 'EOF'
port: 8317
auth-dir: /root/.cli-proxy-api
remote-management:
  allow-remote: true
EOF

# 推荐追加安全配置（按需修改后追加到 config.yaml）：
# api-keys: 客户端调用 API 时需要携带的 key，不设则不鉴权
# secret-key: 管理面板密码，留空则禁用管理 API
#
# api-keys:
#   - "sk-your-api-key"
# remote-management:
#   secret-key: "your_password"

# 启动
# 端口说明：8317=API服务, 8085=Gemini OAuth, 54545=Claude OAuth,
#          1455=Codex OAuth, 11451=iFlow OAuth, 51121=Antigravity OAuth
docker run -d \
  --name cli-proxy-api \
  --restart=always \
  -p 8317:8317 \
  -p 8085:8085 \
  -p 1455:1455 \
  -p 54545:54545 \
  -p 51121:51121 \
  -p 11451:11451 \
  -v /data/docker_data/cli_proxy_api/config.yaml:/CLIProxyAPI/config.yaml \
  -v /data/docker_data/cli_proxy_api/auth_data:/root/.cli-proxy-api \
  -v /data/docker_data/cli_proxy_api/logs:/CLIProxyAPI/logs \
  eceasy/cli-proxy-api:latest
```

登录 AI 服务（按需选，OAuth 类会打印 URL 复制到浏览器完成认证，Qwen 为交互式 device flow 需在终端输入）：

```shell
# Gemini CLI（免费，OAuth 端口 8085）
docker exec -it cli-proxy-api /CLIProxyAPI/CLIProxyAPI --no-browser --login

# Claude Code（OAuth 端口 54545）
docker exec -it cli-proxy-api /CLIProxyAPI/CLIProxyAPI --no-browser --claude-login

# Codex（OAuth 端口 1455）
docker exec -it cli-proxy-api /CLIProxyAPI/CLIProxyAPI --no-browser --codex-login

# Qwen Code（交互式 device flow，按终端提示操作）
docker exec -it cli-proxy-api /CLIProxyAPI/CLIProxyAPI --qwen-login

# iFlow（OAuth 端口 11451）
docker exec -it cli-proxy-api /CLIProxyAPI/CLIProxyAPI --no-browser --iflow-login

# Antigravity（OAuth 端口 51121）
docker exec -it cli-proxy-api /CLIProxyAPI/CLIProxyAPI --no-browser --antigravity-login
```

登录成功后：

- API 地址：`http://localhost:8317/v1`，兼容 OpenAI 格式，请求时 Header 带 `Authorization: Bearer sk-your-api-key`
- 管理面板：`http://localhost:8317/management.html`，密码为配置中的 `secret-key`
- 完整配置参考：https://github.com/router-for-me/CLIProxyAPI/blob/main/config.example.yaml

