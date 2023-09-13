# Python

## 三、安装pyenv

1. 在家目录里clone项目:

```bash
 $ git clone https://github.com/pyenv/pyenv.git ~/.pyenv

# MacOS的话可以直接用homebrew安装
$ brew update
$ brew install pyenv
```

2. 添加shell配置文件中追加如下: (如zshrc)

```text
export PYENV_ROOR="$HOME/.pyenv"
export PATH=$PYENV_ROOT/shims:$PATH
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

3. source一下配置文件, 输入pyenv --version测试一下

## 四、简单使用

```text
# 查看当前版本
pyenv version

# 查看所有版本
pyenv versions

# 查看所有可安装的版本
pyenv install --list

# 安装指定版本
pyenv install 3.6.5
# 安装新版本后rehash一下
pyenv rehash

# 删除指定版本
pyenv uninstall 3.5.2

# 指定全局版本
pyenv global 3.6.5

# 指定多个全局版本, 3版本优先
pyenv global 3.6.5 2.7.14

# 实际上当你切换版本后, 相应的pip和包仓库都是会自动切换过去的
```

## 五、包管理插件pyenv-virtualenv

首先下载:

```text
$ git clone https://github.com/pyenv/pyenv-virtualenv.git $.pyenv/plugins/pyenv-virtualenv
```

克隆完成后添加如下到shell配置文件(mac的话是.zshrc)

```text
$ echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
```

实际上mac用户直接brew安装就可以了...

```text
$ brew install pyenv-virtualenv
$ eval "$(pyenv init -)"
$ eval "$(pyenv virtualenv-init -)"
```

使用:

```text
# 创建一个3.6.5版本的虚拟环境, 命名为v365env, 然后激活虚拟环境
$ pyenv virtualenv 3.6.5 v365env
$ pyenv activate v365env
# 关闭虚拟环境
$ pyenv deactivate v365env
```

当切换python解释器的时候对应的pip和包库也会一并切换过去, 而且可以为指定版本的解释器创建项目所需的虚拟环境, 切换的时候也异常简单, 个人常用的做法是为每个项目创建不同的虚拟环境, 当进入该环境的时候就可以随便浪而不用担心影响到其它项目, 搭配Pycharm使用效果更佳.
