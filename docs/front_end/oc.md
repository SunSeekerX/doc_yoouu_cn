# Objective-C

## Objective-C 简介

Objective-C 是通用语言，它是在 C 语言编程语言之上开发的，它增加了 Small Talk 编程语言的功能，使 Objective-C 成为面向对象的语言。 它主要用于开发 iOS 和 Mac OS X 操作系统及其应用程序。

最初，Objective-C 是由 NeXT 为其 NeXTSTEP 操作系统开发的，之后苹果公司使用它来开发 iOS 和 Mac OS X，并接管了 Objective-C。

#### 1. 面向对象的编程

Objective-C 完全支持面向对象的编程，包括面向对象开发的四大特性 -

- 封装
- 数据隐藏
- 继承
- 多态性

**示例代码**

```objc
#import <Foundation/Foundation.h>

int main (int argc, const char * argv[]) {
   NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
   NSLog (@"hello world");
   [pool drain];
   return 0;
}
```

#### 2. 基础框架

Foundation Framework 提供了大量函数功能，如下所示。

- 它包括一个扩展数据类型列表，如：`NSArray`，`NSDictionary`，`NSSet`等。
- 它由一组丰富的函数组成，用于处理文件，字符串等。
- 它提供了 URL 处理功能，日期格式化，数据处理，错误处理等实用程序。

#### 3. 学习 Objective-C

学习 Objective-C 时，最重要的事情是专注于概念，而不是迷失在语言技术细节中。学习编程语言的目的是成为一个更好的程序员; 也就是说，在设计和实现新系统以及维护旧系统方面变得更加有效。

#### 4. 使用 Objective-C

如前所述，Objective-C 用于开发大量的 iOS 和 Mac OS X 应用程序，它拥有大量 iOS 用户，并且大大增加了 Mac OS X 用户。 因为 Apple 专注于质量第一，而且对于那些开始学习 Objective-C 的人来说非常棒。

## Objective-C 开发环境设置

如果要安装自己的 Objective-C 编程语言编程环境，则需要在计算机上安装文本编辑器和 GCC 编译器。

#### 1. 文本编辑器

文本编辑器用于编写程序代码。一些常见的编辑器如：Windows Notepad，OS Edit 命令，Brief，Epsilon，EMACS 和 vim/vi 等。

文本编辑器的名称和版本可能因不同的操作系统而异。 例如，Notepad 将在 Windows 上使用，vim/vi 可以在 Windows 以及 Linux 或 UNIX 上使用。

使用编辑器创建用于存储代码的文件称为源文件，它包含程序源代码。 Objective-C 程序的源文件通常以`.m`作为扩展名。

在开始编程之前，请确保有一个文本编辑器，并且有足够的经验来编写计算机程序，将其保存在文件中，编译并最终执行。

#### 2. GCC 编译器

源文件中编写的源代码是程序的可读源代码。它需要被“编译”成机器语言，这样 CPU 才能按照给出的指令执行实际的程序。

GCC 编译器将用于将源代码编译为最终的可执行程序。 这里假设读者具有编程语言编译器的基本知识。

GCC 编译器可在各种平台上免费使用，下面介绍在各种平台上设置的过程。

#### 3. 在 UNIX/Linux 上安装

首先是安装 gcc 以及 gcc Objective-C 包。这里以 Centos/Redhat 为例，它通过以下命令 -

```shell
$ su -
$ yum install gcc
$ yum install gcc-objc
```

进一步是使用以下命令设置包依赖项 -

```shell
$ yum install make libpng libpng-devel libtiff libtiff-devel libobjc
   libxml2 libxml2-devel libX11-devel libXt-devel libjpeg libjpeg-devel
```

要获得 Objective-C 的全部功能，请下载并安装`GNUStep`。 这可以通过从 http://main.gnustep.org/resources/downloads.php 下载软件包来完成。

现在，需要切换到下载的文件夹并通过以下方式解压缩文件 -

```shell
$ tar xvfz gnustep-startup-<version>.tar.gz
```

现在，需要切换进入到创建的文件夹`gnustep-startup` -

```shell
$ cd gnustep-startup-<version>
```

接下来，需要配置构建过程 -

```shell
$ ./configure
```

然后，开始构建 -

```shell
$ make
```

最后，需要最终建立环境 -

```objc
$ ./usr/GNUstep/System/Library/Makefiles/GNUstep.sh
```

接下来，编写一个简单的 Objective-C 程序 - `helloWorld.m`，完整代码如下 -

```objc
#import <Foundation/Foundation.h>

int main (int argc, const char * argv[]) {
   NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

   NSLog (@"hello world");
   [pool drain];
   return 0;
}
```

现在，通过使用`cd` 切换到包含该文件的文件夹，使用以下步骤编译并运行一个 Objective-C 文件 - `helloWorld.m` -

```shell
$ gcc `gnustep-config --objc-flags` -L/usr/GNUstep/Local/Library/Libraries -lgnustep-base helloWorld.m -o helloWorld
$ ./helloWorld
```

现在就应该可以看到以下输出了，如下所示：

```shell
2018-11-07 11:48:39.412 yiibai[11096] hello world
```

Ubuntu 安装 Objective-C 开发环境参考网址： https://www.techotopia.com/index.php/Installing_and_Using_GNUstep_and_Objective-C_on_Linux

#### 4. 在 Mac OS 上安装

如果使用的是 Mac OS X，获取 GCC 的最简单方法是从 Apple 的网站下载 Xcode 开发环境，并按照简单的安装说明进行操作。当设置了 Xcode，就可以将 GNU 编译器用于编译 C/C++程序了。 Xcode 目前可在 https://developer.apple.com/technologies/tools/ 上找到并下载。

> 注：在 Mac OS 上编写 Objective-C 就很简单了，只需要打开 Xcode 就可以编写、编译和运行程序了。

## Objective-C 程序结构

Objective-C 程序基本上由以下部分组成 -

- 预处理程序命令
- 接口
- 实现
- 方法
- 变量
- 声明和表达
- 注释

下面来看一下打印“Hello World”字样的简单代码 -

```objc
#import <Foundation/Foundation.h>

@interface SampleClass:NSObject
- (void)sampleMethod;
@end

@implementation SampleClass

- (void)sampleMethod {
   NSLog(@"Hello, World! \n");
}

@end

int main() {
   /* my first program in Objective-C */
   SampleClass *sampleClass = [[SampleClass alloc]init];
   [sampleClass sampleMethod];
   return 0;
}
```

下面对上述程序的各个部分进行解释 -

- 程序的第一行:`#import <Foundation/Foundation.h>`是一个预处理程序命令，它告诉 Objective-C 编译器在进行实际编译之前包含`Foundation.h`头文件。
- 下一行`@interface SampleClass:NSObject` 用于创建接口。它继承了`NSObject`，此类是所有对象的基类。
- 下一行`- (void)sampleMethod;` 用于声明一个方法。
- 下一行`@end`标记了接口的结束。
- 下一行`@implementation SampleClass`用于指示它实现了接口`SampleClass`。
- 下一行`- (void)sampleMethod{}`用于指示实现`sampleMethod`方法。
- 下一行`@end`指示实现的结束。
- 下一行`int main()`是程序执行入口的主函数。
- 下一行`/*...*/`表示注释，它将被编译器忽略，并且已经在程序中添加了其他注释。 所以这些行在程序中称为注释。
- 下一行`NSLog(...)`是 Objective-C 中可用的另一个函数，它会生成消息`“Hello，World！”`并显示在屏幕上。
- 下一行`return 0;`，终止`main()`函数并返回值`0`。

**编译和执行 Objective-C 程序** 现在，当编译并运行程序时，将得到以下结果：

```shell
2018-10-13 07:48:42.120 demo[25832] Hello, World!
```

## Objective-C 基本语法

前面已经看到了 Objective-C 程序的基本结构，因此很容易理解 Objective-C 编程语言的其他基本构建块。

#### Objective-C 令牌

Objective-C 程序由各种令牌组成，令牌可以是关键字，标识符，常量，字符串文字或符号。 例如，以下 Objective-C 语句由六个令牌组成 -

```objc
NSLog(@"Hello, World! \n");
```

单个标记是 -

```objc
NSLog
@
(
   "Hello, World! \n"
)
;
```

#### 分号;

在 Objective-C 程序中，分号是语句终止符。也就是说，每个单独的语句必须以分号结束。 它表示一个逻辑实体的结束。

例如，以下是两个不同的语句 -

```objc
NSLog(@"Hello, World! \n");
return 0;
```

#### 注释

注释就像 Objective-C 程序中的帮助文本一样，编译器会忽略它们。它们以`/*`开头并以字符`*/`结尾，如下所示 -

```objc
/* my first program in Objective-C */


Objective
```

#### 标识符

Objective-C 标识符是用于标识变量，函数或其他用户定义项的名称。 标识符以字母`A`到`Z`或`a`到`z`或下划线`_`开头，后跟零个或多个字母，下划线和数字(`0`到`9`)。

Objective-C 不允许标识符中的标点符号，如`@`，`$`和`%`。 Objective-C 是一种区分大小写的编程语言。 因此，`Manpower`和`manpower`是 Objective-C 中的两个不同的标识符。 以下是符合要求标识符的一些示例 -

```objc
mohd       zara    abc   move_name  a_123
myname50   _temp   j     a23b9      retVal
```

#### 关键字

以下列表显示了 Objective-C 中的一些保留字。 这些保留字不能用作常量或变量或任何其他标识符名称。

| `auto`     | `else`              | `long`      | `switch`         |
| ---------- | ------------------- | ----------- | ---------------- |
| `break`    | `enum`              | `register`  | `typedef`        |
| `case`     | `extern`            | `return`    | `union`          |
| `char`     | `float`             | `short`     | `unsigned`       |
| `const`    | `for`               | `signed`    | `void`           |
| `continue` | `goto`              | `sizeof`    | `volatile`       |
| `default`  | `if`                | `static`    | `while`          |
| `do`       | `int`               | `struct`    | `_Packed`        |
| `double`   | `protocol`          | `interface` | `implementation` |
| `NSObject` | `NSInteger`         | `NSNumber`  | `CGFloat`        |
| `property` | `nonatomic`         | `retain`    | `strong`         |
| `weak`     | `unsafe_unretained` | `readwrite` | `readonly`       |

