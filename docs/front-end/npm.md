# NPM 技巧

## 设置包缓存目录

mac 一般不需要，因为不分区

### windows

新建

```
d:\data\node_package\npm
d:\data\node_package\npm_cache
d:\data\node_package\yarn
d:\data\node_package\yarn_cache
d:\data\node_package\.pnpm-store
```

更改

```shell
# npm
npm config set prefix "d:\data\node_package\npm"
npm config set cache "d:\data\node_package\npm_cache"

# yarn
yarn config set global-folder "d:\data\node_package\yarn"
yarn config set cache-folder "d:\data\node_package\yarn_cache"

# pnpm
pnpm config set store-dir "d:\data\node_package\.pnpm-store"
```

### wsl

wsl 还是别改了。等下一堆问题

```shell
# npm
npm config set prefix "/mnt/d/data/wsl/node_package/npm"
npm config set cache "/mnt/d/data/wsl/node_package/npm_cache"
# 删除
npm config delete prefix
npm config delete cache

# yarn
yarn config set global-folder "/mnt/d/data/wsl/node_package/yarn"
yarn config set cache-folder "/mnt/d/data/wsl/node_package/yarn_cache"

# pnpm
pnpm config set store-dir "/mnt/d/data/wsl/node_package/.pnpm-store"
```

### wsl 添加环境变量

```shell
# bash
echo 'export PATH="/mnt/d/data/wsl/node_package/npm/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# zsh
echo 'export PATH="/mnt/d/data/wsl/node_package/npm/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 查看配置

```shell
# npm
npm config list

# yarn
yarn config list

# pnpm
pnpm config list
```

## 📌 npm 常用命令

```shell
# 清除缓存
npm cache clean -f
# 查看全局安装的包
npm list -g --depth 0
# 卸载全局安装的包
npm uninstall -g jshint
# 更新全局安装的包
npm install -g npm

# 更改下载的包位置
npm config set prefix "d:\data\node_package\npm"
npm config set cache "d:\data\node_package\npm_cache"
# 查看配置
npm config list

# 加速下载常用
# 1、查看一下当前源
npm config get registry
# 2、切换为淘宝源
npm config set registry https://registry.npmmirror.com
# 3、换成原来的
npm config set registry https://registry.npmjs.org/

# 设置代理
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
# 取消代理
npm config delete proxy
npm config delete https-proxy
```

## 📌 yarn 常用命令

```shell
# 升级依赖
yarn upgrade-interactive
# 清除缓存
yarn cache clean
# 升级到最新的稳定 yarn 版本
yarn set version latest

# 更改下载的包位置
yarn config set global-folder "d:\data\node_package\yarn"
yarn config set cache-folder "d:\data\node_package\yarn_cache"
# 查看配置
yarn config list

# 设置代理
yarn config set proxy http://127.0.0.1:7890
yarn config set https-proxy http://127.0.0.1:7890

# 如果 SSL 报错，可以禁用校验
yarn config set strict-ssl false

