import cls from 'classnames';
import React, { FC } from 'react';

import { usePrefix } from '../common';
import { useStyle } from './hooks';
import { IFlexProps } from './interface';

import './index.less';

/**
 * 自适应布局，根据flex分配宽度
 * @param props
 * @constructor
 */
export const Flex: FC<IFlexProps> = (props) => {
  const {
    flex = 1,
    children,
    style = {},
    className,
    direction,
    width,
    height,
    center,
    ...others
  } = props;

  const prefixFun = usePrefix('flex');
  const styleMemo = useStyle({
    style,
    width,
    height,
    center,
    direction,
  });

  return (
    <div
      className={cls(prefixFun(), className, prefixFun(direction))}
      style={{ flex, overflow: 'auto', ...styleMemo }}
      {...others}
    >
      {children}
    </div>
  );
};

export default Flex;
