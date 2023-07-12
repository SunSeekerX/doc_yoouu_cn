# Nestjs 框架教程（第三篇：控制器）

![Nestjs](https://static.yoouu.cn/imgs/doc/back-end/nestjs/nestjs-logo.png)

---

**控制器**（Controller）负责处理客户端请求并发送响应内容，在传统的 MVC 架构中控制器就是负责处理指定请求与应用程序的对应关系，路由则决定具体处理哪个请求。

![img](https://static.yoouu.cn/imgs/doc/back-end/nestjs/5d18c461b3cb641859.png)

## 路由

得益于 TypeScript，在 Nest 中我们可以使用类来实现控制器的功能，使用装饰器来实现路由功能。它们分别需要配合 @Controller 和 @Get 饰器来使用，前者是控制器类的装饰，后者是具体方法的装饰器。

比如下面的代码：

```
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

上面的代码声明了一个猫咪控制器类，实现了 findAll 方法，当你在浏览器中发送请求到 /cates 时程序就返回给你 This action returns all cats

> ++小提示++：可以使用 Nest-cli 工具来自动生成上面的代码：\$ nest g controller cats

`@Get()` 表示 HTTP 请求装饰器。控制器类的装饰器和 HTTP 方法的装饰器共同决定了一个路由规则。findAll 将返回一个状态码为 200 的响应，当然你有两种方法来指定返回的状态码：

|  |  |
| --- | --- |
| 标准模式（建议的） | 使用内置方法时，如果返回一个 JavaScript 对象或者数据，将自动序列化成 JSON，如果是字符串将默认不会序列化，响应的返回状态码 **默认** 总是 200，除非是 POST 请求会默认设置成 201。可以使用 @HttpCode() 装饰器来改变它 |
| 指定框架 | 也可以使用指定框架的请求处理方法，比如 Express 的响应对象。可以使用 @Res() 装饰器来装饰响应对象使用，这样以来你就可以使用类 Express API 的方式处理响应了：`response.status(200).send()` |

> **++警告++**：你可以同时使用上面两种方法，但是 Nest 会检测到，同时标准模式会在这个路由上被禁用

## 请求对象

处理器一般需要访问到请求对象。一般配合 @Req() 装饰器来使用，请求对象包含查询字符串、参数、HTTP 头，请求体等。但是大多数情况只用到其中某个，我们可以单独使用指定的装饰器来装饰请求。

| 装饰器                    | 参数值                              |
| ------------------------- | ----------------------------------- |
| `@Request()`              | `req`                               |
| `@Response()`             | `res`                               |
| `@Next()`                 | `next`                              |
| `@Session()`              | `req.session`                       |
| `@Param(key?: string)`    | `req.params` / `req.params[key]`    |
| `@Body(key?: string)`     | `req.body` / `req.body[key]`        |
| `@Query(key?: string)`    | `req.query` / `req.query[key]`      |
| `@Headers(name?: string)` | `req.headers` / `req.headers[name]` |

举个例子：比如我们只需要处理请求的查询字符串（query string），就可以使用 @Query 来装饰入参，这样取到的值就自然是一个 query string 的字典了。

```
@Get()
getHello(@Query() q: String): string {
    console.log(q)
    return this.appService.getHello();
}
```

如果我们的请求是：http://localhost:3000/?test=a

那么控制台将打印一个 `{ test: 'a' }` 字典

> **++小提示++**：建议安装 @types/express 包来获取 Request 的相关类型提示

## 资源

除了使用 @Get 装饰器，我们还可以使用其它 HTTP 方法装饰器。比如：`@Put()`, `@Delete()`, `@Patch()`, `@Options()`, `@Head()`, and `@All()`，注意 All 并不是 HTTP 的方法，而是 Nest 提供的一个快捷方式，表示接收任何类型的 HTTP 请求。

## 路由通配符

Nest 支持基于模式的路由规则匹配，比如：星号（\*）表示匹配任意的字母组合。

```
@Get('ab*cd')
```

The `'ab*cd'` 路由将匹配 `abcd`, `ab_cd`, `abecd` 等规则。同时：`?`, `+`, `*`, and `()` 通配符（wildcard）都可以使用

| 通配符 | 说明 | 示例 | 匹配 | 不匹配 |
| --- | --- | --- | --- | --- |
| `*` | 匹配任意数量的任意字符 | `Law*` | `Law`, `Laws`, or `Lawyer` | `GrokLaw`, `La`, or `aw` |
| `*Law*` | `Law`, `GrokLaw`, or `Lawyer`. | `La`, or `aw` |  |  |
| `?` | 匹配任意**单个**字符 | `?at` | `Cat`, `cat`, `Bat` or `bat` | `at` |
| `[abc]` | 匹配方括号中的任意**一个**字符 | `[CB]at` | `Cat` or `Bat` | `cat` or `bat` |
| `[a-z]` | 匹配字母、数字区间 | `Letter[0-9]` | `Letter0`, `Letter1`, `Letter2` up to `Letter9` | `Letters`, `Letter` or `Letter10` |

## 状态码

响应的默认状态码是 200，POST 则是 201，我们可以使用装饰器 `@HttpCode(204)` 来指定**处理器**级别的 默认 HttpCode 为 204

```
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

如果想动态指定状态码，就要使用 @Res() 装饰器来注入响应对象，同时调用响应的状态码设置方法。

## 请求头

同样的我们可以使用 `@Header()` 来设置自定义的请求头，也可以使用 `response.header()` 设置

```
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

## 路由参数

通常我们需要设置一些动态的路由来接收一些客户端的查询参数，通过指定路由参数可以很方便的捕获到 URL 上的动态参数到控制器中。

```
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

通过使用 @Param() 装饰器可以在方法中直接访问到路由装饰器 `@Get()` 中的的参数字典，:id 就表示匹配到所有的字符串，可以通过引用 params.id 在方法中访问到。

当然，就像前面学到的参数装饰器也可以指定到具体的某个参数值：

```
@Get(':id')
findOne(@Param('id') id): string {
  return `This action returns a #${id} cat`;
}
```

## 路由顺序

路由的注册顺序与控制器类中的**方法**顺序相关，如果你先装饰了一个 cats/:id 的路由，后面又装饰了一个 cats 路由，那么当用户访问到 GET /cats 时，后面的路由将不会被捕获，因为参数才都是**非必选**的。
