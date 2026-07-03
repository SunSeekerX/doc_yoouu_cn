# Kotlin

## kotlin 简介

> **Kotlin**是一种在[Java 虚拟机](https://zh.wikipedia.org/wiki/Java虛擬機)上执行的[静态类型](https://zh.wikipedia.org/wiki/静态类型)[编程语言](https://zh.wikipedia.org/wiki/编程语言)，它也可以被编译成为[JavaScript](https://zh.wikipedia.org/wiki/JavaScript)源代码。它主要是由[俄罗斯](https://zh.wikipedia.org/wiki/俄羅斯)[圣彼得堡](https://zh.wikipedia.org/wiki/聖彼得堡)的[JetBrains](https://zh.wikipedia.org/wiki/JetBrains)开发团队所发展出来的编程语言，其名称来自于圣彼得堡附近的[科特林岛](https://zh.wikipedia.org/wiki/科特林島)。[[1\]](https://zh.wikipedia.org/wiki/Kotlin#cite_note-oracle_interview-1)2012年1月，著名期刊《[Dr. Dobb's Journal](https://zh.wikipedia.org/w/index.php?title=Dr._Dobb's_Journal&action=edit&redlink=1)》中Kotlin被认定为该月的最佳语言。[[2\]](https://zh.wikipedia.org/wiki/Kotlin#cite_note-dobbs-2)虽然与Java语法并不兼容，但在[JVM](https://zh.wikipedia.org/wiki/JVM)环境中Kotlin被设计成可以和Java代码相互运作，并可以重复使用如[Java集合框架](https://zh.wikipedia.org/wiki/Java集合框架)等的现有[Java引用的函数库](https://zh.wikipedia.org/w/index.php?title=Java引用的函数库&action=edit&redlink=1)。Hathibelagal写道，“如果你正在为Android开发寻找一种替代编程语言，那么应该试下Kotlin。它很容易在Android项目中替代Java或者同Java一起使用。”
>
> Kotlin 是一种在 Java 虚拟机上运行的静态类型编程语言，被称之为 Android 世界的 Swift，由 JetBrains 设计开发并开源。
>
> Kotlin 可以编译成 Java 字节码，也可以编译成 JavaScript，方便在没有 JVM 的设备上运行。
>
> 在 Google I/O 2017 中，Google 宣布 Kotlin 成为 Android 官方开发语言。

## 定义变量

var

var 是一个可变变量，这是一个可以通过重新分配来更改为另一个值的变量。这种声明变量的方式和 Java 中声明变量的方式一样

val

val 是一个只读变量，这种声明变量的方式相当于 java 中的 final 变量。一个 val 创建的时候必须初始化，因为以后不能被改变

## 特别语法

### lateinit 和 by lazy

lateinit 和 lazy 是 Kotlin 中的两种不同的延迟初始化的实现，

by lazy 只能用在 val 声明的变量上，为什么上面代码也解释了，并且是线程安全的。

### let，run，with，apply 及 also

> Kotlin 标准库包含几个函数，它们的唯一目的是在对象的上下文中执行代码块。当对一个对象调用这样的函数并提供一个 lambda 表达式时，它会形成一个临时作用域。在此作用域中，可以访问该对象而无需其名称。这些函数称为作用域函数。

简单来说，**作用域函数是为了方便对一个对象进行访问和操作，你可以对它进行空检查或者修改它的属性或者直接返回它的值等操作**，下面提供了案例对作用域函数进行了详细说明。

#### let

```kotlin
public inline fun <T, R> T.let(block: (T) -> R): R
```

let 函数是参数化类型 T 的扩展函数。在 let 块内可以通过 it 指代该对象。返回值为 let 块的最后一行或指定 return 表达式。

我们以一个 Book 对象为例，类中包含 Book 的 name 和 price，如下：

```kotlin
class Book() {
    var name = "《数据结构》"
    var price = 60
    fun displayInfo() = print("Book name : $name and price : $price")
}
fun main(args: Array<String>) {
    val book = Book().let {
        it.name = "《计算机网络》"
        "This book is ${it.name}"
    }
    print(book)
}

控制台输出：
This book is 《计算机网络》
```

在上面案例中，我们对 Book 对象使用 let 作用域函数，在函数块的最后一句添加了一行字符串代码，并且对 Book 对象进行打印，我们可以看到最后控制台输出的结果为字符串“This book is 《计算机网络》”。

按照我们的编程思想，打印一个对象，输出必定是对象，但是使用 let 函数后，输出为最后一句字符串。这是由于 let 函数的特性导致。因为在 Kotlin 中，如果**let 块中的最后一条语句是非赋值语句，则默认情况下它是返回语句。**

那如果我们将 let 块中最后一条语句修改为赋值语句，会发生什么变化？

```kotlin
fun main(args: Array<String>) {
    val book = Book().let {
        it.name = "《计算机网络》"
    }
    print(book)
}

控制台输出：
kotlin.Unit
```

可以看到我们将 Book 对象的 name 值进行了赋值操作，同样对 Book 对象进行打印，但是最后控制台的输出结果为“kotlin.Unit”，这是因为在 let 函数块的最后一句是赋值语句，print 则将其当做是一个函数来看待。

这是**let**角色设定的**第一点**：1️⃣

- **let 块中的最后一条语句如果是非赋值语句，则默认情况下它是返回语句，反之，则返回的是一个 Unit 类型**

我们来看**let**的**第二点**：2️⃣

- **let 可用于空安全检查。**

如需对非空对象执行操作，可对其使用安全调用操作符 ?. 并调用 let 在 lambda 表达式中执行操作。如下案例：

```kotlin
var name: String? = null
fun main(args: Array<String>) {
    val nameLength = name?.let {
        it.length
    } ?: "name为空时的值"
    print(nameLength)
}
```

我们设置 name 为一个可空字符串，利用 name?.let 来进行空判断，只有当 name 不为空时，逻辑才能走进 let 函数块中。在这里，我们可能还看不出来 let 空判断的优势，但是当你有大量 name 的属性需要编写的时候，就能发现 let 的快速和简洁。

**let**的**第三点**：3️⃣

- **let 可对调用链的结果进行操作。**

关于这一点，官方教程给出了一个案例，在这里就直接使用：

```kotlin
fun main(args: Array<String>) {
    val numbers = mutableListOf("One","Two","Three","Four","Five")
    val resultsList = numbers.map { it.length }.filter { it > 3 }
    print(resultsList)
}
```

我们的目的是获取数组列表中长度大于 3 的值。因为我们必须打印结果，所以我们将结果存储在一个单独的变量中，然后打印它。但是使用“let”操作符，我们可以将代码修改为:

```kotlin
fun main(args: Array<String>) {
    val numbers = mutableListOf("One","Two","Three","Four","Five")
    numbers.map { it.length }.filter { it > 3 }.let {
        print(it)
    }
}
```

使用 let 后可以直接对数组列表中长度大于 3 的值进行打印，去掉了变量赋值这一步。

另外，let 函数还存在一个特点。

**let**的**第四点**：4️⃣

- **let 可以将“It”重命名为一个可读的 lambda 参数。**

let 是通过使用“It”关键字来引用对象的上下文，因此，这个“It”可以被重命名为一个可读的 lambda 参数，如下将**it**重命名为**book**：

```kotlin
fun main(args: Array<String>) {
    val book = Book().let {book ->
        book.name = "《计算机网络》"
    }
    print(book)
}
```

#### run

**run**函数以“**this**”作为上下文对象，且它的调用方式与**let**一致。

另外，第一点：1️⃣ **当 lambda 表达式同时包含对象初始化和返回值的计算时，run 更适合**。

这句话是什么意思？我们还是用案例来说话：

```kotlin
fun main(args: Array<String>) {

    Book().run {
        name = "《计算机网络》"
        price = 30
        displayInfo()
    }
}

控制台输出：
Book name : 《计算机网络》 and price : 30
```

如果不使用**run**函数，相同功能下代码会怎样？来看一看：

```kotlin
fun main(args: Array<String>) {

    val book = Book()
    book.name = "《计算机网络》"
    book.price = 30
    book.displayInfo()
}

控制台输出：
Book name : 《计算机网络》 and price : 30
```

输出结果还是一样，但是 run 函数所带来的代码简洁程度已经显而易见。

除此之外，让我们来看看 run 函数的其他优点：

通过查看源码，了解到**run 函数**存在**两种声明方式，**

**1、与 let 一样，run 是作为 T 的扩展函数；**

```kotlin
inline fun <T, R> T.run(block: T.() -> R): R
```

**2、第二个 run 的声明方式则不同，它不是扩展函数，并且块中也没有输入值，因此，它不是用于传递对象并更改属性的类型，而是可以使你在需要表达式的地方就可以执行一个语句。**

```kotlin
inline fun <R> run(block: () -> R): R
```

如下利用 run 函数块执行方法，而不是作为一个扩展函数：

```kotlin
run {
        val book = Book()
        book.name = "《计算机网络》"
        book.price = 30
        book.displayInfo()
    }
```

#### with

```kotlin
inline fun <T, R> with(receiver: T, block: T.() -> R): R
```

**with 属于非扩展函数，直接输入一个对象 receiver，当输入 receiver 后，便可以更改 receiver 的属性，同时，它也与 run 做着同样的事情。**

还是提供一个案例说明：

```js
fun main(args: Array<String>) {
    val book = Book()

    with(book) {
        name = "《计算机网络》"
        price = 40
    }
    print(book)
}
```

以上面为例，with（T）类型传入了一个参数 book，则可以在 with 的代码块中访问 book 的 name 和 price 属性，并做更改。

**with 使用的是非 null 的对象，当函数块中不需要返回值时，可以使用 with。**

#### apply

```kotlin
inline fun <T> T.apply(block: T.() -> Unit): T
复制代码
```

apply 是 T 的扩展函数,与**run**函数有些相似，它将**对象的上下文引用为“this”而不是“it”，并且提供空安全检查**，不同的是，**apply 不接受函数块中的返回值，返回的是自己的 T 类型对象。**

```kotlin
fun main(args: Array<String>) {
    Book().apply {
        name = "《计算机网络》"
        price = 40

    }
    print(book)
}

控制台输出：
com.fuusy.kotlintest.Book@61bbe9ba
```

前面看到的 **let**、**with** 和 **run** 函数返回的值都是 **R**。但是，**apply** 和下面查看的 **also** 返回 **T**。例如，在 **let** 中，没有在函数块中返回的值，最终会成为 Unit 类型，但在 **apply** 中，最后返回对象本身 （T） 时，它成为 Book 类型。

apply 函数**主要用于初始化或更改对象，因为它用于在不使用对象的函数的情况下返回自身。**

#### also

```kotlin
inline fun <T> T.also(block: (T) -> Unit): T
```

**also 是 T 的扩展函数，返回值与 apply 一致，直接返回 T**。also 函数的用法类似于 let 函数，将**对象的上下文引用为“it”而不是“this”以及提供空安全检查方面**。

因为 T 作为 block 函数的输入，可以使用 also 来访问属性。所以，在不使用或不改变对象属性的情况下也使用 also。

```js
fun main(args: Array<String>) {
    val book  = Book().also {
        it.name = "《计算机网络》"
        it.price = 40
    }
    print(book)
}

控制台输出：
com.fuusy.kotlintest.Book@61bbe9ba
```

#### 区别

| 函数名 | 函数块内使用对象 | 返回值 | 是否扩展函数 | 适用场景 |
| --- | --- | --- | --- | --- |
| with | this | 函数块最后一行或 return 表达式的值 | 否 | 适用于调用同一个类多个方法 |
| let | it | 函数块最后一行或 return 表达式的值 | 是 | 适用于对象统一处理不为空的情况 |
| run | this | 函数块最后一行或 return 表达式的值 | 是 | 适用 with()、let()函数的任何场景 |
| apply | this | 该对象 | 是 | 适用于 run()函数的任何场景，通产可用来在初始化一个对象实例时，操作对象属性并最终返回该对象。也可用于多个扩展函数链式调用 |
| also | it | 该对象 | 是 | 适用于 let()函数的任何场景，一般可用于多个扩展函数链式调用 |
