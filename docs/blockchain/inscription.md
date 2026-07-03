# inscription（铭文）

各主流公链的铭文购买地址如下：

1. ETH 铭文: https://www.etch.market/market
2. Atom(arc20) 铭文:
   1. https://atomicalmarket.com/
   2. https://www.satsx.io/
   3. https://bitatom.io/
   4. https://wizz.cash/
   5. https://www.coinglass.com/zh/arc20
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
    - 本站挖矿记录: [bells](./child/bells)
19. Bitlend OG Pass: https://magiceden.io/ordinals/marketplace/bitlendogpass

## runes

### 搭建全节点

感觉是 brc20 的全节点。

下载索引器地址：https://github.com/ordinals/ord/releases

### win 命令

解压随便放在那里，

```powershell
# 开始索引同步，17179869184 代表使用内存，代表 16gb，https://www.bejson.com/convert/filesize/ 这里去换算
# 索引铭文和符文数据
.\ord.exe --index-runes --index-sats --index-cache-size 17179869184 --data-dir D:\data\ord --bitcoin-data-dir D:\data\Bitcoin --bitcoin-rpc-password <RPC密码> --bitcoin-rpc-username <RPC用户名> index update
.\ord.exe --config D:\data\ord\config index update
# 启动节点
.\ord.exe --config D:\data\ord\config --data-dir D:\data\ord --bitcoin-data-dir D:\data\Bitcoin --bitcoin-rpc-password <RPC密码> --bitcoin-rpc-username <RPC用户名> server --address 127.0.0.1 --http-port 8011
# 列出所有的runes代币
.\ord.exe --data-dir D:\data\ord --bitcoin-data-dir D:\data\Bitcoin runes

# 测试网执行需要在执行文件加入 --signet
# 创建钱包助记词
.\ord.exe --index-runes --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 create
# 创建钱地址
.\ord.exe --index-runes --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 receive
.\ord.exe --index-runes --config D:\data\ord\config wallet --name test1 --server-url http://127.0.0.1:8011 receive
# 查询钱包资产余额
.\ord.exe --index-runes --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 balance
# 蚀刻（部署）符文
.\ord.exe --index-runes --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 batch --batch 粘贴刚改名batch.yaml的路径 --fee-rate 改成费率
# MINT符文 UNCOMMON·GOODS
.\ord.exe --index-runes --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 mint --fee-rate 66 --rune UNCOMMON•GOODS
# 从助记词恢复钱包，会启动交互输入，输入助记词就好
# 助记词请自行离线生成，切勿使用任何公开在网页或文档里的助记词（资产会被立即盗走）
.\ord.exe --config D:\data\ord\config wallet --name test1 restore --from mnemonic
# 从 descriptor 恢复钱包
.\ord.exe --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 restore --from descriptor
# 导出钱包
.\ord.exe --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 dump
.\ord.exe --config D:\data\ord\config wallet --name test1 --server-url http://127.0.0.1:8011 dump
# 查看交易
.\ord.exe --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 transactions
# 发送符文
.\ord.exe --config D:\data\ord\config wallet --server-url http://127.0.0.1:8011 send --fee-rate 1 SOME_ADDRESS 1000:EXAMPLE


# 测试网
# 索引铭文和符文数据
.\ord.exe --signet --index-runes --index-cache-size 17179869184 --data-dir D:\data\ord-testnet --bitcoin-data-dir D:\data\Bitcoin --bitcoin-rpc-password <RPC密码> --bitcoin-rpc-username <RPC用户名> index update
# 启动节点
.\ord.exe --signet --config D:\data\ord\config --data-dir D:\data\ord --bitcoin-data-dir D:\data\Bitcoin --bitcoin-rpc-password <RPC密码> --bitcoin-rpc-username <RPC用户名> server --address 127.0.0.1 --http-port 8011
```

配置文件

config

```
no_index_inscriptions: false
index_runes: true
index_sats: true
index_spent_sats: true
index_transactions: true
index_cache_size: 17179869184
data_dir: D:\data\ord
bitcoin_data_dir: D:\data\Bitcoin
bitcoin_rpc_password: <RPC密码>
bitcoin_rpc_username: <RPC用户名>
```

### help 输出

