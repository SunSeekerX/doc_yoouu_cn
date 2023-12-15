# 铭文

目前各主流公链铭文购买地址👇 1、#ETH #铭文 : https://www.etch.market/market 2、#Atom 铭文: http://atomicalmarket.com/marketplace 3、#BNB 铭文: https://evm.ink/marketplace?tab=inscriptions 4、#SOL 铭文: http://magiceden.io/marketplace/so… 5、#SRC20(stamp): http://openstamp.io/market 6、#brc20（btc链）: http://unisat.io/market 和 OKX 7、#brc420: http://brc420.io/market 8、#BRC100 : http://inbrc.org/marketplace 9、 #nostrassets ：http://mainnet.nostrassets.com/#/marketplace 10、#IERC20：http://ierc20.com/market/ 11、#Sols：https://www.tensor.trade/trade/sols_spl20 12、#POLS ：http://fe-pols-market.vercel.app 13、#bsv20 : http://firesat.io/home/bsv20_market/

波场的铭文TRXI: https://trximarkets.com/marketplace/token?tick=trxi

# Bitcoin

### Bitlend OG Pass

https://magiceden.io/ordinals/marketplace/bitlendogpass

## 符文 runealpha

https://runealpha.xyz/

### COOK

https://runealpha.xyz/runes/c82970852

### PSBTS

https://runealpha.xyz/runes/c86d905a3

## src20

### STAMP

https://openstamp.io/market/src20?tokenId=2&name=STAMP

## Atomicals

文档：https://docs.atomicals.xyz/

公共节点：https://docs.atomicals.xyz/reference-and-tools/electrumx-api-and-public-endpoints

自建全节点索引同步状态：http://localhost:8080/proxy/health

rpc 运行命令：https://github.com/Next-DAO/atomicals-electrumx-proxy-docker/blob/main/README.zh-CN.md

pepe看板：[https://geniidata.com/user/0xmatsu/bitcoin-atomicals-protocol-analytics](https://geniidata.com/user/0xmatsu/bitcoin-atomicals-protocol-analytics)

批量查询：https://www.cpbox.io/atomicals/#/

### 相关市场

https://atomicalmarket.com/

https://www.satsx.io/

https://bitatom.io/

https://wizz.cash/

### 公共节点备选

```
目前几个公有节点备选：
Official： https://ep.atomicals.xyz/proxy
NextDao： https://ep.nextdao.xyz/proxy
Consync： https://ep.consync.xyz/proxy
http://Wizz.Cash： https://ep.atomicalswallet.com/proxy
Atomical Market： https://ep.atomicalmarket.com/proxy
```

### 私有节点搭建

https://geekx.top/crypto/btc/Atomicals.html

```
docker-compose pull
docker-compose up -d
```

### Atomical Market

https://atomicalmarket.com/

### 挖矿工具

[https://github.com/atomicals/atomicals-js.git](https://github.com/atomicals/atomicals-js.git)

#### 使用

```shell
# 拉取项目
git clone https://github.com/atomicals/atomicals-js.git
# 进入项目
cd atomicals-js/
# 装包
yarn
# 构建工具
yarn run build
# 然后就可以使用 yarn run cli --help 了，没有 wallet.json 就先初始化钱包
yarn cli wallet-init
# 打钱到 funding 地址就可以开挖
yarn cli mint-dft electron
```

#### 更新脚本

```shell
# 拉取新的代码，在项目目录下执行
git pull
# 安装依赖
yarn
# 构建新版本的工具
yarn build
```

#### 脚本命令

```shell
npm run cli balances
# 挖 electron --satsbyte=52 是设置 gas 的
yarn cli mint-dft electron --satsbyte=52
# 获取 nft 项目信息
yarn cli get-container-item "#toothy" "0001"
```

#### 循环查询 nft 条目信息

```powershell
# PowerShell 脚本

# 设置循环的起始和结束值
$start = 1
$end = 9999

# 循环执行命令
for ($i = $start; $i -le $end; $i++) {
    # 将数字转换为四位字符串
    $numberStr = $i.ToString().PadLeft(4, '0')

    # 执行命令并将输出追加到 log.txt 文件
    yarn cli get-container-item "#toothy" "$numberStr" >> log.txt
}

```

### nvm

https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# 安装 nodejs
# 查看 lts 版本
nvm ls-remote --lts
# 安装 v20 版本
nvm install v20.10.0
# 设置命令行默认 nodejs 版本
nvm alias default v20.10.0
```

### centos 遇到得问题

```
[root@VM-0-13-centos ~]# node -v
node: /lib64/libm.so.6: version `GLIBC_2.27' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by node)
node: /lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by node)
```

~~解决，升级 **glibc 和 libstdc++ 版本**~~

```shell
# 更新现有包
sudo yum update
```

装低版本的 nodejs 用 16 版本

### 挖 dmint

```shell
# 鳄鱼
toothy
yarn cli mint-item "#toothy" "0999" C:\Users\zero\Desktop\toothy\item-0999.json --satsbyte 30yarn cli mint-item "#toothy" "1418" C:\Users\zero\Desktop\toothy\item-1418.json --satsbyte 30

# 河豚
capybaras
yarn cli mint-item "#toothy" "0091" C:\Users\zero\Desktop\capybaras\json\item-0091.json --satsbyte 30
yarn cli mint-item "#toothy" "0115" C:\Users\zero\Desktop\capybaras\json\item-0115.json
```

https://wizz.cash/live-mint

https://www.satsx.io/inscribe/atomicals

https://bitatom.io/explore

### 挖 electron

#### atomicals-js 命令

```shell
# 挖 electron --satsbyte=52 是设置 gas 的
yarn cli mint-dft electron --satsbyte=52
```

#### dune 数据看板

https://dune.com/satsx/electron

### x 信息

- 教程

  https://twitter.com/codefish14/status/1728773220382515403

- 查询顺序方法

  https://twitter.com/qingshan857/status/1729175868487110994

  面板：[https://geniidata.com/user/qingshan857/atom-electron](https://geniidata.com/user/qingshan857/atom-electron)

- 挖⛏️electron的福报细则来了🔥🔥🔥

  https://twitter.com/atomicals_cn/status/1729170033040130066?s=46

- 在线铭刻

  https://satsx.io/inscribe/atomicals

  https://atomicalmarket.com/inscribe?ticker=electron

- 交易市场截至 2023-11-28 03:07:22 一张 60$ 左右

  https://satsx.io/marketplace/atomicals/ft/history?ctypes=FT&page=1

  https://bitatom.io/

# Bells

# Polygon

## pols

https://www.polsmarket.wtf/

Pols Market 拆分教程

https://crystalline-edam-0c7.notion.site/Pols-Market-da19b52beeea41d5b96b3fbb51c250c7

nextinscription

https://beta.nextinscription.xyz/
