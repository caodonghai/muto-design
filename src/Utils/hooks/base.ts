import {ForwardedRef, createRef, useMemo, useEffect, DependencyList, useRef } from 'react'
import {isFunction} from 'lodash-es'

export function useCreateRef<T = any>(ref: ForwardedRef<T> | undefined) {
  const innerRef = useMemo<React.RefObject<T>>(() => {
    if (isFunction(ref)) {
      return createRef<T>();
    }
    return ref || createRef<T>();
  }, [ref]);

  useEffect(() => {
    if (isFunction(ref)) {
      ref(innerRef.current);
    }
  }, [innerRef]);

  return innerRef;
}

/**
 * 增强版的effect
 * @param cb 副作用回调
 * @param dep 依赖
 * @param firstUpdate 第一次是否执行副作用，默认执行
 */
export function useUdpEffect(cb: () => void, dep?: DependencyList, firstUpdate = true) {
  const update = useRef(firstUpdate);
  useEffect(() => {
    if (!update.current) {
      update.current = true;
      return;
    }
    return cb();
  }, dep);
}

export function useUpdateEffect(cb: () => void, dep: DependencyList) {
  useUdpEffect(cb, dep, false);
}

