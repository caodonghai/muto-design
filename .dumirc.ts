import { defineConfig } from 'dumi';
import path from 'path';

const publicPath = process.env.NODE_ENV === 'production' ? './' : '/';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['images/logo.png'],
  logo: 'images/logo.png',
  locales: [{ id: 'zh-CN', name: '中文' }],
  alias: {},
  plugins: [],
  publicPath,
  headScripts: [`window.publicPath='${publicPath}';`],
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
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
  chainWebpack: function (config, options) {
    if (process.env.NODE_ENV === 'production') {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            automaticNameDelimiter: '.',
            cacheGroups: {
              default: {
                minChunks: 2,
                reuseExistingChunk: true,
                priority: -50
              }
            }
          }
        }
      });
      const CompressionWebpackPlugin = require('compression-webpack-plugin');
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          algorithm: 'gzip', // 指定生成gzip格式
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配哪些格式文件需要压缩
          threshold: 10240, //对超过10k的数据进行压缩
          minRatio: 0.6 // 压缩比例，值为0 ~ 1
        })
      );
    }
  },
});
