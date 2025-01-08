import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'x-msgfi-sdk',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '组件', link: '/components/Icon' }, // components会默认自动对应到src文件夹
    ]
  },
  styles: [
    `.dumi-default-header-left {
       width: 220px !important;
    }`,
  ],
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },
});
