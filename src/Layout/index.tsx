import { Spin } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';

import { usePrefix } from '../common';
import { LayoutContext } from './context';
import { useStyle } from './hooks';
import { IFlexProps, ILayoutProps, ISliderProps } from './interface';

import Flex from './Flex';
import { Slider } from './Slider';

import './index.less';

const LayoutCmp = (props: ILayoutProps) => {
  const {
    children,
    direction,
    center,
    className = '',
    autoFit,
    style,
    width,
    height,
    ...others
  } = props;

  const layoutPrefixFun = usePrefix('layout');
  const flexPrefixFun = usePrefix('flex');

  const styleMemo = useStyle({
    style,
    autoFit,
    width,
    height,
    center,
    direction,
  });

  return (
    <div
      className={cls(layoutPrefixFun(), className, flexPrefixFun(direction))}
      {...others}
      style={styleMemo}
    >
      <LayoutContext.Provider value={{ direction, children }}>
        {children}
      </LayoutContext.Provider>
    </div>
  );
};

/**
 * 布局父容器
 * @param props
 * @constructor
 */
export const Layout: FC<ILayoutProps> & {
  Flex: FC<IFlexProps>;
  Slider: FC<ISliderProps>;
} = (props: ILayoutProps) => {
  const { loading, direction = 'horizontal', ...others } = props;
  const prefixFun = usePrefix('layout');

  if (loading === undefined) {
    return <LayoutCmp direction={direction} {...others} />;
  }

  return (
    <Spin
      spinning={loading}
      delay={250}
      wrapperClassName={prefixFun(direction)}
    >
      <LayoutCmp direction={direction} {...others} />
    </Spin>
  );
};

Layout.Flex = Flex;
Layout.Slider = Slider;

export * from './Flex';
export * from './Slider';
export * from './interface';

export default Layout;
