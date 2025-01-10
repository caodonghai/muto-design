import { defaultPrefix } from "../const"


export const usePrefix = (prefix?: string) => {
  if(prefix) {
    return (calssName?: string) => calssName ? `${defaultPrefix}-${prefix}-${calssName}` : `${defaultPrefix}-${prefix}`
  }
  return (calssName?: string) => calssName ?`${defaultPrefix}-${calssName}` : defaultPrefix
}