module.exports  = {
  base: '/my-press/',
  title: "文档",
  description: "文档",
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
},
  themeConfig: {
    // repo: "vuejs/vuepress",
    // editLinks: true,
    // docsDir: "packages/docs/docs",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "测试",
        items: [
          { text: "Github", link: "https://github.com/mqyqingfeng" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/712139234359182/posts",
          },
        ],
      },
    ],
    subSidebar: 'auto',
    sidebar: [
      {
          title: '欢迎学习',
          path: '/',
          collapsable: false, // 不折叠
          children: [
              { title: "学前必读", path: "/" }
          ]
      },
      {
        title: "javacript学习",
        path: '/javascriptbook/jsrecord',
        collapsable: false, // 不折叠
        // children: [
        //   { title: "条件类型", path: "/handbook/ConditionalTypes" },
        //   { title: "泛型", path: "/handbook/Generics" }
        // ],
      }
    ]
  },
}
