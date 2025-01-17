import React, { CSSProperties, memo, useState } from 'react';
import { useObjectEffect } from './hooks';
import { IWaterMarkProps } from './interface';

export * from './interface';

export function createWaterMark(props: IWaterMarkProps) {
  const {
    width = 300,
    height = 250,
    fontSize = 14,
    fontStyle = 'Microsoft JhengHei',
    angle = -20,
    text = '',
    textColor = 'rgba(180, 180, 180, 0.5)',
  } = props;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', `${width}px`);
  canvas.setAttribute('height', `${height}px`);
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, width, height);
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = textColor;
  ctx.font = `${fontSize}px ${fontStyle}`;
  ctx.rotate((Math.PI / 180) * angle);
  ctx.fillText(text, fontSize, height - fontSize);

  const innerStyle: CSSProperties = {
    pointerEvents: 'none',
    backgroundImage: `url(${canvas.toDataURL('image/png')})`,
  };

  return innerStyle;
}

/**
 * 水印组件
 * @param style
 * @param props
 * @constructor
 */
export function WaterMark({ style, ...props }: IWaterMarkProps) {
  const [innerStyle, setInnerStyle] = useState<CSSProperties>({
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 99999999,
    ...style,
  });

  useObjectEffect(() => {
    setInnerStyle((prev) => ({ ...prev, ...createWaterMark(props) }));
  }, props);

  return <div style={innerStyle} />;
}

export * from './interface';

export default memo(WaterMark);
