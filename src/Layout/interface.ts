import React, { CSSProperties, FC } from 'react';

interface IBaseTypes {
  children: React.ReactNode;
  /**
   * @description       当前容器的类名
   */
  className?: string;
  /**
   * @description       当前容器的 style 属性
   */
  style?: CSSProperties;
  /**
   * @description       当前容器的宽度
   */
  width?: number | string;
  /**
   * @description       当前容器的高度
   */
  height?: number | string;
  /**
   * @description       当前容器的 style 属性
   * @default           vertical
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description       是否居中
   * @default           false
   */
  center?: boolean | [boolean, boolean];
}

export interface ILayoutProps extends IBaseTypes {
  /**
   * @description       是否为加载中状态
   * @default           false
   */
  loading?: boolean;
  /**
   * @description       是否占满父容器
   * @default           false
   */
  autoFit?: boolean;
}

export type ISliderProps = {
  /**
   * @description       根据父容器direction的值决定宽度还是高度大小
   * @default           180
   */
  size?: number | string;
  /**
   * @description       是否自动展开，鼠标移入展开，移出折叠
   * @default           false
   */
  autoExpand?: boolean;
  /**
   * @description       是否支持拖动调整大小
   * @default           true
   */
  draggable?: boolean;
  /**
   * @description       拖动条的样式
   */
  draggableStyle?: CSSProperties;
  /**
   * @description       初始是否收起
   * @default           false
   */
  defaultCollapsed?: boolean;
  /**
   * @description       指定当前是否收起
   * @default           false
   */
  collapsed?: boolean;
  /**
   * @description       收起展开状态切换后的事件
   */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * @description       大小变化时回调函数
   */
  resize?: (size: number, propName: string) => void;
  /**
   * @description       自定义拖动条，默认拖动条不显示
   */
  icon?: React.ReactElement;
  /**
   * @description       边框
   */
  bordered?: boolean;
  /**
   * @description       resize大小变化的范围
   */
  resizeOption?: {
    minSize?: number;
    maxSize?: number;
    doubleClick?: boolean;
    iconHover?: boolean;
  };
  /**
   * @description       启用带title的默认收起展开功能
   */
  collapseOptions?: {
    draggable?: boolean;
    title?: React.ReactNode | ((collapsed: boolean) => React.ReactNode);
    icon?: null | React.ReactElement | ((collapsed: boolean) => React.ReactElement);
    align?: 'left' | 'center' | 'right' | 'top' | 'bottom';
    style?: CSSProperties;
  };
  /**
   * @description      slider组件的位置
   */
  sliderPos?: {
    position: 'left' | 'right' | 'top' | 'bottom';
    zIndex?: number;
  };
  /**
   * @description       是否开启记忆功能
   */
  remeberKey?: string;
} & Pick<IBaseTypes, 'children' | 'className' | 'style'>;

export interface IFlexProps extends IBaseTypes {
  /**
   * @description       设置元素如何分配空间
   */
  flex?: number;
}
