# 正则表达式

> 正则表达式有贪婪匹配原则，能多就不会少

## RegExp 对象

RegExp 对象表示正则表达式，它是对字符串执行模式匹配的强大工具。

### 直接量语法

```javascript
;/pattern/abeirstttu
```

### 创建 RegExp 对象的语法：

```javascript
new RegExp(pattern, attributes)
```

### 参数

参数 _pattern_ 是一个字符串，指定了正则表达式的模式或其他正则表达式。

参数 _attributes_ 是一个可选的字符串，包含属性 "g"、"i" 和 "m"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。ECMAScript 标准化之前，不支持 m 属性。如果 _pattern_ 是正则表达式，而不是字符串，则必须省略该参数。

### 返回值

一个新的 RegExp 对象，具有指定的模式和标志。如果参数 _pattern_ 是正则表达式而不是字符串，那么 RegExp() 构造函数将用与指定的 RegExp 相同的模式和标志创建一个新的 RegExp 对象。

如果不用 new 运算符，而将 RegExp() 作为函数调用，那么它的行为与用 new 运算符调用时一样，只是当 _pattern_ 是正则表达式时，它只返回 _pattern_，而不再创建一个新的 RegExp 对象。

### 抛出

SyntaxError - 如果 _pattern_ 不是合法的正则表达式，或 _attributes_ 含有 "g"、"i" 和 "m" 之外的字符，抛出该异常。

TypeError - 如果 _pattern_ 是 RegExp 对象，但没有省略 _attributes_ 参数，抛出该异常。

## 修饰符

