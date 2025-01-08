import { useEffect, useRef } from 'react';
import { isNil, isPlainObject, isArray } from 'lodash-es'


/**
 * 监听对象属性或值变化后的副作用
 * @param cb
 * @param obj
 * @param firstUpdate
 */
export function useObjectEffect(cb: () => void, obj: any, firstUpdate = true) {
  const deps = isPlainObject(obj) && !isNil(obj) ? [JSON.stringify(obj)] : isArray(obj) ? obj : [obj];
  const update = useRef(firstUpdate);
  useEffect(() => {
    if (!update.current) {
      update.current = true;
      return;
    }
    return cb();
  }, deps);
}
