# PHP 开发环境配置与实践

## 📌 Windows 环境搭建

### XAMPP 安装与配置

#### 1. 下载安装

```shell
# PHP 版本选择
# - PHP 7.4: 适用于 ThinkPHP 5、FastAdmin、老项目
# - PHP 8.0+: 适用于 Laravel 9+、Symfony 6+、新项目

# 下载地址
# 官方: https://www.apachefriends.org/download.html
# 历史版本: https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/

# 推荐安装路径（避免空格和中文）
D:\app\xampp74\  # PHP 7.4 版本
D:\app\xampp82\  # PHP 8.2 版本
```

#### 2. 多版本 XAMPP 共存

```shell
# 安装到不同目录
D:\app\xampp74\  # PHP 7.4 版本
D:\app\xampp82\  # PHP 8.2 版本

# 注意事项
# 1. 不能同时运行（端口冲突）
# 2. 使用前先停止另一个版本的服务
# 3. 不要将两个版本都安装为 Windows 服务
```

#### 3. 启动服务

```shell
# 打开控制面板
D:\app\xampp\xampp-control.exe

# 启动顺序
1. Apache (Web 服务器)
2. MySQL (数据库)
```

### 配置虚拟主机 (Virtual Host)

#### 1. 启用虚拟主机模块

```apache
# 检查 D:\app\xampp\apache\conf\httpd.conf
# 确保以下行没有被注释（没有 # 开头）
Include conf/extra/httpd-vhosts.conf
```

#### 2. 配置虚拟主机

编辑 `D:\app\xampp\apache\conf\extra\httpd-vhosts.conf`：

```apache
# 添加项目虚拟主机
<VirtualHost *:80>
    DocumentRoot "D:/code/project/public"
    ServerName project.local
    <Directory "D:/code/project/public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# 使用端口访问（不修改 hosts）
<VirtualHost *:8081>
    DocumentRoot "D:/code/project/public"
    ServerName localhost
    <Directory "D:/code/project/public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### 3. 添加监听端口（如果使用非 80 端口）

编辑 `D:\app\xampp\apache\conf\httpd.conf`：

```apache
Listen 80
Listen 8081  # 添加新端口
```

#### 4. 配置 hosts 文件（可选）

编辑 `C:\Windows\System32\drivers\etc\hosts`：

```shell
127.0.0.1 project.local
```

#### 5. 重启 Apache

```shell
# 在 XAMPP Control Panel 中
1. 点击 Apache 的 Stop 按钮
2. 点击 Apache 的 Start 按钮
```

## 📌 Composer 包管理器

### 安装 Composer

#### Windows 安装

```shell
# 方法1: 使用安装程序（推荐）
1. 下载: https://getcomposer.org/Composer-Setup.exe
2. 运行安装程序
3. 选择 PHP 路径: D:\app\xampp\php\php.exe
4. 完成安装

# 方法2: 手动安装
# 下载 composer.phar
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"

# 创建 composer.bat（全局使用）
echo @php "%~dp0composer.phar" %*>composer.bat
```

### 切换 Composer 使用的 PHP 版本

#### 方法1: 重新运行安装程序

```shell
1. 运行 Composer-Setup.exe
2. 选择新的 PHP 路径
3. 完成安装
```

#### 方法2: 创建版本专用批处理

```batch
# 创建 composer74.bat
@echo off
D:\app\xampp74\php\php.exe C:\ProgramData\ComposerSetup\bin\composer.phar %*

# 创建 composer82.bat  
@echo off
D:\app\xampp82\php\php.exe C:\ProgramData\ComposerSetup\bin\composer.phar %*
```

#### 方法3: 临时切换

```shell
# 临时使用特定 PHP 版本运行 Composer
D:\app\xampp74\php\php.exe composer.phar install
```

### Composer 常用命令

```shell
# 查看版本
composer -V

# 初始化项目
composer init

# 安装依赖
composer install          # 根据 composer.lock 安装精确版本
composer install --no-dev # 不安装开发依赖（生产环境）

# 更新依赖
composer update          # 更新所有包到最新版本
composer update vendor/package  # 更新特定包

# 添加/移除包
composer require vendor/package       # 添加包
composer require vendor/package:^2.0  # 指定版本
composer require --dev phpunit/phpunit # 添加开发依赖
composer remove vendor/package         # 移除包

# 自动加载
composer dump-autoload  # 重新生成自动加载文件
composer dump-autoload -o  # 优化自动加载（生产环境）

# 查看已安装包
composer show           # 显示所有包
composer show vendor/package  # 显示特定包详情

# 诊断问题
composer diagnose      # 诊断常见问题
composer validate      # 验证 composer.json

# 清理缓存
composer clear-cache   # 清理 Composer 缓存

# 中国镜像加速
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

## 📌 PHP 项目配置

### 环境配置文件

```shell
# .env 文件示例（不要提交到版本控制）
[app]
debug = true
trace = false

[database]
type = mysql
hostname = 127.0.0.1
database = dbname
username = root
password = root
hostport = 3306
prefix = tb_

# 复制配置文件
cp .env.sample .env
```

