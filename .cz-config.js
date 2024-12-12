module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能', emoji: '🎸' },
    { value: 'fix', name: 'fix:      修复', emoji: '🐛' },
    { value: 'docs', name: 'docs:     文档变更', emoji: '✏️' },
    {
      value: 'style',
      name: 'style:    代码格式(不影响代码运行的变动)',
      emoji: '💄',
    },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)',
      emoji: '💡',
    },
    { value: 'perf', name: 'perf:     性能优化', emoji: '⚡️' },
    { value: 'test', name: 'test:     增加测测试', emoji: '💍' },

    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动', emoji: '🤖' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' },
  ], // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型:', // scope: '请输入文件修改范围(可选):', // used if allowCustomScopes is true
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选，待优化去除，跳过即可):', // breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: '请输入要关闭的issue(待优化去除，跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
  },
  allowCustomScopes: true, // allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['scope', 'body', 'footer'], // limit subject length, commitlint默认是72
  subjectLimit: 72,
};
