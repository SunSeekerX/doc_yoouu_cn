import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  // 简介
  { text: '简介', link: '/intro', icon: 'creative' },
  // AI
  { text: 'AI', link: '/ai/', icon: 'anonymous' },
  // 基础
  {
    text: '基础',
    children: [
      {
        text: '资源',
        link: '/basic/resource',
      },
      {
        text: '工具资源',
        link: '/basic/resource-tool',
      },
      { text: '正则表达式', link: '/basic/regexp' },
      { text: '代理设置大全', link: '/basic/proxy' },
      {
        text: 'Git',
        children: [{ text: 'Git 命令', link: '/basic/git' }],
      },
      {
        text: '工具 & 技巧',
        children: [
          { text: '开发工具技巧', link: '/basic/ide' },
          { text: 'PowerShell', link: '/basic/powershell' },
          { text: 'Windows 技巧', link: '/basic/windows' },
          { text: 'Mac 技巧', link: '/basic/mac' },
          { text: '浏览器技巧', link: '/basic/browser' },
        ],
      },
      {
        text: '其他',
        children: [
          { text: 'Jenkins', link: '/basic/jenkins' },
          { text: 'Nginx', link: '/basic/nginx' },
          { text: 'Markdown', link: '/basic/markdown' },
          { text: '关于工作', link: '/basic/about-work' },
        ],
      },
    ],
  },
  // 前端 - front-end
  {
    text: '前端',
    children: [
      {
        text: '基础',
        children: [
          { text: '概览', link: '/front-end/' },
          { text: 'Html', link: '/front-end/html' },
          { text: 'Css', link: '/front-end/css' },
          { text: 'JavaScript', link: '/front-end/javascript' },
          { text: 'Typescript', link: '/front-end/typescript' },
          { text: 'Objective-C 基础', link: '/front-end/oc' },
          { text: 'Objective-C 高级', link: '/front-end/oc-advance' },
        ],
      },
      {
        text: '技能',
        children: [
          { text: 'NPM 技巧', link: '/front-end/npm' },
          { text: 'Vue', link: '/front-end/vue' },
          { text: 'React', link: '/front-end/react' },
          { text: '小程序', link: '/front-end/mp' },
          {
            text: 'Flutter',
            link: '/front-end/flutter',
          },
          {
            text: 'React Native',
            link: '/front-end/react-native',
          },
        ],
      },
      {
        text: 'Uni-app',
        children: [
          { text: 'Uni-app - 概览', link: '/front-end/uni-app/' },
          { text: 'Uni-app - awesome', link: '/front-end/uni-app/awesome-uni-app' },
          { text: 'Uni-app -  原生插件', link: '/front-end/uni-app/nativeplugins/' },
          { text: 'Uni-app -  Android 离线打包', link: '/front-end/uni-app/offline-build-android' },
          { text: 'Uni-app -  IOS 离线打包', link: '/front-end/uni-app/offline-build-ios' },
        ],
      },
      {
        text: 'Android',
        children: [
          {
            text: 'Android - 概览',
            link: '/front-end/android/',
          },
          {
            text: 'Android - 开发',
            link: '/front-end/android/dev',
          },
          {
            text: 'Android - 问题',
            link: '/front-end/android/issue',
          },
        ],
      },
      {
        text: 'IOS',
        children: [
          {
            text: 'IOS - 概览',
            link: '/front-end/ios/',
          },
          {
            text: 'IOS - 开发',
            link: '/front-end/ios/dev',
          },
          {
            text: 'IOS - 问题',
            link: '/front-end/ios/issue',
          },
        ],
      },
      {
        text: '其他',
        children: [
          {
            text: 'javascript-obfuscator',
            link: '/front-end/javascript-obfuscator',
          },
        ],
      },
    ],
  },
  // 后端 - back-end
  {
    text: '后端',
    // link: '/back-end/linux',
    children: [
      { text: '概览', link: '/back-end/' },
      { text: 'Linux', link: '/back-end/linux' },
      // { text: 'C', link: '/back-end/c' },
      // { text: 'SQL', link: '/back-end/sql' },
      { text: 'Database', link: '/back-end/database' },
      { text: 'Docker', link: '/back-end/docker' },
      { text: 'Redis', link: '/back-end/redis' },
      {
        text: 'Lang',
        children: [
          { text: 'C', link: '/back-end/c' },
          { text: 'NodeJs', link: '/back-end/nodejs/' },
          { text: 'NestJS', link: '/back-end/nestjs/' },
          { text: 'Kotlin', link: '/back-end/kotlin' },
          { text: 'Golang', link: '/back-end/golang' },
          { text: 'Rust', link: '/back-end/rust' },
        ],
      },
      // {
      //   text: 'NodeJs',
      //   children: [
      //     { text: 'NodeJs', link: '/back-end/nodejs/' },
      //     { text: 'NestJS', link: '/back-end/nestjs/' },
      //   ],
      // },
      // {
      //   text: 'Kotlin',
      //   children: [{ text: 'Kotlin', link: '/back-end/kotlin' }],
      // },
      {
        text: 'Java',
        children: [
          { text: 'Java 概览', link: '/back-end/java/' },
          { text: 'Mybatis', link: '/back-end/java/mybatis' },
          { text: 'Spring-Boot', link: '/back-end/java/spring-boot' },
        ],
      },
      // {
      //   text: 'Golang',
      //   children: [{ text: 'Golang', link: '/back-end/golang' }],
      // },
    ],
  },
  // 兴趣
  {
    text: '爱好',
    children: [
      { text: '刷机', link: '/interest/flash/' },
      { text: '黑苹果', link: '/interest/hackintosh' },
      { text: 'N1 盒子', link: '/interest/n1' },
      { text: '浏览器', link: '/interest/browser' },
      { text: 'JD', link: '/interest/jd' },
      { text: '话题', link: '/interest/topic' },
      {
        text: 'Adobe',
        children: [
          {
            text: 'PhotoShop',
            link: '/interest/adobe/photoshop',
          },
          {
            text: 'Premiere',
            link: '/interest/adobe/premiere',
          },
        ],
      },
      {
        text: 'Tools',
        children: [
          {
            text: 'Frp',
            link: '/interest/frp',
          },
          {
            text: 'NPS',
            link: '/interest/nps',
          },
        ],
      },
    ],
  },
  // 区块链
  {
    text: '区块链',
    children: [
      { text: '概览', link: '/blockchain/' },
      { text: 'L2(二层网络)', link: '/blockchain/l2' },
      { text: '投资机构', link: '/blockchain/capital' },
      { text: '学习笔记', link: '/blockchain/notebook' },
      { text: 'Solidity', link: '/blockchain/solidity' },
      { text: '项目', link: '/blockchain/apps/' },
      { text: '书签', link: '/blockchain/bookmark' },
      { text: 'NFT', link: '/blockchain/nft' },
    ],
  },
  // 开源项目 -  Open source
  { text: '开源项目', link: '/open-source/', icon: 'guide' },
])
