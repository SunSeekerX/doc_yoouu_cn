# Ethereum

区块链数据大小统计

以太坊：[https://bitinfocharts.com/ethereum/](https://bitinfocharts.com/ethereum/)

以太坊经典：[https://bitinfocharts.com/ethereum%20classic/](https://bitinfocharts.com/ethereum%20classic/)

在线合约编辑器：[https://remix.ethereum.org](https://remix.ethereum.org)

**合约代码仓库**

[https://github.com/ethereumbook/ethereumbook](https://github.com/ethereumbook/ethereumbook)

## 客户端

Parity, Rust· Geth, Go· cpp-ethereum, C++· pyethereum, Python· Mantis, Scala· Harmony, Java

**Go-Ethereum（Geth）客户端**

以太坊：https://github.com/ethereum/go-ethereum/或https://geth.ethereum.org。

· 以太坊经典：https://github.com/ethereumproject/go-ethereum。

· Ellaism:https://github.com/ellaism/go-ellaism。

· Expanse:https://github.com/expanse-org/go-expanse。

· Musicoin:https://github.com/Musicoin/go-musicoin。

· Ubiq:https://github.com/ubiq/go-ubiq。

以太坊区块链数据的首次同步

以太坊曾经倍攻击过，有一部分数据同步会非常慢

记得加上 `--fast`

启动一个Geth可以连接三类网络：主网、远程测试网、本地测试网。同时有三种同步模式；Full、Fast、 Light，这三种模式涉及到本地同步的数据量。今天不说这两个的三个，需要的同学请移步到：

### 一些命令

```shell
# 输出 geth 版本
geth version
```

### 同步模式

Geth 有三个`syncmode`

```bash
$ geth --syncmode "full"
$ geth --syncmode "fast"
$ geth --syncmode "light"
```

`"full"`完全按照您的预期运行一个完整的节点--您的机器以其原始的干净状态初始化 EVM 的本地副本，下载自区块链开始以来的每个区块，并执行每个区块中的每个交易，更新 EVM 状态，直到它达到当前的 EVM 状态。

`"fast"`下载所有区块，但也从对等点下载 EVM 状态的最新快照（当前为过去 EVM 64 块的状态），仅在最新的区块中执行事务，直到它达到当前 EVM 状态。 `"fast"`的优点是同步到当前状态所需的时间要短得多；但是，它依赖于状态快照的完整存档节点对等项，因此它不会自己验证所有内容。

最后，`"light"`运行一个轻节点，我们在上面已经讨论过了。

### 网络类型

**主网**

以太坊真是节点运行的网络，节点遍布全球，此网络中使用的ETH是真实的虚拟数字货币，部署合约时需要消耗真金白银。

**测试网**

测试网的节点没有主网节点那么多，主要是为以太坊开发者提供一个测试的平台环境，此网络上的ETH可以通过水龙头获得。

**私网**

私网是由开发者自行组建的网络，不与主网及测试网连通，独立存在，仅用于个人测试或企业项目使用

### 启动一个本地的以太坊网络

官方教程：[https://geth.ethereum.org/docs/interface/private-network](https://geth.ethereum.org/docs/interface/private-network)

1. 选择一个网络 id

   如果要自己创建一个以太坊链，并且多个节点互连，需要选择一个网络 id 没有倍使用过。

   可以在 [https://chainid.network](https://chainid.network) 查看。搜索 id 就行。主网的 id 为 1

2. 选择一致性算法

   主网用工作证明保证区块链的安全，Geth 也支持该方式。但是不适合在私人网络使用这种方式。强烈推荐clique使用 `clique` 作为共识算法，因为对资源占用非常小 [Rinkeby](https://www.rinkeby.io/) and [Görli](https://goerli.net/) 也是用的该方式。关于两种方式的区别可以查看官方的文档说明。

3. 创建创世区块

   默认启动 `Geth` 会链接主网，以主网的创世区块作为创世区块。在私人网络上，你可以创建一个自定义的创世区块。创世区块的配置使用 `genesis.json ` 文件进行配置。

   1. 以太坊平台功能在启动时启用（配置）。在区块链运行时启用协议功能需要安排一个硬分叉。 （暂不明白说的是啥）
   2. 初始化块的 `gasLimit`，会影响后面 `evm` 可以在一个块中的计算，启动后可以通过 `--miner.gastarget` 修改。查询网址：[Ethereum Average Gas Limit Chart](https://etherscan.io/chart/gaslimit)
   3. 初始化以太币分配，可以设置在创世区块中的以太币数量。

4. 基本例子

   启动一个验证权限网络 `proof-of-authority`

   > 配置部分可确保所有已知的协议更改可用，并配置“Clique”引擎以用于共识。

   第一次创建一个签名的账户 key 需要使用 [geth account](https://geth.ethereum.org/docs/interface/managing-your-accounts) 命令（可以运行多次来生成多个 key）生成的文件为 `keystore`

   ```shell
   geth account new --datadir data
   ```

   收集创建的签名者账号，填写到 `genesis.json` 文件中

   ```json
   {
     "config": {
       "chainId": 15,
       "homesteadBlock": 0,
       "eip150Block": 0,
       "eip155Block": 0,
       "eip158Block": 0,
       "byzantiumBlock": 0,
       "constantinopleBlock": 0,
       "petersburgBlock": 0,
       "clique": {
         "period": 5,
         "epoch": 30000
       }
     },
     "difficulty": "1",
     "gasLimit": "8000000",
     "extradata": "0x000000000000000000000000000000000000000000000000000000000000000000C13669Be15A01A32688Da62f4260872bd052e90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
     "alloc": {
       "00C13669Be15A01A32688Da62f4260872bd052e9": { "balance": "300000" },
       "6581eEfEC5043687570241C801FdE86ce45b0b5c": { "balance": "400000" }
     }
   }
   ```

   **Ethash 示例**

   `ethash` 为默认的共识算法，你可以设置默认的难度通过 `difficulty` 字段，难度会很快的根据你部署在网络中的矿机数量进行调整。

   **初始化 Geth 的数据库**

   ```shell
   geth init --datadir data genesis.json
   ```

   使用配置的创世区块启动节点

   ```shell
   geth --datadir data --networkid 15
   ```

**第一步：配置创世块文件**

创建`genesis.json`文件：

```json
{
  "config": {
    "chainId": 18,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "alloc": {},
  "coinbase": "0x0000000000000000000000000000000000000000",
  "difficulty": "0x2",
  "extraData": "",
  "gasLimit": "0xffffffff",
  "nonce": "0x0000000000000042",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}
```

coinbase：挖矿后获得奖励的账户地址difficulty：挖矿难度gasLimit：一个区块所能容纳gas的上限，智能合约指令在执行时需要消耗gas,，可通过以太币自动兑换nonce：随机值mixhash：一个256位的hash证明，与nonce相结合，验证本块的有效性extraData：附加信息，随意填写parentHash：前一块的hash值，创世块的parentHash值为0

**第二步：数据初始化**

初始化指令

```bash
geth init genesis.json --datadir ./data
1
```

- `init`：初始化关键字
- `datadir`：指定数据存储位置

<!-- ![image-20211116215256093](imgs/image-20211116215229804.png) -->

**第三步：启动Geth节点**

```bash
# 添加环境变量（若已添加环境变量，可跳过此步）
export PATH=$HOME/geth-home:$PATH
echo `export PATH=$HOME/geth-home:$PATH` >> ~/.bashrc
# 启动Geth节点
geth --datadir ./data --networkid 18 --port 30303 --rpc --rpcport 8545 --rpcapi 'db,net,eth,web3,personal' --rpcaddr 192.168.123.79 --rpccorsdomain '*' --gasprice 0 --allow-insecure-unlock console 2> 1.log

# windows
geth --datadir ./data --networkid 18 --port 30303 --allow-insecure-unlock
```

`--datadir` Data directory for the databases and keystore (default: "~/.ethereum")

`--networkid` 显式设置网络id(整数)(对于testnets:使用——ropsten，——rinkeby，——goerli代替)(默认值:1)

`--port` etwork listening port (default: 30303)

`--allow-insecure-unlock` 当账号相关的rpc通过http公开时，允许不安全的账号解锁

`console` 启动一个交互的 JavaScript 环境

### 区块链和 EVM 的数据存储在哪里？

Geth 用于存储原始区块链数据的目录取决于您的操作系统。 在运行 Geth 时，查找如下所示的消息

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

`“database=”`后面的路径应该会告诉您区块链数据存储在您的机器上的何处。 如果您运行的是完整节点，则此目录将包含有关已提交到区块链的每个区块的所有数据。 因为我们正在运行轻节点，此目录仅包含区块头。

这里值得强调的是，这是区块链能够维持活跃度的最低限度。 区块链的完整内容和 EVM 状态存储在以太网络中的每个完整节点上，存储在与您计算机上的目录非常相似的目录中。

### 附加到 JAVASCRIPT 控制台

除非我们能够与节点真正交互，否则运行节点没有用处。 例如，我们可能想要广播交易请求或查看 EVM/区块链数据（例如帐户余额）。 Geth 有一个内置的 Javascript 控制台和一个名为[web3js](https://github.com/ethereum/web3.js/)的 Javascript API，您可以使用它与您的节点进行交互。

使用 Javascript 控制台：

1. 在终端窗口开始运行一个节点，不管是完整节点还是轻节点都可以。
2. 查找类似于如下的消息：

```bash
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
```

应在数据块同步开始之前记录此消息。

1. 此消息指明 IPC（进程间通信）端点的路径。 复制这个路径（在上面的示例中，它是 `/Userss/bgu/Library/Etherum/testnet/geth.ipc`）。
2. 打开一个新的终端窗口或标签，然后运行以下命令： `$ geth attach [您的IPC端点路径]`

这应会打开 Javascript 控制台。 我们现在可以使用 web3js 与节点进行交互。

## Metamask 配置

https://chainlist.org/

签名一个原始交易 https://docs.etherscan.io/tutorials/signing-raw-transactions

以太坊开发工具及资源大全 https://learnblockchain.cn/article/2006

250+ Ethereum Developer Tools List https://simpleaswater.com/ethereum-developer-tools-list/