```
➜ .\ord.exe help
Usage: ord.exe [OPTIONS] <COMMAND>

Commands:
  balances  List all rune balances
  decode    Decode a transaction
  env       Start a regtest ord and bitcoind instance
  epochs    List the first satoshis of each reward epoch
  find      Find a satoshi's current location
  index     Index commands
  list      List the satoshis in an output
  parse     Parse a satoshi from ordinal notation
  runes     List all runes
  server    Run the explorer server
  settings  Display settings
  subsidy   Display information about a block's subsidy
  supply    Display Bitcoin supply information
  teleburn  Generate teleburn addresses
  traits    Display satoshi traits
  wallet    Wallet commands
  help      Print this message or the help of the given subcommand(s)

Options:
      --bitcoin-data-dir <BITCOIN_DATA_DIR>
          Load Bitcoin Core data dir from <BITCOIN_DATA_DIR>.
      --bitcoin-rpc-password <BITCOIN_RPC_PASSWORD>
          Authenticate to Bitcoin Core RPC with <BITCOIN_RPC_PASSWORD>.
      --bitcoin-rpc-url <BITCOIN_RPC_URL>
          Connect to Bitcoin Core RPC at <BITCOIN_RPC_URL>.
      --bitcoin-rpc-username <BITCOIN_RPC_USERNAME>
          Authenticate to Bitcoin Core RPC as <BITCOIN_RPC_USERNAME>.
      --chain <CHAIN_ARGUMENT>
          Use <CHAIN>. [default: mainnet] [possible values: mainnet, testnet, signet, regtest]
      --commit-interval <COMMIT_INTERVAL>
          Commit to index every <COMMIT_INTERVAL> blocks. [default: 5000]
      --config <CONFIG>
          Load configuration from <CONFIG>.
      --config-dir <CONFIG_DIR>
          Load configuration from <CONFIG_DIR>.
      --cookie-file <COOKIE_FILE>
          Load Bitcoin Core RPC cookie file from <COOKIE_FILE>.
      --data-dir <DATA_DIR>
          Store index in <DATA_DIR>.
      --first-inscription-height <FIRST_INSCRIPTION_HEIGHT>
          Don't look for inscriptions below <FIRST_INSCRIPTION_HEIGHT>.
      --height-limit <HEIGHT_LIMIT>
          Limit index to <HEIGHT_LIMIT> blocks.
      --index <INDEX>
          Use index at <INDEX>.
      --index-cache-size <INDEX_CACHE_SIZE>
          Set index cache size to <INDEX_CACHE_SIZE> bytes. [default: 1/4 available RAM]
      --index-runes
          Track location of runes. RUNES ARE IN AN UNFINISHED PRE-ALPHA STATE AND SUBJECT TO CHANGE AT ANY TIME.
      --index-sats
          Track location of all satoshis.
      --index-spent-sats
          Keep sat index entries of spent outputs.
      --index-transactions
          Store transactions in index.
      --integration-test
          Run in integration test mode.
      --minify
          Minify JSON output.
  -n, --no-index-inscriptions
          Do not index inscriptions.
      --server-password <SERVER_PASSWORD>
          Require basic HTTP authentication with <SERVER_PASSWORD>. Credentials are sent in cleartext. Consider using authentication in conjunction with HTTPS.
      --server-username <SERVER_USERNAME>
          Require basic HTTP authentication with <SERVER_USERNAME>. Credentials are sent in cleartext. Consider using authentication in conjunction with HTTPS.
  -r, --regtest
          Use regtest. Equivalent to `--chain regtest`.
  -s, --signet
          Use signet. Equivalent to `--chain signet`.
  -t, --testnet
          Use testnet. Equivalent to `--chain testnet`.
  -h, --help
          Print help
  -V, --version
          Print version
```

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
中子团队：https://ep.atomicalneutron.com/proxy

