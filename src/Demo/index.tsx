import cls from 'classnames';
import React, { type FC } from 'react';

import { usePrefix } from '../common';

import './index.less';

const Demo: FC<{
  /**
   * @description 属性描述
   * @default "默认值"
   */
  title?: string;
}> = (props) => {
  const prefixFun = usePrefix('demo');

  return (
    <span className={cls('demo-box', cls(prefixFun('box')))}>
      {props.title}
    </span>
  );
};

export default Demo;
