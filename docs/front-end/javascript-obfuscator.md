# JavaScript obfuscator 中文文档 - 0.28.1

> 英文文档：[Github](https://github.com/javascript-obfuscator/javascript-obfuscator#stringarray)
>
> 文档地址：[SunSeekrX - JavaScript-obfuscator](https://sunseekerx.yoouu.cn/front-end/javascript-obfuscator.html)
>
> 相关文章：[https://juejin.im/post/5df1f4fbf265da339f7cefab](https://juejin.im/post/5df1f4fbf265da339f7cefab)

> 部分配置未翻译，翻译觉得有出入的地方用引用标明了原文。
>
> 更新时间：2020-05-14 14:38:18

`JavaScript Obfuscator`是一个强大的免费 JavaScript 混淆器，为您的源代码提供保护。

![logo](https://raw.githubusercontent.com/javascript-obfuscator/javascript-obfuscator/master/images/logo.png)

混淆后的代码示例: [github.com](https://github.com/javascript-obfuscator/javascript-obfuscator/blob/master/examples/javascript-obfuscator.js)

#### 在线版本:

[obfuscator.io](https://obfuscator.io)

#### 插件:

- Webpack plugin: [webpack-obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator)
- Webpack loader: [obfuscator-loader](https://github.com/javascript-obfuscator/obfuscator-loader)
- Gulp: [gulp-javascript-obfuscator](https://github.com/javascript-obfuscator/gulp-javascript-obfuscator)
- Grunt: [grunt-contrib-obfuscator](https://github.com/javascript-obfuscator/grunt-contrib-obfuscator)
- Rollup: [rollup-plugin-javascript-obfuscator](https://github.com/javascript-obfuscator/rollup-plugin-javascript-obfuscator)
- Weex: [weex-devtool](https://www.npmjs.com/package/weex-devtool)
- Malta: [malta-js-obfuscator](https://github.com/fedeghe/malta-js-obfuscator)

[![Join the chat at Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/javascript-obfuscator/General-chat) [![npm version](https://badge.fury.io/js/javascript-obfuscator.svg)](https://badge.fury.io/js/javascript-obfuscator) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator?ref=badge_shield) [![Build Status](https://travis-ci.com/javascript-obfuscator/javascript-obfuscator.svg?branch=master)](https://travis-ci.com/javascript-obfuscator/javascript-obfuscator) [![Coverage Status](https://coveralls.io/repos/github/javascript-obfuscator/javascript-obfuscator/badge.svg?branch=master)](https://coveralls.io/github/javascript-obfuscator/javascript-obfuscator?branch=master) [![Backers on Open Collective](https://opencollective.com/javascript-obfuscator/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/javascript-obfuscator/sponsors/badge.svg)](#sponsors)

#### 你可以通过捐赠来支持这个项目:

- (Bitcoin) 14yhtZxLNp6ekZAgmEmPJqEKUP2VtUxQK6
- (Ether) 0x5Df9eBcFB2D0f3315d03Ac112104b9023C409dc1
- (OpenCollective) https://opencollective.com/javascript-obfuscator

非常感谢所有的支持者!

#### 注意!主分支上的文档可能与最新的稳定版本不匹配!

#### 如果您有问题，请先查看这部分: [FAQ](#常见问答)

## :warning: 注意

##### 仅仅混淆属于您的代码。

不建议混淆第三方库文件，因为混淆后的代码要慢 15-80%(取决于怎么配置)，而且文件要大得多。

## 安装

#### 使用 Yarn 或 NPM

使用 Yarn 或 NPM 安装，并将其添加到您的`dependencies`或 `devDependencies`:

```sh
$ yarn add --dev javascript-obfuscator
```

or

```sh
$ npm install --save-dev javascript-obfuscator
```

#### 在浏览器中

From CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js" />
```

From `node_modules`:

```html
<script src="./node_modules/javascript-obfuscator/dist/index.browser.js" />
```

## Webpack plugin 使用

### 安装

```bash
npm install --save-dev webpack-obfuscator

# yarn
yarn add webpack-obfuscator -D
```

### 使用:

```javascript
var JavaScriptObfuscator = require('webpack-obfuscator');

// ...

// webpack plugins array
plugins: [
	new JavaScriptObfuscator ({
      rotateUnicodeArray: true
  }, ['excluded_bundle_name.js'])
],
```

### 混淆配置

类型: `Object` 默认: `null`

[javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) 的配置。

**警告:** 现阶段插件不支持 `sourceMap` 和`sourceMapMode` 配置!

### 排除

> 可以设置哪些文件不配混淆.

类型: `Array` 或者 `String` 默认: `[]`

包名是 webpack 编译后的输出文件名。对于多个 webpack 条目，您可以使用别名 `[name]`或 `[id]`在' output '对象中设置 bundle name。

排除阵列的语法是[multimatch](https://github.com/sindresorhus/atch)包的语法。您可以在包页面上看到示例。

一些写法示例: `['excluded_bundle_name.js', '**_bundle_name.js'] or 'excluded_bundle_name.js'`

示例:

```JavaScript
// webpack.config.js
'use strict';

const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: {
        'abc': './test/input/index.js',
        'cde': './test/input/index1.js'
    },
    output: {
        path: 'dist',
        filename: '[name].js' // output: abc.js, cde.js
    },
    plugins: [
        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        }, ['abc.js'])
    ]
};
```

## 用法

```javascript
var JavaScriptObfuscator = require('javascript-obfuscator')

var obfuscationResult = JavaScriptObfuscator.obfuscate(
  `
        (function(){
            var variable1 = '5' - 3;
            var variable2 = '5' + 3;
            var variable3 = '5' + - '2';
            var variable4 = ['10','10','10','10','10'].map(parseInt);
            var variable5 = 'foo ' + 1 + 1;
            console.log(variable1);
            console.log(variable2);
            console.log(variable3);
            console.log(variable4);
            console.log(variable5);
        })();
    `,
  {
    compact: false,
    controlFlowFlattening: true,
  }
)

console.log(obfuscationResult.getObfuscatedCode())
/*
var _0x2218 = [
    '8|3|1|2|0|4|6|9|7|5',
    'bqndd',
    'dySIh',
    'kTiiG',
    'log',
    'tuvgv'
];
(function (_0x38b423, _0x1d6bd4) {
    var _0x39a849 = function (_0x5794c7) {
        while (--_0x5794c7) {
            _0x38b423['push'](_0x38b423['shift']());
        }
    };
    _0x39a849(++_0x1d6bd4);
}(_0x2218, 0x114));
var _0x8221 = function (_0xcac13e, _0x3627d7) {
    _0xcac13e = _0xcac13e - 0x0;
    var _0x1eae4d = _0x2218[_0xcac13e];
    return _0x1eae4d;
};
(function () {
    var _0x5336d5 = {
        'bqndd': _0x8221('0x0'),
        'islRd': function _0x2abb6c(_0x2f45f8, _0x4d47b0) {
            return _0x2f45f8 + _0x4d47b0;
        },
        'kTiiG': function _0x32525a(_0x44ba8d, _0x2c5e0c) {
            return _0x44ba8d + _0x2c5e0c;
        },
        'dySIh': 'foo\x20',
        'tuvgv': function _0x28d015(_0x35d81a, _0x2d2463) {
            return _0x35d81a - _0x2d2463;
        }
    };
    var _0x5000ba = _0x5336d5[_0x8221('0x1')]['split']('|'), _0x5c972f = 0x0;
    while (!![]) {
        switch (_0x5000ba[_0x5c972f++]) {
        case '0':
            var _0x586faa = _0x5336d5['islRd'](_0x5336d5['kTiiG'](_0x5336d5[_0x8221('0x2')], 0x1), 0x1);
            continue;
        case '1':
            var _0xab6a82 = _0x5336d5[_0x8221('0x3')]('5', -'2');
            continue;
        case '2':
            var _0x19ab9d = [
                '10',
                '10',
                '10',
                '10',
                '10'
            ]['map'](parseInt);
            continue;
        case '3':
            var _0x321653 = _0x5336d5[_0x8221('0x3')]('5', 0x3);
            continue;
        case '4':
            console['log'](_0x2c1b0c);
            continue;
        case '5':
            console[_0x8221('0x4')](_0x586faa);
            continue;
        case '6':
            console[_0x8221('0x4')](_0x321653);
            continue;
        case '7':
            console[_0x8221('0x4')](_0x19ab9d);
            continue;
        case '8':
            var _0x2c1b0c = _0x5336d5[_0x8221('0x5')]('5', 0x3);
            continue;
        case '9':
            console[_0x8221('0x4')](_0xab6a82);
            continue;
        }
        break;
    }
}());
*/
```

### `obfuscate(sourceCode, options)`

返回包含两个公共方法的`ObfuscationResult`对象:

- `getObfuscatedCode()` - 返回带有混淆代码的`字符串`;
- `getSourceMap()` - 如果启用了[`sourceMap`](#sourcemap)选项——返回 source map 字符串，如果[`sourceMapMode`](#sourcemapmode)选项被设置为内联，则返回一个空字符串。

为 ObfuscationResult 对象调用 toString()将返回带有混淆代码的字符串。

方法有两个参数，源代码和选项，分别是源代码和 opitons:

- `sourceCode` (`string`, default: `null`) – 任何有效的源代码，以字符串形式传递;
- `options` (`Object`, default: `null`) – 配置项。

更多配置，请查看[options](#options)。

## CLI 用法

查看 [CLI options](#cli-options).

#### 混淆单个文件

用法:

```sh
javascript-obfuscator input_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_file_name.js [options]
```

混淆输入文件拓展名为`.js`结尾 的文件。

如果未使用 `--output`选项指定混淆后的路径，则混淆后的文件将保存为 `源文件名- obfusated.js` 放到源文件同级目录下。

示例:

```sh
javascript-obfuscator samples/sample.js --compact true --self-defending false
// creates a new file samples/sample-obfuscated.js

javascript-obfuscator samples/sample.js --output output/output.js --compact true --self-defending false
// creates a new file output/output.js
```

#### 递归混淆目录

用法:

```sh
javascript-obfuscator ./dist [options]
// creates a new obfuscated files under `./dist` directory near the input files with `obfuscated` postfix

javascript-obfuscator ./dist --output ./dist/obfuscated [options]
// creates a folder structure with obfuscated files under `./dist/obfuscated` path
// 在`./dist/obfuscated`创建一个与指定目录同结构的压缩后文件夹
```

混淆指定目录下的所有.js 文件。如果这个目录包含已经混淆的后缀为`-obfuscated`的文件，这些文件将被忽略。

混淆后的文件将保存为`源文件名- obfusated.js`放到源文件同级目录下。

## 条件注释

您可以通过添加以下注释来禁用和启用代码特定部分的混淆:（有点类似于`eslint`）

- disable: `// javascript-obfuscator:disable` or `/* javascript-obfuscator:disable */`;
- enable: `// javascript-obfuscator:enable` or `/* javascript-obfuscator:enable */`.

示例:

```javascript
// input
var foo = 1
// javascript-obfuscator:disable
var bar = 2

// output
var _0xabc123 = 0x1
var bar = 2
```

条件注释只影响最小树节点的直接转换。所有子转换仍然将应用于最小树节点。

> 原文：Conditional comments affect only direct transformations of AST-tree nodes. All child transformations still will be applied to the AST-tree nodes.

例如:

在变量的声明中混淆变量的名称称为直接变换;

在变量的声明之外混淆变量的名称称为子转换。

> 原文
>
> For example:
>
> - Obfuscation of the variable's name at its declaration is called direct transformation;
> - Obfuscation of the variable's name beyond its declaration is called child transformation.

## Antiviruses false positive virus alerts

Some input source code that will obfuscated with some obfuscation options can trigger false positive alerts in a few antiviruses. If you will get this false positive triggers, try to play with obfuscation options.

- Try to change `stringArrayEncoding` option value between `rc4` and `base64` values or disable it completely;
- Try to change `identifierNamesGenerator` option value from `hexadecimal` on `mangled`;
- Try to disable `selfDefending`.

If this wont help - attach your source code and describe your obfuscation options here: https://github.com/javascript-obfuscator/javascript-obfuscator/issues/51

> 此段限于英文水平，翻译可能有很大偏差，因此未翻译。

## JavaScript Obfuscator Options

下面是混淆的配置项

#### 配置:

```javascript
{
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    identifierNamesGenerator: 'hexadecimal',
    identifiersPrefix: '',
    inputFileName: '',
    log: false,
    renameGlobals: false,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    target: 'browser',
    transformObjectKeys: false,
    unicodeEscapeSequence: false
}
```

#### CLI 配置:

```sh
    -v, --version
    -h, --help

    -o, --output

    --compact <boolean>
    --config <string>
    --control-flow-flattening <boolean>
    --control-flow-flattening-threshold <number>
    --dead-code-injection <boolean>
    --dead-code-injection-threshold <number>
    --debug-protection <boolean>
    --debug-protection-interval <boolean>
    --disable-console-output <boolean>
    --domain-lock '<list>' (comma separated)
    --exclude '<list>' (comma separated)
    --identifier-names-generator <string> [hexadecimal, mangled]
    --identifiers-prefix <string>
    --log <boolean>
    --rename-globals <boolean>
    --reserved-names '<list>' (comma separated)
    --reserved-strings '<list>' (comma separated)
    --rotate-string-array <boolean>
    --seed <number>
    --self-defending <boolean>
    --source-map <boolean>
    --source-map-base-url <string>
    --source-map-file-name <string>
    --source-map-mode <string> [inline, separate]
    --string-array <boolean>
    --string-array-encoding <boolean|string> [true, false, base64, rc4]
    --string-array-threshold <number>
    --target <string> [browser, browser-no-eval, node]
    --transform-object-keys <boolean>
    --unicode-escape-sequence <boolean>
```

### `compact`

类型: `boolean` 默认: `true`

将代码输出到一行

### `config`

类型: `string` 默认: ``

包含混淆选项的 JS/JSON 配置文件的名称。这些将被直接传递给 CLI 的选项覆盖

### `controlFlowFlattening`

类型: `boolean` 默认: `false`

##### :warning: This option greatly affects the performance up to 1.5x slower runtime speed. Use [`controlFlowFlatteningThreshold`](#controlflowflatteningthreshold) to set percentage of nodes that will affected by control flow flattening.

Enables code control flow flattening. Control flow flattening is a structure transformation of the source code that hinders program comprehension.

Example:

```ts
// input
;(function () {
  function foo() {
    return function () {
      var sum = 1 + 2
      console.log(1)
      console.log(2)
      console.log(3)
      console.log(4)
      console.log(5)
      console.log(6)
    }
  }

  foo()()
})()

// output
;(function () {
  function _0x3bfc5c() {
    return function () {
      var _0x3260a5 = {
        WtABe: '4|0|6|5|3|2|1',
        GokKo: function _0xf87260(_0x427a8e, _0x43354c) {
          return _0x427a8e + _0x43354c
        },
      }
      var _0x1ad4d6 = _0x3260a5['WtABe']['split']('|'),
        _0x1a7b12 = 0x0
      while (!![]) {
        switch (_0x1ad4d6[_0x1a7b12++]) {
          case '0':
            console['log'](0x1)
            continue
          case '1':
            console['log'](0x6)
            continue
          case '2':
            console['log'](0x5)
            continue
          case '3':
            console['log'](0x4)
            continue
          case '4':
            var _0x1f2f2f = _0x3260a5['GokKo'](0x1, 0x2)
            continue
          case '5':
            console['log'](0x3)
            continue
          case '6':
            console['log'](0x2)
            continue
        }
        break
      }
    }
  }

  _0x3bfc5c()()
})()
```

### `controlFlowFlatteningThreshold`

类型: `number` 默认: `0.75` 最小: `0` 最大: `1`

The probability that the [`controlFlowFlattening`](#controlflowflattening) transformation will be applied to the node.

This setting is especially useful for large code size because large amounts of control flow transformations can slow down your code and increase code size.

`controlFlowFlatteningThreshold: 0` equals to `controlFlowFlattening: false`.

### `deadCodeInjection`

类型: `boolean` 默认: `false`

##### :warning: Dramatically increases size of obfuscated code (up to 200%), use only if size of obfuscated code doesn't matter. Use [`deadCodeInjectionThreshold`](#deadcodeinjectionthreshold) to set percentage of nodes that will affected by dead code injection.

##### :warning: This option forcibly enables `stringArray` option.

With this option random blocks of dead code will add to the obfuscated code.

Example:

```ts
// input
;(function () {
  if (true) {
    var foo = function () {
      console.log('abc')
      console.log('cde')
      console.log('efg')
      console.log('hij')
    }

    var bar = function () {
      console.log('klm')
      console.log('nop')
      console.log('qrs')
    }

    var baz = function () {
      console.log('tuv')
      console.log('wxy')
      console.log('z')
    }

    foo()
    bar()
    baz()
  }
})()

// output
var _0x5024 = [
  'zaU',
  'log',
  'tuv',
  'wxy',
  'abc',
  'cde',
  'efg',
  'hij',
  'QhG',
  'TeI',
  'klm',
  'nop',
  'qrs',
  'bZd',
  'HMx',
]
var _0x4502 = function (_0x1254b1, _0x583689) {
  _0x1254b1 = _0x1254b1 - 0x0
  var _0x529b49 = _0x5024[_0x1254b1]
  return _0x529b49
}
;(function () {
  if (!![]) {
    var _0x16c18d = function () {
      if (_0x4502('0x0') !== _0x4502('0x0')) {
        console[_0x4502('0x1')](_0x4502('0x2'))
        console[_0x4502('0x1')](_0x4502('0x3'))
        console[_0x4502('0x1')]('z')
      } else {
        console[_0x4502('0x1')](_0x4502('0x4'))
        console[_0x4502('0x1')](_0x4502('0x5'))
        console[_0x4502('0x1')](_0x4502('0x6'))
        console[_0x4502('0x1')](_0x4502('0x7'))
      }
    }
    var _0x1f7292 = function () {
      if (_0x4502('0x8') === _0x4502('0x9')) {
        console[_0x4502('0x1')](_0x4502('0xa'))
        console[_0x4502('0x1')](_0x4502('0xb'))
        console[_0x4502('0x1')](_0x4502('0xc'))
      } else {
        console[_0x4502('0x1')](_0x4502('0xa'))
        console[_0x4502('0x1')](_0x4502('0xb'))
        console[_0x4502('0x1')](_0x4502('0xc'))
      }
    }
    var _0x33b212 = function () {
      if (_0x4502('0xd') !== _0x4502('0xe')) {
        console[_0x4502('0x1')](_0x4502('0x2'))
        console[_0x4502('0x1')](_0x4502('0x3'))
        console[_0x4502('0x1')]('z')
      } else {
        console[_0x4502('0x1')](_0x4502('0x4'))
        console[_0x4502('0x1')](_0x4502('0x5'))
        console[_0x4502('0x1')](_0x4502('0x6'))
        console[_0x4502('0x1')](_0x4502('0x7'))
      }
    }
    _0x16c18d()
    _0x1f7292()
    _0x33b212()
  }
})()
```

### `deadCodeInjectionThreshold`

类型: `number` 默认: `0.4` 最小: `0` 最大: `1`

Allows to set percentage of nodes that will affected by `deadCodeInjection`.

### `debugProtection`

类型: `boolean` 默认: `false`

##### :warning: Can freeze your browser if you open the Developer Tools.

This option makes it almost impossible to use the `console` tab of the Developer Tools (both on WebKit-based and Mozilla Firefox).

- WebKit-based: blocks the site window, but you still can navigate through Developer Tools panel.
- Firefox: does _not_ block the site window, but still won't let you use DevTools.

### `debugProtectionInterval`

类型: `boolean` 默认: `false`

##### :warning: Can freeze your browser! Use at own risk.

If checked, an interval is used to force the debug mode on the Console tab, making it harder to use other features of the Developer Tools. Works if [`debugProtection`](#debugprotection) is enabled.

### `disableConsoleOutput`

类型: `boolean` 默认: `false`

禁止使用`console.log`, `console.info`, `console.error`, `console.warn`, `console.debug`, `console.exception` and `console.trace`。使用空函数替换它们。这会使得调试器的使用更加困难。

### `domainLock`

类型: `string[]` 默认: `[]`

锁定混淆的源代码，使其只在特定的域和/或子域上运行。这使得有些人很难复制粘贴您的源代码并在其他地方运行。

##### 多个域和子域

可以将代码锁定到多个域或子域。例如，要锁定它，使代码只在`www.example.com`上运行，请添加`www.example.com`，使它在来自`example.com`的任何子域上运行，请使用`.example.com`。

### `exclude`

类型: `string[]` 默认: `[]`

指定要排除混淆的文件名或者一些表明文件的 globs。

### `identifierNamesGenerator`

类型: `string` 默认: `hexadecimal`

设置标识符名称生成器。

可用值:

- `hexadecimal`: 例如 `_0xabc123`
- `mangled`: 例如`a`, `b`, `c`

### `identifiersPrefix`

类型: `string` 默认: `''`

为所有全局标识符设置前缀。

如果要混淆多个文件，请使用此选项。此选项有助于避免这些文件的全局标识符之间的冲突。每个文件的前缀应该不同。

### `inputFileName`

类型: `string` 默认: `''`

允许使用源代码设置输入文件的名称。此名称将在内部用于生成 source map。

> Allows to set name of the input file with source code. This name will used internally for source map generation.

### `log`

类型: `boolean` 默认: `false`

允许将信息输出到控制台。

### `renameGlobals`

类型: `boolean` 默认: `false`

##### :warning: 这个选项会破坏您的代码。只有当你知道他会干什么才用他!

允许使用声明混淆全局变量和函数名。

### `reservedNames`

类型: `string[]` 默认: `[]`

禁用通过传递的 RegExp 模式匹配的标识符的混淆和生成。

示例:

```ts
{
  reservedNames: ['^someVariable', 'functionParameter_d']
}
```

### `reservedStrings`

类型: `string[]` 默认: `[]`

禁用字符串文字的转换，该转换由传递的 RegExp 模式匹配。

Example:

```ts
{
  reservedStrings: ['react-native', './src/test', 'some-string_d']
}
```

### `rotateStringArray`

类型: `boolean` 默认: `true`

##### :warning: [`stringArray`](#stringarray) 选项必须启用才能生效

将 stringArray 数组移动一个固定的和随机的(在代码混淆处生成)位置。这使得将删除的字符串的顺序匹配到其原始位置变得更加困难。

如果您的原始源代码不是很小，建议使用这个选项，因为 helper 函数可以吸引注意力。

### `seed`

类型: `number` 默认: `0`

此选项为随机生成器设置种子。这对于创建可重复的结果非常有用。

如果种子是 0 -随机发生器将工作没有种子。

> This option sets seed for random generator. This is useful for creating repeatable results.
>
> If seed is `0` - random generator will work without seed.

### `selfDefending`

类型: `boolean` 默认: `false`

##### :warning: 在使用了这个选项之后，不要以任何方式改变混淆的代码，因为任何改变，比如代码的丑陋化，都会触发自我防御，代码将不再工作!

##### :warning: 该选项强制将紧凑值设置为`true`

此选项使输出代码对格式化和变量重命名具有弹性。如果一个人试图在模糊的代码上使用 JavaScript 美化器，代码将不再工作，使其更难理解和修改。

### `sourceMap`

类型: `boolean` 默认: `false`

为混淆的代码启用 source map 生成。

Source maps 可以帮助您调试混淆的 JavaScript 源代码。如果需要在生产环境中调试，可以将独立的源映射文件上传到一个秘密位置，然后将浏览器指向该位置。

### `sourceMapBaseUrl`

类型: `string` 默认: ``

当[`sourceMapMode: 'separate'`](#sourcemapmode)时，将`base url` 设置为 source map 导入 url。

CLI example:

```
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000'
```

Result:

```
//# sourceMappingURL=http://localhost:9000/out.js.map
```

### `sourceMapFileName`

类型: `string` 默认: ``

在`sourceMapMode: 'separate'`时设置输出 source map 的文件名。

CLI example:

```
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000' --source-map-file-name example
```

Result:

```
//# sourceMappingURL=http://localhost:9000/example.js.map
```

### `sourceMapMode`

类型: `string` 默认: `separate`

指定 source map 生成模式:

- `inline` - 生成单个`source maps`文件，而不是生成独立的文件;
- `separate` - 生成相应的`.map`带有 source map 的映射文件。如果您通过 CLI 运行 obfuscator，将源映射文件的链接添加到带有混淆代码的文件末尾 `//# sourceMappingUrl=file.js.map`.

### `stringArray`

类型: `boolean` 默认: `true`

删除字符串文字并将其放入一个特殊的数组中。例如, "Hello World"`在`var m = "Hello World";将被替换为像 `var m = _0x12c456[0x1];`

### `stringArrayEncoding`

类型: `boolean|string` 默认: `false`

##### :warning: `stringArray` 必须启用

此选项会使您的脚本变慢。

使用 base64 或 rc4 对[`stringArray`](#stringarray)的所有字符串进行编码，并插入用于在运行时解码的特殊代码。

可用值:

- `true` (`boolean`): 使用 base64 编码 stringArray 值
- `false` (`boolean`): 不对 stringArray 值进行编码
- `'base64'` (`string`): 使用 base64 编码 stringArray 值
- `'rc4'` (`string`): 使用 rc4 对 stringArray 值进行编码。大约比 base64 慢 30-50%，但是更难得到初始值。建议使用 rc4 编码禁用 [`unicodeEscapeSequence`](#unicodeescapesequence)选项，以防止非常大的混淆代码。

### `stringArrayThreshold`

类型: `number` 默认: `0.8` 最小: `0` 最大: `1`

##### :warning: [`stringArray`](#stringarray) 必须启用

您可以使用此设置来调整将字符串文字插入到`stringArray`中的概率(从 0 到 1)。

这个设置对于大的代码大小特别有用，因为它会反复调用字符串数组，并且会降低代码的速度。

This setting is especially useful for large code size because it repeatedly calls to the `string array` and can slow down your code.

`stringArrayThreshold: 0` 等同于 `stringArray: false`.

### `target`

类型: `string` 默认: `browser`

允许为混淆代码设置目标环境。

可用值:

- `browser`;
- `browser-no-eval`;
- `node`.

当前`browser`和`node` 目标的输出代码是相同的。`browser-no-eval`输出代码没有使用 eval。

### `transformObjectKeys`

类型: `boolean` 默认: `false`

启用对象键的转换。

Example:

```ts
// input
;(function () {
  var object = {
    foo: 'test1',
    bar: {
      baz: 'test2',
    },
  }
})()

// output
var _0x5a21 = ['foo', 'test1', 'bar', 'baz', 'test2']
var _0x223f = function (_0x474dc0, _0x10db96) {
  _0x474dc0 = _0x474dc0 - 0x0
  var _0x4c8bf7 = _0x5a21[_0x474dc0]
  return _0x4c8bf7
}
;(function () {
  var _0x2e1a8e = {}
  _0x2e1a8e[_0x223f('0x0')] = _0x223f('0x1')
  _0x2e1a8e[_0x223f('0x2')] = {}
  _0x2e1a8e[_0x223f('0x2')][_0x223f('0x3')] = _0x223f('0x4')
})()
```

### `unicodeEscapeSequence`

类型: `boolean` 默认: `false`

允许启用/禁用字符串转换为 unicode 转义序列。

Unicode 转义序列大大增加了代码的大小，字符串可以很容易地恢复到原来的视图。建议仅对小源代码启用此选项。

## 预设选项

### 高混淆度，低性能

性能会比没有混淆时慢 50-100%

```javascript
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: 'rc4',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```

### 中度混淆，性能最佳

性能将比没有混淆时降低 30-35%

```javascript
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: 'base64',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```

### 低混淆，高性能

性能会比没有混淆时稍微慢一些

```javascript
{
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
}
```

## 常见问答

### 支持哪些 javascript 版本?

`es3`, `es5`, `es2015`, `es2016` and `es2017`

### 我想使用 README 中描述的特性。但它不工作!

主分支上的自述可能与最新的稳定版本不匹配。

### 为什么 CLI 命令不能工作?

尝试运行`npm link javascript-obfuscator`命令或使用`npm i -g javascript-obfuscator`全局安装它

### 错误`maximum call stack size exceeded`

这可能是一种自我保护机制。在混淆了自我保护选项之后，有些东西正在改变源代码

> Likely this is `selfDefending` mechanism. Something is changing source code after obfuscation with `selfDefending` option.

### 在线版?

[obfuscator.io](https://obfuscator.io)

### JSX 支持?

不在计划中。
