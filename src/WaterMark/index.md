# WaterMark

This is an example component.

```tsx
import { useState } from 'react'
import { Input, Form } from 'antd'
import { WaterMark } from 'x-msgfi-sdk';

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