# 加速下载常用
# 1、查看一下当前源
yarn config get registry
# 2、切换为淘宝源
yarn config set registry https://registry.npmmirror.com
# 3、或者切换为自带的
yarn config set registry https://registry.yarnpkg.com
```

### Workspace

```shell
# 查看工作区列表
yarn workspaces list
# 在指定的package中运行指定的命令。
yarn workspace <workspace_name> <command>
# 在所有package中运行指定的命令，若某个package中没有对应的命令则会报错。
yarn workspaces run <command>
```

**安装根目录包**

- -D: 作为开发依赖安装
- -W: `--ignore-workspace-root-check` 表示安装到工作区的根目录

```shell
yarn add [package_name] -D -W
yarn remove [package_name] -W
```

**安装 dependencies**

```shell
yarn workspace [package_name] add [package_name]@[version]
```

**安装 devDependencies**

```shell
yarn workspace [package_name] add -D [package_name]@[version]
```

**删除包**

```shell
yarn workspace [package_name] remove [package_name]
```

**查看信息**

```shell
yarn workspaces info --json
```

**启动**

```shell
yarn workspaces run test
```

### 升级到 yarn3

官方文档：[https://yarnpkg.com/getting-started/migration](https://yarnpkg.com/getting-started/migration)

1. 升级全局安装的 yarn 到最新的 v1

   ```shell
   npm install -g yarn
   ```

2. 进入你项目的根目录

3. 启用 v2

   ```shell
   yarn set version berry
   ```

4. 如果使用了 `.npmrc` or `.yarnrc` 需要切换为[新的格式](https://yarnpkg.com/configuration/yarnrc)

5. 添加[`nodeLinker: node-modules`](https://yarnpkg.com/configuration/yarnrc#nodeLinker) 到 `.yarnrc.yml`

   ```yaml
   # httpProxy: "http://127.0.0.1:7890" # 代理选择打开

   # httpsProxy: "http://127.0.0.1:7890" # 代理选择打开

   # 如果不配置这个 jenkins 无法安装依赖，看原因是需要将 yarn.lock 提交上来
   enableImmutableInstalls: false

   npmRegistryServer: 'https://registry.npmmirror.com'

   nodeLinker: node-modules

   yarnPath: .yarn/releases/yarn-3.2.1.cjs
   ```

6. 安装版本插件

   ```shell
   yarn plugin import version
   ```

7. 添加 `.gitignore`，[更多参考](https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored)

   ```shell
   # yarn 2.0+
   .pnp.*
   .yarn/*
   !.yarn/patches
   !.yarn/plugins
   !.yarn/releases
   !.yarn/sdks
   !.yarn/versions
   ```

8. 生成新版本的 `lockfile`

   ```shell
   yarn
   ```

9. 提交你的修改

**lerna**

多 Workspace 管理包的，未作深入研究。

首先使用 [npm](https://www.npmjs.com/) 将 Lerna 安装到全局环境中：

推荐使用 Lerna 2.x 版本。

```
npm install --global lerna
```

接下来，我们将创建一个新的 git 代码仓库：

```
git init lerna-repo && cd lerna-repo
```

现在，我们将上述仓库转变为一个 Lerna 仓库：

```
lerna init
```

你的代码仓库目前应该是如下结构：

```
lerna-repo/
  packages/
  package.json
  lerna.json
```

## 📌 pnpm 常用命令

```shell
# 安装
npm install -g pnpm
# 设置下载的包位置
pnpm config set store-dir "d:\data\node_package\pnpm"
# 查看配置
pnpm config list
# 安装依赖
pnpm install
```

## 📌 常用全局模块

### 快捷安装

```shell
npm i yarn pnpm tbify sort-package-json http-server npm-check-updates cross-env pm2 commitizen cz-conventional-changelog -g --registry=https://registry.npmmirror.com
```

### tbify

强烈建议使用该工具替换那种换源的方式进行下载加速。

**安装**

```bash
npm install -g tbify
```

**使用**

对于常用的包管理命令，`tbify` 提供了使用淘宝 NPM 镜像的等价命令，除了发布包到 npm 时必须使用 `npm publish` 外，都可以使用等价命令进行相关操作：

| 原命令 | 使用淘宝 NPM 镜像的命令 | 示例                  |
| ------ | ----------------------- | --------------------- |
| `nvm`  | `tnvm` (或 `tbify nvm`) | `tnvm install 8.0.0`  |
| `npm`  | `tnpm` (或 `tbify npm`) | `tnpm install react`  |
| `npx`  | `tnpx` (或 `tbify npx`) | `tnpx kill-port 3000` |
| `yarn` | `tyn` (或 `tbify yarn`) | `tyn add react`       |
| `pnpm` | `tpm` (或 `tbify pnpm`) | `tpm add react`       |
| `pnpx` | `tpx` (或 `tbify pnpx`) | `tpx kill-port 3000`  |

对于其他命令，在使用时加上 `tbify` 前缀即可，比如：

```bash
tbify printenv npm_config_registry
# -> https://r.npm.taobao.org
```

### sort-package-json

对项目的 `package.json` 进行排序，满足你的强迫症

```shell
# 1.全局安装插件
npm install --global sort-package-json
# 2.排序
npx sort-package-json
```

### tree-node-cli

用来生成文件树的插件，因为 windows 提供的 `tree` 不太好用。

安装

```shell
npm install -g tree-node-cli
```

使用示例

```shell
treee -L 3 -I "node_modules|.idea|objects|.git|.yarn" -a --dirs-first
```

帮助

```
$ tree -h

  Usage: tree [options]

  Options:

    -V, --version             output the version number
    -a, --all-files           All files, include hidden files, are printed.
    --dirs-first              List directories before files.
    -d, --dirs-only           List directories only.
    -s, --sizes               Show filesizes.
    -I, --exclude [patterns]  Exclude files that match the pattern. | separates alternate patterns. Wrap your entire pattern in double quotes. E.g. `"node_modules|coverage".
    -L, --max-depth <n>       Max display depth of the directory tree.
    -r, --reverse             Sort the output in reverse alphabetic order.
    -F, --trailing-slash      Append a '/' for directories.
    -S, --line-ascii          Turn on ASCII line graphics.
    -h, --help                output usage information
```

### http-server

安装

```shell
npm i http-server -g
```

使用，进入到需要使用静态服务器的目录直接执行

```shell
http-server
```

### npm-check-updates

安装：

```bash
npm install -g npm-check-updates
```

使用： 检查 package.json 中 dependencies 的最新版本：

```bash
ncu
```

更新 dependencies 到新版本：

```bash
ncu -u
```

更新全部 dependencies 到最新版本(包括当前指定版本范围满足最新版本号的,比如^4.2.0 -> ^4.3.0)：

```bash
ncu -a
```

### cross-env

安装

```shell
npm i cross-env -g
```

## 📌 常用项目模块

### husky

当您提交或推送时，您可以使用它来检查**您的提交消息**、**运行测试**、检查**代码**等。Husky 支持[所有 Git 钩子](https://git-scm.com/docs/githooks)。

**安装 husky（v8）**

```shell
# 自动安装
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm
```

查看文档进行手动安装 [https://typicode.github.io/husky/#/?id=manual](https://typicode.github.io/husky/#/?id=manual)

> hint: The '.husky/pre-commit' hook was ignored because it's not set as executable. hint: You can disable this warning with `git config advice.ignoredHook false`.
>
> ```shell
> chmod ug+x .husky/*
> ```

## 📌 NodeJs 版本管理 - nvm

### windows

使用 [nvm](https://github.com/coreybutler/nvm-windows) 进行管理，具体安装查看 github 说明。

### mac

[nvm](https://github.com/nvm-sh/nvm) 具体安装查看 github 说明。

### ubuntu

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

1. 基本使用

   ```shell
   # 查看远程可用
   nvm ls-remote
   # 查看远程可用 lts 版本
   nvm ls-remote --lts
   # 安装指定版本
   nvm install v16.17.1
   # 使用指定版本
   nvm use v16.17.1
   # 指定默认的版本
   nvm alias default node
   nvm alias default v16.17.1
   ```

~~其他用户使用 nvm，需要重新安装一份。~~

```shell
# 进入用户文件夹，这里以 ssx 用户为例
cd $HOME
# 创建文件夹
mkdir -p  work/app
# 编辑用户的配置文件
vim .profile
# 添加
export NVM_BIN="/home/ssx/work/app/nvm/versions/node" # node安装地址
export NVM_DIR="/home/ssx/work/app/nvm" # nvm安装地址
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# 创建文件夹
mkdir -p /home/ssx/work/app/nvm
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# 退出当前用户，重新登录下，就可以使用 nvm 了
```

## 📌 规范提交代码 Commitizen

> [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.2/)
>
> 一种用于给提交信息增加人机可读含义的规范
>
> [Commitizen](http://commitizen.github.io/cz-cli/) - 命令行规范提交工具
>
> 文章参考：
>
> [Commit message 和 Change log 编写指南 - 阮一峰](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
>
> [如何配置 Git Commit Message - 伯艺](https://zhuanlan.zhihu.com/p/69635847)

### 1. 安装 [Commitizen](https://github.com/commitizen/cz-cli)

替代你的 git commit（帮助我们生成符合规范的 commit message）

commitizen 为我们提供一些 cli 命令，比如：commitizen init、 git cz

推荐全局安装

```bash
npm install -g commitizen
```

### 2. 安装 [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)

是一个`commitizen`的 adapter（适配器），一个符合 Angular 团队规范的 preset（按照我们指定的规范帮助我们生成 commit message）

还有很多花里胡哨的适配器可以选择，看你们团队的选择了，例如带 `emoji` 表情的。。。😆

个人推荐全局安装，因为这个包貌似和其他的包会产生某些冲突，导致项目用 `yarn` 方式安装的包无法使用，只能用 `npm`。

```bash
npm install -g cz-conventional-changelog
```

### 3. 全局指定配置器

使用 `bash` 环境执行以下命令，这是指定全局的适配器路径

```bash
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

**执行完这一步就可以使用了，下面的步骤为高级用法！一般是不需要下面的玩法了！！！**

### 4. 局部安装（项目级别，全局安装不需要）

接下来，通过键入命令初始化项目以使用 cz-convention -changelog 适配器

```bash
# 有两种安装方式

# 1.手动安装 [推荐]
yarn add cz-conventional-changelog -D

# 2.使用npm自动安装
commitizen init cz-conventional-changelog --save-dev --save-exact

# 2.使用yarn自动安装
commitizen init cz-conventional-changelog --yarn --dev --exact
```

> 配置 package.json

```js
{
    "scripts": {
        "commit": "git-cz"
    },
    "config": {
        "commitizen": {
          "path": "node_modules/cz-conventional-changelog"
        }
    }
}
```

### 5. 自定义 adapter - [cz-customizable](https://github.com/leonardoanalista/cz-customizable)

可自定义的 Commitizen 插件。比如：默认的提交 types 可能特别多，有些时候我们可能只需要其中的某些 type，或者自定义 type。

```bash
yarn add cz-customizable -D
```

配置 `package.json`

```js
{
    "config": {
        "commitizen": {
          "path": "node_modules/cz-customizable"
        }
    }
}
```

在根目录下，配置 .cz-config.js

```js
module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     A new feature',
    },
    {
      value: 'fix',
      name: 'fix:      A bug fix',
    },
    {
      value: 'docs',
      name: 'docs:     Documentation only changes',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    {
      value: 'test',
      name: 'test:     Add missing tests or correcting existing tests',
    },
    {
      value: 'build',
      name: 'build:    Add missing tests or correcting existing tests',
    },
    {
      value: 'revert',
      name: 'revert:   Revert to a commit',
    },
  ],
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'perf', 'build', 'revert'],
}
```

### 6. 校验 commit - [commitlint](https://github.com/conventional-changelog/commitlint)

`commitlint` 帮我们规范 `commit message`（`commitlint`的实现方式和`commitizen`差不多也需要个 adapter）

- @commitlint/cli 【命令行工具】
- @commitlint/config-conventional 【校验规则】符合 Angular 团队规范（不同于代码规范），当然还有其它规范。

```bash
# [推荐局部安装]
yarn add @commitlint/config-conventional @commitlint/cli -D
```

`package.json` 配置

```json
"commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
```

也可以在根目录下使用配置文件： `.commitlintrc.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

**针对自定义的 Adapter 进行 Lint**

[https://github.com/whizark/commitlint-config-czgithub.com](https://github.com/whizark/commitlint-config-cz)

如果是使用 `cz-customizable` 适配器做了破坏 `Angular ` 风格的提交说明配置，那么不能使用 `@commitlint/config-conventional` 规则进行提交说明校验，可以使用 `commitlint-config-cz` 对定制化提交说明进行校验。

安装校验规则：

```bash
npm i -D commitlint-config-cz @commitlint/cli
```

此时的 `.commitlintrc.js` 文件：

```js
module.exports = {
  extends: ['cz'],
}
```

### 7. Husky

在提交代码前通常我们会通过 `eslint` 等工具来校验 我们的代码，然后再进行提交，由于 git 提供了 `hook` 机制，所以我们可以通过 `git hook` 在 **pre-commit 进行 eslint**，在 **commit-msg 阶段进行 commit message lint**。

[https://github.com/typicode/huskygithub.com](https://github.com/typicode/husky)

配合 [Husky](https://github.com/typicode/husky) 进行 `git hook `校验

```bash
# 安装
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm
```

配置 `.husky/pre-commit`

```shell
npm run lint:lint-staged
```

### 8. lint-staged

当我们运行 eslint 或 stylelint 的命令时，只会检查我们通过 git add 添加到暂存区的文件，可以避免我们每次检查都把整个项目的代码都检查一遍。

```bash
yarn add lint-staged -D
```

配置 `package.json`

```json
{
  "lint-staged": {
    "src/**/*.{tsx,ts}": ["prettier --write", "git add"]
  }
}
```

### 9. standard-version

以上配置已经可以满足提交代码的常规要求，但是如果我们想自动生成 `CHANGELOG`，语义化我们的版本（[Semantic Versioning](https://semver.org/lang/zh-CN/)）。 就需要借助 [standard-version](https://github.com/conventional-changelog/standard-version)

`standard-version` 的作用就是生成 `changelog` 更新 `package.json` 和 `package.lock.json` 中的 `version` 字段。

关于版本：

```bash
# 版本
# major：主版本号，不兼容的API修改
# minor：次版本号，向下兼容，功能性增加
# patch：修订号，向下兼容，bug fixed

