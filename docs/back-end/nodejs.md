# NodeJs

> 更新时间：2020-05-08 14:47:44

## 1：模块化编程

node 的 require 用来引入模块，没有全局作用域，只有模块作用域

require

- 用来加载执行模块里面的代码
- 拿到被加载文件的模块导出的对象
- 每个模块都提供了一个对象：exports
- 外部需要访问的变量都需要挂载到 exports 对象中

- 核心模块
- 用户自己编写的模块

```javascript
//通过require引入其他的js文件，可以省略文件后缀名
//相对路径中的./不能省略
require('./2')
```

## 2：响应类型

- 服务器默认发送的是 utf8，但是浏览器不知道是 utf8 会按照操作系统默认的编码去解析，这样就会乱码

- 中文操作系统默认是 bgk 编码
- 在 http 协议中 Content-Type 告诉浏览器发送的数据时什么类型的
- 一般是指字符编码，图片视频等资源一般不用设置编码

```javascript
//设置响应头为utf8解决乱码
res.setHeader('Content-Type', 'text/plain; charset=utf-8')
```

## 3：更换淘宝镜像

```shell
npm config set registry http://registry.npm.taobao.org/

#2.换成原来的

npm config set registry https://registry.npmjs.org/
```

## 4：模块的 exports

- exports 默认为 module.exports 的引用

## 5：Express

封装了 http 常用的接口

- 网址：http://expressjs.com/

### 5.1：开放静态资源

```javascript
//当没有第一个参数的时候，访问的时候可以通过去掉这个路径直接使用资源名来访问
app.use('/public/', express.static('./public/'))
```

### 5.2：在 express 中获取 post 请求数据

在 express 没有内置 post 请求 api，这里使用一个中间件**body-parser**

安装：

```shell
$ npm install body-parser
```

实例：

```javascript
var express = require('express')
//引包
var bodyParser = require('body-parser')

var app = express()

//配置bodyParser，配置完了在res请求对象上对多出来一个属性：body
//可以直接通过req.body来获取请求体数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

## 6：使用 nodemon 修改代码自动重启服务器

- 全局安装 nodemon

```shell
npm install -g nodemon
```

- 使用 nodemon 文件名启动服务器

## 7：使用模板引擎

- 安装

```shell
npm install --save art-template
npm install --save express-art-template
```

- 配置

```javascript
//配置模板引擎，第一个参数表示，渲染什么后缀名使用模板引擎，一般为art或者html
//不需要引入art-template因为express-art-template依赖art-template
app.engine('art', require('express-art-template'))
```

- 使用

```javascript
//express为相应的对象提供了一个方法 render
//render默认不可用，如果配置了模板引擎就可以使用了

//第一个参数不能写路径，默认会去项目的views文件夹中寻找模板文件
res.render('index.html', {})
```

## 8：开放静态目录

```javascript
//开放静态目录
app.use('/public/', express.static('./public/'))
```

## 9：路由模块的提取

```javascript
//router.js
const express = require('express')
//创建一个路由容器
const router = express.Router()
//把路由都挂载到router容器上
router
  .get('/', function (req, res) {
    res.send('hello world' + 'nodemon')
  })
  .get('/login', function (req, res) {
    res.send('login page')
  })
//把router导出
module.exports = router

//app.js使用
const express = require('express')
const router = require('./router')
//创建app

const app = express()

//当没有第一个参数的时候，访问的时候可以通过去掉这个路径直接使用资源名来访问
app.use('/public/', express.static('./public/'))

//把路由容器挂载到app
app.use(router)

app.listen(3000, function () {
  console.log('express app is running...')
})
```

## 10：文件结构

- project/views：默认 html 视图文件
- project/public：开放的静态资源目录
- app.js：入口模块（

  - 启动服务，
  - 做一些服务相关的配置，
  - 例如模板引擎，body-parser 解析表单的 post 请求体
  - 挂载路由
  - 提供静态资源服务）

- router.js：路由模块

## 11：重点：回调函数

在异步操作中想要得到异步操作的结果对象必须通过回调函数，没有其他方法

## 12：mongodb

- 安装：http://www.runoob.com/mongodb/mongodb-tutorial.html

### 12.1：启动和关闭数据库

启动：

```shell
#mongodb默认使用执行命令行所处盘符下的/data/db作为自己的数据存储目录
# 第一次执行先新新建一个/data/db 目录
#命令行输入
mongodb
```

如果想要修改数据存储路径

```shell
mongod --dbpath=数据目录存储路径
```

关闭

直接 X 掉

### 12.2：链接和退出数据库

```shell
#直接新建命令行输入mongo就可以了,默认链接本机的mongo服务
mongo

