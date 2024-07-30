# 浏览器技巧

## 关闭 chrome 自动跳转到 https

在开发和调试过程中，您可能需要关闭 Chrome 自动跳转到 HTTPS 的功能。以下是几种方法来实现这一点：

### 方法一：清除 HSTS 设置

Chrome 会缓存 HSTS（HTTP Strict Transport Security）设置，这可能导致它自动将 HTTP 请求重定向到 HTTPS。您可以通过以下步骤清除 HSTS 设置：

1. 打开 Chrome 浏览器。
2. 在地址栏中输入 `chrome://net-internals/#hsts` 并按下回车键。
3. 在页面上找到 `Delete domain security policies` 部分。
4. 在 `Domain` 字段中输入您要清除 HSTS 设置的域名，例如 `example.com`。
5. 点击 `Delete` 按钮。

### 方法二：使用隐身模式

隐身模式不会使用现有的浏览数据，因此可以避免缓存的 HSTS 设置。您可以通过以下方式打开隐身模式：

1. 点击 Chrome 右上角的三点菜单。
2. 选择 `New Incognito Window`（新建隐身窗口）。
3. 在隐身窗口中访问您需要测试的 HTTP 网址。

### 方法三：禁用 HSTS 域策略

您可以在 Chrome 设置中禁用特定域的 HSTS 策略：

1. 打开 Chrome 浏览器。
2. 在地址栏中输入 `chrome://net-internals/#hsts` 并按下回车键。
3. 在页面上找到 `Query domain` 部分。
4. 在 `Domain` 字段中输入您要查询的域名，例如 `example.com` 并点击 `Query` 按钮。
5. 如果结果显示域名有 HSTS 设置，您可以在 `Delete domain security policies` 部分输入域名并点击 `Delete` 按钮。

### 方法四：禁用 HTTPS 强制

在 Chrome 中，您可以通过命令行参数来禁用 HTTPS 强制：

1. 关闭所有 Chrome 窗口。

2. 按以下步骤启动 Chrome：

   - **Windows**: 右键点击 Chrome 快捷方式，选择 `属性`。在 `目标` 字段的末尾添加 `--disable-features=BlockInsecurePrivateNetworkRequests`。

   - Mac: 打开终端，输入以下命令并按回车键：

     ```shell
     open -a "Google Chrome" --args --disable-features=BlockInsecurePrivateNetworkRequests
     ```

   - Linux: 打开终端，输入以下命令并按回车键：

     ```shell
     google-chrome --disable-features=BlockInsecurePrivateNetworkRequests
     ```

### 方法五：使用 localhost（开发环境）

如果您在本地开发环境中测试，可以使用 `localhost` 或 `127.0.0.1`，因为这些通常不会触发 HSTS 重定向。

## 地址栏显示完整的url 包括协议

在 Chrome 浏览器中，默认情况下地址栏可能不会显示完整的 URL（包括协议部分，如 `http://` 或 `https://`），特别是当 URL 使用 HTTPS 协议时。要让地址栏显示完整的 URL，包括协议部分，您可以通过以下方法进行设置。

### 方法一：通过 Chrome 设置启用

1. 打开 Chrome 浏览器。
2. 在地址栏中输入 `chrome://flags/` 并按下回车键。
3. 在搜索栏中输入 `Omnibox UI Hide Steady-State URL Scheme and Trivial Subdomains`。
4. 将该选项设置为 `Disabled`。
5. 点击页面底部的 `Relaunch` 按钮以重启 Chrome。

### 方法二：使用右键菜单显示完整 URL

如果您不想更改浏览器设置，也可以通过地址栏的右键菜单临时显示完整的 URL：

1. 在地址栏中右键点击 URL。
2. 选择 `Always show full URLs` 选项。

### 方法三：使用命令行启动 Chrome

您也可以通过命令行参数启动 Chrome 以确保显示完整的 URL：

1. **Windows**：

   - 右键点击 Chrome 快捷方式，选择 `属性`。

   - 在 `目标` 字段的末尾添加 `--enable-features=OmniboxUIExperimentHideSteadyStateURLSchemeAndSubdomains,SimplifyHTTPSIndicator`.

   - 例如：

     ```shell
     "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --enable-features=OmniboxUIExperimentHideSteadyStateURLSchemeAndSubdomains,SimplifyHTTPSIndicator
     ```

   - 点击 `确定` 并重新启动 Chrome。

2. **Mac**：

   - 打开终端，输入以下命令并按回车键：

     ```shell
     open -a "Google Chrome" --args --enable-features=OmniboxUIExperimentHideSteadyStateURLSchemeAndSubdomains,SimplifyHTTPSIndicator
     ```

3. **Linux**：

   - 打开终端，输入以下命令并按回车键：

     ```shell
     google-chrome --enable-features=OmniboxUIExperimentHideSteadyStateURLSchemeAndSubdomains,SimplifyHTTPSIndicator
     ```

