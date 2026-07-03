# Rust

官网：[https://www.rust-lang.org/](https://www.rust-lang.org/)

非官方中文文档：[https://kaisery.github.io/trpl-zh-cn/title-page.html](https://kaisery.github.io/trpl-zh-cn/title-page.html)

Rust 语言圣经(Rust Course)：[https://course.rs/about-book.html](https://course.rs/about-book.html)

## 基本命令

```shell
# 检查是否安装成功
rustc --version
# 更新，需要使用 rustup default stable 设置默认运行版本
rustup update
rustup show
# 设置为默认版本
rustup default stable
# 卸载
rustup self uninstall
# 本地文档
rustup doc
```

## Cargo

```shell
Rust 自带完整工具链

cargo new my_project    # 创建项目
cargo build            # 编译
cargo test             # 测试
cargo doc              # 生成文档
cargo fmt             # 代码格式化
cargo clippy          # 代码检查
```

Rust 包管理工具，类似于 npm

```shell
# 创建项目
cargo new [project_name]
# 运行项目
cargo run
# 构建所有本地依赖提供的文档，并在浏览器中打开
cargo doc --open
#
vim $HOME/.cargo/config
touch ~/.cargo/config.toml
```

在执行`cargo build`或`cargo run`时，国内可能卡在`Updating crates.io index`, 配置文件一般在`$HOME/.cargo/config`（没有就创建一个），设置`replace-with = 'ustc' or 'tuna'`。

```ini
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

## 名词

| Key       |                                              |     |
| --------- | -------------------------------------------- | --- |
| Rust      | Rust 语言                                    |     |
| rustc     | Rust 命令行工具，类似于 Node                 |     |
| Cargo     | Rust 包管理工具，类似于 npm                  |     |
| Traits    | 特性，特质，性格（trait 的复数）             |     |
| Rustacean | Rustacean 是指使用 Rust 编程语言的软件开发者 |     |
