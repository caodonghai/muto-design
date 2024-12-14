module.exports = {
  types: [
    {
      value: ':sparkles: feat',
      name: '✨ feat:     新功能代码提交',
    },
    {
      value: ':bug: fix',
      name: '🐛 fix:      修复bug',
    },
    {
      value: ':lipstick: style',
      name: '💄 style:    代码的样式美化',
    },
    {
      value: ':recycle: refactor',
      name: '♻️  refactor: 代码重构',
    },
    {
      value: ':rewind: revert',
      name: '⏪️ revert:   代码回退',
    },
    {
      value: ':pencil2: docs',
      name: '✏️  docs:     文档变更',
    },
    {
      value: ':zap: perf',
      name: '⚡️ perf:     性能优化',
    },
    {
      value: ':rocket: chore',
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
  //   allowCustomScopes: false,
  // 跳过问题
  skipQuestions: ['body', 'customScope', 'footer'],
  subjectLimit: 72,
};
