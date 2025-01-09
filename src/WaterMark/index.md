# WaterMark

水印组件

## 基本用法
```tsx
import { useState } from 'react'
import { Input, Form } from 'antd'
import { WaterMark } from 'muto-design';

export default () => {
  const [text, setText] = useState<string>("我是水印")

  return (
    <>
      <WaterMark text={text} />
      <div style={{ height: '100%', width: '100%' }}>
        <Form.Item label="水印文本">
          <Input value={text} onChange={(e) => { setText(e.target.value) }} />
        </Form.Item>
      </div>
    </>
  )
}
```

## API
<API id="WaterMark"></API>