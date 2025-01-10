import { createContext, ReactNode } from 'react'
import { ILayoutProps } from './interface'


export const LayoutContext = createContext<{ children?: ReactNode; direction?: ILayoutProps['direction'] }>({
});