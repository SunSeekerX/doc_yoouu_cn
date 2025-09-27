# 数据库操作

## 导出和导入

```shell
# 导出
docker exec mysql57 sh -c "mysqldump -uroot mydb | gzip" > mydb.sql.gz
```

## 📌 Common

### SQL naming convention

- **小写**。标识符应该全部用小写字母来书写，使用`first_name`，不是`"First_Name"或者"FirstName"`。
- **数据类型不是名称**。避免使用仅为数据类型的名字（如`text`或`timestamp`）。
- **强调单独的单词**。由多个单词组成的对象名称应该用下划线分隔，例如使用`word_count`或`team_member_id`，而不是`wordcount`或`wordCount`。
- **完整的单词，而不是缩写**。例如使用`middle_name`，不是`mid_nm`。
- **使用常用缩写**。对于几个长词而言，缩写词比词本身更为常见，比如`i18n`和`l10n`，这时使用缩写。

### binlog_format=mixed 二进制日志格式修改(mysql 8.0)

原来的

```ini
log-bin=mysql-bin
binlog_format=mixed
server-id = 1
binlog_expire_logs_seconds = 600000
slow_query_log=1
slow-query-log-file=/www/server/data/mysql-slow.log
long_query_time=3
#log_queries_not_using_indexes=on
early-plugin-load = ""
```

修改后

```ini
# 启用二进制日志
log-bin=mysql-bin
# 设置为ROW格式更安全
binlog_format=ROW
# 为binlog添加server-id（必需的）
server-id = 1
# 设置binlog过期时间（秒），这里设置30天
binlog_expire_logs_seconds = 2592000
# 慢查询日志配置
slow_query_log=1
slow-query-log-file=/www/server/data/mysql-slow.log
long_query_time=3
# 每个binlog文件最大大小
max_binlog_size = 1G
# 确保每个事务都写入磁盘
sync_binlog = 1
# 开启GTID（注意：需要按顺序启用以下配置）
gtid_mode = ON
enforce_gtid_consistency = ON
early-plugin-load = ""
```

1. 二进制日志配置

```ini
[mysqld]
# 启用二进制日志
log-bin=mysql-bin
# 设置为ROW格式更安全
binlog_format=ROW
# 为binlog添加server-id（必需的）
server-id = 1
# 设置binlog过期时间（秒），这里设置30天
binlog_expire_logs_seconds = 2592000
# 慢查询日志配置
slow_query_log=1
slow-query-log-file=/www/server/data/mysql-slow.log
long_query_time=3
# 每个binlog文件最大大小
max_binlog_size = 1G
# 确保每个事务都写入磁盘
sync_binlog = 1
# 开启GTID（注意：需要按顺序启用以下配置）
gtid_mode = ON
enforce_gtid_consistency = ON
# MySQL 8.0新增的二进制日志配置
binlog_expire_logs_auto_purge = ON
binlog_transaction_compression = ON
binlog_transaction_compression_level_zstd = 3
# 默认认证插件
default_authentication_plugin = mysql_native_password
```

2. 备份策略设置

```bash
#!/bin/bash
backup_dir="/backup/mysql"
date_format=$(date +%Y%m%d_%H%M%S)

# MySQL 8.0版本的备份命令
mysqldump --single-transaction \
          --master-data=2 \
          --all-databases \
          --set-gtid-purged=ON \
          --column-statistics=0 \
          > ${backup_dir}/full_backup_${date_format}.sql

# 记录当前binlog位置（8.0新语法）
mysql -e "SHOW REPLICA STATUS\G" > ${backup_dir}/binlog_pos_${date_format}.txt

# 压缩备份
gzip ${backup_dir}/full_backup_${date_format}.sql
```