#### Objective-C 空白格

只包含空格(可能带有注释)的行称为空行，而 Objective-C 编译器完全忽略它。

_Whitespace_ 是 Objective-C 中用于描述空格，制表符，换行符和注释的术语。空格将语句的一部分与另一部分分开，并使编译器能够识别语句中的一个元素(如`int`)的结束位置以及下一个元素的开始位置。 因此，在以下声明中 -

```objc
int age;
```

在`int`和`age`之间必须至少有一个空格字符(通常是空格)，以便编译器能够区分它们。 另一方面，在以下声明中，

```objc
fruit = apples + oranges;   // get the total fruit
```

`fruit`和`=`之间，或`=`和`apples`之间可以不需要加空白格字符，但如果希望出于可读性目的，可以自由添加一些空白字符。

## Objective-C 数据类型

在 Objective-C 编程语言中，数据类型是指用于声明不同类型的变量或函数的扩展系统。 变量的类型决定了它在存储中占用的空间大小以及如何解释存储的位模式。

Objective-C 中的类型可分为以下几类 -

| 编号 | 类型      | 描述                                                                      |
| ---- | --------- | ------------------------------------------------------------------------- |
| 1    | 基本类型  | 它们是算术类型，由两种类型组成：(a)整数类型和(b)浮点类型。                |
| 2    | 枚举类型  | 它们又是算术类型，用于定义只能在整个程序中分配某些离散整数值的变量。      |
| 3    | void 类型 | 类型说明符`void`表示没有可用的值。                                        |
| 4    | 派生类型  | 它们包括(a)指针类型，(b)数组类型，(c)结构类型，(d)联合类型和(e)函数类型。 |

数组类型和结构类型统称为聚合类型。 函数的类型指定函数返回值的类型。 我们将在下一节中看到基本类型，而其他类型将在后续章节中介绍。

#### 1. 整数类型

下表提供了有关标准整数类型的存储大小和值范围的详细信息 -

| 类型             | 存储大小    | 值范围                                                 |
| ---------------- | ----------- | ------------------------------------------------------ |
| `char`           | 1 字节      | `-128 ~ 127` 或 `0 ~ 255`                              |
| `unsigned char`  | 1 字节      | `0 ~ 255`                                              |
| `signed char`    | 1 字节      | `-128 ~ 127`                                           |
| `int`            | 2 或 4 字节 | `-32,768 ~ 32,767` 或 `-2,147,483,648 ~ 2,147,483,647` |
| `unsigned int`   | 2 或 4 字节 | `0 ~ 65,535` 或 `0 ~ 4,294,967,295`                    |
| `short`          | 2 字节      | `-32,768 ~ 32,767`                                     |
| `unsigned short` | 2 字节      | `0 ~ 65,535`                                           |
| `long`           | 4 字节      | `-2,147,483,648 ~ 2,147,483,647`                       |
| `unsigned long`  | 4 字节      | `0 ~ 4,294,967,295`                                    |

要在特定平台上获取类型或变量的确切大小，可以使用`sizeof`运算符。 表达式`sizeof(type)`产生对象或类型的存储大小(以字节为单位)。 以下是在任何机器上获取`int`类型大小的示例代码 -

```objc
#import <Foundation/Foundation.h>

int main() {
   NSLog(@"Storage size for int : %d \n", sizeof(int));
   return 0;
}


Objective
```

编译并执行上述程序时，它在 Linux 上生成以下结果 -

```shell
2018-11-14 01:03:20.930 main[118460] Storage size for int : 4


Shell
```

#### 2. 浮点类型

下表提供了有关标准浮点类型的存储大小和值范围及其精度的详细信息 -

| 类型          | 存储大小 | 值范围                  | 精度      |
| ------------- | -------- | ----------------------- | --------- |
| `float`       | 4 字节   | `1.2E-38 ~ 3.4E+38`     | 6 位小数  |
| `double`      | 8 字节   | `2.3E-308 ~ 1.7E+308`   | 15 位小数 |
| `long double` | 10 字节  | `3.4E-4932 ~ 1.1E+4932` | 19 位小数 |

头文件`float.h`定义了一些宏，可使用这些值以及有关程序中实数的二进制表示的其他详细信息。 以下示例将打印浮点类型占用的存储空间及其范围值 -

```objc
#import <Foundation/Foundation.h>

int main() {
   NSLog(@"Storage size for float : %d , maxval=%f \n", sizeof(float), FLT_MAX);
   return 0;
}


Objective
```

执行上面示例代码，得到以下结果：

```shell
2018-11-14 01:10:18.270 main[44023] Storage size for float : 4 , maxval=340282346638528859811704183484


Shell
```

注：有关 _float.h_ 中定义的一些宏如下所示 -

```c
#define FLT_DIG         6                       /* # of decimal digits of precision */
#define FLT_EPSILON     1.192092896e-07F        /* smallest such that 1.0+FLT_EPSILON != 1.0 */
#define FLT_GUARD       0
#define FLT_MANT_DIG    24                      /* # of bits in mantissa */
#define FLT_MAX         3.402823466e+38F        /* max value */
#define FLT_MAX_10_EXP  38                      /* max decimal exponent */
#define FLT_MAX_EXP     128                     /* max binary exponent */
#define FLT_MIN         1.175494351e-38F        /* min positive value */
#define FLT_MIN_10_EXP  (-37)                   /* min decimal exponent */
#define FLT_MIN_EXP     (-125)                  /* min binary exponent */
#define FLT_NORMALIZE   0
#define FLT_RADIX       2                       /* exponent radix */
#define FLT_ROUNDS      1                       /* addition rounding: near */


C
```

#### 3. void 类型

`void`类型指定没有可用的值。它用于以下两种情况 -

| 编号 | 类型 | 描述 |
| --- | --- | --- |
| 1 | 函数指定返回`void` | Objective-C 中有各种函数，它们不需要返回值，或者也可以说它们返回`void`。 没有返回值的函数的返回类型为`void`。 例如，`void exit(int status);` |
| 2 | 函数参数为`void` | Objective-C 中有各种函数不接受任何参数。没有参数的函数可以指示接受`void`类型。 例如，`int rand(void);` |

## Objective-C 变量

变量是程序可以操作的存储区域的名称。 Objective-C 中的每个变量都有一个特定的类型，它决定了变量内存的大小和布局; 可存储在内存中的值的范围; 以及可以应用于变量的操作集。

变量的名称可以由字母，数字和下划线(`_`)字符组成。 它必须以字母或下划线开头，它是区分大小写的，即：大写和小写字母是不同的变量。 根据前一章解释的基本类型，有以下几种基本变量类型 -

| 编号 | 类型     | 描述                                           |
| ---- | -------- | ---------------------------------------------- |
| 1    | `char`   | 通常它是一个八位(一个字节)，这是一个整数类型。 |
| 2    | `int`    | 机器最自然的整数大小，一般是 2 字节或 4 字节   |
| 3    | `float`  | 单精度浮点值。                                 |
| 4    | `double` | 双精度浮点值。                                 |
| 5    | `void`   | 表示不存在类型(什么类型也不是)                 |

Objective-C 编程语言还允许定义各种其他类型的变量，这些将在后续章节中介绍，其他类型如：枚举，指针，数组，结构，联合等。在本章中，只学习基本变量类型。

#### 1. Objective-C 变量定义

变量定义告诉编译器为变量创建存储的位置和数量。 变量定义指定数据类型，并包含该类型的一个或多个变量的列表，如下所示 -

```
type variable_list;
```

这里，`type`必须是有效的 Objective-C 数据类型，它包括：`char`，`w_char`，`int`，`float`，`double`，`bool`或任何用户定义的对象等，`variable_list`可以包含一个或多个用逗号分隔的标识符名称。下面显示了一些有效的声明 -

```objc
int    i, j, k;
char   c, ch;
float  f, salary;
double d;
```

第一行：`int i，j，k;`声明并定义变量`i`，`j`和`k`; 它指示编译器创建名为`i`，`j`和`k`的`int`类型变量。

变量可以在声明时初始化(分配初始值)。 初始化程序包含一个等号，后跟一个常量表达式，如下所示 -

```objc
type variable_name = value;
```

下面是变量声明的一些例子 -

```objc
extern int d = 3, f = 5;    // declaration of d and f.
int d = 3, f = 5;           // definition and initializing d and f.
byte z = 22;                // definition and initializes z.
char x = 'x';               // the variable x has the value 'x'.
```

对于没有初始化变量的定义：具有静态存储持续时间的变量用`NULL`隐式初始化(所有字节的值都为`0`); 所有其他变量的初始值未定义。

#### 2. Objective-C 变量声明

变量声明为编译器提供了保证，即存在一个具有给定类型和名称的变量，以便编译器继续进行进一步编译，而无需完整的变量详细信息。变量声明仅在编译时有意义，编译器在链接程序时需要实际的变量声明。

当使用多个文件并在其中一个文件中定义变量时，变量声明很有用，这些文件在链接程序时可用。 使用`extern`关键字在任何地方声明变量。 虽然可以在 Objective-C 程序中多次声明变量，但它只能在文件，函数或代码块中定义一次。

**示例** 尝试以下示例，变量已在顶部声明，但它们在主函数内定义和初始化 -

```objc
#import <Foundation/Foundation.h>

// Variable declaration:
extern int a, b;
extern int c;
extern float f;

int main () {
  /* variable definition: */
  int a, b;
  int c;
  float f;

  /* actual initialization */
  a = 10;
  b = 20;

  c = a + b;
  NSLog(@"value of c : %d \n", c);

  f = 80.0/3.0;
  NSLog(@"value of f : %f \n", f);

  return 0;
}
```

编译并执行上述代码时，它将产生以下结果 -

```shell
2018-11-14 01:44:55.382 main[141586] value of c : 30
2018-11-14 01:44:55.383 main[141586] value of f : 26.666666
```

同样的概念适用于函数声明，在声明时提供函数名称，并且可在其他任何位置给出其实际定义。 在下面的示例中，使用 C 函数进行了解释，Objective-C 也支持 C 样式函数 -

```objc
// 函数声明
int func();

int main() {
   // 调用函数
   int i = func();
}

// 函数定义
int func() {
   return 99;
}
```

