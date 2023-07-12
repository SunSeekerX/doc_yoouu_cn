# Java 概览

## 访问控制修饰符

- **default** (即默认，什么也不写）: 在同一包内可见，不使用任何修饰符。使用对象：类、接口、变量、方法。
- **private** : 在同一类内可见。使用对象：变量、方法。 **注意：不能修饰类（外部类）**
- **public** : 对所有类可见。使用对象：类、接口、变量、方法
- **protected** : 对同一包内的类和所有子类可见。使用对象：变量、方法。 **注意：不能修饰类（外部类）**。

## 多线程

### 概念

同一时间执行多个任务。

> 现在很多多线程是模拟出来的，真正的多线程指的是有多个 cpu，即多核，如服务器。如果是模拟出来的多线程，即在一个 cpu 的情况下，在同一个时间点，cpu 只能执行一个代码，因为切换的很快，所以就有同时执行的错觉。

### 三种创建方式

![java-thread-create.png](https://static.yoouu.cn/imgs/doc/back-end/java/java-thread-create.png)

## Jdk and tomcat

> 下载 JDK12 默认安装，环境变量 path 添加安装路径带`bin`，新建环境变量`JAVA_HOME`不带`bin`，命令行`java`和`javac`执行成功，`tomcat`启动成功

### **环境变量**

`JAVA_HOME`=`${jdk安装位置}` 例如：C:\Program Files\Java\jdk1.8.0_261

Path 添加 `%JAVA_HOME%\bin`

验证成功

```bash
java
javac
```

**编码问题**

新增环境变量`JAVA_TOOL_OPTIONS = -Dfile.encoding=utf-8`,然后重新打开`PowerShell`

提示`Picked up JAVA_TOOL_OPTIONS: -Dfile.encoding=utf-8`,说明设置成功

```powershell
 ~  java
Picked up JAVA_TOOL_OPTIONS: -Dfile.encoding=utf-8
用法: java [-options] class [args...]
           (执行类)
   或  java [-options] -jar jarfile [args...]
           (执行 jar 文件)
其中选项包括:
    -d32          使用 32 位数据模型 (如果可用)
    -d64          使用 64 位数据模型 (如果可用)
    -server       选择 "server" VM
                  默认 VM 是 server.

    -cp <目录和 zip/jar 文件的类搜索路径>
    -classpath <目录和 zip/jar 文件的类搜索路径>
                  用 ; 分隔的目录, JAR 档案
                  和 ZIP 档案列表, 用于搜索类文件。
    -D<名称>=<值>
                  设置系统属性
    -verbose:[class|gc|jni]
                  启用详细输出
    -version      输出产品版本并退出
    -version:<值>
                  警告: 此功能已过时, 将在
                  未来发行版中删除。
                  需要指定的版本才能运行
    -showversion  输出产品版本并继续
    -jre-restrict-search | -no-jre-restrict-search
                  警告: 此功能已过时, 将在
                  未来发行版中删除。
                  在版本搜索中包括/排除用户专用 JRE
    -? -help      输出此帮助消息
    -X            输出非标准选项的帮助
    -ea[:<packagename>...|:<classname>]
    -enableassertions[:<packagename>...|:<classname>]
                  按指定的粒度启用断言
    -da[:<packagename>...|:<classname>]
    -disableassertions[:<packagename>...|:<classname>]
                  禁用具有指定粒度的断言
    -esa | -enablesystemassertions
                  启用系统断言
    -dsa | -disablesystemassertions
                  禁用系统断言
    -agentlib:<libname>[=<选项>]
                  加载本机代理库 <libname>, 例如 -agentlib:hprof
                  另请参阅 -agentlib:jdwp=help 和 -agentlib:hprof=help
    -agentpath:<pathname>[=<选项>]
                  按完整路径名加载本机代理库
    -javaagent:<jarpath>[=<选项>]
                  加载 Java 编程语言代理, 请参阅 java.lang.instrument
    -splash:<imagepath>
                  使用指定的图像显示启动屏幕
有关详细信息, 请参阅 http://www.oracle.com/technetwork/java/javase/documentation/index.html。
```

## IDEA

### 设置编码

设置搜索 `encoding` 全部改成 `UTF-8`

## Maven

### **环境变量**

> 参考：[Maven - Environment Setup](https://www.tutorialspoint.com/maven/maven_environment_setup.htm)

MAVEN_HOME=`${maven安装位置}` 例如：W:\Server\apache-maven-3.6.3

M2_HOME=`${maven安装位置}` 例如：W:\Server\apache-maven-3.6.3

M2=%M2_HOME%\bin

MAVEN_OPTS - `-Xms256m -Xmx512m`

Path 添加 `%MAVEN_HOME%\bin`

验证成功

```
 mvn --version
```

### **国内加速**

打开 maven 的配置文件（ windows 机器一般在 maven 安装目录的 **conf/settings.xml** ），在`<mirrors></mirrors>`标签中添加 mirror 子节点:

```xml
<mirror>
  <id>aliyunmaven</id>
  <mirrorOf>*</mirrorOf>
  <name>阿里云公共仓库</name>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

如果想使用其它代理仓库，可在`<repositories></repositories>`节点中加入对应的仓库使用地址。以使用 spring 代理仓为例：

```xml
<repository>
  <id>spring</id>
  <url>https://maven.aliyun.com/repository/spring</url>
  <releases>
    <enabled>true</enabled>
  </releases>
  <snapshots>
    <enabled>true</enabled>
  </snapshots>
</repository>
```

在你的 **pom.xml** 文件`<denpendencies></denpendencies>`节点中加入你要引用的文件信息：

```xml
<dependency>
  <groupId>[GROUP_ID]</groupId>
  <artifactId>[ARTIFACT_ID]</artifactId>
  <version>[VERSION]</version>
</dependency>
```

执行拉取命令：

```bash
mvn install
```

### **本地仓库**

setting 节点下新增

```xml
<localRepository>${填写你本地的仓库地址，用来放jar包}</localRepository>
<!--示例-->
<localRepository>W:\Server\apache-maven-3.6.3\repository</localRepository>
```

### **注意事项**

1. IDEA 配置了 maven 项目打开 maven 配置可能会恢复为默认的，需要重新设置下。
2. 创建生成的 web.xml 文件 xml 版本可能过低，可能会出现历史遗留问题，最好保持和 tomcat 的 xml 版本一致。可以拷贝 tomcat 的 xml 文件头。

### 常见问题

**Maven 配置问题 - could not find resource mybatis-config.xml**

```xml
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

## log4j

### properties 参考配置

```properties
#将等级为DEBUG的日志信息输出到console和file这两个目的地，console和file的定义在下面的代码
log4j.rootLogger=DEBUG,console,file

#控制台输出的相关设置
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.Target = System.out
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=[%c]-%m%n

#文件输出的相关设置
log4j.appender.file = org.apache.log4j.RollingFileAppender
log4j.appender.file.File=./log/kuang.log
log4j.appender.file.MaxFileSize=10mb
log4j.appender.file.Threshold=DEBUG
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[%p][%d{yy-MM-dd}][%c]%m%n

#日志输出级别
log4j.logger.org.mybatis=DEBUG
log4j.logger.java.sql=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.ResultSet=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG
```

## windows tomcat 输出乱码

文件路径 `conf/logging.properties`

java.util.logging.ConsoleHandler.encoding = GBK

## Tomcat 设置项目管理用户

文件路径`conf/tomcat-users.xml`

```xml
<tomcat-users xmlns="http://tomcat.apache.org/xml"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
              version="1.0">
<user username="admin" password="12345678900" roles="manager-gui" />
```

## springboot tomcat 缓存

`org.apache.catalina.webresources.Cache.getResource 无法将位于[/WEB-INF/classes/templates/]的资源添加到Web应用程序[/b]的缓存中，因为在清除过期缓存条目后可用空间仍不足 - 请考虑增加缓存的最大空间。`

`org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [**] to the cache because there was insufficient free space available after evicting expired cache entries - consider increasing the maximum size of the cache`

`${CATALINA_HOME}/conf/context.xml`

```xml
<Context>

    <!-- Default set of monitored resources. If one of these changes, the    -->
    <!-- web application will be reloaded.                                   -->
    <WatchedResource>WEB-INF/web.xml</WatchedResource>
    <WatchedResource>WEB-INF/tomcat-web.xml</WatchedResource>
    <WatchedResource>${catalina.base}/conf/web.xml</WatchedResource>
    <Resources
        cachingAllowed="true"
        cacheMaxSize="100000"
    />

    <!-- Uncomment this to disable session persistence across Tomcat restarts -->
    <!--
    <Manager pathname="" />
    -->
</Context>
```

## Http 响应状态码

```
1**(信息类)：表示接收到请求并且继续处理
100——客户必须继续发出请求
101——客户要求服务器根据请求转换HTTP协议版本

2**(响应成功)：表示动作被成功接收、理解和接受
200——表明该请求被成功地完成，所请求的资源发送回客户端
201——提示知道新文件的URL
202——接受和处理、但处理未完成
203——返回信息不确定或不完整
204——请求收到，但返回信息为空
205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
206——服务器已经完成了部分用户的GET请求

3**(重定向类)：为了完成指定的动作，必须接受进一步处理
300——请求的资源可在多处得到
301——本网页被永久性转移到另一个URL
302——请求的网页被转移到一个新的地址，但客户访问仍继续通过原始URL地址，重定向，新的URL会在response中的Location中返回，浏览器将会使用新的URL发出新的Request。
303——建议客户访问其他URL或访问方式
304——自从上次请求后，请求的网页未修改过，服务器返回此响应时，不会返回网页内容，代表上次的文档已经被缓存了，还可以继续使用
305——请求的资源必须从服务器指定的地址得到
306——前一版本HTTP中使用的代码，现行版本中不再使用
307——申明请求的资源临时性删除

4**(客户端错误类)：请求包含错误语法或不能正确执行
400——客户端请求有语法错误，不能被服务器所理解
401——请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
HTTP 401.1 - 未授权：登录失败
&emsp;&emsp;HTTP 401.2 - 未授权：服务器配置问题导致登录失败
&emsp;&emsp;HTTP 401.3 - ACL 禁止访问资源
&emsp;&emsp;HTTP 401.4 - 未授权：授权被筛选器拒绝
HTTP 401.5 - 未授权：ISAPI 或 CGI 授权失败
402——保留有效ChargeTo头响应
403——禁止访问，服务器收到请求，但是拒绝提供服务
HTTP 403.1 禁止访问：禁止可执行访问
&emsp;&emsp;HTTP 403.2 - 禁止访问：禁止读访问
&emsp;&emsp;HTTP 403.3 - 禁止访问：禁止写访问
&emsp;&emsp;HTTP 403.4 - 禁止访问：要求 SSL
&emsp;&emsp;HTTP 403.5 - 禁止访问：要求 SSL 128
&emsp;&emsp;HTTP 403.6 - 禁止访问：IP 地址被拒绝
&emsp;&emsp;HTTP 403.7 - 禁止访问：要求客户证书
&emsp;&emsp;HTTP 403.8 - 禁止访问：禁止站点访问
&emsp;&emsp;HTTP 403.9 - 禁止访问：连接的用户过多
&emsp;&emsp;HTTP 403.10 - 禁止访问：配置无效
&emsp;&emsp;HTTP 403.11 - 禁止访问：密码更改
&emsp;&emsp;HTTP 403.12 - 禁止访问：映射器拒绝访问
&emsp;&emsp;HTTP 403.13 - 禁止访问：客户证书已被吊销
&emsp;&emsp;HTTP 403.15 - 禁止访问：客户访问许可过多
&emsp;&emsp;HTTP 403.16 - 禁止访问：客户证书不可信或者无效
HTTP 403.17 - 禁止访问：客户证书已经到期或者尚未生效
404——一个404错误表明可连接服务器，但服务器无法取得所请求的网页，请求资源不存在。eg：输入了错误的URL
405——用户在Request-Line字段定义的方法不允许
406——根据用户发送的Accept拖，请求资源不可访问
407——类似401，用户必须首先在代理服务器上得到授权
408——客户端没有在用户指定的饿时间内完成请求
409——对当前资源状态，请求不能完成
410——服务器上不再有此资源且无进一步的参考地址
411——服务器拒绝用户定义的Content-Length属性请求
412——一个或多个请求头字段在当前请求中错误
413——请求的资源大于服务器允许的大小
414——请求的资源URL长于服务器允许的长度
415——请求资源不支持请求项目格式
416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求长。

5**(服务端错误类)：服务器不能正确执行一个正确的请求
HTTP 500 - 服务器遇到错误，无法完成请求
&emsp;&emsp;HTTP 500.100 - 内部服务器错误 - ASP 错误
&emsp;&emsp;HTTP 500-11 服务器关闭
&emsp;&emsp;HTTP 500-12 应用程序重新启动
&emsp;&emsp;HTTP 500-13 - 服务器太忙
&emsp;&emsp;HTTP 500-14 - 应用程序无效
&emsp;&emsp;HTTP 500-15 - 不允许请求 global.asa
&emsp;&emsp;Error 501 - 未实现
HTTP 502 - 网关错误
HTTP 503：由于超载或停机维护，服务器目前无法使用，一段时间后可能恢复正常
```