https://pimvp.com/proxy
```

私有节点搭建

https://geekx.top/crypto/btc/Atomicals.html

```
docker-compose pull
docker-compose up -d
```

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

### 挖矿工具 - atomicalsir

https://github.com/hack-ink/atomicalsir

### elex-proxy

**EleX Proxy** 代理是一个轻量级的 Rust 实现，用于代理与 [Atomicals ElectrumX](https://github.com/atomicals/atomicals-electrumx) 服务器的通信。该项目旨在为处理 ElectrumX 请求提供简单而高效的解决方案。

https://github.com/WizzWallet/elex-proxy

### 搭建 atom 私有节点教程

1. 安装 Visual Studio 2022，选择 Communit 版本

   https://visualstudio.microsoft.com/zh-hans/vs/

   <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030328180.jpeg" alt="img" style="zoom: 33%;" />

   打开客户端工具-获取工具和功能，勾选c++桌面开发，再右下角点完成配置

   <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030329252.jpeg" alt="img" style="zoom:33%;" />

2. 下载python

   https://www.python.org/ftp/python/3.10.11/python-3.10.11-amd64.exe

   <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030329467.jpeg" alt="img" style="zoom: 50%;" />

3. 打开powershell配置atomicals-electrumx

   <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030330660.jpeg" alt="img" style="zoom:50%;" />

   1. 然后次输入以下指令（注意等完成后再输入）

      ```shell
      git clone https://github.com/atomicals/atomicals-electrumx
      cd atomicals-electrumx
      ```

   2. 下载plyvel配置文件

      https://github.com/liviaerxin/plyvel/releases/download/v1.5.0-CI/plyvel_ci-1.5.0-cp310-cp310-win_amd64.whl

   3. 该文件放在D:\atomicals-electrumx文件夹里

   4. 然后次输入以下指令

      ```shell
      python.exe -m pip install --upgrade pip
      pip install aiohttp==3.9.1 aiorpcX==0.22.1 aiosignal==1.3.1 async-timeout==4.0.3 attrs==23.1.0 cbor2==5.5.1 Cython==3.0.6 frozenlist==1.4.0
      pip install idna==3.6 krock32==0.1.1 merkletools==1.0.3 multidict==6.0.4 pylru==1.2.1 pysha3==1.0.2 python-dotenv==1.0.0 regex==2023.10.3 websockets==12.0 yarl==1.9.3
      pip install plyvel_ci-1.5.0-cp310-cp310-win_amd64.whl
      ```

4. 修改2个文件env和env_base

   1. 找到D:\atomicals-electrumx\electrumx\lib目录下的env_base文件，插入代码：

      ```python
      from dotenv import load_dotenv

      load_dotenv()
      ```

      <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030330162.png" alt="img" style="zoom:50%;" />

   2. 找到D:\atomicals-electrumx路径下的dev文件， 第一行url改为：DAEMON_URL=http://electrumx:electrumx@localhost:8332/

   3. 第五行directory改为指向的data数据路径（具体看你存在什么位置，然后复制路径粘贴到这里就可以，图中是我磁力链接下载好的data数据解压后所在的位置，磁力链接教程在我们OW上一个私有节点教程https://x.com/OrdzWorld/status/1728536317032862024?s=20评论区）

      <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030330230.png" alt="img" style="zoom:50%;" />

5. 输入指令

   ```shell
   python electrumx_server
   ```

   <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030330241.png" alt="img" style="zoom:50%;" />

   出现跳动的乱码，等待它完成同步

6. 配置proxy

   重新打开一个powershell，打开D路径 d：按enter

   输入指令：

   ```shell
   git clone https://github.com/atomicals/electrumx-proxy
   ```

   <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030331600.png" alt="img" style="zoom:50%;" />

   依次输入指令：

   ```shell
   cd electrumx-proxy
   npm install
   npm run dev
   ```

   <img src="https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030331440.png" alt="img" style="zoom:50%;" />

   查看状态：

   http://localhost:8080/proxy/health

   ![img](https://static.yoouu.cn/static/imgs/doc/blockchain/inscription/202401030331241.png)

   等待atomicals-electrumx同步完成即可拥有私人节点，出现2个ture后你就可以去Atomicals js里面的修改env改为自己的节点http://localhost:8080/proxy

   自此，私有节点搭建完成！！

7. 来源：https://www.ordinalsworld.io/p/dockerpythonatom

### 搭建 atom 私有节点教程 - docker

如果你想赚钱，不要用 docker。🙂

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

```shell
# 安装 nvm
export NVM_SOURCE=https://gitee.com/mirrors/nvm.git
curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash

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

### 挖 darkmatter、neutron、quark、electron

```shell
# Sophon
yarn cli mint-dft --disablechalk sophon --satsbyte=65

yarn cli mint-dft neutron --satsbyte=150
yarn cli mint-dft quark --satsbyte=120
# 挖 electron --satsbyte=52 是设置 gas 的
yarn cli mint-dft electron --satsbyte=52


yarn cli mint-dft darkmatter --satsbyte=92
```

electron dune 数据看板 https://dune.com/satsx/electron

### 挖 nft- 鳄鱼、河豚、鱼脸男

```shell
# 鳄鱼
toothy
yarn cli mint-item "#toothy" "0999" C:\Users\zero\Desktop\toothy\item-0999.json --satsbyte 30
yarn cli mint-item "#toothy" "1418" C:\Users\zero\Desktop\toothy\item-1418.json --satsbyte 30

# 河豚
capybaras
yarn cli mint-item "#toothy" "0091" C:\Users\zero\Desktop\capybaras\json\item-0091.json --satsbyte 30
yarn cli mint-item "#toothy" "0115" C:\Users\zero\Desktop\capybaras\json\item-0115.json
```

dune 数据看板

https://dune.com/satsx/electron

### x 信息

- 教程: https://twitter.com/codefish14/status/1728773220382515403

- 查询顺序方法: https://twitter.com/qingshan857/status/1729175868487110994
  - 面板：[https://geniidata.com/user/qingshan857/atom-electron](https://geniidata.com/user/qingshan857/atom-electron)
- 挖⛏️electron的福报细则来了🔥🔥🔥: https://twitter.com/atomicals_cn/status/1729170033040130066?s=46
