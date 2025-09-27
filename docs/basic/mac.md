# Mac 技巧

## 系统技巧

### hidpi

Github：[https://github.com/xzhih/one-key-hidpi](https://github.com/xzhih/one-key-hidpi)

Github 文档：[https://github.com/xzhih/one-key-hidpi/blob/master/README-zh.md](https://github.com/xzhih/one-key-hidpi/blob/master/README-zh.md)

```shell
bash -c "$(curl -fsSL https://raw.githubusercontent.com/xzhih/one-key-hidpi/master/hidpi.sh)"
```

分辨率

```shell
# 3440x1440
2560x1072 5120x2144 2752x1152 5504x2304
```

[RDM - https://github.com/avibrazil/RDM](https://github.com/avibrazil/RDM)

[下载地址 - https://avi.alkalay.net/software/RDM/](https://avi.alkalay.net/software/RDM/)

### 关闭/打开聚焦索引

背景：Mac 上的 Spotlight 会调用 mds、mdworker 等进程，占用 cpu 使用率，造成系统卡顿。如果电脑配置比较低的话可以将 Spotlight 关闭，如果需要使用 Spotlight 或者 Alfred 等功能时，就需要将 Spotlight 开启。

关闭 Spotlight： 方法 1： 使用 launchctl 管理 MacOS 服务。这里卸载 Spotlight 的配置. 卸载配置之后，就不会再启动 mds 等进程来扫描文件，这样后续新增 App 或者文件，在 Spotlight 和 Alfred 中也就搜索不到了。

```shell
# 方法一
sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.metadata.mds.plist
# 方法二
sudo mdutil -a -i off

# 重启Spotlight: 方法1：使用 launchctl 管理 MacOS 服务。这里加载Spotlight的配置，重启mds等进程扫描文件。
# 方法一
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.metadata.mds.plist
# 方法2：
sudo mdutil -a -i on
# 如果方法2中的命令后抛出 Spotlight server is disabled 这样的错误，那么就要用方法1中的操作了。
```

### 修改 LaunchPad(启动台)图标大小的数量

```shell
defaults write com.apple.dock springboard-columns -int 8
defaults write com.apple.dock springboard-rows -int 5
killall Dock
```

以上命令都是干嘛的？

1. 调整每一列显示图标数量，8 表示每一列显示 8 个，数字部分可根据个人喜好进行设置。
2. 调整多少行显示图标数量，这里我用的是默认的 5，数字部分你也可以设置成 6 或者其他
3. 重启 Dock

恢复默认设置的方法，同样在终端中执行以下 4 行命令（全部复制）

```shell
defaults write com.apple.dock springboard-rows Default
defaults write com.apple.dock springboard-columns Default
defaults write com.apple.dock ResetLaunchPad -bool TRUE
killall Dock
```

### Mac 系统下的环境变量

```
a. /etc/profile
b. /etc/paths
c. ~/.bash_profile
d. ~/.bash_login
e. ~/.profile
f. ~/.bashrc
复制代码
```

其中 a 和 b 是`系统级别`的，系统启动就会加载，其余是用户接别的。c,d,e 按照从前往后的`顺序读取`，如果 c 文件存在，则后面的几个文件就会被忽略`不读了`，以此类推。~/.bashrc 没有上述规则，它是 bash shell 打开的时候载入的。这里建议在 c 中添加环境变量，以下也是以在 c 中添加环境变量来演示的:

### finder 显示隐藏文件

```shell
# 显示
defaults write com.apple.finder AppleShowAllFiles TRUE
killall Finder
# 重新打开

# 关闭
defaults write com.apple.finder AppleShowAllFiles FALSE
killall Finder
```

### 取消系统更新小红点

```shell
# 取消
defaults write com.apple.systempreferences AttentionPrefBundleIDs 0
killall Dock

# 恢复
sudo softwareupdate --reset-ignored
defaults write com.apple.systempreferences AttentionPrefBundleIDs 0
```

### 添加 adb 环境变量

前提已经成功安装了 Android Studio.

```shell
echo 'export ANDROID_HOME=/Users/$USER/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.zshrc

# 刷新
source ~/.zshrc
```

## 软件推荐

[hyperdock](https://macwk.com/soft/hyperdock)

docker 栏窗口预览，Windows 自带，mac 没有这个功能。

[magnet](https://macwk.com/soft/magnet)

分屏神器。

CleanMyMac

清除垃圾工具

tomenu

增强右键菜单

### 控制安卓手机 - scrcpy

记得使用代理安装！

The application is available in [Homebrew](https://brew.sh/). Just install it:

```
brew install scrcpy
```

You need `adb`, accessible from your `PATH`. If you don't have it yet:

```
# 查看 brew 版本
brew -v

# Homebrew >= 2.6.0
brew install --cask android-platform-tools

# Homebrew < 2.6.0
brew cask install android-platform-tools
```

It's also available in [MacPorts](https://www.macports.org/), which sets up adb for you:

```
sudo port install scrcpy
```

You can also [build the app manually](https://github.com/Genymobile/scrcpy/blob/master/BUILD.md).

## homebrew

### 官网

安装脚本在官网，需要用代理。

[https://brew.sh/](https://brew.sh/)

### 命令

```shell
# 升级 homebrew
brew update
# 升级软件包
brew upgrade
# 查看版本
brew --version
```

## java 版本管理

[jEnv](https://www.jenv.be/)

1. 安装

   ```shell
   brew install jenv
   ```

2. 配置环境变量

   ```shell
   # Bash
   echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
   echo 'eval "$(jenv init -)"' >> ~/.bash_profile

   # Zsh
   echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
   echo 'eval "$(jenv init -)"' >> ~/.zshrc
   ```

3. 配置文件增加的内容 `~/.zshrc`

   ```shell
   export PATH="$HOME/.jenv/bin:$PATH"
   eval "$(jenv init -)"

   # To enable shims and autocompletion add to your profile:
   if which jenv > /dev/null; then eval "$(jenv init -)"; fi

   # To use Homebrew's directories rather than ~/.jenv add to your profile:
   export JENV_ROOT=/usr/local/opt/jenv
   ```

4. 添加安装的 JAVA 到 jEnv然后就可以了，如果没添加会出现类似下面的结果

   ```
   $ jenv doctor                                                                                                     ‹system: ruby 2.6.10p210›
   [OK]	No JAVA_HOME set
   [ERROR]	Java binary in path is not in the jenv shims.
   [ERROR]	Please check your path, or try using /path/to/java/home is not a valid path to java installation.
   	PATH : /usr/local/Cellar/jenv/0.5.6/libexec/libexec:/Users/ssx/.jenv/shims:/Users/ssx/.jenv/bin:/Users/ssx/.nvm/versions/node/v18.17.0/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin
   [OK]	Jenv is correctly loaded
   ```

5. To make sure `JAVA_HOME` is set, make sure to enable the `export` plugin:

   ```shell
   jenv enable-plugin export
   exec $SHELL -l
   ```

6. jEnv 命令

   ```shell
   # 检查运行是否正常
   jenv doctor
   
   # 添加到 jEnv
   jenv add /Library/Java/JavaVirtualMachines/jdk1.8.0_321.jdk/Contents/Home
   
   # 显示已经添加的版本
   jenv versions
   
   # 查看版本
   jenv --version
   
   # 设置全局 jdk 版本
   jenv global oracle64-1.6.0.39
   # 设置文件夹版本 // Configure local version (per directory)
   jenv local oracle64-1.6.0.39
   # 设置当前会话版本
   jenv shell oracle64-1.6.0.39
   
   # 查看安装的 jdk 版本
   /usr/libexec/java_home -V
   
   # 输出
    ssx@ssxdeMac-mini  ~  /usr/libexec/java_home -V
   Matching Java Virtual Machines (3):
       1.8.321.07 (x86_64) "Oracle Corporation" - "Java" /Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home
       1.8.0_321 (x86_64) "Oracle Corporation" - "Java SE 8" /Library/Java/JavaVirtualMachines/jdk1.8.0_321.jdk/Contents/Home
       1.7.0_80 (x86_64) "Oracle Corporation" - "Java SE 7" /Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home
   ```

## iterm2 配置

### 安装 iterm2

[https://iterm2.com/](https://iterm2.com/)

### 检查是否安装 zsh

```shell
zsh --version
```

如果没有安装使用 Homebrew 安装，安装 Homebrew [https://brew.idayer.com/](https://brew.idayer.com/)

```shell
brew install zsh
```

设置默认

```shell
chsh -s /usr/local/bin/zsh
```

### 把 iTerm2 设为默认

```
iTerm2 -> Make ITerm2 Default Term
```

### iTerm2 颜色配置

[https://iterm2colorschemes.com/](https://iterm2colorschemes.com/)

## oh-my-zsh

记得先安装 zsh

```shell
# 检查是否安装
zsh --version
# 查看默认 shell
echo $SHELL
# 期待输出 /usr/bin/zsh
# 安装 zsh
sudo apt install zsh
# 验证是否安装
zsh --version
# 设置为默认
chsh -s $(which zsh)
# 注销并重新登录,或重启系统,使更改生效。
```

安装Z SH 教程：https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH

[https://ohmyz.sh/](https://ohmyz.sh/)

选择下面其中一种脚本安装：

curl：

```shell
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

wget：

```shell
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

### 配置主题

官方收集了一些主题（不再收录新主题），你可以访问 [主题&&截图](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) 页面查看并选取。

这里以`agnoster`为例说明。

1.编辑`~/.zshrc`文件，修改`ZSH_THEME`配置：

```shell
ZSH_THEME="agnoster"
```

- agnoster
- amuse

### 功能增强

#### 1. zsh-autosuggestions

命令自动补全功能。

1.克隆代码到`$ZSH_CUSTOM/plugins`（默认位于`~/.oh-my-zsh/custom/plugins`）

```shell
git clone https://gitee.com/imirror/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2.在`Oh My Zsh`配置启用插件

打开`~/.zshrc`，找到`plugins`，追加`zsh-autosuggestions`。

`git`为默认配置。

```shell
plugins=(git zsh-autosuggestions)
```

如果有看不到自动补全的内容，确保以下两个颜色不是相近的：

```shell
iTerm > Preferences > Profiles > Colors > ANSI Colors > Bright > Black
iTerm > Preferences > Profiles > Colors > Basic Colors > Background
```

最后执行`source ~/.zshrc`生效。

#### 2. zsh-syntax-highlighting

语法高亮。

1.克隆代码到`$ZSH_CUSTOM/plugins`（默认位于`~/.oh-my-zsh/custom/plugins`）

```shell
git clone https://gitee.com/imirror/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

2.在`Oh My Zsh`配置启用插件

打开`~/.zshrc`，找到`plugins`，追加`zsh-syntax-highlighting`。

`git`为默认配置。

```shell
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

最后执行`source ~/.zshrc`生效。

#### 我启用的插件列表

```shell
plugins=(git zsh-autosuggestions zsh-syntax-highlighting bundler dotenv macos rake rbenv ruby)
```

#### 如果安装完成出现

```shell
rbenv_prompt_info:2: command not found: ruby
# ubuntu 解决
```

1. 首先，安装 rbenv 和 ruby-build：

   ```shell
   sudo apt update
   sudo apt install rbenv
   ```

2. 如果上面的命令无法安装 rbenv，您可以尝试从 GitHub 克隆 rbenv 仓库：

   ```
   git clone https://github.com/rbenv/rbenv.git ~/.rbenv
   ```

3. 添加 rbenv 到您的 PATH。编辑 ~/.bashrc 文件（如果您使用的是 bash）或 ~/.zshrc 文件（如果您使用的是 zsh），添加以下行：

   ```shell
   export PATH="$HOME/.rbenv/bin:$PATH"
   eval "$(rbenv init -)"
   ```

4. 重新加载 shell 配置：

   ```shell
   source ~/.bashrc  # 或 source ~/.zshrc
   ```

5. 验证 rbenv 安装：

   ```shell
   type rbenv
   ```

   这应该显示 rbenv 的路径。

6. 安装 ruby-build 插件（如果还没有安装）：

   ```shell
   mkdir -p "$(rbenv root)"/plugins
   git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
   ```

7. 现在，安装一个 Ruby 版本：

   ```shell
   rbenv install 3.0.0  # 或其他您想要的版本

   # 查看可以安装的版本
   rbenv install -l
   ```

8. 设置全局 Ruby 版本：

   ```shell
   rbenv global 3.0.0
   ```

9. 验证 Ruby 安装：

   ```shell
   ruby -v
   ```