### 常见框架目录结构

#### ThinkPHP 5 / FastAdmin

```
project/
├── application/        # 应用目录
├── public/            # 入口文件（DocumentRoot 指向这里）
│   └── index.php     # 入口文件
├── runtime/           # 运行时目录（需要写权限）
├── thinkphp/          # 框架目录
├── vendor/            # Composer 依赖
├── .env              # 环境配置
└── composer.json     # 依赖配置
```

#### Laravel

```
project/
├── app/               # 应用代码
├── public/           # 入口文件（DocumentRoot 指向这里）
│   └── index.php    # 入口文件
├── storage/          # 存储目录（需要写权限）
├── vendor/           # Composer 依赖
├── .env             # 环境配置
└── composer.json    # 依赖配置
```

## 📌 数据库操作

### MySQL 基础命令

```shell
# 连接数据库
mysql -u root -p

# 创建数据库
CREATE DATABASE dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建用户
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

# 授权
GRANT ALL PRIVILEGES ON dbname.* TO 'username'@'localhost';
FLUSH PRIVILEGES;

# 导入 SQL 文件
mysql -u root -p dbname < backup.sql

# 导出数据库
mysqldump -u root -p dbname > backup.sql
```

### phpMyAdmin 使用

```shell
# 访问地址
http://localhost/phpmyadmin

# 默认账号
用户名: root
密码: (空)
```

## 📌 故障排除

### PHP 版本兼容性问题

```php
// PHP 8 废弃警告示例
// preg_replace_callback(): Passing null to parameter #3

# 解决方案：
1. 使用兼容的 PHP 版本（降级）
2. 更新框架/依赖到支持的版本
3. 临时抑制错误（不推荐生产环境）
error_reporting(E_ALL & ~E_DEPRECATED);
```

### 常见错误解决

```shell
# 500 错误
1. 检查 .htaccess 文件
2. 检查 PHP 错误日志: xampp/apache/logs/error.log
3. 开启调试模式查看详细错误

# 403 Forbidden
1. 检查目录权限
2. 检查 .htaccess
3. 确认 DocumentRoot 配置正确

# 数据库连接失败
1. 确认 MySQL 服务已启动
2. 检查数据库配置（.env 或 database.php）
3. 确认用户名密码正确
```

## 📌 开发工具推荐

### IDE / 编辑器

```shell
# IDE
- PhpStorm (推荐，功能最全)
- Visual Studio Code + PHP 插件

# VS Code 推荐插件
- PHP Intelephense
- PHP Debug
- PHP DocBlocker
- Laravel Blade Snippets
- DotENV
```

### 调试工具

```shell
# Xdebug 安装配置
1. 下载对应版本: https://xdebug.org/wizard
2. 放入 xampp/php/ext/
3. 配置 php.ini:

[XDebug]
zend_extension = "D:\app\xampp\php\ext\php_xdebug.dll"
xdebug.mode = debug
xdebug.start_with_request = yes
xdebug.client_port = 9003
xdebug.client_host = localhost
```

## 📌 最佳实践

### 项目初始化流程

```shell
# 1. 克隆项目
git clone <repository>

# 2. 安装依赖
composer install

# 3. 配置环境
cp .env.example .env
# 编辑 .env 文件配置数据库等

# 4. 生成密钥（Laravel）
php artisan key:generate

# 5. 运行迁移（如果有）
php artisan migrate

# 6. 配置虚拟主机
# 编辑 httpd-vhosts.conf

# 7. 重启 Apache
# XAMPP Control Panel

# 8. 访问项目
http://localhost:8080
```

### 安全建议

```shell
# 生产环境配置
1. 关闭调试模式: debug = false
2. 修改默认密码
3. 限制数据库访问权限
4. 配置 HTTPS
5. 定期更新依赖: composer update
6. 不要提交 .env 文件到版本控制
7. 设置正确的文件权限
```

## 📌 常用 PHP 函数速查

```php
// 字符串操作
strlen($str)           // 长度
substr($str, 0, 10)   // 截取
str_replace('a','b',$str) // 替换
explode(',', $str)    // 分割
implode(',', $arr)    // 连接
trim($str)            // 去空格

// 数组操作
count($arr)           // 计数
array_push($arr, $val) // 追加
array_pop($arr)       // 弹出
array_merge($a, $b)   // 合并
in_array($val, $arr)  // 是否存在
array_keys($arr)      // 获取键
array_values($arr)    // 获取值

// 文件操作
file_get_contents($file)  // 读文件
file_put_contents($file, $data) // 写文件
file_exists($file)    // 文件是否存在
is_dir($path)         // 是否目录
mkdir($path, 0777, true) // 创建目录

// JSON 操作
json_encode($data)    // 编码
json_decode($json, true) // 解码为数组

// 时间日期
time()                // 时间戳
date('Y-m-d H:i:s')  // 格式化
strtotime('2024-01-01') // 字符串转时间戳
```