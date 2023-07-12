# Solidity

## 📌 学习

### 加密僵尸学习文档

[https://cryptozombies.io/zh/course](https://cryptozombies.io/zh/course)

learn_blockchain

[https://github.com/chaseSpace/learn_blockchain](https://github.com/chaseSpace/learn_blockchain)

以太坊开发者工具列表

[https://github.com/Consensys/ethereum-developer-tools-list/blob/master/README_Chinese.md](https://github.com/Consensys/ethereum-developer-tools-list/blob/master/README_Chinese.md)

WTF 学院

[https://www.wtf.academy/](https://www.wtf.academy/)

[https://dukedaily.github.io/solidity-expert/cn/](https://dukedaily.github.io/solidity-expert/cn/)

## 📌 openzeppelin

标准合约库。使用 npm 进行分发。

官网：[https://openzeppelin.com/](https://openzeppelin.com/)

合约库官网：[https://openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)

合约库文档：[https://docs.openzeppelin.com/contracts/4.x/](https://docs.openzeppelin.com/contracts/4.x/)

Github：[https://github.com/OpenZeppelin](https://github.com/OpenZeppelin)

### @openzeppelin/contracts

**知识相关**

- 新手入门：[https://docs.openzeppelin.com/learn/developing-smart-contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts)
- 权限控制：[https://docs.openzeppelin.com/contracts/4.x/access-control](https://docs.openzeppelin.com/contracts/4.x/access-control)
- erc20：[https://docs.openzeppelin.com/contracts/4.x/erc20](https://docs.openzeppelin.com/contracts/4.x/erc20)
- erc721：[https://docs.openzeppelin.com/contracts/4.x/erc721](https://docs.openzeppelin.com/contracts/4.x/erc721)
- 公共函数（父合约）：[https://docs.openzeppelin.com/contracts/4.x/utilities](https://docs.openzeppelin.com/contracts/4.x/utilities)

**安装**

需要和 truffle 配合使用

```shell
npm install @openzeppelin/contracts
```

**使用**

直接继承库合约就行

```solidity
// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") {
    }
}
```

## 📌 Metamask

小狐狸钱包。

文档地址：[https://docs.metamask.io/guide/](https://docs.metamask.io/guide/)

## 📌 NFT

### nftscan

[https://www.nftscan.com/](https://www.nftscan.com/)

NFTScan 是一个专业的多链 NFT 浏览器和数据基础设施。NFTScan 及其团队于 2021 年由 Zheng Kaihong 和 Shier 共同创立，立足上海、成都和新加坡， 迅速发展至今，已积累了丰富的经验。目前，NFTScan 覆盖了 Ethereum、BNBChain、Polygon、Solana、Arbitrum、Optimism、Moonbeam、PlatON 和 Avalanche 九个区块链上的 NFT 相关数据。用户可以通过该网站检索这些生态系统中的各种 NFT 链上数据。

为了帮助解决 Web3 开发者在 NFT 领域遇到的问题，NFTScan 目前主要打造了两个核心服务：Open API 平台和多链 NFT 浏览器

### hashlips_art_engine

HashLips 艺术引擎是一个用于根据提供的图层创建多个不同实例的艺术作品的工具。

Github：[https://github.com/HashLips/hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine)

### Pinata

管理上传到 ipfs 的文件。

官网：[https://www.pinata.cloud/](https://www.pinata.cloud/)

## 📌 Truffle

开发，测试，部署框架。

可以让你使用外部包，迁移，和测试。

官网：[https://trufflesuite.com/](https://trufflesuite.com/)

中文文档：[https://learnblockchain.cn/docs/truffle/index.html](https://learnblockchain.cn/docs/truffle/index.html)

### 1. 安装

```shell
npm install -g truffle
# 安装到项目
npm install --save-dev truffle
```

### 2. 新建合约

`contracts/Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Box {
  uint256 private _value;

  // Emitted when the stored value changes
  event ValueChanged(uint256 value);

  // Stores a new value in the contract
  function store(uint256 value) public {
    _value = value;
    emit ValueChanged(value);
  }

  // Reads the last stored value
  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 3. 编译合约

**新建配置文件**

`truffle-config.js`

```javascript
module.exports = {
  compilers: {
    solc: {
      version: '^0.8.0',
    },
  },
}
```

**编译合约**

```shell
npx truffle compile
```

### 4. 添加更多合约

`contracts/Auth.sol`

```solidity
// contracts/access-control/Auth.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Auth {
  address private _administrator;

  constructor(address deployer) {
    // Make the deployer of the contract the administrator
    _administrator = deployer;
  }

  function isAdministrator(address user) public view returns (bool) {
    return user == _administrator;
  }
}
```

导入

`contracts/Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Auth from the access-control subdirectory
import './access-control/Auth.sol';

contract Box {
  uint256 private _value;
  Auth private _auth;

  event ValueChanged(uint256 value);

  constructor() {
    _auth = new Auth(msg.sender);
  }

  function store(uint256 value) public {
    // Require that the caller is registered as an administrator in Auth
    require(_auth.isAdministrator(msg.sender), 'Unauthorized');

    _value = value;
    emit ValueChanged(value);
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 5. 使用 OpenZeppelin 合约

**导入 OpenZeppelin 合约**

```shell
npm install --save-dev @openzeppelin/contracts
```

`Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Ownable from the OpenZeppelin Contracts library
import '@openzeppelin/contracts/access/Ownable.sol';

// Make Box inherit from the Ownable contract
contract Box is Ownable {
  uint256 private _value;

  event ValueChanged(uint256 value);

  // The onlyOwner modifier restricts who can call the store function
  function store(uint256 value) public onlyOwner {
    _value = value;
    emit ValueChanged(value);
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 6. 部署测试准备

**启动本地区块链**

> 最受欢迎的本地区块链是[Ganache](https://github.com/trufflesuite/ganache-cli)。要将其安装到您的项目中，请运行：

```shell
npm install --save-dev ganache-cli
```

> 启动时，Ganache 将随机创建一组未锁定的帐户并为它们提供以太币。为了获得将在本指南中使用的相同地址，您可以在确定性模式下启动 Ganache：

```shell
npx ganache-cli --deterministic
```

**新建部署脚本**

> Truffle 使用[迁移](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations)来部署合约。迁移由 JavaScript 文件和一个特殊的迁移合约组成，用于跟踪链上的迁移。
>
> 我们将创建一个 JavaScript 迁移来部署我们的 Box 合约。我们将此文件另存为`migrations/2_deploy.js`.

`migrations/2_deploy.js`

```javascript
// migrations/2_deploy.js
const Box = artifacts.require('Box')

module.exports = async function (deployer) {
  await deployer.deploy(Box)
}
```

> 在我们部署之前，我们需要配置到 ganache 的连接。我们需要为 localhost 和端口 8545 添加一个开发网络，这是我们本地区块链正在使用的。

`truffle-config.js`

```javascript
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: '0.8.4',
    },
  },
}
```

### 7. 部署

注意需要在另外的命令行面板启动一个本地界面才能进行部署测试！

```shell
npx truffle migrate --network development
```

### 8. 测试交互 - 控制台

```shell
npx truffle console --network development
```

执行以上命令行就进入了 `nodejs` 的命令交互面板

获取需要操作的合约对象

```javascript
const box = await Box.deployed()
```

**发送交易**

```javascript
await box.store(42)
```

**查询状态**

> `Box`的另一个函数被调用`retrieve`，它返回存储在合约中的整数值。这是区块链状态的*查询*，所以我们不需要发送交易：

```javascript
await box.retrieve()
```

> 因为查询只读取状态而不发送事务，所以没有要报告的事务哈希。这也意味着使用查询不需要任何以太币，并且可以在任何网络上免费使用。
>
> 我们的`Box`合约返回`uint256`的数字对于 JavaScript 来说太大了，所以我们返回的是一个大数字对象。我们可以使用 将大数显示为字符串`(await box.retrieve()).toString()`。

```javascript
;(await box.retrieve()).toString()
```

### 9. 测试交互 - 编程

新建一个 `scripts/index.js` 文件，里面写上需要测试的代码

我们的代码都写入到 `main` 函数内

`scripts/index.js`

```javascript
// scripts/index.js
module.exports = async function main(callback) {
  try {
    // Our code will go here
    // Retrieve accounts from the local node
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    callback(0)
  } catch (error) {
    console.error(error)
    callback(1)
  }
}
```

**运行测试**

```shell
npx truffle exec --network development ./scripts/index.js
```

**获取合约实例**

> 为了与[`Box`](https://docs.openzeppelin.com/learn/deploying-and-interacting?pref=truffle#box-contract)我们部署的合约进行交互，我们将使用 Truffle 合约抽象，这是一个 JavaScript 对象，代表我们在区块链上的合约。

```javascript
// Set up a Truffle contract, representing our deployed Box instance
const Box = artifacts.require('Box')
const box = await Box.deployed()

// 获取盒子里的值
const value1 = await box.retrieve()
console.log('Box value is', value1.toString())

// 存入一个新的值
await box.store(23)

// 获取存入的值
const value2 = await box.retrieve()
console.log('Box value is', value2.toString())
```

### 10. 编写单元测试

### ethpm 包管理

[ERC190 规范](https://github.com/ethereum/EIPs/issues/190) 下的包管理，但是浏览包的时候出现问题，查看 git 项目，一般的项目都是用的 npm 来分发 sol 库。

官网：[https://www.ethpm.com/](https://www.ethpm.com/)

### Ganache

个人便携式的区块链客户端。可以用来开发测试合约。支持 windows，linux 和 mac。

官网文档：[https://trufflesuite.com/docs/ganache/index.html](https://trufflesuite.com/docs/ganache/index.html)

## 📌 hardhat

另外的开发框架。

官网：[https://hardhat.org/](https://hardhat.org/)

### 1. 安装

```shell
npm install --save-dev hardhat
```

### 2. 新建合约

`contracts/Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Box {
  uint256 private _value;

  // Emitted when the stored value changes
  event ValueChanged(uint256 value);

  // Stores a new value in the contract
  function store(uint256 value) public {
    _value = value;
    emit ValueChanged(value);
  }

  // Reads the last stored value
  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 3. 编译合约

**生成配置文件**

```shell
npx hardhat
```

选择 `Create an empty hardhat.config.js`

可以在 `hardhat.config` 配置编译器版本

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
}
```

**编译合约代码**

以太坊虚拟机 (EVM) 不能直接执行 Solidity 代码：我们首先需要将其编译为 EVM 字节码。

```shell
npx hardhat compile
```

### 4. 添加更多合约

`contracts/Auth.sol`

```solidity
// contracts/access-control/Auth.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Auth {
  address private _administrator;

  constructor(address deployer) {
    // Make the deployer of the contract the administrator
    _administrator = deployer;
  }

  function isAdministrator(address user) public view returns (bool) {
    return user == _administrator;
  }
}
```

导入

`contracts/Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Auth from the access-control subdirectory
import './access-control/Auth.sol';

contract Box {
  uint256 private _value;
  Auth private _auth;

  event ValueChanged(uint256 value);

  constructor() {
    _auth = new Auth(msg.sender);
  }

  function store(uint256 value) public {
    // Require that the caller is registered as an administrator in Auth
    require(_auth.isAdministrator(msg.sender), 'Unauthorized');

    _value = value;
    emit ValueChanged(value);
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 5. 使用 OpenZeppelin 合约

**导入 OpenZeppelin 合约**

```shell
npm install --save-dev @openzeppelin/contracts
```

`Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Ownable from the OpenZeppelin Contracts library
import '@openzeppelin/contracts/access/Ownable.sol';

// Make Box inherit from the Ownable contract
contract Box is Ownable {
  uint256 private _value;

  event ValueChanged(uint256 value);

  // The onlyOwner modifier restricts who can call the store function
  function store(uint256 value) public onlyOwner {
    _value = value;
    emit ValueChanged(value);
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 6. 部署测试准备

hardhat 自带了一个本地测试网络,每次启动都会创建一个新的本地区块节点。

```shell
npx hardhat node
```

**安装需要用到的依赖**

```shell
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

**添加插件到 `hardhat.config.js`**

```javascript
// hardhat.config.js
require('@nomiclabs/hardhat-ethers');
...
module.exports = {
...
};
```

**新建部署脚本**

`scripts\deploy.js`

```javascript
// scripts/deploy.js
async function main() {
  // We get the contract to deploy
  const Box = await ethers.getContractFactory('Box')
  console.log('Deploying Box...')
  const box = await Box.deploy()
  await box.deployed()
  console.log('Box deployed to:', box.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

### 7. 部署

注意需要在另外的命令行面板启动一个本地界面才能进行部署测试！

```shell
npx hardhat run --network localhost scripts/deploy.js
```

### 8. 测试交互 - 控制台

```shell
npx hardhat console --network localhost
```

执行以上命令行就进入了 `nodejs` 的命令交互面板

获取需要操作的合约对象

```javascript
const Box = await ethers.getContractFactory('Box')
const box = await Box.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3')
```

**发送交易**

> `Box`的第一个函数，`store`接收一个整数值并将其存储在合约存储中。因为这个函数*修改*了区块链状态，所以我们需要向合约*发送一个交易*来执行它。
>
> 我们将发送一个交易来调用`store`带有数值的函数：

```javascript
await box.store(42)
/*
{
  hash: '0x3d86c5c2c8a9f31bedb5859efa22d2d39a5ea049255628727207bc2856cce0d3',
...
*/
```

**查询状态**

> `Box`的另一个函数被调用`retrieve`，它返回存储在合约中的整数值。这是区块链状态的*查询*，所以我们不需要发送交易：

```javascript
await box.retrieve()
// BigNumber { _hex: '0x2a', _isBigNumber: true }
```

> 因为查询只读取状态而不发送事务，所以没有要报告的事务哈希。这也意味着使用查询不需要任何以太币，并且可以在任何网络上免费使用。
>
> 我们的`Box`合约返回`uint256`的数字对于 JavaScript 来说太大了，所以我们返回的是一个大数字对象。我们可以使用 将大数显示为字符串`(await box.retrieve()).toString()`。

```javascript
;(await box.retrieve()).toString()
// '42'
```

### 9. 测试交互 - 编程

新建一个 `scripts/index.js` 文件，里面写上需要测试的代码

我们的代码都写入到 `main` 函数内

`scripts/index.js`

```javascript
// scripts/index.js
async function main() {
  // 我们的代码写到这里
  // 获取本地节点启动的账户
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

**运行测试**

使用 `hardhat` 运行脚本会注入一些全局变量，例如 `ethers`

```shell
npx hardhat run --network localhost ./scripts/index.js
```

**获取合约实例**

> 为了与[`Box`](https://docs.openzeppelin.com/learn/deploying-and-interacting#box-contract)我们部署的合约进行交互，我们将使用一个[ethers 合约实例](https://docs.ethers.io/v5/api/contract/contract/)。
>
> ethers 合约实例是一个 JavaScript 对象，它代表我们在区块链上的合约，我们可以使用它来与我们的合约进行交互。要将其附加到我们部署的合约中，我们需要提供合约地址。

```javascript
// 这里替换为控制台部署输出的合约地址
const address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
const Box = await ethers.getContractFactory('Box')
const box = await Box.attach(address)

// 获取盒子里的值
const value1 = await box.retrieve()
console.log('Box value is', value1.toString())

// 存入一个新的值
await box.store(23)

// 获取存入的值
const value2 = await box.retrieve()
console.log('Box value is', value2.toString())
```

### 10. 编写单元测试

## 📌 EIP

### erc20

标准 erc20 接口

```solidity
interface ERC20 {
  function totalSupply() external view returns (uint256);
  function balanceOf(address who) external view returns (uint256);
  function transfer(address to, uint256 value) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint256);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);

  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);
}
```
