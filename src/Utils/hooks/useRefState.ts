import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { isFunction , isObject} from 'lodash-es';

type SetStateAction<S> = (S extends Record<string, any> ? Partial<S> : S) | ((prevState: S) => S);

/**
 * 安全执行setState
 * 更新状态时，如果为对象则按照类组件的状态更新方式自动合并上一次状态，如果不希望合并可以采用函数的方式返回新的状态
 * @param initialState 初始状态
 */
export function useRefState<S = any>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const ref = useRef<boolean>(true);
  const [state, setState] = useState<S>(initialState);
  const updateState = useCallback((newState: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ref.current &&
      setState((prevState) => {
        if (isFunction(newState)) {
          return newState(prevState);
        }
        if (isObject(prevState) && isObject(newState)) {
          return { ...prevState, ...newState };
        }
        return newState;
      });
  }, []);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return [state, updateState];
}
