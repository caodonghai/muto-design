# Icon

This is an example component.

```tsx
import { Space } from 'antd'
import { Icon, IIconProps } from 'x-msgfi-sdk';

const MyIcon = ({ ...props }: { type: Omit<IIconProps, 'href'> }) => <Icon href="https://at.alicdn.com/t/c/font_3805931_ldh99wweoaa.css" {...props} />

export default () => (
  <div>
    <Space direction="vertical">
      <Space>
        <MyIcon type="icon-shijian1" />
        <MyIcon type="icon-jurassic_add" />
        <MyIcon type="icon-xiaomaomi" />
        <MyIcon type="icon-yanhua" />
        <MyIcon type="icon-setting-role" />
      </Space>
      <Space>
        <MyIcon fontSize={24} type="icon-shijian1" />
        <MyIcon fontSize={24} type="icon-jurassic_add" />
        <MyIcon fontSize={24} type="icon-xiaomaomi" />
        <MyIcon fontSize={24} type="icon-yanhua" />
        <MyIcon fontSize={24} type="icon-setting-role" />
      </Space>
      <Space>
        <MyIcon fontSize={32} type="icon-shijian1" />
        <MyIcon fontSize={32} type="icon-jurassic_add" />
        <MyIcon fontSize={32} type="icon-xiaomaomi" />
        <MyIcon fontSize={32} type="icon-yanhua" />
        <MyIcon fontSize={32} type="icon-setting-role" />
      </Space>
      <Space>
        <MyIcon fontSize={48} type="icon-shijian1" />
        <MyIcon fontSize={48} type="icon-jurassic_add" />
        <MyIcon fontSize={48} type="icon-xiaomaomi" />
        <MyIcon fontSize={48} type="icon-yanhua" />
        <MyIcon fontSize={48} type="icon-setting-role" />
      </Space>
    </Space>
  </div>
)
```
