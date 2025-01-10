import { EllipsisOutlined, LeftCircleFilled } from '@ant-design/icons';
import cls from 'classnames';
import { isArray, isFunction } from 'lodash-es';
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useUpdateEffect } from '../utils';
import { LayoutContext } from './context';
import { ILayoutProps, ISliderProps } from './interface';
import { getIconStyle } from './utils';

import { usePrefix } from '../common';
import './index.less';

function DraggableIcon({
  style,
  className,
  position = '',
}: {
  style?: CSSProperties;
  className?: string;
  position?: string;
}) {
  return (
    <div className={className} style={style}>
      <EllipsisOutlined
        rotate={['top', 'bottom'].includes(position) ? 0 : 90}
        style={{ color: '#fff', fontSize: 22 }}
      />
    </div>
  );
}

/**
 * 固定宽度，可伸缩组件布局
 * @param props
 * @constructor
 */
export const Slider: FC<ISliderProps> = (props) => {
  const {
    children,
    icon: defaultIcon,
    style: defaultStyle,
    className,
    size = 180,
    resize,
    resizeOption = {},
    draggable: defaultDraggable = true,
    draggableStyle,
    autoExpand = false,
    defaultCollapsed = false,
    collapsed,
    onCollapsedChange,
    bordered,
    collapseOptions,
    ...otherProps
  } = props;
  const prefixFun = usePrefix('slider');
  const others = otherProps as any;
  const itRef = useRef<any>(null);
  const draggable = collapseOptions
    ? collapseOptions.draggable
    : defaultDraggable;
  const { children: layoutChildren, direction } = useContext(LayoutContext);

  /**
   * 获取slider组件位置索引（0表示在flex组件的前面，1表示在flex组件的后面）
   * @param children 当前slider的所有兄弟实例
   * @param index 当前slider的兄弟实例中的索引
   */
  function getPositionIndex(children: any, index: number) {
    for (let i = index; i >= 0; i--) {
      if (children[i]?.type?.prototype?.isFlex) {
        return 1;
      }
    }
    return 0;
  }

  /**
   * 获取slider组件的位置及zIndex
   * @param children 父容器的所有子节点
   * @param direction 父容器的属性
   * @param props 当前slider的属性
   */
  function getSliderPosition(
    layoutChildren: ReactNode,
    direction: ILayoutProps['direction'],
    props: any,
  ): any {
    let _layoutChildren: ReactNode[] = [];
    if (props.sliderPos?.position) {
      return {
        position: props.sliderPos.position,
        zIndex: props.sliderPos.zIndex || 1,
      };
    }
    if (
      !layoutChildren ||
      (!isArray(layoutChildren) && !React.isValidElement(layoutChildren))
    ) {
      return null;
    }
    if (!isArray(layoutChildren)) {
      _layoutChildren = [layoutChildren];
    } else {
      _layoutChildren = layoutChildren;
    }
    for (
      let i = 0, len = (_layoutChildren as ReactNode[]).length;
      i < len;
      i++
    ) {
      const childProps = (_layoutChildren[i] as any)?.props;
      if (childProps && React.isValidElement(_layoutChildren[i])) {
        if (childProps === props) {
          const pIndex = getPositionIndex(_layoutChildren, i);
          const posArr =
            direction === 'vertical' ? ['left', 'right'] : ['top', 'bottom'];
          return {
            position: posArr[pIndex],
            zIndex: pIndex === 0 ? i + 1 : len - i + 1,
          };
        }
        const p = getSliderPosition(
          childProps?.children,
          childProps?.direction,
          props,
        );
        if (p) {
          return p;
        }
      }
    }

    return null;
  }

  function getSliderDefaultSize(
    slider: Record<string, any>,
    collapseOptions: Record<string, any>,
  ) {
    const { position } = slider || {};
    const distance = parseInt(collapseOptions.style?.height ?? 30);
    return { min: ['left', 'right'].includes(position) ? distance : 0 };
  }

  const sliderPosition = useMemo(
    () =>
      getSliderPosition(layoutChildren, direction, props) || {
        position: 'left',
        zIndex: 1,
      },
    [],
  );
  const {
    minSize = collapseOptions
      ? getSliderDefaultSize(sliderPosition, collapseOptions).min
      : 0,
    maxSize = 800,
    iconHover = false,
    doubleClick = !collapseOptions,
  } = resizeOption;
  const sizeProp =
    sliderPosition.position === 'left' || sliderPosition.position === 'right'
      ? 'width'
      : 'height';

  const [newProps, setNewProps] = useState({
    hidden: collapsed ?? defaultCollapsed,
    style: { [sizeProp]: size },
  });

  const widthOrHeight = { [sizeProp]: size };
  const hiddenStyle = newProps.hidden
    ? { [sizeProp]: minSize }
    : newProps.style;

  function getSliderProps({
    collapsed,
    size,
    onChange,
    defaultIcon,
    collapseOptions,
    defaultStyle,
    position,
  }: any) {
    const flexAlign = {
      top: 'start',
      bottom: 'end',
      center: 'center',
      left: 'start',
      right: 'end',
    };
    if (!collapseOptions) {
      return { icon: defaultIcon, style: defaultStyle };
    }

    const distance = parseInt(collapseOptions.style?.height ?? 30);
    function IconBar1({ className }: any) {
      const {
        title = '',
        align = position === 'top' ? 'center' : 'left',
        style,
        icon = () => (
          <span
            style={{
              transform:
                position === 'top'
                  ? `rotate(${collapsed ? 0 : 180}deg)`
                  : `rotate(${collapsed ? 180 : 0}deg)`,
              borderTop: '4px solid #999',
              borderRight: '4px solid transparent',
              borderLeft: '4px solid transparent',
              marginRight: 5,
            }}
          />
        ),
      } = collapseOptions;

      return (
        <div
          onClick={onChange}
          className={className}
          style={{
            height: 30,
            opacity: 1,
            left: 5,
            right: 5,
            justifyContent: (flexAlign as any)[align],
            transform: `translateY(${position === 'top' ? 0 : '-100%'})`,
            ...style,
          }}
        >
          {isFunction(icon) ? icon(collapsed) : icon}
          {isFunction(title) ? title(collapsed) : title}
        </div>
      );
    }

    function IconBar2({ className }: any) {
      const {
        title = '',
        align = 'top',
        style: deafultStyle,
        icon = () => (
          <LeftCircleFilled
            rotate={
              collapsed
                ? position === 'left'
                  ? 180
                  : 0
                : position === 'left'
                ? 0
                : 180
            }
            style={{ color: '#1890ff' }}
          />
        ),
      } = collapseOptions;

      const { ...style } = deafultStyle || {};

      const divStyle: CSSProperties = collapsed
        ? {
            bottom: 0,
            writingMode: 'vertical-lr',
            letterSpacing: 5,
            overflow: 'hidden',
          }
        : { height: distance, whiteSpace: 'nowrap', overflow: 'hidden' };

      const spaceDistance = Math.max(6, (distance - 16) / 2);
      if (position === 'left') {
        if (!collapsed) {
          divStyle.flexDirection = 'row-reverse';
          divStyle.justifyContent = 'space-between';
          // divStyle.paddingLeft = spaceDistance;
        }
        divStyle.transform = 'translateX(-100%)';
      } else {
        divStyle.transform = 'translateX(0)';
      }

      return (
        <div
          onClick={onChange}
          className={className}
          style={{
            top: 0 - distance,
            left: 0,
            width: size,
            opacity: 1,
            backgroundColor: '#ECECEC',
            justifyContent: (flexAlign as any)[align],
            ...divStyle,
            ...style,
          }}
        >
          <span
            style={{
              fontSize: Math.max(
                12,
                Math.min(16, distance - 2 * spaceDistance),
              ),
              margin: spaceDistance,
              display: 'inline-flex',
            }}
          >
            {isFunction(icon) ? icon(collapsed) : icon}
          </span>
          {isFunction(title) ? title(collapsed) : title}
        </div>
      );
    }
    switch (position) {
      case 'top':
        return {
          icon: <IconBar1 />,
          style: { marginBottom: distance, ...defaultStyle },
        };
      case 'bottom':
        return {
          icon: <IconBar1 />,
          style: { marginTop: distance, ...defaultStyle },
        };
      case 'left':
        return {
          icon: <IconBar2 />,
          style: { marginTop: distance, ...defaultStyle },
        };
      case 'right':
        return {
          icon: <IconBar2 />,
          style: { marginTop: distance, ...defaultStyle },
        };
      default:
        return { icon: defaultIcon, style: defaultStyle };
    }
  }

  const { icon, style } = getSliderProps({
    position: sliderPosition.position,
    size: hiddenStyle[sizeProp],
    collapseOptions,
    defaultStyle,
    defaultIcon,
    collapsed: newProps.hidden,
    onChange: () => {
      setNewProps((p) => ({ ...p, hidden: !p.hidden }));
    },
  });

  const elRef = useRef<any>(null);
  const sliderRef = useRef<any>();

  const sliderEvents = {
    offsetSize: 90,
    current: {
      mask: null, // mousedown增加一个全局遮罩，解决iframe区域无法拖动的问题
      bodyCursor: document.body.style.cursor,
      target: null,
      cloneTarget: null,
      position: sliderPosition.position,
    } as any,
    mousedown(e: any) {
      if (autoExpand) {
        return;
      }
      sliderEvents.current.target = sliderRef.current;
      sliderEvents.current.cloneTarget =
        sliderEvents.current.target.cloneNode();
      // sliderEvents.current.cloneTarget.classList.add('slider-active');
      sliderEvents.current.cloneTarget.style.zIndex = sliderEvents.offsetSize;
      sliderEvents.current.pos = { x: e.clientX, y: e.clientY, distance: 0 };
      if (sizeProp === 'width') {
        sliderEvents.current.pos.size = elRef.current.offsetWidth;
        document.body.style.cursor = 'col-resize';
      } else {
        sliderEvents.current.pos.size = elRef.current.offsetHeight;
        document.body.style.cursor = 'row-resize';
      }
      elRef.current.appendChild(sliderEvents.current.cloneTarget);
      sliderEvents.current.target.classList.add('slider-dragging');

      window.addEventListener('mouseup', sliderEvents.mouseup, false);
      window.addEventListener('mousemove', sliderEvents.mousemove, false);
    },
    mousemove(e: any) {
      sliderEvents.current.cloneTarget.classList.add('slider-active');
      const movePos = { offset: -4, prop: '', distance: 0 };
      switch (sliderEvents.current.position) {
        case 'left':
          movePos.prop = 'right';
          movePos.distance = sliderEvents.current.pos.x - e.clientX;
          break;
        case 'right':
          movePos.prop = 'left';
          movePos.distance = e.clientX - sliderEvents.current.pos.x;
          break;
        case 'top':
          movePos.prop = 'bottom';
          movePos.distance = sliderEvents.current.pos.y - e.clientY;
          break;
        case 'bottom':
          movePos.prop = 'top';
          movePos.distance = e.clientY - sliderEvents.current.pos.y;
          break;
      }
      sliderEvents.current.pos.distance = 0 - movePos.distance;
      sliderEvents.current.cloneTarget.style[movePos.prop] =
        movePos.offset + movePos.distance + 'px';
      if (!sliderEvents.current.mask) {
        sliderEvents.current.mask = document.createElement('div');
        sliderEvents.current.mask.style.cssText =
          'position:absolute;top:0px;left:0px;right:0;bottom:0;opacity:0;background:#fff;z-index:99999;';
        document.body.appendChild(sliderEvents.current.mask);
      }
    },
    mouseup() {
      window.removeEventListener('mousemove', sliderEvents.mousemove, false);
      window.removeEventListener('mouseup', sliderEvents.mouseup, false);
      elRef.current.removeChild(sliderEvents.current.cloneTarget);
      sliderEvents.current.cloneTarget = null;
      sliderEvents.current.target.classList.remove('slider-dragging');
      sliderEvents.current.target = null;
      document.body.style.cursor = sliderEvents.current.bodyCursor;
      if (sliderEvents.current.mask) {
        document.body.removeChild(sliderEvents.current.mask);
        sliderEvents.current.mask = null;
      }
      if (sliderEvents.current.pos.distance) {
        const newSize = Math.min(
          maxSize,
          Math.max(
            sliderEvents.current.pos.size + sliderEvents.current.pos.distance,
            minSize,
          ),
        );
        setNewProps({
          hidden: newSize === minSize,
          style: {
            [sizeProp]: newSize,
          },
        });
        resize?.(newSize, sizeProp);
      }
    },
  };
  const zIndex = sliderPosition.zIndex + sliderEvents.offsetSize;

  const onDoubleClick = (e: any) => {
    if (autoExpand || !doubleClick) {
      return;
    }
    e.stopPropagation();
    const nextHidden = !newProps.hidden;
    setNewProps((p) => ({ ...p, hidden: nextHidden }));
    // @ts-ignore
    resize?.(nextHidden ? minSize : newProps.style[sizeProp], sizeProp);
  };

  useUpdateEffect(() => {
    if (collapsed !== undefined && newProps.hidden !== collapsed) {
      setNewProps((p) => ({ ...p, hidden: collapsed }));
    }
  }, [collapsed]);

  useUpdateEffect(() => {
    onCollapsedChange?.(newProps.hidden);
  }, [newProps.hidden]);

  useUpdateEffect(() => {
    if (newProps.style[sizeProp] !== size) {
      setNewProps((p) => ({
        ...p,
        hidden: size === minSize,
        style: { [sizeProp]: size },
      }));
    }
  }, [size]);

  const isHidden = newProps.hidden && minSize === 0;

  if (autoExpand) {
    others.onMouseOver = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      itRef.current && clearTimeout(itRef.current);
      itRef.current = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        newProps.hidden && setNewProps((p) => ({ ...p, hidden: false }));
      }, 120);
    };
    others.onMouseOut = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      itRef.current && clearTimeout(itRef.current);
      itRef.current = setTimeout(() => {
        itRef.current = null;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !newProps.hidden && setNewProps((p) => ({ ...p, hidden: true }));
      }, 500);
    };
  }

  const getOuterStyle = (pos: any) => {
    const newStyle: CSSProperties = {};
    const m = {
      top: 'marginBottom',
      right: 'marginLeft',
      bottom: 'marginTop',
      left: 'marginRight',
    };
    if (bordered) {
      // @ts-ignore
      newStyle[m[pos]] = 6;
      if (isHidden || (newProps.hidden && collapseOptions)) {
        newStyle.border = `1px solid transparent`;
      } else {
        newStyle.border = `1px solid #ECECEC`;
      }
    }
    return {
      ...newStyle,
      ...style,
      padding: 0,
      ...widthOrHeight,
      ...hiddenStyle,
    };
  };

  const getInnerStyle = () => {
    const newStyle: CSSProperties = {};
    if (style?.padding) {
      newStyle.padding = style.padding;
    }
    if (isHidden || (newProps.hidden && collapseOptions)) {
      newStyle.opacity = 0;
    }
    return newStyle;
  };

  const dragIcon = draggable ? (
    collapseOptions ? (
      <DraggableIcon />
    ) : (
      icon ?? <DraggableIcon />
    )
  ) : null;

  return (
    <div
      ref={elRef}
      className={cls(prefixFun(), className)}
      style={getOuterStyle(sliderPosition.position)}
      {...others}
    >
      <div style={getInnerStyle()}>{children}</div>
      {draggable && (
        <span
          ref={sliderRef}
          className={`slider-bar${autoExpand ? ' disabled' : ''} slider-${
            sliderPosition.position
          }${isHidden ? ' slider-hidden' : ''}${
            dragIcon ? ' slider-icon' : ''
          }${iconHover ? ' icon-hover' : ''}`}
          style={{ zIndex, ...draggableStyle }}
          onMouseDown={sliderEvents.mousedown}
          onDoubleClick={onDoubleClick}
          // eslint-disable-next-line react/no-children-prop
          children={
            dragIcon
              ? React.cloneElement(dragIcon, {
                  style: getIconStyle(sliderPosition.position, 40),
                  className: 'translate-icon',
                  position: sliderPosition.position,
                })
              : null
          }
        />
      )}
      {icon && (!draggable || collapseOptions) && (
        <span
          className={`icon-bar slider-icon slider-${sliderPosition.position}${
            isHidden ? ' slider-hidden' : ''
          }`}
          style={{
            zIndex,
            width: `${
              ['left', 'right'].includes(sliderPosition.position) ? 0 : '100%'
            }`,
          }}
          // eslint-disable-next-line react/no-children-prop
          children={React.cloneElement(icon, {
            style: getIconStyle(sliderPosition.position, 50),
            className: 'translate-icon',
          })}
          onDoubleClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
};

export default Slider;
