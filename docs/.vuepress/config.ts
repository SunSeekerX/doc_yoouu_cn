import { defineUserConfig } from 'vuepress'
import { comment, hopeTheme } from 'vuepress-theme-hope'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { viteBundler } from '@vuepress/bundler-vite'
import { zhNavbar } from './nav-bar.js'
// import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'

export default defineUserConfig({
  base: "/",
  title: `SunSeekerX's Notebook`,
  description:
    'Javascript、HTML、CSS、Android、iOS、Flutter、NPM、NodeJS、Vue、React、Uni-app、JAVA、Kotlin、NodeJS、Golang、Linux、Docker、Mysql、Solidity、NFT、ETH、BNB、BTC、Windows、Mac、Power shell、zsh、Nginx、Git、Proxy、刷机、黑苹果、Adobe',
  bundler: viteBundler(),
  plugins: [
    // searchProPlugin({
    //   // 配置选项
    //   indexContent: true,
    //   hotReload: true,
    //   searchDelay: 800,
    // }),
    // 谷歌分析 https://doc.yoouu.cn
    googleAnalyticsPlugin({
      id: 'G-5XJZQ6WCSH',
      debug: false,
    }),
    // commentPlugin({
    //   provider: 'Twikoo',
    //   envId: 'https://twikoo-doc.yoouu.cn',
    //   // 选项
    // }),
    // pwaPlugin({
    //   // 选项
    // }),
    
  ],
  markdown: {
    headers: {
      level: [2, 3, 4],
    },
  },
  lang: 'zh-CN',
  // 使用 pwa 设置
  shouldPrefetch: true,
  // Enable it with pwa
  // shouldPrefetch: false,
  theme: hopeTheme({
    pure: true,
    hostname: 'https://doc.yoouu.cn',
    author: {
      name: 'SunSeekerX',
      url: 'https://doc.yoouu.cn',
    },
    // iconAssets: 'iconfont',
    // iconAssets: 'iconify',
    // logo: '/nav-logo.svg',
    repo: 'SunSeekerX/doc.yoouu.cn',
    docsDir: 'docs',
    // pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime', 'PageView'],
    pageInfo: [ 'Original', 'Date', 'Category', 'Tag',  'PageView'],
    editLink: false,
    locales: {
      '/': {
        navbar: zhNavbar,
        sidebar: false,
        footer: '',
        displayFooter: true,
        metaLocales: {
          editLink: '在 GitHub 上编辑此页',
        },
      },
    },
    markdown: {
      linkify:true,
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      tabs: true,
      codeTabs: true,

      // install katex or before enabling it
      // math: {
      //   type: "katex" // or "mathjax"
      // },
      // install chart.js before enabling it
      chartjs: true,
      // insert component easily
      // install echarts before enabling it
      echarts: true,
      // install flowchart.ts before enabling it
      // flowchart: true,
      // gfm requires mathjax-full to provide tex support
      gfm: true,
      // install mermaid before enabling it
      // mermaid: true,
      // playground: {
      //   presets: ["ts", "vue"],
      // },
      // install @vue/repl before enabling it
      // vuePlayground: true,
      // install @vuepress/plugin-revealjs before enabling it
      // revealjs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
        revealjs: {
          plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
          themes: [
            'auto',
            'beige',
            'black',
            'blood',
            'league',
            'moon',
            'night',
            'serif',
            'simple',
            'sky',
            'solarized',
            'white',
          ],
        },
         
    },
    plugins: {
      comment: {
        provider: 'Twikoo',
        envId: 'https://twikoo-doc.yoouu.cn',
      },
      // comment: {
      //   provider: 'Artalk',
      //   server: 'https://artalk.yoouu.cn',
      // },
      // mdEnhance: {
      //   align: true,
      //   attrs: true,
      //   chart: true,
      //   codetabs: true,
      //   demo: true,
      //   echarts: true,
      //   figure: true,
      //   gfm: true,
      //   imgLazyload: true,
      //   imgMark: true,
      //   imgSize: true,
      //   mathjax: false,
      //   mark: true,
      //   mermaid: true,
      //   playground: {
      //     presets: ['ts', 'vue', 'unocss'],
      //   },
      //   revealJs: {
      //     plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      //     themes: [
      //       'auto',
      //       'beige',
      //       'black',
      //       'blood',
      //       'league',
      //       'moon',
      //       'night',
      //       'serif',
      //       'simple',
      //       'sky',
      //       'solarized',
      //       'white',
      //     ],
      //   },
      //   stylize: [
      //     {
      //       matcher: 'Recommended',
      //       replacer: ({ tag }) => {
      //         if (tag === 'em')
      //           return {
      //             tag: 'Badge',
      //             attrs: { type: 'tip' },
      //             content: 'Recommended',
      //           }
      //       },
      //     },
      //   ],
      //   sub: true,
      //   sup: true,
      //   tabs: true,
      //   vPre: true,
      //   vuePlayground: true,
      // },
      // pwa: {
      //   themeColor: '#096dd9',
      //   update: 'force',
      //   favicon: '/favicon.ico',
      //   maxSize: 40960,
      //   cacheHTML: true,
      //   cachePic: true,
      //   appendBase: true,
      //   apple: {
      //     icon: '/assets/icon/apple-icon-152.png',
      //     statusBarColor: 'black',
      //   },
      //   msTile: {
      //     image: '/assets/icon/ms-icon-144.png',
      //     color: '#ffffff',
      //   },
      //   manifest: {
      //     icons: [
      //       {
      //         src: '/assets/icon/chrome-mask-512.png',
      //         sizes: '512x512',
      //         purpose: 'maskable',
      //         type: 'image/png',
      //       },
      //       {
      //         src: '/assets/icon/chrome-mask-192.png',
      //         sizes: '192x192',
      //         purpose: 'maskable',
      //         type: 'image/png',
      //       },
      //       {
      //         src: '/assets/icon/chrome-512.png',
      //         sizes: '512x512',
      //         type: 'image/png',
      //       },
      //       {
      //         src: '/assets/icon/chrome-192.png',
      //         sizes: '192x192',
      //         type: 'image/png',
      //       },
      //     ],
      //     theme_color: '#096dd9',
      //   },
      // },
      // searchPro: {
      //   indexContent: true,
      //   hotReload: true,
      //   searchDelay: 800,
      // },
      slimsearch:{
        indexContent: true
      }
    },
  }, { custom: true },),
})
