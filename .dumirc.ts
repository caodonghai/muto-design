import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['images/logo.png'],
  logo: 'images/logo.png',
  locales: [{ id: 'zh-CN', name: '中文' }],
  alias: {},
  plugins: [],
  themeConfig: {
    name: 'muto-design',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '组件', link: '/components/Icon' }, // components会默认自动对应到src文件夹
    ],
    footer: 'Copyright © 2025  Powered by muto-design'
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
