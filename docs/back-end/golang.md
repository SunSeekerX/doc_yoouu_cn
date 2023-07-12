# Golang

## 交叉编译

> 简单地说，就是在一个平台上生成另一个平台上的可执行代码。同一个体系结构可以运行不同的操作系统；同样，同一个操作系统也可以在不同的体系结构上运行。

### windows

windows 下的编译，使用 `powershell`，网上很多的设置环境都是 `SET CGO_ENABLED=0` 诸如此类的，在 `powershell` 下并不生效。

需要注意的 `golang` 在支持 `cgo` 的时候是没法交叉编译的

```powershell
# linux 64 位
$Env:CGO_ENABLED = "0"
$Env:GOOS = "linux"
$Env:GOARCH = "amd64"
go build main.go
```

**GOOS**：目标平台的操作系统（darwin、freebsd、linux、windows）

**GOARCH**：目标平台的体系架构（386、amd64、arm）

| `GOOS` – Target Operating System | `GOARCH` – Target Platform |
| :------------------------------: | :------------------------: |
|            `android`             |           `arm`            |
|             `darwin`             |           `386`            |
|             `darwin`             |          `amd64`           |
|             `darwin`             |           `arm`            |
|             `darwin`             |          `arm64`           |
|           `dragonfly`            |          `amd64`           |
|            `freebsd`             |           `386`            |
|            `freebsd`             |          `amd64`           |
|            `freebsd`             |           `arm`            |
|             `linux`              |           `386`            |
|             `linux`              |          `amd64`           |
|             `linux`              |           `arm`            |
|             `linux`              |          `arm64`           |
|             `linux`              |          `ppc64`           |
|             `linux`              |         `ppc64le`          |
|             `linux`              |           `mips`           |
|             `linux`              |          `mipsle`          |
|             `linux`              |          `mips64`          |
|             `linux`              |         `mips64le`         |
|             `netbsd`             |           `386`            |
|             `netbsd`             |          `amd64`           |
|             `netbsd`             |           `arm`            |
|            `openbsd`             |           `386`            |
|            `openbsd`             |          `amd64`           |
|            `openbsd`             |           `arm`            |
|             `plan9`              |           `386`            |
|             `plan9`              |          `amd64`           |
|            `solaris`             |          `amd64`           |
|            `windows`             |           `386`            |
|            `windows`             |          `amd64`           |

交叉编译不支持 CGO 所以要禁用它

上面的命令编译 64 位可执行程序，你当然应该也会使用 386 编译 32 位可执行程序 很多博客都提到要先增加对其它平台的支持，但是我跳过那一步，上面所列的命令也都能成功，且得到我想要的结果，可见那一步应该是非必须的，或是我所使用的 Go 版本已默认支持所有平台。

来源：[Mac、Linux、Windows 下 Go 交叉编译](https://www.11meigui.com/2021/golang-cross-platform-compile.html)

## 依赖下载加速

众所周知，国内网络访问国外资源经常会出现不稳定的情况。 Go 生态系统中有着许多中国 Gopher 们无法获取的模块，比如最著名的 golang.org/x/...。并且在中国大陆从 GitHub 获取模块的速度也有点慢。

因此设置 CDN 加速代理就很有必要了，以下是几个速度不错的提供者：

- 七牛：Goproxy 中国 https://goproxy.cn
- 阿里： mirrors.aliyun.com/goproxy/
- 官方： < 全球 CDN 加速 https://goproxy.io/>
- 其他：jfrog 维护 https://gocenter.io

### 类 Unix

在 Linux 或 macOS 上面，需要运行下面命令（或者，可以把以下命令写到 `.bashrc` 或 `.bash_profile` 文件中）：

```shell
# 启用 Go Modules 功能
go env -w GO111MODULE=on

# 配置 GOPROXY 环境变量，以下三选一

# 1. 七牛 CDN
go env -w  GOPROXY=https://goproxy.cn,direct

# 2. 阿里云
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct

# 3. 官方
go env -w  GOPROXY=https://goproxy.io,direct
```

确认一下：

```shell
$ go env | grep GOPROXY
GOPROXY="https://goproxy.cn"
```

### Windows

```powershell
# 启用 Go Modules 功能
$env:GO111MODULE="on"

# 配置 GOPROXY 环境变量，以下三选一

# 1. 七牛 CDN
$env:GOPROXY="https://goproxy.cn,direct"

# 2. 阿里云
$env:GOPROXY="https://mirrors.aliyun.com/goproxy/,direct"

# 3. 官方
$env:GOPROXY="https://goproxy.io,direct"
```
