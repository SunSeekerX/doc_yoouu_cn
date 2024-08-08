## Bitcoin

比特币是怎么工作的？ https://learnmeabitcoin.com/

## Win - 搭建全节点

前几天刚写了[linux搭建全节点的教程](http://mp.weixin.qq.com/s?__biz=Mzg2MTc3Mjk0Nw==&mid=2247485411&idx=1&sn=71f93b1c6e029f23761a63dba21b7bd8&chksm=ce134a1ff964c309e146de70e60c9da003b1ff5c8fc498cb006de30fca27688452d50c7de71c&scene=21#wechat_redirect)，不过云服务器搭建门槛稍高，应读者要求，今天再来写一篇windows搭建全节点铸造铭文的教程，这篇教程适用于没有技术背景的小白，我会详细到每一个步骤，我相信每个人都能拥有一个属于自己的全节点（**需要准备一个1T存储以上的固态硬盘**）。

搭建步骤：

- **BitcoinCore客户端安装**
- **全节点数据同步**
- **Ord钱包安装**
- **索引区块**
- **铸造铭文**

### BitcoinCore客户端安装

直接点击链接 https://bitcoincore.org/en/download/ 来到客户端的下载页面，点击蓝色按钮，下载最新的版本。

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292236261.png" alt="img" style="zoom: 50%;" />

下载完成后打开安装程序，点击"Next"

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292236186.png" alt="img" style="zoom:50%;" />

下一步就是选择安装目录，可以使用默认的安装路径,也可以点击“Browser“自定义安装路径。选择好之后，继续点击"next"。

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292237342.png" alt="img" style="zoom:50%;" />

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292238987.png" alt="img" style="zoom:50%;" />

等待安装完成，最后点击finish即可。

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292238148.png" alt="img" style="zoom:50%;" />

接下来的两步比较关键，首先要选择存放区块数据的目录，需要大于502GB的存储空间，这里点击后面的”...“按钮，选择1T的固态硬盘所在的目录，比如”E:\BtcData“, 其次就是**不能勾选**下方箭头所指的”勾选框“，如果勾选上就代表使用裁剪模式，而铸造铭文必须使用完整的数据。最后点击"ok"按钮。

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292238390.png" alt="img" style="zoom:50%;" />

进入到钱包界面后，点击"设置"->”选项“

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292238459.png" alt="img" style="zoom:50%;" />

**第一个自动登入可选可不选，勾上的话开机之后会自动同步最新的数据**

**第二个设置的地方是将数据库缓存大小改为你内存大小的25%，比如16GB内存就设置4096MB比较合适。**

**第三个勾选的地方是启用RPC服务器，这个是允许客户端可以与Bitcoin core节点进行通信。**

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292239285.png" alt="img" style="zoom:50%;" />

整个客户端的设置到这儿基本也就设置好了。

**全节点数据同步**

接下来就是去同步全节点的数据，这里我建议大家不要从头开始同步，我们要踩在巨人的肩膀上帮我们提高效率，可以使用别人已经下载好的数据。

点击下方的链接：[https://github.com/CryptoCellLabs/Bitcoin_FullNode_Data](https://github.com/CryptoCellLabs/Bitcoin_FullNode_Data)

可以直接下载全节点数据，不过这个是同步到2022年8月15日区块的数据，下载之后需要继续同步至最新的区块。

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292239858.png" alt="img" style="zoom:50%;" />

全节点数据需要用7-zip进行解压，然后放到之前创建的E:\BtcData目录下，就像这样。

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292239752.png" alt="img" style="zoom:50%;" />

在继续同步之前我们还需要在此目录下新建一个配置文件"bitcoin.conf"，并写入如下内容，addnode可以用来添加一个节点，可以加快下载速度，这些节点的ip可以从以下的网站获得：https://bitnodes.io/,优先使用国内的节点，最后保存即可。

内容看下面的配置文件。

为了让Bitcoin core客户端能找到全节点数据，我们还需要右键桌面快捷方式->单击"属性"。在"目标"这一栏添加上

```
-datadir=E:\BitcoinData -txindex
```

**等号后面替换成存储比特币区块数据的目录 -datadir前面要留有一个空格,-txindex 用于下载比特币区块的索引数据。**

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292240495.png" alt="img" style="zoom:50%;" />

将以上工作全部做完，启动客户端等待同步完成之后，可以来到控制台。

在下方输入**getblockcount**，将得到的区块数和mempool 浏览器（https://mempool.space/zh/ ）中的最新区块进行对比，如果一致，则代表同步成功。

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292240976.png" alt="img" style="zoom:50%;" />

输入**getindexInfo**,可以查看索引数据同步的情况，当”synced”变为true时则表示索引同步完成。

<img src="https://static.yoouu.cn/static/imgs/doc/blockchain/bitcoin/202311292240901.png" alt="img" style="zoom:50%;" />

### 正式网配置文件

```
server=1
daemon=1
txindex=1
rpccookiefile=.cookie
rpcauth=nextdao:cca838b4b19bdc6093f4e0312550361c$213834a29e8488804946c196781059a7ee0ac2b48dbf896b4c6852060d9d83dd
rpcallowip=192.168.0.0/16
rpcbind=0.0.0.0

addnode=81.68.102.34:8333
addnode=60.205.205.119:8333
addnode=223.167.74.199:8333
addnode=47.104.221.103:8333
addnode=112.19.172.217:8333
addnode=47.109.21.215:8333
addnode=120.244.105.164:8333
addnode=47.108.165.145:8333
addnode=47.105.52.43:8334
addnode=60.205.205.119:8333
addnode=182.100.67.50:8333
addnode=114.232.3.79:8333
addnode=120.232.252.83:8333
addnode=223.72.35.247:2001
addnode=171.37.251.45:8333
addnode=27.152.156.207:8333
addnode=47.104.221.103:8333
addnode=122.114.175.228:8333
addnode=101.42.162.85:8333
addnode=1.116.110.123:8333
addnode=101.43.95.152:8333
addnode=202.108.211.135:8333
addnode=202.112.238.128:8333
addnode=14.152.95.120:8333
addnode=117.48.133.67:8333
addnode=120.79.71.72:8333
addnode=1.13.6.115:8333
addnode=42.225.2.157:8333
addnode=117.27.228.173:8333
addnode=8.129.184.255:8333
addnode=117.186.238.102:8333
addnode=194.156.99.41:10001
addnode=27.152.156.207:8333
addnode=171.37.251.45:8333
addnode=221.216.138.225:2011
addnode=110.40.210.253:8333
addnode=125.46.243.119:8333
addnode=211.94.136.214:8333
addnode=101.42.162.85:8333
addnode=218.31.113.245:8333
addnode=49.79.173.85:8333
addnode=47.105.52.43:8334
addnode=120.79.71.72:8333
addnode=202.108.211.135:8333
addnode=222.186.20.60:8333
addnode=202.112.238.128:8333
addnode=101.43.211.151:8333
addnode=101.34.215.76:8333
addnode=114.232.3.79:8333
addnode=14.152.95.120:8333
addnode=113.120.116.228:8333
addnode=113.65.5.221:8333
addnode=185.74.222.29:8333
addnode=223.72.35.247:2001
addnode=49.79.136.160:8333
addnode=27.148.206.140:8333
addnode=27.152.156.207:8333
addnode=49.79.26.134:8333
addnode=120.79.71.72:8333
addnode=218.31.113.245:8333
addnode=81.68.102.34:8333
addnode=60.205.205.119:8333
addnode=223.167.74.199:8333
addnode=112.19.172.217:8333
addnode=47.109.21.215:8333
addnode=120.244.105.164:8333
addnode=47.108.165.145:8333
```

### 测试网配置文件

```
# 使用测试网
testnet=1
# 服务器模式允许RPC调用
server=1
# 后台运行比特币客户端
daemon=1
# 启用所有交易的索引
txindex=1
# RPC设置
# rpcuser=your_rpc_username
# rpcpassword=your_rpc_password
# rpcallowip=127.0.0.1
# rpcport=18332
# 可选：指定比特币数据目录
#datadir=/path/to/your/testnet/data
# 可选：日志文件的位置
#debuglogfile=/path/to/your/testnet/debug.log
# 允许对等网络发现
listen=1
# 可选：开启钱包功能
disablewallet=0
# 节点绑定的IP地址，0.0.0.0 表示接受任何IP地址的连接
# 这个设置在生产环境需要谨慎使用
# rpcbind=0.0.0.0
```

## Linux - 搭建全节点

http://mp.weixin.qq.com/s?__biz=Mzg2MTc3Mjk0Nw==&mid=2247485411&idx=1&sn=71f93b1c6e029f23761a63dba21b7bd8&chksm=ce134a1ff964c309e146de70e60c9da003b1ff5c8fc498cb006de30fca27688452d50c7de71c&scene=21#wechat_redirect
