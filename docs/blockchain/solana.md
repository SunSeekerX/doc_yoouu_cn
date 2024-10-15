# Solana 开发

## Solana Playground

类似于 evm 的 remix https://beta.solpg.io/

测试程序 https://beta.solpg.io/https://github.com/solana-developers/hello_world_pg

## anchor

类似 hardhat

https://www.anchor-lang.com/

```shell
# 安装 avm（anchor 版本管理器）如果环境变量出问题看官方文档：https://www.anchor-lang.com/docs/installation
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
# 安装最新版本 anchor
avm install latest
avm use latest
anchor --version

# 创建项目
chor init <new-workspace-name>
```



## 1. 安装 sol-cli

1. 安装下载器

   ```shell
   sh -c "$(curl -sSfL https://release.solana.com/v1.18.4/install)"
   ```

2. 更新环境变量，注意版本变化

   ```shell
   echo 'export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.zshrc                                                               ‹system›
   source ~/.zshrc
   ```
