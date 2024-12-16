const readFiles = require('./scripts/readFiles');
const path = require('path');

const srcPath = path.resolve(process.cwd(), './src');

const scopes = readFiles(srcPath)
  .map(({ dirName }) => {
    return {
      value: dirName,
      name: dirName,
    };
  })
  .concat({ value: '主工程', name: '主工程' });

module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨ feat:     新功能代码提交',
    },
    {
      value: 'fix',
      name: '🐛 fix:      修复bug',
    },
    {
      value: 'style',
      name: '💄 style:    代码的样式美化',
    },
    {
      value: 'refactor',
      name: '♻️  refactor: 代码重构',
    },
    {
      value: 'revert',
      name: '⏪️ revert:   代码回退',
    },
    {
      value: 'docs',
      name: '✏️  docs:     文档变更',
    },
    {
      value: 'perf',
      name: '⚡️ perf:     性能优化',
    },
    {
      value: 'chore',
      name: '🚀 chore:    构建/工程依赖/工具/工程化配置',
    },
    // {
    //   value: ':package: build',
    //   name: '📦️ build:    打包',
    // },
    // {
    //   value: ':tada: release',
    //   name: '🎉 release:  发布正式版',
    // },
    // {
    //   value: ':white_check_mark: test',
    //   name: '✅ test:     测试',
    // },
    // {
    //   value: ':construction_worker: ci',
    //   name: '👷 ci:       CI related changes',
    // },
  ],
  messages: {
    type: '请选择提交类型(必填)',
    customScope: '请输入文件修改范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    breaking: '列出任何BREAKING CHANGES(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确定提交此说明吗？',
  },
  // scope 类型（定义之后，可通过上下键选择）
  scopes: scopes,
  //   scopes: [
  //     ['components', '组件相关'],
  //     ['hooks', 'hook 相关'],
  //     ['utils', 'utils 相关'],
  //     ['element-ui', '对 element-ui 的调整'],
  //     ['styles', '样式相关'],
  //     ['deps', '项目依赖'],
  //     ['auth', '对 auth 修改'],
  //     ['other', '其他修改'],
  //     // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
  //     ['custom', '以上都不是？我要自定义'],
  //   ].map(([value, description]) => {
  //     return {
  //       value,
  //       name: `${value.padEnd(30)} (${description})`,
  //     };
  //   }),

  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  //   allowCustomScopes: true,

  // 跳过问题
  skipQuestions: ['body', 'footer', 'breaking'],
  subjectLimit: 72,
  breaklineChar: '|', // 支持 body 和 footer
  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: [],
};