#退出，输入exit回车
exit
```

### 12.3：基本命令

- `show dbs`

  - 查看当前数据库列表

- `db`

  - 参看当前操作的数据库

- `use 数据库名`
  - 切换到指定的数据库（没有回新建）

### 12.4：在 node 中操作 mongo 数据库

- 使用官方的 mongodb 包来操作 mondb 数据
- 使用第三方 mongoose 来操作 mongodb，mongoose 所有 api 都支持 promise
- 指定的数据库不需要存在，插入第一条数据的时候自己会创建

`mongoose`基于官方的进行了封装

地址：https://mongoosejs.com/

### 12.4：增加数据

- 建立模型

```javascript
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//链接mongo数据库

//指定的数据库不需要存在，插入第一条数据的时候自己会创建
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true })

//设计集合结构（表结构）
//字段名称就是表结构中的属性名称
//值
// 约束的目的是为了保证的数据的完整性，不要有脏数据
var userShema = new Schema({
  username: {
    type: String,
    required: true, //必须有
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
})
```

- 增加数据

```javascript
//将文档架构发布为模型
//  mongoose.model 方法就是用来将一个架构发布为model
// 第一个参数：传入一个大写的名词单数字符串用来表示你的数据库名称
//            mongoose 会自动将大写的名词的字符串生成小写复数的集合名称
//              例如这里的User最终会变为users集合名称
let User = mongoose.model('User', userShema)

// 有了模型构造函数，就可以对集合中的数据中进行操作

const admin = new User({
  username: 'admin',
  password: '123123',
  email: 'admin@admin.com',
})

admin.save(function (err, ret) {
  if (err) {
    console.log('保存失败')
  } else {
    console.log('保存成功')
    console.log(ret)
  }
})
```

### 12.5：查询数据

```javascript
//通过模型查询数据，查出所有
User.find(function (err, data) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(data)
  }
})

//按条件查询数据
User.find(
  {
    username: 'admin',
  },
  function (err, data) {
    if (err) {
      console.log('查询失败')
    } else {
      console.log(data)
    }
  }
)
```

### 12.6：删除数据

```javascript
// 删除数据
User.deleteMany(
  {
    name: 'admin',
  },
  function (err, data) {
    if (err) {
      console.log('err')
    } else {
      console.log(data)
    }
  }
)
```

### 12.7： 更新数据

```javascript
// 更新数据
User.findByIdAndUpdate(
  '5c52f00c1c2c490414c2e025',
  {
    username: 'admin1',
  },
  function (err, data) {
    if (err) {
      console.log('err')
    } else {
      console.log(data)
    }
  }
)
```

## 13：使用 node.js 操作 mysql 数据库

```javascript
var mysql = require('mysql')
//创建数据库链接
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678900',
  database: 'nodejstest',
})

//链接数据库
connection.connect()

// 执行查询
connection.query('SELECT * FROM USERS', function (error, results, fields) {
  if (error) throw error
  console.log(results)
})

//关闭链接
connection.end()
```

### 13.1 node.js mysql 的封装(事务异步 BUG)

```javascript
// 数据库查询模块

const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'root',
  password: '12345678900',
  acquireTimeout: 15000, // 连接超时时间
  connectionLimit: 100, // 最大连接数
  waitForConnections: true, // 超过最大连接时排队
  queueLimit: 0, // 排队最大数量(0 代表不做限制)
})

// 基本查询
exports.query = function (sql, param) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, param, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
        pool.releaseConnection(connection)
      })
    })
  })
}

