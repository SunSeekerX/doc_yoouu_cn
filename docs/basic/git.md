# Git

常用工作示例

![工作流程图（来源于阮一峰老师的博客）](https://static.yoouu.cn/imgs/doc/basic/git/bg2015120901.png)

专用名词解释：

1. Workspace: 工作区
2. Index / Stage: 暂存区
3. Repository: 本地仓库
4. Remote: 远程仓库（例如`Github`、`Gitlab`、 `码云`）

## 基本配置

```bash
# 安装完Git后第一件要做的事，设置用户信息(global可换成local在单独项目生效)：
git config --global user.name "Your Name" # 设置用户名
git config --global user.email "email@example.com"   #设置邮箱
git config --global user.name   # 查看用户名是否配置成功
git config --global user.email   # 查看邮箱是否配置

# example
git config --global user.name "SunSeekerX"
git config --global user.email "1647800606@qq.com"
git config --global user.email "sunseekerxi@gmail.com"

# 其他查看配置相关
git config --global --list  # 查看全局设置相关参数列表
git config --local --list # 查看本地设置相关参数列表
git config --system --list # 查看系统配置参数列表
git config --list  # 查看所有Git的配置(全局+本地+系统)
git config --global color.ui true # 显示git相关颜色

# 创建一个`ssh key`，直接回车，文件存在，不用的直接删除目录，有用的就直接复制`ssh key`
ssh-keygen -t rsa -b 4096 -C "sunseekerxi@gmail.com"
# 把密钥放在剪贴板
clip < ~/.ssh/id_rsa.pub

# 添加所有目录为安全目录
git config --global --add safe.directory "*"
```

## 常用命令

```shell
# 把本地的目录变成 git 本地仓库（执行一次即可）
git init

# 将你本地仓库与远程仓库关联起来(可以关联多个地址)
git remote add [远程地址别名] [远程仓库地址]

# 查看本地仓库文件状态
git status

# 添加整个工作区所有发生改变的文件到暂存区
git add -A

# 将暂存区文件放到本地仓库，`-m`后面接注释写上本次更改的地方
git commit -m 'Commit message'

# 合并远程仓库的更新（push 之前必须先合并）
git pull [远程地址别名] [远程仓库分支]

# 将本地当前分支的 commit 推送到远程指定分支，（`-u`指定该远程地址为默认，后面就可以不加任何参数使用 git push 了）
git push -u [远程地址别名] [远程仓库分支]
```

## 全局 http 和 https 代理

提交`Github`和`Gitlab`的代码在某些时候非常慢，这个时候就可以配置代理加速代码提交和拉取。

**只有`http`和`https`方式可以代理**，`ssh`使用方式无法使用。

设置代理 http.proxy 后面接你的本地代理地址和端口

```bash
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

## 问题解决

```shell
# 重装系统出现 fatal: detected dubious ownership in repository
# 添加全部目录
git config --global --add safe.directory "*"
```

## mac 安装 git 验证中心

解决 mac git 无法使用账号密码登录

```
brew tap microsoft/git
brew install --cask git-credential-manager-core
```

## 多个 git 账号

C:\Users\ssx\.ssh\config

```
Host github.com
    HostName github.com
    User git
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa

Host alias
    HostName github.com
    User git
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_zkkrt001@gmail.com
```

如果 git 地址是 `git clone git@github.com:xxxxxx/yyyyyyyyy.git`

换成用

```
git clone git@alias:xxxxxx/yyyyyyyyy.git
```

就可以 clone 代码了

## 常用操作

### 将文件添加到仓库

```bash
# 将工作区的某个文件添加到暂存区
git add 文件名

# 添加所有被tracked文件中被修改或删除的文件信息到暂存区，不处理untracked的文件
git add -u

# 添加所有被tracked文件中被修改或删除的文件信息到暂存区，包括untracked的文件
git add -A

# 将当前工作区的所有文件都加入暂存区
git add .

# 进入交互界面模式，按需添加文件到缓存区
git add -i
```

### 将暂存区文件提交到本地仓库

```bash
# 将暂存区内容提交到本地仓库
git commit -m ${提交说明}

# 跳过缓存区操作，直接把工作区内容提交到本地仓库
git commit -a -m ${提交说明}
```

### 查看仓库当前状态

```bash
git status
```

### 比较文件异同

```bash
# 工作区与暂存区的差异
git diff

#工作区与某分支的差异，远程分支这样写：remotes/origin/分支名
git diff 分支名

# 工作区与HEAD指针指向的内容差异
git diff HEAD

# 工作区某文件当前版本与历史版本的差异
git diff 提交id 文件路径

# 工作区文件与上次提交的差异(1.6 版本前用 --cached)
git diff --stage

# 查看从某个版本后都改动内容
git diff 版本TAG

# 比较从分支A和分支B的差异(也支持比较两个TAG)
git diff 分支A 分支B

# 比较两分支在分开后各自的改动
git diff 分支A...分支B

# 另外：如果只想统计哪些文件被改动，多少行被改动，可以添加 --stat 参数
```

### 查看历史记录

```bash
# 查看所有commit记录(SHA-A校验和，作者名称，邮箱，提交时间，提交说明)
git log

# 查看最近多少次的提交记录
git log -p -次数

# 简略显示每次提交的内容更改
git log --stat

# 仅显示已修改的文件清单
git log --name-only

# 显示新增，修改，删除的文件清单
git log --name-status

# 让提交记录以精简的一行输出
git log --oneline

# 图形展示分支的合并历史
git log –graph –all --online

# 查询作者的提交记录(和grep同时使用要加一个--all--match参数)
git log --author=作者

# 列出提交信息中包含过滤信息的提交记录
git log --grep=过滤信息

# 和--grep类似，S和查询内容间没有空格
git log -S查询内容

# 查看某文件的修改记录，找背锅专用
git log fileName
```

### 代码回滚

```bash
# 恢复成上次提交的版本
git reset HEAD^

# 恢复成上上次提交的版本，就是多个^，以此类推或用~次数
git reset HEAD^^

git reflog

git reset --hard 版本号

--soft：只是改变HEAD指针指向，缓存区和工作区不变；
--mixed：修改HEAD指针指向，暂存区内容丢失，工作区不变；
--hard：修改HEAD指针指向，暂存区内容丢失，工作区恢复以前状态；
```

### 删除工作区文件

```bash
git rm ${文件名}
```

### 本地仓库文件替换工作区的文件：撤销更改

```bash
# 文件路径填“.”可以撤销当前工作区所有更改
git checkout -- ${文件路径}
```

### 本地分支推送到远程分支

```bash
# 可以新建远程分支
git push -u ${远程仓库别名} ${本地分支名}:${远程分支名}
```

### 推送本地所有分支到远程仓库

```shell
git push newremote --tags refs/remotes/origin/*:refs/heads/*

# 如果你的第二个远程仓库是通过 git remote set-url --add origin [your url] 这种方式添加的
git push origin --tags refs/remotes/origin/*:refs/heads/*

# 如果你添加了第二个远程提交信息
# git remote add origin2 [your url]
git push origin2 --tags refs/remotes/origin/*:refs/heads/*
```

### 本地仓库推送到多个远程仓库

```bash
# 查看帮助
git remote set-url origin --help
git remote set-url --add <name> <newurl>
git remote set-url --delete <name> <url>
```

### 从远程仓库克隆项目到本地

```bash
git clone ${项目地址}
```

### 创建分支

```bash
# -b表示创建并切换分支
git checkout -b ${新建分支名}

# 上面一条命令相当于下面的二条：

# 创建分支
git branch ${新建分支名}

# 切换分支
git checkout ${本地分支名}
```

### 查看分支

```bash
git branch
```

### 合并分支

```bash
# 用于合并指定分支到当前分支
git merge ${本地分支名}

# 加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并
git merge --no-ff -m "merge with no-ff" ${本地分支名}
```

### 删除本地分支

```bash
# 删除本地分支，如果本地分支未完全合并是无法删除的，需要将-d改为-D表示强制删除
git branch -d ${本地分支名}

```

### 删除远程分支

```shell
git push origin --delete <branchName>
```

### 同步远程已删除的分支

```bash
# 删除远程分支
git push origin --delete ${远程分支名}
# 查看本地分支和追踪情况
git remote show origin
# 清理远程已删除本地还存在的分支
git remote prune origin
# 删除本地多余分支
git branch -D ${本地分支名}
```

### 查看分支合并图

```bash
git log --graph --pretty=oneline --abbrev-commit
```

### 查看远程库信息

```bash
git remote
# -v 显示更详细的信息
```

### 撤消某次提交

```bash
# 撤销最近的一个提交
git revert HEAD

# 撤销某次commit
git revert ${版本号}
```

### 撤销本次所有更改

```bash
# 撤销本次所有更改,会撤销本次所有的更改。不包括已经commit的
git checkout -- .
```

### 拉取远程分支到本地仓库

```bash
# 会在本地新建分支，并自动切换到该分支
git checkout -b ${本地分支} ${远程地址别名}/${远程分支 }

# 会在本地新建分支，但不会自动切换，还需checkout
git fetch origin ${远程分支}:${本地分支}

# 建立本地分支与远程分支的链接
git branch --set-upstream ${本地分支} ${远程分支

# 例如，下面代码执行会拉取远程1.1.0分支然后在本地创建名为1.1.0的分支，冒号右边的是本地分支名，可以自定义
git fetch origin 1.1.0:1.1.0
```

## tag

### 标签命令 - tag

```bash
# 打标签命令，默认为HEAD
git tag ${标签}

# 显示所有标签
git tag

# 给某个commit版本添加标签
git tag ${标签} ${版本号}

# 显示某个标签的详细信息
git show ${标签}

# 删除一个本地标签
git tag -d <tagname>
# 删除一个远程标签
git push origin :refs/tags/<tagname>
```

### 同步远程仓库更新

```bash
git fetch ${远程地址别名} ${远程分支名}

# 例如
git fetch origin master
# 从远程获取最新的到本地，首先从远程的origin的master主分支下载最新的版本到origin/master分支上，然后比较本地的master分支和origin/master分支的差别，最后进行合并。

# git fetch 比 git pull更加安全
```

### 终止合并

```bash
# 终止合并,如果合并冲突过多，想要终止合并
git merge --abort
```

### 怎么更换 git 远程仓库地址

方法一 ： 通过命令直接修改远程仓库地址

```bash
# 查看所有远程仓库
git remote -v

# 你新的远程仓库地址
git remote set-url origin ${新的地址}
```

方法二： 先删除在添加你的远程仓库

```bash
# 删除远程仓库关联
git remote rm ${远程地址别名}

# 你的新远程仓库地址
git remote add origin ${新的地址}
```

### 拉取指定分支代码

```bash
 git clone -b ${远程分支名} ${远程仓库地址}
```

## 参考链接

- [如何进阶成公司 Git 小能手(常见问题总结)](http://www.inode.club/webframe/tool/git.html) By koala
- [常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html) By 阮一峰
