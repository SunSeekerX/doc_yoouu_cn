# 版本: <260703.0>

通用规则在全局 ~/.claude/CLAUDE.md（对话自动加载）。本文件只放 doc_yoouu_cn 项目专属规则；与全局冲突时以本文件为准。本项目是纯静态文档站，全局文件里后端/分布式/缓存/前端组件等技术栈章节不适用；行为准则、最少改动、复用优先等工程原则照常适用。

# doc_yoouu_cn 项目规则

## 项目概述

- SunSeekerX 的个人技术笔记站，线上地址 https://doc.yoouu.cn ，公开可访问并被搜索引擎收录
- 技术栈 VuePress 2 + vuepress-theme-hope 主题 + Vite bundler，纯静态站点，无业务代码
- 包管理器 pnpm；需要安装/卸载的依赖告诉用户，由用户执行
- 命令：pnpm dev 本地预览，pnpm build 构建；两者都由用户自行运行，不要主动执行
- 部署：push main 后 GitHub Actions（.github/workflows/main.yml）构建并同步 dist 到服务器
- 主要路径：docs/ 文档正文；docs/.vuepress/config.ts 站点与主题配置；docs/.vuepress/nav-bar.ts 顶部导航；docs/.vuepress/public/ 站点级静态资源；docs/.vuepress/ 下 .cache、.temp、dist 是构建产物，禁止手改

## 目录与命名

- 目录名一律小写，多个单词用 _ 连接，禁止连字符；docs/ 下目录层级即线上 URL 路径
- 新增文件名同样小写用 _；存量带连字符的文件名不批量改（改名等于改线上 URL，动之前要用户确认），确需改名必须全站更新引用
- 每个分类目录用小写 readme.md 作分类首页
- 图片等附件放文档所在目录的 assets/ 子目录，按文档名再分一层（如 assets/redmi9/），文件名只用 ASCII 字符

## 路由与链接

- 新增文档必须同时挂进 nav-bar.ts 对应分类；sidebar 已全局关闭，不进导航的页面只能靠站内搜索发现
- 站内链接用站内绝对路径（如 /back_end/docker），指向分类首页以 / 结尾（如 /blockchain/）；禁止写 https://doc.yoouu.cn 前缀（换域名与本地预览都会断）
- 指向自有 CDN static.yoouu.cn 的图片 URL 是 CDN 存储路径，与 docs/ 目录结构无关，目录改名时禁止连带改它
- 删除、移动、重命名任何文档前，先全站 grep 旧路径，更新 nav-bar.ts 与全部文内引用，并提醒用户外部收录的旧链接会失效

## Markdown 写作规范

- 每篇文档有且只有一个一级标题放在文首作为页面标题；正文从二级标题开始逐级递进，不跳级；页内目录只收录 2 到 4 级标题（config.ts 的 markdown.headers.level）
- 一篇只讲一个主题，篇幅过大按主题拆成子目录多篇（参考 back_end/nestjs/ 系列），拆分后在该目录 readme.md 里做索引
- 代码块必须标注语言以启用高亮；终端示例不带 $ 提示符，方便直接复制
- 提示、警告、折叠用主题容器语法（::: tip、::: warning、::: danger、::: details），不用引用符号模拟
- 同一操作的多平台/多工具等价命令用 codeTabs 分组，不平铺重复
- 图片放本地 assets 子目录或自有 CDN static.yoouu.cn，禁止第三方图床外链；图片写 alt 描述
- 中英文之间留一个空格；专有名词大小写规范，如 GitHub、JavaScript、Node.js、macOS
- 转载或整理自他人文章的内容，在文首或文末注明来源链接
- 页面日期由 git 提交时间自动生成，正文不手写最后更新时间
- 表格只放短枚举，列多或单元格内容长就改用列表
- 站点公开，文档内禁止出现真实 token、密钥、服务器 IP、手机号等敏感信息，提交前自查

## 格式化与文风

- 格式统一交给 prettier（配置见 .prettierrc.yaml，proseWrap never 不强制折行），修改文档时不顺手重排无关段落的格式
- 全局规则「指导文件用纯文字」只约束 CLAUDE.md 这类指导文件；docs/ 下的文档正文正常使用全部 Markdown 语法与主题扩展语法
