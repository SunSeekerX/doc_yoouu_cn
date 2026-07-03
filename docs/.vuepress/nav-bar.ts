import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  // 简介
  { text: '简介', link: '/intro/' },
  // AI
  {
    text: 'AI',
    children: [
      { text: '概览', link: '/ai/' },
      { text: 'Claude Code 与 CLI 编码工具', link: '/ai/claude_code' },
      { text: 'ChatGPT（2023 存档）', link: '/ai/chatgpt' },
      { text: 'Stable Diffusion', link: '/ai/stable-diffusion' },
    ],
  },
  // 基础
  {
    text: '基础',
    children: [
      { text: '概览', link: '/basic/' },
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
          { text: 'Windows wsl 技巧', link: '/basic/windows-wsl' },
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
  // 前端 - front_end
  {
    text: '前端',
    children: [
      {
        text: '基础',
        children: [
          { text: '概览', link: '/front_end/' },
          { text: 'Html', link: '/front_end/html' },
          { text: 'Css', link: '/front_end/css' },
          { text: 'JavaScript', link: '/front_end/javascript' },
          { text: 'Typescript', link: '/front_end/typescript' },
          { text: 'Objective-C 基础', link: '/front_end/oc' },
          { text: 'Objective-C 高级', link: '/front_end/oc-advance' },
        ],
      },
      {
        text: '技能',
        children: [
          { text: 'NPM 技巧', link: '/front_end/npm' },
          { text: 'Vue', link: '/front_end/vue' },
          { text: 'React', link: '/front_end/react' },
          { text: 'Next.js', link: '/front_end/nextjs' },
          { text: '小程序', link: '/front_end/mp' },
          {
            text: 'Flutter',
            link: '/front_end/flutter',
          },
          {
            text: 'React Native',
            link: '/front_end/react-native',
          },
        ],
      },
      {
        text: 'Uni-app',
        children: [
          { text: 'Uni-app - 概览', link: '/front_end/uni_app/' },
          { text: 'Uni-app - awesome', link: '/front_end/uni_app/awesome-uni-app' },
          { text: 'Uni-app -  原生插件', link: '/front_end/uni_app/nativeplugins/' },
          { text: 'Uni-app -  Android 离线打包', link: '/front_end/uni_app/offline-build-android' },
          { text: 'Uni-app -  IOS 离线打包', link: '/front_end/uni_app/offline-build-ios' },
        ],
      },
      {
        text: 'Android',
        children: [
          {
            text: 'Android - 概览',
            link: '/front_end/android/',
          },
          {
            text: 'Android - 开发',
            link: '/front_end/android/dev',
          },
          {
            text: 'Android - 问题',
            link: '/front_end/android/issue',
          },
        ],
      },
      {
        text: 'IOS',
        children: [
          {
            text: 'IOS - 概览',
            link: '/front_end/ios/',
          },
          {
            text: 'IOS - 开发',
            link: '/front_end/ios/dev',
          },
          {
            text: 'IOS - 问题',
            link: '/front_end/ios/issue',
          },
        ],
      },
      {
        text: '其他',
        children: [
          {
            text: 'javascript-obfuscator',
            link: '/front_end/javascript-obfuscator',
          },
        ],
      },
    ],
  },
  // 后端 - back_end
  {
    text: '后端',
    // link: '/back_end/linux',
    children: [
      { text: '概览', link: '/back_end/' },
      { text: 'Linux', link: '/back_end/linux' },
      // { text: 'C', link: '/back_end/c' },
      // { text: 'SQL', link: '/back_end/sql' },
      { text: 'Database', link: '/back_end/database' },
      { text: 'Database 设计实践', link: '/back_end/database_base_practice' },
      { text: 'Docker', link: '/back_end/docker' },
      { text: 'Redis', link: '/back_end/redis' },
      {
        text: 'Lang',
        children: [
          { text: 'C', link: '/back_end/c' },
          { text: 'NodeJs', link: '/back_end/nodejs' },
          { text: 'NestJS', link: '/back_end/nestjs/' },
          { text: 'Kotlin', link: '/back_end/kotlin' },
          { text: 'Golang', link: '/back_end/golang' },
          { text: 'Rust', link: '/back_end/rust' },
          { text: 'Python', link: '/back_end/python' },
          { text: 'PHP', link: '/back_end/php' },
        ],
      },
      // {
      //   text: 'NodeJs',
      //   children: [
      //     { text: 'NodeJs', link: '/back_end/nodejs/' },
      //     { text: 'NestJS', link: '/back_end/nestjs/' },
      //   ],
      // },
      // {
      //   text: 'Kotlin',
      //   children: [{ text: 'Kotlin', link: '/back_end/kotlin' }],
      // },
      {
        text: 'Java',
        children: [
          { text: 'Java 概览', link: '/back_end/java/' },
          { text: 'Mybatis', link: '/back_end/java/mybatis' },
          { text: 'Spring-Boot', link: '/back_end/java/spring-boot' },
          { text: 'Spring-Boot 杂记', link: '/back_end/java/spring-boot2' },
        ],
      },
      // {
      //   text: 'Golang',
      //   children: [{ text: 'Golang', link: '/back_end/golang' }],
      // },
    ],
  },
  // 兴趣
  {
    text: '爱好',
    children: [
      { text: '概览', link: '/interest/' },
      { text: '虚拟机折腾', link: '/interest/vm' },
      // { text: '刷机', link: '/interest/flash/' },
      {
        text: '刷机',
        children: [
          {
            text: '刷机',
            link: '/interest/flash/',
          },
          {
            text: '摩托罗拉 edge s30',
            link: '/interest/flash/edge_s30',
          },
          {
            text: '红米 k30su',
            link: '/interest/flash/k30s-apollo',
          },
          {
            text: '红米 9',
            link: '/interest/flash/redmi9',
          },
          {
            text: '魅蓝 node3',
            link: '/interest/flash/m3-note',
          },
          {
            text: '文石 Tab10c Pro',
            link: '/interest/flash/tab10cpro',
          },
        ],
      },
      { text: '黑苹果', link: '/interest/hackintosh' },
      { text: 'N1 盒子', link: '/interest/n1' },
      { text: 'R1 音响', link: '/interest/phicomm_r1' },
      { text: '旅行', link: '/travel/' },
      { text: 'JD', link: '/interest/jd' },
      { text: '话题', link: '/interest/topic' },
      { text: '粤语学习', link: '/interest/yueyu' },
      {
        text: 'Adobe',
        children: [
          {
            text: '概览',
            link: '/interest/adobe/',
          },
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
      { text: '铭文', link: '/blockchain/inscription' },
      { text: '工具', link: '/blockchain/tools' },
      { text: '历史存档', link: '/blockchain/history' },
      { text: 'Bitcoin', link: '/blockchain/bitcoin' },
      { text: 'Evm 系列', link: '/blockchain/evm' },
      { text: 'Solana', link: '/blockchain/solana' },
      { text: 'Solidity 开发', link: '/blockchain/solidity' },
      { text: 'Tron 开发', link: '/blockchain/tron' },
      { text: '玩过的项目', link: '/blockchain/apps/' },
    ],
  },
  // 开源项目 -  Open source
  { text: '开源项目', link: '/open_source/' },
])
