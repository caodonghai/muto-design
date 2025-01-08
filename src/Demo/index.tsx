import cls from 'classnames';
import React, { type FC } from 'react';

import { usePrefix } from '../common';
import { IDemoProps } from './interface';

import './index.less';

const Demo: FC<IDemoProps> = (props) => {
  const prefixFun = usePrefix('demo');

  return (
    <span className={cls('demo-box', cls(prefixFun('box')))}>
      {props.title}
    </span>
  );
};

export default Demo;
