import cls from 'classnames';
import React, { type FC } from 'react';

import { usePrefix } from '../common';
import { IDemoProps } from './interface';

import './index.less';

export const Demo: FC<IDemoProps> = (props) => {
  const { title = '我是Title' } = props;
  const prefixFun = usePrefix('demo');

  return (
    <span className={cls('demo-box', cls(prefixFun('box')))}>{title}</span>
  );
};

export * from './interface';

export default Demo;
