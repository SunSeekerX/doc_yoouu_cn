# Nestjs 框架教程（第四篇：Providers）

![Nestjs](https://static.yoouu.cn/static/imgs/doc/back-end/nestjs/nestjs-logo.png)

---

**Provider** 主要的设计理念来自于[控制反转](https://zh.wikipedia.org/wiki/控制反转)（Inversion of Control，简称 IOC[1](https://keelii.com/2019/07/03/nestjs-framework-tutorial-4/#fn:-) ）模式中的依赖注入（Dependency Injection）特性。使用 `@Injectable()` 装饰的类就是一个 Provider，装饰器方法会优先于类被解析执行。

到这里我们应该要了解整个 Nest 框架的三层结构，Nest 和传统的 MVC 框架的区别在于它更注重于后端部分（控制器、服务与数据）的架构，视图层相对比较独立，完全可以由用户自定义配置。

![img](https://i.loli.net/2019/07/01/5d19aa5c9532744345.png)

Nest 的分层借鉴自 Spring，更细化。随着代码库的增长 MVC 模式中 Modal 和 Controller 会变得含糊不清，导致难于维护。

### Services

我们可以自己实现一个名叫 `CatsService` 的 Service

```
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

> ++小提示++：也可以使用 CLI 工具自动生成一个 Service \$ nest g service cats

有了 Service 我们就可以在控制器中注入并引用到它了

```
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  // 等同于
  private readonly catsService: CatsService
  constructor(catsService: CatsService) {
    this.catsService = catsService
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

依赖注入的很多种方法，Nest 使用了构建函数注入的方式，看起来非常直观。这个时候我们就可以发现 Nest 的优点了，至少你能发现 Controller 和 Service 处于完全解耦的状态：Controller 做的事情仅仅是接收请求，并在合适的时候调用到 Service，至于 Service 内部怎么实现的 Controller 完全不在乎。

这样以来有两个好处：其一，Controller 和 Service 的职责边界很清晰，不存在灰色地带；其二，各自只关注自身职责涉及的功能，比方说 Service 通常来写业务逻辑，但它也仅仅只与业务相关。当然你可能会觉得这很理想，时间长了增加了诸如缓存、验证等逻辑后，代码最终会变得无比庞大而难于维护。事实上这也是一个框架应该考虑和抽象出来的，后续 Nest 会有一系列的解决方法，但目前为至我们只需要了解到 Controller 和 Service 的设计原理即可。

### 依赖注入

```
constructor(private readonly catsService: CatsService) {}
```

得益于 TypeScript 类型，Nest 可以通过 CatsService 类型查找到 catsService，依赖被查找并传入到控制器的构造函数中。

通常我们在没有依赖注入的时候如果 A 依赖于 B，那么在 A 初始化或者执行中的某个过程需要先创建 B，这时我们就认为 A 对 B 的依赖是**正向**的。但是这样解决依赖的办法会得得 A 与 B 的逻辑耦合在一起，依赖越来越多代码就会变的越来越糟糕。如下图所示，齿轮之间是相互依赖的，一损俱损。

![img](https://static.yoouu.cn/static/imgs/doc/back-end/nestjs/5d19b545530fe73281.jpg)

控制反转（IOC）模式就是要解决这个问题，它会多引入一个容器（Container）的概念，让一个 IOC 容器去管理 A、B 的依赖并初始化。

![img](https://i.loli.net/2019/07/01/5d19b570db26721361.png)

当我们去掉容器时，剩下的齿轮成了一个个独立的功能模块。

![img](https://i.loli.net/2019/07/01/5d19b5db066fa32957.png)

### 注入作用域

Providers 有一个和应用程序一样的生命周期。当应用启动，每个依赖都必须被获取到。将会有单独的一章来讲解注入作用域

### 自定义的 Providers

Nest 有一个内置的 IOC 容器，用来解析 Providers 之间的关系。这个功能相对于 DI 来讲更底层，但是功能却异常强大，@Injectable() 只是冰山一角。事实上，你可以使用值，类和同步或者异步的工厂。

### 可选的 Providers

有时候，你可以会需要一个依赖，但是这个依赖并不需要一定被容器解析出来。比如我们通常会传入一个配置对象，但是如果不传会使用一个默认值代替。可以使用 `@Optional()` 来装饰一个非必选的参数。

```
@Injectable()
export class HttpService<T> {
  constructor(
    @Optional()
    @Inject('HTTP_OPTIONS')
    private readonly httpClient: T
  ) {}
}
```

### 基于属性的注入

前面我们提过了 Nest 实现注入是基于类的构造函数的，但是在一些特殊情况下，基于属性的注入会特别有用。

比如一个顶层的类依赖一个或多个 Providers 时，通过在子类的构造函数中调用 super() 方法并不是很优雅，为了避免这种情况我们可以在属性上使用 @Inject() 装饰器。

```
@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

> ++警告++：如果你的类并没有继承其它 Provider，那么一定要使用基于构造函数注入方式

### 注册 Provider

一般来讲控制器就是 Service 的消费（使用）者，我们需要将这些 Service 注册到 Nest 上，这样就可以让 Nest 帮你完成注入操作。通常我们会使用 @Module 装饰器来完成注册的过程。

```
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class ApplicationModule {}
```

---

1. 控制反转 [[return\]](https://keelii.com/2019/07/03/nestjs-framework-tutorial-4/#fnref:-)
