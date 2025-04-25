# Next.js

https://qufei1993.github.io/nextjs-learn-cn 欢迎来到 Learn Next.js 中文教程

## 宝塔反向代理缓存问题

### 缓存问题

参考 如何彻底关闭宝塔面板反向代理的缓存？ https://www.bt.cn/bbs/thread-143741-1-1.html

在宝塔反向代理网站项目的 config file -> Customized Configuration Files server 块配置

```nginx
# 强制禁用代理缓存
proxy_cache off;
proxy_buffering off;

# 防止任何形式的缓存（包括浏览器和CDN）
add_header Cache-Control "no-cache, no-store, must-revalidate, max-age=0";
add_header Pragma "no-cache";
add_header Expires "-1";
```

部署之后记得清除 cf 缓存和 nginx 反向代理缓存才能访问！！！
