# JD

> 2021-08-10 14:33:30

## 📌 安装部署

Github：[https://github.com/whyour/qinglong](https://github.com/whyour/qinglong)

> **前置条件**
>
> `Linux`，`Docker`，等等，不然退坑吧，孩子，你把握不住 🤦‍♂️

1. 安装 docker，系统已经有了略过，docker 安装教程百度

2. 检查 docker 是否安装成功，输出信息就成功了

   ```shell
   docker info
   ```

3. 拉取青龙面板镜像

   ```shell
   docker pull whyour/qinglong:latest
   ```

4. 创建容器

   ```shell
   # $pwd 可以换成你想放置的目录
   docker run -dit \
   -v $pwd/ql/config:/ql/config \
   -v $pwd/ql/log:/ql/log \
   -v $pwd/ql/db:/ql/db \
   -p 5700:5700 \
   -e ENABLE_HANGUP=true \
   -e ENABLE_WEB_PANEL=true \
   --name qinglong \
   --hostname qinglong \
   --restart always \
   whyour/qinglong:latest

   # Ninja
   docker run -dit \
     -v $PWD/ql/config:/ql/config \
     -v $PWD/ql/log:/ql/log \
     -v $PWD/ql/db:/ql/db \
     -v $PWD/ql/repo:/ql/repo \
     -v $PWD/ql/raw:/ql/raw \
     -v $PWD/ql/scripts:/ql/scripts \
     -v $PWD/ql/jbot:/ql/jbot \
     -v $PWD/ql/ninja:/ql/ninja \
     -p 5700:5700 \
     -p 5701:5701 \
     -e ENABLE_HANGUP=true \
     -e ENABLE_WEB_PANEL=true \
     --name qinglong \
     --hostname qinglong \
     --restart unless-stopped \
     whyour/qinglong:latest
   ```

5. 开放端口

   这是别人教程拷贝的，不保证一定能用(跟你的系统有关)，青龙用的 `5700` 端口，本地的端口需要打开，如果是宝塔也要检查安全设置，阿里、腾讯云或者其他云服务检查安全组端口是否打开

   ```shell
   firewall-cmd --zone=public --add-port=5700/tcp --permanent
   ```

6. 然后通过 http://ip:5700 访问面板

   ![img](https://static.yoouu.cn/imgs/2021/pic-go/qinglong/20210603215034.png)

   默认账号：admin 密码：admin

   反回到 shell 输入：

   ```bash
   # 注意你的路径
   cat /ql/config/auth.json
   ```

   输出的结果就是实际的密码了

   ```json
   { "username": "admin", "password": "******" }
   ```

   至此，青龙面板就安装完成了！

## 📌 使用教程

### 添加脚本

看下面的脚本仓库，执行了代码访问面板就能看到脚本。

### JDC 启动命令

```shell
nohup ./JDC &
```

### v2.2

**limoe/qinglong**

```shell
docker pull limoe/qinglong:latest

# 启动
docker run -dit \
   -v $PWD/ql2/config:/ql/config \
   -v $PWD/ql2/log:/ql/log \
   -v $PWD/ql2/db:/ql/db \
   -p 5800:5700 \
   --name ql2 \
   --hostname ql2 \
   --restart always \
   limoe/qinglong:latest

# backup
docker run -dit \
   -v /root/app/ql2/config:/ql/config \
   -v /root/app/ql2/log:/ql/log \
   -v /root/app/ql2/db:/ql/db \
   -v /root/app/ql2/scripts:/ql/scripts \
   -p 5720:5700 \
   --name qinglong2 \
   --hostname qinglong2 \
   --restart always \
   limoe/qinglong:latest
```

**自带 jdc - drewnb/qinglong**

```shell
# 我的是 n1 盒子架构为 arm，如果你是 x86 的 需要替换 ${tag} 为你平台的架构
docker pull drewnb/qinglong:${tag}
```

```shell
docker run -dit \
-v /root/ql/config:/ql/config \
-v /root/ql/log:/ql/log \
-v /root/ql/scripts:/ql/scripts \
-p 5700:5700 \
-p 5701:5701 \
-e ENABLE_HANGUP=false \
-e ENABLE_WEB_PANEL=true \
-e ENABLE_WEB_JDC=true \
--name qinglong \
--hostname qinglong \
--restart always \
drewnb/qinglong:${tag}
```

**不带 jdc - drewnb/qinglong**

```shell
docker run -dit \
-v /root/app/ql2/config:/ql/config \
-v /root/app/ql2/log:/ql/log \
-v /root/app/ql2/scripts:/ql/scripts \
-p 5700:5700 \
-e ENABLE_HANGUP=false \
-e ENABLE_WEB_PANEL=true \
-e ENABLE_WEB_JDC=true \
--name qinglong \
--hostname qinglong \
--restart always \
drewnb/${tag}
```

### v2.8

教程：[https://github.com/Tsukasa007/my_script](https://github.com/Tsukasa007/my_script)

#### `task_before.sh`

```shell
#!/usr/bin/env bash

##helpStart
##helpEnd


combine_sub() {
    local what_combine=$1
    local combined_all=""
    local tmp1 tmp2
    local envs=$(eval echo "\$JD_COOKIE")
    local array=($(echo $envs | sed 's/&/ /g'))
    local user_sum=${#array[*]}
    for ((i = 1; i <= $user_sum; i++)); do
        local tmp1=$what_combine$i
        local tmp2=${!tmp1}
        combined_all="$combined_all&$tmp2"
    done
    echo $combined_all | perl -pe "{s|^&||; s|^@+||; s|&@|&|g; s|@+&|&|g; s|@+|@|g; s|@+$||}"
}

## 正常依次运行时，组合所有账号的Cookie与互助码
combine_all() {
    for ((i = 0; i < ${#env_name[*]}; i++)); do
        result=$(combine_sub ${var_name[i]})
        if [[ $result ]]; then
            export ${env_name[i]}="$result"
        fi
    done
}

combine_all
```

#### 导入互助码到 `task_before.sh`

1.根据上述拉取仓库后,青龙添加如下任务

task /ql/repo/Tsukasa007_my_script_master/code_tsukasa.sh

[![image](https://user-images.githubusercontent.com/28201662/128467629-6f9dd427-d4f3-4ef3-a364-a6a9511402c2.png)](https://user-images.githubusercontent.com/28201662/128467629-6f9dd427-d4f3-4ef3-a364-a6a9511402c2.png)

2.配置文件--config

[![img1](https://user-images.githubusercontent.com/28201662/128215529-bf9d1f70-48dd-45fa-8434-1830d6d4e68e.png)](https://user-images.githubusercontent.com/28201662/128215529-bf9d1f70-48dd-45fa-8434-1830d6d4e68e.png)

拉到文件的最下面，在最下面粘贴以下代码

```shell
env_name=(
  FRUITSHARECODES
  PETSHARECODES
  PLANT_BEAN_SHARECODES
  DREAM_FACTORY_SHARE_CODES
  DDFACTORY_SHARECODES
  JDZZ_SHARECODES
  JDJOY_SHARECODES
  JXNC_SHARECODES
  BOOKSHOP_SHARECODES
  JD_CASH_SHARECODES
  JDSGMH_SHARECODES
  JDCFD_SHARECODES
  JDHEALTH_SHARECODES
)
var_name=(
  ForOtherFruit
  ForOtherPet
  ForOtherBean
  ForOtherDreamFactory
  ForOtherJdFactory
  ForOtherJdzz
  ForOtherJoy
  ForOtherJxnc
  ForOtherBookShop
  ForOtherCash
  ForOtherSgmh
  ForOtherCfd
  ForOtherHealth
)

## name_js为脚本文件名，如果使用ql repo命令拉取，文件名含有作者名
## 所有有互助码的活动，把脚本名称列在 name_js 中，对应 config.sh 中互助码后缀列在 name_config 中，中文名称列在 name_chinese 中。
## name_js、name_config 和 name_chinese 中的三个名称必须一一对应。
name_js=(
  xxxxxxxx_jd_scripts_jd_fruit
  xxxxxxxx_jd_scripts_jd_pet
  xxxxxxxx_jd_scripts_jd_plantBean
  xxxxxxxx_jd_scripts_jd_dreamFactory
  xxxxxxxx_jd_scripts_jd_jdfactory
  xxxxxxxx_jd_scripts_jd_jdzz
  xxxxxxxx_jd_scripts_jd_crazy_joy
  xxxxxxxx_jd_scripts_jd_jxnc
  xxxxxxxx_jd_bookshop
  xxxxxxxx_jd_scripts_jd_cash
  xxxxxxxx_jd_scripts_jd_sgmh
  xxxxxxxx_jd_scripts_jd_cfd
  xxxxxxxx_jd_scripts_jd_health
)
name_config=(
  Fruit
  Pet
  Bean
  DreamFactory
  JdFactory
  Jdzz
  Joy
  Jxnc
  BookShop
  Cash
  Sgmh
  Cfd
  Health
)
name_chinese=(
  东东农场
  东东萌宠
  京东种豆得豆
  京喜工厂
  东东工厂
  京东赚赚
  crazyJoy任务
  京喜农场
  口袋书店
  签到领现金
  闪购盲盒
  京喜财富岛
  东东健康社区
)
```

3.粘贴后的 xxxxx 需要修改为你这些脚本 js 的仓库主的前缀

比如种豆得豆得豆是这样的 [![img3](https://user-images.githubusercontent.com/28201662/128215559-e029028c-ea3f-449a-9556-94b91c6de730.png)](https://user-images.githubusercontent.com/28201662/128215559-e029028c-ea3f-449a-9556-94b91c6de730.png)

task JDHelloWorld_jd_scripts_jd_plantBean.js

那上面 xxxxxxxx_jd_scripts_jd_plantBean

改成 JDHelloWorld_jd_scripts_jd_plantBean

4.配置文件--task_before.sh 修改为如下 直接覆盖！

```
#!/usr/bin/env bash

##helpStart
##helpEnd


combine_sub() {
    local what_combine=$1
    local combined_all=""
    local tmp1 tmp2
    local envs=$(eval echo "\$JD_COOKIE")
    local array=($(echo $envs | sed 's/&/ /g'))
    local user_sum=${#array[*]}
    for ((i = 1; i <= $user_sum; i++)); do
        local tmp1=$what_combine$i
        local tmp2=${!tmp1}
        combined_all="$combined_all&$tmp2"
    done
    echo $combined_all | perl -pe "{s|^&||; s|^@+||; s|&@|&|g; s|@+&|&|g; s|@+|@|g; s|@+$||}"
}

## 正常依次运行时，组合所有账号的Cookie与互助码
combine_all() {
    for ((i = 0; i < ${#env_name[*]}; i++)); do
        result=$(combine_sub ${var_name[i]})
        if [[ $result ]]; then
            export ${env_name[i]}="$result"
        fi
    done
}

combine_all
```

5.手动运行 1.的定时任务 不动脑互助配置完成

## 📌 脚本仓库

青龙新版本自动加了 `https://ghproxy.com/` 前缀用于拉取脚本，下面的脚本需要在 docker 内执行。

```shell
# 进入容器
docker exec -it ${你容器的id} /bin/bash
```

**【群里收集】**

```shell
ql repo https://github.com/cdle/jd_study.git "jd_"
ql repo https://github.com/smiek2221/scripts.git "jd_|gua_" "" "ZooFaker_Necklace.js|JDJRValidator_Pure.js|sign_graphics_validate.js"
```

**【JDHelloWorld】** [https://github.com/JDHelloWorld/jd_scripts](https://github.com/JDHelloWorld/jd_scripts)

```shell
ql repo https://github.com/JDHelloWorld/jd_scripts.git "jd_|jx_|getJDCookie" "activity|backUp|jd_delCoupon" "^jd[^_]|USER"
```

**【Tsukasa007】**[https://github.com/Tsukasa007/my_script](https://github.com/Tsukasa007/my_script)

```shell
ql repo https://github.com/Tsukasa007/my_script.git "" "jdCookie|USER_AGENTS|sendNotify|backup" "" "master"
```

**【passerby-b】（需要修改专用 ck 文件 jddj_cookie.js）** [https://github.com/passerby-b/JDDJ.git](https://github.com/passerby-b/JDDJ.git)

```shell
ql repo https://github.com/passerby-b/JDDJ.git "jddj_" "scf_test_event" "jddj_cookie"
```

**【Ariszy（Zhiyi-N）】** [https://github.com/Ariszy/Private-Script.git](https://github.com/Ariszy/Private-Script.git)

```shell
ql repo https://github.com/Ariszy/Private-Script.git "JD"
```

**下面的已经失效！！！下面的已经失效！！！下面的已经失效！！！**

---

**【翻翻乐提现单文件】**

```shell
ql raw https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_ffl.js

# docker 外部执行备份
docker exec -it qinglong ql raw https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_ffl.js
```

**【柠檬（胖虎）】** [https://github.com/panghu999/panghu.git](https://github.com/panghu999/panghu.git)

```shell
ql repo https://github.com/panghu999/panghu.git "jd_"

# docker外部执行备份
docker exec -it qinglong ql repo https://github.com/panghu999/panghu.git "jd_"
```

**【zoopanda（动物园）】** [https://github.com/zooPanda/zoo.git](https://github.com/zooPanda/zoo.git)

```shell
ql repo https://github.com/zooPanda/zoo.git "zoo"

# docker外部执行备份
docker exec -it qinglong ql repo https://github.com/zooPanda/zoo.git "zoo"
```

**【ddo（hyzaw）】** [https://github.com/hyzaw/scripts.git](https://github.com/hyzaw/scripts.git)

```shell
ql repo https://github.com/hyzaw/scripts.git "ddo_"

# docker外部执行备份
docker exec -it qinglong ql repo https://github.com/hyzaw/scripts.git "ddo_"
```

**【龙猪猪】** [https://github.com/longzhuzhu/nianyu.git](https://github.com/longzhuzhu/nianyu.git)

```shell
ql repo https://github.com/longzhuzhu/nianyu.git "qx" "main"

# docker外部执行备份
docker exec -it qinglong ql repo https://ghproxy.com/https://github.com/longzhuzhu/nianyu.git "qx" "main"
```

**【妖火整理】**[https://yaohuo.me/bbs-946732.html](https://yaohuo.me/bbs-946732.html)

```shell
ql repo https://github.com/colakele/jd.git "jd_|getJDCookie" "" "^jd[^_]|USER"
```

**【lxk0301】** [https://github.com/chinnkarahoi/jd_scripts.git](https://github.com/chinnkarahoi/jd_scripts.git)

```shell
ql repo https://github.com/chinnkarahoi/jd_scripts.git "jd_" "activity|backUp" "^jd[^_]|USER"

# docker外部执行备份
docker exec -it qinglong ql repo https://github.com/chinnkarahoi/jd_scripts.git "jd_" "activity|backUp" "^jd[^_]|USER"
```

**【混沌】** [https://github.com/whyour/hundun.git](https://github.com/whyour/hundun.git)

```shell
ql repo https://github.com/whyour/hundun.git "quanx" "tokens|caiyun|didi|donate|fold|Env"

# docker外部执行备份
docker exec -it qinglong ql repo https://github.com/whyour/hundun.git "quanx" "tokens|caiyun|didi|donate|fold|Env"
```

**【龙珠】**

```shell
docker exec -it qinglong ql repo https://ghproxy.com/https://github.com/nianyuguai/longzhuzhu.git "qx"
```

**【温某某】**

```shell
docker exec -it qinglong ql repo https://github.com/Wenmoux/scripts.git "jd"
```

## 📌 微信推送

推送平台：[pushplus - https://pushplus.plus/](https://pushplus.plus/)

**进入青龙面板-配置文件 加入末尾下面的参数**

```shell
## Push Plus
export PUSH_PLUS_TOKEN=""
export PUSH_PLUS_USER=""
```

PUSH_PLUS_TOKEN 是 https://pushplus.plus/ 注册登录后提供的 Token，必填 PUSH_PLUS_USER 选填，一对一则不填，一对多必填，填入 pushplus 群组编号

## 📌 其他

### 京东账户和微信绑定

![a134f26ecb0f37ba5bf2bfdfc4ebb0b8](https://static.yoouu.cn/imgs/2021/pic-go/qinglong/12476_1137571a134f26ecb0f37ba5bf2bfdfc4ebb0b8.png)

## 📌 问题集锦

1. 运行 cookie 没有问题，为啥访问主机 ip:5701 无法访问？

   > 运行在虚拟机有这个问题，其他的未知。

2. cookie 面板无法打开，访问 5701 无效。

   直接执行 `./JDC`，可以看到日志。如果是 ok 的。关闭之后再执行 `nohup ./JDC &`。遇到端口冲突，直接杀掉冲突的程序号。linux 怎么杀进程自行百度。

## 📌 交流群

群号：554072417

链接：[https://qm.qq.com/cgi-bin/qm/qr?k=p-PIdWRoqo19bSuYW8xFIagSN2c0PUCB&jump_from=webapi](https://qm.qq.com/cgi-bin/qm/qr?k=p-PIdWRoqo19bSuYW8xFIagSN2c0PUCB&jump_from=webapi)

二维码：<img src="https://static.yoouu.cn/imgs/2021/pic-go/qinglong/20210607195608.png" alt="image-20210607195606194" style="zoom: 25%;" />

## 📌 来源

[京东挂机 青龙面板的安装与使用以及互助+Cookie 的获取](https://www.feiji.work/2021/185.html) - by [孤岛](https://www.feiji.work/)