#### 3. Objective-C 的左值和右值

Objective-C 中有两种表达式 -

- **左值** - 引用内存位置的表达式称为“左值”表达式。左值可以显示为赋值的左侧或右侧。
- **右值** - 术语右值是指存储在内存中某个地址的数据值。右值是一个不能赋值给它的表达式，这意味着右值可能出现在赋值的右边但不是左边。

变量是左值，因此可能出现在赋值的左侧。 数字文字是右值，因此无法分配，也不能出现在左侧。 以下是有效的声明 -

```objc
int g = 20;
```

但是以下不是有效的语句，会产生编译时错误 -

```objc
10 = 20;
```

## Objective-C 运算符

运算符是一个符号，告诉编译器执行特定的数学或逻辑操作。 Objective-C 语言内置很多运算符，提供如下类型的运算符 -

- 算术运算符
- 关系运算符
- 逻辑运算符
- 按位运算符
- 分配运算符
- 其它运算符

本教程将逐一解释算术，关系，逻辑，按位，赋值和其他运算符。

#### 1. 算术运算符

下表显示了 Objective-C 语言支持的所有算术运算符。 假设变量`A=10`，变量`B=20`，则 -

| 运算符 | 描述                         | 示例              |
| ------ | ---------------------------- | ----------------- |
| `+`    | 两个操作数相加               | `A + B = 30`      |
| `-`    | 从第一个减去第二个操作数     | `A - B = -10`     |
| `*`    | 两个操作数相乘               | `A * B = 200`     |
| `/`    | 分子除以分母                 | `B / A = 2`       |
| `%`    | 模数运算符，整数除法后的余数 | `B % A = 0`       |
| `++`   | 递增运算符，将整数值增加`1`  | `A++`，结果为`11` |
| `--`   | 递减运算符，将整数值减`1`    | `A--`，结果为`9`  |