### 方法四：通过 Chrome 扩展程序

有些 Chrome 扩展程序可以强制浏览器显示完整的 URL。以下是一些可能有用的扩展程序：

1. Show Full URL
   - 这个扩展程序可以强制显示完整的 URL，包括协议部分。
   - 您可以在 Chrome 网上应用店中搜索并安装该扩展程序。

### 总结

通过调整 Chrome 设置、使用右键菜单、命令行参数启动 Chrome 或安装扩展程序，您可以让地址栏显示完整的 URL，包括协议部分。选择最适合您的方法，并根据需要进行设置。

## 关闭 chrome 左上角标签页搜索功能

There is no Enable Tab Search in chrome://flags anymore! The **`about:flags/#chrome-refresh-2023 `**solution moves this button to the left side, but no way to disable it for good. Hope google will return this flag back

```
about:flags/#chrome-refresh-2023
```

## 配置 Firefox 垂直标签栏

Firefox 原生不支持垂直标签栏，但可以通过扩展实现，比如 Sidebery 或者 Tree Style Tab。装上插件之后确实会展示类似 Edge 的垂直标签栏。但是，原来的水平标签并没有隐藏。也就是说同一个标签会显示在两个地方。这让强迫症晚期的我怎么忍？今天就分享一种在 Firefox 上完美实现垂直标签栏的方案。

首先要安装一款垂直标签扩展，推荐 Sidebery，因为 Tree Style Tab 默认不支持暗黑模式。安装之后就会看到左边的标签栏。我们还可以通过快捷键`ctrl-e`打开或关闭标签栏。

