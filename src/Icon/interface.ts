import { CSSProperties } from "react";

export type IIconProps = {
    /**
     * @description Font Class 生成的css链接
     * @default ""
   */
    href: string;
    /**
     * @description icon 类型，从iconfont中获取
     * @default ""
     */
    type: string;
    /**
     * 样式
     */
    style?: CSSProperties;
    /**
     * @description 图标字体大小
     * @default 16px
     */
    fontSize?: number  | string;
    /**
     * 类名
     */
    className?: string
}