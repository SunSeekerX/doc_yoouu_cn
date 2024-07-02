# 开发工具技巧

## Ditto 剪贴板

- 修改弹出大小，直接拖动就好了

## VSCode

### 中文匹配正则

要匹配中文字符

```regex
[\u4e00-\u9fa5]
```

匹配连续的中文字符

```regex
[\u4e00-\u9fa5]+
```

### Setting sync id

请复制这个 ID 并将其用于其他设备来下载配置。

```
7e4a454490b30e5e5934976993e322ce
```

### Profile

文件导入方式

[https://static.yoouu.cn/binary/vscode/2023-04-07-sunseekerx.code-profile](https://static.yoouu.cn/binary/vscode/2023-04-07-sunseekerx.code-profile)

**正式版**

https://vscode.dev/profile/github/b854f73f6d01fd0c1467f2fdb6ae3cce

**insiders**

[https://insiders.vscode.dev/profile/github/8f16311ba1b7f390d0e5d7297cc12400](https://insiders.vscode.dev/profile/github/8f16311ba1b7f390d0e5d7297cc12400)

### VSCode setting

**Current profile settings json**

更新时间：2023-04-07 12:20:48

```json
{
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[dart]": {
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": false
  },
  "[dockerfile]": {
    "editor.defaultFormatter": "foxundermoon.shell-format"
  },
  "[handlebars]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[nginx]": {
    "editor.defaultFormatter": "raynigon.nginx-formatter"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.bracketPairColorization.enabled": true,
  "breadcrumbs.icons": false,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.fontFamily": "JetBrains Mono Medium",
  "editor.fontLigatures": true,
  "editor.rulers": [120],
  "editor.smoothScrolling": true,
  "editor.guides.bracketPairs": "active",
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "extensions.ignoreRecommendations": true,
  "fileheader.configObj": {
    "autoAdd": true,
    "autoAddLine": 10000,
    "language": {
      "js/ts/scss/java": {
        "end": " */",
        "head": "/**",
        "middle": " * @"
      }
    },
    "prohibitAutoAdd": ["json", "md"]
  },
  "fileheader.customMade": {
    "Date": "Do not edit",
    "LastEditTime": "Do not edit",
    "LastEditors": "SunSeekerX",
    "author": "SunSeekerX",
    "name": ""
  },
  "files.associations": {
    "pages.json": "jsonc",
    "manifest.json": "jsonc",
    "*.nvue": "vue",
    "*.ttss": "css",
    "*.wxss": "css",
    "*.sjs": "javascript",
    "*.ttml": "ttml",
    "*.wxml": "ttml",
    "*.sk": "ttml"
  },
  "files.maxMemoryForLargeFilesMB": 8192,
  "files.insertFinalNewline": true,
  "git.autofetch": true,
  "prettier.printWidth": 120,
  "redhat.telemetry.enabled": true,
  "sync.autoDownload": true,
  "sync.autoUpload": true,
  "sync.gist": "2c432996f24c8b1d19d24954b03f1079",
  "sync.quietSync": true,
  "tabnine.experimentalAutoImports": true,
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.drawBoldTextInBrightColors": false,
  "terminal.integrated.profiles.windows": {
    "Command Prompt": {
      "args": [],
      "icon": "terminal-cmd",
      "path": ["${env:windir}\\Sysnative\\cmd.exe", "${env:windir}\\System32\\cmd.exe"]
    },
    "Git Bash": {
      "source": "Git Bash"
    },
    "PowerShell": {
      "args": ["-NoLogo"],
      "icon": "terminal-powershell",
      "source": "PowerShell"
    },
    "Windows PowerShell": {
      "args": ["-NoLogo"],
      "path": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
    }
  },
  "vsicons.dontShowNewVersionMessage": true,
  "workbench.list.smoothScrolling": true,
  "workbench.startupEditor": "none",
  "workbench.tips.enabled": true,
  "cSpell.userWords": ["nvue"],
  "debug.console.fontSize": 14,
  "debug.console.fontFamily": "",
  "terminal.integrated.fontFamily": "JetBrainsMono Nerd Font",
  "workbench.iconTheme": "vscode-icons",
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true,
    "**/.byte-ide": true
  },
  "emmet.includeLanguages": {
    "sjs": "javascript"
  },
  "window.zoomLevel": 1,
  "eslint.ignoreUntitled": true,
  "eslint.codeAction.disableRuleComment": {
    "location": "sameLine",
    "commentStyle": "block"
  },
  "errorLens.enabled": false,
  "workbench.colorTheme": "Atom One Dark",
  "[xml]": {
    "editor.defaultFormatter": "redhat.vscode-xml"
  }
}
```

**User setting json**

更新时间：2023-04-07 12:20:42

```json
{
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[dart]": {
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": false
  },
  "[dockerfile]": {
    "editor.defaultFormatter": "foxundermoon.shell-format"
  },
  "[handlebars]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[nginx]": {
    "editor.defaultFormatter": "raynigon.nginx-formatter"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.bracketPairColorization.enabled": true,
  "breadcrumbs.icons": false,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.fontFamily": "JetBrains Mono Medium",
  "editor.fontLigatures": true,
  "editor.rulers": [120],
  "editor.smoothScrolling": true,
  "editor.guides.bracketPairs": "active",
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "extensions.ignoreRecommendations": true,
  "fileheader.configObj": {
    "autoAdd": true,
    "autoAddLine": 10000,
    "language": {
      "js/ts/scss/java": {
        "end": " */",
        "head": "/**",
        "middle": " * @"
      }
    },
    "prohibitAutoAdd": ["json", "md"]
  },
  "fileheader.customMade": {
    "Date": "Do not edit",
    "LastEditTime": "Do not edit",
    "LastEditors": "SunSeekerX",
    "author": "SunSeekerX",
    "name": ""
  },
  "files.associations": {
    "pages.json": "jsonc",
    "manifest.json": "jsonc",
    "*.nvue": "vue",
    "*.ttss": "css",
    "*.wxss": "css",
    "*.sjs": "javascript",
    "*.ttml": "ttml",
    "*.wxml": "ttml",
    "*.sk": "ttml"
  },
  "files.maxMemoryForLargeFilesMB": 8192,
  "files.insertFinalNewline": true,
  "git.autofetch": true,
  "prettier.printWidth": 120,
  "redhat.telemetry.enabled": true,
  "security.workspace.trust.banner": "never",
  "security.workspace.trust.enabled": false,
  "sync.autoDownload": true,
  "sync.autoUpload": true,
  "sync.gist": "2c432996f24c8b1d19d24954b03f1079",
  "sync.quietSync": true,
  "tabnine.experimentalAutoImports": true,
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.drawBoldTextInBrightColors": false,
  "terminal.integrated.profiles.windows": {
    "Command Prompt": {
      "args": [],
      "icon": "terminal-cmd",
      "path": ["${env:windir}\\Sysnative\\cmd.exe", "${env:windir}\\System32\\cmd.exe"]
    },
    "Git Bash": {
      "source": "Git Bash"
    },
    "PowerShell": {
      "args": ["-NoLogo"],
      "icon": "terminal-powershell",
      "source": "PowerShell"
    },
    "Windows PowerShell": {
      "args": ["-NoLogo"],
      "path": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
    }
  },
  "vsicons.dontShowNewVersionMessage": true,
  "workbench.list.smoothScrolling": true,
  "workbench.startupEditor": "none",
  "workbench.tips.enabled": true,
  "cSpell.userWords": ["nvue"],
  "debug.console.fontSize": 14,
  "debug.console.fontFamily": "",
  "terminal.integrated.fontFamily": "JetBrainsMono Nerd Font",
  "workbench.iconTheme": "vscode-icons",
  "update.showReleaseNotes": false,
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true,
    "**/.byte-ide": true
  },
  "emmet.includeLanguages": {
    "sjs": "javascript"
  },
  "window.zoomLevel": 1,
  "eslint.ignoreUntitled": true,
  "eslint.codeAction.disableRuleComment": {
    "location": "sameLine",
    "commentStyle": "block"
  },
  "errorLens.enabled": false,
  "workbench.colorTheme": "Atom One Dark",
  "[xml]": {
    "editor.defaultFormatter": "redhat.vscode-xml"
  }
}
```

### 快捷键

#### 递归折叠方法

折叠当前光标下所有方法与参数

先按`ctrl+k`，然后`ctrl+0`

## jetbrains

### 格式化代码快捷键

`Ctrl+Alt+L`

### IntelliJ IDEA 2018 设置代码提示对大小写不敏感

setting->Editor->General->Code Completion 取消勾选 Match case

## IDEA

### 激活

> 文档内的方法如果失效了，自己 Google 一下。就解决了，如果我自己使用文档方法无法激活才会更新。

激活码网站

[IntelliJ IDEA 激活码](http://idea.fxw.la/)

[http://idea.medeming.com/code/](http://idea.medeming.com/code/)

2020.1 的补丁 + 激活码

> 最新补丁：https://share.weiyun.com/5hbLsZy
>
> 密码：9gsu6b

效果图：

![](https://static.yoouu.cn/imgs/doc/basic/ide/idea-2020-register.png)
