# Nginx

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
