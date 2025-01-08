import { CSSProperties } from 'react'

export interface IWaterMarkProps {
  /**
   * @description 水印宽度
   * @default 300
   */
    width?: number;
    /**
     * @description 水印高度
     * @default 250
     */
    height?: number;
    /**
     * @description 水印文案颜色
     * @default 'rgba(180, 180, 180, 0.5)'
     */
    textColor?: string;
    /**
     * @description 水印字体
     * @default 'Microsoft JhengHei'
     */
    fontStyle?: string;
    /**
     * @description 水印字体大小
     * @default 14px
     */
    fontSize?: number;
    /**
     * @description 水印旋转角度
     * @default -20
     */
    angle?: number;
    /**
     * @description 水印文案
     * @default
     */
    text?: string;
    /**
     * @description 样式
     * @default 
     */
    style?: CSSProperties;
  }