1. 数据库设计原则1.1 表结构设计

- 规范化与反规范化结合：国内开发中常倾向于反规范化设计以提升查询性能。避免过多 JOIN 操作，适当冗余字段（如在订单表中直接存储用户名称或商品名称），但需权衡数据一致性风险。
- 字段命名规范：
  - 使用小写字母和下划线（如 user_id），避免驼峰式命名。
  - 字段名应简洁且有语义，如 created_at 表示创建时间，status 表示状态。
  - 避免使用 MySQL 关键字（如 order, desc）。
- 主键选择：
  - 优先使用自增 BIGINT 作为主键，适合高并发场景。
  - 若需要分布式系统，考虑 UUID 或雪花算法生成的 ID，但注意 UUID 的性能开销。
- 字符集与编码：
  - 默认使用 utf8mb4 字符集，支持中文和 Emoji 表情。
  - 确保 collation 为 utf8mb4_unicode_ci，以支持多语言排序。
- 数据类型选择：
  - 选择最小化数据类型，如用 INT 而非 BIGINT，用 TINYINT 表示状态（如 0/1）。
  - 金额字段推荐使用 DECIMAL(19,2)，避免浮点数精度问题。
  - 时间字段使用 DATETIME 或 TIMESTAMP，注意时区问题。

1.2 不使用外键的实践

- 程序控制关联：
  - 在应用层通过代码逻辑（如 Java、Go 或 PHP）维护表之间的关系。
  - 插入或更新数据时，需在程序中检查数据一致性（如检查 user_id 是否存在）。
  - 使用事务确保数据一致性，例如在插入订单时同时更新库存。
- 索引优化：
  - 在关联字段（如 user_id, order_id）上创建索引以加速查询。
  - 定期检查索引使用率，删除冗余或低效索引。
- 一致性管理：
  - 通过定时任务或事件驱动机制（如消息队列）检查数据一致性。
  - 记录操作日志以便排查问题。

1.3 避免存储过程和视图

- 逻辑移到应用层：
  - 复杂的业务逻辑（如数据校验、计算）放在应用代码中，便于调试和版本控制。
  - 使用 ORM 框架（如 MyBatis、GORM）或手写 SQL 管理查询逻辑。
- 替代视图的方案：
  - 使用缓存（如 Redis）存储频繁查询的中间结果，减少复杂查询。
  - 编写清晰的 SQL 查询脚本，存放在代码库中，方便维护。
- 替代存储过程的方案：
  - 将存储过程逻辑拆分为多个服务接口，通过微服务或函数调用实现。
  - 使用定时任务框架（如 Quartz、XXL-Job）代替数据库定时任务。

------

2. 开发与查询优化2.1 SQL 编写规范

- 明确字段查询：避免使用 SELECT *，明确指定需要的字段，减少数据传输。

- 避免嵌套子查询：

  - 用 JOIN 替代子查询，提高性能。

  - 示例：

    ```sql
    -- 低效
    SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE status = 1);
    -- 高效
    SELECT u.* FROM users u JOIN orders o ON u.id = o.user_id WHERE o.status = 1;
    ```

- 分页优化：

  - 使用覆盖索引或延迟关联优化大数据量分页。

  - 示例：

    ```sql
    SELECT u.* FROM users u JOIN (SELECT id FROM users WHERE status = 1 LIMIT 10 OFFSET 100) t ON u.id = t.id;
    ```

- 批量操作：

  - 批量插入或更新数据，减少数据库交互。

  - 示例：

    ```sql
    INSERT INTO users (id, name) VALUES (1, '张三'), (2, '李四');
    ```

2.2 索引优化

- 选择合适的索引：

  - 主键索引：用于唯一标识记录。
  - 普通索引：用于 WHERE、JOIN、ORDER BY 等条件。
  - 联合索引：针对多字段查询，如 INDEX idx_user_status (user_id, status)。

- 避免冗余索引：

  - 检查重复索引：SHOW INDEX FROM table_name;
  - 删除未使用的索引，降低写操作开销。

- 慢查询分析：

  - 开启慢查询日志（slow_query_log=ON），设置阈值（如 long_query_time=1）。

  - 使用 EXPLAIN 分析查询计划，检查是否命中索引。

  - 示例：

    ```sql
    EXPLAIN SELECT * FROM orders WHERE user_id = 123 AND status = 1;
    ```

2.3 事务管理

- 短事务优先：

  - 尽量减少事务中的操作，避免长时间锁定。

  - 示例：

    ```sql
    START TRANSACTION;
    UPDATE inventory SET stock = stock - 1 WHERE product_id = 123;
    INSERT INTO orders (user_id, product_id) VALUES (456, 123);
    COMMIT;
    ```

