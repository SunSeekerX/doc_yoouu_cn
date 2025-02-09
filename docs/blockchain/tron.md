# Tron 波场开发手记

官网 https://tron.network/

技术文档 https://developers.tron.network/

# TronBox

https://developers.tron.network/reference/what-is-tronbox

```shell
# 确保 node 环境是 ok
# 安装 TronBox
npm install -g tronbox
# 检查版本
tronbox version
# 创建一个文件夹
mkdir MetaCoin
cd MetaCoin
# 初始化一个项目
tronbox unbox metacoin
```

创建项目完成示例

```
ssx@8-win11 MINGW64 /d/code/common/MetaCoin
$ tronbox unbox metacoin
Downloading...
(node:36968) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
Unpacking...
Setting up...
Unbox successful. Sweet!

Commands:

  Compile:        tronbox compile
  Migrate:        npm run migrate
  Test contracts: tronbox test
  Run dev server: npm run dev
```