// 开启事物查询
exports.transaction = function (sqlArr) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }
      connection.beginTransaction((err) => {
        if (err) {
          reject(err)
        }
        for (let i = 0; i < sqlArr.length; i++) {
          connection.query(sqlArr[i].sql, sqlArr[i].param, (err, result) => {
            if (err) {
              connection.rollback(() => {
                reject(err)
              })
            }
          })
        }
        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              reject(err)
            })
          }
        })
        // 事务执行成功，释放连接
        resolve('Transaction compolete')
        pool.releaseConnection(connection)
      })
    })
  })
}
```

### 13.2 node.js mysql 的封装(普通操作)

```javascript
// 数据库查询模块
const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'root',
  password: '12345678900',
  acquireTimeout: 15000, // 连接超时时间
  connectionLimit: 20, // 最大连接数
  waitForConnections: true, // 超过最大连接时排队
  queueLimit: 0, // 排队最大数量(0 代表不做限制)
})

// 基本查询
exports.query = function (sqlObj) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(sqlObj.sql, sqlObj.params, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
        connection.release()
      })
    })
  })
}

// 事务封装存在异步bug
```

### 13.3 node.js mysql 的封装(比较好)

```javascript
/*
 *  name：node.js操作mysql数据库模块
 *  author：SunSeekerX
 *  time：2019年3月19日23点04分
 * */
const mysql = require('mysql'),
  config = require('./config'),
  pool = mysql.createPool(config.mysqlConfig)

// 基本查询
exports.query = function (sqlObj) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // 从连接池获取连接
      if (err) {
        return reject(err)
      } // 获取连接失败，返回错误
      connection.query(sqlObj.sql, sqlObj.params, (error, result) => {
        connection.release() //释放连接
        error ? reject(error) : resolve(result) //查询结果
      })
    })
  })
}

// 开启事物查询
exports.transaction = function (sqlArr) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // 从连接池获取连接
      connection.beginTransaction(async (err) => {
        //开始事务
        if (err) {
          return reject(err)
        } // 获取连接失败，返回错误
        let result = [], // 结果集
          errInfo = null //错误对象
        for (let i = 0; i < sqlArr.length; i++) {
          // 循环查询
          try {
            result.push(
              await new Promise((resolve, reject) => {
                //将查询结果放进结果集
                connection.query(sqlArr[i].sql, sqlArr[i].params, (err, result) => {
                  //查询
                  err ? reject(err) : resolve(result)
                })
              })
            )
          } catch (e) {
            // sql语句执行出错，跳出循环，不继续执行
            errInfo = e
            break
          }
        }
        pool.releaseConnection(connection) // 释放链接
        if (errInfo) {
          connection.rollback(() => {
            //有数据条目执行失败, 回滚代码
            reject(errInfo)
          })
        } else {
          connection.commit((err) => {
            // 语句全部执行成功，commit提交
            err ? reject(err) : resolve(result)
          })
        }
      })
    })
  })
}
```

## 14：promise （异步编程才会有）

- 原因：如果异步操作很多需要嵌套，这样就形成了代码嵌套非常深的情况

- 解决：为了解决异步编码嵌套很深的问题，EcmaScript 6 新增了一个 api：`promise`

- 说明：Promise 本身不是异步的，但是里面往往封装了一个异步任务
- 封装的 Promise 版本的读文件方法

```javascript
var fs = require('fs')

function pReadFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        //promise容器中的任务失败了
        //console.log(err)
        //把容器的pending 状态变为rejected 状态
        // 调用rejected 方法就是相当于调用了them方法的第二个参数函数
        reject(err)
      } else {
        // promise容器中的任务成功了
        // console.log(data);
        // 把容器的pending 状态变为resolve 状态
        // 这里调用的resolve 方法实际上就是then方法 传递的那个function
        resolve(data)
      }
    })
  })
}

pReadFile('./data/a.txt')
  .then(function (data) {
    console.log(data)
    return pReadFile('./data/b.txt')
  })
  .then(function (data) {
    console.log(data)
    return pReadFile('./data/c.txt')
  })
  .then(function (data) {
    console.log(data)
  })