- 避免死锁：

  - 固定表操作顺序（如先更新 inventory 再插入 orders）。
  - 使用 SELECT ... FOR UPDATE 控制锁范围。

------

3. 性能优化3.1 读写分离

- 主从复制：
  - 配置 MySQL 主从架构，主库处理写操作，从库处理读操作。
  - 使用中间件（如 MyCat、ProxySQL）或程序路由分发读写请求。
- 负载均衡：
  - 从库多副本部署，分散查询压力。
  - 监控主从延迟，设置合理的延迟阈值（如 < 1 秒）。

3.2 缓存策略

- 应用层缓存：
  - 使用 Redis 或 Memcached 缓存热点数据，如用户信息、商品信息。
  - 设置合理过期时间（如 5 分钟或 1 小时），避免缓存失效风暴。
- 查询缓存：
  - 对于不常变更的数据，可在程序中缓存 SQL 查询结果。
  - 示例：将 SELECT name FROM products WHERE id = 123 的结果缓存到 Redis。

3.3 分库分表

- 水平分表：

  - 按业务维度（如 user_id 取模）或时间分表（如按月分表 orders_202501）。

  - 示例：

    ```sql
    CREATE TABLE orders_202501 LIKE orders_template;
    ```

- 分库：

  - 按业务模块（如用户库、订单库）或地域分库。
  - 使用分布式数据库中间件（如 ShardingSphere）管理分片。

------

4. 运维与安全4.1 备份与恢复

- 定期备份：

  - 使用 mysqldump 或 xtrabackup 进行全量备份。

  - 配置增量备份，记录 binlog 日志。

  - 示例：

    ```bash
    mysqldump -u root -p --databases mydb > backup.sql
    ```

- 测试恢复：

  - 定期验证备份文件，确保可恢复。
  - 模拟故障场景，测试恢复时间（RTO）和数据完整性（RPO）。

4.2 安全管理

- 权限控制：

  - 按需分配权限，开发人员只给 SELECT/INSERT/UPDATE 权限，禁止 DELETE/DROP。

  - 示例：

    ```sql
    GRANT SELECT, INSERT ON mydb.* TO 'dev'@'localhost' IDENTIFIED BY 'password';
    ```

- SQL 注入防范：

  - 使用参数化查询或 ORM 框架，避免拼接 SQL。

  - 示例（MyBatis）：

    ```xml
    SELECT * FROM users WHERE id = #{userId}
    ```

- 敏感数据加密：

  - 敏感字段（如手机号、身份证号）加密存储，使用 AES 算法。

  - 示例：

    ```sql
    INSERT INTO users (phone) VALUES (AES_ENCRYPT('13812345678', 'secret_key'));
    ```

4.3 监控与报警

- 性能监控：
  - 使用工具（如 Zabbix、Prometheus）监控 CPU、IO、连接数等指标。
  - 设置慢查询和连接数过高的报警。
- 日志管理：
  - 开启通用查询日志（general_log）仅用于调试，生产环境关闭。
  - 定期清理 binlog，防止磁盘占满。

------

5. 国内开发习惯的注意事项

- 高并发场景：

  - 国内业务（如电商、社交）常面临高并发，优先优化锁机制和索引。
  - 使用分布式锁（如 Redis 分布式锁）替代数据库锁。

- 快速迭代：

  - 国内开发强调快速上线，表结构变更需谨慎，建议使用工具（如 Flyway、Liquibase）管理 schema 变更。

  - 示例（Flyway 脚本）：

    ```sql
    ALTER TABLE users ADD COLUMN email VARCHAR(100);
    ```

- 文档与协作：

  - 维护详细的表结构文档，记录字段含义和业务逻辑。
  - 使用工具（如 DataGrip、Navicat）生成 ER 图，便于团队协作。

------

6. 常见问题与解决方案

- 问题：数据量大导致查询慢
  解决方案：分表分库、加索引、使用 Elasticsearch 替换复杂查询。
- 问题：程序关联导致一致性问题
  解决方案：引入分布式事务（如 TCC 或 Saga 模式）或异步补偿机制。
- 问题：频繁变更表结构
  解决方案：预留扩展字段（如 JSON 类型的 extra_info），减少频繁 ALTER TABLE。

------

7. 总结针对中国大陆的开发习惯，MySQL 最佳实践应注重以下几点：

1. 简化数据库逻辑：将外键、存储过程、视图的逻辑移到应用层，降低数据库复杂度。
2. 性能优先：通过索引优化、读写分离、缓存等手段应对高并发场景。
3. 灵活性与一致性平衡：程序控制关联需配合事务和日志机制，确保数据一致性。
4. 安全与运维：严格的权限管理和备份策略是生产环境的关键。