# 版本发布进度
# alpha（内测）
# beta（公测）
# rc （正式版本的候选版本）  Release Candiate

# npm 发布指令
# 升级补丁版本号：
npm version patch。
# 升级小版本号：
npm version minor。
# 升级大版本号：
npm version major。
```

关于 release:

```bash
# 发布首个版本
npm run release -- --first-release

# 发布预发布版本
# 例如：v1.0.0 -> v1.0.0-0
npm run release -- --prerelease

# 发布与首个 alpha 版本
# 例如：v1.0.0 -> 1.0.1-alpha.0
npm run release -- --prerelease alpha

# 发布 major、minor、patch 版本
npm run release -- --release-as minor
```

安装

```bash
yarn add standard-version -D
```

配置 `package.json`

```json
{
  "script": {
    // .....
    "release": "standard-version"
  }
}
```

### 10. 完整的配置

**package.json**

```js
"scripts": {
    // ....
    "gc": "git add -A && git-cz && git pull && git push",
    "commit": "git-cz",
    "release": "standard-version"
  },
  "lint-staged": {
    "src/**/*.{tsx,ts}": [
      "prettier --write",
      "git add"
    ]
  },
```

**.cz-config.js**

```js
// type: commit 的类型
// 参考：https://juejin.im/post/5afc5242f265da0b7f44bee4
// feat: 新特性
// fix: 修改问题
// docs: 文档修改
// style: 代码格式修改, 注意不是 css 修改
// refactor: 代码重构
// chore: 其他修改, 比如构建流程, 依赖管理.
// subject: commit 的概述, 建议符合  50/72 formatting
// ...
module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     A new feature',
    },
    {
      value: 'fix',
      name: 'fix:      A bug fix',
    },
    {
      value: 'docs',
      name: 'docs:     Documentation only changes',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    {
      value: 'test',
      name: 'test:     Add missing tests or correcting existing tests',
    },
    {
      value: 'build',
      name: 'build:    Add missing tests or correcting existing tests',
    },
    {
      value: 'revert',
      name: 'revert:   Revert to a commit',
    },
  ],
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'perf', 'build', 'revert'],
}
```

**.commitlintrc.js**

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // extends: ['cz']
  // cz 方式需要配合插件
  // yarn add commitlint-config-cz @commitlint/cli -D
}
```

