import cls from 'classnames';
import { assign } from 'lodash-es';
import React, {
  CSSProperties,
  memo,
  useLayoutEffect,
  useMemo,
  type FC,
} from 'react';

import type { IIconProps } from './interface';
import { importStyleLink } from './utils';

export * from './interface';

/**
 * 使用 阿里矢量图表 的 Font Class 方式使用，具体方法及配置见[使用帮助](https://www.iconfont.cn/help/detail?spm=a313x.manage_type_myprojects.i1.d8cf4382a.72283a81x38YZi&helptype=code)
 * @param props IIconProps
 * @returns ReactNode
 */
export const Icon: FC<IIconProps> = (props) => {
  const { href, type, style, fontSize, className } = props;

  useLayoutEffect(() => {
    importStyleLink(href);
  }, []);

  const styleMemo = useMemo(() => {
    const _style = {} as CSSProperties;
    if (style) {
      assign(_style, style);
    }
    if (fontSize) {
      assign(_style, { fontSize });
    }
    return _style;
  }, [fontSize, style]);

  return <i className={cls('iconfont', type, className)} style={styleMemo}></i>;
};

export * from './interface';

export default memo(Icon);
