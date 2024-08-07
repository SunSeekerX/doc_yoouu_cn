# Nestjs 框架教程（第七篇：异常过滤器）

![Nestjs](https://static.yoouu.cn/static/imgs/doc/back-end/nestjs/nestjs-logo.png)

---

Nest 框架内部实现了一个异常处理层，专门用来负责应用程序中**未处理**的异常。

![img](https://static.yoouu.cn/static/imgs/doc/back-end/nestjs/5d1b66de9370734231.png)

默认情况未处理的异常会被全局过滤异常器 HttpException 或者它的子类处理。如果一个未识别的异常（非 HttpException 或未继承自 HttpException）被抛出，下面的信息将被返回给客户端：

```
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## 基础异常

我们可以从控制器的方法中手动抛出一个异常：

```
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

客户端将收到如下信息：

```
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

当然你也可以自定义返回状态值和错误信息：

```
@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, 403);
}
```

## 异常的级别

比较好的做法是实现你自己想要的异常类。

```
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

然后你就可以手动在需要的地方抛出它。

```
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

## HTTP 异常

Nest 内置了以下集成自 HttpException 的异常类：

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableEntityException
- InternalServerErrorException
- NotImplementedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException

## 异常过滤器

如果你想给异常返回值加一些动态的参数，可以使用异常过滤器来实现。例如下面的异常过滤器将会给 HttpException 添加额外的时间缀和路径参数：

```
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```

注意：所有的异常过滤器都必须实现泛型接口 ExceptionFilter。就是说你必须要提供一个 catch(exception: T, host: ArgumentsHost) 方法

## 参数宿主

上面代码中的 host 参数是一个类型为 ArgumentsHost 的原生请求处理器包装对象。根据应用程序的不同它具有不同的接口。

```
export interface ArgumentsHost {
  getArgs<T extends Array<any> = any[]>(): T;
  getArgByIndex<T = any>(index: number): T;
  switchToRpc(): RpcArgumentsHost;
  switchToHttp(): HttpArgumentsHost;
  switchToWs(): WsArgumentsHost;
}
```

## 绑定过滤器

可以使用 @UseFilters 装饰器让一个控制器方法具有过滤器处理逻辑。

```
@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

当然过滤器可以被使用在不同的作用域上：**方法作用域、控制器作用域、全局作用域**。比如应用一个控制器作用域的过滤器，可以这么写：

```
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

全局过滤器可以通过如下代码实现：

```
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

不过这样注册的全局过滤器无法进入依赖注入，因为它在模块作用域之外。为了解决这个问题，你可以在根模块上面注册一个全局作用域的过滤器。

```
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ApplicationModule {}
```

## 捕获所有异常

@Catch() 装饰器不传入参数就默认捕获所有的异常：

```
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

## 继承

通常你可能并不需要自己实现完全定制化的异常过滤器，可以继承自 BaseExceptionFilter 即可复用内置的过滤器逻辑。

```
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```
