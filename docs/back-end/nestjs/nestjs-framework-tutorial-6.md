# Nestjs 框架教程（第六篇：中间件）

![Nestjs](https://static.yoouu.cn/imgs/doc/back-end/nestjs/nestjs-logo.png)

---

**中间件**就是一个函数，在路由处理器之前调用。这就表示中间件函数可以访问到请求和响应对象以及应用的请求响应周期中的 next() 中间间函数。

![img](https://static.yoouu.cn/imgs/doc/back-end/nestjs/5d19e2f1938ef39341.png)

Nest 中间件实际上和 Express 的中间件是一样的，Express 文档中对中间件的描述如下：

> 中间件函数主要做以下的事情：
>
> - 执行任意的代码
> - 对请求/响应做操作
> - 终结请求-响应周期
> - 调用下一个栈中的中间件函数
> - 如果当前的中间间函数没有终结请求响应周期，那么它必须调用 next() 方法将控制权传递给下一个中间件函数。否则请求将被挂起

Nest 允许你使用函数或者类来实现自己的中间件。如果用类实现，则需要使用 `@Injectable()` 装饰，并且实现 `NestMiddleware` 接口。

```
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
```

## 依赖注入

中间件也是支持依赖注入的，就像其它支持方式一样，你可以使用构造函数注入依赖。

## 应用中间件

@Module() 装饰器中并不能指定中间件参数，我们可以在模块类的构 configure() 方法中应用中间件，下面的代码会应用一个 ApplicationModule 级别的日志中间件 LoggerMiddleware

```
@Module({
  imports: [CatsModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

上面的代码 forRoutes 方法表示只将中间件应用在 cats 路由上，还可以是指定的 HTTP 方法，甚至是路由通配符：

```
.forRoutes({ path: 'cats', method: RequestMethod.GET });
.forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

当然，你也可以指定不包括某些路由规则：

```
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST }
  )
  .forRoutes(CatsController);
```

不过请注意 exclude 方法不能运用在函数式的中间件上，而且这里指定的 path 也不支持通配符，这只是个快捷方法，如果你真的需要某种路由级别的控制，那完全可以把逻辑写在一个单独的中间件中。

## 函数式的中间件

函数式的中间件可以用一个简单无依赖函数来实现：

```
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```

## 多个中间件

apply 方法传入多个中间件参数即可：

```
consumer.apply(cors(), helmet(), logger)
.forRoutes(CatsController);
```

## 全局中间件

在实现了 INestApplication 接口的实例上调用 use() 方法即可：

```
const app = await NestFactory.create(ApplicationModule);
app.use(logger);
await app.listen(3000);
```
