# Nestjs 框架教程（第五篇：模块）

![Nestjs](https://static.yoouu.cn/imgs/doc/back-end/nestjs/nestjs-logo.png)

---

**模块**（Module）是一个使用了 @Module() 装饰的类。@Module() 装饰器提供了一些 Nest 需要使用的元数据，用来组织应用程序的结构。

![img](https://static.yoouu.cn/imgs/doc/back-end/nestjs/5d19d7a33690e19033.png)

每个应用都至少有一个根模块，根模块就是 Nest 应用的入口。Nest 会从这里查找出整个应用的依赖/调用[图](<https://en.wikipedia.org/wiki/Graph_(abstract_data_type)>)。

@Module() 装饰器接收一个参数对象，有以下取值：

| `providers`   | 可以被 Nest 的注入器初始化的 providers，至少会在此模块中共享 |
| ------------- | ------------------------------------------------------------ |
| `controllers` | 这个模块需要用到的控制器集合                                 |
| `imports`     | 引入的其它模块集合                                           |
| `exports`     | 此模块提供的 providers 的子集，其它模块引入此模块时可用      |

模块默认会封装 providers，如果要在不同模块之间共享 provider 可以在 exports 参数中指定。

## 功能模块

使用下面的代码可以将相关的控制器和 Service 包装成一个模块：

```
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

> ++小提示++：也可以使用 CLI 来自动生成模块：\$ nest g module cats

这样我们就完成了一个模块的封装。

## 共享的模块

在 Nest 中模块默认是单例的，因此你可在不同的模块之间共享任意 Provider 实例。

![img](https://static.yoouu.cn/imgs/doc/back-end/nestjs/5d19dd669f9c560755.png)

模块都是共享的，我们可以通过导出当前模块的指定 Service 来实现其它模块对 Service 的复用。

```
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService] // 导出
})
export class CatsModule {}
```

## 模块的重复导出

给模块包装一层即可实现：

```
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

## 依赖注入

模块的构造函数中也可以注入指定的 providers，通常用在一些配置参数场景。

```
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
```

但是模块类本身并不可以装饰成 provider，因为这会造成循环依赖

## 全局模块

当一些模块在你的应用频繁使用时，可以使用全局模块来避免每次都要调用的问题。Angular 会把 provider 注册到全局作用域上，然而 Nest 会默认将 provider 注册到**模块作用域**上。如果你没有显示的导出模块的 provider，那么其它地方就无法使用它。

如果你想让一个模块随处可见，那就使用 @Global() 装饰器来装饰这个模块。

```
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

@Global() 装饰器可以让模块获得**全局**作用域

### 动态模块

Nest 模块系统支持**动态模块**的功能，这将让自定义模块的开发变得容易。

```
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

模块的静态方法 forRoot 返回一个动态模块，可以是同步或者异步模块。
