import cls from 'classnames';
import React, { type FC } from 'react';

import { usePrefix } from '../common';

import './index.less';

const Demo: FC<{ title: string }> = (props) => {
  const prefixFun = usePrefix('demo');

  return (
    <span className={cls('demo-box', cls(prefixFun('box')))}>
      {props.title}
    </span>
  );
};

export default Demo;