3. 数据恢复流程

   1. 查看binlog事件：

   ```sql
   -- 查看binlog文件列表
   SHOW BINARY LOGS;

   -- 查看具体内容
   SHOW BINLOG EVENTS IN 'mysql-bin.000001';

   -- 使用mysqlbinlog工具查看
   mysqlbinlog --base64-output=decode-rows \
               --verbose \
               --skip-gtids \
               --set-charset=utf8mb4 \
               mysql-bin.000001
   ```

   2. 数据恢复脚本示例：

   ```bash
   #!/bin/bash

   # 恢复参数
   start_time="2024-01-01 00:00:00"
   end_time="2024-01-02 00:00:00"
   backup_file="/backup/mysql/full_backup_20240101.sql"
   binlog_dir="/var/lib/mysql"

   # 1. 恢复完整备份
   mysql < $backup_file

   # 2. 应用binlog增量
   mysqlbinlog --start-datetime="$start_time" \
               --stop-datetime="$end_time" \
               --skip-gtids \
               --set-charset=utf8mb4 \
               ${binlog_dir}/mysql-bin.* | mysql
   ```

4. 按事务或时间点恢复

```bash
# 按位置恢复
mysqlbinlog --start-position=123 \
            --stop-position=456 \
            --skip-gtids \
            mysql-bin.000001 | mysql

# 按时间恢复
mysqlbinlog --start-datetime="2024-01-01 13:00:00" \
            --stop-datetime="2024-01-01 14:00:00" \
            --skip-gtids \
            mysql-bin.000001 | mysql
```

5. 监控和维护策略

```sql
-- 创建binlog监控表
CREATE TABLE binlog_monitor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    binlog_file VARCHAR(100),
    file_size BIGINT,
    check_time TIMESTAMP,
    purge_time TIMESTAMP
);

-- MySQL 8.0监控脚本
DELIMITER //
CREATE PROCEDURE check_binlog_size()
BEGIN
    INSERT INTO binlog_monitor (binlog_file, file_size, check_time)
    SELECT SUBSTRING_INDEX(FILE, '/', -1), FILE_SIZE, NOW()
    FROM performance_schema.binary_log_files;
END //
DELIMITER ;
```

6. 灾难恢复步骤

```bash
#!/bin/bash
# recovery.sh

# 1. 停止服务
systemctl stop mysql

# 2. 恢复完整备份
mysql < /backup/mysql/full_backup_latest.sql

# 3. 获取binlog位置（8.0新语法）
binlog_file=$(grep "CHANGE REPLICATION SOURCE TO" /backup/mysql/full_backup_latest.sql | awk -F"'" '{print $2}')
binlog_pos=$(grep "CHANGE REPLICATION SOURCE TO" /backup/mysql/full_backup_latest.sql | awk -F"=" '{print $3}' | tr -d ' ,')

# 4. 应用增量binlog
mysqlbinlog --start-position=$binlog_pos \
            --skip-gtids \
            --set-charset=utf8mb4 \
            /var/lib/mysql/$binlog_file | mysql

# 5. 验证数据
mysql -e "SELECT COUNT(*) FROM important_table"
```

7. 安全考虑

```bash
# 设置binlog访问权限
chmod 640 /var/lib/mysql/mysql-bin.*

# 备份binlog文件
cp /var/lib/mysql/mysql-bin.* /backup/binlogs/

# 定期清理旧binlog
PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 30 DAY);

# 创建备份用户（8.0语法）
CREATE USER 'backup'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT BACKUP_ADMIN, RELOAD, PROCESS, REPLICATION CLIENT ON *.* TO 'backup'@'localhost';
```

8. 最佳实践检查清单

```text
□ 定期完整备份
□ 验证binlog是否正确记录
□ 测试恢复流程
□ 监控binlog大小
□ 设置合适的过期时间
□ 确保备份文件安全存储
□ 记录所有恢复操作
□ 定期审查binlog配置
```

## 📌 Mysql

> 关于`MySQL`

### 开放远程连接

```bash
# 登录mysql
mysql -u root -p
mysql -u root -p

　　mysql>use mysql;

　　mysql>select 'host' from user where user='root';

　　mysql>update user set host = '%' where user ='root';

　　mysql>flush privileges;

　　mysql>select 'host'　 from user where user='root';

　　第一句是以权限用户root登录

　　第二句：选择mysql库

　　第三句：查看mysql库中的user表的host值（即可进行连接访问的主机/IP名称）

　　第四句：修改host值（以通配符%的内容增加主机/IP地址），当然也可以直接增加IP地址

　　第五句：刷新MySQL的系统权限相关表

　　第六句：再重新查看user表时，有修改。。
```

