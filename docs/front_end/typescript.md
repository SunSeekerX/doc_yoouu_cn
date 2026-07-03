# Typescript

## 仅仅导入/导出声明

为了能让我们导入类型，TypeScript 重用了 JavaScript 导入语法。例如在下面的这个例子中，我们确保 JavaScript 的值 `doThing` 以及 TypeScript 类型 `Options` 一同被导入

```ts
// ./foo.ts
interface Options {
  // ...
}

export function doThing(options: Options) {
  // ...
}

// ./bar.ts
import { doThing, Options } from './foo.js'

function doThingBetter(options: Options) {
  // do something twice as good
  doThing(options)
  doThing(options)
}
```

这很方便的，因为在大多数的情况下，我们不必担心导入了什么 —— 仅仅是我们想导入的内容。

遗憾的是，这仅是因为一个被称之为「导入省略」的功能而起作用。当 TypeScript 输出一个 JavaScript 文件时，TypeScript 会识别出 `Options` 仅仅是当作了一个类型来使用，它将会删除 `Options`

```ts
// ./foo.js
export function doThing(options: Options) {
  // ...
}

// ./bar.js
import { doThing } from './foo.js'

function doThingBetter(options: Options) {
  // do something twice as good
  doThing(options)
  doThing(options)
}
```

在通常情况下，这种行为都是比较好的。但是它会导致一些其他问题。

首先，在一些场景下，TypeScript 会混淆导出的究竟是一个类型还是一个值。比如在下面的例子中， `MyThing` 究竟是一个值还是一个类型？

```ts
import { MyThing } from './some-module.js'

export { MyThing }
```

如果单从这个文件来看，我们无从得知答案。如果 `Mything` 仅仅是一个类型，Babel 和 TypeScript 使用的 `transpileModule` API 编译出的代码将无法正确工作，并且 TypeScript 的 `isolatedModules` 编译选项将会提示我们，这种写法将会抛出错误。问题的关键在于，没有一种方式能识别它仅仅是个类型，以及是否应该删除它，因此「导入省略」并不够好。

同时，这也存在另外一个问题，TypeScript 导入省略将会去除只包含用于类型声明的导入语句。对于含有副作用的模块，这造成了明显的不同行为。于是，使用者将会不得不添加一条额外的声明语句，来确保有副作用。

```ts
// This statement will get erased because of import elision.
import { SomeTypeFoo, SomeOtherTypeBar } from './module-with-side-effects'

// This statement always sticks around.
import './module-with-side-effects'
```

一个我们看到的具体例子是出现在 Angularjs（1.x）中， `services` 需要在全局在注册（它是一个副作用），但是导入的 `services` 仅仅用于类型声明中。

```ts
// ./service.ts
export class Service {
  // ...
}
register('globalServiceId', Service)

// ./consumer.ts
import { Service } from './service.js'

inject('globalServiceId', function (service: Service) {
  // do stuff with Service
})
```

结果 `./service.js` 中的代码不会被执行，导致在运行时会被中断。

为了避免这类行为，我们意识到在什么该被导入/删除方面，需要给使用者提供更细粒度的控制。

在 TypeScript 3.8 版本中，我们添加了一个仅仅导入/导出声明语法来作为解决方式。

```ts
import type { SomeThing } from './some-module.js'

export type { SomeThing }
```

`import type` 仅仅导入被用于类型注解或声明的声明语句，它总是会被完全删除，因此在运行时将不会留下任何代码。与此相似，`export type` 仅仅提供一个用于类型的导出，在 TypeScript 输出文件中，它也将会被删除。

值得注意的是，类在运行时具有值，在设计时具有类型。它的使用与上下文有关。当使用 `import type` 导入一个类时，你不能做类似于从它继承的操作。

```ts
import type { Component } from 'react'

interface ButtonProps {
  // ...
}

class Button extends Component<ButtonProps> {
  //               ~~~~~~~~~
  // error! 'Component' only refers to a type, but is being used as a value here.
  // ...
}
```

如果在之前你使用过 Flow，它们的语法是相似的。一个不同的地方是我们添加了一个新的限制条件，来避免可能混淆的代码。

```ts
// Is only 'Foo' a type? Or every declaration in the import?
// We just give an error because it's not clear.

import type Foo, { Bar, Baz } from 'some-module'
//     ~~~~~~~~~~~~~~~~~~~~~~
// error! A type-only import can specify a default import or named bindings, but not both.
```

与 `import type` 相关联，我们提供来一个新的编译选项：`importsNotUsedAsValues`，通过它可以来控制没被使用的导入语句将会被如何处理，它的名字是暂定的，但是它提供来三个不同的选项。

- `remove`，这是现在的行为 —— 丢弃这些导入语句。这仍然是默认行为，没有破坏性的更改
- `preserve`，它将会保留所有的语句，即使是从来没有被使用。它可以保留副作用
- `error`，它将会保留所有的导入（与 `preserve` 选项相同）语句，但是当一个值的导入仅仅用于类型时将会抛出错误。如果你想确保没有意外导入任何值，这会是有用的，但是对于副作用，你仍然需要添加额外的导入语法。

对于该特性的更多信息，参考该 [PR](https://github.com/microsoft/TypeScript/pull/35200)。
