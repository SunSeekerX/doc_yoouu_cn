# Nestjs 框架教程（第十篇：拦截器）

![Nestjs](https://static.yoouu.cn/static/imgs/doc/back-end/nestjs/nestjs-logo.png)

---

![img](https://static.yoouu.cn/static/imgs/doc/back-end/nestjs/5d1edebfa26f771380.png)

**拦截器**（Interceptors）是一个使用 @Injectable() 装饰的类，它必须实现 NestInterceptor 接口。

拦截器有一系列的功能，这些功能的设计灵感都来自于面向切面的编程（AOP）技术。这使得下面这些功能成为可能：

- 在函数执行前/后绑定**额外的逻辑**
- **转换**一个函数的返回值
- **转换**函数抛出的异常
- **扩展**基础函数的行为
- 根据特定的条件**完全的重写**一个函数（比如：缓存）

## 基础

每个拦截器都要实现 intercept() 方法，此方法有两个参数。第一个是 ExecutionContext 实例（这和守卫中的对象一样）。ExecutionContext 继承自 ArgumentsHost。上一节中我们见过，它是一个包装了传递向原始处理器而且根据应用的不同包含不同的参数数组的类

## 执行上下文

ExecutionContext 通过继承 ArgumentsHost，提供了更多的执行过种中的更多细节，它看起来长这样：

```
export interface ExecutionContext extends ArgumentsHost {
  getClass<T = any>(): Type<T>;
  getHandler(): Function;
}
```

getHandler() 方法返回一个将会被调用的路由处理器的引用。getClass() 方法返回控制器类的类型。例如，如果当前进行着一个 POST 请求，假定它会由 CatsController 的 create() 方法处理，那么 getHandler() 方法将返回 create() 方法的引用，而 getClass() 则会返回 CatsController 的类型（非实例）

## 调用处理器

第二个参数是一个 CallHandler。CallHandler 接口实现了 handle() 方法，这个方法就是你可以在你拦截器的某个地方调用的路由处理器。如果你的 intercept() 方法中没调用 handle() 方法，那么路由处理器将不会被执行。

不像守卫与过滤器，拦截器对于一次请求响应有完全的**控制权与责任**。这样的方式意味着 intercept() 方法可以高效地包装请求/响应流。因此，你可以在最终的路由处理器执行前/后实现自己的逻辑。显然，你已经可以通过在 intercept() 方法中的 handle() 调用之前写自己的代码，但是后续的逻辑应该如何处理？因为 handle() 方法返回的是一个 Observable，我们可以使用 RxJS 做到修改后来的响应。使用 AOP 技术，路由处理器的调用被称做一个 **切点**（Pointcut），这表示一个我们的自定义的逻辑插入的地方。

假如有一个 `POST /cats` 的请求，这个请求将被 CatsController 中的 create() 方法处理。如果一个没调用 handle() 方法的拦截器在某处被调用，create() 方法将不会被执行。一但 handle() 方法被调用（它的 Observable 已返回），create() 处理器将被触发。一但响应流通过 Observable 接收到，附加的操作可以在注上被执行，最后的结果将返回给调用方。

## 切面拦截

我们将要研究的第一个例子就是用户登录的交互。下面展示了一个简单的日志拦截器：

```
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

由于 handle() 方法返回了一个 RxJS 的 Observable 对象，对于修改流我们将有更多的选择。上面的示例中我们使用了 tap() 操作符。它在 Observable 流的正常或异常终止时调用我们的匿名日志记录函数，但不会干扰到响应周期。

## 绑定拦截器

我们可以使用 @UseInterceptors() 装饰器来绑定一个拦截器，和管道、守卫一样，它即可以是控制器作用域的，也可以是方法作用域的，或者是全局的。

```
@UseInterceptors(LoggingInterceptor)
export class CatsController {}
```

上面的实现，在请求进入 CatsController 后，你将看到下面的日志输出。

```
Before...
After... 1ms
```

## 响应映射

我们已经知道了 handle() 方法返回一个 Observable。流包含路由处理器返回的值，因此，我们可以很容易的使用 RxJS 的 map() 操作符改变它。

> **注意**：响应映射功能并不适用于库级别的响应策略（不可以使用 @Res 装饰器）

让我们新建一个 TransformInterceptor，它可以修改每个响应。它将使用 map() 操作符来给响应对象符加 data 属性，并且将这个新的响应返回给客户端。

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({ data })));
  }
}
```

当有请求进入时，响应看起来将会是下面这样：

```
{
  "data": []
}
```

拦截器对于创建整个应用层面的可复用方案有非常大的意义。比如说，我们需要将所有响应中出现的 null 值改成空字符串 ““。我们可以使用拦截器功能仅用下面一行代码就可以实现

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map(value => value === null ? '' : value ));
  }
}
```

## 异常映射

另外一个有趣的用例是使用 RxJS 的 catchError() 操作符来重写异常捕获：

```
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => throwError(new BadGatewayException())),
      );
  }
}
```

## 流重写

有一些情况下我们希望完全阻止处理器的调用并返回一个不同的值。比如缓存的实现。让我们来试试使用缓存拦截器来实现它。当然真正的缓存实现还包含 TTL，缓存验证，缓存大小等问题，我们这个例子只是一个简单的示意。

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
```

上面的代码中我们硬编码了 isCached 变量，以及返回的缓存数据 []。关键点在于我们返回了一个新的流，使用了 RxJS 的 of() 操作符。因此路由处理器永远不会被调用。为了实现一个更完整的解决方案，你可以通过使用 Reflector 创建一个自定义的装饰器来实现缓存功能。

## 更多的操作符

RxJS 的操作符有很多种能力，我们可以考虑下面这种用例。你需要处理路由请求的超时问题。当你的响应很久都没正常返回时，你会想把它关闭并返回一个错误的响应。

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(5000))
  }
}
```

5 秒后，请求处理将会被取消。