## 📌 MariaDB

### 开放远程链接

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'IDENTIFIED BY '123456' WITH GRANT OPTION;

-- 说明：root是登陆数据库的用户，123456是登陆数据库的密码，*就是意味着任何来源任何主机反正就是权限很大的样子。

-- 最后配置好权限之后不应该忘记刷新使之生效

flush privileges;
```

## 📌 SQL

> 请至“随书下载”下载本书试读样章和相关资料。特别感谢 Master_lisa 为本书录制的学习视频，本视频仅用于读者学习，不得商用。配套视频在线观看： https://www.bilibili.com/video/av62315714 配套视频下载地址： https://pan.baidu.com/s/1zC3OShIBYxzDWrrmGs6wuw 提取码：e3z2

### DBMS 代表性产品

> （Relational Database Management System，RDBMS）

- Oracle Database：甲骨文公司的 RDBMS
- SQL Server ：微软公司的 RDBMS
- DB2：IBM 公司的 RDBMS
- PostgreSQL：开源的 RDBMS
- MySQL ：开源的 RDBMS

### SQL 语句及其种类

> 实际使用的 SQL 语句当中有 90% 属于 DML，

#### DDL（Data Definition Language，数据定义语言）

> 用来创建或者删除存储数据用的数据库以及数据库中的表等对象。DDL 包含以下几种指令。

CREATE： 创建数据库和表等对象 DROP： 删除数据库和表等对象 ALTER： 修改数据库和表等对象的结构

#### DML（Data Manipulation Language，数据操纵语言）

> 用来查询或者变更表中的记录。DML 包含以下几种指令。

SELECT：查询表中的数据 INSERT：向表中插入新数据 UPDATE：更新表中的数据 DELETE：删除表中的数据

#### DCL（Data Control Language，数据控制语言）

> 用来确认或者取消对数据库中的数据进行的变更。除此之外，还可以对 RDBMS 的用户是否有权限操作数据库中的对象（数据库表等）进行设定。DCL 包含以下几种指令。

COMMIT： 确认对数据库中的数据进行的变更 ROLLBACK： 取消对数据库中的数据进行的变更 GRANT： 赋予用户操作权限 REVOKE： 取消用户的操作权限

### 法则

1. 关系数据库以行为单位读写数据。
2. 一个单元格中只能输入一个数据。
3. 学会标准 SQL 就可以在各种 RDBMS 中书写 SQL 语句了。
4. SQL 根据功能不同可以分为三类，其中使用最多的是 DML。
5. SQL 语句以分号（;）结尾。
6. 关键字不区分大小写。
7. 字符串和日期常数需要使用单引号（'）括起来。数字常数无需加注单引号（直接书写数字即可）。
8. 单词之间需要使用半角空格或者换行符进行分隔。
9. 数据库名称、表名和列名等可以使用以下三种字符。 ● 半角英文字母　　 ● 半角数字　　 ● 下划线（\_）
10. 名称必须以半角英文字母作为开头。
11. 名称不能重复。
12. 删除了的表是无法恢复的。在执行 DROP TABLE 语句之前请务必仔细确认。
13. 表定义变更之后无法恢复。在执行 ALTER TABLE 语句之前请务必仔细确认。

14. 星号（\*）代表全部列的意思。
15. 设定汉语别名时需要使用双引号（"）括起来。
16. 在 SELECT 语句中使用 DISTINCT 可以删除重复行。
17. WHERE 子句要紧跟在 FROM 子句之后。
18. 注释是 SQL 语句中用来标识说明或者注意事项的部分。分为 1 行注释和多行注释两种。
19. SELECT 子句中可以使用常数或者表达式。
20. 使用比较运算符时一定要注意不等号和等号的位置。
21. 字符串类型的数据原则上按照字典顺序进行排序，不能与数字的大小顺序混淆。
22. 希望选取 NULL 记录时，需要在条件表达式中使用 IS NULL 运算符。希望选取不是 NULL 的记录时，需要在条件表达式中使用 IS NOT NULL 运算符。
23. NOT 运算符用来否定某一条件，但是不能滥用。
