# nps

Github：[nps](https://github.com/ehang-io/nps)

中文文档：[https://ehang-io.github.io/nps/](https://ehang-io.github.io/nps/)

## Docker 部署

### 服务端

新建配置文件夹

```shell
mkdir -p /root/config/nps
cd /root/config/nps
```

下载配置文件，上传解压

```ini
appname = nps
#Boot mode(dev|pro)
runmode = pro

#HTTP(S) proxy port, no startup if empty
http_proxy_ip=0.0.0.0
http_proxy_port=8181
#https_proxy_port=443
https_just_proxy=false
#default https certificate setting
#https_default_cert_file=conf/server.pem
#https_default_key_file=conf/server.key

##bridge
bridge_type=tcp
bridge_port=8024
bridge_ip=0.0.0.0

# Public password, which clients can use to connect to the server
# After the connection, the server will be able to open relevant ports and parse related domain names according to its own configuration file.
public_vkey=xxxxxxxx
log_level=7

#web
web_host=a.o.com
web_username=web_username
web_password=web_password
web_port = 8180
web_ip=0.0.0.0

#Web API unauthenticated IP address(the len of auth_crypt_key must be 16)
#Remove comments if needed
#auth_key=test
auth_crypt_key =auth_crypt_key

#allow_ports=9001-9009,10001,11000-12000

#Web management multi-user login
allow_user_login=false
allow_user_register=false
allow_user_change_username=false


#extension
allow_flow_limit=false
allow_rate_limit=false
allow_tunnel_num_limit=false
allow_local_proxy=false
allow_connection_num_limit=false
allow_multi_ip=false
system_info_display=false

#cache
http_cache=false
http_cache_length=100

#get origin ip
http_add_origin_header=false

```

启动容器

```shell
docker run --restart=always -d --name nps --net=host -v /root/config/nps/conf:/conf ffdfgdfg/nps
```

### 客户端

新建配置文件

```shell
mkdir -p /root/config/nps
cd /root/config/nps
```

下载配置文件，上传解压 `conf/npc.conf`

```ini
[common]
server_addr=x.x.x.x:8024
conn_type=tcp
vkey=xxxxxxxx
auto_reconnection=true

[a.example.com]
host=a.example.com
target_addr=127.0.0.1:2233

#tcp
[tcp]
mode=tcp
target_addr=127.0.0.1:22
server_port=2244
```

启动容器

```shell
docker run --restart=always -d --name npc --net=host -v /root/config/nps/conf:/conf ffdfgdfg/npc -config=/conf/npc.conf
```
