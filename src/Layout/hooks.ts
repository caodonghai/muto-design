import { useMemo, CSSProperties, useEffect, createRef, ForwardedRef, useRef, DependencyList } from 'react'
import { assign, isFunction } from 'lodash-es'
import { ILayoutProps } from './interface'

export type  IUseStyleDeps = Omit<ILayoutProps, 'children' | 'className'>

export const useStyle = (deps: IUseStyleDeps) => {
  const {style, autoFit, width, height, center, direction} = deps || {}
  return useMemo(() => {
    const _style: CSSProperties = { ...style };

    if (width !== undefined) {
      _style.width = width;
    }
    if (height !== undefined) {
      _style.height = height;
    }
    if (autoFit) {
      const opt = direction === 'horizontal' ? 'height' : 'width';
      _style[opt] = _style[opt] || '100%';
    }
    if (autoFit === false && direction !== 'horizontal') {
      _style['height'] = _style['height'] || 'auto';
    }
    if (center) {
      const tmp = Array.isArray(center) ? center : [center];
      if (direction === 'horizontal') {
        if (tmp[0]) {
          assign(_style, { alignItems: 'center' });
        }
        if (tmp[1]) {
          assign(_style, { justifyContent: 'center' });
        }
      } else {
        if (tmp[0]) {
          assign(_style, { justifyContent: 'center' });
        }
        if (tmp[1]) {
          assign(_style, { alignItems: 'center' });
        }
      }
    }
    return _style;
  }, [style, autoFit, width, height, center, direction]);
}
