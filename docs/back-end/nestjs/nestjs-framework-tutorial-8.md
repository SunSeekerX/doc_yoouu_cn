# Nestjs 框架教程（第八篇：管道）

![Nestjs](https://static.yoouu.cn/imgs/doc/back-end/nestjs/nestjs-logo.png)

---

![img](https://static.yoouu.cn/imgs/doc/back-end/nestjs/5d1dc90b3606425009.png)

**管道**（Pipes）是一个用 @Injectable() 装饰过的类，它必须实现 PipeTransform 接口。

从官方的示意图中我们可以看出来管道 pipe 和过滤器 filter 之间的关系：管道偏向于服务端控制器逻辑，过滤器则更适合用客户端逻辑。

> 过滤器在客户端发送请求**==后==**处理，管道则在控制器接收请求**==前==**处理。

管道通常有两种作用：

- **转换/变形**：转换输入数据为目标格式
- **验证**：对输入数据时行验证，如果合法让数据通过管道，否则抛出异常。

管道会处理控制器路由的参数，Nest 会在方法调用前插入管道，管道接收发往该方法的参数，此时就会触发上面两种情况。然后路由处理器会接收转换过的参数数据并处理后续逻辑。

> ++小提示++：管道会在异常范围内执行，这表示异常处理层可以处理管道异常。如果管道发生了异常，控制器的执行将会**停止**

## 内置管道

Nest 内置了两种管道：`ValidationPipe` 和 `ParseIntPipe`。

```
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

注意这里可能不太好理解，因为我们前面已经在控制器参数上使用了 @body 装饰器，并且使用 TypeScript 的类型声明它为 CreateCatDto，如下：

```
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

但是 TypeScript 类型是静态的、编译时类型，当编译成 JavaScript 后在运行时并没有任何类型校验。这时我们就需要自己去验证，或者借助第三方工具、库来验证。

Nest 官方文档在这一节中使用了 [joi](https://www.npmjs.com/package/@hapi/joi) 这个验证库。这个验证库的使用需要传入一个 schema，实际上对应着我们的在 Nest 中写的 dto 类型，所以我们只需要给 joi 传入一个 CreateCatDto 类的实例即可。

首页在 ValidationPipe 管道中添加 joi 的验证功能。验证通过就返回，不通过直接抛出异常：

```
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Object) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = Joi.validate(value, this.schema);
    if (error) {
      throw new BadRequestException(JSON.stringify(error.details));
    }
    return value;
  }
}
```

## 绑定管道

管道有了，我们还需要在控制器方法上绑定它。

```
@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

使用 @UsePipes 修饰器即可，传入管道的实例，并构造 schema。此时我们的应用就可以在运行时通过 schema 去校验参数对象的开头了。createCatSchema 的写法可以参考[相关文档](https://github.com/hapijs/joi/blob/v15.1.0/API.md)。

```
const createCatSchema = {
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
}
```

例如上面的 schema，如果客户端发送的 POST 请求中如果缺少任意参数 Nest 都会捕获到这个异常并返回信息：

```
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "[{\"message\":\"\\\"name\\\" is required\",\"path\":[\"name\"],\"type\":\"any.required\",\"context\":{\"key\":\"name\",\"label\":\"name\"}}]"
}
```

注意 message 就是我们在管道中传到异常类 BadRequestException 中的参数。

## 类验证器

当然上面这种方法看起来没那么优雅，因为毕竟 CreateCatDto 和 createCatSchema 太重复了。Nest 还支持类型验证器，虽然也需要借助于三方库，但是看起来会优雅很多。

首先，要使用类验证器，你需要先安装 [class-validator](https://github.com/pleerock/class-validator) 库。

```
npm i --save class-validator class-transformer
```

class-validator 可以让你使用给类变量加装饰器的写法给类添加额外的验证功能。这样以来我们就可以直接在原始的 CreateCatDto 类上添加验证装饰器了，这样看起来就整洁多了，而且还没有重复代码：

```
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
```

不过管道验证器中的代码也需要适配一下：

```
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

注意这次的 transform 是 async 异步的，因为内部需要用到异步验证方法。Nest 是支持你这么做的，因为管道可以是异步的。

然后我们可以插入这个管道，位置可以是方法级别的，也可以是参数级别的。

++参数作用域++

```
@Post()
async create(
  @Body(new ValidationPipe()) createCatDto: CreateCatDto,
) {
  this.catsService.create(createCatDto);
}
```

++方法作用域++

```
@Post()
@UsePipes(new ValidationPipe())
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

管道修饰器入参可以是类而不必是管道实例：

```
@Post()
@UsePipes(ValidationPipe)
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

这样以来将实例化过程留给框架去做并肝启用依赖注入。

由于 ValidationPipe 被尽可能的泛化，所以它可以直接使用在全局作用域上。

```
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

## 转换用例

我们还可以用管道来进行数据转换，比如说上面的例子中 age 虽然声明的是 int 类型，但是我们知道 HTTP 请求传递的都是纯字符流，所以通常我们还要把期望传进行类型转换。

```
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

上面这个管道的功能就是强制转换成 Int 类型，如果转换不成功就抛出异常。我们可以针对性的对传入控制器的**某个**参数插入这个管道：

```
@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
  return await this.catsService.findOne(id);
}
```

## 内置的验证管道

比较贴心的是 Nest 已经内置了如上面的例子类似的一些通用验证器，你可以以参数的方式去实例化 ValidationPipe。

```
@Post()
@UsePipes(new ValidationPipe({ transform: true }))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

ValidationPipe 接收一个 ValidationPipeOptions 类型的参数，并且这个参数继承自 ValidatorOptions

```
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
```

ValidatorOptions 又继承了如下所有 class-validator 的参数：

| Option | Type | Description |
| --- | --- | --- |
| `skipMissingProperties` | `boolean` | If set to true, validator will skip validation of all properties that are missing in the validating object. |
| `whitelist` | `boolean` | If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators. |
| `forbidNonWhitelisted` | `boolean` | If set to true, instead of stripping non-whitelisted properties validator will throw an exception. |
| `forbidUnknownValues` | `boolean` | If set to true, attempts to validate unknown objects fail immediately. |
| `disableErrorMessages` | `boolean` | If set to true, validation errors will not be returned to the client. |
| `exceptionFactory` | `Function` | Takes an array of the validation errors and returns an exception object to be thrown. |
| `groups` | `string[]` | Groups to be used during validation of the object. |
| `dismissDefaultMessages` | `boolean` | If set to true, the validation will not use default messages. Error message always will be `undefined` if its not explicitly set. |
| `validationError.target` | `boolean` | Indicates if target should be exposed in `ValidationError` |
| `validationError.value` | `boolean` | Indicates if validated value should be exposed in `ValidationError`. |
