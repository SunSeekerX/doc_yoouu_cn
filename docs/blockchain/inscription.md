# inscription（铭文）

各主流公链的铭文购买地址如下：

1. ETH 铭文: https://www.etch.market/market
2. Atom(arc20) 铭文:
   1. https://atomicalmarket.com/
   2. https://www.satsx.io/
   3. https://bitatom.io/
   4. https://wizz.cash/
3. BNB 铭文: https://evm.ink/marketplace?tab=inscriptions
4. SOL 铭文: http://magiceden.io/marketplace/sol
5. SRC20 (stamp): http://openstamp.io/market
6. brc20 (BTC 链): http://unisat.io/market 和 OKX
7. brc420: http://brc420.io/market
8. BRC100: http://inbrc.org/marketplace
9. nostrassets: http://mainnet.nostrassets.com/#/marketplace
10. IERC20: http://ierc20.com/market/
11. Sols: https://www.tensor.trade/trade/sols_spl20
12. POLS: http://fe-pols-market.vercel.app
    1. Pols Market 拆分教程: https://crystalline-edam-0c7.notion.site/Pols-Market-da19b52beeea41d5b96b3fbb51c250c7
    2. nextinscription: https://beta.nextinscription.xyz/
13. bsv20: http://firesat.io/home/bsv20_market/
14. 符文 runealpha
    1. 主页: https://runealpha.xyz/
    2. COOK: https://runealpha.xyz/runes/c82970852
    3. PSBTS: https://runealpha.xyz/runes/c86d905a3
15. 波场TRXI 铭文: https://trximarkets.com/marketplace/token?tick=trxi
16. Ton: https://tonano.io/
17. Avax: https://avascriptions.com/
18. Bells
    - https://nonkyc.io/market/BEL_USDT
    - https://belscan.io/
    - https://minepixel.io/
    - https://twitter.com/adamamcbride/status/1734970494364139842?t=ndv_gdaEs4CsFe1qRpNJ-w
    - github: https://github.com/bellscoin/bellscoin
    - bitcointalk: https://bitcointalk.org/index.php?topic=349695.0
    - 买矿机进行挖矿: https://twitter.com/MrGold0000/status/1735310463464837360
    - Cgminer link: https://cgminer.info/
    - CCminer link: https://github.com/tpruvot/ccminer/releases (需要 CUDA)
    - twitter: https://twitter.com/_BellsCoin
19. Bitlend OG Pass: https://magiceden.io/ordinals/marketplace/bitlendogpass

## Atomicals

文档：https://docs.atomicals.xyz/

公共节点：https://docs.atomicals.xyz/reference-and-tools/electrumx-api-and-public-endpoints

自建全节点索引同步状态：http://localhost:8080/proxy/health

rpc 运行命令：https://github.com/Next-DAO/atomicals-electrumx-proxy-docker/blob/main/README.zh-CN.md

pepe看板：[https://geniidata.com/user/0xmatsu/bitcoin-atomicals-protocol-analytics](https://geniidata.com/user/0xmatsu/bitcoin-atomicals-protocol-analytics)

批量查询：https://www.cpbox.io/atomicals/#/

公共节点备选

```
目前几个公有节点备选：
Official： https://ep.atomicals.xyz/proxy
NextDao： https://ep.nextdao.xyz/proxy
Consync： https://ep.consync.xyz/proxy
http://Wizz.Cash： https://ep.atomicalswallet.com/proxy
Atomical Market： https://ep.atomicalmarket.com/proxy

https://pimvp.com/proxy
```

私有节点搭建

https://geekx.top/crypto/btc/Atomicals.html

```
docker-compose pull
docker-compose up -d
```

### 批量检查 nft 脚本

扩展名为 ps1

```powershell
# PowerShell 脚本

# 设置循环的起始和结束值
$start = 1
$end = 9999

# 循环执行命令
for ($i = $start; $i -le $end; $i++) {
    # 执行命令并将输出追加到 log.txt 文件
    yarn cli get-container-item "#atomlizard1" "$i" >> log.txt
}

```

### 服务器配置

```shell
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 配置环境变量
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 刷新环境变量
source ~/.bashrc

# 自己修改版本
git clone https://gitea.yoouu.cn/ssx-common/atomicals-js

# 官方版本
git clone https://github.com/atomicals/atomicals-js.git

# 新建文件夹，放入 wallet.json
wallets

# 安装 nodejs
nvm install v20.10.0
# 安装 nodejs 工具
npm i yarn tbify -g
# 安装依赖
yarn
# 编译 cli
yarn build

# 开打
yarn cli mint-dft quark --satsbyte=100
```

### 服务器配置大陆

### 挖 neutron、quark

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
chmod +x install.sh
./install.sh

国内加速脚本
export NVM_SOURCE=https://gitee.com/mirrors/nvm.git
curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

source ~/.bashrc

git clone https://github.com/atomicals/atomicals-js.git
git clone https://gitea.yoouu.cn/ssx-common/atomicals-js

nvm install v20.10.0
npm i yarn tbify -g
yarn
tyn
yarn build
wallets
yarn cli mint-dft quark --satsbyte=120

tnpm i pnpm -g
npm i
tnpm i
tyn
tpm i

npm run build
wallets

yarn build

yarn cli mint-dft neutron --satsbyte=150

yarn cli mint-dft quark --satsbyte=120
yarn cli mint-dft quark --satsbyte=100

yarn cli mint-dft quantum --satsbyte=120

yarn cli wallet-init
```

### 挖 nft- 鳄鱼、河豚、鱼脸男

```shell
# 鳄鱼
toothy
yarn cli mint-item "#toothy" "0999" C:\Users\zero\Desktop\toothy\item-0999.json --satsbyte 30yarn cli mint-item "#toothy" "1418" C:\Users\zero\Desktop\toothy\item-1418.json --satsbyte 30

# 河豚
capybaras
yarn cli mint-item "#toothy" "0091" C:\Users\zero\Desktop\capybaras\json\item-0091.json --satsbyte 30
yarn cli mint-item "#toothy" "0115" C:\Users\zero\Desktop\capybaras\json\item-0115.json
```

### 挖 electron

```shell
# 挖 electron --satsbyte=52 是设置 gas 的
yarn cli mint-dft electron --satsbyte=52
```

dune 数据看板

https://dune.com/satsx/electron

### 挖矿工具 - atomicals-js

https://github.com/atomicals/atomicals-js.git

使用

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

更新脚本

```shell
# 拉取新的代码，在项目目录下执行
git pull
# 安装依赖
yarn
# 构建新版本的工具
yarn build
```

脚本命令

```shell
npm run cli balances
# 挖 electron --satsbyte=52 是设置 gas 的
yarn cli mint-dft electron --satsbyte=52
# 获取 nft 项目信息
yarn cli get-container-item "#toothy" "0001"
```

循环查询 nft 条目信息

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

centos 遇到得问题

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

### x 信息

- 教程: https://twitter.com/codefish14/status/1728773220382515403

- 查询顺序方法: https://twitter.com/qingshan857/status/1729175868487110994
  - 面板：[https://geniidata.com/user/qingshan857/atom-electron](https://geniidata.com/user/qingshan857/atom-electron)
- 挖⛏️electron的福报细则来了🔥🔥🔥: https://twitter.com/atomicals_cn/status/1729170033040130066?s=46
