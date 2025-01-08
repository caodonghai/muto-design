import { CSSProperties } from "react";

export type IIconProps = {
    /**
     * Font Class 生成的css链接
     */
    href: string;
    /**
     * icon 类型
     */
    type: string;
    /**
     * 样式
     */
    style?: CSSProperties;
    /**
     * 图标字体大小
     */
    fontSize?: number  | string;
    /**
     * 类名
     */
    className?: string
}