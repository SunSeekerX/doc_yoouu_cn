# Jenkins

> 更新地址：[https://sunseekerx.yoouu.cn/basic/jenkins.html](https://sunseekerx.yoouu.cn/basic/jenkins.html)
>
> 更新时间：2020-05-05 20:39:33

## devops

![devops.png](https://static.yoouu.cn/static/imgs/doc/devops/devops.png)

## 配置插件下载加速

**第一次安装**

1. 在输入启动密码界面新开一个 tab 界面地址为：`${your jenkins url}/pluginManager/advanced`

2. 在 `Update Site` 输入 `https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`

3. 提交

4. 检查更新

5. 替换下载地址：

   进入 `Jenkins` 工作目录，进入更新配置位置

   `${jenkins}/updates/default.json`

   执行命令替换下载插件地址

   ```bash
   sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
   ```

6. 等待检查更新完毕，安装推荐的插件

**普通替换**

设置>插件>高级>升级站点>[https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json](https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json)

这一步只是替换了插件列表下载加速，下载的时候还是国外的源。

进入 Jenkins 工作目录，进入更新配置位置

`${jenkins}/updates/default.json`

执行命令替换下载插件地址

```bash
sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
```

每次更新了插件列表都要执行替换命令，否则下载地址会替换回去。

## 重要的打包命令记录

普通 vue 项目构建

```she
cd $WORKSPACE
# 安装依赖
yarn
# 执行打包构建
yarn build:prod
# 进入生成打包文件的目录
cd dist/
# 压缩所有文件
tar -zcvf dist.tar.gz *
```

发送构建到远程服务器

```
cd /www/wwwroot/xxx.com
find * | grep -v '\(.htaccess\|.user.ini\|favicon.ico\|dist.tar.gz\)' | xargs rm -rf
tar -zxvf dist.tar.gz -C ./
```



nestjs 项目到远程服务器打包

```shell
cd $WORKSPACE
tar --warning=no-file-changed -zcvf dist.tar.gz --exclude=./.git . || true
```

发送构建到远程服务器

```shell
#!/bin/sh
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc

cd /data/app/origin_nestjs_server

pm2 delete origin_nestjs_server

rm -rf ./src

tar -zxvf dist.tar.gz -C ./

# 安装依赖
yarn
# 打包
yarn build
# 定义环境变量
cat <<EOL > .env.production
SERVER_PORT=13002
IS_DEMO_ENV=false
UPLOAD_PATH=''
IS_OPEN_DOC=true
API_GLOBAL_PREFIX='/api'

DB_TYPE='mysql'
DB_HOST='localhost'
DB_PORT=3306
DB_DATABASE='xxxxxx'
DB_USER='xxxxxx'
DB_PASSWORD='xxxxxx'
DB_SYNCHRONIZE=true
DB_LOGGING=false

IS_USING_REDIS=true
REDIS_HOST='localhost'
REDIS_PORT=6379
REDIS_DB='2'
REDIS_PASSWORD=''

EOL

# 提示生成成功
echo ".env.production 文件已生成并写入到当前目录。"

# 启动项目
pm2 start ecosystem.config.js --env production
```



nuxtjs 项目

```shell
cd $WORKSPACE
# 安装依赖
yarn
# 定义环境变量
cat <<EOL > .env.prod
# API URLs
NESTJS_API_URL=http://localhost:13002/api

# Site Configuration
NUXT_PUBLIC_SITE_URL=https://navify.yoouu.cn
NUXT_PUBLIC_SITE_NAME=Navify
NUXT_PUBLIC_SITE_DESCRIPTION=🎨 一个充满美感的现代化导航网站应用
EOL
# 执行打包构建
yarn build:prod
# 进入生成打包文件的目录
cd .output/
# 压缩所有文件
tar -zcvf output.tar.gz *
```

发送构建到远程服务器

```shell
#!/bin/sh
set -e  # 遇到错误立即退出

# 加载环境
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc

# 检查目录是否存在
cd /data/app/navify.yoouu.cn || exit 1

# 检查压缩包是否存在
if [ ! -f output.tar.gz ]; then
    echo "Error: output.tar.gz not found"
    exit 1
fi

# 清理旧文件，保留特定文件
find * | grep -v '\(.htaccess\|.user.ini\|favicon.ico\|output.tar.gz\)' | xargs rm -rf

# 解压新文件
tar -zxvf output.tar.gz -C ./

# 重启服务
pm2 delete navify || true
NITRO_PORT=3004 pm2 start server/index.mjs --name navify

echo "Deployment completed successfully"
```



## Vue 项目自动化构建

`Jenkins`安装查看`Docker`章节。

`Jenkins`第一次安装完成最好重启一下，因为如果安装了语言包有些地方还是英文的。应该是个 bug。

## 前提

- `Vue`项目+`Git`
- 有`Jenkins`环境
- 有部署项目的服务器
- 域名
- Linux 知识

## 目标

在本地写好代码，一旦提交到`Git`，通过`web-hook`，触发`Jenkins`的自动构建任务，`Jenkins`自动从`Git`上面拉取代码>安装依赖>打包>发送到部署的服务器等一系列操作。

> 简单来说，我本地写好代码，我提交到`Git`之后，就有个东西帮我打包发送到服务器。我不需要管这些事，我只要写代码、测试、推代码就完事了。

目前需要实现的就是这样的功能，但`Jenkins`能做的不只是这么多。不过对于我目前的项目来说足够了。

## 实现 - 2021-03-17

> 原理：网站和部署都在 Jenkins 服务器。通过 Jenkins 拉取代码，通过远程登陆服务器，执行构建打包部署命令。

### 安装远程执行 ssh 插件 `SSH`

![](https://static.yoouu.cn/static/imgs/doc/basic/jenkins/jenkins-plugin-ssh.png)

## 实现 - old

> 部署网站和 Jenkins 不在同一服务器。

### 0x1 安装 ssh 发送插件 - `Publish Over SSH`

> 见名知意，通过`ssh`发布，用来将打包好的项目用`ssh`连接的方式发送到部署的服务器，并且执行其他的命令。

1. 选择系统管理
2. 选择插件管理
3. 页面直接`ctrl+f`搜索`ssh`，直接安装`Publish Over SSH`插件(不要用自带的过滤搜索没用)

![plugin-publish-over-ssh](https://static.yoouu.cn/static/imgs/2020/Jenkins/plugin-publish-over-ssh.png)

### 0x2 配置`ssh`插件

> 这里要配置的部署网站的服务器，我采用的方式是密码登录，也可以配置密钥文件登录的。看你的喜好。

1. 选择系统管理
2. 选择系统配置
3. 拉到最后面找到`Publish over SSH`
4. 新增`SSH - Server`
5. `name`标识该服务器的
6. `Hostname`服务器的`IP`
7. `Username`填写服务器的用户
8. 点开高级设置
9. 勾选`Use password authentication, or use a different key`
10. `Passphrase`填写密码
11. 填写完了点击`Test Configuration`测试下是否连接成功

![publish-over-ssh-setting](https://static.yoouu.cn/static/imgs/2020/Jenkins/publish-over-ssh-setting.png)

### 0x3 安装`nodejs`插件

1. 安装`nodejs`插件（`Jenkins`目前好像无法使用外部的`nodejs`）

   > 这个插件用来打包 vue 项目，跟我们自己本地执行`yarn build`等命令无区别。

   1. 选择系统管理
   2. 选择插件管理
   3. 页面直接`ctrl+f`搜索`nodejs`，直接安装`nodejs`插件(不要用自带的过滤搜索没用)
   4. 安装完成
   5. 选择系统管理
   6. 选择全局工具配置
   7. 选择新增 NodeJS
      1. 别名`node 12.16.3`
      2. 勾选自动安装
      3. 版本选择`12.16.3`，这是目前稳定的长期支持版本
      4. 保存

   ![plugin-nodejs](https://static.yoouu.cn/static/imgs/2020/Jenkins/plugin-nodejs.png)

## 新建项目配置

### 0x1 `新建项目` - `选择自由风格项目`

### 0x2 输入名称

![input-name](https://static.yoouu.cn/static/imgs/2020/Jenkins/input-name.png)

### 0x3 源码管理选择你的项目的`Git`

> 我的文档项目访问是公开的，可以直接访问，如果是私有项目还需要配置一个可访问的账号才可以。就是下面`Credentials`选项。

![repositories](https://static.yoouu.cn/static/imgs/2020/Jenkins/repositories.png)

### 0x4 构建触发器

> 勾选`GitHub hook trigger for GITScm polling`，这是一旦我们推送代码就会触发构建。

### 0x5 构建环境

> 勾选`Provide Node & npm bin/ folder to PATH`，这是提供`Node`命令给我们使用。

![build](https://static.yoouu.cn/static/imgs/2020/Jenkins/build.png)

### 0x6 增加构建步骤 - `执行shell`

![build-step](https://static.yoouu.cn/static/imgs/2020/Jenkins/build-step.png)

执行 shell 内容

> 由于内部的`node`环境和外部隔离，所以我们第一次使用的时候需要安装`yarn`和设置一些国内源。
>
> 这一步我们进行安装依赖和打包项目，并且将打包的项目压缩等待后续发送到部署的服务器上。

```bash
# 进入Jenkins工作空间下hxkj项目目录
cd /var/jenkins_home/workspace/sunseekerx

# 下面的命令只需要执行一次，后续可以删除
###
# npm切换为淘宝源
npm config set registry http://registry.npm.taobao.org/
# 安装yarn
npm i yarn -g
# yarn切换为淘宝源
yarn config set registry https://registry.npm.taobao.org
###

# 安装项目中的依赖
yarn
# 打包
yarn build
# 进入生成打包文件的目录
cd docs/.vuepress/dist
# 把生成的项目打包成压缩包，方便移动到项目部署目录
tar -zcvf sunseekerx.tar.gz *
```

执行完成之后会在服务器生成`sunseekerx.tar.gz`，下一步就是把这个文件发送到指定部署的服务器。进行解压。

![build-file](https://static.yoouu.cn/static/imgs/2020/Jenkins/build-file.png)

### 0x7 增加构建后的步骤

2024-11-25 17:26:07

增强版本命令，防止无法加载 pm2 

```bash
#!/bin/sh
set -e  # 遇到错误立即退出

# 加载环境
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc

# 检查目录是否存在
cd /data/app/navify.yoouu.cn || exit 1

# 检查压缩包是否存在
if [ ! -f output.tar.gz ]; then
    echo "Error: output.tar.gz not found"
    exit 1
fi

# 清理旧文件，保留特定文件
find * | grep -v '\(.htaccess\|.user.ini\|favicon.ico\|output.tar.gz\)' | xargs rm -rf

# 解压新文件
tar -zxvf output.tar.gz -C ./

# 重启服务
pm2 delete navify || true
pm2 start server/index.mjs --name navify

echo "Deployment completed successfully"
```



> 这一步将上一步打包好的文件发送到服务器，并且解压。

```bash
cd /www/wwwroot/sunseekerx.yoouu.cn
\echo ">>>当前工作路径："`pwd`
\shopt -s extglob
\echo ">>>删除：(.htaccess|.user.ini|sunseekerx.tar.gz)之外的文件"
\rm -rf !(.htaccess|.user.ini|sunseekerx.tar.gz)
\echo ">>>解压：sunseekerx.tar.gz"
\tar -zxvf sunseekerx.tar.gz -C ./
\echo ">>>移除：sunseekerx.tar.gz"
\rm -rf sunseekerx.tar.gz
\echo ">>>执行成功"
```

![send-flie](https://static.yoouu.cn/static/imgs/2020/Jenkins/send-flie.png)

### 0x8 测试构建

> 可以看到服务器有了构建之后的文件

![finish-build-files](https://static.yoouu.cn/static/imgs/2020/Jenkins/finish-build-files.png)

### 0x9 访问下网站试试，nice😁

![sunseekerx.yoouu.cn](https://static.yoouu.cn/static/imgs/2020/Jenkins/sunseekerx.yoouu.cn.png)

### 0x10 Git 设置`Webhooks`

前提是`Git`需要能访问到你的`Jenkins`，一旦有代码提交上来，`Git`就会去请求你这个地址，然后`Jenkins`触发构建动作。

> 简单来说就是我提交代码告诉`Git`，`Git`告诉`Jenkins`你该构建了，完了`Jenkins`去构建。`Git`就像仓库管理员，`Jenkins`就是干苦力的。😁

![github-webhook-setting](https://static.yoouu.cn/static/imgs/2020/Jenkins/github-webhook-setting.png)

### 0x10 测试下提交构建

在本地修改一些文件，提交上去，稍等一会儿查看`Jenkins`，这个处于等待中的任务就是提交的任务

![git-webhook](https://static.yoouu.cn/static/imgs/2020/Jenkins/git-webhook.png)

访问[https://sunseekerx.yoouu.cn/](https://sunseekerx.yoouu.cn/)试试，更新成功 🤣

![new-website](https://static.yoouu.cn/static/imgs/2020/Jenkins/new-website.png)

## uni-app 项目自动打包 docker 触发 rancher 自动更新

**使用内置的 nodejs**

**配置 webhook**

需要设置 gitlab 分支过滤

**Docker 打包脚本**

```shell
FROM nginx:stable-alpine
COPY conf/Shanghai /etc/localtime
COPY dist/ /usr/share/nginx/html/
COPY conf/cdev/cdev-admin.hnybt.com.cn.conf /etc/nginx/conf.d/default.conf
```

**Nginx 配置**

```nginx
server {
    listen 80;
    server_name cdev-wap.hnybt.com.cn;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri /index.html index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}

```

**jenkins 构建脚本**

```shell
#!/bin/bash -l
# 远程仓库地址
REMOTE_REGISTRY="registry.cn-hangzhou.aliyuncs.com"
# 环境变量
PROFILE="cdev"
# 是否快照参数
SNAPSHOT=
# 版本号
VERSION=0.1.0
# 名称
name="ybt-wap-${PROFILE}"
# 远程仓库地址
REMOTE_REP=$REMOTE_REGISTRY/ybt_$PROFILE
# 进入工作空间
cd $WORKSPACE/

# 登录docker
docker login --username=${username} -p ${password} $REMOTE_REGISTRY
# 项目构建
tyn
yarn build:h5

# Docke 构建镜像
docker build -f ./Dockerfile.${PROFILE} -t $name:$VERSION$SNAPSHOT .

# Docke 生成docker tag并推送到远端
docker tag  $name:$VERSION$SNAPSHOT $REMOTE_REP/$name:$VERSION$SNAPSHOT
docker push $REMOTE_REP/$name:$VERSION$SNAPSHOT
docker tag  $name:$VERSION$SNAPSHOT $REMOTE_REP/$name:latest
docker push $REMOTE_REP/$name:latest

# Rancher 重启
/usr/local/bin/kubectl --kubeconfig ~/.kube/ybt/config.cdev replace --force -f conf/cdev/ybt-wap-cdev.yaml
```
