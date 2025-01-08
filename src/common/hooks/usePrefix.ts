import { defaultPrefix } from "../const"


export const usePrefix = (prefix?: string) => {
  if(prefix) {
    return (calssName: string) => `${defaultPrefix}-${prefix}-${calssName}`
  }
  return (calssName: string) => `${defaultPrefix}-${calssName}`
}