```

- node.js 封装关于 MySQL 操作的 js
- 地址：https://blog.csdn.net/qq_33358824/article/details/80699200

```javascript
const mysql = require('mysql')
const config = require('./config')
const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
})

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('数据库连接失败')
        return
      }
      connection.query(sql, (error, result) => {
        if (error) {
          console.log('执行sql语句失败')
          reject(error)
        } else {
          resolve(result)
        }
        connection.release()
      })
    })
  })
}
```

## 15：关于 es6

地址：http://es6.ruanyifeng.com/

## 16: 在 node.js 中使用 token 认证

- 时间为一串数字的格式化

```javascript
/*
需求

   js中接收到后台返回的json字符串中的日期类型的字段都变成了一串数字，形如：1500341149000。所以我们需要将这个串格式化形如：2017-07-18 09:25:49.

   直接上代码：

    1、先把字符串进行日期的封装 var date = new Date(1500341149000);

    2、封装转换函数

*/

Date.prototype.Format = function (fmt) {
  //author:wangweizhen
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

// 3、调用函数格式化：date.Format("yyyy-MM-dd hh:mm:ss");
```

- 设置过期时间为 1970 年问题

## 17 ： nodeJS 中 express 框架设置全局跨域请求头

- 地址：https://blog.csdn.net/twodogya/article/details/80163113

- Node.js 如何设置允许跨域： https://blog.csdn.net/u012149969/article/details/81145144

## 18： 在服务端使用 session 来保存登陆状态

- express 默认不支持 session 和 cookie，需要通过第三方中间件 express-session 来解决
- 1：下载

```shell
npm i express-session
```

- 2：配置， 一定要放在路由之前

```javascript
app.use(
  session({
    secret: 'keyboard cat', // 配置加密字符串，增加安全性
    resave: false,
    saveUninitialized: true, // 无论你是否使用session，默认分配一把钥匙
  })
)
```

- 3：使用

```java
// 添加session数据
req.session.object = 'hello'

// 获取session数据
req.session.object
```

## 19:：中间件

```javascript
// 应用程序级别中间件
// 不关心路径和请求的方法中间件，任何请求都会进入这个中间件
// 中间件本身是一个方法，接收三个参数{Request：请求对象， Response：相应对象， next：下一个中间件}
// 如果不调用next() 方法，则请求会停留在这个中间件
app.use(function (req, res) {
  console.log('请求进来了')
})

// 以/xxx开头的路径中间件
app.use('/a', function (req, res) {
  console.log('请求进来了')
})

// 路由级别中间件
// 严格匹配请求方法和请求路径的中间件
app.get('/a', function (req, res) {
  console.log('请求进来了')
})

// 错误中间件
// 当调用next(err)，传递了参数，将直接找到带有4个参数的应用级别的中间件
// 配置404中间件
app.use(function (req, res, next) {
  res.status(404).json({
    resultCode: 404,
  })
})
// 配置错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    resultCode: 500,
    message: err.message,
  })
})
```

### 19.1 图片上传中间件

```javascript
// 需要设置上传类型为multipart/form-data

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, './public/upload/')
  },
  filename: (req, file, cb) => {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785.jpg
    const fileformat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileformat[fileformat.length - 1])
  },
})
const upload = multer({ storage: storage })

router.post('/uploadFile', upload.single('file'), (req, res) => {
  const file = req.file
  // 接收文件成功后返回数据给前端
  res.json({ resultCode: 40000, file: file })
})
```

```html
<form method="post" action="http://localhost:3000/uploadFile" enctype="multipart/form-data">
  <input type="file" name="file" />
  <button type="submit">提交</button>
</form>
```

## 20 Api 接口文档编写模板

##### 获取制定项目的分类信息(/api/index)

###### 接口功能

> 获取指定项目的分类信息

###### URL

> /api/index

###### 支持格式

> JSON

###### HTTP 请求方式

> GET

###### 请求参数

| 参数 |  类型  | 必选 |                  说明                   |
| :--: | :----: | ---- | :-------------------------------------: |
| name | string | ture |              请求的项目名               |
| type |  int   | true | 请求项目的类型。1：类型一；2：类型二 。 |

###### 返回字段

> | 返回字段 | 字段类型 | 说明                             |
> | :------- | :------- | :------------------------------- |
> | status   | int      | 返回结果状态。0：正常；1：错误。 |
> | company  | string   | 所属公司名                       |
> | category | string   | 所属类型                         |

###### 接口示例

> 地址：/api/index?name="可口可乐"&type=1

```javascript
{
    "statue": 0,
    "company": "可口可乐",
    "category": "饮料"
}
```