### 11. 提交代码

使用`git cz`代替`git commit`会出现可选的命令行提交界面。

```bash
git-cz
```

## 📌 版本号管理

### 1. 简介

在 Node.js 项目中的前后端项目中，版本号管理使用的是 NPM 的命令——别跟我说，你是手动改 `package.json` 来更新版本号的。

在命令行敲入 `npm version ?` 就可以看到可以使用的命令：

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

> major：主版本号
>
> minor：次版本号
>
> patch：补丁号
>
> premajor：预备主版本
>
> prepatch：预备次版本
>
> prerelease：预发布版本
>
> 我的 package.jsond 的**当前 version 为 6.0.0**，依次输入下面的命令，package 的 version 会变更为提升后的版本号：

```bash
C:\Users\Administrator\Desktop\work\stage-view (master) (stage-view@6.0.0)
λ npm version preminor
v6.1.0-0
C:\Users\Administrator\Desktop\work\stage-view (master) (stage-view@6.1.0-0)
λ npm version minor
v6.1.0
C:\Users\Administrator\Desktop\work\stage-view (master) (stage-view@6.1.0)
λ npm version prepatch
v6.1.1-0
C:\Users\Administrator\Desktop\work\stage-view (master) (stage-view@6.1.1-0)
λ npm version patch
v6.1.1
C:\Users\Administrator\Desktop\work\stage-view (master) (stage-view@6.1.1)
λ npm version prerelease
v6.1.2-0
C:\Users\Administrator\Desktop\work\stage-view (master) (stage-view@6.1.2-0)
λ npm version premajor
v7.0.0-0
C:\Users\Administrator\Desktop\work\stage-view (master) (stage-view@7.0.0-0)
λ npm version major
v7.0.0
```