![Sidebery 无法隐藏水平标签栏](https://taoshu.in/imgs/firefox-sidebery-default.jpg) Sidebery 无法隐藏水平标签栏

现在我们想办法隐藏水平标签栏。

Firefox 支持通过 CSS 定制界面。对应的 CSS 规则需要保存到名为 userChrome.css 的文件。而且这个文件的保存路径也很讲究，需要放到 profile 文件夹下的 chrome 文件夹。别看这里也有一个 chrome，它跟谷歌的 Chrome 浏览器没有关系。

这个 profile 文件夹就是 Firefox 保存配置的地方。它在不同系统上的位置也不一样，但 Firefox 提供了统一的查看页面。依次点击 ☰ -> [Help] -> [More Troubleshooting Information]会打开一个信息页面，在里面查找[Profile Folder]就会看到对应的路径。左边应该有一个按钮，点击就可以打开一个目标路径。

如果是中文界面，需要点击 ☰ -> [帮助] -> [更多排障信息]，然后搜索[配置文件夹]。

打开的文件夹中可能有多个文件夹，但系统会选中正在使用的那个。点击进入就能看到配置文件。感谢读者胡一派指正。

然后我们在 profile 文件夹里面创建 chrome 文件夹，然后再新建 userChrome.css 文件，内容为：

```
#TabsToolbar {
  visibility: collapse;
}
```

保存之后重启 Firefox，然后发现没有任何作用 😂 这是因为从 69 版本开始，Firefox 默认不再自动加载 userChrome.css 文件。我们需要手工开启这个特性。开启方法如下：

1. 新建标签，输入 about:config 并回车
2. 首次打开可能会看到 Firefox 的提示，说修改配置可能影响功能，要小心
3. 同意之后，在新的页面最上方的搜索框，输入 `userprof` 并回车
4. 双击`toolkit.legacyUserProfileCustomizations.stylesheets`会将其修改为`true`

现在再重启 Firefox，水平标签栏就会被隐藏起来。

![隐藏水平标签栏](https://taoshu.in/imgs/firefox-sidebery-hide-tabbar.jpg) 隐藏水平标签栏

这是非常简洁的 UI，我非常喜欢。但是它有两个问题。第一，窗口的关闭、最大、最小按钮也消失了。第二，办法用鼠标移动 Firefox 窗口。

最简单的方案是让 Firefox 显示标题栏。右键地址栏两侧的任意图标，点击[Customize toolbar…]会打开一个新页面，选中左下角的 Title Bar，最后点击右下角的[Done]。如此 Firefox 就会重新展示标题栏，移动窗口的问题也一并解决。

![标题栏显示效果](https://taoshu.in/imgs/firefox-title-bar.jpg) 标题栏显示效果

但是，我更喜欢简洁的界面。如果是关闭窗口，可以直接使用`⌘+w`，退出按`⌘+q`，进入全屏用`^+⌘+f`。这些都是 mac 系统的标准快捷键。但窗口移动这个问题不好解决。

有一个不那么优雅的方案。如果你没有调整过 Firefox 的默认布局，地址栏跟左右两边的图标之间会有一段空白，它的长度会动态调整。屏幕越宽，空白越长。可以用鼠标点击这两块空白区域实现移动窗口。但我之前总觉得这种设计很丑，所以会第一时间删除这两段空白。但跟显示标题栏相比，显示空白也不是什么大问题了。所以再回到上面的[Customize toolbar…]页面，把 Flexible Space 重新拖拽到地址栏两边就可以了。

<iframe id="aswift_1" name="aswift_1" style="left: 0px; top: 0px; border: 0px none; width: 800px; height: 0px;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" src="https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-1675550068685852&amp;output=html&amp;h=280&amp;adk=2957514618&amp;adf=314069034&amp;pi=t.aa~a.2515182043~i.53~rp.4&amp;w=800&amp;fwrn=4&amp;fwrnh=100&amp;lmt=1687831069&amp;num_ads=1&amp;rafmt=1&amp;armr=3&amp;sem=mc&amp;pwprc=3665232219&amp;ad_type=text_image&amp;format=800x280&amp;url=https%3A%2F%2Ftaoshu.in%2Ffirefox%2Fvertical-tabs.html&amp;fwr=0&amp;pra=3&amp;rh=200&amp;rw=800&amp;rpe=1&amp;resp_fmts=3&amp;wgl=1&amp;fa=27&amp;dt=1688526673361&amp;bpp=1&amp;bdt=794&amp;idt=1&amp;shv=r20230627&amp;mjsv=m202306260101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie=ID%3Dabfbbd14272e3477-227f527f8ee200d5%3AT%3D1688526020%3ART%3D1688526359%3AS%3DALNI_MY6WkFb37OfiN-THavqSoEs68HQeA&amp;gpic=UID%3D00000c96827bc1c8%3AT%3D1688526020%3ART%3D1688526359%3AS%3DALNI_MaDl0LxoCbXgQHm63wdl91HKC-_Qg&amp;prev_fmts=0x0&amp;nras=2&amp;correlator=6152084093157&amp;frm=20&amp;pv=1&amp;ga_vid=2118617151.1688526023&amp;ga_sid=1688526673&amp;ga_hid=1469554680&amp;ga_fc=1&amp;u_tz=480&amp;u_his=2&amp;u_h=1440&amp;u_w=3440&amp;u_ah=1392&amp;u_aw=3440&amp;u_cd=24&amp;u_sd=1&amp;adx=217&amp;ady=2690&amp;biw=1234&amp;bih=888&amp;scr_x=0&amp;scr_y=0&amp;eid=42532280%2C44759926%2C44759875%2C44759842%2C42532278%2C31075643%2C31075665%2C42531705%2C44785292%2C44788442&amp;oid=2&amp;pvsid=606485017619302&amp;tmod=695562629&amp;nvt=1&amp;fc=1408&amp;brdim=539%2C317%2C539%2C317%2C3440%2C0%2C1601%2C993%2C1234%2C888&amp;vis=1&amp;rsz=%7C%7Cs%7C&amp;abl=NS&amp;fu=128&amp;bc=31&amp;ifi=2&amp;uci=a!2&amp;btvi=1&amp;fsb=1&amp;xpc=MZgIsEAjO3&amp;p=https%3A//taoshu.in&amp;dtd=101" data-google-container-id="a!2" data-load-complete="true" data-google-query-id="CISjxILM9v8CFRjWFgUd9AwG7g" width="800" height="0" frameborder="0"></iframe>

最后需要优化的就是侧边栏的标题。Firefox 默认为显示当前的扩展名，也就是 Sidebery。我感觉没有必要，可以往 userChrome.css 添加如下样式规则：

```
#sidebar-header {
  visibility: collapse !important;
}
```

最终的显示效果如下，地址栏两边有空白，侧边栏的标题也已经隐藏：

![极简侧边栏最终显示效果](https://taoshu.in/imgs/firefox-vertical-tap.jpg) 极简侧边栏最终显示效果

以上就是全部的配置过程。说起垂直标签栏，最早还是微软在 Edge 浏览器实现的。但 Edge 的标签栏有两个问题。第一，虽然它能隐藏水平标签栏，但原来的 UI 并不会隐藏，只是不显示水平标签罢了。这就没办法扩大垂直方向上的显示区域。第二，也是最大的问题，它不支持全屏模式，一旦进入全屏就会切换成水平标签栏。相比之下，Firefox 的实现虽然不那么方便，却能真正提高屏幕的利用率，完爆 Edge。Chrome 也有类似的插件，但不支持隐藏水平标签，还不如 Edge。所以 Firefox 胜出 ✌️

读者 donie.leigh 留言说为什么不用 Vivaldi。主要因为它用的也是 Chromium 内核。我很久之前就用过，当时感觉界面有点卡。收到留言后我又体验了一下，Vivaldi 的垂直标签栏比 Edge 做的要好，但比 Firefox 的实现效果还差一点 😄

[https://taoshu.in/firefox/vertical-tabs.html](https://taoshu.in/firefox/vertical-tabs.html)
