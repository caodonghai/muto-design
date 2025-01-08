import { CSSProperties } from 'react'

export interface IWaterMarkProps {
    imageWidth?: number;
    imageHeight?: number;
    textColor?: string;
    fontStyle?: string;
    fontSize?: number;
    angle?: number;
    text?: string;
    style?: CSSProperties;
  }