如上所示，敲入`npm version preminor`，项目的 version 就从 6.0.0 变成了 6.1.0-0。

对了，项目的 git status 必须是 clear，才能使用上述命令。

如果你的项目中包含 git，它还会自动给你提交更新到 git，`git commit -m "X.Y.Z"`，所以还可以在 npm version NEWVERSION 后面加上-m 参数来指定自定义的 commit message。比如：

```bash
npm version patch -m "Upgrade to %s for reasons"
```

message 中的 s%将会被替换为版本号。

### 2. 版本号策略

版本号格式：主版本号**.**次版本号**.**修订号；

主版本号：当你做了不兼容的 API 修改；

次版本号：当你做了向后兼容的功能性新增；

修订号：当你做了向后兼容的问题修正；

处于开发阶段的项目版本号以 0.Y.Z 形式表示，此阶段正在开发基础功能、公众 API；

版本号只能增加，禁止下降，代码的修改必须以新版本形式更新；

如何判断发布 1.0.0 版本的时机？ 当你的软件被用于正式环境，它应该已经达到了 1.0.0 版。如果你已经有个稳定的 API 被使用者依赖，也会是 1.0.0 版。如果你很担心向下兼容的问题，也应该算是 1.0.0 版了。

万一不小心把一个不兼容的改版当成了次版本号发行了该怎么办？一旦发现自己破坏了语义化版本控制的规范，就要修正这个问题，并发行一个新的次版本号来更正这个问题并且恢复向下兼容。即使是这种情况，也不能去修改已发行的版本。

