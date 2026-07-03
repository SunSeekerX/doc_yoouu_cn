# CSS

互联网上已经有许多非常成熟、易懂、免费的公共资源，这里放几个他山之石，都是非常优质的资源。

[CSS 教程 - 菜鸟教程](https://www.runoob.com/css/css-tutorial.html)

[CSS - 学习 Web 开发| MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)

## 文章

[让 CSS flex 布局最后一行列表左对齐的 N 种方法 - 张鑫旭](https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/)

[免费的渐变背景 CSS3 样式 | oulu.me](https://color.oulu.me/)

[CSS 3D 示例 - https://polypane.app/css-3d-transform-examples/](https://polypane.app/css-3d-transform-examples/)

## 布局

只推荐`阮一峰`的教程，很用心，每一个效果都有图片。结合开发实例很好理解上手。

### flex 布局

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) By 阮一峰

[Flex 布局教程：实例篇](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html) By 阮一峰

[Flexbox 布局的最简单表单](http://www.ruanyifeng.com/blog/2018/10/flexbox-form.html) By 阮一峰

### Grid 布局

[CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html) By 阮一峰

## 代码块

### 01.css 禁用鼠标事件

```css
.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}
```

### 02.css 禁止用户选择

```css
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

### 03. 如何修改 chrome 记住密码后自动填充表单的黄色背景 ？

```css
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  background-color: rgb(250, 255, 189); /* #FAFFBD; */
  background-image: none;
  color: rgb(0, 0, 0);
}
```

### 04. 让页面里的字体变清晰，变细用 CSS 怎么做？

```css
-webkit-font-smoothing: antialiased;
```

### 05. 让 overflow:scroll 平滑滚动？

```css
-webkit-overflow-scrolling: touch;
```

### 06. 开启硬件加速

```css
/*
目前，像Chrome/Filefox/Safari/IE9+以及最新版本Opera都支持硬件加速，当检测到某个DOM元素应用了某些CSS规则时就会自动开启，从而解决页面闪白，保证动画流畅。
*/
.css {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
```

### 07. 消除 transtration 闪屏

```css
.css {
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
}
```

### 08. 改变输入框内提示文字颜色

```css
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
}
input:focus::-webkit-input-placeholder {
  color: #999;
}
```

### 09. 手机上的多行省略

```css
.overflow-hidden {
  display: box !important;
  display: -webkit-box !important;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /*第几行出现省略号*/
  /*text-align:justify;不能和溢出隐藏的代码一起写，会有bug*/
}
```

### 10. Css ellipsis

```css
/* 基本写法 */
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

/* 
    多行
    1.直接用css属性设置(只有-webkit内核才有作用)
    -webkit-line-clamp 用来限制在一个块元素显示的文本的行数,这是一个不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。

    display: -webkit-box 将对象作为弹性伸缩盒子模型显示 。

    -webkit-box-orient 设置或检索伸缩盒对象的子元素的排列方式 。

    text-overflow: ellipsis 以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。
*/

overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

### 11. Hide scrollbar

```css
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
```

### 12 有哪些适合网页显示的字体

1. robotoregular：(谷歌数字等宽字体)
2. Work Sans：（细小的字体）
