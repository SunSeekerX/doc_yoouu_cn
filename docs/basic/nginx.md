# Nginx

## 宝塔 nginx 守护

在宝塔中添加定时任务

1. 登录宝塔面板，进入 计划任务 模块。

2. 点击 添加任务，配置如下：

   - 任务类型：选择 Shell脚本。

   - 任务名称：自定义，例如 Nginx守护进程。nginx_guard

   - 执行周期：建议设置为每 5 分钟（_/5 _ \* \* \*），根据需求调整。

   - 脚本内容：输入脚本路径，例如：

     ```shell
     #!/bin/bash
  
     # 检查 Nginx 是否在运行
     if ! ps aux | grep [n]ginx > /dev/null; then
         echo "Nginx 已停止，正在尝试重启..."
         # 重启 Nginx 服务
         systemctl restart nginx
         # 等待几秒检查是否重启成功
         sleep 5
         if ps aux | grep [n]ginx > /dev/null; then
             echo "Nginx 重启成功！"
         else
             echo "Nginx 重启失败，请检查日志！"
             # 可选：发送通知（需要额外配置邮件或第三方工具）
         fi
     else
         echo "Nginx 正在运行，无需操作。"
     fi
     ```

3. 保存并执行，检查是否正常运行。

## 反向代理出现 `MIME type` 不正确

```
Refused to apply style from 'https://docker.yoouu.cn/main.36f5bcea156ed2e3cca6.css' because its MIME type ('text/plain') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
```

可以尝试修改方向代理 `http://127.0.0.1:9000` 为 `http://localhost:9000` 进行尝试，原因未知。

---

## 宝塔开启了反向代理使用自动续签 ssl

新建网站先不要加反向代理配置，首先需要开启反向代理的域名作为新建网站找个 web 目录先开启，开启后先不要添加反向代理的配置，如果添加了需要先删除，关闭无效需要彻底先删除。

---

然后再修改 Nginx 配置文件，在.well-know 路径规则那里，添加一行 root 文档配置，配置的文件路径为该配置文件开头有定义的 root 文档目录即所在站点根目录，然后保存能保存成功说明配置文件验证通过无误。

```nginx
# 宝塔自动续签 ssl 配置
location ~ \.well-known{
  root /www/wwwroot/<x.com>;
  allow all;
}
```

---

此方法适用于文件验证，其它方式请自测！