| 修饰符                                                    | 描述                                                     |
| :-------------------------------------------------------- | :------------------------------------------------------- |
| [i](https://www.w3school.com.cn/jsref/jsref_regexp_i.asp) | 执行对大小写不敏感的匹配。                               |
| [g](https://www.w3school.com.cn/jsref/jsref_regexp_g.asp) | 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。 |
| m                                                         | 执行多行匹配。                                           |

## 方括号

方括号用于查找某个范围内的字符：

| 表达式                                                                    | 描述                               |
| :------------------------------------------------------------------------ | :--------------------------------- |
| [[abc\]](https://www.w3school.com.cn/jsref/jsref_regexp_charset.asp)      | 查找方括号之间的任何字符。         |
| [[^abc\]](https://www.w3school.com.cn/jsref/jsref_regexp_charset_not.asp) | 查找任何不在方括号之间的字符。     |
| [0-9]                                                                     | 查找任何从 0 至 9 的数字。         |
| [a-z]                                                                     | 查找任何从小写 a 到小写 z 的字符。 |
| [A-Z]                                                                     | 查找任何从大写 A 到大写 Z 的字符。 |
| [A-z]                                                                     | 查找任何从大写 A 到小写 z 的字符。 |
| [adgk]                                                                    | 查找给定集合内的任何字符。         |
| [^adgk]                                                                   | 查找给定集合外的任何字符。         |
| (red\|blue\|green)                                                        | 查找任何指定的选项。               |

## 元字符

元字符（Metacharacter）是拥有特殊含义的字符：

| 元字符 | 描述 | 等价于 | 全称 |
| :-- | :-- | --- | --- |
| [.](https://www.w3school.com.cn/jsref/jsref_regexp_dot.asp) | 查找单个字符，除了换行和行结束符。 |  |  |
| [\w](https://www.w3school.com.cn/jsref/jsref_regexp_wordchar.asp) | 查找单词字符。（包括下划线） | [A-Za-z0-9_] | Word |
| [\W](https://www.w3school.com.cn/jsref/jsref_regexp_wordchar_non.asp) | 查找非单词字符。 |  |  |
| [\d](https://www.w3school.com.cn/jsref/jsref_regexp_digit.asp) | 查找数字。 | [0-9] | Digital |
| [\D](https://www.w3school.com.cn/jsref/jsref_regexp_digit_non.asp) | 查找非数字字符。 |  |  |
| [\s](https://www.w3school.com.cn/jsref/jsref_regexp_whitespace.asp) | 查找空白字符。 | [ \f\n\r\t\v] | Space |
| [\S](https://www.w3school.com.cn/jsref/jsref_regexp_whitespace_non.asp) | 查找非空白字符。 |  |  |
| [\b](https://www.w3school.com.cn/jsref/jsref_regexp_begin.asp) | 匹配单词边界。（\b 匹配一个单词边界,比如've\b',可以匹配 love 里的 ve 而不匹配 very 里有 ve） |  | boundary |
| [\B](https://www.w3school.com.cn/jsref/jsref_regexp_begin_not.asp) | 匹配非单词边界。 |  |  |
| \0 | 查找 NUL 字符。 |  |  |
| [\n](https://www.w3school.com.cn/jsref/jsref_regexp_newline.asp) | 查找换行符。 |  |  |
| \f | 查找换页符。 |  |  |
| \r | 查找回车符。 | `\x0` |  |
| \t | 查找制表符。 | `\x09` |  |
| \v | 查找垂直制表符。 | `\x0b` |  |
| [\xxx](https://www.w3school.com.cn/jsref/jsref_regexp_octal.asp) | 查找以八进制数 xxx 规定的字符。 |  |  |
| [\xdd](https://www.w3school.com.cn/jsref/jsref_regexp_hex.asp) | 查找以十六进制数 dd 规定的字符。 |  |  |
| [\uxxxx](https://www.w3school.com.cn/jsref/jsref_regexp_unicode_hex.asp) | 查找以十六进制数 xxxx 规定的 Unicode 字符。 |  | Unicode |

## 量词

| 量词                                                                  | 描述                                        |
| :-------------------------------------------------------------------- | :------------------------------------------ |
| [n+](https://www.w3school.com.cn/jsref/jsref_regexp_onemore.asp)      | 匹配任何包含至少一个 n 的字符串。           |
| [n\*](https://www.w3school.com.cn/jsref/jsref_regexp_zeromore.asp)    | 匹配任何包含零个或多个 n 的字符串。         |
| [n?](https://www.w3school.com.cn/jsref/jsref_regexp_zeroone.asp)      | 匹配任何包含零个或一个 n 的字符串。         |
| [n{X}](https://www.w3school.com.cn/jsref/jsref_regexp_nx.asp)         | 匹配包含 X 个 n 的序列的字符串。            |
| [`n{X,Y}`](https://www.w3school.com.cn/jsref/jsref_regexp_nxy.asp)      | 匹配包含 X 至 Y 个 n 的序列的字符串。       |
| [`n{X,}`](https://www.w3school.com.cn/jsref/jsref_regexp_nxcomma.asp)   | 匹配包含至少 X 个 n 的序列的字符串。        |
| [n\$](https://www.w3school.com.cn/jsref/jsref_regexp_ndollar.asp)     | 匹配任何结尾为 n 的字符串。                 |
| [^n](https://www.w3school.com.cn/jsref/jsref_regexp_ncaret.asp)       | 匹配任何开头为 n 的字符串。                 |
| [?=n](https://www.w3school.com.cn/jsref/jsref_regexp_nfollow.asp)     | 匹配任何其后紧接指定字符串 n 的字符串。     |
| [?!n](https://www.w3school.com.cn/jsref/jsref_regexp_nfollow_not.asp) | 匹配任何其后没有紧接指定字符串 n 的字符串。 |

## RegExp 对象属性

| 属性 | 描述 | FF | IE |
| :-- | :-- | :-- | :-- |
| [global](https://www.w3school.com.cn/jsref/jsref_regexp_global.asp) | RegExp 对象是否具有标志 g。 | 1 | 4 |
| [ignoreCase](https://www.w3school.com.cn/jsref/jsref_regexp_ignorecase.asp) | RegExp 对象是否具有标志 i。 | 1 | 4 |
| [lastIndex](https://www.w3school.com.cn/jsref/jsref_lastindex_regexp.asp) | 一个整数，标示开始下一次匹配的字符位置。 | 1 | 4 |
| [multiline](https://www.w3school.com.cn/jsref/jsref_multiline_regexp.asp) | RegExp 对象是否具有标志 m。 | 1 | 4 |
| [source](https://www.w3school.com.cn/jsref/jsref_source_regexp.asp) | 正则表达式的源文本。 | 1 | 4 |

## RegExp 对象方法

| 方法 | 描述 | FF | IE |
| :-- | :-- | :-- | :-- |
| [compile](https://www.w3school.com.cn/jsref/jsref_regexp_compile.asp) | 编译正则表达式。 | 1 | 4 |
| [exec](https://www.w3school.com.cn/jsref/jsref_exec_regexp.asp) | 检索字符串中指定的值。返回找到的值，并确定其位置。 | 1 | 4 |
| [test](https://www.w3school.com.cn/jsref/jsref_test_regexp.asp) | 检索字符串中指定的值。返回 true 或 false。 | 1 | 4 |

## 支持正则表达式的 String 对象的方法

| 方法                                                           | 描述                             | FF  | IE  |
| :------------------------------------------------------------- | :------------------------------- | :-- | :-- |
| [search](https://www.w3school.com.cn/jsref/jsref_search.asp)   | 检索与正则表达式相匹配的值。     | 1   | 4   |
| [match](https://www.w3school.com.cn/jsref/jsref_match.asp)     | 找到一个或多个正则表达式的匹配。 | 1   | 4   |
| [replace](https://www.w3school.com.cn/jsref/jsref_replace.asp) | 替换与正则表达式匹配的子串。     | 1   | 4   |
| [split](https://www.w3school.com.cn/jsref/jsref_split.asp)     | 把字符串分割为字符串数组。       | 1   | 4   |

## 常用正则表达式

### 一、校验数字的表达式

- 数字：`^[0-9]\*$`
- n 位的数字：`^\d{n}$`
- 至少 n 位的数字：`^\d{n,}$`
- m-n 位的数字：`^\d{m,n}$`
- 零和非零开头的数字：`^(0|[1-9][0-9]\*)$`
- 非零开头的最多带两位小数的数字：`^([1-9][0-9]\*)+(\.[0-9]{1,2})?$`
- 带 1-2 位小数的正数或负数：`^(\-)?\d+(\.\d{1,2})$`
- 正数、负数、和小数：`^(\-|\+)?\d+(\.\d+)?$`
- 有两位小数的正实数：`^[0-9]+(\.[0-9]{2})?$`
- 有 1~3 位小数的正实数：`^[0-9]+(\.[0-9]{1,3})?$`
- 非零的正整数：`^[1-9]\d\*$ 或 ^([1-9][0-9]\*){1,3}$ 或 ^\+?[1-9][0-9]\*$`
- 非零的负整数：`^\-[1-9][]0-9"\*$ 或 ^-[1-9]\d\*$`
- 非负整数：`^\d+$ 或 ^[1-9]\d\*|0$`
- 非正整数：`^-[1-9]\d\*|0$ 或 ^((-\d+)|(0+))$`
- 非负浮点数：`^\d+(\.\d+)?$ 或 ^[1-9]\d\*\.\d\*|0\.\d\*[1-9]\d\*|0?\.0+|0$`
- 非正浮点数：`^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d\*\.\d\*|0\.\d\*[1-9]\d\*))|0?\.0+|0$`
- 正浮点数：`^[1-9]\d\*\.\d\*|0\.\d\*[1-9]\d\*$ 或 ^(([0-9]+\.[0-9]\*[1-9][0-9]\*)|([0-9]\*[1-9][0-9]\*\.[0-9]+)|([0-9]\*[1-9][0-9]\*))$`
- 负浮点数：`^-([1-9]\d\*\.\d\*|0\.\d\*[1-9]\d\*)$ 或 ^(-(([0-9]+\.[0-9]\*[1-9][0-9]\*)|([0-9]\*[1-9][0-9]\*\.[0-9]+)|([0-9]\*[1-9][0-9]\*)))$`
- 浮点数：`^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d\*\.\d\*|0\.\d\*[1-9]\d\*|0?\.0+|0)$`

---

### 二、校验字符的表达式

- 汉字：`^[\u4e00-\u9fa5]{0,}$`
- 英文和数字：`^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$`
- 长度为 3-20 的所有字符：`^.{3,20}$`
- 由 26 个英文字母组成的字符串：`^[A-Za-z]+$`
- 由 26 个大写英文字母组成的字符串：`^[A-Z]+$`
- 由 26 个小写英文字母组成的字符串：`^[a-z]+$`
- 由数字和 26 个英文字母组成的字符串：`^[A-Za-z0-9]+$`
- 由数字、26 个英文字母或者下划线组成的字符串：`^\w+$ 或 ^\w{3,20}$`
- 中文、英文、数字包括下划线：`^[\u4E00-\u9FA5A-Za-z0-9_]+$`
- 中文、英文、数字但不包括下划线等符号：`^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$`
- 可以输入含有^%&',;=?\$\"等字符：`[^%&',;=?$\x22]+`
- 禁止输入含有~的字符：`[^~\x22]+`

---

### 三、特殊需求表达式

- Email 地址：`^\w+([-+.]\w+)\*@\w+([-.]\w+)\*\.\w+([-.]\w+)\*$`
- 域名：`[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?`
- InternetURL：`[a-zA-z]+://[^\s]\* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]\*)?$`
- 手机号码：`^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$`
- 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：`^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$`
- 国内电话号码(0511-4405222、021-87888822)：`\d{3}-\d{8}|\d{4}-\d{7}`
- 电话号码正则表达式（支持手机号码，3-4 位区号，7-8 位直播号码，1－4 位分机号）: `((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)`
- 身份证号(15 位、18 位数字)，最后一位是校验位，可能为数字或字符 X：`(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)`
- 帐号是否合法(字母开头，允许 5-16 字节，允许字母数字下划线)：`^[a-zA-Z][a-zA-Z0-9_]{4,15}$`
- 密码(以字母开头，长度在 6~18 之间，只能包含字母、数字和下划线)：`^[a-zA-Z]\w{5,17}$`
- 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)：`^(?=.\*\d)(?=.\*[a-z])(?=.\*[A-Z])[a-zA-Z0-9]{8,10}$`
- 强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在 8-10 之间)：`^(?=.\*\d)(?=.\*[a-z])(?=.\*[A-Z]).{8,10}$`
- 日期格式：`^\d{4}-\d{1,2}-\d{1,2}`
- 一年的 12 个月(01 ～ 09 和 1 ～ 12)：`^(0?[1-9]|1[0-2])$`
- 一个月的 31 天(01 ～ 09 和 1 ～ 31)：`^((0?[1-9])|((1|2)[0-9])|30|31)$`
- 钱的输入格式：
  1. 有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：`^[1-9][0-9]\*$`
  2. 这表示任意一个不以 0 开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：`^(0|[1-9][0-9]\*)$`
  3. 一个 0 或者一个不以 0 开头的数字.我们还可以允许开头有一个负号：`^(0|-?[1-9][0-9]\*)$`
  4. 这表示一个 0 或者一个可能为负的开头不为 0 的数字.让用户以 0 开头好了.把负号的也去掉,因为钱总不能是负的吧。下面我们要加的是说明可能的小数部分：`^[0-9]+(.[0-9]+)?$`
  5. 必须说明的是,小数点后面至少应该有 1 位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：`^[0-9]+(.[0-9]{2})?$`
  6. 这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：`^[0-9]+(.[0-9]{1,2})?$`
  7. 这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：`^[0-9]{1,3}(,[0-9]{3})\*(.[0-9]{1,2})?$`
  8. 1 到 3 个数字,后面跟着任意个 逗号+3 个数字,逗号成为可选,而不是必须：`^([0-9]+|[0-9]{1,3}(,[0-9]{3})\*)(.[0-9]{1,2})?$`
  9. 备注：这就是最终结果了,别忘了"+"可以用"\*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
- xml 文件：`^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$`
- 中文字符的正则表达式：`[\u4e00-\u9fa5]`
- 双字节字符：`[^\x00-\xff] (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))`
- 空白行的正则表达式：`\n\s\*\r (可以用来删除空白行)`
- HTML 标记的正则表达式：`<(\S\*?)[^>]\*>.\*?|<.\*? /> ( 首尾空白字符的正则表达式：^\s\*|\s\*$或(^\s\*)|(\s\*$) (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)`
- 腾讯 QQ 号：`[1-9][0-9]{4,} (腾讯QQ号从10000开始)`
- 中国邮政编码：`[1-9]\d{5}(?!\d) (中国邮政编码为6位数字)`
- IP 地址：`((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))`

> 摘抄自：
>
> [https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp](https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)
>
> [https://c.runoob.com/front-end/854](https://c.runoob.com/front-end/854)
