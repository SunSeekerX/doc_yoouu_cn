# Nestjs 框架教程（第九篇：守卫）

![Nestjs](https://static.yoouu.cn/static/imgs/doc/back-end/nestjs/nestjs-logo.png)

---

**守卫**（Guards）是一个使用 @Injectable() 装饰的类，它必须实现 CanActivate 接口。

![img](https://static.yoouu.cn/static/imgs/doc/back-end/nestjs/5d1ec2a0e2ae056395.png)

**守卫**只有**一个**职责，就是决定请求是否需要被控制器处理。一般用在权限、角色的场景中。

守卫和中间件的区别在于：中间件很简单，next 方法调用后中间的任务就完成了。但是守卫需要关心上下游，它需要鉴别请求与控制器之间的关系。

> 守卫会在中间件逻辑之==后==、拦截器/管道之==前==执行。

## 授权守卫

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

canActivate 返回 true，控制器正常执行，false 请求会被 deny

## 执行上下文

ExecutionContext 不但继承了 ArgumentsHost，还有两个额外方法：

```
export interface ExecutionContext extends ArgumentsHost {
  getClass<T = any>(): Type<T>;
  getHandler(): Function;
}
```

getHandler() 方法会返回一个将被调用的方法处理器，getClass() 返回处理器对应的控制器类。

## 基于角色的认证

我们来实现一个小型的基于角色的认证系统。

创建一个守卫，先让它返回 true，后面再改：

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

## 绑定守卫

就像过滤器一样，守卫可以是控制器作用域的，也可以是方法作用域或者全局作用域。我们使用 @UseGuards 来引用一个控制器作用域的守卫。

```
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

如果想引用到全局作用域可以调用 useGlobalGuards 方法。

```
const app = await NestFactory.create(ApplicationModule);
app.useGlobalGuards(new RolesGuard());
```

由于我们在根模块外层引用了全局守卫，这时守卫无法注入依赖。所以我们还需要在要模块上引入。

```
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ApplicationModule {}
```

## 反射

虽然现在已经有了守卫，但是它还没有执行上下文。CatsController 应该有一些需要访问到的权限类型。比如：管理员（admin）角色可以访问、其它角色不可以。

这时我们需要对控制器（或方法）添加一些**元数据**，用来标记这个控制器的权限类型。在 Nest 中我们通常使用 @SetMetadata() 装饰器来完成这个工作。

```
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

上面的代码表示给 create 方法设置角色的元数据，用来标识 create 方法只能是 roles 关联的一些角色（admin…）才能访问到的。

如果你觉得 SetMetadata 这个装饰器看着不是那么见名知意，也可以实现一个自定义的装饰器。

```
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

这样就可以用更简洁的方式来声明角色权限关系了：

```
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

## 联合在一起使用

我们将使用反射机制来获取控制器上的元数据。

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    return user && user.roles && hasRole();
  }
}
```

当 canActivate 方法返回 false 时，Nest 将会抛出一个 ForbiddenException 异常。你也可以手动抛出别的异常：

```
throw new UnauthorizedException();
```