[算术运算符示例](https://www.yiibai.com/objective_c/objective_c_arithmetic_operators.html)

#### 2. 关系运算符

下表显示了 Objective-C 语言支持的所有关系运算符。假设变量`A=10`，变量`B=20`，则 -

| 运算符 | 描述                                                           | 示例                      |
| ------ | -------------------------------------------------------------- | ------------------------- |
| `==`   | 比较两个操作数的值是否相等; 如果相等，则条件成立。             | `(A == B)`结果为：`false` |
| `!=`   | 比较两个操作数的值是否相等; 如果不相等，则条件成立。           | `(A != B)`结果为：`true`  |
| `>`    | 比较左操作数的值是否大于右操作数的值; 如果是，则条件成立。     | `(A > B)`结果为：`false`  |
| `<`    | 比较左操作数的值是否小于右操作数的值; 如果是，则条件成立。     | `(A < B)`结果为：`true`   |
| `>=`   | 比较左操作数的值是否大于等于右操作数的值; 如果是，则条件成立。 | `(A >= B)`结果为：`false` |
| `<=`   | 比较左操作数的值是否小于等于右操作数的值; 如果是，则条件成立。 | `(A <= B)`结果为：`true`  |

[关系运算符示例](#Objective-C关系运算符)

##### Objective-C 关系运算符

下表显示了 Objective-C 语言支持的所有关系运算符。假设变量`A=10`，变量`B=20`，则 -

| 运算符 | 描述                                                           | 示例                      |
| ------ | -------------------------------------------------------------- | ------------------------- |
| `==`   | 比较两个操作数的值是否相等; 如果相等，则条件成立。             | `(A == B)`结果为：`false` |
| `!=`   | 比较两个操作数的值是否相等; 如果不相等，则条件成立。           | `(A != B)`结果为：`true`  |
| `>`    | 比较左操作数的值是否大于右操作数的值; 如果是，则条件成立。     | `(A > B)`结果为：`false`  |
| `<`    | 比较左操作数的值是否小于右操作数的值; 如果是，则条件成立。     | `(A < B)`结果为：`true`   |
| `>=`   | 比较左操作数的值是否大于等于右操作数的值; 如果是，则条件成立。 | `(A >= B)`结果为：`false` |
| `<=`   | 比较左操作数的值是否小于等于右操作数的值; 如果是，则条件成立。 | `(A <= B)`结果为：`true`  |

##### 例子

尝试以下示例来了解 Objective-C 编程语言中可用的所有关系运算符 -

```objc
 Live Demo
#import <Foundation/Foundation.h>

int main() {
   int a = 21;
   int b = 10;

   if( a == b ) {
      NSLog(@"Line 1 - a is equal to b\n" );
   } else {
      NSLog(@"Line 1 - a is not equal to b\n" );
   }

   if ( a < b ) {
      NSLog(@"Line 2 - a is less than b\n" );
   } else {
      NSLog(@"Line 2 - a is not less than b\n" );
   }

   if ( a > b ) {
      NSLog(@"Line 3 - a is greater than b\n" );
   } else {
      NSLog(@"Line 3 - a is not greater than b\n" );
   }

   /* Lets change value of a and b */
   a = 5;
   b = 20;

   if ( a <= b ) {
      NSLog(@"Line 4 - a is either less than or equal to  b\n" );
   }

   if ( b >= a ) {
      NSLog(@"Line 5 - b is either greater than  or equal to b\n" );
   }
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-14 05:01:20.415 main[49282] Line 1 - a is not equal to b
2018-11-14 05:01:20.417 main[49282] Line 2 - a is not less than b
2018-11-14 05:01:20.417 main[49282] Line 3 - a is greater than b
2018-11-14 05:01:20.417 main[49282] Line 4 - a is either less than or equal to  b
2018-11-14 05:01:20.417 main[49282] Line 5 - b is either greater than  or equal to b
```

#### 3. 逻辑运算符

下表显示了 Objective-C 语言支持的所有逻辑运算符。 假设变量`A=1`，而变量`B=0`，则 -

| 运算符 | 描述 | 示例 |
| --- | --- | --- |
| `&&` | 逻辑“与”运算符。 如果两个操作数都不为零，则条件成立。 | `(A && B)`结果为：`false` |
| ΙΙ | 逻辑“或”运算符。如果两个操作数中的任何一个不为零，则条件变为`true`。 | (A ΙΙ B)结果为：`true` |
| `!` | 逻辑“非”运算符。 用于反转其操作数的逻辑状态。 如果条件为`true`，则逻辑“非”运算符后将为`false`。 | `!(A && B)`结果为：`true` |

[逻辑运算符示例](https://www.yiibai.com/objective_c/objective_c_logical_operators.html)

#### 4. 按位运算符

按位运算符处理位并执行逐位运算。 `＆`，`|`和`^`的真值表如下 -

![img](https://www.yiibai.com/uploads/images/2018/11/14/105238_43032.png)

假设`A = 60`和`B = 13`，现在以二进制格式，它们按位运算将如下 -

```
A = 0011 1100

B = 0000 1101

-----------------

A&B = 0000 1100

A|B = 0011 1101

A^B = 0011 0001

~A  = 1100 0011
```

Objective-C 语言支持按位运算符。假设变量`A=60`，变量`B=13`，如下表所示 -

| 运算符 | 描述 | 示例 |
| --- | --- | --- |
| `&` | 二进制 AND 运算符，如果两个操作数同位上存在`1`，则它会将结果复制到结果中。 | `(A & B) = 12`, 也就是：`0000 1100` |
| Ι | 二进制 OR 运算符，如果存在于任一操作数中，则复制`1`位。 | (A Ι B) = 12 , 也就是：`0011 1101` |
| `^` | 二进制异或运算符，如果在一个操作数中设置，但不在两个操作数中设置，则复制该位。 | `(A ^ B) = 49`, 也就是：`0011 0001` |
| `~` | 二元补语运算符是一元的，具有“翻转”位的效果。 | `(~A )`结果为：`-61`, 也就是：`1100 0011` |
| `<<` | 二进制左移运算符。左操作数值向左移动右操作数指定的位数。 | `A << 2 = 240`, 也就是：`1111 0000` |
| `>>` | 二进制右移运算符。左操作数值向右移动右操作数指定的位数。 | `A >> 2 = 15`, 也就是：`0000 1111` |

[按位运算符示例](https://www.yiibai.com/objective_c/objective_c_bitwise_operators.html)

#### 5. 赋值运算符

Objective-C 语言支持以下赋值运算符 -

| 运算符 | 描述                                                               | 示例                                |
| ------ | ------------------------------------------------------------------ | ----------------------------------- |
| `=`    | 简单赋值运算符，将右侧操作数的值分配给左侧操作数                   | `C = A + B`是将`A + B`的值分配给`C` |
| `+=`   | 相加和赋值运算符，它将右操作数添加到左操作数并将结果赋给左操作数   | `C += A` 相当于 `C = C + A`         |
| `-=`   | 相减和赋值运算符，它从左操作数中减去右操作数，并将结果赋给左操作数 | `C -= A` 相当于 `C = C - A`         |
| `*=`   | 相乘和赋值运算符，它将右操作数与左操作数相乘，并将结果赋给左操作数 | `C *= A` 相当于 `C = C * A`         |
| `/=`   | 除以和赋值运算符，它将左操作数除以右操作数，并将结果赋给左操作数   | `C /= A` 相当于 `C = C / A`         |
| `%=`   | 模数和赋值运算符，它使用两个操作数获取模数，并将结果赋给左操作数   | `C %= A` 相当于 `C = C % A`         |
| `<<=`  | 左移和赋值运算符                                                   | `C <<= 2` 相当于 `C = C << 2`       |
| `>>=`  | 右移和赋值运算符                                                   | `C >>= 2` 相当于 `C = C >> 2`       |
| `&=`   | 按位并赋值运算符                                                   | `C &= 2` 相当于 `C = C & 2`         |
| `^=`   | 按位异或和赋值运算符                                               | `C ^= 2` 相当于 `C = C ^ 2`         |
| Ι      | 按位包含 OR 和赋值运算符                                           | C Ι= 2 相当于 C = C Ι 2             |

[赋值运算符示例](https://www.yiibai.com/objective_c/objective_c_assignment_operators.html)

#### 6. 其他运算符：sizeof 和三元运算符

还有其他一些重要的运算符，包括`sizeof`和`?:`三元运算符，Objective-C 语言也都支持。

| 运算符     | 描述             | 示例                                                |
| ---------- | ---------------- | --------------------------------------------------- |
| `sizeof()` | 返回变量的大小   | `sizeof(a)`, 这里如果变量`a`是整数，则将返回：`4`。 |
| `&`        | 返回变量的地址。 | `&a`将返回变量的实际地址。                          |
| `*`        | 指向变量的指针。 | `*a`将指向变量。                                    |
| `? :`      | 条件表达式       | 如果条件为真？然后是`X`值：否则为`Y`值              |

[sizeof 和三元运算符示例](https://www.yiibai.com/objective_c/objective_c_sizeof_operator.html)

#### Objective-C 运算符优先级

运算符优先级确定表达式中的术语分组。这会影响表达式的计算方式。 某些运算符优先级高于其他运算符; 例如，乘法运算符的优先级高于加法运算符 -

例如，`x = 7 + 3 * 2`; 这里，`x`被赋值为`13`，而不是`20`，因为 `*`运算符的优先级高于`+`运算符，所以它首先乘以`3 * 2`然后加上`7`。

此处，具有最高优先级的运算符显示在下表的顶部，具有最低优先级的运算符显示在下表底部。 在表达式中，将首先评估更高优先级的运算符。

| 分类     | 运算符                                                | 关联性 |
| -------- | ----------------------------------------------------- | ------ |
| 后缀     | `()` `[]` `->` `.` `++` `--`                          | 左到右 |
| 一元     | `+` `-` `!` `~` `++` `--` `(type)*` `&` `sizeof`      | 右到左 |
| 相乘     | `*` `/` `%`                                           | 左到右 |
| 相加     | `+` `-`                                               | 左到右 |
| 位移     | `<<` `>>`                                             | 左到右 |
| 关系     | `<` `<=` `>` `>=`                                     | 左到右 |
| 相等     | `==` `!=`                                             | 左到右 |
| 按位 XOR | `^`                                                   | 左到右 |
| 按位 OR  | Ι                                                     | 左到右 |
| 逻辑 AND | `&&`                                                  | 左到右 |
| 逻辑 OR  | ΙΙ                                                    | 左到右 |
| 条件     | `?:`                                                  | 右到左 |
| 分配     | `=` `+=` `-=` `*=` `/=` `%=` `>>=` `<<=` `&=` `^=` Ι= | 右到左 |
| 逗号     | `,`                                                   | 左到右 |

## Objective-C 循环

当需要多次执行同一代码块时，可以使用循环来解决。 通常，语句按顺序执行：首先执行函数中的第一个语句，然后执行第二个语句，依此类推。 编程语言提供各种控制结构，允许更复杂的执行路径。循环语句可用于多次执行语句或语句组，以下是大多数编程语言中循环语句的一般形式 -

![img](https://static.yoouu.cn/static/imgs/doc/front-end/ios/135032_34890.jpg)

Objective-C 编程语言提供以下类型的循环来处理循环需求。单击以下相应链接来查看其详细信息。

| 编号 | 循环类型 | 描述 |
| --- | --- | --- |
| 1 | [while 循环](https://www.yiibai.com/objective_c/objective_c_while_loop.html) | 在给定条件为真时重复语句或语句组，它在执行循环体之前测试条件。 |
| 2 | [for 循环](https://www.yiibai.com/objective_c/objective_c_for_loop.html) | 多次执行一系列语句，并缩写管理循环变量的代码。 |
| 3 | [do…while 循环](https://www.yiibai.com/objective_c/objective_c_do_while_loop.html) | 像`while`循环语句一样，但它在循环体的末尾测试条件。 |
| 4 | [嵌套循环](https://www.yiibai.com/objective_c/objective_c_nested_loops.html) | 在任何其他循环内使用一个或多个循环，`while`，`for`或`do...while`循环。 |

#### 1. 循环控制语句

循环控制语句将执行从其正常序列更改。 当执行离开作用域时，将销毁在该作用域中创建的所有自动对象。

Objective-C 支持以下控制语句，单击以下链接以查看其详细信息。

| 编号 | 控制语句 | 描述 |
| --- | --- | --- |
| 1 | [break 语句](https://www.yiibai.com/objective_c/objective_c_break_statement.html) | 用来终止循环或`switch`语句，并在循环或切换后立即将执行转移到语句。 |
| 2 | [continue 语句](https://www.yiibai.com/objective_c/objective_c_continue_statement.html) | 导致循环跳过其主体的其余部分，并在重复之前立即重新测试其状态。 |

#### 2. 无限循环

如果条件永远不会变为假，则循环变为无限循环。`for`循环传统上用于此目的。 由于不需要构成`for`循环的三个表达式，因此可以通过将条件表达式留空来创建无限循环。

```objc
#import <Foundation/Foundation.h>

int main () {

   for( ; ; ) {
      NSLog(@"This loop will run forever.\n");
   }

   return 0;
}
```

当条件表达式不存在时，程序假定条件为真。可选有一个初始化和增量表达式，但 Objective-C 程序员更常使用`for(;;)`构造来表示无限循环。

## Objective-C 决策

决策结构要求程序员指定一个或多个要由程序评估或测试的条件，以及在条件被确定为真时要执行的一个或多个语句，以及可选的，如果条件要执行的其他语句 被认定是假的。

以下是大多数编程语言中的典型决策结构的一般形式 - ![img](https://static.yoouu.cn/static/imgs/doc/front-end/ios/154849_75071.jpg)

Objective-C 编程语言将任何非零和非`null`假定为`true`，如果它为零或`null`，则将其假定为`false`。 Objective-C 编程语言提供以下类型的决策制定语句。 单击以下链接查看其详细信息 -

| 编号 | 语句 | 描述 |
| --- | --- | --- |
| 1 | [if 语句](https://www.yiibai.com/objective_c/if_statement_in_objective_c.html) | `if`语句是由布尔表达式后跟一个或多个语句组成。 |
| 2 | [if…else 语句](https://www.yiibai.com/objective_c/if_else_statement_in_objective_c.html) | `if`语句后面可以跟一个可选的`else`语句，该语句在 if 布尔条件表达式为`false`时执行。 |
| 3 | [嵌套 if 语句](https://www.yiibai.com/objective_c/nested_if_statements_in_objective_c.html) | 在一个`if`或`else if`语句中可使用`if`或`else if`语句。 |
| 4 | [switch 语句](https://www.yiibai.com/objective_c/switch_statement_in_objective_c.html) | `switch`语句用于测试变量与值列表的相等性。 |
| 5 | [嵌套 switch 语句](https://www.yiibai.com/objective_c/nested_switch_statements_in_objective_c.html) | 在一个`switch`语句中使用一个`switch`语句。 |

#### ?:运算符

前面我们讲过了条件运算符`?:`，条件运算符可以用来替换`if...else`语句。它的一般形式如下 -

```objc
Exp1 ? Exp2 : Exp3;
```

`Exp1`，`Exp2`和`Exp3`都是表达式。 注意冒号的使用和放置。

`?`表达式的确定方式如下：评估`Exp1`。 如果结果为`true`，那么`Exp2`会被评估并成为整个值`?`表达式的值。 如果`Exp1`评估为`false`，则计算`Exp3`，`Exp3`的结果值将成为表达式的值。

## Objective-C 函数

函数是一组一起执行任务的语句。 每个 Objective-C 程序都有一个 C 函数，也就是`main()`函数，所有最简单的程序都可以定义为函数。

可将代码划分为单独的函数。如何在不同的函数之间划分代码取决于程序员，但逻辑上这个划分通常是这样，每个函数执行一个特定的任务。

函数声明告诉编译器函数的名称，返回类型和参数。 函数定义提供函数的实际主体。

在 Objective-C 中，基本上会将函数称为方法。

Objective-C 基础框架提供了程序可以调用的许多内置方法。 例如，`appendString()`方法将字符串附加到另一个字符串。已知一种方法具有各种名称，如函数或子程序或程序等。

#### 1. 定义方法

Objective-C 编程语言中方法定义的一般形式如下 -

```objc
- (return_type) method_name:( argumentType1 )argumentName1
    joiningArgument2:( argumentType2 )argumentName2 ...
    joiningArgumentn:( argumentTypen )argumentNamen {
    body of the function
}
```

Objective-C 编程语言中的方法定义由方法头和方法体组成。 以下是方法的所有部分 -

- **返回类型** - 方法可以返回值。`return_type`是函数返回的值的数据类型。 某些方法执行所需的操作而不返回值。 在这种情况下，`return_type`是关键字`void`。
- **方法名称** - 这是方法的实际名称。方法名称和参数列表一起构成方法签名。
- **参数** - 参数就像一个占位符。调用函数时，将值传递给参数。该值称为实际参数或参数。参数列表指的是方法的参数的类型，顺序和数量。 参数是可选的; 也就是说，方法可能不包含任何参数。
- **连接参数** - 一个连接的参数是让它更易于阅读并在调用时清楚地表达它。
- **方法体** - 方法体包含一组语句，用于定义方法的作用。

**示例** 以下是名为`max()`的方法的源代码。 这个方法有两个参数`num1`和`num2`，并返回两个参数的最大值 -

```objc
/* 返回两个参数的最大值 */
- (int) max:(int) num1 secondNumber:(int) num2 {

   /* 局部变量声明 */
   int result;

   if (num1 > num2) {
      result = num1;
   } else {
      result = num2;
   }

   return result;
}
```

#### 2. 方法声明

方法声明告诉编译器有关函数名称以及如何调用该方法的信息。 函数的实际主体可以单独定义。

方法声明包含以下部分 -

```objc
- (return_type) function_name:( argumentType1 )argumentName1
joiningArgument2:( argumentType2 )argumentName2 ...
joiningArgumentn:( argumentTypen )argumentNamen;
```

对于上面定义的`max()`函数，以下是方法声明 -

```objc
-(int) max:(int)num1 andNum2:(int)num2;
```

在一个源文件中定义方法并在另一个文件中调用该方法时，需要方法声明。 在这种情况下，应该在调用该函数的文件顶部声明该函数。

#### 3. 调用方法

在创建 Objective-C 方法时，可以定义函数必须执行的操作。 要使用方法，必须调用该函数来执行定义的任务。当程序调用函数时，程序控制将转移到被调用的方法。 被调用的方法执行已定义的任务，当执行其返回语句或达到其函数结束右括号时，它将程序控制返回给主程序。要调用方法，只需要传递必需的参数和方法名称，如果方法返回值，则可以存储返回的值。 例如 -

```objc
#import <Foundation/Foundation.h>

@interface SampleClass:NSObject
/* 方法声明 */
- (int)max:(int)num1 andNum2:(int)num2;
@end

@implementation SampleClass

/* 返回两个数的最大值 */
- (int)max:(int)num1 andNum2:(int)num2 {

   /* 声明局部变量 */
   int result;

   if (num1 > num2) {
      result = num1;
   } else {
      result = num2;
   }

   return result;
}

@end

int main () {

   /* 定义局部变量 */
   int a = 119;
   int b = 199;
   int ret;

   SampleClass *sampleClass = [[SampleClass alloc]init];

   /* 调用方法来获取最大值 */
   ret = [sampleClass max:a andNum2:b];

   NSLog(@"Max value is : %d\n", ret );
   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 01:18:49.962 main[43680] Max value is : 199
```

#### 4. 函数参数

这些变量称为函数的形式参数。形式参数的行为与函数内部的其他局部变量相似，并在进入函数时创建，并在退出时销毁。在调用函数时，有两种方法可以将参数传递给函数 -

| 编号 | 调用类型 | 描述 |
| --- | --- | --- |
| 1 | [按值调用](https://www.yiibai.com/objective_c/objective_c_function_call_by_value.html) | 此方法将参数的实际值复制到函数的形式参数中。在这种情况中，对函数内部参数所做的更改不会对参数产生影响。 |
| 2 | [按引用调用](https://www.yiibai.com/objective_c/objective_c_function_call_by_reference.html) | 此方法将参数的地址复制到形式参数中。在函数内部，该地址用于访问调用中使用的实际参数。对参数所做的更改会影响参数。 |

默认情况下，Objective-C 使用**按值调用**来传递参数。 所以函数内的代码改变用于调用函数的参数不会反应到函数外部，而上述示例在调用`max()`函数时使用相同的方法。

## Objective-C 块

Objective-C 类定义了一个将数据与相关行为相结合的对象。 有时，仅表示单个任务或行为单元而不是方法集合是有意义的。

块是 C，Objective-C 和 C++等编程语言中的高级功能，它允许创建不同的代码段，这些代码段可以传递给方法或函数，就像它们是值一样。 块是 Objective-C 对象，因此它们可以添加到`NSArray`或`NSDictionary`等集合中。 它们还能够从封闭范围中捕获值，使其类似于其他编程语言中的闭包或`lambda`。

**简单块声明语法**

```objc
returntype (^blockName)(argumentType);
```

简单的块实现 -

```objc
returntype (^blockName)(argumentType)= ^{
};
```

下面是一个简单的示例代码 -

```objc
void (^simpleBlock)(void) = ^{
   NSLog(@"This is a block");
};
```

调用上面块的示例代码 -

```objc
simpleBlock();
```

#### 块接受参数和返回值

块也可以像方法和函数一样获取参数和返回值。下面是一个使用参数和返回值实现和调用块的简单示例。

```objc
double (^multiplyTwoValues)(double, double) =
   ^(double firstValue, double secondValue) {
      return firstValue * secondValue;
   };

double result = multiplyTwoValues(2,4);
NSLog(@"The result is %f", result);
```

#### 使用类型定义块

这是一个在块中使用`typedef`的简单示例。 请注意，此示例不适用于在线编译器。 它是使用 XCode 运行的。

```objc
#import <Foundation/Foundation.h>

typedef void (^CompletionBlock)();
@interface SampleClass:NSObject
- (void)performActionWithCompletion:(CompletionBlock)completionBlock;
@end

@implementation SampleClass

- (void)performActionWithCompletion:(CompletionBlock)completionBlock {

   NSLog(@"Action Performed");
   completionBlock();
}

@end

int main() {

   /* 第一个Objective-C程序 */
   SampleClass *sampleClass = [[SampleClass alloc]init];
   [sampleClass performActionWithCompletion:^{
      NSLog(@"Completion is called to intimate action is performed.");
   }];

   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-10 08:14:57.105 demo[184:323] Action Performed
2018-11-10 08:14:57.108 demo[184:323] Completion is called to intimate action is performed.
```

块在 iOS 应用程序和 Mac OS X 中使用得更多。因此，了解块的用法更为重要。

## Objective-C 数字

在 Objective-C 编程语言中，要以对象形式保存基本数据类型，如：`int`，`float`，`bool`。Objective-C 提供了一系列与`NSNumber`一起使用的方法，一些常用重要的方法列在下表中。

| 编号 | 方法 | 描述 |
| --- | --- | --- |
| 1 | `+ (NSNumber *)numberWithBool:(BOOL)value` | 创建并返回包含给定值的`NSNumber`对象，将其视为`BOOL`。 |
| 2 | `+ (NSNumber *)numberWithChar:(char)value` | 创建并返回包含给定值的`NSNumber`对象，将其视为`signed char`。 |
| 3 | `+ (NSNumber *)numberWithDouble:(double)value` | 创建并返回包含给定值的`NSNumber`对象，将其视为`double`。 |
| 4 | `+ (NSNumber *)numberWithFloat:(float)value` | 创建并返回包含给定值的`NSNumber`对象，将其视为`float`。 |
| 5 | `+ (NSNumber *)numberWithInt:(int)value` | 创建并返回包含给定值的`NSNumber`对象，将其视为`signed int`。 |
| 6 | `+ (NSNumber *)numberWithInteger:(NSInteger)value` | 创建并返回包含给定值的`NSNumber`对象，将其视为`NSInteger`。 |
| 7 | `- (BOOL)boolValue` | 以`BOOL`形式返回接收的值。 |
| 8 | `- (char)charValue` | 以`char`形式返回接收的值。 |
| 9 | `- (double)doubleValue` | 以`double`形式返回接收的值。 |
| 10 | `- (float)floatValue` | 以`float`形式返回接收的值。 |
| 11 | `- (NSInteger)integerValue` | 将接收的值作为`NSInteger`返回。 |
| 12 | `- (int)intValue` | 以`int`形式返回接收的值。 |
| 13 | `- (NSString *)stringValue` | 将接收的值作为人类可读的字符串形式返回。 |

下面是一个使用`NSNumber`的简单示例，它将两个数的乘积返回。

```objc
#import <Foundation/Foundation.h>

@interface SampleClass:NSObject
- (NSNumber *)multiplyA:(NSNumber *)a withB:(NSNumber *)b;
@end

@implementation SampleClass

- (NSNumber *)multiplyA:(NSNumber *)a withB:(NSNumber *)b {
   float number1 = [a floatValue];
   float number2 = [b floatValue];
   float product = number1 * number2;
   NSNumber *result = [NSNumber numberWithFloat:product];
   return result;
}

@end

int main() {
   NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

   SampleClass *sampleClass = [[SampleClass alloc]init];
   NSNumber *a = [NSNumber numberWithFloat:10.5];
   NSNumber *b = [NSNumber numberWithFloat:10.0];
   NSNumber *result = [sampleClass multiplyA:a withB:b];
   NSString *resultString = [result stringValue];
   NSLog(@"The product is %@",resultString);

   [pool drain];
   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 02:16:26.277 main[43604] The product is 105
```

## Objective-C 数组

Objective-C 编程语言提供了一种叫作数组的数据结构，它可以存储相同类型的固定大小顺序元素的集合。数组用于存储数据集合，但将数组视为相同类型的变量集合通常更有用。

可以声明一个数组变量(例如`numbers`)并使用`numbers[0]`，`numbers[1]`和`...`，`numbers[99]`来表示单个变量，例如：`number0`，`number1`，`...`和`number99`，而不是声明单个变量。 使用索引来访问数组中的特定元素。

所有数组都包含连续的内存位置。 最低地址对应于第一个元素，最高地址对应于最后一个元素。

![img](https://static.yoouu.cn/static/imgs/doc/front-end/ios/102413_69680.jpg)

#### 1. 声明数组

在 Objective-C 中声明一个数组，程序员需要指定元素的类型和数组所需的元素数量，如下所示 -

```objc
type arrayName [ arraySize ];
```

这称为一维数组。 `arraySize`必须是大于零的整数常量，`type`可以是任何有效的 Objective-C 数据类型。 例如，要声明一个名称为`balance`的`double`类型的`10`元素数组，请使用此语句 -

```objc
double balance[10];
```

现在，`balance`是一个变量数组，最多可容纳`10`个`double`类型。

#### 2. 初始化数组

可以逐个初始化 Objective-C 中的数组，也可以使用单个语句，如下所示 -

```objc
double balance[5] = {1000.0, 2.0, 3.4, 17.0, 50.0};
```

大括号`{}`之间的值的数量不能大于在方括号`[]`之间为数组声明的元素的数量。以下是分配数组的单个元素的示例 - 如果省略数组的大小，则会创建一个足以容纳初始化的数组。 因此，如果这样写 -

```objc
double balance[] = {1000.0, 2.0, 3.4, 17.0, 50.0};
```

这将创建与上一示例中完全相同的数组。

```objc
balance[4] = 50.0;
```

上面的语句将数组中的第`5`元素赋值为`50.0`。 具有第四个索引的数组它拥有`5`个元素，因为所有数组都将`0`作为第一个元素的索引，也称为基本索引。 以下是上面讨论的相同数组的图形表示 -

![img](https://static.yoouu.cn/static/imgs/doc/front-end/ios/103351_77103.jpg)

#### 3. 访问数组元素

通过索引数组名称来访问元素。通过将元素的索引放在数组名称后面的方括号中来完成的。 例如 -

```objc
double salary = balance[9];
```

上面的语句将从数组中取出第`10`个元素，并将值赋给`salary`变量。 以下是一个例子，它将使用上述所有三个概念，即数组声明，分配和访问数组 -

```objc
#import <Foundation/Foundation.h>

int main () {
   int n[ 10 ];   /* n 是10个整数的数组 */
   int i,j;

   /* 从 n 到 0 初始化数组的值 */
   for ( i = 0; i < 10; i++ ) {
      n[ i ] = i + 100;    /* 从i 至 i + 100 设置数组元素的值  */
   }

   /* 输出每个数组元素的值 */
   for (j = 0; j < 10; j++ ) {
      NSLog(@"Element[%d] = %d\n", j, n[j] );
   }

   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 02:52:00.725 main[97171] Element[0] = 100
2018-11-15 02:52:00.727 main[97171] Element[1] = 101
2018-11-15 02:52:00.727 main[97171] Element[2] = 102
2018-11-15 02:52:00.727 main[97171] Element[3] = 103
2018-11-15 02:52:00.728 main[97171] Element[4] = 104
2018-11-15 02:52:00.728 main[97171] Element[5] = 105
2018-11-15 02:52:00.728 main[97171] Element[6] = 106
2018-11-15 02:52:00.728 main[97171] Element[7] = 107
2018-11-15 02:52:00.728 main[97171] Element[8] = 108
2018-11-15 02:52:00.728 main[97171] Element[9] = 109
```

#### 4. Objective-C 数组详细介绍

数组对 Objective-C 很重要，需要更多细节。 以下几个与数组相关的重要概念应该对 Objective-C 程序员清楚 -

| 编号 | 概念 | 描述 |
| --- | --- | --- |
| 1 | [多维数组](https://www.yiibai.com/objective_c/objective_c_multi_dimensional_arrays.html) | Objective-C 支持多维数组，多维数组的最简单形式是二维数组。 |
| 2 | [将数组传递给函数](https://www.yiibai.com/objective_c/objective_c_passing_arrays_to_functions.html) | 通过指定不带索引的数组名称来向函数传递指向数组的指针。 |
| 3 | [从函数返回数组](https://www.yiibai.com/objective_c/objective_c_return_arrays_from_function.html) | Objective-C 允许函数返回一个数组。 |
| 4 | [指向数组的指针](https://www.yiibai.com/objective_c/objective_c_pointer_to_an_array.html) | 只需指定数组名称即可生成指向数组第一个元素的指针，而无需任何索引。 |

## Objective-C 指针

Objective-C 中的指针简单易学。使用指针可以更轻松地执行某些 Objective-C 编程任务，并且在不使用指针的情况下无法执行其他任务(如动态内存分配)。 所以有必要学习指向成为一个完美的 Objective-C 程序员。在这小节中将通过简单的步骤学习指针。

每个变量都是一个内存位置，每个内存位置都定义了它的地址，可以使用符号(`&`)运算符进行访问，该运算符表示内存中的地址。 考虑以下示例，它将打印定义的变量的地址 -

```objc
#import <Foundation/Foundation.h>

int main () {
   int  var1;
   char var2[10];

   NSLog(@"Address of var1 variable: %x\n", &var1 );
   NSLog(@"Address of var2 variable: %x\n", &var2 );

   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 03:56:08.348 main[108988] Address of var1 variable: fe8568c0
2018-11-15 03:56:08.351 main[108988] Address of var2 variable: fe8568c6
```

通过上面代码，了解了什么是内存地址以及如何访问它，到此，概念的基础知识已经结束。 接下来看看什么是指针。

#### 1. 指针是什么？

指针是一个变量，它的值是另一个变量的地址，即存储单元的直接地址。 与任何变量或常量一样，必须先声明指针，然后才能使用它来存储任何变量地址。 指针变量声明的一般形式是 -

```c
type *var_name;
```

这里，`type`是指针的基类型; 它必须是有效的 Objective-C 数据类型，`var_name`是指针变量的名称。 用于声明指针的星号`*`与用于乘法的星号相同。 但是，在此语句中，星号用于将变量指定为指针。以下是有效的指针声明 -

```c
int    *ip;    /* 指向 int 类型的指针 */
double *dp;    /* 指向 double 类型的指针 */
float  *fp;    /* 指向 float 类型的指针 */
char   *ch     /* 指向 char 类型的指针 */
```

所有指针的值是实际数据类型的地址值，无论是整数，浮点数，字符还是其他，都是相同的，是表示内存地址的长十六进制数。 不同数据类型的指针之间的唯一区别是指针指向的变量或常量的数据类型。

#### 2. 如何使用指针？

有一些重要的操作，经常在指针的帮助下完成。使用指针的步骤如下 -

- 定义一个指针变量，
- 将变量的地址赋给指针，
- 最后访问指针变量中可用地址的值。

这是通过使用一元运算符`*`来完成的，该运算符`*`返回位于操作数指定的地址处的变量值。以下示例使用这些操作 -

```objc
#import <Foundation/Foundation.h>

int main () {
   int  var = 20;    /* 变量定义 */
   int  *ip;         /* 指针变量声明 */
   ip = &var;       /* 在指针变量中存储 var 的地址*/

   NSLog(@"Address of var variable: %x\n", &var  );

   /* 存储在指针变量中的地址 */
   NSLog(@"Address stored in ip variable: %x\n", ip );

   /* 使用指针访问该值 */
   NSLog(@"Value of *ip variable: %d\n", *ip );

   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 04:05:36.179 main[80041] Address of var variable: 23bea2dc
2018-11-15 04:05:36.183 main[80041] Address stored in ip variable: 23bea2dc
2018-11-15 04:05:36.183 main[80041] Value of *ip variable: 20
```

#### 3. Objective-C NULL 指针

如果没有要分配的确切地址，最好将`NULL`值分配给指针变量。这是在变量声明时完成的。 指定为`NULL`的指针称为空指针。

`NULL`指针是一个常量，在几个标准库中定义了零值。参考以下程序 -

```objc
#import <Foundation/Foundation.h>

int main () {
   int  *ptr = NULL;
   NSLog(@"The value of ptr is : %x\n", ptr  );
   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 04:26:24.203 main[40259] The value of ptr is : 0
```

在大多数操作系统上，程序不允许访问地址`0`处的内存，因为该内存是由操作系统保留的。 但是，存储器地址`0`具有特殊意义; 它表示指针不是指向可访问的内存位置。 但按照惯例，如果指针包含`null`(零)值，则假定它不指向内容。

要检查空指针，可以使用`if`语句，如下所示 -

```objc
if(ptr)     /* 如果p不为null，则成立 */
if(!ptr)    /* 如果p为null，则成立 */
```

#### 4. Objective-C 指针详解

指针有许多但很简单的概念，它们对 Objective-C 编程非常重要。以下几个重要的指针概念，对于 Objective-C 程序员来说应该要清楚 -

| 编号 | 概念 | 描述 |
| --- | --- | --- |
| 1 | [Objective-C 指针运算](https://www.yiibai.com/objective_c/objective_c_pointer_arithmetic.html) | 在指针上使用四个算术运算符：`++`，`--` ，`+`，`-` |
| 2 | [Objective-C 指针数组](https://www.yiibai.com/objective_c/objective_c_array_of_pointers.html) | 可以定义数组以包含许多指针 |
| 3 | [Objective-C 指针的指针](https://www.yiibai.com/objective_c/objective_c_pointer_to_pointer.html) | Objective-C 允许有指向指针的指针 |
| 4 | [Objective-C 将指针传递给函数](https://www.yiibai.com/objective_c/objective_c_passing_pointers_to_functions.html) | 通过引用或地址传递参数都可以在调用函数中更改传递的参数。 |
| 5 | [Objective-C 从函数返回指针](https://www.yiibai.com/objective_c/objective_c_return_pointer_from_functions.html) | Objective-C 允许函数返回指向局部变量，静态变量和动态分配内存的指针。 |

## Objective-C 字符串

Objective-C 编程语言中的字符串使用`NSString`表示，其子类`NSMutableString`提供了几种创建字符串对象的方法。 创建字符串对象的最简单方法是使用 Objective-C 的标识符：`@""`来构造 -

```objc
NSString *greeting = @"Hello";
NSString *siteName = @"Yiibai";
```

下面代码中显示了创建和打印字符串的简单示例 -

```objc
#import <Foundation/Foundation.h>

int main () {
   NSString *greeting = @"Hello, All Readers";
   NSLog(@"Greeting message: %@\n", greeting );

   return 0;
}
```

编译和执行上面的代码时，它产生的结果如下 -

```shell
2018-11-15 06:41:29.480 main[76503] Greeting message: Hello, All Readers
```

Objective-C 支持多种操作字符串的方法，如下列表 -

| 编号 | 方法 | 描述 |
| --- | --- | --- |
| 1 | `- (NSString *)capitalizedString;` | 返回接收者的大写字母表示。 |
| 2 | `- (unichar)characterAtIndex:(NSUInteger)index;` | 返回给定数组位置的字符。 |
| 3 | `- (double)doubleValue;` | 以`double`形式返回接收者文本的浮点值。 |
| 4 | `- (float)floatValue;` | 以`float`形式返回接收者文本的浮点值。 |
| 5 | `- (BOOL)hasPrefix:(NSString *)aString;` | 返回一个布尔值，指示给定字符串是否与接收者的开头字符匹配。 |
| 6 | `- (BOOL)hasSuffix:(NSString *)aString;` | 返回一个布尔值，指示给定字符串是否与接收者的结尾字符匹配。 |
| 7 | `- (id)initWithFormat:(NSString *)format ...;` | 返回通过使用给定格式字符串作为模板初始化的`NSString`对象，其余的参数值将替换到此模板中。 |
| 8 | `- (NSInteger)integerValue;` | 返回接收者文本的`NSInteger`值。 |
| 9 | `- (BOOL)isEqualToString:(NSString *)aString;` | 返回一个布尔值，该值使用基于`Unicode`的文字比较指示给定字符串是否等于接收者。 |
| 10 | `- (NSUInteger)length;` | 返回接收者中的`Unicode`字符数。 |
| 11 | `- (NSString *)lowercaseString;` | 返回接收者的小写表示。 |
| 12 | `- (NSRange)rangeOfString:(NSString *)aString;` | 查找并返回接收者中给定字符串第一次出现的范围。 |
| 13 | `- (NSString *)stringByAppendingFormat:(NSString *)format ...;` | 返回通过向接收者附加由给定格式字符串和以下参数构造的字符串而生成的字符串。 |
| 14 | `- (NSString *)stringByTrimmingCharactersInSet:(NSCharacterSet *)set;` | 返回通过从接收器的两端移除给定字符集中包含的字符而生成的新字符串。 |
| 15 | `- (NSString *)substringFromIndex:(NSUInteger)anIndex;` | 返回一个新字符串，其中包含接收者从给定索引处的字符到结尾的字符。 |

以下示例代码中，使用了上述几个函数 -

```objc
#import <Foundation/Foundation.h>

int main () {
   NSString *str1 = @"Hello";
   NSString *str2 = @"World";
   NSString *str3;
   int  len ;

   NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

   /* 大写字符串 */
   str3 = [str2 uppercaseString];
   NSLog(@"Uppercase String :  %@\n", str3 );

   /* 连接str1和str2 */
   str3 = [str1 stringByAppendingFormat:@"World"];
   NSLog(@"Concatenated string:   %@\n", str3 );

   /* 连接后str3的总长度 */
   len = [str3 length];
   NSLog(@"Length of Str3 :  %d\n", len );

   /* InitWithFormat */
   str3 = [[NSString alloc] initWithFormat:@"%@ %@",str1,str2];
   NSLog(@"Using initWithFormat:   %@\n", str3 );
   [pool drain];

   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 07:00:20.805 main[72848] Uppercase String :  WORLD
2018-11-15 07:00:20.806 main[72848] Concatenated string:   HelloWorld
2018-11-15 07:00:20.806 main[72848] Length of Str3 :  10
2018-11-15 07:00:20.806 main[72848] Using initWithFormat:   Hello World
```

可以在[NSString 类参考](https://developer.apple.com/library/ios/documentation/Cocoa/Reference/Foundation/Classes/NSString_Class/Reference/NSString.html)中找到更多与 Objective-C NSString 相关方法的完整列表。

## Objective-C 结构体

Objective-C 数组可定义包含多个相同类型的数据项的变量类型，但结构体是 Objective-C 编程中的另一个用户定义数据类型，它可组合不同类型的数据项。

结构体用于表示记录，假设要图书馆中跟踪书籍信息。可能希望跟踪每本书的以下属性 -

- 标题
- 作者
- 学科
- 书名

#### 1. 定义结构体

要定义结构体，必须使用`struct`语句。 `struct`语句定义一个新的数据类型，为程序提供多个成员。 `struct`语句的格式如下所示 -

```objc
struct [structure tag] {
   member definition;
   member definition;
   ...
   member definition;
} [one or more structure variables];
```

`structure tag`是可选的，每个成员定义是一个普通的变量定义，例如`int i;` 或`float f;`或任何其他有效的变量定义。 在结构体定义的最后，在最后一个分号之前，可以指定一个或多个结构变量，但它是可选的。以下是声明`Book`结构体的示例 -

```objc
struct Books {
   NSString *title;
   NSString *author;
   NSString *subject;
   int   book_id;
} book;
```

#### 2. 访问结构成员

要访问结构的任何成员，使用成员访问运算符(`.`)。成员访问运算符是结构体变量名称和要访问结构体成员之间使用句点(`.`)连接。使用`struct`关键字来定义结构类型的变量。以下是结构体用法的示例 -

```objc
#import <Foundation/Foundation.h>

struct Books {
   NSString *title;
   NSString *author;
   NSString *subject;
   int   book_id;
};

int main() {
   struct Books Book1;        /* 声明Book类型变量：Book1 */
   struct Books Book2;        /* 声明Book类型变量：Book2 */

   /* book 1 指定值 */
   Book1.title = @"Objective-C编程";
   Book1.author = @"Yiibai";
   Book1.subject = @"Objective-C编程教程";
   Book1.book_id = 81234566;

   /* book 2 指定值 */
   Book2.title = @"Java编程";
   Book2.author = @"Maxsu";
   Book2.subject = @"JavaC编程教程";
   Book2.book_id = 813283488;

   /* 打印 Book1 信息 */
   NSLog(@"Book 1 title : %@\n", Book1.title);
   NSLog(@"Book 1 author : %@\n", Book1.author);
   NSLog(@"Book 1 subject : %@\n", Book1.subject);
   NSLog(@"Book 1 book_id : %d\n", Book1.book_id);

   /* 打印 Book2 信息 */
   NSLog(@"Book 2 title : %@\n", Book2.title);
   NSLog(@"Book 2 author : %@\n", Book2.author);
   NSLog(@"Book 2 subject : %@\n", Book2.subject);
   NSLog(@"Book 2 book_id : %d\n", Book2.book_id);

   return 0;
}
```

执行上面示例代码，得到以下结果 -

```shell
2018-11-15 07:18:43.096 main[21248] Book 1 title : Objective-C编程
2018-11-15 07:18:43.098 main[21248] Book 1 author : Yiibai
2018-11-15 07:18:43.098 main[21248] Book 1 subject : Objective-C编程教程
2018-11-15 07:18:43.098 main[21248] Book 1 book_id : 81234566
2018-11-15 07:18:43.098 main[21248] Book 2 title : Java编程
2018-11-15 07:18:43.098 main[21248] Book 2 author : Maxsu
2018-11-15 07:18:43.098 main[21248] Book 2 subject : JavaC编程教程
2018-11-15 07:18:43.098 main[21248] Book 2 book_id : 813283488
```

#### 3. 结构体作为函数参数

可以将结构体作为函数参数传递，与传递任何其他变量或指针的方式非常相似。将以与上面示例中访问的方式类似，访问结构体变量如下代码 -

```objc
#import <Foundation/Foundation.h>

struct Books {
   NSString *title;
   NSString *author;
   NSString *subject;
   int   book_id;
};

@interface SampleClass:NSObject
/* 函数声明 */
- (void) printBook:( struct Books) book ;
@end

@implementation SampleClass

- (void) printBook:( struct Books) book {
   NSLog(@"Book title : %@\n", book.title);
   NSLog(@"Book author : %@\n", book.author);
   NSLog(@"Book subject : %@\n", book.subject);
   NSLog(@"Book book_id : %d\n", book.book_id);
}

@end

int main() {
   struct Books Book1;        /* 声明 Book类型变量 Book1 */
   struct Books Book2;        /* 声明 Book类型变量 Book2 */

   /* book 1 设置成员信息 */
   Book1.title = @"Objective-C编程";
   Book1.author = @"Yiibai";
   Book1.subject = @"Objective-C编程教程";
   Book1.book_id = 88774078;

   /* book 2 设置成员信息 */
   Book2.title = @"数据结构与算法";
   Book2.author = @"Max su";
   Book2.subject = @"数据结构与算法教程";
   Book2.book_id = 8899700;

   SampleClass *sampleClass = [[SampleClass alloc]init];
   /* print Book1 info */
   [sampleClass printBook: Book1];

   /* Print Book2 info */
   [sampleClass printBook: Book2];

   return 0;
}
```

执行上面示例代码，得到以下结果 -

```shell
2018-11-15 07:24:14.437 main[50299] Book title : Objective-C编程
2018-11-15 07:24:14.439 main[50299] Book author : Yiibai
2018-11-15 07:24:14.439 main[50299] Book subject : Objective-C编程教程
2018-11-15 07:24:14.439 main[50299] Book book_id : 88774078
2018-11-15 07:24:14.439 main[50299] Book title : 数据结构与算法
2018-11-15 07:24:14.439 main[50299] Book author : Max su
2018-11-15 07:24:14.439 main[50299] Book subject : 数据结构与算法教程
2018-11-15 07:24:14.439 main[50299] Book book_id : 8899700
```

#### 4. 指向结构的指针

按照与定义指向变量的指针相似的方式来定义指向结构体的指针，如下所示 -

```objc
struct Books *struct_pointer;
```

现在，可以将结构体变量的地址存储在上面定义的指针变量中。 要查找结构变量的地址，请使用`&`运算符放在结构体名称之前，如下所示 -

```objc
struct_pointer = &Book1;
```

要使用指向结构体的指针访问结构体的成员，必须使用 `->` 运算符，如下所示 -

```objc
struct_pointer->title;
```

使用结构体指针重新编写上面的例子，希望读者容易理解 -

```objc
#import <Foundation/Foundation.h>

struct Books {
   NSString *title;
   NSString *author;
   NSString *subject;
   int   book_id;
};

@interface SampleClass:NSObject
/* function declaration */
- (void) printBook:( struct Books *) book ;
@end

@implementation SampleClass
- (void) printBook:( struct Books *) book {
   NSLog(@"Book title : %@\n", book->title);
   NSLog(@"Book author : %@\n", book->author);
   NSLog(@"Book subject : %@\n", book->subject);
   NSLog(@"Book book_id : %d\n", book->book_id);
}

@end

int main() {
   struct Books Book1;        /* 声明 Book 类型变量：Book1  */
   struct Books Book2;        /* 声明 Book 类型变量：Book2  */

   /* book 1 设置成员的值 */
   Book1.title = @"Objective-C编程";
   Book1.author = @"Yii Bai";
   Book1.subject = @"Objective-C编程教程";
   Book1.book_id = 6495407;

   /* book 2 设置成员的值 */
   Book2.title = @"数据结构与算法";
   Book2.author = @"Max Su";
   Book2.subject = @"数据结构与算法教程";
   Book2.book_id = 6495700;

   SampleClass *sampleClass = [[SampleClass alloc]init];
   /* print Book1 info by passing address of Book1 */
   [sampleClass printBook:&Book1];

   /* print Book2 info by passing address of Book2 */
   [sampleClass printBook:&Book2];

   return 0;
}
```

执行上面示例代码，得到以下结果 -

```shell
2018-11-15 07:33:26.044 main[114068] Book title : Objective-C编程
2018-11-15 07:33:26.046 main[114068] Book author : Yii Bai
2018-11-15 07:33:26.046 main[114068] Book subject : Objective-C编程教程
2018-11-15 07:33:26.046 main[114068] Book book_id : 6495407
2018-11-15 07:33:26.046 main[114068] Book title : 数据结构与算法
2018-11-15 07:33:26.046 main[114068] Book author : Max Su
2018-11-15 07:33:26.046 main[114068] Book subject : 数据结构与算法教程
2018-11-15 07:33:26.046 main[114068] Book book_id : 6495700
```

#### 5. 位域

位字段允许在结构中打包数据。当内存或数据存储非常宝贵时，这尤其有用。 下面是一个典型例子 -

- 将多个对象打包成机器字。 例如 可以压缩`1`位标志。
- 读取外部文件格式 - 可以读入非标准文件格式。 `9`位整数。

Objective-C 允许通过在变量之后放置`:长度` 来在结构定义中执行此操作。 例如 -

```objc
struct packed_struct {
   unsigned int f1:1;
   unsigned int f2:1;
   unsigned int f3:1;
   unsigned int f4:1;
   unsigned int type:4;
   unsigned int my_int:9;
} pack;
```

这里，`packed_struct`包含`6`个成员：四个`1`位标志`f1..f3`,`4`位类型和`9`位`my_int`。

Objective-C 尽可能紧凑地自动打包上述位字段，前提是字段的最大长度小于或等于计算机的整数字长。 如果不是这种情况，那么一些编译器可能允许字段的存储器重叠，而其他编译器将下一个字段存储在下一个字中。

## Objective-C 预处理器

Objective-C 预处理器不是编译器的一部分，而是编译过程中的一个单独步骤。 简单来说，Objective-C 预处理器只是一个文本替换工具，它指示编译器在实际编译之前进行必要的预处理。 我们将 Objective-C 预处理器称为**OCPP**。

所有预处理器命令都以井号(`#`)开头。它必须是第一个字符(前面不能有空格)，并且为了便于阅读，预处理器指令应该从第一列开始。 以下部分列出了所有重要的预处理程序指令 -

| 编号 | 指令       | 描述                               |
| ---- | ---------- | ---------------------------------- |
| 1    | `#define`  | 替换预处理器宏                     |
| 2    | `#include` | 从另一个文件插入特定标头           |
| 3    | `#undef`   | 未定义的预处理器宏                 |
| 4    | `#ifdef`   | 如果定义了此宏，则返回`true`       |
| 5    | `#ifndef`  | 如果未定义此宏，则返回`true`       |
| 6    | `#if`      | 测试编译时条件是否为`true`         |
| 7    | `#else`    | `#if`的替代方案                    |
| 8    | `#elif`    | 在`#else`和 `#if` 中的一个语句     |
| 9    | `#endif`   | 结束预处理器条件                   |
| 10   | `#error`   | 在`stderr`上打印错误消息           |
| 11   | `#pragma`  | 使用标准化方法向编译器发出特殊命令 |

#### 1. 预处理器示例

分析以下示例以了解各种宏的指令。

```c
#define MAX_ARRAY_LENGTH 20
```

该指令告诉**OCPP** 用`20`替换`MAX_ARRAY_LENGTH`宏标识。使用`#define`定义常量来提高可读性。

```objc
#import <Foundation/Foundation.h>
#include "myheader.h"
```

这些指令告诉**OCPP** 从 Foundation Framework 获取`foundation.h`，并将文本添加到当前源文件中。 下一行告诉**OCPP** 从本地目录获取`myheader.h`并将内容添加到当前源文件。

```c
#undef  FILE_SIZE
#define FILE_SIZE 42
```

它告诉**OCPP** 取消定义现有的`FILE_SIZE`，并将`FILE_SIZE`定义为`42`。

```c
#ifndef MESSAGE
   #define MESSAGE "You wish!"
#endif
```

它告诉**OCPP**仅在尚未定义`MESSAGE`宏时才定义`MESSAGE`。

```c
#ifdef DEBUG
   /* Your debugging statements here */
#endif
```

它告诉 OCPP 如果定义了`DEBUG`，则执行包含语句的过程。 如果在编译时将`- DDEBUG`标志传递给`gcc`编译器，这将非常有用。 它将定义`DEBUG`，因此可以在编译期间动态打开和关闭调试。

#### 2. 预定义的宏

ANSI C 定义了许多宏。虽然每个都可用于编程，但不应直接修改预定义的宏。

| 编号 | 宏         | 描述                                    |
| ---- | ---------- | --------------------------------------- |
| 1    | `__DATE__` | 当前日期为`“MMM DD YYYY”`格式的字符文字 |
| 2    | `__TIME__` | 当前时间作为`“HH:MM:SS”`格式的字符文字  |
| 3    | `__FILE__` | 它包含当前文件名作为字符串文字。        |
| 4    | `__LINE__` | 它包含当前行号作为十进制常量。          |
| 5    | `__STDC__` | 当编译器符合 ANSI 标准时，定义为`1`。   |

试试下面的例子代码 -

```objc
#import <Foundation/Foundation.h>

int main() {
   NSLog(@"File :%s\n", __FILE__ );
   NSLog(@"Date :%s\n", __DATE__ );
   NSLog(@"Time :%s\n", __TIME__ );
   NSLog(@"Line :%d\n", __LINE__ );
   NSLog(@"ANSI :%d\n", __STDC__ );

   return 0;
}
```

当编译并执行文件`main.m` 中的上述代码时，它会产生以下结果 -

```shell
2018-11-15 08:44:54.041 main[50640] File :main.m
2018-11-15 08:44:54.042 main[50640] Date :Nov 15 2018
2018-11-15 08:44:54.042 main[50640] Time :08:44:52
2018-11-15 08:44:54.042 main[50640] Line :7
2018-11-15 08:44:54.043 main[50640] ANSI :1
```

#### 3. 预处理器运算符

Objective-C 预处理器提供以下运算符来创建宏 -

##### 3.1. 宏延续(\)

宏通常必须包含在一行中。宏延续运算符用于继续对于单行来说太长的宏。 例如 -

```objc
#define  message_for(a, b)  \
   NSLog(@#a " and " #b ": We love you!\n")
```

##### 3.2. 字符串化(#)

字符串化或数字符号运算符(`#`)在宏定义中使用时，将宏参数转换为字符串常量。 此运算符只能在具有指定参数或参数列表的宏中使用。 例如 -

```objc
#import <Foundation/Foundation.h>

#define  message_for(a, b)  \
   NSLog(@#a " and " #b ": We love you!\n")

int main(void) {
   message_for(Carole, Debra);
   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 08:56:38.088 main[98681] Carole and Debra: We love you!
```

##### 3.3. 令牌粘贴(##)

宏定义中的令牌粘贴运算符(`##`)组合了两个参数。 它允许将宏定义中的两个单独的标记连接到一个标记中。 例如 -

```objc
#import <Foundation/Foundation.h>

#define tokenpaster(n) NSLog (@"token" #n " = %d", token##n)

int main(void) {
   int token34 = 40;

   tokenpaster(34);
   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 08:58:04.872 main[138839] token34 = 40
```

它是如何发生的，因为这个例子导致预处理器的以下实际输出 -

```shell
NSLog (@"token34 = %d", token34);
```

此示例显示令牌`##n`到`token34`的串联，这里使用了`stringize`和`token-pasting`。

##### 3.4. defined()运算符

预处理器定义的运算符用于常量表达式，以确定是否使用`#define`定义标识符。如果定义了指定的标识符，则该值为`true`(非零)。 如果未定义符号，则值为`false`(零)。 定义的运算符指定如下 -

```objc
#import <Foundation/Foundation.h>

#if !defined (MESSAGE)
   #define MESSAGE "You wish!"
#endif

int main(void) {
   NSLog(@"Here is the message: %s\n", MESSAGE);
   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 09:04:30.790 main[31654] Here is the message: You wish!
```

#### 4. 参数化宏

OCPP 的一个强大功能是使用参数化宏模拟函数的能力。 例如，可能需要一些代码来对数字进行平方，如下所示 -

```objc
int square(int x) {
   return x * x;
}
```

可以使用宏重写上面的代码，如下所示 -

```objc
#define square(x) ((x) * (x))
```

必须先使用`#define`指令定义带参数的宏，然后才能使用它们。 参数列表括在括号中，并且必须紧跟宏名称。 宏名称和左括号之间不允许有空格。 例如 -

```objc
#import <Foundation/Foundation.h>

#define MAX(x,y) ((x) > (y) ? (x) : (y))

int main(void) {
   NSLog(@"Max between 20 and 10 is %d\n", MAX(10, 20));
   return 0;
}
```

执行上面示例代码，得到以下结果：

```shell
2018-11-15 09:08:15.586 main[64146] Max between 20 and 10 is 20
```

> 来源: [Objective-C 教程](https://www.yiibai.com/objective_c)

## 单词

### `Foundation`

> 地基，基础；基本原理，根据；基金会；建立，创办；（化妆打底用的）粉底霜

### `struct`

> 结构；结构体；创建构架数组

## 基础

### `#import <Foundation/Foundation.h>`

> 它包括一个扩展数据类型列表，如：`NSArray`，`NSDictionary`，`NSSet`等。
>
> 它由一组丰富的函数组成，用于处理文件，字符串等。
>
> 它提供了 URL 处理功能，日期格式化，数据处理，错误处理等实用程序。

`NS_ASSUME_NONNULL_BEGIN`

`NS_ASSUME_NONNULL_END`

Nonnull 区域设置(Audited Regions)

如果需要每个属性或每个方法都去指定 nonnull 和 nullable，是一件非常繁琐的事。苹果为了减轻我们的工作量，专门提供了两个宏：NS_ASSUME_NONNULL_BEGIN 和 NS_ASSUME_NONNULL_END。在这两个宏之间的代码，所有简单指针对象都被假定为 nonnull，因此我们只需要去指定那些 nullable 的指针。如下代码所示：

```objc
NS_ASSUME_NONNULL_BEGIN
@interface TestNullabilityClass ()
@property (nonatomic, copy) NSArray * items;
- (id)itemWithName:(nullable NSString *)name;
@end
NS_ASSUME_NONNULL_END
```

在上面的代码中，items 属性默认是 nonnull 的，itemWithName:方法的返回值也是 nonnull，而参数是指定为 nullable 的。

不过，为了安全起见，苹果还制定了几条规则：

- typedef 定义的类型的 nullability 特性通常依赖于上下文，即使是在 Audited Regions 中，也不能假定它为 nonnull。
- 复杂的指针类型(如 id _)必须显示去指定是 nonnull 还是 nullable。例如，指定一个指向 nullable 对象的 nonnull 指针，可以使用”\_\_nullable id _ \_\_nonnull”。
- 我们经常使用的 NSError \*\*通常是被假定为一个指向 nullable NSError 对象的 nullable 指针。

## 来源

[https://www.yiibai.com/objective_c/objective_c_overview.html](https://www.yiibai.com/objective_c/objective_c_overview.html)