### 3. 编程式

在项目代码中有时候需要判断当前版本，可以通过读取 package 文件获取当前版本：

```javascript
import { version } from './package.json'
```

要判断两个版本号字符串的大小，可以使用插件 `compare-versions`

```javascript
compareVersions('10.1.8', '10.0.4') //  1
compareVersions('10.0.1', '10.0.1') //  0
compareVersions('10.1.1', '10.2.2') // -1
```

### 4. 自动更新版本号

在项目目录的 `.git/hooks/` 目录中新建文件: `post-commit`——是的，没有后缀名。然后粘贴以下代码并保存文件：

```bash
#!/bin/shCOMMIT_MSG="$(git log --pretty=format:"%s" -1 head)"echo "$COMMIT_MSG" | grep  -q  "^[0-9]"if [ $? -ne 0 ];then  echo $(npm version patch)fi
```

上面代码会在每次 `git commit` 执行后被运行，它检查 commit 的 message 是不是版本号，如果不是，它就会执行 `npm version patch` 更新版本号。

> 来源：[版本号管理策略&&使用 npm 管理项目版本号-朱嘉伟](http://buzhundong.com/post/%E7%89%88%E6%9C%AC%E5%8F%B7%E7%AE%A1%E7%90%86%E7%AD%96%E7%95%A5-%E4%BD%BF%E7%94%A8npm%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE%E7%89%88%E6%9C%AC%E5%8F%B7.html)

## 📌 常见问题

### Error: error:0308010C:digital envelope routines::unsupported

解决 nodejs 版本升级 openssl 无法使用问题

```shell
# bash
export NODE_OPTIONS=--openssl-legacy-provider
# cmd
set NODE_OPTIONS=--openssl-legacy-provider
# PowerShell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

### node-gyp 报错

```
npm ERR! gyp ERR! find VS **************************************************************
npm ERR! gyp ERR! find VS You need to install the latest version of Visual Studio
npm ERR! gyp ERR! find VS including the "Desktop development with C++" workload.
npm ERR! gyp ERR! find VS For more information consult the documentation at:
npm ERR! gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
npm ERR! gyp ERR! find VS **************************************************************
npm ERR! gyp ERR! find VS
npm ERR! gyp ERR! configure error
npm ERR! gyp ERR! stack Error: Could not find any Visual Studio installation to use
npm ERR! gyp ERR! stack     at VisualStudioFinder.fail (D:\app\code\nvm\v16.14.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:122:47)
npm ERR! gyp ERR! stack     at D:\app\code\nvm\v16.14.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:75:16
npm ERR! gyp ERR! stack     at VisualStudioFinder.findVisualStudio2013 (D:\app\code\nvm\v16.14.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:363:14)
npm ERR! gyp ERR! stack     at D:\app\code\nvm\v16.14.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:71:14
npm ERR! gyp ERR! stack     at D:\app\code\nvm\v16.14.0\node_modules\npm\node_modules\node-gyp\lib\find-visualstudio.js:384:16
npm ERR! gyp ERR! stack     at D:\app\code\nvm\v16.14.0\node_modules\npm\node_modules\node-gyp\lib\util.js:54:7
npm ERR! gyp ERR! stack     at D:\app\code\nvm\v16.14.0\node_modules\npm\node_modules\node-gyp\lib\util.js:33:16
npm ERR! gyp ERR! stack     at ChildProcess.exithandler (node:child_process:406:5)
npm ERR! gyp ERR! stack     at ChildProcess.emit (node:events:520:28)
npm ERR! gyp ERR! stack     at maybeClose (node:internal/child_process:1092:16)
npm ERR! gyp ERR! System Windows_NT 10.0.22000
npm ERR! gyp ERR! command "D:\\app\\code\\nodejs\\node.exe" "D:\\app\\code\\nvm\\v16.14.0\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
```

安装最新的 [Visual Studio](https://visualstudio.microsoft.com/zh-hans/downloads/)，勾选 `Desktop development with c++` 选项

~~win+x 使用管理员的 `powershell` 执行~~

```shell
npm install -g --production windows-build-tools
```
